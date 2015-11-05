angular.module('jsPassword')
.controller('EntryColumn', ['$rootScope', '$scope', 'EntriesCollection', '$location', '$stateParams', '$state', function($rootScope, $scope, EntriesCollection, $location, $stateParams, $state) {
  // Update every Material Design component from the DOM.
  setTimeout(componentHandler.upgradeDom, 1);
  
  $scope.entryId = $stateParams.entryId;

  $scope.validate = function() {
    // Dummy right now... everything is fine
    return true;
  };

  $scope.cancel = function() {
    $location.path('/entry/' + $scope.entryId + '/show');
  };

  $scope.save = function() {
    // console.log($scope.entryId);
    if ($scope.validate()) {
      // If $state.current.data.new == true, then we are creating a new entry
      if($state.current.data && $state.current.data.new) {
        console.log($scope.entry);
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
    console.log(firstEntry);
    if(firstEntry.length) {
      $location.path('/entry/' + firstEntry[0].id + '/show');
    } else {
      $location.path('/entry/empty');
    }
  };

  $scope.selectEntry = function(id) {
    // NOTE WARNING If in the future there is a Date type element, this clone method must change http://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-clone-an-object#comment39444922_5344074
    $scope.entry = JSON.parse(JSON.stringify(EntriesCollection.find(id)));
  };

  // If $state.current.data.new == true, then we are creating a new entry
  if($state.current.data && $state.current.data.new) {
    $scope.isNew = true;
    $scope.entry = EntriesCollection.prepareNew().data;
  } else if(EntriesCollection.size() > 0) { // we are showing/editing an existing one
    $scope.selectEntry($scope.entryId || 0);
  } else { // EntriesCollection.size() == 0, then there is no entry on the DB.
    $location.path('/entry/empty');
  }

  $scope.$on('EntriesCollection::changed', function(){
    // $scope.entry = EntriesCollection.find($scope.entryId);
  });


  // Update every Material Design component from the DOM.
  setTimeout(componentHandler.upgradeDom, 1);
}]);
