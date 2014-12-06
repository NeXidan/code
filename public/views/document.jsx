var React = require('react');
var Swarm = require('swarm');
var Top = require('./top');
var Bottom = require('./bottom');
var DocView = require('./docView');
var Doc = require('../../models/doc');
var User = require('../../models/user');
var UserCollection = require('../../models/userCollection');

var Document = React.createClass({
    mixins: [ Swarm.ReactMixin ],

    statics: {
        modelType: 'Doc'
    },

    gitInitialState: function () {
        return {
            user: null,
            username: '',
            color: '',
            users: []
        };
    },

    componentDidMount: function () {
        this.userInit();
        this.collectionInit();
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
                <Top doc={doc} user={this.state.user}/>
                <div className='main main--padding'>
                    <div className='col col--left w--20'>
                        <div className='folders'>
                        </div>
                    </div>
                    <div className='col w--65'>
                        <DocView doc={doc} users={this.state.users} user={this.state.user}/>
                    </div>
                    <div className='col col--right w--15'>
                    </div>
                </div>
                <Bottom key={doc._id} users={this.state.users} user={this.state.user}/>
            </div>
        );
    },

    userInit: function () {   
        var localuserID = window.localStorage.getItem('localuserID');
        if (!localuserID) {
            var sessiondId = window.localStorage.getItem('localuser');
            user = User.create(sessiondId);
            window.localStorage.setItem('localuserID', '/User#' + user._id);
        } else {
        user = Swarm.env.localhost.get(localuserID);
        }
        this.setState({user: user});
    },

    collectionInit: function () {
        collection = Swarm.env.localhost.get('/UserCollection#' + this.sync._id);
        if (collection !== null) {
            collection.addUnique(this.state.user);
        }  else {
            collection = new UserCollection({_id: this.sync._id});
            collection.addUnique(this.state.user);
        }
        this.setState({users: collection});
        this.forceUpdate();
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
        console.log('User ' + user._id + ' disconnected');
        this.forceUpdate();
    }
});

module.exports = Document;
