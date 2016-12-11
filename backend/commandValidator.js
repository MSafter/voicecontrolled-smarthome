var exec = require('child_process').exec;
var requireDir = require('require-dir');
var modules = requireDir('./modules/');
var config = require('./config');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, "userCommand.wav");
    }
});
var upload = multer({ storage: storage }).single('userCommand');

exports.upload = function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
}

exports.validateCommand = function (req, res) {

    //get spoken phrase of user form body 
    var userPhrase = req.body.command.toLowerCase();

    console.log("New command to validate: " + userPhrase);

    //Get command information by phrase
    var commandInformation = getCommandInformation(userPhrase);
    
    //check if command is configured
    if (commandInformation) {
        switch (commandInformation.command.type) {
            case "node":
                var module = modules[commandInformation.command.modulename];
                module[commandInformation.command.functionname](function (err, data) {
                    if (err) {
                        return res.send({ message: "Error executing command " + commandInformation.phrase });
                    }
                    res.send({ message: "Command successfully executed", data: data });
                });
                break;
            case "native":

                let callback = function (err, stdout, stderr) {
                    if (commandInformation.command.runAsync) {
                        return;
                    }
                    if (err) {
                        return res.send(err);
                    }
                    return res.send({ stdout: stdout, stderr: stderr });
                }

                exec(commandInformation.command.exec, callback);

                if (commandInformation.command.runAsync) {
                    return res.send({ message: "Executed native command async" });
                }

                break;
        }
    } else {
        console.log("No command configured for phrase");
        return res.send({ message: "No command configured for phrase" + userPhrase });
    }
}

/**
 * Returns information of the command from config of the given phrase
 * Note: Checks by phrase
 */
function getCommandInformation(phrase) {
    for (let i = 0; i < config.commands.length; i++) {
        let current = config.commands[i];
        let currentKeyphrase = current.keyphrase;
        if (phrase.toLowerCase().indexOf(currentKeyphrase.toLowerCase()) === 0) {
            for (let j = 0; j < current.commands.length; j++) {
                let currentCommand = current.commands[j];
                if (phrase.toLowerCase().endsWith(currentCommand.phrase.toLowerCase())) {
                    return currentCommand;
                }
            }
        }
    }
}