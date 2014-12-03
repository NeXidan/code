var app = app || {};

app.CursorModel = Backbone.Model.extend ({
    defaults: function () {
        return {
            id: null,
            row: null,
            col: null,
            color: '#000'
        };
    },

    initialize: function () {

    }
});
