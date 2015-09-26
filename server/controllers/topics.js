'use strict';

var mongoose = require('mongoose');
var express = require('express');
var session = require('express-session');
var router = express.Router();
var Users = mongoose.model('Users');
var Topics = mongoose.model('Topics');
var app = express();

router.get('/:id', function(req, res) {
	Topics.findOne({_id: req.params.id}, function(err, topics) {
		if (err) {
			console.log('Issue receiving Topic');
			res.json(false);
		} else {
			console.log('Success Retrieving Topic');
			res.json(topics);
		}
	})
});

router.post('/', function(req, res) {
    console.log(req.body);
    var update = {
        $push: {
            "posts": {
                post: req.body.post
            }
        }
    }
    Users.update({ username: req.body.username }, update, function(err) {
        if (err) {
            console.log('Issue updating post for user');
            res.json(false);
        } else {
            console.log('Success updating post for user');
        	var topicUpdate = {
        		$push: {
        			"posts": {
        				postUsername: req.body.username,
        				post: req.body.post
        			}
        		}
        	}
            Topics.update({ _id: req.body.topicId }, topicUpdate, function(err) {
            	if (err) {
            		console.log('Failure to add a post to a topic');
            		res.json(false);
            	} else {
            		console.log('Added post to topic Successfully');
            		res.json(true);
            		io.emit('updateUser');
            	}
            })
        }
    })
})

router.put('/', function(req, res) {
	var update = {
		$push: {
			"comments": {
				comment: req.body.comment
			}
		}
	}
	Users.update({username: req.body.username}, update, function(err) {
		if (err) {
			console.log('Issue adding comment');
			res.json(false);
		} else {
			console.log('Success Adding a comment');
			//Add to topics here
		Topics.findOne({_id: req.body.topicId}, function(err, data) {
			if (err) { res.json(false) }
			else {
				for (var i = 0; i < data.posts.length; i++) {
					if(data.posts[i]._id == req.body.postid) {
						data.posts[i].comments.push({comment: req.body.comment, commentUsername: req.body.username });
					}
				}
				Topics.update({_id: req.body.topicId}, data, function(err, status) {
					if (err) { console.log('Error updating whole topic'); res.json(false) }
					else {
						Topics.findOne({_id: req.body.topicId}, function(err, data) {
							if (err) {
								console.log('Error finding comments');
								res.json(status);
							} else {
								console.log('Success getting comments');
								res.json(data);
								io.emit('updateUser')
							}
						}) 
					}
				});
				}
			})
		}
	})
});

//Upvote
router.post('/upvote', function(req, res) {
	console.log(req.body);
	Topics.findOne({_id: req.body.topicid}, function(err, data) {
		if (err) {
			console.log('Issue upvoting');
			res.json(false);
		} else {
			console.log('Upvote Processing');
			for (var i = 0; i < data.posts.length; i++) {
				if (data.posts[i]._id == req.body.postid) {
					data.posts[i].postUpvote++;
					console.log(data.posts[i]);
				}
			}
			Topics.update({_id: req.body.topicid}, data, function(err, data) {
				if (err) {
					console.log('Failed Upvoted!');
					res.json(false);
				} else {
					Topics.findOne({_id: req.body.topicid}, function(err, data) {
						if (err) {
							console.log('Issue upvote');
							res.json(false);
						} else {
							console.log('Success upvote');
							res.json(data);
							io.emit('upVote');
						}
					});
				}
			})
		}
	})
});

//Downvote
router.post('/downvote', function(req, res) {
	console.log(req.body);
	Topics.findOne({_id: req.body.topicid}, function(err, data) {
		if (err) {
			console.log('Issue Downvote');
			res.json(false);
		} else {
			console.log('Downvote Processing');
			for (var i = 0; i < data.posts.length; i++) {
				if (data.posts[i]._id == req.body.postid) {
					data.posts[i].postDownvote++;
					console.log(data.posts[i]);
				}
			}
			Topics.update({_id: req.body.topicid}, data, function(err, data) {
				if (err) {
					console.log('Failed Downvote!');
					res.json(false);
				} else {
					Topics.findOne({_id: req.body.topicid}, function(err, data) {
						if (err) {
							console.log('Issue Downvote');
							res.json(false);
						} else {
							console.log('Success Downvote');
							res.json(data);
							io.emit('downVote');
						}
					});
				}
			})
		}
	})
});


module.exports = router;