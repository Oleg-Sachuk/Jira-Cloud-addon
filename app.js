var express = require('express');
var ap3 = require('node-ap3');
var http = require('http');
var path = require('path');
var routes = require('./routes');

var app = express();
var plugin = ap3(app);

// all environments
app.set('port', plugin.config.port());
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.cookieSession({
  key: 'session',
  secret: plugin.config.secret()
}));
app.use(plugin.middleware());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

plugin.configure();

routes(app, plugin);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
  if (app.get('env') === 'development') {
    plugin.register(plugin);
  }
});
