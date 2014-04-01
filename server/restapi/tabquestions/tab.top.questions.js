

module.exports = {    
    tabTopQuestions: function(esclient, redis, req, res) {
        var topquestions = {};

	    console.log(req.body);//请求中还有参数data,data的值为一个json字符串
		// var data= eval_r('(' + req.body.data + ')');//需要将json字符串转换为json对象
		// console.log("data="+data.PhoneNumber);
	    console.log(req.body.qnum);//解析json格式数据
	    res.contentType('json');//返回的数据类型

	    var reqjson = req.body;

	    var userQuery = {};

        esclient.search({
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
                questions: []
              }
              
            if (error) {
              // handle error
              result.status = "failed";                
            }else{
            	result.status = "ok"; 
            	for(var i= 0; i< response.hits.hits.length; i++ ){
                  result.questions.push(response.hits.hits[i]._source);
              }
              
            }
            //console.log("now search result = " + JSON.stringify(response));
          
            console.log("result ES ==" + JSON.stringify(response));
  			    res.send(result);//给客户端返回一个json格式的数据
             //res.json(topquestions);
  			    res.end();
             
          });

        
    }
};