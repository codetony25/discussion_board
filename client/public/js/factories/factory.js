'use strict';

var myApp = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ui.router', 'ngResource']);



/*====================================
=            User Factory            =
====================================*/

myApp.factory('UserFactory', function($http) {

	var factory = {};
	factory.username = 'test';
	//Adds user to server side
	factory.addUser = function(data, callback) {
		$http.post('/users', data).then(function(data) {
			factory.setUsername(data.data.username);
			callback(data);
		});
	}

	//Setting and getting username to use on dashboard
	factory.getUsername = function(callback) {
		callback(factory.username);
	}

	factory.setUsername = function(username) {
		factory.username = username;
	}



	return factory;
});


/*=====  End of User Factory  ======*/



/*=========================================
=            Dashboard Factory            =
=========================================*/

myApp.factory('DashboardFactory', function($http) {

	var factory = {};

	//Getting all topics from the server side
	factory.getTopic = function(callback) {
		$http.get('/dashboard').success(function(data) {
			callback(data);
		});
	}

	//Adding a topic to the server side
	factory.addTopic = function(data, callback) {
		$http.post('/dashboard', data).then(function() {
			callback();
		});
	}


	return factory;

});

/*=====  End of Dashboard Factory  ======*/


/*=====================================
=            Topic Factory            =
=====================================*/

myApp.factory('TopicFactory', function($http) {

	var factory = {};

	factory.getUserTopic = function(data, callback) {
		$http.get('/topic/'+ data).success(function(data) {
			callback(data);
		});
	}

	factory.addPost = function(data, callback) {
		$http.post('/topic', data).success(function(data) {
			callback(data);
		});
	}

	factory.addComment = function(data, callback) {
		$http.put('/topic', data).success(function(data) {
			callback(data);
		});
	}

	factory.upvote = function(data, callback) {
		$http.post('/topic/upvote', data).success(function(data) {
			callback();
		})
	}

	factory.downvote = function(data, callback) {
		$http.post('/topic/downvote', data).success(function(data) {
			callback();
		})
	}

	return factory;

});

/*=====  End of Topic Factory  ======*/


/*=======================================
=            Profile Factory            =
=======================================*/

myApp.factory('ProfileFactory', function($http) {

	var factory = {};

	factory.getUser = function(data, callback) {
		$http.get('/profile/' + data).success(function(data) {
			console.log(data);
			callback(data);
		})
	}

	return factory;
})


/*=====  End of Profile Factory  ======*/







