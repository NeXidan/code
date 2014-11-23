var app = app || {};

app.EditorView = Backbone.View.extend ({
    options: {
        prop: 'test original'
    },
    events: {
        'click input': 'chk'
    },
    initialize: function (_options) {
        this.options = _.extend ({}, this.options, _options);
        this.usersCollection = this.options.usersCollection;
        this.cursorsCollection = this.options.cursorsCollection;
        this.textModel = this.options.textModel;

        this.themes = ['xcode', 'twilight'];
        this.syntax = ['text', 'javascript'];

        // event listeners
        this.cursorsCollection.on('reset', this.updateCursors, this);
        this.textModel.on('change', this.updateText, this);

        var _this = this;
        this.render();
    },

    updateText: function () {
        var currCursorPosition = this.editor.getCursor();
        this.editor.dataSet(this.textModel.get('text'));
        this.editor.setCursor(currCursorPosition.row, currCursorPosition.column);
    },

    updateCursors: function () {
        var data = JSON.parse(JSON.stringify(this.cursorsCollection.models));
        this.editor.updateOtherCursors(data);
    },

    onlineToggle: function (isOnline) { // 0

    },

    test: function () {
        alert('test!');
    },

    setTheme: function (index) {
        this.editor.ace.setTheme('ace/theme/' + this.themes[index]);
    },

    setSyntax: function (index) {
        this.editor.ace.getSession().setMode('ace/mode/'  + this.syntax[index]);
    },

    render: function () {
        var _this = this;
        var template = _.template($('#editor-template').html());
        this.$el.html(template);

        this.editor = new EditorManager({
            editorId: 'editor'
        });

        // сброс дефолтного пути до конфига
        ace.config.set('basePath', 'js/ace-additional/');
        this.editor.ace.getSession().setUseWorker(false);

        var themeSwitcher = $('#theme-switcher');
        var syntaxSwitcher = $('#syntax-switcher');

        themeSwitcher.on('change', function () {
            _this.setTheme(themeSwitcher.val());
        });
        syntaxSwitcher.on('change', function () {
            _this.setSyntax(syntaxSwitcher.val());
        });

        themeSwitcher.val(0);
        syntaxSwitcher.val(0);

        this.setTheme(0);
        this.setSyntax(0);

        return this;
    }
});
