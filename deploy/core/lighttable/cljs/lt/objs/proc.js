// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.objs.proc');
goog.require('cljs.core');
goog.require('lt.objs.notifos');
goog.require('lt.objs.platform');
goog.require('lt.object');
goog.require('lt.objs.app');
goog.require('lt.util.load');
goog.require('lt.objs.files');
goog.require('lt.objs.clients');
goog.require('clojure.string');
lt.objs.proc.shell = lt.util.load.node_module.call(null,"shelljs");
lt.objs.proc.spawn = require("child_process").spawn;
lt.objs.proc.custom_env = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
lt.objs.proc.procs = cljs.core.atom.call(null,cljs.core.PersistentHashSet.EMPTY);
lt.objs.proc.add_BANG_ = (function lt$objs$proc$add_BANG_(p){
return cljs.core.swap_BANG_.call(null,lt.objs.proc.procs,cljs.core.conj,p);
});
lt.objs.proc.rem_BANG_ = (function lt$objs$proc$rem_BANG_(p){
return cljs.core.swap_BANG_.call(null,lt.objs.proc.procs,cljs.core.disj,p);
});
lt.objs.proc.kill = (function lt$objs$proc$kill(p){
return p.kill();
});
lt.objs.proc.kill_all = (function lt$objs$proc$kill_all(var_args){
var args__7875__auto__ = [];
var len__7868__auto___16960 = arguments.length;
var i__7869__auto___16961 = (0);
while(true){
if((i__7869__auto___16961 < len__7868__auto___16960)){
args__7875__auto__.push((arguments[i__7869__auto___16961]));

var G__16962 = (i__7869__auto___16961 + (1));
i__7869__auto___16961 = G__16962;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((0) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((0)),(0),null)):null);
return lt.objs.proc.kill_all.cljs$core$IFn$_invoke$arity$variadic(argseq__7876__auto__);
});

lt.objs.proc.kill_all.cljs$core$IFn$_invoke$arity$variadic = (function (p__16952){
var vec__16953 = p__16952;
var ps = cljs.core.nth.call(null,vec__16953,(0),null);
var seq__16956 = cljs.core.seq.call(null,(function (){var or__6793__auto__ = ps;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return cljs.core.deref.call(null,lt.objs.proc.procs);
}
})());
var chunk__16957 = null;
var count__16958 = (0);
var i__16959 = (0);
while(true){
if((i__16959 < count__16958)){
var p = cljs.core._nth.call(null,chunk__16957,i__16959);
lt.objs.proc.kill.call(null,p);

var G__16963 = seq__16956;
var G__16964 = chunk__16957;
var G__16965 = count__16958;
var G__16966 = (i__16959 + (1));
seq__16956 = G__16963;
chunk__16957 = G__16964;
count__16958 = G__16965;
i__16959 = G__16966;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__16956);
if(temp__4657__auto__){
var seq__16956__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__16956__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__16956__$1);
var G__16967 = cljs.core.chunk_rest.call(null,seq__16956__$1);
var G__16968 = c__7604__auto__;
var G__16969 = cljs.core.count.call(null,c__7604__auto__);
var G__16970 = (0);
seq__16956 = G__16967;
chunk__16957 = G__16968;
count__16958 = G__16969;
i__16959 = G__16970;
continue;
} else {
var p = cljs.core.first.call(null,seq__16956__$1);
lt.objs.proc.kill.call(null,p);

var G__16971 = cljs.core.next.call(null,seq__16956__$1);
var G__16972 = null;
var G__16973 = (0);
var G__16974 = (0);
seq__16956 = G__16971;
chunk__16957 = G__16972;
count__16958 = G__16973;
i__16959 = G__16974;
continue;
}
} else {
return null;
}
}
break;
}
});

lt.objs.proc.kill_all.cljs$lang$maxFixedArity = (0);

lt.objs.proc.kill_all.cljs$lang$applyTo = (function (seq16951){
return lt.objs.proc.kill_all.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq16951));
});

lt.objs.proc.parse_commands = (function lt$objs$proc$parse_commands(com){
var pipes = clojure.string.split.call(null,com,"|");
var iter__7573__auto__ = ((function (pipes){
return (function lt$objs$proc$parse_commands_$_iter__16979(s__16980){
return (new cljs.core.LazySeq(null,((function (pipes){
return (function (){
var s__16980__$1 = s__16980;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__16980__$1);
if(temp__4657__auto__){
var s__16980__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__16980__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__16980__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__16982 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__16981 = (0);
while(true){
if((i__16981 < size__7572__auto__)){
var p = cljs.core._nth.call(null,c__7571__auto__,i__16981);
var args = cljs.core.filter.call(null,cljs.core.complement.call(null,cljs.core.empty_QMARK_),cljs.core.re_seq.call(null,/(?:(?:\\\s)|[^\s\"'])+|\"[^\"]*\"|'[^']*'/,p));
cljs.core.chunk_append.call(null,b__16982,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"command","command",-894540724),cljs.core.first.call(null,args),new cljs.core.Keyword(null,"args","args",1315556576),cljs.core.rest.call(null,args)], null));

var G__16983 = (i__16981 + (1));
i__16981 = G__16983;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__16982),lt$objs$proc$parse_commands_$_iter__16979.call(null,cljs.core.chunk_rest.call(null,s__16980__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__16982),null);
}
} else {
var p = cljs.core.first.call(null,s__16980__$2);
var args = cljs.core.filter.call(null,cljs.core.complement.call(null,cljs.core.empty_QMARK_),cljs.core.re_seq.call(null,/(?:(?:\\\s)|[^\s\"'])+|\"[^\"]*\"|'[^']*'/,p));
return cljs.core.cons.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"command","command",-894540724),cljs.core.first.call(null,args),new cljs.core.Keyword(null,"args","args",1315556576),cljs.core.rest.call(null,args)], null),lt$objs$proc$parse_commands_$_iter__16979.call(null,cljs.core.rest.call(null,s__16980__$2)));
}
} else {
return null;
}
break;
}
});})(pipes))
,null,null));
});})(pipes))
;
return iter__7573__auto__.call(null,pipes);
});
lt.objs.proc.merge_env = (function lt$objs$proc$merge_env(env){
if(cljs.core.not.call(null,env)){
return process.env;
} else {
return cljs.core.clj__GT_js.call(null,cljs.core.merge.call(null,cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__7573__auto__ = (function lt$objs$proc$merge_env_$_iter__16988(s__16989){
return (new cljs.core.LazySeq(null,(function (){
var s__16989__$1 = s__16989;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__16989__$1);
if(temp__4657__auto__){
var s__16989__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__16989__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__16989__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__16991 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__16990 = (0);
while(true){
if((i__16990 < size__7572__auto__)){
var k = cljs.core._nth.call(null,c__7571__auto__,i__16990);
cljs.core.chunk_append.call(null,b__16991,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,(process.env[k])], null));

var G__16992 = (i__16990 + (1));
i__16990 = G__16992;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__16991),lt$objs$proc$merge_env_$_iter__16988.call(null,cljs.core.chunk_rest.call(null,s__16989__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__16991),null);
}
} else {
var k = cljs.core.first.call(null,s__16989__$2);
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,(process.env[k])], null),lt$objs$proc$merge_env_$_iter__16988.call(null,cljs.core.rest.call(null,s__16989__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__7573__auto__.call(null,Object.keys(process.env));
})()),env,cljs.core.deref.call(null,lt.objs.proc.custom_env)));
}
});
lt.objs.proc.simple_spawn_STAR_ = (function lt$objs$proc$simple_spawn_STAR_(obj,p__16997,cwd_QMARK_,env){
var map__17002 = p__16997;
var map__17002__$1 = ((((!((map__17002 == null)))?((((map__17002.cljs$lang$protocol_mask$partition0$ & (64))) || (map__17002.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__17002):map__17002);
var command = cljs.core.get.call(null,map__17002__$1,new cljs.core.Keyword(null,"command","command",-894540724));
var args = cljs.core.get.call(null,map__17002__$1,new cljs.core.Keyword(null,"args","args",1315556576));
var proc = lt.objs.proc.spawn.call(null,command,((cljs.core.seq.call(null,args))?cljs.core.clj__GT_js.call(null,args):null),(function (){var obj17005 = {"cwd":cwd_QMARK_,"env":lt.objs.proc.merge_env.call(null,env)};
return obj17005;
})());
lt.objs.proc.add_BANG_.call(null,proc);

proc.on("exit",cljs.core.partial.call(null,lt.objs.proc.rem_BANG_,proc));

proc.on("error",((function (proc,map__17002,map__17002__$1,command,args){
return (function (p1__16993_SHARP_){
if(cljs.core.truth_(cljs.core.deref.call(null,obj))){
cljs.core.println.call(null,[cljs.core.str(p1__16993_SHARP_)].join(''),([cljs.core.str(p1__16993_SHARP_)].join('').indexOf("ENOENT") > (-1)));

if(([cljs.core.str(p1__16993_SHARP_)].join('').indexOf("ENOENT") > (-1))){
lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"proc.error","proc.error",-61427727),[cljs.core.str("Could not find command: "),cljs.core.str(command)].join(''));

lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"proc.exit","proc.exit",1585374833));

return proc.kill();
} else {
return lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"proc.error","proc.error",-61427727),p1__16993_SHARP_);
}
} else {
return null;
}
});})(proc,map__17002,map__17002__$1,command,args))
);

proc.stderr.on("data",((function (proc,map__17002,map__17002__$1,command,args){
return (function (p1__16994_SHARP_){
if(cljs.core.not.call(null,cljs.core.deref.call(null,obj))){
return cljs.core.println.call(null,"ERROR running: ",command);
} else {
return lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"proc.error","proc.error",-61427727),p1__16994_SHARP_);
}
});})(proc,map__17002,map__17002__$1,command,args))
);

proc.stdout.on("data",((function (proc,map__17002,map__17002__$1,command,args){
return (function (p1__16995_SHARP_){
if(cljs.core.truth_(cljs.core.deref.call(null,obj))){
return lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"proc.out","proc.out",-1091295217),p1__16995_SHARP_);
} else {
return null;
}
});})(proc,map__17002,map__17002__$1,command,args))
);

return proc.on("exit",((function (proc,map__17002,map__17002__$1,command,args){
return (function (p1__16996_SHARP_){
if(cljs.core.truth_(cljs.core.deref.call(null,obj))){
return lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"proc.exit","proc.exit",1585374833),p1__16996_SHARP_);
} else {
return null;
}
});})(proc,map__17002,map__17002__$1,command,args))
,proc);
});
lt.objs.proc.exec = (function lt$objs$proc$exec(com){
var map__17012 = com;
var map__17012__$1 = ((((!((map__17012 == null)))?((((map__17012.cljs$lang$protocol_mask$partition0$ & (64))) || (map__17012.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__17012):map__17012);
var this$ = map__17012__$1;
var command = cljs.core.get.call(null,map__17012__$1,new cljs.core.Keyword(null,"command","command",-894540724));
var obj = cljs.core.get.call(null,map__17012__$1,new cljs.core.Keyword(null,"obj","obj",981763962));
var cwd = cljs.core.get.call(null,map__17012__$1,new cljs.core.Keyword(null,"cwd","cwd",14056523));
var env = cljs.core.get.call(null,map__17012__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var args = cljs.core.get.call(null,map__17012__$1,new cljs.core.Keyword(null,"args","args",1315556576));
var commands = ((cljs.core.not.call(null,args))?lt.objs.proc.parse_commands.call(null,command):new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [this$], null));
var procs = cljs.core.doall.call(null,(function (){var iter__7573__auto__ = ((function (map__17012,map__17012__$1,this$,command,obj,cwd,env,args,commands){
return (function lt$objs$proc$exec_$_iter__17014(s__17015){
return (new cljs.core.LazySeq(null,((function (map__17012,map__17012__$1,this$,command,obj,cwd,env,args,commands){
return (function (){
var s__17015__$1 = s__17015;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__17015__$1);
if(temp__4657__auto__){
var s__17015__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__17015__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__17015__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__17017 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__17016 = (0);
while(true){
if((i__17016 < size__7572__auto__)){
var c = cljs.core._nth.call(null,c__7571__auto__,i__17016);
cljs.core.chunk_append.call(null,b__17017,lt.objs.proc.simple_spawn_STAR_.call(null,obj,c,cwd,env));

var G__17018 = (i__17016 + (1));
i__17016 = G__17018;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__17017),lt$objs$proc$exec_$_iter__17014.call(null,cljs.core.chunk_rest.call(null,s__17015__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__17017),null);
}
} else {
var c = cljs.core.first.call(null,s__17015__$2);
return cljs.core.cons.call(null,lt.objs.proc.simple_spawn_STAR_.call(null,obj,c,cwd,env),lt$objs$proc$exec_$_iter__17014.call(null,cljs.core.rest.call(null,s__17015__$2)));
}
} else {
return null;
}
break;
}
});})(map__17012,map__17012__$1,this$,command,obj,cwd,env,args,commands))
,null,null));
});})(map__17012,map__17012__$1,this$,command,obj,cwd,env,args,commands))
;
return iter__7573__auto__.call(null,commands);
})());
lt.object.merge_BANG_.call(null,obj,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"procs","procs",-2025727913),procs], null));

return null;
});
/**
 * 
 */
lt.objs.proc.__BEH__kill_procs_on_close = (function lt$objs$proc$__BEH__kill_procs_on_close(this$){
return lt.objs.proc.kill_all.call(null);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.proc","kill-procs-on-close","lt.objs.proc/kill-procs-on-close",206431418),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"closed","closed",-919675359),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.proc.__BEH__kill_procs_on_close);
lt.object.add_behavior_BANG_.call(null,lt.objs.app.app,new cljs.core.Keyword("lt.objs.proc","kill-procs-on-close","lt.objs.proc/kill-procs-on-close",206431418));
/**
 * 
 */
lt.objs.proc.__BEH__print_all = (function lt$objs$proc$__BEH__print_all(this$,data){
return cljs.core.println.call(null,"PROC: ",data);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.proc","print-all","lt.objs.proc/print-all",-1424831167),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"proc.out","proc.out",-1091295217),null,new cljs.core.Keyword(null,"proc.exit","proc.exit",1585374833),null,new cljs.core.Keyword(null,"proc.error","proc.error",-61427727),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.proc.__BEH__print_all);
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.proc","test-printer","lt.objs.proc/test-printer",1645274936),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"behaviors","behaviors",120724909),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("lt.objs.proc","print-all","lt.objs.proc/print-all",-1424831167)], null),new cljs.core.Keyword(null,"init","init",-1875481434),(function (){
return null;
}));
lt.objs.proc.printer = lt.object.create.call(null,new cljs.core.Keyword("lt.objs.proc","test-printer","lt.objs.proc/test-printer",1645274936));
lt.objs.proc.find_path_files = (function lt$objs$proc$find_path_files(){
return cljs.core.filter.call(null,lt.objs.files.exists_QMARK_,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.objs.files.home.call(null,".profile"),lt.objs.files.home.call(null,".bash_profile")], null));
});
lt.objs.proc.get_path_command = (function lt$objs$proc$get_path_command(){
return [cljs.core.str(cljs.core.reduce.call(null,(function (fin,cur){
return [cljs.core.str(fin),cljs.core.str("source "),cljs.core.str(cur),cljs.core.str(" && ")].join('');
}),"",lt.objs.proc.find_path_files.call(null))),cljs.core.str("echo $PATH")].join('');
});
lt.objs.proc.etc_paths__GT_PATH = (function lt$objs$proc$etc_paths__GT_PATH(){
if(cljs.core.not.call(null,lt.objs.files.exists_QMARK_.call(null,"/etc/paths"))){
return "";
} else {
var ps = clojure.string.split.call(null,new cljs.core.Keyword(null,"content","content",15833224).cljs$core$IFn$_invoke$arity$1(lt.objs.files.open_sync.call(null,"/etc/paths")),"\n");
var path_str = cljs.core.reduce.call(null,cljs.core.str,cljs.core.interpose.call(null,":",cljs.core.filter.call(null,cljs.core.complement.call(null,cljs.core.empty_QMARK_),ps)));
return [cljs.core.str("PATH="),cljs.core.str(path_str),cljs.core.str(":$PATH && ")].join('');
}
});
/**
 * 
 */
lt.objs.proc.__BEH__set_path_OSX = (function lt$objs$proc$__BEH__set_path_OSX(app){
if(cljs.core.truth_((function (){var and__6781__auto__ = lt.objs.platform.mac_QMARK_.call(null);
if(cljs.core.truth_(and__6781__auto__)){
return cljs.core.not.call(null,(process.env["LTCLI"]));
} else {
return and__6781__auto__;
}
})())){
return require("child_process").exec([cljs.core.str(lt.objs.proc.etc_paths__GT_PATH.call(null)),cljs.core.str(lt.objs.proc.get_path_command.call(null))].join(''),(function (err,out,serr){
if(!(cljs.core.empty_QMARK_.call(null,err))){
lt.objs.notifos.set_msg_BANG_.call(null,"Failed to source PATH files. See console log for details.",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"error"], null));

return console.error(err);
} else {
if(cljs.core.empty_QMARK_.call(null,out)){
return null;
} else {
return process.env.PATH = out;
}
}
}));
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.proc","set-path-OSX","lt.objs.proc/set-path-OSX",-98766014),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"init","init",-1875481434),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.proc.__BEH__set_path_OSX);
/**
 * 
 */
lt.objs.proc.__BEH__global_path = (function lt$objs$proc$__BEH__global_path(app,path){
return process.env.PATH = path;
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.proc","global-path","lt.objs.proc/global-path",-548979717),new cljs.core.Keyword(null,"exclusive","exclusive",-1507998718),true,new cljs.core.Keyword(null,"desc","desc",2093485764),"App: set global PATH for processes",new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1718410804),"path"], null)], null),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"object.instant","object.instant",-29936727),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.proc.__BEH__global_path);
/**
 * 
 */
lt.objs.proc.__BEH__global_env = (function lt$objs$proc$__BEH__global_env(app,kvs){
return cljs.core.reset_BANG_.call(null,lt.objs.proc.custom_env,kvs);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.proc","global-env","lt.objs.proc/global-env",-1514841312),new cljs.core.Keyword(null,"exclusive","exclusive",-1507998718),true,new cljs.core.Keyword(null,"desc","desc",2093485764),"App: add to the global ENV for processes",new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1718410804),"env map"], null)], null),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"object.instant","object.instant",-29936727),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.proc.__BEH__global_env);
lt.objs.proc.var_caps = (function lt$objs$proc$var_caps(vs){
if(cljs.core.truth_(lt.objs.platform.win_QMARK_.call(null))){
return [cljs.core.str("echo "),cljs.core.str(cljs.core.apply.call(null,cljs.core.str,cljs.core.map.call(null,(function (p1__17019_SHARP_){
return [cljs.core.str("%"),cljs.core.str(p1__17019_SHARP_),cljs.core.str("%;")].join('');
}),vs)))].join('');
} else {
return [cljs.core.str("echo \""),cljs.core.str(cljs.core.apply.call(null,cljs.core.str,cljs.core.map.call(null,(function (p1__17020_SHARP_){
return [cljs.core.str("$"),cljs.core.str(p1__17020_SHARP_),cljs.core.str(";")].join('');
}),vs))),cljs.core.str("\"")].join('');
}
});
lt.objs.proc.capture = (function lt$objs$proc$capture(cmd,vars,cb){
return require("child_process").exec([cljs.core.str(cmd),cljs.core.str(" && "),cljs.core.str(lt.objs.proc.var_caps.call(null,vars))].join(''),(function (err,out,serr){
var vs = cljs.core.zipmap.call(null,vars,clojure.string.split.call(null,out,";"));
return cb.call(null,vs);
}));
});
