var app = app || {};

app.UsersCollection = Backbone.Collection.extend ({
    model: app.UserModel,
    initialize: function () {
    }
});
