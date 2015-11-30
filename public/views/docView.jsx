var React = require('react');
var Swarm = require('swarm');

var Doc = React.createClass({
    componentDidMount: function () {
        var doc = this.props.doc;
        editor = new EditorManager({
            editorId: 'editor',
            mode: doc.extension
        });
        editor.dataSet(doc.text);
        if (this.props.users !== undefined) {
            editor.updateOtherCursor(this.props.users.objects);
        }   
        editor.onChange(editor, doc);
    },

    componentWillUpdate: function () {
        var currCursorPosition = editor.getCursor(),
            currSession = editor.getSession();

        editor.dataSet(this.props.doc.text);

        if (this.props.user !== undefined) {
            this.props.user.set({row: currCursorPosition.row, col: currCursorPosition.column});
        }

        editor.setSession(currSession);
        editor.setCursor(currCursorPosition.row, currCursorPosition.column);
    },

    componentWillReceiveProps: function (nextProps) {
        if (nextProps.users !== undefined) {
            editor.updateOtherCursors(nextProps.users.objects, nextProps.user);
        }
    },

    render: function () {
        return (
            <div className='content' >
                <div id='editor'></div>
            </div>
        );
    }
});

module.exports = Doc;
