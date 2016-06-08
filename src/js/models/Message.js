var Swarm = require('swarm');

var Message = module.exports = Swarm.Model.extend('Message', {
    defaults: {
        text: undefined,
        name: undefined,
        color: '#000'
    }
});
