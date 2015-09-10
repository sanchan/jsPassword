angular.module("jsPassword")
.controller('MainColumn', ['$scope', 'EntriesCollection', function($scope, EntriesCollection) {
  $scope.showAllEntries = function() {
    // angular.element( document.getElementById("page-content") ).scope().dada();
    EntriesCollection.showAllEntries();
  };

  $scope.showFavoriteEntries = function() {
    EntriesCollection.showFavoriteEntries();
  };
}]);
