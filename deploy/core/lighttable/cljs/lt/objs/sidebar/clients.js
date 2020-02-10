// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.objs.sidebar.clients');
goog.require('cljs.core');
goog.require('lt.objs.command');
goog.require('lt.objs.context');
goog.require('lt.object');
goog.require('lt.util.dom');
goog.require('lt.objs.popup');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.clients.ws');
goog.require('lt.objs.clients.tcp');
goog.require('lt.objs.sidebar');
goog.require('lt.objs.clients');
goog.require('crate.binding');
/**
 * 
 */
lt.objs.sidebar.clients.close_button = (function lt$objs$sidebar$clients$close_button(i){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.button","span.button",-541834575),"disconnect"], null));
var seq__18716_18726 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (){
return lt.objs.clients.close_BANG_.call(null,i);
});})(e__7942__auto__))
], null)));
var chunk__18717_18727 = null;
var count__18718_18728 = (0);
var i__18719_18729 = (0);
while(true){
if((i__18719_18729 < count__18718_18728)){
var vec__18720_18730 = cljs.core._nth.call(null,chunk__18717_18727,i__18719_18729);
var ev__7943__auto___18731 = cljs.core.nth.call(null,vec__18720_18730,(0),null);
var func__7944__auto___18732 = cljs.core.nth.call(null,vec__18720_18730,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___18731,func__7944__auto___18732);

var G__18733 = seq__18716_18726;
var G__18734 = chunk__18717_18727;
var G__18735 = count__18718_18728;
var G__18736 = (i__18719_18729 + (1));
seq__18716_18726 = G__18733;
chunk__18717_18727 = G__18734;
count__18718_18728 = G__18735;
i__18719_18729 = G__18736;
continue;
} else {
var temp__4657__auto___18737 = cljs.core.seq.call(null,seq__18716_18726);
if(temp__4657__auto___18737){
var seq__18716_18738__$1 = temp__4657__auto___18737;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__18716_18738__$1)){
var c__7604__auto___18739 = cljs.core.chunk_first.call(null,seq__18716_18738__$1);
var G__18740 = cljs.core.chunk_rest.call(null,seq__18716_18738__$1);
var G__18741 = c__7604__auto___18739;
var G__18742 = cljs.core.count.call(null,c__7604__auto___18739);
var G__18743 = (0);
seq__18716_18726 = G__18740;
chunk__18717_18727 = G__18741;
count__18718_18728 = G__18742;
i__18719_18729 = G__18743;
continue;
} else {
var vec__18723_18744 = cljs.core.first.call(null,seq__18716_18738__$1);
var ev__7943__auto___18745 = cljs.core.nth.call(null,vec__18723_18744,(0),null);
var func__7944__auto___18746 = cljs.core.nth.call(null,vec__18723_18744,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___18745,func__7944__auto___18746);

var G__18747 = cljs.core.next.call(null,seq__18716_18738__$1);
var G__18748 = null;
var G__18749 = (0);
var G__18750 = (0);
seq__18716_18726 = G__18747;
chunk__18717_18727 = G__18748;
count__18718_18728 = G__18749;
i__18719_18729 = G__18750;
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
lt.objs.sidebar.clients.unset_button = (function lt$objs$sidebar$clients$unset_button(i){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.button.unset","span.button.unset",1134519990),"unset"], null));
var seq__18761_18771 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (){
return lt.object.raise.call(null,lt.objs.sidebar.clients.clients,new cljs.core.Keyword(null,"unset!","unset!",-746079964),i);
});})(e__7942__auto__))
], null)));
var chunk__18762_18772 = null;
var count__18763_18773 = (0);
var i__18764_18774 = (0);
while(true){
if((i__18764_18774 < count__18763_18773)){
var vec__18765_18775 = cljs.core._nth.call(null,chunk__18762_18772,i__18764_18774);
var ev__7943__auto___18776 = cljs.core.nth.call(null,vec__18765_18775,(0),null);
var func__7944__auto___18777 = cljs.core.nth.call(null,vec__18765_18775,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___18776,func__7944__auto___18777);

var G__18778 = seq__18761_18771;
var G__18779 = chunk__18762_18772;
var G__18780 = count__18763_18773;
var G__18781 = (i__18764_18774 + (1));
seq__18761_18771 = G__18778;
chunk__18762_18772 = G__18779;
count__18763_18773 = G__18780;
i__18764_18774 = G__18781;
continue;
} else {
var temp__4657__auto___18782 = cljs.core.seq.call(null,seq__18761_18771);
if(temp__4657__auto___18782){
var seq__18761_18783__$1 = temp__4657__auto___18782;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__18761_18783__$1)){
var c__7604__auto___18784 = cljs.core.chunk_first.call(null,seq__18761_18783__$1);
var G__18785 = cljs.core.chunk_rest.call(null,seq__18761_18783__$1);
var G__18786 = c__7604__auto___18784;
var G__18787 = cljs.core.count.call(null,c__7604__auto___18784);
var G__18788 = (0);
seq__18761_18771 = G__18785;
chunk__18762_18772 = G__18786;
count__18763_18773 = G__18787;
i__18764_18774 = G__18788;
continue;
} else {
var vec__18768_18789 = cljs.core.first.call(null,seq__18761_18783__$1);
var ev__7943__auto___18790 = cljs.core.nth.call(null,vec__18768_18789,(0),null);
var func__7944__auto___18791 = cljs.core.nth.call(null,vec__18768_18789,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___18790,func__7944__auto___18791);

var G__18792 = cljs.core.next.call(null,seq__18761_18783__$1);
var G__18793 = null;
var G__18794 = (0);
var G__18795 = (0);
seq__18761_18771 = G__18792;
chunk__18762_18772 = G__18793;
count__18763_18773 = G__18794;
i__18764_18774 = G__18795;
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
lt.objs.sidebar.clients.add_button = (function lt$objs$sidebar$clients$add_button(this$){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2.toggle.add.button","h2.toggle.add.button",-720907209),"Add Connection"], null));
var seq__18806_18816 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"selecting!","selecting!",-1304548141));
});})(e__7942__auto__))
], null)));
var chunk__18807_18817 = null;
var count__18808_18818 = (0);
var i__18809_18819 = (0);
while(true){
if((i__18809_18819 < count__18808_18818)){
var vec__18810_18820 = cljs.core._nth.call(null,chunk__18807_18817,i__18809_18819);
var ev__7943__auto___18821 = cljs.core.nth.call(null,vec__18810_18820,(0),null);
var func__7944__auto___18822 = cljs.core.nth.call(null,vec__18810_18820,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___18821,func__7944__auto___18822);

var G__18823 = seq__18806_18816;
var G__18824 = chunk__18807_18817;
var G__18825 = count__18808_18818;
var G__18826 = (i__18809_18819 + (1));
seq__18806_18816 = G__18823;
chunk__18807_18817 = G__18824;
count__18808_18818 = G__18825;
i__18809_18819 = G__18826;
continue;
} else {
var temp__4657__auto___18827 = cljs.core.seq.call(null,seq__18806_18816);
if(temp__4657__auto___18827){
var seq__18806_18828__$1 = temp__4657__auto___18827;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__18806_18828__$1)){
var c__7604__auto___18829 = cljs.core.chunk_first.call(null,seq__18806_18828__$1);
var G__18830 = cljs.core.chunk_rest.call(null,seq__18806_18828__$1);
var G__18831 = c__7604__auto___18829;
var G__18832 = cljs.core.count.call(null,c__7604__auto___18829);
var G__18833 = (0);
seq__18806_18816 = G__18830;
chunk__18807_18817 = G__18831;
count__18808_18818 = G__18832;
i__18809_18819 = G__18833;
continue;
} else {
var vec__18813_18834 = cljs.core.first.call(null,seq__18806_18828__$1);
var ev__7943__auto___18835 = cljs.core.nth.call(null,vec__18813_18834,(0),null);
var func__7944__auto___18836 = cljs.core.nth.call(null,vec__18813_18834,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___18835,func__7944__auto___18836);

var G__18837 = cljs.core.next.call(null,seq__18806_18828__$1);
var G__18838 = null;
var G__18839 = (0);
var G__18840 = (0);
seq__18806_18816 = G__18837;
chunk__18807_18817 = G__18838;
count__18808_18818 = G__18839;
i__18809_18819 = G__18840;
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
lt.objs.sidebar.clients.choose_cancel = (function lt$objs$sidebar$clients$choose_cancel(this$){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2.toggle.button","h2.toggle.button",-1009920550),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),"Choose a client type"], null)], null));
var seq__18851_18861 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"cancel","cancel",-1964088360));
});})(e__7942__auto__))
], null)));
var chunk__18852_18862 = null;
var count__18853_18863 = (0);
var i__18854_18864 = (0);
while(true){
if((i__18854_18864 < count__18853_18863)){
var vec__18855_18865 = cljs.core._nth.call(null,chunk__18852_18862,i__18854_18864);
var ev__7943__auto___18866 = cljs.core.nth.call(null,vec__18855_18865,(0),null);
var func__7944__auto___18867 = cljs.core.nth.call(null,vec__18855_18865,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___18866,func__7944__auto___18867);

var G__18868 = seq__18851_18861;
var G__18869 = chunk__18852_18862;
var G__18870 = count__18853_18863;
var G__18871 = (i__18854_18864 + (1));
seq__18851_18861 = G__18868;
chunk__18852_18862 = G__18869;
count__18853_18863 = G__18870;
i__18854_18864 = G__18871;
continue;
} else {
var temp__4657__auto___18872 = cljs.core.seq.call(null,seq__18851_18861);
if(temp__4657__auto___18872){
var seq__18851_18873__$1 = temp__4657__auto___18872;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__18851_18873__$1)){
var c__7604__auto___18874 = cljs.core.chunk_first.call(null,seq__18851_18873__$1);
var G__18875 = cljs.core.chunk_rest.call(null,seq__18851_18873__$1);
var G__18876 = c__7604__auto___18874;
var G__18877 = cljs.core.count.call(null,c__7604__auto___18874);
var G__18878 = (0);
seq__18851_18861 = G__18875;
chunk__18852_18862 = G__18876;
count__18853_18863 = G__18877;
i__18854_18864 = G__18878;
continue;
} else {
var vec__18858_18879 = cljs.core.first.call(null,seq__18851_18873__$1);
var ev__7943__auto___18880 = cljs.core.nth.call(null,vec__18858_18879,(0),null);
var func__7944__auto___18881 = cljs.core.nth.call(null,vec__18858_18879,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___18880,func__7944__auto___18881);

var G__18882 = cljs.core.next.call(null,seq__18851_18873__$1);
var G__18883 = null;
var G__18884 = (0);
var G__18885 = (0);
seq__18851_18861 = G__18882;
chunk__18852_18862 = G__18883;
count__18853_18863 = G__18884;
i__18854_18864 = G__18885;
continue;
}
} else {
}
}
break;
}

return e__7942__auto__;
});
lt.objs.sidebar.clients.__GT_active_QMARK_ = (function lt$objs$sidebar$clients$__GT_active_QMARK_(cur,clients){
var actives = new cljs.core.Keyword(null,"active","active",1895962068).cljs$core$IFn$_invoke$arity$1(clients);
var found_QMARK_ = cljs.core.first.call(null,cljs.core.filter.call(null,((function (actives){
return (function (p1__18886_SHARP_){
return cljs.core._EQ_.call(null,cur,cljs.core.val.call(null,p1__18886_SHARP_));
});})(actives))
,actives));
var connected_QMARK_ = new cljs.core.Keyword(null,"connected","connected",-169833045).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cur));
if(cljs.core.truth_((function (){var and__6781__auto__ = found_QMARK_;
if(cljs.core.truth_(and__6781__auto__)){
return connected_QMARK_;
} else {
return and__6781__auto__;
}
})())){
return [cljs.core.str("active client-"),cljs.core.str(cljs.core.name.call(null,cljs.core.first.call(null,found_QMARK_)))].join('');
} else {
return "";
}
});
lt.objs.sidebar.clients.client_item_STAR_ = (function lt$objs$sidebar$clients$client_item_STAR_(i){
if(cljs.core.truth_(new cljs.core.Keyword(null,"connected","connected",-169833045).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,i)))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,i))], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.details","div.details",-1501667044),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"table","table",-564943036),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),"Type"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,i))], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),"Commands"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",-1349521403),(function (){var iter__7573__auto__ = (function lt$objs$sidebar$clients$client_item_STAR__$_iter__18891(s__18892){
return (new cljs.core.LazySeq(null,(function (){
var s__18892__$1 = s__18892;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__18892__$1);
if(temp__4657__auto__){
var s__18892__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__18892__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__18892__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__18894 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__18893 = (0);
while(true){
if((i__18893 < size__7572__auto__)){
var c = cljs.core._nth.call(null,c__7571__auto__,i__18893);
cljs.core.chunk_append.call(null,b__18894,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),c], null));

var G__18895 = (i__18893 + (1));
i__18893 = G__18895;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__18894),lt$objs$sidebar$clients$client_item_STAR__$_iter__18891.call(null,cljs.core.chunk_rest.call(null,s__18892__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__18894),null);
}
} else {
var c = cljs.core.first.call(null,s__18892__$2);
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),c], null),lt$objs$sidebar$clients$client_item_STAR__$_iter__18891.call(null,cljs.core.rest.call(null,s__18892__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__7573__auto__.call(null,new cljs.core.Keyword(null,"commands","commands",161008658).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,i)));
})()], null)], null)], null)], null),lt.objs.sidebar.clients.close_button.call(null,i),lt.objs.sidebar.clients.unset_button.call(null,i)], null)], null);
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.connecting","div.connecting",1312828909),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.load-wrapper","div.load-wrapper",1353254593),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.img","div.img",2113685181)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"Connecting.."], null)], null);
}
});
lt.objs.sidebar.clients.connector_QMARK_ = (function lt$objs$sidebar$clients$connector_QMARK_(clients){
return [cljs.core.str("clients "),cljs.core.str((cljs.core.truth_(new cljs.core.Keyword(null,"selecting?","selecting?",1157912914).cljs$core$IFn$_invoke$arity$1(clients))?"selecting":"")),cljs.core.str((cljs.core.truth_(lt.util.dom.has_class_QMARK_.call(null,new cljs.core.Keyword(null,"content","content",15833224).cljs$core$IFn$_invoke$arity$1(clients),new cljs.core.Keyword(null,"active","active",1895962068)))?" active":null))].join('');
});
/**
 * 
 */
lt.objs.sidebar.clients.client_item = (function lt$objs$sidebar$clients$client_item(clients,i){
var e__7942__auto__ = crate.core.html.call(null,(function (){var i__$1 = cljs.core.deref.call(null,i);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),crate.binding.bound.call(null,clients,((function (i__$1){
return (function (p1__18896_SHARP_){
return lt.objs.sidebar.clients.__GT_active_QMARK_.call(null,i__$1,p1__18896_SHARP_);
});})(i__$1))
)], null),crate.binding.bound.call(null,i__$1,((function (i__$1){
return (function (){
return lt.objs.sidebar.clients.client_item_STAR_.call(null,i__$1);
});})(i__$1))
)], null);
})());
var seq__18907_18917 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),cljs.core.PersistentVector.EMPTY));
var chunk__18908_18918 = null;
var count__18909_18919 = (0);
var i__18910_18920 = (0);
while(true){
if((i__18910_18920 < count__18909_18919)){
var vec__18911_18921 = cljs.core._nth.call(null,chunk__18908_18918,i__18910_18920);
var ev__7943__auto___18922 = cljs.core.nth.call(null,vec__18911_18921,(0),null);
var func__7944__auto___18923 = cljs.core.nth.call(null,vec__18911_18921,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___18922,func__7944__auto___18923);

var G__18924 = seq__18907_18917;
var G__18925 = chunk__18908_18918;
var G__18926 = count__18909_18919;
var G__18927 = (i__18910_18920 + (1));
seq__18907_18917 = G__18924;
chunk__18908_18918 = G__18925;
count__18909_18919 = G__18926;
i__18910_18920 = G__18927;
continue;
} else {
var temp__4657__auto___18928 = cljs.core.seq.call(null,seq__18907_18917);
if(temp__4657__auto___18928){
var seq__18907_18929__$1 = temp__4657__auto___18928;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__18907_18929__$1)){
var c__7604__auto___18930 = cljs.core.chunk_first.call(null,seq__18907_18929__$1);
var G__18931 = cljs.core.chunk_rest.call(null,seq__18907_18929__$1);
var G__18932 = c__7604__auto___18930;
var G__18933 = cljs.core.count.call(null,c__7604__auto___18930);
var G__18934 = (0);
seq__18907_18917 = G__18931;
chunk__18908_18918 = G__18932;
count__18909_18919 = G__18933;
i__18910_18920 = G__18934;
continue;
} else {
var vec__18914_18935 = cljs.core.first.call(null,seq__18907_18929__$1);
var ev__7943__auto___18936 = cljs.core.nth.call(null,vec__18914_18935,(0),null);
var func__7944__auto___18937 = cljs.core.nth.call(null,vec__18914_18935,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___18936,func__7944__auto___18937);

var G__18938 = cljs.core.next.call(null,seq__18907_18929__$1);
var G__18939 = null;
var G__18940 = (0);
var G__18941 = (0);
seq__18907_18917 = G__18938;
chunk__18908_18918 = G__18939;
count__18909_18919 = G__18940;
i__18910_18920 = G__18941;
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
lt.objs.sidebar.clients.connection_type = (function lt$objs$sidebar$clients$connection_type(this$,i){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),i.call(null,new cljs.core.Keyword(null,"name","name",1843675177))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),i.call(null,new cljs.core.Keyword(null,"desc","desc",2093485764))], null)], null));
var seq__18952_18962 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (){
lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"selected","selected",574897764));

return new cljs.core.Keyword(null,"connect","connect",1232828233).cljs$core$IFn$_invoke$arity$1(i).call(null);
});})(e__7942__auto__))
], null)));
var chunk__18953_18963 = null;
var count__18954_18964 = (0);
var i__18955_18965 = (0);
while(true){
if((i__18955_18965 < count__18954_18964)){
var vec__18956_18966 = cljs.core._nth.call(null,chunk__18953_18963,i__18955_18965);
var ev__7943__auto___18967 = cljs.core.nth.call(null,vec__18956_18966,(0),null);
var func__7944__auto___18968 = cljs.core.nth.call(null,vec__18956_18966,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___18967,func__7944__auto___18968);

var G__18969 = seq__18952_18962;
var G__18970 = chunk__18953_18963;
var G__18971 = count__18954_18964;
var G__18972 = (i__18955_18965 + (1));
seq__18952_18962 = G__18969;
chunk__18953_18963 = G__18970;
count__18954_18964 = G__18971;
i__18955_18965 = G__18972;
continue;
} else {
var temp__4657__auto___18973 = cljs.core.seq.call(null,seq__18952_18962);
if(temp__4657__auto___18973){
var seq__18952_18974__$1 = temp__4657__auto___18973;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__18952_18974__$1)){
var c__7604__auto___18975 = cljs.core.chunk_first.call(null,seq__18952_18974__$1);
var G__18976 = cljs.core.chunk_rest.call(null,seq__18952_18974__$1);
var G__18977 = c__7604__auto___18975;
var G__18978 = cljs.core.count.call(null,c__7604__auto___18975);
var G__18979 = (0);
seq__18952_18962 = G__18976;
chunk__18953_18963 = G__18977;
count__18954_18964 = G__18978;
i__18955_18965 = G__18979;
continue;
} else {
var vec__18959_18980 = cljs.core.first.call(null,seq__18952_18974__$1);
var ev__7943__auto___18981 = cljs.core.nth.call(null,vec__18959_18980,(0),null);
var func__7944__auto___18982 = cljs.core.nth.call(null,vec__18959_18980,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___18981,func__7944__auto___18982);

var G__18983 = cljs.core.next.call(null,seq__18952_18974__$1);
var G__18984 = null;
var G__18985 = (0);
var G__18986 = (0);
seq__18952_18962 = G__18983;
chunk__18953_18963 = G__18984;
count__18954_18964 = G__18985;
i__18955_18965 = G__18986;
continue;
}
} else {
}
}
break;
}

return e__7942__auto__;
});
lt.objs.sidebar.clients.connectors = (function lt$objs$sidebar$clients$connectors(this$,connectors__$1){
var iter__7573__auto__ = (function lt$objs$sidebar$clients$connectors_$_iter__19003(s__19004){
return (new cljs.core.LazySeq(null,(function (){
var s__19004__$1 = s__19004;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__19004__$1);
if(temp__4657__auto__){
var s__19004__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__19004__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__19004__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__19006 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__19005 = (0);
while(true){
if((i__19005 < size__7572__auto__)){
var vec__19013 = cljs.core._nth.call(null,c__7571__auto__,i__19005);
var k = cljs.core.nth.call(null,vec__19013,(0),null);
var c = cljs.core.nth.call(null,vec__19013,(1),null);
cljs.core.chunk_append.call(null,b__19006,lt.objs.sidebar.clients.connection_type.call(null,this$,c));

var G__19019 = (i__19005 + (1));
i__19005 = G__19019;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__19006),lt$objs$sidebar$clients$connectors_$_iter__19003.call(null,cljs.core.chunk_rest.call(null,s__19004__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__19006),null);
}
} else {
var vec__19016 = cljs.core.first.call(null,s__19004__$2);
var k = cljs.core.nth.call(null,vec__19016,(0),null);
var c = cljs.core.nth.call(null,vec__19016,(1),null);
return cljs.core.cons.call(null,lt.objs.sidebar.clients.connection_type.call(null,this$,c),lt$objs$sidebar$clients$connectors_$_iter__19003.call(null,cljs.core.rest.call(null,s__19004__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__7573__auto__.call(null,connectors__$1);
});
/**
 * 
 */
lt.objs.sidebar.clients.connect_ui = (function lt$objs$sidebar$clients$connect_ui(this$){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"class","class",-2030961996),crate.binding.bound.call(null,this$,lt.objs.sidebar.clients.connector_QMARK_),new cljs.core.Keyword(null,"tabindex","tabindex",338877510),(-1)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.list","div.list",-1638405495),lt.objs.sidebar.clients.add_button.call(null,this$),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",-1349521403),crate.binding.map_bound.call(null,cljs.core.partial.call(null,lt.objs.sidebar.clients.client_item,this$),lt.objs.clients.cs)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.connector","div.connector",-1710598826),lt.objs.sidebar.clients.choose_cancel.call(null,this$),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",-1349521403),crate.binding.bound.call(null,crate.binding.subatom.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"connectors","connectors",-1593180892)], null)),cljs.core.partial.call(null,lt.objs.sidebar.clients.connectors,this$))], null)], null)], null));
var seq__19030_19040 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"focus","focus",234677911),((function (e__7942__auto__){
return (function (){
return lt.objs.context.in_BANG_.call(null,new cljs.core.Keyword(null,"sidebar.clients","sidebar.clients",-1793475054),this$);
});})(e__7942__auto__))
,new cljs.core.Keyword(null,"blur","blur",-453500461),((function (e__7942__auto__){
return (function (){
return lt.objs.context.out_BANG_.call(null,new cljs.core.Keyword(null,"sidebar.clients","sidebar.clients",-1793475054),this$);
});})(e__7942__auto__))
], null)));
var chunk__19031_19041 = null;
var count__19032_19042 = (0);
var i__19033_19043 = (0);
while(true){
if((i__19033_19043 < count__19032_19042)){
var vec__19034_19044 = cljs.core._nth.call(null,chunk__19031_19041,i__19033_19043);
var ev__7943__auto___19045 = cljs.core.nth.call(null,vec__19034_19044,(0),null);
var func__7944__auto___19046 = cljs.core.nth.call(null,vec__19034_19044,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___19045,func__7944__auto___19046);

var G__19047 = seq__19030_19040;
var G__19048 = chunk__19031_19041;
var G__19049 = count__19032_19042;
var G__19050 = (i__19033_19043 + (1));
seq__19030_19040 = G__19047;
chunk__19031_19041 = G__19048;
count__19032_19042 = G__19049;
i__19033_19043 = G__19050;
continue;
} else {
var temp__4657__auto___19051 = cljs.core.seq.call(null,seq__19030_19040);
if(temp__4657__auto___19051){
var seq__19030_19052__$1 = temp__4657__auto___19051;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__19030_19052__$1)){
var c__7604__auto___19053 = cljs.core.chunk_first.call(null,seq__19030_19052__$1);
var G__19054 = cljs.core.chunk_rest.call(null,seq__19030_19052__$1);
var G__19055 = c__7604__auto___19053;
var G__19056 = cljs.core.count.call(null,c__7604__auto___19053);
var G__19057 = (0);
seq__19030_19040 = G__19054;
chunk__19031_19041 = G__19055;
count__19032_19042 = G__19056;
i__19033_19043 = G__19057;
continue;
} else {
var vec__19037_19058 = cljs.core.first.call(null,seq__19030_19052__$1);
var ev__7943__auto___19059 = cljs.core.nth.call(null,vec__19037_19058,(0),null);
var func__7944__auto___19060 = cljs.core.nth.call(null,vec__19037_19058,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___19059,func__7944__auto___19060);

var G__19061 = cljs.core.next.call(null,seq__19030_19052__$1);
var G__19062 = null;
var G__19063 = (0);
var G__19064 = (0);
seq__19030_19040 = G__19061;
chunk__19031_19041 = G__19062;
count__19032_19042 = G__19063;
i__19033_19043 = G__19064;
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
lt.objs.sidebar.clients.__BEH__track_active_client = (function lt$objs$sidebar$clients$__BEH__track_active_client(ed){
return lt.object.merge_BANG_.call(null,lt.objs.sidebar.clients.clients,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"active","active",1895962068),new cljs.core.Keyword(null,"client","client",-1323448117).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed))], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.clients","track-active-client","lt.objs.sidebar.clients/track-active-client",-271987567),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"active","active",1895962068),null,new cljs.core.Keyword(null,"set-client","set-client",-1338996324),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.clients.__BEH__track_active_client);
/**
 * 
 */
lt.objs.sidebar.clients.__BEH__unset_client = (function lt$objs$sidebar$clients$__BEH__unset_client(this$,cur){
var ed = lt.objs.editor.pool.last_active.call(null);
var actives = new cljs.core.Keyword(null,"client","client",-1323448117).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed));
var found_QMARK_ = cljs.core.first.call(null,cljs.core.filter.call(null,((function (ed,actives){
return (function (p1__19065_SHARP_){
return cljs.core._EQ_.call(null,cur,cljs.core.val.call(null,p1__19065_SHARP_));
});})(ed,actives))
,actives));
if(cljs.core.truth_(found_QMARK_)){
lt.object.update_BANG_.call(null,ed,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"client","client",-1323448117)], null),cljs.core.dissoc,cljs.core.first.call(null,found_QMARK_));
} else {
}

return lt.objs.editor.pool.focus_last.call(null);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.clients","unset-client","lt.objs.sidebar.clients/unset-client",-1355215293),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"unset!","unset!",-746079964),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.clients.__BEH__unset_client);
/**
 * 
 */
lt.objs.sidebar.clients.__BEH__selecting_BANG_ = (function lt$objs$sidebar$clients$__BEH__selecting_BANG_(this$){
return lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"selecting?","selecting?",1157912914),true], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.clients","selecting!","lt.objs.sidebar.clients/selecting!",872106073),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"selecting!","selecting!",-1304548141),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.clients.__BEH__selecting_BANG_);
/**
 * 
 */
lt.objs.sidebar.clients.__BEH__done_selecting = (function lt$objs$sidebar$clients$__BEH__done_selecting(this$){
return lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"selecting?","selecting?",1157912914),false], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.clients","done-selecting","lt.objs.sidebar.clients/done-selecting",-1059581085),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"selected","selected",574897764),null,new cljs.core.Keyword(null,"cancel","cancel",-1964088360),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.clients.__BEH__done_selecting);
/**
 * 
 */
lt.objs.sidebar.clients.__BEH__hide_on_select = (function lt$objs$sidebar$clients$__BEH__hide_on_select(this$){
return lt.object.raise.call(null,lt.objs.sidebar.rightbar,new cljs.core.Keyword(null,"close!","close!",-2079310498));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.clients","hide-on-select","lt.objs.sidebar.clients/hide-on-select",-2065149008),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"selected","selected",574897764),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.clients.__BEH__hide_on_select);
/**
 * 
 */
lt.objs.sidebar.clients.__BEH__focus_BANG_ = (function lt$objs$sidebar$clients$__BEH__focus_BANG_(this$){
return lt.util.dom.focus.call(null,lt.object.__GT_content.call(null,this$));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.clients","focus!","lt.objs.sidebar.clients/focus!",839424555),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"focus!","focus!",-1344984927),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.clients.__BEH__focus_BANG_);
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.clients","sidebar.clients","lt.objs.sidebar.clients/sidebar.clients",308167816),new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"sidebar.clients","sidebar.clients",-1793475054),null], null), null),new cljs.core.Keyword(null,"label","label",1718410804),"connect",new cljs.core.Keyword(null,"connectors","connectors",-1593180892),cljs.core.sorted_map.call(null),new cljs.core.Keyword(null,"order","order",-1254677256),(2),new cljs.core.Keyword(null,"init","init",-1875481434),(function (this$){
return lt.objs.sidebar.clients.connect_ui.call(null,this$);
}));
lt.objs.sidebar.clients.clients = lt.object.create.call(null,new cljs.core.Keyword("lt.objs.sidebar.clients","sidebar.clients","lt.objs.sidebar.clients/sidebar.clients",308167816));
lt.objs.sidebar.add_item.call(null,lt.objs.sidebar.rightbar,lt.objs.sidebar.clients.clients);
lt.objs.sidebar.clients.add_connector = (function lt$objs$sidebar$clients$add_connector(c){
return lt.object.update_BANG_.call(null,lt.objs.sidebar.clients.clients,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"connectors","connectors",-1593180892)], null),cljs.core.assoc,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(c),c);
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"show-connect","show-connect",-2130622063),new cljs.core.Keyword(null,"desc","desc",2093485764),"Connect: Toggle connect bar",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
lt.object.raise.call(null,lt.objs.sidebar.rightbar,new cljs.core.Keyword(null,"toggle","toggle",1291842030),lt.objs.sidebar.clients.clients);

return lt.object.raise.call(null,lt.objs.sidebar.clients.clients,new cljs.core.Keyword(null,"focus!","focus!",-1344984927));
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"show-add-connection","show-add-connection",652692070),new cljs.core.Keyword(null,"desc","desc",2093485764),"Connect: Add Connection",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
lt.object.raise.call(null,lt.objs.sidebar.rightbar,new cljs.core.Keyword(null,"toggle","toggle",1291842030),lt.objs.sidebar.clients.clients,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"force?","force?",1839038675),true,new cljs.core.Keyword(null,"transient?","transient?",1694525927),false], null));

return lt.object.raise.call(null,lt.objs.sidebar.clients.clients,new cljs.core.Keyword(null,"selecting!","selecting!",-1304548141));
})], null));
lt.objs.sidebar.clients.add_connector.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"name","name",1843675177),"Ports",new cljs.core.Keyword(null,"desc","desc",2093485764),"Get the ports for the local TCP and Websocket servers",new cljs.core.Keyword(null,"connect","connect",1232828233),(function (){
return lt.objs.popup.popup_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"header","header",119441134),"Ports",new cljs.core.Keyword(null,"body","body",-2049205669),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dl#ports","dl#ports",-2034456471),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dt","dt",-368444759),"TCP: "], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dd","dd",-1340437629),[cljs.core.str(lt.objs.clients.tcp.port)].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dt","dt",-368444759),"WebSocket: "], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dd","dd",-1340437629),[cljs.core.str(lt.objs.clients.ws.port)].join('')], null)], null),new cljs.core.Keyword(null,"buttons","buttons",-1953831197),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1718410804),"ok"], null)], null)], null));
})], null));
