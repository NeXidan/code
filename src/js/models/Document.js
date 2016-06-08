var Swarm = require('swarm');
var Spec = Swarm.Spec;
var Syncable = Swarm.Syncable;

var Text = require('swarm/lib/Text');

var Document = module.exports = Syncable.extend('Document', {
    defaults: {
        weave: '\n',
        ids: {type:Array, value:'00000+swarm'},
        text: '',
        name: '',
        extension: '',
        _oplog: Object
    },

    ops: {
        insert: Text.prototype._ops.insert,
        remove: Text.prototype._ops.remove,
        setProps: function (spec, value, repl) {
            var version = spec.version(),
                vermet = spec.filter('!.').toString();
            if (version < this._version.substr(1)) {
                this._oplog[vermet] = value;
                value = this._oplog[vermet];
            }
            value && this.apply(value);
        }
    },
    rebuild: Text.prototype.rebuild,
    set: Text.prototype.set
});

Document.diff = Text.diff;


function getExtension(name) {
    var parts = name.split(".");
    if( parts.length === 1 || ( parts[0] === "" && parts.length === 2 ) ) {
        return "";
    }
    return parts.pop();
};

module.exports.factory = function (name, callback) {
    if (name != '') {
        var doc = new Document();
        doc.setProps({name: name, extension: getExtension(name)});
        callback(doc);
    }
};
