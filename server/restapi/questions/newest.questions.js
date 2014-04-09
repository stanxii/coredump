

module.exports = {
    newestQuestions: function(esclient, redis, req, res) {
        var questions = {};

        //get questions from redis the newest last top 50 questions

        var result = {
        	'status': "failed",
        	questions: []
        }

        redis.lrange('last.questions', 0, 50, function(err, qids) {
        	if(err){
        		res.json(result);
        		throw err;
        	}else{
        		result.status = "ok";
        		if(qids){
        		//get newest

        			var jsonbody = {
        				body: {
        					docs : []
        				}
        			};


        			for(var i=0; i< qids.length; i++){
        				var doc = {_index: 'questions', _type: 'question', _id: qids[i] };
        				jsonbody.body.docs.push(doc);        				
        			}


        			esclient.mget( jsonbody, function(error, response){						  
        				console.log('get ressssss' + response);
        				if(response.docs){
        					for(var i=0; i< response.docs.length; i++){
						   	  if(response.docs[i].found){
						   	    var question = response.docs[i]._source;
                                question.qid = response.docs[i]._id;						   	  
						        result.questions.push(question);						      
						      }
						   }
        				}
						   
						 res.json(result);
						   
						});
        		}
        	}
        });

        
    }
};