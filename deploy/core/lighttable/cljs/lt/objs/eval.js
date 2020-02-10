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
var len__7868__auto___18128 = arguments.length;
var i__7869__auto___18129 = (0);
while(true){
if((i__7869__auto___18129 < len__7868__auto___18128)){
args__7875__auto__.push((arguments[i__7869__auto___18129]));

var G__18130 = (i__7869__auto___18129 + (1));
i__7869__auto___18129 = G__18130;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((1) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((1)),(0),null)):null);
return lt.objs.eval.button.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7876__auto__);
});

lt.objs.eval.button.cljs$core$IFn$_invoke$arity$variadic = (function (label,p__18114){
var vec__18115 = p__18114;
var cb = cljs.core.nth.call(null,vec__18115,(0),null);
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.button.right","div.button.right",1623860542),label], null));
var seq__18118_18131 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__,vec__18115,cb){
return (function (){
if(cljs.core.truth_(cb)){
return cb.call(null);
} else {
return null;
}
});})(e__7942__auto__,vec__18115,cb))
], null)));
var chunk__18119_18132 = null;
var count__18120_18133 = (0);
var i__18121_18134 = (0);
while(true){
if((i__18121_18134 < count__18120_18133)){
var vec__18122_18135 = cljs.core._nth.call(null,chunk__18119_18132,i__18121_18134);
var ev__7943__auto___18136 = cljs.core.nth.call(null,vec__18122_18135,(0),null);
var func__7944__auto___18137 = cljs.core.nth.call(null,vec__18122_18135,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___18136,func__7944__auto___18137);

var G__18138 = seq__18118_18131;
var G__18139 = chunk__18119_18132;
var G__18140 = count__18120_18133;
var G__18141 = (i__18121_18134 + (1));
seq__18118_18131 = G__18138;
chunk__18119_18132 = G__18139;
count__18120_18133 = G__18140;
i__18121_18134 = G__18141;
continue;
} else {
var temp__4657__auto___18142 = cljs.core.seq.call(null,seq__18118_18131);
if(temp__4657__auto___18142){
var seq__18118_18143__$1 = temp__4657__auto___18142;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__18118_18143__$1)){
var c__7604__auto___18144 = cljs.core.chunk_first.call(null,seq__18118_18143__$1);
var G__18145 = cljs.core.chunk_rest.call(null,seq__18118_18143__$1);
var G__18146 = c__7604__auto___18144;
var G__18147 = cljs.core.count.call(null,c__7604__auto___18144);
var G__18148 = (0);
seq__18118_18131 = G__18145;
chunk__18119_18132 = G__18146;
count__18120_18133 = G__18147;
i__18121_18134 = G__18148;
continue;
} else {
var vec__18125_18149 = cljs.core.first.call(null,seq__18118_18143__$1);
var ev__7943__auto___18150 = cljs.core.nth.call(null,vec__18125_18149,(0),null);
var func__7944__auto___18151 = cljs.core.nth.call(null,vec__18125_18149,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___18150,func__7944__auto___18151);

var G__18152 = cljs.core.next.call(null,seq__18118_18143__$1);
var G__18153 = null;
var G__18154 = (0);
var G__18155 = (0);
seq__18118_18131 = G__18152;
chunk__18119_18132 = G__18153;
count__18120_18133 = G__18154;
i__18121_18134 = G__18155;
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

lt.objs.eval.button.cljs$lang$applyTo = (function (seq18112){
var G__18113 = cljs.core.first.call(null,seq18112);
var seq18112__$1 = cljs.core.next.call(null,seq18112);
return lt.objs.eval.button.cljs$core$IFn$_invoke$arity$variadic(G__18113,seq18112__$1);
});

lt.objs.eval.unescape_unicode = (function lt$objs$eval$unescape_unicode(s){
return clojure.string.replace.call(null,s,/\\x(..)/,(function (res,r){
return String.fromCharCode(parseInt(r,(16)));
}));
});
var ev_id_18156 = cljs.core.atom.call(null,(0));
lt.objs.eval.append_source_file = ((function (ev_id_18156){
return (function lt$objs$eval$append_source_file(code,file){
return [cljs.core.str(code),cljs.core.str("\n\n//# sourceURL="),cljs.core.str((function (){var or__6793__auto__ = file;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return "evalresult";
}
})()),cljs.core.str("[eval"),cljs.core.str(cljs.core.swap_BANG_.call(null,ev_id_18156,cljs.core.inc)),cljs.core.str("]")].join('');
});})(ev_id_18156))
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
var vec__18163 = cur;
var _ = cljs.core.nth.call(null,vec__18163,(0),null);
var ___$1 = cljs.core.nth.call(null,vec__18163,(1),null);
var cb = cljs.core.nth.call(null,vec__18163,(2),null);
var vec__18166 = cljs.core.apply.call(null,lt.objs.clients.discover,cur);
var result = cljs.core.nth.call(null,vec__18166,(0),null);
var client = cljs.core.nth.call(null,vec__18166,(1),null);
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
}catch (e18170){var e = e18170;
return lt.objs.console.error.call(null,e);
}});
lt.objs.eval.find_client = (function lt$objs$eval$find_client(p__18171){
var map__18180 = p__18171;
var map__18180__$1 = ((((!((map__18180 == null)))?((((map__18180.cljs$lang$protocol_mask$partition0$ & (64))) || (map__18180.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__18180):map__18180);
var opts = map__18180__$1;
var origin = cljs.core.get.call(null,map__18180__$1,new cljs.core.Keyword(null,"origin","origin",1037372088));
var command = cljs.core.get.call(null,map__18180__$1,new cljs.core.Keyword(null,"command","command",-894540724));
var info = cljs.core.get.call(null,map__18180__$1,new cljs.core.Keyword(null,"info","info",-317069002));
var key = cljs.core.get.call(null,map__18180__$1,new cljs.core.Keyword(null,"key","key",-1516042587));
var create = cljs.core.get.call(null,map__18180__$1,new cljs.core.Keyword(null,"create","create",-1301499256));
var vec__18182 = lt.objs.clients.discover.call(null,command,info);
var result = cljs.core.nth.call(null,vec__18182,(0),null);
var client = cljs.core.nth.call(null,vec__18182,(1),null);
var key__$1 = (function (){var or__6793__auto__ = key;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return new cljs.core.Keyword(null,"default","default",-1987822328);
}
})();
var pred__18185 = cljs.core._EQ_;
var expr__18186 = result;
if(cljs.core.truth_(pred__18185.call(null,new cljs.core.Keyword(null,"none","none",1333468478),expr__18186))){
if(cljs.core.truth_(create)){
return create.call(null,opts);
} else {
lt.objs.notifos.done_working.call(null);

lt.object.raise.call(null,lt.objs.eval.evaler,new cljs.core.Keyword(null,"no-client","no-client",-373374621),opts);

return lt.objs.clients.placeholder.call(null);
}
} else {
if(cljs.core.truth_(pred__18185.call(null,new cljs.core.Keyword(null,"found","found",-584700170),expr__18186))){
return client;
} else {
if(cljs.core.truth_(pred__18185.call(null,new cljs.core.Keyword(null,"select","select",1147833503),expr__18186))){
lt.object.raise.call(null,lt.objs.eval.evaler,new cljs.core.Keyword(null,"select-client","select-client",1739667626),client,((function (pred__18185,expr__18186,vec__18182,result,client,key__$1,map__18180,map__18180__$1,opts,origin,command,info,key,create){
return (function (client__$1){
lt.objs.clients.swap_client_BANG_.call(null,key__$1.call(null,new cljs.core.Keyword(null,"client","client",-1323448117).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,origin))),client__$1);

return lt.object.update_BANG_.call(null,origin,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"client","client",-1323448117)], null),cljs.core.assoc,key__$1,client__$1);
});})(pred__18185,expr__18186,vec__18182,result,client,key__$1,map__18180,map__18180__$1,opts,origin,command,info,key,create))
);

return lt.objs.clients.placeholder.call(null);
} else {
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(expr__18186)].join('')));
}
}
}
});
lt.objs.eval.get_client_BANG_ = (function lt$objs$eval$get_client_BANG_(p__18188){
var map__18191 = p__18188;
var map__18191__$1 = ((((!((map__18191 == null)))?((((map__18191.cljs$lang$protocol_mask$partition0$ & (64))) || (map__18191.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__18191):map__18191);
var opts = map__18191__$1;
var origin = cljs.core.get.call(null,map__18191__$1,new cljs.core.Keyword(null,"origin","origin",1037372088));
var command = cljs.core.get.call(null,map__18191__$1,new cljs.core.Keyword(null,"command","command",-894540724));
var key = cljs.core.get.call(null,map__18191__$1,new cljs.core.Keyword(null,"key","key",-1516042587));
var create = cljs.core.get.call(null,map__18191__$1,new cljs.core.Keyword(null,"create","create",-1301499256));
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
var args18193 = [];
var len__7868__auto___18196 = arguments.length;
var i__7869__auto___18197 = (0);
while(true){
if((i__7869__auto___18197 < len__7868__auto___18196)){
args18193.push((arguments[i__7869__auto___18197]));

var G__18198 = (i__7869__auto___18197 + (1));
i__7869__auto___18197 = G__18198;
continue;
} else {
}
break;
}

var G__18195 = args18193.length;
switch (G__18195) {
case 1:
return lt.objs.eval.truncate_result.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return lt.objs.eval.truncate_result.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args18193.length)].join('')));

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
return (function (p1__18200_SHARP_){
return lt.objs.eval.__GT_result_class.call(null,p1__18200_SHARP_,truncated);
});})(r,truncated))
)], null),(cljs.core.truth_(truncated)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.truncated","span.truncated",684030620),truncated], null):null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.full","span.full",751073405),r], null)], null);
})());
var seq__18211_18221 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"mousewheel","mousewheel",-648300011),((function (e__7942__auto__){
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
var chunk__18212_18222 = null;
var count__18213_18223 = (0);
var i__18214_18224 = (0);
while(true){
if((i__18214_18224 < count__18213_18223)){
var vec__18215_18225 = cljs.core._nth.call(null,chunk__18212_18222,i__18214_18224);
var ev__7943__auto___18226 = cljs.core.nth.call(null,vec__18215_18225,(0),null);
var func__7944__auto___18227 = cljs.core.nth.call(null,vec__18215_18225,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___18226,func__7944__auto___18227);

var G__18228 = seq__18211_18221;
var G__18229 = chunk__18212_18222;
var G__18230 = count__18213_18223;
var G__18231 = (i__18214_18224 + (1));
seq__18211_18221 = G__18228;
chunk__18212_18222 = G__18229;
count__18213_18223 = G__18230;
i__18214_18224 = G__18231;
continue;
} else {
var temp__4657__auto___18232 = cljs.core.seq.call(null,seq__18211_18221);
if(temp__4657__auto___18232){
var seq__18211_18233__$1 = temp__4657__auto___18232;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__18211_18233__$1)){
var c__7604__auto___18234 = cljs.core.chunk_first.call(null,seq__18211_18233__$1);
var G__18235 = cljs.core.chunk_rest.call(null,seq__18211_18233__$1);
var G__18236 = c__7604__auto___18234;
var G__18237 = cljs.core.count.call(null,c__7604__auto___18234);
var G__18238 = (0);
seq__18211_18221 = G__18235;
chunk__18212_18222 = G__18236;
count__18213_18223 = G__18237;
i__18214_18224 = G__18238;
continue;
} else {
var vec__18218_18239 = cljs.core.first.call(null,seq__18211_18233__$1);
var ev__7943__auto___18240 = cljs.core.nth.call(null,vec__18218_18239,(0),null);
var func__7944__auto___18241 = cljs.core.nth.call(null,vec__18218_18239,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___18240,func__7944__auto___18241);

var G__18242 = cljs.core.next.call(null,seq__18211_18233__$1);
var G__18243 = null;
var G__18244 = (0);
var G__18245 = (0);
seq__18211_18221 = G__18242;
chunk__18212_18222 = G__18243;
count__18213_18223 = G__18244;
i__18214_18224 = G__18245;
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
var temp__4657__auto___18246 = lt.objs.eval.truncate_result.call(null,res);
if(cljs.core.truth_(temp__4657__auto___18246)){
var t_18247 = temp__4657__auto___18246;
var temp__4657__auto___18248__$1 = lt.util.dom.$.call(null,new cljs.core.Keyword(null,".truncated",".truncated",-1238919096),content);
if(cljs.core.truth_(temp__4657__auto___18248__$1)){
var trunc_18249 = temp__4657__auto___18248__$1;
lt.util.dom.html.call(null,trunc_18249,t_18247);
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
var temp__4657__auto___18263 = cljs.core.get.call(null,cljs.core.deref.call(null,this$).call(null,new cljs.core.Keyword(null,"widgets","widgets",-159098978)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [line,type], null));
if(cljs.core.truth_(temp__4657__auto___18263)){
var prev_18264 = temp__4657__auto___18263;
if(cljs.core.truth_(new cljs.core.Keyword(null,"open","open",-1763596448).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,prev_18264)))){
lt.object.merge_BANG_.call(null,res_obj,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"open","open",-1763596448),true], null));
} else {
}

lt.object.raise.call(null,prev_18264,new cljs.core.Keyword(null,"clear!","clear!",-144814418));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"start-line","start-line",-41746654).cljs$core$IFn$_invoke$arity$1(loc))){
var seq__18257_18265 = cljs.core.seq.call(null,cljs.core.map.call(null,((function (ed,type,line,res_obj){
return (function (p1__18250_SHARP_){
return cljs.core.get.call(null,cljs.core.deref.call(null,this$).call(null,new cljs.core.Keyword(null,"widgets","widgets",-159098978)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.objs.editor.line_handle.call(null,ed,p1__18250_SHARP_),type], null));
});})(ed,type,line,res_obj))
,cljs.core.range.call(null,new cljs.core.Keyword(null,"start-line","start-line",-41746654).cljs$core$IFn$_invoke$arity$1(loc),new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(loc))));
var chunk__18259_18266 = null;
var count__18260_18267 = (0);
var i__18261_18268 = (0);
while(true){
if((i__18261_18268 < count__18260_18267)){
var widget_18269 = cljs.core._nth.call(null,chunk__18259_18266,i__18261_18268);
if(cljs.core.truth_(widget_18269)){
lt.object.raise.call(null,widget_18269,new cljs.core.Keyword(null,"clear!","clear!",-144814418));

var G__18270 = seq__18257_18265;
var G__18271 = chunk__18259_18266;
var G__18272 = count__18260_18267;
var G__18273 = (i__18261_18268 + (1));
seq__18257_18265 = G__18270;
chunk__18259_18266 = G__18271;
count__18260_18267 = G__18272;
i__18261_18268 = G__18273;
continue;
} else {
var G__18274 = seq__18257_18265;
var G__18275 = chunk__18259_18266;
var G__18276 = count__18260_18267;
var G__18277 = (i__18261_18268 + (1));
seq__18257_18265 = G__18274;
chunk__18259_18266 = G__18275;
count__18260_18267 = G__18276;
i__18261_18268 = G__18277;
continue;
}
} else {
var temp__4657__auto___18278 = cljs.core.seq.call(null,seq__18257_18265);
if(temp__4657__auto___18278){
var seq__18257_18279__$1 = temp__4657__auto___18278;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__18257_18279__$1)){
var c__7604__auto___18280 = cljs.core.chunk_first.call(null,seq__18257_18279__$1);
var G__18281 = cljs.core.chunk_rest.call(null,seq__18257_18279__$1);
var G__18282 = c__7604__auto___18280;
var G__18283 = cljs.core.count.call(null,c__7604__auto___18280);
var G__18284 = (0);
seq__18257_18265 = G__18281;
chunk__18259_18266 = G__18282;
count__18260_18267 = G__18283;
i__18261_18268 = G__18284;
continue;
} else {
var widget_18285 = cljs.core.first.call(null,seq__18257_18279__$1);
if(cljs.core.truth_(widget_18285)){
lt.object.raise.call(null,widget_18285,new cljs.core.Keyword(null,"clear!","clear!",-144814418));

var G__18286 = cljs.core.next.call(null,seq__18257_18279__$1);
var G__18287 = null;
var G__18288 = (0);
var G__18289 = (0);
seq__18257_18265 = G__18286;
chunk__18259_18266 = G__18287;
count__18260_18267 = G__18288;
i__18261_18268 = G__18289;
continue;
} else {
var G__18290 = cljs.core.next.call(null,seq__18257_18279__$1);
var G__18291 = null;
var G__18292 = (0);
var G__18293 = (0);
seq__18257_18265 = G__18290;
chunk__18259_18266 = G__18291;
count__18260_18267 = G__18292;
i__18261_18268 = G__18293;
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
var seq__18304_18314 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
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
var chunk__18305_18315 = null;
var count__18306_18316 = (0);
var i__18307_18317 = (0);
while(true){
if((i__18307_18317 < count__18306_18316)){
var vec__18308_18318 = cljs.core._nth.call(null,chunk__18305_18315,i__18307_18317);
var ev__7943__auto___18319 = cljs.core.nth.call(null,vec__18308_18318,(0),null);
var func__7944__auto___18320 = cljs.core.nth.call(null,vec__18308_18318,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___18319,func__7944__auto___18320);

var G__18321 = seq__18304_18314;
var G__18322 = chunk__18305_18315;
var G__18323 = count__18306_18316;
var G__18324 = (i__18307_18317 + (1));
seq__18304_18314 = G__18321;
chunk__18305_18315 = G__18322;
count__18306_18316 = G__18323;
i__18307_18317 = G__18324;
continue;
} else {
var temp__4657__auto___18325 = cljs.core.seq.call(null,seq__18304_18314);
if(temp__4657__auto___18325){
var seq__18304_18326__$1 = temp__4657__auto___18325;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__18304_18326__$1)){
var c__7604__auto___18327 = cljs.core.chunk_first.call(null,seq__18304_18326__$1);
var G__18328 = cljs.core.chunk_rest.call(null,seq__18304_18326__$1);
var G__18329 = c__7604__auto___18327;
var G__18330 = cljs.core.count.call(null,c__7604__auto___18327);
var G__18331 = (0);
seq__18304_18314 = G__18328;
chunk__18305_18315 = G__18329;
count__18306_18316 = G__18330;
i__18307_18317 = G__18331;
continue;
} else {
var vec__18311_18332 = cljs.core.first.call(null,seq__18304_18326__$1);
var ev__7943__auto___18333 = cljs.core.nth.call(null,vec__18311_18332,(0),null);
var func__7944__auto___18334 = cljs.core.nth.call(null,vec__18311_18332,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___18333,func__7944__auto___18334);

var G__18335 = cljs.core.next.call(null,seq__18304_18326__$1);
var G__18336 = null;
var G__18337 = (0);
var G__18338 = (0);
seq__18304_18314 = G__18335;
chunk__18305_18315 = G__18336;
count__18306_18316 = G__18337;
i__18307_18317 = G__18338;
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
var temp__4657__auto___18352 = cljs.core.get.call(null,cljs.core.deref.call(null,this$).call(null,new cljs.core.Keyword(null,"widgets","widgets",-159098978)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [line,new cljs.core.Keyword(null,"underline","underline",2018066703)], null));
if(cljs.core.truth_(temp__4657__auto___18352)){
var prev_18353 = temp__4657__auto___18352;
if(cljs.core.truth_(new cljs.core.Keyword(null,"open","open",-1763596448).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,prev_18353)))){
lt.object.merge_BANG_.call(null,res_obj,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"open","open",-1763596448),true], null));
} else {
}

lt.object.raise.call(null,prev_18353,new cljs.core.Keyword(null,"clear!","clear!",-144814418));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"start-line","start-line",-41746654).cljs$core$IFn$_invoke$arity$1(loc))){
var seq__18346_18354 = cljs.core.seq.call(null,cljs.core.map.call(null,((function (ed,line,res_obj){
return (function (p1__18339_SHARP_){
return cljs.core.get.call(null,cljs.core.deref.call(null,this$).call(null,new cljs.core.Keyword(null,"widgets","widgets",-159098978)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.objs.editor.line_handle.call(null,ed,p1__18339_SHARP_),new cljs.core.Keyword(null,"underline","underline",2018066703)], null));
});})(ed,line,res_obj))
,cljs.core.range.call(null,new cljs.core.Keyword(null,"start-line","start-line",-41746654).cljs$core$IFn$_invoke$arity$1(loc),new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(loc))));
var chunk__18348_18355 = null;
var count__18349_18356 = (0);
var i__18350_18357 = (0);
while(true){
if((i__18350_18357 < count__18349_18356)){
var widget_18358 = cljs.core._nth.call(null,chunk__18348_18355,i__18350_18357);
if(cljs.core.truth_(widget_18358)){
lt.object.raise.call(null,widget_18358,new cljs.core.Keyword(null,"clear!","clear!",-144814418));

var G__18359 = seq__18346_18354;
var G__18360 = chunk__18348_18355;
var G__18361 = count__18349_18356;
var G__18362 = (i__18350_18357 + (1));
seq__18346_18354 = G__18359;
chunk__18348_18355 = G__18360;
count__18349_18356 = G__18361;
i__18350_18357 = G__18362;
continue;
} else {
var G__18363 = seq__18346_18354;
var G__18364 = chunk__18348_18355;
var G__18365 = count__18349_18356;
var G__18366 = (i__18350_18357 + (1));
seq__18346_18354 = G__18363;
chunk__18348_18355 = G__18364;
count__18349_18356 = G__18365;
i__18350_18357 = G__18366;
continue;
}
} else {
var temp__4657__auto___18367 = cljs.core.seq.call(null,seq__18346_18354);
if(temp__4657__auto___18367){
var seq__18346_18368__$1 = temp__4657__auto___18367;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__18346_18368__$1)){
var c__7604__auto___18369 = cljs.core.chunk_first.call(null,seq__18346_18368__$1);
var G__18370 = cljs.core.chunk_rest.call(null,seq__18346_18368__$1);
var G__18371 = c__7604__auto___18369;
var G__18372 = cljs.core.count.call(null,c__7604__auto___18369);
var G__18373 = (0);
seq__18346_18354 = G__18370;
chunk__18348_18355 = G__18371;
count__18349_18356 = G__18372;
i__18350_18357 = G__18373;
continue;
} else {
var widget_18374 = cljs.core.first.call(null,seq__18346_18368__$1);
if(cljs.core.truth_(widget_18374)){
lt.object.raise.call(null,widget_18374,new cljs.core.Keyword(null,"clear!","clear!",-144814418));

var G__18375 = cljs.core.next.call(null,seq__18346_18368__$1);
var G__18376 = null;
var G__18377 = (0);
var G__18378 = (0);
seq__18346_18354 = G__18375;
chunk__18348_18355 = G__18376;
count__18349_18356 = G__18377;
i__18350_18357 = G__18378;
continue;
} else {
var G__18379 = cljs.core.next.call(null,seq__18346_18368__$1);
var G__18380 = null;
var G__18381 = (0);
var G__18382 = (0);
seq__18346_18354 = G__18379;
chunk__18348_18355 = G__18380;
count__18349_18356 = G__18381;
i__18350_18357 = G__18382;
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
return lt.objs.platform.copy.call(null,clojure.string.join.call(null,"\n",cljs.core.map.call(null,(function (p1__18383_SHARP_){
return p1__18383_SHARP_.innerText;
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
var seq__18394_18404 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
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
var chunk__18395_18405 = null;
var count__18396_18406 = (0);
var i__18397_18407 = (0);
while(true){
if((i__18397_18407 < count__18396_18406)){
var vec__18398_18408 = cljs.core._nth.call(null,chunk__18395_18405,i__18397_18407);
var ev__7943__auto___18409 = cljs.core.nth.call(null,vec__18398_18408,(0),null);
var func__7944__auto___18410 = cljs.core.nth.call(null,vec__18398_18408,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___18409,func__7944__auto___18410);

var G__18411 = seq__18394_18404;
var G__18412 = chunk__18395_18405;
var G__18413 = count__18396_18406;
var G__18414 = (i__18397_18407 + (1));
seq__18394_18404 = G__18411;
chunk__18395_18405 = G__18412;
count__18396_18406 = G__18413;
i__18397_18407 = G__18414;
continue;
} else {
var temp__4657__auto___18415 = cljs.core.seq.call(null,seq__18394_18404);
if(temp__4657__auto___18415){
var seq__18394_18416__$1 = temp__4657__auto___18415;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__18394_18416__$1)){
var c__7604__auto___18417 = cljs.core.chunk_first.call(null,seq__18394_18416__$1);
var G__18418 = cljs.core.chunk_rest.call(null,seq__18394_18416__$1);
var G__18419 = c__7604__auto___18417;
var G__18420 = cljs.core.count.call(null,c__7604__auto___18417);
var G__18421 = (0);
seq__18394_18404 = G__18418;
chunk__18395_18405 = G__18419;
count__18396_18406 = G__18420;
i__18397_18407 = G__18421;
continue;
} else {
var vec__18401_18422 = cljs.core.first.call(null,seq__18394_18416__$1);
var ev__7943__auto___18423 = cljs.core.nth.call(null,vec__18401_18422,(0),null);
var func__7944__auto___18424 = cljs.core.nth.call(null,vec__18401_18422,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___18423,func__7944__auto___18424);

var G__18425 = cljs.core.next.call(null,seq__18394_18416__$1);
var G__18426 = null;
var G__18427 = (0);
var G__18428 = (0);
seq__18394_18404 = G__18425;
chunk__18395_18405 = G__18426;
count__18396_18406 = G__18427;
i__18397_18407 = G__18428;
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
var seq__18452_18474 = cljs.core.seq.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.get.call(null,cljs.core.deref.call(null,this$).call(null,new cljs.core.Keyword(null,"widgets","widgets",-159098978)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [line,new cljs.core.Keyword(null,"inline","inline",1399884222)], null)),cljs.core.get.call(null,cljs.core.deref.call(null,this$).call(null,new cljs.core.Keyword(null,"widgets","widgets",-159098978)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [line,new cljs.core.Keyword(null,"underline","underline",2018066703)], null))], null));
var chunk__18454_18475 = null;
var count__18455_18476 = (0);
var i__18456_18477 = (0);
while(true){
if((i__18456_18477 < count__18455_18476)){
var prev_18478 = cljs.core._nth.call(null,chunk__18454_18475,i__18456_18477);
if(cljs.core.truth_(prev_18478)){
if(cljs.core.truth_(new cljs.core.Keyword(null,"open","open",-1763596448).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,prev_18478)))){
lt.object.merge_BANG_.call(null,ex_obj,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"open","open",-1763596448),true], null));
} else {
}

lt.object.raise.call(null,prev_18478,new cljs.core.Keyword(null,"clear!","clear!",-144814418));

var G__18479 = seq__18452_18474;
var G__18480 = chunk__18454_18475;
var G__18481 = count__18455_18476;
var G__18482 = (i__18456_18477 + (1));
seq__18452_18474 = G__18479;
chunk__18454_18475 = G__18480;
count__18455_18476 = G__18481;
i__18456_18477 = G__18482;
continue;
} else {
var G__18483 = seq__18452_18474;
var G__18484 = chunk__18454_18475;
var G__18485 = count__18455_18476;
var G__18486 = (i__18456_18477 + (1));
seq__18452_18474 = G__18483;
chunk__18454_18475 = G__18484;
count__18455_18476 = G__18485;
i__18456_18477 = G__18486;
continue;
}
} else {
var temp__4657__auto___18487 = cljs.core.seq.call(null,seq__18452_18474);
if(temp__4657__auto___18487){
var seq__18452_18488__$1 = temp__4657__auto___18487;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__18452_18488__$1)){
var c__7604__auto___18489 = cljs.core.chunk_first.call(null,seq__18452_18488__$1);
var G__18490 = cljs.core.chunk_rest.call(null,seq__18452_18488__$1);
var G__18491 = c__7604__auto___18489;
var G__18492 = cljs.core.count.call(null,c__7604__auto___18489);
var G__18493 = (0);
seq__18452_18474 = G__18490;
chunk__18454_18475 = G__18491;
count__18455_18476 = G__18492;
i__18456_18477 = G__18493;
continue;
} else {
var prev_18494 = cljs.core.first.call(null,seq__18452_18488__$1);
if(cljs.core.truth_(prev_18494)){
if(cljs.core.truth_(new cljs.core.Keyword(null,"open","open",-1763596448).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,prev_18494)))){
lt.object.merge_BANG_.call(null,ex_obj,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"open","open",-1763596448),true], null));
} else {
}

lt.object.raise.call(null,prev_18494,new cljs.core.Keyword(null,"clear!","clear!",-144814418));

var G__18495 = cljs.core.next.call(null,seq__18452_18488__$1);
var G__18496 = null;
var G__18497 = (0);
var G__18498 = (0);
seq__18452_18474 = G__18495;
chunk__18454_18475 = G__18496;
count__18455_18476 = G__18497;
i__18456_18477 = G__18498;
continue;
} else {
var G__18499 = cljs.core.next.call(null,seq__18452_18488__$1);
var G__18500 = null;
var G__18501 = (0);
var G__18502 = (0);
seq__18452_18474 = G__18499;
chunk__18454_18475 = G__18500;
count__18455_18476 = G__18501;
i__18456_18477 = G__18502;
continue;
}
}
} else {
}
}
break;
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"start-line","start-line",-41746654).cljs$core$IFn$_invoke$arity$1(loc))){
var seq__18458_18503 = cljs.core.seq.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"inline","inline",1399884222),new cljs.core.Keyword(null,"underline","underline",2018066703)], null));
var chunk__18465_18504 = null;
var count__18466_18505 = (0);
var i__18467_18506 = (0);
while(true){
if((i__18467_18506 < count__18466_18505)){
var type_18507 = cljs.core._nth.call(null,chunk__18465_18504,i__18467_18506);
var seq__18468_18508 = cljs.core.seq.call(null,cljs.core.map.call(null,((function (seq__18458_18503,chunk__18465_18504,count__18466_18505,i__18467_18506,type_18507,ed,line,ex_obj){
return (function (p1__18429_SHARP_){
return cljs.core.get.call(null,cljs.core.deref.call(null,this$).call(null,new cljs.core.Keyword(null,"widgets","widgets",-159098978)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.objs.editor.line_handle.call(null,ed,p1__18429_SHARP_),type_18507], null));
});})(seq__18458_18503,chunk__18465_18504,count__18466_18505,i__18467_18506,type_18507,ed,line,ex_obj))
,cljs.core.range.call(null,new cljs.core.Keyword(null,"start-line","start-line",-41746654).cljs$core$IFn$_invoke$arity$1(loc),new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(loc))));
var chunk__18470_18509 = null;
var count__18471_18510 = (0);
var i__18472_18511 = (0);
while(true){
if((i__18472_18511 < count__18471_18510)){
var widget_18512 = cljs.core._nth.call(null,chunk__18470_18509,i__18472_18511);
if(cljs.core.truth_(widget_18512)){
lt.object.raise.call(null,widget_18512,new cljs.core.Keyword(null,"clear!","clear!",-144814418));

var G__18513 = seq__18468_18508;
var G__18514 = chunk__18470_18509;
var G__18515 = count__18471_18510;
var G__18516 = (i__18472_18511 + (1));
seq__18468_18508 = G__18513;
chunk__18470_18509 = G__18514;
count__18471_18510 = G__18515;
i__18472_18511 = G__18516;
continue;
} else {
var G__18517 = seq__18468_18508;
var G__18518 = chunk__18470_18509;
var G__18519 = count__18471_18510;
var G__18520 = (i__18472_18511 + (1));
seq__18468_18508 = G__18517;
chunk__18470_18509 = G__18518;
count__18471_18510 = G__18519;
i__18472_18511 = G__18520;
continue;
}
} else {
var temp__4657__auto___18521 = cljs.core.seq.call(null,seq__18468_18508);
if(temp__4657__auto___18521){
var seq__18468_18522__$1 = temp__4657__auto___18521;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__18468_18522__$1)){
var c__7604__auto___18523 = cljs.core.chunk_first.call(null,seq__18468_18522__$1);
var G__18524 = cljs.core.chunk_rest.call(null,seq__18468_18522__$1);
var G__18525 = c__7604__auto___18523;
var G__18526 = cljs.core.count.call(null,c__7604__auto___18523);
var G__18527 = (0);
seq__18468_18508 = G__18524;
chunk__18470_18509 = G__18525;
count__18471_18510 = G__18526;
i__18472_18511 = G__18527;
continue;
} else {
var widget_18528 = cljs.core.first.call(null,seq__18468_18522__$1);
if(cljs.core.truth_(widget_18528)){
lt.object.raise.call(null,widget_18528,new cljs.core.Keyword(null,"clear!","clear!",-144814418));

var G__18529 = cljs.core.next.call(null,seq__18468_18522__$1);
var G__18530 = null;
var G__18531 = (0);
var G__18532 = (0);
seq__18468_18508 = G__18529;
chunk__18470_18509 = G__18530;
count__18471_18510 = G__18531;
i__18472_18511 = G__18532;
continue;
} else {
var G__18533 = cljs.core.next.call(null,seq__18468_18522__$1);
var G__18534 = null;
var G__18535 = (0);
var G__18536 = (0);
seq__18468_18508 = G__18533;
chunk__18470_18509 = G__18534;
count__18471_18510 = G__18535;
i__18472_18511 = G__18536;
continue;
}
}
} else {
}
}
break;
}

var G__18537 = seq__18458_18503;
var G__18538 = chunk__18465_18504;
var G__18539 = count__18466_18505;
var G__18540 = (i__18467_18506 + (1));
seq__18458_18503 = G__18537;
chunk__18465_18504 = G__18538;
count__18466_18505 = G__18539;
i__18467_18506 = G__18540;
continue;
} else {
var temp__4657__auto___18541 = cljs.core.seq.call(null,seq__18458_18503);
if(temp__4657__auto___18541){
var seq__18458_18542__$1 = temp__4657__auto___18541;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__18458_18542__$1)){
var c__7604__auto___18543 = cljs.core.chunk_first.call(null,seq__18458_18542__$1);
var G__18544 = cljs.core.chunk_rest.call(null,seq__18458_18542__$1);
var G__18545 = c__7604__auto___18543;
var G__18546 = cljs.core.count.call(null,c__7604__auto___18543);
var G__18547 = (0);
seq__18458_18503 = G__18544;
chunk__18465_18504 = G__18545;
count__18466_18505 = G__18546;
i__18467_18506 = G__18547;
continue;
} else {
var type_18548 = cljs.core.first.call(null,seq__18458_18542__$1);
var seq__18459_18549 = cljs.core.seq.call(null,cljs.core.map.call(null,((function (seq__18458_18503,chunk__18465_18504,count__18466_18505,i__18467_18506,type_18548,seq__18458_18542__$1,temp__4657__auto___18541,ed,line,ex_obj){
return (function (p1__18429_SHARP_){
return cljs.core.get.call(null,cljs.core.deref.call(null,this$).call(null,new cljs.core.Keyword(null,"widgets","widgets",-159098978)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.objs.editor.line_handle.call(null,ed,p1__18429_SHARP_),type_18548], null));
});})(seq__18458_18503,chunk__18465_18504,count__18466_18505,i__18467_18506,type_18548,seq__18458_18542__$1,temp__4657__auto___18541,ed,line,ex_obj))
,cljs.core.range.call(null,new cljs.core.Keyword(null,"start-line","start-line",-41746654).cljs$core$IFn$_invoke$arity$1(loc),new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(loc))));
var chunk__18461_18550 = null;
var count__18462_18551 = (0);
var i__18463_18552 = (0);
while(true){
if((i__18463_18552 < count__18462_18551)){
var widget_18553 = cljs.core._nth.call(null,chunk__18461_18550,i__18463_18552);
if(cljs.core.truth_(widget_18553)){
lt.object.raise.call(null,widget_18553,new cljs.core.Keyword(null,"clear!","clear!",-144814418));

var G__18554 = seq__18459_18549;
var G__18555 = chunk__18461_18550;
var G__18556 = count__18462_18551;
var G__18557 = (i__18463_18552 + (1));
seq__18459_18549 = G__18554;
chunk__18461_18550 = G__18555;
count__18462_18551 = G__18556;
i__18463_18552 = G__18557;
continue;
} else {
var G__18558 = seq__18459_18549;
var G__18559 = chunk__18461_18550;
var G__18560 = count__18462_18551;
var G__18561 = (i__18463_18552 + (1));
seq__18459_18549 = G__18558;
chunk__18461_18550 = G__18559;
count__18462_18551 = G__18560;
i__18463_18552 = G__18561;
continue;
}
} else {
var temp__4657__auto___18562__$1 = cljs.core.seq.call(null,seq__18459_18549);
if(temp__4657__auto___18562__$1){
var seq__18459_18563__$1 = temp__4657__auto___18562__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__18459_18563__$1)){
var c__7604__auto___18564 = cljs.core.chunk_first.call(null,seq__18459_18563__$1);
var G__18565 = cljs.core.chunk_rest.call(null,seq__18459_18563__$1);
var G__18566 = c__7604__auto___18564;
var G__18567 = cljs.core.count.call(null,c__7604__auto___18564);
var G__18568 = (0);
seq__18459_18549 = G__18565;
chunk__18461_18550 = G__18566;
count__18462_18551 = G__18567;
i__18463_18552 = G__18568;
continue;
} else {
var widget_18569 = cljs.core.first.call(null,seq__18459_18563__$1);
if(cljs.core.truth_(widget_18569)){
lt.object.raise.call(null,widget_18569,new cljs.core.Keyword(null,"clear!","clear!",-144814418));

var G__18570 = cljs.core.next.call(null,seq__18459_18563__$1);
var G__18571 = null;
var G__18572 = (0);
var G__18573 = (0);
seq__18459_18549 = G__18570;
chunk__18461_18550 = G__18571;
count__18462_18551 = G__18572;
i__18463_18552 = G__18573;
continue;
} else {
var G__18574 = cljs.core.next.call(null,seq__18459_18563__$1);
var G__18575 = null;
var G__18576 = (0);
var G__18577 = (0);
seq__18459_18549 = G__18574;
chunk__18461_18550 = G__18575;
count__18462_18551 = G__18576;
i__18463_18552 = G__18577;
continue;
}
}
} else {
}
}
break;
}

var G__18578 = cljs.core.next.call(null,seq__18458_18542__$1);
var G__18579 = null;
var G__18580 = (0);
var G__18581 = (0);
seq__18458_18503 = G__18578;
chunk__18465_18504 = G__18579;
count__18466_18505 = G__18580;
i__18467_18506 = G__18581;
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
var seq__18582 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"widgets","widgets",-159098978).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed)));
var chunk__18583 = null;
var count__18584 = (0);
var i__18585 = (0);
while(true){
if((i__18585 < count__18584)){
var vec__18586 = cljs.core._nth.call(null,chunk__18583,i__18585);
var _ = cljs.core.nth.call(null,vec__18586,(0),null);
var w = cljs.core.nth.call(null,vec__18586,(1),null);
lt.object.raise.call(null,w,new cljs.core.Keyword(null,"clear!","clear!",-144814418));

var G__18592 = seq__18582;
var G__18593 = chunk__18583;
var G__18594 = count__18584;
var G__18595 = (i__18585 + (1));
seq__18582 = G__18592;
chunk__18583 = G__18593;
count__18584 = G__18594;
i__18585 = G__18595;
continue;
} else {
var temp__4657__auto____$1 = cljs.core.seq.call(null,seq__18582);
if(temp__4657__auto____$1){
var seq__18582__$1 = temp__4657__auto____$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__18582__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__18582__$1);
var G__18596 = cljs.core.chunk_rest.call(null,seq__18582__$1);
var G__18597 = c__7604__auto__;
var G__18598 = cljs.core.count.call(null,c__7604__auto__);
var G__18599 = (0);
seq__18582 = G__18596;
chunk__18583 = G__18597;
count__18584 = G__18598;
i__18585 = G__18599;
continue;
} else {
var vec__18589 = cljs.core.first.call(null,seq__18582__$1);
var _ = cljs.core.nth.call(null,vec__18589,(0),null);
var w = cljs.core.nth.call(null,vec__18589,(1),null);
lt.object.raise.call(null,w,new cljs.core.Keyword(null,"clear!","clear!",-144814418));

var G__18600 = cljs.core.next.call(null,seq__18582__$1);
var G__18601 = null;
var G__18602 = (0);
var G__18603 = (0);
seq__18582 = G__18600;
chunk__18583 = G__18601;
count__18584 = G__18602;
i__18585 = G__18603;
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
var seq__18604 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"client","client",-1323448117).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed)));
var chunk__18605 = null;
var count__18606 = (0);
var i__18607 = (0);
while(true){
if((i__18607 < count__18606)){
var vec__18608 = cljs.core._nth.call(null,chunk__18605,i__18607);
var _ = cljs.core.nth.call(null,vec__18608,(0),null);
var client = cljs.core.nth.call(null,vec__18608,(1),null);
lt.objs.clients.cancel_all_BANG_.call(null,client);

var G__18614 = seq__18604;
var G__18615 = chunk__18605;
var G__18616 = count__18606;
var G__18617 = (i__18607 + (1));
seq__18604 = G__18614;
chunk__18605 = G__18615;
count__18606 = G__18616;
i__18607 = G__18617;
continue;
} else {
var temp__4657__auto____$1 = cljs.core.seq.call(null,seq__18604);
if(temp__4657__auto____$1){
var seq__18604__$1 = temp__4657__auto____$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__18604__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__18604__$1);
var G__18618 = cljs.core.chunk_rest.call(null,seq__18604__$1);
var G__18619 = c__7604__auto__;
var G__18620 = cljs.core.count.call(null,c__7604__auto__);
var G__18621 = (0);
seq__18604 = G__18618;
chunk__18605 = G__18619;
count__18606 = G__18620;
i__18607 = G__18621;
continue;
} else {
var vec__18611 = cljs.core.first.call(null,seq__18604__$1);
var _ = cljs.core.nth.call(null,vec__18611,(0),null);
var client = cljs.core.nth.call(null,vec__18611,(1),null);
lt.objs.clients.cancel_all_BANG_.call(null,client);

var G__18622 = cljs.core.next.call(null,seq__18604__$1);
var G__18623 = null;
var G__18624 = (0);
var G__18625 = (0);
seq__18604 = G__18622;
chunk__18605 = G__18623;
count__18606 = G__18624;
i__18607 = G__18625;
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
var seq__18626 = cljs.core.seq.call(null,cljs.core.vals.call(null,new cljs.core.Keyword(null,"client","client",-1323448117).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed))));
var chunk__18627 = null;
var count__18628 = (0);
var i__18629 = (0);
while(true){
if((i__18629 < count__18628)){
var client = cljs.core._nth.call(null,chunk__18627,i__18629);
lt.objs.clients.close_BANG_.call(null,client);

var G__18630 = seq__18626;
var G__18631 = chunk__18627;
var G__18632 = count__18628;
var G__18633 = (i__18629 + (1));
seq__18626 = G__18630;
chunk__18627 = G__18631;
count__18628 = G__18632;
i__18629 = G__18633;
continue;
} else {
var temp__4657__auto____$1 = cljs.core.seq.call(null,seq__18626);
if(temp__4657__auto____$1){
var seq__18626__$1 = temp__4657__auto____$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__18626__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__18626__$1);
var G__18634 = cljs.core.chunk_rest.call(null,seq__18626__$1);
var G__18635 = c__7604__auto__;
var G__18636 = cljs.core.count.call(null,c__7604__auto__);
var G__18637 = (0);
seq__18626 = G__18634;
chunk__18627 = G__18635;
count__18628 = G__18636;
i__18629 = G__18637;
continue;
} else {
var client = cljs.core.first.call(null,seq__18626__$1);
lt.objs.clients.close_BANG_.call(null,client);

var G__18638 = cljs.core.next.call(null,seq__18626__$1);
var G__18639 = null;
var G__18640 = (0);
var G__18641 = (0);
seq__18626 = G__18638;
chunk__18627 = G__18639;
count__18628 = G__18640;
i__18629 = G__18641;
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
