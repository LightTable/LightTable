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
var len__7868__auto___15367 = arguments.length;
var i__7869__auto___15368 = (0);
while(true){
if((i__7869__auto___15368 < len__7868__auto___15367)){
args__7875__auto__.push((arguments[i__7869__auto___15368]));

var G__15369 = (i__7869__auto___15368 + (1));
i__7869__auto___15368 = G__15369;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((1) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((1)),(0),null)):null);
return lt.objs.notifos.msg_STAR_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7876__auto__);
});

lt.objs.notifos.msg_STAR_.cljs$core$IFn$_invoke$arity$variadic = (function (m,p__15363){
var vec__15364 = p__15363;
var opts = cljs.core.nth.call(null,vec__15364,(0),null);
var m__$1 = ((typeof m === 'string')?m:cljs.core.pr_str.call(null,m));
return lt.object.merge_BANG_.call(null,lt.objs.statusbar.statusbar_loader,cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"message","message",-406056002),m__$1,new cljs.core.Keyword(null,"class","class",-2030961996),""], null),opts));
});

lt.objs.notifos.msg_STAR_.cljs$lang$maxFixedArity = (1);

lt.objs.notifos.msg_STAR_.cljs$lang$applyTo = (function (seq15361){
var G__15362 = cljs.core.first.call(null,seq15361);
var seq15361__$1 = cljs.core.next.call(null,seq15361);
return lt.objs.notifos.msg_STAR_.cljs$core$IFn$_invoke$arity$variadic(G__15362,seq15361__$1);
});

/**
 * Display message in bottom statusbar. Takes map of options with following keys:
 * 
 *   * :class - css class for message. Use 'error' to display error message
 *   * :timeout - Number of ms before message times out. Default is 10000 (10s)
 */
lt.objs.notifos.set_msg_BANG_ = (function lt$objs$notifos$set_msg_BANG_(var_args){
var args15370 = [];
var len__7868__auto___15373 = arguments.length;
var i__7869__auto___15374 = (0);
while(true){
if((i__7869__auto___15374 < len__7868__auto___15373)){
args15370.push((arguments[i__7869__auto___15374]));

var G__15375 = (i__7869__auto___15374 + (1));
i__7869__auto___15374 = G__15375;
continue;
} else {
}
break;
}

var G__15372 = args15370.length;
switch (G__15372) {
case 1:
return lt.objs.notifos.set_msg_BANG_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return lt.objs.notifos.set_msg_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args15370.length)].join('')));

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
var args15377 = [];
var len__7868__auto___15380 = arguments.length;
var i__7869__auto___15381 = (0);
while(true){
if((i__7869__auto___15381 < len__7868__auto___15380)){
args15377.push((arguments[i__7869__auto___15381]));

var G__15382 = (i__7869__auto___15381 + (1));
i__7869__auto___15381 = G__15382;
continue;
} else {
}
break;
}

var G__15379 = args15377.length;
switch (G__15379) {
case 0:
return lt.objs.notifos.working.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return lt.objs.notifos.working.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args15377.length)].join('')));

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
var args15384 = [];
var len__7868__auto___15387 = arguments.length;
var i__7869__auto___15388 = (0);
while(true){
if((i__7869__auto___15388 < len__7868__auto___15387)){
args15384.push((arguments[i__7869__auto___15388]));

var G__15389 = (i__7869__auto___15388 + (1));
i__7869__auto___15388 = G__15389;
continue;
} else {
}
break;
}

var G__15386 = args15384.length;
switch (G__15386) {
case 0:
return lt.objs.notifos.done_working.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return lt.objs.notifos.done_working.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args15384.length)].join('')));

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
