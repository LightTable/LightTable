// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.objs.workspace');
goog.require('cljs.core');
goog.require('lt.objs.command');
goog.require('lt.objs.notifos');
goog.require('lt.objs.console');
goog.require('lt.object');
goog.require('lt.util.cljs');
goog.require('lt.objs.app');
goog.require('lt.util.load');
goog.require('lt.objs.files');
goog.require('lt.util.js');
goog.require('lt.objs.cache');
goog.require('cljs.reader');
lt.objs.workspace.fs = require("fs");
lt.objs.workspace.max_depth = (10);
lt.objs.workspace.watch_interval = (1000);
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.workspace","workspace","lt.objs.workspace/workspace",-331461506),new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"workspace","workspace",-1096735709),null], null), null),new cljs.core.Keyword(null,"files","files",-472457450),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"folders","folders",44248772),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"watches","watches",-273097535),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"ws-behaviors","ws-behaviors",-1322175278),"",new cljs.core.Keyword(null,"init","init",-1875481434),(function (this$){
return null;
}));
lt.objs.workspace.current_ws = lt.object.create.call(null,new cljs.core.Keyword("lt.objs.workspace","workspace","lt.objs.workspace/workspace",-331461506));
lt.objs.workspace.unwatch = (function lt$objs$workspace$unwatch(watches,path,recursive_QMARK_){
if(cljs.core.truth_(watches)){
var removes = ((cljs.core.coll_QMARK_.call(null,path))?path:((cljs.core.not.call(null,recursive_QMARK_))?new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [path], null):cljs.core.filter.call(null,(function (p1__16370_SHARP_){
return (p1__16370_SHARP_.indexOf(path) > (-1));
}),cljs.core.keys.call(null,watches))
));
var seq__16377_16383 = cljs.core.seq.call(null,cljs.core.map.call(null,watches,removes));
var chunk__16379_16384 = null;
var count__16380_16385 = (0);
var i__16381_16386 = (0);
while(true){
if((i__16381_16386 < count__16380_16385)){
var r_16387 = cljs.core._nth.call(null,chunk__16379_16384,i__16381_16386);
if(cljs.core.truth_((function (){var and__6781__auto__ = r_16387;
if(cljs.core.truth_(and__6781__auto__)){
return new cljs.core.Keyword(null,"close","close",1835149582).cljs$core$IFn$_invoke$arity$1(r_16387);
} else {
return and__6781__auto__;
}
})())){
new cljs.core.Keyword(null,"close","close",1835149582).cljs$core$IFn$_invoke$arity$1(r_16387).call(null);

var G__16388 = seq__16377_16383;
var G__16389 = chunk__16379_16384;
var G__16390 = count__16380_16385;
var G__16391 = (i__16381_16386 + (1));
seq__16377_16383 = G__16388;
chunk__16379_16384 = G__16389;
count__16380_16385 = G__16390;
i__16381_16386 = G__16391;
continue;
} else {
var G__16392 = seq__16377_16383;
var G__16393 = chunk__16379_16384;
var G__16394 = count__16380_16385;
var G__16395 = (i__16381_16386 + (1));
seq__16377_16383 = G__16392;
chunk__16379_16384 = G__16393;
count__16380_16385 = G__16394;
i__16381_16386 = G__16395;
continue;
}
} else {
var temp__4657__auto___16396 = cljs.core.seq.call(null,seq__16377_16383);
if(temp__4657__auto___16396){
var seq__16377_16397__$1 = temp__4657__auto___16396;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__16377_16397__$1)){
var c__7604__auto___16398 = cljs.core.chunk_first.call(null,seq__16377_16397__$1);
var G__16399 = cljs.core.chunk_rest.call(null,seq__16377_16397__$1);
var G__16400 = c__7604__auto___16398;
var G__16401 = cljs.core.count.call(null,c__7604__auto___16398);
var G__16402 = (0);
seq__16377_16383 = G__16399;
chunk__16379_16384 = G__16400;
count__16380_16385 = G__16401;
i__16381_16386 = G__16402;
continue;
} else {
var r_16403 = cljs.core.first.call(null,seq__16377_16397__$1);
if(cljs.core.truth_((function (){var and__6781__auto__ = r_16403;
if(cljs.core.truth_(and__6781__auto__)){
return new cljs.core.Keyword(null,"close","close",1835149582).cljs$core$IFn$_invoke$arity$1(r_16403);
} else {
return and__6781__auto__;
}
})())){
new cljs.core.Keyword(null,"close","close",1835149582).cljs$core$IFn$_invoke$arity$1(r_16403).call(null);

var G__16404 = cljs.core.next.call(null,seq__16377_16397__$1);
var G__16405 = null;
var G__16406 = (0);
var G__16407 = (0);
seq__16377_16383 = G__16404;
chunk__16379_16384 = G__16405;
count__16380_16385 = G__16406;
i__16381_16386 = G__16407;
continue;
} else {
var G__16408 = cljs.core.next.call(null,seq__16377_16397__$1);
var G__16409 = null;
var G__16410 = (0);
var G__16411 = (0);
seq__16377_16383 = G__16408;
chunk__16379_16384 = G__16409;
count__16380_16385 = G__16410;
i__16381_16386 = G__16411;
continue;
}
}
} else {
}
}
break;
}

return cljs.core.apply.call(null,cljs.core.dissoc,watches,removes);
} else {
return null;
}
});
lt.objs.workspace.unwatch_BANG_ = (function lt$objs$workspace$unwatch_BANG_(var_args){
var args16412 = [];
var len__7868__auto___16415 = arguments.length;
var i__7869__auto___16416 = (0);
while(true){
if((i__7869__auto___16416 < len__7868__auto___16415)){
args16412.push((arguments[i__7869__auto___16416]));

var G__16417 = (i__7869__auto___16416 + (1));
i__7869__auto___16416 = G__16417;
continue;
} else {
}
break;
}

var G__16414 = args16412.length;
switch (G__16414) {
case 1:
return lt.objs.workspace.unwatch_BANG_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return lt.objs.workspace.unwatch_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args16412.length)].join('')));

}
});

lt.objs.workspace.unwatch_BANG_.cljs$core$IFn$_invoke$arity$1 = (function (path){
return lt.objs.workspace.unwatch_BANG_.call(null,path,false);
});

lt.objs.workspace.unwatch_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (path,recursive_QMARK_){
return lt.object.merge_BANG_.call(null,lt.objs.workspace.current_ws,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"watches","watches",-273097535),lt.objs.workspace.unwatch.call(null,new cljs.core.Keyword(null,"watches","watches",-273097535).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.workspace.current_ws)),path,recursive_QMARK_)], null));
});

lt.objs.workspace.unwatch_BANG_.cljs$lang$maxFixedArity = 2;

lt.objs.workspace.alert_file = (function lt$objs$workspace$alert_file(path){
return (function (cur,prev){
if(cljs.core.truth_(lt.objs.workspace.fs.existsSync(path))){
return lt.object.raise.call(null,lt.objs.workspace.current_ws,new cljs.core.Keyword(null,"watched.update","watched.update",-1798614640),path,cur);
} else {
lt.objs.workspace.unwatch_BANG_.call(null,path);

return lt.object.raise.call(null,lt.objs.workspace.current_ws,new cljs.core.Keyword(null,"watched.delete","watched.delete",-2013789460),path);
}
});
});
lt.objs.workspace.file__GT_watch = (function lt$objs$workspace$file__GT_watch(path){
var alert = lt.objs.workspace.alert_file.call(null,path);
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"path","path",-188191168),path,new cljs.core.Keyword(null,"alert","alert",-571950580),alert,new cljs.core.Keyword(null,"close","close",1835149582),((function (alert){
return (function (){
return lt.objs.workspace.fs.unwatchFile(path,alert);
});})(alert))
], null);
});
lt.objs.workspace.watch_BANG_ = (function lt$objs$workspace$watch_BANG_(var_args){
var args16419 = [];
var len__7868__auto___16434 = arguments.length;
var i__7869__auto___16435 = (0);
while(true){
if((i__7869__auto___16435 < len__7868__auto___16434)){
args16419.push((arguments[i__7869__auto___16435]));

var G__16436 = (i__7869__auto___16435 + (1));
i__7869__auto___16435 = G__16436;
continue;
} else {
}
break;
}

var G__16421 = args16419.length;
switch (G__16421) {
case 1:
return lt.objs.workspace.watch_BANG_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return lt.objs.workspace.watch_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return lt.objs.workspace.watch_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args16419.length)].join('')));

}
});

lt.objs.workspace.watch_BANG_.cljs$core$IFn$_invoke$arity$1 = (function (path){
return lt.objs.workspace.watch_BANG_.call(null,cljs.core.transient$.call(null,cljs.core.PersistentArrayMap.EMPTY),path,null);
});

lt.objs.workspace.watch_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (path,recursive_QMARK_){
return lt.objs.workspace.watch_BANG_.call(null,cljs.core.transient$.call(null,cljs.core.PersistentArrayMap.EMPTY),path,recursive_QMARK_);
});

lt.objs.workspace.watch_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (results,path,recursive_QMARK_){
var seq__16422_16438 = cljs.core.seq.call(null,((cljs.core.coll_QMARK_.call(null,path))?path:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [path], null)));
var chunk__16423_16439 = null;
var count__16424_16440 = (0);
var i__16425_16441 = (0);
while(true){
if((i__16425_16441 < count__16424_16440)){
var path_16442__$1 = cljs.core._nth.call(null,chunk__16423_16439,i__16425_16441);
if(cljs.core.truth_(cljs.core.re_seq.call(null,lt.objs.files.ignore_pattern,path_16442__$1))){
} else {
if(cljs.core.truth_(lt.objs.files.dir_QMARK_.call(null,path_16442__$1))){
var recursive_QMARK__16443__$1 = ((cljs.core.not.call(null,recursive_QMARK_))?(0):((typeof recursive_QMARK_ === 'number')?(recursive_QMARK_ - (1)):lt.objs.workspace.max_depth
));
var watch_16444 = lt.objs.workspace.folder__GT_watch.call(null,path_16442__$1);
if(cljs.core.truth_(cljs.core.get.call(null,new cljs.core.Keyword(null,"watches","watches",-273097535).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.workspace.current_ws)),path_16442__$1))){
} else {
cljs.core.assoc_BANG_.call(null,results,path_16442__$1,watch_16444);

lt.objs.workspace.fs.watchFile(path_16442__$1,(function (){var obj16427 = {"interval":lt.objs.workspace.watch_interval,"persistent":false};
return obj16427;
})(),new cljs.core.Keyword(null,"alert","alert",-571950580).cljs$core$IFn$_invoke$arity$1(watch_16444));
}

if((recursive_QMARK__16443__$1 > (-1))){
lt.objs.workspace.watch_BANG_.call(null,results,lt.objs.files.full_path_ls.call(null,path_16442__$1),recursive_QMARK__16443__$1);
} else {
}
} else {
if((cljs.core.not.call(null,cljs.core.get.call(null,new cljs.core.Keyword(null,"watches","watches",-273097535).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.workspace.current_ws)),path_16442__$1))) && (cljs.core.not.call(null,cljs.core.get.call(null,results,path_16442__$1)))){
var watch_16445 = lt.objs.workspace.file__GT_watch.call(null,path_16442__$1);
cljs.core.assoc_BANG_.call(null,results,path_16442__$1,watch_16445);

lt.objs.workspace.fs.watchFile(path_16442__$1,(function (){var obj16429 = {"interval":lt.objs.workspace.watch_interval,"persistent":false};
return obj16429;
})(),new cljs.core.Keyword(null,"alert","alert",-571950580).cljs$core$IFn$_invoke$arity$1(watch_16445));
} else {
}
}
}

var G__16446 = seq__16422_16438;
var G__16447 = chunk__16423_16439;
var G__16448 = count__16424_16440;
var G__16449 = (i__16425_16441 + (1));
seq__16422_16438 = G__16446;
chunk__16423_16439 = G__16447;
count__16424_16440 = G__16448;
i__16425_16441 = G__16449;
continue;
} else {
var temp__4657__auto___16450 = cljs.core.seq.call(null,seq__16422_16438);
if(temp__4657__auto___16450){
var seq__16422_16451__$1 = temp__4657__auto___16450;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__16422_16451__$1)){
var c__7604__auto___16452 = cljs.core.chunk_first.call(null,seq__16422_16451__$1);
var G__16453 = cljs.core.chunk_rest.call(null,seq__16422_16451__$1);
var G__16454 = c__7604__auto___16452;
var G__16455 = cljs.core.count.call(null,c__7604__auto___16452);
var G__16456 = (0);
seq__16422_16438 = G__16453;
chunk__16423_16439 = G__16454;
count__16424_16440 = G__16455;
i__16425_16441 = G__16456;
continue;
} else {
var path_16457__$1 = cljs.core.first.call(null,seq__16422_16451__$1);
if(cljs.core.truth_(cljs.core.re_seq.call(null,lt.objs.files.ignore_pattern,path_16457__$1))){
} else {
if(cljs.core.truth_(lt.objs.files.dir_QMARK_.call(null,path_16457__$1))){
var recursive_QMARK__16458__$1 = ((cljs.core.not.call(null,recursive_QMARK_))?(0):((typeof recursive_QMARK_ === 'number')?(recursive_QMARK_ - (1)):lt.objs.workspace.max_depth
));
var watch_16459 = lt.objs.workspace.folder__GT_watch.call(null,path_16457__$1);
if(cljs.core.truth_(cljs.core.get.call(null,new cljs.core.Keyword(null,"watches","watches",-273097535).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.workspace.current_ws)),path_16457__$1))){
} else {
cljs.core.assoc_BANG_.call(null,results,path_16457__$1,watch_16459);

lt.objs.workspace.fs.watchFile(path_16457__$1,(function (){var obj16431 = {"interval":lt.objs.workspace.watch_interval,"persistent":false};
return obj16431;
})(),new cljs.core.Keyword(null,"alert","alert",-571950580).cljs$core$IFn$_invoke$arity$1(watch_16459));
}

if((recursive_QMARK__16458__$1 > (-1))){
lt.objs.workspace.watch_BANG_.call(null,results,lt.objs.files.full_path_ls.call(null,path_16457__$1),recursive_QMARK__16458__$1);
} else {
}
} else {
if((cljs.core.not.call(null,cljs.core.get.call(null,new cljs.core.Keyword(null,"watches","watches",-273097535).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.workspace.current_ws)),path_16457__$1))) && (cljs.core.not.call(null,cljs.core.get.call(null,results,path_16457__$1)))){
var watch_16460 = lt.objs.workspace.file__GT_watch.call(null,path_16457__$1);
cljs.core.assoc_BANG_.call(null,results,path_16457__$1,watch_16460);

lt.objs.workspace.fs.watchFile(path_16457__$1,(function (){var obj16433 = {"interval":lt.objs.workspace.watch_interval,"persistent":false};
return obj16433;
})(),new cljs.core.Keyword(null,"alert","alert",-571950580).cljs$core$IFn$_invoke$arity$1(watch_16460));
} else {
}
}
}

var G__16461 = cljs.core.next.call(null,seq__16422_16451__$1);
var G__16462 = null;
var G__16463 = (0);
var G__16464 = (0);
seq__16422_16438 = G__16461;
chunk__16423_16439 = G__16462;
count__16424_16440 = G__16463;
i__16425_16441 = G__16464;
continue;
}
} else {
}
}
break;
}

if(typeof recursive_QMARK_ === 'number'){
return null;
} else {
return lt.object.update_BANG_.call(null,lt.objs.workspace.current_ws,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"watches","watches",-273097535)], null),cljs.core.merge,cljs.core.persistent_BANG_.call(null,results));
}
});

lt.objs.workspace.watch_BANG_.cljs$lang$maxFixedArity = 3;

lt.objs.workspace.alert_folder = (function lt$objs$workspace$alert_folder(path){
return (function (cur,prev){
if(cljs.core.truth_(lt.objs.workspace.fs.existsSync(path))){
var watches = new cljs.core.Keyword(null,"watches","watches",-273097535).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.workspace.current_ws));
var neue = cljs.core.first.call(null,cljs.core.filter.call(null,((function (watches){
return (function (p1__16465_SHARP_){
return (cljs.core.not.call(null,cljs.core.get.call(null,watches,p1__16465_SHARP_))) && (cljs.core.not.call(null,cljs.core.re_seq.call(null,lt.objs.files.ignore_pattern,p1__16465_SHARP_)));
});})(watches))
,lt.objs.files.full_path_ls.call(null,path)));
if(cljs.core.truth_(neue)){
lt.objs.workspace.watch_BANG_.call(null,neue);

return lt.object.raise.call(null,lt.objs.workspace.current_ws,new cljs.core.Keyword(null,"watched.create","watched.create",1567266238),neue,lt.objs.workspace.fs.statSync(neue));
} else {
return null;
}
} else {
lt.objs.workspace.unwatch_BANG_.call(null,path,new cljs.core.Keyword(null,"recursive","recursive",718885872));

return lt.object.raise.call(null,lt.objs.workspace.current_ws,new cljs.core.Keyword(null,"watched.delete","watched.delete",-2013789460),path);
}
});
});
lt.objs.workspace.folder__GT_watch = (function lt$objs$workspace$folder__GT_watch(path){
var alert = lt.objs.workspace.alert_folder.call(null,path);
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"path","path",-188191168),path,new cljs.core.Keyword(null,"alert","alert",-571950580),alert,new cljs.core.Keyword(null,"close","close",1835149582),((function (alert){
return (function (){
return lt.objs.workspace.fs.unwatchFile(path,alert);
});})(alert))
], null);
});
lt.objs.workspace.stop_watching = (function lt$objs$workspace$stop_watching(ws){
return lt.objs.workspace.unwatch_BANG_.call(null,cljs.core.keys.call(null,new cljs.core.Keyword(null,"watches","watches",-273097535).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ws))));
});
lt.objs.workspace.watch_workspace = (function lt$objs$workspace$watch_workspace(ws){
lt.objs.workspace.stop_watching.call(null,ws);

return lt.objs.workspace.watch_BANG_.call(null,lt.object.raise_reduce.call(null,ws,new cljs.core.Keyword(null,"watch-paths+","watch-paths+",-81342563),cljs.core.PersistentVector.EMPTY));
});
lt.objs.workspace.workspace_cache_path = lt.objs.files.join.call(null,lt.objs.cache.cache_path,"workspace");
lt.objs.workspace.files_and_folders = (function lt$objs$workspace$files_and_folders(path){
return cljs.core.reduce.call(null,(function (res,cur){
var dir_QMARK_ = lt.objs.files.dir_QMARK_.call(null,cur);
if(cljs.core.truth_(cljs.core.re_seq.call(null,lt.objs.files.ignore_pattern,[cljs.core.str(lt.objs.files.basename.call(null,cur)),cljs.core.str((cljs.core.truth_(dir_QMARK_)?lt.objs.files.separator:null))].join('')))){
return res;
} else {
if(cljs.core.truth_(dir_QMARK_)){
return cljs.core.update_in.call(null,res,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"folders","folders",44248772)], null),cljs.core.conj,cur);
} else {
return cljs.core.update_in.call(null,res,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"files","files",-472457450)], null),cljs.core.conj,cur);
}
}
}),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"folders","folders",44248772),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"files","files",-472457450),cljs.core.PersistentVector.EMPTY], null),lt.objs.files.full_path_ls.call(null,path));
});
lt.objs.workspace.serialize = (function lt$objs$workspace$serialize(ws){
return cljs.core.select_keys.call(null,ws,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"files","files",-472457450),new cljs.core.Keyword(null,"folders","folders",44248772),new cljs.core.Keyword(null,"ws-behaviors","ws-behaviors",-1322175278)], null));
});
lt.objs.workspace.reconstitute = (function lt$objs$workspace$reconstitute(ws,v){
return lt.object.raise.call(null,ws,new cljs.core.Keyword(null,"set!","set!",-1389817006),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"files","files",-472457450),new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(v),new cljs.core.Keyword(null,"folders","folders",44248772),cljs.core.filter.call(null,lt.objs.files.exists_QMARK_,new cljs.core.Keyword(null,"folders","folders",44248772).cljs$core$IFn$_invoke$arity$1(v)),new cljs.core.Keyword(null,"ws-behaviors","ws-behaviors",-1322175278),new cljs.core.Keyword(null,"ws-behaviors","ws-behaviors",-1322175278).cljs$core$IFn$_invoke$arity$1(v)], null));
});
lt.objs.workspace.add_BANG_ = (function lt$objs$workspace$add_BANG_(ws,k,v){
return lt.object.update_BANG_.call(null,ws,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [k], null),cljs.core.conj,v);
});
lt.objs.workspace.remove_BANG_ = (function lt$objs$workspace$remove_BANG_(ws,k,v){
return lt.object.update_BANG_.call(null,ws,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [k], null),(function (p1__16466_SHARP_){
return cljs.core.vec.call(null,cljs.core.remove.call(null,cljs.core.PersistentHashSet.fromArray([v], true),p1__16466_SHARP_));
}));
});
lt.objs.workspace.new_cached_file = (function lt$objs$workspace$new_cached_file(){
return [cljs.core.str(lt.util.js.now.call(null)),cljs.core.str(".clj")].join('');
});
lt.objs.workspace.file__GT_ws = (function lt$objs$workspace$file__GT_ws(file){
return cljs.core.assoc.call(null,cljs.reader.read_string.call(null,new cljs.core.Keyword(null,"content","content",15833224).cljs$core$IFn$_invoke$arity$1(lt.objs.files.open_sync.call(null,file))),new cljs.core.Keyword(null,"path","path",-188191168),file);
});
lt.objs.workspace.save = (function lt$objs$workspace$save(ws,file){
lt.objs.files.save.call(null,lt.objs.files.join.call(null,lt.objs.workspace.workspace_cache_path,file),cljs.core.pr_str.call(null,lt.objs.workspace.serialize.call(null,cljs.core.deref.call(null,ws))));

return lt.object.raise.call(null,ws,new cljs.core.Keyword(null,"save","save",1850079149));
});
lt.objs.workspace.open = (function lt$objs$workspace$open(ws,file){
var loc = ((!((file.indexOf(lt.objs.files.separator) > (-1))))?lt.objs.files.join.call(null,lt.objs.workspace.workspace_cache_path,file):file);
lt.object.merge_BANG_.call(null,ws,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"file","file",-1269645878),lt.objs.workspace.new_cached_file.call(null)], null));

try{lt.objs.workspace.reconstitute.call(null,ws,lt.objs.workspace.file__GT_ws.call(null,loc));

lt.objs.workspace.save.call(null,ws,new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ws)));

return lt.objs.files.delete_BANG_.call(null,loc);
}catch (e16468){var e = e16468;
return lt.objs.console.error.call(null,e);
}});
lt.objs.workspace.cached = (function lt$objs$workspace$cached(){
return cljs.core.filter.call(null,(function (p1__16469_SHARP_){
return (p1__16469_SHARP_.indexOf(".clj") > (-1));
}),lt.objs.files.full_path_ls.call(null,lt.objs.workspace.workspace_cache_path));
});
lt.objs.workspace.all = (function lt$objs$workspace$all(){
var fs = cljs.core.sort.call(null,cljs.core._GT_,lt.objs.workspace.cached.call(null));
var seq__16474_16478 = cljs.core.seq.call(null,cljs.core.drop.call(null,(20),fs));
var chunk__16475_16479 = null;
var count__16476_16480 = (0);
var i__16477_16481 = (0);
while(true){
if((i__16477_16481 < count__16476_16480)){
var file_16482 = cljs.core._nth.call(null,chunk__16475_16479,i__16477_16481);
lt.objs.files.delete_BANG_.call(null,file_16482);

var G__16483 = seq__16474_16478;
var G__16484 = chunk__16475_16479;
var G__16485 = count__16476_16480;
var G__16486 = (i__16477_16481 + (1));
seq__16474_16478 = G__16483;
chunk__16475_16479 = G__16484;
count__16476_16480 = G__16485;
i__16477_16481 = G__16486;
continue;
} else {
var temp__4657__auto___16487 = cljs.core.seq.call(null,seq__16474_16478);
if(temp__4657__auto___16487){
var seq__16474_16488__$1 = temp__4657__auto___16487;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__16474_16488__$1)){
var c__7604__auto___16489 = cljs.core.chunk_first.call(null,seq__16474_16488__$1);
var G__16490 = cljs.core.chunk_rest.call(null,seq__16474_16488__$1);
var G__16491 = c__7604__auto___16489;
var G__16492 = cljs.core.count.call(null,c__7604__auto___16489);
var G__16493 = (0);
seq__16474_16478 = G__16490;
chunk__16475_16479 = G__16491;
count__16476_16480 = G__16492;
i__16477_16481 = G__16493;
continue;
} else {
var file_16494 = cljs.core.first.call(null,seq__16474_16488__$1);
lt.objs.files.delete_BANG_.call(null,file_16494);

var G__16495 = cljs.core.next.call(null,seq__16474_16488__$1);
var G__16496 = null;
var G__16497 = (0);
var G__16498 = (0);
seq__16474_16478 = G__16495;
chunk__16475_16479 = G__16496;
count__16476_16480 = G__16497;
i__16477_16481 = G__16498;
continue;
}
} else {
}
}
break;
}

return cljs.core.map.call(null,lt.objs.workspace.file__GT_ws,cljs.core.take.call(null,(20),fs));
});
lt.objs.workspace.ws_empty_QMARK_ = (function lt$objs$workspace$ws_empty_QMARK_(ws){
return !((cljs.core.seq.call(null,new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ws)))) || (cljs.core.seq.call(null,new cljs.core.Keyword(null,"folders","folders",44248772).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ws)))));
});
/**
 * 
 */
lt.objs.workspace.__BEH__serialize_workspace = (function lt$objs$workspace$__BEH__serialize_workspace(this$){
if(cljs.core.truth_(cljs.core.deref.call(null,this$).call(null,new cljs.core.Keyword(null,"file","file",-1269645878)))){
} else {
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"file","file",-1269645878),lt.objs.workspace.new_cached_file.call(null)], null));
}

if(cljs.core.truth_((function (){var and__6781__auto__ = cljs.core.deref.call(null,this$).call(null,new cljs.core.Keyword(null,"initialized?","initialized?",1707939066));
if(cljs.core.truth_(and__6781__auto__)){
return cljs.core.not.call(null,lt.objs.workspace.ws_empty_QMARK_.call(null,this$));
} else {
return and__6781__auto__;
}
})())){
return lt.objs.workspace.save.call(null,this$,new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.workspace","serialize-workspace","lt.objs.workspace/serialize-workspace",811536076),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"updated","updated",-1627192056),null,new cljs.core.Keyword(null,"serialize!","serialize!",1684731051),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.workspace.__BEH__serialize_workspace);
/**
 * 
 */
lt.objs.workspace.__BEH__reconstitute_last_workspace = (function lt$objs$workspace$__BEH__reconstitute_last_workspace(app){
if(cljs.core.truth_((function (){var and__6781__auto__ = lt.objs.app.first_window_QMARK_.call(null);
if(cljs.core.truth_(and__6781__auto__)){
return cljs.core.not.call(null,new cljs.core.Keyword(null,"initialized","initialized",-962017594).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.workspace.current_ws)));
} else {
return and__6781__auto__;
}
})())){
var temp__4657__auto___16499 = cljs.core.first.call(null,lt.objs.workspace.all.call(null));
if(cljs.core.truth_(temp__4657__auto___16499)){
var ws_16500 = temp__4657__auto___16499;
lt.objs.workspace.open.call(null,lt.objs.workspace.current_ws,lt.objs.files.basename.call(null,new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(ws_16500)));
} else {
}
} else {
}

return lt.object.merge_BANG_.call(null,lt.objs.workspace.current_ws,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"initialized?","initialized?",1707939066),true], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.workspace","reconstitute-last-workspace","lt.objs.workspace/reconstitute-last-workspace",683804806),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"post-init","post-init",1539646468),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.workspace.__BEH__reconstitute_last_workspace);
/**
 * 
 */
lt.objs.workspace.__BEH__new_BANG_ = (function lt$objs$workspace$__BEH__new_BANG_(this$){
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"file","file",-1269645878),lt.objs.workspace.new_cached_file.call(null)], null));

return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"clear!","clear!",-144814418));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.workspace","new!","lt.objs.workspace/new!",1948021322),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"new!","new!",-1640547457),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.workspace.__BEH__new_BANG_);
/**
 * 
 */
lt.objs.workspace.__BEH__add_file_BANG_ = (function lt$objs$workspace$__BEH__add_file_BANG_(this$,f){
if(!(cljs.core.contains_QMARK_.call(null,cljs.core.set.call(null,new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))),f))){
lt.objs.workspace.add_BANG_.call(null,this$,new cljs.core.Keyword(null,"files","files",-472457450),f);

lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"add","add",235287739),f);

return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"updated","updated",-1627192056));
} else {
return lt.objs.notifos.set_msg_BANG_.call(null,"This file is already in your workspace.",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"error"], null));
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.workspace","add-file!","lt.objs.workspace/add-file!",-597150562),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"add.file!","add.file!",-439765985),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.workspace.__BEH__add_file_BANG_);
/**
 * 
 */
lt.objs.workspace.__BEH__add_folder_BANG_ = (function lt$objs$workspace$__BEH__add_folder_BANG_(this$,f){
if(!(cljs.core.contains_QMARK_.call(null,cljs.core.set.call(null,new cljs.core.Keyword(null,"folders","folders",44248772).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))),f))){
lt.objs.workspace.add_BANG_.call(null,this$,new cljs.core.Keyword(null,"folders","folders",44248772),f);

lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"add","add",235287739),f);

return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"updated","updated",-1627192056));
} else {
return lt.objs.notifos.set_msg_BANG_.call(null,"This folder is already in your workspace.",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"error"], null));
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.workspace","add-folder!","lt.objs.workspace/add-folder!",562787277),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"add.folder!","add.folder!",755480535),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.workspace.__BEH__add_folder_BANG_);
/**
 * 
 */
lt.objs.workspace.__BEH__remove_file_BANG_ = (function lt$objs$workspace$__BEH__remove_file_BANG_(this$,f){
lt.objs.workspace.remove_BANG_.call(null,this$,new cljs.core.Keyword(null,"files","files",-472457450),f);

lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"remove","remove",-131428414),f);

return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"updated","updated",-1627192056));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.workspace","remove-file!","lt.objs.workspace/remove-file!",-1557591727),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"remove.file!","remove.file!",2141287199),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.workspace.__BEH__remove_file_BANG_);
/**
 * 
 */
lt.objs.workspace.__BEH__remove_folder_BANG_ = (function lt$objs$workspace$__BEH__remove_folder_BANG_(this$,f){
lt.objs.workspace.remove_BANG_.call(null,this$,new cljs.core.Keyword(null,"folders","folders",44248772),f);

lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"remove","remove",-131428414),f);

return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"updated","updated",-1627192056));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.workspace","remove-folder!","lt.objs.workspace/remove-folder!",1848621419),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"remove.folder!","remove.folder!",-153450498),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.workspace.__BEH__remove_folder_BANG_);
/**
 * 
 */
lt.objs.workspace.__BEH__rename_BANG_ = (function lt$objs$workspace$__BEH__rename_BANG_(this$,f,neue){
var key = (cljs.core.truth_(lt.objs.files.file_QMARK_.call(null,f))?new cljs.core.Keyword(null,"files","files",-472457450):new cljs.core.Keyword(null,"folders","folders",44248772));
lt.objs.workspace.remove_BANG_.call(null,this$,key,f);

lt.objs.workspace.add_BANG_.call(null,this$,key,neue);

lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"rename","rename",1508157613),f,neue);

return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"updated","updated",-1627192056));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.workspace","rename!","lt.objs.workspace/rename!",1388258695),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"rename!","rename!",154389790),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.workspace.__BEH__rename_BANG_);
/**
 * 
 */
lt.objs.workspace.__BEH__clear_BANG_ = (function lt$objs$workspace$__BEH__clear_BANG_(this$){
var old = cljs.core.deref.call(null,this$);
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"files","files",-472457450),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"folders","folders",44248772),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"ws-behaviors","ws-behaviors",-1322175278),""], null));

lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"set","set",304602554),old);

return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"updated","updated",-1627192056));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.workspace","clear!","lt.objs.workspace/clear!",492115735),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"clear!","clear!",-144814418),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.workspace.__BEH__clear_BANG_);
/**
 * 
 */
lt.objs.workspace.__BEH__set_BANG_ = (function lt$objs$workspace$__BEH__set_BANG_(this$,fs){
var old = cljs.core.deref.call(null,this$);
lt.object.merge_BANG_.call(null,this$,fs);

lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"set","set",304602554),old);

return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"updated","updated",-1627192056));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.workspace","set!","lt.objs.workspace/set!",-819966801),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"set!","set!",-1389817006),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.workspace.__BEH__set_BANG_);
/**
 * 
 */
lt.objs.workspace.__BEH__watch_on_set = (function lt$objs$workspace$__BEH__watch_on_set(this$){
return lt.objs.workspace.watch_workspace.call(null,this$);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.workspace","watch-on-set","lt.objs.workspace/watch-on-set",-54426458),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"set","set",304602554),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.workspace.__BEH__watch_on_set);
/**
 * 
 */
lt.objs.workspace.__BEH__stop_watch_on_close = (function lt$objs$workspace$__BEH__stop_watch_on_close(app){
return lt.objs.workspace.stop_watching.call(null,lt.objs.workspace.current_ws);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.workspace","stop-watch-on-close","lt.objs.workspace/stop-watch-on-close",1976722762),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"refresh","refresh",1947415525),null,new cljs.core.Keyword(null,"close","close",1835149582),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.workspace.__BEH__stop_watch_on_close);
/**
 * 
 */
lt.objs.workspace.__BEH__init_workspace_cache_dir = (function lt$objs$workspace$__BEH__init_workspace_cache_dir(app){
if(cljs.core.truth_(lt.objs.files.exists_QMARK_.call(null,lt.objs.workspace.workspace_cache_path))){
return null;
} else {
return lt.objs.files.mkdir.call(null,lt.objs.workspace.workspace_cache_path);
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.workspace","init-workspace-cache-dir","lt.objs.workspace/init-workspace-cache-dir",-307682261),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"init","init",-1875481434),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.workspace.__BEH__init_workspace_cache_dir);
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"workspace.new","workspace.new",-880782450),new cljs.core.Keyword(null,"desc","desc",2093485764),"Workspace: Create new workspace",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.object.raise.call(null,lt.objs.workspace.current_ws,new cljs.core.Keyword(null,"new!","new!",-1640547457));
})], null));
