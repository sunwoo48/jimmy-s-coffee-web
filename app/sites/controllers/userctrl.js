
(function(){
	'use strict'

			angular
				.module('userpage')
				.controller('userctrl', userctrl);

	function userctrl($stateParams, $http, $state,$uibModal) {
		var ctrl= this;
		ctrl.$http = $http;
		ctrl.$stateParams = $stateParams;
		ctrl.state= $state;
		ctrl.uibModal = $uibModal;
	
		ctrl.gotoauth = gotoauth;				
//for menu activ. 
		ctrl.getItems = getItems;
		ctrl.getItems();
//modal windows
		ctrl.open = open;
		ctrl.openHistory = openHistory;
		ctrl.openRent = openRent;
//location windows
		ctrl.openBald = openBald;
		ctrl.openGerr = openGerr;
		ctrl.openPort = openPort;


//for MENU items
		function getItems() {
			ctrl.$http.get('http://localhost:8080/item/')
			.then(function(res){
				console.log("workin");
				console.log(res.data);
				ctrl.items = res.data;
			})
		};

		function gotoauth() {
			$state.go('auth');
		}

//Staff modal window
	    function open(size) {
	      var modalInstance = ctrl.uibModal.open({
	        animation: ctrl.animationsEnabled,
	        templateUrl: './../sites/partials/staff.html',
	        controller: 'staffctrl as ctrl',
	        size: size,
	      });
	 	}

//History modal window
	    function openHistory(size) {
	      var modalInstance = ctrl.uibModal.open({
	        animation: ctrl.animationsEnabled,
	        templateUrl: './../sites/partials/history.html',
	        controller: 'historyctrl as ctrl',
	        size: size,
	      });
	  	}

//rent modal window
	    function openRent(size) {
	      var modalInstance = ctrl.uibModal.open({
	        animation: ctrl.animationsEnabled,
	        templateUrl: './../sites/partials/rent.html',
	        controller: 'rentctrl as ctrl',
	        size: size,
	      });
	  	}

//Baldwin location modal window
	    function openBald(size) {
	      var modalInstance = ctrl.uibModal.open({
	        animation: ctrl.animationsEnabled,
	        templateUrl: './../sites/partials/baldwin.html',
	        size: size,
	      });
	  	}

//Portland location modal window
	    function openPort(size) {
	      var modalInstance = ctrl.uibModal.open({
	        animation: ctrl.animationsEnabled,
	        templateUrl: './../sites/partials/portland.html',
	        size: size,
	      });
	  	}	

//Gerrald location modal window
	    function openGerr(size) {
	      var modalInstance = ctrl.uibModal.open({
	        animation: ctrl.animationsEnabled,
	        templateUrl: './../sites/partials/gerrald.html',
	        size: size,
	      });
	  	}		  	


	};
})();