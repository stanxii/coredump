

module.exports = {
    unanswersQuestions: function(esclient, redis, req, res) {
        
    	 res.contentType('json');//返回的数据类型

	    var reqjson = req.body;

        var userQuery = {
			    "size": reqjson.qnum, 
			    "query": {
			        "term": {
			           "answers": {
			              "value": 0
			           }
			        }
			    },
			    "sort": [
			       {
			          "asktime": {
			             "order": "desc"
			          }
			       }
			    ]
			};

        esclient.search({
          index: 'questions',
          type: 'question',                            
          body: userQuery 
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
            
          
            console.log("unanswers  ES ==" + JSON.stringify(response));
  			res.send(result);//给客户端返回一个json格式的数据
            //res.json(topquestions);
  			res.end();
             
          });
    }
};