// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.objs.app');
goog.require('cljs.core');
goog.require('lt.objs.command');
goog.require('lt.objs.platform');
goog.require('lt.objs.context');
goog.require('lt.object');
goog.require('lt.util.dom');
goog.require('lt.util.ipc');
goog.require('clojure.string');
goog.require('lt.util.js');
lt.objs.app.remote = require("electron").remote;
lt.objs.app.win = lt.objs.app.remote.getCurrentWindow();
lt.objs.app.frame = require("electron").webFrame;
lt.objs.app.closing = true;
lt.objs.app.default_zoom = (1);
lt.objs.app.app_url = (function lt$objs$app$app_url(){
return window.location.href;
});
lt.objs.app.window_number = (function lt$objs$app$window_number(){
return lt.objs.app.win.id;
});
lt.objs.app.first_window_QMARK_ = (function lt$objs$app$first_window_QMARK_(){
return cljs.core._EQ_.call(null,(1),lt.objs.app.window_number.call(null));
});
lt.objs.app.prevent_close = (function lt$objs$app$prevent_close(){
return lt.objs.app.closing = false;
});
lt.objs.app.close = (function lt$objs$app$close(var_args){
var args13655 = [];
var len__7868__auto___13658 = arguments.length;
var i__7869__auto___13659 = (0);
while(true){
if((i__7869__auto___13659 < len__7868__auto___13658)){
args13655.push((arguments[i__7869__auto___13659]));

var G__13660 = (i__7869__auto___13659 + (1));
i__7869__auto___13659 = G__13660;
continue;
} else {
}
break;
}

var G__13657 = args13655.length;
switch (G__13657) {
case 0:
return lt.objs.app.close.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return lt.objs.app.close.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13655.length)].join('')));

}
});

lt.objs.app.close.cljs$core$IFn$_invoke$arity$0 = (function (){
return lt.objs.app.close.call(null,false);
});

lt.objs.app.close.cljs$core$IFn$_invoke$arity$1 = (function (force_QMARK_){
if(cljs.core.truth_(force_QMARK_)){
lt.object.raise.call(null,lt.objs.app.app,new cljs.core.Keyword(null,"closing","closing",-1862893890));

lt.object.raise.call(null,lt.objs.app.app,new cljs.core.Keyword(null,"closed","closed",-919675359));

return lt.objs.app.win.destroy();
} else {
return lt.objs.app.win.close();
}
});

lt.objs.app.close.cljs$lang$maxFixedArity = 1;

lt.objs.app.refresh = (function lt$objs$app$refresh(){
return window.location.reload(true);
});
lt.objs.app.init = (function lt$objs$app$init(){
lt.object.raise.call(null,lt.objs.app.app,new cljs.core.Keyword(null,"deploy","deploy",-2006774212));

lt.object.raise.call(null,lt.objs.app.app,new cljs.core.Keyword(null,"pre-init","pre-init",423602427));

lt.object.raise.call(null,lt.objs.app.app,new cljs.core.Keyword(null,"init","init",-1875481434));

lt.object.raise.call(null,lt.objs.app.app,new cljs.core.Keyword(null,"post-init","post-init",1539646468));

return lt.object.raise.call(null,lt.objs.app.app,new cljs.core.Keyword(null,"show","show",-576705889));
});
lt.objs.app.fetch = (function lt$objs$app$fetch(k){
var temp__4657__auto__ = (localStorage[cljs.core.name.call(null,k)]);
if(cljs.core.truth_(temp__4657__auto__)){
var v = temp__4657__auto__;
if(cljs.core.not_EQ_.call(null,"null",v)){
return JSON.parse(v);
} else {
return null;
}
} else {
return null;
}
});
/**
 * Store key and value in localStorage. If value is a string, fetch must be used
 *   to get back the original value from localStorage.
 */
lt.objs.app.store_BANG_ = (function lt$objs$app$store_BANG_(k,v){
return (localStorage[cljs.core.name.call(null,k)] = ((typeof v === 'string')?cljs.core.pr_str.call(null,v):v));
});
lt.objs.app.store_swap_BANG_ = (function lt$objs$app$store_swap_BANG_(k,f){
var neue = f.call(null,lt.objs.app.fetch.call(null,k));
lt.objs.app.store_BANG_.call(null,k,neue);

return neue;
});
lt.objs.app.ensure_greater = (function lt$objs$app$ensure_greater(x,cap){
var x__$1 = ((typeof x === 'string')?parseInt(x):x);
var x__7124__auto__ = x__$1;
var y__7125__auto__ = cap;
return ((x__7124__auto__ > y__7125__auto__) ? x__7124__auto__ : y__7125__auto__);
});
lt.objs.app.zoom_level = (function lt$objs$app$zoom_level(){
if(cljs.core.not_EQ_.call(null,lt.objs.app.frame.getZoomFactor(),(0))){
return lt.objs.app.frame.getZoomFactor();
} else {
return null;
}
});
lt.objs.app.open_window = (function lt$objs$app$open_window(){
return lt.util.ipc.send.call(null,"createWindow");
});
/**
 * 
 */
lt.objs.app.__BEH__refresh = (function lt$objs$app$__BEH__refresh(obj){
lt.objs.app.closing = true;

lt.object.raise.call(null,lt.objs.app.app,new cljs.core.Keyword(null,"reload","reload",863702807));

if(cljs.core.truth_(lt.objs.app.closing)){
return lt.objs.app.refresh.call(null);
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.app","refresh","lt.objs.app/refresh",1475516336),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"refresh","refresh",1947415525),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.app.__BEH__refresh);
/**
 * 
 */
lt.objs.app.__BEH__close_BANG_ = (function lt$objs$app$__BEH__close_BANG_(this$){
lt.objs.app.closing = true;

lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"close","close",1835149582));

if(cljs.core.truth_(lt.objs.app.closing)){
return lt.objs.app.close.call(null,true);
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.app","close!","lt.objs.app/close!",-802150745),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"close!","close!",-2079310498),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.app.__BEH__close_BANG_);
/**
 * 
 */
lt.objs.app.__BEH__notify_init_window = (function lt$objs$app$__BEH__notify_init_window(this$){
return lt.util.ipc.send.call(null,"initWindow",lt.objs.app.window_number.call(null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.app","notify-init-window","lt.objs.app/notify-init-window",-202420059),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"init","init",-1875481434),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.app.__BEH__notify_init_window);
/**
 * 
 */
lt.objs.app.__BEH__store_position_on_close = (function lt$objs$app$__BEH__store_position_on_close(this$){
if(cljs.core.truth_(lt.objs.app.win.isFullScreen())){
} else {
var vec__13668_13674 = lt.objs.app.win.getSize();
var width_13675 = cljs.core.nth.call(null,vec__13668_13674,(0),null);
var height_13676 = cljs.core.nth.call(null,vec__13668_13674,(1),null);
lt.objs.app.store_BANG_.call(null,new cljs.core.Keyword(null,"width","width",-384071477),width_13675);

lt.objs.app.store_BANG_.call(null,new cljs.core.Keyword(null,"height","height",1025178622),height_13676);

var vec__13671_13677 = lt.objs.app.win.getPosition();
var x_13678 = cljs.core.nth.call(null,vec__13671_13677,(0),null);
var y_13679 = cljs.core.nth.call(null,vec__13671_13677,(1),null);
lt.objs.app.store_BANG_.call(null,new cljs.core.Keyword(null,"x","x",2099068185),x_13678);

lt.objs.app.store_BANG_.call(null,new cljs.core.Keyword(null,"y","y",-1757859776),y_13679);
}

return localStorage.fullscreen = lt.objs.app.win.isFullScreen();
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.app","store-position-on-close","lt.objs.app/store-position-on-close",382665886),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"closed","closed",-919675359),null,new cljs.core.Keyword(null,"refresh","refresh",1947415525),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.app.__BEH__store_position_on_close);
/**
 * 
 */
lt.objs.app.__BEH__restore_fullscreen = (function lt$objs$app$__BEH__restore_fullscreen(this$){
if(cljs.core._EQ_.call(null,localStorage.fullscreen,"true")){
return lt.objs.app.win.setFullScreen(true);
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.app","restore-fullscreen","lt.objs.app/restore-fullscreen",529140806),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"show","show",-576705889),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.app.__BEH__restore_fullscreen);
/**
 * 
 */
lt.objs.app.__BEH__restore_position_on_init = (function lt$objs$app$__BEH__restore_position_on_init(this$){
if(cljs.core.truth_(localStorage.width)){
lt.objs.app.win.setSize(lt.objs.app.ensure_greater.call(null,localStorage.width,(400)),lt.objs.app.ensure_greater.call(null,localStorage.height,(400)));

return lt.objs.app.win.setPosition(lt.objs.app.ensure_greater.call(null,localStorage.x,(0)),lt.objs.app.ensure_greater.call(null,localStorage.y,(0)));
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.app","restore-position-on-init","lt.objs.app/restore-position-on-init",1513785414),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"show","show",-576705889),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.app.__BEH__restore_position_on_init);
/**
 * 
 */
lt.objs.app.__BEH__on_show_bind_navigate = (function lt$objs$app$__BEH__on_show_bind_navigate(this$){
return lt.util.dom.on.call(null,lt.util.dom.$.call(null,new cljs.core.Keyword(null,"#canvas","#canvas",-1325731096)),new cljs.core.Keyword(null,"click","click",1912301393),(function (e){
if((cljs.core._EQ_.call(null,e.target.nodeName,"A")) && (cljs.core.not.call(null,e.defaultPrevented))){
lt.util.dom.prevent.call(null,e);

var temp__4657__auto__ = e.target.href;
if(cljs.core.truth_(temp__4657__auto__)){
var href = temp__4657__auto__;
lt.objs.platform.open_url.call(null,href);

return lt.objs.app.win.focus();
} else {
return null;
}
} else {
return null;
}
}));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.app","on-show-bind-navigate","lt.objs.app/on-show-bind-navigate",-728066556),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"show","show",-576705889),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.app.__BEH__on_show_bind_navigate);
/**
 * 
 */
lt.objs.app.__BEH__track_focus = (function lt$objs$app$__BEH__track_focus(this$){
return lt.objs.app.store_BANG_.call(null,new cljs.core.Keyword(null,"focusedWindow","focusedWindow",-121610640),lt.objs.app.window_number.call(null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.app","track-focus","lt.objs.app/track-focus",307139399),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"focus","focus",234677911),null,new cljs.core.Keyword(null,"show","show",-576705889),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.app.__BEH__track_focus);
/**
 * 
 */
lt.objs.app.__BEH__focus_class = (function lt$objs$app$__BEH__focus_class(this$){
lt.util.dom.add_class.call(null,lt.util.dom.$.call(null,new cljs.core.Keyword(null,"body","body",-2049205669)),new cljs.core.Keyword(null,"active","active",1895962068));

return lt.util.dom.remove_class.call(null,lt.util.dom.$.call(null,new cljs.core.Keyword(null,"body","body",-2049205669)),new cljs.core.Keyword(null,"inactive","inactive",-306247616));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.app","focus-class","lt.objs.app/focus-class",774499170),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"focus","focus",234677911),null,new cljs.core.Keyword(null,"show","show",-576705889),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.app.__BEH__focus_class);
/**
 * 
 */
lt.objs.app.__BEH__blur_class = (function lt$objs$app$__BEH__blur_class(this$){
lt.util.dom.remove_class.call(null,lt.util.dom.$.call(null,new cljs.core.Keyword(null,"body","body",-2049205669)),new cljs.core.Keyword(null,"active","active",1895962068));

return lt.util.dom.add_class.call(null,lt.util.dom.$.call(null,new cljs.core.Keyword(null,"body","body",-2049205669)),new cljs.core.Keyword(null,"inactive","inactive",-306247616));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.app","blur-class","lt.objs.app/blur-class",1994929762),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"blur","blur",-453500461),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.app.__BEH__blur_class);
lt.objs.app.run_commands = (function lt$objs$app$run_commands(var_args){
var args__7875__auto__ = [];
var len__7868__auto___13686 = arguments.length;
var i__7869__auto___13687 = (0);
while(true){
if((i__7869__auto___13687 < len__7868__auto___13686)){
args__7875__auto__.push((arguments[i__7869__auto___13687]));

var G__13688 = (i__7869__auto___13687 + (1));
i__7869__auto___13687 = G__13688;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((1) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((1)),(0),null)):null);
return lt.objs.app.run_commands.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7876__auto__);
});

lt.objs.app.run_commands.cljs$core$IFn$_invoke$arity$variadic = (function (this$,commands){
if(cljs.core.seq.call(null,commands)){
var commands__$1 = ((cljs.core.vector_QMARK_.call(null,cljs.core.first.call(null,commands)))?cljs.core.first.call(null,commands):commands);
var seq__13682 = cljs.core.seq.call(null,commands__$1);
var chunk__13683 = null;
var count__13684 = (0);
var i__13685 = (0);
while(true){
if((i__13685 < count__13684)){
var c = cljs.core._nth.call(null,chunk__13683,i__13685);
if(cljs.core.coll_QMARK_.call(null,c)){
cljs.core.apply.call(null,lt.objs.command.exec_BANG_,c);
} else {
lt.objs.command.exec_BANG_.call(null,c);
}

var G__13689 = seq__13682;
var G__13690 = chunk__13683;
var G__13691 = count__13684;
var G__13692 = (i__13685 + (1));
seq__13682 = G__13689;
chunk__13683 = G__13690;
count__13684 = G__13691;
i__13685 = G__13692;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__13682);
if(temp__4657__auto__){
var seq__13682__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13682__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__13682__$1);
var G__13693 = cljs.core.chunk_rest.call(null,seq__13682__$1);
var G__13694 = c__7604__auto__;
var G__13695 = cljs.core.count.call(null,c__7604__auto__);
var G__13696 = (0);
seq__13682 = G__13693;
chunk__13683 = G__13694;
count__13684 = G__13695;
i__13685 = G__13696;
continue;
} else {
var c = cljs.core.first.call(null,seq__13682__$1);
if(cljs.core.coll_QMARK_.call(null,c)){
cljs.core.apply.call(null,lt.objs.command.exec_BANG_,c);
} else {
lt.objs.command.exec_BANG_.call(null,c);
}

var G__13697 = cljs.core.next.call(null,seq__13682__$1);
var G__13698 = null;
var G__13699 = (0);
var G__13700 = (0);
seq__13682 = G__13697;
chunk__13683 = G__13698;
count__13684 = G__13699;
i__13685 = G__13700;
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
});

lt.objs.app.run_commands.cljs$lang$maxFixedArity = (1);

lt.objs.app.run_commands.cljs$lang$applyTo = (function (seq13680){
var G__13681 = cljs.core.first.call(null,seq13680);
var seq13680__$1 = cljs.core.next.call(null,seq13680);
return lt.objs.app.run_commands.cljs$core$IFn$_invoke$arity$variadic(G__13681,seq13680__$1);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.app","run-pre-init","lt.objs.app/run-pre-init",-414554600),new cljs.core.Keyword(null,"desc","desc",2093485764),"App: Run commands before init",new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"label","label",1718410804),"commands",new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"list","list",765357683),new cljs.core.Keyword(null,"items","items",1031954938),lt.objs.command.completions], null)], null),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"pre-init","pre-init",423602427),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.app.run_commands);
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.app","run-on-init","lt.objs.app/run-on-init",1097415811),new cljs.core.Keyword(null,"desc","desc",2093485764),"App: Run commands on init",new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"label","label",1718410804),"commands",new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"list","list",765357683),new cljs.core.Keyword(null,"items","items",1031954938),lt.objs.command.completions], null)], null),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"init","init",-1875481434),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.app.run_commands);
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.app","run-post-init","lt.objs.app/run-post-init",-634164351),new cljs.core.Keyword(null,"desc","desc",2093485764),"App: Run commands after init",new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"label","label",1718410804),"commands",new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"list","list",765357683),new cljs.core.Keyword(null,"items","items",1031954938),lt.objs.command.completions], null)], null),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"post-init","post-init",1539646468),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.app.run_commands);
/**
 * 
 */
lt.objs.app.__BEH__set_default_zoom_level = (function lt$objs$app$__BEH__set_default_zoom_level(this$,default$){
lt.objs.app.default_zoom = default$;

return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"window.zoom-reset","window.zoom-reset",903555068));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.app","set-default-zoom-level","lt.objs.app/set-default-zoom-level",-1395969717),new cljs.core.Keyword(null,"desc","desc",2093485764),"App: Set the default zoom level",new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"default-zoom-level",new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"number","number",1570378438)], null)], null),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"init","init",-1875481434),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.app.__BEH__set_default_zoom_level);
/**
 * 
 */
lt.objs.app.__BEH__add_platform_class = (function lt$objs$app$__BEH__add_platform_class(this$){
return lt.util.dom.add_class.call(null,lt.util.dom.$.call(null,new cljs.core.Keyword(null,"body","body",-2049205669)),cljs.core.name.call(null,lt.objs.platform.platform));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.app","add-platform-class","lt.objs.app/add-platform-class",-761036078),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"init","init",-1875481434),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.app.__BEH__add_platform_class);
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.app","app","lt.objs.app/app",-890273632),new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"window","window",724519534),null,new cljs.core.Keyword(null,"app","app",-560961707),null], null), null),new cljs.core.Keyword(null,"delays","delays",1780592582),(0),new cljs.core.Keyword(null,"init","init",-1875481434),(function (this$){
return lt.objs.context.in_BANG_.call(null,new cljs.core.Keyword(null,"app","app",-560961707),this$);
}));
lt.objs.app.app = lt.object.create.call(null,new cljs.core.Keyword("lt.objs.app","app","lt.objs.app/app",-890273632));
lt.util.ipc.on.call(null,"app",(function (p1__13702_SHARP_,p2__13701_SHARP_){
return lt.object.raise.call(null,lt.objs.app.app,cljs.core.keyword.call(null,p2__13701_SHARP_));
}));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"window.new","window.new",-572789814),new cljs.core.Keyword(null,"desc","desc",2093485764),"Window: Open new window",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var w = lt.objs.app.open_window.call(null);
return null;
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"window.close","window.close",-983383177),new cljs.core.Keyword(null,"desc","desc",2093485764),"Window: Close window",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.object.raise.call(null,lt.objs.app.app,new cljs.core.Keyword(null,"close!","close!",-2079310498));
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"window.zoom-in","window.zoom-in",162229992),new cljs.core.Keyword(null,"desc","desc",2093485764),"Window: Zoom in",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.objs.app.frame.setZoomFactor((lt.objs.app.frame.getZoomFactor() + 0.2));
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"window.zoom-out","window.zoom-out",-763872352),new cljs.core.Keyword(null,"desc","desc",2093485764),"Window: Zoom out",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
if((lt.objs.app.frame.getZoomFactor() > (0))){
return lt.objs.app.frame.setZoomFactor((lt.objs.app.frame.getZoomFactor() - 0.2));
} else {
return null;
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"window.zoom-reset","window.zoom-reset",903555068),new cljs.core.Keyword(null,"desc","desc",2093485764),"Window: Zoom reset",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.objs.app.frame.setZoomFactor(lt.objs.app.default_zoom);
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"window.fullscreen","window.fullscreen",-881944320),new cljs.core.Keyword(null,"desc","desc",2093485764),"Window: Toggle fullscreen",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.objs.app.win.setFullScreen(cljs.core.not.call(null,lt.objs.app.win.isFullScreen()));
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"window.minimize","window.minimize",-1025606910),new cljs.core.Keyword(null,"desc","desc",2093485764),"Window: Minimize",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.objs.app.win.minimize();
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"window.maximize","window.maximize",-1691981841),new cljs.core.Keyword(null,"desc","desc",2093485764),"Window: Maximize",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.objs.app.win.maximize();
})], null));
