const fs = require('fs');

exports.get = (req, res) => {
    fs.readFile('./config.json', (err, data) => {
            return res.send(JSON.parse(data));
        }
    )
};