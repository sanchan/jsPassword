angular.module("jsPassword").service("DB",[function(){this.init=function(){if(!storedb("EntriesCollection").find()){var e=[{id:0,data:{Name:{value:"Admin Example",type:"string"},Password:{value:"123456",type:"password"},Favorite:{value:!0,type:"boolean"},Website:{value:"https://www.example.com",type:"string"},Note:{value:"Lorem ipsum ad his scripta blandit partiendo, eum fastidii accumsan euripidis in",type:"text"}}},{id:1,data:{Name:{value:"Admin FooBar",type:"string"},Password:{value:"654321",type:"password"},Favorite:{value:!1,type:"boolean"},Website:{value:"https://www.foobar.com",type:"string"},Note:{value:"Lorem ipsum ad his scripta blandit partiendo, eum fastidii accumsan euripidis in",type:"text"}}},{id:2,data:{Name:{value:"User Entry",type:"string"},Password:{value:"qwerty",type:"password"},Favorite:{value:!1,type:"boolean"},Website:{value:"https://www.userentry.com",type:"string"},Note:{value:"Lorem ipsum ad his scripta blandit partiendo, eum fastidii accumsan euripidis in",type:"text"}}}];_.each(e,function(e){storedb("EntriesCollection").insert(e)})}var e=storedb("EntriesCollection").find();return delete e._id,e},this["new"]=function(e){return storedb("EntriesCollection").insert(e),_.last(storedb("EntriesCollection").find())},this.prepareNew=function(){var e=0,t=_.last(storedb("EntriesCollection").find()).id;return t&&(e=t+1),{id:e,data:{Name:{value:"",type:"string"},Password:{value:"",type:"password"},Favorite:{value:!1,type:"boolean"},Website:{value:"",type:"string"},Note:{value:"",type:"text"}}}},this.update=function(e,t){storedb("EntriesCollection").update({id:parseInt(e)},{$set:{data:t}})}}]);