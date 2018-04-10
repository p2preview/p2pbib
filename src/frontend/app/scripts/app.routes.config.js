(function () {
    'use strict';

    angular
        .module('frontendApp')
        .config(frontendRouteConfig)
    ;

    frontendRouteConfig.$inject = ['$urlRouterProvider', '$stateProvider'];
    function frontendRouteConfig($urlRouterProvider, $stateProvider) {

        $urlRouterProvider.otherwise('/bibliography');

        $stateProvider
            .state('main', {
                url: '/',
                abstract: true,
                templateUrl: 'views/main/main.html',
                controllerAs: 'vm'
            })
            .state('main.bibliography', {
                templateUrl: 'views/bib/bib.html',
                url: 'bibliography',
                controller: 'BibController',
                controllerAs: 'vm'
            });
    }

})();
