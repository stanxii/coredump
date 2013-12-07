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

/*
   define(['jquery','underscore','backbone','handlebars','collections/people.collection','models/jinliao.model','models/chuzha.model','TableView','views/chuzha.view', 'views/page.jinliao.view' ],
      function($, _, Backbone, Handlebars, People,Jinliao,Chuzha, TableView, ChuzhaView, JinliaoView) {

*/
   define( function(require) {
     var $                   = require('jquery'),
         _                   = require('underscore'),
         Backbone            = require('backbone'),
         Handlebars          = require('handlebars'),
         People              = require('collections/people.collection'),
         Alarm               = require('models/alarm.model'),
         Alarms              = require('collections/alarm.collection'),
         Jinliao             = require('models/jinliao.model'),
         Chuzha              = require('models/chuzha.model'),
         TableView           = require('TableView'),
         ChuzhaView          = require('views/chuzha.view'),
         JinliaoView         = require('views/page.jinliao.view'),
         YinfengjiView       = require('views/yinfengji.view'),
         ShuibengView        = require('views/shuibeng.view'),
         WenduView           = require('views/wendu.view'),
         AlarmView           = require('views/alarm.view'),
         GufengjiView        = require('views/gufengji.view');

      'use strict';
      var Router = Backbone.Router.extend({
      //defien routes and mapping route to the function
         routes: {
           '': 'showHome',  //homeView
           'home': 'showHome', //show homeview also
           'jinliao': 'showJinliao', //show homeview also
           'chuzha': 'showChuzha', //show homeview also
           'yinfengji': 'showYinfengji', //show homeview also
           'shuibeng': 'showShuibeng', //show homeview also
           'wendu': 'showWendu', //show homeview also
           'gufengji': 'showGufengji', //show homeview also
         },


        
         renderAlarmBlock: function() {
                       //alarmview
			var alarmdata = [ {
				'title' : 'stan 温度告警',
				'dtime' : '11/27 2013',
				'alarmcode' : 37,
				'alarmposition' : '11/27 2013'
			}, {
				'title' : 'stan 温度告警',
				'dtime' : '11/27 2013',
				'alarmcode' : 37,
				'alarmposition' : '11/27 2013'
			}, {
				'title' : 'stan 温度告警',
				'dtime' : '11/27 2013',
				'alarmcode' : 37,
				'alarmposition' : '11/27 2013'
			}, ];
	
			var alarms = new Alarms(alarmdata);
			var alarmView = this.AlarmView || new AlarmView({
				collection : alarms 
			});
			$("#alarm").replaceWith(alarmView.render().$el);
 
         },

         showHome: function(actions) {
             
			// will render homeview and navigate to homeView
			var data = [ {
				'name' : 'stan',
				'age' : 37,
				'regdate' : '11/27 2013'
			}, {
				'name' : 'frank',
				'age' : 30,
				'regdate' : '11/27 2013'
			}, {
				'name' : '你新龙',
				'age' : 20,
				'regdate' : '11/27 2013'
			}, ];
			var people = new People(data);
			var tableView = new TableView({
				collection : people
			});
			console.log($("#page"));
                        $("#page").replaceWith('<div id="page"><div id="myusers" class="inner"/></div>');
			//$(".inner").replaceWith(tableView.render().$el);
			$("#myusers").append(tableView.render().$el);

			this.renderAlarmBlock();

        },    

         showJinliao: function(actions) {
           //will render homeview and navigate to homeView
            var data= {'jinliaoAction1': 1, 'jinliaoAction2': 2 }; 
            var jinliao= new Jinliao(data);
            var jinliaoView = new JinliaoView({
                 model: jinliao 
                });
             jinliaoView.render();
             console.log($("#page"));
             $("#page").replaceWith('<div id="page"><div id="jinliao" class="inner"/></div>');
               
             //$(".inner").append(tableView.render().$el);
             $("#jinliao").replaceWith(jinliaoView.render().$el);
             $('li[class="active"]').removeClass("active");
             $('a[href="#jinliao"]').parent().attr("class","active");

	     this.renderAlarmBlock();
         },
   
        showChuzha: function(actions) {
           //will render homeview and navigate to homeView
            var data= {'chuzhaAction1': 1, 'chuzhaAction2': 2 }; 
            var chuzha= new Chuzha(data);
            var chuzhaView = new ChuzhaView({
                 model: chuzha 
                });
             chuzhaView.render();
             console.log($("#page"));
             $("#page").replaceWith('<div id="page"><div id="chuzha" class="inner"/></div>');
               
             //$(".inner").append(tableView.render().$el);
             $("#chuzha").replaceWith(chuzhaView.render().$el);
             $('li[class="active"]').removeClass("active");
             $('a[href="#chuzha"]').parent().attr("class","active");

	     this.renderAlarmBlock();

         },

        showYinfengji: function(actions) {
            var data= {'chuzhaAction1': 1, 'chuzhaAction2': 2 }; 
            var chuzha= new Chuzha(data);
            var yinfengjiView = new YinfengjiView({
                 model: chuzha 
                });
             yinfengjiView.render();
             console.log($("#page"));
             $("#page").replaceWith('<div id="page"><div id="yinfengji" class="inner"/></div>');
               
             //$(".inner").append(tableView.render().$el);
             $("#yinfengji").replaceWith(yinfengjiView.render().$el);

      
             $('li[class="active"]').removeClass("active");
             $('a[href="#yinfengji"]').parent().attr("class","active");
           
              var g1 = new JustGage({
                  id: "gauge.yinfeng.freq",
                  value: getRandomInt(0, 1500),
                  min: 0,
                  max: 1500,
                  title: "炉膛温度",
                  label: "temperature"
                });

                var g1 = new JustGage({
                  id: "gauge.yinfeng.current",
                  value: getRandomInt(0, 1500),
                  min: 0,
                  max: 1500,
                  title: "炉膛温度",
                  label: "temperature"
                });

	     this.renderAlarmBlock();

        },

        showShuibeng: function(actions) {
            var data= {'chuzhaAction1': 1, 'chuzhaAction2': 2 }; 
            var chuzha= new Chuzha(data);
            var shuibengiew = new ShuibengView({
                 model: chuzha 
                });
             shuibengiew.render();
             console.log($("#page"));
             $("#page").replaceWith('<div id="page"><div id="shuibeng" class="inner"/></div>');
               
             //$(".inner").append(tableView.render().$el);
             $("#shuibeng").replaceWith(shuibengiew.render().$el);
             $('li[class="active"]').removeClass("active");
             $('a[href="#shuibeng"]').parent().attr("class","active");

	     this.renderAlarmBlock();
        },

        showWendu: function(actions) {
            var data= {'chuzhaAction1': 1, 'chuzhaAction2': 2 }; 
            var chuzha= new Chuzha(data);
            var wenduView = new WenduView({
                 model: chuzha 
                });
             wenduView.render();
             console.log($("#page"));
             $("#page").replaceWith('<div id="page"><div id="wendu" class="inner"/></div>');
               
             //$(".inner").append(tableView.render().$el);
             $("#wendu").replaceWith(wenduView.render().$el);
	        var g1 = new JustGage({
		  id: "gauge.lutang", 
		  value: getRandomInt(0, 1500), 
		  min: 0,
		  max: 1500,
		  title: "炉膛温度",
		  label: "temperature"
		});

	        var g1 = new JustGage({
		  id: "gauge.lukou", 
		  value: getRandomInt(0, 1500), 
		  min: 0,
		  max: 1500,
		  title: "炉口温度",
		  label: "temperature"
		});
	        var g1 = new JustGage({
		  id: "gauge.ran2rukou", 
		  value: getRandomInt(0, 1500), 
		  min: 0,
		  max: 1500,
		  title: "二燃室入口温度",
		  label: "temperature"
		});

	        var g1 = new JustGage({
		  id: "gauge.ran2chukou", 
		  value: getRandomInt(0, 1500), 
		  min: 0,
		  max: 1500,
		  title: "二燃室出口温度",
		  label: "temperature"
		});

	        var g1 = new JustGage({
		  id: "gauge.budairu", 
		  value: getRandomInt(0, 1500), 
		  min: 0,
		  max: 1500,
		  title: "布袋入温度",
		  label: "temperature"
		});
	        var g1 = new JustGage({
		  id: "gauge.budaichu", 
		  value: getRandomInt(0, 1500), 
		  min: 0,
		  max: 1500,
		  title: "布袋出温度",
		  label: "temperature"
		});

             $('li[class="active"]').removeClass("active");
             $('a[href="#wendu"]').parent().attr("class","active");

	     this.renderAlarmBlock();
        },
 
        showGufengji: function(actions) {
            var data= {'chuzhaAction1': 1, 'chuzhaAction2': 2 }; 
            var chuzha= new Chuzha(data);
            var gufengjiView = new GufengjiView({
                 model: chuzha 
                });
             gufengjiView.render();
             console.log($("#page"));
             $("#page").replaceWith('<div id="page"><div id="gufengji" class="inner"/></div>');
               
             //$(".inner").append(tableView.render().$el);
             $("#gufengji").replaceWith(gufengjiView.render().$el);
             $('li[class="active"]').removeClass("active");
             $('a[href="#gufengji"]').parent().attr("class","active");

	     this.renderAlarmBlock();
        },
       }); 

      return Router;
   
});
