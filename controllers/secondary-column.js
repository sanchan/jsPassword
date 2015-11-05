angular.module('jsPassword')
.controller('SecondaryColumn', ['$rootScope', '$scope', '$timeout', '$location', 'EntriesCollection', function($rootScope, $scope, $timeout, $location, EntriesCollection) {
  $scope.entries = EntriesCollection.getAllEntriesGrouped();

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

  $scope.$on('ShowAllEntries', function() {
    $scope.entries = EntriesCollection.getAllEntriesGrouped();
  });

  $scope.$on('ShowFavoriteEntries', function() {
    $scope.entries = EntriesCollection.getFavoriteEntriesGrouped();
  });

  $scope.$on('EntriesCollection::changed', function(){
    $scope.entries = EntriesCollection.getAllEntriesGrouped();
  });

}]);
