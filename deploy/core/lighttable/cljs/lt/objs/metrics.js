// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.objs.metrics');
goog.require('cljs.core');
goog.require('lt.object');
goog.require('lt.objs.app');
goog.require('lt.objs.cache');
goog.require('fetch.remotes');
goog.require('lt.util.js');
lt.objs.metrics.server_url = "http://app.kodowa.com";
fetch.remotes.remote_uri = [cljs.core.str(lt.objs.metrics.server_url),cljs.core.str("/_fetch")].join('');
lt.objs.metrics.active_QMARK_ = true;
lt.objs.metrics.used_QMARK_ = false;
lt.objs.metrics._metrics = cljs.core.atom.call(null,cljs.core.PersistentVector.EMPTY);
lt.objs.metrics.metric_rate = (30000);
lt.objs.metrics.used_BANG_ = (function lt$objs$metrics$used_BANG_(){
return lt.objs.metrics.used_QMARK_ = true;
});
lt.objs.metrics.capture_BANG_ = (function lt$objs$metrics$capture_BANG_(var_args){
var args__7875__auto__ = [];
var len__7868__auto___13991 = arguments.length;
var i__7869__auto___13992 = (0);
while(true){
if((i__7869__auto___13992 < len__7868__auto___13991)){
args__7875__auto__.push((arguments[i__7869__auto___13992]));

var G__13993 = (i__7869__auto___13992 + (1));
i__7869__auto___13992 = G__13993;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((1) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((1)),(0),null)):null);
return lt.objs.metrics.capture_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7876__auto__);
});

lt.objs.metrics.capture_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ev,p__13987){
var vec__13988 = p__13987;
var ex = cljs.core.nth.call(null,vec__13988,(0),null);
var mtr = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"ev","ev",-406827324),ev,new cljs.core.Keyword(null,"ts","ts",1617209904),lt.util.js.now.call(null)], null);
var mtr__$1 = (cljs.core.truth_(ex)?cljs.core.assoc.call(null,mtr,new cljs.core.Keyword(null,"ex","ex",-1413771341),ex):mtr);
return cljs.core.swap_BANG_.call(null,lt.objs.metrics._metrics,cljs.core.conj,mtr__$1);
});

lt.objs.metrics.capture_BANG_.cljs$lang$maxFixedArity = (1);

lt.objs.metrics.capture_BANG_.cljs$lang$applyTo = (function (seq13985){
var G__13986 = cljs.core.first.call(null,seq13985);
var seq13985__$1 = cljs.core.next.call(null,seq13985);
return lt.objs.metrics.capture_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__13986,seq13985__$1);
});

lt.objs.metrics.send = (function lt$objs$metrics$send(mtrs){
return fetch.remotes.remote_callback.call(null,"metrics!",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [mtrs,lt.objs.cache.fetch.call(null,new cljs.core.Keyword(null,"uid","uid",-1447769400))], null),null);
});
lt.objs.metrics.flush = (function lt$objs$metrics$flush(){
if(cljs.core.truth_(lt.objs.metrics.active_QMARK_)){
var temp__4657__auto__ = cljs.core.seq.call(null,cljs.core.deref.call(null,lt.objs.metrics._metrics));
if(temp__4657__auto__){
var cur = temp__4657__auto__;
cljs.core.reset_BANG_.call(null,lt.objs.metrics._metrics,cljs.core.PersistentVector.EMPTY);

return lt.objs.metrics.send.call(null,cur);
} else {
return null;
}
} else {
return null;
}
});
lt.objs.metrics.init = (function lt$objs$metrics$init(){
if(cljs.core.truth_(lt.objs.cache.fetch.call(null,new cljs.core.Keyword(null,"no-metrics","no-metrics",-948965801)))){
lt.objs.metrics.active_QMARK_ = false;
} else {
}

if(cljs.core.truth_(lt.objs.metrics.active_QMARK_)){
fetch.remotes.remote_callback.call(null,"session",cljs.core.PersistentVector.EMPTY,(function (uid){
if(cljs.core.truth_(lt.objs.cache.fetch.call(null,new cljs.core.Keyword(null,"uid","uid",-1447769400)))){
} else {
lt.objs.cache.store_BANG_.call(null,new cljs.core.Keyword(null,"uid","uid",-1447769400),uid);
}

lt.objs.metrics.capture_BANG_.call(null,new cljs.core.Keyword(null,"session-created","session-created",-959598484));

return lt.util.js.every.call(null,lt.objs.metrics.metric_rate,lt.objs.metrics.flush);
}));

return lt.util.js.every.call(null,(60000),(function (){
if(cljs.core.truth_(lt.objs.metrics.used_QMARK_)){
lt.objs.metrics.used_QMARK_ = false;

return lt.objs.metrics.capture_BANG_.call(null,new cljs.core.Keyword(null,"metrics.minute","metrics.minute",-2019209646));
} else {
return null;
}
}));
} else {
return null;
}
});
/**
 * 
 */
lt.objs.metrics.__BEH__init_metrics = (function lt$objs$metrics$__BEH__init_metrics(){
return lt.objs.metrics.init.call(null);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.metrics","init-metrics","lt.objs.metrics/init-metrics",1033174729),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"init","init",-1875481434),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.metrics.__BEH__init_metrics);
/**
 * 
 */
lt.objs.metrics.__BEH__disable_metrics = (function lt$objs$metrics$__BEH__disable_metrics(this$){
return lt.objs.metrics.active_QMARK_ = false;
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.metrics","disable-metrics","lt.objs.metrics/disable-metrics",-501775129),new cljs.core.Keyword(null,"desc","desc",2093485764),"App: Disable metrics",new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"object.instant","object.instant",-29936727),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.metrics.__BEH__disable_metrics);
