var _ref;
var Range  = ((_ref = ace.require) !== null ? _ref : require)('ace/range').Range;

EditorManager = function (options) {
    this.options = options;

    this.ace = ace.edit(this.options.editorId);
    ace.config.set('basePath', 'js/ace-additional/');
    this.ace.getSession().setUseWorker(true);
    this.ace.setTheme('ace/theme/xcode');

    this.setMode();

    this.otherCursors = [];
};

EditorManager.prototype.setMode = function () {
    switch (this.options.mode) {
        case 'js':
            this.ace.session.setMode('ace/mode/javascript');
            break;
        case 'html':
            this.ace.session.setMode('ace/mode/html');
            break;
        case 'css':
            this.ace.session.setMode('ace/mode/css');
            break;
        case 'json':
            this.ace.session.setMode('ace/mode/json');
            break;
        case 'java':
            this.ace.session.setMode('ace/mode/java');
            break;
        case 'jsx':
            this.ace.session.setMode('ace/mode/jsx');
            break;
        case 'php':
            this.ace.session.setMode('ace/mode/php');
            break;
        case 'scala':
            this.ace.session.setMode('ace/mode/scala');
            break;
        case 'scss':
            this.ace.session.setMode('ace/mode/scss');
            break;
        case 'c':
            this.ace.session.setMode('ace/mode/c_cpp');
            break;
        case 'cs':
            this.ace.session.setMode('ace/mode/csharp;');
            break;
        default:
            this.ace.session.setMode('ace/mode/text');
            break;
    }
};

EditorManager.prototype.setScroll = function (scroll) {
    this.ace.session.setScrollTop(scroll.top);
    this.ace.session.setScrollLeft(scroll.left);
};

EditorManager.prototype.getScroll = function () {
    return {
        top: this.ace.session.getScrollTop(),
        left: this.ace.session.getScrollLeft()
    };
};

EditorManager.prototype.getSelection = function () {
    return this.ace.selection.getRange();
};

EditorManager.prototype.setSelection = function (range) {
    this.ace.selection.setSelectionRange(range);
};

EditorManager.prototype.setCursor = function (cursor) {
    this.ace.moveCursorTo(cursor.row, cursor.col);
};

EditorManager.prototype.getCursor = function () {
    return this.ace.getCursorPosition();
};

EditorManager.prototype.getState = function () {
    return {
        cursor: this.getCursor(),
        scroll: this.getScroll(),
        selection: this.getSelection()
    };
};

EditorManager.prototype.setState = function (state) {
    state = state || {};

    if (state.cursor) {
        this.setCursor(state.state);
    }

    if (state.scroll) {
        this.setScroll(state.scroll);
    }

    if (state.selection) {
        this.setSelection(state.selection);
    }
};

EditorManager.prototype.saveState = function (callback) {
    var state = this.getState();

    callback(state);

    this.setState(state);
};

EditorManager.prototype.removeMarker = function () {
    this.ace.session.removeMarker(this.marker);
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
    this.otherCursors.forEach(function (el) {
        this.ace.session.removeMarker(el);
    }, this);

    this.otherCursors = [];

    data.forEach(function (el) {
        if (el !== user) {
            var range = new Range(el.row, el.col + 1,
                el.row, el.col + 2);
            this.otherCursors.push(
                this.ace.session.addMarker(
                    range,
                    'ace_active-line ace_cursor fake-cursor color-' + el.color.slice(1) + ' user-' + el._id,
                    'text'
                )
            );
        }
    }, this);
};

module.exports = EditorManager;
