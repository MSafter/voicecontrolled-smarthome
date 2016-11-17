var lgtv = require("lgtv2")({
    url: 'ws://lgtvip:3000'
});

var currentVol = 0;

lgtv.on('connect', function () {
    lgtv.subscribe('ssap://audio/getVolume', function (err, res) {
        currentVol = res.volume;
    });
});

exports.quiter = function (callback) {
    lgtv.request('ssap://audio/setVolume', { volume: currentVol - 10 }, function (err, res) {
        if (err) {
            callback(err);
        }
        callback();
    });
}

exports.louder = function (callback) {
    lgtv.request('ssap://audio/setVolume', { volume: currentVol + 10 }, function (err, res) {
        if (err) {
            callback(err);
        }
        callback();
    });
}