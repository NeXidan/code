var React = require('react');

var Swarm = require('swarm');

var App = React.createClass({
    render: function() {
        return (
            <html>
                <head>
                    <meta charSet="UTF-8"/>
                    <title>App Frontpage</title>
                    <link rel="shortcut icon"href="//yastatic.net/lego/_/pDu9OWAQKB0s2J9IojKpiS_Eho.ico"/>
                    <link rel="stylesheet" href="css/main.css"/>
                </head>
                <body>
                    {this.props.id ? <Document key={'/Text#' + this.props.id} /> : <Index />}
                    <script src="js/libs.js"/>
                    <script src="js/app.js"/>
                </body>
            </html>
        );
    }
});

module.exports = App;
