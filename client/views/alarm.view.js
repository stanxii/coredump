
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
   define(['jquery','underscore','backbone','handlebars','text!templates/alarm.template.html'],
      function($, _, Backbone, Handlebars,  alarmTemplate) {

      'use strict';
      var AlarmView = Backbone.View.extend({

        el: $('alarm'),
        template: Handlebars.compile(alarmTemplate),

        initialize: function() {
        },

        render: function() {
          var js = this.collection.toJSON(); 
          var html = this.template({alarms: js });
          this.setElement($(html));
          //this.$el.html(html);
	 // $(this.el).html(html);
          return this;
        },
   
      });

       return AlarmView; 
    });
