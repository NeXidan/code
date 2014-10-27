var fs = require('fs');

function generateId() {
    return ++fs.readdirSync('doc').length;
}

module.exports = {
    create: function (document, callback) {
       var id = generateId();
       fs.writeFile('doc/'+ id + '.txt', document, function (err) {
            if (err) {
                console.log('Document isn\'t created!');
            } else {
                console.log('Document is created!');
            }
        });
        callback(id);
    },
    get: function (id, callback) {
        fs.readFile('doc/'+ id + '.txt', function (err, data) {
            if (err) {
                console.log('Document isn\'t read!');
            } else {
                callback(data);
                console.log('Document is read! ' + data);
            }
        });
    },
    delete: function (id) {
        // todo: need to test
        var fileName = '/doc/'+ id + '.txt';
        var tempFile = fs.openSync(fileName, 'r');
        fs.closeSync(tempFile);
        fs.unlinkSync(fileName);
    }
};

