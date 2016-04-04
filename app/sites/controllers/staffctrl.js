(function(){
  'use strict'

      angular
        .module('userpage')
        .controller('staffctrl', staffctrl);

  function staffctrl($uibModalInstance, $log, $state,$http) {
    var ctrl= this;
    ctrl.$uibModalInstance =$uibModalInstance;
    ctrl.$log = $log;
    ctrl.open = open
    ctrl.state = $state;
    ctrl.custom = false;
    ctrl.$http = $http;

    console.log('instaff controller');
    ctrl.getStaff =getStaff;
    ctrl.getStaff();
    ctrl.staffs;

    ctrl.animationsEnabled = true;

    //for Staff 
    function getStaff() {
      console.log('instaff get staff');
      ctrl.$http.get('http://localhost:8080/staffs/')
      .then(function(res){
        console.log("Staff workin");
        console.log(res.data);
        ctrl.staffs = res.data;
      })
    };


  }
})();