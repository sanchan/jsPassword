angular.module('jsPassword')
.controller('EntryColumn', ['$rootScope', '$scope', 'EntriesCollection', '$location', '$stateParams', '$state', function($rootScope, $scope, EntriesCollection, $location, $stateParams, $state) {
  $scope.entryId = $stateParams.entryId;

  $scope.validate = function() {
    // Name is mandatory
    if(!$scope.entry.Name.value.trim().length) {
      return false;
    }
    return true;
  };

  $scope.cancel = function() {
    $location.path('/entry/' + $scope.entryId + '/show');
  };

  $scope.save = function() {
    if ($scope.validate()) {
      // If $state.current.data.new == true, then we are creating a new entry
      if($state.current.data && $state.current.data.new) {
        // EntriesCollection.new({id: parseInt($scope.entryId), data: $scope.entry});
        $scope.entryId = EntriesCollection.nextId();
        EntriesCollection.new({id: $scope.entryId, data: $scope.entry});
      } else { // we are editing an existing one
        EntriesCollection.update(parseInt($scope.entryId), $scope.entry);
      }
      $location.path('/entry/' + $scope.entryId + '/show');
    } else {
      // Something was wrong
    }
  };

  $scope.destroy = function() {
    EntriesCollection.destroy($scope.entryId);
    var firstEntry = storedb('EntriesCollection').find();

    if(firstEntry.length) {
      $location.path('/entry/' + firstEntry[0].id + '/show');
    } else {
      $location.path('/entry/empty');
    }
  };

  $scope.selectEntry = function(id) {
    // NOTE WARNING If in the future there is a Date type element, this clone method must change http://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-clone-an-object#comment39444922_5344074
    if(!id) {
      id = storedb('EntriesCollection').find()[0].id;
    }
    $scope.entry = JSON.parse(JSON.stringify(EntriesCollection.find(id)));
  };

  // If $state.current.data.new == true, then we are creating a new entry
  if($state.current.data && $state.current.data.new) {
    $scope.isNew = true;
    $scope.entry = EntriesCollection.prepareNew().data;
  } else if(EntriesCollection.size() > 0) { // we are showing/editing an existing one
    $scope.selectEntry($scope.entryId);
  } else { // EntriesCollection.size() == 0, then there is no entry on the DB.
    $location.path('/entry/empty');
  }

  // Update every Material Design component from the DOM.
  setTimeout(componentHandler.upgradeDom, 1);
}]);
