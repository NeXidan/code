var Messages = require('../../../collections/Messages');

var ChatBox = require('./box');

var Chat = module.exports = React.createClass({
    mixins: [ Swarm.ReactMixin ],

    statics: {
        modelType: 'Messages'
    },

    render: function () {
        return (
            <ChatBox users={this.props.users} user={this.props.user} messages={this.sync}/>
        );
    }
});
