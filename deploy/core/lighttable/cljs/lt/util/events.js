// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.util.events');
goog.require('cljs.core');
/**
 * Add function `handler` to trigger when event listener `ev` fires on `elem`.
 * 
 *   If `elem` is not provided then the event `ev` and its `handler` are bound to the document.
 */
lt.util.events.capture = (function lt$util$events$capture(var_args){
var args13634 = [];
var len__7868__auto___13637 = arguments.length;
var i__7869__auto___13638 = (0);
while(true){
if((i__7869__auto___13638 < len__7868__auto___13637)){
args13634.push((arguments[i__7869__auto___13638]));

var G__13639 = (i__7869__auto___13638 + (1));
i__7869__auto___13638 = G__13639;
continue;
} else {
}
break;
}

var G__13636 = args13634.length;
switch (G__13636) {
case 2:
return lt.util.events.capture.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return lt.util.events.capture.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13634.length)].join('')));

}
});

lt.util.events.capture.cljs$core$IFn$_invoke$arity$2 = (function (ev,handler){
return lt.util.events.capture.call(null,document,ev,handler);
});

lt.util.events.capture.cljs$core$IFn$_invoke$arity$3 = (function (elem,ev,handler){
return elem.addEventListener(cljs.core.name.call(null,ev),handler,true);
});

lt.util.events.capture.cljs$lang$maxFixedArity = 3;

