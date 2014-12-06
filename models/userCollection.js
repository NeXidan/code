var Swarm = require('swarm');
var User = require('./user');

var UserCollection = Swarm.Vector.extend('UserCollection', {
    defaults: {
        objectType: User
    },
    addUnique: function (obj){
        if(this.objects.indexOf(obj) == -1) {
            this.addObject(obj);
            return true;
        }
        return false;
    }
});

module.exports = UserCollection;
