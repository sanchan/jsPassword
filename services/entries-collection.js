angular.module('jsPassword')
.service('EntriesCollection', ['$rootScope', 'Fixtures', function($rootScope, Fixtures) {
  var self = this;

  this.size = function() {
    return storedb('EntriesCollection').find().length;
  };

  this.at = function(position) {
    return storedb('EntriesCollection').find()[position];
  };

  this.getAllEntriesGrouped = function() {
    return _.groupBy(storedb('EntriesCollection').find(), function(entry){
      return entry.data.Name.value.charAt(0).toLowerCase();
    });
  };

  /** Shows only the favorite entries **/
  this.getFavoriteEntriesGrouped = function() {
    var entries = _.groupBy(storedb('EntriesCollection').find(), function(entry){
      return entry.data.Name.value.charAt(0).toLowerCase();
    });

    var favEntries = {};
    _.each(entries, function(entries, letter){
      _.each(entries, function(entry){
        if(entry.data.Favorite.value){
          if( !_.has(favEntries, letter) ) {
            favEntries[letter] = [];
          }
          favEntries[letter].push( entry );
        }
      });
    });

    return favEntries;
  };

  this.nextId = function() {
    var newEntryId = 0;
    if(storedb('EntriesCollection').find().length) {
      var lastEntryId = _.last(storedb('EntriesCollection').find()).id;
      if(typeof lastEntryId === "number") {
        newEntryId = lastEntryId + 1;
      }
    }

    return newEntryId;
  };

  this.prepareNew = function() {
    var newEntryId = 0;
    if(storedb('EntriesCollection').find().length) {
      var lastEntryId = _.last(storedb('EntriesCollection').find()).id;
      if(typeof lastEntryId === "number") {
        newEntryId = lastEntryId + 1;
      }
    }

    return {
      "id": newEntryId,
      "data": {
        "Name": {
          "value": "",
          "type": "string"
        },
        "Password": {
          "value": "",
          "type": "password"
        },
        "Favorite": {
          "value": false,
          "type": "boolean"
        },
        "Website": {
          "value": "",
          "type": "string"
        },
        "Note": {
          "value": "",
          "type": "text"
        }
      }
    };
  };

  this.new = function(data) {
    storedb('EntriesCollection').insert(data);

    $rootScope.$broadcast('EntriesCollection::changed');
  };

  this.update = function(id, data) {
    storedb('EntriesCollection').update({"id": parseInt(id)}, {"$set": {"data": data}});

    $rootScope.$broadcast('EntriesCollection::changed');
  };

  this.destroy = function(id) {
    storedb('EntriesCollection').remove({"id": parseInt(id)});

    $rootScope.$broadcast('EntriesCollection::changed');
  };

  this.find = function(id) {
    var ret = {};
    var entries = this.getAllEntriesGrouped();

    _.each(entries, function(entries, letter){
      _.each(entries, function(entry){
        if(entry.id == id){
          return ret = entry;
        }
      });
      if(ret) return;
    });

    return ret.data;
  };

  this.reset = function() {
    storedb('EntriesCollection').remove();
    _.each(Fixtures.EntriesCollection, function(entry){
      storedb('EntriesCollection').insert(entry);
    });
  };

  /** Init **/
}]);
