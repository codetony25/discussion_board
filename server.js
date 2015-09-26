'use strict';

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, "./client/public")));

var server = app.listen(1337, function() {
	console.log('1337 port running...');
});



require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);
require('./server/config/sockets.js')(app, server);
