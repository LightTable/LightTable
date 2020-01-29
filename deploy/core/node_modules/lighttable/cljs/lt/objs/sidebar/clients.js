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
var seq__18714_18724 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (){
return lt.objs.clients.close_BANG_.call(null,i);
});})(e__7942__auto__))
], null)));
var chunk__18715_18725 = null;
var count__18716_18726 = (0);
var i__18717_18727 = (0);
while(true){
if((i__18717_18727 < count__18716_18726)){
var vec__18718_18728 = cljs.core._nth.call(null,chunk__18715_18725,i__18717_18727);
var ev__7943__auto___18729 = cljs.core.nth.call(null,vec__18718_18728,(0),null);
var func__7944__auto___18730 = cljs.core.nth.call(null,vec__18718_18728,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___18729,func__7944__auto___18730);

var G__18731 = seq__18714_18724;
var G__18732 = chunk__18715_18725;
var G__18733 = count__18716_18726;
var G__18734 = (i__18717_18727 + (1));
seq__18714_18724 = G__18731;
chunk__18715_18725 = G__18732;
count__18716_18726 = G__18733;
i__18717_18727 = G__18734;
continue;
} else {
var temp__4657__auto___18735 = cljs.core.seq.call(null,seq__18714_18724);
if(temp__4657__auto___18735){
var seq__18714_18736__$1 = temp__4657__auto___18735;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__18714_18736__$1)){
var c__7604__auto___18737 = cljs.core.chunk_first.call(null,seq__18714_18736__$1);
var G__18738 = cljs.core.chunk_rest.call(null,seq__18714_18736__$1);
var G__18739 = c__7604__auto___18737;
var G__18740 = cljs.core.count.call(null,c__7604__auto___18737);
var G__18741 = (0);
seq__18714_18724 = G__18738;
chunk__18715_18725 = G__18739;
count__18716_18726 = G__18740;
i__18717_18727 = G__18741;
continue;
} else {
var vec__18721_18742 = cljs.core.first.call(null,seq__18714_18736__$1);
var ev__7943__auto___18743 = cljs.core.nth.call(null,vec__18721_18742,(0),null);
var func__7944__auto___18744 = cljs.core.nth.call(null,vec__18721_18742,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___18743,func__7944__auto___18744);

var G__18745 = cljs.core.next.call(null,seq__18714_18736__$1);
var G__18746 = null;
var G__18747 = (0);
var G__18748 = (0);
seq__18714_18724 = G__18745;
chunk__18715_18725 = G__18746;
count__18716_18726 = G__18747;
i__18717_18727 = G__18748;
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
var seq__18759_18769 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (){
return lt.object.raise.call(null,lt.objs.sidebar.clients.clients,new cljs.core.Keyword(null,"unset!","unset!",-746079964),i);
});})(e__7942__auto__))
], null)));
var chunk__18760_18770 = null;
var count__18761_18771 = (0);
var i__18762_18772 = (0);
while(true){
if((i__18762_18772 < count__18761_18771)){
var vec__18763_18773 = cljs.core._nth.call(null,chunk__18760_18770,i__18762_18772);
var ev__7943__auto___18774 = cljs.core.nth.call(null,vec__18763_18773,(0),null);
var func__7944__auto___18775 = cljs.core.nth.call(null,vec__18763_18773,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___18774,func__7944__auto___18775);

var G__18776 = seq__18759_18769;
var G__18777 = chunk__18760_18770;
var G__18778 = count__18761_18771;
var G__18779 = (i__18762_18772 + (1));
seq__18759_18769 = G__18776;
chunk__18760_18770 = G__18777;
count__18761_18771 = G__18778;
i__18762_18772 = G__18779;
continue;
} else {
var temp__4657__auto___18780 = cljs.core.seq.call(null,seq__18759_18769);
if(temp__4657__auto___18780){
var seq__18759_18781__$1 = temp__4657__auto___18780;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__18759_18781__$1)){
var c__7604__auto___18782 = cljs.core.chunk_first.call(null,seq__18759_18781__$1);
var G__18783 = cljs.core.chunk_rest.call(null,seq__18759_18781__$1);
var G__18784 = c__7604__auto___18782;
var G__18785 = cljs.core.count.call(null,c__7604__auto___18782);
var G__18786 = (0);
seq__18759_18769 = G__18783;
chunk__18760_18770 = G__18784;
count__18761_18771 = G__18785;
i__18762_18772 = G__18786;
continue;
} else {
var vec__18766_18787 = cljs.core.first.call(null,seq__18759_18781__$1);
var ev__7943__auto___18788 = cljs.core.nth.call(null,vec__18766_18787,(0),null);
var func__7944__auto___18789 = cljs.core.nth.call(null,vec__18766_18787,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___18788,func__7944__auto___18789);

var G__18790 = cljs.core.next.call(null,seq__18759_18781__$1);
var G__18791 = null;
var G__18792 = (0);
var G__18793 = (0);
seq__18759_18769 = G__18790;
chunk__18760_18770 = G__18791;
count__18761_18771 = G__18792;
i__18762_18772 = G__18793;
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
var seq__18804_18814 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"selecting!","selecting!",-1304548141));
});})(e__7942__auto__))
], null)));
var chunk__18805_18815 = null;
var count__18806_18816 = (0);
var i__18807_18817 = (0);
while(true){
if((i__18807_18817 < count__18806_18816)){
var vec__18808_18818 = cljs.core._nth.call(null,chunk__18805_18815,i__18807_18817);
var ev__7943__auto___18819 = cljs.core.nth.call(null,vec__18808_18818,(0),null);
var func__7944__auto___18820 = cljs.core.nth.call(null,vec__18808_18818,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___18819,func__7944__auto___18820);

var G__18821 = seq__18804_18814;
var G__18822 = chunk__18805_18815;
var G__18823 = count__18806_18816;
var G__18824 = (i__18807_18817 + (1));
seq__18804_18814 = G__18821;
chunk__18805_18815 = G__18822;
count__18806_18816 = G__18823;
i__18807_18817 = G__18824;
continue;
} else {
var temp__4657__auto___18825 = cljs.core.seq.call(null,seq__18804_18814);
if(temp__4657__auto___18825){
var seq__18804_18826__$1 = temp__4657__auto___18825;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__18804_18826__$1)){
var c__7604__auto___18827 = cljs.core.chunk_first.call(null,seq__18804_18826__$1);
var G__18828 = cljs.core.chunk_rest.call(null,seq__18804_18826__$1);
var G__18829 = c__7604__auto___18827;
var G__18830 = cljs.core.count.call(null,c__7604__auto___18827);
var G__18831 = (0);
seq__18804_18814 = G__18828;
chunk__18805_18815 = G__18829;
count__18806_18816 = G__18830;
i__18807_18817 = G__18831;
continue;
} else {
var vec__18811_18832 = cljs.core.first.call(null,seq__18804_18826__$1);
var ev__7943__auto___18833 = cljs.core.nth.call(null,vec__18811_18832,(0),null);
var func__7944__auto___18834 = cljs.core.nth.call(null,vec__18811_18832,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___18833,func__7944__auto___18834);

var G__18835 = cljs.core.next.call(null,seq__18804_18826__$1);
var G__18836 = null;
var G__18837 = (0);
var G__18838 = (0);
seq__18804_18814 = G__18835;
chunk__18805_18815 = G__18836;
count__18806_18816 = G__18837;
i__18807_18817 = G__18838;
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
var seq__18849_18859 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"cancel","cancel",-1964088360));
});})(e__7942__auto__))
], null)));
var chunk__18850_18860 = null;
var count__18851_18861 = (0);
var i__18852_18862 = (0);
while(true){
if((i__18852_18862 < count__18851_18861)){
var vec__18853_18863 = cljs.core._nth.call(null,chunk__18850_18860,i__18852_18862);
var ev__7943__auto___18864 = cljs.core.nth.call(null,vec__18853_18863,(0),null);
var func__7944__auto___18865 = cljs.core.nth.call(null,vec__18853_18863,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___18864,func__7944__auto___18865);

var G__18866 = seq__18849_18859;
var G__18867 = chunk__18850_18860;
var G__18868 = count__18851_18861;
var G__18869 = (i__18852_18862 + (1));
seq__18849_18859 = G__18866;
chunk__18850_18860 = G__18867;
count__18851_18861 = G__18868;
i__18852_18862 = G__18869;
continue;
} else {
var temp__4657__auto___18870 = cljs.core.seq.call(null,seq__18849_18859);
if(temp__4657__auto___18870){
var seq__18849_18871__$1 = temp__4657__auto___18870;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__18849_18871__$1)){
var c__7604__auto___18872 = cljs.core.chunk_first.call(null,seq__18849_18871__$1);
var G__18873 = cljs.core.chunk_rest.call(null,seq__18849_18871__$1);
var G__18874 = c__7604__auto___18872;
var G__18875 = cljs.core.count.call(null,c__7604__auto___18872);
var G__18876 = (0);
seq__18849_18859 = G__18873;
chunk__18850_18860 = G__18874;
count__18851_18861 = G__18875;
i__18852_18862 = G__18876;
continue;
} else {
var vec__18856_18877 = cljs.core.first.call(null,seq__18849_18871__$1);
var ev__7943__auto___18878 = cljs.core.nth.call(null,vec__18856_18877,(0),null);
var func__7944__auto___18879 = cljs.core.nth.call(null,vec__18856_18877,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___18878,func__7944__auto___18879);

var G__18880 = cljs.core.next.call(null,seq__18849_18871__$1);
var G__18881 = null;
var G__18882 = (0);
var G__18883 = (0);
seq__18849_18859 = G__18880;
chunk__18850_18860 = G__18881;
count__18851_18861 = G__18882;
i__18852_18862 = G__18883;
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
return (function (p1__18884_SHARP_){
return cljs.core._EQ_.call(null,cur,cljs.core.val.call(null,p1__18884_SHARP_));
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
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,i))], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.details","div.details",-1501667044),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"table","table",-564943036),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),"Type"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,i))], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),"Commands"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",-1349521403),(function (){var iter__7573__auto__ = (function lt$objs$sidebar$clients$client_item_STAR__$_iter__18889(s__18890){
return (new cljs.core.LazySeq(null,(function (){
var s__18890__$1 = s__18890;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__18890__$1);
if(temp__4657__auto__){
var s__18890__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__18890__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__18890__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__18892 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__18891 = (0);
while(true){
if((i__18891 < size__7572__auto__)){
var c = cljs.core._nth.call(null,c__7571__auto__,i__18891);
cljs.core.chunk_append.call(null,b__18892,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),c], null));

var G__18893 = (i__18891 + (1));
i__18891 = G__18893;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__18892),lt$objs$sidebar$clients$client_item_STAR__$_iter__18889.call(null,cljs.core.chunk_rest.call(null,s__18890__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__18892),null);
}
} else {
var c = cljs.core.first.call(null,s__18890__$2);
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),c], null),lt$objs$sidebar$clients$client_item_STAR__$_iter__18889.call(null,cljs.core.rest.call(null,s__18890__$2)));
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
return (function (p1__18894_SHARP_){
return lt.objs.sidebar.clients.__GT_active_QMARK_.call(null,i__$1,p1__18894_SHARP_);
});})(i__$1))
)], null),crate.binding.bound.call(null,i__$1,((function (i__$1){
return (function (){
return lt.objs.sidebar.clients.client_item_STAR_.call(null,i__$1);
});})(i__$1))
)], null);
})());
var seq__18905_18915 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),cljs.core.PersistentVector.EMPTY));
var chunk__18906_18916 = null;
var count__18907_18917 = (0);
var i__18908_18918 = (0);
while(true){
if((i__18908_18918 < count__18907_18917)){
var vec__18909_18919 = cljs.core._nth.call(null,chunk__18906_18916,i__18908_18918);
var ev__7943__auto___18920 = cljs.core.nth.call(null,vec__18909_18919,(0),null);
var func__7944__auto___18921 = cljs.core.nth.call(null,vec__18909_18919,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___18920,func__7944__auto___18921);

var G__18922 = seq__18905_18915;
var G__18923 = chunk__18906_18916;
var G__18924 = count__18907_18917;
var G__18925 = (i__18908_18918 + (1));
seq__18905_18915 = G__18922;
chunk__18906_18916 = G__18923;
count__18907_18917 = G__18924;
i__18908_18918 = G__18925;
continue;
} else {
var temp__4657__auto___18926 = cljs.core.seq.call(null,seq__18905_18915);
if(temp__4657__auto___18926){
var seq__18905_18927__$1 = temp__4657__auto___18926;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__18905_18927__$1)){
var c__7604__auto___18928 = cljs.core.chunk_first.call(null,seq__18905_18927__$1);
var G__18929 = cljs.core.chunk_rest.call(null,seq__18905_18927__$1);
var G__18930 = c__7604__auto___18928;
var G__18931 = cljs.core.count.call(null,c__7604__auto___18928);
var G__18932 = (0);
seq__18905_18915 = G__18929;
chunk__18906_18916 = G__18930;
count__18907_18917 = G__18931;
i__18908_18918 = G__18932;
continue;
} else {
var vec__18912_18933 = cljs.core.first.call(null,seq__18905_18927__$1);
var ev__7943__auto___18934 = cljs.core.nth.call(null,vec__18912_18933,(0),null);
var func__7944__auto___18935 = cljs.core.nth.call(null,vec__18912_18933,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___18934,func__7944__auto___18935);

var G__18936 = cljs.core.next.call(null,seq__18905_18927__$1);
var G__18937 = null;
var G__18938 = (0);
var G__18939 = (0);
seq__18905_18915 = G__18936;
chunk__18906_18916 = G__18937;
count__18907_18917 = G__18938;
i__18908_18918 = G__18939;
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
var seq__18950_18960 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (){
lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"selected","selected",574897764));

return new cljs.core.Keyword(null,"connect","connect",1232828233).cljs$core$IFn$_invoke$arity$1(i).call(null);
});})(e__7942__auto__))
], null)));
var chunk__18951_18961 = null;
var count__18952_18962 = (0);
var i__18953_18963 = (0);
while(true){
if((i__18953_18963 < count__18952_18962)){
var vec__18954_18964 = cljs.core._nth.call(null,chunk__18951_18961,i__18953_18963);
var ev__7943__auto___18965 = cljs.core.nth.call(null,vec__18954_18964,(0),null);
var func__7944__auto___18966 = cljs.core.nth.call(null,vec__18954_18964,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___18965,func__7944__auto___18966);

var G__18967 = seq__18950_18960;
var G__18968 = chunk__18951_18961;
var G__18969 = count__18952_18962;
var G__18970 = (i__18953_18963 + (1));
seq__18950_18960 = G__18967;
chunk__18951_18961 = G__18968;
count__18952_18962 = G__18969;
i__18953_18963 = G__18970;
continue;
} else {
var temp__4657__auto___18971 = cljs.core.seq.call(null,seq__18950_18960);
if(temp__4657__auto___18971){
var seq__18950_18972__$1 = temp__4657__auto___18971;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__18950_18972__$1)){
var c__7604__auto___18973 = cljs.core.chunk_first.call(null,seq__18950_18972__$1);
var G__18974 = cljs.core.chunk_rest.call(null,seq__18950_18972__$1);
var G__18975 = c__7604__auto___18973;
var G__18976 = cljs.core.count.call(null,c__7604__auto___18973);
var G__18977 = (0);
seq__18950_18960 = G__18974;
chunk__18951_18961 = G__18975;
count__18952_18962 = G__18976;
i__18953_18963 = G__18977;
continue;
} else {
var vec__18957_18978 = cljs.core.first.call(null,seq__18950_18972__$1);
var ev__7943__auto___18979 = cljs.core.nth.call(null,vec__18957_18978,(0),null);
var func__7944__auto___18980 = cljs.core.nth.call(null,vec__18957_18978,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___18979,func__7944__auto___18980);

var G__18981 = cljs.core.next.call(null,seq__18950_18972__$1);
var G__18982 = null;
var G__18983 = (0);
var G__18984 = (0);
seq__18950_18960 = G__18981;
chunk__18951_18961 = G__18982;
count__18952_18962 = G__18983;
i__18953_18963 = G__18984;
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
var iter__7573__auto__ = (function lt$objs$sidebar$clients$connectors_$_iter__19001(s__19002){
return (new cljs.core.LazySeq(null,(function (){
var s__19002__$1 = s__19002;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__19002__$1);
if(temp__4657__auto__){
var s__19002__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__19002__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__19002__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__19004 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__19003 = (0);
while(true){
if((i__19003 < size__7572__auto__)){
var vec__19011 = cljs.core._nth.call(null,c__7571__auto__,i__19003);
var k = cljs.core.nth.call(null,vec__19011,(0),null);
var c = cljs.core.nth.call(null,vec__19011,(1),null);
cljs.core.chunk_append.call(null,b__19004,lt.objs.sidebar.clients.connection_type.call(null,this$,c));

var G__19017 = (i__19003 + (1));
i__19003 = G__19017;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__19004),lt$objs$sidebar$clients$connectors_$_iter__19001.call(null,cljs.core.chunk_rest.call(null,s__19002__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__19004),null);
}
} else {
var vec__19014 = cljs.core.first.call(null,s__19002__$2);
var k = cljs.core.nth.call(null,vec__19014,(0),null);
var c = cljs.core.nth.call(null,vec__19014,(1),null);
return cljs.core.cons.call(null,lt.objs.sidebar.clients.connection_type.call(null,this$,c),lt$objs$sidebar$clients$connectors_$_iter__19001.call(null,cljs.core.rest.call(null,s__19002__$2)));
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
var seq__19028_19038 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"focus","focus",234677911),((function (e__7942__auto__){
return (function (){
return lt.objs.context.in_BANG_.call(null,new cljs.core.Keyword(null,"sidebar.clients","sidebar.clients",-1793475054),this$);
});})(e__7942__auto__))
,new cljs.core.Keyword(null,"blur","blur",-453500461),((function (e__7942__auto__){
return (function (){
return lt.objs.context.out_BANG_.call(null,new cljs.core.Keyword(null,"sidebar.clients","sidebar.clients",-1793475054),this$);
});})(e__7942__auto__))
], null)));
var chunk__19029_19039 = null;
var count__19030_19040 = (0);
var i__19031_19041 = (0);
while(true){
if((i__19031_19041 < count__19030_19040)){
var vec__19032_19042 = cljs.core._nth.call(null,chunk__19029_19039,i__19031_19041);
var ev__7943__auto___19043 = cljs.core.nth.call(null,vec__19032_19042,(0),null);
var func__7944__auto___19044 = cljs.core.nth.call(null,vec__19032_19042,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___19043,func__7944__auto___19044);

var G__19045 = seq__19028_19038;
var G__19046 = chunk__19029_19039;
var G__19047 = count__19030_19040;
var G__19048 = (i__19031_19041 + (1));
seq__19028_19038 = G__19045;
chunk__19029_19039 = G__19046;
count__19030_19040 = G__19047;
i__19031_19041 = G__19048;
continue;
} else {
var temp__4657__auto___19049 = cljs.core.seq.call(null,seq__19028_19038);
if(temp__4657__auto___19049){
var seq__19028_19050__$1 = temp__4657__auto___19049;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__19028_19050__$1)){
var c__7604__auto___19051 = cljs.core.chunk_first.call(null,seq__19028_19050__$1);
var G__19052 = cljs.core.chunk_rest.call(null,seq__19028_19050__$1);
var G__19053 = c__7604__auto___19051;
var G__19054 = cljs.core.count.call(null,c__7604__auto___19051);
var G__19055 = (0);
seq__19028_19038 = G__19052;
chunk__19029_19039 = G__19053;
count__19030_19040 = G__19054;
i__19031_19041 = G__19055;
continue;
} else {
var vec__19035_19056 = cljs.core.first.call(null,seq__19028_19050__$1);
var ev__7943__auto___19057 = cljs.core.nth.call(null,vec__19035_19056,(0),null);
var func__7944__auto___19058 = cljs.core.nth.call(null,vec__19035_19056,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___19057,func__7944__auto___19058);

var G__19059 = cljs.core.next.call(null,seq__19028_19050__$1);
var G__19060 = null;
var G__19061 = (0);
var G__19062 = (0);
seq__19028_19038 = G__19059;
chunk__19029_19039 = G__19060;
count__19030_19040 = G__19061;
i__19031_19041 = G__19062;
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
return (function (p1__19063_SHARP_){
return cljs.core._EQ_.call(null,cur,cljs.core.val.call(null,p1__19063_SHARP_));
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
