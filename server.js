var Swarm = require('swarm');
var path = require('path');
var http = require('http');
var express = require('express');
var ws = require('ws');

var config = require('./config');

var app = express();
app.use(express.static(path.join(__dirname, config.public)));
app.get('/*', function(request, response) {
    response.sendFile(path.join(__dirname, config.public, config.index));
});

var fileStorage = new Swarm.FileStorage(config.swarm.storage);
var swarmHost = Swarm.env.localhost = new Swarm.Host('swarm~nodejs', 0, fileStorage);

var httpServer = http.createServer(app);
httpServer.listen(process.env.PORT || config.PORT, function () {
    console.log('Server started');
});

var wsServer = new ws.Server({server: httpServer});
wsServer.on('connection', function (socket) {
    swarmHost.accept(new Swarm.EinarosWSStream(socket), {delay: config.swarm.delay});
});

require('./src/js/models');
require('./src/js/collections');
