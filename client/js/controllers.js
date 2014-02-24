'use strict';

/* Controllers */

angular.module('nggl')
.controller('NavCtrl', ['$rootScope', '$scope', '$location', 'Auth', function($rootScope, $scope, $location, Auth) {
    $scope.user = Auth.user;
    $scope.userRoles = Auth.userRoles;
    $scope.accessLevels = Auth.accessLevels;
	
	$scope.go = function ( path ) {
		$location.path( path );
	};


    $scope.logout = function() {
        Auth.logout(function() {
            $location.path('/login');
        }, function() {
            $rootScope.error = "Failed to logout";
        });
    };
}]);

angular.module('nggl')
.controller('LoginCtrl',
['$rootScope', '$scope', '$location', '$window', 'Auth', function($rootScope, $scope, $location, $window, Auth) {

    $scope.rememberme = true;
    $scope.login = function() {
        Auth.login({
                username: $scope.username,
                password: $scope.password,
                rememberme: $scope.rememberme
            },
            function(res) {
                $location.path('/');
            },
            function(err) {
                $rootScope.error = "Failed to login";
            });
    };

    $scope.loginOauth = function(provider) {
        $window.location.href = '/auth/' + provider;
    };
}]);

angular.module('nggl')
.controller('HomeCtrl',
['$rootScope', function($rootScope) {

}]);

angular.module('nggl')
.controller('RegisterCtrl',
['$rootScope', '$scope', '$location', 'Auth', function($rootScope, $scope, $location, Auth) {
    $scope.role = Auth.userRoles.user;
    $scope.userRoles = Auth.userRoles;

    $scope.register = function() {
        Auth.register({
                username: $scope.username,
                password: $scope.password,
                role: $scope.role
            },
            function() {
                $location.path('/');
            },
            function(err) {
                $rootScope.error = err;
            });
    };
}]);

angular.module('nggl')
.controller('PrivateCtrl',
['$rootScope', function($rootScope) {
}]);


angular.module('nggl')
.controller('AdminCtrl',
['$rootScope', , 'Users', 'Auth', function($rootScope, $scope, Users, Auth) {
    $scope.loading = true;
    $scope.userRoles = Auth.userRoles;

    Users.getAll(function(res) {
        $scope.users = res;
        $scope.loading = false;
    }, function(err) {
        $rootScope.error = "Failed to fetch users.";
        $scope.loading = false;
    });

}]);


angular.module('nggl')
.controller('QuestionsAskCtrl',
[   '$rootScope', '$scope', '$location', 'socket', 
function($rootScope, $scope, $location, socket) {


   

    $scope.question = {               
        title: "",
        description: ""        
    };

    $scope.askQuestion = function() {
        var jsondata = $scope.question ;
        socket.emit('send:questions.ask' , jsondata);
    }

    socket.on('send:questions.ask.res', function (data) {
        console.log("send:questions.ask.res alarms list" + JSON.stringify(data));         

        if(data.result == "ok")
            $location.path('/questions/' + data._id);
        else
            return;
    });

}]);

angular.module('nggl')
.controller('QuestionsDetailCtrl',
[   '$rootScope', '$scope', '$routeParams', '$location', 'socket', 
function($rootScope, $scope, $routeParams, $location, socket) {

    // $routeParams.qid

    console.log("now questionid = " +  $routeParams.qid);
    var jsondata = {
            qid : $routeParams.qid
        }
    socket.emit('send:questions.question' , jsondata);
    
    $scope.answer = {               
        askerid: "",
        imageUrl: "",
		snippet:"",
		answer_dt: "",
        answer_content: "",
		id: ""
    };
	
	$scope.submitAnswer = function() {
		answer.askerid = "";
		answer.imageUrl = "";
		answer.snippet = "";
		answer.answer_dt = "";
        var jsondata = $scope.answer ;
        socket.emit('send:questions.question' , jsondata);
    }

    socket.on('send:questions.question.res', function (data) {
        console.log("send:questions.ask.res alarms list" + JSON.stringify(data));         
         
        if(data.result === "ok"){
            $scope.question = data.question;
			//已记录的答案
			$scope.answers = [
				{     
					"id": "answerid1", 
					"imageUrl": "img/phones/motorola-xoom-with-wi-fi.0.jpg", 
					"snippet": "I've looked at dozen cellForRowAtIndexPath:h", 
					"tags": ["javascript","c++"],
					"answer_time":"20s ago",
					"answer_dt": "2014-1-1 07:07:07",
					"answer_content": "use use this code to solve it",
					"askerid":"chenliang"        
				}, 
				{        
					"id": "answerid2", 
					"imageUrl": "img/phones/motorola-xoom.0.jpg",     
					"snippet": "angular.dfgdgh", 
					"tags": ["javascript","c++"],
					"answer_time":"20s ago",        
					"answer_dt": "2014-1-1 07:07:07",
					"answer_content": "use use this code to ttt solve it",
					"askerid":"chenliang",                
				},
				{        
					"id": "answerid3", 
					"imageUrl": "img/phones/motorola-xoom.0.jpg",     
					"snippet": "angular.dfgdgh", 
					"tags": ["javascript","c++"],
					"answer_time":"20s ago",        
					"answer_dt": "2014-1-1 07:07:07",
					"answer_content": "use use this code to ttt solve it",
					"askerid":"chenliang",                
				},
				{        
					"id": "answerid4", 
					"imageUrl": "img/phones/motorola-xoom.0.jpg",     
					"snippet": "angular.dfgdgh", 
					"tags": ["javascript","c++"],
					"answer_time":"20s ago",        
					"answer_dt": "2014-1-1 07:07:07",
					"answer_content": "use use this code to ttt solve it",
					"askerid":"chenliang",                
				}
			];
        }else
            return;

    });
    
}]);

angular.module('nggl')
.controller('QuestionsTopCtrl',
[   '$rootScope', '$scope', '$location', 'socket', 
function($rootScope, $scope, $location, socket) {

    // $routeParams.qid

    console.log("now get top 100 questions  = ");
    $scope.userQuery = "*";
    var jsondata = {
            qnum : 100,
            userQuery: $scope.userQuery
        }
    socket.emit('send:questions.top' , jsondata);
    
    $scope.questions = [];
    var question = {
        title:"",
        description: ""
    }

    socket.on('send:questions.top.res', function (data) {
        //console.log("send:questions.top.res alarms list" + JSON.stringify(data));         
         
        if(data.result === "ok"){
            $scope.questions = data.questions;
        }
        else
            return;

    });
    
}]);
