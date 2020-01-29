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
var args13566 = [];
var len__7868__auto___13569 = arguments.length;
var i__7869__auto___13570 = (0);
while(true){
if((i__7869__auto___13570 < len__7868__auto___13569)){
args13566.push((arguments[i__7869__auto___13570]));

var G__13571 = (i__7869__auto___13570 + (1));
i__7869__auto___13570 = G__13571;
continue;
} else {
}
break;
}

var G__13568 = args13566.length;
switch (G__13568) {
case 1:
return lt.objs.context.out_BANG_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return lt.objs.context.out_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13566.length)].join('')));

}
});

lt.objs.context.out_BANG_.cljs$core$IFn$_invoke$arity$1 = (function (ctxs){
var ctxs__$1 = ((cljs.core.coll_QMARK_.call(null,ctxs))?ctxs:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [ctxs], null));
cljs.core.swap_BANG_.call(null,lt.objs.context.contexts,((function (ctxs__$1){
return (function (p1__13564_SHARP_){
return cljs.core.apply.call(null,cljs.core.disj,p1__13564_SHARP_,ctxs__$1);
});})(ctxs__$1))
);

cljs.core.swap_BANG_.call(null,lt.objs.context.ctx__GT_obj,((function (ctxs__$1){
return (function (p1__13565_SHARP_){
return cljs.core.apply.call(null,cljs.core.dissoc,p1__13565_SHARP_,ctxs__$1);
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
var len__7868__auto___13585 = arguments.length;
var i__7869__auto___13586 = (0);
while(true){
if((i__7869__auto___13586 < len__7868__auto___13585)){
args__7875__auto__.push((arguments[i__7869__auto___13586]));

var G__13587 = (i__7869__auto___13586 + (1));
i__7869__auto___13586 = G__13587;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((1) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((1)),(0),null)):null);
return lt.objs.context.in_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7876__auto__);
});

lt.objs.context.in_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ctxs,p__13577){
var vec__13578 = p__13577;
var obj = cljs.core.nth.call(null,vec__13578,(0),null);
var ctxs__$1 = ((cljs.core.coll_QMARK_.call(null,ctxs))?ctxs:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [ctxs], null));
cljs.core.swap_BANG_.call(null,lt.objs.context.contexts,((function (ctxs__$1,vec__13578,obj){
return (function (p1__13573_SHARP_){
return cljs.core.apply.call(null,cljs.core.conj,p1__13573_SHARP_,ctxs__$1);
});})(ctxs__$1,vec__13578,obj))
);

cljs.core.swap_BANG_.call(null,lt.objs.context.ctx__GT_obj,((function (ctxs__$1,vec__13578,obj){
return (function (p1__13574_SHARP_){
return cljs.core.merge.call(null,p1__13574_SHARP_,cljs.core.zipmap.call(null,ctxs__$1,cljs.core.repeat.call(null,obj)));
});})(ctxs__$1,vec__13578,obj))
);

lt.object.raise.call(null,lt.objs.context.ctx_obj,new cljs.core.Keyword(null,"log!","log!",303701345));

var seq__13581 = cljs.core.seq.call(null,ctxs__$1);
var chunk__13582 = null;
var count__13583 = (0);
var i__13584 = (0);
while(true){
if((i__13584 < count__13583)){
var c = cljs.core._nth.call(null,chunk__13582,i__13584);
var temp__4657__auto___13588 = cljs.core.deref.call(null,lt.objs.context.group__GT_ctxs).call(null,cljs.core.deref.call(null,lt.objs.context.ctx__GT_group).call(null,c));
if(cljs.core.truth_(temp__4657__auto___13588)){
var group_13589 = temp__4657__auto___13588;
lt.objs.context.out_BANG_.call(null,group_13589);
} else {
}

var G__13590 = seq__13581;
var G__13591 = chunk__13582;
var G__13592 = count__13583;
var G__13593 = (i__13584 + (1));
seq__13581 = G__13590;
chunk__13582 = G__13591;
count__13583 = G__13592;
i__13584 = G__13593;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__13581);
if(temp__4657__auto__){
var seq__13581__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13581__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__13581__$1);
var G__13594 = cljs.core.chunk_rest.call(null,seq__13581__$1);
var G__13595 = c__7604__auto__;
var G__13596 = cljs.core.count.call(null,c__7604__auto__);
var G__13597 = (0);
seq__13581 = G__13594;
chunk__13582 = G__13595;
count__13583 = G__13596;
i__13584 = G__13597;
continue;
} else {
var c = cljs.core.first.call(null,seq__13581__$1);
var temp__4657__auto___13598__$1 = cljs.core.deref.call(null,lt.objs.context.group__GT_ctxs).call(null,cljs.core.deref.call(null,lt.objs.context.ctx__GT_group).call(null,c));
if(cljs.core.truth_(temp__4657__auto___13598__$1)){
var group_13599 = temp__4657__auto___13598__$1;
lt.objs.context.out_BANG_.call(null,group_13599);
} else {
}

var G__13600 = cljs.core.next.call(null,seq__13581__$1);
var G__13601 = null;
var G__13602 = (0);
var G__13603 = (0);
seq__13581 = G__13600;
chunk__13582 = G__13601;
count__13583 = G__13602;
i__13584 = G__13603;
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

lt.objs.context.in_BANG_.cljs$lang$applyTo = (function (seq13575){
var G__13576 = cljs.core.first.call(null,seq13575);
var seq13575__$1 = cljs.core.next.call(null,seq13575);
return lt.objs.context.in_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__13576,seq13575__$1);
});

lt.objs.context.toggle_BANG_ = (function lt$objs$context$toggle_BANG_(var_args){
var args__7875__auto__ = [];
var len__7868__auto___13614 = arguments.length;
var i__7869__auto___13615 = (0);
while(true){
if((i__7869__auto___13615 < len__7868__auto___13614)){
args__7875__auto__.push((arguments[i__7869__auto___13615]));

var G__13616 = (i__7869__auto___13615 + (1));
i__7869__auto___13615 = G__13616;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((1) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((1)),(0),null)):null);
return lt.objs.context.toggle_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7876__auto__);
});

lt.objs.context.toggle_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ctxs,p__13606){
var vec__13607 = p__13606;
var obj = cljs.core.nth.call(null,vec__13607,(0),null);
var seq__13610 = cljs.core.seq.call(null,ctxs);
var chunk__13611 = null;
var count__13612 = (0);
var i__13613 = (0);
while(true){
if((i__13613 < count__13612)){
var c = cljs.core._nth.call(null,chunk__13611,i__13613);
if(cljs.core.truth_(lt.objs.context.in_QMARK_.call(null,c))){
lt.objs.context.out_BANG_.call(null,c);
} else {
lt.objs.context.in_BANG_.call(null,c,obj);
}

var G__13617 = seq__13610;
var G__13618 = chunk__13611;
var G__13619 = count__13612;
var G__13620 = (i__13613 + (1));
seq__13610 = G__13617;
chunk__13611 = G__13618;
count__13612 = G__13619;
i__13613 = G__13620;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__13610);
if(temp__4657__auto__){
var seq__13610__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13610__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__13610__$1);
var G__13621 = cljs.core.chunk_rest.call(null,seq__13610__$1);
var G__13622 = c__7604__auto__;
var G__13623 = cljs.core.count.call(null,c__7604__auto__);
var G__13624 = (0);
seq__13610 = G__13621;
chunk__13611 = G__13622;
count__13612 = G__13623;
i__13613 = G__13624;
continue;
} else {
var c = cljs.core.first.call(null,seq__13610__$1);
if(cljs.core.truth_(lt.objs.context.in_QMARK_.call(null,c))){
lt.objs.context.out_BANG_.call(null,c);
} else {
lt.objs.context.in_BANG_.call(null,c,obj);
}

var G__13625 = cljs.core.next.call(null,seq__13610__$1);
var G__13626 = null;
var G__13627 = (0);
var G__13628 = (0);
seq__13610 = G__13625;
chunk__13611 = G__13626;
count__13612 = G__13627;
i__13613 = G__13628;
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

lt.objs.context.toggle_BANG_.cljs$lang$applyTo = (function (seq13604){
var G__13605 = cljs.core.first.call(null,seq13604);
var seq13604__$1 = cljs.core.next.call(null,seq13604);
return lt.objs.context.toggle_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__13605,seq13604__$1);
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
return (function (p1__13629_SHARP_){
return lt.objs.context.enqueue.call(null,ctx,p1__13629_SHARP_,size);
});})(size,ctx))
);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.context","log","lt.objs.context/log",-900197159),new cljs.core.Keyword(null,"debounce","debounce",-871550296),(16),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"log!","log!",303701345),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.context.__BEH__log);
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.context","context","lt.objs.context/context",2030425266),new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"context","context",-830191113),null], null), null),new cljs.core.Keyword(null,"history","history",-247395220),cljs.core.PersistentQueue.EMPTY,new cljs.core.Keyword(null,"buffer-size","buffer-size",1047120420),(8),new cljs.core.Keyword(null,"init","init",-1875481434),(function (this$){
return null;
}));
lt.objs.context.ctx_obj = lt.object.create.call(null,new cljs.core.Keyword("lt.objs.context","context","lt.objs.context/context",2030425266));
