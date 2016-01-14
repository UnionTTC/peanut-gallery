var express = require('express')
var app = express()

// Configure server network settings
app.set('port', process.env.PORT || 3000)
app.set('ip', process.env.IP || '0.0.0.0')

// Create and start server
var server = app.listen(app.get('port'), app.get('ip'), function () {
  var address = server.address()
  console.log('[server.js] app listening on https://%s:%s', address.address, address.port)
})

// Require modules
var path = require('path')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')

var routes = require('./routes/')

mongoose.connect('mongodb://' + (process.env.IP || 'localhost') + '/data')
console.log('[server.js] connected to mongodb://' + (process.env.IP || 'localhost') + '/data')

// Set static directory to /public
app.use(express.static(path.join(__dirname, 'public')))

// Set Jade as the view engine
app.set('view engine', 'jade')

// Site-wide variables
app.locals.sitename = 'Peanut Gallery'

// Configure body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(cookieParser('config.cookieSecret')) // these values are temporary and will be chnaged

// Catchall error handler:
app.use(function (err, req, res, next) {
  console.error(err.stack)
  // Serve a static file in case the error is rendering related (Handlebars)
  res.status(500).sendFile(__dirname + '/views/error.html')
})

app.use(routes)
