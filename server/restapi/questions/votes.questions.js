var _ =           require('underscore')
    , User =      require('../models/User.js'),
    Askquestion = require('./questions/askquestion.js');

module.exports = {
    votesQuestions: function(client, req, res) {
        var questions = {};
        res.json(questions);
    }
};