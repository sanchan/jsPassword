angular.module("jsPassword")
.controller('MainColumn', ['$rootScope', '$scope', 'EntriesCollection', function($rootScope, $scope, EntriesCollection) {
  $scope.showAllEntries = function() {
    $rootScope.$broadcast("ShowAllEntries");
  };

  $scope.showFavoriteEntries = function() {
    $rootScope.$broadcast("ShowFavoriteEntries");
  };
}]);
