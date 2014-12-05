var React = require('react');

var Profile = React.createClass({
    getInitialState: function() {
        return {
            isShownInput: false,
            username: ''
        };
    },
    handleClick: function() {
        this.setState({isShownInput: !this.state.isShownInput});
    },
    handleChange: function() {
        this.setState({
            username: this.refs.input.getDOMNode().value
        });
    },
    handleSubmit: function() {
        if (this.state.username != '') {
            this.props.user.set({name: this.state.username});
            this.setState({isShownInput: false});
        }
    },
    render: function() {
        var color = {backgroundColor: this.props.user.color};
        var profileName;
        if (this.state.isShownInput) {
            profileName = 
                <form onSubmit={this.handleSubmit} className="inline-b">
                    <input type="text" defaultValue={this.props.user.name} 
                            ref="input" className="profile__name__input" onChange={this.handleChange}/>
                </form>
        } else {
            profileName =
                <span className="cursor-p" onClick={this.handleClick}>
                    {this.props.user.name}
                </span>
        }
        return (
            <div className="profile">
                <span className="profile__name">
                    {profileName}
                </span>
                <div className="profile__avatar" style={color}>
                </div>
            </div>
        );
    }
});

var Top = React.createClass({
    render: function() {
        return (
            <div className="panel panel--top">
                <div className="project">
                    <div className="project__logo">
                        <a className="logo__text__a" href="/">
                            Яндекс.Код
                        </a>
                    </div>
                    <span className="project__name">
                        /&nbsp;Project
                    </span>
                </div>
                {this.props.user !== undefined && <Profile user={this.props.user}/>}
            </div>
        );
    }
});

module.exports = Top;
