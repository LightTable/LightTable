// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.plugins.watches');
goog.require('cljs.core');
goog.require('lt.object');
goog.require('lt.objs.command');
goog.require('lt.objs.editor');
goog.require('lt.objs.editor.pool');
lt.plugins.watches.inline = (function lt$plugins$watches$inline(this$,opts,loc){
var ed = new cljs.core.Keyword(null,"ed","ed",436294224).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$));
var type = (function (){var or__6793__auto__ = new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return new cljs.core.Keyword(null,"inline","inline",1399884222);
}
})();
var line = lt.objs.editor.line_handle.call(null,ed,new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(loc));
var res_obj = lt.object.create.call(null,new cljs.core.Keyword("lt.objs.eval","inline-result","lt.objs.eval/inline-result",1129209318),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"ed","ed",436294224),this$,new cljs.core.Keyword(null,"class","class",-2030961996),(function (){var or__6793__auto__ = new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return cljs.core.name.call(null,type);
}
})(),new cljs.core.Keyword(null,"opts","opts",155075701),opts,new cljs.core.Keyword(null,"loc","loc",-584284901),loc,new cljs.core.Keyword(null,"line","line",212345235),line], null));
lt.object.add_tags.call(null,res_obj,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"inline.watch","inline.watch",1080031393)], null));

lt.object.update_BANG_.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"widgets","widgets",-159098978)], null),cljs.core.assoc,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [line,type], null),res_obj);

return res_obj;
});
lt.plugins.watches.watched_range = (function lt$plugins$watches$watched_range(ed,start,end,src__GT_watch){
var doc = CodeMirror.Doc(lt.objs.editor.__GT_val.call(null,ed));
var range = (cljs.core.truth_(start)?lt.objs.editor.mark.call(null,doc,start,cljs.core.update_in.call(null,end,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ch","ch",-554717905)], null),cljs.core.inc),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"inclusiveLeft","inclusiveLeft",-1187110354),true,new cljs.core.Keyword(null,"inclusiveRight","inclusiveRight",2017191646),true], null)):null);
var watches = cljs.core.doall.call(null,cljs.core.filter.call(null,cljs.core.identity,(function (){var iter__7573__auto__ = ((function (doc,range){
return (function lt$plugins$watches$watched_range_$_iter__20310(s__20311){
return (new cljs.core.LazySeq(null,((function (doc,range){
return (function (){
var s__20311__$1 = s__20311;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__20311__$1);
if(temp__4657__auto__){
var s__20311__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__20311__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__20311__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__20313 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__20312 = (0);
while(true){
if((i__20312 < size__7572__auto__)){
var vec__20320 = cljs.core._nth.call(null,c__7571__auto__,i__20312);
var id = cljs.core.nth.call(null,vec__20320,(0),null);
var watch = cljs.core.nth.call(null,vec__20320,(1),null);
var watch__$1 = new cljs.core.Keyword(null,"mark","mark",-373816345).cljs$core$IFn$_invoke$arity$1(watch);
var pos = watch__$1.find();
var mark = (cljs.core.truth_(pos)?lt.objs.editor.mark.call(null,doc,pos.from,pos.to,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"className","className",-1983287057),"watched"], null)):null);
cljs.core.chunk_append.call(null,b__20313,(cljs.core.truth_(mark)?(function (){
mark.custom = watch__$1.custom;

mark.ltwatchid = id;

return mark;
})()
:null));

var G__20332 = (i__20312 + (1));
i__20312 = G__20332;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__20313),lt$plugins$watches$watched_range_$_iter__20310.call(null,cljs.core.chunk_rest.call(null,s__20311__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__20313),null);
}
} else {
var vec__20323 = cljs.core.first.call(null,s__20311__$2);
var id = cljs.core.nth.call(null,vec__20323,(0),null);
var watch = cljs.core.nth.call(null,vec__20323,(1),null);
var watch__$1 = new cljs.core.Keyword(null,"mark","mark",-373816345).cljs$core$IFn$_invoke$arity$1(watch);
var pos = watch__$1.find();
var mark = (cljs.core.truth_(pos)?lt.objs.editor.mark.call(null,doc,pos.from,pos.to,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"className","className",-1983287057),"watched"], null)):null);
return cljs.core.cons.call(null,(cljs.core.truth_(mark)?(function (){
mark.custom = watch__$1.custom;

mark.ltwatchid = id;

return mark;
})()
:null),lt$plugins$watches$watched_range_$_iter__20310.call(null,cljs.core.rest.call(null,s__20311__$2)));
}
} else {
return null;
}
break;
}
});})(doc,range))
,null,null));
});})(doc,range))
;
return iter__7573__auto__.call(null,new cljs.core.Keyword(null,"watches","watches",-273097535).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed)));
})()));
var seq__20326_20333 = cljs.core.seq.call(null,watches);
var chunk__20328_20334 = null;
var count__20329_20335 = (0);
var i__20330_20336 = (0);
while(true){
if((i__20330_20336 < count__20329_20335)){
var watch_20337 = cljs.core._nth.call(null,chunk__20328_20334,i__20330_20336);
var pos_20338 = watch_20337.find();
var text_20339 = lt.objs.editor.range.call(null,doc,pos_20338.from,pos_20338.to);
var meta_20340 = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"obj","obj",981763962),lt.object.__GT_id.call(null,ed),new cljs.core.Keyword(null,"id","id",-1388402092),watch_20337.ltwatchid], null);
var v_20341 = ((cljs.core.not.call(null,watch_20337.custom))?lt.object.raise_reduce.call(null,ed,new cljs.core.Keyword(null,"watch.src+","watch.src+",1763720835),text_20339,meta_20340,text_20339):lt.object.raise_reduce.call(null,ed,new cljs.core.Keyword(null,"watch.custom.src+","watch.custom.src+",1708609044),text_20339,meta_20340,watch_20337.custom,text_20339));
lt.objs.editor.replace.call(null,doc,pos_20338.from,pos_20338.to,v_20341);

var G__20342 = seq__20326_20333;
var G__20343 = chunk__20328_20334;
var G__20344 = count__20329_20335;
var G__20345 = (i__20330_20336 + (1));
seq__20326_20333 = G__20342;
chunk__20328_20334 = G__20343;
count__20329_20335 = G__20344;
i__20330_20336 = G__20345;
continue;
} else {
var temp__4657__auto___20346 = cljs.core.seq.call(null,seq__20326_20333);
if(temp__4657__auto___20346){
var seq__20326_20347__$1 = temp__4657__auto___20346;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__20326_20347__$1)){
var c__7604__auto___20348 = cljs.core.chunk_first.call(null,seq__20326_20347__$1);
var G__20349 = cljs.core.chunk_rest.call(null,seq__20326_20347__$1);
var G__20350 = c__7604__auto___20348;
var G__20351 = cljs.core.count.call(null,c__7604__auto___20348);
var G__20352 = (0);
seq__20326_20333 = G__20349;
chunk__20328_20334 = G__20350;
count__20329_20335 = G__20351;
i__20330_20336 = G__20352;
continue;
} else {
var watch_20353 = cljs.core.first.call(null,seq__20326_20347__$1);
var pos_20354 = watch_20353.find();
var text_20355 = lt.objs.editor.range.call(null,doc,pos_20354.from,pos_20354.to);
var meta_20356 = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"obj","obj",981763962),lt.object.__GT_id.call(null,ed),new cljs.core.Keyword(null,"id","id",-1388402092),watch_20353.ltwatchid], null);
var v_20357 = ((cljs.core.not.call(null,watch_20353.custom))?lt.object.raise_reduce.call(null,ed,new cljs.core.Keyword(null,"watch.src+","watch.src+",1763720835),text_20355,meta_20356,text_20355):lt.object.raise_reduce.call(null,ed,new cljs.core.Keyword(null,"watch.custom.src+","watch.custom.src+",1708609044),text_20355,meta_20356,watch_20353.custom,text_20355));
lt.objs.editor.replace.call(null,doc,pos_20354.from,pos_20354.to,v_20357);

var G__20358 = cljs.core.next.call(null,seq__20326_20347__$1);
var G__20359 = null;
var G__20360 = (0);
var G__20361 = (0);
seq__20326_20333 = G__20358;
chunk__20328_20334 = G__20359;
count__20329_20335 = G__20360;
i__20330_20336 = G__20361;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(range)){
var pos = range.find();
return lt.objs.editor.range.call(null,doc,pos.from,pos.to);
} else {
return lt.objs.editor.__GT_val.call(null,doc);
}
});
/**
 * 
 */
lt.plugins.watches.__BEH__clear_BANG_ = (function lt$plugins$watches$__BEH__clear_BANG_(inline_watch){
var ed = new cljs.core.Keyword(null,"ed","ed",436294224).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,inline_watch));
var id = new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"opts","opts",155075701).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,inline_watch)));
new cljs.core.Keyword(null,"mark","mark",-373816345).cljs$core$IFn$_invoke$arity$1(cljs.core.get.call(null,new cljs.core.Keyword(null,"watches","watches",-273097535).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed)),id)).clear();

lt.object.update_BANG_.call(null,ed,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"watches","watches",-273097535)], null),cljs.core.dissoc,id);

return lt.object.raise.call(null,ed,new cljs.core.Keyword(null,"unwatch","unwatch",617992621));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.watches","clear!","lt.plugins.watches/clear!",797963191),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"clear","clear",1877104959),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.plugins.watches.__BEH__clear_BANG_);
/**
 * 
 */
lt.plugins.watches.__BEH__watch_BANG_ = (function lt$plugins$watches$__BEH__watch_BANG_(this$,opts){
var temp__4657__auto__ = lt.objs.editor.selection_bounds.call(null,this$);
if(cljs.core.truth_(temp__4657__auto__)){
var sel = temp__4657__auto__;
var id = [cljs.core.str(cljs.core.gensym.call(null,"watch"))].join('');
var mark = lt.objs.editor.mark.call(null,this$,new cljs.core.Keyword(null,"from","from",1815293044).cljs$core$IFn$_invoke$arity$1(sel),new cljs.core.Keyword(null,"to","to",192099007).cljs$core$IFn$_invoke$arity$1(sel),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"className","className",-1983287057),(function (){var or__6793__auto__ = new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return "watched";
}
})(),new cljs.core.Keyword(null,"inclusiveLeft","inclusiveLeft",-1187110354),false,new cljs.core.Keyword(null,"inclusiveRight","inclusiveRight",2017191646),false], null));
var res = lt.plugins.watches.inline.call(null,this$,cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"watch","watch",380988277),new cljs.core.Keyword(null,"id","id",-1388402092),id], null),opts),new cljs.core.Keyword(null,"to","to",192099007).cljs$core$IFn$_invoke$arity$1(sel));
mark.on("hide",((function (id,mark,res,sel,temp__4657__auto__){
return (function (){
return lt.object.raise.call(null,res,new cljs.core.Keyword(null,"clear!","clear!",-144814418));
});})(id,mark,res,sel,temp__4657__auto__))
);

mark.custom = (cljs.core.truth_(new cljs.core.Keyword(null,"exp","exp",-261706262).cljs$core$IFn$_invoke$arity$1(opts))?opts:null);

mark.lttype = new cljs.core.Keyword(null,"watch","watch",380988277);

mark.ltwatchid = id;

lt.object.update_BANG_.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"watches","watches",-273097535)], null),cljs.core.assoc,id,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"mark","mark",-373816345),mark,new cljs.core.Keyword(null,"inline-result","inline-result",2067285486),res], null));

return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"watch","watch",380988277));
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.watches","watch!","lt.plugins.watches/watch!",-158153155),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"watch!","watch!",-1344124092),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.plugins.watches.__BEH__watch_BANG_);
/**
 * 
 */
lt.plugins.watches.__BEH__unwatch_BANG_ = (function lt$plugins$watches$__BEH__unwatch_BANG_(this$){
var temp__4657__auto__ = lt.objs.editor.__GT_cursor.call(null,this$);
if(cljs.core.truth_(temp__4657__auto__)){
var cur = temp__4657__auto__;
var seq__20368 = cljs.core.seq.call(null,lt.objs.editor.find_marks.call(null,this$,cur));
var chunk__20370 = null;
var count__20371 = (0);
var i__20372 = (0);
while(true){
if((i__20372 < count__20371)){
var mark = cljs.core._nth.call(null,chunk__20370,i__20372);
if(cljs.core._EQ_.call(null,mark.lttype,new cljs.core.Keyword(null,"watch","watch",380988277))){
lt.object.raise.call(null,new cljs.core.Keyword(null,"inline-result","inline-result",2067285486).cljs$core$IFn$_invoke$arity$1(cljs.core.get.call(null,new cljs.core.Keyword(null,"watches","watches",-273097535).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),mark.ltwatchid)),new cljs.core.Keyword(null,"clear!","clear!",-144814418));

var G__20374 = seq__20368;
var G__20375 = chunk__20370;
var G__20376 = count__20371;
var G__20377 = (i__20372 + (1));
seq__20368 = G__20374;
chunk__20370 = G__20375;
count__20371 = G__20376;
i__20372 = G__20377;
continue;
} else {
var G__20378 = seq__20368;
var G__20379 = chunk__20370;
var G__20380 = count__20371;
var G__20381 = (i__20372 + (1));
seq__20368 = G__20378;
chunk__20370 = G__20379;
count__20371 = G__20380;
i__20372 = G__20381;
continue;
}
} else {
var temp__4657__auto____$1 = cljs.core.seq.call(null,seq__20368);
if(temp__4657__auto____$1){
var seq__20368__$1 = temp__4657__auto____$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__20368__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__20368__$1);
var G__20382 = cljs.core.chunk_rest.call(null,seq__20368__$1);
var G__20383 = c__7604__auto__;
var G__20384 = cljs.core.count.call(null,c__7604__auto__);
var G__20385 = (0);
seq__20368 = G__20382;
chunk__20370 = G__20383;
count__20371 = G__20384;
i__20372 = G__20385;
continue;
} else {
var mark = cljs.core.first.call(null,seq__20368__$1);
if(cljs.core._EQ_.call(null,mark.lttype,new cljs.core.Keyword(null,"watch","watch",380988277))){
lt.object.raise.call(null,new cljs.core.Keyword(null,"inline-result","inline-result",2067285486).cljs$core$IFn$_invoke$arity$1(cljs.core.get.call(null,new cljs.core.Keyword(null,"watches","watches",-273097535).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),mark.ltwatchid)),new cljs.core.Keyword(null,"clear!","clear!",-144814418));

var G__20386 = cljs.core.next.call(null,seq__20368__$1);
var G__20387 = null;
var G__20388 = (0);
var G__20389 = (0);
seq__20368 = G__20386;
chunk__20370 = G__20387;
count__20371 = G__20388;
i__20372 = G__20389;
continue;
} else {
var G__20390 = cljs.core.next.call(null,seq__20368__$1);
var G__20391 = null;
var G__20392 = (0);
var G__20393 = (0);
seq__20368 = G__20390;
chunk__20370 = G__20391;
count__20371 = G__20392;
i__20372 = G__20393;
continue;
}
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
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.watches","unwatch!","lt.plugins.watches/unwatch!",1349485034),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"unwatch!","unwatch!",-1465440015),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.plugins.watches.__BEH__unwatch_BANG_);
/**
 * 
 */
lt.plugins.watches.__BEH__eval_on_watch_or_unwatch = (function lt$plugins$watches$__BEH__eval_on_watch_or_unwatch(this$){
if(cljs.core.truth_(lt.objs.editor.selection_QMARK_.call(null,this$))){
var cursor_20394 = lt.objs.editor.__GT_cursor.call(null,this$);
lt.objs.editor.set_selection.call(null,this$,cursor_20394,cursor_20394);
} else {
}

return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"eval.one","eval.one",-520903538));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.watches","eval-on-watch-or-unwatch","lt.plugins.watches/eval-on-watch-or-unwatch",-1351340450),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"unwatch","unwatch",617992621),null,new cljs.core.Keyword(null,"watch","watch",380988277),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.plugins.watches.__BEH__eval_on_watch_or_unwatch);
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.watch.watch-selection","editor.watch.watch-selection",1173472485),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Watch selection",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
return lt.object.raise.call(null,ed,new cljs.core.Keyword(null,"watch!","watch!",-1344124092));
} else {
return null;
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.watch.custom-watch-selection","editor.watch.custom-watch-selection",227830635),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Custom watch selection",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (exp,opts){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
return lt.object.raise.call(null,ed,new cljs.core.Keyword(null,"watch!","watch!",-1344124092),cljs.core.assoc.call(null,opts,new cljs.core.Keyword(null,"exp","exp",-261706262),exp));
} else {
return null;
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.watch.unwatch","editor.watch.unwatch",492472278),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Remove watch under cursor",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
return lt.object.raise.call(null,ed,new cljs.core.Keyword(null,"unwatch!","unwatch!",-1465440015));
} else {
return null;
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.watch.remove-all","editor.watch.remove-all",1269101748),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Clear all watches",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
var seq__20395 = cljs.core.seq.call(null,cljs.core.vals.call(null,new cljs.core.Keyword(null,"watches","watches",-273097535).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed))));
var chunk__20396 = null;
var count__20397 = (0);
var i__20398 = (0);
while(true){
if((i__20398 < count__20397)){
var w = cljs.core._nth.call(null,chunk__20396,i__20398);
lt.object.raise.call(null,new cljs.core.Keyword(null,"inline-result","inline-result",2067285486).cljs$core$IFn$_invoke$arity$1(w),new cljs.core.Keyword(null,"clear!","clear!",-144814418));

var G__20399 = seq__20395;
var G__20400 = chunk__20396;
var G__20401 = count__20397;
var G__20402 = (i__20398 + (1));
seq__20395 = G__20399;
chunk__20396 = G__20400;
count__20397 = G__20401;
i__20398 = G__20402;
continue;
} else {
var temp__4657__auto____$1 = cljs.core.seq.call(null,seq__20395);
if(temp__4657__auto____$1){
var seq__20395__$1 = temp__4657__auto____$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__20395__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__20395__$1);
var G__20403 = cljs.core.chunk_rest.call(null,seq__20395__$1);
var G__20404 = c__7604__auto__;
var G__20405 = cljs.core.count.call(null,c__7604__auto__);
var G__20406 = (0);
seq__20395 = G__20403;
chunk__20396 = G__20404;
count__20397 = G__20405;
i__20398 = G__20406;
continue;
} else {
var w = cljs.core.first.call(null,seq__20395__$1);
lt.object.raise.call(null,new cljs.core.Keyword(null,"inline-result","inline-result",2067285486).cljs$core$IFn$_invoke$arity$1(w),new cljs.core.Keyword(null,"clear!","clear!",-144814418));

var G__20407 = cljs.core.next.call(null,seq__20395__$1);
var G__20408 = null;
var G__20409 = (0);
var G__20410 = (0);
seq__20395 = G__20407;
chunk__20396 = G__20408;
count__20397 = G__20409;
i__20398 = G__20410;
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
