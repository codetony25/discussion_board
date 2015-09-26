'use strict';

var mongoose = require('mongoose');
var express = require('express');
var session = require('express-session');
var router = express.Router();
var Users = mongoose.model('Users');
var Topics = mongoose.model('Topics');
var app = express();

router.post('/', function(req, res) {

    var query = {
        username: req.body.username
    };
    var update = {
        $push: {
            "topics": {
                topic: req.body.topic,
                description: req.body.description,
                category: req.body.language
            }
        }
    };
    var option = {
        safe: true,
        upsert: true
    };
    console.log(req.body);
    Users.update(query, update, option, function(err, users) {
        if (err) {
            console.log('Issue updating topics to users');
            res.json(false);
        } else {
            console.log('Updated topics successfully');
            var user = new Topics({
                username: req.body.username,
                topic: req.body.topic,
                description: req.body.description,
                category: req.body.language
            })

            user.save(function(err) {
            	if (err) { 
            		console.log('Issue adding to topics schema');
            		res.json(false);
            	} else {
            		console.log('Success Adding to topics schema');
            		res.json(true);
                    io.emit('createdTopic');
            	}
            })
        }
    });

});

router.get('/', function(req, res) {
	Topics.find({}, function(err, data) {
		if (err) {
			console.log('Issue receiving topics');
			res.json(false);
		} else {
			console.log('Success receiving topics');
			res.json(data);
		}
	})
})



module.exports = router;