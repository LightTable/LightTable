// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.objs.notifos');
goog.require('cljs.core');
goog.require('lt.object');
goog.require('lt.objs.statusbar');
goog.require('lt.objs.command');
goog.require('lt.util.js');
goog.require('crate.binding');
lt.objs.notifos.standard_timeout = (10000);
lt.objs.notifos.msg_STAR_ = (function lt$objs$notifos$msg_STAR_(var_args){
var args__7875__auto__ = [];
var len__7868__auto___15369 = arguments.length;
var i__7869__auto___15370 = (0);
while(true){
if((i__7869__auto___15370 < len__7868__auto___15369)){
args__7875__auto__.push((arguments[i__7869__auto___15370]));

var G__15371 = (i__7869__auto___15370 + (1));
i__7869__auto___15370 = G__15371;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((1) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((1)),(0),null)):null);
return lt.objs.notifos.msg_STAR_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7876__auto__);
});

lt.objs.notifos.msg_STAR_.cljs$core$IFn$_invoke$arity$variadic = (function (m,p__15365){
var vec__15366 = p__15365;
var opts = cljs.core.nth.call(null,vec__15366,(0),null);
var m__$1 = ((typeof m === 'string')?m:cljs.core.pr_str.call(null,m));
return lt.object.merge_BANG_.call(null,lt.objs.statusbar.statusbar_loader,cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"message","message",-406056002),m__$1,new cljs.core.Keyword(null,"class","class",-2030961996),""], null),opts));
});

lt.objs.notifos.msg_STAR_.cljs$lang$maxFixedArity = (1);

lt.objs.notifos.msg_STAR_.cljs$lang$applyTo = (function (seq15363){
var G__15364 = cljs.core.first.call(null,seq15363);
var seq15363__$1 = cljs.core.next.call(null,seq15363);
return lt.objs.notifos.msg_STAR_.cljs$core$IFn$_invoke$arity$variadic(G__15364,seq15363__$1);
});

/**
 * Display message in bottom statusbar. Takes map of options with following keys:
 * 
 *   * :class - css class for message. Use 'error' to display error message
 *   * :timeout - Number of ms before message times out. Default is 10000 (10s)
 */
lt.objs.notifos.set_msg_BANG_ = (function lt$objs$notifos$set_msg_BANG_(var_args){
var args15372 = [];
var len__7868__auto___15375 = arguments.length;
var i__7869__auto___15376 = (0);
while(true){
if((i__7869__auto___15376 < len__7868__auto___15375)){
args15372.push((arguments[i__7869__auto___15376]));

var G__15377 = (i__7869__auto___15376 + (1));
i__7869__auto___15376 = G__15377;
continue;
} else {
}
break;
}

var G__15374 = args15372.length;
switch (G__15374) {
case 1:
return lt.objs.notifos.set_msg_BANG_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return lt.objs.notifos.set_msg_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args15372.length)].join('')));

}
});

lt.objs.notifos.set_msg_BANG_.cljs$core$IFn$_invoke$arity$1 = (function (msg){
lt.objs.notifos.msg_STAR_.call(null,msg);

clearTimeout(lt.objs.notifos.cur_timeout);

return lt.objs.notifos.cur_timeout = lt.util.js.wait.call(null,lt.objs.notifos.standard_timeout,(function (){
return lt.objs.notifos.msg_STAR_.call(null,"");
}));
});

lt.objs.notifos.set_msg_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (msg,opts){
lt.objs.notifos.msg_STAR_.call(null,msg,opts);

clearTimeout(lt.objs.notifos.cur_timeout);

return lt.objs.notifos.cur_timeout = lt.util.js.wait.call(null,(function (){var or__6793__auto__ = new cljs.core.Keyword(null,"timeout","timeout",-318625318).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return lt.objs.notifos.standard_timeout;
}
})(),(function (){
return lt.objs.notifos.msg_STAR_.call(null,"");
}));
});

lt.objs.notifos.set_msg_BANG_.cljs$lang$maxFixedArity = 2;

/**
 * Display working spinner with optional statusbar message
 */
lt.objs.notifos.working = (function lt$objs$notifos$working(var_args){
var args15379 = [];
var len__7868__auto___15382 = arguments.length;
var i__7869__auto___15383 = (0);
while(true){
if((i__7869__auto___15383 < len__7868__auto___15382)){
args15379.push((arguments[i__7869__auto___15383]));

var G__15384 = (i__7869__auto___15383 + (1));
i__7869__auto___15383 = G__15384;
continue;
} else {
}
break;
}

var G__15381 = args15379.length;
switch (G__15381) {
case 0:
return lt.objs.notifos.working.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return lt.objs.notifos.working.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args15379.length)].join('')));

}
});

lt.objs.notifos.working.cljs$core$IFn$_invoke$arity$0 = (function (){
return lt.objs.notifos.working.call(null,null);
});

lt.objs.notifos.working.cljs$core$IFn$_invoke$arity$1 = (function (msg){
if(cljs.core.truth_(msg)){
lt.objs.notifos.set_msg_BANG_.call(null,msg);
} else {
}

return lt.objs.statusbar.loader_inc.call(null);
});

lt.objs.notifos.working.cljs$lang$maxFixedArity = 1;

/**
 * Hide working spinner with optional statusbar message
 */
lt.objs.notifos.done_working = (function lt$objs$notifos$done_working(var_args){
var args15386 = [];
var len__7868__auto___15389 = arguments.length;
var i__7869__auto___15390 = (0);
while(true){
if((i__7869__auto___15390 < len__7868__auto___15389)){
args15386.push((arguments[i__7869__auto___15390]));

var G__15391 = (i__7869__auto___15390 + (1));
i__7869__auto___15390 = G__15391;
continue;
} else {
}
break;
}

var G__15388 = args15386.length;
switch (G__15388) {
case 0:
return lt.objs.notifos.done_working.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return lt.objs.notifos.done_working.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args15386.length)].join('')));

}
});

lt.objs.notifos.done_working.cljs$core$IFn$_invoke$arity$0 = (function (){
return lt.objs.statusbar.loader_dec.call(null);
});

lt.objs.notifos.done_working.cljs$core$IFn$_invoke$arity$1 = (function (msg){
lt.objs.notifos.set_msg_BANG_.call(null,msg);

return lt.objs.statusbar.loader_dec.call(null);
});

lt.objs.notifos.done_working.cljs$lang$maxFixedArity = 1;

lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"reset-working","reset-working",1349925059),new cljs.core.Keyword(null,"desc","desc",2093485764),"Status Bar: Reset working indicator",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.objs.statusbar.loader_set.call(null);
})], null));
