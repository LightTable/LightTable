// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.util.kahn');
goog.require('cljs.core');
goog.require('clojure.set');
/**
 * Returns set `s` with `x` removed.
 */
lt.util.kahn.without = (function lt$util$kahn$without(s,x){
return clojure.set.difference.call(null,s,cljs.core.PersistentHashSet.fromArray([x], true));
});
/**
 * Returns the pair `[element, s']` where `s'` is set `s` with `element` removed.
 */
lt.util.kahn.take_1 = (function lt$util$kahn$take_1(s){
if(!(cljs.core.empty_QMARK_.call(null,s))){
} else {
throw (new Error("Assert failed: (not (empty? s))"));
}

var item = cljs.core.first.call(null,s);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [item,lt.util.kahn.without.call(null,s,item)], null);
});
/**
 * Returns the set of nodes in graph `g` for which there are no incoming
 *   edges, where `g` is a map of nodes to sets of nodes.
 */
lt.util.kahn.no_incoming = (function lt$util$kahn$no_incoming(g){
var nodes = cljs.core.set.call(null,cljs.core.keys.call(null,g));
var have_incoming = cljs.core.apply.call(null,clojure.set.union,cljs.core.vals.call(null,g));
return clojure.set.difference.call(null,nodes,have_incoming);
});
/**
 * Returns `g` with empty outgoing edges added for nodes with incoming
 *   edges only.
 * 
 *   Example:
 *   ```
 *   (normalize {:a #{:b}}) ;;=> {:a #{:b}, :b #{}}
 *   ```
 */
lt.util.kahn.normalize = (function lt$util$kahn$normalize(g){
var have_incoming = cljs.core.apply.call(null,clojure.set.union,cljs.core.vals.call(null,g));
return cljs.core.reduce.call(null,((function (have_incoming){
return (function (p1__20421_SHARP_,p2__20422_SHARP_){
if(cljs.core.truth_(cljs.core.get.call(null,p1__20421_SHARP_,p2__20422_SHARP_))){
return p1__20421_SHARP_;
} else {
return cljs.core.assoc.call(null,p1__20421_SHARP_,p2__20422_SHARP_,cljs.core.PersistentHashSet.EMPTY);
}
});})(have_incoming))
,g,have_incoming);
});
/**
 * Proposes a topological sort for directed graph `g` using Kahn's
 * algorithm, where `g` is a map of nodes to sets of nodes. If `g` is
 * cyclic, returns `nil`.
 */
lt.util.kahn.kahn_sort = (function lt$util$kahn$kahn_sort(var_args){
var args20425 = [];
var len__7868__auto___20431 = arguments.length;
var i__7869__auto___20432 = (0);
while(true){
if((i__7869__auto___20432 < len__7868__auto___20431)){
args20425.push((arguments[i__7869__auto___20432]));

var G__20433 = (i__7869__auto___20432 + (1));
i__7869__auto___20432 = G__20433;
continue;
} else {
}
break;
}

var G__20427 = args20425.length;
switch (G__20427) {
case 1:
return lt.util.kahn.kahn_sort.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 3:
return lt.util.kahn.kahn_sort.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args20425.length)].join('')));

}
});

lt.util.kahn.kahn_sort.cljs$core$IFn$_invoke$arity$1 = (function (g){
return lt.util.kahn.kahn_sort.call(null,lt.util.kahn.normalize.call(null,g),cljs.core.PersistentVector.EMPTY,lt.util.kahn.no_incoming.call(null,g));
});

lt.util.kahn.kahn_sort.cljs$core$IFn$_invoke$arity$3 = (function (g,l,s){
while(true){
if(cljs.core.empty_QMARK_.call(null,s)){
if(cljs.core.every_QMARK_.call(null,cljs.core.empty_QMARK_,cljs.core.vals.call(null,g))){
return l;
} else {
return null;
}
} else {
var vec__20428 = lt.util.kahn.take_1.call(null,s);
var n = cljs.core.nth.call(null,vec__20428,(0),null);
var s_SINGLEQUOTE_ = cljs.core.nth.call(null,vec__20428,(1),null);
var m = g.call(null,n);
var g_SINGLEQUOTE_ = cljs.core.reduce.call(null,((function (g,l,s,vec__20428,n,s_SINGLEQUOTE_,m){
return (function (p1__20423_SHARP_,p2__20424_SHARP_){
return cljs.core.update_in.call(null,p1__20423_SHARP_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [n], null),lt.util.kahn.without,p2__20424_SHARP_);
});})(g,l,s,vec__20428,n,s_SINGLEQUOTE_,m))
,g,m);
var G__20435 = g_SINGLEQUOTE_;
var G__20436 = cljs.core.conj.call(null,l,n);
var G__20437 = clojure.set.union.call(null,s_SINGLEQUOTE_,clojure.set.intersection.call(null,lt.util.kahn.no_incoming.call(null,g_SINGLEQUOTE_),m));
g = G__20435;
l = G__20436;
s = G__20437;
continue;
}
break;
}
});

lt.util.kahn.kahn_sort.cljs$lang$maxFixedArity = 3;

