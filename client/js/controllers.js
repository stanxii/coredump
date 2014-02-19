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
.controller('JinliaoCtrl',
[        '$rootScope', '$scope', 'socket', 
function($rootScope, $scope, socket) {
    $scope.myvalid = false;

    $scope.jinliaoAction = function(action) {
            
        console.log("now myvalidis true");
        
        $scope.myvalid=function(e){               
               return false;
       };

        var jsondata = '{"cmd":"jinliao","action":"' + action + '"}';
        socket.emit('send:jinliao' , jsondata);
    }
}]);

angular.module('nggl')
.controller('ChuzhaCtrl',
[        '$rootScope', '$scope', 'socket', 
function($rootScope, $scope, socket) {
    $scope.chuzhaAction = function(action) {
        var jsondata = '{"cmd":"chuzha","action":"' + action + '"}';
        socket.emit('send:chuzha' , jsondata);
    }
}]);

angular.module('nggl')
.controller('YinfengjiCtrl',
[        '$rootScope', '$scope', 'socket', 
function($rootScope, $scope, socket) {
   
    $scope.yinfengjiAction = function(action) {
        var jsondata = '{"cmd":"yinfengji","action":"' + action + '"}';
        socket.emit('send:yinfengji' , jsondata);
    }

   $scope.value1 = 42;
   $scope.value2 = 68;

    setInterval(function(){
        $scope.$apply(function() {
            $scope.value1 = getRandomInt(10, 90);
            $scope.value2 = getRandomInt(1, 99);
        });
    }, 1000);
}]);

angular.module('nggl')
.controller('ShuibengCtrl',
[   '$rootScope', '$scope', 'socket', 
function($rootScope, $scope, socket) {
    $scope.shuibengAction = function(action) {
        var jsondata = '{"cmd":"shuibeng","action":"' + action + '"}';
        socket.emit('send:shuibeng' , jsondata);
    }
}]);


angular.module('nggl')
.controller('WenduCtrl',
[            '$rootScope', '$scope', 'socket', 
     function($rootScope, $scope, socket) {

    $scope.lutang = 32;  
   $scope.lukou = 34;  
   $scope.ranshi2ru = 38;  
   $scope.ranshi2chu = 42;  
   $scope.budairu = 44;  
   $scope.budaichu = 50; 

    socket.on('init', function (data) {
        $scope.lutang = data.name;
        $scope.users = data.users;
     });

    socket.on('send:lutang', function (data) {
         console.log("recive lutang" + data);
         $scope.lutang = data.temp;
    });
    socket.on('send:lukou', function (data) {
         console.log("recive lukou" + data);
         $scope.lukou = data.temp;
    });
    socket.on('send:ranshi2ru', function (data) {
         console.log("recive ranshi2ru" + data);
         $scope.ranshi2ru = data.temp;
    });
    socket.on('send:ranshi2chu', function (data) {
         console.log("recive ranshi2chu" + data);
         $scope.ranshi2chu = data.temp;
    });
    socket.on('send:budairu', function (data) {
         console.log("recive budairu" + data);
         $scope.budairu = data.temp;
    });
    socket.on('send:budaichu', function (data) {
         console.log("recive budaichu" + data);
         $scope.budaichu = data.temp;
    });

/*
    socket.on('send:alarm', function (data) {
        console.log("recive alarm" + data);
        $scope.lutang = data.temp;
        $scope.lukou = data.temp;
        $scope.ranshi2ru = data.temp;
        $scope.ranshi2chu = data.temp;
        $scope.budairu = data.temp;
        $scope.budaichu = data.temp;
    });

    socket.on('send:trap', function (data) {
        console.log("receive trap" + data);
        $scope.lutang = data.temp;
        $scope.lukou = data.temp;
        $scope.ranshi2ru = data.temp;
        $scope.ranshi2chu = data.temp;
        $scope.budairu = data.temp;
        $scope.budaichu = data.temp;
    });
*/

   

   /*
    setInterval(function(){
        $scope.$apply(function() {
        $scope.lutang = getRandomInt(10, 90);
        $scope.lukou = getRandomInt(10, 90);
        $scope.ranshi2ru = getRandomInt(10, 90);
        $scope.ranshi2chu = getRandomInt(10, 90);
        $scope.budairu = getRandomInt(10, 90);
        $scope.budaichu = getRandomInt(10, 90);

           
        });
    }, 1000);

    */
}]);

angular.module('nggl')
.controller('GufengjiCtrl',
[   '$rootScope', '$scope', 'socket', 
function($rootScope, $scope, socket) {
    $scope.gufengjiAction = function(action) {
        var jsondata = '{"cmd":"gufengji","action":"' + action + '"}';
        socket.emit('send:gufengji' , jsondata);
    }
}]);

angular.module('nggl')
.controller('GlobalconfigCtrl',
[   '$rootScope', '$scope', 'socket', 
function($rootScope, $scope, socket) {
    $scope.globalconfigAction = function(action) {
        var jsondata = '{"cmd":"config","action":"' + action + '"}';
        socket.emit('send:config' , jsondata);
    }
}]);

angular.module('nggl')
.controller('AlarmsCtrl',
[   '$rootScope', '$scope', 'socket', 
function($rootScope, $scope, socket) {   


   

   
    $scope.salarm = {
        //Dt: Date.now(),       
        startdate: new Date(new Date()-24*60*60*1000),
        enddate: new Date(),
        level: "high",
        temp: 200,
        orderProp: "alarmtime",
    };

    //var jsondata = '{"_id":"gufengji","action":"' + action + '"}';

    var v = {};
       v.startdate = $scope.salarm.startdate.getTime();
       v.enddate = $scope.salarm.enddate.getTime();
       v.level = $scope.salarm.level;      
       v.orderProp = $scope.salarm.orderProp;


    socket.emit('send:alarms.list' , v);

    //for list 
    $scope.search = function(salarm) {
       var jsondata = {};
       jsondata.startdate = salarm.startdate.getTime();
       jsondata.enddate = salarm.enddate.getTime();
       jsondata.level = salarm.level;      
       jsondata.orderProp = salarm.orderProp;

       console.log("Action == salarm=" + JSON.stringify(jsondata));
        socket.emit('send:alarms.list' , jsondata);
    }


    socket.on('send:alarms.list.res', function (data) {
         console.log("send:alarms.list.res alarms list" + JSON.stringify(data));
         $scope.alarms = data;
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
        console.log("send:questions.top.res alarms list" + JSON.stringify(data));         
         
        if(data.result === "ok")
            $scope.questions = data.questions;
        else
            return;

    });
    
}]);
