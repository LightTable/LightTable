// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.objs.clients.tcp');
goog.require('cljs.core');
goog.require('lt.objs.console');
goog.require('lt.object');
goog.require('lt.objs.clients');
goog.require('clojure.string');
goog.require('cljs.reader');
lt.objs.clients.tcp.port = (0);
lt.objs.clients.tcp.net = require("net");
lt.objs.clients.tcp.send_to = (function lt$objs$clients$tcp$send_to(sock,msg){
if(cljs.core.truth_(sock)){
return sock.write([cljs.core.str(JSON.stringify(msg)),cljs.core.str("\n")].join(''));
} else {
return cljs.core.println.call(null,[cljs.core.str("No such client: "),cljs.core.str(sock)].join(''));
}
});
lt.objs.clients.tcp.store_client_BANG_ = (function lt$objs$clients$tcp$store_client_BANG_(socket,data){
var client = lt.objs.clients.by_name.call(null,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(data));
var data__$1 = ((cljs.core.not.call(null,new cljs.core.Keyword(null,"tags","tags",1771418977).cljs$core$IFn$_invoke$arity$1(data)))?cljs.core.assoc.call(null,data,new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tcp.client","tcp.client",483630546)], null)):cljs.core.assoc.call(null,data,new cljs.core.Keyword(null,"tags","tags",1771418977),cljs.core.map.call(null,cljs.core.keyword,new cljs.core.Keyword(null,"tags","tags",1771418977).cljs$core$IFn$_invoke$arity$1(data))));
if(cljs.core.truth_(lt.objs.clients.available_QMARK_.call(null,client))){
lt.objs.clients.close_BANG_.call(null,client);
} else {
}

socket.on("close",((function (client,data__$1){
return (function (){
var temp__4657__auto__ = lt.objs.clients.by_name.call(null,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(data__$1));
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
});})(client,data__$1))
);

return lt.objs.clients.handle_connection_BANG_.call(null,cljs.core.assoc.call(null,data__$1,new cljs.core.Keyword(null,"socket","socket",59137063),socket));
});
lt.objs.clients.tcp.on_message = (function lt$objs$clients$tcp$on_message(data){
return lt.object.raise.call(null,lt.objs.clients.clients,new cljs.core.Keyword(null,"message","message",-406056002),data);
});
lt.objs.clients.tcp.each_message = (function lt$objs$clients$tcp$each_message(socket,cb){
var buffer = socket.ltbuffer;
var loc = buffer.indexOf("\n");
var loc__$1 = loc;
var buf = buffer;
while(true){
if(cljs.core.truth_((function (){var and__6781__auto__ = loc__$1;
if(cljs.core.truth_(and__6781__auto__)){
return ((loc__$1 > (-1))) && (!(cljs.core.empty_QMARK_.call(null,buf)));
} else {
return and__6781__auto__;
}
})())){
var cur = cljs.core.subs.call(null,buf,(0),loc__$1);
var next = cljs.core.subs.call(null,buf,(loc__$1 + (1)));
var data = (function (){try{return cljs.core.js__GT_clj.call(null,JSON.parse(cur),new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true);
}catch (e18692){var e = e18692;
return lt.objs.console.error.call(null,e);
}})();
cb.call(null,data);

var G__18693 = next.indexOf("\n");
var G__18694 = next;
loc__$1 = G__18693;
buf = G__18694;
continue;
} else {
return socket.ltbuffer = buf;
}
break;
}
});
lt.objs.clients.tcp.on_result = (function lt$objs$clients$tcp$on_result(socket,data){
socket.ltbuffer = [cljs.core.str((function (){var or__6793__auto__ = socket.ltbuffer;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return "";
}
})()),cljs.core.str(data)].join('');

return lt.objs.clients.tcp.each_message.call(null,socket,(function (data__$1){
if(cljs.core.map_QMARK_.call(null,data__$1)){
return lt.objs.clients.tcp.store_client_BANG_.call(null,socket,data__$1);
} else {
return lt.objs.clients.tcp.on_message.call(null,data__$1);
}
}));
});
lt.objs.clients.tcp.on_connect = (function lt$objs$clients$tcp$on_connect(socket){
socket.ltbuffer = "";

return socket.on("data",(function (p1__18695_SHARP_){
return lt.objs.clients.tcp.on_result.call(null,socket,p1__18695_SHARP_);
}));
});
lt.objs.clients.tcp.server = (function (){try{var s = lt.objs.clients.tcp.net.createServer(lt.objs.clients.tcp.on_connect);
s.listen((0));

s.on("listening",((function (s){
return (function (){
return lt.objs.clients.tcp.port = s.address().port;
});})(s))
);

return s;
}catch (e18696){var e = e18696;
return lt.objs.console.error.call(null,"Error starting tcp server",e);
}})();
/**
 * 
 */
lt.objs.clients.tcp.__BEH__send_BANG_ = (function lt$objs$clients$tcp$__BEH__send_BANG_(this$,msg){
return lt.objs.clients.tcp.send_to.call(null,new cljs.core.Keyword(null,"socket","socket",59137063).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),[new cljs.core.Keyword(null,"cb","cb",589947841).cljs$core$IFn$_invoke$arity$1(msg),new cljs.core.Keyword(null,"command","command",-894540724).cljs$core$IFn$_invoke$arity$1(msg),cljs.core.clj__GT_js.call(null,new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(msg))]);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.clients.tcp","send!","lt.objs.clients.tcp/send!",1755181495),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"send!","send!",480076706),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.clients.tcp.__BEH__send_BANG_);
/**
 * 
 */
lt.objs.clients.tcp.__BEH__kill_on_closed = (function lt$objs$clients$tcp$__BEH__kill_on_closed(app){
return lt.objs.clients.tcp.server.close();
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.clients.tcp","kill-on-closed","lt.objs.clients.tcp/kill-on-closed",674324124),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"closed","closed",-919675359),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.clients.tcp.__BEH__kill_on_closed);
