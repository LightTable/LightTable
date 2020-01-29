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
lt.objs.search.search_BANG_ = lt.objs.thread.thread_STAR_.call(null,(function lt$objs$search$tfun19973(){
console.log("BACKGROUND:");

console.log("ARGS:",arguments);

console.log("ARR:",argsArray(arguments));

var orig__8016__auto__ = argsArray(arguments);
var msg__8017__auto__ = orig__8016__auto__.shift();
var args__8018__auto__ = orig__8016__auto__.map(cljs.reader.read_string);
var raise = ((function (orig__8016__auto__,msg__8017__auto__,args__8018__auto__){
return (function (obj__8019__auto__,k__8020__auto__,v__8021__auto__){
return _send(obj__8019__auto__,k__8020__auto__,cljs.core.pr_str.call(null,v__8021__auto__),"clj");
});})(orig__8016__auto__,msg__8017__auto__,args__8018__auto__))
;
console.log("MAPARG:",cljs.core.pr_str.call(null,cljs.core.cons.call(null,msg__8017__auto__.obj,args__8018__auto__)),cljs.core.pr_str.call(null,args__8018__auto__));

console.log("MAPARG2:",cljs.core.pr_str.call(null,cljs.core.to_array.call(null,cljs.core.cons.call(null,msg__8017__auto__.obj,args__8018__auto__))),cljs.core.pr_str.call(null,args__8018__auto__));

return ((function (orig__8016__auto__,msg__8017__auto__,args__8018__auto__,raise){
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
var final$ = replacer.call(null,cljs.core.clj__GT_js.call(null,new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"regex","regex",939488856),search,new cljs.core.Keyword(null,"exclude","exclude",-1230250334),(cljs.core.truth_(new cljs.core.Keyword(null,"exclude","exclude",-1230250334).cljs$core$IFn$_invoke$arity$1(opts))?(new RegExp(new cljs.core.Keyword(null,"exclude","exclude",-1230250334).cljs$core$IFn$_invoke$arity$1(opts))):null),new cljs.core.Keyword(null,"recursive","recursive",718885872),true,new cljs.core.Keyword(null,"ignoreCase","ignoreCase",2117309056),!(cljs.core.boolean$.call(null,cljs.core.re_seq.call(null,/[A-Z]/,new cljs.core.Keyword(null,"search","search",1564939822).cljs$core$IFn$_invoke$arity$1(opts)))),new cljs.core.Keyword(null,"replacement","replacement",-1836238839),new cljs.core.Keyword(null,"replacement","replacement",-1836238839).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"paths","paths",-1807389588),new cljs.core.Keyword(null,"paths","paths",-1807389588).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"result","result",1415092211),((function (replacer,search,orig__8016__auto__,msg__8017__auto__,args__8018__auto__,raise){
return (function (r){
return _send(obj_id,new cljs.core.Keyword(null,"result","result",1415092211),r);
});})(replacer,search,orig__8016__auto__,msg__8017__auto__,args__8018__auto__,raise))
], null)));
return raise.call(null,obj_id,new cljs.core.Keyword(null,"done-searching","done-searching",236523809),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"total","total",1916810418),final$.totalFiles,new cljs.core.Keyword(null,"time","time",1385887882),final$.time,new cljs.core.Keyword(null,"replace?","replace?",-877816403),cljs.core.boolean$.call(null,new cljs.core.Keyword(null,"replacement","replacement",-1836238839).cljs$core$IFn$_invoke$arity$1(opts))], null));
});})(orig__8016__auto__,msg__8017__auto__,args__8018__auto__,raise))
.apply(null,cljs.core.to_array.call(null,cljs.core.cons.call(null,msg__8017__auto__.obj,args__8018__auto__)));
}));
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
var seq__19984_19994 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (){
lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"open-path","open-path",2082525233),file);

return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"go-to-line","go-to-line",-880192345),r.line);
});})(e__7942__auto__))
], null)));
var chunk__19985_19995 = null;
var count__19986_19996 = (0);
var i__19987_19997 = (0);
while(true){
if((i__19987_19997 < count__19986_19996)){
var vec__19988_19998 = cljs.core._nth.call(null,chunk__19985_19995,i__19987_19997);
var ev__7943__auto___19999 = cljs.core.nth.call(null,vec__19988_19998,(0),null);
var func__7944__auto___20000 = cljs.core.nth.call(null,vec__19988_19998,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___19999,func__7944__auto___20000);

var G__20001 = seq__19984_19994;
var G__20002 = chunk__19985_19995;
var G__20003 = count__19986_19996;
var G__20004 = (i__19987_19997 + (1));
seq__19984_19994 = G__20001;
chunk__19985_19995 = G__20002;
count__19986_19996 = G__20003;
i__19987_19997 = G__20004;
continue;
} else {
var temp__4657__auto___20005 = cljs.core.seq.call(null,seq__19984_19994);
if(temp__4657__auto___20005){
var seq__19984_20006__$1 = temp__4657__auto___20005;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__19984_20006__$1)){
var c__7604__auto___20007 = cljs.core.chunk_first.call(null,seq__19984_20006__$1);
var G__20008 = cljs.core.chunk_rest.call(null,seq__19984_20006__$1);
var G__20009 = c__7604__auto___20007;
var G__20010 = cljs.core.count.call(null,c__7604__auto___20007);
var G__20011 = (0);
seq__19984_19994 = G__20008;
chunk__19985_19995 = G__20009;
count__19986_19996 = G__20010;
i__19987_19997 = G__20011;
continue;
} else {
var vec__19991_20012 = cljs.core.first.call(null,seq__19984_20006__$1);
var ev__7943__auto___20013 = cljs.core.nth.call(null,vec__19991_20012,(0),null);
var func__7944__auto___20014 = cljs.core.nth.call(null,vec__19991_20012,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___20013,func__7944__auto___20014);

var G__20015 = cljs.core.next.call(null,seq__19984_20006__$1);
var G__20016 = null;
var G__20017 = (0);
var G__20018 = (0);
seq__19984_19994 = G__20015;
chunk__19985_19995 = G__20016;
count__19986_19996 = G__20017;
i__19987_19997 = G__20018;
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
return (function lt$objs$search$__GT_result_item_$_iter__20033(s__20034){
return (new cljs.core.LazySeq(null,((function (file){
return (function (){
var s__20034__$1 = s__20034;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__20034__$1);
if(temp__4657__auto__){
var s__20034__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__20034__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__20034__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__20036 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__20035 = (0);
while(true){
if((i__20035 < size__7572__auto__)){
var r__$1 = cljs.core._nth.call(null,c__7571__auto__,i__20035);
cljs.core.chunk_append.call(null,b__20036,lt.objs.search.__GT_entry.call(null,r__$1,file));

var G__20047 = (i__20035 + (1));
i__20035 = G__20047;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__20036),lt$objs$search$__GT_result_item_$_iter__20033.call(null,cljs.core.chunk_rest.call(null,s__20034__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__20036),null);
}
} else {
var r__$1 = cljs.core.first.call(null,s__20034__$2);
return cljs.core.cons.call(null,lt.objs.search.__GT_entry.call(null,r__$1,file),lt$objs$search$__GT_result_item_$_iter__20033.call(null,cljs.core.rest.call(null,s__20034__$2)));
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
var seq__20037_20048 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),cljs.core.PersistentVector.EMPTY));
var chunk__20038_20049 = null;
var count__20039_20050 = (0);
var i__20040_20051 = (0);
while(true){
if((i__20040_20051 < count__20039_20050)){
var vec__20041_20052 = cljs.core._nth.call(null,chunk__20038_20049,i__20040_20051);
var ev__7943__auto___20053 = cljs.core.nth.call(null,vec__20041_20052,(0),null);
var func__7944__auto___20054 = cljs.core.nth.call(null,vec__20041_20052,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___20053,func__7944__auto___20054);

var G__20055 = seq__20037_20048;
var G__20056 = chunk__20038_20049;
var G__20057 = count__20039_20050;
var G__20058 = (i__20040_20051 + (1));
seq__20037_20048 = G__20055;
chunk__20038_20049 = G__20056;
count__20039_20050 = G__20057;
i__20040_20051 = G__20058;
continue;
} else {
var temp__4657__auto___20059 = cljs.core.seq.call(null,seq__20037_20048);
if(temp__4657__auto___20059){
var seq__20037_20060__$1 = temp__4657__auto___20059;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__20037_20060__$1)){
var c__7604__auto___20061 = cljs.core.chunk_first.call(null,seq__20037_20060__$1);
var G__20062 = cljs.core.chunk_rest.call(null,seq__20037_20060__$1);
var G__20063 = c__7604__auto___20061;
var G__20064 = cljs.core.count.call(null,c__7604__auto___20061);
var G__20065 = (0);
seq__20037_20048 = G__20062;
chunk__20038_20049 = G__20063;
count__20039_20050 = G__20064;
i__20040_20051 = G__20065;
continue;
} else {
var vec__20044_20066 = cljs.core.first.call(null,seq__20037_20060__$1);
var ev__7943__auto___20067 = cljs.core.nth.call(null,vec__20044_20066,(0),null);
var func__7944__auto___20068 = cljs.core.nth.call(null,vec__20044_20066,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___20067,func__7944__auto___20068);

var G__20069 = cljs.core.next.call(null,seq__20037_20060__$1);
var G__20070 = null;
var G__20071 = (0);
var G__20072 = (0);
seq__20037_20048 = G__20069;
chunk__20038_20049 = G__20070;
count__20039_20050 = G__20071;
i__20040_20051 = G__20072;
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
var seq__20083_20093 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"focus","focus",234677911),((function (e__7942__auto__){
return (function (){
lt.objs.context.in_BANG_.call(null,new cljs.core.Keyword(null,"searcher.search","searcher.search",924243949),this$);

return lt.util.dom.$.call(null,new cljs.core.Keyword(null,"input.search","input.search",-420752064),lt.object.__GT_content.call(null,this$)).select();
});})(e__7942__auto__))
,new cljs.core.Keyword(null,"blur","blur",-453500461),((function (e__7942__auto__){
return (function (){
return lt.objs.context.out_BANG_.call(null,new cljs.core.Keyword(null,"searcher.search","searcher.search",924243949));
});})(e__7942__auto__))
], null)));
var chunk__20084_20094 = null;
var count__20085_20095 = (0);
var i__20086_20096 = (0);
while(true){
if((i__20086_20096 < count__20085_20095)){
var vec__20087_20097 = cljs.core._nth.call(null,chunk__20084_20094,i__20086_20096);
var ev__7943__auto___20098 = cljs.core.nth.call(null,vec__20087_20097,(0),null);
var func__7944__auto___20099 = cljs.core.nth.call(null,vec__20087_20097,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___20098,func__7944__auto___20099);

var G__20100 = seq__20083_20093;
var G__20101 = chunk__20084_20094;
var G__20102 = count__20085_20095;
var G__20103 = (i__20086_20096 + (1));
seq__20083_20093 = G__20100;
chunk__20084_20094 = G__20101;
count__20085_20095 = G__20102;
i__20086_20096 = G__20103;
continue;
} else {
var temp__4657__auto___20104 = cljs.core.seq.call(null,seq__20083_20093);
if(temp__4657__auto___20104){
var seq__20083_20105__$1 = temp__4657__auto___20104;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__20083_20105__$1)){
var c__7604__auto___20106 = cljs.core.chunk_first.call(null,seq__20083_20105__$1);
var G__20107 = cljs.core.chunk_rest.call(null,seq__20083_20105__$1);
var G__20108 = c__7604__auto___20106;
var G__20109 = cljs.core.count.call(null,c__7604__auto___20106);
var G__20110 = (0);
seq__20083_20093 = G__20107;
chunk__20084_20094 = G__20108;
count__20085_20095 = G__20109;
i__20086_20096 = G__20110;
continue;
} else {
var vec__20090_20111 = cljs.core.first.call(null,seq__20083_20105__$1);
var ev__7943__auto___20112 = cljs.core.nth.call(null,vec__20090_20111,(0),null);
var func__7944__auto___20113 = cljs.core.nth.call(null,vec__20090_20111,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___20112,func__7944__auto___20113);

var G__20114 = cljs.core.next.call(null,seq__20083_20105__$1);
var G__20115 = null;
var G__20116 = (0);
var G__20117 = (0);
seq__20083_20093 = G__20114;
chunk__20084_20094 = G__20115;
count__20085_20095 = G__20116;
i__20086_20096 = G__20117;
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
var seq__20128_20138 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"focus","focus",234677911),((function (e__7942__auto__){
return (function (){
return lt.objs.context.in_BANG_.call(null,new cljs.core.Keyword(null,"searcher.replace","searcher.replace",1708147217),this$);
});})(e__7942__auto__))
,new cljs.core.Keyword(null,"blur","blur",-453500461),((function (e__7942__auto__){
return (function (){
return lt.objs.context.out_BANG_.call(null,new cljs.core.Keyword(null,"searcher.replace","searcher.replace",1708147217));
});})(e__7942__auto__))
], null)));
var chunk__20129_20139 = null;
var count__20130_20140 = (0);
var i__20131_20141 = (0);
while(true){
if((i__20131_20141 < count__20130_20140)){
var vec__20132_20142 = cljs.core._nth.call(null,chunk__20129_20139,i__20131_20141);
var ev__7943__auto___20143 = cljs.core.nth.call(null,vec__20132_20142,(0),null);
var func__7944__auto___20144 = cljs.core.nth.call(null,vec__20132_20142,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___20143,func__7944__auto___20144);

var G__20145 = seq__20128_20138;
var G__20146 = chunk__20129_20139;
var G__20147 = count__20130_20140;
var G__20148 = (i__20131_20141 + (1));
seq__20128_20138 = G__20145;
chunk__20129_20139 = G__20146;
count__20130_20140 = G__20147;
i__20131_20141 = G__20148;
continue;
} else {
var temp__4657__auto___20149 = cljs.core.seq.call(null,seq__20128_20138);
if(temp__4657__auto___20149){
var seq__20128_20150__$1 = temp__4657__auto___20149;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__20128_20150__$1)){
var c__7604__auto___20151 = cljs.core.chunk_first.call(null,seq__20128_20150__$1);
var G__20152 = cljs.core.chunk_rest.call(null,seq__20128_20150__$1);
var G__20153 = c__7604__auto___20151;
var G__20154 = cljs.core.count.call(null,c__7604__auto___20151);
var G__20155 = (0);
seq__20128_20138 = G__20152;
chunk__20129_20139 = G__20153;
count__20130_20140 = G__20154;
i__20131_20141 = G__20155;
continue;
} else {
var vec__20135_20156 = cljs.core.first.call(null,seq__20128_20150__$1);
var ev__7943__auto___20157 = cljs.core.nth.call(null,vec__20135_20156,(0),null);
var func__7944__auto___20158 = cljs.core.nth.call(null,vec__20135_20156,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___20157,func__7944__auto___20158);

var G__20159 = cljs.core.next.call(null,seq__20128_20150__$1);
var G__20160 = null;
var G__20161 = (0);
var G__20162 = (0);
seq__20128_20138 = G__20159;
chunk__20129_20139 = G__20160;
count__20130_20140 = G__20161;
i__20131_20141 = G__20162;
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
var seq__20173_20183 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (e){
return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"searcher.replace-all","searcher.replace-all",-1741077306));
});})(e__7942__auto__))
], null)));
var chunk__20174_20184 = null;
var count__20175_20185 = (0);
var i__20176_20186 = (0);
while(true){
if((i__20176_20186 < count__20175_20185)){
var vec__20177_20187 = cljs.core._nth.call(null,chunk__20174_20184,i__20176_20186);
var ev__7943__auto___20188 = cljs.core.nth.call(null,vec__20177_20187,(0),null);
var func__7944__auto___20189 = cljs.core.nth.call(null,vec__20177_20187,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___20188,func__7944__auto___20189);

var G__20190 = seq__20173_20183;
var G__20191 = chunk__20174_20184;
var G__20192 = count__20175_20185;
var G__20193 = (i__20176_20186 + (1));
seq__20173_20183 = G__20190;
chunk__20174_20184 = G__20191;
count__20175_20185 = G__20192;
i__20176_20186 = G__20193;
continue;
} else {
var temp__4657__auto___20194 = cljs.core.seq.call(null,seq__20173_20183);
if(temp__4657__auto___20194){
var seq__20173_20195__$1 = temp__4657__auto___20194;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__20173_20195__$1)){
var c__7604__auto___20196 = cljs.core.chunk_first.call(null,seq__20173_20195__$1);
var G__20197 = cljs.core.chunk_rest.call(null,seq__20173_20195__$1);
var G__20198 = c__7604__auto___20196;
var G__20199 = cljs.core.count.call(null,c__7604__auto___20196);
var G__20200 = (0);
seq__20173_20183 = G__20197;
chunk__20174_20184 = G__20198;
count__20175_20185 = G__20199;
i__20176_20186 = G__20200;
continue;
} else {
var vec__20180_20201 = cljs.core.first.call(null,seq__20173_20195__$1);
var ev__7943__auto___20202 = cljs.core.nth.call(null,vec__20180_20201,(0),null);
var func__7944__auto___20203 = cljs.core.nth.call(null,vec__20180_20201,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___20202,func__7944__auto___20203);

var G__20204 = cljs.core.next.call(null,seq__20173_20195__$1);
var G__20205 = null;
var G__20206 = (0);
var G__20207 = (0);
seq__20173_20183 = G__20204;
chunk__20174_20184 = G__20205;
count__20175_20185 = G__20206;
i__20176_20186 = G__20207;
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
var seq__20218_20228 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"focus","focus",234677911),((function (e__7942__auto__){
return (function (){
return lt.objs.context.in_BANG_.call(null,new cljs.core.Keyword(null,"searcher.location","searcher.location",-942262160),this$);
});})(e__7942__auto__))
,new cljs.core.Keyword(null,"blur","blur",-453500461),((function (e__7942__auto__){
return (function (){
return lt.objs.context.out_BANG_.call(null,new cljs.core.Keyword(null,"searcher.location","searcher.location",-942262160));
});})(e__7942__auto__))
], null)));
var chunk__20219_20229 = null;
var count__20220_20230 = (0);
var i__20221_20231 = (0);
while(true){
if((i__20221_20231 < count__20220_20230)){
var vec__20222_20232 = cljs.core._nth.call(null,chunk__20219_20229,i__20221_20231);
var ev__7943__auto___20233 = cljs.core.nth.call(null,vec__20222_20232,(0),null);
var func__7944__auto___20234 = cljs.core.nth.call(null,vec__20222_20232,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___20233,func__7944__auto___20234);

var G__20235 = seq__20218_20228;
var G__20236 = chunk__20219_20229;
var G__20237 = count__20220_20230;
var G__20238 = (i__20221_20231 + (1));
seq__20218_20228 = G__20235;
chunk__20219_20229 = G__20236;
count__20220_20230 = G__20237;
i__20221_20231 = G__20238;
continue;
} else {
var temp__4657__auto___20239 = cljs.core.seq.call(null,seq__20218_20228);
if(temp__4657__auto___20239){
var seq__20218_20240__$1 = temp__4657__auto___20239;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__20218_20240__$1)){
var c__7604__auto___20241 = cljs.core.chunk_first.call(null,seq__20218_20240__$1);
var G__20242 = cljs.core.chunk_rest.call(null,seq__20218_20240__$1);
var G__20243 = c__7604__auto___20241;
var G__20244 = cljs.core.count.call(null,c__7604__auto___20241);
var G__20245 = (0);
seq__20218_20228 = G__20242;
chunk__20219_20229 = G__20243;
count__20220_20230 = G__20244;
i__20221_20231 = G__20245;
continue;
} else {
var vec__20225_20246 = cljs.core.first.call(null,seq__20218_20240__$1);
var ev__7943__auto___20247 = cljs.core.nth.call(null,vec__20225_20246,(0),null);
var func__7944__auto___20248 = cljs.core.nth.call(null,vec__20225_20246,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___20247,func__7944__auto___20248);

var G__20249 = cljs.core.next.call(null,seq__20218_20240__$1);
var G__20250 = null;
var G__20251 = (0);
var G__20252 = (0);
seq__20218_20228 = G__20249;
chunk__20219_20229 = G__20250;
count__20220_20230 = G__20251;
i__20221_20231 = G__20252;
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
var vec__20259 = new cljs.core.Keyword(null,"position","position",-2011731912).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$));
var file = cljs.core.nth.call(null,vec__20259,(0),null);
var result = cljs.core.nth.call(null,vec__20259,(1),null);
var cur = (all[file]);
var vec__20262 = ((((result + (1)) >= cur.results.length))?((((file + (1)) >= all.length))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0)], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(file + (1)),(0)], null)):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [file,(result + (1))], null));
var file__$1 = cljs.core.nth.call(null,vec__20262,(0),null);
var result__$1 = cljs.core.nth.call(null,vec__20262,(1),null);
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
var vec__20271 = new cljs.core.Keyword(null,"position","position",-2011731912).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$));
var file = cljs.core.nth.call(null,vec__20271,(0),null);
var result = cljs.core.nth.call(null,vec__20271,(1),null);
var cur = (all[file]);
var vec__20274 = ((((result - (1)) < (0)))?((((file - (1)) < (0)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(all.length - (1)),((all[(all.length - (1))]).results.length - (1))], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(file - (1)),((all[(file - (1))]).results.length - (1))], null)):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [file,(result - (1))], null));
var file__$1 = cljs.core.nth.call(null,vec__20274,(0),null);
var result__$1 = cljs.core.nth.call(null,vec__20274,(1),null);
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
var result__$1 = (function (){var obj20280 = {"file":result.file,"results":result.results.slice((0),(lt.objs.search.result_threshold - new cljs.core.Keyword(null,"result-count","result-count",-1827800573).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))))};
return obj20280;
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
var temp__4657__auto___20281 = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto___20281)){
var e_20282 = temp__4657__auto___20281;
var temp__4657__auto___20283__$1 = lt.objs.editor.selection.call(null,e_20282);
if(cljs.core.truth_(temp__4657__auto___20283__$1)){
var sel_20284 = temp__4657__auto___20283__$1;
if(clojure.string.blank_QMARK_.call(null,sel_20284)){
} else {
var search_20285 = lt.util.dom.$.call(null,new cljs.core.Keyword(null,".search",".search",-1559053770),lt.object.__GT_content.call(null,lt.objs.search.searcher));
lt.util.dom.val.call(null,search_20285,sel_20284);
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
