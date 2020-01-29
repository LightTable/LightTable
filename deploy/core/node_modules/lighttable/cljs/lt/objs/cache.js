// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.objs.cache');
goog.require('cljs.core');
goog.require('lt.object');
goog.require('lt.objs.files');
goog.require('cljs.reader');
lt.objs.cache.cache_path = lt.objs.files.lt_user_dir.call(null,"ltcache");
lt.objs.cache.settings_path = [cljs.core.str(lt.objs.files.lt_user_dir.call(null,"ltcache/default.clj"))].join('');
lt.objs.cache.settings = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
lt.objs.cache.on_disk = (function lt$objs$cache$on_disk(cb){
if(cljs.core.truth_(lt.objs.files.file_QMARK_.call(null,lt.objs.cache.settings_path))){
} else {
lt.objs.files.save.call(null,lt.objs.cache.settings_path,cljs.core.PersistentArrayMap.EMPTY);
}

return lt.objs.files.open.call(null,lt.objs.cache.settings_path,(function (data){
if(!(cljs.core.empty_QMARK_.call(null,data))){
return cb.call(null,cljs.reader.read_string.call(null,new cljs.core.Keyword(null,"content","content",15833224).cljs$core$IFn$_invoke$arity$1(data)));
} else {
return cb.call(null,cljs.core.PersistentArrayMap.EMPTY);
}
}));
});
lt.objs.cache.save = (function lt$objs$cache$save(){
return lt.objs.cache.on_disk.call(null,(function (data){
var updated = cljs.core.merge.call(null,data,cljs.core.deref.call(null,lt.objs.cache.settings));
lt.objs.files.save.call(null,lt.objs.cache.settings_path,cljs.core.pr_str.call(null,updated));

return cljs.core.reset_BANG_.call(null,lt.objs.cache.settings,updated);
}));
});
lt.objs.cache.fetch = (function lt$objs$cache$fetch(k){
return cljs.core.deref.call(null,lt.objs.cache.settings).call(null,k);
});
lt.objs.cache.store_BANG_ = (function lt$objs$cache$store_BANG_(k,v){
cljs.core.swap_BANG_.call(null,lt.objs.cache.settings,cljs.core.assoc,k,v);

return lt.objs.cache.save.call(null);
});
lt.objs.cache.store_in_BANG_ = (function lt$objs$cache$store_in_BANG_(ks,v){
cljs.core.swap_BANG_.call(null,lt.objs.cache.settings,cljs.core.assoc_in,ks,v);

return lt.objs.cache.save.call(null);
});
lt.objs.cache.init = (function lt$objs$cache$init(){
return lt.objs.cache.on_disk.call(null,(function (setts){
return cljs.core.swap_BANG_.call(null,lt.objs.cache.settings,cljs.core.merge,setts);
}));
});
/**
 * 
 */
lt.objs.cache.__BEH__init = (function lt$objs$cache$__BEH__init(this$){
if(cljs.core.truth_(lt.objs.files.exists_QMARK_.call(null,lt.objs.cache.cache_path))){
} else {
lt.objs.files.mkdir.call(null,lt.objs.cache.cache_path);
}

return lt.objs.cache.init.call(null);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.cache","init","lt.objs.cache/init",-1455095280),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"deploy","deploy",-2006774212),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.cache.__BEH__init);
lt.object.tag_behaviors.call(null,new cljs.core.Keyword(null,"app","app",-560961707),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("lt.objs.cache","init","lt.objs.cache/init",-1455095280)], null));
