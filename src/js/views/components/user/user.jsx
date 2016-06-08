var User = module.exports = React.createClass({
    mixins: [ Swarm.ReactMixin ],

    statics: {
        modelType: 'User'
    },

    render: function () {
        var color = {backgroundColor: this.sync.color};
        return (
            <div className='user'>
                <span className='user__name'>
                    {this.sync.name}
                    <span className='user__color' style={color}>
                    </span>
                </span>
            </div>
        );
    }
});
