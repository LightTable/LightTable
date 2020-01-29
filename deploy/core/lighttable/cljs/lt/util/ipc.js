// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.util.ipc');
goog.require('cljs.core');
/**
 * Provides access to the ipc renderer.
 */
lt.util.ipc.ipc = require("electron").ipcRenderer;
if(cljs.core.truth_((process.env["IPC_DEBUG"]))){
var old_send_13641 = lt.util.ipc.transport;
var old_on_13642 = lt.util.ipc.start;
/**
 * @param {...*} var_args
 */
lt.util.ipc.transport = ((function (old_send_13641,old_on_13642){
return (function() { 
var lt$util$ipc$transport__delegate = function (args){
cljs.core.prn.call(null,"RENDERER->",args);

return cljs.core.apply.call(null,old_send_13641,args);
};
var lt$util$ipc$transport = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__13643__i = 0, G__13643__a = new Array(arguments.length -  0);
while (G__13643__i < G__13643__a.length) {G__13643__a[G__13643__i] = arguments[G__13643__i + 0]; ++G__13643__i;}
  args = new cljs.core.IndexedSeq(G__13643__a,0);
} 
return lt$util$ipc$transport__delegate.call(this,args);};
lt$util$ipc$transport.cljs$lang$maxFixedArity = 0;
lt$util$ipc$transport.cljs$lang$applyTo = (function (arglist__13644){
var args = cljs.core.seq(arglist__13644);
return lt$util$ipc$transport__delegate(args);
});
lt$util$ipc$transport.cljs$core$IFn$_invoke$arity$variadic = lt$util$ipc$transport__delegate;
return lt$util$ipc$transport;
})()
;})(old_send_13641,old_on_13642))
;

lt.util.ipc.start = ((function (old_send_13641,old_on_13642){
return (function lt$util$ipc$start(channel,cb){
return old_on_13642.call(null,channel,((function (old_send_13641,old_on_13642){
return (function() { 
var G__13645__delegate = function (_,args){
cljs.core.prn.call(null,"->RENDERER",channel,args);

return cljs.core.apply.call(null,cb,args);
};
var G__13645 = function (_,var_args){
var args = null;
if (arguments.length > 1) {
var G__13646__i = 0, G__13646__a = new Array(arguments.length -  1);
while (G__13646__i < G__13646__a.length) {G__13646__a[G__13646__i] = arguments[G__13646__i + 1]; ++G__13646__i;}
  args = new cljs.core.IndexedSeq(G__13646__a,0);
} 
return G__13645__delegate.call(this,_,args);};
G__13645.cljs$lang$maxFixedArity = 1;
G__13645.cljs$lang$applyTo = (function (arglist__13647){
var _ = cljs.core.first(arglist__13647);
var args = cljs.core.rest(arglist__13647);
return G__13645__delegate(_,args);
});
G__13645.cljs$core$IFn$_invoke$arity$variadic = G__13645__delegate;
return G__13645;
})()
;})(old_send_13641,old_on_13642))
);
});})(old_send_13641,old_on_13642))
;
} else {
}
/**
 * Delegates to ipc.send, which asynchronously sends args to the browser process's channel.
 */
lt.util.ipc.send = (function lt$util$ipc$send(var_args){
var args__7875__auto__ = [];
var len__7868__auto___13650 = arguments.length;
var i__7869__auto___13651 = (0);
while(true){
if((i__7869__auto___13651 < len__7868__auto___13650)){
args__7875__auto__.push((arguments[i__7869__auto___13651]));

var G__13652 = (i__7869__auto___13651 + (1));
i__7869__auto___13651 = G__13652;
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

lt.util.ipc.send.cljs$lang$applyTo = (function (seq13648){
var G__13649 = cljs.core.first.call(null,seq13648);
var seq13648__$1 = cljs.core.next.call(null,seq13648);
return lt.util.ipc.send.cljs$core$IFn$_invoke$arity$variadic(G__13649,seq13648__$1);
});

/**
 * Delegates to ipc.on, which defines a callback to fire for the given channel.
 */
lt.util.ipc.on = (function lt$util$ipc$on(channel,cb){
return lt.util.ipc.ipc.on(channel,cb);
});
