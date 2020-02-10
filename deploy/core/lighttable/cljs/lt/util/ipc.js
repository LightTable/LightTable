// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.util.ipc');
goog.require('cljs.core');
/**
 * Provides access to the ipc renderer.
 */
lt.util.ipc.ipc = require("electron").ipcRenderer;
if(cljs.core.truth_((process.env["IPC_DEBUG"]))){
var old_send_13643 = lt.util.ipc.transport;
var old_on_13644 = lt.util.ipc.start;
/**
 * @param {...*} var_args
 */
lt.util.ipc.transport = ((function (old_send_13643,old_on_13644){
return (function() { 
var lt$util$ipc$transport__delegate = function (args){
cljs.core.prn.call(null,"RENDERER->",args);

return cljs.core.apply.call(null,old_send_13643,args);
};
var lt$util$ipc$transport = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__13645__i = 0, G__13645__a = new Array(arguments.length -  0);
while (G__13645__i < G__13645__a.length) {G__13645__a[G__13645__i] = arguments[G__13645__i + 0]; ++G__13645__i;}
  args = new cljs.core.IndexedSeq(G__13645__a,0);
} 
return lt$util$ipc$transport__delegate.call(this,args);};
lt$util$ipc$transport.cljs$lang$maxFixedArity = 0;
lt$util$ipc$transport.cljs$lang$applyTo = (function (arglist__13646){
var args = cljs.core.seq(arglist__13646);
return lt$util$ipc$transport__delegate(args);
});
lt$util$ipc$transport.cljs$core$IFn$_invoke$arity$variadic = lt$util$ipc$transport__delegate;
return lt$util$ipc$transport;
})()
;})(old_send_13643,old_on_13644))
;

lt.util.ipc.start = ((function (old_send_13643,old_on_13644){
return (function lt$util$ipc$start(channel,cb){
return old_on_13644.call(null,channel,((function (old_send_13643,old_on_13644){
return (function() { 
var G__13647__delegate = function (_,args){
cljs.core.prn.call(null,"->RENDERER",channel,args);

return cljs.core.apply.call(null,cb,args);
};
var G__13647 = function (_,var_args){
var args = null;
if (arguments.length > 1) {
var G__13648__i = 0, G__13648__a = new Array(arguments.length -  1);
while (G__13648__i < G__13648__a.length) {G__13648__a[G__13648__i] = arguments[G__13648__i + 1]; ++G__13648__i;}
  args = new cljs.core.IndexedSeq(G__13648__a,0);
} 
return G__13647__delegate.call(this,_,args);};
G__13647.cljs$lang$maxFixedArity = 1;
G__13647.cljs$lang$applyTo = (function (arglist__13649){
var _ = cljs.core.first(arglist__13649);
var args = cljs.core.rest(arglist__13649);
return G__13647__delegate(_,args);
});
G__13647.cljs$core$IFn$_invoke$arity$variadic = G__13647__delegate;
return G__13647;
})()
;})(old_send_13643,old_on_13644))
);
});})(old_send_13643,old_on_13644))
;
} else {
}
/**
 * Delegates to ipc.send, which asynchronously sends args to the browser process's channel.
 */
lt.util.ipc.send = (function lt$util$ipc$send(var_args){
var args__7875__auto__ = [];
var len__7868__auto___13652 = arguments.length;
var i__7869__auto___13653 = (0);
while(true){
if((i__7869__auto___13653 < len__7868__auto___13652)){
args__7875__auto__.push((arguments[i__7869__auto___13653]));

var G__13654 = (i__7869__auto___13653 + (1));
i__7869__auto___13653 = G__13654;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((1) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((1)),(0),null)):null);
return lt.util.ipc.send.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7876__auto__);
});

lt.util.ipc.send.cljs$core$IFn$_invoke$arity$variadic = (function (channel,args){
return cljs.core.apply.call(null,lt.util.ipc.ipc.send,channel,cljs.core.clj__GT_js.call(null,args));
});

lt.util.ipc.send.cljs$lang$maxFixedArity = (1);

lt.util.ipc.send.cljs$lang$applyTo = (function (seq13650){
var G__13651 = cljs.core.first.call(null,seq13650);
var seq13650__$1 = cljs.core.next.call(null,seq13650);
return lt.util.ipc.send.cljs$core$IFn$_invoke$arity$variadic(G__13651,seq13650__$1);
});

/**
 * Delegates to ipc.on, which defines a callback to fire for the given channel.
 */
lt.util.ipc.on = (function lt$util$ipc$on(channel,cb){
return lt.util.ipc.ipc.on(channel,cb);
});
