// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.objs.keyboard');
goog.require('cljs.core');
goog.require('lt.objs.command');
goog.require('lt.objs.platform');
goog.require('lt.objs.context');
goog.require('lt.util.events');
goog.require('lt.object');
goog.require('lt.objs.metrics');
goog.require('lt.objs.app');
goog.require('clojure.string');
goog.require('lt.util.js');
lt.objs.keyboard.capturing_QMARK_ = true;
lt.objs.keyboard.keys = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
lt.objs.keyboard.key_map = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
lt.objs.keyboard.chords = (function (){var obj13997 = {"current":null,"chords":cljs.core.PersistentHashSet.EMPTY};
return obj13997;
})();
lt.objs.keyboard.chord_timeout = (1000);
lt.objs.keyboard.activity = (function lt$objs$keyboard$activity(){
return lt.objs.metrics.used_BANG_.call(null);
});
lt.objs.keyboard.chord_variants = (function lt$objs$keyboard$chord_variants(k){
var splits = cljs.core.butlast.call(null,clojure.string.split.call(null,k," "));
return cljs.core.reduce.call(null,((function (splits){
return (function (res,cur){
return cljs.core.conj.call(null,res,[cljs.core.str(cljs.core.last.call(null,res)),cljs.core.str(" "),cljs.core.str(cur)].join(''));
});})(splits))
,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.first.call(null,splits)], null),cljs.core.rest.call(null,splits));
});
lt.objs.keyboard.extract_chords = (function lt$objs$keyboard$extract_chords(ks){
return cljs.core.reduce.call(null,(function (chords,p__14002){
var vec__14003 = p__14002;
var k = cljs.core.nth.call(null,vec__14003,(0),null);
var _ = cljs.core.nth.call(null,vec__14003,(1),null);
if(!((k.indexOf(" ") > (-1)))){
return chords;
} else {
return cljs.core.apply.call(null,cljs.core.conj,chords,lt.objs.keyboard.chord_variants.call(null,k));
}
}),cljs.core.PersistentHashSet.EMPTY,ks);
});
lt.objs.keyboard.merge_keys = (function lt$objs$keyboard$merge_keys(ctx){
var ctx_set = lt.object.specificity_sort.call(null,ctx,new cljs.core.Keyword(null,"down","down",1565245570));
var ks = cljs.core.deref.call(null,lt.objs.keyboard.keys);
var neue = cljs.core.apply.call(null,cljs.core.merge,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,ks,ctx_set));
lt.objs.keyboard.chords = (function (){var obj14009 = {"current":null,"chords":lt.objs.keyboard.extract_chords.call(null,neue)};
return obj14009;
})();

cljs.core.reset_BANG_.call(null,lt.objs.keyboard.key_map,neue);

return lt.object.raise.call(null,lt.objs.app.app,new cljs.core.Keyword(null,"app.keys.change","app.keys.change",-1550653341));
});
lt.objs.keyboard.refresh = (function lt$objs$keyboard$refresh(){
return lt.objs.keyboard.merge_keys.call(null,lt.objs.context.current.call(null));
});
cljs.core.add_watch.call(null,lt.objs.context.contexts,new cljs.core.Keyword(null,"commands2","commands2",-1647159261),(function (_,___$1,___$2,ctx){
return lt.objs.keyboard.merge_keys.call(null,ctx);
}));
lt.objs.keyboard.refresh.call(null);
lt.objs.keyboard.__GT_keystr = (function lt$objs$keyboard$__GT_keystr(key,ev){
return [cljs.core.str((cljs.core.truth_(ev.ctrlKey)?"ctrl-":null)),cljs.core.str((cljs.core.truth_(ev.metaKey)?(cljs.core.truth_(lt.objs.platform.mac_QMARK_.call(null))?"cmd-":"meta-"):null)),cljs.core.str((cljs.core.truth_(ev.altKey)?"alt-":null)),cljs.core.str((cljs.core.truth_(ev.altGraphKey)?"altgr-":null)),cljs.core.str((cljs.core.truth_(ev.shiftKey)?"shift-":null)),cljs.core.str((function (){var or__6793__auto__ = key;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return "";
}
})().toLowerCase())].join('');
});
lt.objs.keyboard.chord_BAR_mapping = (function lt$objs$keyboard$chord_BAR_mapping(key,char$,ev){
var current = (lt.objs.keyboard.chords["current"]);
var cur_chords = (lt.objs.keyboard.chords["chords"]);
var vec__14013 = (cljs.core.truth_(current)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str(current),cljs.core.str(" "),cljs.core.str(lt.objs.keyboard.__GT_keystr.call(null,key,ev))].join(''),[cljs.core.str(current),cljs.core.str(" "),cljs.core.str(char$)].join('')], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.objs.keyboard.__GT_keystr.call(null,key,ev),char$], null));
var ks = cljs.core.nth.call(null,vec__14013,(0),null);
var ch = cljs.core.nth.call(null,vec__14013,(1),null);
var temp__4655__auto__ = (function (){var or__6793__auto__ = cur_chords.call(null,ch);
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return cur_chords.call(null,ks);
}
})();
if(cljs.core.truth_(temp__4655__auto__)){
var chord = temp__4655__auto__;
(lt.objs.keyboard.chords["current"] = chord);

if(cljs.core.truth_(lt.objs.keyboard.chord_timeout)){
lt.util.js.wait.call(null,lt.objs.keyboard.chord_timeout,((function (chord,temp__4655__auto__,current,cur_chords,vec__14013,ks,ch){
return (function (){
return (lt.objs.keyboard.chords["current"] = null);
});})(chord,temp__4655__auto__,current,cur_chords,vec__14013,ks,ch))
);
} else {
}

return cljs.core.PersistentVector.EMPTY;
} else {
(lt.objs.keyboard.chords["current"] = null);

var or__6793__auto__ = cljs.core.deref.call(null,lt.objs.keyboard.key_map).call(null,ch);
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
var or__6793__auto____$1 = cljs.core.deref.call(null,lt.objs.keyboard.key_map).call(null,ks);
if(cljs.core.truth_(or__6793__auto____$1)){
return or__6793__auto____$1;
} else {
if(cljs.core.truth_(current)){
return cljs.core.PersistentVector.EMPTY;
} else {
return null;
}
}
}
}
});
lt.objs.keyboard._STAR_capture_STAR_ = true;
lt.objs.keyboard._STAR_stop_STAR_ = false;
lt.objs.keyboard.passthrough = (function lt$objs$keyboard$passthrough(){
return lt.objs.keyboard._STAR_capture_STAR_ = false;
});
/**
 * Called to prevent commands after the current one from firing
 */
lt.objs.keyboard.stop_commands_BANG_ = (function lt$objs$keyboard$stop_commands_BANG_(){
return lt.objs.keyboard._STAR_stop_STAR_ = true;
});
lt.objs.keyboard.disable = (function lt$objs$keyboard$disable(){
return lt.objs.keyboard.capturing_QMARK_ = false;
});
lt.objs.keyboard.enable = (function lt$objs$keyboard$enable(){
return lt.objs.keyboard.capturing_QMARK_ = true;
});
lt.objs.keyboard.all_mappings = (function lt$objs$keyboard$all_mappings(key){
return cljs.core.reduce.call(null,(function (res,p__14020){
var vec__14021 = p__14020;
var ctx = cljs.core.nth.call(null,vec__14021,(0),null);
var keys = cljs.core.nth.call(null,vec__14021,(1),null);
if(cljs.core.not.call(null,keys.call(null,key))){
return res;
} else {
return cljs.core.conj.call(null,res,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ctx,keys.call(null,key)], null));
}
}),cljs.core.PersistentVector.EMPTY,cljs.core.deref.call(null,lt.objs.keyboard.keys));
});
lt.objs.keyboard.trigger = (function lt$objs$keyboard$trigger(cmd){
lt.objs.keyboard.activity.call(null);

if(cljs.core.coll_QMARK_.call(null,cmd)){
cljs.core.apply.call(null,lt.objs.command.exec_BANG_,cmd);
} else {
lt.objs.command.exec_BANG_.call(null,cmd);
}

return lt.objs.keyboard._STAR_capture_STAR_;
});
lt.objs.keyboard.capture = (function lt$objs$keyboard$capture(key,char$,ev){
lt.objs.keyboard.activity.call(null);

var _STAR_capture_STAR_14030 = lt.objs.keyboard._STAR_capture_STAR_;
var _STAR_stop_STAR_14031 = lt.objs.keyboard._STAR_stop_STAR_;
lt.objs.keyboard._STAR_capture_STAR_ = true;

lt.objs.keyboard._STAR_stop_STAR_ = false;

try{var temp__4657__auto__ = lt.objs.keyboard.chord_BAR_mapping.call(null,key,char$,ev);
if(cljs.core.truth_(temp__4657__auto__)){
var cs = temp__4657__auto__;
var seq__14032_14036 = cljs.core.seq.call(null,cs);
var chunk__14033_14037 = null;
var count__14034_14038 = (0);
var i__14035_14039 = (0);
while(true){
if((i__14035_14039 < count__14034_14038)){
var c_14040 = cljs.core._nth.call(null,chunk__14033_14037,i__14035_14039);
if(cljs.core.truth_(lt.objs.keyboard._STAR_stop_STAR_)){
} else {
lt.objs.keyboard._STAR_capture_STAR_ = true;

lt.objs.keyboard.trigger.call(null,c_14040);
}

var G__14041 = seq__14032_14036;
var G__14042 = chunk__14033_14037;
var G__14043 = count__14034_14038;
var G__14044 = (i__14035_14039 + (1));
seq__14032_14036 = G__14041;
chunk__14033_14037 = G__14042;
count__14034_14038 = G__14043;
i__14035_14039 = G__14044;
continue;
} else {
var temp__4657__auto___14045__$1 = cljs.core.seq.call(null,seq__14032_14036);
if(temp__4657__auto___14045__$1){
var seq__14032_14046__$1 = temp__4657__auto___14045__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14032_14046__$1)){
var c__7604__auto___14047 = cljs.core.chunk_first.call(null,seq__14032_14046__$1);
var G__14048 = cljs.core.chunk_rest.call(null,seq__14032_14046__$1);
var G__14049 = c__7604__auto___14047;
var G__14050 = cljs.core.count.call(null,c__7604__auto___14047);
var G__14051 = (0);
seq__14032_14036 = G__14048;
chunk__14033_14037 = G__14049;
count__14034_14038 = G__14050;
i__14035_14039 = G__14051;
continue;
} else {
var c_14052 = cljs.core.first.call(null,seq__14032_14046__$1);
if(cljs.core.truth_(lt.objs.keyboard._STAR_stop_STAR_)){
} else {
lt.objs.keyboard._STAR_capture_STAR_ = true;

lt.objs.keyboard.trigger.call(null,c_14052);
}

var G__14053 = cljs.core.next.call(null,seq__14032_14046__$1);
var G__14054 = null;
var G__14055 = (0);
var G__14056 = (0);
seq__14032_14036 = G__14053;
chunk__14033_14037 = G__14054;
count__14034_14038 = G__14055;
i__14035_14039 = G__14056;
continue;
}
} else {
}
}
break;
}

return lt.objs.keyboard._STAR_capture_STAR_;
} else {
return null;
}
}finally {lt.objs.keyboard._STAR_stop_STAR_ = _STAR_stop_STAR_14031;

lt.objs.keyboard._STAR_capture_STAR_ = _STAR_capture_STAR_14030;
}});
lt.objs.keyboard.capture_up = (function lt$objs$keyboard$capture_up(key,char$,ev){
var or__6793__auto__ = cljs.core.deref.call(null,lt.objs.keyboard.key_map).call(null,char$);
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return cljs.core.deref.call(null,lt.objs.keyboard.key_map).call(null,lt.objs.keyboard.__GT_keystr.call(null,key,ev));
}
});
lt.objs.keyboard.meta = (cljs.core.truth_(lt.objs.platform.mac_QMARK_.call(null))?"cmd":"ctrl");
lt.objs.keyboard.cmd__GT_bindings = (function lt$objs$keyboard$cmd__GT_bindings(cmd){
return cljs.core.filter.call(null,(function (p1__14057_SHARP_){
return cljs.core.seq.call(null,cljs.core.second.call(null,p1__14057_SHARP_));
}),(function (){var iter__7573__auto__ = (function lt$objs$keyboard$cmd__GT_bindings_$_iter__14075(s__14076){
return (new cljs.core.LazySeq(null,(function (){
var s__14076__$1 = s__14076;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__14076__$1);
if(temp__4657__auto__){
var s__14076__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__14076__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__14076__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__14078 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__14077 = (0);
while(true){
if((i__14077 < size__7572__auto__)){
var vec__14085 = cljs.core._nth.call(null,c__7571__auto__,i__14077);
var ctx = cljs.core.nth.call(null,vec__14085,(0),null);
var ms = cljs.core.nth.call(null,vec__14085,(1),null);
cljs.core.chunk_append.call(null,b__14078,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ctx,cljs.core.first.call(null,cljs.core.first.call(null,cljs.core.filter.call(null,((function (i__14077,vec__14085,ctx,ms,c__7571__auto__,size__7572__auto__,b__14078,s__14076__$2,temp__4657__auto__){
return (function (p1__14058_SHARP_){
return cljs.core._EQ_.call(null,cljs.core.first.call(null,cljs.core.second.call(null,p1__14058_SHARP_)),cmd);
});})(i__14077,vec__14085,ctx,ms,c__7571__auto__,size__7572__auto__,b__14078,s__14076__$2,temp__4657__auto__))
,ms)))], null));

var G__14091 = (i__14077 + (1));
i__14077 = G__14091;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__14078),lt$objs$keyboard$cmd__GT_bindings_$_iter__14075.call(null,cljs.core.chunk_rest.call(null,s__14076__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__14078),null);
}
} else {
var vec__14088 = cljs.core.first.call(null,s__14076__$2);
var ctx = cljs.core.nth.call(null,vec__14088,(0),null);
var ms = cljs.core.nth.call(null,vec__14088,(1),null);
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ctx,cljs.core.first.call(null,cljs.core.first.call(null,cljs.core.filter.call(null,((function (vec__14088,ctx,ms,s__14076__$2,temp__4657__auto__){
return (function (p1__14058_SHARP_){
return cljs.core._EQ_.call(null,cljs.core.first.call(null,cljs.core.second.call(null,p1__14058_SHARP_)),cmd);
});})(vec__14088,ctx,ms,s__14076__$2,temp__4657__auto__))
,ms)))], null),lt$objs$keyboard$cmd__GT_bindings_$_iter__14075.call(null,cljs.core.rest.call(null,s__14076__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__7573__auto__.call(null,cljs.core.deref.call(null,lt.objs.keyboard.keys));
})());
});
lt.objs.keyboard.cmd__GT_current_binding = (function lt$objs$keyboard$cmd__GT_current_binding(cmd){
return cljs.core.first.call(null,cljs.core.filter.call(null,(function (p1__14092_SHARP_){
return cljs.core.set.call(null,cljs.core.second.call(null,p1__14092_SHARP_)).call(null,cmd);
}),cljs.core.deref.call(null,lt.objs.keyboard.key_map)));
});
Mousetrap.prototype.handleKey = (function (key,char$,ev){
if(cljs.core.truth_((function (){var and__6781__auto__ = lt.objs.keyboard.capturing_QMARK_;
if(cljs.core.truth_(and__6781__auto__)){
var and__6781__auto____$1 = typeof key === 'string';
if(and__6781__auto____$1){
return lt.objs.keyboard.capture.call(null,key,char$,ev);
} else {
return and__6781__auto____$1;
}
} else {
return and__6781__auto__;
}
})())){
ev.preventDefault();

return ev.stopPropagation();
} else {
return null;
}
});
Mousetrap.prototype.handleKeyUp = (function (key,char$,ev){
if(cljs.core.truth_((function (){var and__6781__auto__ = lt.objs.keyboard.capturing_QMARK_;
if(cljs.core.truth_(and__6781__auto__)){
var and__6781__auto____$1 = typeof key === 'string';
if(and__6781__auto____$1){
return lt.objs.keyboard.capture_up.call(null,key,char$,ev);
} else {
return and__6781__auto____$1;
}
} else {
return and__6781__auto__;
}
})())){
ev.preventDefault();

return ev.stopPropagation();
} else {
return null;
}
});
/**
 * 
 */
lt.objs.keyboard.__BEH__chord_timeout = (function lt$objs$keyboard$__BEH__chord_timeout(this$,timeout){
return lt.objs.keyboard.chord_timeout = timeout;
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.keyboard","chord-timeout","lt.objs.keyboard/chord-timeout",657273159),new cljs.core.Keyword(null,"desc","desc",2093485764),"App: Set the timeout for chorded shortcuts",new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"object.instant","object.instant",-29936727),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.keyboard.__BEH__chord_timeout);
