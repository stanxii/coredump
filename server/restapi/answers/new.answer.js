
var innerNewAnswer = function(esclient, redis, req, res, qid, question, newanswer){
	//create a id
		console.log("ininer");
		redis.incr("global:answerid", function(err, answerid){
			var result = {
                  status:"ok",
                  answerid: 0
                };

	console.log("question 111===" + question);

            console.log("question 22===" + question);
			//create index in es
			esclient.index({
			  index: 'questions',
			  type: 'answers',
			  id: answerid,
			  parent: qid,
			  body: newanswer
			}, function (error, response) {
			  // ...
			  if(error){
			  	result.status = "failed";
			  }else{
			  	

			  	redis.get("global:top:question:n", function(err, topn) {
			  		//top n questions redis list
			  		if(topn){			  	
			  			//delete from unanswers questions sorted set
			  			redis.zrem('unanswers.question', qid, function(){
			  				//add hot sorted set queue score = answers + votes.
			  				    var hotqueue = 'hot.questions';
				  				redis.zcard(hotqueue, function(err, response){
					  				if(err)return;
					  				console.log("now hot zcard=" + response);
					  				console.log("now hot zcard=" + JSON.stringify(question));
					  				//score ==answers + votes
					  				var scores = question.voteup - question.votedown + question.answers ;
					  				if(response >=50 ){
					  					//rem last
					  					zremrangebyrank(hotqueue, 0, 0,function(){
					  						redis.zadd(hotqueue, scores, qid, function(err, response) {
								  				if(err) throw err;
								  				res.json(result);
								  			});
					  					});
					  				}else{

					  					redis.zadd(hotqueue, scores, qid, function(err, response) {
								  				if(err) throw err;
								  				res.json(result);
								  			});
					  				}
			  		       });

			  			});

			  			redis.lpush('last.questions', qid);	
			  			redis.ltrim('last.questions', 0, topn);
			  			result.qid = qid;
			  			res.json(result);
			  		}else{
			  			result.status = "failed";
			  			res.json(result);
			  		}
					
				
			  	});  
				
								
			  }
			  
			});
		});
};

module.exports = {
    newAnswer: function(esclient, redis, req, res) {
       
        console.log(req.body);//请求中还有参数data,data的值为一个json字符串
	    // var data= eval_r('(' + req.body.data + ')');//需要将json字符串转换为json对象
		// console.log("data="+data.PhoneNumber);
	    //console.log(req.body.topn);//解析json格式数据
		res.contentType('json');//返回的数据类型

		var jsondata = req.body;

		var newanswer = jsondata.answer;
		
		//set asktime fieldfformat
		var moment = require('moment-timezone');
        var anstime = moment.tz(new Date(), "Asia/Shanghai").format();
        anstime = anstime.substring(0, anstime.indexOf('+'));
        anstime +='Z';
        newanswer.anstime = anstime;


		var userquery = {index: 'questions', type: 'question', id: jsondata.qid ,
					     body:{
					     	"script": "ctx._source.answers += 1"
					     }
	         };
        //get parent
        esclient.update( userquery, function(error, upres){	
        	if(error){
        		console.log(error);        		
        	}else{
        		var getquery = {index: 'questions', type: 'question', id: jsondata.qid };
        		 esclient.get( getquery, function(error, getquestion){
        		 	if(error){
        		 		console.log(error);        		
        		 		return;
        		 	}else{
        		 		console.log("update.....=" + JSON.stringify(getquestion));		        		
		        		innerNewAnswer(esclient, redis, req, res, getquestion._id, getquestion._source, newanswer);	
        		 	}        		 	
        		 });        		
        	}					  						   
	    });


        //////////////////////////////

		
        
    }
};