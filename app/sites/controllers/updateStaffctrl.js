
(function(){
	'use strict'

			angular
				.module('userpage')
				.controller('updateStaffctrl', updateStaffctrl);

	function updateStaffctrl($stateParams, $http, $state, Upload) {
		var ctrl= this;
		ctrl.$http = $http;
		ctrl.$stateParams = $stateParams;
		ctrl.state= $state;
		ctrl.updateStaff = updateStaff;
		ctrl.uploadFile = uploadFile;


		ctrl.$http.get('http://localhost:8080/staffs/'+ ctrl.$stateParams.staffId)
		.then(function(res) {
		ctrl.staffs = res.data;
		})

//Staff update

		function updateStaff() {

			var updateStaff = {
				name	: ctrl.staffs.name,
				image	: ctrl.staffs.image,
				bio     : ctrl.staffs.bio,
				category: ctrl.staffs.category,
			};

			ctrl.$http.put('http://localhost:8080/staffs/' + ctrl.$stateParams.staffId, updateStaff)
			.then(function(res){
				console.log(res.data);
				ctrl.staffs=res.data;
				ctrl.state.go('board');
			})
		}

		function uploadFile(file) {

		    file.upload = Upload.upload({
		      url: '/img',
		      data: {file: file}
		    })
			.then(function(res) {
				console.log(res);
				ctrl.staffs.image = 'http://localhost:8080/uploads/' + res.data[0].filename;
				//ctrl.updateStaff();
			}, function(err) {
				console.log(err);
			})
  		}



	};
})();