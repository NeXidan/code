var User = module.exports = React.createClass({
    render: function () {
        var color = {backgroundColor: this.props.color};
        return (
            <div className='user'>
                <span className='user__name'>
                    {this.props.name}
                    <span className='user__color' style={color}>
                    </span>
                </span>
            </div>
        );
    }
});
