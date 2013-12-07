
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
   define(['jquery','underscore','backbone','handlebars','text!templates/chuzha.template.html'],
      function($, _, Backbone, Handlebars,  chuzhaTemplate) {

      'use strict';
      var ChuzhaView = Backbone.View.extend({

        tagName: 'div',
        template: Handlebars.compile(chuzhaTemplate),

        initialize: function() {
        },

        render: function() {
         
          var html = this.template(this.model.toJSON());
          this.setElement($(html));
          //this.$el.html(html);
          return this;
        },
   
      });

       return ChuzhaView; 
    });
