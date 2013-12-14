
alarms = require('../ioservices/alarms/alarms.js');

exports.socketioservice = function(socket) {

       return alarms.alarms(socket);
};

