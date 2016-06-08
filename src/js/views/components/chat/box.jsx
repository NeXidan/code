var Message = require('../../../models/Message');

var ChatMessage = require('./message');
var User = require('../user/user');

var KEY_ENTER = 13;

var CLOSED_HEIGHT = 0;
var OPEN_HEIGHT = 224;

var ChatBox = module.exports = React.createClass({
    getInitialState: function () {
        return {
            chatHeight: 224,
            isClosed: false,
            message: ''
        };
    },

    componentDidUpdate: function (prevProps, prevState) {
        if (prevState.isClosed != this.state.isClosed) {
            var height = this.state.isClosed ? CLOSED_HEIGHT : OPEN_HEIGHT;
            this.changeHeight(height);
        }
    },

    render: function () {
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
                    {this.props.messages.objects.map(function(obj) {
                        return <ChatMessage key={obj._id} spec={'/Message#' + obj._id}/>;
                    })}
                    </div>
                    <div className='chat__body__users'>
                        <h5 className='chat__body__users__h'>
                            Пользователи
                        </h5>
                        <hr/>
                        {this.props.users.objects.map(function(obj) {
                            return <User key={obj._id} spec={'/User#' + obj._id} />;
                        })}
                    </div>
                </div>
                }
                <div className='chat__footer'>
                    <input type='text' className='chat__footer__input' ref='input'
                        value={this.state.message} onChange={this.handleChange} onKeyDown={this.handleKeyDown}/>
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

    handleKeyDown: function (event) {
        if (event.keyCode === KEY_ENTER) {
            this.handleSubmit();
        }
    },

    handleSubmit: function () {
        var text = this.refs.input.value;

        if (!text) {
            return;
        }

        var message = new Message({text: text, name: this.props.user.name, color: this.props.user.color});
        this.props.messages.addObject(message);
        this.setState({message: ''});
    },

    changeHeight: function (height) {
        this.setState({chatHeight: height});
    },

    handleChange: function () {
        this.setState({
            message: this.refs.input.value
        });
    }
});
