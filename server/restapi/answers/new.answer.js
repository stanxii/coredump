

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


		//create a id
		redis.incr("global:answerid", function(err, answerid){
			var result = {
                  status:"ok",
                  answerid: 0
                };

            console.log("answerid="+ answerid);    
			//create index in es
			esclient.index({
			  index: 'answers',
			  type: 'answer',
			  id: answerid,
			  parent: jsondata.qid,
			  body: newanswer
			}, function (error, response) {
			  // ...
			  if(error){
			  	result.status = "failed";
			  }else{
			  	
			  	redis.get("global:top:question:n", function(err, topn) {
			  		//top n questions redis list
			  		if(topn){
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
        
    }
};