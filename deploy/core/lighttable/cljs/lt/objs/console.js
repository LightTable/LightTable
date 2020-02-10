// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.objs.console');
goog.require('cljs.core');
goog.require('lt.objs.command');
goog.require('lt.objs.platform');
goog.require('lt.object');
goog.require('lt.util.dom');
goog.require('lt.objs.app');
goog.require('lt.objs.tabs');
goog.require('lt.objs.files');
goog.require('lt.objs.statusbar');
goog.require('clojure.string');
goog.require('lt.objs.bottombar');
lt.objs.console.console_limit = (50);
lt.objs.console.util_inspect = require("util").inspect;
lt.objs.console.logs_dir = lt.objs.files.lt_user_dir.call(null,"logs");
lt.objs.console.core_log = (function (){try{if(cljs.core.truth_(lt.objs.files.exists_QMARK_.call(null,lt.objs.console.logs_dir))){
} else {
if(cljs.core.truth_(lt.objs.files.exists_QMARK_.call(null,lt.objs.files.lt_user_dir.call(null)))){
} else {
lt.objs.files.mkdir.call(null,lt.objs.files.lt_user_dir.call(null));
}

lt.objs.files.mkdir.call(null,lt.objs.console.logs_dir);
}

return require("fs").createWriteStream(lt.objs.files.join.call(null,lt.objs.console.logs_dir,[cljs.core.str("window"),cljs.core.str(lt.objs.app.window_number.call(null)),cljs.core.str(".log")].join('')));
}catch (e16244){var e = e16244;
return console.error([cljs.core.str("Failed to initialize the log writer: "),cljs.core.str(e)].join(''));
}})();
lt.objs.console.__GT_ui = (function lt$objs$console$__GT_ui(c){
return lt.object.__GT_content.call(null,c);
});
lt.objs.console.dom_like_QMARK_ = (function lt$objs$console$dom_like_QMARK_(thing){
var or__6793__auto__ = cljs.core.vector_QMARK_.call(null,thing);
if(or__6793__auto__){
return or__6793__auto__;
} else {
var or__6793__auto____$1 = thing.nodeType;
if(cljs.core.truth_(or__6793__auto____$1)){
return or__6793__auto____$1;
} else {
return typeof thing === 'string';
}
}
});
lt.objs.console.write = (function lt$objs$console$write($console,msg){
if((cljs.core.count.call(null,lt.util.dom.children.call(null,$console)) > (lt.objs.console.console_limit - (1)))){
lt.util.dom.remove.call(null,(lt.util.dom.children.call(null,$console)[(0)]));
} else {
}

if(cljs.core.truth_(lt.objs.bottombar.active_QMARK_.call(null,lt.objs.console.console))){
} else {
lt.objs.statusbar.dirty.call(null);
}

return lt.util.dom.append.call(null,$console,msg);
});
lt.objs.console.write_to_log = (function lt$objs$console$write_to_log(thing){
if(cljs.core.truth_(lt.objs.console.core_log)){
return lt.objs.console.core_log.write(thing);
} else {
return null;
}
});
var group__16223__auto___16251 = cljs.core.swap_BANG_.call(null,crate.core.group_id,cljs.core.inc);
lt.objs.console.__GT_item = ((function (group__16223__auto___16251){
return (function lt$objs$console$__GT_item(var_args){
var args__7875__auto__ = [];
var len__7868__auto___16252 = arguments.length;
var i__7869__auto___16253 = (0);
while(true){
if((i__7869__auto___16253 < len__7868__auto___16252)){
args__7875__auto__.push((arguments[i__7869__auto___16253]));

var G__16254 = (i__7869__auto___16253 + (1));
i__7869__auto___16253 = G__16254;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((1) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((1)),(0),null)):null);
return lt.objs.console.__GT_item.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7876__auto__);
});})(group__16223__auto___16251))
;

lt.objs.console.__GT_item.cljs$core$IFn$_invoke$arity$variadic = ((function (group__16223__auto___16251){
return (function (l,p__16247){
var vec__16248 = p__16247;
var class$ = cljs.core.nth.call(null,vec__16248,(0),null);
var elem__16224__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),class$], null),l], null));
elem__16224__auto__.setAttribute("crateGroup",group__16223__auto___16251);

return elem__16224__auto__;
});})(group__16223__auto___16251))
;

lt.objs.console.__GT_item.cljs$lang$maxFixedArity = (1);

lt.objs.console.__GT_item.cljs$lang$applyTo = ((function (group__16223__auto___16251){
return (function (seq16245){
var G__16246 = cljs.core.first.call(null,seq16245);
var seq16245__$1 = cljs.core.next.call(null,seq16245);
return lt.objs.console.__GT_item.cljs$core$IFn$_invoke$arity$variadic(G__16246,seq16245__$1);
});})(group__16223__auto___16251))
;


lt.objs.console.__GT_item.prototype._crateGroup = group__16223__auto___16251;
lt.objs.console.log = (function lt$objs$console$log(var_args){
var args16255 = [];
var len__7868__auto___16258 = arguments.length;
var i__7869__auto___16259 = (0);
while(true){
if((i__7869__auto___16259 < len__7868__auto___16258)){
args16255.push((arguments[i__7869__auto___16259]));

var G__16260 = (i__7869__auto___16259 + (1));
i__7869__auto___16259 = G__16260;
continue;
} else {
}
break;
}

var G__16257 = args16255.length;
switch (G__16257) {
case 1:
return lt.objs.console.log.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return lt.objs.console.log.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return lt.objs.console.log.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args16255.length)].join('')));

}
});

lt.objs.console.log.cljs$core$IFn$_invoke$arity$1 = (function (l){
return lt.objs.console.log.call(null,l,null);
});

lt.objs.console.log.cljs$core$IFn$_invoke$arity$2 = (function (l,class$){
return lt.objs.console.log.call(null,l,class$,null);
});

lt.objs.console.log.cljs$core$IFn$_invoke$arity$3 = (function (l,class$,str_content){
if(cljs.core._EQ_.call(null,"",l)){
return null;
} else {
var $console = lt.objs.console.__GT_ui.call(null,lt.objs.console.console);
if(cljs.core.truth_((function (){var or__6793__auto__ = typeof l === 'string';
if(or__6793__auto__){
return or__6793__auto__;
} else {
return str_content;
}
})())){
lt.objs.console.write_to_log.call(null,((typeof l === 'string')?l:str_content));

lt.objs.console.write.call(null,$console,lt.objs.console.__GT_item.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pre","pre",2118456869),((cljs.core.not.call(null,lt.objs.console.dom_like_QMARK_.call(null,l)))?cljs.core.pr_str.call(null,l):l)], null),class$));

lt.util.dom.scroll_top.call(null,$console,(10000000000));

return null;
} else {
return null;
}
}
});

lt.objs.console.log.cljs$lang$maxFixedArity = 3;

/**
 * Log errors, strings or any objects as console error(s). If an error,
 *   its stack is logged
 */
lt.objs.console.error = (function lt$objs$console$error(var_args){
var args__7875__auto__ = [];
var len__7868__auto___16267 = arguments.length;
var i__7869__auto___16268 = (0);
while(true){
if((i__7869__auto___16268 < len__7868__auto___16267)){
args__7875__auto__.push((arguments[i__7869__auto___16268]));

var G__16269 = (i__7869__auto___16268 + (1));
i__7869__auto___16268 = G__16269;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((0) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((0)),(0),null)):null);
return lt.objs.console.error.cljs$core$IFn$_invoke$arity$variadic(argseq__7876__auto__);
});

lt.objs.console.error.cljs$core$IFn$_invoke$arity$variadic = (function (errors){
lt.objs.statusbar.console_class.call(null,"error");

var seq__16263 = cljs.core.seq.call(null,errors);
var chunk__16264 = null;
var count__16265 = (0);
var i__16266 = (0);
while(true){
if((i__16266 < count__16265)){
var e = cljs.core._nth.call(null,chunk__16264,i__16266);
lt.objs.console.log.call(null,[cljs.core.str((cljs.core.truth_(e.stack)?e.stack:((typeof e === 'string')?e:((cljs.core.not_EQ_.call(null,cljs.core.pr_str.call(null,e),"[object Object]"))?cljs.core.pr_str.call(null,e):[cljs.core.str(e)].join('')
))))].join(''),"error");

var G__16270 = seq__16263;
var G__16271 = chunk__16264;
var G__16272 = count__16265;
var G__16273 = (i__16266 + (1));
seq__16263 = G__16270;
chunk__16264 = G__16271;
count__16265 = G__16272;
i__16266 = G__16273;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__16263);
if(temp__4657__auto__){
var seq__16263__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__16263__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__16263__$1);
var G__16274 = cljs.core.chunk_rest.call(null,seq__16263__$1);
var G__16275 = c__7604__auto__;
var G__16276 = cljs.core.count.call(null,c__7604__auto__);
var G__16277 = (0);
seq__16263 = G__16274;
chunk__16264 = G__16275;
count__16265 = G__16276;
i__16266 = G__16277;
continue;
} else {
var e = cljs.core.first.call(null,seq__16263__$1);
lt.objs.console.log.call(null,[cljs.core.str((cljs.core.truth_(e.stack)?e.stack:((typeof e === 'string')?e:((cljs.core.not_EQ_.call(null,cljs.core.pr_str.call(null,e),"[object Object]"))?cljs.core.pr_str.call(null,e):[cljs.core.str(e)].join('')
))))].join(''),"error");

var G__16278 = cljs.core.next.call(null,seq__16263__$1);
var G__16279 = null;
var G__16280 = (0);
var G__16281 = (0);
seq__16263 = G__16278;
chunk__16264 = G__16279;
count__16265 = G__16280;
i__16266 = G__16281;
continue;
}
} else {
return null;
}
}
break;
}
});

lt.objs.console.error.cljs$lang$maxFixedArity = (0);

lt.objs.console.error.cljs$lang$applyTo = (function (seq16262){
return lt.objs.console.error.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq16262));
});

process.on("uncaughtException",(function (p1__16282_SHARP_){
return lt.objs.console.error.call(null,p1__16282_SHARP_);
}));
/**
 * 
 */
lt.objs.console.console_ui = (function lt$objs$console$console_ui(this$){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul.console","ul.console",-1327802751)], null));
var seq__16293_16303 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"contextmenu","contextmenu",-15887481),((function (e__7942__auto__){
return (function (e){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"menu!","menu!",-1593399467),e);
});})(e__7942__auto__))
], null)));
var chunk__16294_16304 = null;
var count__16295_16305 = (0);
var i__16296_16306 = (0);
while(true){
if((i__16296_16306 < count__16295_16305)){
var vec__16297_16307 = cljs.core._nth.call(null,chunk__16294_16304,i__16296_16306);
var ev__7943__auto___16308 = cljs.core.nth.call(null,vec__16297_16307,(0),null);
var func__7944__auto___16309 = cljs.core.nth.call(null,vec__16297_16307,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___16308,func__7944__auto___16309);

var G__16310 = seq__16293_16303;
var G__16311 = chunk__16294_16304;
var G__16312 = count__16295_16305;
var G__16313 = (i__16296_16306 + (1));
seq__16293_16303 = G__16310;
chunk__16294_16304 = G__16311;
count__16295_16305 = G__16312;
i__16296_16306 = G__16313;
continue;
} else {
var temp__4657__auto___16314 = cljs.core.seq.call(null,seq__16293_16303);
if(temp__4657__auto___16314){
var seq__16293_16315__$1 = temp__4657__auto___16314;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__16293_16315__$1)){
var c__7604__auto___16316 = cljs.core.chunk_first.call(null,seq__16293_16315__$1);
var G__16317 = cljs.core.chunk_rest.call(null,seq__16293_16315__$1);
var G__16318 = c__7604__auto___16316;
var G__16319 = cljs.core.count.call(null,c__7604__auto___16316);
var G__16320 = (0);
seq__16293_16303 = G__16317;
chunk__16294_16304 = G__16318;
count__16295_16305 = G__16319;
i__16296_16306 = G__16320;
continue;
} else {
var vec__16300_16321 = cljs.core.first.call(null,seq__16293_16315__$1);
var ev__7943__auto___16322 = cljs.core.nth.call(null,vec__16300_16321,(0),null);
var func__7944__auto___16323 = cljs.core.nth.call(null,vec__16300_16321,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___16322,func__7944__auto___16323);

var G__16324 = cljs.core.next.call(null,seq__16293_16315__$1);
var G__16325 = null;
var G__16326 = (0);
var G__16327 = (0);
seq__16293_16303 = G__16324;
chunk__16294_16304 = G__16325;
count__16295_16305 = G__16326;
i__16296_16306 = G__16327;
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
lt.objs.console.__BEH__on_close = (function lt$objs$console$__BEH__on_close(this$){
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"current-ui","current-ui",-1846031844),new cljs.core.Keyword(null,"bottom","bottom",-1550509018)], null));

return lt.objs.tabs.rem_BANG_.call(null,this$);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.console","on-close","lt.objs.console/on-close",-903643073),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"close","close",1835149582),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.console.__BEH__on_close);
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.console","console","lt.objs.console/console",1320200742),new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"console","console",1228072057),null], null), null),new cljs.core.Keyword(null,"name","name",1843675177),"console",new cljs.core.Keyword(null,"dirty","dirty",729553281),false,new cljs.core.Keyword(null,"init","init",-1875481434),(function (this$){
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"current-ui","current-ui",-1846031844),new cljs.core.Keyword(null,"bottom","bottom",-1550509018)], null));

return lt.objs.console.console_ui.call(null,this$);
}));
/**
 * 
 */
lt.objs.console.__BEH__set_console_limit = (function lt$objs$console$__BEH__set_console_limit(this$,size){
return lt.objs.console.console_limit = size;
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.console","set-console-limit","lt.objs.console/set-console-limit",-1370298205),new cljs.core.Keyword(null,"desc","desc",2093485764),"Console: Set buffer size",new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1718410804),"size"], null)], null),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"object.instant","object.instant",-29936727),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.console.__BEH__set_console_limit);
lt.objs.console.inspect = (function lt$objs$console$inspect(thing){
return lt.objs.console.util_inspect.call(null,thing,false,(2));
});
lt.objs.console.verbatim = (function lt$objs$console$verbatim(var_args){
var args16328 = [];
var len__7868__auto___16331 = arguments.length;
var i__7869__auto___16332 = (0);
while(true){
if((i__7869__auto___16332 < len__7868__auto___16331)){
args16328.push((arguments[i__7869__auto___16332]));

var G__16333 = (i__7869__auto___16332 + (1));
i__7869__auto___16332 = G__16333;
continue;
} else {
}
break;
}

var G__16330 = args16328.length;
switch (G__16330) {
case 1:
return lt.objs.console.verbatim.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return lt.objs.console.verbatim.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return lt.objs.console.verbatim.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args16328.length)].join('')));

}
});

lt.objs.console.verbatim.cljs$core$IFn$_invoke$arity$1 = (function (thing){
return lt.objs.console.verbatim.call(null,thing,null);
});

lt.objs.console.verbatim.cljs$core$IFn$_invoke$arity$2 = (function (thing,class$){
return lt.objs.console.verbatim.call(null,thing,class$,null);
});

lt.objs.console.verbatim.cljs$core$IFn$_invoke$arity$3 = (function (thing,class$,str_content){
var $console = lt.objs.console.__GT_ui.call(null,lt.objs.console.console);
if(cljs.core.truth_(str_content)){
lt.objs.console.write_to_log.call(null,str_content);
} else {
}

if(cljs.core.truth_(class$)){
lt.objs.statusbar.console_class.call(null,class$);
} else {
}

lt.objs.console.write.call(null,$console,lt.objs.console.__GT_item.call(null,thing,class$));

lt.util.dom.scroll_top.call(null,$console,(10000000000));

return null;
});

lt.objs.console.verbatim.cljs$lang$maxFixedArity = 3;

lt.objs.console.try_update = (function lt$objs$console$try_update(p__16335){
var map__16338 = p__16335;
var map__16338__$1 = ((((!((map__16338 == null)))?((((map__16338.cljs$lang$protocol_mask$partition0$ & (64))) || (map__16338.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__16338):map__16338);
var content = cljs.core.get.call(null,map__16338__$1,new cljs.core.Keyword(null,"content","content",15833224));
var id = cljs.core.get.call(null,map__16338__$1,new cljs.core.Keyword(null,"id","id",-1388402092));
if(cljs.core.truth_(id)){
var temp__4657__auto__ = lt.util.dom.$.call(null,[cljs.core.str("#console"),cljs.core.str(id)].join(''),lt.objs.console.__GT_ui.call(null,lt.objs.console.console));
if(cljs.core.truth_(temp__4657__auto__)){
var pre = temp__4657__auto__;
lt.util.dom.append.call(null,pre,lt.util.dom.text_node.call(null,content));

return true;
} else {
return null;
}
} else {
return null;
}
});
lt.objs.console.loc_log = (function lt$objs$console$loc_log(p__16340){
var map__16343 = p__16340;
var map__16343__$1 = ((((!((map__16343 == null)))?((((map__16343.cljs$lang$protocol_mask$partition0$ & (64))) || (map__16343.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__16343):map__16343);
var msg = map__16343__$1;
var file = cljs.core.get.call(null,map__16343__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var line = cljs.core.get.call(null,map__16343__$1,new cljs.core.Keyword(null,"line","line",212345235));
var content = cljs.core.get.call(null,map__16343__$1,new cljs.core.Keyword(null,"content","content",15833224));
var class$ = cljs.core.get.call(null,map__16343__$1,new cljs.core.Keyword(null,"class","class",-2030961996));
var str_content = cljs.core.get.call(null,map__16343__$1,new cljs.core.Keyword(null,"str-content","str-content",297549190));
var id = cljs.core.get.call(null,map__16343__$1,new cljs.core.Keyword(null,"id","id",-1388402092));
if(cljs.core.truth_(content)){
if(cljs.core.truth_((function (){var or__6793__auto__ = typeof content === 'string';
if(or__6793__auto__){
return or__6793__auto__;
} else {
return str_content;
}
})())){
lt.objs.console.write_to_log.call(null,[cljs.core.str(file),cljs.core.str("["),cljs.core.str(line),cljs.core.str("]: "),cljs.core.str(((typeof content === 'string')?content:str_content)),cljs.core.str("\n")].join(''));
} else {
}

if(cljs.core.truth_(lt.objs.console.try_update.call(null,msg))){
return null;
} else {
return lt.objs.console.verbatim.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"table","table",-564943036),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td.loc","td.loc",247946364),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"em.file","em.file",1719749536),file,(cljs.core.truth_(line)?new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"em.line","em.line",279671375),"[",line,"]"], null):null),": "], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pre","pre",2118456869),(cljs.core.truth_(id)?new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"id","id",-1388402092),[cljs.core.str("console"),cljs.core.str(id)].join('')], null):null),((typeof content === 'string')?clojure.string.replace.call(null,content,/^\s+/,""):content)], null)], null)], null)], null),class$);
}
} else {
return null;
}
});
lt.objs.console.clear = (function lt$objs$console$clear(){
return lt.util.dom.empty.call(null,lt.objs.console.__GT_ui.call(null,lt.objs.console.console));
});
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.console","sidebar.console","lt.objs.console/sidebar.console",1452888813),new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"console","console",1228072057),null], null), null),new cljs.core.Keyword(null,"label","label",1718410804),"console",new cljs.core.Keyword(null,"order","order",-1254677256),(4),new cljs.core.Keyword(null,"init","init",-1875481434),(function (this$){
return lt.objs.console.console_ui.call(null,this$);
}));
lt.objs.console.console = lt.object.create.call(null,new cljs.core.Keyword("lt.objs.console","console","lt.objs.console/console",1320200742));
/**
 * 
 */
lt.objs.console.__BEH__menu_PLUS_ = (function lt$objs$console$__BEH__menu_PLUS_(this$,items,event){
return cljs.core.conj.call(null,items,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"label","label",1718410804),"Clear",new cljs.core.Keyword(null,"order","order",-1254677256),(1),new cljs.core.Keyword(null,"click","click",1912301393),(function (){
return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"clear-console","clear-console",2084070172));
})], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"label","label",1718410804),"Copy",new cljs.core.Keyword(null,"order","order",-1254677256),(2),new cljs.core.Keyword(null,"click","click",1912301393),(function (){
var target = event.target;
var item = ((cljs.core._EQ_.call(null,target.tagName.toLowerCase(),"li"))?target:lt.util.dom.parents.call(null,target,"ul.console li"));
return lt.objs.platform.copy.call(null,target.textContent);
})], null),((cljs.core.not_EQ_.call(null,new cljs.core.Keyword(null,"tab","tab",-559583621),new cljs.core.Keyword(null,"current-ui","current-ui",-1846031844).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.console.console))))?new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"label","label",1718410804),"Hide console",new cljs.core.Keyword(null,"order","order",-1254677256),(3),new cljs.core.Keyword(null,"click","click",1912301393),(function (){
return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"toggle-console","toggle-console",2094748794));
})], null):null),((cljs.core.not_EQ_.call(null,new cljs.core.Keyword(null,"tab","tab",-559583621),new cljs.core.Keyword(null,"current-ui","current-ui",-1846031844).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.console.console))))?new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"label","label",1718410804),"Open console tab",new cljs.core.Keyword(null,"order","order",-1254677256),(4),new cljs.core.Keyword(null,"click","click",1912301393),(function (){
lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"toggle-console","toggle-console",2094748794));

return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"console-tab","console-tab",-28627510));
})], null):null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.console","menu+","lt.objs.console/menu+",-1208363867),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"menu+","menu+",276559402),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.console.__BEH__menu_PLUS_);
/**
 * 
 */
lt.objs.console.__BEH__statusbar_console_toggle = (function lt$objs$console$__BEH__statusbar_console_toggle(this$){
lt.object.raise.call(null,lt.objs.bottombar.bottombar,new cljs.core.Keyword(null,"toggle","toggle",1291842030),lt.objs.console.console);

if(cljs.core.truth_(lt.objs.bottombar.active_QMARK_.call(null,lt.objs.console.console))){
lt.util.dom.scroll_top.call(null,lt.object.__GT_content.call(null,lt.objs.console.console),(10000000000));

return lt.objs.statusbar.clean.call(null);
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.console","statusbar-console-toggle","lt.objs.console/statusbar-console-toggle",670191448),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"toggle","toggle",1291842030),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.console.__BEH__statusbar_console_toggle);
/**
 * 
 */
lt.objs.console.__BEH__statusbar_console_show = (function lt$objs$console$__BEH__statusbar_console_show(this$){
lt.object.raise.call(null,lt.objs.bottombar.bottombar,new cljs.core.Keyword(null,"show!","show!",1939158011),lt.objs.console.console);

if(cljs.core.truth_(lt.objs.bottombar.active_QMARK_.call(null,lt.objs.console.console))){
lt.util.dom.scroll_top.call(null,lt.object.__GT_content.call(null,lt.objs.console.console),(10000000000));

return lt.objs.statusbar.clean.call(null);
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.console","statusbar-console-show","lt.objs.console/statusbar-console-show",-433744358),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"show!","show!",1939158011),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.console.__BEH__statusbar_console_show);
/**
 * 
 */
lt.objs.console.__BEH__statusbar_console_hide = (function lt$objs$console$__BEH__statusbar_console_hide(this$){
return lt.object.raise.call(null,lt.objs.bottombar.bottombar,new cljs.core.Keyword(null,"hide!","hide!",-2041470693),lt.objs.console.console);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.console","statusbar-console-hide","lt.objs.console/statusbar-console-hide",-964809777),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"hide!","hide!",-2041470693),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.console.__BEH__statusbar_console_hide);
lt.objs.bottombar.add_item.call(null,lt.objs.console.console);
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"console-tab","console-tab",-28627510),new cljs.core.Keyword(null,"desc","desc",2093485764),"Console: Open the console in a tab",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
if(cljs.core.not_EQ_.call(null,new cljs.core.Keyword(null,"tab","tab",-559583621),new cljs.core.Keyword(null,"current-ui","current-ui",-1846031844).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.console.console)))){
lt.object.raise.call(null,lt.objs.statusbar.console_toggle,new cljs.core.Keyword(null,"hide!","hide!",-2041470693));

lt.object.merge_BANG_.call(null,lt.objs.console.console,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"current-ui","current-ui",-1846031844),new cljs.core.Keyword(null,"tab","tab",-559583621)], null));

return lt.objs.tabs.add_BANG_.call(null,lt.objs.console.console);
} else {
return null;
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"console.show","console.show",2117547113),new cljs.core.Keyword(null,"desc","desc",2093485764),"Console: Show console",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"current-ui","current-ui",-1846031844).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.console.console)),new cljs.core.Keyword(null,"tab","tab",-559583621))){
lt.objs.tabs.active_BANG_.call(null,lt.objs.console.console);

return lt.objs.statusbar.clean.call(null);
} else {
return lt.object.raise.call(null,lt.objs.statusbar.console_toggle,new cljs.core.Keyword(null,"show!","show!",1939158011));
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"console.hide","console.hide",-1754441929),new cljs.core.Keyword(null,"desc","desc",2093485764),"Console: Hide console",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"current-ui","current-ui",-1846031844).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.console.console)),new cljs.core.Keyword(null,"tab","tab",-559583621))){
return lt.object.raise.call(null,lt.objs.console.console,new cljs.core.Keyword(null,"close","close",1835149582));
} else {
return lt.object.raise.call(null,lt.objs.statusbar.console_toggle,new cljs.core.Keyword(null,"hide!","hide!",-2041470693));
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"toggle-console","toggle-console",2094748794),new cljs.core.Keyword(null,"desc","desc",2093485764),"Console: Toggle console",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"current-ui","current-ui",-1846031844).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.console.console)),new cljs.core.Keyword(null,"tab","tab",-559583621))){
lt.objs.tabs.active_BANG_.call(null,lt.objs.console.console);

return lt.objs.statusbar.clean.call(null);
} else {
return lt.object.raise.call(null,lt.objs.statusbar.console_toggle,new cljs.core.Keyword(null,"toggle","toggle",1291842030));
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"clear-console","clear-console",2084070172),new cljs.core.Keyword(null,"desc","desc",2093485764),"Console: Clear console",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (this$){
var seq__16345_16349 = cljs.core.seq.call(null,lt.object.by_tag.call(null,new cljs.core.Keyword(null,"clients.devtools","clients.devtools",-1942442453)));
var chunk__16346_16350 = null;
var count__16347_16351 = (0);
var i__16348_16352 = (0);
while(true){
if((i__16348_16352 < count__16347_16351)){
var o_16353 = cljs.core._nth.call(null,chunk__16346_16350,i__16348_16352);
lt.object.raise.call(null,o_16353,new cljs.core.Keyword(null,"clear!","clear!",-144814418));

var G__16354 = seq__16345_16349;
var G__16355 = chunk__16346_16350;
var G__16356 = count__16347_16351;
var G__16357 = (i__16348_16352 + (1));
seq__16345_16349 = G__16354;
chunk__16346_16350 = G__16355;
count__16347_16351 = G__16356;
i__16348_16352 = G__16357;
continue;
} else {
var temp__4657__auto___16358 = cljs.core.seq.call(null,seq__16345_16349);
if(temp__4657__auto___16358){
var seq__16345_16359__$1 = temp__4657__auto___16358;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__16345_16359__$1)){
var c__7604__auto___16360 = cljs.core.chunk_first.call(null,seq__16345_16359__$1);
var G__16361 = cljs.core.chunk_rest.call(null,seq__16345_16359__$1);
var G__16362 = c__7604__auto___16360;
var G__16363 = cljs.core.count.call(null,c__7604__auto___16360);
var G__16364 = (0);
seq__16345_16349 = G__16361;
chunk__16346_16350 = G__16362;
count__16347_16351 = G__16363;
i__16348_16352 = G__16364;
continue;
} else {
var o_16365 = cljs.core.first.call(null,seq__16345_16359__$1);
lt.object.raise.call(null,o_16365,new cljs.core.Keyword(null,"clear!","clear!",-144814418));

var G__16366 = cljs.core.next.call(null,seq__16345_16359__$1);
var G__16367 = null;
var G__16368 = (0);
var G__16369 = (0);
seq__16345_16349 = G__16366;
chunk__16346_16350 = G__16367;
count__16347_16351 = G__16368;
i__16348_16352 = G__16369;
continue;
}
} else {
}
}
break;
}

return lt.objs.console.clear.call(null);
})], null));
