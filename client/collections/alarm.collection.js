
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
   define(['jquery','underscore','backbone','handlebars','models/alarm.model'],
      function($, _, Backbone, Handlebars, Alarm) {

      var AlarmCollection= Backbone.Collection.extend({
          model: Alarm,
   
      });

      return AlarmCollection;
    });
