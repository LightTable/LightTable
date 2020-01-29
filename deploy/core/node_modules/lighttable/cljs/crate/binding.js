// Compiled by ClojureScript 1.9.229 {}
goog.provide('crate.binding');
goog.require('cljs.core');
goog.require('clojure.set');

/**
* @constructor
 * @implements {cljs.core.IWatchable}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.IDeref}
 * @implements {cljs.core.IPrintWithWriter}
*/
crate.binding.SubAtom = (function (atm,path,prevhash,watches,key){
this.atm = atm;
this.path = path;
this.prevhash = prevhash;
this.watches = watches;
this.key = key;
this.cljs$lang$protocol_mask$partition0$ = 2153807872;
this.cljs$lang$protocol_mask$partition1$ = 2;
})
crate.binding.SubAtom.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (o,other){
var self__ = this;
var o__$1 = this;
return (o__$1 === other);
});

crate.binding.SubAtom.prototype.cljs$core$IDeref$_deref$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.atm)){
return cljs.core.get_in.call(null,cljs.core.deref.call(null,self__.atm),self__.path);
} else {
return null;
}
});

crate.binding.SubAtom.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this$,writer,opts){
var self__ = this;
var this$__$1 = this;
return cljs.core._write.call(null,writer,[cljs.core.str("#<SubAtom: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.get_in.call(null,cljs.core.deref.call(null,self__.atm),self__.path))),cljs.core.str(">")].join(''));
});

crate.binding.SubAtom.prototype.cljs$core$IWatchable$_notify_watches$arity$3 = (function (this$,oldval,newval){
var self__ = this;
var this$__$1 = this;
var seq__12342 = cljs.core.seq.call(null,self__.watches);
var chunk__12343 = null;
var count__12344 = (0);
var i__12345 = (0);
while(true){
if((i__12345 < count__12344)){
var vec__12346 = cljs.core._nth.call(null,chunk__12343,i__12345);
var key__$1 = cljs.core.nth.call(null,vec__12346,(0),null);
var f = cljs.core.nth.call(null,vec__12346,(1),null);
f.call(null,key__$1,this$__$1,oldval,newval);

var G__12352 = seq__12342;
var G__12353 = chunk__12343;
var G__12354 = count__12344;
var G__12355 = (i__12345 + (1));
seq__12342 = G__12352;
chunk__12343 = G__12353;
count__12344 = G__12354;
i__12345 = G__12355;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__12342);
if(temp__4657__auto__){
var seq__12342__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__12342__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__12342__$1);
var G__12356 = cljs.core.chunk_rest.call(null,seq__12342__$1);
var G__12357 = c__7604__auto__;
var G__12358 = cljs.core.count.call(null,c__7604__auto__);
var G__12359 = (0);
seq__12342 = G__12356;
chunk__12343 = G__12357;
count__12344 = G__12358;
i__12345 = G__12359;
continue;
} else {
var vec__12349 = cljs.core.first.call(null,seq__12342__$1);
var key__$1 = cljs.core.nth.call(null,vec__12349,(0),null);
var f = cljs.core.nth.call(null,vec__12349,(1),null);
f.call(null,key__$1,this$__$1,oldval,newval);

var G__12360 = cljs.core.next.call(null,seq__12342__$1);
var G__12361 = null;
var G__12362 = (0);
var G__12363 = (0);
seq__12342 = G__12360;
chunk__12343 = G__12361;
count__12344 = G__12362;
i__12345 = G__12363;
continue;
}
} else {
return null;
}
}
break;
}
});

crate.binding.SubAtom.prototype.cljs$core$IWatchable$_add_watch$arity$3 = (function (this$,key__$1,f){
var self__ = this;
var this$__$1 = this;
if(cljs.core.truth_(f)){
return this$__$1.watches = cljs.core.assoc.call(null,self__.watches,key__$1,f);
} else {
return null;
}
});

crate.binding.SubAtom.prototype.cljs$core$IWatchable$_remove_watch$arity$2 = (function (this$,key__$1){
var self__ = this;
var this$__$1 = this;
return this$__$1.watches = cljs.core.dissoc.call(null,self__.watches,key__$1);
});

crate.binding.SubAtom.prototype.cljs$core$IHash$_hash$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return goog.getUid(this$__$1);
});

crate.binding.SubAtom.getBasis = (function (){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"atm","atm",-1963551835,null),new cljs.core.Symbol(null,"path","path",1452340359,null),new cljs.core.Symbol(null,"prevhash","prevhash",1446045952,null),new cljs.core.Symbol(null,"watches","watches",1367433992,null),new cljs.core.Symbol(null,"key","key",124488940,null)], null);
});

crate.binding.SubAtom.cljs$lang$type = true;

crate.binding.SubAtom.cljs$lang$ctorStr = "crate.binding/SubAtom";

crate.binding.SubAtom.cljs$lang$ctorPrWriter = (function (this__7399__auto__,writer__7400__auto__,opt__7401__auto__){
return cljs.core._write.call(null,writer__7400__auto__,"crate.binding/SubAtom");
});

crate.binding.__GT_SubAtom = (function crate$binding$__GT_SubAtom(atm,path,prevhash,watches,key){
return (new crate.binding.SubAtom(atm,path,prevhash,watches,key));
});

crate.binding.subatom = (function crate$binding$subatom(atm,path){
var path__$1 = ((cljs.core.coll_QMARK_.call(null,path))?path:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [path], null));
var vec__12367 = (((atm instanceof crate.binding.SubAtom))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [atm.atm,cljs.core.concat.call(null,atm.path,path__$1)], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [atm,path__$1], null));
var atm__$1 = cljs.core.nth.call(null,vec__12367,(0),null);
var path__$2 = cljs.core.nth.call(null,vec__12367,(1),null);
var k = cljs.core.gensym.call(null,"subatom");
var sa = (new crate.binding.SubAtom(atm__$1,path__$2,cljs.core.hash.call(null,cljs.core.get_in.call(null,cljs.core.deref.call(null,atm__$1),path__$2)),null,k));
cljs.core.add_watch.call(null,atm__$1,k,((function (path__$1,vec__12367,atm__$1,path__$2,k,sa){
return (function (_,___$1,ov,nv){
var latest = cljs.core.get_in.call(null,nv,path__$2);
var prev = cljs.core.get_in.call(null,ov,path__$2);
var latest_hash = cljs.core.hash.call(null,latest);
if((cljs.core.not_EQ_.call(null,sa.prevhash,latest_hash)) && (cljs.core.not_EQ_.call(null,prev,latest))){
sa.prevhash = latest_hash;

return cljs.core._notify_watches.call(null,sa,cljs.core.get_in.call(null,ov,path__$2),latest);
} else {
return null;
}
});})(path__$1,vec__12367,atm__$1,path__$2,k,sa))
);

return sa;
});
/**
 * Sets the value of atom to newval without regard for the
 *   current value. Returns newval.
 */
crate.binding.sub_reset_BANG_ = (function crate$binding$sub_reset_BANG_(sa,new_value){
cljs.core.swap_BANG_.call(null,sa.atm,cljs.core.assoc_in,sa.path,new_value);

return new_value;
});
/**
 * Atomically swaps the value of atom to be:
 *   (apply f current-value-of-atom args). Note that f may be called
 *   multiple times, and thus should be free of side effects.  Returns
 *   the value that was swapped in.
 */
crate.binding.sub_swap_BANG_ = (function crate$binding$sub_swap_BANG_(var_args){
var args12370 = [];
var len__7868__auto___12379 = arguments.length;
var i__7869__auto___12380 = (0);
while(true){
if((i__7869__auto___12380 < len__7868__auto___12379)){
args12370.push((arguments[i__7869__auto___12380]));

var G__12381 = (i__7869__auto___12380 + (1));
i__7869__auto___12380 = G__12381;
continue;
} else {
}
break;
}

var G__12378 = args12370.length;
switch (G__12378) {
case 2:
return crate.binding.sub_swap_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return crate.binding.sub_swap_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return crate.binding.sub_swap_BANG_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return crate.binding.sub_swap_BANG_.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
var argseq__7887__auto__ = (new cljs.core.IndexedSeq(args12370.slice((5)),(0),null));
return crate.binding.sub_swap_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),argseq__7887__auto__);

}
});

crate.binding.sub_swap_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (sa,f){
return crate.binding.sub_reset_BANG_.call(null,sa,f.call(null,cljs.core.deref.call(null,sa)));
});

crate.binding.sub_swap_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (sa,f,x){
return crate.binding.sub_reset_BANG_.call(null,sa,f.call(null,cljs.core.deref.call(null,sa),x));
});

crate.binding.sub_swap_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (sa,f,x,y){
return crate.binding.sub_reset_BANG_.call(null,sa,f.call(null,cljs.core.deref.call(null,sa),x,y));
});

crate.binding.sub_swap_BANG_.cljs$core$IFn$_invoke$arity$5 = (function (sa,f,x,y,z){
return crate.binding.sub_reset_BANG_.call(null,sa,f.call(null,cljs.core.deref.call(null,sa),x,y,z));
});

crate.binding.sub_swap_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (sa,f,x,y,z,more){
return crate.binding.sub_reset_BANG_.call(null,sa,cljs.core.apply.call(null,f,cljs.core.deref.call(null,sa),x,y,z,more));
});

crate.binding.sub_swap_BANG_.cljs$lang$applyTo = (function (seq12371){
var G__12372 = cljs.core.first.call(null,seq12371);
var seq12371__$1 = cljs.core.next.call(null,seq12371);
var G__12373 = cljs.core.first.call(null,seq12371__$1);
var seq12371__$2 = cljs.core.next.call(null,seq12371__$1);
var G__12374 = cljs.core.first.call(null,seq12371__$2);
var seq12371__$3 = cljs.core.next.call(null,seq12371__$2);
var G__12375 = cljs.core.first.call(null,seq12371__$3);
var seq12371__$4 = cljs.core.next.call(null,seq12371__$3);
var G__12376 = cljs.core.first.call(null,seq12371__$4);
var seq12371__$5 = cljs.core.next.call(null,seq12371__$4);
return crate.binding.sub_swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__12372,G__12373,G__12374,G__12375,G__12376,seq12371__$5);
});

crate.binding.sub_swap_BANG_.cljs$lang$maxFixedArity = (5);

crate.binding.sub_destroy_BANG_ = (function crate$binding$sub_destroy_BANG_(sa){
cljs.core.remove_watch.call(null,sa.atm,sa.key);

sa.watches = null;

return sa.atm = null;
});

/**
 * @interface
 */
crate.binding.computable = function(){};

/**
 * depend on an atom
 */
crate.binding._depend = (function crate$binding$_depend(this$,atm){
if((!((this$ == null))) && (!((this$.crate$binding$computable$_depend$arity$2 == null)))){
return this$.crate$binding$computable$_depend$arity$2(this$,atm);
} else {
var x__7456__auto__ = (((this$ == null))?null:this$);
var m__7457__auto__ = (crate.binding._depend[goog.typeOf(x__7456__auto__)]);
if(!((m__7457__auto__ == null))){
return m__7457__auto__.call(null,this$,atm);
} else {
var m__7457__auto____$1 = (crate.binding._depend["_"]);
if(!((m__7457__auto____$1 == null))){
return m__7457__auto____$1.call(null,this$,atm);
} else {
throw cljs.core.missing_protocol.call(null,"computable.-depend",this$);
}
}
}
});

/**
 * compute the latest value
 */
crate.binding._compute = (function crate$binding$_compute(this$){
if((!((this$ == null))) && (!((this$.crate$binding$computable$_compute$arity$1 == null)))){
return this$.crate$binding$computable$_compute$arity$1(this$);
} else {
var x__7456__auto__ = (((this$ == null))?null:this$);
var m__7457__auto__ = (crate.binding._compute[goog.typeOf(x__7456__auto__)]);
if(!((m__7457__auto__ == null))){
return m__7457__auto__.call(null,this$);
} else {
var m__7457__auto____$1 = (crate.binding._compute["_"]);
if(!((m__7457__auto____$1 == null))){
return m__7457__auto____$1.call(null,this$);
} else {
throw cljs.core.missing_protocol.call(null,"computable.-compute",this$);
}
}
}
});


/**
* @constructor
 * @implements {cljs.core.IWatchable}
 * @implements {crate.binding.computable}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IDeref}
 * @implements {cljs.core.IPrintWithWriter}
*/
crate.binding.Computed = (function (atms,value,func,watches,key,meta){
this.atms = atms;
this.value = value;
this.func = func;
this.watches = watches;
this.key = key;
this.meta = meta;
this.cljs$lang$protocol_mask$partition0$ = 2153938944;
this.cljs$lang$protocol_mask$partition1$ = 2;
})
crate.binding.Computed.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (o,other){
var self__ = this;
var o__$1 = this;
return (o__$1 === other);
});

crate.binding.Computed.prototype.cljs$core$IDeref$_deref$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.value;
});

crate.binding.Computed.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this$,writer,opts){
var self__ = this;
var this$__$1 = this;
return cljs.core._write.call(null,writer,[cljs.core.str("#<Computed: "),cljs.core.str(cljs.core.pr_str.call(null,self__.value)),cljs.core.str(">")].join(''));
});

crate.binding.Computed.prototype.cljs$core$IWatchable$_notify_watches$arity$3 = (function (this$,oldval,newval){
var self__ = this;
var this$__$1 = this;
var seq__12383 = cljs.core.seq.call(null,self__.watches);
var chunk__12384 = null;
var count__12385 = (0);
var i__12386 = (0);
while(true){
if((i__12386 < count__12385)){
var vec__12387 = cljs.core._nth.call(null,chunk__12384,i__12386);
var key__$1 = cljs.core.nth.call(null,vec__12387,(0),null);
var f = cljs.core.nth.call(null,vec__12387,(1),null);
f.call(null,key__$1,this$__$1,oldval,newval);

var G__12393 = seq__12383;
var G__12394 = chunk__12384;
var G__12395 = count__12385;
var G__12396 = (i__12386 + (1));
seq__12383 = G__12393;
chunk__12384 = G__12394;
count__12385 = G__12395;
i__12386 = G__12396;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__12383);
if(temp__4657__auto__){
var seq__12383__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__12383__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__12383__$1);
var G__12397 = cljs.core.chunk_rest.call(null,seq__12383__$1);
var G__12398 = c__7604__auto__;
var G__12399 = cljs.core.count.call(null,c__7604__auto__);
var G__12400 = (0);
seq__12383 = G__12397;
chunk__12384 = G__12398;
count__12385 = G__12399;
i__12386 = G__12400;
continue;
} else {
var vec__12390 = cljs.core.first.call(null,seq__12383__$1);
var key__$1 = cljs.core.nth.call(null,vec__12390,(0),null);
var f = cljs.core.nth.call(null,vec__12390,(1),null);
f.call(null,key__$1,this$__$1,oldval,newval);

var G__12401 = cljs.core.next.call(null,seq__12383__$1);
var G__12402 = null;
var G__12403 = (0);
var G__12404 = (0);
seq__12383 = G__12401;
chunk__12384 = G__12402;
count__12385 = G__12403;
i__12386 = G__12404;
continue;
}
} else {
return null;
}
}
break;
}
});

crate.binding.Computed.prototype.cljs$core$IWatchable$_add_watch$arity$3 = (function (this$,key__$1,f){
var self__ = this;
var this$__$1 = this;
if(cljs.core.truth_(f)){
return this$__$1.watches = cljs.core.assoc.call(null,self__.watches,key__$1,f);
} else {
return null;
}
});

crate.binding.Computed.prototype.cljs$core$IWatchable$_remove_watch$arity$2 = (function (this$,key__$1){
var self__ = this;
var this$__$1 = this;
return this$__$1.watches = cljs.core.dissoc.call(null,self__.watches,key__$1);
});

crate.binding.Computed.prototype.cljs$core$IHash$_hash$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return goog.getUid(this$__$1);
});

crate.binding.Computed.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.meta;
});

crate.binding.Computed.prototype.crate$binding$computable$ = true;

crate.binding.Computed.prototype.crate$binding$computable$_depend$arity$2 = (function (this$,atm){
var self__ = this;
var this$__$1 = this;
this$__$1.atms = cljs.core.conj.call(null,this$__$1.atms,atm);

return cljs.core.add_watch.call(null,atm,self__.key,((function (this$__$1){
return (function (_,___$1,___$2,___$3){
return crate.binding._compute.call(null,this$__$1);
});})(this$__$1))
);
});

crate.binding.Computed.prototype.crate$binding$computable$_compute$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
var old = this$__$1.value;
var nv = cljs.core.apply.call(null,self__.func,cljs.core.map.call(null,cljs.core.deref,self__.atms));
this$__$1.value = nv;

return cljs.core._notify_watches.call(null,this$__$1,old,nv);
});

crate.binding.Computed.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"atms","atms",-855465715,null),new cljs.core.Symbol(null,"value","value",1946509744,null),new cljs.core.Symbol(null,"func","func",1401825487,null),new cljs.core.Symbol(null,"watches","watches",1367433992,null),new cljs.core.Symbol(null,"key","key",124488940,null),new cljs.core.Symbol(null,"meta","meta",-1154898805,null)], null);
});

crate.binding.Computed.cljs$lang$type = true;

crate.binding.Computed.cljs$lang$ctorStr = "crate.binding/Computed";

crate.binding.Computed.cljs$lang$ctorPrWriter = (function (this__7399__auto__,writer__7400__auto__,opt__7401__auto__){
return cljs.core._write.call(null,writer__7400__auto__,"crate.binding/Computed");
});

crate.binding.__GT_Computed = (function crate$binding$__GT_Computed(atms,value,func,watches,key,meta){
return (new crate.binding.Computed(atms,value,func,watches,key,meta));
});

crate.binding.computed = (function crate$binding$computed(atms,func){
var k = cljs.core.gensym.call(null,"computed");
var neue = (new crate.binding.Computed(cljs.core.PersistentVector.EMPTY,null,func,null,k,null));
crate.binding._compute.call(null,neue);

var seq__12409_12413 = cljs.core.seq.call(null,atms);
var chunk__12410_12414 = null;
var count__12411_12415 = (0);
var i__12412_12416 = (0);
while(true){
if((i__12412_12416 < count__12411_12415)){
var atm_12417 = cljs.core._nth.call(null,chunk__12410_12414,i__12412_12416);
crate.binding._depend.call(null,neue,atm_12417);

var G__12418 = seq__12409_12413;
var G__12419 = chunk__12410_12414;
var G__12420 = count__12411_12415;
var G__12421 = (i__12412_12416 + (1));
seq__12409_12413 = G__12418;
chunk__12410_12414 = G__12419;
count__12411_12415 = G__12420;
i__12412_12416 = G__12421;
continue;
} else {
var temp__4657__auto___12422 = cljs.core.seq.call(null,seq__12409_12413);
if(temp__4657__auto___12422){
var seq__12409_12423__$1 = temp__4657__auto___12422;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__12409_12423__$1)){
var c__7604__auto___12424 = cljs.core.chunk_first.call(null,seq__12409_12423__$1);
var G__12425 = cljs.core.chunk_rest.call(null,seq__12409_12423__$1);
var G__12426 = c__7604__auto___12424;
var G__12427 = cljs.core.count.call(null,c__7604__auto___12424);
var G__12428 = (0);
seq__12409_12413 = G__12425;
chunk__12410_12414 = G__12426;
count__12411_12415 = G__12427;
i__12412_12416 = G__12428;
continue;
} else {
var atm_12429 = cljs.core.first.call(null,seq__12409_12423__$1);
crate.binding._depend.call(null,neue,atm_12429);

var G__12430 = cljs.core.next.call(null,seq__12409_12423__$1);
var G__12431 = null;
var G__12432 = (0);
var G__12433 = (0);
seq__12409_12413 = G__12430;
chunk__12410_12414 = G__12431;
count__12411_12415 = G__12432;
i__12412_12416 = G__12433;
continue;
}
} else {
}
}
break;
}

return neue;
});
crate.binding.compute = (function crate$binding$compute(compu){
return crate.binding._compute.call(null,compu);
});
crate.binding.depend_on = (function crate$binding$depend_on(compu,atm){
return crate.binding._depend.call(null,compu,atm);
});
crate.binding.notify = (function crate$binding$notify(w,o,v){
return cljs.core._notify_watches.call(null,w,o,v);
});

/**
 * @interface
 */
crate.binding.bindable_coll = function(){};


/**
 * @interface
 */
crate.binding.bindable = function(){};

/**
 * get the current value of this binding
 */
crate.binding._value = (function crate$binding$_value(this$){
if((!((this$ == null))) && (!((this$.crate$binding$bindable$_value$arity$1 == null)))){
return this$.crate$binding$bindable$_value$arity$1(this$);
} else {
var x__7456__auto__ = (((this$ == null))?null:this$);
var m__7457__auto__ = (crate.binding._value[goog.typeOf(x__7456__auto__)]);
if(!((m__7457__auto__ == null))){
return m__7457__auto__.call(null,this$);
} else {
var m__7457__auto____$1 = (crate.binding._value["_"]);
if(!((m__7457__auto____$1 == null))){
return m__7457__auto____$1.call(null,this$);
} else {
throw cljs.core.missing_protocol.call(null,"bindable.-value",this$);
}
}
}
});

/**
 * On change of this binding execute func
 */
crate.binding._on_change = (function crate$binding$_on_change(this$,func){
if((!((this$ == null))) && (!((this$.crate$binding$bindable$_on_change$arity$2 == null)))){
return this$.crate$binding$bindable$_on_change$arity$2(this$,func);
} else {
var x__7456__auto__ = (((this$ == null))?null:this$);
var m__7457__auto__ = (crate.binding._on_change[goog.typeOf(x__7456__auto__)]);
if(!((m__7457__auto__ == null))){
return m__7457__auto__.call(null,this$,func);
} else {
var m__7457__auto____$1 = (crate.binding._on_change["_"]);
if(!((m__7457__auto____$1 == null))){
return m__7457__auto____$1.call(null,this$,func);
} else {
throw cljs.core.missing_protocol.call(null,"bindable.-on-change",this$);
}
}
}
});


/**
* @constructor
 * @implements {crate.binding.bindable}
*/
crate.binding.atom_binding = (function (atm,value_func){
this.atm = atm;
this.value_func = value_func;
})
crate.binding.atom_binding.prototype.crate$binding$bindable$ = true;

crate.binding.atom_binding.prototype.crate$binding$bindable$_value$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.value_func.call(null,cljs.core.deref.call(null,self__.atm));
});

crate.binding.atom_binding.prototype.crate$binding$bindable$_on_change$arity$2 = (function (this$,func){
var self__ = this;
var this$__$1 = this;
return cljs.core.add_watch.call(null,self__.atm,cljs.core.gensym.call(null,"atom-binding"),((function (this$__$1){
return (function (){
return func.call(null,crate.binding._value.call(null,this$__$1));
});})(this$__$1))
);
});

crate.binding.atom_binding.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"atm","atm",-1963551835,null),new cljs.core.Symbol(null,"value-func","value-func",2077951825,null)], null);
});

crate.binding.atom_binding.cljs$lang$type = true;

crate.binding.atom_binding.cljs$lang$ctorStr = "crate.binding/atom-binding";

crate.binding.atom_binding.cljs$lang$ctorPrWriter = (function (this__7399__auto__,writer__7400__auto__,opt__7401__auto__){
return cljs.core._write.call(null,writer__7400__auto__,"crate.binding/atom-binding");
});

crate.binding.__GT_atom_binding = (function crate$binding$__GT_atom_binding(atm,value_func){
return (new crate.binding.atom_binding(atm,value_func));
});


/**
* @constructor
 * @implements {cljs.core.IWatchable}
*/
crate.binding.notifier = (function (watches){
this.watches = watches;
this.cljs$lang$protocol_mask$partition1$ = 2;
this.cljs$lang$protocol_mask$partition0$ = 0;
})
crate.binding.notifier.prototype.cljs$core$IWatchable$_notify_watches$arity$3 = (function (this$,oldval,newval){
var self__ = this;
var this$__$1 = this;
var seq__12434 = cljs.core.seq.call(null,self__.watches);
var chunk__12435 = null;
var count__12436 = (0);
var i__12437 = (0);
while(true){
if((i__12437 < count__12436)){
var vec__12438 = cljs.core._nth.call(null,chunk__12435,i__12437);
var key = cljs.core.nth.call(null,vec__12438,(0),null);
var f = cljs.core.nth.call(null,vec__12438,(1),null);
f.call(null,key,this$__$1,oldval,newval);

var G__12444 = seq__12434;
var G__12445 = chunk__12435;
var G__12446 = count__12436;
var G__12447 = (i__12437 + (1));
seq__12434 = G__12444;
chunk__12435 = G__12445;
count__12436 = G__12446;
i__12437 = G__12447;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__12434);
if(temp__4657__auto__){
var seq__12434__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__12434__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__12434__$1);
var G__12448 = cljs.core.chunk_rest.call(null,seq__12434__$1);
var G__12449 = c__7604__auto__;
var G__12450 = cljs.core.count.call(null,c__7604__auto__);
var G__12451 = (0);
seq__12434 = G__12448;
chunk__12435 = G__12449;
count__12436 = G__12450;
i__12437 = G__12451;
continue;
} else {
var vec__12441 = cljs.core.first.call(null,seq__12434__$1);
var key = cljs.core.nth.call(null,vec__12441,(0),null);
var f = cljs.core.nth.call(null,vec__12441,(1),null);
f.call(null,key,this$__$1,oldval,newval);

var G__12452 = cljs.core.next.call(null,seq__12434__$1);
var G__12453 = null;
var G__12454 = (0);
var G__12455 = (0);
seq__12434 = G__12452;
chunk__12435 = G__12453;
count__12436 = G__12454;
i__12437 = G__12455;
continue;
}
} else {
return null;
}
}
break;
}
});

crate.binding.notifier.prototype.cljs$core$IWatchable$_add_watch$arity$3 = (function (this$,key,f){
var self__ = this;
var this$__$1 = this;
return this$__$1.watches = cljs.core.assoc.call(null,self__.watches,key,f);
});

crate.binding.notifier.prototype.cljs$core$IWatchable$_remove_watch$arity$2 = (function (this$,key){
var self__ = this;
var this$__$1 = this;
return this$__$1.watches = cljs.core.dissoc.call(null,self__.watches,key);
});

crate.binding.notifier.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"watches","watches",1367433992,null)], null);
});

crate.binding.notifier.cljs$lang$type = true;

crate.binding.notifier.cljs$lang$ctorStr = "crate.binding/notifier";

crate.binding.notifier.cljs$lang$ctorPrWriter = (function (this__7399__auto__,writer__7400__auto__,opt__7401__auto__){
return cljs.core._write.call(null,writer__7400__auto__,"crate.binding/notifier");
});

crate.binding.__GT_notifier = (function crate$binding$__GT_notifier(watches){
return (new crate.binding.notifier(watches));
});


/**
* @constructor
 * @implements {crate.binding.bindable}
 * @implements {crate.binding.bindable_coll}
*/
crate.binding.bound_collection = (function (atm,notif,opts,stuff){
this.atm = atm;
this.notif = notif;
this.opts = opts;
this.stuff = stuff;
})
crate.binding.bound_collection.prototype.crate$binding$bindable_coll$ = true;

crate.binding.bound_collection.prototype.crate$binding$bindable$ = true;

crate.binding.bound_collection.prototype.crate$binding$bindable$_value$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return cljs.core.map.call(null,new cljs.core.Keyword(null,"elem","elem",618631056),cljs.core.vals.call(null,this$__$1.stuff));
});

crate.binding.bound_collection.prototype.crate$binding$bindable$_on_change$arity$2 = (function (this$,func){
var self__ = this;
var this$__$1 = this;
return cljs.core.add_watch.call(null,self__.notif,cljs.core.gensym.call(null,"bound-coll"),((function (this$__$1){
return (function (_,___$1,___$2,p__12456){
var vec__12457 = p__12456;
var event = cljs.core.nth.call(null,vec__12457,(0),null);
var el = cljs.core.nth.call(null,vec__12457,(1),null);
var v = cljs.core.nth.call(null,vec__12457,(2),null);
return func.call(null,event,el,v);
});})(this$__$1))
);
});

crate.binding.bound_collection.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"atm","atm",-1963551835,null),new cljs.core.Symbol(null,"notif","notif",-1551848296,null),new cljs.core.Symbol(null,"opts","opts",1795607228,null),new cljs.core.Symbol(null,"stuff","stuff",-411032116,null)], null);
});

crate.binding.bound_collection.cljs$lang$type = true;

crate.binding.bound_collection.cljs$lang$ctorStr = "crate.binding/bound-collection";

crate.binding.bound_collection.cljs$lang$ctorPrWriter = (function (this__7399__auto__,writer__7400__auto__,opt__7401__auto__){
return cljs.core._write.call(null,writer__7400__auto__,"crate.binding/bound-collection");
});

crate.binding.__GT_bound_collection = (function crate$binding$__GT_bound_collection(atm,notif,opts,stuff){
return (new crate.binding.bound_collection(atm,notif,opts,stuff));
});

crate.binding.opt = (function crate$binding$opt(bc,k){
return bc.opts.call(null,k);
});
crate.binding.bc_add = (function crate$binding$bc_add(bc,path,key){
var sa = crate.binding.subatom.call(null,bc.atm,path);
var elem = crate.binding.opt.call(null,bc,new cljs.core.Keyword(null,"as","as",1148689641)).call(null,sa);
bc.stuff = cljs.core.assoc.call(null,bc.stuff,key,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"elem","elem",618631056),elem,new cljs.core.Keyword(null,"subatom","subatom",-95454370),sa], null));

return crate.binding.notify.call(null,bc.notif,null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"add","add",235287739),elem,cljs.core.deref.call(null,sa)], null));
});
crate.binding.bc_remove = (function crate$binding$bc_remove(bc,key){
var notif = bc.notif;
var prev = bc.stuff.call(null,key);
bc.stuff = cljs.core.dissoc.call(null,bc.stuff,key);

crate.binding.notify.call(null,bc.notif,null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"remove","remove",-131428414),new cljs.core.Keyword(null,"elem","elem",618631056).cljs$core$IFn$_invoke$arity$1(prev),null], null));

return crate.binding.sub_destroy_BANG_.call(null,new cljs.core.Keyword(null,"subatom","subatom",-95454370).cljs$core$IFn$_invoke$arity$1(prev));
});
crate.binding.__GT_indexed = (function crate$binding$__GT_indexed(coll){
if(cljs.core.map_QMARK_.call(null,coll)){
return cljs.core.seq.call(null,coll);
} else {
if(cljs.core.set_QMARK_.call(null,coll)){
return cljs.core.map.call(null,cljs.core.juxt.call(null,cljs.core.identity,cljs.core.identity),coll);
} else {
return cljs.core.map_indexed.call(null,cljs.core.vector,coll);

}
}
});
crate.binding.__GT_keyed = (function crate$binding$__GT_keyed(coll,keyfn){
return cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,cljs.core.map.call(null,keyfn,crate.binding.__GT_indexed.call(null,coll)));
});
crate.binding.__GT_path = (function crate$binding$__GT_path(var_args){
var args__7875__auto__ = [];
var len__7868__auto___12462 = arguments.length;
var i__7869__auto___12463 = (0);
while(true){
if((i__7869__auto___12463 < len__7868__auto___12462)){
args__7875__auto__.push((arguments[i__7869__auto___12463]));

var G__12464 = (i__7869__auto___12463 + (1));
i__7869__auto___12463 = G__12464;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((1) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((1)),(0),null)):null);
return crate.binding.__GT_path.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7876__auto__);
});

crate.binding.__GT_path.cljs$core$IFn$_invoke$arity$variadic = (function (bc,segs){
return cljs.core.concat.call(null,(function (){var or__6793__auto__ = crate.binding.opt.call(null,bc,new cljs.core.Keyword(null,"path","path",-188191168));
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return cljs.core.PersistentVector.EMPTY;
}
})(),segs);
});

crate.binding.__GT_path.cljs$lang$maxFixedArity = (1);

crate.binding.__GT_path.cljs$lang$applyTo = (function (seq12460){
var G__12461 = cljs.core.first.call(null,seq12460);
var seq12460__$1 = cljs.core.next.call(null,seq12460);
return crate.binding.__GT_path.cljs$core$IFn$_invoke$arity$variadic(G__12461,seq12460__$1);
});

crate.binding.bc_compare = (function crate$binding$bc_compare(bc,neue){
var prev = bc.stuff;
var pset = cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,cljs.core.keys.call(null,prev));
var nset = crate.binding.__GT_keyed.call(null,neue,crate.binding.opt.call(null,bc,new cljs.core.Keyword(null,"keyfn","keyfn",780060332)));
var added = cljs.core.into.call(null,cljs.core.sorted_set.call(null),clojure.set.difference.call(null,nset,pset));
var removed = cljs.core.into.call(null,cljs.core.sorted_set.call(null),clojure.set.difference.call(null,pset,nset));
var seq__12473_12481 = cljs.core.seq.call(null,added);
var chunk__12474_12482 = null;
var count__12475_12483 = (0);
var i__12476_12484 = (0);
while(true){
if((i__12476_12484 < count__12475_12483)){
var a_12485 = cljs.core._nth.call(null,chunk__12474_12482,i__12476_12484);
crate.binding.bc_add.call(null,bc,a_12485,a_12485);

var G__12486 = seq__12473_12481;
var G__12487 = chunk__12474_12482;
var G__12488 = count__12475_12483;
var G__12489 = (i__12476_12484 + (1));
seq__12473_12481 = G__12486;
chunk__12474_12482 = G__12487;
count__12475_12483 = G__12488;
i__12476_12484 = G__12489;
continue;
} else {
var temp__4657__auto___12490 = cljs.core.seq.call(null,seq__12473_12481);
if(temp__4657__auto___12490){
var seq__12473_12491__$1 = temp__4657__auto___12490;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__12473_12491__$1)){
var c__7604__auto___12492 = cljs.core.chunk_first.call(null,seq__12473_12491__$1);
var G__12493 = cljs.core.chunk_rest.call(null,seq__12473_12491__$1);
var G__12494 = c__7604__auto___12492;
var G__12495 = cljs.core.count.call(null,c__7604__auto___12492);
var G__12496 = (0);
seq__12473_12481 = G__12493;
chunk__12474_12482 = G__12494;
count__12475_12483 = G__12495;
i__12476_12484 = G__12496;
continue;
} else {
var a_12497 = cljs.core.first.call(null,seq__12473_12491__$1);
crate.binding.bc_add.call(null,bc,a_12497,a_12497);

var G__12498 = cljs.core.next.call(null,seq__12473_12491__$1);
var G__12499 = null;
var G__12500 = (0);
var G__12501 = (0);
seq__12473_12481 = G__12498;
chunk__12474_12482 = G__12499;
count__12475_12483 = G__12500;
i__12476_12484 = G__12501;
continue;
}
} else {
}
}
break;
}

var seq__12477 = cljs.core.seq.call(null,removed);
var chunk__12478 = null;
var count__12479 = (0);
var i__12480 = (0);
while(true){
if((i__12480 < count__12479)){
var r = cljs.core._nth.call(null,chunk__12478,i__12480);
crate.binding.bc_remove.call(null,bc,r);

var G__12502 = seq__12477;
var G__12503 = chunk__12478;
var G__12504 = count__12479;
var G__12505 = (i__12480 + (1));
seq__12477 = G__12502;
chunk__12478 = G__12503;
count__12479 = G__12504;
i__12480 = G__12505;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__12477);
if(temp__4657__auto__){
var seq__12477__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__12477__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__12477__$1);
var G__12506 = cljs.core.chunk_rest.call(null,seq__12477__$1);
var G__12507 = c__7604__auto__;
var G__12508 = cljs.core.count.call(null,c__7604__auto__);
var G__12509 = (0);
seq__12477 = G__12506;
chunk__12478 = G__12507;
count__12479 = G__12508;
i__12480 = G__12509;
continue;
} else {
var r = cljs.core.first.call(null,seq__12477__$1);
crate.binding.bc_remove.call(null,bc,r);

var G__12510 = cljs.core.next.call(null,seq__12477__$1);
var G__12511 = null;
var G__12512 = (0);
var G__12513 = (0);
seq__12477 = G__12510;
chunk__12478 = G__12511;
count__12479 = G__12512;
i__12480 = G__12513;
continue;
}
} else {
return null;
}
}
break;
}
});
crate.binding.bound_coll = (function crate$binding$bound_coll(var_args){
var args__7875__auto__ = [];
var len__7868__auto___12523 = arguments.length;
var i__7869__auto___12524 = (0);
while(true){
if((i__7869__auto___12524 < len__7868__auto___12523)){
args__7875__auto__.push((arguments[i__7869__auto___12524]));

var G__12525 = (i__7869__auto___12524 + (1));
i__7869__auto___12524 = G__12525;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((1) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((1)),(0),null)):null);
return crate.binding.bound_coll.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7876__auto__);
});

crate.binding.bound_coll.cljs$core$IFn$_invoke$arity$variadic = (function (atm,p__12516){
var vec__12517 = p__12516;
var path = cljs.core.nth.call(null,vec__12517,(0),null);
var opts = cljs.core.nth.call(null,vec__12517,(1),null);
var vec__12520 = (cljs.core.truth_(opts)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [path,opts], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,path], null));
var path__$1 = cljs.core.nth.call(null,vec__12520,(0),null);
var opts__$1 = cljs.core.nth.call(null,vec__12520,(1),null);
var atm__$1 = ((cljs.core.not.call(null,path__$1))?atm:crate.binding.subatom.call(null,atm,path__$1));
var opts__$2 = cljs.core.assoc.call(null,opts__$1,new cljs.core.Keyword(null,"path","path",-188191168),path__$1);
var opts__$3 = ((cljs.core.not.call(null,new cljs.core.Keyword(null,"keyfn","keyfn",780060332).cljs$core$IFn$_invoke$arity$1(opts__$2)))?cljs.core.assoc.call(null,opts__$2,new cljs.core.Keyword(null,"keyfn","keyfn",780060332),cljs.core.first):cljs.core.assoc.call(null,opts__$2,new cljs.core.Keyword(null,"keyfn","keyfn",780060332),cljs.core.comp.call(null,new cljs.core.Keyword(null,"keyfn","keyfn",780060332).cljs$core$IFn$_invoke$arity$1(opts__$2),cljs.core.second)));
var bc = (new crate.binding.bound_collection(atm__$1,(new crate.binding.notifier(null)),opts__$3,cljs.core.sorted_map.call(null)));
cljs.core.add_watch.call(null,atm__$1,cljs.core.gensym.call(null,"bound-coll"),((function (vec__12520,path__$1,opts__$1,atm__$1,opts__$2,opts__$3,bc,vec__12517,path,opts){
return (function (_,___$1,___$2,neue){
return crate.binding.bc_compare.call(null,bc,neue);
});})(vec__12520,path__$1,opts__$1,atm__$1,opts__$2,opts__$3,bc,vec__12517,path,opts))
);

crate.binding.bc_compare.call(null,bc,cljs.core.deref.call(null,atm__$1));

return bc;
});

crate.binding.bound_coll.cljs$lang$maxFixedArity = (1);

crate.binding.bound_coll.cljs$lang$applyTo = (function (seq12514){
var G__12515 = cljs.core.first.call(null,seq12514);
var seq12514__$1 = cljs.core.next.call(null,seq12514);
return crate.binding.bound_coll.cljs$core$IFn$_invoke$arity$variadic(G__12515,seq12514__$1);
});

crate.binding.map_bound = (function crate$binding$map_bound(var_args){
var args__7875__auto__ = [];
var len__7868__auto___12533 = arguments.length;
var i__7869__auto___12534 = (0);
while(true){
if((i__7869__auto___12534 < len__7868__auto___12533)){
args__7875__auto__.push((arguments[i__7869__auto___12534]));

var G__12535 = (i__7869__auto___12534 + (1));
i__7869__auto___12534 = G__12535;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((2) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((2)),(0),null)):null);
return crate.binding.map_bound.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__7876__auto__);
});

crate.binding.map_bound.cljs$core$IFn$_invoke$arity$variadic = (function (as,atm,p__12529){
var vec__12530 = p__12529;
var opts = cljs.core.nth.call(null,vec__12530,(0),null);
var opts__$1 = cljs.core.assoc.call(null,opts,new cljs.core.Keyword(null,"as","as",1148689641),as);
var atm__$1 = ((cljs.core.not.call(null,new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(opts__$1)))?atm:crate.binding.subatom.call(null,atm,new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(opts__$1)));
var opts__$2 = ((cljs.core.not.call(null,new cljs.core.Keyword(null,"keyfn","keyfn",780060332).cljs$core$IFn$_invoke$arity$1(opts__$1)))?cljs.core.assoc.call(null,opts__$1,new cljs.core.Keyword(null,"keyfn","keyfn",780060332),cljs.core.first):cljs.core.assoc.call(null,opts__$1,new cljs.core.Keyword(null,"keyfn","keyfn",780060332),cljs.core.comp.call(null,new cljs.core.Keyword(null,"keyfn","keyfn",780060332).cljs$core$IFn$_invoke$arity$1(opts__$1),cljs.core.second)));
var bc = (new crate.binding.bound_collection(atm__$1,(new crate.binding.notifier(null)),opts__$2,cljs.core.sorted_map.call(null)));
cljs.core.add_watch.call(null,atm__$1,cljs.core.gensym.call(null,"bound-coll"),((function (opts__$1,atm__$1,opts__$2,bc,vec__12530,opts){
return (function (_,___$1,___$2,neue){
return crate.binding.bc_compare.call(null,bc,neue);
});})(opts__$1,atm__$1,opts__$2,bc,vec__12530,opts))
);

crate.binding.bc_compare.call(null,bc,cljs.core.deref.call(null,atm__$1));

return bc;
});

crate.binding.map_bound.cljs$lang$maxFixedArity = (2);

crate.binding.map_bound.cljs$lang$applyTo = (function (seq12526){
var G__12527 = cljs.core.first.call(null,seq12526);
var seq12526__$1 = cljs.core.next.call(null,seq12526);
var G__12528 = cljs.core.first.call(null,seq12526__$1);
var seq12526__$2 = cljs.core.next.call(null,seq12526__$1);
return crate.binding.map_bound.cljs$core$IFn$_invoke$arity$variadic(G__12527,G__12528,seq12526__$2);
});

crate.binding.binding_QMARK_ = (function crate$binding$binding_QMARK_(b){
if(!((b == null))){
if((false) || (b.crate$binding$bindable$)){
return true;
} else {
if((!b.cljs$lang$protocol_mask$partition$)){
return cljs.core.native_satisfies_QMARK_.call(null,crate.binding.bindable,b);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_.call(null,crate.binding.bindable,b);
}
});
crate.binding.binding_coll_QMARK_ = (function crate$binding$binding_coll_QMARK_(b){
if(!((b == null))){
if((false) || (b.crate$binding$bindable_coll$)){
return true;
} else {
if((!b.cljs$lang$protocol_mask$partition$)){
return cljs.core.native_satisfies_QMARK_.call(null,crate.binding.bindable_coll,b);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_.call(null,crate.binding.bindable_coll,b);
}
});
crate.binding.deref_QMARK_ = (function crate$binding$deref_QMARK_(atm){
if(!((atm == null))){
if(((atm.cljs$lang$protocol_mask$partition0$ & (32768))) || (atm.cljs$core$IDeref$)){
return true;
} else {
if((!atm.cljs$lang$protocol_mask$partition0$)){
return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.IDeref,atm);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.IDeref,atm);
}
});
crate.binding.value = (function crate$binding$value(b){
return crate.binding._value.call(null,b);
});
crate.binding.index = (function crate$binding$index(sub_atom){
return cljs.core.last.call(null,sub_atom.path);
});
crate.binding.on_change = (function crate$binding$on_change(b,func){
return crate.binding._on_change.call(null,b,func);
});
crate.binding.bound = (function crate$binding$bound(var_args){
var args__7875__auto__ = [];
var len__7868__auto___12548 = arguments.length;
var i__7869__auto___12549 = (0);
while(true){
if((i__7869__auto___12549 < len__7868__auto___12548)){
args__7875__auto__.push((arguments[i__7869__auto___12549]));

var G__12550 = (i__7869__auto___12549 + (1));
i__7869__auto___12549 = G__12550;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((1) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((1)),(0),null)):null);
return crate.binding.bound.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7876__auto__);
});

crate.binding.bound.cljs$core$IFn$_invoke$arity$variadic = (function (atm,p__12544){
var vec__12545 = p__12544;
var func = cljs.core.nth.call(null,vec__12545,(0),null);
var func__$1 = (function (){var or__6793__auto__ = func;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return cljs.core.identity;
}
})();
return (new crate.binding.atom_binding(atm,func__$1));
});

crate.binding.bound.cljs$lang$maxFixedArity = (1);

crate.binding.bound.cljs$lang$applyTo = (function (seq12542){
var G__12543 = cljs.core.first.call(null,seq12542);
var seq12542__$1 = cljs.core.next.call(null,seq12542);
return crate.binding.bound.cljs$core$IFn$_invoke$arity$variadic(G__12543,seq12542__$1);
});

