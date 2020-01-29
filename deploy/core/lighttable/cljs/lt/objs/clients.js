// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.objs.clients');
goog.require('cljs.core');
goog.require('lt.object');
goog.require('lt.util.js');
goog.require('lt.objs.notifos');
goog.require('clojure.string');
lt.objs.clients.cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
lt.objs.clients.__GT_id = (function lt$objs$clients$__GT_id(obj){
return lt.object.__GT_id.call(null,obj);
});
lt.objs.clients.client_BANG_ = (function lt$objs$clients$client_BANG_(type){
var obj = lt.object.create.call(null,new cljs.core.Keyword("lt.objs.clients","client","lt.objs.clients/client",-1006178833));
lt.object.add_tags.call(null,obj,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [type], null));

cljs.core.swap_BANG_.call(null,lt.objs.clients.cs,cljs.core.assoc,lt.objs.clients.__GT_id.call(null,obj),obj);

return obj;
});
lt.objs.clients.by_id = (function lt$objs$clients$by_id(n){
if(cljs.core.truth_(n)){
return cljs.core.deref.call(null,lt.objs.clients.cs).call(null,n);
} else {
return null;
}
});
lt.objs.clients.by_name = (function lt$objs$clients$by_name(n){
return cljs.core.first.call(null,cljs.core.filter.call(null,(function (p1__16587_SHARP_){
return cljs.core._EQ_.call(null,n,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,p1__16587_SHARP_)));
}),cljs.core.vals.call(null,cljs.core.deref.call(null,lt.objs.clients.cs))));
});
lt.objs.clients.__GT_name = (function lt$objs$clients$__GT_name(client){
if(cljs.core.map_QMARK_.call(null,client)){
return new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(client);
} else {
return client;
}
});
lt.objs.clients.merge_info = (function lt$objs$clients$merge_info(client,info){
var map__16590 = info;
var map__16590__$1 = ((((!((map__16590 == null)))?((((map__16590.cljs$lang$protocol_mask$partition0$ & (64))) || (map__16590.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__16590):map__16590);
var commands = cljs.core.get.call(null,map__16590__$1,new cljs.core.Keyword(null,"commands","commands",161008658));
var type = cljs.core.get.call(null,map__16590__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var tags = cljs.core.get.call(null,map__16590__$1,new cljs.core.Keyword(null,"tags","tags",1771418977));
var info__$1 = cljs.core.dissoc.call(null,info,new cljs.core.Keyword(null,"tags","tags",1771418977));
lt.object.merge_BANG_.call(null,client,cljs.core.merge.call(null,info__$1,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"commands","commands",161008658),cljs.core.set.call(null,cljs.core.map.call(null,cljs.core.keyword,commands))], null)));

if(cljs.core.truth_(tags)){
return lt.object.add_tags.call(null,client,tags);
} else {
return null;
}
});
lt.objs.clients.handle_connection_BANG_ = (function lt$objs$clients$handle_connection_BANG_(info){
var temp__4655__auto__ = lt.objs.clients.by_id.call(null,new cljs.core.Keyword(null,"client-id","client-id",-464622140).cljs$core$IFn$_invoke$arity$1(info));
if(cljs.core.truth_(temp__4655__auto__)){
var client = temp__4655__auto__;
lt.objs.clients.merge_info.call(null,client,info);

lt.object.raise.call(null,client,new cljs.core.Keyword(null,"connect","connect",1232828233));

lt.object.raise.call(null,lt.objs.clients.clients,new cljs.core.Keyword(null,"connect","connect",1232828233),client);

return client;
} else {
var c = lt.objs.clients.client_BANG_.call(null,new cljs.core.Keyword(null,"tag","tag",-1290361223).cljs$core$IFn$_invoke$arity$1(info));
return lt$objs$clients$handle_connection_BANG_.call(null,cljs.core.assoc.call(null,info,new cljs.core.Keyword(null,"client-id","client-id",-464622140),lt.objs.clients.__GT_id.call(null,c)));
}
});
lt.objs.clients.rem_BANG_ = (function lt$objs$clients$rem_BANG_(client){
var cname = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,client));
cljs.core.swap_BANG_.call(null,lt.objs.clients.cs,cljs.core.dissoc,lt.objs.clients.__GT_id.call(null,client));

lt.object.raise.call(null,client,new cljs.core.Keyword(null,"disconnect","disconnect",-132009289));

lt.object.destroy_BANG_.call(null,client);

return lt.object.raise.call(null,lt.objs.clients.clients,new cljs.core.Keyword(null,"disconnect","disconnect",-132009289),cname);
});
lt.objs.clients.available_QMARK_ = (function lt$objs$clients$available_QMARK_(client){
return lt.objs.clients.by_id.call(null,lt.objs.clients.__GT_id.call(null,client));
});
lt.objs.clients.cb_gc_timeout = (((60) * (60)) * (1000));
lt.objs.clients.callbacks = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
lt.objs.clients.cb_id = cljs.core.atom.call(null,(-1));
lt.objs.clients.__GT_cb = (function lt$objs$clients$__GT_cb(only_QMARK_,cb){
if(cljs.core.truth_((function (){var and__6781__auto__ = only_QMARK_;
if(cljs.core.truth_(and__6781__auto__)){
return cb;
} else {
return and__6781__auto__;
}
})())){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [only_QMARK_,cb], null);
} else {
if(cljs.core.truth_(only_QMARK_)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,only_QMARK_], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [only_QMARK_,cb], null);

}
}
});
lt.objs.clients.store_cb = (function lt$objs$clients$store_cb(cb,id){
return cljs.core.swap_BANG_.call(null,lt.objs.clients.callbacks,cljs.core.assoc,id,cb);
});
lt.objs.clients.rem_cb = (function lt$objs$clients$rem_cb(cb){
return cljs.core.swap_BANG_.call(null,lt.objs.clients.callbacks,(function (p1__16592_SHARP_){
return cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.remove.call(null,(function (p__16600){
var vec__16601 = p__16600;
var k = cljs.core.nth.call(null,vec__16601,(0),null);
var vec__16604 = cljs.core.nth.call(null,vec__16601,(1),null);
var _ = cljs.core.nth.call(null,vec__16604,(0),null);
var v = cljs.core.nth.call(null,vec__16604,(1),null);
return cljs.core._EQ_.call(null,v,cb);
}),p1__16592_SHARP_));
}));
});
lt.objs.clients.callback_QMARK_ = (function lt$objs$clients$callback_QMARK_(id){
if(cljs.core.truth_(id)){
return cljs.core.deref.call(null,lt.objs.clients.callbacks).call(null,id);
} else {
return null;
}
});
lt.objs.clients.call = (function lt$objs$clients$call(id,command,data){
var vec__16610 = lt.objs.clients.callback_QMARK_.call(null,id);
var only_QMARK_ = cljs.core.nth.call(null,vec__16610,(0),null);
var obj = cljs.core.nth.call(null,vec__16610,(1),null);
if(cljs.core.truth_(obj)){
if(cljs.core.fn_QMARK_.call(null,obj)){
obj.call(null,command,data);
} else {
lt.object.raise.call(null,obj,command,data);
}

if((cljs.core.not.call(null,only_QMARK_)) && (!(cljs.core.fn_QMARK_.call(null,obj)))){
return lt.object.raise.call(null,lt.objs.clients.clients,command,data);
} else {
return null;
}
} else {
return null;
}
});
lt.objs.clients.cb__GT_obj = (function lt$objs$clients$cb__GT_obj(id){
var vec__16616 = lt.objs.clients.callback_QMARK_.call(null,id);
var only_QMARK_ = cljs.core.nth.call(null,vec__16616,(0),null);
var obj = cljs.core.nth.call(null,vec__16616,(1),null);
if(cljs.core.truth_(obj)){
if(cljs.core.fn_QMARK_.call(null,obj)){
return null;
} else {
return obj;
}
} else {
return null;
}
});
lt.objs.clients.__GT_message = (function lt$objs$clients$__GT_message(command,data,only_QMARK_,cb){
var cb__$1 = ((cljs.core.not.call(null,cb))?lt.objs.clients.clients:cb);
var cb_id = ((cljs.core.fn_QMARK_.call(null,cb__$1))?cljs.core.gensym.call(null,"client-cb"):null);
var vec__16622 = lt.objs.clients.__GT_cb.call(null,only_QMARK_,cb__$1);
var only_QMARK___$1 = cljs.core.nth.call(null,vec__16622,(0),null);
var cb__$2 = cljs.core.nth.call(null,vec__16622,(1),null);
var pair = vec__16622;
if(cljs.core.truth_(cb__$2)){
lt.objs.clients.store_cb.call(null,pair,cb_id);
} else {
}

return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"cb","cb",589947841),(function (){var or__6793__auto__ = cb_id;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return lt.object.__GT_id.call(null,cb__$2);
}
})(),new cljs.core.Keyword(null,"command","command",-894540724),cljs.core.name.call(null,command),new cljs.core.Keyword(null,"data","data",-232669377),data], null);
});
lt.objs.clients.subpath_QMARK_ = (function lt$objs$clients$subpath_QMARK_(root,sub){
if(cljs.core.truth_(root)){
return cljs.core._EQ_.call(null,clojure.string.lower_case.call(null,sub).indexOf(clojure.string.lower_case.call(null,root)),(0));
} else {
return null;
}
});
lt.objs.clients.discover_STAR_ = (function lt$objs$clients$discover_STAR_(var_args){
var args16626 = [];
var len__7868__auto___16635 = arguments.length;
var i__7869__auto___16636 = (0);
while(true){
if((i__7869__auto___16636 < len__7868__auto___16635)){
args16626.push((arguments[i__7869__auto___16636]));

var G__16637 = (i__7869__auto___16636 + (1));
i__7869__auto___16636 = G__16637;
continue;
} else {
}
break;
}

var G__16628 = args16626.length;
switch (G__16628) {
case 1:
return lt.objs.clients.discover_STAR_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return lt.objs.clients.discover_STAR_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args16626.length)].join('')));

}
});

lt.objs.clients.discover_STAR_.cljs$core$IFn$_invoke$arity$1 = (function (command){
return lt.objs.clients.discover_STAR_.call(null,command,null);
});

lt.objs.clients.discover_STAR_.cljs$core$IFn$_invoke$arity$2 = (function (command,p__16629){
var map__16630 = p__16629;
var map__16630__$1 = ((((!((map__16630 == null)))?((((map__16630.cljs$lang$protocol_mask$partition0$ & (64))) || (map__16630.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__16630):map__16630);
var path = cljs.core.get.call(null,map__16630__$1,new cljs.core.Keyword(null,"path","path",-188191168));
var all = cljs.core.filter.call(null,((function (map__16630,map__16630__$1,path){
return (function (cur){
var map__16632 = ((((!((cur == null)))?((((cur.cljs$lang$protocol_mask$partition0$ & (32768))) || (cur.cljs$core$IDeref$))?true:(((!cur.cljs$lang$protocol_mask$partition0$))?cljs.core.native_satisfies_QMARK_.call(null,cljs.core.IDeref,cur):false)):cljs.core.native_satisfies_QMARK_.call(null,cljs.core.IDeref,cur)))?cljs.core.deref.call(null,cur):cur);
var map__16632__$1 = ((((!((map__16632 == null)))?((((map__16632.cljs$lang$protocol_mask$partition0$ & (64))) || (map__16632.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__16632):map__16632);
var dir = cljs.core.get.call(null,map__16632__$1,new cljs.core.Keyword(null,"dir","dir",1734754661));
var commands = cljs.core.get.call(null,map__16632__$1,new cljs.core.Keyword(null,"commands","commands",161008658));
var and__6781__auto__ = (cljs.core.truth_((function (){var and__6781__auto__ = path;
if(cljs.core.truth_(and__6781__auto__)){
return dir;
} else {
return and__6781__auto__;
}
})())?lt.objs.clients.subpath_QMARK_.call(null,dir,path):true);
if(cljs.core.truth_(and__6781__auto__)){
return cljs.core.get.call(null,commands,command);
} else {
return and__6781__auto__;
}
});})(map__16630,map__16630__$1,path))
,cljs.core.vals.call(null,cljs.core.deref.call(null,lt.objs.clients.cs)));
var with_dir = cljs.core.filter.call(null,((function (all,map__16630,map__16630__$1,path){
return (function (p1__16625_SHARP_){
return cljs.core.deref.call(null,p1__16625_SHARP_).call(null,new cljs.core.Keyword(null,"dir","dir",1734754661));
});})(all,map__16630,map__16630__$1,path))
,all);
if(cljs.core.truth_((function (){var and__6781__auto__ = path;
if(cljs.core.truth_(and__6781__auto__)){
return cljs.core.seq.call(null,with_dir);
} else {
return and__6781__auto__;
}
})())){
return with_dir;
} else {
return all;
}
});

lt.objs.clients.discover_STAR_.cljs$lang$maxFixedArity = 2;

lt.objs.clients.discover = (function lt$objs$clients$discover(command,info){
var vec__16642 = lt.objs.clients.discover_STAR_.call(null,command,info);
var seq__16643 = cljs.core.seq.call(null,vec__16642);
var first__16644 = cljs.core.first.call(null,seq__16643);
var seq__16643__$1 = cljs.core.next.call(null,seq__16643);
var found = first__16644;
var others = seq__16643__$1;
var all = vec__16642;
if(cljs.core.not.call(null,found)){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"none","none",1333468478)], null);
} else {
if(cljs.core.truth_((function (){var and__6781__auto__ = found;
if(cljs.core.truth_(and__6781__auto__)){
return cljs.core.not.call(null,cljs.core.seq.call(null,others));
} else {
return and__6781__auto__;
}
})())){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"found","found",-584700170),found], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"select","select",1147833503),all], null);

}
}
});
lt.objs.clients.send = (function lt$objs$clients$send(var_args){
var args__7875__auto__ = [];
var len__7868__auto___16652 = arguments.length;
var i__7869__auto___16653 = (0);
while(true){
if((i__7869__auto___16653 < len__7868__auto___16652)){
args__7875__auto__.push((arguments[i__7869__auto___16653]));

var G__16654 = (i__7869__auto___16653 + (1));
i__7869__auto___16653 = G__16654;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((2) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((2)),(0),null)):null);
return lt.objs.clients.send.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__7876__auto__);
});

lt.objs.clients.send.cljs$core$IFn$_invoke$arity$variadic = (function (client,command,p__16648){
var vec__16649 = p__16648;
var data = cljs.core.nth.call(null,vec__16649,(0),null);
var only_QMARK_ = cljs.core.nth.call(null,vec__16649,(1),null);
var cb = cljs.core.nth.call(null,vec__16649,(2),null);
var message = lt.objs.clients.__GT_message.call(null,command,data,only_QMARK_,cb);
return lt.object.raise.call(null,client,new cljs.core.Keyword(null,"try-send!","try-send!",-242671068),message);
});

lt.objs.clients.send.cljs$lang$maxFixedArity = (2);

lt.objs.clients.send.cljs$lang$applyTo = (function (seq16645){
var G__16646 = cljs.core.first.call(null,seq16645);
var seq16645__$1 = cljs.core.next.call(null,seq16645);
var G__16647 = cljs.core.first.call(null,seq16645__$1);
var seq16645__$2 = cljs.core.next.call(null,seq16645__$1);
return lt.objs.clients.send.cljs$core$IFn$_invoke$arity$variadic(G__16646,G__16647,seq16645__$2);
});

lt.objs.clients.close_BANG_ = (function lt$objs$clients$close_BANG_(client){
lt.objs.clients.send.call(null,client,new cljs.core.Keyword(null,"client.close","client.close",-1160979233));

return lt.object.raise.call(null,client,new cljs.core.Keyword(null,"close!","close!",-2079310498));
});
lt.objs.clients.cancel_all_BANG_ = (function lt$objs$clients$cancel_all_BANG_(client){
return lt.objs.clients.send.call(null,client,new cljs.core.Keyword(null,"client.cancel-all","client.cancel-all",-2003484879));
});
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.clients","clients","lt.objs.clients/clients",-473821994),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"connect","connect",1232828233),new cljs.core.Keyword(null,"disconnect","disconnect",-132009289),new cljs.core.Keyword(null,"message","message",-406056002)], null),new cljs.core.Keyword(null,"behaviors","behaviors",120724909),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("lt.objs.clients","handle-message","lt.objs.clients/handle-message",1267417604),new cljs.core.Keyword("lt.objs.clients","notify-connect","lt.objs.clients/notify-connect",1991146694)], null),new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"clients","clients",1436018090),null], null), null),new cljs.core.Keyword(null,"init","init",-1875481434),(function (){
return null;
}));
lt.objs.clients.clients = lt.object.create.call(null,new cljs.core.Keyword("lt.objs.clients","clients","lt.objs.clients/clients",-473821994));
/**
 * 
 */
lt.objs.clients.__BEH__close_clients_on_closed = (function lt$objs$clients$__BEH__close_clients_on_closed(app){
var seq__16665 = cljs.core.seq.call(null,cljs.core.deref.call(null,lt.objs.clients.cs));
var chunk__16666 = null;
var count__16667 = (0);
var i__16668 = (0);
while(true){
if((i__16668 < count__16667)){
var vec__16669 = cljs.core._nth.call(null,chunk__16666,i__16668);
var _ = cljs.core.nth.call(null,vec__16669,(0),null);
var c = cljs.core.nth.call(null,vec__16669,(1),null);
lt.objs.clients.close_BANG_.call(null,c);

var G__16675 = seq__16665;
var G__16676 = chunk__16666;
var G__16677 = count__16667;
var G__16678 = (i__16668 + (1));
seq__16665 = G__16675;
chunk__16666 = G__16676;
count__16667 = G__16677;
i__16668 = G__16678;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__16665);
if(temp__4657__auto__){
var seq__16665__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__16665__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__16665__$1);
var G__16679 = cljs.core.chunk_rest.call(null,seq__16665__$1);
var G__16680 = c__7604__auto__;
var G__16681 = cljs.core.count.call(null,c__7604__auto__);
var G__16682 = (0);
seq__16665 = G__16679;
chunk__16666 = G__16680;
count__16667 = G__16681;
i__16668 = G__16682;
continue;
} else {
var vec__16672 = cljs.core.first.call(null,seq__16665__$1);
var _ = cljs.core.nth.call(null,vec__16672,(0),null);
var c = cljs.core.nth.call(null,vec__16672,(1),null);
lt.objs.clients.close_BANG_.call(null,c);

var G__16683 = cljs.core.next.call(null,seq__16665__$1);
var G__16684 = null;
var G__16685 = (0);
var G__16686 = (0);
seq__16665 = G__16683;
chunk__16666 = G__16684;
count__16667 = G__16685;
i__16668 = G__16686;
continue;
}
} else {
return null;
}
}
break;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.clients","close-clients-on-closed","lt.objs.clients/close-clients-on-closed",-574570522),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"closing","closing",-1862893890),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.clients.__BEH__close_clients_on_closed);
/**
 * 
 */
lt.objs.clients.__BEH__on_destroy_remove_cb = (function lt$objs$clients$__BEH__on_destroy_remove_cb(this$){
return lt.objs.clients.rem_cb.call(null,this$);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.clients","on-destroy-remove-cb","lt.objs.clients/on-destroy-remove-cb",1850960804),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"destroy","destroy",-843660405),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.clients.__BEH__on_destroy_remove_cb);
/**
 * 
 */
lt.objs.clients.__BEH__raise_on_object = (function lt$objs$clients$__BEH__raise_on_object(this$,p__16687){
var vec__16691 = p__16687;
var id = cljs.core.nth.call(null,vec__16691,(0),null);
var command = cljs.core.nth.call(null,vec__16691,(1),null);
var data = cljs.core.nth.call(null,vec__16691,(2),null);
return lt.object.raise.call(null,lt.object.by_id.call(null,id),cljs.core.keyword.call(null,command),data);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.clients","raise-on-object","lt.objs.clients/raise-on-object",1782168033),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"clients.raise-on-object","clients.raise-on-object",299808573),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.clients.__BEH__raise_on_object);
/**
 * 
 */
lt.objs.clients.__BEH__handle_message = (function lt$objs$clients$__BEH__handle_message(obj,p__16694){
var vec__16698 = p__16694;
var cb_id = cljs.core.nth.call(null,vec__16698,(0),null);
var command = cljs.core.nth.call(null,vec__16698,(1),null);
var data = cljs.core.nth.call(null,vec__16698,(2),null);
var msg = vec__16698;
if(cljs.core.truth_(lt.objs.clients.callback_QMARK_.call(null,cb_id))){
return lt.objs.clients.call.call(null,cb_id,cljs.core.keyword.call(null,command),data);
} else {
if(cljs.core.truth_(lt.object.by_id.call(null,cb_id))){
return lt.object.raise.call(null,lt.object.by_id.call(null,cb_id),cljs.core.keyword.call(null,command),data);
} else {
return lt.object.raise.call(null,lt.objs.clients.clients,cljs.core.keyword.call(null,command),data);

}
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.clients","handle-message","lt.objs.clients/handle-message",1267417604),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"message","message",-406056002),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.clients.__BEH__handle_message);
/**
 * 
 */
lt.objs.clients.__BEH__notify_connect = (function lt$objs$clients$__BEH__notify_connect(obj,client){
return lt.objs.notifos.set_msg_BANG_.call(null,[cljs.core.str("Connected to "),cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,client)))].join(''));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.clients","notify-connect","lt.objs.clients/notify-connect",1991146694),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"connect","connect",1232828233),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.clients.__BEH__notify_connect);
lt.objs.clients.placeholder = (function lt$objs$clients$placeholder(){
return lt.object.add_tags.call(null,lt.object.create.call(null,new cljs.core.Keyword("lt.objs.clients","client","lt.objs.clients/client",-1006178833)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"client.placeholder","client.placeholder",-250892681)], null));
});
lt.objs.clients.placeholder_QMARK_ = (function lt$objs$clients$placeholder_QMARK_(c){
return lt.object.has_tag_QMARK_.call(null,c,new cljs.core.Keyword(null,"client.placeholder","client.placeholder",-250892681));
});
lt.objs.clients.swap_client_BANG_ = (function lt$objs$clients$swap_client_BANG_(a,b){
var seq__16705_16709 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"queue","queue",1455835879).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,a)));
var chunk__16706_16710 = null;
var count__16707_16711 = (0);
var i__16708_16712 = (0);
while(true){
if((i__16708_16712 < count__16707_16711)){
var item_16713 = cljs.core._nth.call(null,chunk__16706_16710,i__16708_16712);
lt.object.raise.call(null,b,new cljs.core.Keyword(null,"try-send!","try-send!",-242671068),item_16713);

var G__16714 = seq__16705_16709;
var G__16715 = chunk__16706_16710;
var G__16716 = count__16707_16711;
var G__16717 = (i__16708_16712 + (1));
seq__16705_16709 = G__16714;
chunk__16706_16710 = G__16715;
count__16707_16711 = G__16716;
i__16708_16712 = G__16717;
continue;
} else {
var temp__4657__auto___16718 = cljs.core.seq.call(null,seq__16705_16709);
if(temp__4657__auto___16718){
var seq__16705_16719__$1 = temp__4657__auto___16718;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__16705_16719__$1)){
var c__7604__auto___16720 = cljs.core.chunk_first.call(null,seq__16705_16719__$1);
var G__16721 = cljs.core.chunk_rest.call(null,seq__16705_16719__$1);
var G__16722 = c__7604__auto___16720;
var G__16723 = cljs.core.count.call(null,c__7604__auto___16720);
var G__16724 = (0);
seq__16705_16709 = G__16721;
chunk__16706_16710 = G__16722;
count__16707_16711 = G__16723;
i__16708_16712 = G__16724;
continue;
} else {
var item_16725 = cljs.core.first.call(null,seq__16705_16719__$1);
lt.object.raise.call(null,b,new cljs.core.Keyword(null,"try-send!","try-send!",-242671068),item_16725);

var G__16726 = cljs.core.next.call(null,seq__16705_16719__$1);
var G__16727 = null;
var G__16728 = (0);
var G__16729 = (0);
seq__16705_16709 = G__16726;
chunk__16706_16710 = G__16727;
count__16707_16711 = G__16728;
i__16708_16712 = G__16729;
continue;
}
} else {
}
}
break;
}

return lt.object.raise.call(null,a,new cljs.core.Keyword(null,"swapped","swapped",-1379678077),b);
});
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.clients","client","lt.objs.clients/client",-1006178833),new cljs.core.Keyword(null,"queue","queue",1455835879),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"client","client",-1323448117),null], null), null));
/**
 * 
 */
lt.objs.clients.__BEH__try_send = (function lt$objs$clients$__BEH__try_send(this$,msg){
if(cljs.core.truth_(new cljs.core.Keyword(null,"connected","connected",-169833045).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)))){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"send!","send!",480076706),msg);
} else {
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"queue!","queue!",-1061064868),msg);
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.clients","try-send","lt.objs.clients/try-send",-1635591927),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"try-send!","try-send!",-242671068),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.clients.__BEH__try_send);
/**
 * 
 */
lt.objs.clients.__BEH__queue_BANG_ = (function lt$objs$clients$__BEH__queue_BANG_(this$,msg){
return lt.object.update_BANG_.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"queue","queue",1455835879)], null),cljs.core.conj,msg);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.clients","queue!","lt.objs.clients/queue!",-774003192),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"queue!","queue!",-1061064868),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.clients.__BEH__queue_BANG_);
/**
 * 
 */
lt.objs.clients.__BEH__on_connect_drain = (function lt$objs$clients$__BEH__on_connect_drain(this$){
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"connected","connected",-169833045),true], null));

var seq__16734_16738 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"queue","queue",1455835879).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
var chunk__16735_16739 = null;
var count__16736_16740 = (0);
var i__16737_16741 = (0);
while(true){
if((i__16737_16741 < count__16736_16740)){
var q_16742 = cljs.core._nth.call(null,chunk__16735_16739,i__16737_16741);
lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"send!","send!",480076706),q_16742);

cljs.core.doall.call(null,cljs.core.range.call(null,(10000)));

var G__16743 = seq__16734_16738;
var G__16744 = chunk__16735_16739;
var G__16745 = count__16736_16740;
var G__16746 = (i__16737_16741 + (1));
seq__16734_16738 = G__16743;
chunk__16735_16739 = G__16744;
count__16736_16740 = G__16745;
i__16737_16741 = G__16746;
continue;
} else {
var temp__4657__auto___16747 = cljs.core.seq.call(null,seq__16734_16738);
if(temp__4657__auto___16747){
var seq__16734_16748__$1 = temp__4657__auto___16747;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__16734_16748__$1)){
var c__7604__auto___16749 = cljs.core.chunk_first.call(null,seq__16734_16748__$1);
var G__16750 = cljs.core.chunk_rest.call(null,seq__16734_16748__$1);
var G__16751 = c__7604__auto___16749;
var G__16752 = cljs.core.count.call(null,c__7604__auto___16749);
var G__16753 = (0);
seq__16734_16738 = G__16750;
chunk__16735_16739 = G__16751;
count__16736_16740 = G__16752;
i__16737_16741 = G__16753;
continue;
} else {
var q_16754 = cljs.core.first.call(null,seq__16734_16748__$1);
lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"send!","send!",480076706),q_16754);

cljs.core.doall.call(null,cljs.core.range.call(null,(10000)));

var G__16755 = cljs.core.next.call(null,seq__16734_16748__$1);
var G__16756 = null;
var G__16757 = (0);
var G__16758 = (0);
seq__16734_16738 = G__16755;
chunk__16735_16739 = G__16756;
count__16736_16740 = G__16757;
i__16737_16741 = G__16758;
continue;
}
} else {
}
}
break;
}

return lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"queue","queue",1455835879),cljs.core.PersistentVector.EMPTY], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.clients","on-connect-drain","lt.objs.clients/on-connect-drain",1182657406),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"connect","connect",1232828233),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.clients.__BEH__on_connect_drain);
/**
 * 
 */
lt.objs.clients.__BEH__remove_placeholder_on_swapped = (function lt$objs$clients$__BEH__remove_placeholder_on_swapped(this$){
return lt.object.destroy_BANG_.call(null,this$);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.clients","remove-placeholder-on-swapped","lt.objs.clients/remove-placeholder-on-swapped",40647352),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"swapped","swapped",-1379678077),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.clients.__BEH__remove_placeholder_on_swapped);
