'use strict';

var app = angular.module('userpage', ['ui.router', 'ngAnimate', 'ui.bootstrap', 'ngFileUpload','angular-jwt']);

app.config(function($httpProvider, $urlRouterProvider, $stateProvider){
	$urlRouterProvider.otherwise('/home');
	
	$stateProvider
	.state('home',{
	url: '/home',
	templateUrl: 'sites/partials/home.html',
	controller: 'userctrl as ctrl'
	})
	.state('board',{
		url: '/board',
		templateUrl: 'sites/partials/dashboard.html',
		controller: 'dashboardctrl as ctrl',
		resolve: {
			auth:function($state,jwtHelper) {
				try{
					jwtHelper.decodeToken(localStorage.authToken);
				}
				catch(err) {
					var ctrl = this;
					ctrl.$state.go('auth');
				}
			}
		}
	})
	.state('update',{
		url: '/update/:itemId',
		templateUrl: 'sites/partials/update.html',
		controller: 'updatectrl as ctrl',
	})
	.state('updateStaff',{
		url: '/updateStaff/:staffId',
		templateUrl: 'sites/partials/updateStaff.html',
		controller: 'updateStaffctrl as ctrl',
	})
	.state('auth',{
		url:'/login',
		templateUrl:'sites/partials/auth.html',
		controller:'AuthCtrl as authVm',
	})
	.state('register',{
		url:'/register',
		templateUrl:'sites/partials/register.html',
		controller:'AuthCtrl as authVm',
	})

		$httpProvider.interceptors.push(function(jwtHelper){
			return {
				request:function(config){
					console.log(config);
					config.headers.authentication = localStorage.authToken;
					return config;
				},
				response:function(response){
					var auth_token = response.headers('authentication');
					if(auth_token){
						var decrypt_token = jwtHelper.decodeToken(auth_token);
						console.log(decrypt_token);
						if(decrypt_token.email){
							localStorage.authToken = auth_token;
						}
						
					}
					return response;
				}
			}
		})
	
});
