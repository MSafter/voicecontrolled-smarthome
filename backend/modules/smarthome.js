const wakeOnLan = require('wol');
const {Device} = require('ps4-waker');

const tvInfo = {
    volume: {
        mute: false,
        value: -1
    },
    sw: {}
};


// controller
var lgtv = require("lgtv2")({
    url: 'ws://lgwebostv:3000'
});

lgtv.on('error', function (err) {
    console.log(err);
});

lgtv.on('connect', function () {
    console.log('connected');

    lgtv.subscribe('ssap://audio/getVolume', function (err, res) {
        tvInfo.volume.mute = res.muted;
        tvInfo.volume.value = res.value;
    });

    lgtv.subscribe('ssap://com.webos.service.update/getCurrentSWInformation', function (err, res) {
        tvInfo.sw = res;
    });

});

exports.switchInput = (callback, input) => {
    lgtv.request('ssap://tv/switchInput', {input});
    callback();
}

// /api/tv/info
exports.getTvInfo = (req, res) => {
    return res.send(tvInfo);
};


// simple actions
exports.wol = (callback, mac) => {
    wakeOnLan.wake(mac, function (err, res) {
        callback(err, res);
    });
};

exports.psWake = (callback) => {
    var ps4 = new Device();
    ps4.turnOn().then(() => callback());
};
