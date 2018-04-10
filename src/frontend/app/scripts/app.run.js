(function () {
  'use strict';

  angular
    .module('frontendApp')
    .run(frontendRun);

  frontendRun.$inject = ['$rootScope', '$log', '$state', '$cookies', '$timeout'];
  function frontendRun($rootScope, $log, $state, $cookies, $timeout) {

      $rootScope.loading = false;
      var preliminary_finish = false;

      $rootScope.interceptorAcvite = true;

      $rootScope.$on('loading:progress', function () {

          // if the request is finished within 100ms => do not go into loading state
          if ($rootScope.interceptorAcvite) {
              preliminary_finish = false;
              $rootScope.loading = true;
          }

      });


      $rootScope.$on('loading:finish', function () {
          if ($rootScope.interceptorAcvite || $rootScope.loading) {

              preliminary_finish = true;

              // if a new http request is sent with 100ms => stay in loading state
              $timeout(function () {
                  if (preliminary_finish) {
                      //$log.debug("done");
                      $rootScope.loading = false;
                  }
              }, 100);
          }
      });

      $rootScope.activateHttpInterceptor = function () {
          $log.info("started");

          $rootScope.interceptorAcvite = true;
      };

      $rootScope.deactivateHttpInterceptor = function () {
          $rootScope.interceptorAcvite = false;
      };

  }
})();
