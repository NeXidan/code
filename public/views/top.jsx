var React = require('react');

var Profile = React.createClass({
    render: function() {
        var color = {backgroundColor: this.props.user.color};
        return (
            <div className="profile">
                <span className="profile__name">
                    {this.props.user.name}
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
