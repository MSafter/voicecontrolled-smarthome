var config = require('../config');

exports.sayHello = function (callback) {
    console.log(config.name);
    callback();
}