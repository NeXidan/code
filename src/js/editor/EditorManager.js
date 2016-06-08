var Range = ace.acequire('ace/range').Range;

var LANG_MAPPING = {
    js: 'javascript',
    html: 'html',
    css: 'css',
    json: 'json',
    java: 'java',
    jsx: 'jsx',
    php: 'php',
    scala: 'scala',
    scss: 'scss',
    c: 'c_cpp',
    cs: 'csharp'
};

var DEFAULT = 'text';

EditorManager = function (options) {
    this.options = options;

    this.ace = ace.edit(this.options.editorId);
    this.ace.getSession().setUseWorker(true);
    this.ace.setTheme('ace/theme/xcode');
    this.ace.$blockScrolling = Infinity; //disable warning

    this.setMode();

    this.otherCursors = [];
};

EditorManager.prototype.setMode = function () {
    var language = LANG_MAPPING[this.options.mode] || DEFAULT;

    this.ace.session.setMode('ace/mode/' + language);
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
        this.setCursor(state.cursor);
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
