angular.module('jsPassword')
.controller('LockScreenController', ['$timeout', '$scope', '$location', 'EntriesCollection', function($timeout, $scope, $location, EntriesCollection) {
  $scope.keypressed = function(keyEvent) {
    if (keyEvent.which === 13) {
      if($scope.masterPassword === null || $scope.masterPassword.length === 0) {
        $scope.masterPasswordError = true;
      } else {
        $scope.open = true;

        if(EntriesCollection.size() > 0) {
          $location.path('/entry/' + EntriesCollection.at(0).id + '/show');
        } else {
          $location.path('/entry/empty');
        }
      }
    } else {
      $scope.masterPasswordError = false;
    }
  };
}]);
