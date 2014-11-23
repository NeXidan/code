var app = app || {};

app.MainAppView = Backbone.View.extend({
    initialize: function (options) {
        app.usersCollection = new app.UsersCollection();
        app.cursorsCollection = new app.CursorsCollection();
        app.textModel = new app.TextModel();
        app.editorController = new app.EditorView({
          el: '#editor-field',
          usersCollection: app.usersCollection,
          cursorsCollection: app.cursorsCollection,
          textModel: app.textModel
        });

        this.swarmStart();
        this.textSyncStart();

    },

    getUsername: function () {
        var name = prompt('Введите логин');
        if (/\w/.test(name)) {
            return name;
        } else {
            return getLogin();
        }
    },

    getRandomColor: function () {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    },

    swarmStart: function () {
        var username = this.getUsername();
        var Swarm = require('swarm');
        var swarmHost = new Swarm.Host(username);
        swarmHost.connect('ws://' + window.location.host.split(':')[0] + ':9999');
        jQuery('.profile__name').text(username);
    },

    textSyncStart: function () {
        var aceEditor = app.editorController.editor.ace;
        var isUpdateWaiting = true;
        var Text = require('swarm/lib/Text');
        var syncText = new Text('TextArea2');

        function updateEditorText() {
            isUpdateWaiting = false;
            app.textModel.set('text', syncText.text);
            isUpdateWaiting = true;
        }

        // событие по изменению положения курсора
        aceEditor.session.selection.on('changeCursor', function () {
            // app.editorController.editor.getCursor() - получение позиции курсора. здесь мы должны отправлять ее на сервер
            // console.log(app.editorController.editor.getCursor());
        });

        aceEditor.on('change', function () {
            if (isUpdateWaiting) {
                syncText.set(aceEditor.getValue());
            }
        });

        syncText.on('init', updateEditorText);

        syncText.on(function (spec, val, source) {
            updateEditorText();
        });
    }
});

var testUsers =  [
    {id: '0', name: 'User 0', isOnline: false},
    {id: '1', name: 'User 1', isOnline: false},
    {id: '2', name: 'User 2', isOnline: true},
    {id: '3', name: 'User 3', isOnline: false},
    {id: '4', name: 'User 4', isOnline: false},
    {id: '5', name: 'User 5', isOnline: true},
    {id: '6', name: 'User 6', isOnline: false}
];

$(document).ready(function () {
    var App = new app.MainAppView();
});
