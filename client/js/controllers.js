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
[   '$rootScope', '$scope', '$http', '$location', 'Auth',
function($rootScope, $scope, $http, $location,  Auth) {

    $scope.tag = "";

    $scope.question = {               
        "title": "no title",
        "asker": 1,
		"tags": [],
        "description": "",
        "asktime":"",
		"urlimg": "",
        "voteup": 0,
        "votedown":0,
        "views":0,
        "answers": 0        
    };

    $scope.askQuestion = function() {
		$scope.question.urlimg = Auth.user.urlimg;

        console.log("tagname=" + $scope.tag);
        //search tag id by tagname

        //push tagid
        $scope.question.tags.push(3);

        var jsondata = $scope.question ;        

        ///////////////////
        var url = '/askquestion';
        var postCfg = {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                   /* transformRequest: transFn*/
                };
        

        //$http.post(url, jsondata, postCfg)
        $http.post(url, jsondata)
            .success(function(data, status){
                if(data.status === "ok"){
                   
                    console.log("ok ask questions =" + data.qid);
                    console.log("send:questions.ask.res alarms list" + JSON.stringify(data));         
                    $location.path('/questions/' + data.qid);
                }
                else
                    return;
            })
            .error(function(data, status) {
                $scope.data = data || "Request failed";
                $scope.status = status;
            });
        //////////////////
    }

}]);



angular.module('nggl')
.controller('QuestionsDetailCtrl',
[   '$rootScope', '$scope', '$routeParams', '$http', '$location', 'Auth',
function($rootScope, $scope, $routeParams, $http, $location, Auth) {

    // $routeParams.qid

    console.log("now questionid = " +  $routeParams.qid);
    var jsondata = {
            qid : $routeParams.qid
        }
    //socket.emit('send:questions.question' , jsondata);

     ///////////////////
        var url = '/get-question/'+ jsondata.qid;
       
    $scope.question;

    $http.post(url, jsondata)
            .success(function(data, status){
                if(data.status === "ok"){
                    $scope.question = data.question;
                    console.log("questions =" + $scope.question);
                }
                else
                    return;
            })
            .error(function(data, status) {
                $scope.data = data || "Request failed";
                $scope.status = status;
            });


        
        //////////////////

    
    $scope.newanswer = {               
        askerid: "",
        imageUrl: Auth.user.urlimg,
		answer_dt: "",
        description: "",		
		qid: $routeParams.qid,
    };
	
	$scope.submitAnswer = function() {			
        var jsondata = $scope.newanswer ;		
        
    }

  
    
}]);

angular.module('nggl')
.controller('QuestionsTopCtrl',
[   '$rootScope', '$scope', '$http', '$location',  
function($rootScope, $scope, $http, $location) {

    // $routeParams.qid

    console.log("now get top 100 questions  = ");
    $scope.userQuery = "*";
    var jsondata = {
            qnum : 10,
            userQuery: $scope.userQuery
        }
    
     $scope.getQid = function(question) {
        return question._id;
    }

    var url = '/home-top-questions';
    var postCfg = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
               /* transformRequest: transFn*/
            };
    

    //$http.post(url, jsondata, postCfg)
    $http.post(url, jsondata)
            .success(function(data, status){
                if(data.status === "ok"){
                    $scope.questions = data.questions;
                    console.log("questions =" + $scope.questions);
                }
                else
                    return;
            })
            .error(function(data, status) {
                $scope.data = data || "Request failed";
                $scope.status = status;
            });
    
}]);

angular.module('nggl')
.controller('QuestionsUserCtrl',
[   '$rootScope', '$scope', '$http', '$location', 'Auth',
function($rootScope, $scope, $http, $location, Auth) {
	$scope.user = Auth.user;
    
}]);
