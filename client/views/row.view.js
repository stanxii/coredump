
// use more human express
/*
define( function(require) {
var $ = require('jquery'),
_ = require('underscore'),
Backbone = require('backbone'),
Handlebars = require('handlebars'),
SomeModel = require('SomeModel'),
SomeCollection = require('SomeCollection'),
Template = require('text!templates/table.template.html');
....
});
 */
//The application
define([ 'jquery', 'underscore', 'backbone', 'handlebars', 'PersonModel',
		'PeopleCollection', 'text!templates/row.template.html' ], function($,
		_, Backbone, Handlebars, Person, People, rowTemplate) {
	'use strict';
	var RowView = Backbone.View.extend({
		template : Handlebars.compile(rowTemplate),
		events : {
			"click .age" : function() {
				console.log(this.model.get("name"));
			}
		},
		model : People.models,
		initialize : function() {
			this.listenTo(this.model, 'change', this.render);
		},
		render : function() {
			var html = this.template(this.model.toJSON());
			//this.$el.html(html);
			this.setElement($(html));
			//$(this.el).html(html);
			//this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});
	return RowView;
});

