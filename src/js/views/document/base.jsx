var Document = require('../../models/Document');
var User = require('../../models/User');
var Users = require('../../collections/Users');

var Header = require('./header/header');
var Footer = require('./footer/footer');
var Content = require('./content/content');

var Base = module.exports = React.createClass({
    mixins: [ Swarm.ReactMixin ],

    statics: {
        modelType: 'Document'
    },

    getInitialState: function () {
        var user = this.getUser();

        return {
            user: user,
            users: null,
            username: '',
            color: ''
        };
    },

    componentWillMount: function () {
        var users = this.getUsers();
        this.setCheckInterval();
    },

    componentWillUnmount: function () {
        clearInterval(this.intervalID);
    },

    componentDidUpdate: function () {
        var date = new Date();
        this.time = date.valueOf();
        this.state.user.set({lastActive: this.time});
    },

    render: function () {
        var doc = this.sync;
        return (
            <div className='main-wrap cf'>
                <Header doc={doc} user={this.state.user}/>
                <div className='main main--padding'>
                    <div className='col col--left w--20'>
                        <div className='folders'>
                        </div>
                    </div>
                    <div className='col w--65'>
                        <Content doc={doc} users={this.getUsers()} user={this.state.user}/>
                    </div>
                    <div className='col col--right w--15'>
                    </div>
                </div>
                <Footer spec={doc._id} users={this.getUsers()} user={this.state.user}/>
            </div>
        );
    },

    getUser: function () {
        var localuserID = window.localStorage.getItem('localuserID');

        if (!localuserID) {
            var sessiondId = window.localStorage.getItem('localuser');
            var user = User.factory(sessiondId);

            window.localStorage.setItem('localuserID', '/User#' + user._id);

            return user;
        }

        return Swarm.env.localhost.get(localuserID);
    },

    getUsers: function (user) {
        var users = this.state.users;

        if (!users) {
            users = Swarm.env.localhost.get('/Users#' + this.sync._id);

            if (!users) {
                users = new Users({_id: this.sync._id});
            }

            if (this.state.user) {
                users.addUnique(this.state.user);
            }

            this.setState({users: users});
        }

        return users;
    },

    setCheckInterval: function () {
        this.interval = 1000*60*3;
        this.intervalID = setInterval(this.usersCheck, this.interval);
    },

    usersCheck: function () {
        this.forceUpdate();
        this.state.users.objects.forEach(function (obj) {
            if ((obj !== this.state.user) & ((this.time - obj.lastActive)  > this.interval)) {
                this.userDisconnect(obj);
            }
        }, this);
    },

    userDisconnect: function (user) {
        collection.removeObject(collection.indexOf(user));
        this.setState({users: collection});
        this.forceUpdate();
    }
});
