var app = app || {};

app.UsersView = Backbone.View.extend ({
    options: {
        collection: null
    },

    events: {
        'click input': 'chk'
    },

    initialize: function (_options) {
        // this.options = _.extend ({}, _options, options);
        this.render();
    },

    render: function () {
        var template = _.template($('#user-template').html(), {items: this.collection.models});
        // this.$el.html(template);
        return this;
    }
});
