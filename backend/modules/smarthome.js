const wakeOnLan = require('wol');
const {Device} = require('ps4-waker');

exports.wol = (callback, mac) =>{
    wakeOnLan.wake(mac, function(err, res){
        callback(err, res);
    });
};

exports.psWake = (callback) =>{
    var ps4 = new Device();
    ps4.turnOn().then(() => callback());
};
