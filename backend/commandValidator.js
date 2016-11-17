var exec = require('child_process').exec;
var requireDir = require('require-dir');
var modules = requireDir('./modules/');
var config = require('./config');

exports.validateCommand = function (req, res) {

    //get spoken phrase of user form body 
    var userPhrase = req.body.command.toLowerCase();

    console.log("New command to validate: " + command);

    //Get command information by phrase
    var commandInformation = getCommandInformation(userPhrase);

    //check if command is configured
    if (commandInformation) {
        switch (commandInformation.command.type) {
            case "node":
                var module = modules[commandInformation.modulename];
                module[commandInformation.functionname](function (err) {
                    if (err) {
                        return res.send({ message: "Error executing command " + commandInformation.phrase });
                    }
                    return res.send({ message: "Command successfully executed" });
                });
            case "native":
                exec(commandInformation.command.exec, function (err, stdout, stderr) {
                    if (err) {
                        return res.send(err);
                    }

                    return res.send({ stdout: stdout, stderr: stderr });
                });
        }
    } else {
        return res.send({ message: "No command configured for phrase" + userPhrase });
    }
}

/**
 * Returns information of the command from config of the given phrase
 * Note: Checks by phrase
 */
function getCommandInformation(phrase) {
    for (var i = 0; i < config.commands.length; i++) {
        var current = config.commands[i];
        if (current.phrase.toLowerCase() === phrase) {
            return current;
        }
    }
}