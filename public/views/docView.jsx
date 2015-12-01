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
        var _this = this;

        editor.saveState(function (state) {
            editor.dataSet(_this.props.doc.text);

            if (_this.props.user !== undefined) {
                _this.props.user.set({row: state.cursor.row, col: state.cursor.column});
            }
        });
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
