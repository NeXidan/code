var React = require('react');
var ChatMessages = require('../../models/chatMessages');
var ChatMessage = require('../../models/chatMessage');
var Swarm = require('swarm');

var User = React.createClass({
    render: function () {
        var color = {backgroundColor: this.props.color};
        return (
            <div className='user'>
                <span className='user__name'>
                    {this.props.name}
                    <span className='user__color' style={color}>
                    </span>
                </span>
            </div>
        );
    }
});

var Message = React.createClass({
    render: function () {
        var color = {color: this.props.color};
        return (
            <div className='chat__body__box__message'>
                <span className='chat__body__box__message__text'>
                    <span className='user__name' style={color}>
                        {this.props.name + ': '}
                    </span>
                    {this.props.text}
                </span>
            </div>
        );
    }
});

var ChatBox = React.createClass({
    getInitialState: function () {
        return {
            chatHeight: 224,
            isClosed: false,
            message: ''
        };
    },

    componentDidUpdate: function (prevProps, prevState) {
        if (prevState.isClosed != this.state.isClosed) {
            var height = 0;
            if (!this.state.isClosed) {
                height = 224;
            }
            this.changeHeight(height);
        }
    },

    render: function () {
        var users = this.props.users.objects.map(function (obj) {
            return (
                <User name={obj.name} color={obj.color} key={obj._id} />
            );
        }, this);
        var messages = this.props.messages.objects.map(function (obj) {
            return (
                <Message text={obj.text} name={obj.name} color={obj.color} key={obj._id}/> 
            );
        }, this);
        var chatStyle = {height: this.state.chatHeight};
        var arrowStyle = {transform: 'rotate(' + (this.state.isClosed ? '180deg' : '0deg') + ')'};
        return (
            <div className='chat'>
                <div className='chat__header'>
                    <span className='icon-arrow chat__header__arrow' onClick={this.handleClick} style={arrowStyle}>
                    </span>
                </div>
                {!this.state.isClosed && 
                <div className='chat__body' style={chatStyle}>
                    <div className='chat__body__box'>
                        {messages}
                    </div>
                    <div className='chat__body__users'>
                        <h5 className='chat__body__users__h'>
                            Пользователи
                        </h5>
                        <hr/>
                        {users}
                    </div>
                </div>
                }
                <div className='chat__footer'>
                    <input type='text' className='chat__footer__input' ref='input' 
                        value={this.state.message} onChange={this.handleChange}/>
                    <button onClick={this.handleSubmit} className='btn btn--sm chat__footer__btn'>
                        Отправить
                    </button>
                </div>
            </div>
        );
    },

    handleClick: function () {
        this.setState({isClosed: !this.state.isClosed});
    },

    handleSubmit: function () {
        var message = new ChatMessage({text: this.refs.input.getDOMNode().value, name: this.props.user.name, color: this.props.user.color});
        this.props.messages.addObject(message);
        this.setState({message: ''});
    },

    changeHeight: function (height) {
        this.setState({chatHeight: height});
    },

    handleChange: function () {
        this.setState({
            message: this.refs.input.getDOMNode().value
        });
    }
});


var Chat = React.createClass({
    mixins: [ Swarm.ReactMixin ],

    statics: {
        modelType: 'ChatMessages'
    },

    componentWillMount: function () {
        var chatMessages = this.sync;
        if (chatMessages === null) {
            this.chatMessages = new ChatMessages({_id: this.props.key});
        
            this.chatMessages.on('all', function () {
                console.log('all');
            });
        }
    },

    render: function () {
        return (
            <ChatBox users={this.props.users} user={this.props.user} messages={this.sync}/>
        );
    }
});

module.exports = Chat;
