var Swarm = require('swarm');

var ChatMessage = Swarm.Model.extend('ChatMessage', {
    defaults: {
        text: '',
        name: '',
        color: '#000'
    }
});

module.exports = ChatMessage;
