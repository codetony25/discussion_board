'use strict';

var mongoose = require('mongoose');
var express = require('express');
var session = require('express-session');
var router = express.Router();
var Users = mongoose.model('Users');
var Topics = mongoose.model('Topics');
var app = express();

router.get('/:id', function(req, res) {

    console.log(req.params.id);
    Users.findOne({username: req.params.id}, function(err, data) {
        if (err) {
            console.log('Issue receiving User');
            res.json(false);
        } else {
            console.log('Success receiving User');
            res.json(data);
        }
    })

});



module.exports = router;