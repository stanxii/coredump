var express =       require('express')
    , cons =        require('consolidate')
    , http =        require('http')
    , passport =    require('passport')
    , path =        require('path')
    , User =        require('./server/models/User.js');
var socketioservice = require('./server/routes/socketio.js');



var app = module.exports = express();
// assign the swig engine to .html files
app.engine('html', cons.ect);

// set .html as the default extension
app.set('view engine', 'html');
app.set('views', __dirname + '/client/views');

//app.set('views', __dirname + '/client/views');
//app.set('view engine', 'jade');

app.use(express.logger('dev'))
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'client')));
app.use(express.cookieSession(
    {
        secret: process.env.COOKIE_SECRET || "Superdupersecret"
    }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.localStrategy);
//passport.use(User.twitterStrategy());  // Comment out this line if you don't want to enable login via Twitter
//passport.use(User.facebookStrategy()); // Comment out this line if you don't want to enable login via Facebook
passport.use(User.googleStrategy());   // Comment out this line if you don't want to enable login via Google
//passport.use(User.linkedInStrategy()); // Comment out this line if you don't want to enable login via LinkedIn

passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser);

require('./server/routes.js')(app);

app.set('port', process.env.PORT || 8000);

var hserver = http.createServer(app);

hserver.listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});

var io = require('socket.io').listen(hserver);

io.sockets.on('connection', socketioservice.socketioservice);

require('./server/udpserver.js')(io);
