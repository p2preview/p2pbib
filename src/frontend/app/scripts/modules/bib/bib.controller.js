(function () {
    'use strict';

    angular
        .module('frontendApp.bib')
        .controller('BibController', BibController)
        .filter("emptyToEnd", function () {
                return function (array, key) {
                    var present = array.filter(function (item) {
                        return item[key];
                    });
                    var empty = array.filter(function (item) {
                        return !item[key]
                    });
                    return present.concat(empty);
                };
            });
    BibController.$inject = [
        '$state',
        '$scope',
        '$rootScope',
        '$log',
        '$filter',
        'Bib',
        'NotificationHandler'];
    function BibController($state, $scope, $rootScope, $log, $filter, Bib, NotificationHandler) {
        $rootScope.activateHttpInterceptor();

        var vm = this;
        $rootScope.pageTitle = "Blockchain Bibliography";

        /**
         * Configuration needed for sorting lectures
         * @type {string}
         */
        vm.predicate =  'year';
        vm.reverse = true;
        vm.choices =['year', 'title', 'author']

        /**
         * Mobile disclaimer config
         */
        vm.showDisclaimer = false

        /**
         * Extract all bib entries from backend
         * @error: Shows error notification
         */
        vm.bibs = [];
        var promise = Bib.readAllStatic();
        promise.success(function(result){
            vm.bibs = result;
        }).error(function (error) {
            NotificationHandler.error(error);
        });


        /**
         * Sorts the lecture list by the given predicate
         * @param predicate - predicate to sort by
         */
        vm.order = function (predicate) {
            vm.reverse = (vm.predicate === predicate) ? !vm.reverse : false;
            vm.predicate = predicate;
        };

        /**
         *  deactivate http interceptor on this page (causes problems with
         *  type-ahead  functionality)
         */
        function pauseInterceptor() {
            $rootScope.deactivateHttpInterceptor();
        }

        /**
         * Re-activate interceptor
         */
        function resumeInterceptor() {
            $rootScope.activateHttpInterceptor();
        }


    }


})();
