var elasticsearch = require('elasticsearch');
      
var client = new elasticsearch.Client({
host: 'localhost:9200',
log: 'trace'
});    


var Askquestion = require('../restapi/questions/ask.question.js');
var TabTopQ = require('../restapi/tabquestions/tab.top.questions.js');
var TabInterestQ = require('../restapi/tabquestions/tab.interesting.questions.js');
var TabFeaturedQ = require('../restapi/tabquestions/tab.featured.questions.js');
var TabHotQ = require('../restapi/tabquestions/tab.hot.questions.js');
var TabWeekQ = require('../restapi/tabquestions/tab.week.questions.js');
var TabMonthQ = require('../restapi/tabquestions/tab.month.questions.js');

var AllQuestions = require('../restapi/questions/all.questions.js'); 
var NewestQuestions = require('../restapi/questions/newest.questions.js'); 
var FeaturedQuestions = require('../restapi/questions/featured.questions.js'); 
var FrequentQuestions = require('../restapi/questions/frequent.questions.js'); 
var ActiveQuestions = require('../restapi/questions/active.questions.js'); 
var VotesQuestions = require('../restapi/questions/votes.questions.js'); 
var ViewsQuestions = require('../restapi/questions/views.questions.js'); 
var AnswersQuestions = require('../restapi/questions/answers.questions.js'); 
var UnanswersQuestions = require('../restapi/questions/unanswers.questions.js'); 

module.exports = {
    askQuestion: function(client, req, res) {
        Askquestion.askQuestion(client, req, res);        
    },
    //questions tab== list get frome redis sorted set quene very fast.
    tabTopQuestions: function(client, req, res) {
        TabTopQ.tabTopQuestions(client, req, res);        
    },
    tabInterestingQuestions: function(client, req, res) {
        TabInterestQ.tabInterestingQuestions(client, req, res);        
    },
    tabFeaturedQ: function(client, req, res) {
        TabFeaturedQ.tabFeaturedQuestions(client, req, res);        
    },
    tabHotQuestion: function(client, req, res) {
        TabHotQ.tabHotQuestion(client, req, res);        
    },
    tabWeekQuestions: function(client, req, res) {
        TabWeekQ.tabWeekQuestions(client, req, res);        
    },
    tabMonthQuestion: function(client, req, res) {
        TabMonthQ.tabMonthQuestion(client, req, res);        
    },

    //Questions from ES index sorted by ... list
    allQuestions: function(client, req, res) {
    	AllQuestions.allQuestions(client, req, res);
    },
    newestQuestions: function(client, req, res) {
    	NewestQuestions.newestQuestions(client, req, res);
    },
    featuredQuestions: function(client, req, res) {
    	FeaturedQuestions.featuredQuestions(client, req, res);
    },
    frequentQuestions: function(client, req, res) {
    	FrequentQuestions.frequentQuestions(client, req, res);
    },
    activeQuestions: function(client, req, res) {
    	ActiveQuestions.activeQuestions(client, req, res);
    },
    votesQuestions: function(client, req, res) {
    	VotesQuestions.votesQuestions.(client, req, res);
    },
    viewsQuestions: function(client, req, res) {
    	ViewsQuestions.viewsQuestions(client, req, res);
    },
    answersQuestions: function(client, req, res) {
    	AnswersQuestions.answersQuestions(client, req, res);
    },
    unanswersQuestions: function(client, req, res) {
    	UnanswersQuestions.unanswersQuestions(client, req, res);
    }
    
};