
(function(){
	'use strict'

			angular
				.module('userpage')
				.controller('updatectrl', updatectrl);

	function updatectrl($stateParams, $http, $state) {
		var ctrl= this;
		ctrl.$http = $http;
		ctrl.$stateParams = $stateParams;
		ctrl.state= $state;
		ctrl.update = update;


		ctrl.$http.get('http://localhost:8080/item/'+ ctrl.$stateParams.itemId)
		.then(function(res) {
		ctrl.items = res.data;
		})
	
//item update

		function update() {

			var updateItem = {
				name	: ctrl.items.name,
				price	: ctrl.items.price,
				category: ctrl.items.category,
			};

			ctrl.$http.put('http://localhost:8080/item/' + ctrl.$stateParams.itemId, updateItem)
			.then(function(res){
				console.log(res.data);
				ctrl.items=res.data;
				ctrl.state.go('board');
			})
		}

	};
})();