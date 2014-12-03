var socket = require('./socket');
var server = require('./server');
server.run(1337);
socket.run();