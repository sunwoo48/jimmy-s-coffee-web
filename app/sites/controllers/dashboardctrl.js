
(function(){
	'use strict'

			angular
				.module('userpage')
				.controller('dashboardctrl', dashboardctrl);

	function dashboardctrl($stateParams, $http, $state, Upload) {
		var ctrl= this;
		ctrl.$http = $http;
		ctrl.logout = logout;
		ctrl.$stateParams = $stateParams;
		ctrl.state= $state;;
		ctrl.addItem = addItem;
		ctrl.remove = remove;
		ctrl.goUpdate = goUpdate;
		ctrl.getItems = getItems;
		ctrl.items = ctrl.getItems();
		ctrl.categories= [
			{label:'snack',value:'snack'},
			{label:'coffee',value:'coffee'},
			];




// ITEM DASH
		function getItems() {
			ctrl.$http.get('http://localhost:8080/item/')
			.then(function(res){
				console.log("workin");
				console.log(res.data);
				ctrl.items = res.data;
			})
		};

		function addItem() {

			var newItem = {
				name	: ctrl.name,
				price	: ctrl.price,
				category: ctrl.category,
			};
			console.log("adding!");
			console.log(newItem);

			ctrl.$http.post('http://localhost:8080/item', newItem)
			.then(function(res){
				console.log(res.data);
				ctrl.getItems();
			})
		};
	

		function remove(id) {
			console.log(id);
			ctrl.$http.delete('http://localhost:8080/item/' + id)
			.then(function(res){
				console.log(res.data);

				ctrl.getItems();
			})
		}

		function goUpdate(id) {
			console.log(id);
			ctrl.state.go('update', {itemId:id});

		}

// Staff DASH

		ctrl.upload = upload;

		ctrl.getStaff = getStaff;
		ctrl.staffs = ctrl.getStaff();
		ctrl.removeStaff = removeStaff;
		ctrl.addStaff = addStaff;
		ctrl.goUpdateStaff = goUpdateStaff;
		ctrl.cat= [
			{label:'ossington',value:'ossington'},
			{label:'baldwin',value:'baldwin'},
			{label:'gerrald',value:'gerrald'},
			{label:'portland',value:'portland'},
			];


		function getStaff() {
			ctrl.$http.get('http://localhost:8080/staffs/')
			.then(function(res){
				console.log("Staff workin");
				console.log(res.data);
				ctrl.staffs = res.data;
			})
		};

		function removeStaff(id) {
			// console.log(id);
			ctrl.$http.delete('http://localhost:8080/staffs/' + id)
			.then(function(res){
				console.log(res.data);
				ctrl.getStaff();
			})
		}

		function addStaff() {

			var newStaff = {
				name: ctrl.names,
		    	image: ctrl.uploadedPhoto,
		    	bio: ctrl.bio,
		    	category: ctrl.category,
			};
			console.log("adding!");
			console.log(newStaff);

			ctrl.$http.post('http://localhost:8080/staffs', newStaff)
			.then(function(res){
				console.log(res.data);
				ctrl.getStaff();
			})
		};

		function goUpdateStaff(id) {
			console.log(id);
			ctrl.state.go('updateStaff', {staffId:id});

		}


		function upload(file) {
		    file.upload = Upload.upload({
		      url: '/img',
		      data: {file: file}
		    })
			.then(function(res) {
				console.log(res);
				ctrl.uploadedPhoto = 'http://localhost:8080/uploads/' + res.data[0].filename;
			}, function(err) {
				console.log(err);
			})
  		}

  		function logout() {
  			localStorage.removeItem('authToken');
			$state.go('home');

  		}



	};
})();




