// Required apps.
var express = require('express');
var hbs = require('hbs');
var hbsutils = require('hbs-utils')(hbs);
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var routes = require('./routes/');
var linkto = require('./views/helpers/linkto');

// Required files.
//var util = require('./lib/util.js');

mongoose.connect('mongodb://' + (process.env.IP || 'localhost') + '/students');

// Create new express app.
var app = express();

// Register partial hbs files
//hbsutils.registerPartials('./views/partials');
hbsutils.registerWatchedPartials('./views/partials');
hbs.registerHelper('link_to', linkto);

// Set Handlebars running and as the engine for html
app.set('view engine', 'hbs');
app.engine('html', hbs.__express);

// Set the port and ip address
app.set('port', process.env.PORT || 3000);
app.set('ip', process.env.IP || '0.0.0.0');

// Set root directory.
app.use(express.static("public"));

app.use(bodyParser.urlencoded({
    extended: false
}));

// Set secrets
app.use(cookieParser('You will never know my secrets because they are min hahahahahahaa'));
app.use(session({
    secret: "Npe. You won't get this secret either? Yep. I mean no.",
    resave: true,
    saveUninitialized: true
}));

// Bring in the routes
app.use(routes);

// Catchall error handler:
app.use(function(err, req, res, next) {
    console.error(err.stack);
    // Serve a static file in case the error is rendering related (Handlebars)
    res.status(500).sendFile(__dirname + '/views/error.html');
});

// Run the server
var server = app.listen(app.get('port'), app.get('ip'), function() {
    var address = server.address();
    console.log("[PG] app running on https://%s:%s",
        address.address, address.port);
});
