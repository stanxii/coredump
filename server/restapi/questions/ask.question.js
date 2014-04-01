var _ =           require('underscore');

var moment = require('moment-timezone');

module.exports = {
    askquestion: function(esclient, redis, req, res) {
       
        console.log(req.body);//请求中还有参数data,data的值为一个json字符串
	    // var data= eval_r('(' + req.body.data + ')');//需要将json字符串转换为json对象
		// console.log("data="+data.PhoneNumber);
	    //console.log(req.body.topn);//解析json格式数据
		res.contentType('json');//返回的数据类型

		var jsondata = req.body;
		
		//set asktime fieldfformat
		
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

			//create index in es
			client.create({
			  index: 'question',
			  type: 'question',
			  id: qid,
			  body: jsondata
			}, function (error, response) {
			  // ...
			  if(error){
			  	result.status = "failed";
			  }else{
			  	var topn = redis.get("global:top:question:n");  
				//top n questions redis list
				redis.lpush('last.questions', qid);
				redis.ltrim('last.questions', 0, topn);
				result.qid = qid;				
			  }
			  res.json(result);
			});
		});
        
    }
};