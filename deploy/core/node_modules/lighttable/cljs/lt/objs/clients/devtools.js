// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.objs.clients.devtools');
goog.require('cljs.core');
goog.require('lt.objs.console');
goog.require('fetch.core');
goog.require('crate.core');
goog.require('lt.object');
goog.require('lt.util.dom');
goog.require('lt.objs.app');
goog.require('lt.objs.files');
goog.require('lt.objs.clients');
goog.require('lt.util.ipc');
goog.require('clojure.string');
goog.require('lt.util.js');
goog.require('cljs.reader');
goog.require('crate.binding');
lt.objs.clients.devtools.cbs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
lt.objs.clients.devtools.id = cljs.core.atom.call(null,(0));
lt.objs.clients.devtools.devtools_url = "http://localhost:8315/json";
lt.objs.clients.devtools.next_id = (function lt$objs$clients$devtools$next_id(){
return cljs.core.swap_BANG_.call(null,lt.objs.clients.devtools.id,cljs.core.inc);
});
lt.objs.clients.devtools.find_debugger_info = (function lt$objs$clients$devtools$find_debugger_info(info,url){
return cljs.core.first.call(null,cljs.core.filter.call(null,(function (cur){
var and__6781__auto__ = cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(cur),url);
if(and__6781__auto__){
return new cljs.core.Keyword(null,"webSocketDebuggerUrl","webSocketDebuggerUrl",-1327265369).cljs$core$IFn$_invoke$arity$1(cur);
} else {
return and__6781__auto__;
}
}),info));
});
lt.objs.clients.devtools.socket = (function lt$objs$clients$devtools$socket(this$,url){
var sock = (new WebSocket(url));
sock.onopen = ((function (sock){
return (function (){
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"connected","connected",-169833045),true], null));

return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"connect","connect",1232828233));
});})(sock))
;

sock.onmessage = ((function (sock){
return (function (p1__19066_SHARP_){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"message","message",-406056002),cljs.core.js__GT_clj.call(null,JSON.parse(p1__19066_SHARP_.data),new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true));
});})(sock))
;

return sock;
});
lt.objs.clients.devtools.send_STAR_ = (function lt$objs$clients$devtools$send_STAR_(client,m,cb){
new cljs.core.Keyword(null,"socket","socket",59137063).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,client)).send(JSON.stringify(cljs.core.clj__GT_js.call(null,m)));

if(cljs.core.truth_(cb)){
return cljs.core.swap_BANG_.call(null,lt.objs.clients.devtools.cbs,cljs.core.assoc,new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(m),cb);
} else {
return null;
}
});
lt.objs.clients.devtools.send = (function lt$objs$clients$devtools$send(var_args){
var args__7875__auto__ = [];
var len__7868__auto___19074 = arguments.length;
var i__7869__auto___19075 = (0);
while(true){
if((i__7869__auto___19075 < len__7868__auto___19074)){
args__7875__auto__.push((arguments[i__7869__auto___19075]));

var G__19076 = (i__7869__auto___19075 + (1));
i__7869__auto___19075 = G__19076;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((2) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((2)),(0),null)):null);
return lt.objs.clients.devtools.send.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__7876__auto__);
});

lt.objs.clients.devtools.send.cljs$core$IFn$_invoke$arity$variadic = (function (client,m,p__19070){
var vec__19071 = p__19070;
var cb = cljs.core.nth.call(null,vec__19071,(0),null);
if(cljs.core.truth_(new cljs.core.Keyword(null,"connected","connected",-169833045).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,client)))){
return lt.objs.clients.devtools.send_STAR_.call(null,client,m,cb);
} else {
return lt.object.update_BANG_.call(null,client,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"queue","queue",1455835879)], null),cljs.core.conj,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [client,m,cb], null));
}
});

lt.objs.clients.devtools.send.cljs$lang$maxFixedArity = (2);

lt.objs.clients.devtools.send.cljs$lang$applyTo = (function (seq19067){
var G__19068 = cljs.core.first.call(null,seq19067);
var seq19067__$1 = cljs.core.next.call(null,seq19067);
var G__19069 = cljs.core.first.call(null,seq19067__$1);
var seq19067__$2 = cljs.core.next.call(null,seq19067__$1);
return lt.objs.clients.devtools.send.cljs$core$IFn$_invoke$arity$variadic(G__19068,G__19069,seq19067__$2);
});

lt.objs.clients.devtools.close = (function lt$objs$clients$devtools$close(client){
new cljs.core.Keyword(null,"socket","socket",59137063).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,client)).close();

return lt.object.merge_BANG_.call(null,client,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"socket","socket",59137063),null,new cljs.core.Keyword(null,"connected","connected",-169833045),null], null));
});
lt.objs.clients.devtools.format_value = (function lt$objs$clients$devtools$format_value(v){
var val = new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(v);
if(cljs.core._EQ_.call(null,val,"undefined")){
return "undefined";
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(v),"string")){
return cljs.core.pr_str.call(null,val);
} else {
if((val === true) || (val === false)){
return cljs.core.pr_str.call(null,val);
} else {
if(((val == null)) || (cljs.core.empty_QMARK_.call(null,val))){
return "null";
} else {
return new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(v);

}
}
}
}
});
lt.objs.clients.devtools.msg__GT_log = (function lt$objs$clients$devtools$msg__GT_log(this$,m){
var params = new cljs.core.Keyword(null,"parameters","parameters",-1229919748).cljs$core$IFn$_invoke$arity$1(m);
var iter__7573__auto__ = ((function (params){
return (function lt$objs$clients$devtools$msg__GT_log_$_iter__19081(s__19082){
return (new cljs.core.LazySeq(null,((function (params){
return (function (){
var s__19082__$1 = s__19082;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__19082__$1);
if(temp__4657__auto__){
var s__19082__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__19082__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__19082__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__19084 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__19083 = (0);
while(true){
if((i__19083 < size__7572__auto__)){
var p = cljs.core._nth.call(null,c__7571__auto__,i__19083);
cljs.core.chunk_append.call(null,b__19084,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.log-val","span.log-val",1156286200),(cljs.core.truth_((function (){var and__6781__auto__ = cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(p),"object");
if(and__6781__auto__){
var and__6781__auto____$1 = new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(p);
if(cljs.core.truth_(and__6781__auto____$1)){
return cljs.core.not.call(null,new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(p)));
} else {
return and__6781__auto____$1;
}
} else {
return and__6781__auto__;
}
})())?"null":((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(p),"object"))?lt.object.__GT_content.call(null,lt.object.create.call(null,new cljs.core.Keyword("lt.objs.clients.devtools","inspector-object","lt.objs.clients.devtools/inspector-object",-152363009),this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),p], null))):new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$2(p,new cljs.core.Keyword(null,"text","text",-1790561697).cljs$core$IFn$_invoke$arity$1(p))
))], null));

var G__19085 = (i__19083 + (1));
i__19083 = G__19085;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__19084),lt$objs$clients$devtools$msg__GT_log_$_iter__19081.call(null,cljs.core.chunk_rest.call(null,s__19082__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__19084),null);
}
} else {
var p = cljs.core.first.call(null,s__19082__$2);
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.log-val","span.log-val",1156286200),(cljs.core.truth_((function (){var and__6781__auto__ = cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(p),"object");
if(and__6781__auto__){
var and__6781__auto____$1 = new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(p);
if(cljs.core.truth_(and__6781__auto____$1)){
return cljs.core.not.call(null,new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(p)));
} else {
return and__6781__auto____$1;
}
} else {
return and__6781__auto__;
}
})())?"null":((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(p),"object"))?lt.object.__GT_content.call(null,lt.object.create.call(null,new cljs.core.Keyword("lt.objs.clients.devtools","inspector-object","lt.objs.clients.devtools/inspector-object",-152363009),this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),p], null))):new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$2(p,new cljs.core.Keyword(null,"text","text",-1790561697).cljs$core$IFn$_invoke$arity$1(p))
))], null),lt$objs$clients$devtools$msg__GT_log_$_iter__19081.call(null,cljs.core.rest.call(null,s__19082__$2)));
}
} else {
return null;
}
break;
}
});})(params))
,null,null));
});})(params))
;
return iter__7573__auto__.call(null,params);
});
lt.objs.clients.devtools.msg__GT_string = (function lt$objs$clients$devtools$msg__GT_string(m){
var params = new cljs.core.Keyword(null,"parameters","parameters",-1229919748).cljs$core$IFn$_invoke$arity$1(m);
return cljs.core.reduce.call(null,((function (params){
return (function (res,p){
return [cljs.core.str(res),cljs.core.str(" "),cljs.core.str(new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(p))].join('');
});})(params))
,"",params);
});
lt.objs.clients.devtools.error__GT_string = (function lt$objs$clients$devtools$error__GT_string(e){
return [cljs.core.str("ERROR: "),cljs.core.str(new cljs.core.Keyword(null,"text","text",-1790561697).cljs$core$IFn$_invoke$arity$1(e)),cljs.core.str(": "),cljs.core.str(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(e)),cljs.core.str("\n"),cljs.core.str(cljs.core.reduce.call(null,(function (res,f){
return [cljs.core.str(res),cljs.core.str("       "),cljs.core.str(lt.objs.files.basename.call(null,new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(f))),cljs.core.str(" ["),cljs.core.str(new cljs.core.Keyword(null,"lineNumber","lineNumber",974255001).cljs$core$IFn$_invoke$arity$1(f)),cljs.core.str("]: "),cljs.core.str(((cljs.core.empty_QMARK_.call(null,new cljs.core.Keyword(null,"functionName","functionName",895163421).cljs$core$IFn$_invoke$arity$1(f)))?"anonymous":new cljs.core.Keyword(null,"functionName","functionName",895163421).cljs$core$IFn$_invoke$arity$1(f))),cljs.core.str("\n")].join('');
}),"",new cljs.core.Keyword(null,"stackTrace","stackTrace",502218749).cljs$core$IFn$_invoke$arity$1(e)))].join('');
});
/**
 * 
 */
lt.objs.clients.devtools.frame = (function lt$objs$clients$devtools$frame(f){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td.url","td.url",994976394),lt.objs.files.basename.call(null,new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(f))," [",new cljs.core.Keyword(null,"lineNumber","lineNumber",974255001).cljs$core$IFn$_invoke$arity$1(f),"]"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),((cljs.core.empty_QMARK_.call(null,new cljs.core.Keyword(null,"functionName","functionName",895163421).cljs$core$IFn$_invoke$arity$1(f)))?"anonymous":new cljs.core.Keyword(null,"functionName","functionName",895163421).cljs$core$IFn$_invoke$arity$1(f))], null)], null));
var seq__19096_19106 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),cljs.core.PersistentVector.EMPTY));
var chunk__19097_19107 = null;
var count__19098_19108 = (0);
var i__19099_19109 = (0);
while(true){
if((i__19099_19109 < count__19098_19108)){
var vec__19100_19110 = cljs.core._nth.call(null,chunk__19097_19107,i__19099_19109);
var ev__7943__auto___19111 = cljs.core.nth.call(null,vec__19100_19110,(0),null);
var func__7944__auto___19112 = cljs.core.nth.call(null,vec__19100_19110,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___19111,func__7944__auto___19112);

var G__19113 = seq__19096_19106;
var G__19114 = chunk__19097_19107;
var G__19115 = count__19098_19108;
var G__19116 = (i__19099_19109 + (1));
seq__19096_19106 = G__19113;
chunk__19097_19107 = G__19114;
count__19098_19108 = G__19115;
i__19099_19109 = G__19116;
continue;
} else {
var temp__4657__auto___19117 = cljs.core.seq.call(null,seq__19096_19106);
if(temp__4657__auto___19117){
var seq__19096_19118__$1 = temp__4657__auto___19117;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__19096_19118__$1)){
var c__7604__auto___19119 = cljs.core.chunk_first.call(null,seq__19096_19118__$1);
var G__19120 = cljs.core.chunk_rest.call(null,seq__19096_19118__$1);
var G__19121 = c__7604__auto___19119;
var G__19122 = cljs.core.count.call(null,c__7604__auto___19119);
var G__19123 = (0);
seq__19096_19106 = G__19120;
chunk__19097_19107 = G__19121;
count__19098_19108 = G__19122;
i__19099_19109 = G__19123;
continue;
} else {
var vec__19103_19124 = cljs.core.first.call(null,seq__19096_19118__$1);
var ev__7943__auto___19125 = cljs.core.nth.call(null,vec__19103_19124,(0),null);
var func__7944__auto___19126 = cljs.core.nth.call(null,vec__19103_19124,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___19125,func__7944__auto___19126);

var G__19127 = cljs.core.next.call(null,seq__19096_19118__$1);
var G__19128 = null;
var G__19129 = (0);
var G__19130 = (0);
seq__19096_19106 = G__19127;
chunk__19097_19107 = G__19128;
count__19098_19108 = G__19129;
i__19099_19109 = G__19130;
continue;
}
} else {
}
}
break;
}

return e__7942__auto__;
});
if(typeof lt.objs.clients.devtools.handle_log_msg !== 'undefined'){
} else {
lt.objs.clients.devtools.handle_log_msg = (function (){var method_table__7718__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__7719__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var method_cache__7720__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__7721__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__7722__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),cljs.core.get_global_hierarchy.call(null));
return (new cljs.core.MultiFn(cljs.core.symbol.call(null,"lt.objs.clients.devtools","handle-log-msg"),((function (method_table__7718__auto__,prefer_table__7719__auto__,method_cache__7720__auto__,cached_hierarchy__7721__auto__,hierarchy__7722__auto__){
return (function (p1__19132_SHARP_,p2__19131_SHARP_){
return new cljs.core.Keyword(null,"level","level",1290497552).cljs$core$IFn$_invoke$arity$1(p2__19131_SHARP_);
});})(method_table__7718__auto__,prefer_table__7719__auto__,method_cache__7720__auto__,cached_hierarchy__7721__auto__,hierarchy__7722__auto__))
,new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__7722__auto__,method_table__7718__auto__,prefer_table__7719__auto__,method_cache__7720__auto__,cached_hierarchy__7721__auto__));
})();
}
lt.objs.clients.devtools.valid_error_QMARK_ = (function lt$objs$clients$devtools$valid_error_QMARK_(text){
var text__$1 = text.toLowerCase();
return cljs.core.every_QMARK_.call(null,((function (text__$1){
return (function (p1__19133_SHARP_){
return cljs.core._EQ_.call(null,(-1),text__$1.indexOf(p1__19133_SHARP_));
});})(text__$1))
,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["failed to load resource: http://app.kodowa.com"], null));
});
cljs.core._add_method.call(null,lt.objs.clients.devtools.handle_log_msg,"error",(function (this$,msg){
if(cljs.core.truth_(lt.objs.clients.devtools.valid_error_QMARK_.call(null,[cljs.core.str(new cljs.core.Keyword(null,"text","text",-1790561697).cljs$core$IFn$_invoke$arity$1(msg)),cljs.core.str(": "),cljs.core.str(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(msg))].join('')))){
var top = cljs.core.first.call(null,new cljs.core.Keyword(null,"stackTrace","stackTrace",502218749).cljs$core$IFn$_invoke$arity$1(msg));
return lt.objs.console.verbatim.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),new cljs.core.Keyword(null,"text","text",-1790561697).cljs$core$IFn$_invoke$arity$1(msg),(cljs.core.truth_(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(top))?null:[cljs.core.str(": "),cljs.core.str(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(msg))].join(''))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"table","table",-564943036),(function (){var iter__7573__auto__ = ((function (top){
return (function lt$objs$clients$devtools$iter__19134(s__19135){
return (new cljs.core.LazySeq(null,((function (top){
return (function (){
var s__19135__$1 = s__19135;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__19135__$1);
if(temp__4657__auto__){
var s__19135__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__19135__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__19135__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__19137 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__19136 = (0);
while(true){
if((i__19136 < size__7572__auto__)){
var f = cljs.core._nth.call(null,c__7571__auto__,i__19136);
cljs.core.chunk_append.call(null,b__19137,lt.objs.clients.devtools.frame.call(null,f));

var G__19138 = (i__19136 + (1));
i__19136 = G__19138;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__19137),lt$objs$clients$devtools$iter__19134.call(null,cljs.core.chunk_rest.call(null,s__19135__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__19137),null);
}
} else {
var f = cljs.core.first.call(null,s__19135__$2);
return cljs.core.cons.call(null,lt.objs.clients.devtools.frame.call(null,f),lt$objs$clients$devtools$iter__19134.call(null,cljs.core.rest.call(null,s__19135__$2)));
}
} else {
return null;
}
break;
}
});})(top))
,null,null));
});})(top))
;
return iter__7573__auto__.call(null,new cljs.core.Keyword(null,"stackTrace","stackTrace",502218749).cljs$core$IFn$_invoke$arity$1(msg));
})()], null)], null),"error",lt.objs.clients.devtools.error__GT_string.call(null,msg));
} else {
return null;
}
}));
cljs.core._add_method.call(null,lt.objs.clients.devtools.handle_log_msg,"log",(function (this$,msg){
var stack = cljs.core.first.call(null,cljs.core.filter.call(null,(function (p1__19139_SHARP_){
return cljs.core.not_EQ_.call(null,lt.objs.files.basename.call(null,new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(p1__19139_SHARP_)),"bootstrap.js");
}),new cljs.core.Keyword(null,"stackTrace","stackTrace",502218749).cljs$core$IFn$_invoke$arity$1(msg)));
var stack__$1 = ((cljs.core.not.call(null,stack))?cljs.core.first.call(null,new cljs.core.Keyword(null,"stackTrace","stackTrace",502218749).cljs$core$IFn$_invoke$arity$1(msg)):stack);
return lt.objs.console.loc_log.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"file","file",-1269645878),lt.objs.files.basename.call(null,new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(stack__$1)),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"lineNumber","lineNumber",974255001).cljs$core$IFn$_invoke$arity$1(stack__$1),new cljs.core.Keyword(null,"content","content",15833224),lt.objs.clients.devtools.msg__GT_log.call(null,this$,msg),new cljs.core.Keyword(null,"str-content","str-content",297549190),lt.objs.clients.devtools.msg__GT_string.call(null,msg)], null));
}));
cljs.core._add_method.call(null,lt.objs.clients.devtools.handle_log_msg,"warning",(function (this$,msg){
return lt.objs.console.loc_log.call(null,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"file","file",-1269645878),lt.objs.files.basename.call(null,new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(msg)),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(msg),new cljs.core.Keyword(null,"class","class",-2030961996),"warning",new cljs.core.Keyword(null,"content","content",15833224),new cljs.core.Keyword(null,"text","text",-1790561697).cljs$core$IFn$_invoke$arity$1(msg),new cljs.core.Keyword(null,"str-content","str-content",297549190),new cljs.core.Keyword(null,"text","text",-1790561697).cljs$core$IFn$_invoke$arity$1(msg)], null));
}));
cljs.core._add_method.call(null,lt.objs.clients.devtools.handle_log_msg,new cljs.core.Keyword(null,"default","default",-1987822328),(function (this$,msg){
return lt.objs.console.loc_log.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"file","file",-1269645878),lt.objs.files.basename.call(null,new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(msg)),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(msg),new cljs.core.Keyword(null,"content","content",15833224),new cljs.core.Keyword(null,"text","text",-1790561697).cljs$core$IFn$_invoke$arity$1(msg),new cljs.core.Keyword(null,"str-content","str-content",297549190),new cljs.core.Keyword(null,"text","text",-1790561697).cljs$core$IFn$_invoke$arity$1(msg)], null));
}));
lt.objs.clients.devtools.extra_escape = (function lt$objs$clients$devtools$extra_escape(code){
return clojure.string.replace.call(null,clojure.string.replace.call(null,clojure.string.replace.call(null,code,"\\","\\\\"),"\n","\\n"),"'","\\'");
});
lt.objs.clients.devtools.eval_in_webview_client = (function lt$objs$clients$devtools$eval_in_webview_client(webview_client,msg,cb){
return lt.objs.clients.devtools.send.call(null,webview_client,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"id","id",-1388402092),lt.objs.clients.devtools.next_id.call(null),new cljs.core.Keyword(null,"method","method",55703592),"Runtime.evaluate",new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"expression","expression",202311876),new cljs.core.Keyword(null,"code","code",1586293142).cljs$core$IFn$_invoke$arity$1(msg)], null)], null),cb);
});
lt.objs.clients.devtools.clear_scripts_BANG_ = (function lt$objs$clients$devtools$clear_scripts_BANG_(this$){
return lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"scripts","scripts",626373193),cljs.core.PersistentArrayMap.EMPTY], null));
});
lt.objs.clients.devtools.find_script = (function lt$objs$clients$devtools$find_script(client,path){
var found_QMARK_ = cljs.core.get.call(null,cljs.core.deref.call(null,client).call(null,new cljs.core.Keyword(null,"scripts","scripts",626373193)),lt.objs.files.basename.call(null,path));
return found_QMARK_;
});
lt.objs.clients.devtools.script_exists_QMARK_ = (function lt$objs$clients$devtools$script_exists_QMARK_(this$,id,cb){
return lt.objs.clients.devtools.send.call(null,this$,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"id","id",-1388402092),lt.objs.clients.devtools.next_id.call(null),new cljs.core.Keyword(null,"method","method",55703592),"Debugger.canSetScriptSource",new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"scriptId","scriptId",1936583436),id], null)], null),(function (res){
return cb.call(null,new cljs.core.Keyword(null,"result","result",1415092211).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"result","result",1415092211).cljs$core$IFn$_invoke$arity$1(res)));
}));
});
lt.objs.clients.devtools.remove_script_BANG_ = (function lt$objs$clients$devtools$remove_script_BANG_(client,path,id){
var vec__19144 = cljs.core.first.call(null,cljs.core.filter.call(null,(function (p1__19140_SHARP_){
return cljs.core._EQ_.call(null,id,new cljs.core.Keyword(null,"scriptId","scriptId",1936583436).cljs$core$IFn$_invoke$arity$1(cljs.core.second.call(null,p1__19140_SHARP_)));
}),lt.objs.clients.devtools.find_script.call(null,client,path)));
var k = cljs.core.nth.call(null,vec__19144,(0),null);
var v = cljs.core.nth.call(null,vec__19144,(1),null);
return lt.object.update_BANG_.call(null,client,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"scripts","scripts",626373193),lt.objs.files.basename.call(null,path)], null),cljs.core.dissoc,k);
});
lt.objs.clients.devtools.changelive_BANG_ = (function lt$objs$clients$devtools$changelive_BANG_(obj,path,code,cb,else$){
var temp__4655__auto__ = lt.objs.clients.devtools.find_script.call(null,obj,path);
if(cljs.core.truth_(temp__4655__auto__)){
var s = temp__4655__auto__;
var id = new cljs.core.Keyword(null,"scriptId","scriptId",1936583436).cljs$core$IFn$_invoke$arity$1(cljs.core.first.call(null,cljs.core.vals.call(null,s)));
return lt.objs.clients.devtools.script_exists_QMARK_.call(null,obj,id,((function (id,s,temp__4655__auto__){
return (function (exists_QMARK_){
if(cljs.core.not.call(null,exists_QMARK_)){
lt.objs.clients.devtools.remove_script_BANG_.call(null,obj,path,id);

return lt$objs$clients$devtools$changelive_BANG_.call(null,obj,path,code,cb);
} else {
lt.object.merge_BANG_.call(null,obj,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"script-id","script-id",-249184419),id], null));

return lt.objs.clients.devtools.send.call(null,obj,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"id","id",-1388402092),lt.objs.clients.devtools.next_id.call(null),new cljs.core.Keyword(null,"method","method",55703592),"Debugger.setScriptSource",new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"scriptId","scriptId",1936583436),id,new cljs.core.Keyword(null,"scriptSource","scriptSource",285393968),code], null)], null),cb);
}
});})(id,s,temp__4655__auto__))
);
} else {
return else$.call(null);
}
});
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.clients.devtools","devtools-client","lt.objs.clients.devtools/devtools-client",1379965666),new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"clients.devtools","clients.devtools",-1942442453),null], null), null),new cljs.core.Keyword(null,"init","init",-1875481434),(function (this$,url){
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"url","url",276297046),url], null));

return null;
}));
lt.objs.clients.devtools.local = lt.object.create.call(null,new cljs.core.Keyword("lt.objs.clients.devtools","devtools-client","lt.objs.clients.devtools/devtools-client",1379965666),lt.objs.app.app_url.call(null));
lt.util.ipc.on.call(null,"devtools",(function (p1__19148_SHARP_,p2__19147_SHARP_){
return lt.object.raise.call(null,lt.objs.clients.devtools.local,cljs.core.keyword.call(null,p2__19147_SHARP_));
}));
/**
 * 
 */
lt.objs.clients.devtools.__BEH__connect_BANG_ = (function lt$objs$clients$devtools$__BEH__connect_BANG_(this$,url){
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"socket","socket",59137063),lt.objs.clients.devtools.socket.call(null,this$,url)], null));

lt.objs.clients.devtools.send.call(null,this$,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"id","id",-1388402092),lt.objs.clients.devtools.next_id.call(null),new cljs.core.Keyword(null,"method","method",55703592),"Console.enable"], null));

lt.objs.clients.devtools.send.call(null,this$,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"id","id",-1388402092),lt.objs.clients.devtools.next_id.call(null),new cljs.core.Keyword(null,"method","method",55703592),"Debugger.enable"], null));

return lt.objs.clients.devtools.send.call(null,this$,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"id","id",-1388402092),lt.objs.clients.devtools.next_id.call(null),new cljs.core.Keyword(null,"method","method",55703592),"Network.setCacheDisabled",new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cacheDisabled","cacheDisabled",867943121),true], null)], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.clients.devtools","connect!","lt.objs.clients.devtools/connect!",539195316),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"connect!","connect!",-1435084260),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.clients.devtools.__BEH__connect_BANG_);
/**
 * 
 */
lt.objs.clients.devtools.__BEH__clear_queue_on_connect = (function lt$objs$clients$devtools$__BEH__clear_queue_on_connect(this$){
var seq__19153 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"queue","queue",1455835879).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
var chunk__19154 = null;
var count__19155 = (0);
var i__19156 = (0);
while(true){
if((i__19156 < count__19155)){
var msg = cljs.core._nth.call(null,chunk__19154,i__19156);
cljs.core.apply.call(null,lt.objs.clients.devtools.send,msg);

var G__19157 = seq__19153;
var G__19158 = chunk__19154;
var G__19159 = count__19155;
var G__19160 = (i__19156 + (1));
seq__19153 = G__19157;
chunk__19154 = G__19158;
count__19155 = G__19159;
i__19156 = G__19160;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__19153);
if(temp__4657__auto__){
var seq__19153__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__19153__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__19153__$1);
var G__19161 = cljs.core.chunk_rest.call(null,seq__19153__$1);
var G__19162 = c__7604__auto__;
var G__19163 = cljs.core.count.call(null,c__7604__auto__);
var G__19164 = (0);
seq__19153 = G__19161;
chunk__19154 = G__19162;
count__19155 = G__19163;
i__19156 = G__19164;
continue;
} else {
var msg = cljs.core.first.call(null,seq__19153__$1);
cljs.core.apply.call(null,lt.objs.clients.devtools.send,msg);

var G__19165 = cljs.core.next.call(null,seq__19153__$1);
var G__19166 = null;
var G__19167 = (0);
var G__19168 = (0);
seq__19153 = G__19165;
chunk__19154 = G__19166;
count__19155 = G__19167;
i__19156 = G__19168;
continue;
}
} else {
return null;
}
}
break;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.clients.devtools","clear-queue-on-connect","lt.objs.clients.devtools/clear-queue-on-connect",1410311951),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"connect","connect",1232828233),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.clients.devtools.__BEH__clear_queue_on_connect);
/**
 * 
 */
lt.objs.clients.devtools.__BEH__print_messages = (function lt$objs$clients$devtools$__BEH__print_messages(this$,m){
return null;
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.clients.devtools","print-messages","lt.objs.clients.devtools/print-messages",2094681586),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"message","message",-406056002),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.clients.devtools.__BEH__print_messages);
/**
 * 
 */
lt.objs.clients.devtools.__BEH__handle_message = (function lt$objs$clients$devtools$__BEH__handle_message(this$,m){
var temp__4655__auto__ = cljs.core.deref.call(null,lt.objs.clients.devtools.cbs).call(null,new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(m));
if(cljs.core.truth_(temp__4655__auto__)){
var cb = temp__4655__auto__;
cb.call(null,m);

return cljs.core.swap_BANG_.call(null,lt.objs.clients.devtools.cbs,cljs.core.dissoc,new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(m));
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"method","method",55703592).cljs$core$IFn$_invoke$arity$1(m))){
return lt.object.raise.call(null,this$,cljs.core.keyword.call(null,new cljs.core.Keyword(null,"method","method",55703592).cljs$core$IFn$_invoke$arity$1(m)),m);
} else {
return null;
}
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.clients.devtools","handle-message","lt.objs.clients.devtools/handle-message",-805366616),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"message","message",-406056002),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.clients.devtools.__BEH__handle_message);
/**
 * 
 */
lt.objs.clients.devtools.__BEH__script_parsed = (function lt$objs$clients$devtools$__BEH__script_parsed(this$,s){
var url = new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(s));
return lt.object.update_BANG_.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"scripts","scripts",626373193)], null),cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.objs.files.basename.call(null,url),url], null),new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(s));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.clients.devtools","script-parsed","lt.objs.clients.devtools/script-parsed",1820961768),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"Debugger.scriptParsed","Debugger.scriptParsed",785620974),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.clients.devtools.__BEH__script_parsed);
/**
 * 
 */
lt.objs.clients.devtools.__BEH__console_log = (function lt$objs$clients$devtools$__BEH__console_log(this$,m){
var msg = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(m));
return lt.objs.clients.devtools.handle_log_msg.call(null,this$,msg);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.clients.devtools","console-log","lt.objs.clients.devtools/console-log",1769819162),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"Console.messageAdded","Console.messageAdded",-388333205),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.clients.devtools.__BEH__console_log);
/**
 * 
 */
lt.objs.clients.devtools.__BEH__clear_console = (function lt$objs$clients$devtools$__BEH__clear_console(this$){
return lt.objs.clients.devtools.send.call(null,this$,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"id","id",-1388402092),lt.objs.clients.devtools.next_id.call(null),new cljs.core.Keyword(null,"method","method",55703592),"Console.clearMessages"], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.clients.devtools","clear-console","lt.objs.clients.devtools/clear-console",-286844748),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"clear!","clear!",-144814418),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.clients.devtools.__BEH__clear_console);
/**
 * 
 */
lt.objs.clients.devtools.__BEH__disconnect = (function lt$objs$clients$devtools$__BEH__disconnect(this$){
if(cljs.core.truth_(new cljs.core.Keyword(null,"socket","socket",59137063).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)))){
return lt.objs.clients.devtools.close.call(null,this$);
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.clients.devtools","disconnect","lt.objs.clients.devtools/disconnect",2109644543),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"disconnect","disconnect",-132009289),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.clients.devtools.__BEH__disconnect);
/**
 * 
 */
lt.objs.clients.devtools.__BEH__reconnect = (function lt$objs$clients$devtools$__BEH__reconnect(this$){
lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"disconnect","disconnect",-132009289));

return fetch.core.xhr.call(null,lt.objs.clients.devtools.devtools_url,cljs.core.PersistentArrayMap.EMPTY,(function (d){
var temp__4655__auto__ = new cljs.core.Keyword(null,"webSocketDebuggerUrl","webSocketDebuggerUrl",-1327265369).cljs$core$IFn$_invoke$arity$1(lt.objs.clients.devtools.find_debugger_info.call(null,cljs.core.js__GT_clj.call(null,JSON.parse(d),new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true),new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))));
if(cljs.core.truth_(temp__4655__auto__)){
var url = temp__4655__auto__;
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"connect!","connect!",-1435084260),url);
} else {
return lt.util.js.wait.call(null,(1000),((function (temp__4655__auto__){
return (function (){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"reconnect!","reconnect!",964525183));
});})(temp__4655__auto__))
);
}
}));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.clients.devtools","reconnect","lt.objs.clients.devtools/reconnect",-1457545229),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"reconnect!","reconnect!",964525183),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.clients.devtools.__BEH__reconnect);
/**
 * 
 */
lt.objs.clients.devtools.__BEH__connect_on_init = (function lt$objs$clients$devtools$__BEH__connect_on_init(app){
return lt.object.raise.call(null,lt.objs.clients.devtools.local,new cljs.core.Keyword(null,"reconnect!","reconnect!",964525183));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.clients.devtools","connect-on-init","lt.objs.clients.devtools/connect-on-init",761249097),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"init","init",-1875481434),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.clients.devtools.__BEH__connect_on_init);
lt.objs.clients.devtools.i_compare = (function lt$objs$clients$devtools$i_compare(a,b){
var ia = a.indexOf("__");
var ib = b.indexOf("__");
if((cljs.core._EQ_.call(null,ia,(-1))) && (cljs.core._EQ_.call(null,ib,(-1)))){
return cljs.core.compare.call(null,a,b);
} else {
if(((ia > (-1))) && ((ib > (-1)))){
return cljs.core.compare.call(null,a,b);
} else {
if((ia > (-1))){
return (1);
} else {
return (-1);

}
}
}
});
lt.objs.clients.devtools.__GT_name = (function lt$objs$clients$devtools$__GT_name(obj){
var n = (function (){var or__6793__auto__ = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(obj);
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
var or__6793__auto____$1 = new cljs.core.Keyword(null,"description","description",-1428560544).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(obj));
if(cljs.core.truth_(or__6793__auto____$1)){
return or__6793__auto____$1;
} else {
var or__6793__auto____$2 = new cljs.core.Keyword(null,"description","description",-1428560544).cljs$core$IFn$_invoke$arity$1(obj);
if(cljs.core.truth_(or__6793__auto____$2)){
return or__6793__auto____$2;
} else {
return "UnknownObject";
}
}
}
})();
if((n.indexOf("e.fn.e.init") > (-1))){
return [cljs.core.str("jQuery"),cljs.core.str(cljs.core.subs.call(null,n,(11)))].join('');
} else {
return n;

}
});
/**
 * 
 */
lt.objs.clients.devtools.desc = (function lt$objs$clients$devtools$desc(this$,obj){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"em","em",707813035),lt.objs.clients.devtools.__GT_name.call(null,obj)], null),(cljs.core.truth_(new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(obj))?[cljs.core.str(": "),cljs.core.str(new cljs.core.Keyword(null,"description","description",-1428560544).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(obj)))].join(''):null)], null));
var seq__19179_19189 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (){
if(cljs.core.truth_(new cljs.core.Keyword(null,"open","open",-1763596448).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)))){
return lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"open","open",-1763596448),false], null));
} else {
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"open","open",-1763596448),true], null));

if(cljs.core.seq.call(null,new cljs.core.Keyword(null,"children","children",-940561982).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)))){
return null;
} else {
return lt.objs.clients.devtools.send.call(null,new cljs.core.Keyword(null,"client","client",-1323448117).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"id","id",-1388402092),(1),new cljs.core.Keyword(null,"method","method",55703592),"Runtime.getProperties",new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"objectId","objectId",1455179945),(function (){var or__6793__auto__ = new cljs.core.Keyword(null,"objectId","objectId",1455179945).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(obj));
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return new cljs.core.Keyword(null,"objectId","objectId",1455179945).cljs$core$IFn$_invoke$arity$1(obj);
}
})(),new cljs.core.Keyword(null,"ownProperties","ownProperties",1587564637),true], null)], null),((function (e__7942__auto__){
return (function (d){
return lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"children","children",-940561982),new cljs.core.Keyword(null,"result","result",1415092211).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"result","result",1415092211).cljs$core$IFn$_invoke$arity$1(d))], null));
});})(e__7942__auto__))
);
}
}
});})(e__7942__auto__))
], null)));
var chunk__19180_19190 = null;
var count__19181_19191 = (0);
var i__19182_19192 = (0);
while(true){
if((i__19182_19192 < count__19181_19191)){
var vec__19183_19193 = cljs.core._nth.call(null,chunk__19180_19190,i__19182_19192);
var ev__7943__auto___19194 = cljs.core.nth.call(null,vec__19183_19193,(0),null);
var func__7944__auto___19195 = cljs.core.nth.call(null,vec__19183_19193,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___19194,func__7944__auto___19195);

var G__19196 = seq__19179_19189;
var G__19197 = chunk__19180_19190;
var G__19198 = count__19181_19191;
var G__19199 = (i__19182_19192 + (1));
seq__19179_19189 = G__19196;
chunk__19180_19190 = G__19197;
count__19181_19191 = G__19198;
i__19182_19192 = G__19199;
continue;
} else {
var temp__4657__auto___19200 = cljs.core.seq.call(null,seq__19179_19189);
if(temp__4657__auto___19200){
var seq__19179_19201__$1 = temp__4657__auto___19200;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__19179_19201__$1)){
var c__7604__auto___19202 = cljs.core.chunk_first.call(null,seq__19179_19201__$1);
var G__19203 = cljs.core.chunk_rest.call(null,seq__19179_19201__$1);
var G__19204 = c__7604__auto___19202;
var G__19205 = cljs.core.count.call(null,c__7604__auto___19202);
var G__19206 = (0);
seq__19179_19189 = G__19203;
chunk__19180_19190 = G__19204;
count__19181_19191 = G__19205;
i__19182_19192 = G__19206;
continue;
} else {
var vec__19186_19207 = cljs.core.first.call(null,seq__19179_19201__$1);
var ev__7943__auto___19208 = cljs.core.nth.call(null,vec__19186_19207,(0),null);
var func__7944__auto___19209 = cljs.core.nth.call(null,vec__19186_19207,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___19208,func__7944__auto___19209);

var G__19210 = cljs.core.next.call(null,seq__19179_19201__$1);
var G__19211 = null;
var G__19212 = (0);
var G__19213 = (0);
seq__19179_19189 = G__19210;
chunk__19180_19190 = G__19211;
count__19181_19191 = G__19212;
i__19182_19192 = G__19213;
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
lt.objs.clients.devtools.props = (function lt$objs$clients$devtools$props(this$,children){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",-1349521403),(function (){var iter__7573__auto__ = (function lt$objs$clients$devtools$props_$_iter__19228(s__19229){
return (new cljs.core.LazySeq(null,(function (){
var s__19229__$1 = s__19229;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__19229__$1);
if(temp__4657__auto__){
var s__19229__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__19229__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__19229__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__19231 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__19230 = (0);
while(true){
if((i__19230 < size__7572__auto__)){
var c = cljs.core._nth.call(null,c__7571__auto__,i__19230);
cljs.core.chunk_append.call(null,b__19231,(cljs.core.truth_((function (){var and__6781__auto__ = cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(c)),"object");
if(and__6781__auto__){
return new cljs.core.Keyword(null,"objectId","objectId",1455179945).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(c));
} else {
return and__6781__auto__;
}
})())?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),lt.object.__GT_content.call(null,lt.object.create.call(null,new cljs.core.Keyword("lt.objs.clients.devtools","inspector-object","lt.objs.clients.devtools/inspector-object",-152363009),new cljs.core.Keyword(null,"client","client",-1323448117).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),c))], null):new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"em","em",707813035),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(c)], null),": ",(function (){var or__6793__auto__ = new cljs.core.Keyword(null,"description","description",-1428560544).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(c));
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return [cljs.core.str(lt.objs.clients.devtools.format_value.call(null,new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(c)))].join('');
}
})()], null)));

var G__19242 = (i__19230 + (1));
i__19230 = G__19242;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__19231),lt$objs$clients$devtools$props_$_iter__19228.call(null,cljs.core.chunk_rest.call(null,s__19229__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__19231),null);
}
} else {
var c = cljs.core.first.call(null,s__19229__$2);
return cljs.core.cons.call(null,(cljs.core.truth_((function (){var and__6781__auto__ = cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(c)),"object");
if(and__6781__auto__){
return new cljs.core.Keyword(null,"objectId","objectId",1455179945).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(c));
} else {
return and__6781__auto__;
}
})())?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),lt.object.__GT_content.call(null,lt.object.create.call(null,new cljs.core.Keyword("lt.objs.clients.devtools","inspector-object","lt.objs.clients.devtools/inspector-object",-152363009),new cljs.core.Keyword(null,"client","client",-1323448117).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),c))], null):new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"em","em",707813035),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(c)], null),": ",(function (){var or__6793__auto__ = new cljs.core.Keyword(null,"description","description",-1428560544).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(c));
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return [cljs.core.str(lt.objs.clients.devtools.format_value.call(null,new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(c)))].join('');
}
})()], null)),lt$objs$clients$devtools$props_$_iter__19228.call(null,cljs.core.rest.call(null,s__19229__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__7573__auto__.call(null,cljs.core.sort_by.call(null,new cljs.core.Keyword(null,"name","name",1843675177),lt.objs.clients.devtools.i_compare,children));
})()], null));
var seq__19232_19243 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),cljs.core.PersistentVector.EMPTY));
var chunk__19233_19244 = null;
var count__19234_19245 = (0);
var i__19235_19246 = (0);
while(true){
if((i__19235_19246 < count__19234_19245)){
var vec__19236_19247 = cljs.core._nth.call(null,chunk__19233_19244,i__19235_19246);
var ev__7943__auto___19248 = cljs.core.nth.call(null,vec__19236_19247,(0),null);
var func__7944__auto___19249 = cljs.core.nth.call(null,vec__19236_19247,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___19248,func__7944__auto___19249);

var G__19250 = seq__19232_19243;
var G__19251 = chunk__19233_19244;
var G__19252 = count__19234_19245;
var G__19253 = (i__19235_19246 + (1));
seq__19232_19243 = G__19250;
chunk__19233_19244 = G__19251;
count__19234_19245 = G__19252;
i__19235_19246 = G__19253;
continue;
} else {
var temp__4657__auto___19254 = cljs.core.seq.call(null,seq__19232_19243);
if(temp__4657__auto___19254){
var seq__19232_19255__$1 = temp__4657__auto___19254;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__19232_19255__$1)){
var c__7604__auto___19256 = cljs.core.chunk_first.call(null,seq__19232_19255__$1);
var G__19257 = cljs.core.chunk_rest.call(null,seq__19232_19255__$1);
var G__19258 = c__7604__auto___19256;
var G__19259 = cljs.core.count.call(null,c__7604__auto___19256);
var G__19260 = (0);
seq__19232_19243 = G__19257;
chunk__19233_19244 = G__19258;
count__19234_19245 = G__19259;
i__19235_19246 = G__19260;
continue;
} else {
var vec__19239_19261 = cljs.core.first.call(null,seq__19232_19255__$1);
var ev__7943__auto___19262 = cljs.core.nth.call(null,vec__19239_19261,(0),null);
var func__7944__auto___19263 = cljs.core.nth.call(null,vec__19239_19261,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___19262,func__7944__auto___19263);

var G__19264 = cljs.core.next.call(null,seq__19232_19255__$1);
var G__19265 = null;
var G__19266 = (0);
var G__19267 = (0);
seq__19232_19243 = G__19264;
chunk__19233_19244 = G__19265;
count__19234_19245 = G__19266;
i__19235_19246 = G__19267;
continue;
}
} else {
}
}
break;
}

return e__7942__auto__;
});
lt.objs.clients.devtools.__GT_open = (function lt$objs$clients$devtools$__GT_open(this$){
if(cljs.core.truth_(new cljs.core.Keyword(null,"open","open",-1763596448).cljs$core$IFn$_invoke$arity$1(this$))){
return "inspector-object open";
} else {
return "inspector-object";
}
});
lt.objs.clients.devtools.inspector__GT_result = (function lt$objs$clients$devtools$inspector__GT_result(this$,o){
var res = new cljs.core.Keyword(null,"result","result",1415092211).cljs$core$IFn$_invoke$arity$1(o);
var data = new cljs.core.Keyword(null,"result","result",1415092211).cljs$core$IFn$_invoke$arity$1(res);
if(cljs.core.truth_(new cljs.core.Keyword(null,"wasThrown","wasThrown",-1968601027).cljs$core$IFn$_invoke$arity$1(res))){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"ex","ex",-1413771341),new cljs.core.Keyword(null,"description","description",-1428560544).cljs$core$IFn$_invoke$arity$1(data)], null);
} else {
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"result","result",1415092211),(function (){var pred__19271 = cljs.core._EQ_;
var expr__19272 = new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(data);
if(cljs.core.truth_(pred__19271.call(null,"object",expr__19272))){
return lt.object.__GT_content.call(null,lt.object.create.call(null,new cljs.core.Keyword("lt.objs.clients.devtools","inspector-object","lt.objs.clients.devtools/inspector-object",-152363009),this$,data));
} else {
var or__6793__auto__ = new cljs.core.Keyword(null,"description","description",-1428560544).cljs$core$IFn$_invoke$arity$1(data);
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return cljs.core.pr_str.call(null,new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(data));
}
}
})()], null);
}
});
lt.objs.clients.devtools.clear_unused_inspectors = (function lt$objs$clients$devtools$clear_unused_inspectors(){
var seq__19280 = cljs.core.seq.call(null,lt.object.by_tag.call(null,new cljs.core.Keyword(null,"inspector.object","inspector.object",1469060706)));
var chunk__19282 = null;
var count__19283 = (0);
var i__19284 = (0);
while(true){
if((i__19284 < count__19283)){
var obj = cljs.core._nth.call(null,chunk__19282,i__19284);
if((cljs.core.not.call(null,lt.object.__GT_content.call(null,obj))) || (cljs.core.not.call(null,lt.util.dom.parents.call(null,lt.object.__GT_content.call(null,obj),new cljs.core.Keyword(null,"body","body",-2049205669))))){
lt.object.destroy_BANG_.call(null,obj);

var G__19286 = seq__19280;
var G__19287 = chunk__19282;
var G__19288 = count__19283;
var G__19289 = (i__19284 + (1));
seq__19280 = G__19286;
chunk__19282 = G__19287;
count__19283 = G__19288;
i__19284 = G__19289;
continue;
} else {
var G__19290 = seq__19280;
var G__19291 = chunk__19282;
var G__19292 = count__19283;
var G__19293 = (i__19284 + (1));
seq__19280 = G__19290;
chunk__19282 = G__19291;
count__19283 = G__19292;
i__19284 = G__19293;
continue;
}
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__19280);
if(temp__4657__auto__){
var seq__19280__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__19280__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__19280__$1);
var G__19294 = cljs.core.chunk_rest.call(null,seq__19280__$1);
var G__19295 = c__7604__auto__;
var G__19296 = cljs.core.count.call(null,c__7604__auto__);
var G__19297 = (0);
seq__19280 = G__19294;
chunk__19282 = G__19295;
count__19283 = G__19296;
i__19284 = G__19297;
continue;
} else {
var obj = cljs.core.first.call(null,seq__19280__$1);
if((cljs.core.not.call(null,lt.object.__GT_content.call(null,obj))) || (cljs.core.not.call(null,lt.util.dom.parents.call(null,lt.object.__GT_content.call(null,obj),new cljs.core.Keyword(null,"body","body",-2049205669))))){
lt.object.destroy_BANG_.call(null,obj);

var G__19298 = cljs.core.next.call(null,seq__19280__$1);
var G__19299 = null;
var G__19300 = (0);
var G__19301 = (0);
seq__19280 = G__19298;
chunk__19282 = G__19299;
count__19283 = G__19300;
i__19284 = G__19301;
continue;
} else {
var G__19302 = cljs.core.next.call(null,seq__19280__$1);
var G__19303 = null;
var G__19304 = (0);
var G__19305 = (0);
seq__19280 = G__19302;
chunk__19282 = G__19303;
count__19283 = G__19304;
i__19284 = G__19305;
continue;
}
}
} else {
return null;
}
}
break;
}
});
/**
 * 
 */
lt.objs.clients.devtools.__BEH__clean_inspectors_timer = (function lt$objs$clients$devtools$__BEH__clean_inspectors_timer(this$){
return lt.util.js.every.call(null,(60000),lt.objs.clients.devtools.clear_unused_inspectors);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.clients.devtools","clean-inspectors-timer","lt.objs.clients.devtools/clean-inspectors-timer",-2145020125),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"init","init",-1875481434),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.clients.devtools.__BEH__clean_inspectors_timer);
/**
 * 
 */
lt.objs.clients.devtools.__BEH__clear_inspector_object = (function lt$objs$clients$devtools$__BEH__clear_inspector_object(this$){
var temp__4657__auto__ = (function (){var or__6793__auto__ = new cljs.core.Keyword(null,"objectId","objectId",1455179945).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))));
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return new cljs.core.Keyword(null,"objectId","objectId",1455179945).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
}
})();
if(cljs.core.truth_(temp__4657__auto__)){
var id = temp__4657__auto__;
return lt.objs.clients.devtools.send.call(null,new cljs.core.Keyword(null,"client","client",-1323448117).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"id","id",-1388402092),lt.objs.clients.devtools.next_id.call(null),new cljs.core.Keyword(null,"method","method",55703592),"Runtime.releaseObject",new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"objectId","objectId",1455179945),id], null)], null));
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.clients.devtools","clear-inspector-object","lt.objs.clients.devtools/clear-inspector-object",578725146),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"destroy","destroy",-843660405),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.clients.devtools.__BEH__clear_inspector_object);
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.clients.devtools","inspector-object","lt.objs.clients.devtools/inspector-object",-152363009),new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"inspector.object","inspector.object",1469060706),null], null), null),new cljs.core.Keyword(null,"init","init",-1875481434),(function (this$,client,m){
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"client","client",-1323448117),client,new cljs.core.Keyword(null,"info","info",-317069002),m], null));

return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),crate.binding.bound.call(null,this$,lt.objs.clients.devtools.__GT_open)], null),lt.objs.clients.devtools.desc.call(null,this$,m),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),crate.binding.bound.call(null,crate.binding.subatom.call(null,this$,new cljs.core.Keyword(null,"children","children",-940561982)),cljs.core.partial.call(null,lt.objs.clients.devtools.props,this$))], null)], null);
}));
