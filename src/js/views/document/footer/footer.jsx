var Chat = require('../../components/chat/chat');

var Footer = module.exports = React.createClass({
    render: function() {
        return (
            <div className='panel panel--bot'>
                {((this.props.users !== undefined) & (this.props.user !== undefined)) &&
                    <Chat spec={'/Messages#' + this.props.spec} users={this.props.users} user={this.props.user}/>}
            </div>
        );
    }
});
