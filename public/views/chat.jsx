var React = require('react');
var ChatMessages = require('../../models/chatMessages');
var ChatMessage = require('../../models/chatMessage')
var Swarm = require('swarm');

var User = React.createClass({
    render: function() {
        var color = {backgroundColor: this.props.color};
        return (
            <div className="user">
                <span className="user__name">
                    {this.props.name}
                    <span className="user__color" style={color}>
                    </span>
                </span>
            </div>
        );
    }
});

var Message = React.createClass({
    render: function() {
        var color = {color: this.props.color};
        return (
            <div className="chat__body__box__message">
                <span className="chat__body__box__message__text">
                    <span className="user__name" style={color}>
                        {this.props.name + ': '}
                    </span>
                    {this.props.text}
                </span>
            </div>
        );
    }
});

var Chat = React.createClass({
    mixins: [ Swarm.ReactMixin ],
    statics: {
        modelType: "ChatMessages"
    },
    getInitialState: function() {
        return {
            chatHeight: 224,
            isClosed: false,
            message: ''
        };
    },
    componentWillMount: function() {
        var chatMessages = this.sync;
        if (chatMessages === null) {
            this.chatMessages = new ChatMessages({_id: this.props.key});
        }
    },
    componenDidMount: function() {

    },
    componentDidUpdate: function(prevProps, prevState) {
        if (prevState.isClosed != this.state.isClosed) {
            this.state.isClosed ? this.changeHeight(0) : this.changeHeight(224)
        }
    },
    handleClick: function() {
        this.setState({isClosed: !this.state.isClosed});
    },
    handleSubmit: function() {
        var message = new ChatMessage({text: this.refs.input.getDOMNode().value, name: this.props.user.name, color: this.props.user.color});
        this.sync.addObject(message);
        console.log(this.sync);
        this.setState({message: ''});
    },
    changeHeight: function(height) {
        this.setState({chatHeight: height});
    },
    handleChange: function() {
        this.setState({
            message: this.refs.input.getDOMNode().value
        });
    },
    /*shouldComponentUpdate: function(nextProps, nextState) {
        return nextState !== this.state;
    },*/
    render: function() {
        var users = this.props.users.objects.map(function (obj) {
            return (
                <User name={obj.name} color={obj.color} key={obj._id} />
            );
        }, this);
        var messages = this.sync.objects.map(function (obj) {
            return (
                <Message text={obj.text} name={obj.name} color={obj.color} key={obj._id}/> 
            );
        }, this);
        var chatStyle = {height: this.state.chatHeight};
        var arrowStyle = {transform: 'rotate(' + (this.state.isClosed ? '180deg' : '0deg') + ')'};
        return (
            <div className="chat">
                <div className="chat__header">
                    <span className="icon-arrow chat__header__arrow" onClick={this.handleClick} style={arrowStyle}>
                    </span>
                </div>
                <div className="chat__body" style={chatStyle}>
                    <div className="chat__body__box">
                        {messages}
                    </div>
                    <div className="chat__body__users">
                        <h5 className="chat__body__users__h">
                            Пользователи
                        </h5>
                        <hr/>
                        {users}
                    </div>
                </div>
                <div className="chat__footer">
                    <input type="text" className="chat__footer__input" ref="input"
                        value={this.state.message} onChange={this.handleChange}/>
                    <button className="btn btn--sm chat__footer__btn" onClick={this.handleSubmit}>
                        Отправить
                    </button>
                </div>
            </div>
        );
    }
});

module.exports = Chat;
