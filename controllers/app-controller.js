angular.module('jsPassword')
.controller('AppController', ['$rootScope', '$scope', 'EntriesCollection', '$location', '$stateParams', function($rootScope, $scope, EntriesCollection, $location, $stateParams) {
  $scope.addNewEntry = function() {
    $location.path('/entry/new');
  };
}]);
