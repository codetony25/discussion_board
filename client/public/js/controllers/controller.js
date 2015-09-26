'use strict';

/*=======================================
=            User Controller            =
=======================================*/

myApp.controller('UserController', function(UserFactory, $location) {

	//Adds user to factory
	this.addUser = function(newUser) {
		UserFactory.addUser(newUser, function(username) {
			$location.path('/dashboard');
		});

	}

});


/*=====  End of User Controller  ======*/


/*============================================
=            Dashboard Controller            =
============================================*/

myApp.controller('DashboardController', function(DashboardFactory, UserFactory, $location) {

	//Getting username for dashboard page
	var _this = this;
	UserFactory.getUsername(function(username){
		_this.username = username;
	});

	//Getting all topics
	function getTopic() {
		DashboardFactory.getTopic(function(data) {
			_this.topics = data;
		});
	}

	getTopic();
	
	// setTimeout( function() {console.log(_this.topics);}, 2000 );

	//Adding a topic
	this.addTopic = function(newTopic) {
		//Adding username to topic to keep track in server side
		newTopic.username = _this.username;
		DashboardFactory.addTopic(newTopic, getTopic);
	}

	//Update live on dashboard posts
	socket.on('updateUser', function() {
		getTopic();
	});
	//Update live on posting a topic
	socket.on('createdTopic', function() {
		getTopic();
	});
});


/*=====  End of Dashboard Controller  ======*/


/*========================================
=            Topic Controller            =
========================================*/

myApp.controller('TopicController', function(DashboardFactory, TopicFactory, UserFactory, ProfileFactory, $location, $routeParams) {

	var _this = this;

	UserFactory.getUsername(function(username){
		_this.username = username;
	});

	function getUserTopic() {
		TopicFactory.getUserTopic($routeParams.id, function(data) {
			_this.usertopics = data;
		});
	}

	getUserTopic();


	this.addPost = function(posts, callback) {
		posts.username = _this.username;
		posts.topicId = $routeParams.id;
		TopicFactory.addPost(posts, getUserTopic);
	}



	this.addComment = function(comment, postId, callback) {
		comment.username = _this.username;
		comment.postid = postId;
		comment.topicId = $routeParams.id;
		TopicFactory.addComment(comment, getUserTopic);
	}

	this.showUser = function(user) {
		$location.path('/profile/' + user);
	}

	this.upvote = function(data) {
		TopicFactory.upvote({postid: data, topicid: $routeParams.id}, getUserTopic);
	}


	this.downvote = function(data) {
		TopicFactory.downvote({postid: data, topicid: $routeParams.id}, getUserTopic);
	}

	//Update live on upvote
	socket.on('upVote', function() {
		getUserTopic();
	})

	//Update live on downvote
	socket.on('downVote', function() {
		getUserTopic();
	})

	//Update live on post and comment
	socket.on('updateUser', function() {
		getUserTopic();
	});
});

/*=====  End of Topic Controller  ======*/


/*==========================================
=            Profile Controller            =
==========================================*/


myApp.controller('ProfileController', function(ProfileFactory, $routeParams) {

	var _this = this;
	console.log($routeParams);
	ProfileFactory.getUser($routeParams.id, function(data){
		_this.userdata = data;
	})

});


/*=====  End of Profile Controller  ======*/










