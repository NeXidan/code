var Swarm = require('swarm');

var Message = require('../models/Message');

var Messages = module.exports = Swarm.Vector.extend('Messages', {
    defaults: {
        objectType: Message
    }
});
