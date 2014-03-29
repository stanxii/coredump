var _ =           require('underscore')
    , User =      require('../models/User.js');

module.exports = {    
    tabWeekQuestions: function(client, req, res) {
        var questions = {};
        res.json(questions);
    }
};