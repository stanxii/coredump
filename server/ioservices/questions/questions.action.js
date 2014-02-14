

var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

    var doMongodbOpt = function(socket, action, jsondata) {
      MongoClient.connect('mongodb://127.0.0.1:27017/coredump', function(err, db) {
        if(err) throw err;

        

        var collection = db.collection('questions');

///////////////////////////////////////case begin
        if(action == "askquestion"){
          //问一个问题
          //jsondata.asktime = new Date().toLocaleString();
          var moment = require('moment-timezone');
          var asktime = moment.tz(new Date(), "Asia/Shanghai").format();
           asktime = asktime.substring(0, asktime.indexOf('+'));

           jsondata.asktime = asktime;
          
          collection.insert(jsondata, function(err, docs) {
            // Locate all the entries using find
            if(err){
              console.log(docs);
              socket.emit('send:questions.ask.res', '{"result": "failed"}');
            }else{
              console.log(docs);
              // Let's close the db              
              db.close();          

              //save data into ES index server
              var elasticsearch = require('elasticsearch');
              var client = new elasticsearch.Client({
                host: 'localhost:9200',
                log: 'trace'
              });

              //get computer id number
              // index a document
              console.log("when index jsondata===" + jsondata);
              delete jsondata["_id"];
              //jsondata._id = 1;
              client.index({
                index: 'questions',
                type: 'detail', 
                id: 1,               
                body: jsondata
              }, function (error, response) {
                // ...
                if(error){
                  console.log("index the ES data failed");
                  socket.emit('send:questions.ask.res', '{"failed": "ok"}');          
                }else{
                  console.log("index the ES data ok");
                  socket.emit('send:questions.ask.res', '{"result": "ok"}');  
                }

                client.close();

              });




              
            }
              
          });      
        }
        else if(action == "newest"){
          // Locate all the entries using find
          //按提问时间排序最近提问的100个问题
          collection.find()
          .limit(100)
          .sort({asktime: -1})
          .toArray(function(err, results) {
            console.dir(results);        
            // Let's close the db
            db.close();
          });      
        }
        else if(action == "interesting"){
          //if user logined
          //and use search' key c++ redis
          //and user preperence and set node.js reids express
          //select where up's conditions.

          collection.find()
          .limit(100)
          .sort({asktime: -1})
          .toArray(function(err, results) {
            console.dir(results);        
            // Let's close the db
            db.close();
          });
        }else if(action == "interesting"){
           collection.find()
          .limit(100)
          .sort({asktime: -1})
          .toArray(function(err, results) {
            console.dir(results);        
            // Let's close the db
            db.close();
          });
        }else if(action == "featured"){
          
        }else if(action == "hot"){
          
        }else if(action == "week"){
          
        }else if(action == "month"){
          
        }
///////////////////////////////////////case end
        
      });
    }

exports.questionsAction = function(socket) {

//create ask question
        socket.on('send:questions.ask', function(data) {
              var tips = "to ask a question";
              console.log("server send:questions.ask rev:" + JSON.stringify(data));
              doMongodbOpt(socket, "askquestion",data);
              

        });
//Question query
        socket.on('send:questions.newest', function(data) {
              var tips = "The newest questions";
              console.log("server rev:" + JSON.stringify(data));
              doMongodbOpt("newest",data);
              socket.emit('send:questions.interesting.res', '{"result": "ok"}');

        });

        socket.on('send:questions.interesting', function(data) {
              var tips = "questions that may be to interest to you base on your history and tag preference";
              console.log("server rev:" + JSON.stringify(data));
              doMongodbOpt("interesting",data);
              socket.emit('send:questions.interesting.res', '{"result": "ok"}');

        });

        socket.on('send:questions.featured', function(data) {
              var tips = "Questions with an active bounty";
               console.log("server rev:" + JSON.stringify(data));
               doMongodbOpt("featured",data);

                socket.emit('send:search.alarm.res', '{"result": "ok"}');

        });

        socket.on('send:questions.hot', function(data) {
               console.log("server rev:" + JSON.stringify(data));

                socket.emit('send:search.alarm.res', '{"result": "ok"}');

        });
        socket.on('send:questions.week', function(data) {
               console.log("server rev:" + JSON.stringify(data));

                socket.emit('send:search.alarm.res', '{"result": "ok"}');

        });
        socket.on('send:questions.month', function(data) {
               console.log("server rev:" + JSON.stringify(data));

                socket.emit('send:search.alarm.res', '{"result": "ok"}');

        });
};
