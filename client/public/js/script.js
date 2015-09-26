'use strict';


/*=============================================
=            ANGULAR CONFIGURATION            =
=============================================*/
// myApp.config(function($stateProvider, $urlRouterProvider) {

// 	//For any unmatched url, redirect to welcome.html
// 	$urlRouterProvider.otherwise('welcome');


// 	$stateProvider
// 		.state('welcome', {
// 			url: "/welcome",
// 			templateUrl: "partials/welcome.html"
// 		})
// 		.state('dashboard', {
// 			url: "/dashboard",
// 			templateUrl: "partials/dashboard.html",
// 			controller: 'DashboardController as DashCtrl'
// 		})
// 		.state('login', {
// 			url: "/login",
// 			templateUrl: "partials/login.html",
// 			controller: 'UserController as UserCtrl'
// 		})
// 		.state('topic', {
// 			url: '/topic/:id',
// 			templateUrl: 'partials/topic.html',
// 			controller: 'TopicController as TopicCtrl'
// 		})
// 		.state('profile', {
// 			url: '/profile/:id',
// 			templateUrl: 'partials/profile.html',
// 			controller: 'ProfileController as ProfileCtrl'
// 		});

// });

//Angular Routing
myApp.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'partials/welcome.html'
		})
		.when('/dashboard', {
			templateUrl: 'partials/dashboard.html',
			controller: 'DashboardController',
			controllerAs: 'DashCtrl'
		})
		.when('/login', {
			templateUrl: 'partials/login.html',
			controller: 'UserController',
			controllerAs: 'UserCtrl'
		})
		.when('/topic/:id', {
			templateUrl: 'partials/topic.html',
			controller: 'TopicController',
			controllerAs: 'TopicCtrl'
		})
		.when('/profile/:id', {
			templateUrl: 'partials/profile.html',
			controller: 'ProfileController',
			controllerAs: 'ProfileCtrl'
		})
		.otherwise({
			redirectTo: '/'
		})
});


/*=====  End of ANGULAR CONFIGURATION  ======*/

/*============================================
=            Socket Configuration            =
============================================*/

	var socket = io.connect();


/*=====  End of Socket Configuration  ======*/


