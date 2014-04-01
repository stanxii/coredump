var _ =           require('underscore');

module.exports = {
    allQuestions: function(esclient, redis, req, res) {
        var questions = {};
        res.json(questions);
    }
};