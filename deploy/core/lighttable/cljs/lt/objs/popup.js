// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.objs.popup');
goog.require('cljs.core');
goog.require('lt.objs.command');
goog.require('lt.objs.context');
goog.require('lt.object');
goog.require('lt.util.dom');
goog.require('lt.objs.canvas');
goog.require('lt.objs.keyboard');
lt.objs.popup._STAR_no_close_STAR_ = null;
/**
 * 
 */
lt.objs.popup.__BEH__on_click_destroy = (function lt$objs$popup$__BEH__on_click_destroy(this$){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"close!","close!",-2079310498));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.popup","on-click-destroy","lt.objs.popup/on-click-destroy",-1257288811),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"click","click",1912301393),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.popup.__BEH__on_click_destroy);
/**
 * 
 */
lt.objs.popup.__BEH__close_BANG_ = (function lt$objs$popup$__BEH__close_BANG_(this$){
lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"close","close",1835149582));

lt.object.destroy_BANG_.call(null,this$);

var temp__4655__auto__ = cljs.core.seq.call(null,lt.object.by_tag.call(null,new cljs.core.Keyword(null,"popup","popup",635890211)));
if(temp__4655__auto__){
var others = temp__4655__auto__;
return lt.objs.context.in_BANG_.call(null,new cljs.core.Keyword(null,"popup","popup",635890211),cljs.core.last.call(null,others));
} else {
return lt.objs.context.out_BANG_.call(null,new cljs.core.Keyword(null,"popup","popup",635890211));
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.popup","close!","lt.objs.popup/close!",1552065566),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"close!","close!",-2079310498),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.popup.__BEH__close_BANG_);
/**
 * 
 */
lt.objs.popup.__BEH__refocus_on_close = (function lt$objs$popup$__BEH__refocus_on_close(this$){
return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"tabs.focus-active","tabs.focus-active",-2052283963));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.popup","refocus-on-close","lt.objs.popup/refocus-on-close",1449031270),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"close","close",1835149582),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.popup.__BEH__refocus_on_close);
/**
 * 
 */
lt.objs.popup.__BEH__change_active_button = (function lt$objs$popup$__BEH__change_active_button(this$,dir){
var buttons = lt.util.dom.$$.call(null,".button",lt.object.__GT_content.call(null,this$));
var button = cljs.core.mod.call(null,(new cljs.core.Keyword(null,"button","button",1456579943).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)) + dir),cljs.core.count.call(null,buttons));
lt.util.dom.remove_class.call(null,(buttons[new cljs.core.Keyword(null,"button","button",1456579943).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))]),new cljs.core.Keyword(null,"active","active",1895962068));

lt.util.dom.add_class.call(null,(buttons[button]),new cljs.core.Keyword(null,"active","active",1895962068));

return lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"button","button",1456579943),button], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.popup","change-active-button","lt.objs.popup/change-active-button",-72650248),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"move-active","move-active",-410074174),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.popup.__BEH__change_active_button);
/**
 * 
 */
lt.objs.popup.__BEH__exec_active = (function lt$objs$popup$__BEH__exec_active(this$){
var buttons = lt.util.dom.$$.call(null,".button",lt.object.__GT_content.call(null,this$));
return lt.util.dom.trigger.call(null,(buttons[new cljs.core.Keyword(null,"button","button",1456579943).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))]),new cljs.core.Keyword(null,"click","click",1912301393));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.popup","exec-active","lt.objs.popup/exec-active",1273732381),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"exec-active","exec-active",-1470413731),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.popup.__BEH__exec_active);
lt.objs.popup.remain_open = (function lt$objs$popup$remain_open(){
return lt.objs.popup._STAR_no_close_STAR_ = true;
});
/**
 * 
 */
lt.objs.popup.__GT_button = (function lt$objs$popup$__GT_button(this$,p__15395){
var map__15409 = p__15395;
var map__15409__$1 = ((((!((map__15409 == null)))?((((map__15409.cljs$lang$protocol_mask$partition0$ & (64))) || (map__15409.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15409):map__15409);
var label = cljs.core.get.call(null,map__15409__$1,new cljs.core.Keyword(null,"label","label",1718410804));
var action = cljs.core.get.call(null,map__15409__$1,new cljs.core.Keyword(null,"action","action",-811238024));
var post_action = cljs.core.get.call(null,map__15409__$1,new cljs.core.Keyword(null,"post-action","post-action",-542405960));
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li.button","li.button",-182721201),label], null));
var seq__15411_15422 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__,map__15409,map__15409__$1,label,action,post_action){
return (function (){
var _STAR_no_close_STAR_15415 = lt.objs.popup._STAR_no_close_STAR_;
lt.objs.popup._STAR_no_close_STAR_ = null;

try{if(cljs.core.fn_QMARK_.call(null,action)){
action.call(null);
} else {
}

if(cljs.core.truth_(lt.objs.popup._STAR_no_close_STAR_)){
} else {
lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"close!","close!",-2079310498));
}

if(cljs.core.fn_QMARK_.call(null,post_action)){
return post_action.call(null);
} else {
return null;
}
}finally {lt.objs.popup._STAR_no_close_STAR_ = _STAR_no_close_STAR_15415;
}});})(e__7942__auto__,map__15409,map__15409__$1,label,action,post_action))
], null)));
var chunk__15412_15423 = null;
var count__15413_15424 = (0);
var i__15414_15425 = (0);
while(true){
if((i__15414_15425 < count__15413_15424)){
var vec__15416_15426 = cljs.core._nth.call(null,chunk__15412_15423,i__15414_15425);
var ev__7943__auto___15427 = cljs.core.nth.call(null,vec__15416_15426,(0),null);
var func__7944__auto___15428 = cljs.core.nth.call(null,vec__15416_15426,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___15427,func__7944__auto___15428);

var G__15429 = seq__15411_15422;
var G__15430 = chunk__15412_15423;
var G__15431 = count__15413_15424;
var G__15432 = (i__15414_15425 + (1));
seq__15411_15422 = G__15429;
chunk__15412_15423 = G__15430;
count__15413_15424 = G__15431;
i__15414_15425 = G__15432;
continue;
} else {
var temp__4657__auto___15433 = cljs.core.seq.call(null,seq__15411_15422);
if(temp__4657__auto___15433){
var seq__15411_15434__$1 = temp__4657__auto___15433;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15411_15434__$1)){
var c__7604__auto___15435 = cljs.core.chunk_first.call(null,seq__15411_15434__$1);
var G__15436 = cljs.core.chunk_rest.call(null,seq__15411_15434__$1);
var G__15437 = c__7604__auto___15435;
var G__15438 = cljs.core.count.call(null,c__7604__auto___15435);
var G__15439 = (0);
seq__15411_15422 = G__15436;
chunk__15412_15423 = G__15437;
count__15413_15424 = G__15438;
i__15414_15425 = G__15439;
continue;
} else {
var vec__15419_15440 = cljs.core.first.call(null,seq__15411_15434__$1);
var ev__7943__auto___15441 = cljs.core.nth.call(null,vec__15419_15440,(0),null);
var func__7944__auto___15442 = cljs.core.nth.call(null,vec__15419_15440,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___15441,func__7944__auto___15442);

var G__15443 = cljs.core.next.call(null,seq__15411_15434__$1);
var G__15444 = null;
var G__15445 = (0);
var G__15446 = (0);
seq__15411_15422 = G__15443;
chunk__15412_15423 = G__15444;
count__15413_15424 = G__15445;
i__15414_15425 = G__15446;
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
lt.objs.popup.popup_content = (function lt$objs$popup$popup_content(this$,opts){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),new cljs.core.Keyword(null,"header","header",119441134).cljs$core$IFn$_invoke$arity$1(opts)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(opts)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul.buttons","ul.buttons",165942935),(function (){var iter__7573__auto__ = (function lt$objs$popup$popup_content_$_iter__15461(s__15462){
return (new cljs.core.LazySeq(null,(function (){
var s__15462__$1 = s__15462;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__15462__$1);
if(temp__4657__auto__){
var s__15462__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__15462__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__15462__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__15464 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__15463 = (0);
while(true){
if((i__15463 < size__7572__auto__)){
var b = cljs.core._nth.call(null,c__7571__auto__,i__15463);
cljs.core.chunk_append.call(null,b__15464,lt.objs.popup.__GT_button.call(null,this$,b));

var G__15475 = (i__15463 + (1));
i__15463 = G__15475;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__15464),lt$objs$popup$popup_content_$_iter__15461.call(null,cljs.core.chunk_rest.call(null,s__15462__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__15464),null);
}
} else {
var b = cljs.core.first.call(null,s__15462__$2);
return cljs.core.cons.call(null,lt.objs.popup.__GT_button.call(null,this$,b),lt$objs$popup$popup_content_$_iter__15461.call(null,cljs.core.rest.call(null,s__15462__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__7573__auto__.call(null,cljs.core.reverse.call(null,new cljs.core.Keyword(null,"buttons","buttons",-1953831197).cljs$core$IFn$_invoke$arity$1(opts)));
})()], null)], null)], null));
var seq__15465_15476 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (e){
lt.util.dom.prevent.call(null,e);

return lt.util.dom.stop_propagation.call(null,e);
});})(e__7942__auto__))
], null)));
var chunk__15466_15477 = null;
var count__15467_15478 = (0);
var i__15468_15479 = (0);
while(true){
if((i__15468_15479 < count__15467_15478)){
var vec__15469_15480 = cljs.core._nth.call(null,chunk__15466_15477,i__15468_15479);
var ev__7943__auto___15481 = cljs.core.nth.call(null,vec__15469_15480,(0),null);
var func__7944__auto___15482 = cljs.core.nth.call(null,vec__15469_15480,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___15481,func__7944__auto___15482);

var G__15483 = seq__15465_15476;
var G__15484 = chunk__15466_15477;
var G__15485 = count__15467_15478;
var G__15486 = (i__15468_15479 + (1));
seq__15465_15476 = G__15483;
chunk__15466_15477 = G__15484;
count__15467_15478 = G__15485;
i__15468_15479 = G__15486;
continue;
} else {
var temp__4657__auto___15487 = cljs.core.seq.call(null,seq__15465_15476);
if(temp__4657__auto___15487){
var seq__15465_15488__$1 = temp__4657__auto___15487;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15465_15488__$1)){
var c__7604__auto___15489 = cljs.core.chunk_first.call(null,seq__15465_15488__$1);
var G__15490 = cljs.core.chunk_rest.call(null,seq__15465_15488__$1);
var G__15491 = c__7604__auto___15489;
var G__15492 = cljs.core.count.call(null,c__7604__auto___15489);
var G__15493 = (0);
seq__15465_15476 = G__15490;
chunk__15466_15477 = G__15491;
count__15467_15478 = G__15492;
i__15468_15479 = G__15493;
continue;
} else {
var vec__15472_15494 = cljs.core.first.call(null,seq__15465_15488__$1);
var ev__7943__auto___15495 = cljs.core.nth.call(null,vec__15472_15494,(0),null);
var func__7944__auto___15496 = cljs.core.nth.call(null,vec__15472_15494,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___15495,func__7944__auto___15496);

var G__15497 = cljs.core.next.call(null,seq__15465_15488__$1);
var G__15498 = null;
var G__15499 = (0);
var G__15500 = (0);
seq__15465_15476 = G__15497;
chunk__15466_15477 = G__15498;
count__15467_15478 = G__15499;
i__15468_15479 = G__15500;
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
lt.objs.popup.popup = (function lt$objs$popup$popup(this$,opts){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.popup","div.popup",-1910008373),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tabindex","tabindex",338877510),(-1)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),lt.objs.popup.popup_content.call(null,this$,opts)], null)], null));
var seq__15511_15521 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"click","click",1912301393));
});})(e__7942__auto__))
], null)));
var chunk__15512_15522 = null;
var count__15513_15523 = (0);
var i__15514_15524 = (0);
while(true){
if((i__15514_15524 < count__15513_15523)){
var vec__15515_15525 = cljs.core._nth.call(null,chunk__15512_15522,i__15514_15524);
var ev__7943__auto___15526 = cljs.core.nth.call(null,vec__15515_15525,(0),null);
var func__7944__auto___15527 = cljs.core.nth.call(null,vec__15515_15525,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___15526,func__7944__auto___15527);

var G__15528 = seq__15511_15521;
var G__15529 = chunk__15512_15522;
var G__15530 = count__15513_15523;
var G__15531 = (i__15514_15524 + (1));
seq__15511_15521 = G__15528;
chunk__15512_15522 = G__15529;
count__15513_15523 = G__15530;
i__15514_15524 = G__15531;
continue;
} else {
var temp__4657__auto___15532 = cljs.core.seq.call(null,seq__15511_15521);
if(temp__4657__auto___15532){
var seq__15511_15533__$1 = temp__4657__auto___15532;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15511_15533__$1)){
var c__7604__auto___15534 = cljs.core.chunk_first.call(null,seq__15511_15533__$1);
var G__15535 = cljs.core.chunk_rest.call(null,seq__15511_15533__$1);
var G__15536 = c__7604__auto___15534;
var G__15537 = cljs.core.count.call(null,c__7604__auto___15534);
var G__15538 = (0);
seq__15511_15521 = G__15535;
chunk__15512_15522 = G__15536;
count__15513_15523 = G__15537;
i__15514_15524 = G__15538;
continue;
} else {
var vec__15518_15539 = cljs.core.first.call(null,seq__15511_15533__$1);
var ev__7943__auto___15540 = cljs.core.nth.call(null,vec__15518_15539,(0),null);
var func__7944__auto___15541 = cljs.core.nth.call(null,vec__15518_15539,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___15540,func__7944__auto___15541);

var G__15542 = cljs.core.next.call(null,seq__15511_15533__$1);
var G__15543 = null;
var G__15544 = (0);
var G__15545 = (0);
seq__15511_15521 = G__15542;
chunk__15512_15522 = G__15543;
count__15513_15523 = G__15544;
i__15514_15524 = G__15545;
continue;
}
} else {
}
}
break;
}

return e__7942__auto__;
});
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.popup","popup","lt.objs.popup/popup",-600321309),new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"popup","popup",635890211),null], null), null),new cljs.core.Keyword(null,"button","button",1456579943),(0),new cljs.core.Keyword(null,"init","init",-1875481434),(function (this$,content){
return lt.objs.popup.popup.call(null,this$,content);
}));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"popup.exec-active","popup.exec-active",1247779871),new cljs.core.Keyword(null,"desc","desc",2093485764),"Popup: execute active option",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.context.__GT_obj.call(null,new cljs.core.Keyword(null,"popup","popup",635890211));
if(cljs.core.truth_(temp__4657__auto__)){
var p = temp__4657__auto__;
return lt.object.raise.call(null,p,new cljs.core.Keyword(null,"exec-active","exec-active",-1470413731));
} else {
return null;
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"popup.move-active","popup.move-active",1864029018),new cljs.core.Keyword(null,"desc","desc",2093485764),"Popup: move selection",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (dir){
var temp__4657__auto__ = lt.objs.context.__GT_obj.call(null,new cljs.core.Keyword(null,"popup","popup",635890211));
if(cljs.core.truth_(temp__4657__auto__)){
var p = temp__4657__auto__;
return lt.object.raise.call(null,p,new cljs.core.Keyword(null,"move-active","move-active",-410074174),dir);
} else {
return null;
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"popup.escape","popup.escape",96528977),new cljs.core.Keyword(null,"desc","desc",2093485764),"Popup: escape",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.context.__GT_obj.call(null,new cljs.core.Keyword(null,"popup","popup",635890211));
if(cljs.core.truth_(temp__4657__auto__)){
var p = temp__4657__auto__;
return lt.object.raise.call(null,p,new cljs.core.Keyword(null,"click","click",1912301393));
} else {
return null;
}
})], null));
lt.objs.popup.popup_BANG_ = (function lt$objs$popup$popup_BANG_(options){
var p = lt.object.create.call(null,new cljs.core.Keyword("lt.objs.popup","popup","lt.objs.popup/popup",-600321309),options);
lt.object.raise.call(null,p,new cljs.core.Keyword(null,"move-active","move-active",-410074174),(0));

lt.util.dom.append.call(null,lt.util.dom.$.call(null,new cljs.core.Keyword(null,"body","body",-2049205669)),lt.object.__GT_content.call(null,p));

lt.object.__GT_content.call(null,p).focus();

lt.objs.context.in_BANG_.call(null,new cljs.core.Keyword(null,"popup","popup",635890211),p);

return p;
});
lt.objs.popup.cancel_button = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"cancel",new cljs.core.Keyword(null,"action","action",-811238024),new cljs.core.Keyword(null,"cancel","cancel",-1964088360)], null);
