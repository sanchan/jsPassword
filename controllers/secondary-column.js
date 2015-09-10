angular.module('jsPassword')
.controller('SecondaryColumn', ['$scope', '$rootScope', '$location', 'EntriesCollection', function($scope, $rootScope, $location, EntriesCollection) {
  $scope.entries = EntriesCollection.entries;

  // When the user clicks on an entry, then the 'EntrySelected' message is broadcasted.
  $scope.selectEntry = function(id) {
    // $rootScope.$broadcast("EntrySelected", id);
    $location.path("/entry/" + id + '/show');
  }

  // This message is broadcasted from the SearchBar Controller when a new search is submited.
  $scope.$on('searchValue', function(event, searchValue){
    var newEntries = {};
    _.each(EntriesCollection.entries, function(entries, letter){
      _.each(entries, function(entry){
        if(entry.data.Name.trim().toLowerCase().indexOf(searchValue.toLowerCase()) != -1){
          if( !_.has(newEntries, letter) ) {
            newEntries[letter] = [];
          }
          newEntries[letter].push( entry );
        }
      });
    });
    $scope.entries = newEntries;
  });

  $scope.$on('EntriesCollection::changed', function(){
    $scope.entries = EntriesCollection.entries;
  });

}]);
