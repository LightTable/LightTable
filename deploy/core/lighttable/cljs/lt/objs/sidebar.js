// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.objs.sidebar');
goog.require('cljs.core');
goog.require('lt.objs.command');
goog.require('lt.object');
goog.require('lt.util.dom');
goog.require('lt.util.cljs');
goog.require('lt.objs.canvas');
goog.require('lt.objs.tabs');
goog.require('lt.objs.animations');
goog.require('crate.binding');
lt.objs.sidebar.default_width = (200);
/**
 * 
 */
lt.objs.sidebar.vertical_grip = (function lt$objs$sidebar$vertical_grip(this$){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.vertical-grip","div.vertical-grip",-30981806),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"draggable","draggable",1676206163),"true"], null)], null));
var seq__15624_15634 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dragstart","dragstart",955864218),((function (e__7942__auto__){
return (function (e){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"start-drag","start-drag",463492443));
});})(e__7942__auto__))
,new cljs.core.Keyword(null,"dragend","dragend",1096302264),((function (e__7942__auto__){
return (function (e){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"end-drag","end-drag",1040662768));
});})(e__7942__auto__))
,new cljs.core.Keyword(null,"drag","drag",449951290),((function (e__7942__auto__){
return (function (e){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"width!","width!",-1196918001),e);
});})(e__7942__auto__))
], null)));
var chunk__15625_15635 = null;
var count__15626_15636 = (0);
var i__15627_15637 = (0);
while(true){
if((i__15627_15637 < count__15626_15636)){
var vec__15628_15638 = cljs.core._nth.call(null,chunk__15625_15635,i__15627_15637);
var ev__7943__auto___15639 = cljs.core.nth.call(null,vec__15628_15638,(0),null);
var func__7944__auto___15640 = cljs.core.nth.call(null,vec__15628_15638,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___15639,func__7944__auto___15640);

var G__15641 = seq__15624_15634;
var G__15642 = chunk__15625_15635;
var G__15643 = count__15626_15636;
var G__15644 = (i__15627_15637 + (1));
seq__15624_15634 = G__15641;
chunk__15625_15635 = G__15642;
count__15626_15636 = G__15643;
i__15627_15637 = G__15644;
continue;
} else {
var temp__4657__auto___15645 = cljs.core.seq.call(null,seq__15624_15634);
if(temp__4657__auto___15645){
var seq__15624_15646__$1 = temp__4657__auto___15645;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15624_15646__$1)){
var c__7604__auto___15647 = cljs.core.chunk_first.call(null,seq__15624_15646__$1);
var G__15648 = cljs.core.chunk_rest.call(null,seq__15624_15646__$1);
var G__15649 = c__7604__auto___15647;
var G__15650 = cljs.core.count.call(null,c__7604__auto___15647);
var G__15651 = (0);
seq__15624_15634 = G__15648;
chunk__15625_15635 = G__15649;
count__15626_15636 = G__15650;
i__15627_15637 = G__15651;
continue;
} else {
var vec__15631_15652 = cljs.core.first.call(null,seq__15624_15646__$1);
var ev__7943__auto___15653 = cljs.core.nth.call(null,vec__15631_15652,(0),null);
var func__7944__auto___15654 = cljs.core.nth.call(null,vec__15631_15652,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___15653,func__7944__auto___15654);

var G__15655 = cljs.core.next.call(null,seq__15624_15646__$1);
var G__15656 = null;
var G__15657 = (0);
var G__15658 = (0);
seq__15624_15634 = G__15655;
chunk__15625_15635 = G__15656;
count__15626_15636 = G__15657;
i__15627_15637 = G__15658;
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
lt.objs.sidebar.__BEH__no_anim_on_drag = (function lt$objs$sidebar$__BEH__no_anim_on_drag(this$){
return lt.objs.animations.off.call(null);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar","no-anim-on-drag","lt.objs.sidebar/no-anim-on-drag",410652933),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"start-drag","start-drag",463492443),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.__BEH__no_anim_on_drag);
/**
 * 
 */
lt.objs.sidebar.__BEH__reanim_on_drop = (function lt$objs$sidebar$__BEH__reanim_on_drop(this$){
return lt.objs.animations.on.call(null);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar","reanim-on-drop","lt.objs.sidebar/reanim-on-drop",-1502651388),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"end-drag","end-drag",1040662768),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.__BEH__reanim_on_drop);
/**
 * 
 */
lt.objs.sidebar.__BEH__width_BANG_ = (function lt$objs$sidebar$__BEH__width_BANG_(this$,e){
if(cljs.core._EQ_.call(null,(0),e.clientX)){
return null;
} else {
var width = ((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"side","side",389652279).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),new cljs.core.Keyword(null,"left","left",-399115937)))?e.clientX:(lt.util.dom.width.call(null,document.body) - e.clientX));
lt.object.merge_BANG_.call(null,lt.objs.tabs.multi,cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"side","side",389652279).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),width], true, false));

return lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"width","width",-384071477),width,new cljs.core.Keyword(null,"max-width","max-width",-1939924051),width], null));
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar","width!","lt.objs.sidebar/width!",1654377631),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"width!","width!",-1196918001),null], null), null),new cljs.core.Keyword(null,"throttle","throttle",-1860340776),(5),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.__BEH__width_BANG_);
/**
 * 
 */
lt.objs.sidebar.__BEH__pop_transient = (function lt$objs$sidebar$__BEH__pop_transient(this$){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"close!","close!",-2079310498));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar","pop-transient","lt.objs.sidebar/pop-transient",1964854124),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"pop!","pop!",1401052258),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.__BEH__pop_transient);
/**
 * 
 */
lt.objs.sidebar.__BEH__open_BANG_ = (function lt$objs$sidebar$__BEH__open_BANG_(this$){
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"width","width",-384071477),new cljs.core.Keyword(null,"max-width","max-width",-1939924051).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),new cljs.core.Keyword(null,"open","open",-1763596448),true], null));

lt.object.merge_BANG_.call(null,lt.objs.tabs.multi,cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"side","side",389652279).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),new cljs.core.Keyword(null,"max-width","max-width",-1939924051).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))], true, false));

return lt.util.dom.add_class.call(null,lt.object.__GT_content.call(null,new cljs.core.Keyword(null,"active","active",1895962068).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))),new cljs.core.Keyword(null,"active","active",1895962068));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar","open!","lt.objs.sidebar/open!",-1691961252),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"open!","open!",1145596908),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.__BEH__open_BANG_);
/**
 * 
 */
lt.objs.sidebar.__BEH__close_BANG_ = (function lt$objs$sidebar$__BEH__close_BANG_(this$,no_focus){
if(cljs.core.truth_(new cljs.core.Keyword(null,"active","active",1895962068).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)))){
lt.util.dom.remove_class.call(null,lt.object.__GT_content.call(null,new cljs.core.Keyword(null,"active","active",1895962068).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))),new cljs.core.Keyword(null,"active","active",1895962068));
} else {
}

lt.object.merge_BANG_.call(null,lt.objs.tabs.multi,cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"side","side",389652279).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),(0)], true, false));

lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"width","width",-384071477),(0),new cljs.core.Keyword(null,"active","active",1895962068),false,new cljs.core.Keyword(null,"open","open",-1763596448),false], null));

if(cljs.core.truth_(no_focus)){
return null;
} else {
return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"tabs.focus-active","tabs.focus-active",-2052283963));
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar","close!","lt.objs.sidebar/close!",-1574097426),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"close!","close!",-2079310498),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.__BEH__close_BANG_);
/**
 * 
 */
lt.objs.sidebar.__BEH__item_toggled = (function lt$objs$sidebar$__BEH__item_toggled(this$,item,p__15659){
var map__15662 = p__15659;
var map__15662__$1 = ((((!((map__15662 == null)))?((((map__15662.cljs$lang$protocol_mask$partition0$ & (64))) || (map__15662.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15662):map__15662);
var force_QMARK_ = cljs.core.get.call(null,map__15662__$1,new cljs.core.Keyword(null,"force?","force?",1839038675));
var transient_QMARK_ = cljs.core.get.call(null,map__15662__$1,new cljs.core.Keyword(null,"transient?","transient?",1694525927));
var soft_QMARK_ = cljs.core.get.call(null,map__15662__$1,new cljs.core.Keyword(null,"soft?","soft?",-1339668477));
if(cljs.core.truth_((function (){var and__6781__auto__ = cljs.core.not.call(null,force_QMARK_);
if(and__6781__auto__){
var and__6781__auto____$1 = cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"active","active",1895962068).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),item);
if(and__6781__auto____$1){
return new cljs.core.Keyword(null,"open","open",-1763596448).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$));
} else {
return and__6781__auto____$1;
}
} else {
return and__6781__auto__;
}
})())){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"close!","close!",-2079310498));
} else {
if(cljs.core.not_EQ_.call(null,new cljs.core.Keyword(null,"active","active",1895962068).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),item)){
if(cljs.core.truth_(new cljs.core.Keyword(null,"active","active",1895962068).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)))){
lt.util.dom.remove_class.call(null,lt.object.__GT_content.call(null,new cljs.core.Keyword(null,"active","active",1895962068).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))),new cljs.core.Keyword(null,"active","active",1895962068));
} else {
}

lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"active","active",1895962068),item], null));

lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"open!","open!",1145596908));

if(cljs.core.truth_(soft_QMARK_)){
return null;
} else {
return lt.object.raise.call(null,item,new cljs.core.Keyword(null,"show","show",-576705889));
}
} else {
return null;
}
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar","item-toggled","lt.objs.sidebar/item-toggled",-1682068843),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"toggle","toggle",1291842030),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.__BEH__item_toggled);
lt.objs.sidebar.active_content = (function lt$objs$sidebar$active_content(active){
if(cljs.core.truth_(active)){
return lt.object.__GT_content.call(null,active);
} else {
return null;
}
});
lt.objs.sidebar.__GT_width = (function lt$objs$sidebar$__GT_width(width){
return [cljs.core.str((function (){var or__6793__auto__ = width;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return (0);
}
})()),cljs.core.str("px")].join('');
});
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar","sidebar","lt.objs.sidebar/sidebar",604744314),new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"sidebar","sidebar",35784458),null], null), null),new cljs.core.Keyword(null,"items","items",1031954938),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"width","width",-384071477),(0),new cljs.core.Keyword(null,"side","side",389652279),new cljs.core.Keyword(null,"left","left",-399115937),new cljs.core.Keyword(null,"transients","transients",122956384),cljs.core.List.EMPTY,new cljs.core.Keyword(null,"max-width","max-width",-1939924051),lt.objs.sidebar.default_width,new cljs.core.Keyword(null,"init","init",-1875481434),(function (this$){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#side","div#side",-617290963),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"width","width",-384071477),crate.binding.bound.call(null,crate.binding.subatom.call(null,this$,new cljs.core.Keyword(null,"width","width",-384071477)),lt.objs.sidebar.__GT_width)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.content","div.content",-298042649),crate.binding.bound.call(null,crate.binding.subatom.call(null,this$,new cljs.core.Keyword(null,"active","active",1895962068)),lt.objs.sidebar.active_content)], null),lt.objs.sidebar.vertical_grip.call(null,this$)], null);
}));
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar","right-bar","lt.objs.sidebar/right-bar",-1634630552),new cljs.core.Keyword(null,"items","items",1031954938),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"sidebar","sidebar",35784458),null], null), null),new cljs.core.Keyword(null,"width","width",-384071477),(0),new cljs.core.Keyword(null,"side","side",389652279),new cljs.core.Keyword(null,"right","right",-452581833),new cljs.core.Keyword(null,"max-width","max-width",-1939924051),(300),new cljs.core.Keyword(null,"init","init",-1875481434),(function (this$){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#right-bar","div#right-bar",1222357763),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"width","width",-384071477),crate.binding.bound.call(null,crate.binding.subatom.call(null,this$,new cljs.core.Keyword(null,"width","width",-384071477)),lt.objs.sidebar.__GT_width)], null)], null),lt.objs.sidebar.vertical_grip.call(null,this$),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.content","div.content",-298042649)], null)], null);
}));
lt.objs.sidebar.sidebar = lt.object.create.call(null,new cljs.core.Keyword("lt.objs.sidebar","sidebar","lt.objs.sidebar/sidebar",604744314));
lt.objs.sidebar.rightbar = lt.object.create.call(null,new cljs.core.Keyword("lt.objs.sidebar","right-bar","lt.objs.sidebar/right-bar",-1634630552));
lt.objs.canvas.add_BANG_.call(null,lt.objs.sidebar.sidebar);
lt.objs.canvas.add_BANG_.call(null,lt.objs.sidebar.rightbar);
lt.objs.sidebar.add_item = (function lt$objs$sidebar$add_item(bar,item){
lt.object.update_BANG_.call(null,bar,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"items","items",1031954938)], null),cljs.core.assoc,new cljs.core.Keyword(null,"order","order",-1254677256).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,item)),item);

return lt.util.dom.append.call(null,lt.util.dom.$.call(null,new cljs.core.Keyword(null,".content",".content",528321340),lt.object.__GT_content.call(null,bar)),lt.object.__GT_content.call(null,item));
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"close-sidebar","close-sidebar",-480192451),new cljs.core.Keyword(null,"desc","desc",2093485764),"Sidebar: close",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.object.raise.call(null,lt.objs.sidebar.rightbar,new cljs.core.Keyword(null,"close!","close!",-2079310498));
})], null));
