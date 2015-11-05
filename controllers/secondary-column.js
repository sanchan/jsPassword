angular.module('jsPassword')
.controller('SecondaryColumn', ['$rootScope', '$scope', '$location', 'EntriesCollection', function($rootScope, $scope, $location, EntriesCollection) {
  $scope.entries = EntriesCollection.entries;

  $scope.selectEntry = function(id) {
    $location.path("/entry/" + id + '/show');
  };

  // This message is broadcasted from the SearchBar Controller when a new search is submited.
  $scope.$on('searchValue', function(event, searchValue){
    var newEntries = {};
    _.each(EntriesCollection.entries, function(entries, letter){
      _.each(entries, function(entry){
        if(entry.data.Name.value.trim().toLowerCase().indexOf(searchValue.toLowerCase()) != -1){
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
