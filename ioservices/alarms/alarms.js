
exports.alarms = function(socket) {

        socket.on('send:search.alarm', function(data) {
               console.log("server rev:" + JSON.stringify(data));


                var ejs = require('../../lib/elastic.js'),
                nc = require('../../lib/elastic-node-client.js'),
                colors = require('colors'),
                terms = process.argv.slice(2),
                qstr = '*';

            // setup client
            ejs.client = nc.NodeClient('192.168.1.111', '9200');

            // generate the query string
            if (terms.length > 0) {
              qstr = terms.join(' ');
            }

            // a function to handle the results
            var resultsCallBack = function(results) {
                if (!results.hits) {
                  console.log('Error executing search'.red);
                  process.exit(1);
                }

                var hits = results.hits;
                console.log(Array(80).join('-'));
                console.log( ('Found ' + hits.total.toString().bold + ' result(s) for query: ' + qstr.toString().bold).green );
                console.log(Array(80).join('-'));
                for (var i = 0; i < hits.hits.length; i++) {
                  var hit = hits.hits[i];
                  console.log(((i+1)+'. ').grey + hit._source.user.underline + ': ' + hit._source.message);
                }
//                console.log(Array(80).join('-'));
                socket.emit('send:search.alarm.res', hits);
            };
            // execute the search request
            //var oQuery = ejs.QueryStringQuery().defaultField('user');
            var oQuery = ejs.QueryStringQuery();

            var r = ejs.Request()
                .indices("twitter")
                .types("tweet")
                .query(oQuery.query(data.queryTerm || '*'));

            r.doSearch(resultsCallBack);

        });
};
