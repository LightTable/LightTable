// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.util.cljs');
goog.require('cljs.core');
goog.require('clojure.string');
cljs.core._STAR_print_fn_STAR_ = (function (x){
if(cljs.core.truth_((function (){var and__6781__auto__ = x;
if(cljs.core.truth_(and__6781__auto__)){
return (cljs.core.not_EQ_.call(null,x,"")) && (cljs.core.not_EQ_.call(null,x,"\n"));
} else {
return and__6781__auto__;
}
})())){
return console.log(clojure.string.trim.call(null,x));
} else {
return null;
}
});
(cljs.core.ISeqable["null"] = true);

(cljs.core._seq["null"] = (function (coll){
return null;
}));
global.String.prototype.cljs$core$IFn$ = true;

global.String.prototype.call = (function() {
var G__12767 = null;
var G__12767__2 = (function (self__,coll){
var self____$1 = this;
var this$ = self____$1;
return cljs.core.get.call(null,coll,this$.toString());
});
var G__12767__3 = (function (self__,coll,not_found){
var self____$1 = this;
var this$ = self____$1;
return cljs.core.get.call(null,coll,this$.toString(),not_found);
});
G__12767 = function(self__,coll,not_found){
switch(arguments.length){
case 2:
return G__12767__2.call(this,self__,coll);
case 3:
return G__12767__3.call(this,self__,coll,not_found);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
G__12767.cljs$core$IFn$_invoke$arity$2 = G__12767__2;
G__12767.cljs$core$IFn$_invoke$arity$3 = G__12767__3;
return G__12767;
})()
;

global.String.prototype.apply = (function (self__,args12766){
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat(cljs.core.aclone.call(null,args12766)));
});

global.String.prototype.cljs$core$IFn$_invoke$arity$1 = (function (coll){
var this$ = this;
return cljs.core.get.call(null,coll,this$.toString());
});

global.String.prototype.cljs$core$IFn$_invoke$arity$2 = (function (coll,not_found){
var this$ = this;
return cljs.core.get.call(null,coll,this$.toString(),not_found);
});

global.String.prototype.cljs$core$ISeqable$ = true;

global.String.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var coll__$1 = this;
if(cljs.core.truth_((function (){var and__6781__auto__ = coll__$1;
if(cljs.core.truth_(and__6781__auto__)){
return !((coll__$1.length === (0)));
} else {
return and__6781__auto__;
}
})())){
return (new cljs.core.IndexedSeq((new String(coll__$1)),(0),null));
} else {
return null;
}
});
global.String.prototype.apply = (function (s,args){
if((args.length < (2))){
return cljs.core.get.call(null,(args[(0)]),s);
} else {
return cljs.core.get.call(null,(args[(0)]),s,(args[(1)]));
}
});
global.Array.prototype.cljs$core$ISeqable$ = true;

global.Array.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var coll__$1 = this;
if(cljs.core.truth_((function (){var and__6781__auto__ = coll__$1;
if(cljs.core.truth_(and__6781__auto__)){
return !((coll__$1.length === (0)));
} else {
return and__6781__auto__;
}
})())){
return (new cljs.core.IndexedSeq(coll__$1,(0),null));
} else {
return null;
}
});
lt.util.cljs.__GT_dottedkw = (function lt$util$cljs$__GT_dottedkw(var_args){
var args__7875__auto__ = [];
var len__7868__auto___12769 = arguments.length;
var i__7869__auto___12770 = (0);
while(true){
if((i__7869__auto___12770 < len__7868__auto___12769)){
args__7875__auto__.push((arguments[i__7869__auto___12770]));

var G__12771 = (i__7869__auto___12770 + (1));
i__7869__auto___12770 = G__12771;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((0) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((0)),(0),null)):null);
return lt.util.cljs.__GT_dottedkw.cljs$core$IFn$_invoke$arity$variadic(argseq__7876__auto__);
});

lt.util.cljs.__GT_dottedkw.cljs$core$IFn$_invoke$arity$variadic = (function (args){
return cljs.core.keyword.call(null,clojure.string.join.call(null,".",cljs.core.map.call(null,cljs.core.name,cljs.core.filter.call(null,cljs.core.identity,args))));
});

lt.util.cljs.__GT_dottedkw.cljs$lang$maxFixedArity = (0);

lt.util.cljs.__GT_dottedkw.cljs$lang$applyTo = (function (seq12768){
return lt.util.cljs.__GT_dottedkw.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq12768));
});

lt.util.cljs.js__GT_clj = (function lt$util$cljs$js__GT_clj(var_args){
var args__7875__auto__ = [];
var len__7868__auto___12773 = arguments.length;
var i__7869__auto___12774 = (0);
while(true){
if((i__7869__auto___12774 < len__7868__auto___12773)){
args__7875__auto__.push((arguments[i__7869__auto___12774]));

var G__12775 = (i__7869__auto___12774 + (1));
i__7869__auto___12774 = G__12775;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((0) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((0)),(0),null)):null);
return lt.util.cljs.js__GT_clj.cljs$core$IFn$_invoke$arity$variadic(argseq__7876__auto__);
});

lt.util.cljs.js__GT_clj.cljs$core$IFn$_invoke$arity$variadic = (function (args){
lt.objs.console.error("lt.util.cljs/js->clj is deprecated and will be removed in 0.9.0. Use js->clj instead");

return cljs.core.apply.call(null,cljs.core.js__GT_clj,args);
});

lt.util.cljs.js__GT_clj.cljs$lang$maxFixedArity = (0);

lt.util.cljs.js__GT_clj.cljs$lang$applyTo = (function (seq12772){
return lt.util.cljs.js__GT_clj.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq12772));
});

lt.util.cljs.str_contains_QMARK_ = (function lt$util$cljs$str_contains_QMARK_(str,x){
return (str.indexOf(x) > (-1));
});
lt.util.cljs.index_of = (function lt$util$cljs$index_of(e,coll){
return cljs.core.first.call(null,cljs.core.keep_indexed.call(null,(function (p1__12777_SHARP_,p2__12776_SHARP_){
if(cljs.core._EQ_.call(null,e,p2__12776_SHARP_)){
return p1__12777_SHARP_;
} else {
return null;
}
}),coll));
});
