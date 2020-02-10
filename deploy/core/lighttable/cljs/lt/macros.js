// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.macros');
goog.require('cljs.core');
goog.require('clojure.walk');
lt.macros.namify = (function lt$macros$namify(type,keyword){
return cljs.core.symbol.call(null,[cljs.core.str("__"),cljs.core.str(type),cljs.core.str("__"),cljs.core.str(cljs.core.name.call(null,keyword).replace(".","__DOT__"))].join(''));
});
/**
 * Define a behavior with a unique namespaced keyword and multiple key value pairs.
 *   Keys are:
 * 
 *   * :reaction (required) - Function to invoke when behavior is called.
 *                         First arg is object behavior is attached to
 *   * :triggers (required) - Set of keyword triggers that trigger behavior
 *   * :desc - Brief description of behavior.
 *   * :doc - Equivalent to a traditional function docstring.
 *   * :type - When set to :user, shows up in hints. Not enabled by default
 *   * :params - Vector of maps describing behavior args. Each map contains required :label key
 *            and optional keys of :type (:string, :number or :list), :items and :example
 *   * :throttle - Number of ms to throttle reaction fn
 *   * :debounce - Number of ms to debounce reaction fn
 */
lt.macros.behavior = (function lt$macros$behavior(var_args){
var args__7875__auto__ = [];
var len__7868__auto___19704 = arguments.length;
var i__7869__auto___19705 = (0);
while(true){
if((i__7869__auto___19705 < len__7868__auto___19704)){
args__7875__auto__.push((arguments[i__7869__auto___19705]));

var G__19706 = (i__7869__auto___19705 + (1));
i__7869__auto___19705 = G__19706;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((3) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((3)),(0),null)):null);
return lt.macros.behavior.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__7876__auto__);
});

lt.macros.behavior.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,name,p__19698){
var map__19699 = p__19698;
var map__19699__$1 = ((((!((map__19699 == null)))?((((map__19699.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19699.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__19699):map__19699);
var r = map__19699__$1;
var reaction = cljs.core.get.call(null,map__19699__$1,new cljs.core.Keyword(null,"reaction","reaction",490869788));
if((cljs.core.seq_QMARK_.call(null,reaction)) && (cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"fn","fn",465265323,null),cljs.core.first.call(null,reaction)))){
var vec__19701 = reaction;
var seq__19702 = cljs.core.seq.call(null,vec__19701);
var first__19703 = cljs.core.first.call(null,seq__19702);
var seq__19702__$1 = cljs.core.next.call(null,seq__19702);
var _ = first__19703;
var first__19703__$1 = cljs.core.first.call(null,seq__19702__$1);
var seq__19702__$2 = cljs.core.next.call(null,seq__19702__$1);
var args = first__19703__$1;
var body = seq__19702__$2;
return cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"do","do",1686842252,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","defn-","cljs.core/defn-",1764521227,null)),(function (){var x__7627__auto__ = lt.macros.namify.call(null,"BEH",name);
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$2(r,"");
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = args;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),body)));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("lt.object","behavior*","lt.object/behavior*",-1777171782,null)),(function (){var x__7627__auto__ = name;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),cljs.core.apply.call(null,cljs.core.concat,cljs.core.assoc.call(null,r,new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.macros.namify.call(null,"BEH",name))))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
} else {
return cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("lt.object","behavior*","lt.object/behavior*",-1777171782,null)),(function (){var x__7627__auto__ = name;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),cljs.core.apply.call(null,cljs.core.concat,r))));
}
});

lt.macros.behavior.cljs$lang$maxFixedArity = (3);

lt.macros.behavior.cljs$lang$applyTo = (function (seq19694){
var G__19695 = cljs.core.first.call(null,seq19694);
var seq19694__$1 = cljs.core.next.call(null,seq19694);
var G__19696 = cljs.core.first.call(null,seq19694__$1);
var seq19694__$2 = cljs.core.next.call(null,seq19694__$1);
var G__19697 = cljs.core.first.call(null,seq19694__$2);
var seq19694__$3 = cljs.core.next.call(null,seq19694__$2);
return lt.macros.behavior.cljs$core$IFn$_invoke$arity$variadic(G__19695,G__19696,G__19697,seq19694__$3);
});


lt.macros.behavior.cljs$lang$macro = true;
/**
 * Define a UI element for given hiccup data and key-value pairs
 *   of events for element. Like defn, a docstring is optional.
 */
lt.macros.defui = (function lt$macros$defui(var_args){
var args__7875__auto__ = [];
var len__7868__auto___19717 = arguments.length;
var i__7869__auto___19718 = (0);
while(true){
if((i__7869__auto___19718 < len__7868__auto___19717)){
args__7875__auto__.push((arguments[i__7869__auto___19718]));

var G__19719 = (i__7869__auto___19718 + (1));
i__7869__auto___19718 = G__19719;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((3) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((3)),(0),null)):null);
return lt.macros.defui.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__7876__auto__);
});

lt.macros.defui.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,sym,decl){
var doc = ((typeof cljs.core.first.call(null,decl) === 'string')?cljs.core.first.call(null,decl):"");
var vec__19714 = ((typeof cljs.core.first.call(null,decl) === 'string')?cljs.core.next.call(null,decl):decl);
var seq__19715 = cljs.core.seq.call(null,vec__19714);
var first__19716 = cljs.core.first.call(null,seq__19715);
var seq__19715__$1 = cljs.core.next.call(null,seq__19715);
var params = first__19716;
var first__19716__$1 = cljs.core.first.call(null,seq__19715__$1);
var seq__19715__$2 = cljs.core.next.call(null,seq__19715__$1);
var hiccup = first__19716__$1;
var events = seq__19715__$2;
return cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","defn","cljs.core/defn",-1606493717,null)),(function (){var x__7627__auto__ = sym;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = doc;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = params;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","let","cljs.core/let",-308701135,null)),(function (){var x__7627__auto__ = cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"e__19707__auto__","e__19707__auto__",-1190627913,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("crate.core","html","crate.core/html",-1526874884,null)),(function (){var x__7627__auto__ = hiccup;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})()))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","doseq","cljs.core/doseq",-169320766,null)),(function (){var x__7627__auto__ = cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,(function (){var x__7627__auto__ = cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"ev__19708__auto__","ev__19708__auto__",-155440203,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"func__19709__auto__","func__19709__auto__",-441630486,null))))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","partition","cljs.core/partition",1334624307,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,(2)),(function (){var x__7627__auto__ = cljs.core.vec.call(null,events);
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})()))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("lt.util.dom","on","lt.util.dom/on",-1096430045,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"e__19707__auto__","e__19707__auto__",-1190627913,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"ev__19708__auto__","ev__19708__auto__",-155440203,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"func__19709__auto__","func__19709__auto__",-441630486,null)))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"e__19707__auto__","e__19707__auto__",-1190627913,null)))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
});

lt.macros.defui.cljs$lang$maxFixedArity = (3);

lt.macros.defui.cljs$lang$applyTo = (function (seq19710){
var G__19711 = cljs.core.first.call(null,seq19710);
var seq19710__$1 = cljs.core.next.call(null,seq19710);
var G__19712 = cljs.core.first.call(null,seq19710__$1);
var seq19710__$2 = cljs.core.next.call(null,seq19710__$1);
var G__19713 = cljs.core.first.call(null,seq19710__$2);
var seq19710__$3 = cljs.core.next.call(null,seq19710__$2);
return lt.macros.defui.cljs$core$IFn$_invoke$arity$variadic(G__19711,G__19712,G__19713,seq19710__$3);
});


lt.macros.defui.cljs$lang$macro = true;
lt.macros.timed = (function lt$macros$timed(var_args){
var args__7875__auto__ = [];
var len__7868__auto___19726 = arguments.length;
var i__7869__auto___19727 = (0);
while(true){
if((i__7869__auto___19727 < len__7868__auto___19726)){
args__7875__auto__.push((arguments[i__7869__auto___19727]));

var G__19728 = (i__7869__auto___19727 + (1));
i__7869__auto___19727 = G__19728;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((3) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((3)),(0),null)):null);
return lt.macros.timed.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__7876__auto__);
});

lt.macros.timed.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,ev,body){
return cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","let","cljs.core/let",-308701135,null)),(function (){var x__7627__auto__ = cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"start__19720__auto__","start__19720__auto__",-228580525,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("lighttable.util.js","now","lighttable.util.js/now",-891678289,null)))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"res__19721__auto__","res__19721__auto__",1444638450,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"do","do",1686842252,null)),body)));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})()))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("lighttable.components.logger","log","lighttable.components.logger/log",333395025,null)),(function (){var x__7627__auto__ = ev;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","-","cljs.core/-",187040141,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("lighttable.util.js","now","lighttable.util.js/now",-891678289,null)))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"start__19720__auto__","start__19720__auto__",-228580525,null)))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"res__19721__auto__","res__19721__auto__",1444638450,null)))));
});

lt.macros.timed.cljs$lang$maxFixedArity = (3);

lt.macros.timed.cljs$lang$applyTo = (function (seq19722){
var G__19723 = cljs.core.first.call(null,seq19722);
var seq19722__$1 = cljs.core.next.call(null,seq19722);
var G__19724 = cljs.core.first.call(null,seq19722__$1);
var seq19722__$2 = cljs.core.next.call(null,seq19722__$1);
var G__19725 = cljs.core.first.call(null,seq19722__$2);
var seq19722__$3 = cljs.core.next.call(null,seq19722__$2);
return lt.macros.timed.cljs$core$IFn$_invoke$arity$variadic(G__19723,G__19724,G__19725,seq19722__$3);
});


lt.macros.timed.cljs$lang$macro = true;
lt.macros.__GT_params = (function lt$macros$__GT_params(body){
if(cljs.core.vector_QMARK_.call(null,cljs.core.first.call(null,body))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.first.call(null,body),cljs.core.rest.call(null,body)], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.PersistentVector.EMPTY,body], null);
}
});
lt.macros.on = (function lt$macros$on(var_args){
var args__7875__auto__ = [];
var len__7868__auto___19733 = arguments.length;
var i__7869__auto___19734 = (0);
while(true){
if((i__7869__auto___19734 < len__7868__auto___19733)){
args__7875__auto__.push((arguments[i__7869__auto___19734]));

var G__19735 = (i__7869__auto___19734 + (1));
i__7869__auto___19734 = G__19735;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((3) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((3)),(0),null)):null);
return lt.macros.on.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__7876__auto__);
});

lt.macros.on.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,name,body){
return cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("lighttable.command","on","lighttable.command/on",1945722122,null)),(function (){var x__7627__auto__ = name;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null)),body)));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
});

lt.macros.on.cljs$lang$maxFixedArity = (3);

lt.macros.on.cljs$lang$applyTo = (function (seq19729){
var G__19730 = cljs.core.first.call(null,seq19729);
var seq19729__$1 = cljs.core.next.call(null,seq19729);
var G__19731 = cljs.core.first.call(null,seq19729__$1);
var seq19729__$2 = cljs.core.next.call(null,seq19729__$1);
var G__19732 = cljs.core.first.call(null,seq19729__$2);
var seq19729__$3 = cljs.core.next.call(null,seq19729__$2);
return lt.macros.on.cljs$core$IFn$_invoke$arity$variadic(G__19730,G__19731,G__19732,seq19729__$3);
});


lt.macros.on.cljs$lang$macro = true;
lt.macros.in$ = (function lt$macros$in(var_args){
var args__7875__auto__ = [];
var len__7868__auto___19743 = arguments.length;
var i__7869__auto___19744 = (0);
while(true){
if((i__7869__auto___19744 < len__7868__auto___19743)){
args__7875__auto__.push((arguments[i__7869__auto___19744]));

var G__19745 = (i__7869__auto___19744 + (1));
i__7869__auto___19744 = G__19745;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((3) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((3)),(0),null)):null);
return lt.macros.in$.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__7876__auto__);
});

lt.macros.in$.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,ctx,body){
var vec__19740 = lt.macros.__GT_params.call(null,body);
var params = cljs.core.nth.call(null,vec__19740,(0),null);
var body__$1 = cljs.core.nth.call(null,vec__19740,(1),null);
return cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","assoc","cljs.core/assoc",322326297,null)),(function (){var x__7627__auto__ = ctx;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword(null,"in","in",-1531184865)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null)),(function (){var x__7627__auto__ = params;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),body__$1)));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
});

lt.macros.in$.cljs$lang$maxFixedArity = (3);

lt.macros.in$.cljs$lang$applyTo = (function (seq19736){
var G__19737 = cljs.core.first.call(null,seq19736);
var seq19736__$1 = cljs.core.next.call(null,seq19736);
var G__19738 = cljs.core.first.call(null,seq19736__$1);
var seq19736__$2 = cljs.core.next.call(null,seq19736__$1);
var G__19739 = cljs.core.first.call(null,seq19736__$2);
var seq19736__$3 = cljs.core.next.call(null,seq19736__$2);
return lt.macros.in$.cljs$core$IFn$_invoke$arity$variadic(G__19737,G__19738,G__19739,seq19736__$3);
});


lt.macros.in$.cljs$lang$macro = true;
lt.macros.out = (function lt$macros$out(var_args){
var args__7875__auto__ = [];
var len__7868__auto___19753 = arguments.length;
var i__7869__auto___19754 = (0);
while(true){
if((i__7869__auto___19754 < len__7868__auto___19753)){
args__7875__auto__.push((arguments[i__7869__auto___19754]));

var G__19755 = (i__7869__auto___19754 + (1));
i__7869__auto___19754 = G__19755;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((3) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((3)),(0),null)):null);
return lt.macros.out.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__7876__auto__);
});

lt.macros.out.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,ctx,body){
var vec__19750 = lt.macros.__GT_params.call(null,body);
var params = cljs.core.nth.call(null,vec__19750,(0),null);
var body__$1 = cljs.core.nth.call(null,vec__19750,(1),null);
return cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","assoc","cljs.core/assoc",322326297,null)),(function (){var x__7627__auto__ = ctx;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword(null,"out","out",-910545517)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null)),(function (){var x__7627__auto__ = params;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),body__$1)));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
});

lt.macros.out.cljs$lang$maxFixedArity = (3);

lt.macros.out.cljs$lang$applyTo = (function (seq19746){
var G__19747 = cljs.core.first.call(null,seq19746);
var seq19746__$1 = cljs.core.next.call(null,seq19746);
var G__19748 = cljs.core.first.call(null,seq19746__$1);
var seq19746__$2 = cljs.core.next.call(null,seq19746__$1);
var G__19749 = cljs.core.first.call(null,seq19746__$2);
var seq19746__$3 = cljs.core.next.call(null,seq19746__$2);
return lt.macros.out.cljs$core$IFn$_invoke$arity$variadic(G__19747,G__19748,G__19749,seq19746__$3);
});


lt.macros.out.cljs$lang$macro = true;
lt.macros.defcontext = (function lt$macros$defcontext(var_args){
var args__7875__auto__ = [];
var len__7868__auto___19761 = arguments.length;
var i__7869__auto___19762 = (0);
while(true){
if((i__7869__auto___19762 < len__7868__auto___19761)){
args__7875__auto__.push((arguments[i__7869__auto___19762]));

var G__19763 = (i__7869__auto___19762 + (1));
i__7869__auto___19762 = G__19763;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((3) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((3)),(0),null)):null);
return lt.macros.defcontext.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__7876__auto__);
});

lt.macros.defcontext.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,name,body){
return cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","let","cljs.core/let",-308701135,null)),(function (){var x__7627__auto__ = cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"ctx__19756__auto__","ctx__19756__auto__",1472345023,null)),(function (){var x__7627__auto__ = cljs.core.apply.call(null,cljs.core.array_map,cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword(null,"name","name",1843675177)),(function (){var x__7627__auto__ = name;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})()))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})()))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("lighttable.context","add-context!","lighttable.context/add-context!",-639207783,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","->","cljs.core/->",1488366311,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"ctx__19756__auto__","ctx__19756__auto__",1472345023,null)),body)));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
});

lt.macros.defcontext.cljs$lang$maxFixedArity = (3);

lt.macros.defcontext.cljs$lang$applyTo = (function (seq19757){
var G__19758 = cljs.core.first.call(null,seq19757);
var seq19757__$1 = cljs.core.next.call(null,seq19757);
var G__19759 = cljs.core.first.call(null,seq19757__$1);
var seq19757__$2 = cljs.core.next.call(null,seq19757__$1);
var G__19760 = cljs.core.first.call(null,seq19757__$2);
var seq19757__$3 = cljs.core.next.call(null,seq19757__$2);
return lt.macros.defcontext.cljs$core$IFn$_invoke$arity$variadic(G__19758,G__19759,G__19760,seq19757__$3);
});


lt.macros.defcontext.cljs$lang$macro = true;
lt.macros.extract = (function lt$macros$extract(var_args){
var args__7875__auto__ = [];
var len__7868__auto___19785 = arguments.length;
var i__7869__auto___19786 = (0);
while(true){
if((i__7869__auto___19786 < len__7868__auto___19785)){
args__7875__auto__.push((arguments[i__7869__auto___19786]));

var G__19787 = (i__7869__auto___19786 + (1));
i__7869__auto___19786 = G__19787;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((4) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((4)),(0),null)):null);
return lt.macros.extract.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),argseq__7876__auto__);
});

lt.macros.extract.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,elem,kvs,body){
var defs = cljs.core.vec.call(null,cljs.core.apply.call(null,cljs.core.concat,(function (){var iter__7573__auto__ = (function lt$macros$iter__19769(s__19770){
return (new cljs.core.LazySeq(null,(function (){
var s__19770__$1 = s__19770;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__19770__$1);
if(temp__4657__auto__){
var s__19770__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__19770__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__19770__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__19772 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__19771 = (0);
while(true){
if((i__19771 < size__7572__auto__)){
var vec__19779 = cljs.core._nth.call(null,c__7571__auto__,i__19771);
var k = cljs.core.nth.call(null,vec__19779,(0),null);
var v = cljs.core.nth.call(null,vec__19779,(1),null);
cljs.core.chunk_append.call(null,b__19772,cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,(function (){var x__7627__auto__ = k;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("lt.util.dom","$","lt.util.dom/$",1447512840,null)),(function (){var x__7627__auto__ = v;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = elem;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())))));

var G__19788 = (i__19771 + (1));
i__19771 = G__19788;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__19772),lt$macros$iter__19769.call(null,cljs.core.chunk_rest.call(null,s__19770__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__19772),null);
}
} else {
var vec__19782 = cljs.core.first.call(null,s__19770__$2);
var k = cljs.core.nth.call(null,vec__19782,(0),null);
var v = cljs.core.nth.call(null,vec__19782,(1),null);
return cljs.core.cons.call(null,cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,(function (){var x__7627__auto__ = k;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("lt.util.dom","$","lt.util.dom/$",1447512840,null)),(function (){var x__7627__auto__ = v;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = elem;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())))),lt$macros$iter__19769.call(null,cljs.core.rest.call(null,s__19770__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__7573__auto__.call(null,cljs.core.partition.call(null,(2),kvs));
})()));
return cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","let","cljs.core/let",-308701135,null)),(function (){var x__7627__auto__ = defs;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),body)));
});

lt.macros.extract.cljs$lang$maxFixedArity = (4);

lt.macros.extract.cljs$lang$applyTo = (function (seq19764){
var G__19765 = cljs.core.first.call(null,seq19764);
var seq19764__$1 = cljs.core.next.call(null,seq19764);
var G__19766 = cljs.core.first.call(null,seq19764__$1);
var seq19764__$2 = cljs.core.next.call(null,seq19764__$1);
var G__19767 = cljs.core.first.call(null,seq19764__$2);
var seq19764__$3 = cljs.core.next.call(null,seq19764__$2);
var G__19768 = cljs.core.first.call(null,seq19764__$3);
var seq19764__$4 = cljs.core.next.call(null,seq19764__$3);
return lt.macros.extract.cljs$core$IFn$_invoke$arity$variadic(G__19765,G__19766,G__19767,G__19768,seq19764__$4);
});


lt.macros.extract.cljs$lang$macro = true;
lt.macros.foreach = (function lt$macros$foreach(var_args){
var args__7875__auto__ = [];
var len__7868__auto___19796 = arguments.length;
var i__7869__auto___19797 = (0);
while(true){
if((i__7869__auto___19797 < len__7868__auto___19796)){
args__7875__auto__.push((arguments[i__7869__auto___19797]));

var G__19798 = (i__7869__auto___19797 + (1));
i__7869__auto___19797 = G__19798;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((3) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((3)),(0),null)):null);
return lt.macros.foreach.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__7876__auto__);
});

lt.macros.foreach.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,xs,body){
return cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","let","cljs.core/let",-308701135,null)),(function (){var x__7627__auto__ = cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"xs__19789__auto__","xs__19789__auto__",76710486,null)),(function (){var x__7627__auto__ = cljs.core.second.call(null,xs);
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"len__19790__auto__","len__19790__auto__",1349250596,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,".-length",".-length",-280799999,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"xs__19789__auto__","xs__19789__auto__",76710486,null)))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})()))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","loop","cljs.core/loop",-1829423021,null)),(function (){var x__7627__auto__ = cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"left__19791__auto__","left__19791__auto__",-1432436497,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,(0))))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","when","cljs.core/when",120293186,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","<","cljs.core/<",1677496129,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"left__19791__auto__","left__19791__auto__",-1432436497,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"len__19790__auto__","len__19790__auto__",1349250596,null)))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","let","cljs.core/let",-308701135,null)),(function (){var x__7627__auto__ = cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,(function (){var x__7627__auto__ = cljs.core.first.call(null,xs);
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","aget","cljs.core/aget",6345791,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"xs__19789__auto__","xs__19789__auto__",76710486,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("lt.macros","left","lt.macros/left",1772760401,null)))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})()))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),body,(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"recur","recur",1202958259,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","inc","cljs.core/inc",-879172610,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"left__19791__auto__","left__19791__auto__",-1432436497,null)))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
});

lt.macros.foreach.cljs$lang$maxFixedArity = (3);

lt.macros.foreach.cljs$lang$applyTo = (function (seq19792){
var G__19793 = cljs.core.first.call(null,seq19792);
var seq19792__$1 = cljs.core.next.call(null,seq19792);
var G__19794 = cljs.core.first.call(null,seq19792__$1);
var seq19792__$2 = cljs.core.next.call(null,seq19792__$1);
var G__19795 = cljs.core.first.call(null,seq19792__$2);
var seq19792__$3 = cljs.core.next.call(null,seq19792__$2);
return lt.macros.foreach.cljs$core$IFn$_invoke$arity$variadic(G__19793,G__19794,G__19795,seq19792__$3);
});


lt.macros.foreach.cljs$lang$macro = true;
lt.macros.with_time = (function lt$macros$with_time(var_args){
var args__7875__auto__ = [];
var len__7868__auto___19802 = arguments.length;
var i__7869__auto___19803 = (0);
while(true){
if((i__7869__auto___19803 < len__7868__auto___19802)){
args__7875__auto__.push((arguments[i__7869__auto___19803]));

var G__19804 = (i__7869__auto___19803 + (1));
i__7869__auto___19803 = G__19804;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((2) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((2)),(0),null)):null);
return lt.macros.with_time.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__7876__auto__);
});

lt.macros.with_time.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,body){
var start = cljs.core.gensym.call(null,"start");
var body__$1 = clojure.walk.postwalk_replace.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Symbol(null,"time","time",-1268547887,null),cljs.core._conj.call(null,(function (){var x__7627__auto__ = cljs.core.list(new cljs.core.Symbol(null,".getTime",".getTime",-1048557777,null),cljs.core.list(new cljs.core.Symbol("js","Date.","js/Date.",384205255,null)));
return cljs.core._conj.call(null,(function (){var x__7627__auto____$1 = start;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto____$1);
})(),x__7627__auto__);
})(),new cljs.core.Symbol(null,"-","-",-471816912,null))], null),body);
return cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","let","cljs.core/let",-308701135,null)),(function (){var x__7627__auto__ = cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,(function (){var x__7627__auto__ = start;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,".getTime",".getTime",-1048557777,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("js","Date.","js/Date.",384205255,null)))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})()))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),body__$1)));
});

lt.macros.with_time.cljs$lang$maxFixedArity = (2);

lt.macros.with_time.cljs$lang$applyTo = (function (seq19799){
var G__19800 = cljs.core.first.call(null,seq19799);
var seq19799__$1 = cljs.core.next.call(null,seq19799);
var G__19801 = cljs.core.first.call(null,seq19799__$1);
var seq19799__$2 = cljs.core.next.call(null,seq19799__$1);
return lt.macros.with_time.cljs$core$IFn$_invoke$arity$variadic(G__19800,G__19801,seq19799__$2);
});


lt.macros.with_time.cljs$lang$macro = true;
/**
 * Register given func to run on background thread
 */
lt.macros.background = (function lt$macros$background(_AMPERSAND_form,_AMPERSAND_env,func){
return cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("lt.objs.thread","thread*","lt.objs.thread/thread*",-698903956,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null)),(function (){var x__7627__auto__ = cljs.core.gensym.call(null,"tfun");
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"msg__19807__auto__","msg__19807__auto__",-774796314,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"&","&",-2144855648,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"body__19808__auto__","body__19808__auto__",545071925,null))))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","let","cljs.core/let",-308701135,null)),(function (){var x__7627__auto__ = cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"args__19809__auto__","args__19809__auto__",356110422,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","map","cljs.core/map",-338988913,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.reader","read-string*","cljs.reader/read-string*",966157304,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"body__19808__auto__","body__19808__auto__",545071925,null)))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"raise","raise",1824672588,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null)),(function (){var x__7627__auto__ = cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"obj__19810__auto__","obj__19810__auto__",-753565419,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"k__19811__auto__","k__19811__auto__",-322791766,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"v__19812__auto__","v__19812__auto__",-277164158,null))))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("js","_send","js/_send",1366779817,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"obj__19810__auto__","obj__19810__auto__",-753565419,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"k__19811__auto__","k__19811__auto__",-322791766,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","pr-str","cljs.core/pr-str",-552799478,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"v__19812__auto__","v__19812__auto__",-277164158,null)))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,"clj"))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})()))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,".apply",".apply",-1176201338,null)),(function (){var x__7627__auto__ = func;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,null),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","sequence","cljs.core/sequence",1908459032,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","seq","cljs.core/seq",-1649497689,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","concat","cljs.core/concat",-1133584918,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","list","cljs.core/list",-1331406371,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"quote","quote",1377916282,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","clj->js","cljs.core/clj->js",-1490083117,null)))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","list","cljs.core/list",-1331406371,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","sequence","cljs.core/sequence",1908459032,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","seq","cljs.core/seq",-1649497689,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","concat","cljs.core/concat",-1133584918,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","list","cljs.core/list",-1331406371,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"quote","quote",1377916282,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","cons","cljs.core/cons",96507417,null)))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","list","cljs.core/list",-1331406371,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","sequence","cljs.core/sequence",1908459032,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","seq","cljs.core/seq",-1649497689,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","concat","cljs.core/concat",-1133584918,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","list","cljs.core/list",-1331406371,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"quote","quote",1377916282,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,".-obj",".-obj",-2111595180,null)))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","list","cljs.core/list",-1331406371,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"quote","quote",1377916282,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("lt.macros","msg__19805__auto__","lt.macros/msg__19805__auto__",2138746586,null)))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","list","cljs.core/list",-1331406371,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"quote","quote",1377916282,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("lt.macros","args__19806__auto__","lt.macros/args__19806__auto__",-2106593061,null)))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
});

lt.macros.background.cljs$lang$macro = true;
lt.macros.aloop = (function lt$macros$aloop(var_args){
var args__7875__auto__ = [];
var len__7868__auto___19822 = arguments.length;
var i__7869__auto___19823 = (0);
while(true){
if((i__7869__auto___19823 < len__7868__auto___19822)){
args__7875__auto__.push((arguments[i__7869__auto___19823]));

var G__19824 = (i__7869__auto___19823 + (1));
i__7869__auto___19823 = G__19824;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((3) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((3)),(0),null)):null);
return lt.macros.aloop.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__7876__auto__);
});

lt.macros.aloop.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,p__19818,body){
var vec__19819 = p__19818;
var var$ = cljs.core.nth.call(null,vec__19819,(0),null);
var arr = cljs.core.nth.call(null,vec__19819,(1),null);
return cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","let","cljs.core/let",-308701135,null)),(function (){var x__7627__auto__ = cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"arr__19813__auto__","arr__19813__auto__",-1857455991,null)),(function (){var x__7627__auto__ = arr;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})()))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","loop","cljs.core/loop",-1829423021,null)),(function (){var x__7627__auto__ = cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,(function (){var x__7627__auto__ = var$;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,(0))))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","when","cljs.core/when",120293186,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","<","cljs.core/<",1677496129,null)),(function (){var x__7627__auto__ = var$;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,".-length",".-length",-280799999,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"arr__19813__auto__","arr__19813__auto__",-1857455991,null)))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),body,(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"recur","recur",1202958259,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","+","cljs.core/+",-342754435,null)),(function (){var x__7627__auto__ = var$;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,(1)))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
});

lt.macros.aloop.cljs$lang$maxFixedArity = (3);

lt.macros.aloop.cljs$lang$applyTo = (function (seq19814){
var G__19815 = cljs.core.first.call(null,seq19814);
var seq19814__$1 = cljs.core.next.call(null,seq19814);
var G__19816 = cljs.core.first.call(null,seq19814__$1);
var seq19814__$2 = cljs.core.next.call(null,seq19814__$1);
var G__19817 = cljs.core.first.call(null,seq19814__$2);
var seq19814__$3 = cljs.core.next.call(null,seq19814__$2);
return lt.macros.aloop.cljs$core$IFn$_invoke$arity$variadic(G__19815,G__19816,G__19817,seq19814__$3);
});


lt.macros.aloop.cljs$lang$macro = true;
