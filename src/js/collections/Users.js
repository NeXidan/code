var Swarm = require('swarm');

var User = require('../models/User');

var Users = module.exports = Swarm.Vector.extend('Users', {
    defaults: {
        objectType: User
    },

    addUnique: function (obj){
        if (this.objects.indexOf(obj) == -1) {
            this.addObject(obj);
            return true;
        }
        return false;
    }
});
