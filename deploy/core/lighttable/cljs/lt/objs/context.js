// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.objs.context');
goog.require('cljs.core');
goog.require('lt.object');
lt.objs.context.contexts = cljs.core.atom.call(null,cljs.core.PersistentHashSet.EMPTY);
lt.objs.context.groups = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
lt.objs.context.ctx__GT_obj = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
lt.objs.context.ctx__GT_group = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
lt.objs.context.group__GT_ctxs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
lt.objs.context.append_group = (function lt$objs$context$append_group(group,name){
return cljs.core.swap_BANG_.call(null,lt.objs.context.groups,(function (all){
if(cljs.core.truth_(all.call(null,group))){
return cljs.core.update_in.call(null,all,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [group], null),cljs.core.conj,name);
} else {
return cljs.core.assoc.call(null,all,group,cljs.core.PersistentHashSet.fromArray([name], true));
}
}));
});
lt.objs.context.in_QMARK_ = (function lt$objs$context$in_QMARK_(k){
return cljs.core.deref.call(null,lt.objs.context.contexts).call(null,k);
});
lt.objs.context.out_BANG_ = (function lt$objs$context$out_BANG_(var_args){
var args13568 = [];
var len__7868__auto___13571 = arguments.length;
var i__7869__auto___13572 = (0);
while(true){
if((i__7869__auto___13572 < len__7868__auto___13571)){
args13568.push((arguments[i__7869__auto___13572]));

var G__13573 = (i__7869__auto___13572 + (1));
i__7869__auto___13572 = G__13573;
continue;
} else {
}
break;
}

var G__13570 = args13568.length;
switch (G__13570) {
case 1:
return lt.objs.context.out_BANG_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return lt.objs.context.out_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13568.length)].join('')));

}
});

lt.objs.context.out_BANG_.cljs$core$IFn$_invoke$arity$1 = (function (ctxs){
var ctxs__$1 = ((cljs.core.coll_QMARK_.call(null,ctxs))?ctxs:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [ctxs], null));
cljs.core.swap_BANG_.call(null,lt.objs.context.contexts,((function (ctxs__$1){
return (function (p1__13566_SHARP_){
return cljs.core.apply.call(null,cljs.core.disj,p1__13566_SHARP_,ctxs__$1);
});})(ctxs__$1))
);

cljs.core.swap_BANG_.call(null,lt.objs.context.ctx__GT_obj,((function (ctxs__$1){
return (function (p1__13567_SHARP_){
return cljs.core.apply.call(null,cljs.core.dissoc,p1__13567_SHARP_,ctxs__$1);
});})(ctxs__$1))
);

return lt.object.raise.call(null,lt.objs.context.ctx_obj,new cljs.core.Keyword(null,"log!","log!",303701345));
});

lt.objs.context.out_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (ctxs,_){
return lt.objs.context.out_BANG_.call(null,ctxs);
});

lt.objs.context.out_BANG_.cljs$lang$maxFixedArity = 2;

lt.objs.context.in_BANG_ = (function lt$objs$context$in_BANG_(var_args){
var args__7875__auto__ = [];
var len__7868__auto___13587 = arguments.length;
var i__7869__auto___13588 = (0);
while(true){
if((i__7869__auto___13588 < len__7868__auto___13587)){
args__7875__auto__.push((arguments[i__7869__auto___13588]));

var G__13589 = (i__7869__auto___13588 + (1));
i__7869__auto___13588 = G__13589;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((1) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((1)),(0),null)):null);
return lt.objs.context.in_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7876__auto__);
});

lt.objs.context.in_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ctxs,p__13579){
var vec__13580 = p__13579;
var obj = cljs.core.nth.call(null,vec__13580,(0),null);
var ctxs__$1 = ((cljs.core.coll_QMARK_.call(null,ctxs))?ctxs:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [ctxs], null));
cljs.core.swap_BANG_.call(null,lt.objs.context.contexts,((function (ctxs__$1,vec__13580,obj){
return (function (p1__13575_SHARP_){
return cljs.core.apply.call(null,cljs.core.conj,p1__13575_SHARP_,ctxs__$1);
});})(ctxs__$1,vec__13580,obj))
);

cljs.core.swap_BANG_.call(null,lt.objs.context.ctx__GT_obj,((function (ctxs__$1,vec__13580,obj){
return (function (p1__13576_SHARP_){
return cljs.core.merge.call(null,p1__13576_SHARP_,cljs.core.zipmap.call(null,ctxs__$1,cljs.core.repeat.call(null,obj)));
});})(ctxs__$1,vec__13580,obj))
);

lt.object.raise.call(null,lt.objs.context.ctx_obj,new cljs.core.Keyword(null,"log!","log!",303701345));

var seq__13583 = cljs.core.seq.call(null,ctxs__$1);
var chunk__13584 = null;
var count__13585 = (0);
var i__13586 = (0);
while(true){
if((i__13586 < count__13585)){
var c = cljs.core._nth.call(null,chunk__13584,i__13586);
var temp__4657__auto___13590 = cljs.core.deref.call(null,lt.objs.context.group__GT_ctxs).call(null,cljs.core.deref.call(null,lt.objs.context.ctx__GT_group).call(null,c));
if(cljs.core.truth_(temp__4657__auto___13590)){
var group_13591 = temp__4657__auto___13590;
lt.objs.context.out_BANG_.call(null,group_13591);
} else {
}

var G__13592 = seq__13583;
var G__13593 = chunk__13584;
var G__13594 = count__13585;
var G__13595 = (i__13586 + (1));
seq__13583 = G__13592;
chunk__13584 = G__13593;
count__13585 = G__13594;
i__13586 = G__13595;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__13583);
if(temp__4657__auto__){
var seq__13583__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13583__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__13583__$1);
var G__13596 = cljs.core.chunk_rest.call(null,seq__13583__$1);
var G__13597 = c__7604__auto__;
var G__13598 = cljs.core.count.call(null,c__7604__auto__);
var G__13599 = (0);
seq__13583 = G__13596;
chunk__13584 = G__13597;
count__13585 = G__13598;
i__13586 = G__13599;
continue;
} else {
var c = cljs.core.first.call(null,seq__13583__$1);
var temp__4657__auto___13600__$1 = cljs.core.deref.call(null,lt.objs.context.group__GT_ctxs).call(null,cljs.core.deref.call(null,lt.objs.context.ctx__GT_group).call(null,c));
if(cljs.core.truth_(temp__4657__auto___13600__$1)){
var group_13601 = temp__4657__auto___13600__$1;
lt.objs.context.out_BANG_.call(null,group_13601);
} else {
}

var G__13602 = cljs.core.next.call(null,seq__13583__$1);
var G__13603 = null;
var G__13604 = (0);
var G__13605 = (0);
seq__13583 = G__13602;
chunk__13584 = G__13603;
count__13585 = G__13604;
i__13586 = G__13605;
continue;
}
} else {
return null;
}
}
break;
}
});

lt.objs.context.in_BANG_.cljs$lang$maxFixedArity = (1);

lt.objs.context.in_BANG_.cljs$lang$applyTo = (function (seq13577){
var G__13578 = cljs.core.first.call(null,seq13577);
var seq13577__$1 = cljs.core.next.call(null,seq13577);
return lt.objs.context.in_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__13578,seq13577__$1);
});

lt.objs.context.toggle_BANG_ = (function lt$objs$context$toggle_BANG_(var_args){
var args__7875__auto__ = [];
var len__7868__auto___13616 = arguments.length;
var i__7869__auto___13617 = (0);
while(true){
if((i__7869__auto___13617 < len__7868__auto___13616)){
args__7875__auto__.push((arguments[i__7869__auto___13617]));

var G__13618 = (i__7869__auto___13617 + (1));
i__7869__auto___13617 = G__13618;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((1) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((1)),(0),null)):null);
return lt.objs.context.toggle_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7876__auto__);
});

lt.objs.context.toggle_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ctxs,p__13608){
var vec__13609 = p__13608;
var obj = cljs.core.nth.call(null,vec__13609,(0),null);
var seq__13612 = cljs.core.seq.call(null,ctxs);
var chunk__13613 = null;
var count__13614 = (0);
var i__13615 = (0);
while(true){
if((i__13615 < count__13614)){
var c = cljs.core._nth.call(null,chunk__13613,i__13615);
if(cljs.core.truth_(lt.objs.context.in_QMARK_.call(null,c))){
lt.objs.context.out_BANG_.call(null,c);
} else {
lt.objs.context.in_BANG_.call(null,c,obj);
}

var G__13619 = seq__13612;
var G__13620 = chunk__13613;
var G__13621 = count__13614;
var G__13622 = (i__13615 + (1));
seq__13612 = G__13619;
chunk__13613 = G__13620;
count__13614 = G__13621;
i__13615 = G__13622;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__13612);
if(temp__4657__auto__){
var seq__13612__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13612__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__13612__$1);
var G__13623 = cljs.core.chunk_rest.call(null,seq__13612__$1);
var G__13624 = c__7604__auto__;
var G__13625 = cljs.core.count.call(null,c__7604__auto__);
var G__13626 = (0);
seq__13612 = G__13623;
chunk__13613 = G__13624;
count__13614 = G__13625;
i__13615 = G__13626;
continue;
} else {
var c = cljs.core.first.call(null,seq__13612__$1);
if(cljs.core.truth_(lt.objs.context.in_QMARK_.call(null,c))){
lt.objs.context.out_BANG_.call(null,c);
} else {
lt.objs.context.in_BANG_.call(null,c,obj);
}

var G__13627 = cljs.core.next.call(null,seq__13612__$1);
var G__13628 = null;
var G__13629 = (0);
var G__13630 = (0);
seq__13612 = G__13627;
chunk__13613 = G__13628;
count__13614 = G__13629;
i__13615 = G__13630;
continue;
}
} else {
return null;
}
}
break;
}
});

lt.objs.context.toggle_BANG_.cljs$lang$maxFixedArity = (1);

lt.objs.context.toggle_BANG_.cljs$lang$applyTo = (function (seq13606){
var G__13607 = cljs.core.first.call(null,seq13606);
var seq13606__$1 = cljs.core.next.call(null,seq13606);
return lt.objs.context.toggle_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__13607,seq13606__$1);
});

lt.objs.context.current = (function lt$objs$context$current(){
return cljs.core.deref.call(null,lt.objs.context.contexts);
});
lt.objs.context.group_BANG_ = (function lt$objs$context$group_BANG_(ctx,group){
cljs.core.swap_BANG_.call(null,lt.objs.context.ctx__GT_group,cljs.core.assoc,ctx,group);

return cljs.core.swap_BANG_.call(null,lt.objs.context.group__GT_ctxs,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [group], null),cljs.core.conj,ctx);
});
lt.objs.context.__GT_obj = (function lt$objs$context$__GT_obj(ctx){
return cljs.core.deref.call(null,lt.objs.context.ctx__GT_obj).call(null,ctx);
});
lt.objs.context.enqueue = (function lt$objs$context$enqueue(coll,buffer,size){
if(cljs.core._EQ_.call(null,size,cljs.core.count.call(null,buffer))){
return cljs.core.conj.call(null,cljs.core.pop.call(null,buffer),coll);
} else {
return cljs.core.conj.call(null,buffer,coll);
}
});
/**
 * 
 */
lt.objs.context.__BEH__log = (function lt$objs$context$__BEH__log(this$){
var size = new cljs.core.Keyword(null,"buffer-size","buffer-size",1047120420).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$));
var ctx = cljs.core.deref.call(null,lt.objs.context.contexts);
return lt.object.update_BANG_.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"history","history",-247395220)], null),((function (size,ctx){
return (function (p1__13631_SHARP_){
return lt.objs.context.enqueue.call(null,ctx,p1__13631_SHARP_,size);
});})(size,ctx))
);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.context","log","lt.objs.context/log",-900197159),new cljs.core.Keyword(null,"debounce","debounce",-871550296),(16),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"log!","log!",303701345),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.context.__BEH__log);
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.context","context","lt.objs.context/context",2030425266),new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"context","context",-830191113),null], null), null),new cljs.core.Keyword(null,"history","history",-247395220),cljs.core.PersistentQueue.EMPTY,new cljs.core.Keyword(null,"buffer-size","buffer-size",1047120420),(8),new cljs.core.Keyword(null,"init","init",-1875481434),(function (this$){
return null;
}));
lt.objs.context.ctx_obj = lt.object.create.call(null,new cljs.core.Keyword("lt.objs.context","context","lt.objs.context/context",2030425266));
