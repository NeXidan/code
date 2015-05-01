var path        = require('path');
var url         = require('url');
var http        = require('http');
var express     = require('express');
var ReactAsync  = require('react-async');
var app         = express();
var App         = require('./dist/views/app');
var ws_lib      = require('ws');

var Swarm = require('swarm');
var EinarosWSStream = Swarm.EinarosWSStream;

app.get('/', function (req, res, next) {
    var path = url.parse(req.url).pathname;
    var app = App({id: null, app: path});
    ReactAsync.renderComponentToStringWithAsyncState(app, function (err, markup) {
        if (err) {
            return next(err);
        }
        res.send('<!doctype html>\n' + markup);
    });
});

app.get('/:id', function (req, res, next) {
    var path = url.parse(req.url).pathname;
    var app = App({id: req.params.id, app: path});
    ReactAsync.renderComponentToStringWithAsyncState(app, function (err, markup) {
        if (err) {
            return next(err);
        }
        res.send('<!doctype html>\n' + markup);
    });
});

var fileStorage = new Swarm.FileStorage('.swarm');

var swarmHost = new Swarm.Host('swarm~nodejs', 0, fileStorage);
Swarm.env.localhost = swarmHost;

var httpServer = http.createServer(app);

httpServer.listen(process.env.PORT || 5000, function () {
    console.log('Server started');
});

var wsServer = new ws_lib.Server({
    server: httpServer
});

wsServer.on('connection', function (ws) {
    var params = url.parse(ws.upgradeReq.url, true);
    console.log('incomingWS %s', params.path);
    swarmHost.accept(new EinarosWSStream(ws), { delay: 50 });
});

app.use(express.static('dist'));
