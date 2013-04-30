var express = require('express');
var ap3 = require('ap3');
var http = require('http');
var path = require('path');
var routes = require('./routes');

var app = express();

// Bootstrap the ap3 module
var addon = ap3(app);

var port = addon.config.port();
var devMode = app.get('env') == "development";

// all environments
app.set('port', port);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.cookieSession({
  key: 'session',
  secret: addon.config.secret()
}));
app.use(addon.middleware()); // register addon middleware
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if (devMode) {
  app.use(express.errorHandler());
}

routes(app, addon);

http.createServer(app).listen(port, function(){
  console.log('Plugin server listening on port ' + port + '.');
  if (devMode) {
    addon.register(); // enable auto registration of addon in devMode
  }
});
