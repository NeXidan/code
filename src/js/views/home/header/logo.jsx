var Logo = module.exports = React.createClass({
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
