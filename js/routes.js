app.config(["$stateProvider", function($stateProvider){
  $stateProvider
    .state('entry-column-empty', {
      url: "/entry/empty",
      templateUrl: 'templates/entry-column-empty.html',
      controller: 'EmptyEntryColumn',
    })
    .state('entry-column-new', {
      url: "/entry/new",
      templateUrl: 'templates/entry-column-edit.html',
      controller: 'EntryColumn',
      data: {
        new: true
      }
    })
    .state('entry-column-show', {
      url: "/entry/:entryId/show",
      templateUrl: 'templates/entry-column-show.html',
      controller: 'EntryColumn'
    })
    .state('entry-column-edit', {
      url: "/entry/:entryId/edit",
      templateUrl: 'templates/entry-column-edit.html',
      controller: 'EntryColumn'
    });
}]);
