// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.objs.eval');
goog.require('cljs.core');
goog.require('lt.objs.sidebar.command');
goog.require('lt.objs.notifos');
goog.require('lt.objs.platform');
goog.require('lt.objs.console');
goog.require('lt.objs.editor');
goog.require('crate.core');
goog.require('lt.object');
goog.require('lt.util.dom');
goog.require('lt.util.cljs');
goog.require('lt.objs.menu');
goog.require('lt.objs.canvas');
goog.require('lt.objs.popup');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.files');
goog.require('lt.objs.clients');
goog.require('clojure.string');
goog.require('cljs.reader');
goog.require('crate.binding');
/**
 * 
 */
lt.objs.eval.button = (function lt$objs$eval$button(var_args){
var args__7875__auto__ = [];
var len__7868__auto___18126 = arguments.length;
var i__7869__auto___18127 = (0);
while(true){
if((i__7869__auto___18127 < len__7868__auto___18126)){
args__7875__auto__.push((arguments[i__7869__auto___18127]));

var G__18128 = (i__7869__auto___18127 + (1));
i__7869__auto___18127 = G__18128;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((1) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((1)),(0),null)):null);
return lt.objs.eval.button.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7876__auto__);
});

lt.objs.eval.button.cljs$core$IFn$_invoke$arity$variadic = (function (label,p__18112){
var vec__18113 = p__18112;
var cb = cljs.core.nth.call(null,vec__18113,(0),null);
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.button.right","div.button.right",1623860542),label], null));
var seq__18116_18129 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__,vec__18113,cb){
return (function (){
if(cljs.core.truth_(cb)){
return cb.call(null);
} else {
return null;
}
});})(e__7942__auto__,vec__18113,cb))
], null)));
var chunk__18117_18130 = null;
var count__18118_18131 = (0);
var i__18119_18132 = (0);
while(true){
if((i__18119_18132 < count__18118_18131)){
var vec__18120_18133 = cljs.core._nth.call(null,chunk__18117_18130,i__18119_18132);
var ev__7943__auto___18134 = cljs.core.nth.call(null,vec__18120_18133,(0),null);
var func__7944__auto___18135 = cljs.core.nth.call(null,vec__18120_18133,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___18134,func__7944__auto___18135);

var G__18136 = seq__18116_18129;
var G__18137 = chunk__18117_18130;
var G__18138 = count__18118_18131;
var G__18139 = (i__18119_18132 + (1));
seq__18116_18129 = G__18136;
chunk__18117_18130 = G__18137;
count__18118_18131 = G__18138;
i__18119_18132 = G__18139;
continue;
} else {
var temp__4657__auto___18140 = cljs.core.seq.call(null,seq__18116_18129);
if(temp__4657__auto___18140){
var seq__18116_18141__$1 = temp__4657__auto___18140;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__18116_18141__$1)){
var c__7604__auto___18142 = cljs.core.chunk_first.call(null,seq__18116_18141__$1);
var G__18143 = cljs.core.chunk_rest.call(null,seq__18116_18141__$1);
var G__18144 = c__7604__auto___18142;
var G__18145 = cljs.core.count.call(null,c__7604__auto___18142);
var G__18146 = (0);
seq__18116_18129 = G__18143;
chunk__18117_18130 = G__18144;
count__18118_18131 = G__18145;
i__18119_18132 = G__18146;
continue;
} else {
var vec__18123_18147 = cljs.core.first.call(null,seq__18116_18141__$1);
var ev__7943__auto___18148 = cljs.core.nth.call(null,vec__18123_18147,(0),null);
var func__7944__auto___18149 = cljs.core.nth.call(null,vec__18123_18147,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___18148,func__7944__auto___18149);

var G__18150 = cljs.core.next.call(null,seq__18116_18141__$1);
var G__18151 = null;
var G__18152 = (0);
var G__18153 = (0);
seq__18116_18129 = G__18150;
chunk__18117_18130 = G__18151;
count__18118_18131 = G__18152;
i__18119_18132 = G__18153;
continue;
}
} else {
}
}
break;
}

return e__7942__auto__;
});

lt.objs.eval.button.cljs$lang$maxFixedArity = (1);

lt.objs.eval.button.cljs$lang$applyTo = (function (seq18110){
var G__18111 = cljs.core.first.call(null,seq18110);
var seq18110__$1 = cljs.core.next.call(null,seq18110);
return lt.objs.eval.button.cljs$core$IFn$_invoke$arity$variadic(G__18111,seq18110__$1);
});

lt.objs.eval.unescape_unicode = (function lt$objs$eval$unescape_unicode(s){
return clojure.string.replace.call(null,s,/\\x(..)/,(function (res,r){
return String.fromCharCode(parseInt(r,(16)));
}));
});
var ev_id_18154 = cljs.core.atom.call(null,(0));
lt.objs.eval.append_source_file = ((function (ev_id_18154){
return (function lt$objs$eval$append_source_file(code,file){
return [cljs.core.str(code),cljs.core.str("\n\n//# sourceURL="),cljs.core.str((function (){var or__6793__auto__ = file;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return "evalresult";
}
})()),cljs.core.str("[eval"),cljs.core.str(cljs.core.swap_BANG_.call(null,ev_id_18154,cljs.core.inc)),cljs.core.str("]")].join('');
});})(ev_id_18154))
;
lt.objs.eval.pad = (function lt$objs$eval$pad(code,lines){
return [cljs.core.str(cljs.core.reduce.call(null,cljs.core.str,cljs.core.repeat.call(null,lines,"\n"))),cljs.core.str(code)].join('');
});
lt.objs.eval.cljs_result_format = (function lt$objs$eval$cljs_result_format(n){
if(cljs.core.coll_QMARK_.call(null,n)){
return cljs.core.pr_str.call(null,n);
} else {
if(cljs.core.fn_QMARK_.call(null,n)){
return [cljs.core.str("(fn "),cljs.core.str(n.name),cljs.core.str(" ..)")].join('');
} else {
if((n == null)){
return "nil";
} else {
if(cljs.core._EQ_.call(null,cljs.core.pr_str.call(null,n),"#<[object Object]>")){
return lt.objs.console.inspect.call(null,n);
} else {
return cljs.core.pr_str.call(null,n);

}
}
}
}
});
/**
 * 
 */
lt.objs.eval.__BEH__on_selected_cb = (function lt$objs$eval$__BEH__on_selected_cb(obj,client){
var cb = cljs.core.deref.call(null,obj).call(null,new cljs.core.Keyword(null,"cb","cb",589947841));
return cb.call(null,client);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.eval","on-selected-cb","lt.objs.eval/on-selected-cb",1289264822),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"selected","selected",574897764),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.eval.__BEH__on_selected_cb);
/**
 * 
 */
lt.objs.eval.__BEH__on_selected_destroy = (function lt$objs$eval$__BEH__on_selected_destroy(obj,client){
return lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"destroy","destroy",-843660405));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.eval","on-selected-destroy","lt.objs.eval/on-selected-destroy",-1935381123),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"selected","selected",574897764),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.eval.__BEH__on_selected_destroy);
lt.objs.eval.eval_queue = cljs.core.atom.call(null,cljs.core.PersistentVector.EMPTY);
/**
 * 
 */
lt.objs.eval.__BEH__queue_on_no_client = (function lt$objs$eval$__BEH__queue_on_no_client(this$,queue_item){
return cljs.core.swap_BANG_.call(null,lt.objs.eval.eval_queue,cljs.core.conj,queue_item);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.eval","queue-on-no-client","lt.objs.eval/queue-on-no-client",-1841950432),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"no-client","no-client",-373374621),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.eval.__BEH__queue_on_no_client);
/**
 * 
 */
lt.objs.eval.__BEH__alert_on_no_client = (function lt$objs$eval$__BEH__alert_on_no_client(this$){
return lt.objs.popup.popup_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"header","header",119441134),"No client available.",new cljs.core.Keyword(null,"body","body",-2049205669),"We don't know what kind of client you want for this one. Try starting a client by choosing one of the connection types in the connect panel.",new cljs.core.Keyword(null,"buttons","buttons",-1953831197),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"Connect a client",new cljs.core.Keyword(null,"action","action",-811238024),(function (){
return lt.objs.sidebar.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"show-add-connection","show-add-connection",652692070));
})], null)], null)], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.eval","alert-on-no-client","lt.objs.eval/alert-on-no-client",982219007),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"no-client","no-client",-373374621),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.eval.__BEH__alert_on_no_client);
/**
 * 
 */
lt.objs.eval.__BEH__queue_BANG_ = (function lt$objs$eval$__BEH__queue_BANG_(this$,queue_item){
return cljs.core.swap_BANG_.call(null,lt.objs.eval.eval_queue,cljs.core.conj,queue_item);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.eval","queue!","lt.objs.eval/queue!",-388544652),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"queue!","queue!",-1061064868),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.eval.__BEH__queue_BANG_);
lt.objs.eval.drain = (function lt$objs$eval$drain(queue){
return cljs.core.vec.call(null,cljs.core.remove.call(null,(function (cur){
var vec__18161 = cur;
var _ = cljs.core.nth.call(null,vec__18161,(0),null);
var ___$1 = cljs.core.nth.call(null,vec__18161,(1),null);
var cb = cljs.core.nth.call(null,vec__18161,(2),null);
var vec__18164 = cljs.core.apply.call(null,lt.objs.clients.discover,cur);
var result = cljs.core.nth.call(null,vec__18164,(0),null);
var client = cljs.core.nth.call(null,vec__18164,(1),null);
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"found","found",-584700170),result)){
cb.call(null,client);

return true;
} else {
return null;
}
}),queue));
});
/**
 * 
 */
lt.objs.eval.__BEH__on_connect_check_queue = (function lt$objs$eval$__BEH__on_connect_check_queue(this$){
return cljs.core.swap_BANG_.call(null,lt.objs.eval.eval_queue,lt.objs.eval.drain);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.eval","on-connect-check-queue","lt.objs.eval/on-connect-check-queue",-2059851612),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"connect","connect",1232828233),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.eval.__BEH__on_connect_check_queue);
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.eval","evaler","lt.objs.eval/evaler",1676715817),new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"evaler","evaler",197619505),null], null), null),new cljs.core.Keyword(null,"init","init",-1875481434),(function (){
return null;
}));
lt.objs.eval.evaler = lt.object.create.call(null,new cljs.core.Keyword("lt.objs.eval","evaler","lt.objs.eval/evaler",1676715817));
lt.object.add_behavior_BANG_.call(null,lt.objs.clients.clients,new cljs.core.Keyword("lt.objs.eval","on-connect-check-queue","lt.objs.eval/on-connect-check-queue",-2059851612));
lt.objs.eval.try_read = (function lt$objs$eval$try_read(r){
try{return cljs.reader.read_string.call(null,r);
}catch (e18168){var e = e18168;
return lt.objs.console.error.call(null,e);
}});
lt.objs.eval.find_client = (function lt$objs$eval$find_client(p__18169){
var map__18178 = p__18169;
var map__18178__$1 = ((((!((map__18178 == null)))?((((map__18178.cljs$lang$protocol_mask$partition0$ & (64))) || (map__18178.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__18178):map__18178);
var opts = map__18178__$1;
var origin = cljs.core.get.call(null,map__18178__$1,new cljs.core.Keyword(null,"origin","origin",1037372088));
var command = cljs.core.get.call(null,map__18178__$1,new cljs.core.Keyword(null,"command","command",-894540724));
var info = cljs.core.get.call(null,map__18178__$1,new cljs.core.Keyword(null,"info","info",-317069002));
var key = cljs.core.get.call(null,map__18178__$1,new cljs.core.Keyword(null,"key","key",-1516042587));
var create = cljs.core.get.call(null,map__18178__$1,new cljs.core.Keyword(null,"create","create",-1301499256));
var vec__18180 = lt.objs.clients.discover.call(null,command,info);
var result = cljs.core.nth.call(null,vec__18180,(0),null);
var client = cljs.core.nth.call(null,vec__18180,(1),null);
var key__$1 = (function (){var or__6793__auto__ = key;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return new cljs.core.Keyword(null,"default","default",-1987822328);
}
})();
var pred__18183 = cljs.core._EQ_;
var expr__18184 = result;
if(cljs.core.truth_(pred__18183.call(null,new cljs.core.Keyword(null,"none","none",1333468478),expr__18184))){
if(cljs.core.truth_(create)){
return create.call(null,opts);
} else {
lt.objs.notifos.done_working.call(null);

lt.object.raise.call(null,lt.objs.eval.evaler,new cljs.core.Keyword(null,"no-client","no-client",-373374621),opts);

return lt.objs.clients.placeholder.call(null);
}
} else {
if(cljs.core.truth_(pred__18183.call(null,new cljs.core.Keyword(null,"found","found",-584700170),expr__18184))){
return client;
} else {
if(cljs.core.truth_(pred__18183.call(null,new cljs.core.Keyword(null,"select","select",1147833503),expr__18184))){
lt.object.raise.call(null,lt.objs.eval.evaler,new cljs.core.Keyword(null,"select-client","select-client",1739667626),client,((function (pred__18183,expr__18184,vec__18180,result,client,key__$1,map__18178,map__18178__$1,opts,origin,command,info,key,create){
return (function (client__$1){
lt.objs.clients.swap_client_BANG_.call(null,key__$1.call(null,new cljs.core.Keyword(null,"client","client",-1323448117).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,origin))),client__$1);

return lt.object.update_BANG_.call(null,origin,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"client","client",-1323448117)], null),cljs.core.assoc,key__$1,client__$1);
});})(pred__18183,expr__18184,vec__18180,result,client,key__$1,map__18178,map__18178__$1,opts,origin,command,info,key,create))
);

return lt.objs.clients.placeholder.call(null);
} else {
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(expr__18184)].join('')));
}
}
}
});
lt.objs.eval.get_client_BANG_ = (function lt$objs$eval$get_client_BANG_(p__18186){
var map__18189 = p__18186;
var map__18189__$1 = ((((!((map__18189 == null)))?((((map__18189.cljs$lang$protocol_mask$partition0$ & (64))) || (map__18189.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__18189):map__18189);
var opts = map__18189__$1;
var origin = cljs.core.get.call(null,map__18189__$1,new cljs.core.Keyword(null,"origin","origin",1037372088));
var command = cljs.core.get.call(null,map__18189__$1,new cljs.core.Keyword(null,"command","command",-894540724));
var key = cljs.core.get.call(null,map__18189__$1,new cljs.core.Keyword(null,"key","key",-1516042587));
var create = cljs.core.get.call(null,map__18189__$1,new cljs.core.Keyword(null,"create","create",-1301499256));
var key__$1 = (function (){var or__6793__auto__ = key;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return new cljs.core.Keyword(null,"default","default",-1987822328);
}
})();
var cur = key__$1.call(null,new cljs.core.Keyword(null,"client","client",-1323448117).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,origin)));
if(cljs.core.truth_((function (){var and__6781__auto__ = cur;
if(cljs.core.truth_(and__6781__auto__)){
return lt.objs.clients.available_QMARK_.call(null,cur);
} else {
return and__6781__auto__;
}
})())){
return cur;
} else {
var neue = lt.objs.eval.find_client.call(null,opts);
lt.object.update_BANG_.call(null,origin,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"client","client",-1323448117)], null),cljs.core.assoc,key__$1,neue);

lt.object.raise.call(null,origin,new cljs.core.Keyword(null,"set-client","set-client",-1338996324),neue);

return neue;
}
});
lt.objs.eval.__GT_result_class = (function lt$objs$eval$__GT_result_class(this$,trunc){
return [cljs.core.str(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(this$)),cljs.core.str("-result result-mark"),cljs.core.str((cljs.core.truth_((function (){var or__6793__auto__ = new cljs.core.Keyword(null,"open","open",-1763596448).cljs$core$IFn$_invoke$arity$1(this$);
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return cljs.core.not.call(null,trunc);
}
})())?" open":null))].join('');
});
lt.objs.eval.truncate_result = (function lt$objs$eval$truncate_result(var_args){
var args18191 = [];
var len__7868__auto___18194 = arguments.length;
var i__7869__auto___18195 = (0);
while(true){
if((i__7869__auto___18195 < len__7868__auto___18194)){
args18191.push((arguments[i__7869__auto___18195]));

var G__18196 = (i__7869__auto___18195 + (1));
i__7869__auto___18195 = G__18196;
continue;
} else {
}
break;
}

var G__18193 = args18191.length;
switch (G__18193) {
case 1:
return lt.objs.eval.truncate_result.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return lt.objs.eval.truncate_result.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18191.length)].join('')));

}
});

lt.objs.eval.truncate_result.cljs$core$IFn$_invoke$arity$1 = (function (r){
return lt.objs.eval.truncate_result.call(null,r,null);
});

lt.objs.eval.truncate_result.cljs$core$IFn$_invoke$arity$2 = (function (r,opts){
if(typeof r === 'string'){
var nl = r.indexOf("\n");
var len = (((nl > (-1)))?nl:new cljs.core.Keyword(null,"trunc-length","trunc-length",1359666678).cljs$core$IFn$_invoke$arity$2(opts,(50)));
if((cljs.core.count.call(null,r) > len)){
return [cljs.core.str(cljs.core.subs.call(null,r,(0),len)),cljs.core.str(" \u2026")].join('');
} else {
return r;
}
} else {
return null;
}
});

lt.objs.eval.truncate_result.cljs$lang$maxFixedArity = 2;

/**
 * 
 */
lt.objs.eval.__GT_inline_res = (function lt$objs$eval$__GT_inline_res(this$,info){
var e__7942__auto__ = crate.core.html.call(null,(function (){var r = new cljs.core.Keyword(null,"result","result",1415092211).cljs$core$IFn$_invoke$arity$1(info);
var truncated = lt.objs.eval.truncate_result.call(null,r,info);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),crate.binding.bound.call(null,this$,((function (r,truncated){
return (function (p1__18198_SHARP_){
return lt.objs.eval.__GT_result_class.call(null,p1__18198_SHARP_,truncated);
});})(r,truncated))
)], null),(cljs.core.truth_(truncated)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.truncated","span.truncated",684030620),truncated], null):null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.full","span.full",751073405),r], null)], null);
})());
var seq__18209_18219 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"mousewheel","mousewheel",-648300011),((function (e__7942__auto__){
return (function (e){
return lt.util.dom.stop_propagation.call(null,e);
});})(e__7942__auto__))
,new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (e){
lt.util.dom.prevent.call(null,e);

return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"click","click",1912301393));
});})(e__7942__auto__))
,new cljs.core.Keyword(null,"contextmenu","contextmenu",-15887481),((function (e__7942__auto__){
return (function (e){
lt.util.dom.prevent.call(null,e);

return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"menu!","menu!",-1593399467),e);
});})(e__7942__auto__))
,new cljs.core.Keyword(null,"dblclick","dblclick",-1821330376),((function (e__7942__auto__){
return (function (e){
lt.util.dom.prevent.call(null,e);

return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"double-click","double-click",-733492993));
});})(e__7942__auto__))
], null)));
var chunk__18210_18220 = null;
var count__18211_18221 = (0);
var i__18212_18222 = (0);
while(true){
if((i__18212_18222 < count__18211_18221)){
var vec__18213_18223 = cljs.core._nth.call(null,chunk__18210_18220,i__18212_18222);
var ev__7943__auto___18224 = cljs.core.nth.call(null,vec__18213_18223,(0),null);
var func__7944__auto___18225 = cljs.core.nth.call(null,vec__18213_18223,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___18224,func__7944__auto___18225);

var G__18226 = seq__18209_18219;
var G__18227 = chunk__18210_18220;
var G__18228 = count__18211_18221;
var G__18229 = (i__18212_18222 + (1));
seq__18209_18219 = G__18226;
chunk__18210_18220 = G__18227;
count__18211_18221 = G__18228;
i__18212_18222 = G__18229;
continue;
} else {
var temp__4657__auto___18230 = cljs.core.seq.call(null,seq__18209_18219);
if(temp__4657__auto___18230){
var seq__18209_18231__$1 = temp__4657__auto___18230;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__18209_18231__$1)){
var c__7604__auto___18232 = cljs.core.chunk_first.call(null,seq__18209_18231__$1);
var G__18233 = cljs.core.chunk_rest.call(null,seq__18209_18231__$1);
var G__18234 = c__7604__auto___18232;
var G__18235 = cljs.core.count.call(null,c__7604__auto___18232);
var G__18236 = (0);
seq__18209_18219 = G__18233;
chunk__18210_18220 = G__18234;
count__18211_18221 = G__18235;
i__18212_18222 = G__18236;
continue;
} else {
var vec__18216_18237 = cljs.core.first.call(null,seq__18209_18231__$1);
var ev__7943__auto___18238 = cljs.core.nth.call(null,vec__18216_18237,(0),null);
var func__7944__auto___18239 = cljs.core.nth.call(null,vec__18216_18237,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___18238,func__7944__auto___18239);

var G__18240 = cljs.core.next.call(null,seq__18209_18231__$1);
var G__18241 = null;
var G__18242 = (0);
var G__18243 = (0);
seq__18209_18219 = G__18240;
chunk__18210_18220 = G__18241;
count__18211_18221 = G__18242;
i__18212_18222 = G__18243;
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
lt.objs.eval.__BEH__result_menu_PLUS_ = (function lt$objs$eval$__BEH__result_menu_PLUS_(this$,items){
return cljs.core.conj.call(null,items,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"label","label",1718410804),"Remove result",new cljs.core.Keyword(null,"order","order",-1254677256),(1),new cljs.core.Keyword(null,"click","click",1912301393),(function (){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"clear!","clear!",-144814418));
})], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"label","label",1718410804),"Copy result",new cljs.core.Keyword(null,"order","order",-1254677256),(2),new cljs.core.Keyword(null,"click","click",1912301393),(function (){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"copy","copy",-1077617309));
})], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.eval","result-menu+","lt.objs.eval/result-menu+",382443065),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"menu+","menu+",276559402),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.eval.__BEH__result_menu_PLUS_);
/**
 * 
 */
lt.objs.eval.__BEH__expand_on_click = (function lt$objs$eval$__BEH__expand_on_click(this$){
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"open","open",-1763596448),true], null));

return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"changed","changed",570724917));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.eval","expand-on-click","lt.objs.eval/expand-on-click",779131776),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"expand!","expand!",-1137486484),null,new cljs.core.Keyword(null,"click","click",1912301393),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.eval.__BEH__expand_on_click);
/**
 * 
 */
lt.objs.eval.__BEH__shrink_on_double_click = (function lt$objs$eval$__BEH__shrink_on_double_click(this$){
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"open","open",-1763596448),false], null));

lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"changed","changed",570724917));

return lt.objs.editor.focus.call(null,new cljs.core.Keyword(null,"ed","ed",436294224).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.eval","shrink-on-double-click","lt.objs.eval/shrink-on-double-click",1586746695),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"shrink!","shrink!",-1399365424),null,new cljs.core.Keyword(null,"double-click","double-click",-733492993),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.eval.__BEH__shrink_on_double_click);
/**
 * 
 */
lt.objs.eval.__BEH__destroy_on_cleared = (function lt$objs$eval$__BEH__destroy_on_cleared(this$){
return lt.object.destroy_BANG_.call(null,this$);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.eval","destroy-on-cleared","lt.objs.eval/destroy-on-cleared",-2133132471),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cleared","cleared",-1267667336),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.eval.__BEH__destroy_on_cleared);
/**
 * 
 */
lt.objs.eval.__BEH__clear_mark = (function lt$objs$eval$__BEH__clear_mark(this$){
if(cljs.core.truth_(cljs.core.deref.call(null,new cljs.core.Keyword(null,"ed","ed",436294224).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))))){
CodeMirror.off(new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),"change",new cljs.core.Keyword(null,"listener","listener",882147248).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));

CodeMirror.off(new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),"delete",new cljs.core.Keyword(null,"delete","delete",-1768633620).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));

new cljs.core.Keyword(null,"mark","mark",-373816345).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)).clear();

lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"clear","clear",1877104959));

return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"cleared","cleared",-1267667336));
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.eval","clear-mark","lt.objs.eval/clear-mark",1516035294),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"clear!","clear!",-144814418),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.eval.__BEH__clear_mark);
/**
 * 
 */
lt.objs.eval.__BEH__copy_result = (function lt$objs$eval$__BEH__copy_result(this$){
return lt.objs.platform.copy.call(null,new cljs.core.Keyword(null,"result","result",1415092211).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.eval","copy-result","lt.objs.eval/copy-result",887328803),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"copy","copy",-1077617309),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.eval.__BEH__copy_result);
/**
 * 
 */
lt.objs.eval.__BEH__changed = (function lt$objs$eval$__BEH__changed(this$){
return new cljs.core.Keyword(null,"mark","mark",-373816345).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)).changed();
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.eval","changed","lt.objs.eval/changed",169294381),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"changed","changed",570724917),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.eval.__BEH__changed);
/**
 * 
 */
lt.objs.eval.__BEH__update_BANG_ = (function lt$objs$eval$__BEH__update_BANG_(this$,res){
var content = lt.object.__GT_content.call(null,this$);
var full = lt.util.dom.$.call(null,new cljs.core.Keyword(null,".full",".full",311597931),content);
var scroll = lt.util.dom.scroll_top.call(null,full);
var temp__4657__auto___18244 = lt.objs.eval.truncate_result.call(null,res);
if(cljs.core.truth_(temp__4657__auto___18244)){
var t_18245 = temp__4657__auto___18244;
var temp__4657__auto___18246__$1 = lt.util.dom.$.call(null,new cljs.core.Keyword(null,".truncated",".truncated",-1238919096),content);
if(cljs.core.truth_(temp__4657__auto___18246__$1)){
var trunc_18247 = temp__4657__auto___18246__$1;
lt.util.dom.html.call(null,trunc_18247,t_18245);
} else {
}
} else {
}

lt.util.dom.html.call(null,full,res);

return lt.util.dom.scroll_top.call(null,full,scroll);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.eval","update!","lt.objs.eval/update!",1901264894),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"update!","update!",-1453508586),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.eval.__BEH__update_BANG_);
lt.objs.eval.new_line_change = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["",""], null);
/**
 * 
 */
lt.objs.eval.__BEH__move_mark = (function lt$objs$eval$__BEH__move_mark(this$,ch){
if(cljs.core.truth_(ch)){
var orig = new cljs.core.Keyword(null,"mark","mark",-373816345).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$));
var loc = orig.find();
var cur_line = lt.objs.editor.lh__GT_line.call(null,new cljs.core.Keyword(null,"ed","ed",436294224).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
if((cljs.core.not.call(null,loc)) || (cljs.core.empty_QMARK_.call(null,new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)).text))){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"clear!","clear!",-144814418));
} else {
if((((loc.line > ch.to.line)) && (cljs.core.empty_QMARK_.call(null,clojure.string.trim.call(null,lt.objs.editor.line.call(null,new cljs.core.Keyword(null,"ed","ed",436294224).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),loc.line))))) || ((((ch.to.ch >= loc.ch)) && (cljs.core._EQ_.call(null,ch.to.line,loc.line))) || ((ch.to.line > ch.from.line)))){
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mark","mark",-373816345),lt.objs.editor.bookmark.call(null,lt.objs.editor.__GT_cm_ed.call(null,new cljs.core.Keyword(null,"ed","ed",436294224).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"line","line",212345235),cur_line], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"widget","widget",-853968943),lt.object.__GT_content.call(null,this$),new cljs.core.Keyword(null,"insertLeft","insertLeft",1003144862),true], null))], null));

if(cljs.core.truth_(orig)){
return orig.clear();
} else {
return null;
}
} else {
return null;
}
}
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.eval","move-mark","lt.objs.eval/move-mark",-1700248206),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"move!","move!",-666957298),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.eval.__BEH__move_mark);
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.eval","inline-result","lt.objs.eval/inline-result",1129209318),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"clear!","clear!",-144814418),null,new cljs.core.Keyword(null,"click","click",1912301393),null,new cljs.core.Keyword(null,"double-click","double-click",-733492993),null], null), null),new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"inline.result","inline.result",-584762588),null,new cljs.core.Keyword(null,"inline","inline",1399884222),null], null), null),new cljs.core.Keyword(null,"init","init",-1875481434),(function (this$,info){
var temp__4657__auto__ = lt.objs.editor.__GT_cm_ed.call(null,new cljs.core.Keyword(null,"ed","ed",436294224).cljs$core$IFn$_invoke$arity$1(info));
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
var content = lt.objs.eval.__GT_inline_res.call(null,this$,info);
var delete$ = ((function (content,ed,temp__4657__auto__){
return (function (_){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"clear!","clear!",-144814418));
});})(content,ed,temp__4657__auto__))
;
var listener = ((function (content,delete$,ed,temp__4657__auto__){
return (function (line,change){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"move!","move!",-666957298),change);
});})(content,delete$,ed,temp__4657__auto__))
;
CodeMirror.on(new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(info),"change",listener);

CodeMirror.on(new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(info),"delete",delete$);

lt.object.merge_BANG_.call(null,this$,cljs.core.assoc.call(null,info,new cljs.core.Keyword(null,"listener","listener",882147248),listener,new cljs.core.Keyword(null,"delete","delete",-1768633620),delete$,new cljs.core.Keyword(null,"mark","mark",-373816345),lt.objs.editor.bookmark.call(null,ed,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"loc","loc",-584284901).cljs$core$IFn$_invoke$arity$1(info))], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"widget","widget",-853968943),content,new cljs.core.Keyword(null,"insertLeft","insertLeft",1003144862),true], null))));

return content;
} else {
return null;
}
}));
/**
 * 
 */
lt.objs.eval.__BEH__inline_results = (function lt$objs$eval$__BEH__inline_results(this$,res,loc,opts){
var ed = new cljs.core.Keyword(null,"ed","ed",436294224).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$));
var type = (function (){var or__6793__auto__ = new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return new cljs.core.Keyword(null,"inline","inline",1399884222);
}
})();
var line = lt.objs.editor.line_handle.call(null,ed,new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(loc));
var res_obj = lt.object.create.call(null,new cljs.core.Keyword("lt.objs.eval","inline-result","lt.objs.eval/inline-result",1129209318),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"ed","ed",436294224),this$,new cljs.core.Keyword(null,"class","class",-2030961996),cljs.core.name.call(null,type),new cljs.core.Keyword(null,"opts","opts",155075701),opts,new cljs.core.Keyword(null,"result","result",1415092211),res,new cljs.core.Keyword(null,"loc","loc",-584284901),loc,new cljs.core.Keyword(null,"line","line",212345235),line], null));
var temp__4657__auto___18261 = cljs.core.get.call(null,cljs.core.deref.call(null,this$).call(null,new cljs.core.Keyword(null,"widgets","widgets",-159098978)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [line,type], null));
if(cljs.core.truth_(temp__4657__auto___18261)){
var prev_18262 = temp__4657__auto___18261;
if(cljs.core.truth_(new cljs.core.Keyword(null,"open","open",-1763596448).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,prev_18262)))){
lt.object.merge_BANG_.call(null,res_obj,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"open","open",-1763596448),true], null));
} else {
}

lt.object.raise.call(null,prev_18262,new cljs.core.Keyword(null,"clear!","clear!",-144814418));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"start-line","start-line",-41746654).cljs$core$IFn$_invoke$arity$1(loc))){
var seq__18255_18263 = cljs.core.seq.call(null,cljs.core.map.call(null,((function (ed,type,line,res_obj){
return (function (p1__18248_SHARP_){
return cljs.core.get.call(null,cljs.core.deref.call(null,this$).call(null,new cljs.core.Keyword(null,"widgets","widgets",-159098978)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.objs.editor.line_handle.call(null,ed,p1__18248_SHARP_),type], null));
});})(ed,type,line,res_obj))
,cljs.core.range.call(null,new cljs.core.Keyword(null,"start-line","start-line",-41746654).cljs$core$IFn$_invoke$arity$1(loc),new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(loc))));
var chunk__18257_18264 = null;
var count__18258_18265 = (0);
var i__18259_18266 = (0);
while(true){
if((i__18259_18266 < count__18258_18265)){
var widget_18267 = cljs.core._nth.call(null,chunk__18257_18264,i__18259_18266);
if(cljs.core.truth_(widget_18267)){
lt.object.raise.call(null,widget_18267,new cljs.core.Keyword(null,"clear!","clear!",-144814418));

var G__18268 = seq__18255_18263;
var G__18269 = chunk__18257_18264;
var G__18270 = count__18258_18265;
var G__18271 = (i__18259_18266 + (1));
seq__18255_18263 = G__18268;
chunk__18257_18264 = G__18269;
count__18258_18265 = G__18270;
i__18259_18266 = G__18271;
continue;
} else {
var G__18272 = seq__18255_18263;
var G__18273 = chunk__18257_18264;
var G__18274 = count__18258_18265;
var G__18275 = (i__18259_18266 + (1));
seq__18255_18263 = G__18272;
chunk__18257_18264 = G__18273;
count__18258_18265 = G__18274;
i__18259_18266 = G__18275;
continue;
}
} else {
var temp__4657__auto___18276 = cljs.core.seq.call(null,seq__18255_18263);
if(temp__4657__auto___18276){
var seq__18255_18277__$1 = temp__4657__auto___18276;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__18255_18277__$1)){
var c__7604__auto___18278 = cljs.core.chunk_first.call(null,seq__18255_18277__$1);
var G__18279 = cljs.core.chunk_rest.call(null,seq__18255_18277__$1);
var G__18280 = c__7604__auto___18278;
var G__18281 = cljs.core.count.call(null,c__7604__auto___18278);
var G__18282 = (0);
seq__18255_18263 = G__18279;
chunk__18257_18264 = G__18280;
count__18258_18265 = G__18281;
i__18259_18266 = G__18282;
continue;
} else {
var widget_18283 = cljs.core.first.call(null,seq__18255_18277__$1);
if(cljs.core.truth_(widget_18283)){
lt.object.raise.call(null,widget_18283,new cljs.core.Keyword(null,"clear!","clear!",-144814418));

var G__18284 = cljs.core.next.call(null,seq__18255_18277__$1);
var G__18285 = null;
var G__18286 = (0);
var G__18287 = (0);
seq__18255_18263 = G__18284;
chunk__18257_18264 = G__18285;
count__18258_18265 = G__18286;
i__18259_18266 = G__18287;
continue;
} else {
var G__18288 = cljs.core.next.call(null,seq__18255_18277__$1);
var G__18289 = null;
var G__18290 = (0);
var G__18291 = (0);
seq__18255_18263 = G__18288;
chunk__18257_18264 = G__18289;
count__18258_18265 = G__18290;
i__18259_18266 = G__18291;
continue;
}
}
} else {
}
}
break;
}
} else {
}

return lt.object.update_BANG_.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"widgets","widgets",-159098978)], null),cljs.core.assoc,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [line,type], null),res_obj);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.eval","inline-results","lt.objs.eval/inline-results",-2050555669),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.result","editor.result",1220762810),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.eval.__BEH__inline_results);
lt.objs.eval.__GT_spacing = (function lt$objs$eval$__GT_spacing(text){
if(cljs.core.truth_(text)){
return cljs.core.first.call(null,cljs.core.re_seq.call(null,/^\s+/,text));
} else {
return null;
}
});
/**
 * 
 */
lt.objs.eval.__GT_underline_result = (function lt$objs$eval$__GT_underline_result(this$,info){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),[cljs.core.str("underline-result "),cljs.core.str((cljs.core.truth_(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(info))?new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(info):null))].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.spacer","span.spacer",-2102507001),lt.objs.eval.__GT_spacing.call(null,lt.objs.editor.line.call(null,new cljs.core.Keyword(null,"ed","ed",436294224).cljs$core$IFn$_invoke$arity$1(info),new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"loc","loc",-584284901).cljs$core$IFn$_invoke$arity$1(info))))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pre","pre",2118456869),new cljs.core.Keyword(null,"result","result",1415092211).cljs$core$IFn$_invoke$arity$1(info)], null)], null));
var seq__18302_18312 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (e){
lt.util.dom.prevent.call(null,e);

return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"click","click",1912301393));
});})(e__7942__auto__))
,new cljs.core.Keyword(null,"contextmenu","contextmenu",-15887481),((function (e__7942__auto__){
return (function (e){
lt.util.dom.prevent.call(null,e);

return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"menu!","menu!",-1593399467),e);
});})(e__7942__auto__))
,new cljs.core.Keyword(null,"dblclick","dblclick",-1821330376),((function (e__7942__auto__){
return (function (e){
lt.util.dom.prevent.call(null,e);

return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"double-click","double-click",-733492993));
});})(e__7942__auto__))
], null)));
var chunk__18303_18313 = null;
var count__18304_18314 = (0);
var i__18305_18315 = (0);
while(true){
if((i__18305_18315 < count__18304_18314)){
var vec__18306_18316 = cljs.core._nth.call(null,chunk__18303_18313,i__18305_18315);
var ev__7943__auto___18317 = cljs.core.nth.call(null,vec__18306_18316,(0),null);
var func__7944__auto___18318 = cljs.core.nth.call(null,vec__18306_18316,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___18317,func__7944__auto___18318);

var G__18319 = seq__18302_18312;
var G__18320 = chunk__18303_18313;
var G__18321 = count__18304_18314;
var G__18322 = (i__18305_18315 + (1));
seq__18302_18312 = G__18319;
chunk__18303_18313 = G__18320;
count__18304_18314 = G__18321;
i__18305_18315 = G__18322;
continue;
} else {
var temp__4657__auto___18323 = cljs.core.seq.call(null,seq__18302_18312);
if(temp__4657__auto___18323){
var seq__18302_18324__$1 = temp__4657__auto___18323;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__18302_18324__$1)){
var c__7604__auto___18325 = cljs.core.chunk_first.call(null,seq__18302_18324__$1);
var G__18326 = cljs.core.chunk_rest.call(null,seq__18302_18324__$1);
var G__18327 = c__7604__auto___18325;
var G__18328 = cljs.core.count.call(null,c__7604__auto___18325);
var G__18329 = (0);
seq__18302_18312 = G__18326;
chunk__18303_18313 = G__18327;
count__18304_18314 = G__18328;
i__18305_18315 = G__18329;
continue;
} else {
var vec__18309_18330 = cljs.core.first.call(null,seq__18302_18324__$1);
var ev__7943__auto___18331 = cljs.core.nth.call(null,vec__18309_18330,(0),null);
var func__7944__auto___18332 = cljs.core.nth.call(null,vec__18309_18330,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___18331,func__7944__auto___18332);

var G__18333 = cljs.core.next.call(null,seq__18302_18324__$1);
var G__18334 = null;
var G__18335 = (0);
var G__18336 = (0);
seq__18302_18312 = G__18333;
chunk__18303_18313 = G__18334;
count__18304_18314 = G__18335;
i__18305_18315 = G__18336;
continue;
}
} else {
}
}
break;
}

return e__7942__auto__;
});
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.eval","underline-result","lt.objs.eval/underline-result",285332309),new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"inline.underline-result","inline.underline-result",1571564206),null,new cljs.core.Keyword(null,"inline","inline",1399884222),null], null), null),new cljs.core.Keyword(null,"init","init",-1875481434),(function (this$,info){
var content = lt.objs.eval.__GT_underline_result.call(null,this$,info);
var delete$ = ((function (content){
return (function (_){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"clear!","clear!",-144814418));
});})(content))
;
var listener = ((function (content,delete$){
return (function (line,change){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"move!","move!",-666957298),change);
});})(content,delete$))
;
CodeMirror.on(new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(info),"change",listener);

CodeMirror.on(new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(info),"delete",delete$);

lt.object.merge_BANG_.call(null,this$,cljs.core.assoc.call(null,info,new cljs.core.Keyword(null,"widget","widget",-853968943),lt.objs.editor.line_widget.call(null,lt.objs.editor.__GT_cm_ed.call(null,new cljs.core.Keyword(null,"ed","ed",436294224).cljs$core$IFn$_invoke$arity$1(info)),new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"loc","loc",-584284901).cljs$core$IFn$_invoke$arity$1(info)),content,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"coverGutter","coverGutter",-1643717810),false,new cljs.core.Keyword(null,"above","above",-1286866470),new cljs.core.Keyword(null,"above","above",-1286866470).cljs$core$IFn$_invoke$arity$1(info)], null))));

return content;
}));
/**
 * 
 */
lt.objs.eval.__BEH__underline_results = (function lt$objs$eval$__BEH__underline_results(this$,res,loc,opts){
var ed = new cljs.core.Keyword(null,"ed","ed",436294224).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$));
var line = lt.objs.editor.line_handle.call(null,ed,new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(loc));
var res_obj = lt.object.create.call(null,new cljs.core.Keyword("lt.objs.eval","underline-result","lt.objs.eval/underline-result",285332309),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"ed","ed",436294224),this$,new cljs.core.Keyword(null,"opts","opts",155075701),opts,new cljs.core.Keyword(null,"result","result",1415092211),res,new cljs.core.Keyword(null,"loc","loc",-584284901),loc,new cljs.core.Keyword(null,"line","line",212345235),line], null));
var temp__4657__auto___18350 = cljs.core.get.call(null,cljs.core.deref.call(null,this$).call(null,new cljs.core.Keyword(null,"widgets","widgets",-159098978)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [line,new cljs.core.Keyword(null,"underline","underline",2018066703)], null));
if(cljs.core.truth_(temp__4657__auto___18350)){
var prev_18351 = temp__4657__auto___18350;
if(cljs.core.truth_(new cljs.core.Keyword(null,"open","open",-1763596448).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,prev_18351)))){
lt.object.merge_BANG_.call(null,res_obj,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"open","open",-1763596448),true], null));
} else {
}

lt.object.raise.call(null,prev_18351,new cljs.core.Keyword(null,"clear!","clear!",-144814418));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"start-line","start-line",-41746654).cljs$core$IFn$_invoke$arity$1(loc))){
var seq__18344_18352 = cljs.core.seq.call(null,cljs.core.map.call(null,((function (ed,line,res_obj){
return (function (p1__18337_SHARP_){
return cljs.core.get.call(null,cljs.core.deref.call(null,this$).call(null,new cljs.core.Keyword(null,"widgets","widgets",-159098978)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.objs.editor.line_handle.call(null,ed,p1__18337_SHARP_),new cljs.core.Keyword(null,"underline","underline",2018066703)], null));
});})(ed,line,res_obj))
,cljs.core.range.call(null,new cljs.core.Keyword(null,"start-line","start-line",-41746654).cljs$core$IFn$_invoke$arity$1(loc),new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(loc))));
var chunk__18346_18353 = null;
var count__18347_18354 = (0);
var i__18348_18355 = (0);
while(true){
if((i__18348_18355 < count__18347_18354)){
var widget_18356 = cljs.core._nth.call(null,chunk__18346_18353,i__18348_18355);
if(cljs.core.truth_(widget_18356)){
lt.object.raise.call(null,widget_18356,new cljs.core.Keyword(null,"clear!","clear!",-144814418));

var G__18357 = seq__18344_18352;
var G__18358 = chunk__18346_18353;
var G__18359 = count__18347_18354;
var G__18360 = (i__18348_18355 + (1));
seq__18344_18352 = G__18357;
chunk__18346_18353 = G__18358;
count__18347_18354 = G__18359;
i__18348_18355 = G__18360;
continue;
} else {
var G__18361 = seq__18344_18352;
var G__18362 = chunk__18346_18353;
var G__18363 = count__18347_18354;
var G__18364 = (i__18348_18355 + (1));
seq__18344_18352 = G__18361;
chunk__18346_18353 = G__18362;
count__18347_18354 = G__18363;
i__18348_18355 = G__18364;
continue;
}
} else {
var temp__4657__auto___18365 = cljs.core.seq.call(null,seq__18344_18352);
if(temp__4657__auto___18365){
var seq__18344_18366__$1 = temp__4657__auto___18365;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__18344_18366__$1)){
var c__7604__auto___18367 = cljs.core.chunk_first.call(null,seq__18344_18366__$1);
var G__18368 = cljs.core.chunk_rest.call(null,seq__18344_18366__$1);
var G__18369 = c__7604__auto___18367;
var G__18370 = cljs.core.count.call(null,c__7604__auto___18367);
var G__18371 = (0);
seq__18344_18352 = G__18368;
chunk__18346_18353 = G__18369;
count__18347_18354 = G__18370;
i__18348_18355 = G__18371;
continue;
} else {
var widget_18372 = cljs.core.first.call(null,seq__18344_18366__$1);
if(cljs.core.truth_(widget_18372)){
lt.object.raise.call(null,widget_18372,new cljs.core.Keyword(null,"clear!","clear!",-144814418));

var G__18373 = cljs.core.next.call(null,seq__18344_18366__$1);
var G__18374 = null;
var G__18375 = (0);
var G__18376 = (0);
seq__18344_18352 = G__18373;
chunk__18346_18353 = G__18374;
count__18347_18354 = G__18375;
i__18348_18355 = G__18376;
continue;
} else {
var G__18377 = cljs.core.next.call(null,seq__18344_18366__$1);
var G__18378 = null;
var G__18379 = (0);
var G__18380 = (0);
seq__18344_18352 = G__18377;
chunk__18346_18353 = G__18378;
count__18347_18354 = G__18379;
i__18348_18355 = G__18380;
continue;
}
}
} else {
}
}
break;
}
} else {
}

return lt.object.update_BANG_.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"widgets","widgets",-159098978)], null),cljs.core.assoc,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [line,new cljs.core.Keyword(null,"underline","underline",2018066703)], null),res_obj);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.eval","underline-results","lt.objs.eval/underline-results",-78357079),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.result.underline","editor.result.underline",1348355587),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.eval.__BEH__underline_results);
/**
 * 
 */
lt.objs.eval.__BEH__copy_underline_result = (function lt$objs$eval$__BEH__copy_underline_result(this$){
return lt.objs.platform.copy.call(null,clojure.string.join.call(null,"\n",cljs.core.map.call(null,(function (p1__18381_SHARP_){
return p1__18381_SHARP_.innerText;
}),new cljs.core.Keyword(null,"result","result",1415092211).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)).children)));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.eval","copy-underline-result","lt.objs.eval/copy-underline-result",982238737),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"copy","copy",-1077617309),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.eval.__BEH__copy_underline_result);
lt.objs.eval.__GT_exception_class = (function lt$objs$eval$__GT_exception_class(this$){
return [cljs.core.str("inline-exception "),cljs.core.str((cljs.core.truth_(new cljs.core.Keyword(null,"open","open",-1763596448).cljs$core$IFn$_invoke$arity$1(this$))?"open":null))].join('');
});
/**
 * 
 */
lt.objs.eval.__GT_inline_exception = (function lt$objs$eval$__GT_inline_exception(this$,info){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),crate.binding.bound.call(null,this$,lt.objs.eval.__GT_exception_class)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.spacer","span.spacer",-2102507001),lt.objs.eval.__GT_spacing.call(null,lt.objs.editor.line.call(null,new cljs.core.Keyword(null,"ed","ed",436294224).cljs$core$IFn$_invoke$arity$1(info),new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"loc","loc",-584284901).cljs$core$IFn$_invoke$arity$1(info))))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pre","pre",2118456869),[cljs.core.str(new cljs.core.Keyword(null,"ex","ex",-1413771341).cljs$core$IFn$_invoke$arity$1(info))].join('')], null)], null));
var seq__18392_18402 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"click","click",1912301393));
});})(e__7942__auto__))
,new cljs.core.Keyword(null,"contextmenu","contextmenu",-15887481),((function (e__7942__auto__){
return (function (e){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"menu!","menu!",-1593399467),e);
});})(e__7942__auto__))
,new cljs.core.Keyword(null,"dblclick","dblclick",-1821330376),((function (e__7942__auto__){
return (function (){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"double-click","double-click",-733492993));
});})(e__7942__auto__))
], null)));
var chunk__18393_18403 = null;
var count__18394_18404 = (0);
var i__18395_18405 = (0);
while(true){
if((i__18395_18405 < count__18394_18404)){
var vec__18396_18406 = cljs.core._nth.call(null,chunk__18393_18403,i__18395_18405);
var ev__7943__auto___18407 = cljs.core.nth.call(null,vec__18396_18406,(0),null);
var func__7944__auto___18408 = cljs.core.nth.call(null,vec__18396_18406,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___18407,func__7944__auto___18408);

var G__18409 = seq__18392_18402;
var G__18410 = chunk__18393_18403;
var G__18411 = count__18394_18404;
var G__18412 = (i__18395_18405 + (1));
seq__18392_18402 = G__18409;
chunk__18393_18403 = G__18410;
count__18394_18404 = G__18411;
i__18395_18405 = G__18412;
continue;
} else {
var temp__4657__auto___18413 = cljs.core.seq.call(null,seq__18392_18402);
if(temp__4657__auto___18413){
var seq__18392_18414__$1 = temp__4657__auto___18413;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__18392_18414__$1)){
var c__7604__auto___18415 = cljs.core.chunk_first.call(null,seq__18392_18414__$1);
var G__18416 = cljs.core.chunk_rest.call(null,seq__18392_18414__$1);
var G__18417 = c__7604__auto___18415;
var G__18418 = cljs.core.count.call(null,c__7604__auto___18415);
var G__18419 = (0);
seq__18392_18402 = G__18416;
chunk__18393_18403 = G__18417;
count__18394_18404 = G__18418;
i__18395_18405 = G__18419;
continue;
} else {
var vec__18399_18420 = cljs.core.first.call(null,seq__18392_18414__$1);
var ev__7943__auto___18421 = cljs.core.nth.call(null,vec__18399_18420,(0),null);
var func__7944__auto___18422 = cljs.core.nth.call(null,vec__18399_18420,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___18421,func__7944__auto___18422);

var G__18423 = cljs.core.next.call(null,seq__18392_18414__$1);
var G__18424 = null;
var G__18425 = (0);
var G__18426 = (0);
seq__18392_18402 = G__18423;
chunk__18393_18403 = G__18424;
count__18394_18404 = G__18425;
i__18395_18405 = G__18426;
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
lt.objs.eval.__BEH__ex_shrink_on_double_click = (function lt$objs$eval$__BEH__ex_shrink_on_double_click(this$){
lt.objs.editor.focus.call(null,new cljs.core.Keyword(null,"ed","ed",436294224).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));

return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"clear!","clear!",-144814418));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.eval","ex-shrink-on-double-click","lt.objs.eval/ex-shrink-on-double-click",-754298474),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"shrink!","shrink!",-1399365424),null,new cljs.core.Keyword(null,"double-click","double-click",-733492993),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.eval.__BEH__ex_shrink_on_double_click);
/**
 * 
 */
lt.objs.eval.__BEH__ex_clear = (function lt$objs$eval$__BEH__ex_clear(this$){
if(cljs.core.truth_(lt.objs.editor.__GT_cm_ed.call(null,new cljs.core.Keyword(null,"ed","ed",436294224).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))))){
lt.objs.editor.remove_line_widget.call(null,lt.objs.editor.__GT_cm_ed.call(null,new cljs.core.Keyword(null,"ed","ed",436294224).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))),new cljs.core.Keyword(null,"widget","widget",-853968943).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
} else {
}

lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"clear","clear",1877104959));

return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"cleared","cleared",-1267667336));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.eval","ex-clear","lt.objs.eval/ex-clear",1775792373),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"clear!","clear!",-144814418),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.eval.__BEH__ex_clear);
/**
 * 
 */
lt.objs.eval.__BEH__ex_menu_PLUS_ = (function lt$objs$eval$__BEH__ex_menu_PLUS_(this$,items){
return cljs.core.conj.call(null,items,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"Remove exception",new cljs.core.Keyword(null,"click","click",1912301393),(function (){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"clear!","clear!",-144814418));
})], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"Copy exception",new cljs.core.Keyword(null,"click","click",1912301393),(function (){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"copy","copy",-1077617309));
})], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.eval","ex-menu+","lt.objs.eval/ex-menu+",-2096824851),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"menu+","menu+",276559402),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.eval.__BEH__ex_menu_PLUS_);
/**
 * 
 */
lt.objs.eval.__BEH__copy_exception = (function lt$objs$eval$__BEH__copy_exception(this$){
return lt.objs.platform.copy.call(null,new cljs.core.Keyword(null,"ex","ex",-1413771341).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.eval","copy-exception","lt.objs.eval/copy-exception",-937001060),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"copy","copy",-1077617309),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.eval.__BEH__copy_exception);
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.eval","inline-exception","lt.objs.eval/inline-exception",477455757),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"clear!","clear!",-144814418),null,new cljs.core.Keyword(null,"click","click",1912301393),null,new cljs.core.Keyword(null,"double-click","double-click",-733492993),null], null), null),new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"inline.exception","inline.exception",-1018603890),null,new cljs.core.Keyword(null,"inline","inline",1399884222),null], null), null),new cljs.core.Keyword(null,"init","init",-1875481434),(function (this$,info){
if(cljs.core.not.call(null,new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"loc","loc",-584284901).cljs$core$IFn$_invoke$arity$1(info)))){
return lt.objs.notifos.set_msg_BANG_.call(null,[cljs.core.str(new cljs.core.Keyword(null,"ex","ex",-1413771341).cljs$core$IFn$_invoke$arity$1(info))].join(''),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"error"], null));
} else {
var content = lt.objs.eval.__GT_inline_exception.call(null,this$,info);
lt.object.merge_BANG_.call(null,this$,cljs.core.assoc.call(null,info,new cljs.core.Keyword(null,"widget","widget",-853968943),lt.objs.editor.line_widget.call(null,lt.objs.editor.__GT_cm_ed.call(null,new cljs.core.Keyword(null,"ed","ed",436294224).cljs$core$IFn$_invoke$arity$1(info)),new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"loc","loc",-584284901).cljs$core$IFn$_invoke$arity$1(info)),content,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"coverGutter","coverGutter",-1643717810),false], null))));

return content;
}
}));
/**
 * 
 */
lt.objs.eval.__BEH__inline_exceptions = (function lt$objs$eval$__BEH__inline_exceptions(this$,ex,loc){
if(cljs.core.truth_((function (){var and__6781__auto__ = ex;
if(cljs.core.truth_(and__6781__auto__)){
var and__6781__auto____$1 = loc;
if(cljs.core.truth_(and__6781__auto____$1)){
return (new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(loc) >= (0));
} else {
return and__6781__auto____$1;
}
} else {
return and__6781__auto__;
}
})())){
var ed = new cljs.core.Keyword(null,"ed","ed",436294224).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$));
var line = lt.objs.editor.line_handle.call(null,ed,new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(loc));
var ex_obj = lt.object.create.call(null,new cljs.core.Keyword("lt.objs.eval","inline-exception","lt.objs.eval/inline-exception",477455757),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"ed","ed",436294224),this$,new cljs.core.Keyword(null,"ex","ex",-1413771341),ex,new cljs.core.Keyword(null,"loc","loc",-584284901),loc,new cljs.core.Keyword(null,"line","line",212345235),line], null));
var seq__18450_18472 = cljs.core.seq.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.get.call(null,cljs.core.deref.call(null,this$).call(null,new cljs.core.Keyword(null,"widgets","widgets",-159098978)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [line,new cljs.core.Keyword(null,"inline","inline",1399884222)], null)),cljs.core.get.call(null,cljs.core.deref.call(null,this$).call(null,new cljs.core.Keyword(null,"widgets","widgets",-159098978)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [line,new cljs.core.Keyword(null,"underline","underline",2018066703)], null))], null));
var chunk__18452_18473 = null;
var count__18453_18474 = (0);
var i__18454_18475 = (0);
while(true){
if((i__18454_18475 < count__18453_18474)){
var prev_18476 = cljs.core._nth.call(null,chunk__18452_18473,i__18454_18475);
if(cljs.core.truth_(prev_18476)){
if(cljs.core.truth_(new cljs.core.Keyword(null,"open","open",-1763596448).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,prev_18476)))){
lt.object.merge_BANG_.call(null,ex_obj,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"open","open",-1763596448),true], null));
} else {
}

lt.object.raise.call(null,prev_18476,new cljs.core.Keyword(null,"clear!","clear!",-144814418));

var G__18477 = seq__18450_18472;
var G__18478 = chunk__18452_18473;
var G__18479 = count__18453_18474;
var G__18480 = (i__18454_18475 + (1));
seq__18450_18472 = G__18477;
chunk__18452_18473 = G__18478;
count__18453_18474 = G__18479;
i__18454_18475 = G__18480;
continue;
} else {
var G__18481 = seq__18450_18472;
var G__18482 = chunk__18452_18473;
var G__18483 = count__18453_18474;
var G__18484 = (i__18454_18475 + (1));
seq__18450_18472 = G__18481;
chunk__18452_18473 = G__18482;
count__18453_18474 = G__18483;
i__18454_18475 = G__18484;
continue;
}
} else {
var temp__4657__auto___18485 = cljs.core.seq.call(null,seq__18450_18472);
if(temp__4657__auto___18485){
var seq__18450_18486__$1 = temp__4657__auto___18485;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__18450_18486__$1)){
var c__7604__auto___18487 = cljs.core.chunk_first.call(null,seq__18450_18486__$1);
var G__18488 = cljs.core.chunk_rest.call(null,seq__18450_18486__$1);
var G__18489 = c__7604__auto___18487;
var G__18490 = cljs.core.count.call(null,c__7604__auto___18487);
var G__18491 = (0);
seq__18450_18472 = G__18488;
chunk__18452_18473 = G__18489;
count__18453_18474 = G__18490;
i__18454_18475 = G__18491;
continue;
} else {
var prev_18492 = cljs.core.first.call(null,seq__18450_18486__$1);
if(cljs.core.truth_(prev_18492)){
if(cljs.core.truth_(new cljs.core.Keyword(null,"open","open",-1763596448).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,prev_18492)))){
lt.object.merge_BANG_.call(null,ex_obj,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"open","open",-1763596448),true], null));
} else {
}

lt.object.raise.call(null,prev_18492,new cljs.core.Keyword(null,"clear!","clear!",-144814418));

var G__18493 = cljs.core.next.call(null,seq__18450_18486__$1);
var G__18494 = null;
var G__18495 = (0);
var G__18496 = (0);
seq__18450_18472 = G__18493;
chunk__18452_18473 = G__18494;
count__18453_18474 = G__18495;
i__18454_18475 = G__18496;
continue;
} else {
var G__18497 = cljs.core.next.call(null,seq__18450_18486__$1);
var G__18498 = null;
var G__18499 = (0);
var G__18500 = (0);
seq__18450_18472 = G__18497;
chunk__18452_18473 = G__18498;
count__18453_18474 = G__18499;
i__18454_18475 = G__18500;
continue;
}
}
} else {
}
}
break;
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"start-line","start-line",-41746654).cljs$core$IFn$_invoke$arity$1(loc))){
var seq__18456_18501 = cljs.core.seq.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"inline","inline",1399884222),new cljs.core.Keyword(null,"underline","underline",2018066703)], null));
var chunk__18463_18502 = null;
var count__18464_18503 = (0);
var i__18465_18504 = (0);
while(true){
if((i__18465_18504 < count__18464_18503)){
var type_18505 = cljs.core._nth.call(null,chunk__18463_18502,i__18465_18504);
var seq__18466_18506 = cljs.core.seq.call(null,cljs.core.map.call(null,((function (seq__18456_18501,chunk__18463_18502,count__18464_18503,i__18465_18504,type_18505,ed,line,ex_obj){
return (function (p1__18427_SHARP_){
return cljs.core.get.call(null,cljs.core.deref.call(null,this$).call(null,new cljs.core.Keyword(null,"widgets","widgets",-159098978)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.objs.editor.line_handle.call(null,ed,p1__18427_SHARP_),type_18505], null));
});})(seq__18456_18501,chunk__18463_18502,count__18464_18503,i__18465_18504,type_18505,ed,line,ex_obj))
,cljs.core.range.call(null,new cljs.core.Keyword(null,"start-line","start-line",-41746654).cljs$core$IFn$_invoke$arity$1(loc),new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(loc))));
var chunk__18468_18507 = null;
var count__18469_18508 = (0);
var i__18470_18509 = (0);
while(true){
if((i__18470_18509 < count__18469_18508)){
var widget_18510 = cljs.core._nth.call(null,chunk__18468_18507,i__18470_18509);
if(cljs.core.truth_(widget_18510)){
lt.object.raise.call(null,widget_18510,new cljs.core.Keyword(null,"clear!","clear!",-144814418));

var G__18511 = seq__18466_18506;
var G__18512 = chunk__18468_18507;
var G__18513 = count__18469_18508;
var G__18514 = (i__18470_18509 + (1));
seq__18466_18506 = G__18511;
chunk__18468_18507 = G__18512;
count__18469_18508 = G__18513;
i__18470_18509 = G__18514;
continue;
} else {
var G__18515 = seq__18466_18506;
var G__18516 = chunk__18468_18507;
var G__18517 = count__18469_18508;
var G__18518 = (i__18470_18509 + (1));
seq__18466_18506 = G__18515;
chunk__18468_18507 = G__18516;
count__18469_18508 = G__18517;
i__18470_18509 = G__18518;
continue;
}
} else {
var temp__4657__auto___18519 = cljs.core.seq.call(null,seq__18466_18506);
if(temp__4657__auto___18519){
var seq__18466_18520__$1 = temp__4657__auto___18519;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__18466_18520__$1)){
var c__7604__auto___18521 = cljs.core.chunk_first.call(null,seq__18466_18520__$1);
var G__18522 = cljs.core.chunk_rest.call(null,seq__18466_18520__$1);
var G__18523 = c__7604__auto___18521;
var G__18524 = cljs.core.count.call(null,c__7604__auto___18521);
var G__18525 = (0);
seq__18466_18506 = G__18522;
chunk__18468_18507 = G__18523;
count__18469_18508 = G__18524;
i__18470_18509 = G__18525;
continue;
} else {
var widget_18526 = cljs.core.first.call(null,seq__18466_18520__$1);
if(cljs.core.truth_(widget_18526)){
lt.object.raise.call(null,widget_18526,new cljs.core.Keyword(null,"clear!","clear!",-144814418));

var G__18527 = cljs.core.next.call(null,seq__18466_18520__$1);
var G__18528 = null;
var G__18529 = (0);
var G__18530 = (0);
seq__18466_18506 = G__18527;
chunk__18468_18507 = G__18528;
count__18469_18508 = G__18529;
i__18470_18509 = G__18530;
continue;
} else {
var G__18531 = cljs.core.next.call(null,seq__18466_18520__$1);
var G__18532 = null;
var G__18533 = (0);
var G__18534 = (0);
seq__18466_18506 = G__18531;
chunk__18468_18507 = G__18532;
count__18469_18508 = G__18533;
i__18470_18509 = G__18534;
continue;
}
}
} else {
}
}
break;
}

var G__18535 = seq__18456_18501;
var G__18536 = chunk__18463_18502;
var G__18537 = count__18464_18503;
var G__18538 = (i__18465_18504 + (1));
seq__18456_18501 = G__18535;
chunk__18463_18502 = G__18536;
count__18464_18503 = G__18537;
i__18465_18504 = G__18538;
continue;
} else {
var temp__4657__auto___18539 = cljs.core.seq.call(null,seq__18456_18501);
if(temp__4657__auto___18539){
var seq__18456_18540__$1 = temp__4657__auto___18539;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__18456_18540__$1)){
var c__7604__auto___18541 = cljs.core.chunk_first.call(null,seq__18456_18540__$1);
var G__18542 = cljs.core.chunk_rest.call(null,seq__18456_18540__$1);
var G__18543 = c__7604__auto___18541;
var G__18544 = cljs.core.count.call(null,c__7604__auto___18541);
var G__18545 = (0);
seq__18456_18501 = G__18542;
chunk__18463_18502 = G__18543;
count__18464_18503 = G__18544;
i__18465_18504 = G__18545;
continue;
} else {
var type_18546 = cljs.core.first.call(null,seq__18456_18540__$1);
var seq__18457_18547 = cljs.core.seq.call(null,cljs.core.map.call(null,((function (seq__18456_18501,chunk__18463_18502,count__18464_18503,i__18465_18504,type_18546,seq__18456_18540__$1,temp__4657__auto___18539,ed,line,ex_obj){
return (function (p1__18427_SHARP_){
return cljs.core.get.call(null,cljs.core.deref.call(null,this$).call(null,new cljs.core.Keyword(null,"widgets","widgets",-159098978)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.objs.editor.line_handle.call(null,ed,p1__18427_SHARP_),type_18546], null));
});})(seq__18456_18501,chunk__18463_18502,count__18464_18503,i__18465_18504,type_18546,seq__18456_18540__$1,temp__4657__auto___18539,ed,line,ex_obj))
,cljs.core.range.call(null,new cljs.core.Keyword(null,"start-line","start-line",-41746654).cljs$core$IFn$_invoke$arity$1(loc),new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(loc))));
var chunk__18459_18548 = null;
var count__18460_18549 = (0);
var i__18461_18550 = (0);
while(true){
if((i__18461_18550 < count__18460_18549)){
var widget_18551 = cljs.core._nth.call(null,chunk__18459_18548,i__18461_18550);
if(cljs.core.truth_(widget_18551)){
lt.object.raise.call(null,widget_18551,new cljs.core.Keyword(null,"clear!","clear!",-144814418));

var G__18552 = seq__18457_18547;
var G__18553 = chunk__18459_18548;
var G__18554 = count__18460_18549;
var G__18555 = (i__18461_18550 + (1));
seq__18457_18547 = G__18552;
chunk__18459_18548 = G__18553;
count__18460_18549 = G__18554;
i__18461_18550 = G__18555;
continue;
} else {
var G__18556 = seq__18457_18547;
var G__18557 = chunk__18459_18548;
var G__18558 = count__18460_18549;
var G__18559 = (i__18461_18550 + (1));
seq__18457_18547 = G__18556;
chunk__18459_18548 = G__18557;
count__18460_18549 = G__18558;
i__18461_18550 = G__18559;
continue;
}
} else {
var temp__4657__auto___18560__$1 = cljs.core.seq.call(null,seq__18457_18547);
if(temp__4657__auto___18560__$1){
var seq__18457_18561__$1 = temp__4657__auto___18560__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__18457_18561__$1)){
var c__7604__auto___18562 = cljs.core.chunk_first.call(null,seq__18457_18561__$1);
var G__18563 = cljs.core.chunk_rest.call(null,seq__18457_18561__$1);
var G__18564 = c__7604__auto___18562;
var G__18565 = cljs.core.count.call(null,c__7604__auto___18562);
var G__18566 = (0);
seq__18457_18547 = G__18563;
chunk__18459_18548 = G__18564;
count__18460_18549 = G__18565;
i__18461_18550 = G__18566;
continue;
} else {
var widget_18567 = cljs.core.first.call(null,seq__18457_18561__$1);
if(cljs.core.truth_(widget_18567)){
lt.object.raise.call(null,widget_18567,new cljs.core.Keyword(null,"clear!","clear!",-144814418));

var G__18568 = cljs.core.next.call(null,seq__18457_18561__$1);
var G__18569 = null;
var G__18570 = (0);
var G__18571 = (0);
seq__18457_18547 = G__18568;
chunk__18459_18548 = G__18569;
count__18460_18549 = G__18570;
i__18461_18550 = G__18571;
continue;
} else {
var G__18572 = cljs.core.next.call(null,seq__18457_18561__$1);
var G__18573 = null;
var G__18574 = (0);
var G__18575 = (0);
seq__18457_18547 = G__18572;
chunk__18459_18548 = G__18573;
count__18460_18549 = G__18574;
i__18461_18550 = G__18575;
continue;
}
}
} else {
}
}
break;
}

var G__18576 = cljs.core.next.call(null,seq__18456_18540__$1);
var G__18577 = null;
var G__18578 = (0);
var G__18579 = (0);
seq__18456_18501 = G__18576;
chunk__18463_18502 = G__18577;
count__18464_18503 = G__18578;
i__18465_18504 = G__18579;
continue;
}
} else {
}
}
break;
}
} else {
}

return lt.object.update_BANG_.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"widgets","widgets",-159098978)], null),cljs.core.assoc,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [line,new cljs.core.Keyword(null,"inline","inline",1399884222)], null),ex_obj);
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.eval","inline-exceptions","lt.objs.eval/inline-exceptions",-1552231546),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.exception","editor.exception",682715312),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.eval.__BEH__inline_exceptions);
/**
 * 
 */
lt.objs.eval.__BEH__eval_on_change = (function lt$objs$eval$__BEH__eval_on_change(this$){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"eval","eval",-1103567905));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.eval","eval-on-change","lt.objs.eval/eval-on-change",620488941),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Eval when the editor changes",new cljs.core.Keyword(null,"debounce","debounce",-871550296),(300),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"change","change",-1163046502),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.eval.__BEH__eval_on_change);
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"clear-inline-results","clear-inline-results",1064265437),new cljs.core.Keyword(null,"desc","desc",2093485764),"Eval: Clear inline results",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
var seq__18580 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"widgets","widgets",-159098978).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed)));
var chunk__18581 = null;
var count__18582 = (0);
var i__18583 = (0);
while(true){
if((i__18583 < count__18582)){
var vec__18584 = cljs.core._nth.call(null,chunk__18581,i__18583);
var _ = cljs.core.nth.call(null,vec__18584,(0),null);
var w = cljs.core.nth.call(null,vec__18584,(1),null);
lt.object.raise.call(null,w,new cljs.core.Keyword(null,"clear!","clear!",-144814418));

var G__18590 = seq__18580;
var G__18591 = chunk__18581;
var G__18592 = count__18582;
var G__18593 = (i__18583 + (1));
seq__18580 = G__18590;
chunk__18581 = G__18591;
count__18582 = G__18592;
i__18583 = G__18593;
continue;
} else {
var temp__4657__auto____$1 = cljs.core.seq.call(null,seq__18580);
if(temp__4657__auto____$1){
var seq__18580__$1 = temp__4657__auto____$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__18580__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__18580__$1);
var G__18594 = cljs.core.chunk_rest.call(null,seq__18580__$1);
var G__18595 = c__7604__auto__;
var G__18596 = cljs.core.count.call(null,c__7604__auto__);
var G__18597 = (0);
seq__18580 = G__18594;
chunk__18581 = G__18595;
count__18582 = G__18596;
i__18583 = G__18597;
continue;
} else {
var vec__18587 = cljs.core.first.call(null,seq__18580__$1);
var _ = cljs.core.nth.call(null,vec__18587,(0),null);
var w = cljs.core.nth.call(null,vec__18587,(1),null);
lt.object.raise.call(null,w,new cljs.core.Keyword(null,"clear!","clear!",-144814418));

var G__18598 = cljs.core.next.call(null,seq__18580__$1);
var G__18599 = null;
var G__18600 = (0);
var G__18601 = (0);
seq__18580 = G__18598;
chunk__18581 = G__18599;
count__18582 = G__18600;
i__18583 = G__18601;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return null;
}
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"eval-editor","eval-editor",-1674118783),new cljs.core.Keyword(null,"desc","desc",2093485764),"Eval: Eval editor contents",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
return lt.object.raise.call(null,ed,new cljs.core.Keyword(null,"eval","eval",-1103567905));
} else {
return null;
}
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"eval-editor-form","eval-editor-form",-1053338409),new cljs.core.Keyword(null,"desc","desc",2093485764),"Eval: Eval a form in editor",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
return lt.object.raise.call(null,ed,new cljs.core.Keyword(null,"eval.one","eval.one",-520903538));
} else {
return null;
}
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"eval.custom","eval.custom",32384567),new cljs.core.Keyword(null,"desc","desc",2093485764),"Eval: Eval custom expression in editor",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (exp,opts){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
return lt.object.raise.call(null,ed,new cljs.core.Keyword(null,"eval.custom","eval.custom",32384567),exp,opts);
} else {
return null;
}
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"eval.cancel-all!","eval.cancel-all!",-218036134),new cljs.core.Keyword(null,"desc","desc",2093485764),"Eval: Cancel evaluation for the current client",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
if(cljs.core.truth_(new cljs.core.Keyword(null,"client","client",-1323448117).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed)))){
var seq__18602 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"client","client",-1323448117).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed)));
var chunk__18603 = null;
var count__18604 = (0);
var i__18605 = (0);
while(true){
if((i__18605 < count__18604)){
var vec__18606 = cljs.core._nth.call(null,chunk__18603,i__18605);
var _ = cljs.core.nth.call(null,vec__18606,(0),null);
var client = cljs.core.nth.call(null,vec__18606,(1),null);
lt.objs.clients.cancel_all_BANG_.call(null,client);

var G__18612 = seq__18602;
var G__18613 = chunk__18603;
var G__18614 = count__18604;
var G__18615 = (i__18605 + (1));
seq__18602 = G__18612;
chunk__18603 = G__18613;
count__18604 = G__18614;
i__18605 = G__18615;
continue;
} else {
var temp__4657__auto____$1 = cljs.core.seq.call(null,seq__18602);
if(temp__4657__auto____$1){
var seq__18602__$1 = temp__4657__auto____$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__18602__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__18602__$1);
var G__18616 = cljs.core.chunk_rest.call(null,seq__18602__$1);
var G__18617 = c__7604__auto__;
var G__18618 = cljs.core.count.call(null,c__7604__auto__);
var G__18619 = (0);
seq__18602 = G__18616;
chunk__18603 = G__18617;
count__18604 = G__18618;
i__18605 = G__18619;
continue;
} else {
var vec__18609 = cljs.core.first.call(null,seq__18602__$1);
var _ = cljs.core.nth.call(null,vec__18609,(0),null);
var client = cljs.core.nth.call(null,vec__18609,(1),null);
lt.objs.clients.cancel_all_BANG_.call(null,client);

var G__18620 = cljs.core.next.call(null,seq__18602__$1);
var G__18621 = null;
var G__18622 = (0);
var G__18623 = (0);
seq__18602 = G__18620;
chunk__18603 = G__18621;
count__18604 = G__18622;
i__18605 = G__18623;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return null;
}
} else {
return null;
}
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.disconnect-clients","editor.disconnect-clients",-1495542786),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Disconnect clients attached to editor",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
var seq__18624 = cljs.core.seq.call(null,cljs.core.vals.call(null,new cljs.core.Keyword(null,"client","client",-1323448117).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed))));
var chunk__18625 = null;
var count__18626 = (0);
var i__18627 = (0);
while(true){
if((i__18627 < count__18626)){
var client = cljs.core._nth.call(null,chunk__18625,i__18627);
lt.objs.clients.close_BANG_.call(null,client);

var G__18628 = seq__18624;
var G__18629 = chunk__18625;
var G__18630 = count__18626;
var G__18631 = (i__18627 + (1));
seq__18624 = G__18628;
chunk__18625 = G__18629;
count__18626 = G__18630;
i__18627 = G__18631;
continue;
} else {
var temp__4657__auto____$1 = cljs.core.seq.call(null,seq__18624);
if(temp__4657__auto____$1){
var seq__18624__$1 = temp__4657__auto____$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__18624__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__18624__$1);
var G__18632 = cljs.core.chunk_rest.call(null,seq__18624__$1);
var G__18633 = c__7604__auto__;
var G__18634 = cljs.core.count.call(null,c__7604__auto__);
var G__18635 = (0);
seq__18624 = G__18632;
chunk__18625 = G__18633;
count__18626 = G__18634;
i__18627 = G__18635;
continue;
} else {
var client = cljs.core.first.call(null,seq__18624__$1);
lt.objs.clients.close_BANG_.call(null,client);

var G__18636 = cljs.core.next.call(null,seq__18624__$1);
var G__18637 = null;
var G__18638 = (0);
var G__18639 = (0);
seq__18624 = G__18636;
chunk__18625 = G__18637;
count__18626 = G__18638;
i__18627 = G__18639;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return null;
}
})], null));
