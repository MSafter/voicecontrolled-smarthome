var exec = require('child_process').exec;
var requireDir = require('require-dir');
var modules = requireDir('./modules/');
var config = require('./config');
var multer  =   require('multer');
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, "userCommand.wav");
  }
});
var upload = multer({ storage : storage}).single('userCommand');

exports.upload = function(req,res){
	 upload(req,res,function(err) {
        if(err) {
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
                module[commandInformation.command.functionname](function (err) {
                    if (err) {
                        return res.send({ message: "Error executing command " + commandInformation.phrase });
                    }

                    res.send({ message: "Command successfully executed" });
                });
                break;
            case "native":
                exec(commandInformation.command.exec, function (err, stdout, stderr) {
                    if (err) {
                        return res.send(err);
                    }

                    return res.send({ stdout: stdout, stderr: stderr });
                });
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
    for (var i = 0; i < config.commands.length; i++) {
        var current = config.commands[i];
        if (current.phrase.toLowerCase() === phrase) {
            return current;
        }
    }
}
