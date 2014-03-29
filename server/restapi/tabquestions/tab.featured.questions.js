var _ =           require('underscore')
    , User =      require('../models/User.js');

module.exports = {    
    tabFeaturedQuestions: function(client, req, res) {
        var featuredquestions = {};
        res.json(featuredquestions);
    }
};