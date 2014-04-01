var _ =           require('underscore');

module.exports = {
    featuredQuestions: function(esclient, redis, req, res) {
        var questions = {};
        res.json(questions);
    }
};