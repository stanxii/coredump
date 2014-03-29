var _ =           require('underscore')
    , User =      require('../models/User.js');

module.exports = {
    frequentQuestions: function(client, req, res) {
        var questions = {};
        res.json(questions);
    }
};