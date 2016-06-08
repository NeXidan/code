var Swarm = require('swarm');

var COLORS = [
    '#8dd3c7','#ffffb3','#bebada','#fb8072','#80b1d3','#fdb462',
    '#b3de69','#fccde5','#d9d9d9','#bc80bd','#ccebc5','#ffed6f',
    '#66c2a5','#fc8d62','#8da0cb','#e78ac3','#a6d854','#ffd92f',
    '#e5c494','#b3b3b3','#e41a1c','#377eb8','#4daf4a','#984ea3',
    '#ff7f00','#ffff33','#a65628','#f781bf','#999999',"#666666"
];

function getRandomColor() {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
};

var User = module.exports = Swarm.Model.extend('User', {
    defaults: {
        sessionId: '',
        color: '#000',
        name: 'User',
        col: 0,
        row: 0,
        lastActive: null
    }
});

module.exports.factory = function (ssnId) {
    return new User({sessionId: ssnId, color: getRandomColor()});
};;
