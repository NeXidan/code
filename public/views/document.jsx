var Text = require('swarm/lib/Text');
var User = require('../../models/user');
var UserCollection = require('../../models/userCollection');

var Document = React.createClass({
    mixins: [ Swarm.ReactMixin ],
    statics: {
        modelType: "Text"
    },
    gitInitialState: function() {
        return {
            user: null,
            users: [],
            disconnected: false
        };
    },
    componentDidMount: function() {
        this.userInit();
        this.collectionInit();
        this.setCheckInterval();
    },
    componentWillUnmount: function() {
        clearInterval(this.intervalID);
    },
    componentDidUpdate: function() {
        var date = new Date();
        var time = date.valueOf();
        this.state.user.set({lastActive: time});
    },
    userInit: function() {   
        var localuserID = window.localStorage.getItem('localuserID');
        if (!localuserID) {
            var sessiondId = window.localStorage.getItem('localuser');
            var user = User.create(sessiondId);
            console.log(user);
            window.localStorage.setItem('localuserID', '/User#' + user._id);
        } else {
        var user = Swarm.env.localhost.get(localuserID);
        }
        this.setState({user: user});
    },
    collectionInit: function() {
        collection = Swarm.env.localhost.get('/UserCollection#' + this.sync._id);
        var user = this.state.user;
        console.log(this.state.user);
        console.log(collection);
        if (collection != null) {
            collection.addUnique(user);
        }  else {
            collection = new UserCollection({_id: this.sync._id});
            collection.addUnique(user);
        }
        this.setState({users: collection, disconnected: false});
        this.forceUpdate();
    },
    setCheckInterval: function() {
        this.interval = 1000*60*3;
        this.intervalID = setInterval(this.usersCheck, this.interval);
    },
    usersCheck: function() {
        this.forceUpdate();
        var date = new Date;
        var time = date.valueOf();
        this.state.users.objects.forEach(function(obj) {
            if ((obj !== this.state.user) & ((time - obj.lastActive)  > this.interval)) {
                this.userDisconnect(obj);    
            }
        }, this);
    },
    userDisconnect: function(user) {
        collection.removeObject(collection.indexOf(user));
        this.setState({users: collection});
        console.log('User ' + user._id + ' disconnected');
        this.forceUpdate();
    },
    render: function() {
        var doc = this.sync;
        return (
            <div className="main-wrap cf js-get-main-wrap">
                <Top user={this.state.user}/>
                <div className="main main--padding">
                    <div className="col col--left w--20">
                        <div className="folders">
                        </div>
                    </div>
                    <div className="col w--65">
                        <Doc doc={doc} users={this.state.users} user={this.state.user}/>
                    </div>
                    <div className="col col--right w--15">
                    </div>
                </div>
                <Bottom key={doc._id} users={this.state.users} user={this.state.user}/>
            </div>
        );
    }
});
