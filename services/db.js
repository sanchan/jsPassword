angular.module('jsPassword')
.service('DB', [function() {
  this.init = function() {
    // Check if we didn't create the fixtures yet
    // storedb('EntriesCollection').remove();
    if(!storedb('EntriesCollection').find()) {
      var entries = [{
        "id": 0,
        "data": {
          "Name": {
            "value": "Admin Example",
            "type": "string"
          },
          "Password": {
            "value": "123456",
            "type": "password"
          },
          "Favorite": {
            "value": true,
            "type": "boolean"
          },
          "Website": {
            "value": "https://www.example.com",
            "type": "string"
          },
          "Note": {
            "value": "Lorem ipsum ad his scripta blandit partiendo, eum fastidii accumsan euripidis in",
            "type": "text"
          }
        }
      },
      {
        "id": 1,
        "data": {
          "Name": {
            "value": "Admin FooBar",
            "type": "string"
          },
          "Password": {
            "value": "654321",
            "type": "password"
          },
          "Favorite": {
            "value": false,
            "type": "boolean"
          },
          "Website": {
            "value": "https://www.foobar.com",
            "type": "string"
          },
          "Note": {
            "value": "Lorem ipsum ad his scripta blandit partiendo, eum fastidii accumsan euripidis in",
            "type": "text"
          }
        }
      },
      {
        "id": 2,
        "data": {
          "Name": {
            "value": "User Entry",
            "type": "string"
          },
          "Password": {
            "value": "qwerty",
            "type": "password"
          },
          "Favorite": {
            "value": false,
            "type": "boolean"
          },
          "Website": {
            "value": "https://www.userentry.com",
            "type": "string"
          },
          "Note": {
            "value": "Lorem ipsum ad his scripta blandit partiendo, eum fastidii accumsan euripidis in",
            "type": "text"
          }
        }
      }];

      _.each(entries, function(entry){
        storedb('EntriesCollection').insert(entry);
      });

    }

    var entries = storedb('EntriesCollection').find();
    delete entries['_id'];

    return entries;
  };

  /** Creates a new entry and returns it **/
  this.new = function(data) {
    storedb('EntriesCollection').insert(data);

    return _.last(storedb('EntriesCollection').find());
  };

  this.prepareNew = function() {
    var newEntryId = 0;
    var lastEntryId = _.last(storedb('EntriesCollection').find())['id'];
    if(lastEntryId) {
      newEntryId = lastEntryId + 1;
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
    }
  };

  this.update = function(id, data) {
    storedb('EntriesCollection').update({"id": parseInt(id)}, {"$set": {"data": data}});
  };
}]);
