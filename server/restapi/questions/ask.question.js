

module.exports = {
    askQuestion: function(esclient, redis, req, res) {
       
        console.log(req.body);//请求中还有参数data,data的值为一个json字符串
	    // var data= eval_r('(' + req.body.data + ')');//需要将json字符串转换为json对象
		// console.log("data="+data.PhoneNumber);
	    //console.log(req.body.topn);//解析json格式数据
		res.contentType('json');//返回的数据类型

		var jsondata = req.body;
		
		//set asktime fieldfformat
		var moment = require('moment-timezone');
        var asktime = moment.tz(new Date(), "Asia/Shanghai").format();
        asktime = asktime.substring(0, asktime.indexOf('+'));
        asktime +='Z';
        jsondata.asktime = asktime;


		//create a id
		redis.incr("global:qid", function(err, qid){
			var result = {
                  status:"ok",
                  qid: 0
                };

            console.log("qid="+ qid);    
			//create index in es
			esclient.index({
			  index: 'questions',
			  type: 'question',
			  id: qid,
			  body: jsondata
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