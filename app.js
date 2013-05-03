// Without Express, you've got nothing.
var express = require('express');

// Bring in feebs
var feebs = require('feebs');

var http = require('http');
var path = require('path');

// Where all your routes live
var routes = require('./routes');

// Bootstrap Express
var app = express();

// Bootstrap the `feebs` library
var addon = feebs(app);

// You can set this in `config.js`
var port = addon.config.port();

// Declares the environment to use in `config.js`
var devMode = app.get('env') == "development";

// all environments
app.set('port', port);

// All your views live here
app.set('views', __dirname + '/views');

// Jade is Express' preferred templating language,
// but feel free to use a different one
app.set('view engine', 'jade');

// Declare any Express [middleware](http://expressjs.com/api.html#middleware) you'd like to use
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.cookieSession({
  key: 'session',
  secret: addon.config.secret()
}));
// You need to instantiate the `feebs` middleware in order to get it's goodness for free
app.use(addon.middleware());
// This is where the routers are mounted
app.use(app.router);
// Anything in ./public is served right up as static content
app.use(express.static(path.join(__dirname, 'public')));

// development only
if (devMode) {
  // Show nicer errors when in devMode
  app.use(express.errorHandler());
}

// Pass in express and `feebs` to your routers
routes(app, addon);

// Boot the damn thing
http.createServer(app).listen(port, function(){
  console.log('Add-on server running at http://localhost:' + port);
  if (devMode) {
    // Enables auto registration/de-registration of add-ons into a host
    addon.register();
  }
});