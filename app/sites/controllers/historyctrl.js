

(function(){
  'use strict'

      angular
        .module('userpage')
        .controller('historyctrl', historyctrl);

  function historyctrl($uibModal, $log, $state) {
    var ctrl= this;
    ctrl.$uibModal =$uibModal;
    ctrl.$log = $log;
    ctrl.ok =ok;
    ctrl.state = $state;

    ctrl.animationsEnabled = true;


      function ok() {
        ctrl.state.go('home');
      };



  }
})();


