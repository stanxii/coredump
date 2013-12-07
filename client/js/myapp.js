   
define(['jquery','underscore','backbone','handlebars','router'],
       function($, _, Backbone, Handlebars, Router) {
          'use strict';
          var init = function() {
                //create backbone router
                var router = new Router();
                Backbone.history.start();
          };

          return {
             initialize: init
          }
   });
