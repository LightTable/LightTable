// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.objs.clients.local');
goog.require('cljs.core');
goog.require('lt.objs.console');
goog.require('crate.core');
goog.require('lt.object');
goog.require('lt.objs.sidebar.clients');
goog.require('lt.objs.eval');
goog.require('lt.util.dom');
goog.require('lt.objs.files');
goog.require('lt.objs.clients');
goog.require('clojure.string');
goog.require('lt.util.js');
goog.require('cljs.reader');
lt.objs.clients.local.client_name = "LightTable-UI";
if(typeof lt.objs.clients.local.on_message !== 'undefined'){
} else {
lt.objs.clients.local.on_message = (function (){var method_table__7718__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__7719__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var method_cache__7720__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__7721__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__7722__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),cljs.core.get_global_hierarchy.call(null));
return (new cljs.core.MultiFn(cljs.core.symbol.call(null,"lt.objs.clients.local","on-message"),cljs.core.identity,new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__7722__auto__,method_table__7718__auto__,prefer_table__7719__auto__,method_cache__7720__auto__,cached_hierarchy__7721__auto__));
})();
}
cljs.core._add_method.call(null,lt.objs.clients.local.on_message,new cljs.core.Keyword(null,"editor.eval.cljs.exec","editor.eval.cljs.exec",141962241),(function (_,data,cb){
var seq__19821 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"results","results",-1134170113).cljs$core$IFn$_invoke$arity$1(data));
var chunk__19822 = null;
var count__19823 = (0);
var i__19824 = (0);
while(true){
if((i__19824 < count__19823)){
var res = cljs.core._nth.call(null,chunk__19822,i__19824);
var code_19827 = new cljs.core.Keyword(null,"code","code",1586293142).cljs$core$IFn$_invoke$arity$1(res);
try{lt.object.raise.call(null,lt.objs.clients.clients,new cljs.core.Keyword(null,"message","message",-406056002),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cb,new cljs.core.Keyword(null,"editor.eval.cljs.result","editor.eval.cljs.result",2117774912),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"result","result",1415092211),lt.objs.eval.cljs_result_format.call(null,eval.call(window,code_19827)),new cljs.core.Keyword(null,"meta","meta",1499536964),cljs.core.merge.call(null,new cljs.core.Keyword(null,"meta","meta",1499536964).cljs$core$IFn$_invoke$arity$1(data),new cljs.core.Keyword(null,"meta","meta",1499536964).cljs$core$IFn$_invoke$arity$1(res))], null)], null));
}catch (e19825){var e_19828 = e19825;
lt.object.raise.call(null,lt.objs.clients.clients,new cljs.core.Keyword(null,"message","message",-406056002),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cb,new cljs.core.Keyword(null,"editor.eval.cljs.exception","editor.eval.cljs.exception",1627126758),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"ex","ex",-1413771341),e_19828,new cljs.core.Keyword(null,"meta","meta",1499536964),new cljs.core.Keyword(null,"meta","meta",1499536964).cljs$core$IFn$_invoke$arity$1(res)], null)], null));
}
var G__19829 = seq__19821;
var G__19830 = chunk__19822;
var G__19831 = count__19823;
var G__19832 = (i__19824 + (1));
seq__19821 = G__19829;
chunk__19822 = G__19830;
count__19823 = G__19831;
i__19824 = G__19832;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__19821);
if(temp__4657__auto__){
var seq__19821__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__19821__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__19821__$1);
var G__19833 = cljs.core.chunk_rest.call(null,seq__19821__$1);
var G__19834 = c__7604__auto__;
var G__19835 = cljs.core.count.call(null,c__7604__auto__);
var G__19836 = (0);
seq__19821 = G__19833;
chunk__19822 = G__19834;
count__19823 = G__19835;
i__19824 = G__19836;
continue;
} else {
var res = cljs.core.first.call(null,seq__19821__$1);
var code_19837 = new cljs.core.Keyword(null,"code","code",1586293142).cljs$core$IFn$_invoke$arity$1(res);
try{lt.object.raise.call(null,lt.objs.clients.clients,new cljs.core.Keyword(null,"message","message",-406056002),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cb,new cljs.core.Keyword(null,"editor.eval.cljs.result","editor.eval.cljs.result",2117774912),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"result","result",1415092211),lt.objs.eval.cljs_result_format.call(null,eval.call(window,code_19837)),new cljs.core.Keyword(null,"meta","meta",1499536964),cljs.core.merge.call(null,new cljs.core.Keyword(null,"meta","meta",1499536964).cljs$core$IFn$_invoke$arity$1(data),new cljs.core.Keyword(null,"meta","meta",1499536964).cljs$core$IFn$_invoke$arity$1(res))], null)], null));
}catch (e19826){var e_19838 = e19826;
lt.object.raise.call(null,lt.objs.clients.clients,new cljs.core.Keyword(null,"message","message",-406056002),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cb,new cljs.core.Keyword(null,"editor.eval.cljs.exception","editor.eval.cljs.exception",1627126758),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"ex","ex",-1413771341),e_19838,new cljs.core.Keyword(null,"meta","meta",1499536964),new cljs.core.Keyword(null,"meta","meta",1499536964).cljs$core$IFn$_invoke$arity$1(res)], null)], null));
}
var G__19839 = cljs.core.next.call(null,seq__19821__$1);
var G__19840 = null;
var G__19841 = (0);
var G__19842 = (0);
seq__19821 = G__19839;
chunk__19822 = G__19840;
count__19823 = G__19841;
i__19824 = G__19842;
continue;
}
} else {
return null;
}
}
break;
}
}));
cljs.core._add_method.call(null,lt.objs.clients.local.on_message,new cljs.core.Keyword(null,"editor.eval.js","editor.eval.js",-264636460),(function (_,data,cb){
var code = lt.objs.eval.append_source_file.call(null,new cljs.core.Keyword(null,"code","code",1586293142).cljs$core$IFn$_invoke$arity$1(data),new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(data));
try{return lt.object.raise.call(null,lt.objs.clients.clients,new cljs.core.Keyword(null,"message","message",-406056002),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cb,new cljs.core.Keyword(null,"editor.eval.js.result","editor.eval.js.result",1499033068),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"result","result",1415092211),eval.call(window,code),new cljs.core.Keyword(null,"meta","meta",1499536964),new cljs.core.Keyword(null,"meta","meta",1499536964).cljs$core$IFn$_invoke$arity$1(data)], null)], null));
}catch (e19843){var e = e19843;
return lt.object.raise.call(null,lt.objs.clients.clients,new cljs.core.Keyword(null,"message","message",-406056002),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cb,new cljs.core.Keyword(null,"editor.eval.js.exception","editor.eval.js.exception",1928121505),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"ex","ex",-1413771341),e,new cljs.core.Keyword(null,"meta","meta",1499536964),new cljs.core.Keyword(null,"meta","meta",1499536964).cljs$core$IFn$_invoke$arity$1(data)], null)], null));
}}));
cljs.core._add_method.call(null,lt.objs.clients.local.on_message,new cljs.core.Keyword(null,"editor.eval.css","editor.eval.css",601791630),(function (_,data,cb){
var name = [cljs.core.str("local-"),cljs.core.str(clojure.string.replace.call(null,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(data),/[^a-zA-Z0-9]+/,"-"))].join('');
var cur = lt.util.dom.$.call(null,[cljs.core.str("#"),cljs.core.str(name)].join(''));
if(cljs.core.truth_(cur)){
lt.util.dom.remove.call(null,cur);
} else {
}

return lt.util.dom.append.call(null,lt.util.dom.$.call(null,new cljs.core.Keyword(null,"head","head",-771383919)),crate.core.html.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),"text/css",new cljs.core.Keyword(null,"id","id",-1388402092),name], null),new cljs.core.Keyword(null,"code","code",1586293142).cljs$core$IFn$_invoke$arity$1(data)], null)));
}));
cljs.core._add_method.call(null,lt.objs.clients.local.on_message,new cljs.core.Keyword(null,"client.close","client.close",-1160979233),(function (_,___$1,___$2){
return lt.objs.clients.rem_BANG_.call(null,lt.objs.clients.by_name.call(null,lt.objs.clients.local.client_name));
}));
cljs.core._add_method.call(null,lt.objs.clients.local.on_message,new cljs.core.Keyword(null,"default","default",-1987822328),(function (){
return null;
}));
/**
 * 
 */
lt.objs.clients.local.__BEH__send_BANG_ = (function lt$objs$clients$local$__BEH__send_BANG_(this$,data){
return lt.objs.clients.local.on_message.call(null,cljs.core.keyword.call(null,new cljs.core.Keyword(null,"command","command",-894540724).cljs$core$IFn$_invoke$arity$1(data)),new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(data),new cljs.core.Keyword(null,"cb","cb",589947841).cljs$core$IFn$_invoke$arity$1(data));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.clients.local","send!","lt.objs.clients.local/send!",-1692781143),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"send!","send!",480076706),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.clients.local.__BEH__send_BANG_);
lt.objs.clients.local.init = (function lt$objs$clients$local$init(){
return lt.objs.clients.handle_connection_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"name","name",1843675177),lt.objs.clients.local.client_name,new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"client.local","client.local",1035010693)], null),new cljs.core.Keyword(null,"root-relative","root-relative",-2050402019),lt.objs.files.lt_home.call(null,"core"),new cljs.core.Keyword(null,"commands","commands",161008658),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"editor.eval.cljs.exec","editor.eval.cljs.exec",141962241),null,new cljs.core.Keyword(null,"editor.eval.css","editor.eval.css",601791630),null,new cljs.core.Keyword(null,"editor.eval.js","editor.eval.js",-264636460),null], null), null),new cljs.core.Keyword(null,"type","type",1174270348),"LT-UI"], null));
});
lt.objs.sidebar.clients.add_connector.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"name","name",1843675177),"Light Table UI",new cljs.core.Keyword(null,"desc","desc",2093485764),"Connect to this instance of Light Table and evaluate in the local context.",new cljs.core.Keyword(null,"connect","connect",1232828233),(function (){
if(cljs.core.truth_(lt.objs.clients.by_name.call(null,lt.objs.clients.local.client_name))){
return null;
} else {
return lt.objs.clients.local.init.call(null);
}
})], null));
