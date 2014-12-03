var Bottom = React.createClass({
    render: function() {
        return (
            <div className="panel panel--bot">
                {((this.props.users !== undefined) & (this.props.user !== undefined)) 
                    && <Chat key={'/ChatMessages#' + this.props.key} users={this.props.users} user={this.props.user}/>}
            </div>
        );
    }
});
