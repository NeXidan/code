var React = require('react');

var Logo = React.createClass({
    render: function() {
        return (
            <div className="logo">
                <div className="logo__text">
                    <a className="logo__text__a" href="/">
                        {this.props.title}
                        <span className="logo__text__span">
                            {this.props.subtitle}
                        </span>
                    </a>
                </div>
            </div>
        );
    }
});
var Header = React.createClass({
    render: function() {
        return (
            <div className="header">
                <Logo title="Яндекс" subtitle="код"/>
            </div>
        );
    }
});

module.exports = Header;