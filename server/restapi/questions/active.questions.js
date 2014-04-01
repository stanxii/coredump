var _ =           require('underscore');

module.exports = {
    activeQuestions: function(esclient, redis, req, res) {
        var questions = {};
        res.json(questions);
    }
};