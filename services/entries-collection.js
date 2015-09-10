angular.module('jsPassword')
.service('EntriesCollection', ['$rootScope', 'DB', function($rootScope, DB) {
  this.masterAllEntries = DB.init();

  this.allEntries = _.groupBy(this.masterAllEntries, function(entry){
    return entry.data.Name.value.charAt(0).toLowerCase();
  });

  this.entries = _.clone( this.allEntries );

  this.size = function() {
    return _.size(this.masterAllEntries);
  };

  this.at = function(position) {
    return this.masterAllEntries[position];
  };

  this.showAllEntries = function() {
    this.entries = _.clone( this.allEntries );
    $rootScope.$broadcast('EntriesCollection::changed');
  };

  /** Shows only the favorite entries **/
  this.showFavoriteEntries = function() {
    var entries = _.clone( this.allEntries );

    var newEntries = {};
    _.each(entries, function(entries, letter){
      _.each(entries, function(entry){
        if(entry.data.Favorite.value){
          if( !_.has(newEntries, letter) ) {
            newEntries[letter] = [];
          }
          newEntries[letter].push( entry );
        }
      });
    });

    this.entries = newEntries;
    $rootScope.$broadcast('EntriesCollection::changed');
  };

  this.new = function(data) {
    var newEntry = DB.new(data);
    this.masterAllEntries.push(newEntry);

    this.allEntries = _.groupBy(this.masterAllEntries, function(entry){
      return entry.data.Name.value.charAt(0).toLowerCase();
    });

    this.entries = _.clone( this.allEntries );

    return newEntry;
  };

  this.prepareNew = function() {
    return DB.prepareNew();
  };

  this.find = function(id) {
    var ret = {};
    _.each(this.entries, function(entries, letter){
      _.each(entries, function(entry){
        if(entry.id == id){
          return ret = entry;
        }
      });
      if(ret) return;
    });

    return ret.data;
  };

  this.update = function(id, data) {
    DB.update(id, data);

    _.find(this.masterAllEntries, function(entry){
      if(entry.id == id) {
        entry.data = data;
        return true;
      }

      return false;
    });

    this.allEntries = _.groupBy(this.masterAllEntries, function(entry){
      return entry.data.Name.value.charAt(0).toLowerCase();
    });

    this.entries = _.clone( this.allEntries );
  };
}]);
