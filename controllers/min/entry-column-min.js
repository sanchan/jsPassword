angular.module("jsPassword").controller("EntryColumn",["$rootScope","$scope","EntriesCollection","$location","$stateParams","$state",function(t,e,n,r,o,a){setTimeout(componentHandler.upgradeDom,1),e.entryId=o.entryId,e.validate=function(){return!0},e.cancel=function(){r.path("/entry/"+e.entryId+"/show")},e.save=function(){e.validate()&&(a.current.data&&a.current.data["new"]?(console.log(e.entry),e.entryId=n.nextId(),n["new"]({id:e.entryId,data:e.entry})):n.update(parseInt(e.entryId),e.entry),r.path("/entry/"+e.entryId+"/show"))},e.destroy=function(){n.destroy(e.entryId);var t=storedb("EntriesCollection").find();console.log(t),t.length?r.path("/entry/"+t[0].id+"/show"):r.path("/entry/empty")},e.selectEntry=function(t){e.entry=JSON.parse(JSON.stringify(n.find(t)))},a.current.data&&a.current.data["new"]?(e.isNew=!0,e.entry=n.prepareNew().data):n.size()>0?e.selectEntry(e.entryId||0):r.path("/entry/empty"),e.$on("EntriesCollection::changed",function(){}),setTimeout(componentHandler.upgradeDom,1)}]);