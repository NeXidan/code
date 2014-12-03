var app = app || {};

app.TextModel = Backbone.Model.extend ({
    defaults: function () {
        return {
            text: 'test model string'
        };
    },

    initialize: function () {
        console.log('init');
    }
});
