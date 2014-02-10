
var alarms = require('../ioservices/alarms/alarms.action.js');
var actions = require('../ioservices/actions/actions.js');


exports.socketioservice = function(socket) {

        alarms.alarmsAction(socket);
        actions.actions(socket);
};

