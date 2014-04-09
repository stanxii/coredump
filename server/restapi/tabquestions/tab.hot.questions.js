

module.exports = {    
    tabHotQuestions: function(esclient, redis, req, res) {
        var result = {
        	'status': "failed",
        	questions: []
        };

        var hotq = 'hot.questions';
        redis.zrevrang(hotq, 0, -1, function(err, qids){
        	if(err)return;

        	if(qids){
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
						        result.questions.push(question);						      
						      }
						   }
        				}
						   
						 res.json(result);
						   
				});
        	}
        });



    }
};