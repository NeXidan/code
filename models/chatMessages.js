var Swarm = require('swarm');
var ChatMessage = require('./chatMessage');

var ChatMessages = Swarm.Vector.extend('ChatMessages', {
    defaults: {
        objectType: ChatMessage    
    }
});

module.exports = ChatMessages;
