
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
   define(['jquery','underscore','backbone','handlebars','PersonModel','PeopleCollection','views/row.view','text!templates/table.template.html'],
      function($, _, Backbone, Handlebars,  Person, People, RowView,tableTemplate) {

      'use strict';
      var TableView = Backbone.View.extend({
        tagName: 'div',
        className: 'usertable',

        initialize: function() {
          _.bindAll(this, 'render', 'renderOneRow');
          if(this.model) {
            this.lisenTo(model, 'change', this.render);
            console.log(this.model);
          }
        },

       template: Handlebars.compile(tableTemplate),

        render: function() {
         
          var html = this.template();
          this.$el.html(html);
          this.collection.each(this.renderOneRow);
          return this;
        },
   
        renderOneRow: function(model) {
          var row = new RowView({model: model});
          //alert(row.el + ' ' + row.$el);

          this.$("tbody").append(row.render().$el);
          this.$("tr").removeClass();
          this.$("tbody tr:last").attr("class","danger");
          this.$("th").attr("class","tableview-sorting tableview-sorting-asc");
          return this;
        }
      });

       return TableView; 
    });
