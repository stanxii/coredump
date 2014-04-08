

module.exports = {
    detailQuestion: function(esclient, redis, req, res) {
       
       console.log("======detailQuestion=======");
        //console.log(req.body);//请求中还有参数data,data的值为一个json字符串
	    // var data= eval_r('(' + req.body.data + ')');//需要将json字符串转换为json对象
		// console.log("data="+data.PhoneNumber);
	    //console.log(req.body.topn);//解析json格式数据
		res.contentType('json');//返回的数据类型

		//var jsondata = req.body;
		
		var qid = req.param('qid');

		console.log("req param qid=" + qid);

		var result = {
                  status:"ok",
                  question: {},
                  answers: []
                };

		//create index in es
			esclient.get({
			  index: 'questions',
			  type: 'question',
			  id:qid			  
			}, function (error, response) {
			  // ...
			  if(error){			  	
			  	result.status = "failed";			  
			  	console.log("e rerrrrrrrr=====" + error);
			  }				  
			  result.question = response._source;

			  //query answers
			  
			  console.log("e result=====" + result);
			  res.json(result);				
			});
		

        
    }
};