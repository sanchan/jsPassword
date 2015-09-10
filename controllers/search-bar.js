angular.module('jsPassword')
.controller('SearchBar', ['$scope', '$rootScope', function($scope, $rootScope) {
  $scope.filter = function() {
    $rootScope.$broadcast("searchValue", $scope.searchValue);
  }
}]);
