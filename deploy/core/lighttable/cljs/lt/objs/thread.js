// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.objs.thread');
goog.require('cljs.core');
goog.require('lt.objs.platform');
goog.require('lt.objs.console');
goog.require('lt.object');
goog.require('lt.objs.files');
goog.require('cljs.reader');
lt.objs.thread.cp = require("child_process");
/**
 * 
 */
lt.objs.thread.__BEH__try_send = (function lt$objs$thread$__BEH__try_send(this$,msg){
if(cljs.core.not.call(null,new cljs.core.Keyword(null,"connected","connected",-169833045).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)))){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"queue!","queue!",-1061064868),msg);
} else {
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"send!","send!",480076706),msg);
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.thread","try-send","lt.objs.thread/try-send",97149939),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"try-send!","try-send!",-242671068),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.thread.__BEH__try_send);
/**
 * 
 */
lt.objs.thread.__BEH__queue_BANG_ = (function lt$objs$thread$__BEH__queue_BANG_(this$,msg){
return lt.object.update_BANG_.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"queue","queue",1455835879)], null),cljs.core.conj,msg);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.thread","queue!","lt.objs.thread/queue!",-1364847390),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"queue!","queue!",-1061064868),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.thread.__BEH__queue_BANG_);
/**
 * 
 */
lt.objs.thread.__BEH__send_BANG_ = (function lt$objs$thread$__BEH__send_BANG_(this$,msg){
return new cljs.core.Keyword(null,"worker","worker",938239996).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)).send(cljs.core.clj__GT_js.call(null,msg));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.thread","send!","lt.objs.thread/send!",-876836912),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"send!","send!",480076706),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.thread.__BEH__send_BANG_);
/**
 * 
 */
lt.objs.thread.__BEH__connect = (function lt$objs$thread$__BEH__connect(this$){
var seq__16921_16925 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"queue","queue",1455835879).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
var chunk__16922_16926 = null;
var count__16923_16927 = (0);
var i__16924_16928 = (0);
while(true){
if((i__16924_16928 < count__16923_16927)){
var q_16929 = cljs.core._nth.call(null,chunk__16922_16926,i__16924_16928);
lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"send!","send!",480076706),q_16929);

var G__16930 = seq__16921_16925;
var G__16931 = chunk__16922_16926;
var G__16932 = count__16923_16927;
var G__16933 = (i__16924_16928 + (1));
seq__16921_16925 = G__16930;
chunk__16922_16926 = G__16931;
count__16923_16927 = G__16932;
i__16924_16928 = G__16933;
continue;
} else {
var temp__4657__auto___16934 = cljs.core.seq.call(null,seq__16921_16925);
if(temp__4657__auto___16934){
var seq__16921_16935__$1 = temp__4657__auto___16934;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__16921_16935__$1)){
var c__7604__auto___16936 = cljs.core.chunk_first.call(null,seq__16921_16935__$1);
var G__16937 = cljs.core.chunk_rest.call(null,seq__16921_16935__$1);
var G__16938 = c__7604__auto___16936;
var G__16939 = cljs.core.count.call(null,c__7604__auto___16936);
var G__16940 = (0);
seq__16921_16925 = G__16937;
chunk__16922_16926 = G__16938;
count__16923_16927 = G__16939;
i__16924_16928 = G__16940;
continue;
} else {
var q_16941 = cljs.core.first.call(null,seq__16921_16935__$1);
lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"send!","send!",480076706),q_16941);

var G__16942 = cljs.core.next.call(null,seq__16921_16935__$1);
var G__16943 = null;
var G__16944 = (0);
var G__16945 = (0);
seq__16921_16925 = G__16942;
chunk__16922_16926 = G__16943;
count__16923_16927 = G__16944;
i__16924_16928 = G__16945;
continue;
}
} else {
}
}
break;
}

return lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"connected","connected",-169833045),true,new cljs.core.Keyword(null,"queue","queue",1455835879),cljs.core.PersistentVector.EMPTY], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.thread","connect","lt.objs.thread/connect",396017879),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"connect","connect",1232828233),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.thread.__BEH__connect);
/**
 * 
 */
lt.objs.thread.__BEH__message = (function lt$objs$thread$__BEH__message(this$,m){
var temp__4657__auto__ = lt.object.by_id.call(null,m.obj);
if(cljs.core.truth_(temp__4657__auto__)){
var obj = temp__4657__auto__;
return lt.object.raise.call(null,obj,((!((m.msg instanceof cljs.core.Keyword)))?cljs.core.keyword.call(null,m.msg):m.msg),((cljs.core._EQ_.call(null,"clj",m.format))?cljs.reader.read_string.call(null,m.res):m.res));
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.thread","message","lt.objs.thread/message",438532424),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"message","message",-406056002),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.thread.__BEH__message);
/**
 * 
 */
lt.objs.thread.__BEH__kill_BANG_ = (function lt$objs$thread$__BEH__kill_BANG_(this$){
return new cljs.core.Keyword(null,"worker","worker",938239996).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)).kill();
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.thread","kill!","lt.objs.thread/kill!",559786964),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"kill!","kill!",1274963514),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.thread.__BEH__kill_BANG_);
/**
 * 
 */
lt.objs.thread.__BEH__shutdown_worker_on_close = (function lt$objs$thread$__BEH__shutdown_worker_on_close(app){
return lt.object.raise.call(null,lt.objs.thread.worker,new cljs.core.Keyword(null,"kill!","kill!",1274963514));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.thread","shutdown-worker-on-close","lt.objs.thread/shutdown-worker-on-close",87823339),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"closed","closed",-919675359),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.thread.__BEH__shutdown_worker_on_close);
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.thread","worker-thread","lt.objs.thread/worker-thread",288267440),new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"worker-thread","worker-thread",-552877514),null], null), null),new cljs.core.Keyword(null,"queue","queue",1455835879),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"init","init",-1875481434),(function (this$){
var worker = lt.objs.thread.cp.fork(lt.objs.files.lt_home.call(null,"/core/lighttable/background/threadworker.js"),cljs.core.clj__GT_js.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"execPath","execPath",2029107592),process.execPath,new cljs.core.Keyword(null,"silent","silent",-1142977785),true,new cljs.core.Keyword(null,"env","env",-1815813235),new cljs.core.PersistentArrayMap(null, 1, ["ELECTRON_RUN_AS_NODE",(1)], null),new cljs.core.Keyword(null,"cwd","cwd",14056523),lt.objs.files.cwd], null)));
worker.stdout.on("data",((function (worker){
return (function (data){
return lt.objs.console.loc_log.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"file","file",-1269645878),"thread",new cljs.core.Keyword(null,"line","line",212345235),"stdout",new cljs.core.Keyword(null,"content","content",15833224),[cljs.core.str(data)].join('')], null));
});})(worker))
);

worker.stderr.on("data",((function (worker){
return (function (data){
return lt.objs.console.loc_log.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"file","file",-1269645878),"thread",new cljs.core.Keyword(null,"line","line",212345235),"stderr",new cljs.core.Keyword(null,"content","content",15833224),[cljs.core.str(data)].join(''),new cljs.core.Keyword(null,"class","class",-2030961996),"error"], null));
});})(worker))
);

worker.on("message",((function (worker){
return (function (m){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"message","message",-406056002),m);
});})(worker))
);

worker.send(cljs.core.clj__GT_js.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"msg","msg",-1386103444),"init",new cljs.core.Keyword(null,"obj","obj",981763962),lt.object.__GT_id.call(null,this$),new cljs.core.Keyword(null,"ltpath","ltpath",-133203470),lt.objs.files.lt_home.call(null)], null)));

lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"worker","worker",938239996),worker], null));

return null;
}));
lt.objs.thread.send = (function lt$objs$thread$send(msg){
return lt.object.raise.call(null,lt.objs.thread.worker,new cljs.core.Keyword(null,"try-send!","try-send!",-242671068),msg);
});
lt.objs.thread.thread_STAR_ = (function lt$objs$thread$thread_STAR_(func){
var func_str = [cljs.core.str(""),cljs.core.str(func)].join('');
var n = cljs.core.gensym.call(null,"threadfunc");
lt.objs.thread.send.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"msg","msg",-1386103444),"register",new cljs.core.Keyword(null,"name","name",1843675177),n,new cljs.core.Keyword(null,"func","func",-238706040),func_str], null));

return ((function (func_str,n){
return (function() { 
var G__16946__delegate = function (obj,args){
return lt.objs.thread.send.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"msg","msg",-1386103444),"call",new cljs.core.Keyword(null,"name","name",1843675177),n,new cljs.core.Keyword(null,"obj","obj",981763962),lt.object.__GT_id.call(null,obj),new cljs.core.Keyword(null,"params","params",710516235),cljs.core.map.call(null,cljs.core.pr_str,args)], null));
};
var G__16946 = function (obj,var_args){
var args = null;
if (arguments.length > 1) {
var G__16947__i = 0, G__16947__a = new Array(arguments.length -  1);
while (G__16947__i < G__16947__a.length) {G__16947__a[G__16947__i] = arguments[G__16947__i + 1]; ++G__16947__i;}
  args = new cljs.core.IndexedSeq(G__16947__a,0);
} 
return G__16946__delegate.call(this,obj,args);};
G__16946.cljs$lang$maxFixedArity = 1;
G__16946.cljs$lang$applyTo = (function (arglist__16948){
var obj = cljs.core.first(arglist__16948);
var args = cljs.core.rest(arglist__16948);
return G__16946__delegate(obj,args);
});
G__16946.cljs$core$IFn$_invoke$arity$variadic = G__16946__delegate;
return G__16946;
})()
;
;})(func_str,n))
});
lt.object.tag_behaviors.call(null,new cljs.core.Keyword(null,"worker-thread","worker-thread",-552877514),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("lt.objs.thread","kill!","lt.objs.thread/kill!",559786964),new cljs.core.Keyword("lt.objs.thread","connect","lt.objs.thread/connect",396017879),new cljs.core.Keyword("lt.objs.thread","send!","lt.objs.thread/send!",-876836912),new cljs.core.Keyword("lt.objs.thread","queue!","lt.objs.thread/queue!",-1364847390),new cljs.core.Keyword("lt.objs.thread","try-send","lt.objs.thread/try-send",97149939),new cljs.core.Keyword("lt.objs.thread","message","lt.objs.thread/message",438532424)], null));
lt.objs.thread.worker = lt.object.create.call(null,new cljs.core.Keyword("lt.objs.thread","worker-thread","lt.objs.thread/worker-thread",288267440));
