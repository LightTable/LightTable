// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.util.events');
goog.require('cljs.core');
/**
 * Add function `handler` to trigger when event listener `ev` fires on `elem`.
 * 
 *   If `elem` is not provided then the event `ev` and its `handler` are bound to the document.
 */
lt.util.events.capture = (function lt$util$events$capture(var_args){
var args13632 = [];
var len__7868__auto___13635 = arguments.length;
var i__7869__auto___13636 = (0);
while(true){
if((i__7869__auto___13636 < len__7868__auto___13635)){
args13632.push((arguments[i__7869__auto___13636]));

var G__13637 = (i__7869__auto___13636 + (1));
i__7869__auto___13636 = G__13637;
continue;
} else {
}
break;
}

var G__13634 = args13632.length;
switch (G__13634) {
case 2:
return lt.util.events.capture.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return lt.util.events.capture.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13632.length)].join('')));

}
});

lt.util.events.capture.cljs$core$IFn$_invoke$arity$2 = (function (ev,handler){
return lt.util.events.capture.call(null,document,ev,handler);
});

lt.util.events.capture.cljs$core$IFn$_invoke$arity$3 = (function (elem,ev,handler){
return elem.addEventListener(cljs.core.name.call(null,ev),handler,true);
});

lt.util.events.capture.cljs$lang$maxFixedArity = 3;

