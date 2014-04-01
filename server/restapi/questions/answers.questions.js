var _ =           require('underscore');

module.exports = {
    answersQuestions: function(esclient, redis, req, res) {
        var questions = {};
        res.json(questions);
    }
};