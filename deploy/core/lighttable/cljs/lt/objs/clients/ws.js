// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.objs.clients.ws');
goog.require('cljs.core');
goog.require('lt.object');
goog.require('lt.util.load');
goog.require('lt.objs.files');
goog.require('lt.objs.clients');
goog.require('clojure.string');
goog.require('lt.util.js');
goog.require('cljs.reader');
lt.objs.clients.ws.port = (0);
lt.objs.clients.ws.sockets = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
lt.objs.clients.ws.io = lt.util.load.node_module.call(null,"socket.io");
lt.objs.clients.ws.net = require("net");
lt.objs.clients.ws.send_to = (function lt$objs$clients$ws$send_to(sock,data){
if(cljs.core.truth_(sock)){
return sock.emit(cljs.core.second.call(null,data),data);
} else {
return console.log([cljs.core.str("No such client: "),cljs.core.str(sock)].join(''));
}
});
lt.objs.clients.ws.__GT_client = (function lt$objs$clients$ws$__GT_client(data){
var d = cljs.core.js__GT_clj.call(null,data,new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true);
return cljs.core.assoc.call(null,d,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"ws","ws",86841443));
});
lt.objs.clients.ws.store_client_BANG_ = (function lt$objs$clients$ws$store_client_BANG_(socket,data){
var data__$1 = cljs.core.js__GT_clj.call(null,data,new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true);
var client = lt.objs.clients.by_name.call(null,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(data__$1));
var data__$2 = ((cljs.core.not.call(null,new cljs.core.Keyword(null,"tags","tags",1771418977).cljs$core$IFn$_invoke$arity$1(data__$1)))?cljs.core.assoc.call(null,data__$1,new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ws.client","ws.client",1287413632)], null)):cljs.core.assoc.call(null,data__$1,new cljs.core.Keyword(null,"tags","tags",1771418977),cljs.core.map.call(null,cljs.core.keyword,new cljs.core.Keyword(null,"tags","tags",1771418977).cljs$core$IFn$_invoke$arity$1(data__$1))));
socket.on("disconnect",((function (data__$1,client,data__$2){
return (function (){
var temp__4657__auto__ = lt.objs.clients.by_name.call(null,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(data__$2));
if(cljs.core.truth_(temp__4657__auto__)){
var cur = temp__4657__auto__;
if(cljs.core._EQ_.call(null,socket,new cljs.core.Keyword(null,"socket","socket",59137063).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cur)))){
return lt.objs.clients.rem_BANG_.call(null,cur);
} else {
return null;
}
} else {
return null;
}
});})(data__$1,client,data__$2))
);

if(cljs.core.truth_(lt.objs.clients.available_QMARK_.call(null,client))){
return lt.object.merge_BANG_.call(null,client,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"socket","socket",59137063),socket], null));
} else {
return lt.objs.clients.handle_connection_BANG_.call(null,cljs.core.assoc.call(null,data__$2,new cljs.core.Keyword(null,"socket","socket",59137063),socket,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"websocket","websocket",-1714963101)));
}
});
lt.objs.clients.ws.on_result = (function lt$objs$clients$ws$on_result(socket,data){
return lt.object.raise.call(null,lt.objs.clients.clients,new cljs.core.Keyword(null,"message","message",-406056002),cljs.core.js__GT_clj.call(null,data,new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true));
});
lt.objs.clients.ws.on_connect = (function lt$objs$clients$ws$on_connect(socket){
socket.on("result",(function (p1__18699_SHARP_){
return lt.objs.clients.ws.on_result.call(null,socket,p1__18699_SHARP_);
}));

return socket.on("init",cljs.core.partial.call(null,lt.objs.clients.ws.store_client_BANG_,socket));
});
/**
 * 
 */
lt.objs.clients.ws.__BEH__send_BANG_ = (function lt$objs$clients$ws$__BEH__send_BANG_(this$,msg){
return lt.objs.clients.ws.send_to.call(null,new cljs.core.Keyword(null,"socket","socket",59137063).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),[new cljs.core.Keyword(null,"cb","cb",589947841).cljs$core$IFn$_invoke$arity$1(msg),new cljs.core.Keyword(null,"command","command",-894540724).cljs$core$IFn$_invoke$arity$1(msg),cljs.core.clj__GT_js.call(null,new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(msg))]);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.clients.ws","send!","lt.objs.clients.ws/send!",1206826072),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"send!","send!",480076706),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.clients.ws.__BEH__send_BANG_);
lt.objs.clients.ws.server = (function (){try{var ws = lt.objs.clients.ws.io.listen((5678));
ws.set("log level",(1));

ws.server.on("error",((function (ws){
return (function (p1__18700_SHARP_){
if(cljs.core._EQ_.call(null,p1__18700_SHARP_.code,"EADDRINUSE")){
console.log("Default socket.io port already used. Retrying with a random port.");

return ws.server.listen((0));
} else {
throw p1__18700_SHARP_;
}
});})(ws))
);

ws.server.on("listening",((function (ws){
return (function (){
return lt.objs.clients.ws.port = ws.server.address().port;
});})(ws))
);

(ws["static"]).add("/lighttable/ws.js",cljs.core.clj__GT_js.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"file","file",-1269645878),lt.objs.files.lt_home.call(null,"core/node_modules/lighttable/ws.js")], null)));

ws.sockets.on("connection",lt.objs.clients.ws.on_connect);

return ws;
}catch (e18701){var e = e18701;
return console.error("Error starting socket.io server",e);
}})();
/**
 * 
 */
lt.objs.clients.ws.__BEH__kill_on_closed = (function lt$objs$clients$ws$__BEH__kill_on_closed(app){
return lt.objs.clients.ws.server.close();
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.clients.ws","kill-on-closed","lt.objs.clients.ws/kill-on-closed",1231041913),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"closed","closed",-919675359),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.clients.ws.__BEH__kill_on_closed);
