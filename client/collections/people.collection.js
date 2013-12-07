
// use more human express 
/*
   define( function(require) {
     var $                   = require('jquery'),
         _                   = require('underscore'),
         Backbone            = require('backbone'),
         Handlebars          = require('handlebars'),
         SomeModel           = require('SomeModel'),
         SomeCollection      = require('SomeCollection'),
         Template            = require('text!templates/table.template.html');
         ....
    });
*/
          
   //The application
   define(['jquery','underscore','backbone','handlebars','PersonModel'],
      function($, _, Backbone, Handlebars, Person ) {

      var PeopleCollection= Backbone.Collection.extend({
          model: Person,
   
      });

      return PeopleCollection;
    });
