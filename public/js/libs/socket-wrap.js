function SocketWrap(url, port) {

    var socket = new WebSocket('ws://' + url + ':' + port);
    var flag = null;
    var callbacks = {};

    this.create = function (data) {
        var object = {
            content: data,
            method: 'create'
        };
        socket.send(JSON.stringify(object));
    };

    this.get = function (id) {
        var object = {
            id: id,
            method: 'get'
        };
        flag = id;
        socket.send(JSON.stringify(object));
    };

    this.on = function (eventName, callback) {
        var eventCallbacks = callbacks[eventName] = callbacks[eventName] || [];
        eventCallbacks.push(callback);
    };

    socket.onmessage = function (event) {
        var obj = JSON.parse(event.data);
        var arr;
        if (obj.type === 'get') {
            arr = callbacks[obj.id];
            console.log(event);
            for (var i = 0; i < arr.length; i++) {
                arr[i](obj.data);
            }
        }

        if (obj.type === 'createOk') {
            arr = callbacks[obj.eventName];
            for (var k = 0; k < arr.length; k++) {
                arr[k](obj.data, obj.id);
            }
        }
    };
}
