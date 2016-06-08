var Link = require('react-router').Link;

var Logo = module.exports = React.createClass({
    render: function() {
        return (
            <div className="logo">
                <div className="logo__text">
                    <Link className="logo__text__a" to="/">
                        {this.props.title}
                        <span className="logo__text__span">
                            {this.props.subtitle}
                        </span>
                    </Link>
                </div>
            </div>
        );
    }
});
