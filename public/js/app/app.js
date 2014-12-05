var Swarm = require('swarm');
var Spec = Swarm.Spec;
var Syncable = Swarm.Syncable;
var React = require('react');
var App = require('../views/app.js');
var User = require('../../models/user');

function swarmStart(sessionId) {
    var storage = null;
    storage = new Swarm.SharedWebStorage('webst', {persistent:true});
    var wsServer = 'ws://' + window.location.host;
    var swarmHost = Swarm.env.localhost = new Swarm.Host(sessionId, 0, storage);
    swarmHost.connect(wsServer, {delay: 50});
    console.log(Swarm.env.localhost);
}

if (window !== undefined) {

    var sessionId = window.localStorage.getItem('localuser');
    if (!sessionId) {
        var rnd = Math.floor(Math.random() * (1 << 30));
        sessionId = Swarm.Spec.int2base(rnd);
        window.localStorage.setItem('localuser', sessionId);
    }
    swarmStart(sessionId);

    window.onload = function () {
        var path = window.location.pathname;
        React.renderComponent(App({id: path.slice(1), app: path}), document);
    };

}
