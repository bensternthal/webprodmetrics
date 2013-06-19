
/**
 * Module dependencies.
 */
var express = require('express')
    , routes = require('./routes')
var app = express();

var path = require('path');

app.configure(function(){
    app.set('port', process.env.PORT || 2000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.locals.pretty = true;
    app.use(express.favicon());    
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(app.router);
});

app.use(express.errorHandler());    

// Routes
require('./routes/index')(app);

// Start WebServer
app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});



