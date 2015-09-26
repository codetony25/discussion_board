'use strict';

var path = require('path');

module.exports = function Route(app) {	

	app.use('/users', require(path.resolve('./server/controllers/users.js')));
	app.use('/dashboard', require(path.resolve('./server/controllers/dashboards.js')));
	app.use('/topic', require(path.resolve('./server/controllers/topics.js')));
	app.use('/profile', require(path.resolve('./server/controllers/profile.js')));
	
};

