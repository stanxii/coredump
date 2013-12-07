
  require.config({
    baseUrl: '../',
    paths: {
      jquery: '/client_js/vendor/jquery-2.0.3.min',
      bootstrap: '/client_js/vendor/bootstrap/js/bootstrap.min',
      underscore: '/client_js/vendor/underscore-min',
      backbone: '/client_js/vendor/backbone-min',
      socketio: '../socket.io/socket.io',
      text: '/client_js/vendor/text',
      handlebars: '/client_js/vendor/handlebars-v1.1.2',
      json: '/client_js/vendor/json2',
      oapp: '/client_js/myapp',
      router: '/client/routes/router',
      templates: '/client/templates/',
      clientjs: '/client/js',
      views: '/client/views',
      models: '/client/models/',
      collections: '/client/collections/',
      PeopleCollection: '/client/collections/people.collection',
      PersonModel: '/client/models/person.model',
      TableView: 'client/views/table.view',
    },

    shim: {
      'underscore': {
        exports: '_'
      },

      'backbone': {
        deps: ['jquery', 'underscore'],
        exports: 'Backbone'
      },

      'handlebars': {
        deps: ['jquery' ],
        exports: 'Handlebars'
      },

      'bootstrap': {
        deps: ['jquery'],
        exports: 'Bootstrap'
      },


    }

});

//1. load app.js guolu.js
//2. bootstrapping appliacation

define(['oapp','bootstrap'], function(app, bootstrap) {
  $(document).ready(function() {
    console.log("Dom is ready");
  });
  app.initialize();
});
