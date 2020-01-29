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
var len__7868__auto___19700 = arguments.length;
var i__7869__auto___19701 = (0);
while(true){
if((i__7869__auto___19701 < len__7868__auto___19700)){
args__7875__auto__.push((arguments[i__7869__auto___19701]));

var G__19702 = (i__7869__auto___19701 + (1));
i__7869__auto___19701 = G__19702;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((3) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((3)),(0),null)):null);
return lt.macros.behavior.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__7876__auto__);
});

lt.macros.behavior.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,name,p__19694){
var map__19695 = p__19694;
var map__19695__$1 = ((((!((map__19695 == null)))?((((map__19695.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19695.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__19695):map__19695);
var r = map__19695__$1;
var reaction = cljs.core.get.call(null,map__19695__$1,new cljs.core.Keyword(null,"reaction","reaction",490869788));
if((cljs.core.seq_QMARK_.call(null,reaction)) && (cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"fn","fn",465265323,null),cljs.core.first.call(null,reaction)))){
var vec__19697 = reaction;
var seq__19698 = cljs.core.seq.call(null,vec__19697);
var first__19699 = cljs.core.first.call(null,seq__19698);
var seq__19698__$1 = cljs.core.next.call(null,seq__19698);
var _ = first__19699;
var first__19699__$1 = cljs.core.first.call(null,seq__19698__$1);
var seq__19698__$2 = cljs.core.next.call(null,seq__19698__$1);
var args = first__19699__$1;
var body = seq__19698__$2;
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

lt.macros.behavior.cljs$lang$applyTo = (function (seq19690){
var G__19691 = cljs.core.first.call(null,seq19690);
var seq19690__$1 = cljs.core.next.call(null,seq19690);
var G__19692 = cljs.core.first.call(null,seq19690__$1);
var seq19690__$2 = cljs.core.next.call(null,seq19690__$1);
var G__19693 = cljs.core.first.call(null,seq19690__$2);
var seq19690__$3 = cljs.core.next.call(null,seq19690__$2);
return lt.macros.behavior.cljs$core$IFn$_invoke$arity$variadic(G__19691,G__19692,G__19693,seq19690__$3);
});


lt.macros.behavior.cljs$lang$macro = true;
/**
 * Define a UI element for given hiccup data and key-value pairs
 *   of events for element. Like defn, a docstring is optional.
 */
lt.macros.defui = (function lt$macros$defui(var_args){
var args__7875__auto__ = [];
var len__7868__auto___19713 = arguments.length;
var i__7869__auto___19714 = (0);
while(true){
if((i__7869__auto___19714 < len__7868__auto___19713)){
args__7875__auto__.push((arguments[i__7869__auto___19714]));

var G__19715 = (i__7869__auto___19714 + (1));
i__7869__auto___19714 = G__19715;
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
var vec__19710 = ((typeof cljs.core.first.call(null,decl) === 'string')?cljs.core.next.call(null,decl):decl);
var seq__19711 = cljs.core.seq.call(null,vec__19710);
var first__19712 = cljs.core.first.call(null,seq__19711);
var seq__19711__$1 = cljs.core.next.call(null,seq__19711);
var params = first__19712;
var first__19712__$1 = cljs.core.first.call(null,seq__19711__$1);
var seq__19711__$2 = cljs.core.next.call(null,seq__19711__$1);
var hiccup = first__19712__$1;
var events = seq__19711__$2;
return cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","defn","cljs.core/defn",-1606493717,null)),(function (){var x__7627__auto__ = sym;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = doc;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = params;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","let","cljs.core/let",-308701135,null)),(function (){var x__7627__auto__ = cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"e__19703__auto__","e__19703__auto__",-547785580,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("crate.core","html","crate.core/html",-1526874884,null)),(function (){var x__7627__auto__ = hiccup;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})()))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","doseq","cljs.core/doseq",-169320766,null)),(function (){var x__7627__auto__ = cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,(function (){var x__7627__auto__ = cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"ev__19704__auto__","ev__19704__auto__",-1841000144,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"func__19705__auto__","func__19705__auto__",136597526,null))))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","partition","cljs.core/partition",1334624307,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,(2)),(function (){var x__7627__auto__ = cljs.core.vec.call(null,events);
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})()))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("lt.util.dom","on","lt.util.dom/on",-1096430045,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"e__19703__auto__","e__19703__auto__",-547785580,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"ev__19704__auto__","ev__19704__auto__",-1841000144,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"func__19705__auto__","func__19705__auto__",136597526,null)))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"e__19703__auto__","e__19703__auto__",-547785580,null)))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
});

lt.macros.defui.cljs$lang$maxFixedArity = (3);

lt.macros.defui.cljs$lang$applyTo = (function (seq19706){
var G__19707 = cljs.core.first.call(null,seq19706);
var seq19706__$1 = cljs.core.next.call(null,seq19706);
var G__19708 = cljs.core.first.call(null,seq19706__$1);
var seq19706__$2 = cljs.core.next.call(null,seq19706__$1);
var G__19709 = cljs.core.first.call(null,seq19706__$2);
var seq19706__$3 = cljs.core.next.call(null,seq19706__$2);
return lt.macros.defui.cljs$core$IFn$_invoke$arity$variadic(G__19707,G__19708,G__19709,seq19706__$3);
});


lt.macros.defui.cljs$lang$macro = true;
lt.macros.timed = (function lt$macros$timed(var_args){
var args__7875__auto__ = [];
var len__7868__auto___19722 = arguments.length;
var i__7869__auto___19723 = (0);
while(true){
if((i__7869__auto___19723 < len__7868__auto___19722)){
args__7875__auto__.push((arguments[i__7869__auto___19723]));

var G__19724 = (i__7869__auto___19723 + (1));
i__7869__auto___19723 = G__19724;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((3) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((3)),(0),null)):null);
return lt.macros.timed.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__7876__auto__);
});

lt.macros.timed.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,ev,body){
return cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","let","cljs.core/let",-308701135,null)),(function (){var x__7627__auto__ = cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"start__19716__auto__","start__19716__auto__",1512726894,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("lighttable.util.js","now","lighttable.util.js/now",-891678289,null)))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"res__19717__auto__","res__19717__auto__",717315157,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"do","do",1686842252,null)),body)));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})()))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("lighttable.components.logger","log","lighttable.components.logger/log",333395025,null)),(function (){var x__7627__auto__ = ev;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","-","cljs.core/-",187040141,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("lighttable.util.js","now","lighttable.util.js/now",-891678289,null)))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"start__19716__auto__","start__19716__auto__",1512726894,null)))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"res__19717__auto__","res__19717__auto__",717315157,null)))));
});

lt.macros.timed.cljs$lang$maxFixedArity = (3);

lt.macros.timed.cljs$lang$applyTo = (function (seq19718){
var G__19719 = cljs.core.first.call(null,seq19718);
var seq19718__$1 = cljs.core.next.call(null,seq19718);
var G__19720 = cljs.core.first.call(null,seq19718__$1);
var seq19718__$2 = cljs.core.next.call(null,seq19718__$1);
var G__19721 = cljs.core.first.call(null,seq19718__$2);
var seq19718__$3 = cljs.core.next.call(null,seq19718__$2);
return lt.macros.timed.cljs$core$IFn$_invoke$arity$variadic(G__19719,G__19720,G__19721,seq19718__$3);
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
var len__7868__auto___19729 = arguments.length;
var i__7869__auto___19730 = (0);
while(true){
if((i__7869__auto___19730 < len__7868__auto___19729)){
args__7875__auto__.push((arguments[i__7869__auto___19730]));

var G__19731 = (i__7869__auto___19730 + (1));
i__7869__auto___19730 = G__19731;
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

lt.macros.on.cljs$lang$applyTo = (function (seq19725){
var G__19726 = cljs.core.first.call(null,seq19725);
var seq19725__$1 = cljs.core.next.call(null,seq19725);
var G__19727 = cljs.core.first.call(null,seq19725__$1);
var seq19725__$2 = cljs.core.next.call(null,seq19725__$1);
var G__19728 = cljs.core.first.call(null,seq19725__$2);
var seq19725__$3 = cljs.core.next.call(null,seq19725__$2);
return lt.macros.on.cljs$core$IFn$_invoke$arity$variadic(G__19726,G__19727,G__19728,seq19725__$3);
});


lt.macros.on.cljs$lang$macro = true;
lt.macros.in$ = (function lt$macros$in(var_args){
var args__7875__auto__ = [];
var len__7868__auto___19739 = arguments.length;
var i__7869__auto___19740 = (0);
while(true){
if((i__7869__auto___19740 < len__7868__auto___19739)){
args__7875__auto__.push((arguments[i__7869__auto___19740]));

var G__19741 = (i__7869__auto___19740 + (1));
i__7869__auto___19740 = G__19741;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((3) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((3)),(0),null)):null);
return lt.macros.in$.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__7876__auto__);
});

lt.macros.in$.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,ctx,body){
var vec__19736 = lt.macros.__GT_params.call(null,body);
var params = cljs.core.nth.call(null,vec__19736,(0),null);
var body__$1 = cljs.core.nth.call(null,vec__19736,(1),null);
return cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","assoc","cljs.core/assoc",322326297,null)),(function (){var x__7627__auto__ = ctx;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword(null,"in","in",-1531184865)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null)),(function (){var x__7627__auto__ = params;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),body__$1)));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
});

lt.macros.in$.cljs$lang$maxFixedArity = (3);

lt.macros.in$.cljs$lang$applyTo = (function (seq19732){
var G__19733 = cljs.core.first.call(null,seq19732);
var seq19732__$1 = cljs.core.next.call(null,seq19732);
var G__19734 = cljs.core.first.call(null,seq19732__$1);
var seq19732__$2 = cljs.core.next.call(null,seq19732__$1);
var G__19735 = cljs.core.first.call(null,seq19732__$2);
var seq19732__$3 = cljs.core.next.call(null,seq19732__$2);
return lt.macros.in$.cljs$core$IFn$_invoke$arity$variadic(G__19733,G__19734,G__19735,seq19732__$3);
});


lt.macros.in$.cljs$lang$macro = true;
lt.macros.out = (function lt$macros$out(var_args){
var args__7875__auto__ = [];
var len__7868__auto___19749 = arguments.length;
var i__7869__auto___19750 = (0);
while(true){
if((i__7869__auto___19750 < len__7868__auto___19749)){
args__7875__auto__.push((arguments[i__7869__auto___19750]));

var G__19751 = (i__7869__auto___19750 + (1));
i__7869__auto___19750 = G__19751;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((3) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((3)),(0),null)):null);
return lt.macros.out.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__7876__auto__);
});

lt.macros.out.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,ctx,body){
var vec__19746 = lt.macros.__GT_params.call(null,body);
var params = cljs.core.nth.call(null,vec__19746,(0),null);
var body__$1 = cljs.core.nth.call(null,vec__19746,(1),null);
return cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","assoc","cljs.core/assoc",322326297,null)),(function (){var x__7627__auto__ = ctx;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword(null,"out","out",-910545517)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null)),(function (){var x__7627__auto__ = params;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),body__$1)));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
});

lt.macros.out.cljs$lang$maxFixedArity = (3);

lt.macros.out.cljs$lang$applyTo = (function (seq19742){
var G__19743 = cljs.core.first.call(null,seq19742);
var seq19742__$1 = cljs.core.next.call(null,seq19742);
var G__19744 = cljs.core.first.call(null,seq19742__$1);
var seq19742__$2 = cljs.core.next.call(null,seq19742__$1);
var G__19745 = cljs.core.first.call(null,seq19742__$2);
var seq19742__$3 = cljs.core.next.call(null,seq19742__$2);
return lt.macros.out.cljs$core$IFn$_invoke$arity$variadic(G__19743,G__19744,G__19745,seq19742__$3);
});


lt.macros.out.cljs$lang$macro = true;
lt.macros.defcontext = (function lt$macros$defcontext(var_args){
var args__7875__auto__ = [];
var len__7868__auto___19757 = arguments.length;
var i__7869__auto___19758 = (0);
while(true){
if((i__7869__auto___19758 < len__7868__auto___19757)){
args__7875__auto__.push((arguments[i__7869__auto___19758]));

var G__19759 = (i__7869__auto___19758 + (1));
i__7869__auto___19758 = G__19759;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((3) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((3)),(0),null)):null);
return lt.macros.defcontext.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__7876__auto__);
});

lt.macros.defcontext.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,name,body){
return cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","let","cljs.core/let",-308701135,null)),(function (){var x__7627__auto__ = cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"ctx__19752__auto__","ctx__19752__auto__",1875690432,null)),(function (){var x__7627__auto__ = cljs.core.apply.call(null,cljs.core.array_map,cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword(null,"name","name",1843675177)),(function (){var x__7627__auto__ = name;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})()))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})()))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("lighttable.context","add-context!","lighttable.context/add-context!",-639207783,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","->","cljs.core/->",1488366311,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"ctx__19752__auto__","ctx__19752__auto__",1875690432,null)),body)));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
});

lt.macros.defcontext.cljs$lang$maxFixedArity = (3);

lt.macros.defcontext.cljs$lang$applyTo = (function (seq19753){
var G__19754 = cljs.core.first.call(null,seq19753);
var seq19753__$1 = cljs.core.next.call(null,seq19753);
var G__19755 = cljs.core.first.call(null,seq19753__$1);
var seq19753__$2 = cljs.core.next.call(null,seq19753__$1);
var G__19756 = cljs.core.first.call(null,seq19753__$2);
var seq19753__$3 = cljs.core.next.call(null,seq19753__$2);
return lt.macros.defcontext.cljs$core$IFn$_invoke$arity$variadic(G__19754,G__19755,G__19756,seq19753__$3);
});


lt.macros.defcontext.cljs$lang$macro = true;
lt.macros.extract = (function lt$macros$extract(var_args){
var args__7875__auto__ = [];
var len__7868__auto___19781 = arguments.length;
var i__7869__auto___19782 = (0);
while(true){
if((i__7869__auto___19782 < len__7868__auto___19781)){
args__7875__auto__.push((arguments[i__7869__auto___19782]));

var G__19783 = (i__7869__auto___19782 + (1));
i__7869__auto___19782 = G__19783;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((4) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((4)),(0),null)):null);
return lt.macros.extract.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),argseq__7876__auto__);
});

lt.macros.extract.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,elem,kvs,body){
var defs = cljs.core.vec.call(null,cljs.core.apply.call(null,cljs.core.concat,(function (){var iter__7573__auto__ = (function lt$macros$iter__19765(s__19766){
return (new cljs.core.LazySeq(null,(function (){
var s__19766__$1 = s__19766;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__19766__$1);
if(temp__4657__auto__){
var s__19766__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__19766__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__19766__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__19768 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__19767 = (0);
while(true){
if((i__19767 < size__7572__auto__)){
var vec__19775 = cljs.core._nth.call(null,c__7571__auto__,i__19767);
var k = cljs.core.nth.call(null,vec__19775,(0),null);
var v = cljs.core.nth.call(null,vec__19775,(1),null);
cljs.core.chunk_append.call(null,b__19768,cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,(function (){var x__7627__auto__ = k;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("lt.util.dom","$","lt.util.dom/$",1447512840,null)),(function (){var x__7627__auto__ = v;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = elem;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())))));

var G__19784 = (i__19767 + (1));
i__19767 = G__19784;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__19768),lt$macros$iter__19765.call(null,cljs.core.chunk_rest.call(null,s__19766__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__19768),null);
}
} else {
var vec__19778 = cljs.core.first.call(null,s__19766__$2);
var k = cljs.core.nth.call(null,vec__19778,(0),null);
var v = cljs.core.nth.call(null,vec__19778,(1),null);
return cljs.core.cons.call(null,cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,(function (){var x__7627__auto__ = k;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("lt.util.dom","$","lt.util.dom/$",1447512840,null)),(function (){var x__7627__auto__ = v;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = elem;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())))),lt$macros$iter__19765.call(null,cljs.core.rest.call(null,s__19766__$2)));
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

lt.macros.extract.cljs$lang$applyTo = (function (seq19760){
var G__19761 = cljs.core.first.call(null,seq19760);
var seq19760__$1 = cljs.core.next.call(null,seq19760);
var G__19762 = cljs.core.first.call(null,seq19760__$1);
var seq19760__$2 = cljs.core.next.call(null,seq19760__$1);
var G__19763 = cljs.core.first.call(null,seq19760__$2);
var seq19760__$3 = cljs.core.next.call(null,seq19760__$2);
var G__19764 = cljs.core.first.call(null,seq19760__$3);
var seq19760__$4 = cljs.core.next.call(null,seq19760__$3);
return lt.macros.extract.cljs$core$IFn$_invoke$arity$variadic(G__19761,G__19762,G__19763,G__19764,seq19760__$4);
});


lt.macros.extract.cljs$lang$macro = true;
lt.macros.foreach = (function lt$macros$foreach(var_args){
var args__7875__auto__ = [];
var len__7868__auto___19792 = arguments.length;
var i__7869__auto___19793 = (0);
while(true){
if((i__7869__auto___19793 < len__7868__auto___19792)){
args__7875__auto__.push((arguments[i__7869__auto___19793]));

var G__19794 = (i__7869__auto___19793 + (1));
i__7869__auto___19793 = G__19794;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((3) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((3)),(0),null)):null);
return lt.macros.foreach.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__7876__auto__);
});

lt.macros.foreach.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,xs,body){
return cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","let","cljs.core/let",-308701135,null)),(function (){var x__7627__auto__ = cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"xs__19785__auto__","xs__19785__auto__",1934968702,null)),(function (){var x__7627__auto__ = cljs.core.second.call(null,xs);
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"len__19786__auto__","len__19786__auto__",-2077176804,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,".-length",".-length",-280799999,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"xs__19785__auto__","xs__19785__auto__",1934968702,null)))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})()))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","loop","cljs.core/loop",-1829423021,null)),(function (){var x__7627__auto__ = cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"left__19787__auto__","left__19787__auto__",-983878396,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,(0))))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","when","cljs.core/when",120293186,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","<","cljs.core/<",1677496129,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"left__19787__auto__","left__19787__auto__",-983878396,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"len__19786__auto__","len__19786__auto__",-2077176804,null)))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","let","cljs.core/let",-308701135,null)),(function (){var x__7627__auto__ = cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,(function (){var x__7627__auto__ = cljs.core.first.call(null,xs);
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","aget","cljs.core/aget",6345791,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"xs__19785__auto__","xs__19785__auto__",1934968702,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("lt.macros","left","lt.macros/left",1772760401,null)))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})()))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),body,(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"recur","recur",1202958259,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","inc","cljs.core/inc",-879172610,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"left__19787__auto__","left__19787__auto__",-983878396,null)))));
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

lt.macros.foreach.cljs$lang$applyTo = (function (seq19788){
var G__19789 = cljs.core.first.call(null,seq19788);
var seq19788__$1 = cljs.core.next.call(null,seq19788);
var G__19790 = cljs.core.first.call(null,seq19788__$1);
var seq19788__$2 = cljs.core.next.call(null,seq19788__$1);
var G__19791 = cljs.core.first.call(null,seq19788__$2);
var seq19788__$3 = cljs.core.next.call(null,seq19788__$2);
return lt.macros.foreach.cljs$core$IFn$_invoke$arity$variadic(G__19789,G__19790,G__19791,seq19788__$3);
});


lt.macros.foreach.cljs$lang$macro = true;
lt.macros.with_time = (function lt$macros$with_time(var_args){
var args__7875__auto__ = [];
var len__7868__auto___19798 = arguments.length;
var i__7869__auto___19799 = (0);
while(true){
if((i__7869__auto___19799 < len__7868__auto___19798)){
args__7875__auto__.push((arguments[i__7869__auto___19799]));

var G__19800 = (i__7869__auto___19799 + (1));
i__7869__auto___19799 = G__19800;
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

lt.macros.with_time.cljs$lang$applyTo = (function (seq19795){
var G__19796 = cljs.core.first.call(null,seq19795);
var seq19795__$1 = cljs.core.next.call(null,seq19795);
var G__19797 = cljs.core.first.call(null,seq19795__$1);
var seq19795__$2 = cljs.core.next.call(null,seq19795__$1);
return lt.macros.with_time.cljs$core$IFn$_invoke$arity$variadic(G__19796,G__19797,seq19795__$2);
});


lt.macros.with_time.cljs$lang$macro = true;
/**
 * Register given func to run on background thread
 */
lt.macros.background = (function lt$macros$background(_AMPERSAND_form,_AMPERSAND_env,func){
return cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("lt.objs.thread","thread*","lt.objs.thread/thread*",-698903956,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null)),(function (){var x__7627__auto__ = cljs.core.gensym.call(null,"tfun");
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,".log",".log",565247729,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("js","console","js/console",-1426368245,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,"BACKGROUND:"))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,".log",".log",565247729,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("js","console","js/console",-1426368245,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,"ARGS:"),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","js-arguments","cljs.core/js-arguments",464029257,null)))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,".log",".log",565247729,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("js","console","js/console",-1426368245,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,"ARR:"),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("js","argsArray","js/argsArray",229349789,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","js-arguments","cljs.core/js-arguments",464029257,null)))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","let","cljs.core/let",-308701135,null)),(function (){var x__7627__auto__ = cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"orig__19801__auto__","orig__19801__auto__",336095396,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("js","argsArray","js/argsArray",229349789,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","js-arguments","cljs.core/js-arguments",464029257,null)))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"msg__19802__auto__","msg__19802__auto__",59275013,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,".shift",".shift",-790464511,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"orig__19801__auto__","orig__19801__auto__",336095396,null)))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"args__19803__auto__","args__19803__auto__",1467233699,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,".map",".map",-1325946422,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"orig__19801__auto__","orig__19801__auto__",336095396,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.reader","read-string","cljs.reader/read-string",589673466,null)))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"raise","raise",1824672588,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null)),(function (){var x__7627__auto__ = cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"obj__19804__auto__","obj__19804__auto__",2074755282,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"k__19805__auto__","k__19805__auto__",-1735012298,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"v__19806__auto__","v__19806__auto__",1269954388,null))))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("js","_send","js/_send",1366779817,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"obj__19804__auto__","obj__19804__auto__",2074755282,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"k__19805__auto__","k__19805__auto__",-1735012298,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","pr-str","cljs.core/pr-str",-552799478,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"v__19806__auto__","v__19806__auto__",1269954388,null)))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,"clj"))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})()))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,".log",".log",565247729,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("js","console","js/console",-1426368245,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,"MAPARG:"),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","pr-str","cljs.core/pr-str",-552799478,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","cons","cljs.core/cons",96507417,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,".-obj",".-obj",-2111595180,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"msg__19802__auto__","msg__19802__auto__",59275013,null)))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"args__19803__auto__","args__19803__auto__",1467233699,null)))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","pr-str","cljs.core/pr-str",-552799478,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"args__19803__auto__","args__19803__auto__",1467233699,null)))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,".log",".log",565247729,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("js","console","js/console",-1426368245,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,"MAPARG2:"),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","pr-str","cljs.core/pr-str",-552799478,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","to-array","cljs.core/to-array",-1520976800,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","cons","cljs.core/cons",96507417,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,".-obj",".-obj",-2111595180,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"msg__19802__auto__","msg__19802__auto__",59275013,null)))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"args__19803__auto__","args__19803__auto__",1467233699,null)))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","pr-str","cljs.core/pr-str",-552799478,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"args__19803__auto__","args__19803__auto__",1467233699,null)))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,".apply",".apply",-1176201338,null)),(function (){var x__7627__auto__ = func;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,null),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","to-array","cljs.core/to-array",-1520976800,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","cons","cljs.core/cons",96507417,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,".-obj",".-obj",-2111595180,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"msg__19802__auto__","msg__19802__auto__",59275013,null)))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"args__19803__auto__","args__19803__auto__",1467233699,null)))));
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
var len__7868__auto___19816 = arguments.length;
var i__7869__auto___19817 = (0);
while(true){
if((i__7869__auto___19817 < len__7868__auto___19816)){
args__7875__auto__.push((arguments[i__7869__auto___19817]));

var G__19818 = (i__7869__auto___19817 + (1));
i__7869__auto___19817 = G__19818;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((3) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((3)),(0),null)):null);
return lt.macros.aloop.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__7876__auto__);
});

lt.macros.aloop.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,p__19812,body){
var vec__19813 = p__19812;
var var$ = cljs.core.nth.call(null,vec__19813,(0),null);
var arr = cljs.core.nth.call(null,vec__19813,(1),null);
return cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","let","cljs.core/let",-308701135,null)),(function (){var x__7627__auto__ = cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"arr__19807__auto__","arr__19807__auto__",1540203982,null)),(function (){var x__7627__auto__ = arr;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})()))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","loop","cljs.core/loop",-1829423021,null)),(function (){var x__7627__auto__ = cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,(function (){var x__7627__auto__ = var$;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,(0))))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","when","cljs.core/when",120293186,null)),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","<","cljs.core/<",1677496129,null)),(function (){var x__7627__auto__ = var$;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),(function (){var x__7627__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,".-length",".-length",-280799999,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"arr__19807__auto__","arr__19807__auto__",1540203982,null)))));
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

lt.macros.aloop.cljs$lang$applyTo = (function (seq19808){
var G__19809 = cljs.core.first.call(null,seq19808);
var seq19808__$1 = cljs.core.next.call(null,seq19808);
var G__19810 = cljs.core.first.call(null,seq19808__$1);
var seq19808__$2 = cljs.core.next.call(null,seq19808__$1);
var G__19811 = cljs.core.first.call(null,seq19808__$2);
var seq19808__$3 = cljs.core.next.call(null,seq19808__$2);
return lt.macros.aloop.cljs$core$IFn$_invoke$arity$variadic(G__19809,G__19810,G__19811,seq19808__$3);
});


lt.macros.aloop.cljs$lang$macro = true;
