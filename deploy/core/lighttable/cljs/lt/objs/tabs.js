// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.objs.tabs');
goog.require('cljs.core');
goog.require('lt.objs.command');
goog.require('lt.objs.context');
goog.require('lt.objs.editor');
goog.require('crate.core');
goog.require('lt.object');
goog.require('lt.util.dom');
goog.require('lt.objs.menu');
goog.require('lt.objs.canvas');
goog.require('lt.util.load');
goog.require('lt.objs.animations');
goog.require('lt.util.js');
goog.require('lt.util.style');
goog.require('crate.binding');
lt.util.load.js.call(null,"core/node_modules/lighttable/ui/dragdrop.js",new cljs.core.Keyword(null,"sync","sync",-624148946));
lt.objs.tabs.multi_def = lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.tabs","multi-editor2","lt.objs.tabs/multi-editor2",-1442267821),new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tabs","tabs",-779855354),null], null), null),new cljs.core.Keyword(null,"tabsets","tabsets",-1794190722),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"left","left",-399115937),(0),new cljs.core.Keyword(null,"right","right",-452581833),(0),new cljs.core.Keyword(null,"bottom","bottom",-1550509018),(0),new cljs.core.Keyword(null,"init","init",-1875481434),(function (this$){
var tabsets = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.tabsets","div.tabsets",1775084695),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"bottom","bottom",-1550509018),crate.binding.bound.call(null,crate.binding.subatom.call(null,this$,new cljs.core.Keyword(null,"tabset-bottom","tabset-bottom",-1366151689)),lt.util.style.__GT_px)], null)], null)], null));
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tabsets-elem","tabsets-elem",54132282),tabsets], null));

lt.objs.context.in_BANG_.call(null,new cljs.core.Keyword(null,"tabs","tabs",-779855354),this$);

return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#multi","div#multi",1712435508),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"left","left",-399115937),crate.binding.bound.call(null,crate.binding.subatom.call(null,this$,new cljs.core.Keyword(null,"left","left",-399115937)),lt.util.style.__GT_px),new cljs.core.Keyword(null,"right","right",-452581833),crate.binding.bound.call(null,crate.binding.subatom.call(null,this$,new cljs.core.Keyword(null,"right","right",-452581833)),lt.util.style.__GT_px),new cljs.core.Keyword(null,"bottom","bottom",-1550509018),crate.binding.bound.call(null,crate.binding.subatom.call(null,this$,new cljs.core.Keyword(null,"bottom","bottom",-1550509018)),lt.util.style.__GT_px)], null)], null),tabsets], null);
}));
lt.objs.tabs.multi = lt.object.create.call(null,lt.objs.tabs.multi_def);
lt.objs.tabs.ensure_visible = (function lt$objs$tabs$ensure_visible(idx,tabset){
var temp__4657__auto__ = (lt.util.dom.$$.call(null,".list li",lt.object.__GT_content.call(null,tabset))[idx]);
if(cljs.core.truth_(temp__4657__auto__)){
var cur = temp__4657__auto__;
var left = cur.offsetLeft;
var width = cur.clientWidth;
var right = (left + width);
var gp = lt.util.dom.parent.call(null,lt.util.dom.parent.call(null,cur));
var pwidth = gp.clientWidth;
var pleft = gp.scrollLeft;
var pright = (pleft + pwidth);
var inside = ((left >= pleft)) && ((right <= pright));
if(inside){
return null;
} else {
if((pleft > left)){
return gp.scrollLeft = (left - (50));
} else {
return gp.scrollLeft = ((right - pwidth) + (50));
}
}
} else {
return null;
}
});
lt.objs.tabs.__GT_index = (function lt$objs$tabs$__GT_index(obj){
if(cljs.core.truth_((function (){var and__6781__auto__ = obj;
if(cljs.core.truth_(and__6781__auto__)){
var and__6781__auto____$1 = cljs.core.deref.call(null,obj);
if(cljs.core.truth_(and__6781__auto____$1)){
return new cljs.core.Keyword("lt.objs.tabs","tabset","lt.objs.tabs/tabset",537008529).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,obj));
} else {
return and__6781__auto____$1;
}
} else {
return and__6781__auto__;
}
})())){
return cljs.core.first.call(null,cljs.core.first.call(null,cljs.core.filter.call(null,(function (p1__14637_SHARP_){
return cljs.core._EQ_.call(null,obj,cljs.core.second.call(null,p1__14637_SHARP_));
}),cljs.core.map_indexed.call(null,cljs.core.vector,new cljs.core.Keyword(null,"objs","objs",-1810725634).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,new cljs.core.Keyword("lt.objs.tabs","tabset","lt.objs.tabs/tabset",537008529).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,obj))))))));
} else {
return null;
}
});
lt.objs.tabs.active_BANG_ = (function lt$objs$tabs$active_BANG_(obj){
if(cljs.core.truth_((function (){var and__6781__auto__ = obj;
if(cljs.core.truth_(and__6781__auto__)){
return new cljs.core.Keyword("lt.objs.tabs","tabset","lt.objs.tabs/tabset",537008529).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,obj));
} else {
return and__6781__auto__;
}
})())){
lt.object.merge_BANG_.call(null,new cljs.core.Keyword("lt.objs.tabs","tabset","lt.objs.tabs/tabset",537008529).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,obj)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"active-obj","active-obj",-1861497999),obj], null));

lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"show","show",-576705889));

return lt.objs.tabs.ensure_visible.call(null,lt.objs.tabs.__GT_index.call(null,obj),new cljs.core.Keyword("lt.objs.tabs","tabset","lt.objs.tabs/tabset",537008529).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,obj)));
} else {
return null;
}
});
lt.objs.tabs.update_tab_order = (function lt$objs$tabs$update_tab_order(multi,children){
var ser = ((cljs.core.vector_QMARK_.call(null,children))?children:cljs.core.map.call(null,(function (p1__14638_SHARP_){
return lt.util.dom.attr.call(null,p1__14638_SHARP_,new cljs.core.Keyword(null,"pos","pos",-864607220));
}),children));
var prev_active = new cljs.core.Keyword(null,"active-obj","active-obj",-1861497999).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,multi));
lt.object.merge_BANG_.call(null,multi,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"objs","objs",-1810725634),cljs.core.mapv.call(null,new cljs.core.Keyword(null,"objs","objs",-1810725634).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,multi)),ser),new cljs.core.Keyword(null,"active-obj","active-obj",-1861497999),null], null));

return lt.objs.tabs.active_BANG_.call(null,prev_active);
});
lt.objs.tabs.__GT_name = (function lt$objs$tabs$__GT_name(e){
var or__6793__auto__ = cljs.core.get_in.call(null,cljs.core.deref.call(null,e),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",-317069002),new cljs.core.Keyword(null,"name","name",1843675177)], null));
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
var or__6793__auto____$1 = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,e));
if(cljs.core.truth_(or__6793__auto____$1)){
return or__6793__auto____$1;
} else {
return "unknown";
}
}
});
lt.objs.tabs.__GT_path = (function lt$objs$tabs$__GT_path(e){
var or__6793__auto__ = cljs.core.get_in.call(null,cljs.core.deref.call(null,e),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",-317069002),new cljs.core.Keyword(null,"path","path",-188191168)], null));
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
var or__6793__auto____$1 = new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,e));
if(cljs.core.truth_(or__6793__auto____$1)){
return or__6793__auto____$1;
} else {
return "";
}
}
});
lt.objs.tabs.active_QMARK_ = (function lt$objs$tabs$active_QMARK_(c,e,multi){
return [cljs.core.str(c),cljs.core.str(((cljs.core._EQ_.call(null,cljs.core.deref.call(null,multi).call(null,new cljs.core.Keyword(null,"active-obj","active-obj",-1861497999)),e))?" active":null))].join('');
});
lt.objs.tabs.dirty_QMARK_ = (function lt$objs$tabs$dirty_QMARK_(c,e){
return [cljs.core.str(c),cljs.core.str((cljs.core.truth_(new cljs.core.Keyword(null,"dirty","dirty",729553281).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,e)))?" dirty":null))].join('');
});
/**
 * 
 */
lt.objs.tabs.close_tab = (function lt$objs$tabs$close_tab(obj){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.tab-close","span.tab-close",-1995978636),"x"], null));
var seq__14649_14659 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (){
return lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"close","close",1835149582));
});})(e__7942__auto__))
], null)));
var chunk__14650_14660 = null;
var count__14651_14661 = (0);
var i__14652_14662 = (0);
while(true){
if((i__14652_14662 < count__14651_14661)){
var vec__14653_14663 = cljs.core._nth.call(null,chunk__14650_14660,i__14652_14662);
var ev__7943__auto___14664 = cljs.core.nth.call(null,vec__14653_14663,(0),null);
var func__7944__auto___14665 = cljs.core.nth.call(null,vec__14653_14663,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___14664,func__7944__auto___14665);

var G__14666 = seq__14649_14659;
var G__14667 = chunk__14650_14660;
var G__14668 = count__14651_14661;
var G__14669 = (i__14652_14662 + (1));
seq__14649_14659 = G__14666;
chunk__14650_14660 = G__14667;
count__14651_14661 = G__14668;
i__14652_14662 = G__14669;
continue;
} else {
var temp__4657__auto___14670 = cljs.core.seq.call(null,seq__14649_14659);
if(temp__4657__auto___14670){
var seq__14649_14671__$1 = temp__4657__auto___14670;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14649_14671__$1)){
var c__7604__auto___14672 = cljs.core.chunk_first.call(null,seq__14649_14671__$1);
var G__14673 = cljs.core.chunk_rest.call(null,seq__14649_14671__$1);
var G__14674 = c__7604__auto___14672;
var G__14675 = cljs.core.count.call(null,c__7604__auto___14672);
var G__14676 = (0);
seq__14649_14659 = G__14673;
chunk__14650_14660 = G__14674;
count__14651_14661 = G__14675;
i__14652_14662 = G__14676;
continue;
} else {
var vec__14656_14677 = cljs.core.first.call(null,seq__14649_14671__$1);
var ev__7943__auto___14678 = cljs.core.nth.call(null,vec__14656_14677,(0),null);
var func__7944__auto___14679 = cljs.core.nth.call(null,vec__14656_14677,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___14678,func__7944__auto___14679);

var G__14680 = cljs.core.next.call(null,seq__14649_14671__$1);
var G__14681 = null;
var G__14682 = (0);
var G__14683 = (0);
seq__14649_14659 = G__14680;
chunk__14650_14660 = G__14681;
count__14651_14661 = G__14682;
i__14652_14662 = G__14683;
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
lt.objs.tabs.item = (function lt$objs$tabs$item(label,multi,e,pos){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"class","class",-2030961996),lt.objs.tabs.dirty_QMARK_.call(null,lt.objs.tabs.active_QMARK_.call(null," ",e,multi),e),new cljs.core.Keyword(null,"draggable","draggable",1676206163),"true",new cljs.core.Keyword(null,"title","title",636505583),lt.objs.tabs.__GT_path.call(null,e),new cljs.core.Keyword(null,"obj-id","obj-id",1871733713),lt.object.__GT_id.call(null,e),new cljs.core.Keyword(null,"pos","pos",-864607220),pos], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.file-name","span.file-name",-605410282),lt.objs.tabs.__GT_name.call(null,e)], null),(cljs.core.truth_(lt.object.raise_reduce.call(null,e,new cljs.core.Keyword(null,"close-button+","close-button+",242728201),false))?lt.objs.tabs.close_tab.call(null,label):null)], null));
var seq__14694_14704 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"mouseup","mouseup",350619456),((function (e__7942__auto__){
return (function (ev){
if(cljs.core.truth_((function (){var or__6793__auto__ = cljs.core._EQ_.call(null,(1),ev.button);
if(or__6793__auto__){
return or__6793__auto__;
} else {
return ev.metaKey;
}
})())){
return lt.util.dom.prevent.call(null,ev);
} else {
return null;
}
});})(e__7942__auto__))
,new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (ev){
if(cljs.core.truth_((function (){var or__6793__auto__ = cljs.core._EQ_.call(null,(1),ev.button);
if(or__6793__auto__){
return or__6793__auto__;
} else {
return ev.metaKey;
}
})())){
return lt.object.raise.call(null,label,new cljs.core.Keyword(null,"close","close",1835149582));
} else {
return lt.objs.tabs.active_BANG_.call(null,e);
}
});})(e__7942__auto__))
,new cljs.core.Keyword(null,"contextmenu","contextmenu",-15887481),((function (e__7942__auto__){
return (function (ev){
return lt.object.raise.call(null,label,new cljs.core.Keyword(null,"menu!","menu!",-1593399467),ev);
});})(e__7942__auto__))
], null)));
var chunk__14695_14705 = null;
var count__14696_14706 = (0);
var i__14697_14707 = (0);
while(true){
if((i__14697_14707 < count__14696_14706)){
var vec__14698_14708 = cljs.core._nth.call(null,chunk__14695_14705,i__14697_14707);
var ev__7943__auto___14709 = cljs.core.nth.call(null,vec__14698_14708,(0),null);
var func__7944__auto___14710 = cljs.core.nth.call(null,vec__14698_14708,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___14709,func__7944__auto___14710);

var G__14711 = seq__14694_14704;
var G__14712 = chunk__14695_14705;
var G__14713 = count__14696_14706;
var G__14714 = (i__14697_14707 + (1));
seq__14694_14704 = G__14711;
chunk__14695_14705 = G__14712;
count__14696_14706 = G__14713;
i__14697_14707 = G__14714;
continue;
} else {
var temp__4657__auto___14715 = cljs.core.seq.call(null,seq__14694_14704);
if(temp__4657__auto___14715){
var seq__14694_14716__$1 = temp__4657__auto___14715;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14694_14716__$1)){
var c__7604__auto___14717 = cljs.core.chunk_first.call(null,seq__14694_14716__$1);
var G__14718 = cljs.core.chunk_rest.call(null,seq__14694_14716__$1);
var G__14719 = c__7604__auto___14717;
var G__14720 = cljs.core.count.call(null,c__7604__auto___14717);
var G__14721 = (0);
seq__14694_14704 = G__14718;
chunk__14695_14705 = G__14719;
count__14696_14706 = G__14720;
i__14697_14707 = G__14721;
continue;
} else {
var vec__14701_14722 = cljs.core.first.call(null,seq__14694_14716__$1);
var ev__7943__auto___14723 = cljs.core.nth.call(null,vec__14701_14722,(0),null);
var func__7944__auto___14724 = cljs.core.nth.call(null,vec__14701_14722,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___14723,func__7944__auto___14724);

var G__14725 = cljs.core.next.call(null,seq__14694_14716__$1);
var G__14726 = null;
var G__14727 = (0);
var G__14728 = (0);
seq__14694_14704 = G__14725;
chunk__14695_14705 = G__14726;
count__14696_14706 = G__14727;
i__14697_14707 = G__14728;
continue;
}
} else {
}
}
break;
}

return e__7942__auto__;
});
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.tabs","tab-label","lt.objs.tabs/tab-label",1309036251),new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tab-label","tab-label",-1508854643),null], null), null),new cljs.core.Keyword(null,"init","init",-1875481434),(function (this$,multi,e,pos){
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("lt.objs.tabs","tab-object","lt.objs.tabs/tab-object",-1393652919),e,new cljs.core.Keyword(null,"tabset","tabset",-939965333),multi], null));

return lt.objs.tabs.item.call(null,this$,multi,e,pos);
}));
lt.objs.tabs.objs_list = (function lt$objs$tabs$objs_list(multi,objs){
var prev_tabs = cljs.core.filter.call(null,(function (p1__14729_SHARP_){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"tabset","tabset",-939965333).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,p1__14729_SHARP_)),multi);
}),lt.object.by_tag.call(null,new cljs.core.Keyword(null,"tab-label","tab-label",-1508854643)));
var item = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",-1349521403),(function (){var iter__7573__auto__ = ((function (prev_tabs){
return (function lt$objs$tabs$objs_list_$_iter__14752(s__14753){
return (new cljs.core.LazySeq(null,((function (prev_tabs){
return (function (){
var s__14753__$1 = s__14753;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__14753__$1);
if(temp__4657__auto__){
var s__14753__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__14753__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__14753__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__14755 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__14754 = (0);
while(true){
if((i__14754 < size__7572__auto__)){
var vec__14762 = cljs.core._nth.call(null,c__7571__auto__,i__14754);
var idx = cljs.core.nth.call(null,vec__14762,(0),null);
var o = cljs.core.nth.call(null,vec__14762,(1),null);
if(cljs.core.truth_(cljs.core.deref.call(null,o))){
cljs.core.chunk_append.call(null,b__14755,lt.object.__GT_content.call(null,lt.object.create.call(null,new cljs.core.Keyword("lt.objs.tabs","tab-label","lt.objs.tabs/tab-label",1309036251),multi,o,idx)));

var G__14774 = (i__14754 + (1));
i__14754 = G__14774;
continue;
} else {
var G__14775 = (i__14754 + (1));
i__14754 = G__14775;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__14755),lt$objs$tabs$objs_list_$_iter__14752.call(null,cljs.core.chunk_rest.call(null,s__14753__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__14755),null);
}
} else {
var vec__14765 = cljs.core.first.call(null,s__14753__$2);
var idx = cljs.core.nth.call(null,vec__14765,(0),null);
var o = cljs.core.nth.call(null,vec__14765,(1),null);
if(cljs.core.truth_(cljs.core.deref.call(null,o))){
return cljs.core.cons.call(null,lt.object.__GT_content.call(null,lt.object.create.call(null,new cljs.core.Keyword("lt.objs.tabs","tab-label","lt.objs.tabs/tab-label",1309036251),multi,o,idx)),lt$objs$tabs$objs_list_$_iter__14752.call(null,cljs.core.rest.call(null,s__14753__$2)));
} else {
var G__14776 = cljs.core.rest.call(null,s__14753__$2);
s__14753__$1 = G__14776;
continue;
}
}
} else {
return null;
}
break;
}
});})(prev_tabs))
,null,null));
});})(prev_tabs))
;
return iter__7573__auto__.call(null,cljs.core.map.call(null,cljs.core.vector,cljs.core.range.call(null),objs));
})()], null));
var seq__14768_14777 = cljs.core.seq.call(null,prev_tabs);
var chunk__14769_14778 = null;
var count__14770_14779 = (0);
var i__14771_14780 = (0);
while(true){
if((i__14771_14780 < count__14770_14779)){
var tab_14781 = cljs.core._nth.call(null,chunk__14769_14778,i__14771_14780);
lt.object.destroy_BANG_.call(null,tab_14781);

var G__14782 = seq__14768_14777;
var G__14783 = chunk__14769_14778;
var G__14784 = count__14770_14779;
var G__14785 = (i__14771_14780 + (1));
seq__14768_14777 = G__14782;
chunk__14769_14778 = G__14783;
count__14770_14779 = G__14784;
i__14771_14780 = G__14785;
continue;
} else {
var temp__4657__auto___14786 = cljs.core.seq.call(null,seq__14768_14777);
if(temp__4657__auto___14786){
var seq__14768_14787__$1 = temp__4657__auto___14786;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14768_14787__$1)){
var c__7604__auto___14788 = cljs.core.chunk_first.call(null,seq__14768_14787__$1);
var G__14789 = cljs.core.chunk_rest.call(null,seq__14768_14787__$1);
var G__14790 = c__7604__auto___14788;
var G__14791 = cljs.core.count.call(null,c__7604__auto___14788);
var G__14792 = (0);
seq__14768_14777 = G__14789;
chunk__14769_14778 = G__14790;
count__14770_14779 = G__14791;
i__14771_14780 = G__14792;
continue;
} else {
var tab_14793 = cljs.core.first.call(null,seq__14768_14787__$1);
lt.object.destroy_BANG_.call(null,tab_14793);

var G__14794 = cljs.core.next.call(null,seq__14768_14787__$1);
var G__14795 = null;
var G__14796 = (0);
var G__14797 = (0);
seq__14768_14777 = G__14794;
chunk__14769_14778 = G__14795;
count__14770_14779 = G__14796;
i__14771_14780 = G__14797;
continue;
}
} else {
}
}
break;
}

sortable(item,(function (){var obj14773 = {"axis":"x","distance":(10),"scroll":false,"opacity":0.9,"connectWith":".list"};
return obj14773;
})());

lt.util.dom.on.call(null,item,"contextmenu",((function (prev_tabs,item){
return (function (e){
return lt.object.raise.call(null,multi,new cljs.core.Keyword(null,"menu!","menu!",-1593399467),e);
});})(prev_tabs,item))
);

lt.util.dom.on.call(null,item,"moved",((function (prev_tabs,item){
return (function (e){
return lt.objs.tabs.move_tab.call(null,multi,e.opts);
});})(prev_tabs,item))
);

lt.util.dom.on.call(null,item,"sortupdate",((function (prev_tabs,item){
return (function (e){
return lt.objs.tabs.update_tab_order.call(null,multi,e.opts);
});})(prev_tabs,item))
);

return item;
});
/**
 * 
 */
lt.objs.tabs.tabbed_item = (function lt$objs$tabs$tabbed_item(active,item){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.content","div.content",-298042649),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"visibility","visibility",1338380893),crate.binding.bound.call(null,active,(function (p1__14798_SHARP_){
if(cljs.core._EQ_.call(null,p1__14798_SHARP_,cljs.core.deref.call(null,item))){
return "visible";
} else {
return "hidden";
}
}))], null)], null),crate.binding.bound.call(null,item,(function (p1__14799_SHARP_){
if(cljs.core.truth_(p1__14799_SHARP_)){
return lt.object.__GT_content.call(null,p1__14799_SHARP_);
} else {
return null;
}
}))], null));
var seq__14810_14820 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),cljs.core.PersistentVector.EMPTY));
var chunk__14811_14821 = null;
var count__14812_14822 = (0);
var i__14813_14823 = (0);
while(true){
if((i__14813_14823 < count__14812_14822)){
var vec__14814_14824 = cljs.core._nth.call(null,chunk__14811_14821,i__14813_14823);
var ev__7943__auto___14825 = cljs.core.nth.call(null,vec__14814_14824,(0),null);
var func__7944__auto___14826 = cljs.core.nth.call(null,vec__14814_14824,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___14825,func__7944__auto___14826);

var G__14827 = seq__14810_14820;
var G__14828 = chunk__14811_14821;
var G__14829 = count__14812_14822;
var G__14830 = (i__14813_14823 + (1));
seq__14810_14820 = G__14827;
chunk__14811_14821 = G__14828;
count__14812_14822 = G__14829;
i__14813_14823 = G__14830;
continue;
} else {
var temp__4657__auto___14831 = cljs.core.seq.call(null,seq__14810_14820);
if(temp__4657__auto___14831){
var seq__14810_14832__$1 = temp__4657__auto___14831;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14810_14832__$1)){
var c__7604__auto___14833 = cljs.core.chunk_first.call(null,seq__14810_14832__$1);
var G__14834 = cljs.core.chunk_rest.call(null,seq__14810_14832__$1);
var G__14835 = c__7604__auto___14833;
var G__14836 = cljs.core.count.call(null,c__7604__auto___14833);
var G__14837 = (0);
seq__14810_14820 = G__14834;
chunk__14811_14821 = G__14835;
count__14812_14822 = G__14836;
i__14813_14823 = G__14837;
continue;
} else {
var vec__14817_14838 = cljs.core.first.call(null,seq__14810_14832__$1);
var ev__7943__auto___14839 = cljs.core.nth.call(null,vec__14817_14838,(0),null);
var func__7944__auto___14840 = cljs.core.nth.call(null,vec__14817_14838,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___14839,func__7944__auto___14840);

var G__14841 = cljs.core.next.call(null,seq__14810_14832__$1);
var G__14842 = null;
var G__14843 = (0);
var G__14844 = (0);
seq__14810_14820 = G__14841;
chunk__14811_14821 = G__14842;
count__14812_14822 = G__14843;
i__14813_14823 = G__14844;
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
lt.objs.tabs.vertical_grip = (function lt$objs$tabs$vertical_grip(this$){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.vertical-grip","div.vertical-grip",-30981806),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"draggable","draggable",1676206163),"true"], null)], null));
var seq__14855_14865 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dragstart","dragstart",955864218),((function (e__7942__auto__){
return (function (e){
e.dataTransfer.dropEffect = "move";

e.dataTransfer.setData("text/plain",null);

return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"start-drag","start-drag",463492443),e);
});})(e__7942__auto__))
,new cljs.core.Keyword(null,"dragend","dragend",1096302264),((function (e__7942__auto__){
return (function (e){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"end-drag","end-drag",1040662768),e);
});})(e__7942__auto__))
,new cljs.core.Keyword(null,"drag","drag",449951290),((function (e__7942__auto__){
return (function (e){
e.dataTransfer.dropEffect = "move";

return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"width!","width!",-1196918001),e);
});})(e__7942__auto__))
], null)));
var chunk__14856_14866 = null;
var count__14857_14867 = (0);
var i__14858_14868 = (0);
while(true){
if((i__14858_14868 < count__14857_14867)){
var vec__14859_14869 = cljs.core._nth.call(null,chunk__14856_14866,i__14858_14868);
var ev__7943__auto___14870 = cljs.core.nth.call(null,vec__14859_14869,(0),null);
var func__7944__auto___14871 = cljs.core.nth.call(null,vec__14859_14869,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___14870,func__7944__auto___14871);

var G__14872 = seq__14855_14865;
var G__14873 = chunk__14856_14866;
var G__14874 = count__14857_14867;
var G__14875 = (i__14858_14868 + (1));
seq__14855_14865 = G__14872;
chunk__14856_14866 = G__14873;
count__14857_14867 = G__14874;
i__14858_14868 = G__14875;
continue;
} else {
var temp__4657__auto___14876 = cljs.core.seq.call(null,seq__14855_14865);
if(temp__4657__auto___14876){
var seq__14855_14877__$1 = temp__4657__auto___14876;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14855_14877__$1)){
var c__7604__auto___14878 = cljs.core.chunk_first.call(null,seq__14855_14877__$1);
var G__14879 = cljs.core.chunk_rest.call(null,seq__14855_14877__$1);
var G__14880 = c__7604__auto___14878;
var G__14881 = cljs.core.count.call(null,c__7604__auto___14878);
var G__14882 = (0);
seq__14855_14865 = G__14879;
chunk__14856_14866 = G__14880;
count__14857_14867 = G__14881;
i__14858_14868 = G__14882;
continue;
} else {
var vec__14862_14883 = cljs.core.first.call(null,seq__14855_14877__$1);
var ev__7943__auto___14884 = cljs.core.nth.call(null,vec__14862_14883,(0),null);
var func__7944__auto___14885 = cljs.core.nth.call(null,vec__14862_14883,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___14884,func__7944__auto___14885);

var G__14886 = cljs.core.next.call(null,seq__14855_14877__$1);
var G__14887 = null;
var G__14888 = (0);
var G__14889 = (0);
seq__14855_14865 = G__14886;
chunk__14856_14866 = G__14887;
count__14857_14867 = G__14888;
i__14858_14868 = G__14889;
continue;
}
} else {
}
}
break;
}

return e__7942__auto__;
});
lt.objs.tabs.__GT_perc = (function lt$objs$tabs$__GT_perc(x){
if(cljs.core.truth_(x)){
return [cljs.core.str(x),cljs.core.str("%")].join('');
} else {
return "0";
}
});
lt.objs.tabs.floored = (function lt$objs$tabs$floored(x){
if((x < (0))){
return (0);
} else {
if((x > (100))){
return (100);
} else {
return x;

}
}
});
lt.objs.tabs.to_perc = (function lt$objs$tabs$to_perc(width,x){
return ((x / width) * (100));
});
lt.objs.tabs.next_tabset = (function lt$objs$tabs$next_tabset(t){
var ts = cljs.core.deref.call(null,lt.objs.tabs.multi).call(null,new cljs.core.Keyword(null,"tabsets","tabsets",-1794190722));
return cljs.core.second.call(null,cljs.core.drop_while.call(null,((function (ts){
return (function (p1__14890_SHARP_){
return cljs.core.not_EQ_.call(null,t,p1__14890_SHARP_);
});})(ts))
,ts));
});
lt.objs.tabs.prev_tabset = (function lt$objs$tabs$prev_tabset(t){
var ts = cljs.core.deref.call(null,lt.objs.tabs.multi).call(null,new cljs.core.Keyword(null,"tabsets","tabsets",-1794190722));
return cljs.core.last.call(null,cljs.core.take_while.call(null,((function (ts){
return (function (p1__14891_SHARP_){
return cljs.core.not_EQ_.call(null,t,p1__14891_SHARP_);
});})(ts))
,ts));
});
lt.objs.tabs.previous_tabset_width = (function lt$objs$tabs$previous_tabset_width(cur){
var ts = cljs.core.deref.call(null,lt.objs.tabs.multi).call(null,new cljs.core.Keyword(null,"tabsets","tabsets",-1794190722));
return cljs.core.reduce.call(null,cljs.core._PLUS_,(0),cljs.core.map.call(null,cljs.core.comp.call(null,new cljs.core.Keyword(null,"width","width",-384071477),cljs.core.deref),cljs.core.take_while.call(null,((function (ts){
return (function (p1__14892_SHARP_){
return cljs.core.not_EQ_.call(null,cur,p1__14892_SHARP_);
});})(ts))
,ts)));
});
lt.objs.tabs.add_tabset = (function lt$objs$tabs$add_tabset(ts){
lt.object.update_BANG_.call(null,lt.objs.tabs.multi,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tabsets","tabsets",-1794190722)], null),cljs.core.conj,ts);

return lt.util.dom.append.call(null,new cljs.core.Keyword(null,"tabsets-elem","tabsets-elem",54132282).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.tabs.multi)),lt.object.__GT_content.call(null,ts));
});
lt.objs.tabs.spawn_tabset = (function lt$objs$tabs$spawn_tabset(){
var ts = lt.object.create.call(null,new cljs.core.Keyword("lt.objs.tabs","tabset","lt.objs.tabs/tabset",537008529));
var width = ((100) - cljs.core.reduce.call(null,cljs.core._PLUS_,cljs.core.map.call(null,cljs.core.comp.call(null,new cljs.core.Keyword(null,"width","width",-384071477),cljs.core.deref),cljs.core.deref.call(null,lt.objs.tabs.multi).call(null,new cljs.core.Keyword(null,"tabsets","tabsets",-1794190722)))));
lt.object.merge_BANG_.call(null,ts,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"width","width",-384071477),width], null));

lt.objs.tabs.add_tabset.call(null,ts);

return ts;
});
lt.objs.tabs.equalize_tabset_widths = (function lt$objs$tabs$equalize_tabset_widths(){
var tss = new cljs.core.Keyword(null,"tabsets","tabsets",-1794190722).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.tabs.multi));
var width = (100.0 / cljs.core.count.call(null,tss));
var seq__14897 = cljs.core.seq.call(null,tss);
var chunk__14898 = null;
var count__14899 = (0);
var i__14900 = (0);
while(true){
if((i__14900 < count__14899)){
var ts = cljs.core._nth.call(null,chunk__14898,i__14900);
lt.object.merge_BANG_.call(null,ts,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"width","width",-384071477),width], null));

var G__14901 = seq__14897;
var G__14902 = chunk__14898;
var G__14903 = count__14899;
var G__14904 = (i__14900 + (1));
seq__14897 = G__14901;
chunk__14898 = G__14902;
count__14899 = G__14903;
i__14900 = G__14904;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__14897);
if(temp__4657__auto__){
var seq__14897__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14897__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__14897__$1);
var G__14905 = cljs.core.chunk_rest.call(null,seq__14897__$1);
var G__14906 = c__7604__auto__;
var G__14907 = cljs.core.count.call(null,c__7604__auto__);
var G__14908 = (0);
seq__14897 = G__14905;
chunk__14898 = G__14906;
count__14899 = G__14907;
i__14900 = G__14908;
continue;
} else {
var ts = cljs.core.first.call(null,seq__14897__$1);
lt.object.merge_BANG_.call(null,ts,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"width","width",-384071477),width], null));

var G__14909 = cljs.core.next.call(null,seq__14897__$1);
var G__14910 = null;
var G__14911 = (0);
var G__14912 = (0);
seq__14897 = G__14909;
chunk__14898 = G__14910;
count__14899 = G__14911;
i__14900 = G__14912;
continue;
}
} else {
return null;
}
}
break;
}
});
lt.objs.tabs.temp_width = (function lt$objs$tabs$temp_width(ts,w){
return lt.util.dom.css.call(null,lt.object.__GT_content.call(null,ts),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"width","width",-384071477),lt.objs.tabs.__GT_perc.call(null,w),new cljs.core.Keyword(null,"border-width","border-width",-1512605390),((cljs.core._EQ_.call(null,(0),w))?(0):"")], null));
});
lt.objs.tabs.activate_tabset = (function lt$objs$tabs$activate_tabset(ts){
if(cljs.core._EQ_.call(null,lt.objs.context.__GT_obj.call(null,new cljs.core.Keyword(null,"tabset","tabset",-939965333)),ts)){
return null;
} else {
var temp__4657__auto___14913 = lt.objs.context.__GT_obj.call(null,new cljs.core.Keyword(null,"tabset","tabset",-939965333));
if(cljs.core.truth_(temp__4657__auto___14913)){
var old_14914 = temp__4657__auto___14913;
lt.util.dom.remove_class.call(null,lt.object.__GT_content.call(null,old_14914),new cljs.core.Keyword(null,"active","active",1895962068));
} else {
}

lt.objs.context.in_BANG_.call(null,new cljs.core.Keyword(null,"tabset","tabset",-939965333),ts);

lt.util.dom.add_class.call(null,lt.object.__GT_content.call(null,ts),new cljs.core.Keyword(null,"active","active",1895962068));

return true;
}
});
/**
 * 
 */
lt.objs.tabs.tabset_ui = (function lt$objs$tabs$tabset_ui(this$){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.tabset","div.tabset",-865911998),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"width","width",-384071477),crate.binding.bound.call(null,crate.binding.subatom.call(null,this$,new cljs.core.Keyword(null,"width","width",-384071477)),lt.objs.tabs.__GT_perc)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.list","div.list",-1638405495),crate.binding.bound.call(null,this$,(function (p1__14915_SHARP_){
return lt.objs.tabs.objs_list.call(null,this$,new cljs.core.Keyword(null,"objs","objs",-1810725634).cljs$core$IFn$_invoke$arity$1(p1__14915_SHARP_));
}))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.items","div.items",-114898192),crate.binding.map_bound.call(null,cljs.core.partial.call(null,lt.objs.tabs.tabbed_item,crate.binding.subatom.call(null,this$,new cljs.core.Keyword(null,"active-obj","active-obj",-1861497999))),this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"path","path",-188191168),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"objs","objs",-1810725634)], null)], null))], null),lt.objs.tabs.vertical_grip.call(null,this$)], null));
var seq__14926_14936 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"active","active",1895962068));
});})(e__7942__auto__))
], null)));
var chunk__14927_14937 = null;
var count__14928_14938 = (0);
var i__14929_14939 = (0);
while(true){
if((i__14929_14939 < count__14928_14938)){
var vec__14930_14940 = cljs.core._nth.call(null,chunk__14927_14937,i__14929_14939);
var ev__7943__auto___14941 = cljs.core.nth.call(null,vec__14930_14940,(0),null);
var func__7944__auto___14942 = cljs.core.nth.call(null,vec__14930_14940,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___14941,func__7944__auto___14942);

var G__14943 = seq__14926_14936;
var G__14944 = chunk__14927_14937;
var G__14945 = count__14928_14938;
var G__14946 = (i__14929_14939 + (1));
seq__14926_14936 = G__14943;
chunk__14927_14937 = G__14944;
count__14928_14938 = G__14945;
i__14929_14939 = G__14946;
continue;
} else {
var temp__4657__auto___14947 = cljs.core.seq.call(null,seq__14926_14936);
if(temp__4657__auto___14947){
var seq__14926_14948__$1 = temp__4657__auto___14947;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14926_14948__$1)){
var c__7604__auto___14949 = cljs.core.chunk_first.call(null,seq__14926_14948__$1);
var G__14950 = cljs.core.chunk_rest.call(null,seq__14926_14948__$1);
var G__14951 = c__7604__auto___14949;
var G__14952 = cljs.core.count.call(null,c__7604__auto___14949);
var G__14953 = (0);
seq__14926_14936 = G__14950;
chunk__14927_14937 = G__14951;
count__14928_14938 = G__14952;
i__14929_14939 = G__14953;
continue;
} else {
var vec__14933_14954 = cljs.core.first.call(null,seq__14926_14948__$1);
var ev__7943__auto___14955 = cljs.core.nth.call(null,vec__14933_14954,(0),null);
var func__7944__auto___14956 = cljs.core.nth.call(null,vec__14933_14954,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___14955,func__7944__auto___14956);

var G__14957 = cljs.core.next.call(null,seq__14926_14948__$1);
var G__14958 = null;
var G__14959 = (0);
var G__14960 = (0);
seq__14926_14936 = G__14957;
chunk__14927_14937 = G__14958;
count__14928_14938 = G__14959;
i__14929_14939 = G__14960;
continue;
}
} else {
}
}
break;
}

return e__7942__auto__;
});
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.tabs","tabset","lt.objs.tabs/tabset",537008529),new cljs.core.Keyword(null,"objs","objs",-1810725634),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"active-obj","active-obj",-1861497999),null,new cljs.core.Keyword(null,"count","count",2139924085),(0),new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tabset","tabset",-939965333),null], null), null),new cljs.core.Keyword(null,"width","width",-384071477),(100),new cljs.core.Keyword(null,"init","init",-1875481434),(function (this$){
return lt.objs.tabs.tabset_ui.call(null,this$);
}));
lt.objs.tabs.__GT_tabsets = (function lt$objs$tabs$__GT_tabsets(tabs){
var iter__7573__auto__ = (function lt$objs$tabs$__GT_tabsets_$_iter__14965(s__14966){
return (new cljs.core.LazySeq(null,(function (){
var s__14966__$1 = s__14966;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__14966__$1);
if(temp__4657__auto__){
var s__14966__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__14966__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__14966__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__14968 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__14967 = (0);
while(true){
if((i__14967 < size__7572__auto__)){
var k = cljs.core._nth.call(null,c__7571__auto__,i__14967);
cljs.core.chunk_append.call(null,b__14968,lt.object.__GT_content.call(null,k));

var G__14969 = (i__14967 + (1));
i__14967 = G__14969;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__14968),lt$objs$tabs$__GT_tabsets_$_iter__14965.call(null,cljs.core.chunk_rest.call(null,s__14966__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__14968),null);
}
} else {
var k = cljs.core.first.call(null,s__14966__$2);
return cljs.core.cons.call(null,lt.object.__GT_content.call(null,k),lt$objs$tabs$__GT_tabsets_$_iter__14965.call(null,cljs.core.rest.call(null,s__14966__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__7573__auto__.call(null,tabs);
});
lt.objs.tabs.tabset = lt.object.create.call(null,new cljs.core.Keyword("lt.objs.tabs","tabset","lt.objs.tabs/tabset",537008529));
lt.objs.tabs.add_BANG_ = (function lt$objs$tabs$add_BANG_(var_args){
var args14970 = [];
var len__7868__auto___14973 = arguments.length;
var i__7869__auto___14974 = (0);
while(true){
if((i__7869__auto___14974 < len__7868__auto___14973)){
args14970.push((arguments[i__7869__auto___14974]));

var G__14975 = (i__7869__auto___14974 + (1));
i__7869__auto___14974 = G__14975;
continue;
} else {
}
break;
}

var G__14972 = args14970.length;
switch (G__14972) {
case 1:
return lt.objs.tabs.add_BANG_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return lt.objs.tabs.add_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args14970.length)].join('')));

}
});

lt.objs.tabs.add_BANG_.cljs$core$IFn$_invoke$arity$1 = (function (obj){
return lt.objs.tabs.add_BANG_.call(null,obj,null);
});

lt.objs.tabs.add_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (obj,ts){
var temp__4657__auto__ = (function (){var or__6793__auto__ = ts;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return lt.objs.context.__GT_obj.call(null,new cljs.core.Keyword(null,"tabset","tabset",-939965333));
}
})();
if(cljs.core.truth_(temp__4657__auto__)){
var cur_tabset = temp__4657__auto__;
lt.object.add_tags.call(null,obj,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tabset.tab","tabset.tab",745554398)], null));

lt.object.update_BANG_.call(null,cur_tabset,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"objs","objs",-1810725634)], null),cljs.core.conj,obj);

lt.object.merge_BANG_.call(null,obj,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("lt.objs.tabs","tabset","lt.objs.tabs/tabset",537008529),cur_tabset], null));

cljs.core.add_watch.call(null,crate.binding.subatom.call(null,obj,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dirty","dirty",729553281)], null)),new cljs.core.Keyword(null,"tabs","tabs",-779855354),((function (cur_tabset,temp__4657__auto__){
return (function (_,___$1,___$2,cur){
return lt.object.raise.call(null,cur_tabset,new cljs.core.Keyword(null,"tab.updated","tab.updated",-389421943));
});})(cur_tabset,temp__4657__auto__))
);

return obj;
} else {
return null;
}
});

lt.objs.tabs.add_BANG_.cljs$lang$maxFixedArity = 2;

lt.objs.tabs.rem_tabset = (function lt$objs$tabs$rem_tabset(var_args){
var args14978 = [];
var len__7868__auto___14985 = arguments.length;
var i__7869__auto___14986 = (0);
while(true){
if((i__7869__auto___14986 < len__7868__auto___14985)){
args14978.push((arguments[i__7869__auto___14986]));

var G__14987 = (i__7869__auto___14986 + (1));
i__7869__auto___14986 = G__14987;
continue;
} else {
}
break;
}

var G__14980 = args14978.length;
switch (G__14980) {
case 1:
return lt.objs.tabs.rem_tabset.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return lt.objs.tabs.rem_tabset.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args14978.length)].join('')));

}
});

lt.objs.tabs.rem_tabset.cljs$core$IFn$_invoke$arity$1 = (function (ts){
return lt.objs.tabs.rem_tabset.call(null,ts,false);
});

lt.objs.tabs.rem_tabset.cljs$core$IFn$_invoke$arity$2 = (function (ts,prev_QMARK_){
var to_ts = (cljs.core.truth_(prev_QMARK_)?(function (){var or__6793__auto__ = lt.objs.tabs.prev_tabset.call(null,ts);
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return lt.objs.tabs.next_tabset.call(null,ts);
}
})():(function (){var or__6793__auto__ = lt.objs.tabs.next_tabset.call(null,ts);
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return lt.objs.tabs.prev_tabset.call(null,ts);
}
})());
if(cljs.core.truth_(to_ts)){
lt.object.merge_BANG_.call(null,to_ts,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"width","width",-384071477),lt.objs.tabs.floored.call(null,(new cljs.core.Keyword(null,"width","width",-384071477).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,to_ts)) + new cljs.core.Keyword(null,"width","width",-384071477).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ts))))], null));

lt.util.dom.remove.call(null,lt.object.__GT_content.call(null,ts));

var seq__14981_14989 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"objs","objs",-1810725634).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ts)));
var chunk__14982_14990 = null;
var count__14983_14991 = (0);
var i__14984_14992 = (0);
while(true){
if((i__14984_14992 < count__14983_14991)){
var t_14993 = cljs.core._nth.call(null,chunk__14982_14990,i__14984_14992);
lt.objs.tabs.add_BANG_.call(null,t_14993,to_ts);

var G__14994 = seq__14981_14989;
var G__14995 = chunk__14982_14990;
var G__14996 = count__14983_14991;
var G__14997 = (i__14984_14992 + (1));
seq__14981_14989 = G__14994;
chunk__14982_14990 = G__14995;
count__14983_14991 = G__14996;
i__14984_14992 = G__14997;
continue;
} else {
var temp__4657__auto___14998 = cljs.core.seq.call(null,seq__14981_14989);
if(temp__4657__auto___14998){
var seq__14981_14999__$1 = temp__4657__auto___14998;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14981_14999__$1)){
var c__7604__auto___15000 = cljs.core.chunk_first.call(null,seq__14981_14999__$1);
var G__15001 = cljs.core.chunk_rest.call(null,seq__14981_14999__$1);
var G__15002 = c__7604__auto___15000;
var G__15003 = cljs.core.count.call(null,c__7604__auto___15000);
var G__15004 = (0);
seq__14981_14989 = G__15001;
chunk__14982_14990 = G__15002;
count__14983_14991 = G__15003;
i__14984_14992 = G__15004;
continue;
} else {
var t_15005 = cljs.core.first.call(null,seq__14981_14999__$1);
lt.objs.tabs.add_BANG_.call(null,t_15005,to_ts);

var G__15006 = cljs.core.next.call(null,seq__14981_14999__$1);
var G__15007 = null;
var G__15008 = (0);
var G__15009 = (0);
seq__14981_14989 = G__15006;
chunk__14982_14990 = G__15007;
count__14983_14991 = G__15008;
i__14984_14992 = G__15009;
continue;
}
} else {
}
}
break;
}

lt.object.update_BANG_.call(null,lt.objs.tabs.multi,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tabsets","tabsets",-1794190722)], null),((function (to_ts){
return (function (p1__14977_SHARP_){
return cljs.core.vec.call(null,cljs.core.remove.call(null,cljs.core.PersistentHashSet.fromArray([ts], true),p1__14977_SHARP_));
});})(to_ts))
);

lt.object.destroy_BANG_.call(null,ts);

lt.objs.tabs.equalize_tabset_widths.call(null);

return lt.object.raise.call(null,to_ts,new cljs.core.Keyword(null,"active","active",1895962068));
} else {
return null;
}
});

lt.objs.tabs.rem_tabset.cljs$lang$maxFixedArity = 2;

lt.objs.tabs.rem_BANG_ = (function lt$objs$tabs$rem_BANG_(obj){
if(cljs.core.truth_((function (){var and__6781__auto__ = obj;
if(cljs.core.truth_(and__6781__auto__)){
var and__6781__auto____$1 = cljs.core.deref.call(null,obj);
if(cljs.core.truth_(and__6781__auto____$1)){
return new cljs.core.Keyword("lt.objs.tabs","tabset","lt.objs.tabs/tabset",537008529).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,obj));
} else {
return and__6781__auto____$1;
}
} else {
return and__6781__auto__;
}
})())){
var cur_tabset = new cljs.core.Keyword("lt.objs.tabs","tabset","lt.objs.tabs/tabset",537008529).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,obj));
var idx = lt.objs.tabs.__GT_index.call(null,obj);
var active = new cljs.core.Keyword(null,"active-obj","active-obj",-1861497999).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cur_tabset));
var aidx = lt.objs.tabs.__GT_index.call(null,active);
cljs.core.remove_watch.call(null,obj,new cljs.core.Keyword(null,"tabs","tabs",-779855354));

lt.object.merge_BANG_.call(null,obj,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("lt.objs.tabs","tabset","lt.objs.tabs/tabset",537008529),null], null));

lt.object.merge_BANG_.call(null,cur_tabset,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"objs","objs",-1810725634),cljs.core.vec.call(null,cljs.core.remove.call(null,((function (cur_tabset,idx,active,aidx){
return (function (p1__15010_SHARP_){
return cljs.core._EQ_.call(null,obj,p1__15010_SHARP_);
});})(cur_tabset,idx,active,aidx))
,cljs.core.deref.call(null,cur_tabset).call(null,new cljs.core.Keyword(null,"objs","objs",-1810725634))))], null));

if(cljs.core._EQ_.call(null,obj,active)){
return lt.object.raise.call(null,cur_tabset,new cljs.core.Keyword(null,"tab","tab",-559583621),idx);
} else {
if(cljs.core.not_EQ_.call(null,aidx,lt.objs.tabs.__GT_index.call(null,active))){
lt.object.merge_BANG_.call(null,cur_tabset,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"active-obj","active-obj",-1861497999),null], null));

return lt.objs.tabs.active_BANG_.call(null,active);
} else {
return null;
}
}
} else {
return null;
}
});
lt.objs.tabs.refresh_BANG_ = (function lt$objs$tabs$refresh_BANG_(obj){
var temp__4657__auto__ = new cljs.core.Keyword("lt.objs.tabs","tabset","lt.objs.tabs/tabset",537008529).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,obj));
if(cljs.core.truth_(temp__4657__auto__)){
var ts = temp__4657__auto__;
return lt.object.raise.call(null,ts,new cljs.core.Keyword(null,"tab.updated","tab.updated",-389421943));
} else {
return null;
}
});
lt.objs.tabs.in_tab_QMARK_ = (function lt$objs$tabs$in_tab_QMARK_(obj){
return cljs.core.deref.call(null,obj).call(null,new cljs.core.Keyword("lt.objs.tabs","tabset","lt.objs.tabs/tabset",537008529));
});
lt.objs.tabs.add_or_focus_BANG_ = (function lt$objs$tabs$add_or_focus_BANG_(obj){
if(cljs.core.truth_(lt.objs.tabs.in_tab_QMARK_.call(null,obj))){
return lt.objs.tabs.active_BANG_.call(null,obj);
} else {
lt.objs.tabs.add_BANG_.call(null,obj);

return lt.objs.tabs.active_BANG_.call(null,obj);
}
});
lt.objs.tabs.num_tabs = (function lt$objs$tabs$num_tabs(){
return cljs.core.reduce.call(null,(function (res,cur){
return (res + cljs.core.count.call(null,new cljs.core.Keyword(null,"objs","objs",-1810725634).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cur))));
}),(0),new cljs.core.Keyword(null,"tabsets","tabsets",-1794190722).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.tabs.multi)));
});
lt.objs.tabs.active_tab = (function lt$objs$tabs$active_tab(){
var temp__4657__auto__ = lt.objs.context.__GT_obj.call(null,new cljs.core.Keyword(null,"tabset","tabset",-939965333));
if(cljs.core.truth_(temp__4657__auto__)){
var cur_tabset = temp__4657__auto__;
return new cljs.core.Keyword(null,"active-obj","active-obj",-1861497999).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cur_tabset));
} else {
return null;
}
});
lt.objs.tabs.move_tab_to_tabset = (function lt$objs$tabs$move_tab_to_tabset(obj,ts){
lt.objs.tabs.rem_BANG_.call(null,obj);

lt.objs.tabs.add_BANG_.call(null,obj,ts);

lt.objs.tabs.active_BANG_.call(null,obj);

return lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"move","move",-2110884309));
});
lt.objs.tabs.move_tab = (function lt$objs$tabs$move_tab(multi,elem){
var id = lt.util.dom.attr.call(null,elem,new cljs.core.Keyword(null,"obj-id","obj-id",1871733713));
var idx = lt.util.dom.index.call(null,elem);
var obj = lt.object.by_id.call(null,parseInt(id));
var cnt = cljs.core.count.call(null,new cljs.core.Keyword(null,"objs","objs",-1810725634).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,multi)));
lt.objs.tabs.rem_BANG_.call(null,obj);

lt.objs.tabs.add_BANG_.call(null,obj,multi);

if((cnt > (0))){
lt.objs.tabs.update_tab_order.call(null,multi,cljs.core.vec.call(null,cljs.core.concat.call(null,cljs.core.range.call(null,idx),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cnt], null),cljs.core.range.call(null,idx,cnt))));
} else {
}

lt.objs.tabs.active_BANG_.call(null,obj);

return lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"move","move",-2110884309));
});
/**
 * 
 */
lt.objs.tabs.__BEH__on_destroy_remove = (function lt$objs$tabs$__BEH__on_destroy_remove(this$){
return lt.objs.tabs.rem_BANG_.call(null,this$);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.tabs","on-destroy-remove","lt.objs.tabs/on-destroy-remove",-1398608946),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"closed","closed",-919675359),null,new cljs.core.Keyword(null,"destroy","destroy",-843660405),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.tabs.__BEH__on_destroy_remove);
/**
 * 
 */
lt.objs.tabs.__BEH__active_tab_num = (function lt$objs$tabs$__BEH__active_tab_num(this$,num){
var objs = cljs.core.deref.call(null,this$).call(null,new cljs.core.Keyword(null,"objs","objs",-1810725634));
if((num < cljs.core.count.call(null,objs))){
return lt.objs.tabs.active_BANG_.call(null,cljs.core.get.call(null,objs,num));
} else {
return lt.objs.tabs.active_BANG_.call(null,cljs.core.get.call(null,objs,(cljs.core.count.call(null,objs) - (1))));
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.tabs","active-tab-num","lt.objs.tabs/active-tab-num",-1455185092),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tab","tab",-559583621),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.tabs.__BEH__active_tab_num);
/**
 * 
 */
lt.objs.tabs.__BEH__prev_tab = (function lt$objs$tabs$__BEH__prev_tab(this$){
var objs = cljs.core.deref.call(null,this$).call(null,new cljs.core.Keyword(null,"objs","objs",-1810725634));
var idx = lt.objs.tabs.__GT_index.call(null,new cljs.core.Keyword(null,"active-obj","active-obj",-1861497999).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
if((idx > (0))){
return lt.objs.tabs.active_BANG_.call(null,cljs.core.get.call(null,objs,(idx - (1))));
} else {
return lt.objs.tabs.active_BANG_.call(null,cljs.core.get.call(null,objs,(cljs.core.count.call(null,objs) - (1))));
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.tabs","prev-tab","lt.objs.tabs/prev-tab",483489955),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tab.prev","tab.prev",-431940145),null], null), null),new cljs.core.Keyword(null,"throttle","throttle",-1860340776),(100),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.tabs.__BEH__prev_tab);
/**
 * 
 */
lt.objs.tabs.__BEH__next_tab = (function lt$objs$tabs$__BEH__next_tab(this$){
var objs = cljs.core.deref.call(null,this$).call(null,new cljs.core.Keyword(null,"objs","objs",-1810725634));
var idx = (lt.objs.tabs.__GT_index.call(null,new cljs.core.Keyword(null,"active-obj","active-obj",-1861497999).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))) + (1));
if((idx < cljs.core.count.call(null,objs))){
return lt.objs.tabs.active_BANG_.call(null,cljs.core.get.call(null,objs,idx));
} else {
return lt.objs.tabs.active_BANG_.call(null,cljs.core.get.call(null,objs,(0)));
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.tabs","next-tab","lt.objs.tabs/next-tab",-1139807536),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tab.next","tab.next",1698295260),null], null), null),new cljs.core.Keyword(null,"throttle","throttle",-1860340776),(100),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.tabs.__BEH__next_tab);
/**
 * 
 */
lt.objs.tabs.__BEH__tab_close = (function lt$objs$tabs$__BEH__tab_close(this$){
try{var orig = new cljs.core.Keyword(null,"active-obj","active-obj",-1861497999).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$));
return lt.object.raise.call(null,orig,new cljs.core.Keyword(null,"close","close",1835149582));
}catch (e15012){var e = e15012;
return lt.objs.console.error(e);
}});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.tabs","tab-close","lt.objs.tabs/tab-close",-1973391641),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tab.close","tab.close",1796241467),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.tabs.__BEH__tab_close);
/**
 * 
 */
lt.objs.tabs.__BEH__on_destroy_objs = (function lt$objs$tabs$__BEH__on_destroy_objs(this$){
var seq__15017 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"objs","objs",-1810725634).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
var chunk__15018 = null;
var count__15019 = (0);
var i__15020 = (0);
while(true){
if((i__15020 < count__15019)){
var e = cljs.core._nth.call(null,chunk__15018,i__15020);
lt.object.destroy_BANG_.call(null,e);

var G__15021 = seq__15017;
var G__15022 = chunk__15018;
var G__15023 = count__15019;
var G__15024 = (i__15020 + (1));
seq__15017 = G__15021;
chunk__15018 = G__15022;
count__15019 = G__15023;
i__15020 = G__15024;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__15017);
if(temp__4657__auto__){
var seq__15017__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15017__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__15017__$1);
var G__15025 = cljs.core.chunk_rest.call(null,seq__15017__$1);
var G__15026 = c__7604__auto__;
var G__15027 = cljs.core.count.call(null,c__7604__auto__);
var G__15028 = (0);
seq__15017 = G__15025;
chunk__15018 = G__15026;
count__15019 = G__15027;
i__15020 = G__15028;
continue;
} else {
var e = cljs.core.first.call(null,seq__15017__$1);
lt.object.destroy_BANG_.call(null,e);

var G__15029 = cljs.core.next.call(null,seq__15017__$1);
var G__15030 = null;
var G__15031 = (0);
var G__15032 = (0);
seq__15017 = G__15029;
chunk__15018 = G__15030;
count__15019 = G__15031;
i__15020 = G__15032;
continue;
}
} else {
return null;
}
}
break;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.tabs","on-destroy-objs","lt.objs.tabs/on-destroy-objs",-181276955),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"destroy","destroy",-843660405),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.tabs.__BEH__on_destroy_objs);
/**
 * 
 */
lt.objs.tabs.__BEH__repaint_tab_updated = (function lt$objs$tabs$__BEH__repaint_tab_updated(this$){
return lt.object.update_BANG_.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"count","count",2139924085)], null),cljs.core.inc);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.tabs","repaint-tab-updated","lt.objs.tabs/repaint-tab-updated",-943435320),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tab.updated","tab.updated",-389421943),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.tabs.__BEH__repaint_tab_updated);
/**
 * 
 */
lt.objs.tabs.__BEH__no_anim_on_drag = (function lt$objs$tabs$__BEH__no_anim_on_drag(this$){
return lt.objs.animations.off.call(null);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.tabs","no-anim-on-drag","lt.objs.tabs/no-anim-on-drag",39432335),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"start-drag","start-drag",463492443),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.tabs.__BEH__no_anim_on_drag);
/**
 * 
 */
lt.objs.tabs.__BEH__reanim_on_drop = (function lt$objs$tabs$__BEH__reanim_on_drop(this$){
return lt.objs.animations.on.call(null);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.tabs","reanim-on-drop","lt.objs.tabs/reanim-on-drop",-1467106426),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"end-drag","end-drag",1040662768),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.tabs.__BEH__reanim_on_drop);
/**
 * 
 */
lt.objs.tabs.__BEH__set_dragging = (function lt$objs$tabs$__BEH__set_dragging(this$){
return lt.util.dom.add_class.call(null,lt.util.dom.$.call(null,new cljs.core.Keyword(null,"body","body",-2049205669)),new cljs.core.Keyword(null,"dragging","dragging",1185097613));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.tabs","set-dragging","lt.objs.tabs/set-dragging",-629322934),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"start-drag","start-drag",463492443),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.tabs.__BEH__set_dragging);
/**
 * 
 */
lt.objs.tabs.__BEH__unset_dragging = (function lt$objs$tabs$__BEH__unset_dragging(this$){
return lt.util.dom.remove_class.call(null,lt.util.dom.$.call(null,new cljs.core.Keyword(null,"body","body",-2049205669)),new cljs.core.Keyword(null,"dragging","dragging",1185097613));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.tabs","unset-dragging","lt.objs.tabs/unset-dragging",1844944192),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"end-drag","end-drag",1040662768),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.tabs.__BEH__unset_dragging);
/**
 * 
 */
lt.objs.tabs.__BEH__set_width_final_BANG_ = (function lt$objs$tabs$__BEH__set_width_final_BANG_(this$,e){
var temp__4657__auto__ = lt.objs.tabs.next_tabset.call(null,this$);
if(cljs.core.truth_(temp__4657__auto__)){
var ts = temp__4657__auto__;
var width = lt.util.dom.width.call(null,lt.object.__GT_content.call(null,lt.objs.tabs.multi));
var left = new cljs.core.Keyword(null,"left","left",-399115937).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.tabs.multi));
var cx = e.clientX;
var new_loc = ((width + left) - cx);
var new_perc = lt.objs.tabs.floored.call(null,((((100) - lt.objs.tabs.previous_tabset_width.call(null,this$)) - lt.objs.tabs.to_perc.call(null,width,new_loc)) | (0)));
var prev_width = new cljs.core.Keyword(null,"width","width",-384071477).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$));
var new_perc__$1 = (((new_perc >= (new cljs.core.Keyword(null,"width","width",-384071477).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ts)) + prev_width)))?(new cljs.core.Keyword(null,"width","width",-384071477).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ts)) + prev_width):new_perc);
var next_width = lt.objs.tabs.floored.call(null,((cljs.core.not.call(null,ts))?(1):(new cljs.core.Keyword(null,"width","width",-384071477).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ts)) + (prev_width - new_perc__$1))));
if(cljs.core._EQ_.call(null,new_perc__$1,(0))){
return lt.objs.tabs.rem_tabset.call(null,this$);
} else {
if(cljs.core._EQ_.call(null,next_width,(0))){
return lt.objs.tabs.rem_tabset.call(null,ts,new cljs.core.Keyword(null,"prev","prev",-1597069226));
} else {
if(cljs.core._EQ_.call(null,cx,(0))){
return null;
} else {
if((new_perc__$1 < (0))){
return lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"width","width",-384071477),(100)], null));
} else {
if(cljs.core.truth_((function (){var and__6781__auto__ = cljs.core.not_EQ_.call(null,cx,(0));
if(and__6781__auto__){
var and__6781__auto____$1 = ts;
if(cljs.core.truth_(and__6781__auto____$1)){
return ((new_perc__$1 >= (0))) && ((next_width >= (0)));
} else {
return and__6781__auto____$1;
}
} else {
return and__6781__auto__;
}
})())){
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"width","width",-384071477),new_perc__$1], null));

if(cljs.core.truth_(ts)){
return lt.object.merge_BANG_.call(null,ts,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"width","width",-384071477),next_width], null));
} else {
return lt.objs.tabs.spawn_tabset.call(null);
}
} else {
return null;
}
}
}

}
}
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.tabs","set-width-final!","lt.objs.tabs/set-width-final!",-1151875517),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"end-drag","end-drag",1040662768),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.tabs.__BEH__set_width_final_BANG_);
/**
 * 
 */
lt.objs.tabs.__BEH__width_BANG_ = (function lt$objs$tabs$__BEH__width_BANG_(this$,e){
var width = lt.util.dom.width.call(null,lt.object.__GT_content.call(null,lt.objs.tabs.multi));
var left = new cljs.core.Keyword(null,"left","left",-399115937).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.tabs.multi));
var cx = e.clientX;
var new_loc = ((width + left) - cx);
var new_perc = lt.objs.tabs.floored.call(null,((((100) - lt.objs.tabs.previous_tabset_width.call(null,this$)) - lt.objs.tabs.to_perc.call(null,width,new_loc)) | (0)));
var prev_width = new cljs.core.Keyword(null,"width","width",-384071477).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$));
var ts = lt.objs.tabs.next_tabset.call(null,this$);
var new_perc__$1 = (cljs.core.truth_((function (){var and__6781__auto__ = ts;
if(cljs.core.truth_(and__6781__auto__)){
return (new_perc >= (new cljs.core.Keyword(null,"width","width",-384071477).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ts)) + prev_width));
} else {
return and__6781__auto__;
}
})())?(new cljs.core.Keyword(null,"width","width",-384071477).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ts)) + prev_width):new_perc);
var next_width = lt.objs.tabs.floored.call(null,((cljs.core.not.call(null,ts))?(1):(new cljs.core.Keyword(null,"width","width",-384071477).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ts)) + (prev_width - new_perc__$1))));
if(cljs.core._EQ_.call(null,cx,(0))){
return null;
} else {
if((new_perc__$1 < (0))){
return lt.objs.tabs.temp_width.call(null,this$,(100));
} else {
if(cljs.core.truth_((function (){var and__6781__auto__ = cljs.core.not_EQ_.call(null,cx,(0));
if(and__6781__auto__){
var and__6781__auto____$1 = ts;
if(cljs.core.truth_(and__6781__auto____$1)){
return ((new_perc__$1 >= (0))) && ((next_width >= (0)));
} else {
return and__6781__auto____$1;
}
} else {
return and__6781__auto__;
}
})())){
lt.objs.tabs.temp_width.call(null,this$,new_perc__$1);

if(cljs.core.truth_(ts)){
return lt.objs.tabs.temp_width.call(null,ts,next_width);
} else {
return lt.objs.tabs.spawn_tabset.call(null);
}
} else {
return null;
}
}
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.tabs","width!","lt.objs.tabs/width!",1614558757),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"width!","width!",-1196918001),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.tabs.__BEH__width_BANG_);
/**
 * 
 */
lt.objs.tabs.__BEH__tab_active = (function lt$objs$tabs$__BEH__tab_active(this$){
return lt.objs.tabs.activate_tabset.call(null,new cljs.core.Keyword("lt.objs.tabs","tabset","lt.objs.tabs/tabset",537008529).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.tabs","tab-active","lt.objs.tabs/tab-active",-620100173),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"active","active",1895962068),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.tabs.__BEH__tab_active);
/**
 * 
 */
lt.objs.tabs.__BEH__tab_label_menu_PLUS_ = (function lt$objs$tabs$__BEH__tab_label_menu_PLUS_(this$,items){
return cljs.core.conj.call(null,items,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"label","label",1718410804),"Move tab to new tabset",new cljs.core.Keyword(null,"order","order",-1254677256),(1),new cljs.core.Keyword(null,"click","click",1912301393),(function (){
return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"tabs.move-new-tabset","tabs.move-new-tabset",1738043385),new cljs.core.Keyword("lt.objs.tabs","tab-object","lt.objs.tabs/tab-object",-1393652919).cljs$core$IFn$_invoke$arity$1(this$));
})], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"label","label",1718410804),"Close tab",new cljs.core.Keyword(null,"order","order",-1254677256),(2),new cljs.core.Keyword(null,"click","click",1912301393),(function (){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"close","close",1835149582));
})], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.tabs","tab-label-menu+","lt.objs.tabs/tab-label-menu+",847677217),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"menu+","menu+",276559402),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.tabs.__BEH__tab_label_menu_PLUS_);
/**
 * 
 */
lt.objs.tabs.__BEH__on_close_tab_label = (function lt$objs$tabs$__BEH__on_close_tab_label(this$){
var temp__4657__auto___15033 = new cljs.core.Keyword("lt.objs.tabs","tab-object","lt.objs.tabs/tab-object",-1393652919).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$));
if(cljs.core.truth_(temp__4657__auto___15033)){
var e_15034 = temp__4657__auto___15033;
lt.object.raise.call(null,e_15034,new cljs.core.Keyword(null,"close","close",1835149582));
} else {
}

return lt.object.destroy_BANG_.call(null,this$);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.tabs","on-close-tab-label","lt.objs.tabs/on-close-tab-label",-737157273),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"close","close",1835149582),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.tabs.__BEH__on_close_tab_label);
/**
 * 
 */
lt.objs.tabs.__BEH__tabset_active = (function lt$objs$tabs$__BEH__tabset_active(this$){
if(cljs.core.truth_(lt.objs.tabs.activate_tabset.call(null,this$))){
var temp__4657__auto__ = new cljs.core.Keyword(null,"active-obj","active-obj",-1861497999).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$));
if(cljs.core.truth_(temp__4657__auto__)){
var active = temp__4657__auto__;
return lt.object.raise.call(null,active,new cljs.core.Keyword(null,"focus!","focus!",-1344984927));
} else {
return null;
}
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.tabs","tabset-active","lt.objs.tabs/tabset-active",-986840914),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"active","active",1895962068),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.tabs.__BEH__tabset_active);
/**
 * 
 */
lt.objs.tabs.__BEH__tabset_menu_PLUS_ = (function lt$objs$tabs$__BEH__tabset_menu_PLUS_(this$,items){
return cljs.core.conj.call(null,items,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"label","label",1718410804),"New tabset",new cljs.core.Keyword(null,"order","order",-1254677256),(1),new cljs.core.Keyword(null,"click","click",1912301393),(function (){
return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"tabset.new","tabset.new",555527396));
})], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"label","label",1718410804),"Close tabset",new cljs.core.Keyword(null,"order","order",-1254677256),(2),new cljs.core.Keyword(null,"click","click",1912301393),(function (){
return lt.objs.tabs.rem_tabset.call(null,this$);
})], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.tabs","tabset-menu+","lt.objs.tabs/tabset-menu+",-1930762267),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"menu+","menu+",276559402),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.tabs.__BEH__tabset_menu_PLUS_);
/**
 * 
 */
lt.objs.tabs.__BEH__left_BANG_ = (function lt$objs$tabs$__BEH__left_BANG_(this$,v){
return lt.object.update_BANG_.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"left","left",-399115937)], null),cljs.core._PLUS_,v);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.tabs","left!","lt.objs.tabs/left!",-1382539115),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"left!","left!",95716739),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.tabs.__BEH__left_BANG_);
/**
 * 
 */
lt.objs.tabs.__BEH__right_BANG_ = (function lt$objs$tabs$__BEH__right_BANG_(this$,v){
return lt.object.update_BANG_.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"right","right",-452581833)], null),cljs.core._PLUS_,v);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.tabs","right!","lt.objs.tabs/right!",-108321046),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"right!","right!",-1852411260),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.tabs.__BEH__right_BANG_);
/**
 * 
 */
lt.objs.tabs.__BEH__bottom_BANG_ = (function lt$objs$tabs$__BEH__bottom_BANG_(this$,v){
return lt.object.update_BANG_.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"bottom","bottom",-1550509018)], null),cljs.core._PLUS_,v);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.tabs","bottom!","lt.objs.tabs/bottom!",-444339102),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"bottom!","bottom!",-1649454228),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.tabs.__BEH__bottom_BANG_);
/**
 * 
 */
lt.objs.tabs.__BEH__tabset_bottom_BANG_ = (function lt$objs$tabs$__BEH__tabset_bottom_BANG_(this$,v){
return lt.object.update_BANG_.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tabset-bottom","tabset-bottom",-1366151689)], null),cljs.core._PLUS_,v);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.tabs","tabset-bottom!","lt.objs.tabs/tabset-bottom!",-2042688706),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tabset-bottom!","tabset-bottom!",507682936),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.tabs.__BEH__tabset_bottom_BANG_);
/**
 * 
 */
lt.objs.tabs.__BEH__init_sortable = (function lt$objs$tabs$__BEH__init_sortable(app){
return initSortable(window);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.tabs","init-sortable","lt.objs.tabs/init-sortable",-74771267),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"init","init",-1875481434),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.tabs.__BEH__init_sortable);
/**
 * 
 */
lt.objs.tabs.__BEH__init = (function lt$objs$tabs$__BEH__init(this$){
lt.objs.tabs.add_tabset.call(null,lt.objs.tabs.tabset);

return lt.object.raise.call(null,lt.objs.tabs.tabset,new cljs.core.Keyword(null,"active","active",1895962068));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.tabs","init","lt.objs.tabs/init",-134708812),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"init","init",-1875481434),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.tabs.__BEH__init);
/**
 * 
 */
lt.objs.tabs.__BEH__show_close_button = (function lt$objs$tabs$__BEH__show_close_button(this$){
return true;
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.tabs","show-close-button","lt.objs.tabs/show-close-button",-1196054485),new cljs.core.Keyword(null,"desc","desc",2093485764),"Tab: Show close button on tabs",new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"close-button+","close-button+",242728201),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.tabs.__BEH__show_close_button);
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"tabs.move-new-tabset","tabs.move-new-tabset",1738043385),new cljs.core.Keyword(null,"desc","desc",2093485764),"Tab: Move tab to new tabset",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (tab){
var temp__4657__auto__ = lt.objs.context.__GT_obj.call(null,new cljs.core.Keyword(null,"tabset","tabset",-939965333));
if(cljs.core.truth_(temp__4657__auto__)){
var ts = temp__4657__auto__;
var temp__4657__auto____$1 = (function (){var or__6793__auto__ = tab;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return cljs.core.deref.call(null,ts).call(null,new cljs.core.Keyword(null,"active-obj","active-obj",-1861497999));
}
})();
if(cljs.core.truth_(temp__4657__auto____$1)){
var cur = temp__4657__auto____$1;
var new$ = lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"tabset.new","tabset.new",555527396));
return lt.objs.tabs.move_tab_to_tabset.call(null,cur,new$);
} else {
return null;
}
} else {
return null;
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"tabs.move-next-tabset","tabs.move-next-tabset",1373096762),new cljs.core.Keyword(null,"desc","desc",2093485764),"Tab: Move tab to next tabset",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.context.__GT_obj.call(null,new cljs.core.Keyword(null,"tabset","tabset",-939965333));
if(cljs.core.truth_(temp__4657__auto__)){
var ts = temp__4657__auto__;
var cur = cljs.core.deref.call(null,ts).call(null,new cljs.core.Keyword(null,"active-obj","active-obj",-1861497999));
var next = (function (){var or__6793__auto__ = lt.objs.tabs.next_tabset.call(null,ts);
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return lt.objs.tabs.prev_tabset.call(null,ts);
}
})();
if(cljs.core.truth_((function (){var and__6781__auto__ = cur;
if(cljs.core.truth_(and__6781__auto__)){
var and__6781__auto____$1 = next;
if(cljs.core.truth_(and__6781__auto____$1)){
return cljs.core.not_EQ_.call(null,next,ts);
} else {
return and__6781__auto____$1;
}
} else {
return and__6781__auto__;
}
})())){
return lt.objs.tabs.move_tab_to_tabset.call(null,cur,next);
} else {
return null;
}
} else {
return null;
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"tabs.move-prev-tabset","tabs.move-prev-tabset",2013574967),new cljs.core.Keyword(null,"desc","desc",2093485764),"Tab: Move tab to previous tabset",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.context.__GT_obj.call(null,new cljs.core.Keyword(null,"tabset","tabset",-939965333));
if(cljs.core.truth_(temp__4657__auto__)){
var ts = temp__4657__auto__;
var cur = cljs.core.deref.call(null,ts).call(null,new cljs.core.Keyword(null,"active-obj","active-obj",-1861497999));
var next = (function (){var or__6793__auto__ = lt.objs.tabs.prev_tabset.call(null,ts);
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return lt.objs.tabs.next_tabset.call(null,ts);
}
})();
if(cljs.core.truth_((function (){var and__6781__auto__ = cur;
if(cljs.core.truth_(and__6781__auto__)){
var and__6781__auto____$1 = next;
if(cljs.core.truth_(and__6781__auto____$1)){
return cljs.core.not_EQ_.call(null,next,ts);
} else {
return and__6781__auto____$1;
}
} else {
return and__6781__auto__;
}
})())){
return lt.objs.tabs.move_tab_to_tabset.call(null,cur,next);
} else {
return null;
}
} else {
return null;
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"tabs.next","tabs.next",-1571168567),new cljs.core.Keyword(null,"desc","desc",2093485764),"Tab: Next tab",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.object.raise.call(null,lt.objs.context.__GT_obj.call(null,new cljs.core.Keyword(null,"tabset","tabset",-939965333)),new cljs.core.Keyword(null,"tab.next","tab.next",1698295260));
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"tabs.prev","tabs.prev",222924018),new cljs.core.Keyword(null,"desc","desc",2093485764),"Tab: Previous tab",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.object.raise.call(null,lt.objs.context.__GT_obj.call(null,new cljs.core.Keyword(null,"tabset","tabset",-939965333)),new cljs.core.Keyword(null,"tab.prev","tab.prev",-431940145));
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"tabs.close","tabs.close",-2075421183),new cljs.core.Keyword(null,"desc","desc",2093485764),"Tab: Close current tab",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
if(cljs.core._EQ_.call(null,(0),lt.objs.tabs.num_tabs.call(null))){
lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"window.close","window.close",-983383177));
} else {
}

var temp__4657__auto__ = lt.objs.context.__GT_obj.call(null,new cljs.core.Keyword(null,"tabset","tabset",-939965333));
if(cljs.core.truth_(temp__4657__auto__)){
var ts = temp__4657__auto__;
if(cljs.core.truth_((function (){var and__6781__auto__ = new cljs.core.Keyword(null,"active-obj","active-obj",-1861497999).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ts));
if(cljs.core.truth_(and__6781__auto__)){
return cljs.core.deref.call(null,new cljs.core.Keyword(null,"active-obj","active-obj",-1861497999).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ts)));
} else {
return and__6781__auto__;
}
})())){
return lt.object.raise.call(null,ts,new cljs.core.Keyword(null,"tab.close","tab.close",1796241467));
} else {
return null;
}
} else {
return null;
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"tabs.close-all","tabs.close-all",873536002),new cljs.core.Keyword(null,"desc","desc",2093485764),"Tabs: Close all tabs",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var objs = lt.object.by_tag.call(null,new cljs.core.Keyword(null,"tabset.tab","tabset.tab",745554398));
var seq__15035 = cljs.core.seq.call(null,objs);
var chunk__15036 = null;
var count__15037 = (0);
var i__15038 = (0);
while(true){
if((i__15038 < count__15037)){
var obj = cljs.core._nth.call(null,chunk__15036,i__15038);
lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"close","close",1835149582));

var G__15039 = seq__15035;
var G__15040 = chunk__15036;
var G__15041 = count__15037;
var G__15042 = (i__15038 + (1));
seq__15035 = G__15039;
chunk__15036 = G__15040;
count__15037 = G__15041;
i__15038 = G__15042;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__15035);
if(temp__4657__auto__){
var seq__15035__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15035__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__15035__$1);
var G__15043 = cljs.core.chunk_rest.call(null,seq__15035__$1);
var G__15044 = c__7604__auto__;
var G__15045 = cljs.core.count.call(null,c__7604__auto__);
var G__15046 = (0);
seq__15035 = G__15043;
chunk__15036 = G__15044;
count__15037 = G__15045;
i__15038 = G__15046;
continue;
} else {
var obj = cljs.core.first.call(null,seq__15035__$1);
lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"close","close",1835149582));

var G__15047 = cljs.core.next.call(null,seq__15035__$1);
var G__15048 = null;
var G__15049 = (0);
var G__15050 = (0);
seq__15035 = G__15047;
chunk__15036 = G__15048;
count__15037 = G__15049;
i__15038 = G__15050;
continue;
}
} else {
return null;
}
}
break;
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"tabs.close-others","tabs.close-others",-579380376),new cljs.core.Keyword(null,"desc","desc",2093485764),"Tabs: Close tabs except current tab",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var cur = lt.objs.tabs.active_tab.call(null);
var objs = lt.object.by_tag.call(null,new cljs.core.Keyword(null,"tabset.tab","tabset.tab",745554398));
var seq__15051 = cljs.core.seq.call(null,objs);
var chunk__15052 = null;
var count__15053 = (0);
var i__15054 = (0);
while(true){
if((i__15054 < count__15053)){
var obj = cljs.core._nth.call(null,chunk__15052,i__15054);
if(!((cur === obj))){
lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"close","close",1835149582));
} else {
}

var G__15055 = seq__15051;
var G__15056 = chunk__15052;
var G__15057 = count__15053;
var G__15058 = (i__15054 + (1));
seq__15051 = G__15055;
chunk__15052 = G__15056;
count__15053 = G__15057;
i__15054 = G__15058;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__15051);
if(temp__4657__auto__){
var seq__15051__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15051__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__15051__$1);
var G__15059 = cljs.core.chunk_rest.call(null,seq__15051__$1);
var G__15060 = c__7604__auto__;
var G__15061 = cljs.core.count.call(null,c__7604__auto__);
var G__15062 = (0);
seq__15051 = G__15059;
chunk__15052 = G__15060;
count__15053 = G__15061;
i__15054 = G__15062;
continue;
} else {
var obj = cljs.core.first.call(null,seq__15051__$1);
if(!((cur === obj))){
lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"close","close",1835149582));
} else {
}

var G__15063 = cljs.core.next.call(null,seq__15051__$1);
var G__15064 = null;
var G__15065 = (0);
var G__15066 = (0);
seq__15051 = G__15063;
chunk__15052 = G__15064;
count__15053 = G__15065;
i__15054 = G__15066;
continue;
}
} else {
return null;
}
}
break;
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"tabs.goto","tabs.goto",-1325782376),new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"desc","desc",2093485764),"Tab: Goto tab # or :last",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (x){
var ts = lt.objs.context.__GT_obj.call(null,new cljs.core.Keyword(null,"tabset","tabset",-939965333));
var tab_count = cljs.core.count.call(null,new cljs.core.Keyword(null,"objs","objs",-1810725634).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ts)));
var idx = (tab_count - (1));
return lt.object.raise.call(null,lt.objs.context.__GT_obj.call(null,new cljs.core.Keyword(null,"tabset","tabset",-939965333)),new cljs.core.Keyword(null,"tab","tab",-559583621),((cljs.core._EQ_.call(null,x,new cljs.core.Keyword(null,"last","last",1105735132)))?idx:x));
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"tabset.next","tabset.next",-2061659668),new cljs.core.Keyword(null,"desc","desc",2093485764),"Tabset: Next tabset",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4655__auto__ = lt.objs.tabs.next_tabset.call(null,lt.objs.context.__GT_obj.call(null,new cljs.core.Keyword(null,"tabset","tabset",-939965333)));
if(cljs.core.truth_(temp__4655__auto__)){
var n = temp__4655__auto__;
return lt.object.raise.call(null,n,new cljs.core.Keyword(null,"active","active",1895962068));
} else {
var temp__4655__auto____$1 = cljs.core.get.call(null,new cljs.core.Keyword(null,"tabsets","tabsets",-1794190722).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.tabs.multi)),(0));
if(cljs.core.truth_(temp__4655__auto____$1)){
var n = temp__4655__auto____$1;
return lt.object.raise.call(null,n,new cljs.core.Keyword(null,"active","active",1895962068));
} else {
return null;
}
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"tabset.prev","tabset.prev",-1656730631),new cljs.core.Keyword(null,"desc","desc",2093485764),"Tabset: Previous tabset",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4655__auto__ = lt.objs.tabs.prev_tabset.call(null,lt.objs.context.__GT_obj.call(null,new cljs.core.Keyword(null,"tabset","tabset",-939965333)));
if(cljs.core.truth_(temp__4655__auto__)){
var n = temp__4655__auto__;
return lt.object.raise.call(null,n,new cljs.core.Keyword(null,"active","active",1895962068));
} else {
var temp__4655__auto____$1 = cljs.core.last.call(null,new cljs.core.Keyword(null,"tabsets","tabsets",-1794190722).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.tabs.multi)));
if(cljs.core.truth_(temp__4655__auto____$1)){
var n = temp__4655__auto____$1;
return lt.object.raise.call(null,n,new cljs.core.Keyword(null,"active","active",1895962068));
} else {
return null;
}
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"tabset.close","tabset.close",-906692340),new cljs.core.Keyword(null,"desc","desc",2093485764),"Tabset: Remove active tabset",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (ts){
return lt.objs.tabs.rem_tabset.call(null,lt.objs.context.__GT_obj.call(null,new cljs.core.Keyword(null,"tabset","tabset",-939965333)));
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"tabset.new","tabset.new",555527396),new cljs.core.Keyword(null,"desc","desc",2093485764),"Tabset: Add a tabset",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var ts = lt.objs.tabs.spawn_tabset.call(null);
lt.objs.tabs.equalize_tabset_widths.call(null);

return ts;
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"tabs.focus-active","tabs.focus-active",-2052283963),new cljs.core.Keyword(null,"desc","desc",2093485764),"Tab: focus active",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = new cljs.core.Keyword(null,"active-obj","active-obj",-1861497999).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.context.__GT_obj.call(null,new cljs.core.Keyword(null,"tabset","tabset",-939965333))));
if(cljs.core.truth_(temp__4657__auto__)){
var active = temp__4657__auto__;
return lt.object.raise.call(null,active,new cljs.core.Keyword(null,"focus!","focus!",-1344984927));
} else {
return null;
}
})], null));
lt.util.dom.append.call(null,lt.object.__GT_content.call(null,lt.objs.canvas.canvas),new cljs.core.Keyword(null,"content","content",15833224).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.tabs.multi)));
