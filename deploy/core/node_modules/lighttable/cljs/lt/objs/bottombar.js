// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.objs.bottombar');
goog.require('cljs.core');
goog.require('lt.object');
goog.require('lt.util.cljs');
goog.require('lt.objs.canvas');
goog.require('lt.objs.tabs');
goog.require('lt.objs.animations');
goog.require('lt.util.style');
goog.require('crate.binding');
lt.objs.bottombar.min_height = (30);
lt.objs.bottombar.default_height = (130);
/**
 * 
 */
lt.objs.bottombar.horizontal_grip = (function lt$objs$bottombar$horizontal_grip(this$){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.horizontal-grip","div.horizontal-grip",944630986),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"draggable","draggable",1676206163),"true"], null)], null));
var seq__15079_15089 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dragstart","dragstart",955864218),((function (e__7942__auto__){
return (function (e){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"start-drag","start-drag",463492443));
});})(e__7942__auto__))
,new cljs.core.Keyword(null,"dragend","dragend",1096302264),((function (e__7942__auto__){
return (function (e){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"end-drag","end-drag",1040662768));
});})(e__7942__auto__))
,new cljs.core.Keyword(null,"drag","drag",449951290),((function (e__7942__auto__){
return (function (e){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"height!","height!",991943964),e);
});})(e__7942__auto__))
], null)));
var chunk__15080_15090 = null;
var count__15081_15091 = (0);
var i__15082_15092 = (0);
while(true){
if((i__15082_15092 < count__15081_15091)){
var vec__15083_15093 = cljs.core._nth.call(null,chunk__15080_15090,i__15082_15092);
var ev__7943__auto___15094 = cljs.core.nth.call(null,vec__15083_15093,(0),null);
var func__7944__auto___15095 = cljs.core.nth.call(null,vec__15083_15093,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___15094,func__7944__auto___15095);

var G__15096 = seq__15079_15089;
var G__15097 = chunk__15080_15090;
var G__15098 = count__15081_15091;
var G__15099 = (i__15082_15092 + (1));
seq__15079_15089 = G__15096;
chunk__15080_15090 = G__15097;
count__15081_15091 = G__15098;
i__15082_15092 = G__15099;
continue;
} else {
var temp__4657__auto___15100 = cljs.core.seq.call(null,seq__15079_15089);
if(temp__4657__auto___15100){
var seq__15079_15101__$1 = temp__4657__auto___15100;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15079_15101__$1)){
var c__7604__auto___15102 = cljs.core.chunk_first.call(null,seq__15079_15101__$1);
var G__15103 = cljs.core.chunk_rest.call(null,seq__15079_15101__$1);
var G__15104 = c__7604__auto___15102;
var G__15105 = cljs.core.count.call(null,c__7604__auto___15102);
var G__15106 = (0);
seq__15079_15089 = G__15103;
chunk__15080_15090 = G__15104;
count__15081_15091 = G__15105;
i__15082_15092 = G__15106;
continue;
} else {
var vec__15086_15107 = cljs.core.first.call(null,seq__15079_15101__$1);
var ev__7943__auto___15108 = cljs.core.nth.call(null,vec__15086_15107,(0),null);
var func__7944__auto___15109 = cljs.core.nth.call(null,vec__15086_15107,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___15108,func__7944__auto___15109);

var G__15110 = cljs.core.next.call(null,seq__15079_15101__$1);
var G__15111 = null;
var G__15112 = (0);
var G__15113 = (0);
seq__15079_15089 = G__15110;
chunk__15080_15090 = G__15111;
count__15081_15091 = G__15112;
i__15082_15092 = G__15113;
continue;
}
} else {
}
}
break;
}

return e__7942__auto__;
});
lt.objs.bottombar.active_content = (function lt$objs$bottombar$active_content(active){
if(cljs.core.truth_(active)){
return lt.object.__GT_content.call(null,active);
} else {
return null;
}
});
lt.objs.bottombar.active_QMARK_ = (function lt$objs$bottombar$active_QMARK_(item){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"active","active",1895962068).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.bottombar.bottombar)),item);
});
lt.objs.bottombar.__GT_active_class = (function lt$objs$bottombar$__GT_active_class(p__15114){
var map__15117 = p__15114;
var map__15117__$1 = ((((!((map__15117 == null)))?((((map__15117.cljs$lang$protocol_mask$partition0$ & (64))) || (map__15117.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15117):map__15117);
var active = cljs.core.get.call(null,map__15117__$1,new cljs.core.Keyword(null,"active","active",1895962068));
if(cljs.core.truth_(active)){
return "open";
} else {
return "closed";
}
});
lt.objs.bottombar.add_item = (function lt$objs$bottombar$add_item(item){
return lt.object.update_BANG_.call(null,lt.objs.bottombar.bottombar,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"items","items",1031954938)], null),cljs.core.assoc,new cljs.core.Keyword(null,"order","order",-1254677256).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,item)),item);
});
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.bottombar","bottombar","lt.objs.bottombar/bottombar",-1926438797),new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"bottombar","bottombar",-1253677809),null], null), null),new cljs.core.Keyword(null,"items","items",1031954938),cljs.core.sorted_map_by.call(null,cljs.core._GT_),new cljs.core.Keyword(null,"height","height",1025178622),(0),new cljs.core.Keyword(null,"max-height","max-height",-612563804),lt.objs.bottombar.default_height,new cljs.core.Keyword(null,"init","init",-1875481434),(function (this$){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#bottombar","div#bottombar",407265682),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"class","class",-2030961996),crate.binding.bound.call(null,this$,lt.objs.bottombar.__GT_active_class),new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"left","left",-399115937),crate.binding.bound.call(null,crate.binding.subatom.call(null,lt.objs.tabs.multi,new cljs.core.Keyword(null,"left","left",-399115937)),lt.util.style.__GT_px),new cljs.core.Keyword(null,"right","right",-452581833),crate.binding.bound.call(null,crate.binding.subatom.call(null,lt.objs.tabs.multi,new cljs.core.Keyword(null,"right","right",-452581833)),lt.util.style.__GT_px),new cljs.core.Keyword(null,"height","height",1025178622),crate.binding.bound.call(null,crate.binding.subatom.call(null,this$,new cljs.core.Keyword(null,"height","height",1025178622)),lt.util.style.__GT_px)], null)], null),lt.objs.bottombar.horizontal_grip.call(null,this$),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.content","div.content",-298042649),crate.binding.bound.call(null,crate.binding.subatom.call(null,this$,new cljs.core.Keyword(null,"active","active",1895962068)),lt.objs.bottombar.active_content)], null)], null);
}));
lt.objs.bottombar.bottombar = lt.object.create.call(null,new cljs.core.Keyword("lt.objs.bottombar","bottombar","lt.objs.bottombar/bottombar",-1926438797));
lt.objs.canvas.add_BANG_.call(null,lt.objs.bottombar.bottombar);
/**
 * 
 */
lt.objs.bottombar.__BEH__no_anim_on_drag = (function lt$objs$bottombar$__BEH__no_anim_on_drag(this$){
return lt.objs.animations.off.call(null);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.bottombar","no-anim-on-drag","lt.objs.bottombar/no-anim-on-drag",-370197607),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"start-drag","start-drag",463492443),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.bottombar.__BEH__no_anim_on_drag);
/**
 * 
 */
lt.objs.bottombar.__BEH__reanim_on_drop = (function lt$objs$bottombar$__BEH__reanim_on_drop(this$){
return lt.objs.animations.on.call(null);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.bottombar","reanim-on-drop","lt.objs.bottombar/reanim-on-drop",-134608296),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"end-drag","end-drag",1040662768),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.bottombar.__BEH__reanim_on_drop);
/**
 * 
 */
lt.objs.bottombar.__BEH__height_BANG_ = (function lt$objs$bottombar$__BEH__height_BANG_(this$,e){
if(cljs.core._EQ_.call(null,(0),e.clientY)){
return null;
} else {
var win_height = window.innerHeight;
var height = (function (){var x__7124__auto__ = (win_height - e.clientY);
var y__7125__auto__ = lt.objs.bottombar.min_height;
return ((x__7124__auto__ > y__7125__auto__) ? x__7124__auto__ : y__7125__auto__);
})();
lt.object.raise.call(null,lt.objs.tabs.multi,new cljs.core.Keyword(null,"bottom!","bottom!",-1649454228),(height - new cljs.core.Keyword(null,"height","height",1025178622).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))));

return lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"height","height",1025178622),height,new cljs.core.Keyword(null,"max-height","max-height",-612563804),height], null));
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.bottombar","height!","lt.objs.bottombar/height!",1235836728),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"height!","height!",991943964),null], null), null),new cljs.core.Keyword(null,"throttle","throttle",-1860340776),(16),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.bottombar.__BEH__height_BANG_);
/**
 * 
 */
lt.objs.bottombar.__BEH__show_item = (function lt$objs$bottombar$__BEH__show_item(this$,item){
if(cljs.core.not_EQ_.call(null,item,new cljs.core.Keyword(null,"active","active",1895962068).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)))){
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"active","active",1895962068),item,new cljs.core.Keyword(null,"height","height",1025178622),new cljs.core.Keyword(null,"max-height","max-height",-612563804).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))], null));

return lt.object.raise.call(null,lt.objs.tabs.multi,new cljs.core.Keyword(null,"bottom!","bottom!",-1649454228),new cljs.core.Keyword(null,"max-height","max-height",-612563804).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.bottombar","show-item","lt.objs.bottombar/show-item",-240401427),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"show!","show!",1939158011),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.bottombar.__BEH__show_item);
/**
 * 
 */
lt.objs.bottombar.__BEH__hide_item = (function lt$objs$bottombar$__BEH__hide_item(this$,item,force_QMARK_){
if(cljs.core.truth_((function (){var or__6793__auto__ = cljs.core._EQ_.call(null,item,new cljs.core.Keyword(null,"active","active",1895962068).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
if(or__6793__auto__){
return or__6793__auto__;
} else {
return force_QMARK_;
}
})())){
lt.object.raise.call(null,lt.objs.tabs.multi,new cljs.core.Keyword(null,"bottom!","bottom!",-1649454228),(- new cljs.core.Keyword(null,"max-height","max-height",-612563804).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))));

return lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"active","active",1895962068),null,new cljs.core.Keyword(null,"height","height",1025178622),(0)], null));
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.bottombar","hide-item","lt.objs.bottombar/hide-item",1209243201),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"hide!","hide!",-2041470693),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.bottombar.__BEH__hide_item);
/**
 * 
 */
lt.objs.bottombar.__BEH__item_toggled = (function lt$objs$bottombar$__BEH__item_toggled(this$,item,force_QMARK_){
if(cljs.core.truth_((function (){var or__6793__auto__ = cljs.core.not_EQ_.call(null,item,new cljs.core.Keyword(null,"active","active",1895962068).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
if(or__6793__auto__){
return or__6793__auto__;
} else {
return force_QMARK_;
}
})())){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"show!","show!",1939158011),item);
} else {
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"hide!","hide!",-2041470693),item);
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.bottombar","item-toggled","lt.objs.bottombar/item-toggled",-880091871),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"toggle","toggle",1291842030),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.bottombar.__BEH__item_toggled);
