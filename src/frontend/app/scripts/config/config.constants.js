(function(angular, undefined) {
  "use strict";

  angular.module('frontendApp.config', [])

    .constant('BACKEND_API', 'https://blockchainbib.doc.ic.ac.uk/')
    //.constant('BACKEND_API', 'http://localhost:8080/')
    .constant('VERSION_INFO', {version: '0.0.1', build: 'test build'})

    .constant('DEBUG', true)

  ;
})(angular);
