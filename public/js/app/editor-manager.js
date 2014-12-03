var _ref;
var Range  = ((_ref = ace.require) !== null ? _ref : require)('ace/range').Range;

EditorManager = function (options) {
    this.options = options;

    this.ace = ace.edit(this.options.editorId);
    ace.config.set('basePath', 'js/ace-additional/');
    this.ace.getSession().setUseWorker(false);
    this.ace.session.setMode('ace/mode/javascript');
    this.ace.setTheme('ace/theme/xcode');

    this.otherCursors = [];
};

EditorManager.prototype.setCursor = function (row, col) {
    this.ace.moveCursorTo(row, col);
};

EditorManager.prototype.removeMarker = function () {
    this.ace.session.removeMarker(this.marker);
};

EditorManager.prototype.getCursor = function () {
    return this.ace.getCursorPosition();
};

EditorManager.prototype.dataReplace = function (coords, data) {
    var range = new Range(coords.start.row, coords.start.col, coords.end.row, coords.end.col);
    this.ace.session.replace(range, data);
};

EditorManager.prototype.dataSet = function (data) {
    this.ace.session.setValue(data);
};

EditorManager.prototype.onChange = function (editor, doc) {
    this.ace.on('input', function () {
        var text = editor.ace.getValue();
        doc.set(text);
    });
};

EditorManager.prototype.updateOtherCursors = function (data, user) {
    for (var i = 0; i < this.otherCursors.length; i++) {
        this.ace.session.removeMarker(this.otherCursors[i]);
    }

    this.otherCursors = [];

    for (var n = 0; n < data.length; n++) {
        if (data[n] != user) {
            var range = new Range(data[n].row, data[n].col + 1,
                data[n].row, data[n].col + 2);
            this.otherCursors.push(
                this.ace.session.addMarker(
                    range,
                    'ace_active-line ace_cursor fake-cursor color-' + data[n].color.slice(1) + ' user-' + data[n]._id,
                    'text'
                )
            );
        }
    }
};

module.exports = EditorManager;
