'use strict';

// Angular module, defining routes for the app
var gooddemo = angular.module('polls', [ 
  'ngRoute',
  'pollServices'
])
  .config(['$routeProvider', function($routeProvider) {
		$routeProvider.
			when('/polls', { templateUrl: 'partials/list.html', controller: PollListCtrl }).
			when('/alarms', { templateUrl: 'partials/alarm-list.html', controller: SearchAlarmCtrl}).
			when('/poll/:pollId', { templateUrl: 'partials/item.html', controller: PollItemCtrl }).
			when('/new', { templateUrl: 'partials/new.html', controller: SearchAlarmCtrl }).
			// If invalid route, just redirect to the main list view
			otherwise({ redirectTo: '/alarms' });
	}]);
	
