'use strict';

var mongoose = require('mongoose');
var express = require('express');
var session = require('express-session');
var router = express.Router();
var Users = mongoose.model('Users');
var Topics = mongoose.model('Topics');
var app = express();

//First checks if user exist, if not then we add the user.
router.post('/', function(req, res) {
	Users.findOne({username: req.body.name}, function(err, exist) {
		if (err) { console.log('Issue finding name'); res.json(false) };
		if (exist) { 
			console.log('Username already exists'); 
			console.log(exist.username);
			res.json(exist);
		} else {
			var user = new Users({username: req.body.name, password: req.body.password});
			user.save(function(err, names) {
				if (err) { console.log('Issue adding name'); res.json(false) }
				else {
					console.log('Success adding username and password');
					res.json(names);
				}
			});
		}


	})
});

module.exports = router;