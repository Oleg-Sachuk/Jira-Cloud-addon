// app.js is the entry point for your add-on. This bootstraps
// your add-on server.

// [Express](http://expressjs.com/) is your friend. It's the underlying
// web framework that `feebs` uses.
var express = require('express');

// You need to load `feebs` to use her godly powers
var feebs = require('feebs');

// Typical web stuff you'll need later
var http = require('http');
var path = require('path');

// Your routes live here. This is the C part of MVC.
var routes = require('./routes');

// Bootstrap Express
var app = express();

// Bootstrap the `feebs` library
var addon = feebs(app);

// You can set this in `config.js`
var port = addon.config.port();

// Declares the environment to use in `config.js`
var devMode = app.get('env') == "development";

// The following settings applies to all environments.
app.set('port', port);

// All your views live here
app.set('views', __dirname + '/views');

// Jade is Express' preferred templating language, but feel free to use a different one.
// Check out the [consolidate](https://npmjs.org/package/consolidate) package
app.set('view engine', 'jade');

// Declare any Express [middleware](http://expressjs.com/api.html#middleware) you'd like to use here
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.cookieSession({
  key: 'session',
  secret: addon.config.secret() // Add your super secret salt in `config.js`
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