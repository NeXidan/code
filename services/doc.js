var Text = require('swarm/lib/Text');

function create(callback) {
    var doc = new Text();
    callback(doc);
};

module.exports.create = create;