// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.objs.canvas');
goog.require('cljs.core');
goog.require('lt.object');
goog.require('lt.objs.context');
goog.require('lt.util.dom');
/**
 * 
 */
lt.objs.canvas.canvas_elem = (function lt$objs$canvas$canvas_elem(obj){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#canvas","div#canvas",2110735133)], null));
var seq__14587_14597 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),cljs.core.PersistentVector.EMPTY));
var chunk__14588_14598 = null;
var count__14589_14599 = (0);
var i__14590_14600 = (0);
while(true){
if((i__14590_14600 < count__14589_14599)){
var vec__14591_14601 = cljs.core._nth.call(null,chunk__14588_14598,i__14590_14600);
var ev__7943__auto___14602 = cljs.core.nth.call(null,vec__14591_14601,(0),null);
var func__7944__auto___14603 = cljs.core.nth.call(null,vec__14591_14601,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___14602,func__7944__auto___14603);

var G__14604 = seq__14587_14597;
var G__14605 = chunk__14588_14598;
var G__14606 = count__14589_14599;
var G__14607 = (i__14590_14600 + (1));
seq__14587_14597 = G__14604;
chunk__14588_14598 = G__14605;
count__14589_14599 = G__14606;
i__14590_14600 = G__14607;
continue;
} else {
var temp__4657__auto___14608 = cljs.core.seq.call(null,seq__14587_14597);
if(temp__4657__auto___14608){
var seq__14587_14609__$1 = temp__4657__auto___14608;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14587_14609__$1)){
var c__7604__auto___14610 = cljs.core.chunk_first.call(null,seq__14587_14609__$1);
var G__14611 = cljs.core.chunk_rest.call(null,seq__14587_14609__$1);
var G__14612 = c__7604__auto___14610;
var G__14613 = cljs.core.count.call(null,c__7604__auto___14610);
var G__14614 = (0);
seq__14587_14597 = G__14611;
chunk__14588_14598 = G__14612;
count__14589_14599 = G__14613;
i__14590_14600 = G__14614;
continue;
} else {
var vec__14594_14615 = cljs.core.first.call(null,seq__14587_14609__$1);
var ev__7943__auto___14616 = cljs.core.nth.call(null,vec__14594_14615,(0),null);
var func__7944__auto___14617 = cljs.core.nth.call(null,vec__14594_14615,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___14616,func__7944__auto___14617);

var G__14618 = cljs.core.next.call(null,seq__14587_14609__$1);
var G__14619 = null;
var G__14620 = (0);
var G__14621 = (0);
seq__14587_14597 = G__14618;
chunk__14588_14598 = G__14619;
count__14589_14599 = G__14620;
i__14590_14600 = G__14621;
continue;
}
} else {
}
}
break;
}

return e__7942__auto__;
});
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.canvas","canvas","lt.objs.canvas/canvas",-2075035917),new cljs.core.Keyword(null,"init","init",-1875481434),(function (obj){
return lt.objs.canvas.canvas_elem.call(null,obj);
}));
lt.objs.canvas.canvas = lt.object.create.call(null,new cljs.core.Keyword("lt.objs.canvas","canvas","lt.objs.canvas/canvas",-2075035917));
lt.util.dom.append.call(null,lt.util.dom.$.call(null,"#wrapper"),lt.object.__GT_content.call(null,lt.objs.canvas.canvas));
lt.objs.canvas.add_BANG_ = (function lt$objs$canvas$add_BANG_(var_args){
var args__7875__auto__ = [];
var len__7868__auto___14628 = arguments.length;
var i__7869__auto___14629 = (0);
while(true){
if((i__7869__auto___14629 < len__7868__auto___14628)){
args__7875__auto__.push((arguments[i__7869__auto___14629]));

var G__14630 = (i__7869__auto___14629 + (1));
i__7869__auto___14629 = G__14630;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((1) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((1)),(0),null)):null);
return lt.objs.canvas.add_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7876__auto__);
});

lt.objs.canvas.add_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (obj,p__14624){
var vec__14625 = p__14624;
var position_QMARK_ = cljs.core.nth.call(null,vec__14625,(0),null);
lt.util.dom.append.call(null,lt.object.__GT_content.call(null,lt.objs.canvas.canvas),lt.object.__GT_content.call(null,obj));

return lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"show","show",-576705889));
});

lt.objs.canvas.add_BANG_.cljs$lang$maxFixedArity = (1);

lt.objs.canvas.add_BANG_.cljs$lang$applyTo = (function (seq14622){
var G__14623 = cljs.core.first.call(null,seq14622);
var seq14622__$1 = cljs.core.next.call(null,seq14622);
return lt.objs.canvas.add_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__14623,seq14622__$1);
});

/**
 * 
 */
lt.objs.canvas.__BEH__append_canvas = (function lt$objs$canvas$__BEH__append_canvas(app){
lt.util.dom.css.call(null,lt.util.dom.$.call(null,new cljs.core.Keyword(null,"#loader","#loader",605392142)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"opacity","opacity",397153780),(0)], null));

return lt.util.dom.css.call(null,lt.util.dom.$.call(null,new cljs.core.Keyword(null,"#wrapper","#wrapper",424879512)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"opacity","opacity",397153780),(1)], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.canvas","append-canvas","lt.objs.canvas/append-canvas",-229821015),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"show","show",-576705889),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.canvas.__BEH__append_canvas);
