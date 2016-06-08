var Step = module.exports = React.createClass({
    render: function() {
        return (
            <div className="col w--33">
                <div className="panel">
                    <div className="step">
                        <span className="step__number">
                            {this.props.number}
                        </span>
                    </div>
                    <h3>
                        {this.props.title}
                    </h3>
                    <hr className="hr"/>
                    <p>
                        {this.props.text}
                    </p>
                </div>
            </div>
        );
    }
});
