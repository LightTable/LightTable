// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.objs.editor.pool');
goog.require('cljs.core');
goog.require('lt.objs.sidebar.command');
goog.require('lt.objs.notifos');
goog.require('lt.objs.document');
goog.require('lt.objs.keyboard');
goog.require('lt.objs.editor');
goog.require('lt.object');
goog.require('lt.util.dom');
goog.require('lt.util.cljs');
goog.require('lt.objs.canvas');
goog.require('lt.objs.app');
goog.require('lt.objs.popup');
goog.require('lt.objs.files');
goog.require('clojure.string');
lt.objs.editor.pool.get_all = (function lt$objs$editor$pool$get_all(){
return lt.object.by_tag.call(null,new cljs.core.Keyword(null,"editor","editor",-989377770));
});
/**
 * 
 */
lt.objs.editor.pool.__BEH__theme_changed = (function lt$objs$editor$pool$__BEH__theme_changed(this$,theme){
var seq__15988 = cljs.core.seq.call(null,lt.objs.editor.pool.get_all.call(null));
var chunk__15990 = null;
var count__15991 = (0);
var i__15992 = (0);
while(true){
if((i__15992 < count__15991)){
var ed = cljs.core._nth.call(null,chunk__15990,i__15992);
var e_15994 = new cljs.core.Keyword(null,"ed","ed",436294224).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed));
lt.objs.editor.set_options.call(null,e_15994,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"theme","theme",-1247880880),theme], null));

var G__15995 = seq__15988;
var G__15996 = chunk__15990;
var G__15997 = count__15991;
var G__15998 = (i__15992 + (1));
seq__15988 = G__15995;
chunk__15990 = G__15996;
count__15991 = G__15997;
i__15992 = G__15998;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__15988);
if(temp__4657__auto__){
var seq__15988__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15988__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__15988__$1);
var G__15999 = cljs.core.chunk_rest.call(null,seq__15988__$1);
var G__16000 = c__7604__auto__;
var G__16001 = cljs.core.count.call(null,c__7604__auto__);
var G__16002 = (0);
seq__15988 = G__15999;
chunk__15990 = G__16000;
count__15991 = G__16001;
i__15992 = G__16002;
continue;
} else {
var ed = cljs.core.first.call(null,seq__15988__$1);
var e_16003 = new cljs.core.Keyword(null,"ed","ed",436294224).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed));
lt.objs.editor.set_options.call(null,e_16003,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"theme","theme",-1247880880),theme], null));

var G__16004 = cljs.core.next.call(null,seq__15988__$1);
var G__16005 = null;
var G__16006 = (0);
var G__16007 = (0);
seq__15988 = G__16004;
chunk__15990 = G__16005;
count__15991 = G__16006;
i__15992 = G__16007;
continue;
}
} else {
return null;
}
}
break;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.editor.pool","theme-changed","lt.objs.editor.pool/theme-changed",26613535),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"theme-change","theme-change",230987224),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.editor.pool.__BEH__theme_changed);
/**
 * 
 */
lt.objs.editor.pool.__BEH__line_numbers_changed = (function lt$objs$editor$pool$__BEH__line_numbers_changed(this$,numbers_QMARK_){
var seq__16014 = cljs.core.seq.call(null,lt.objs.editor.pool.get_all.call(null));
var chunk__16016 = null;
var count__16017 = (0);
var i__16018 = (0);
while(true){
if((i__16018 < count__16017)){
var ed = cljs.core._nth.call(null,chunk__16016,i__16018);
var e_16020 = new cljs.core.Keyword(null,"ed","ed",436294224).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed));
lt.objs.editor.set_options.call(null,e_16020,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"lineNumbers","lineNumbers",1374890941),numbers_QMARK_], null));

var G__16021 = seq__16014;
var G__16022 = chunk__16016;
var G__16023 = count__16017;
var G__16024 = (i__16018 + (1));
seq__16014 = G__16021;
chunk__16016 = G__16022;
count__16017 = G__16023;
i__16018 = G__16024;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__16014);
if(temp__4657__auto__){
var seq__16014__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__16014__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__16014__$1);
var G__16025 = cljs.core.chunk_rest.call(null,seq__16014__$1);
var G__16026 = c__7604__auto__;
var G__16027 = cljs.core.count.call(null,c__7604__auto__);
var G__16028 = (0);
seq__16014 = G__16025;
chunk__16016 = G__16026;
count__16017 = G__16027;
i__16018 = G__16028;
continue;
} else {
var ed = cljs.core.first.call(null,seq__16014__$1);
var e_16029 = new cljs.core.Keyword(null,"ed","ed",436294224).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed));
lt.objs.editor.set_options.call(null,e_16029,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"lineNumbers","lineNumbers",1374890941),numbers_QMARK_], null));

var G__16030 = cljs.core.next.call(null,seq__16014__$1);
var G__16031 = null;
var G__16032 = (0);
var G__16033 = (0);
seq__16014 = G__16030;
chunk__16016 = G__16031;
count__16017 = G__16032;
i__16018 = G__16033;
continue;
}
} else {
return null;
}
}
break;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.editor.pool","line-numbers-changed","lt.objs.editor.pool/line-numbers-changed",1980344782),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"line-numbers-change","line-numbers-change",-756620077),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.editor.pool.__BEH__line_numbers_changed);
/**
 * 
 */
lt.objs.editor.pool.__BEH__options_changed = (function lt$objs$editor$pool$__BEH__options_changed(this$,opts){
var seq__16040 = cljs.core.seq.call(null,lt.objs.editor.pool.get_all.call(null));
var chunk__16042 = null;
var count__16043 = (0);
var i__16044 = (0);
while(true){
if((i__16044 < count__16043)){
var ed = cljs.core._nth.call(null,chunk__16042,i__16044);
var e_16046 = new cljs.core.Keyword(null,"ed","ed",436294224).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed));
lt.objs.editor.set_options.call(null,e_16046,opts);

var G__16047 = seq__16040;
var G__16048 = chunk__16042;
var G__16049 = count__16043;
var G__16050 = (i__16044 + (1));
seq__16040 = G__16047;
chunk__16042 = G__16048;
count__16043 = G__16049;
i__16044 = G__16050;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__16040);
if(temp__4657__auto__){
var seq__16040__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__16040__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__16040__$1);
var G__16051 = cljs.core.chunk_rest.call(null,seq__16040__$1);
var G__16052 = c__7604__auto__;
var G__16053 = cljs.core.count.call(null,c__7604__auto__);
var G__16054 = (0);
seq__16040 = G__16051;
chunk__16042 = G__16052;
count__16043 = G__16053;
i__16044 = G__16054;
continue;
} else {
var ed = cljs.core.first.call(null,seq__16040__$1);
var e_16055 = new cljs.core.Keyword(null,"ed","ed",436294224).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed));
lt.objs.editor.set_options.call(null,e_16055,opts);

var G__16056 = cljs.core.next.call(null,seq__16040__$1);
var G__16057 = null;
var G__16058 = (0);
var G__16059 = (0);
seq__16040 = G__16056;
chunk__16042 = G__16057;
count__16043 = G__16058;
i__16044 = G__16059;
continue;
}
} else {
return null;
}
}
break;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.editor.pool","options-changed","lt.objs.editor.pool/options-changed",501167378),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"options-changed","options-changed",-1491790333),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.editor.pool.__BEH__options_changed);
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.editor.pool","pool","lt.objs.editor.pool/pool",1264006902),new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.pool","editor.pool",878559253),null], null), null));
/**
 * Return truthy if any editors are currently dirty/unsaved?
 */
lt.objs.editor.pool.unsaved_QMARK_ = (function lt$objs$editor$pool$unsaved_QMARK_(){
return cljs.core.some.call(null,(function (p1__16060_SHARP_){
return new cljs.core.Keyword(null,"dirty","dirty",729553281).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,p1__16060_SHARP_));
}),lt.object.by_tag.call(null,new cljs.core.Keyword(null,"editor","editor",-989377770)));
});
/**
 * Return editor objects that edit given path
 */
lt.objs.editor.pool.by_path = (function lt$objs$editor$pool$by_path(path){
if(cljs.core.truth_(path)){
var path__$1 = clojure.string.lower_case.call(null,path);
return cljs.core.filter.call(null,((function (path__$1){
return (function (p1__16061_SHARP_){
return cljs.core._EQ_.call(null,clojure.string.lower_case.call(null,(function (){var or__6793__auto__ = cljs.core.get.call(null,new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,p1__16061_SHARP_)),new cljs.core.Keyword(null,"path","path",-188191168));
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return "";
}
})()),path__$1);
});})(path__$1))
,lt.object.by_tag.call(null,new cljs.core.Keyword(null,"editor","editor",-989377770)));
} else {
return null;
}
});
/**
 * Return editor objects that edit paths containing given path string
 */
lt.objs.editor.pool.containing_path = (function lt$objs$editor$pool$containing_path(path){
var path__$1 = clojure.string.lower_case.call(null,path);
return cljs.core.filter.call(null,((function (path__$1){
return (function (p1__16062_SHARP_){
return (clojure.string.lower_case.call(null,(function (){var or__6793__auto__ = new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,p1__16062_SHARP_)));
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return "";
}
})()).indexOf(path__$1) > (-1));
});})(path__$1))
,lt.object.by_tag.call(null,new cljs.core.Keyword(null,"editor","editor",-989377770)));
});
/**
 * 
 */
lt.objs.editor.pool.button = (function lt$objs$editor$pool$button(var_args){
var args__7875__auto__ = [];
var len__7868__auto___16079 = arguments.length;
var i__7869__auto___16080 = (0);
while(true){
if((i__7869__auto___16080 < len__7868__auto___16079)){
args__7875__auto__.push((arguments[i__7869__auto___16080]));

var G__16081 = (i__7869__auto___16080 + (1));
i__7869__auto___16080 = G__16081;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((1) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((1)),(0),null)):null);
return lt.objs.editor.pool.button.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7876__auto__);
});

lt.objs.editor.pool.button.cljs$core$IFn$_invoke$arity$variadic = (function (label,p__16065){
var vec__16066 = p__16065;
var cb = cljs.core.nth.call(null,vec__16066,(0),null);
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.button.right","div.button.right",1623860542),label], null));
var seq__16069_16082 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__,vec__16066,cb){
return (function (){
if(cljs.core.truth_(cb)){
return cb.call(null);
} else {
return null;
}
});})(e__7942__auto__,vec__16066,cb))
], null)));
var chunk__16070_16083 = null;
var count__16071_16084 = (0);
var i__16072_16085 = (0);
while(true){
if((i__16072_16085 < count__16071_16084)){
var vec__16073_16086 = cljs.core._nth.call(null,chunk__16070_16083,i__16072_16085);
var ev__7943__auto___16087 = cljs.core.nth.call(null,vec__16073_16086,(0),null);
var func__7944__auto___16088 = cljs.core.nth.call(null,vec__16073_16086,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___16087,func__7944__auto___16088);

var G__16089 = seq__16069_16082;
var G__16090 = chunk__16070_16083;
var G__16091 = count__16071_16084;
var G__16092 = (i__16072_16085 + (1));
seq__16069_16082 = G__16089;
chunk__16070_16083 = G__16090;
count__16071_16084 = G__16091;
i__16072_16085 = G__16092;
continue;
} else {
var temp__4657__auto___16093 = cljs.core.seq.call(null,seq__16069_16082);
if(temp__4657__auto___16093){
var seq__16069_16094__$1 = temp__4657__auto___16093;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__16069_16094__$1)){
var c__7604__auto___16095 = cljs.core.chunk_first.call(null,seq__16069_16094__$1);
var G__16096 = cljs.core.chunk_rest.call(null,seq__16069_16094__$1);
var G__16097 = c__7604__auto___16095;
var G__16098 = cljs.core.count.call(null,c__7604__auto___16095);
var G__16099 = (0);
seq__16069_16082 = G__16096;
chunk__16070_16083 = G__16097;
count__16071_16084 = G__16098;
i__16072_16085 = G__16099;
continue;
} else {
var vec__16076_16100 = cljs.core.first.call(null,seq__16069_16094__$1);
var ev__7943__auto___16101 = cljs.core.nth.call(null,vec__16076_16100,(0),null);
var func__7944__auto___16102 = cljs.core.nth.call(null,vec__16076_16100,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___16101,func__7944__auto___16102);

var G__16103 = cljs.core.next.call(null,seq__16069_16094__$1);
var G__16104 = null;
var G__16105 = (0);
var G__16106 = (0);
seq__16069_16082 = G__16103;
chunk__16070_16083 = G__16104;
count__16071_16084 = G__16105;
i__16072_16085 = G__16106;
continue;
}
} else {
}
}
break;
}

return e__7942__auto__;
});

lt.objs.editor.pool.button.cljs$lang$maxFixedArity = (1);

lt.objs.editor.pool.button.cljs$lang$applyTo = (function (seq16063){
var G__16064 = cljs.core.first.call(null,seq16063);
var seq16063__$1 = cljs.core.next.call(null,seq16063);
return lt.objs.editor.pool.button.cljs$core$IFn$_invoke$arity$variadic(G__16064,seq16063__$1);
});

lt.objs.editor.pool.unsaved_prompt = (function lt$objs$editor$pool$unsaved_prompt(on_yes){
return lt.objs.popup.popup_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"header","header",119441134),"You will lose changes.",new cljs.core.Keyword(null,"body","body",-2049205669),"If you close now, you'll lose any unsaved changes. Are you sure you want to do that?",new cljs.core.Keyword(null,"buttons","buttons",-1953831197),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"Discard changes",new cljs.core.Keyword(null,"action","action",-811238024),on_yes], null),lt.objs.popup.cancel_button], null)], null));
});
lt.objs.editor.pool.pool = lt.object.create.call(null,new cljs.core.Keyword("lt.objs.editor.pool","pool","lt.objs.editor.pool/pool",1264006902));
/**
 * Return current editor object (last active in pool)
 */
lt.objs.editor.pool.last_active = (function lt$objs$editor$pool$last_active(){
var l = new cljs.core.Keyword(null,"last","last",1105735132).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.editor.pool.pool));
if(cljs.core.truth_((function (){var and__6781__auto__ = l;
if(cljs.core.truth_(and__6781__auto__)){
return cljs.core.deref.call(null,l);
} else {
return and__6781__auto__;
}
})())){
return l;
} else {
return null;
}
});
lt.objs.editor.pool.focus_last = (function lt$objs$editor$pool$focus_last(){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
var temp__4657__auto____$1 = new cljs.core.Keyword(null,"ed","ed",436294224).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed));
if(cljs.core.truth_(temp__4657__auto____$1)){
var ed__$1 = temp__4657__auto____$1;
lt.util.dom.focus.call(null,document.body);

return lt.objs.editor.focus.call(null,ed__$1);
} else {
return null;
}
} else {
return null;
}
});
/**
 * 
 */
lt.objs.editor.pool.__BEH__track_active = (function lt$objs$editor$pool$__BEH__track_active(this$){
return lt.object.merge_BANG_.call(null,lt.objs.editor.pool.pool,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"last","last",1105735132),this$], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.editor.pool","track-active","lt.objs.editor.pool/track-active",2018623219),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"active","active",1895962068),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.editor.pool.__BEH__track_active);
/**
 * 
 */
lt.objs.editor.pool.__BEH__stop_close_dirty = (function lt$objs$editor$pool$__BEH__stop_close_dirty(this$){
if(cljs.core.truth_(lt.objs.editor.pool.unsaved_QMARK_.call(null))){
lt.objs.app.prevent_close.call(null);

return lt.objs.editor.pool.unsaved_prompt.call(null,cljs.core.partial.call(null,lt.objs.app.close,true));
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.editor.pool","stop-close-dirty","lt.objs.editor.pool/stop-close-dirty",911015226),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"close","close",1835149582),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.editor.pool.__BEH__stop_close_dirty);
/**
 * 
 */
lt.objs.editor.pool.__BEH__stop_reload_dirty = (function lt$objs$editor$pool$__BEH__stop_reload_dirty(this$){
if(cljs.core.truth_(lt.objs.editor.pool.unsaved_QMARK_.call(null))){
lt.objs.app.prevent_close.call(null);

return lt.objs.editor.pool.unsaved_prompt.call(null,lt.objs.app.refresh);
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.editor.pool","stop-reload-dirty","lt.objs.editor.pool/stop-reload-dirty",358741503),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"reload","reload",863702807),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.editor.pool.__BEH__stop_reload_dirty);
/**
 * 
 */
lt.objs.editor.pool.__BEH__ed_close = (function lt$objs$editor$pool$__BEH__ed_close(this$){
if(cljs.core.truth_(new cljs.core.Keyword(null,"dirty","dirty",729553281).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)))){
return lt.objs.editor.pool.unsaved_prompt.call(null,(function (){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"close.force","close.force",1317039245));
}));
} else {
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"close.force","close.force",1317039245));
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.editor.pool","ed-close","lt.objs.editor.pool/ed-close",285131989),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"close","close",1835149582),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.editor.pool.__BEH__ed_close);
/**
 * 
 */
lt.objs.editor.pool.__BEH__focus_last_on_focus = (function lt$objs$editor$pool$__BEH__focus_last_on_focus(this$){
return lt.objs.editor.pool.focus_last.call(null);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.editor.pool","focus-last-on-focus","lt.objs.editor.pool/focus-last-on-focus",796430544),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"focus!","focus!",-1344984927),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.editor.pool.__BEH__focus_last_on_focus);
lt.objs.editor.pool.reload = (function lt$objs$editor$pool$reload(ed){
lt.objs.editor.set_val_and_keep_cursor.call(null,ed,new cljs.core.Keyword(null,"content","content",15833224).cljs$core$IFn$_invoke$arity$1(lt.objs.files.open_sync.call(null,new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed))))));

lt.objs.document.update_stats.call(null,new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed))));

return lt.object.merge_BANG_.call(null,ed,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"dirty","dirty",729553281),false], null));
});
/**
 * 
 */
lt.objs.editor.pool.__BEH__watched__DOT__update = (function lt$objs$editor$pool$__BEH__watched__DOT__update(ws,f,stat){
if(cljs.core.truth_(lt.objs.files.file_QMARK_.call(null,f))){
var temp__4657__auto__ = cljs.core.first.call(null,lt.objs.editor.pool.by_path.call(null,f));
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
if(cljs.core.truth_(lt.objs.document.check_mtime.call(null,lt.objs.document.__GT_stats.call(null,f),stat))){
return null;
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"dirty","dirty",729553281).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed)))){
return null;
} else {
return lt.objs.editor.pool.reload.call(null,ed);
}
}
} else {
return null;
}
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.editor.pool","watched.update","lt.objs.editor.pool/watched.update",-1130271055),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"watched.update","watched.update",-1798614640),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.editor.pool.__BEH__watched__DOT__update);
lt.objs.editor.pool.set_syntax = (function lt$objs$editor$pool$set_syntax(ed,new_syn){
var prev_info = new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed));
if(cljs.core.truth_(prev_info)){
lt.object.remove_tags.call(null,ed,new cljs.core.Keyword(null,"tags","tags",1771418977).cljs$core$IFn$_invoke$arity$1(prev_info));
} else {
}

lt.object.update_BANG_.call(null,ed,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",-317069002)], null),cljs.core.merge,cljs.core.dissoc.call(null,new_syn,new cljs.core.Keyword(null,"name","name",1843675177)));

lt.objs.editor.set_mode.call(null,ed,new cljs.core.Keyword(null,"mime","mime",-1846414642).cljs$core$IFn$_invoke$arity$1(new_syn));

return lt.object.add_tags.call(null,ed,new cljs.core.Keyword(null,"tags","tags",1771418977).cljs$core$IFn$_invoke$arity$1(new_syn));
});
lt.objs.editor.pool.set_syntax_by_path = (function lt$objs$editor$pool$set_syntax_by_path(ed,path){
return lt.objs.editor.pool.set_syntax.call(null,ed,lt.objs.files.path__GT_type.call(null,path));
});
/**
 * 
 */
lt.objs.editor.pool.__BEH__watched__DOT__delete = (function lt$objs$editor$pool$__BEH__watched__DOT__delete(ws,del){
var editors = (function (){var or__6793__auto__ = cljs.core.seq.call(null,lt.objs.editor.pool.by_path.call(null,del));
if(or__6793__auto__){
return or__6793__auto__;
} else {
return cljs.core.filter.call(null,((function (or__6793__auto__){
return (function (p1__16107_SHARP_){
var temp__4655__auto__ = new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,p1__16107_SHARP_)));
if(cljs.core.truth_(temp__4655__auto__)){
var path = temp__4655__auto__;
return cljs.core._EQ_.call(null,(0),path.indexOf([cljs.core.str(del),cljs.core.str(lt.objs.files.separator)].join('')));
} else {
return false;
}
});})(or__6793__auto__))
,lt.object.by_tag.call(null,new cljs.core.Keyword(null,"editor","editor",-989377770)));
}
})();
var seq__16112 = cljs.core.seq.call(null,editors);
var chunk__16113 = null;
var count__16114 = (0);
var i__16115 = (0);
while(true){
if((i__16115 < count__16114)){
var ed = cljs.core._nth.call(null,chunk__16113,i__16115);
if(cljs.core.truth_(new cljs.core.Keyword(null,"dirty","dirty",729553281).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed)))){
} else {
lt.object.raise.call(null,ed,new cljs.core.Keyword(null,"close","close",1835149582));
}

var G__16116 = seq__16112;
var G__16117 = chunk__16113;
var G__16118 = count__16114;
var G__16119 = (i__16115 + (1));
seq__16112 = G__16116;
chunk__16113 = G__16117;
count__16114 = G__16118;
i__16115 = G__16119;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__16112);
if(temp__4657__auto__){
var seq__16112__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__16112__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__16112__$1);
var G__16120 = cljs.core.chunk_rest.call(null,seq__16112__$1);
var G__16121 = c__7604__auto__;
var G__16122 = cljs.core.count.call(null,c__7604__auto__);
var G__16123 = (0);
seq__16112 = G__16120;
chunk__16113 = G__16121;
count__16114 = G__16122;
i__16115 = G__16123;
continue;
} else {
var ed = cljs.core.first.call(null,seq__16112__$1);
if(cljs.core.truth_(new cljs.core.Keyword(null,"dirty","dirty",729553281).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed)))){
} else {
lt.object.raise.call(null,ed,new cljs.core.Keyword(null,"close","close",1835149582));
}

var G__16124 = cljs.core.next.call(null,seq__16112__$1);
var G__16125 = null;
var G__16126 = (0);
var G__16127 = (0);
seq__16112 = G__16124;
chunk__16113 = G__16125;
count__16114 = G__16126;
i__16115 = G__16127;
continue;
}
} else {
return null;
}
}
break;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.editor.pool","watched.delete","lt.objs.editor.pool/watched.delete",-797811203),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"watched.delete","watched.delete",-2013789460),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.editor.pool.__BEH__watched__DOT__delete);
/**
 * 
 */
lt.objs.editor.pool.__BEH__watched__DOT__rename = (function lt$objs$editor$pool$__BEH__watched__DOT__rename(this$,old,neue){
if(cljs.core.truth_(lt.objs.files.file_QMARK_.call(null,old))){
var temp__4657__auto__ = cljs.core.first.call(null,lt.objs.editor.pool.by_path.call(null,old));
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
lt.object.update_BANG_.call(null,ed,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",-317069002)], null),cljs.core.assoc,new cljs.core.Keyword(null,"path","path",-188191168),neue,new cljs.core.Keyword(null,"name","name",1843675177),lt.objs.files.basename.call(null,neue));

lt.objs.document.move_doc.call(null,old,neue);

lt.objs.editor.pool.set_syntax_by_path.call(null,ed,neue);

var temp__4657__auto____$1 = new cljs.core.Keyword("lt.objs.tabs","tabset","lt.objs.tabs/tabset",537008529).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed));
if(cljs.core.truth_(temp__4657__auto____$1)){
var ts = temp__4657__auto____$1;
return lt.object.raise.call(null,ts,new cljs.core.Keyword(null,"tab.updated","tab.updated",-389421943));
} else {
return null;
}
} else {
return null;
}
} else {
var old_folder = [cljs.core.str(old),cljs.core.str(lt.objs.files.separator)].join('');
var open = cljs.core.filter.call(null,((function (old_folder){
return (function (p1__16128_SHARP_){
return cljs.core._EQ_.call(null,(0),(function (){var or__6793__auto__ = cljs.core.get.call(null,new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,p1__16128_SHARP_)),new cljs.core.Keyword(null,"path","path",-188191168));
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return "";
}
})().indexOf(old_folder));
});})(old_folder))
,lt.object.by_tag.call(null,new cljs.core.Keyword(null,"editor","editor",-989377770)));
var seq__16135 = cljs.core.seq.call(null,open);
var chunk__16137 = null;
var count__16138 = (0);
var i__16139 = (0);
while(true){
if((i__16139 < count__16138)){
var ed = cljs.core._nth.call(null,chunk__16137,i__16139);
var neue_path_16141 = clojure.string.replace.call(null,new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed))),old,neue);
lt.object.update_BANG_.call(null,ed,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",-317069002)], null),cljs.core.assoc,new cljs.core.Keyword(null,"path","path",-188191168),neue_path_16141,new cljs.core.Keyword(null,"name","name",1843675177),lt.objs.files.basename.call(null,neue_path_16141));

lt.objs.document.move_doc.call(null,old,neue_path_16141);

var G__16142 = seq__16135;
var G__16143 = chunk__16137;
var G__16144 = count__16138;
var G__16145 = (i__16139 + (1));
seq__16135 = G__16142;
chunk__16137 = G__16143;
count__16138 = G__16144;
i__16139 = G__16145;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__16135);
if(temp__4657__auto__){
var seq__16135__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__16135__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__16135__$1);
var G__16146 = cljs.core.chunk_rest.call(null,seq__16135__$1);
var G__16147 = c__7604__auto__;
var G__16148 = cljs.core.count.call(null,c__7604__auto__);
var G__16149 = (0);
seq__16135 = G__16146;
chunk__16137 = G__16147;
count__16138 = G__16148;
i__16139 = G__16149;
continue;
} else {
var ed = cljs.core.first.call(null,seq__16135__$1);
var neue_path_16150 = clojure.string.replace.call(null,new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed))),old,neue);
lt.object.update_BANG_.call(null,ed,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",-317069002)], null),cljs.core.assoc,new cljs.core.Keyword(null,"path","path",-188191168),neue_path_16150,new cljs.core.Keyword(null,"name","name",1843675177),lt.objs.files.basename.call(null,neue_path_16150));

lt.objs.document.move_doc.call(null,old,neue_path_16150);

var G__16151 = cljs.core.next.call(null,seq__16135__$1);
var G__16152 = null;
var G__16153 = (0);
var G__16154 = (0);
seq__16135 = G__16151;
chunk__16137 = G__16152;
count__16138 = G__16153;
i__16139 = G__16154;
continue;
}
} else {
return null;
}
}
break;
}
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.editor.pool","watched.rename","lt.objs.editor.pool/watched.rename",-610957216),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"rename","rename",1508157613),null,new cljs.core.Keyword(null,"watched.rename","watched.rename",67923309),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.editor.pool.__BEH__watched__DOT__rename);
/**
 * Create a :lt.objs.editor/editor object with given info map and add it to current pool
 */
lt.objs.editor.pool.create = (function lt$objs$editor$pool$create(info){
var ed = lt.object.create.call(null,new cljs.core.Keyword("lt.objs.editor","editor","lt.objs.editor/editor",-787440333),info);
lt.object.add_tags.call(null,ed,new cljs.core.Keyword(null,"tags","tags",1771418977).cljs$core$IFn$_invoke$arity$2(info,cljs.core.PersistentVector.EMPTY));

lt.object.merge_BANG_.call(null,ed,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.generation","editor.generation",-1223834691),lt.objs.editor.__GT_generation.call(null,ed)], null));

lt.object.raise.call(null,lt.objs.editor.pool.pool,new cljs.core.Keyword(null,"create","create",-1301499256),ed,info);

lt.object.raise.call(null,ed,new cljs.core.Keyword(null,"create","create",-1301499256));

return ed;
});
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"focus-last-editor","focus-last-editor",-555034320),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Focus last active editor",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.objs.editor.pool.focus_last.call(null);
})], null));
lt.objs.editor.pool.syntax_selector = lt.objs.sidebar.command.filter_list.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"items","items",1031954938),(function (){
return cljs.core.sort_by.call(null,new cljs.core.Keyword(null,"name","name",1843675177),cljs.core.vals.call(null,new cljs.core.Keyword(null,"types","types",590030639).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.files.files_obj))));
}),new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),"Syntax"], null));
/**
 * 
 */
lt.objs.editor.pool.__BEH__set_syntax = (function lt$objs$editor$pool$__BEH__set_syntax(this$,v){
return lt.objs.sidebar.command.exec_active_BANG_.call(null,v);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.editor.pool","set-syntax","lt.objs.editor.pool/set-syntax",1419323484),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"select","select",1147833503),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.editor.pool.__BEH__set_syntax);
/**
 * 
 */
lt.objs.editor.pool.__BEH__init_syntax_selector = (function lt$objs$editor$pool$__BEH__init_syntax_selector(app){
return lt.object.raise.call(null,lt.objs.editor.pool.syntax_selector,new cljs.core.Keyword(null,"refresh!","refresh!",156149341));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.editor.pool","init-syntax-selector","lt.objs.editor.pool/init-syntax-selector",1115135614),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"init","init",-1875481434),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.editor.pool.__BEH__init_syntax_selector);
lt.object.add_behavior_BANG_.call(null,lt.objs.editor.pool.syntax_selector,new cljs.core.Keyword("lt.objs.editor.pool","set-syntax","lt.objs.editor.pool/set-syntax",1419323484));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"set-syntax","set-syntax",-1372124309),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Set current editor syntax",new cljs.core.Keyword(null,"options","options",99638489),lt.objs.editor.pool.syntax_selector,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (syn){
var temp__4655__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4655__auto__)){
var last = temp__4655__auto__;
return lt.objs.editor.pool.set_syntax.call(null,last,syn);
} else {
return lt.objs.notifos.set_msg_BANG_.call(null,"Set syntax requires an active editor");
}
})], null));
/**
 * 
 */
lt.objs.editor.pool.__BEH__line_comment_options = (function lt$objs$editor$pool$__BEH__line_comment_options(this$,options){
return lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("lt.objs.editor.pool","comment-options","lt.objs.editor.pool/comment-options",-1190709261),options], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.editor.pool","line-comment-options","lt.objs.editor.pool/line-comment-options",-395096661),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Set options for line commenting",new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"map",new cljs.core.Keyword(null,"example","example",-1755779144),"{:indent true}"], null)], null),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"object.instant","object.instant",-29936727),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.editor.pool.__BEH__line_comment_options);
lt.objs.editor.pool.do_commenting = (function lt$objs$editor$pool$do_commenting(commenting_fn){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var cur = temp__4657__auto__;
var from = lt.objs.editor.__GT_cursor.call(null,cur,"start");
var to = (cljs.core.truth_(lt.objs.editor.selection_QMARK_.call(null,cur))?lt.objs.editor.__GT_cursor.call(null,cur,"end"):from);
var options = new cljs.core.Keyword("lt.objs.editor.pool","comment-options","lt.objs.editor.pool/comment-options",-1190709261).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cur));
return commenting_fn.call(null,cur,from,to,options);
} else {
return null;
}
});
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"comment-selection","comment-selection",-2094398073),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Comment line(s)",new cljs.core.Keyword(null,"exec","exec",1625568743),cljs.core.partial.call(null,lt.objs.editor.pool.do_commenting,lt.objs.editor.line_comment)], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"block-comment-selection","block-comment-selection",1520368475),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Block Comment line(s)",new cljs.core.Keyword(null,"exec","exec",1625568743),cljs.core.partial.call(null,lt.objs.editor.pool.do_commenting,lt.objs.editor.block_comment)], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"uncomment-selection","uncomment-selection",1837495188),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Uncomment line(s)",new cljs.core.Keyword(null,"exec","exec",1625568743),cljs.core.partial.call(null,lt.objs.editor.pool.do_commenting,lt.objs.editor.uncomment)], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"toggle-comment-selection","toggle-comment-selection",1238781),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Toggle comment line(s)",new cljs.core.Keyword(null,"exec","exec",1625568743),cljs.core.partial.call(null,lt.objs.editor.pool.do_commenting,lt.objs.editor.toggle_comment)], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"indent-selection","indent-selection",318957687),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Indent line(s)",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var cur = temp__4657__auto__;
var line = new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(lt.objs.editor.__GT_cursor.call(null,cur,"start"));
if(cljs.core.truth_(lt.objs.editor.selection_QMARK_.call(null,cur))){
return lt.objs.editor.indent_selection.call(null,cur,"add");
} else {
return lt.objs.editor.indent_line.call(null,cur,line,"add");
}
} else {
return null;
}
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"unindent-selection","unindent-selection",1804307062),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Unindent line(s)",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var cur = temp__4657__auto__;
var line = new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(lt.objs.editor.__GT_cursor.call(null,cur,"start"));
if(cljs.core.truth_(lt.objs.editor.selection_QMARK_.call(null,cur))){
return lt.objs.editor.indent_selection.call(null,cur,"subtract");
} else {
return lt.objs.editor.indent_line.call(null,cur,line,"subtract");
}
} else {
return null;
}
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"smart-indent-selection","smart-indent-selection",1283826970),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Smart indent line(s)",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var cur = temp__4657__auto__;
return lt.objs.editor.indent_selection.call(null,cur,"smart");
} else {
return null;
}
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.selection.clear","editor.selection.clear",63914653),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Clear selection",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var cur = temp__4657__auto__;
return lt.objs.editor.move_cursor.call(null,cur,lt.objs.editor.__GT_cursor.call(null,cur));
} else {
return null;
}
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.select-all","editor.select-all",-1230577580),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Select all",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
return CodeMirror.commands.selectAll(lt.objs.editor.__GT_cm_ed.call(null,ed));
} else {
return null;
}
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.kill-line","editor.kill-line",-1325028998),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Kill line",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
return CodeMirror.commands.killLine(lt.objs.editor.__GT_cm_ed.call(null,ed));
} else {
return null;
}
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.delete-line","editor.delete-line",1669898536),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Delete line",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
return CodeMirror.commands.deleteLine(lt.objs.editor.__GT_cm_ed.call(null,ed));
} else {
return null;
}
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.delete-line-left","editor.delete-line-left",-1332098291),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Delete line left",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
return CodeMirror.commands.delLineLeft(lt.objs.editor.__GT_cm_ed.call(null,ed));
} else {
return null;
}
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.doc-start","editor.doc-start",-157323889),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Move to first line",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
return CodeMirror.commands.goDocStart(lt.objs.editor.__GT_cm_ed.call(null,ed));
} else {
return null;
}
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.doc-end","editor.doc-end",1375265603),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Move to last line",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
return CodeMirror.commands.goDocEnd(lt.objs.editor.__GT_cm_ed.call(null,ed));
} else {
return null;
}
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.line-start","editor.line-start",546151517),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Move to start of the line",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
return CodeMirror.commands.goLineStart(lt.objs.editor.__GT_cm_ed.call(null,ed));
} else {
return null;
}
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.line-start-smart","editor.line-start-smart",412143839),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Move to first non-whitespace char in the line",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
return CodeMirror.commands.goLineStartSmart(lt.objs.editor.__GT_cm_ed.call(null,ed));
} else {
return null;
}
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.line-end","editor.line-end",-1270908474),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Move to end of the line",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
return CodeMirror.commands.goLineEnd(lt.objs.editor.__GT_cm_ed.call(null,ed));
} else {
return null;
}
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.line-right","editor.line-right",1532005588),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Goto the right of the line",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
return CodeMirror.commands.goLineRight(lt.objs.editor.__GT_cm_ed.call(null,ed));
} else {
return null;
}
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.line-left","editor.line-left",1097592079),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Goto the left of the line",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
return CodeMirror.commands.goLineLeft(lt.objs.editor.__GT_cm_ed.call(null,ed));
} else {
return null;
}
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.line-up","editor.line-up",-296437874),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Previous line",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
return CodeMirror.commands.goLineUp(lt.objs.editor.__GT_cm_ed.call(null,ed));
} else {
return null;
}
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.line-down","editor.line-down",1805172127),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Next line",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
return CodeMirror.commands.goLineDown(lt.objs.editor.__GT_cm_ed.call(null,ed));
} else {
return null;
}
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.page-up","editor.page-up",-1959788650),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Page up",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
return CodeMirror.commands.goPageUp(lt.objs.editor.__GT_cm_ed.call(null,ed));
} else {
return null;
}
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.page-down","editor.page-down",-688234661),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Page down",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
return CodeMirror.commands.goPageDown(lt.objs.editor.__GT_cm_ed.call(null,ed));
} else {
return null;
}
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.char-left","editor.char-left",448553376),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Move left one character",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
return CodeMirror.commands.goCharLeft(lt.objs.editor.__GT_cm_ed.call(null,ed));
} else {
return null;
}
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.char-right","editor.char-right",283146216),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Move right one character",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
return CodeMirror.commands.goCharRight(lt.objs.editor.__GT_cm_ed.call(null,ed));
} else {
return null;
}
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.column-left","editor.column-left",797281396),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Move left one column",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
return CodeMirror.commands.goColumnLeft(lt.objs.editor.__GT_cm_ed.call(null,ed));
} else {
return null;
}
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.column-right","editor.column-right",-666837525),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Move right one column",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
return CodeMirror.commands.goColumnRight(lt.objs.editor.__GT_cm_ed.call(null,ed));
} else {
return null;
}
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.word-left","editor.word-left",-1565827863),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Move left one word",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
return CodeMirror.commands.goWordLeft(lt.objs.editor.__GT_cm_ed.call(null,ed));
} else {
return null;
}
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.word-right","editor.word-right",-2105620797),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Move right one word",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
return CodeMirror.commands.goWordRight(lt.objs.editor.__GT_cm_ed.call(null,ed));
} else {
return null;
}
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.group-left","editor.group-left",2144471194),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Move left one group",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
return CodeMirror.commands.goGroupLeft(lt.objs.editor.__GT_cm_ed.call(null,ed));
} else {
return null;
}
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.group-right","editor.group-right",-1542883124),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Move right one group",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
return CodeMirror.commands.goGroupRight(lt.objs.editor.__GT_cm_ed.call(null,ed));
} else {
return null;
}
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.delete-char-left","editor.delete-char-left",-899110993),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Delete character to the left",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
return CodeMirror.commands.delCharBefore(lt.objs.editor.__GT_cm_ed.call(null,ed));
} else {
return null;
}
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.delete-char-right","editor.delete-char-right",1443957003),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Delete character to the right",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
return CodeMirror.commands.delCharAfter(lt.objs.editor.__GT_cm_ed.call(null,ed));
} else {
return null;
}
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.delete-word-left","editor.delete-word-left",1439891858),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Delete word to the left",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
return CodeMirror.commands.delWordBefore(lt.objs.editor.__GT_cm_ed.call(null,ed));
} else {
return null;
}
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.delete-word-right","editor.delete-word-right",-315405419),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Delete word to the right",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
return CodeMirror.commands.delWordAfter(lt.objs.editor.__GT_cm_ed.call(null,ed));
} else {
return null;
}
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.delete-group-left","editor.delete-group-left",535221257),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Delete group to the left",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
return CodeMirror.commands.delGroupBefore(lt.objs.editor.__GT_cm_ed.call(null,ed));
} else {
return null;
}
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.delete-group-right","editor.delete-group-right",-2040720549),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Delete group to the right",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
return CodeMirror.commands.delGroupAfter(lt.objs.editor.__GT_cm_ed.call(null,ed));
} else {
return null;
}
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.transpose-chars","editor.transpose-chars",-1071321571),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Transpose characters",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
return CodeMirror.commands.transposeChars(lt.objs.editor.__GT_cm_ed.call(null,ed));
} else {
return null;
}
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.new-line-indent","editor.new-line-indent",1848556017),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Newline and indent",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
return CodeMirror.commands.newlineAndIndent(lt.objs.editor.__GT_cm_ed.call(null,ed));
} else {
return null;
}
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.toggle-overwrite","editor.toggle-overwrite",1104279962),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Toggle overwrite",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
return CodeMirror.commands.toggleOverwrite(lt.objs.editor.__GT_cm_ed.call(null,ed));
} else {
return null;
}
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.cut","editor.cut",-1960645712),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Cut",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
return lt.objs.editor.cut.call(null,ed);
} else {
return null;
}
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.copy","editor.copy",-1879637400),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Copy",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
return lt.objs.editor.copy.call(null,ed);
} else {
return null;
}
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.paste","editor.paste",-706576083),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Paste",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
return lt.objs.editor.paste.call(null,ed);
} else {
return null;
}
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.select-all","editor.select-all",-1230577580),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Select all",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
return lt.objs.editor.select_all.call(null,ed);
} else {
return null;
}
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.select-line","editor.select-line",73398382),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Select line",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.objs.sidebar.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"editor.codemirror.command","editor.codemirror.command",-1907886107),"selectLine");
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.force.wrap","editor.force.wrap",-86243745),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Toggle line wrapping in current editor",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
if(cljs.core.truth_(lt.objs.editor.option.call(null,ed,"lineWrapping"))){
lt.object.remove_tags.call(null,ed,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"editor.force.wrap","editor.force.wrap",-86243745)], null));

lt.object.add_tags.call(null,ed,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"editor.force.unwrap","editor.force.unwrap",868495866)], null));

return lt.objs.notifos.set_msg_BANG_.call(null,"Wrapping off",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"timeout","timeout",-318625318),(2000)], null));
} else {
lt.object.remove_tags.call(null,ed,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"editor.force.unwrap","editor.force.unwrap",868495866)], null));

lt.object.add_tags.call(null,ed,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"editor.force.wrap","editor.force.wrap",-86243745)], null));

return lt.objs.notifos.set_msg_BANG_.call(null,"Wrapping on",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"timeout","timeout",-318625318),(2000)], null));
}
} else {
return null;
}
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.undo","editor.undo",504443764),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Undo",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
return lt.objs.editor.undo.call(null,ed);
} else {
return null;
}
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.redo","editor.redo",181793908),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Redo",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
return lt.objs.editor.redo.call(null,ed);
} else {
return null;
}
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.codemirror.command","editor.codemirror.command",-1907886107),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Execute a CodeMirror command",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function() { 
var G__16155__delegate = function (cmd,args){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
var temp__4657__auto____$1 = (CodeMirror.commands[cmd]);
if(cljs.core.truth_(temp__4657__auto____$1)){
var command = temp__4657__auto____$1;
if(cljs.core._EQ_.call(null,CodeMirror.Pass,cljs.core.apply.call(null,command,lt.objs.editor.__GT_cm_ed.call(null,ed),args))){
return lt.objs.keyboard.passthrough.call(null);
} else {
return null;
}
} else {
return null;
}
} else {
return null;
}
};
var G__16155 = function (cmd,var_args){
var args = null;
if (arguments.length > 1) {
var G__16156__i = 0, G__16156__a = new Array(arguments.length -  1);
while (G__16156__i < G__16156__a.length) {G__16156__a[G__16156__i] = arguments[G__16156__i + 1]; ++G__16156__i;}
  args = new cljs.core.IndexedSeq(G__16156__a,0);
} 
return G__16155__delegate.call(this,cmd,args);};
G__16155.cljs$lang$maxFixedArity = 1;
G__16155.cljs$lang$applyTo = (function (arglist__16157){
var cmd = cljs.core.first(arglist__16157);
var args = cljs.core.rest(arglist__16157);
return G__16155__delegate(cmd,args);
});
G__16155.cljs$core$IFn$_invoke$arity$variadic = G__16155__delegate;
return G__16155;
})()
], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.fold-code","editor.fold-code",942157511),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Fold code at cursor",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
return lt.objs.editor.fold_code.call(null,ed);
} else {
return null;
}
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.sublime.singleSelectionTop","editor.sublime.singleSelectionTop",-1261328997),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Set selection to top most cursor",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.objs.sidebar.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"editor.codemirror.command","editor.codemirror.command",-1907886107),"singleSelectionTop");
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.sublime.singleSelectionTop","editor.sublime.singleSelectionTop",-1261328997),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Clear multiple cursors",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.objs.sidebar.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"editor.codemirror.command","editor.codemirror.command",-1907886107),"singleSelectionTop");
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.sublime.insertLineAfter","editor.sublime.insertLineAfter",869252157),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Insert line after",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.objs.sidebar.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"editor.codemirror.command","editor.codemirror.command",-1907886107),"insertLineAfter");
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.sublime.insertLineBefore","editor.sublime.insertLineBefore",-1962678412),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Insert line before",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.objs.sidebar.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"editor.codemirror.command","editor.codemirror.command",-1907886107),"insertLineBefore");
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.sublime.selectNextOccurrence","editor.sublime.selectNextOccurrence",-1773949690),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Select next occurrence of word",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.objs.sidebar.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"editor.codemirror.command","editor.codemirror.command",-1907886107),"selectNextOccurrence");
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.sublime.selectBetweenBrackets","editor.sublime.selectBetweenBrackets",1350632557),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Select between brackets",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.objs.sidebar.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"editor.codemirror.command","editor.codemirror.command",-1907886107),"selectBetweenBrackets");
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.sublime.selectScope","editor.sublime.selectScope",-705112557),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Select scope",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.objs.sidebar.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"editor.codemirror.command","editor.codemirror.command",-1907886107),"selectScope");
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.sublime.goToBracket","editor.sublime.goToBracket",-112931683),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Go to bracket",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.objs.sidebar.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"editor.codemirror.command","editor.codemirror.command",-1907886107),"goToBracket");
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.sublime.swapLineUp","editor.sublime.swapLineUp",957266085),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Swap line up",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.objs.sidebar.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"editor.codemirror.command","editor.codemirror.command",-1907886107),"swapLineUp");
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.sublime.swapLineDown","editor.sublime.swapLineDown",507094052),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Swap line down",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.objs.sidebar.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"editor.codemirror.command","editor.codemirror.command",-1907886107),"swapLineDown");
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.sublime.joinLines","editor.sublime.joinLines",-985494004),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Join lines",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.objs.sidebar.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"editor.codemirror.command","editor.codemirror.command",-1907886107),"joinLines");
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.sublime.duplicateLine","editor.sublime.duplicateLine",-408794793),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Duplicate line",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.objs.sidebar.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"editor.codemirror.command","editor.codemirror.command",-1907886107),"duplicateLine");
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.sublime.sortLines","editor.sublime.sortLines",-2006204229),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Sort lines",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.objs.sidebar.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"editor.codemirror.command","editor.codemirror.command",-1907886107),"sortLines");
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.sublime.sortLinesInsensitive","editor.sublime.sortLinesInsensitive",-1487742640),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Sort lines insensitive",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.objs.sidebar.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"editor.codemirror.command","editor.codemirror.command",-1907886107),"sortLinesInsensitive");
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.sublime.selectLinesUpward","editor.sublime.selectLinesUpward",-1397379226),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Select lines upward with multiple cursors",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.objs.sidebar.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"editor.codemirror.command","editor.codemirror.command",-1907886107),"selectLinesUpward");
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.sublime.selectLinesDownward","editor.sublime.selectLinesDownward",-1737663943),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Select lines downward with multiple cursors",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.objs.sidebar.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"editor.codemirror.command","editor.codemirror.command",-1907886107),"selectLinesDownward");
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.sublime.splitSelectionByLine","editor.sublime.splitSelectionByLine",-1837819766),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Split selection into cursors per line",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.objs.sidebar.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"editor.codemirror.command","editor.codemirror.command",-1907886107),"splitSelectionByLine");
})], null));
