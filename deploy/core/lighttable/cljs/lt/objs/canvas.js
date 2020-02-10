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
var seq__14589_14599 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),cljs.core.PersistentVector.EMPTY));
var chunk__14590_14600 = null;
var count__14591_14601 = (0);
var i__14592_14602 = (0);
while(true){
if((i__14592_14602 < count__14591_14601)){
var vec__14593_14603 = cljs.core._nth.call(null,chunk__14590_14600,i__14592_14602);
var ev__7943__auto___14604 = cljs.core.nth.call(null,vec__14593_14603,(0),null);
var func__7944__auto___14605 = cljs.core.nth.call(null,vec__14593_14603,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___14604,func__7944__auto___14605);

var G__14606 = seq__14589_14599;
var G__14607 = chunk__14590_14600;
var G__14608 = count__14591_14601;
var G__14609 = (i__14592_14602 + (1));
seq__14589_14599 = G__14606;
chunk__14590_14600 = G__14607;
count__14591_14601 = G__14608;
i__14592_14602 = G__14609;
continue;
} else {
var temp__4657__auto___14610 = cljs.core.seq.call(null,seq__14589_14599);
if(temp__4657__auto___14610){
var seq__14589_14611__$1 = temp__4657__auto___14610;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14589_14611__$1)){
var c__7604__auto___14612 = cljs.core.chunk_first.call(null,seq__14589_14611__$1);
var G__14613 = cljs.core.chunk_rest.call(null,seq__14589_14611__$1);
var G__14614 = c__7604__auto___14612;
var G__14615 = cljs.core.count.call(null,c__7604__auto___14612);
var G__14616 = (0);
seq__14589_14599 = G__14613;
chunk__14590_14600 = G__14614;
count__14591_14601 = G__14615;
i__14592_14602 = G__14616;
continue;
} else {
var vec__14596_14617 = cljs.core.first.call(null,seq__14589_14611__$1);
var ev__7943__auto___14618 = cljs.core.nth.call(null,vec__14596_14617,(0),null);
var func__7944__auto___14619 = cljs.core.nth.call(null,vec__14596_14617,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___14618,func__7944__auto___14619);

var G__14620 = cljs.core.next.call(null,seq__14589_14611__$1);
var G__14621 = null;
var G__14622 = (0);
var G__14623 = (0);
seq__14589_14599 = G__14620;
chunk__14590_14600 = G__14621;
count__14591_14601 = G__14622;
i__14592_14602 = G__14623;
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
var len__7868__auto___14630 = arguments.length;
var i__7869__auto___14631 = (0);
while(true){
if((i__7869__auto___14631 < len__7868__auto___14630)){
args__7875__auto__.push((arguments[i__7869__auto___14631]));

var G__14632 = (i__7869__auto___14631 + (1));
i__7869__auto___14631 = G__14632;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((1) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((1)),(0),null)):null);
return lt.objs.canvas.add_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7876__auto__);
});

lt.objs.canvas.add_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (obj,p__14626){
var vec__14627 = p__14626;
var position_QMARK_ = cljs.core.nth.call(null,vec__14627,(0),null);
lt.util.dom.append.call(null,lt.object.__GT_content.call(null,lt.objs.canvas.canvas),lt.object.__GT_content.call(null,obj));

return lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"show","show",-576705889));
});

lt.objs.canvas.add_BANG_.cljs$lang$maxFixedArity = (1);

lt.objs.canvas.add_BANG_.cljs$lang$applyTo = (function (seq14624){
var G__14625 = cljs.core.first.call(null,seq14624);
var seq14624__$1 = cljs.core.next.call(null,seq14624);
return lt.objs.canvas.add_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__14625,seq14624__$1);
});

/**
 * 
 */
lt.objs.canvas.__BEH__append_canvas = (function lt$objs$canvas$__BEH__append_canvas(app){
lt.util.dom.css.call(null,lt.util.dom.$.call(null,new cljs.core.Keyword(null,"#loader","#loader",605392142)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"opacity","opacity",397153780),(0)], null));

return lt.util.dom.css.call(null,lt.util.dom.$.call(null,new cljs.core.Keyword(null,"#wrapper","#wrapper",424879512)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"opacity","opacity",397153780),(1)], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.canvas","append-canvas","lt.objs.canvas/append-canvas",-229821015),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"show","show",-576705889),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.canvas.__BEH__append_canvas);
