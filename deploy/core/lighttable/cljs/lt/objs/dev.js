// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.objs.dev');
goog.require('cljs.core');
goog.require('lt.objs.command');
goog.require('lt.objs.notifos');
goog.require('lt.object');
goog.require('lt.objs.app');
goog.require('lt.util.ipc');
goog.require('lt.util.js');
goog.require('lt.objs.cache');
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"dev-inspector","dev-inspector",-994386787),new cljs.core.Keyword(null,"desc","desc",2093485764),"Dev: Open Developer Tools",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.util.ipc.send.call(null,"toggleDevTools",lt.objs.app.window_number.call(null));
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"toggle-edge","toggle-edge",1651820408),new cljs.core.Keyword(null,"desc","desc",2093485764),"Toggle edge",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
if(cljs.core.truth_(lt.objs.cache.fetch.call(null,new cljs.core.Keyword(null,"edge","edge",919909153)))){
lt.objs.cache.store_BANG_.call(null,new cljs.core.Keyword(null,"edge","edge",919909153),false);

return lt.objs.notifos.set_msg_BANG_.call(null,"Tracking normal");
} else {
lt.objs.cache.store_BANG_.call(null,new cljs.core.Keyword(null,"edge","edge",919909153),true);

return lt.objs.notifos.set_msg_BANG_.call(null,"Tracking edge");
}
})], null));
