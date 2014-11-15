var ws = require('ws');
var database = require('./db');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/db';


function run() {
	MongoClient.connect(url, function(err, db) {

	var server = new ws.Server({port: 3000});

	server.on('connection', function(socket) {

		socket.on('message', function(message) {

			var obj = JSON.parse(message),
					data = null;

			if( typeof obj == 'object' ) {
				if( obj.method === 'create' ) {
					database.create(obj.content, db, function(data) {
						var obj = {
							type: 'createOk',
							data: 'Success',
							eventName: 'success',
							id: data._id
						}
						socket.send(JSON.stringify(obj));
					})
				}
				if( obj.method === 'get') {
					database.get(obj.id, db, function(data) {
						var object = {
							type: 'get',
							data: data && data.content,
							id: obj.id
						}
						socket.send(JSON.stringify(object));
					})
				}
			}
		})

		socket.on('close', function() {
		})
	})
});
}


module.exports = {
	run: run
}