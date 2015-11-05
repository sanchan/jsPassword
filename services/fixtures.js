angular.module('jsPassword')
.service('Fixtures', ['$rootScope', function($rootScope) {
  this.EntriesCollection = [{
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

}]);
