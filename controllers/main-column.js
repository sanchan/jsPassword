angular.module("jsPassword")
.controller('MainColumn', ['$scope', 'EntriesCollection', function($scope, EntriesCollection) {
  $scope.showAllEntries = function() {
    EntriesCollection.showAllEntries();
  };

  $scope.showFavoriteEntries = function() {
    EntriesCollection.showFavoriteEntries();
  };
}]);
