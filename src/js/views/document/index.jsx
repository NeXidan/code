var Base = require('./base');

module.exports = React.createClass({

    render: function () {
        return (
            <Base spec={'/Document#' + this.props.routeParams.id} />
        );
    }
});
