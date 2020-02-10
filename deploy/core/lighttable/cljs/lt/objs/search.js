// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.objs.search');
goog.require('cljs.core');
goog.require('lt.objs.command');
goog.require('lt.objs.notifos');
goog.require('lt.objs.platform');
goog.require('lt.objs.context');
goog.require('lt.objs.thread');
goog.require('lt.objs.proc');
goog.require('lt.objs.editor');
goog.require('crate.core');
goog.require('lt.object');
goog.require('lt.util.dom');
goog.require('lt.objs.workspace');
goog.require('lt.util.load');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.tabs');
goog.require('lt.objs.files');
goog.require('clojure.string');
goog.require('lt.util.js');
goog.require('crate.binding');
lt.objs.search.search_BANG_ = lt.objs.thread.thread_STAR_.call(null,(function() { 
var lt$objs$search$tfun19979__delegate = function (msg__8018__auto__,body__8019__auto__){
var args__8020__auto__ = cljs.core.map.call(null,cljs.reader.read_string_STAR_,body__8019__auto__);
var raise = ((function (args__8020__auto__){
return (function (obj__8021__auto__,k__8022__auto__,v__8023__auto__){
return _send(obj__8021__auto__,k__8022__auto__,cljs.core.pr_str.call(null,v__8023__auto__),"clj");
});})(args__8020__auto__))
;
return ((function (args__8020__auto__,raise){
return (function (obj_id,opts){
var replacer = require([cljs.core.str(ltpath),cljs.core.str("/core/node_modules/replace")].join(''));
var search = (function (){var temp__4655__auto__ = cljs.core.re_seq.call(null,/^\/(.+)\/$/,new cljs.core.Keyword(null,"search","search",1564939822).cljs$core$IFn$_invoke$arity$1(opts));
if(cljs.core.truth_(temp__4655__auto__)){
var pattern = temp__4655__auto__;
return (new RegExp(cljs.core.second.call(null,cljs.core.first.call(null,pattern))));
} else {
return new cljs.core.Keyword(null,"search","search",1564939822).cljs$core$IFn$_invoke$arity$1(opts);
}
})();
var final$ = replacer.call(null,cljs.core.clj__GT_js.call(null,new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"regex","regex",939488856),search,new cljs.core.Keyword(null,"exclude","exclude",-1230250334),(cljs.core.truth_(new cljs.core.Keyword(null,"exclude","exclude",-1230250334).cljs$core$IFn$_invoke$arity$1(opts))?(new RegExp(new cljs.core.Keyword(null,"exclude","exclude",-1230250334).cljs$core$IFn$_invoke$arity$1(opts))):null),new cljs.core.Keyword(null,"recursive","recursive",718885872),true,new cljs.core.Keyword(null,"ignoreCase","ignoreCase",2117309056),!(cljs.core.boolean$.call(null,cljs.core.re_seq.call(null,/[A-Z]/,new cljs.core.Keyword(null,"search","search",1564939822).cljs$core$IFn$_invoke$arity$1(opts)))),new cljs.core.Keyword(null,"replacement","replacement",-1836238839),new cljs.core.Keyword(null,"replacement","replacement",-1836238839).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"paths","paths",-1807389588),new cljs.core.Keyword(null,"paths","paths",-1807389588).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"result","result",1415092211),((function (replacer,search,args__8020__auto__,raise){
return (function (r){
return _send(obj_id,new cljs.core.Keyword(null,"result","result",1415092211),r);
});})(replacer,search,args__8020__auto__,raise))
], null)));
return raise.call(null,obj_id,new cljs.core.Keyword(null,"done-searching","done-searching",236523809),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"total","total",1916810418),final$.totalFiles,new cljs.core.Keyword(null,"time","time",1385887882),final$.time,new cljs.core.Keyword(null,"replace?","replace?",-877816403),cljs.core.boolean$.call(null,new cljs.core.Keyword(null,"replacement","replacement",-1836238839).cljs$core$IFn$_invoke$arity$1(opts))], null));
});})(args__8020__auto__,raise))
.apply(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("lt.macros","clj->js","lt.macros/clj->js",-1355263103,null)),(function (){var x__7627__auto__ = cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("clojure.core","cons","clojure.core/cons",534945327,null)),(function (){var x__7627__auto__ = cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,".-obj",".-obj",-2111595180,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("lt.macros","msg__8016__auto__","lt.macros/msg__8016__auto__",-386890926,null))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})(),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("lt.macros","args__8017__auto__","lt.macros/args__8017__auto__",1401972833,null))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})())));
};
var lt$objs$search$tfun19979 = function (msg__8018__auto__,var_args){
var body__8019__auto__ = null;
if (arguments.length > 1) {
var G__19980__i = 0, G__19980__a = new Array(arguments.length -  1);
while (G__19980__i < G__19980__a.length) {G__19980__a[G__19980__i] = arguments[G__19980__i + 1]; ++G__19980__i;}
  body__8019__auto__ = new cljs.core.IndexedSeq(G__19980__a,0);
} 
return lt$objs$search$tfun19979__delegate.call(this,msg__8018__auto__,body__8019__auto__);};
lt$objs$search$tfun19979.cljs$lang$maxFixedArity = 1;
lt$objs$search$tfun19979.cljs$lang$applyTo = (function (arglist__19981){
var msg__8018__auto__ = cljs.core.first(arglist__19981);
var body__8019__auto__ = cljs.core.rest(arglist__19981);
return lt$objs$search$tfun19979__delegate(msg__8018__auto__,body__8019__auto__);
});
lt$objs$search$tfun19979.cljs$core$IFn$_invoke$arity$variadic = lt$objs$search$tfun19979__delegate;
return lt$objs$search$tfun19979;
})()
);
lt.objs.search.result_threshold = (500);
if(typeof lt.objs.search.location !== 'undefined'){
} else {
lt.objs.search.location = (function (){var method_table__7718__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__7719__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var method_cache__7720__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__7721__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__7722__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),cljs.core.get_global_hierarchy.call(null));
return (new cljs.core.MultiFn(cljs.core.symbol.call(null,"lt.objs.search","location"),cljs.core.identity,new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__7722__auto__,method_table__7718__auto__,prefer_table__7719__auto__,method_cache__7720__auto__,cached_hierarchy__7721__auto__));
})();
}
cljs.core._add_method.call(null,lt.objs.search.location,"<workspace>",(function (_){
return cljs.core.apply.call(null,cljs.core.concat,cljs.core.juxt.call(null,new cljs.core.Keyword(null,"folders","folders",44248772),new cljs.core.Keyword(null,"files","files",-472457450)).call(null,lt.objs.workspace.serialize.call(null,cljs.core.deref.call(null,lt.objs.workspace.current_ws))));
}));
cljs.core._add_method.call(null,lt.objs.search.location,new cljs.core.Keyword(null,"default","default",-1987822328),(function (loc){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [loc], null);
}));
lt.objs.search.string__GT_loc = (function lt$objs$search$string__GT_loc(loc_str){
return cljs.core.mapcat.call(null,cljs.core.comp.call(null,lt.objs.search.location,clojure.string.trim),cljs.core.remove.call(null,cljs.core.empty_QMARK_,clojure.string.split.call(null,loc_str,",")));
});
lt.objs.search.__GT_res = (function lt$objs$search$__GT_res(this$){
return lt.util.dom.$.call(null,new cljs.core.Keyword(null,".res",".res",486554361),lt.object.__GT_content.call(null,this$));
});
/**
 * 
 */
lt.objs.search.__GT_entry = (function lt$objs$search$__GT_entry(r,file){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p.entry","p.entry",-474806675),crate.core.raw.call(null,[cljs.core.str("<span class='line'>"),cljs.core.str(r.line),cljs.core.str("</span><pre>"),cljs.core.str(r.text),cljs.core.str("</pre>")].join(''))], null));
var seq__19992_20002 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (){
lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"open-path","open-path",2082525233),file);

return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"go-to-line","go-to-line",-880192345),r.line);
});})(e__7942__auto__))
], null)));
var chunk__19993_20003 = null;
var count__19994_20004 = (0);
var i__19995_20005 = (0);
while(true){
if((i__19995_20005 < count__19994_20004)){
var vec__19996_20006 = cljs.core._nth.call(null,chunk__19993_20003,i__19995_20005);
var ev__7943__auto___20007 = cljs.core.nth.call(null,vec__19996_20006,(0),null);
var func__7944__auto___20008 = cljs.core.nth.call(null,vec__19996_20006,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___20007,func__7944__auto___20008);

var G__20009 = seq__19992_20002;
var G__20010 = chunk__19993_20003;
var G__20011 = count__19994_20004;
var G__20012 = (i__19995_20005 + (1));
seq__19992_20002 = G__20009;
chunk__19993_20003 = G__20010;
count__19994_20004 = G__20011;
i__19995_20005 = G__20012;
continue;
} else {
var temp__4657__auto___20013 = cljs.core.seq.call(null,seq__19992_20002);
if(temp__4657__auto___20013){
var seq__19992_20014__$1 = temp__4657__auto___20013;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__19992_20014__$1)){
var c__7604__auto___20015 = cljs.core.chunk_first.call(null,seq__19992_20014__$1);
var G__20016 = cljs.core.chunk_rest.call(null,seq__19992_20014__$1);
var G__20017 = c__7604__auto___20015;
var G__20018 = cljs.core.count.call(null,c__7604__auto___20015);
var G__20019 = (0);
seq__19992_20002 = G__20016;
chunk__19993_20003 = G__20017;
count__19994_20004 = G__20018;
i__19995_20005 = G__20019;
continue;
} else {
var vec__19999_20020 = cljs.core.first.call(null,seq__19992_20014__$1);
var ev__7943__auto___20021 = cljs.core.nth.call(null,vec__19999_20020,(0),null);
var func__7944__auto___20022 = cljs.core.nth.call(null,vec__19999_20020,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___20021,func__7944__auto___20022);

var G__20023 = cljs.core.next.call(null,seq__19992_20014__$1);
var G__20024 = null;
var G__20025 = (0);
var G__20026 = (0);
seq__19992_20002 = G__20023;
chunk__19993_20003 = G__20024;
count__19994_20004 = G__20025;
i__19995_20005 = G__20026;
continue;
}
} else {
}
}
break;
}

return e__7942__auto__;
});
/**
 * 
 */
lt.objs.search.__GT_result_item = (function lt$objs$search$__GT_result_item(r){
var e__7942__auto__ = crate.core.html.call(null,(function (){var file = r.file;
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p.path","p.path",-1088130932),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.file","span.file",1923176969),lt.objs.files.basename.call(null,file)], null),"(",lt.objs.files.parent.call(null,file),")"], null),(function (){var iter__7573__auto__ = ((function (file){
return (function lt$objs$search$__GT_result_item_$_iter__20041(s__20042){
return (new cljs.core.LazySeq(null,((function (file){
return (function (){
var s__20042__$1 = s__20042;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__20042__$1);
if(temp__4657__auto__){
var s__20042__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__20042__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__20042__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__20044 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__20043 = (0);
while(true){
if((i__20043 < size__7572__auto__)){
var r__$1 = cljs.core._nth.call(null,c__7571__auto__,i__20043);
cljs.core.chunk_append.call(null,b__20044,lt.objs.search.__GT_entry.call(null,r__$1,file));

var G__20055 = (i__20043 + (1));
i__20043 = G__20055;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__20044),lt$objs$search$__GT_result_item_$_iter__20041.call(null,cljs.core.chunk_rest.call(null,s__20042__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__20044),null);
}
} else {
var r__$1 = cljs.core.first.call(null,s__20042__$2);
return cljs.core.cons.call(null,lt.objs.search.__GT_entry.call(null,r__$1,file),lt$objs$search$__GT_result_item_$_iter__20041.call(null,cljs.core.rest.call(null,s__20042__$2)));
}
} else {
return null;
}
break;
}
});})(file))
,null,null));
});})(file))
;
return iter__7573__auto__.call(null,r.results);
})()], null);
})());
var seq__20045_20056 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),cljs.core.PersistentVector.EMPTY));
var chunk__20046_20057 = null;
var count__20047_20058 = (0);
var i__20048_20059 = (0);
while(true){
if((i__20048_20059 < count__20047_20058)){
var vec__20049_20060 = cljs.core._nth.call(null,chunk__20046_20057,i__20048_20059);
var ev__7943__auto___20061 = cljs.core.nth.call(null,vec__20049_20060,(0),null);
var func__7944__auto___20062 = cljs.core.nth.call(null,vec__20049_20060,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___20061,func__7944__auto___20062);

var G__20063 = seq__20045_20056;
var G__20064 = chunk__20046_20057;
var G__20065 = count__20047_20058;
var G__20066 = (i__20048_20059 + (1));
seq__20045_20056 = G__20063;
chunk__20046_20057 = G__20064;
count__20047_20058 = G__20065;
i__20048_20059 = G__20066;
continue;
} else {
var temp__4657__auto___20067 = cljs.core.seq.call(null,seq__20045_20056);
if(temp__4657__auto___20067){
var seq__20045_20068__$1 = temp__4657__auto___20067;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__20045_20068__$1)){
var c__7604__auto___20069 = cljs.core.chunk_first.call(null,seq__20045_20068__$1);
var G__20070 = cljs.core.chunk_rest.call(null,seq__20045_20068__$1);
var G__20071 = c__7604__auto___20069;
var G__20072 = cljs.core.count.call(null,c__7604__auto___20069);
var G__20073 = (0);
seq__20045_20056 = G__20070;
chunk__20046_20057 = G__20071;
count__20047_20058 = G__20072;
i__20048_20059 = G__20073;
continue;
} else {
var vec__20052_20074 = cljs.core.first.call(null,seq__20045_20068__$1);
var ev__7943__auto___20075 = cljs.core.nth.call(null,vec__20052_20074,(0),null);
var func__7944__auto___20076 = cljs.core.nth.call(null,vec__20052_20074,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___20075,func__7944__auto___20076);

var G__20077 = cljs.core.next.call(null,seq__20045_20068__$1);
var G__20078 = null;
var G__20079 = (0);
var G__20080 = (0);
seq__20045_20056 = G__20077;
chunk__20046_20057 = G__20078;
count__20047_20058 = G__20079;
i__20048_20059 = G__20080;
continue;
}
} else {
}
}
break;
}

return e__7942__auto__;
});
/**
 * 
 */
lt.objs.search.search_box = (function lt$objs$search$search_box(this$){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input.search","input.search",-420752064),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),"text",new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),"Search"], null)], null));
var seq__20091_20101 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"focus","focus",234677911),((function (e__7942__auto__){
return (function (){
lt.objs.context.in_BANG_.call(null,new cljs.core.Keyword(null,"searcher.search","searcher.search",924243949),this$);

return lt.util.dom.$.call(null,new cljs.core.Keyword(null,"input.search","input.search",-420752064),lt.object.__GT_content.call(null,this$)).select();
});})(e__7942__auto__))
,new cljs.core.Keyword(null,"blur","blur",-453500461),((function (e__7942__auto__){
return (function (){
return lt.objs.context.out_BANG_.call(null,new cljs.core.Keyword(null,"searcher.search","searcher.search",924243949));
});})(e__7942__auto__))
], null)));
var chunk__20092_20102 = null;
var count__20093_20103 = (0);
var i__20094_20104 = (0);
while(true){
if((i__20094_20104 < count__20093_20103)){
var vec__20095_20105 = cljs.core._nth.call(null,chunk__20092_20102,i__20094_20104);
var ev__7943__auto___20106 = cljs.core.nth.call(null,vec__20095_20105,(0),null);
var func__7944__auto___20107 = cljs.core.nth.call(null,vec__20095_20105,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___20106,func__7944__auto___20107);

var G__20108 = seq__20091_20101;
var G__20109 = chunk__20092_20102;
var G__20110 = count__20093_20103;
var G__20111 = (i__20094_20104 + (1));
seq__20091_20101 = G__20108;
chunk__20092_20102 = G__20109;
count__20093_20103 = G__20110;
i__20094_20104 = G__20111;
continue;
} else {
var temp__4657__auto___20112 = cljs.core.seq.call(null,seq__20091_20101);
if(temp__4657__auto___20112){
var seq__20091_20113__$1 = temp__4657__auto___20112;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__20091_20113__$1)){
var c__7604__auto___20114 = cljs.core.chunk_first.call(null,seq__20091_20113__$1);
var G__20115 = cljs.core.chunk_rest.call(null,seq__20091_20113__$1);
var G__20116 = c__7604__auto___20114;
var G__20117 = cljs.core.count.call(null,c__7604__auto___20114);
var G__20118 = (0);
seq__20091_20101 = G__20115;
chunk__20092_20102 = G__20116;
count__20093_20103 = G__20117;
i__20094_20104 = G__20118;
continue;
} else {
var vec__20098_20119 = cljs.core.first.call(null,seq__20091_20113__$1);
var ev__7943__auto___20120 = cljs.core.nth.call(null,vec__20098_20119,(0),null);
var func__7944__auto___20121 = cljs.core.nth.call(null,vec__20098_20119,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___20120,func__7944__auto___20121);

var G__20122 = cljs.core.next.call(null,seq__20091_20113__$1);
var G__20123 = null;
var G__20124 = (0);
var G__20125 = (0);
seq__20091_20101 = G__20122;
chunk__20092_20102 = G__20123;
count__20093_20103 = G__20124;
i__20094_20104 = G__20125;
continue;
}
} else {
}
}
break;
}

return e__7942__auto__;
});
/**
 * 
 */
lt.objs.search.replace_box = (function lt$objs$search$replace_box(this$){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input.replace","input.replace",-2146729607),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),"text",new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),"Replace"], null)], null));
var seq__20136_20146 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"focus","focus",234677911),((function (e__7942__auto__){
return (function (){
return lt.objs.context.in_BANG_.call(null,new cljs.core.Keyword(null,"searcher.replace","searcher.replace",1708147217),this$);
});})(e__7942__auto__))
,new cljs.core.Keyword(null,"blur","blur",-453500461),((function (e__7942__auto__){
return (function (){
return lt.objs.context.out_BANG_.call(null,new cljs.core.Keyword(null,"searcher.replace","searcher.replace",1708147217));
});})(e__7942__auto__))
], null)));
var chunk__20137_20147 = null;
var count__20138_20148 = (0);
var i__20139_20149 = (0);
while(true){
if((i__20139_20149 < count__20138_20148)){
var vec__20140_20150 = cljs.core._nth.call(null,chunk__20137_20147,i__20139_20149);
var ev__7943__auto___20151 = cljs.core.nth.call(null,vec__20140_20150,(0),null);
var func__7944__auto___20152 = cljs.core.nth.call(null,vec__20140_20150,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___20151,func__7944__auto___20152);

var G__20153 = seq__20136_20146;
var G__20154 = chunk__20137_20147;
var G__20155 = count__20138_20148;
var G__20156 = (i__20139_20149 + (1));
seq__20136_20146 = G__20153;
chunk__20137_20147 = G__20154;
count__20138_20148 = G__20155;
i__20139_20149 = G__20156;
continue;
} else {
var temp__4657__auto___20157 = cljs.core.seq.call(null,seq__20136_20146);
if(temp__4657__auto___20157){
var seq__20136_20158__$1 = temp__4657__auto___20157;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__20136_20158__$1)){
var c__7604__auto___20159 = cljs.core.chunk_first.call(null,seq__20136_20158__$1);
var G__20160 = cljs.core.chunk_rest.call(null,seq__20136_20158__$1);
var G__20161 = c__7604__auto___20159;
var G__20162 = cljs.core.count.call(null,c__7604__auto___20159);
var G__20163 = (0);
seq__20136_20146 = G__20160;
chunk__20137_20147 = G__20161;
count__20138_20148 = G__20162;
i__20139_20149 = G__20163;
continue;
} else {
var vec__20143_20164 = cljs.core.first.call(null,seq__20136_20158__$1);
var ev__7943__auto___20165 = cljs.core.nth.call(null,vec__20143_20164,(0),null);
var func__7944__auto___20166 = cljs.core.nth.call(null,vec__20143_20164,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___20165,func__7944__auto___20166);

var G__20167 = cljs.core.next.call(null,seq__20136_20158__$1);
var G__20168 = null;
var G__20169 = (0);
var G__20170 = (0);
seq__20136_20146 = G__20167;
chunk__20137_20147 = G__20168;
count__20138_20148 = G__20169;
i__20139_20149 = G__20170;
continue;
}
} else {
}
}
break;
}

return e__7942__auto__;
});
/**
 * 
 */
lt.objs.search.replace_all_button = (function lt$objs$search$replace_all_button(this$){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.replace","button.replace",1228073113),"Replace All"], null));
var seq__20181_20191 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (e){
return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"searcher.replace-all","searcher.replace-all",-1741077306));
});})(e__7942__auto__))
], null)));
var chunk__20182_20192 = null;
var count__20183_20193 = (0);
var i__20184_20194 = (0);
while(true){
if((i__20184_20194 < count__20183_20193)){
var vec__20185_20195 = cljs.core._nth.call(null,chunk__20182_20192,i__20184_20194);
var ev__7943__auto___20196 = cljs.core.nth.call(null,vec__20185_20195,(0),null);
var func__7944__auto___20197 = cljs.core.nth.call(null,vec__20185_20195,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___20196,func__7944__auto___20197);

var G__20198 = seq__20181_20191;
var G__20199 = chunk__20182_20192;
var G__20200 = count__20183_20193;
var G__20201 = (i__20184_20194 + (1));
seq__20181_20191 = G__20198;
chunk__20182_20192 = G__20199;
count__20183_20193 = G__20200;
i__20184_20194 = G__20201;
continue;
} else {
var temp__4657__auto___20202 = cljs.core.seq.call(null,seq__20181_20191);
if(temp__4657__auto___20202){
var seq__20181_20203__$1 = temp__4657__auto___20202;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__20181_20203__$1)){
var c__7604__auto___20204 = cljs.core.chunk_first.call(null,seq__20181_20203__$1);
var G__20205 = cljs.core.chunk_rest.call(null,seq__20181_20203__$1);
var G__20206 = c__7604__auto___20204;
var G__20207 = cljs.core.count.call(null,c__7604__auto___20204);
var G__20208 = (0);
seq__20181_20191 = G__20205;
chunk__20182_20192 = G__20206;
count__20183_20193 = G__20207;
i__20184_20194 = G__20208;
continue;
} else {
var vec__20188_20209 = cljs.core.first.call(null,seq__20181_20203__$1);
var ev__7943__auto___20210 = cljs.core.nth.call(null,vec__20188_20209,(0),null);
var func__7944__auto___20211 = cljs.core.nth.call(null,vec__20188_20209,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___20210,func__7944__auto___20211);

var G__20212 = cljs.core.next.call(null,seq__20181_20203__$1);
var G__20213 = null;
var G__20214 = (0);
var G__20215 = (0);
seq__20181_20191 = G__20212;
chunk__20182_20192 = G__20213;
count__20183_20193 = G__20214;
i__20184_20194 = G__20215;
continue;
}
} else {
}
}
break;
}

return e__7942__auto__;
});
/**
 * 
 */
lt.objs.search.location_box = (function lt$objs$search$location_box(this$){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input.loc","input.loc",-1347517100),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),"text",new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),"Locations",new cljs.core.Keyword(null,"value","value",305978217),"<workspace>"], null)], null));
var seq__20226_20236 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"focus","focus",234677911),((function (e__7942__auto__){
return (function (){
return lt.objs.context.in_BANG_.call(null,new cljs.core.Keyword(null,"searcher.location","searcher.location",-942262160),this$);
});})(e__7942__auto__))
,new cljs.core.Keyword(null,"blur","blur",-453500461),((function (e__7942__auto__){
return (function (){
return lt.objs.context.out_BANG_.call(null,new cljs.core.Keyword(null,"searcher.location","searcher.location",-942262160));
});})(e__7942__auto__))
], null)));
var chunk__20227_20237 = null;
var count__20228_20238 = (0);
var i__20229_20239 = (0);
while(true){
if((i__20229_20239 < count__20228_20238)){
var vec__20230_20240 = cljs.core._nth.call(null,chunk__20227_20237,i__20229_20239);
var ev__7943__auto___20241 = cljs.core.nth.call(null,vec__20230_20240,(0),null);
var func__7944__auto___20242 = cljs.core.nth.call(null,vec__20230_20240,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___20241,func__7944__auto___20242);

var G__20243 = seq__20226_20236;
var G__20244 = chunk__20227_20237;
var G__20245 = count__20228_20238;
var G__20246 = (i__20229_20239 + (1));
seq__20226_20236 = G__20243;
chunk__20227_20237 = G__20244;
count__20228_20238 = G__20245;
i__20229_20239 = G__20246;
continue;
} else {
var temp__4657__auto___20247 = cljs.core.seq.call(null,seq__20226_20236);
if(temp__4657__auto___20247){
var seq__20226_20248__$1 = temp__4657__auto___20247;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__20226_20248__$1)){
var c__7604__auto___20249 = cljs.core.chunk_first.call(null,seq__20226_20248__$1);
var G__20250 = cljs.core.chunk_rest.call(null,seq__20226_20248__$1);
var G__20251 = c__7604__auto___20249;
var G__20252 = cljs.core.count.call(null,c__7604__auto___20249);
var G__20253 = (0);
seq__20226_20236 = G__20250;
chunk__20227_20237 = G__20251;
count__20228_20238 = G__20252;
i__20229_20239 = G__20253;
continue;
} else {
var vec__20233_20254 = cljs.core.first.call(null,seq__20226_20248__$1);
var ev__7943__auto___20255 = cljs.core.nth.call(null,vec__20233_20254,(0),null);
var func__7944__auto___20256 = cljs.core.nth.call(null,vec__20233_20254,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___20255,func__7944__auto___20256);

var G__20257 = cljs.core.next.call(null,seq__20226_20248__$1);
var G__20258 = null;
var G__20259 = (0);
var G__20260 = (0);
seq__20226_20236 = G__20257;
chunk__20227_20237 = G__20258;
count__20228_20238 = G__20259;
i__20229_20239 = G__20260;
continue;
}
} else {
}
}
break;
}

return e__7942__auto__;
});
lt.objs.search.__GT_search_info = (function lt$objs$search$__GT_search_info(this$){
var search = lt.util.dom.$.call(null,new cljs.core.Keyword(null,".search",".search",-1559053770),lt.object.__GT_content.call(null,this$));
var replace = lt.util.dom.$.call(null,new cljs.core.Keyword(null,".replace",".replace",784859355),lt.object.__GT_content.call(null,this$));
var loc = lt.util.dom.$.call(null,new cljs.core.Keyword(null,".loc",".loc",-1431903218),lt.object.__GT_content.call(null,this$));
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"search","search",1564939822),lt.util.dom.val.call(null,search),new cljs.core.Keyword(null,"replace","replace",-786587770),lt.util.dom.val.call(null,replace),new cljs.core.Keyword(null,"loc","loc",-584284901),lt.util.dom.val.call(null,loc)], null);
});
/**
 * 
 */
lt.objs.search.__BEH__on_close = (function lt$objs$search$__BEH__on_close(this$){
return lt.objs.tabs.rem_BANG_.call(null,this$);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.search","on-close","lt.objs.search/on-close",-561118062),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"close","close",1835149582),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.search.__BEH__on_close);
/**
 * 
 */
lt.objs.search.__BEH__clear_BANG_ = (function lt$objs$search$__BEH__clear_BANG_(this$){
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"timeout","timeout",-318625318),null,new cljs.core.Keyword(null,"results","results",-1134170113),[],new cljs.core.Keyword(null,"result-count","result-count",-1827800573),(0),new cljs.core.Keyword("lt.objs.search","time","lt.objs.search/time",513909342),null,new cljs.core.Keyword("lt.objs.search","filesSearched","lt.objs.search/filesSearched",-1652046970),null,new cljs.core.Keyword(null,"position","position",-2011731912),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(-1)], null)], null));

return lt.util.dom.empty.call(null,lt.objs.search.__GT_res.call(null,this$));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.search","clear!","lt.objs.search/clear!",729186466),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"clear!","clear!",-144814418),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.search.__BEH__clear_BANG_);
/**
 * 
 */
lt.objs.search.__BEH__search_BANG_ = (function lt$objs$search$__BEH__search_BANG_(this$,search_info){
lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"clear!","clear!",-144814418));

var info = (function (){var or__6793__auto__ = search_info;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return lt.objs.search.__GT_search_info.call(null,this$);
}
})();
if(cljs.core.empty_QMARK_.call(null,new cljs.core.Keyword(null,"search","search",1564939822).cljs$core$IFn$_invoke$arity$1(info))){
return null;
} else {
lt.object.merge_BANG_.call(null,this$,info);

lt.objs.notifos.working.call(null,"Searching workspace...");

return lt.objs.search.search_BANG_.call(null,this$,cljs.core.assoc.call(null,info,new cljs.core.Keyword(null,"exclude","exclude",-1230250334),lt.objs.files.ignore_pattern.source,new cljs.core.Keyword(null,"paths","paths",-1807389588),lt.objs.search.string__GT_loc.call(null,new cljs.core.Keyword(null,"loc","loc",-584284901).cljs$core$IFn$_invoke$arity$1(info))));
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.search","search!","lt.objs.search/search!",-545162140),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"search!","search!",-612546952),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.search.__BEH__search_BANG_);
/**
 * 
 */
lt.objs.search.__BEH__replace_BANG_ = (function lt$objs$search$__BEH__replace_BANG_(this$){
lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"clear!","clear!",-144814418));

var info = lt.objs.search.__GT_search_info.call(null,this$);
if(cljs.core.empty_QMARK_.call(null,new cljs.core.Keyword(null,"search","search",1564939822).cljs$core$IFn$_invoke$arity$1(info))){
return null;
} else {
lt.object.merge_BANG_.call(null,this$,info);

lt.objs.notifos.working.call(null,"Replacing all in workspace...");

return lt.objs.search.search_BANG_.call(null,this$,cljs.core.assoc.call(null,info,new cljs.core.Keyword(null,"replacement","replacement",-1836238839),new cljs.core.Keyword(null,"replace","replace",-786587770).cljs$core$IFn$_invoke$arity$1(info),new cljs.core.Keyword(null,"exclude","exclude",-1230250334),lt.objs.files.ignore_pattern.source,new cljs.core.Keyword(null,"paths","paths",-1807389588),lt.objs.search.string__GT_loc.call(null,new cljs.core.Keyword(null,"loc","loc",-584284901).cljs$core$IFn$_invoke$arity$1(info))));
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.search","replace!","lt.objs.search/replace!",408410256),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"replace!","replace!",-1402959116),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.search.__BEH__replace_BANG_);
/**
 * 
 */
lt.objs.search.__BEH__done_searching = (function lt$objs$search$__BEH__done_searching(this$,info){
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("lt.objs.search","time","lt.objs.search/time",513909342),(new cljs.core.Keyword(null,"time","time",1385887882).cljs$core$IFn$_invoke$arity$1(info) / (1000)),new cljs.core.Keyword("lt.objs.search","filesSearched","lt.objs.search/filesSearched",-1652046970),new cljs.core.Keyword(null,"total","total",1916810418).cljs$core$IFn$_invoke$arity$1(info)], null));

if(cljs.core.truth_(new cljs.core.Keyword(null,"replace?","replace?",-877816403).cljs$core$IFn$_invoke$arity$1(info))){
lt.objs.notifos.done_working.call(null,[cljs.core.str("Replaced "),cljs.core.str(new cljs.core.Keyword(null,"result-count","result-count",-1827800573).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))),cljs.core.str(" results in "),cljs.core.str((new cljs.core.Keyword(null,"time","time",1385887882).cljs$core$IFn$_invoke$arity$1(info) / (1000))),cljs.core.str("s.")].join(''));

return lt.util.dom.empty.call(null,lt.objs.search.__GT_res.call(null,this$));
} else {
return lt.objs.notifos.done_working.call(null,[cljs.core.str("Found "),cljs.core.str(new cljs.core.Keyword(null,"result-count","result-count",-1827800573).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))),cljs.core.str(" results searching "),cljs.core.str(new cljs.core.Keyword(null,"total","total",1916810418).cljs$core$IFn$_invoke$arity$1(info)),cljs.core.str(" files in "),cljs.core.str((new cljs.core.Keyword(null,"time","time",1385887882).cljs$core$IFn$_invoke$arity$1(info) / (1000))),cljs.core.str("s.")].join(''));
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.search","done-searching","lt.objs.search/done-searching",1512202037),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"done-searching","done-searching",236523809),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.search.__BEH__done_searching);
/**
 * 
 */
lt.objs.search.__BEH__next_BANG_ = (function lt$objs$search$__BEH__next_BANG_(this$){
if((new cljs.core.Keyword(null,"results","results",-1134170113).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)).length > (0))){
var all = new cljs.core.Keyword(null,"results","results",-1134170113).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$));
var vec__20267 = new cljs.core.Keyword(null,"position","position",-2011731912).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$));
var file = cljs.core.nth.call(null,vec__20267,(0),null);
var result = cljs.core.nth.call(null,vec__20267,(1),null);
var cur = (all[file]);
var vec__20270 = ((((result + (1)) >= cur.results.length))?((((file + (1)) >= all.length))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0)], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(file + (1)),(0)], null)):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [file,(result + (1))], null));
var file__$1 = cljs.core.nth.call(null,vec__20270,(0),null);
var result__$1 = cljs.core.nth.call(null,vec__20270,(1),null);
var neue = (all[file__$1]);
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"position","position",-2011731912),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [file__$1,result__$1], null)], null));

lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"open-path","open-path",2082525233),neue.file);

return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"go-to-line","go-to-line",-880192345),(neue.results[result__$1]).line);
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.search","next!","lt.objs.search/next!",-1908798479),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"next!","next!",977491453),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.search.__BEH__next_BANG_);
/**
 * 
 */
lt.objs.search.__BEH__prev_BANG_ = (function lt$objs$search$__BEH__prev_BANG_(this$){
if((new cljs.core.Keyword(null,"results","results",-1134170113).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)).length > (0))){
var all = new cljs.core.Keyword(null,"results","results",-1134170113).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$));
var vec__20279 = new cljs.core.Keyword(null,"position","position",-2011731912).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$));
var file = cljs.core.nth.call(null,vec__20279,(0),null);
var result = cljs.core.nth.call(null,vec__20279,(1),null);
var cur = (all[file]);
var vec__20282 = ((((result - (1)) < (0)))?((((file - (1)) < (0)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(all.length - (1)),((all[(all.length - (1))]).results.length - (1))], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(file - (1)),((all[(file - (1))]).results.length - (1))], null)):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [file,(result - (1))], null));
var file__$1 = cljs.core.nth.call(null,vec__20282,(0),null);
var result__$1 = cljs.core.nth.call(null,vec__20282,(1),null);
var neue = (new cljs.core.Keyword(null,"results","results",-1134170113).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))[file__$1]);
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"position","position",-2011731912),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [file__$1,result__$1], null)], null));

lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"open-path","open-path",2082525233),neue.file);

return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"go-to-line","go-to-line",-880192345),(neue.results[result__$1]).line);
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.search","prev!","lt.objs.search/prev!",-1591209924),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"prev!","prev!",-1927307736),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.search.__BEH__prev_BANG_);
/**
 * 
 */
lt.objs.search.__BEH__on_result = (function lt$objs$search$__BEH__on_result(this$,result){
var total = cljs.core.count.call(null,result.results);
var result__$1 = (function (){var obj20288 = {"file":result.file,"results":result.results.slice((0),(lt.objs.search.result_threshold - new cljs.core.Keyword(null,"result-count","result-count",-1827800573).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))))};
return obj20288;
})()
;
if((new cljs.core.Keyword(null,"result-count","result-count",-1827800573).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)) < lt.objs.search.result_threshold)){
lt.util.dom.append.call(null,lt.objs.search.__GT_res.call(null,this$),lt.objs.search.__GT_result_item.call(null,result__$1));
} else {
}

new cljs.core.Keyword(null,"results","results",-1134170113).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)).push(result__$1);

return lt.object.update_BANG_.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"result-count","result-count",-1827800573)], null),cljs.core._PLUS_,total);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.search","on-result","lt.objs.search/on-result",-1771857130),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"result","result",1415092211),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.search.__BEH__on_result);
/**
 * 
 */
lt.objs.search.__BEH__focus = (function lt$objs$search$__BEH__focus(this$){
return lt.util.dom.$.call(null,new cljs.core.Keyword(null,".search",".search",-1559053770),lt.object.__GT_content.call(null,this$)).focus();
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.search","focus","lt.objs.search/focus",-101083013),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"focus!","focus!",-1344984927),null,new cljs.core.Keyword(null,"show","show",-576705889),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.search.__BEH__focus);
lt.objs.search.result_count = (function lt$objs$search$result_count(this$){
return cljs.core._conj.call(null,(function (){var x__7627__auto__ = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),new cljs.core.Keyword(null,"result-count","result-count",-1827800573).cljs$core$IFn$_invoke$arity$1(this$)," results"], null);
return cljs.core._conj.call(null,(function (){var x__7627__auto____$1 = (((new cljs.core.Keyword(null,"result-count","result-count",-1827800573).cljs$core$IFn$_invoke$arity$1(this$) > lt.objs.search.result_threshold))?cljs.core._conj.call(null,(function (){var x__7627__auto____$1 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),lt.objs.search.result_threshold], null);
return cljs.core._conj.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,")"),x__7627__auto____$1);
})()," (showing "):null);
return cljs.core._conj.call(null,(function (){var x__7627__auto____$2 = (cljs.core.truth_(new cljs.core.Keyword("lt.objs.search","time","lt.objs.search/time",513909342).cljs$core$IFn$_invoke$arity$1(this$))?cljs.core._conj.call(null,(function (){var x__7627__auto____$2 = new cljs.core.Keyword("lt.objs.search","time","lt.objs.search/time",513909342).cljs$core$IFn$_invoke$arity$1(this$);
return cljs.core._conj.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,"s"),x__7627__auto____$2);
})()," in "):null);
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto____$2);
})(),x__7627__auto____$1);
})(),x__7627__auto__);
})(),"Found  ");
});
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.search","workspace-search","lt.objs.search/workspace-search",1230671354),new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"searcher","searcher",1973992822),null], null), null),new cljs.core.Keyword(null,"results","results",-1134170113),[],new cljs.core.Keyword(null,"name","name",1843675177),"Search results",new cljs.core.Keyword(null,"init","init",-1875481434),(function (this$){
lt.object.add_tags.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.truth_(lt.objs.platform.win_QMARK_.call(null))?new cljs.core.Keyword(null,"searcher.win","searcher.win",359313306):new cljs.core.Keyword(null,"searcher.unix","searcher.unix",296730760))], null));

return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.search-results","div.search-results",1319364942),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul.res","ul.res",-1425780102)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.searcher","div.searcher",455919193),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),crate.binding.bound.call(null,this$,lt.objs.search.result_count)], null),lt.objs.search.search_box.call(null,this$),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),lt.objs.search.replace_box.call(null,this$),lt.objs.search.replace_all_button.call(null,this$)], null),lt.objs.search.location_box.call(null,this$)], null)], null);
}));
lt.objs.search.searcher = lt.object.create.call(null,new cljs.core.Keyword("lt.objs.search","workspace-search","lt.objs.search/workspace-search",1230671354));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"searcher.search","searcher.search",924243949),new cljs.core.Keyword(null,"desc","desc",2093485764),"Searcher: Execute search",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (info){
var info__$1 = (function (){var or__6793__auto__ = info;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return lt.objs.search.__GT_search_info.call(null,lt.objs.search.searcher);
}
})();
return lt.object.raise.call(null,lt.objs.search.searcher,new cljs.core.Keyword(null,"search!","search!",-612546952),info__$1);
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"searcher.show","searcher.show",2051366452),new cljs.core.Keyword(null,"desc","desc",2093485764),"Searcher: Show",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto___20289 = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto___20289)){
var e_20290 = temp__4657__auto___20289;
var temp__4657__auto___20291__$1 = lt.objs.editor.selection.call(null,e_20290);
if(cljs.core.truth_(temp__4657__auto___20291__$1)){
var sel_20292 = temp__4657__auto___20291__$1;
if(clojure.string.blank_QMARK_.call(null,sel_20292)){
} else {
var search_20293 = lt.util.dom.$.call(null,new cljs.core.Keyword(null,".search",".search",-1559053770),lt.object.__GT_content.call(null,lt.objs.search.searcher));
lt.util.dom.val.call(null,search_20293,sel_20292);
}
} else {
}
} else {
}

return lt.objs.tabs.add_or_focus_BANG_.call(null,lt.objs.search.searcher);
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"searcher.next","searcher.next",1902753329),new cljs.core.Keyword(null,"desc","desc",2093485764),"Searcher: Next result",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.object.raise.call(null,lt.objs.search.searcher,new cljs.core.Keyword(null,"next!","next!",977491453));
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"searcher.prev","searcher.prev",1512932497),new cljs.core.Keyword(null,"desc","desc",2093485764),"Searcher: Prev result",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.object.raise.call(null,lt.objs.search.searcher,new cljs.core.Keyword(null,"prev!","prev!",-1927307736));
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"searcher.replace-all","searcher.replace-all",-1741077306),new cljs.core.Keyword(null,"desc","desc",2093485764),"Searcher: Replace all",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.object.raise.call(null,lt.objs.search.searcher,new cljs.core.Keyword(null,"replace!","replace!",-1402959116));
})], null));
