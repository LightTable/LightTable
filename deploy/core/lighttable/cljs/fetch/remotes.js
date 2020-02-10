// Compiled by ClojureScript 1.9.229 {}
goog.provide('fetch.remotes');
goog.require('cljs.core');
goog.require('fetch.core');
goog.require('cljs.reader');
fetch.remotes.remote_uri = "/_fetch";
fetch.remotes.remote_callback = (function fetch$remotes$remote_callback(remote,params,callback){
return fetch.core.xhr.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"post","post",269697687),fetch.remotes.remote_uri], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"remote","remote",-1593576576),remote,new cljs.core.Keyword(null,"params","params",710516235),cljs.core.pr_str.call(null,params)], null),(cljs.core.truth_(callback)?(function (data){
var data__$1 = ((cljs.core._EQ_.call(null,data,""))?"nil":data);
return callback.call(null,cljs.reader.read_string.call(null,data__$1));
}):null));
});
