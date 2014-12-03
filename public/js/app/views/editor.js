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

        // event listeners
        this.cursorsCollection.on('reset', this.updateCursors, this);
        this.textModel.on('change', this.updateText, this);

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

    render: function () {
        var template = _.template($('#editor-template').html());
        this.$el.html(template);

        this.editor = new EditorManager({
            editorId: 'editor'
        });
        return this;
    }
});
