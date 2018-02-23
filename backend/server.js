//import required node modules
var express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');

//build server
var app = express();
var router = express.Router();


//validator
var commandValidator = require('./commandValidator');


// controller
const systemController = require('./systemController');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

//--------Routes--------

router.get('/info', systemController.get);

router.route('/test').get(function (req, res) {
    res.send("command send!");
});

//upload for audio file
router.route('/upload').post(commandValidator.upload);

//route for validating the command by user
router.route('/cmd/validate')
    .post(commandValidator.validateCommand);

//--------Routes--------

//configure and start server
app.use('/api', router);
app.listen(3000);