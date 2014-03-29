var _ =           require('underscore')
    , User =      require('../models/User.js');

module.exports = {    
    tabMonthQuestions: function(client, req, res) {
        var questions = {};
        res.json(questions);
    }
};