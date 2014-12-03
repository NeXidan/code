var express = require('express');
var path = require('path');
var app = express();

app.use(express.static('dist'));

app.get('/', function(req, res){
    res.sendFile(path.resolve('public/index.html'));
});

app.get('/doc/:id', function(req, res){
    res.sendFile(path.resolve('public/doc.html'));
});

module.exports = {
    run: function(port) {
        app.listen(port);
    }
}
