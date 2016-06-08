var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var Link = ReactRouter.Link;
var browserHistory = ReactRouter.browserHistory;

var Home = require('./home');
var Document = require('./document');

var routes = module.exports = (
    <Router history={browserHistory}>
        <Route path="/:id" component={Document}/>
        <Route path="/" component={Home}>
            <IndexRoute component={Home} />
        </Route>
    </Router>
);

ReactDOM.render(routes, document.getElementById('content'));
