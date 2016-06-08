var Message = require('../../../models/Message');

var ChatMessage = module.exports = React.createClass({
    mixins: [ Swarm.ReactMixin ],

    statics: {
        modelType: 'Message'
    },

    render: function () {
        var color = {color: this.sync.color};

        if (this.sync.name === undefined) {
            return (
                <div></div>
            );
        }

        return (
            <div className='chat__body__box__message'>
                <span className='chat__body__box__message__text'>
                    <span className='user__name' style={color}>
                        {this.sync.name + ': '}
                    </span>
                    {this.sync.text}
                </span>
            </div>
        );
    }
});
