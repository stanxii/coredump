var AskQuestion = require('../restapi/questions/ask.question.js');
var DetailQuestion = require('../restapi/questions/detail.question.js');
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

//answer
var NewAnswer = require('../restapi/answers/new.answer.js');

module.exports = {
    //answers
    newAnswer: function(esclient, redis, req, res) {
        NewAnswer.newAnswer(esclient, redis, req, res);        
    },

    //questions
    askQuestion: function(esclient, redis, req, res) {
        AskQuestion.askQuestion(esclient, redis, req, res);        
    },
    detailQuestion: function(esclient, redis, req, res) {
        DetailQuestion.detailQuestion(esclient, redis, req, res);        
    },
    //questions tab== list get frome redis sorted set quene very fast.
    tabTopQuestions: function(esclient, redis, req, res) {
        TabTopQ.tabTopQuestions(esclient, redis, req, res);        
    },
    tabInterestingQuestions: function(esclient, redis, req, res) {
        TabInterestQ.tabInterestingQuestions(esclient, redis, req, res);        
    },
    tabFeaturedQ: function(esclient, redis, req, res) {
        TabFeaturedQ.tabFeaturedQuestions(esclient, redis, req, res);        
    },
    tabHotQuestion: function(esclient, redis, req, res) {
        TabHotQ.tabHotQuestion(esclient, redis, req, res);        
    },
    tabWeekQuestions: function(esclient, redis, req, res) {
        TabWeekQ.tabWeekQuestions(esclient, redis, req, res);        
    },
    tabMonthQuestion: function(esclient, redis, req, res) {
        TabMonthQ.tabMonthQuestion(esclient, redis, req, res);        
    },

    //Questions from ES index sorted by ... list
    allQuestions: function(esclient, redis, req, res) {
    	AllQuestions.allQuestions(esclient, redis, req, res);
    },
    newestQuestions: function(esclient, redis, req, res) {
    	NewestQuestions.newestQuestions(esclient, redis, req, res);
    },
    featuredQuestions: function(esclient, redis, req, res) {
    	FeaturedQuestions.featuredQuestions(esclient, redis, req, res);
    },
    frequentQuestions: function(esclient, redis, req, res) {
    	FrequentQuestions.frequentQuestions(esclient, redis, req, res);
    },
    activeQuestions: function(esclient, redis, req, res) {
    	ActiveQuestions.activeQuestions(esclient, redis, req, res);
    },
    votesQuestions: function(esclient, redis, req, res) {
        VotesQuestions.votesQuestions(esclient, redis, req, res);
    },
    viewsQuestions: function(esclient, redis, req, res) {
    	ViewsQuestions.viewsQuestions(esclient, redis, req, res);
    },
    answersQuestions: function(esclient, redis, req, res) {
    	AnswersQuestions.answersQuestions(esclient, redis, req, res);
    },
    unanswersQuestions: function(esclient, redis, req, res) {
    	UnanswersQuestions.unanswersQuestions(esclient, redis, req, res);
    }
    
};