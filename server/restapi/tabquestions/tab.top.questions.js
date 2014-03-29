var _ =           require('underscore')
    , User =      require('../models/User.js');

module.exports = {    
    tabTopQuestions: function(client, req, res) {
        var topquestions = {};

	    console.log(req.body);//请求中还有参数data,data的值为一个json字符串
		// var data= eval_r('(' + req.body.data + ')');//需要将json字符串转换为json对象
		// console.log("data="+data.PhoneNumber);
	    console.log(req.body.qnum);//解析json格式数据
	    res.contentType('json');//返回的数据类型

	    var reqjson = req.body;

	    var userQuery = {};

        client.search({
          index: 'questions',
          type: 'question',                            
          body: {                
              query: {
                match_all: {}
              } ,
              size: reqjson.qnum,  
			        sort: {"asktime":"desc"}
          }
        }, function (error, response) {
            var result = {
                status:"ok",
                questions: ""
              }

            var questions = [];
              
            if (error) {
              // handle error
              result.questions = "failed";                
            }else{
            	result.questions = "ok"; 
            	for(var i= 0; i< response.hits.hits.length; i++ ){
                  questions.push(response.hits.hits[i]._source);
              }
              result.questions = questions;
            }
            //console.log("now search result = " + JSON.stringify(response));
          
            console.log("result ES ==" + JSON.stringify(res));
  			    res.send(result);//给客户端返回一个json格式的数据
             //res.json(topquestions);
  			    res.end();
             
          });

        
    }
};