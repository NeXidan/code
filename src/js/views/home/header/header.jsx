var Logo = require('./logo');

var Header = module.exports = React.createClass({
    render: function() {
        return (
            <div className="header">
                <Logo title="Онлайн" subtitle="код"/>
            </div>
        );
    }
});
