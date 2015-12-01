var Swarm = require('swarm');

var ChatMessage = Swarm.Model.extend('ChatMessage', {
    defaults: {
        text: undefined,
        name: undefined,
        color: '#000'
    }
});

module.exports = ChatMessage;
