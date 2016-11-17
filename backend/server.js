//import required node modules
var express = require('express');
var bodyParser = require('body-parser');

//build server
var app = express();
var router = express.Router();

//validator
var commandValidator = require('./commandValidator');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//--------Routes--------
router.route('/test').get(function (req, res) {    
    res.send("command send!");
});

//route for validating the command by user
router.route('/cmd/validate')
    .post(commandValidator.validateCommand);

//--------Routes--------

//configure and start server
app.use('/api', router);
app.listen(8080);