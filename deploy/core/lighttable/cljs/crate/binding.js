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
var seq__12344 = cljs.core.seq.call(null,self__.watches);
var chunk__12345 = null;
var count__12346 = (0);
var i__12347 = (0);
while(true){
if((i__12347 < count__12346)){
var vec__12348 = cljs.core._nth.call(null,chunk__12345,i__12347);
var key__$1 = cljs.core.nth.call(null,vec__12348,(0),null);
var f = cljs.core.nth.call(null,vec__12348,(1),null);
f.call(null,key__$1,this$__$1,oldval,newval);

var G__12354 = seq__12344;
var G__12355 = chunk__12345;
var G__12356 = count__12346;
var G__12357 = (i__12347 + (1));
seq__12344 = G__12354;
chunk__12345 = G__12355;
count__12346 = G__12356;
i__12347 = G__12357;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__12344);
if(temp__4657__auto__){
var seq__12344__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__12344__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__12344__$1);
var G__12358 = cljs.core.chunk_rest.call(null,seq__12344__$1);
var G__12359 = c__7604__auto__;
var G__12360 = cljs.core.count.call(null,c__7604__auto__);
var G__12361 = (0);
seq__12344 = G__12358;
chunk__12345 = G__12359;
count__12346 = G__12360;
i__12347 = G__12361;
continue;
} else {
var vec__12351 = cljs.core.first.call(null,seq__12344__$1);
var key__$1 = cljs.core.nth.call(null,vec__12351,(0),null);
var f = cljs.core.nth.call(null,vec__12351,(1),null);
f.call(null,key__$1,this$__$1,oldval,newval);

var G__12362 = cljs.core.next.call(null,seq__12344__$1);
var G__12363 = null;
var G__12364 = (0);
var G__12365 = (0);
seq__12344 = G__12362;
chunk__12345 = G__12363;
count__12346 = G__12364;
i__12347 = G__12365;
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
var vec__12369 = (((atm instanceof crate.binding.SubAtom))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [atm.atm,cljs.core.concat.call(null,atm.path,path__$1)], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [atm,path__$1], null));
var atm__$1 = cljs.core.nth.call(null,vec__12369,(0),null);
var path__$2 = cljs.core.nth.call(null,vec__12369,(1),null);
var k = cljs.core.gensym.call(null,"subatom");
var sa = (new crate.binding.SubAtom(atm__$1,path__$2,cljs.core.hash.call(null,cljs.core.get_in.call(null,cljs.core.deref.call(null,atm__$1),path__$2)),null,k));
cljs.core.add_watch.call(null,atm__$1,k,((function (path__$1,vec__12369,atm__$1,path__$2,k,sa){
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
});})(path__$1,vec__12369,atm__$1,path__$2,k,sa))
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
var args12372 = [];
var len__7868__auto___12381 = arguments.length;
var i__7869__auto___12382 = (0);
while(true){
if((i__7869__auto___12382 < len__7868__auto___12381)){
args12372.push((arguments[i__7869__auto___12382]));

var G__12383 = (i__7869__auto___12382 + (1));
i__7869__auto___12382 = G__12383;
continue;
} else {
}
break;
}

var G__12380 = args12372.length;
switch (G__12380) {
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
var argseq__7887__auto__ = (new cljs.core.IndexedSeq(args12372.slice((5)),(0),null));
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

crate.binding.sub_swap_BANG_.cljs$lang$applyTo = (function (seq12373){
var G__12374 = cljs.core.first.call(null,seq12373);
var seq12373__$1 = cljs.core.next.call(null,seq12373);
var G__12375 = cljs.core.first.call(null,seq12373__$1);
var seq12373__$2 = cljs.core.next.call(null,seq12373__$1);
var G__12376 = cljs.core.first.call(null,seq12373__$2);
var seq12373__$3 = cljs.core.next.call(null,seq12373__$2);
var G__12377 = cljs.core.first.call(null,seq12373__$3);
var seq12373__$4 = cljs.core.next.call(null,seq12373__$3);
var G__12378 = cljs.core.first.call(null,seq12373__$4);
var seq12373__$5 = cljs.core.next.call(null,seq12373__$4);
return crate.binding.sub_swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__12374,G__12375,G__12376,G__12377,G__12378,seq12373__$5);
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
var seq__12385 = cljs.core.seq.call(null,self__.watches);
var chunk__12386 = null;
var count__12387 = (0);
var i__12388 = (0);
while(true){
if((i__12388 < count__12387)){
var vec__12389 = cljs.core._nth.call(null,chunk__12386,i__12388);
var key__$1 = cljs.core.nth.call(null,vec__12389,(0),null);
var f = cljs.core.nth.call(null,vec__12389,(1),null);
f.call(null,key__$1,this$__$1,oldval,newval);

var G__12395 = seq__12385;
var G__12396 = chunk__12386;
var G__12397 = count__12387;
var G__12398 = (i__12388 + (1));
seq__12385 = G__12395;
chunk__12386 = G__12396;
count__12387 = G__12397;
i__12388 = G__12398;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__12385);
if(temp__4657__auto__){
var seq__12385__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__12385__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__12385__$1);
var G__12399 = cljs.core.chunk_rest.call(null,seq__12385__$1);
var G__12400 = c__7604__auto__;
var G__12401 = cljs.core.count.call(null,c__7604__auto__);
var G__12402 = (0);
seq__12385 = G__12399;
chunk__12386 = G__12400;
count__12387 = G__12401;
i__12388 = G__12402;
continue;
} else {
var vec__12392 = cljs.core.first.call(null,seq__12385__$1);
var key__$1 = cljs.core.nth.call(null,vec__12392,(0),null);
var f = cljs.core.nth.call(null,vec__12392,(1),null);
f.call(null,key__$1,this$__$1,oldval,newval);

var G__12403 = cljs.core.next.call(null,seq__12385__$1);
var G__12404 = null;
var G__12405 = (0);
var G__12406 = (0);
seq__12385 = G__12403;
chunk__12386 = G__12404;
count__12387 = G__12405;
i__12388 = G__12406;
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

var seq__12411_12415 = cljs.core.seq.call(null,atms);
var chunk__12412_12416 = null;
var count__12413_12417 = (0);
var i__12414_12418 = (0);
while(true){
if((i__12414_12418 < count__12413_12417)){
var atm_12419 = cljs.core._nth.call(null,chunk__12412_12416,i__12414_12418);
crate.binding._depend.call(null,neue,atm_12419);

var G__12420 = seq__12411_12415;
var G__12421 = chunk__12412_12416;
var G__12422 = count__12413_12417;
var G__12423 = (i__12414_12418 + (1));
seq__12411_12415 = G__12420;
chunk__12412_12416 = G__12421;
count__12413_12417 = G__12422;
i__12414_12418 = G__12423;
continue;
} else {
var temp__4657__auto___12424 = cljs.core.seq.call(null,seq__12411_12415);
if(temp__4657__auto___12424){
var seq__12411_12425__$1 = temp__4657__auto___12424;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__12411_12425__$1)){
var c__7604__auto___12426 = cljs.core.chunk_first.call(null,seq__12411_12425__$1);
var G__12427 = cljs.core.chunk_rest.call(null,seq__12411_12425__$1);
var G__12428 = c__7604__auto___12426;
var G__12429 = cljs.core.count.call(null,c__7604__auto___12426);
var G__12430 = (0);
seq__12411_12415 = G__12427;
chunk__12412_12416 = G__12428;
count__12413_12417 = G__12429;
i__12414_12418 = G__12430;
continue;
} else {
var atm_12431 = cljs.core.first.call(null,seq__12411_12425__$1);
crate.binding._depend.call(null,neue,atm_12431);

var G__12432 = cljs.core.next.call(null,seq__12411_12425__$1);
var G__12433 = null;
var G__12434 = (0);
var G__12435 = (0);
seq__12411_12415 = G__12432;
chunk__12412_12416 = G__12433;
count__12413_12417 = G__12434;
i__12414_12418 = G__12435;
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
var seq__12436 = cljs.core.seq.call(null,self__.watches);
var chunk__12437 = null;
var count__12438 = (0);
var i__12439 = (0);
while(true){
if((i__12439 < count__12438)){
var vec__12440 = cljs.core._nth.call(null,chunk__12437,i__12439);
var key = cljs.core.nth.call(null,vec__12440,(0),null);
var f = cljs.core.nth.call(null,vec__12440,(1),null);
f.call(null,key,this$__$1,oldval,newval);

var G__12446 = seq__12436;
var G__12447 = chunk__12437;
var G__12448 = count__12438;
var G__12449 = (i__12439 + (1));
seq__12436 = G__12446;
chunk__12437 = G__12447;
count__12438 = G__12448;
i__12439 = G__12449;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__12436);
if(temp__4657__auto__){
var seq__12436__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__12436__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__12436__$1);
var G__12450 = cljs.core.chunk_rest.call(null,seq__12436__$1);
var G__12451 = c__7604__auto__;
var G__12452 = cljs.core.count.call(null,c__7604__auto__);
var G__12453 = (0);
seq__12436 = G__12450;
chunk__12437 = G__12451;
count__12438 = G__12452;
i__12439 = G__12453;
continue;
} else {
var vec__12443 = cljs.core.first.call(null,seq__12436__$1);
var key = cljs.core.nth.call(null,vec__12443,(0),null);
var f = cljs.core.nth.call(null,vec__12443,(1),null);
f.call(null,key,this$__$1,oldval,newval);

var G__12454 = cljs.core.next.call(null,seq__12436__$1);
var G__12455 = null;
var G__12456 = (0);
var G__12457 = (0);
seq__12436 = G__12454;
chunk__12437 = G__12455;
count__12438 = G__12456;
i__12439 = G__12457;
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
return (function (_,___$1,___$2,p__12458){
var vec__12459 = p__12458;
var event = cljs.core.nth.call(null,vec__12459,(0),null);
var el = cljs.core.nth.call(null,vec__12459,(1),null);
var v = cljs.core.nth.call(null,vec__12459,(2),null);
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
var len__7868__auto___12464 = arguments.length;
var i__7869__auto___12465 = (0);
while(true){
if((i__7869__auto___12465 < len__7868__auto___12464)){
args__7875__auto__.push((arguments[i__7869__auto___12465]));

var G__12466 = (i__7869__auto___12465 + (1));
i__7869__auto___12465 = G__12466;
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

crate.binding.__GT_path.cljs$lang$applyTo = (function (seq12462){
var G__12463 = cljs.core.first.call(null,seq12462);
var seq12462__$1 = cljs.core.next.call(null,seq12462);
return crate.binding.__GT_path.cljs$core$IFn$_invoke$arity$variadic(G__12463,seq12462__$1);
});

crate.binding.bc_compare = (function crate$binding$bc_compare(bc,neue){
var prev = bc.stuff;
var pset = cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,cljs.core.keys.call(null,prev));
var nset = crate.binding.__GT_keyed.call(null,neue,crate.binding.opt.call(null,bc,new cljs.core.Keyword(null,"keyfn","keyfn",780060332)));
var added = cljs.core.into.call(null,cljs.core.sorted_set.call(null),clojure.set.difference.call(null,nset,pset));
var removed = cljs.core.into.call(null,cljs.core.sorted_set.call(null),clojure.set.difference.call(null,pset,nset));
var seq__12475_12483 = cljs.core.seq.call(null,added);
var chunk__12476_12484 = null;
var count__12477_12485 = (0);
var i__12478_12486 = (0);
while(true){
if((i__12478_12486 < count__12477_12485)){
var a_12487 = cljs.core._nth.call(null,chunk__12476_12484,i__12478_12486);
crate.binding.bc_add.call(null,bc,a_12487,a_12487);

var G__12488 = seq__12475_12483;
var G__12489 = chunk__12476_12484;
var G__12490 = count__12477_12485;
var G__12491 = (i__12478_12486 + (1));
seq__12475_12483 = G__12488;
chunk__12476_12484 = G__12489;
count__12477_12485 = G__12490;
i__12478_12486 = G__12491;
continue;
} else {
var temp__4657__auto___12492 = cljs.core.seq.call(null,seq__12475_12483);
if(temp__4657__auto___12492){
var seq__12475_12493__$1 = temp__4657__auto___12492;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__12475_12493__$1)){
var c__7604__auto___12494 = cljs.core.chunk_first.call(null,seq__12475_12493__$1);
var G__12495 = cljs.core.chunk_rest.call(null,seq__12475_12493__$1);
var G__12496 = c__7604__auto___12494;
var G__12497 = cljs.core.count.call(null,c__7604__auto___12494);
var G__12498 = (0);
seq__12475_12483 = G__12495;
chunk__12476_12484 = G__12496;
count__12477_12485 = G__12497;
i__12478_12486 = G__12498;
continue;
} else {
var a_12499 = cljs.core.first.call(null,seq__12475_12493__$1);
crate.binding.bc_add.call(null,bc,a_12499,a_12499);

var G__12500 = cljs.core.next.call(null,seq__12475_12493__$1);
var G__12501 = null;
var G__12502 = (0);
var G__12503 = (0);
seq__12475_12483 = G__12500;
chunk__12476_12484 = G__12501;
count__12477_12485 = G__12502;
i__12478_12486 = G__12503;
continue;
}
} else {
}
}
break;
}

var seq__12479 = cljs.core.seq.call(null,removed);
var chunk__12480 = null;
var count__12481 = (0);
var i__12482 = (0);
while(true){
if((i__12482 < count__12481)){
var r = cljs.core._nth.call(null,chunk__12480,i__12482);
crate.binding.bc_remove.call(null,bc,r);

var G__12504 = seq__12479;
var G__12505 = chunk__12480;
var G__12506 = count__12481;
var G__12507 = (i__12482 + (1));
seq__12479 = G__12504;
chunk__12480 = G__12505;
count__12481 = G__12506;
i__12482 = G__12507;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__12479);
if(temp__4657__auto__){
var seq__12479__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__12479__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__12479__$1);
var G__12508 = cljs.core.chunk_rest.call(null,seq__12479__$1);
var G__12509 = c__7604__auto__;
var G__12510 = cljs.core.count.call(null,c__7604__auto__);
var G__12511 = (0);
seq__12479 = G__12508;
chunk__12480 = G__12509;
count__12481 = G__12510;
i__12482 = G__12511;
continue;
} else {
var r = cljs.core.first.call(null,seq__12479__$1);
crate.binding.bc_remove.call(null,bc,r);

var G__12512 = cljs.core.next.call(null,seq__12479__$1);
var G__12513 = null;
var G__12514 = (0);
var G__12515 = (0);
seq__12479 = G__12512;
chunk__12480 = G__12513;
count__12481 = G__12514;
i__12482 = G__12515;
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
var len__7868__auto___12525 = arguments.length;
var i__7869__auto___12526 = (0);
while(true){
if((i__7869__auto___12526 < len__7868__auto___12525)){
args__7875__auto__.push((arguments[i__7869__auto___12526]));

var G__12527 = (i__7869__auto___12526 + (1));
i__7869__auto___12526 = G__12527;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((1) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((1)),(0),null)):null);
return crate.binding.bound_coll.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7876__auto__);
});

crate.binding.bound_coll.cljs$core$IFn$_invoke$arity$variadic = (function (atm,p__12518){
var vec__12519 = p__12518;
var path = cljs.core.nth.call(null,vec__12519,(0),null);
var opts = cljs.core.nth.call(null,vec__12519,(1),null);
var vec__12522 = (cljs.core.truth_(opts)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [path,opts], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,path], null));
var path__$1 = cljs.core.nth.call(null,vec__12522,(0),null);
var opts__$1 = cljs.core.nth.call(null,vec__12522,(1),null);
var atm__$1 = ((cljs.core.not.call(null,path__$1))?atm:crate.binding.subatom.call(null,atm,path__$1));
var opts__$2 = cljs.core.assoc.call(null,opts__$1,new cljs.core.Keyword(null,"path","path",-188191168),path__$1);
var opts__$3 = ((cljs.core.not.call(null,new cljs.core.Keyword(null,"keyfn","keyfn",780060332).cljs$core$IFn$_invoke$arity$1(opts__$2)))?cljs.core.assoc.call(null,opts__$2,new cljs.core.Keyword(null,"keyfn","keyfn",780060332),cljs.core.first):cljs.core.assoc.call(null,opts__$2,new cljs.core.Keyword(null,"keyfn","keyfn",780060332),cljs.core.comp.call(null,new cljs.core.Keyword(null,"keyfn","keyfn",780060332).cljs$core$IFn$_invoke$arity$1(opts__$2),cljs.core.second)));
var bc = (new crate.binding.bound_collection(atm__$1,(new crate.binding.notifier(null)),opts__$3,cljs.core.sorted_map.call(null)));
cljs.core.add_watch.call(null,atm__$1,cljs.core.gensym.call(null,"bound-coll"),((function (vec__12522,path__$1,opts__$1,atm__$1,opts__$2,opts__$3,bc,vec__12519,path,opts){
return (function (_,___$1,___$2,neue){
return crate.binding.bc_compare.call(null,bc,neue);
});})(vec__12522,path__$1,opts__$1,atm__$1,opts__$2,opts__$3,bc,vec__12519,path,opts))
);

crate.binding.bc_compare.call(null,bc,cljs.core.deref.call(null,atm__$1));

return bc;
});

crate.binding.bound_coll.cljs$lang$maxFixedArity = (1);

crate.binding.bound_coll.cljs$lang$applyTo = (function (seq12516){
var G__12517 = cljs.core.first.call(null,seq12516);
var seq12516__$1 = cljs.core.next.call(null,seq12516);
return crate.binding.bound_coll.cljs$core$IFn$_invoke$arity$variadic(G__12517,seq12516__$1);
});

crate.binding.map_bound = (function crate$binding$map_bound(var_args){
var args__7875__auto__ = [];
var len__7868__auto___12535 = arguments.length;
var i__7869__auto___12536 = (0);
while(true){
if((i__7869__auto___12536 < len__7868__auto___12535)){
args__7875__auto__.push((arguments[i__7869__auto___12536]));

var G__12537 = (i__7869__auto___12536 + (1));
i__7869__auto___12536 = G__12537;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((2) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((2)),(0),null)):null);
return crate.binding.map_bound.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__7876__auto__);
});

crate.binding.map_bound.cljs$core$IFn$_invoke$arity$variadic = (function (as,atm,p__12531){
var vec__12532 = p__12531;
var opts = cljs.core.nth.call(null,vec__12532,(0),null);
var opts__$1 = cljs.core.assoc.call(null,opts,new cljs.core.Keyword(null,"as","as",1148689641),as);
var atm__$1 = ((cljs.core.not.call(null,new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(opts__$1)))?atm:crate.binding.subatom.call(null,atm,new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(opts__$1)));
var opts__$2 = ((cljs.core.not.call(null,new cljs.core.Keyword(null,"keyfn","keyfn",780060332).cljs$core$IFn$_invoke$arity$1(opts__$1)))?cljs.core.assoc.call(null,opts__$1,new cljs.core.Keyword(null,"keyfn","keyfn",780060332),cljs.core.first):cljs.core.assoc.call(null,opts__$1,new cljs.core.Keyword(null,"keyfn","keyfn",780060332),cljs.core.comp.call(null,new cljs.core.Keyword(null,"keyfn","keyfn",780060332).cljs$core$IFn$_invoke$arity$1(opts__$1),cljs.core.second)));
var bc = (new crate.binding.bound_collection(atm__$1,(new crate.binding.notifier(null)),opts__$2,cljs.core.sorted_map.call(null)));
cljs.core.add_watch.call(null,atm__$1,cljs.core.gensym.call(null,"bound-coll"),((function (opts__$1,atm__$1,opts__$2,bc,vec__12532,opts){
return (function (_,___$1,___$2,neue){
return crate.binding.bc_compare.call(null,bc,neue);
});})(opts__$1,atm__$1,opts__$2,bc,vec__12532,opts))
);

crate.binding.bc_compare.call(null,bc,cljs.core.deref.call(null,atm__$1));

return bc;
});

crate.binding.map_bound.cljs$lang$maxFixedArity = (2);

crate.binding.map_bound.cljs$lang$applyTo = (function (seq12528){
var G__12529 = cljs.core.first.call(null,seq12528);
var seq12528__$1 = cljs.core.next.call(null,seq12528);
var G__12530 = cljs.core.first.call(null,seq12528__$1);
var seq12528__$2 = cljs.core.next.call(null,seq12528__$1);
return crate.binding.map_bound.cljs$core$IFn$_invoke$arity$variadic(G__12529,G__12530,seq12528__$2);
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
var len__7868__auto___12550 = arguments.length;
var i__7869__auto___12551 = (0);
while(true){
if((i__7869__auto___12551 < len__7868__auto___12550)){
args__7875__auto__.push((arguments[i__7869__auto___12551]));

var G__12552 = (i__7869__auto___12551 + (1));
i__7869__auto___12551 = G__12552;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((1) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((1)),(0),null)):null);
return crate.binding.bound.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7876__auto__);
});

crate.binding.bound.cljs$core$IFn$_invoke$arity$variadic = (function (atm,p__12546){
var vec__12547 = p__12546;
var func = cljs.core.nth.call(null,vec__12547,(0),null);
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

crate.binding.bound.cljs$lang$applyTo = (function (seq12544){
var G__12545 = cljs.core.first.call(null,seq12544);
var seq12544__$1 = cljs.core.next.call(null,seq12544);
return crate.binding.bound.cljs$core$IFn$_invoke$arity$variadic(G__12545,seq12544__$1);
});

