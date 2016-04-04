(function(){
  'use strict'

      angular
        .module('userpage')
        .controller('rentctrl', rentctrl);

  function rentctrl($uibModal, $log, $state) {
    var ctrl= this;
    ctrl.$uibModal =$uibModal;
    ctrl.$log = $log;
    ctrl.state = $state;

    ctrl.animationsEnabled = true;


  }
})();