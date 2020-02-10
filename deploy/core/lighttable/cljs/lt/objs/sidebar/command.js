// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.objs.sidebar.command');
goog.require('cljs.core');
goog.require('lt.objs.command');
goog.require('lt.objs.context');
goog.require('crate.core');
goog.require('lt.object');
goog.require('lt.util.dom');
goog.require('lt.util.cljs');
goog.require('lt.objs.keyboard');
goog.require('lt.objs.app');
goog.require('lt.util.load');
goog.require('lt.objs.sidebar');
goog.require('clojure.string');
goog.require('crate.binding');
lt.util.load.js.call(null,"core/lighttable/util/fuzzy.js",new cljs.core.Keyword(null,"sync","sync",-624148946));
/**
 * 
 */
lt.objs.sidebar.command.__BEH__op_select_BANG_ = (function lt$objs$sidebar$command$__BEH__op_select_BANG_(this$,idx){
var input = lt.object.__GT_content.call(null,this$);
lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"select","select",1147833503),lt.util.dom.val.call(null,input));

return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"selected","selected",574897764));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.command","op-select!","lt.objs.sidebar.command/op-select!",-89736039),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"select!","select!",1013647471),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.command.__BEH__op_select_BANG_);
/**
 * 
 */
lt.objs.sidebar.command.__BEH__op_clear_BANG_ = (function lt$objs$sidebar$command$__BEH__op_clear_BANG_(this$){
var input = lt.object.__GT_content.call(null,this$);
lt.util.dom.val.call(null,input,"");

return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"change!","change!",850472699),"");
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.command","op-clear!","lt.objs.sidebar.command/op-clear!",-1959203936),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"clear!","clear!",-144814418),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.command.__BEH__op_clear_BANG_);
/**
 * 
 */
lt.objs.sidebar.command.__BEH__op_focus_BANG_ = (function lt$objs$sidebar$command$__BEH__op_focus_BANG_(this$){
var input = lt.object.__GT_content.call(null,this$);
lt.util.dom.focus.call(null,input);

return input.select();
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.command","op-focus!","lt.objs.sidebar.command/op-focus!",1034042238),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"focus!","focus!",-1344984927),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.command.__BEH__op_focus_BANG_);
lt.objs.sidebar.command.__GT_value = (function lt$objs$sidebar$command$__GT_value(p__15666){
var map__15669 = p__15666;
var map__15669__$1 = ((((!((map__15669 == null)))?((((map__15669.cljs$lang$protocol_mask$partition0$ & (64))) || (map__15669.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15669):map__15669);
var value = cljs.core.get.call(null,map__15669__$1,new cljs.core.Keyword(null,"value","value",305978217));
if(cljs.core.not.call(null,value)){
return "";
} else {
return value;
}
});
lt.objs.sidebar.command.input__GT_value = (function lt$objs$sidebar$command$input__GT_value(this$){
return lt.util.dom.val.call(null,lt.object.__GT_content.call(null,this$));
});
/**
 * 
 */
lt.objs.sidebar.command.op_input = (function lt$objs$sidebar$command$op_input(this$){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input.option","input.option",974024973),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),"text",new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),crate.binding.bound.call(null,this$,new cljs.core.Keyword(null,"placeholder","placeholder",-104873083)),new cljs.core.Keyword(null,"value","value",305978217),crate.binding.bound.call(null,this$,lt.objs.sidebar.command.__GT_value)], null)], null));
var seq__15681_15691 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"focus","focus",234677911),((function (e__7942__auto__){
return (function (e){
lt.objs.context.in_BANG_.call(null,new cljs.core.Keyword(null,"options-input","options-input",-2143404893),this$);

return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"active","active",1895962068));
});})(e__7942__auto__))
,new cljs.core.Keyword(null,"blur","blur",-453500461),((function (e__7942__auto__){
return (function (e){
lt.objs.context.out_BANG_.call(null,new cljs.core.Keyword(null,"options-input","options-input",-2143404893),this$);

return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"inactive","inactive",-306247616));
});})(e__7942__auto__))
,new cljs.core.Keyword(null,"keyup","keyup",-794526927),((function (e__7942__auto__){
return (function (e){
var me = this;
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"change!","change!",850472699),lt.util.dom.val.call(null,me));
});})(e__7942__auto__))
], null)));
var chunk__15682_15692 = null;
var count__15683_15693 = (0);
var i__15684_15694 = (0);
while(true){
if((i__15684_15694 < count__15683_15693)){
var vec__15685_15695 = cljs.core._nth.call(null,chunk__15682_15692,i__15684_15694);
var ev__7943__auto___15696 = cljs.core.nth.call(null,vec__15685_15695,(0),null);
var func__7944__auto___15697 = cljs.core.nth.call(null,vec__15685_15695,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___15696,func__7944__auto___15697);

var G__15698 = seq__15681_15691;
var G__15699 = chunk__15682_15692;
var G__15700 = count__15683_15693;
var G__15701 = (i__15684_15694 + (1));
seq__15681_15691 = G__15698;
chunk__15682_15692 = G__15699;
count__15683_15693 = G__15700;
i__15684_15694 = G__15701;
continue;
} else {
var temp__4657__auto___15702 = cljs.core.seq.call(null,seq__15681_15691);
if(temp__4657__auto___15702){
var seq__15681_15703__$1 = temp__4657__auto___15702;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15681_15703__$1)){
var c__7604__auto___15704 = cljs.core.chunk_first.call(null,seq__15681_15703__$1);
var G__15705 = cljs.core.chunk_rest.call(null,seq__15681_15703__$1);
var G__15706 = c__7604__auto___15704;
var G__15707 = cljs.core.count.call(null,c__7604__auto___15704);
var G__15708 = (0);
seq__15681_15691 = G__15705;
chunk__15682_15692 = G__15706;
count__15683_15693 = G__15707;
i__15684_15694 = G__15708;
continue;
} else {
var vec__15688_15709 = cljs.core.first.call(null,seq__15681_15703__$1);
var ev__7943__auto___15710 = cljs.core.nth.call(null,vec__15688_15709,(0),null);
var func__7944__auto___15711 = cljs.core.nth.call(null,vec__15688_15709,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___15710,func__7944__auto___15711);

var G__15712 = cljs.core.next.call(null,seq__15681_15703__$1);
var G__15713 = null;
var G__15714 = (0);
var G__15715 = (0);
seq__15681_15691 = G__15712;
chunk__15682_15692 = G__15713;
count__15683_15693 = G__15714;
i__15684_15694 = G__15715;
continue;
}
} else {
}
}
break;
}

return e__7942__auto__;
});
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.command","options-input","lt.objs.sidebar.command/options-input",155693176),new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"options-input","options-input",-2143404893),null], null), null),new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),"search",new cljs.core.Keyword(null,"init","init",-1875481434),(function (this$,opts){
lt.object.merge_BANG_.call(null,this$,opts);

return lt.objs.sidebar.command.op_input.call(null,this$);
}));
lt.objs.sidebar.command.options_input = (function lt$objs$sidebar$command$options_input(opts){
var lst = lt.object.create.call(null,new cljs.core.Keyword("lt.objs.sidebar.command","options-input","lt.objs.sidebar.command/options-input",155693176),opts);
lt.object.raise.call(null,lst,new cljs.core.Keyword(null,"refresh!","refresh!",156149341));

return lst;
});
lt.objs.sidebar.command.input_val = (function lt$objs$sidebar$command$input_val(this$){
return lt.util.dom.val.call(null,lt.util.dom.$.call(null,new cljs.core.Keyword(null,"input","input",556931961),lt.object.__GT_content.call(null,this$)));
});
lt.objs.sidebar.command.set_val = (function lt$objs$sidebar$command$set_val(this$,v){
return lt.util.dom.val.call(null,lt.util.dom.$.call(null,new cljs.core.Keyword(null,"input","input",556931961),lt.object.__GT_content.call(null,this$)),v);
});
lt.objs.sidebar.command.set_and_select = (function lt$objs$sidebar$command$set_and_select(this$,v){
lt.objs.sidebar.command.set_val.call(null,this$,v);

return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"change!","change!",850472699),v);
});
lt.objs.sidebar.command.ensure_visible = (function lt$objs$sidebar$command$ensure_visible(this$){
var list = lt.util.dom.$.call(null,"ul",lt.object.__GT_content.call(null,this$));
var elem = lt.util.dom.$.call(null,".selected",list);
if((elem.offsetTop < list.scrollTop)){
return list.scrollTop = (elem.offsetTop - (15));
} else {
if(((elem.offsetTop + elem.offsetHeight) > (list.scrollTop + list.clientHeight))){
return list.scrollTop = (((elem.offsetTop + elem.offsetHeight) + (15)) - list.clientHeight);
} else {
return null;

}
}
});
lt.objs.sidebar.command.fill_lis = (function lt$objs$sidebar$command$fill_lis(p__15719,results){
var map__15738 = p__15719;
var map__15738__$1 = ((((!((map__15738 == null)))?((((map__15738.cljs$lang$protocol_mask$partition0$ & (64))) || (map__15738.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15738):map__15738);
var this$ = map__15738__$1;
var lis = cljs.core.get.call(null,map__15738__$1,new cljs.core.Keyword(null,"lis","lis",-991188396));
var size = cljs.core.get.call(null,map__15738__$1,new cljs.core.Keyword(null,"size","size",1098693007));
var search = cljs.core.get.call(null,map__15738__$1,new cljs.core.Keyword(null,"search","search",1564939822));
var selected = cljs.core.get.call(null,map__15738__$1,new cljs.core.Keyword(null,"selected","selected",574897764));
var key = cljs.core.get.call(null,map__15738__$1,new cljs.core.Keyword(null,"key","key",-1516042587));
var transform = cljs.core.get.call(null,map__15738__$1,new cljs.core.Keyword(null,"transform","transform",1381301764));
var cnt = cljs.core.count.call(null,results);
var cur = cljs.core.mod.call(null,selected,(((cnt > size))?size:cnt));
var transform__$1 = (cljs.core.truth_(transform)?transform:((function (cnt,cur,map__15738,map__15738__$1,this$,lis,size,search,selected,key,transform){
return (function (p1__15717_SHARP_,p2__15718_SHARP_,p3__15716_SHARP_){
return p3__15716_SHARP_;
});})(cnt,cur,map__15738,map__15738__$1,this$,lis,size,search,selected,key,transform))
);
if(cljs.core._EQ_.call(null,cnt,(0))){
lt.util.dom.add_class.call(null,new cljs.core.Keyword(null,"content","content",15833224).cljs$core$IFn$_invoke$arity$1(this$),new cljs.core.Keyword(null,"empty","empty",767870958));
} else {
lt.util.dom.remove_class.call(null,new cljs.core.Keyword(null,"content","content",15833224).cljs$core$IFn$_invoke$arity$1(this$),new cljs.core.Keyword(null,"empty","empty",767870958));
}

var seq__15740_15756 = cljs.core.seq.call(null,cljs.core.map.call(null,cljs.core.vector,cljs.core.range.call(null),lis,results));
var chunk__15742_15757 = null;
var count__15743_15758 = (0);
var i__15744_15759 = (0);
while(true){
if((i__15744_15759 < count__15743_15758)){
var vec__15746_15760 = cljs.core._nth.call(null,chunk__15742_15757,i__15744_15759);
var i_15761 = cljs.core.nth.call(null,vec__15746_15760,(0),null);
var li_15762 = cljs.core.nth.call(null,vec__15746_15760,(1),null);
var res_15763 = cljs.core.nth.call(null,vec__15746_15760,(2),null);
if(cljs.core.truth_(res_15763)){
lt.util.dom.html.call(null,li_15762,transform__$1.call(null,(res_15763[(1)]),(res_15763[(4)]),((!(cljs.core.empty_QMARK_.call(null,search)))?wrapMatch((res_15763[(1)]),(res_15763[(4)])):(res_15763[(1)])),(res_15763[(0)])));

lt.util.dom.css.call(null,li_15762,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"display","display",242065432),"block"], null));

if(cljs.core._EQ_.call(null,i_15761,cur)){
lt.util.dom.add_class.call(null,li_15762,new cljs.core.Keyword(null,"selected","selected",574897764));
} else {
lt.util.dom.remove_class.call(null,li_15762,new cljs.core.Keyword(null,"selected","selected",574897764));
}

var G__15764 = seq__15740_15756;
var G__15765 = chunk__15742_15757;
var G__15766 = count__15743_15758;
var G__15767 = (i__15744_15759 + (1));
seq__15740_15756 = G__15764;
chunk__15742_15757 = G__15765;
count__15743_15758 = G__15766;
i__15744_15759 = G__15767;
continue;
} else {
var G__15768 = seq__15740_15756;
var G__15769 = chunk__15742_15757;
var G__15770 = count__15743_15758;
var G__15771 = (i__15744_15759 + (1));
seq__15740_15756 = G__15768;
chunk__15742_15757 = G__15769;
count__15743_15758 = G__15770;
i__15744_15759 = G__15771;
continue;
}
} else {
var temp__4657__auto___15772 = cljs.core.seq.call(null,seq__15740_15756);
if(temp__4657__auto___15772){
var seq__15740_15773__$1 = temp__4657__auto___15772;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15740_15773__$1)){
var c__7604__auto___15774 = cljs.core.chunk_first.call(null,seq__15740_15773__$1);
var G__15775 = cljs.core.chunk_rest.call(null,seq__15740_15773__$1);
var G__15776 = c__7604__auto___15774;
var G__15777 = cljs.core.count.call(null,c__7604__auto___15774);
var G__15778 = (0);
seq__15740_15756 = G__15775;
chunk__15742_15757 = G__15776;
count__15743_15758 = G__15777;
i__15744_15759 = G__15778;
continue;
} else {
var vec__15749_15779 = cljs.core.first.call(null,seq__15740_15773__$1);
var i_15780 = cljs.core.nth.call(null,vec__15749_15779,(0),null);
var li_15781 = cljs.core.nth.call(null,vec__15749_15779,(1),null);
var res_15782 = cljs.core.nth.call(null,vec__15749_15779,(2),null);
if(cljs.core.truth_(res_15782)){
lt.util.dom.html.call(null,li_15781,transform__$1.call(null,(res_15782[(1)]),(res_15782[(4)]),((!(cljs.core.empty_QMARK_.call(null,search)))?wrapMatch((res_15782[(1)]),(res_15782[(4)])):(res_15782[(1)])),(res_15782[(0)])));

lt.util.dom.css.call(null,li_15781,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"display","display",242065432),"block"], null));

if(cljs.core._EQ_.call(null,i_15780,cur)){
lt.util.dom.add_class.call(null,li_15781,new cljs.core.Keyword(null,"selected","selected",574897764));
} else {
lt.util.dom.remove_class.call(null,li_15781,new cljs.core.Keyword(null,"selected","selected",574897764));
}

var G__15783 = cljs.core.next.call(null,seq__15740_15773__$1);
var G__15784 = null;
var G__15785 = (0);
var G__15786 = (0);
seq__15740_15756 = G__15783;
chunk__15742_15757 = G__15784;
count__15743_15758 = G__15785;
i__15744_15759 = G__15786;
continue;
} else {
var G__15787 = cljs.core.next.call(null,seq__15740_15773__$1);
var G__15788 = null;
var G__15789 = (0);
var G__15790 = (0);
seq__15740_15756 = G__15787;
chunk__15742_15757 = G__15788;
count__15743_15758 = G__15789;
i__15744_15759 = G__15790;
continue;
}
}
} else {
}
}
break;
}

var seq__15752 = cljs.core.seq.call(null,cljs.core.drop.call(null,cnt,lis));
var chunk__15753 = null;
var count__15754 = (0);
var i__15755 = (0);
while(true){
if((i__15755 < count__15754)){
var li = cljs.core._nth.call(null,chunk__15753,i__15755);
lt.util.dom.css.call(null,li,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"display","display",242065432),"none"], null));

var G__15791 = seq__15752;
var G__15792 = chunk__15753;
var G__15793 = count__15754;
var G__15794 = (i__15755 + (1));
seq__15752 = G__15791;
chunk__15753 = G__15792;
count__15754 = G__15793;
i__15755 = G__15794;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__15752);
if(temp__4657__auto__){
var seq__15752__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15752__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__15752__$1);
var G__15795 = cljs.core.chunk_rest.call(null,seq__15752__$1);
var G__15796 = c__7604__auto__;
var G__15797 = cljs.core.count.call(null,c__7604__auto__);
var G__15798 = (0);
seq__15752 = G__15795;
chunk__15753 = G__15796;
count__15754 = G__15797;
i__15755 = G__15798;
continue;
} else {
var li = cljs.core.first.call(null,seq__15752__$1);
lt.util.dom.css.call(null,li,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"display","display",242065432),"none"], null));

var G__15799 = cljs.core.next.call(null,seq__15752__$1);
var G__15800 = null;
var G__15801 = (0);
var G__15802 = (0);
seq__15752 = G__15799;
chunk__15753 = G__15800;
count__15754 = G__15801;
i__15755 = G__15802;
continue;
}
} else {
return null;
}
}
break;
}
});

/**
 * 
 */
lt.objs.sidebar.command.__BEH__move_selection = (function lt$objs$sidebar$command$__BEH__move_selection(this$,dir){
lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"set-selection!","set-selection!",223827241),(dir + new cljs.core.Keyword(null,"selected","selected",574897764).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))));

return lt.objs.sidebar.command.ensure_visible.call(null,this$);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.command","move-selection","lt.objs.sidebar.command/move-selection",-745518439),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"move-selection","move-selection",-360291088),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.command.__BEH__move_selection);
/**
 * 
 */
lt.objs.sidebar.command.__BEH__set_selection_BANG_ = (function lt$objs$sidebar$command$__BEH__set_selection_BANG_(this$,idx){
var cnt = cljs.core.count.call(null,new cljs.core.Keyword(null,"cur","cur",1153190599).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
var neue_idx = (((cnt > (0)))?cljs.core.mod.call(null,idx,(((cnt > new cljs.core.Keyword(null,"size","size",1098693007).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))))?new cljs.core.Keyword(null,"size","size",1098693007).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)):cnt)):null);
if(cljs.core.truth_(neue_idx)){
var old = cljs.core.nth.call(null,new cljs.core.Keyword(null,"lis","lis",-991188396).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),new cljs.core.Keyword(null,"selected","selected",574897764).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
var neue = cljs.core.nth.call(null,new cljs.core.Keyword(null,"lis","lis",-991188396).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),neue_idx);
if(cljs.core.truth_(neue)){
lt.util.dom.remove_class.call(null,old,new cljs.core.Keyword(null,"selected","selected",574897764));

lt.util.dom.add_class.call(null,neue,new cljs.core.Keyword(null,"selected","selected",574897764));

return lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"selected","selected",574897764),neue_idx], null));
} else {
return null;
}
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.command","set-selection!","lt.objs.sidebar.command/set-selection!",2117896312),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"set-selection!","set-selection!",223827241),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.command.__BEH__set_selection_BANG_);
/**
 * 
 */
lt.objs.sidebar.command.__BEH__change_BANG_ = (function lt$objs$sidebar$command$__BEH__change_BANG_(this$,v){
var v__$1 = lt.object.raise_reduce.call(null,this$,new cljs.core.Keyword(null,"change+","change+",1880139626),v);
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"search","search",1564939822).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),v__$1)){
return null;
} else {
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"selected","selected",574897764),(0),new cljs.core.Keyword(null,"search","search",1564939822),v__$1], null));

return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"refresh!","refresh!",156149341));
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.command","change!","lt.objs.sidebar.command/change!",-846807984),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"change!","change!",850472699),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.command.__BEH__change_BANG_);
/**
 * 
 */
lt.objs.sidebar.command.__BEH__escape_BANG_ = (function lt$objs$sidebar$command$__BEH__escape_BANG_(this$){
lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"inactive","inactive",-306247616));

return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"close-sidebar","close-sidebar",-480192451));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.command","escape!","lt.objs.sidebar.command/escape!",136056474),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"escape!","escape!",1850102229),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.command.__BEH__escape_BANG_);
/**
 * 
 */
lt.objs.sidebar.command.__BEH__options_escape_BANG_ = (function lt$objs$sidebar$command$__BEH__options_escape_BANG_(this$){
lt.object.raise.call(null,lt.objs.sidebar.command.sidebar_command,new cljs.core.Keyword(null,"cancel!","cancel!",-676538519));

return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"close-sidebar","close-sidebar",-480192451));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.command","options-escape!","lt.objs.sidebar.command/options-escape!",-860874509),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"escape!","escape!",1850102229),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.command.__BEH__options_escape_BANG_);
/**
 * 
 */
lt.objs.sidebar.command.__BEH__set_on_select = (function lt$objs$sidebar$command$__BEH__set_on_select(this$,thing){
if(cljs.core.truth_(new cljs.core.Keyword(null,"set-on-select","set-on-select",-1113640934).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)))){
return lt.objs.sidebar.command.set_val.call(null,this$,new cljs.core.Keyword(null,"key","key",-1516042587).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)).call(null,thing));
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.command","set-on-select","lt.objs.sidebar.command/set-on-select",1151951979),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"select","select",1147833503),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.command.__BEH__set_on_select);
/**
 * 
 */
lt.objs.sidebar.command.__BEH__select_BANG_ = (function lt$objs$sidebar$command$__BEH__select_BANG_(this$,idx){
var cur = lt.objs.sidebar.command.indexed_results.call(null,cljs.core.deref.call(null,this$));
var cnt = cljs.core.count.call(null,cur);
var idx__$1 = (function (){var or__6793__auto__ = idx;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return new cljs.core.Keyword(null,"selected","selected",574897764).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$));
}
})();
var i = cljs.core.mod.call(null,idx__$1,(((cnt > new cljs.core.Keyword(null,"size","size",1098693007).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))))?new cljs.core.Keyword(null,"size","size",1098693007).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)):cnt));
if((cnt > (0))){
lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"select","select",1147833503),((cur[i])[(0)]));

return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"selected","selected",574897764));
} else {
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"select-unknown","select-unknown",-1025304823),lt.objs.sidebar.command.input_val.call(null,this$));
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.command","select!","lt.objs.sidebar.command/select!",-1218366428),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"select!","select!",1013647471),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.command.__BEH__select_BANG_);
/**
 * 
 */
lt.objs.sidebar.command.__BEH__filter_active = (function lt$objs$sidebar$command$__BEH__filter_active(this$){
return lt.objs.context.in_BANG_.call(null,new cljs.core.Keyword(null,"filter-list.input","filter-list.input",-328755840),this$);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.command","filter-active","lt.objs.sidebar.command/filter-active",1855735825),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"active","active",1895962068),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.command.__BEH__filter_active);
/**
 * 
 */
lt.objs.sidebar.command.__BEH__filter_inactive = (function lt$objs$sidebar$command$__BEH__filter_inactive(this$){
return lt.objs.context.out_BANG_.call(null,new cljs.core.Keyword(null,"filter-list.input","filter-list.input",-328755840));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.command","filter-inactive","lt.objs.sidebar.command/filter-inactive",279088981),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"inactive","inactive",-306247616),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.command.__BEH__filter_inactive);
/**
 * 
 */
lt.objs.sidebar.command.__BEH__clear_BANG_ = (function lt$objs$sidebar$command$__BEH__clear_BANG_(this$){
var input = lt.util.dom.$.call(null,new cljs.core.Keyword(null,"input","input",556931961),lt.object.__GT_content.call(null,this$));
lt.util.dom.val.call(null,input,"");

return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"change!","change!",850472699),"");
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.command","clear!","lt.objs.sidebar.command/clear!",1884529243),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"clear!","clear!",-144814418),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.command.__BEH__clear_BANG_);
/**
 * 
 */
lt.objs.sidebar.command.__BEH__filter_list__DOT__focus_BANG_ = (function lt$objs$sidebar$command$__BEH__filter_list__DOT__focus_BANG_(this$){
var input = lt.util.dom.$.call(null,new cljs.core.Keyword(null,".search",".search",-1559053770),lt.object.__GT_content.call(null,this$));
lt.util.dom.focus.call(null,input);

return input.select();
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.command","filter-list.focus!","lt.objs.sidebar.command/filter-list.focus!",-1379316724),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"focus!","focus!",-1344984927),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.command.__BEH__filter_list__DOT__focus_BANG_);
/**
 * 
 */
lt.objs.sidebar.command.__BEH__update_lis = (function lt$objs$sidebar$command$__BEH__update_lis(this$){
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cur","cur",1153190599),lt.objs.sidebar.command.indexed_results.call(null,cljs.core.deref.call(null,this$))], null));

return lt.objs.sidebar.command.fill_lis.call(null,cljs.core.deref.call(null,this$),new cljs.core.Keyword(null,"cur","cur",1153190599).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.command","update-lis","lt.objs.sidebar.command/update-lis",1575198338),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"refresh!","refresh!",156149341),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.command.__BEH__update_lis);
/**
 * 
 */
lt.objs.sidebar.command.input = (function lt$objs$sidebar$command$input(this$){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input.search","input.search",-420752064),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),"text",new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),crate.binding.bound.call(null,this$,new cljs.core.Keyword(null,"placeholder","placeholder",-104873083)),new cljs.core.Keyword(null,"tabindex","tabindex",338877510),"0"], null)], null));
var seq__15813_15823 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"focus","focus",234677911),((function (e__7942__auto__){
return (function (e){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"active","active",1895962068));
});})(e__7942__auto__))
,new cljs.core.Keyword(null,"blur","blur",-453500461),((function (e__7942__auto__){
return (function (e){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"inactive","inactive",-306247616));
});})(e__7942__auto__))
,new cljs.core.Keyword(null,"keyup","keyup",-794526927),((function (e__7942__auto__){
return (function (e){
var me = this;
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"change!","change!",850472699),lt.util.dom.val.call(null,me));
});})(e__7942__auto__))
], null)));
var chunk__15814_15824 = null;
var count__15815_15825 = (0);
var i__15816_15826 = (0);
while(true){
if((i__15816_15826 < count__15815_15825)){
var vec__15817_15827 = cljs.core._nth.call(null,chunk__15814_15824,i__15816_15826);
var ev__7943__auto___15828 = cljs.core.nth.call(null,vec__15817_15827,(0),null);
var func__7944__auto___15829 = cljs.core.nth.call(null,vec__15817_15827,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___15828,func__7944__auto___15829);

var G__15830 = seq__15813_15823;
var G__15831 = chunk__15814_15824;
var G__15832 = count__15815_15825;
var G__15833 = (i__15816_15826 + (1));
seq__15813_15823 = G__15830;
chunk__15814_15824 = G__15831;
count__15815_15825 = G__15832;
i__15816_15826 = G__15833;
continue;
} else {
var temp__4657__auto___15834 = cljs.core.seq.call(null,seq__15813_15823);
if(temp__4657__auto___15834){
var seq__15813_15835__$1 = temp__4657__auto___15834;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15813_15835__$1)){
var c__7604__auto___15836 = cljs.core.chunk_first.call(null,seq__15813_15835__$1);
var G__15837 = cljs.core.chunk_rest.call(null,seq__15813_15835__$1);
var G__15838 = c__7604__auto___15836;
var G__15839 = cljs.core.count.call(null,c__7604__auto___15836);
var G__15840 = (0);
seq__15813_15823 = G__15837;
chunk__15814_15824 = G__15838;
count__15815_15825 = G__15839;
i__15816_15826 = G__15840;
continue;
} else {
var vec__15820_15841 = cljs.core.first.call(null,seq__15813_15835__$1);
var ev__7943__auto___15842 = cljs.core.nth.call(null,vec__15820_15841,(0),null);
var func__7944__auto___15843 = cljs.core.nth.call(null,vec__15820_15841,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___15842,func__7944__auto___15843);

var G__15844 = cljs.core.next.call(null,seq__15813_15835__$1);
var G__15845 = null;
var G__15846 = (0);
var G__15847 = (0);
seq__15813_15823 = G__15844;
chunk__15814_15824 = G__15845;
count__15815_15825 = G__15846;
i__15816_15826 = G__15847;
continue;
}
} else {
}
}
break;
}

return e__7942__auto__;
});
lt.objs.sidebar.command.__GT_items = (function lt$objs$sidebar$command$__GT_items(items){
if(((!((items == null)))?((((items.cljs$lang$protocol_mask$partition0$ & (32768))) || (items.cljs$core$IDeref$))?true:(((!items.cljs$lang$protocol_mask$partition0$))?cljs.core.native_satisfies_QMARK_.call(null,cljs.core.IDeref,items):false)):cljs.core.native_satisfies_QMARK_.call(null,cljs.core.IDeref,items))){
return cljs.core.deref.call(null,items);
} else {
if(cljs.core.fn_QMARK_.call(null,items)){
return items.call(null);
} else {
return items;

}
}
});
lt.objs.sidebar.command.score_sort = (function lt$objs$sidebar$command$score_sort(x,y){
return ((y[(3)]) - (x[(3)]));
});
lt.objs.sidebar.command.score_sort2 = (function lt$objs$sidebar$command$score_sort2(x,y){
return ((y[(4)]).score - (x[(4)]).score);
});
lt.objs.sidebar.command.indexed_results = (function lt$objs$sidebar$command$indexed_results(p__15856){
var map__15859 = p__15856;
var map__15859__$1 = ((((!((map__15859 == null)))?((((map__15859.cljs$lang$protocol_mask$partition0$ & (64))) || (map__15859.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15859):map__15859);
var search = cljs.core.get.call(null,map__15859__$1,new cljs.core.Keyword(null,"search","search",1564939822));
var size = cljs.core.get.call(null,map__15859__$1,new cljs.core.Keyword(null,"size","size",1098693007));
var items = cljs.core.get.call(null,map__15859__$1,new cljs.core.Keyword(null,"items","items",1031954938));
var key = cljs.core.get.call(null,map__15859__$1,new cljs.core.Keyword(null,"key","key",-1516042587));
var items__$1 = cljs.core.apply.call(null,cljs.core.array,lt.objs.sidebar.command.__GT_items.call(null,items));
var map_func3 = ((function (items__$1,map__15859,map__15859__$1,search,size,items,key){
return (function (p1__15850_SHARP_){
return [p1__15850_SHARP_,key.call(null,p1__15850_SHARP_),fastScore(key.call(null,p1__15850_SHARP_),search),null,null];
});})(items__$1,map__15859,map__15859__$1,search,size,items,key))
;
var map_func = ((function (items__$1,map_func3,map__15859,map__15859__$1,search,size,items,key){
return (function (p1__15851_SHARP_){
(p1__15851_SHARP_[(3)] = (p1__15851_SHARP_[(1)]).score(search));

return p1__15851_SHARP_;
});})(items__$1,map_func3,map__15859,map__15859__$1,search,size,items,key))
;
var map_func2 = ((function (items__$1,map_func3,map_func,map__15859,map__15859__$1,search,size,items,key){
return (function (p1__15852_SHARP_){
(p1__15852_SHARP_[(4)] = score((p1__15852_SHARP_[(1)]),search));

return p1__15852_SHARP_;
});})(items__$1,map_func3,map_func,map__15859,map__15859__$1,search,size,items,key))
;
var has_score = ((function (items__$1,map_func3,map_func,map_func2,map__15859,map__15859__$1,search,size,items,key){
return (function (p1__15853_SHARP_){
return ((p1__15853_SHARP_[(4)]).score > (0));
});})(items__$1,map_func3,map_func,map_func2,map__15859,map__15859__$1,search,size,items,key))
;
if(!(cljs.core.empty_QMARK_.call(null,search))){
var score0 = items__$1.map(map_func3).filter(((function (items__$1,map_func3,map_func,map_func2,has_score,map__15859,map__15859__$1,search,size,items,key){
return (function (p1__15854_SHARP_){
return (p1__15854_SHARP_[(2)]);
});})(items__$1,map_func3,map_func,map_func2,has_score,map__15859,map__15859__$1,search,size,items,key))
);
var score1 = score0.map(map_func).sort(lt.objs.sidebar.command.score_sort);
var score2 = score1.slice((0),(50)).map(map_func2).filter(has_score).sort(lt.objs.sidebar.command.score_sort2);
return score2;
} else {
return items__$1.map(((function (items__$1,map_func3,map_func,map_func2,has_score,map__15859,map__15859__$1,search,size,items,key){
return (function (p1__15855_SHARP_){
return [p1__15855_SHARP_,key.call(null,p1__15855_SHARP_),null,null];
});})(items__$1,map_func3,map_func,map_func2,has_score,map__15859,map__15859__$1,search,size,items,key))
);
}
});
lt.objs.sidebar.command.current_selected = (function lt$objs$sidebar$command$current_selected(this$){
var cur = lt.objs.sidebar.command.indexed_results.call(null,cljs.core.deref.call(null,this$));
var cnt = cljs.core.count.call(null,cur);
var idx = new cljs.core.Keyword(null,"selected","selected",574897764).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$));
var i = cljs.core.mod.call(null,idx,(((cnt > new cljs.core.Keyword(null,"size","size",1098693007).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))))?new cljs.core.Keyword(null,"size","size",1098693007).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)):cnt));
if((cnt > (0))){
return ((cur[i])[(0)]);
} else {
return null;
}
});
/**
 * 
 */
lt.objs.sidebar.command.item = (function lt$objs$sidebar$command$item(this$,x){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"index","index",-1531685915),x], null)], null));
var seq__15871_15881 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"mousedown","mousedown",1391242074),((function (e__7942__auto__){
return (function (e){
lt.util.dom.prevent.call(null,e);

lt.util.dom.stop_propagation.call(null,e);

lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"set-selection!","set-selection!",223827241),x);

return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"select!","select!",1013647471),x);
});})(e__7942__auto__))
], null)));
var chunk__15872_15882 = null;
var count__15873_15883 = (0);
var i__15874_15884 = (0);
while(true){
if((i__15874_15884 < count__15873_15883)){
var vec__15875_15885 = cljs.core._nth.call(null,chunk__15872_15882,i__15874_15884);
var ev__7943__auto___15886 = cljs.core.nth.call(null,vec__15875_15885,(0),null);
var func__7944__auto___15887 = cljs.core.nth.call(null,vec__15875_15885,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___15886,func__7944__auto___15887);

var G__15888 = seq__15871_15881;
var G__15889 = chunk__15872_15882;
var G__15890 = count__15873_15883;
var G__15891 = (i__15874_15884 + (1));
seq__15871_15881 = G__15888;
chunk__15872_15882 = G__15889;
count__15873_15883 = G__15890;
i__15874_15884 = G__15891;
continue;
} else {
var temp__4657__auto___15892 = cljs.core.seq.call(null,seq__15871_15881);
if(temp__4657__auto___15892){
var seq__15871_15893__$1 = temp__4657__auto___15892;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15871_15893__$1)){
var c__7604__auto___15894 = cljs.core.chunk_first.call(null,seq__15871_15893__$1);
var G__15895 = cljs.core.chunk_rest.call(null,seq__15871_15893__$1);
var G__15896 = c__7604__auto___15894;
var G__15897 = cljs.core.count.call(null,c__7604__auto___15894);
var G__15898 = (0);
seq__15871_15881 = G__15895;
chunk__15872_15882 = G__15896;
count__15873_15883 = G__15897;
i__15874_15884 = G__15898;
continue;
} else {
var vec__15878_15899 = cljs.core.first.call(null,seq__15871_15893__$1);
var ev__7943__auto___15900 = cljs.core.nth.call(null,vec__15878_15899,(0),null);
var func__7944__auto___15901 = cljs.core.nth.call(null,vec__15878_15899,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___15900,func__7944__auto___15901);

var G__15902 = cljs.core.next.call(null,seq__15871_15893__$1);
var G__15903 = null;
var G__15904 = (0);
var G__15905 = (0);
seq__15871_15881 = G__15902;
chunk__15872_15882 = G__15903;
count__15873_15883 = G__15904;
i__15874_15884 = G__15905;
continue;
}
} else {
}
}
break;
}

return e__7942__auto__;
});
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.command","filter-list","lt.objs.sidebar.command/filter-list",1687445914),new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"filter-list","filter-list",-321279505),null], null), null),new cljs.core.Keyword(null,"selected","selected",574897764),(0),new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),"search",new cljs.core.Keyword(null,"items","items",1031954938),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"search","search",1564939822),"",new cljs.core.Keyword(null,"init","init",-1875481434),(function (this$,opts){
var opts__$1 = cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"size","size",1098693007),(100)], null),opts);
var lis = (function (){var iter__7573__auto__ = ((function (opts__$1){
return (function lt$objs$sidebar$command$iter__15906(s__15907){
return (new cljs.core.LazySeq(null,((function (opts__$1){
return (function (){
var s__15907__$1 = s__15907;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__15907__$1);
if(temp__4657__auto__){
var s__15907__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__15907__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__15907__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__15909 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__15908 = (0);
while(true){
if((i__15908 < size__7572__auto__)){
var x = cljs.core._nth.call(null,c__7571__auto__,i__15908);
cljs.core.chunk_append.call(null,b__15909,lt.objs.sidebar.command.item.call(null,this$,x));

var G__15910 = (i__15908 + (1));
i__15908 = G__15910;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__15909),lt$objs$sidebar$command$iter__15906.call(null,cljs.core.chunk_rest.call(null,s__15907__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__15909),null);
}
} else {
var x = cljs.core.first.call(null,s__15907__$2);
return cljs.core.cons.call(null,lt.objs.sidebar.command.item.call(null,this$,x),lt$objs$sidebar$command$iter__15906.call(null,cljs.core.rest.call(null,s__15907__$2)));
}
} else {
return null;
}
break;
}
});})(opts__$1))
,null,null));
});})(opts__$1))
;
return iter__7573__auto__.call(null,cljs.core.range.call(null,new cljs.core.Keyword(null,"size","size",1098693007).cljs$core$IFn$_invoke$arity$1(opts__$1)));
})();
lt.object.merge_BANG_.call(null,this$,cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"lis","lis",-991188396),cljs.core.vec.call(null,lis)], null),opts__$1));

return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.filter-list.empty","div.filter-list.empty",1084532852),lt.objs.sidebar.command.input.call(null,this$),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",-1349521403),lis], null)], null);
}));
lt.objs.sidebar.command.filter_list = (function lt$objs$sidebar$command$filter_list(opts){
var lst = lt.object.create.call(null,new cljs.core.Keyword("lt.objs.sidebar.command","filter-list","lt.objs.sidebar.command/filter-list",1687445914),opts);
lt.object.raise.call(null,lst,new cljs.core.Keyword(null,"refresh!","refresh!",156149341));

return lst;
});
/**
 * 
 */
lt.objs.sidebar.command.__BEH__select_command = (function lt$objs$sidebar$command$__BEH__select_command(this$,sel){
var temp__4657__auto__ = lt.objs.command.by_id.call(null,sel);
if(cljs.core.truth_(temp__4657__auto__)){
var cmd = temp__4657__auto__;
if(cljs.core.truth_(new cljs.core.Keyword(null,"options","options",99638489).cljs$core$IFn$_invoke$arity$1(cmd))){
lt.object.merge_BANG_.call(null,lt.objs.sidebar.command.sidebar_command,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"active","active",1895962068),cmd], null));

return lt.object.raise.call(null,new cljs.core.Keyword(null,"options","options",99638489).cljs$core$IFn$_invoke$arity$1(cmd),new cljs.core.Keyword(null,"focus!","focus!",-1344984927));
} else {
lt.object.raise.call(null,lt.objs.sidebar.command.sidebar_command,new cljs.core.Keyword(null,"exec!","exec!",707596729),cmd);

lt.object.raise.call(null,lt.objs.sidebar.command.sidebar_command,new cljs.core.Keyword(null,"selected-exec","selected-exec",-1366177839),cmd);

return lt.object.merge_BANG_.call(null,lt.objs.sidebar.command.sidebar_command,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"active","active",1895962068),null], null));
}
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.command","select-command","lt.objs.sidebar.command/select-command",1516753694),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"select","select",1147833503),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.command.__BEH__select_command);
/**
 * 
 */
lt.objs.sidebar.command.__BEH__select_hidden = (function lt$objs$sidebar$command$__BEH__select_hidden(this$,v){
var temp__4657__auto__ = lt.objs.command.by_id.call(null,cljs.core.keyword.call(null,v));
if(cljs.core.truth_(temp__4657__auto__)){
var cmd = temp__4657__auto__;
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"select","select",1147833503),cmd);
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.command","select-hidden","lt.objs.sidebar.command/select-hidden",266688456),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"select-unknown","select-unknown",-1025304823),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.command.__BEH__select_hidden);
/**
 * 
 */
lt.objs.sidebar.command.__BEH__post_select_pop = (function lt$objs$sidebar$command$__BEH__post_select_pop(this$){
if(cljs.core._EQ_.call(null,this$,new cljs.core.Keyword(null,"active","active",1895962068).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.sidebar.rightbar)))){
return lt.object.raise.call(null,lt.objs.sidebar.rightbar,new cljs.core.Keyword(null,"close!","close!",-2079310498),cljs.core.not.call(null,(function (){var or__6793__auto__ = lt.objs.context.in_QMARK_.call(null,new cljs.core.Keyword(null,"filter-list.input","filter-list.input",-328755840));
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return lt.objs.context.in_QMARK_.call(null,new cljs.core.Keyword(null,"options-input","options-input",-2143404893));
}
})()));
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.command","post-select-pop","lt.objs.sidebar.command/post-select-pop",1429721233),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"selected-exec","selected-exec",-1366177839),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.command.__BEH__post_select_pop);
/**
 * 
 */
lt.objs.sidebar.command.__BEH__exec_command = (function lt$objs$sidebar$command$__BEH__exec_command(var_args){
var args__7875__auto__ = [];
var len__7868__auto___15914 = arguments.length;
var i__7869__auto___15915 = (0);
while(true){
if((i__7869__auto___15915 < len__7868__auto___15914)){
args__7875__auto__.push((arguments[i__7869__auto___15915]));

var G__15916 = (i__7869__auto___15915 + (1));
i__7869__auto___15915 = G__15916;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((2) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((2)),(0),null)):null);
return lt.objs.sidebar.command.__BEH__exec_command.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__7876__auto__);
});

lt.objs.sidebar.command.__BEH__exec_command.cljs$core$IFn$_invoke$arity$variadic = (function (this$,sel,args){
var cmd = lt.objs.command.by_id.call(null,sel);
if(cljs.core.not.call(null,new cljs.core.Keyword(null,"options","options",99638489).cljs$core$IFn$_invoke$arity$1(cmd))){
return cljs.core.apply.call(null,lt.objs.command.exec_BANG_,cmd,args);
} else {
if(cljs.core.truth_((function (){var and__6781__auto__ = new cljs.core.Keyword(null,"options","options",99638489).cljs$core$IFn$_invoke$arity$1(cmd);
if(cljs.core.truth_(and__6781__auto__)){
return cljs.core.seq.call(null,args);
} else {
return and__6781__auto__;
}
})())){
return cljs.core.apply.call(null,new cljs.core.Keyword(null,"exec","exec",1625568743).cljs$core$IFn$_invoke$arity$1(cmd),args);
} else {
lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"show-commandbar-transient","show-commandbar-transient",1931838326));

return lt.object.raise.call(null,new cljs.core.Keyword(null,"selector","selector",762528866).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),new cljs.core.Keyword(null,"select","select",1147833503),cmd);

}
}
});

lt.objs.sidebar.command.__BEH__exec_command.cljs$lang$maxFixedArity = (2);

lt.objs.sidebar.command.__BEH__exec_command.cljs$lang$applyTo = (function (seq15911){
var G__15912 = cljs.core.first.call(null,seq15911);
var seq15911__$1 = cljs.core.next.call(null,seq15911);
var G__15913 = cljs.core.first.call(null,seq15911__$1);
var seq15911__$2 = cljs.core.next.call(null,seq15911__$1);
return lt.objs.sidebar.command.__BEH__exec_command.cljs$core$IFn$_invoke$arity$variadic(G__15912,G__15913,seq15911__$2);
});


lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.command","exec-command","lt.objs.sidebar.command/exec-command",781381672),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"exec!","exec!",707596729),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.command.__BEH__exec_command);
/**
 * 
 */
lt.objs.sidebar.command.__BEH__exec_active_BANG_ = (function lt$objs$sidebar$command$__BEH__exec_active_BANG_(this$,args){
var cmd = new cljs.core.Keyword(null,"active","active",1895962068).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$));
cljs.core.apply.call(null,new cljs.core.Keyword(null,"exec","exec",1625568743).cljs$core$IFn$_invoke$arity$1(cmd),args);

lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"selected-exec","selected-exec",-1366177839),cmd);

return lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"active","active",1895962068),null], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.command","exec-active!","lt.objs.sidebar.command/exec-active!",957655257),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"exec-active!","exec-active!",33479948),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.command.__BEH__exec_active_BANG_);
/**
 * 
 */
lt.objs.sidebar.command.__BEH__focus_on_show = (function lt$objs$sidebar$command$__BEH__focus_on_show(this$){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"focus!","focus!",-1344984927));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.command","focus-on-show","lt.objs.sidebar.command/focus-on-show",1642649248),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"show","show",-576705889),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.command.__BEH__focus_on_show);
/**
 * 
 */
lt.objs.sidebar.command.__BEH__focus_BANG_ = (function lt$objs$sidebar$command$__BEH__focus_BANG_(this$){
if(cljs.core.not.call(null,new cljs.core.Keyword(null,"active","active",1895962068).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)))){
var input = lt.util.dom.$.call(null,new cljs.core.Keyword(null,".search",".search",-1559053770),lt.object.__GT_content.call(null,this$));
lt.util.dom.focus.call(null,input);

return input.select();
} else {
return lt.object.raise.call(null,new cljs.core.Keyword(null,"options","options",99638489).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"active","active",1895962068).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))),new cljs.core.Keyword(null,"focus!","focus!",-1344984927));
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.command","focus!","lt.objs.sidebar.command/focus!",1019417328),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"focus!","focus!",-1344984927),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.command.__BEH__focus_BANG_);
/**
 * 
 */
lt.objs.sidebar.command.__BEH__soft_focus_BANG_ = (function lt$objs$sidebar$command$__BEH__soft_focus_BANG_(this$){
var input = lt.util.dom.$.call(null,new cljs.core.Keyword(null,".search",".search",-1559053770),lt.object.__GT_content.call(null,this$));
return lt.util.dom.focus.call(null,input);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.command","soft-focus!","lt.objs.sidebar.command/soft-focus!",2015803047),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"soft-focus!","soft-focus!",17652340),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.command.__BEH__soft_focus_BANG_);
/**
 * 
 */
lt.objs.sidebar.command.__BEH__refresh_BANG_ = (function lt$objs$sidebar$command$__BEH__refresh_BANG_(this$){
return lt.object.raise.call(null,new cljs.core.Keyword(null,"selector","selector",762528866).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),new cljs.core.Keyword(null,"refresh!","refresh!",156149341));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.command","refresh!","lt.objs.sidebar.command/refresh!",-1840999790),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"refresh!","refresh!",156149341),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.command.__BEH__refresh_BANG_);
/**
 * 
 */
lt.objs.sidebar.command.__BEH__cancel_BANG_ = (function lt$objs$sidebar$command$__BEH__cancel_BANG_(this$){
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"active","active",1895962068),null], null));

return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"focus!","focus!",-1344984927));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.command","cancel!","lt.objs.sidebar.command/cancel!",1083710238),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cancel!","cancel!",-676538519),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.command.__BEH__cancel_BANG_);
/**
 * 
 */
lt.objs.sidebar.command.header_button = (function lt$objs$sidebar$command$header_button(this$){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),crate.binding.bound.call(null,this$,(function (p1__15917_SHARP_){
return new cljs.core.Keyword(null,"desc","desc",2093485764).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"active","active",1895962068).cljs$core$IFn$_invoke$arity$1(p1__15917_SHARP_));
}))], null));
var seq__15928_15938 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"cancel!","cancel!",-676538519));
});})(e__7942__auto__))
], null)));
var chunk__15929_15939 = null;
var count__15930_15940 = (0);
var i__15931_15941 = (0);
while(true){
if((i__15931_15941 < count__15930_15940)){
var vec__15932_15942 = cljs.core._nth.call(null,chunk__15929_15939,i__15931_15941);
var ev__7943__auto___15943 = cljs.core.nth.call(null,vec__15932_15942,(0),null);
var func__7944__auto___15944 = cljs.core.nth.call(null,vec__15932_15942,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___15943,func__7944__auto___15944);

var G__15945 = seq__15928_15938;
var G__15946 = chunk__15929_15939;
var G__15947 = count__15930_15940;
var G__15948 = (i__15931_15941 + (1));
seq__15928_15938 = G__15945;
chunk__15929_15939 = G__15946;
count__15930_15940 = G__15947;
i__15931_15941 = G__15948;
continue;
} else {
var temp__4657__auto___15949 = cljs.core.seq.call(null,seq__15928_15938);
if(temp__4657__auto___15949){
var seq__15928_15950__$1 = temp__4657__auto___15949;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15928_15950__$1)){
var c__7604__auto___15951 = cljs.core.chunk_first.call(null,seq__15928_15950__$1);
var G__15952 = cljs.core.chunk_rest.call(null,seq__15928_15950__$1);
var G__15953 = c__7604__auto___15951;
var G__15954 = cljs.core.count.call(null,c__7604__auto___15951);
var G__15955 = (0);
seq__15928_15938 = G__15952;
chunk__15929_15939 = G__15953;
count__15930_15940 = G__15954;
i__15931_15941 = G__15955;
continue;
} else {
var vec__15935_15956 = cljs.core.first.call(null,seq__15928_15950__$1);
var ev__7943__auto___15957 = cljs.core.nth.call(null,vec__15935_15956,(0),null);
var func__7944__auto___15958 = cljs.core.nth.call(null,vec__15935_15956,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___15957,func__7944__auto___15958);

var G__15959 = cljs.core.next.call(null,seq__15928_15950__$1);
var G__15960 = null;
var G__15961 = (0);
var G__15962 = (0);
seq__15928_15938 = G__15959;
chunk__15929_15939 = G__15960;
count__15930_15940 = G__15961;
i__15931_15941 = G__15962;
continue;
}
} else {
}
}
break;
}

return e__7942__auto__;
});
lt.objs.sidebar.command.__GT_options = (function lt$objs$sidebar$command$__GT_options(this$,active){
if(cljs.core.truth_(new cljs.core.Keyword(null,"options","options",99638489).cljs$core$IFn$_invoke$arity$1(active))){
return lt.object.__GT_content.call(null,new cljs.core.Keyword(null,"options","options",99638489).cljs$core$IFn$_invoke$arity$1(active));
} else {
return null;
}
});
lt.objs.sidebar.command.__GT_command_class = (function lt$objs$sidebar$command$__GT_command_class(this$){
return [cljs.core.str("command "),cljs.core.str((cljs.core.truth_(new cljs.core.Keyword(null,"active","active",1895962068).cljs$core$IFn$_invoke$arity$1(this$))?"options":"selector")),cljs.core.str((cljs.core.truth_(lt.util.dom.has_class_QMARK_.call(null,new cljs.core.Keyword(null,"content","content",15833224).cljs$core$IFn$_invoke$arity$1(this$),new cljs.core.Keyword(null,"active","active",1895962068)))?" active":null))].join('');
});
lt.objs.sidebar.command.__GT_binding = (function lt$objs$sidebar$command$__GT_binding(p__15963){
var vec__15967 = p__15963;
var k = cljs.core.nth.call(null,vec__15967,(0),null);
var v = cljs.core.nth.call(null,vec__15967,(1),null);
return [cljs.core.str(v),cljs.core.str(((([cljs.core.str(k)].join('').indexOf("emacs") > (-1)))?" (Emacs)":null)),cljs.core.str(((([cljs.core.str(k)].join('').indexOf("vim") > (-1)))?" (Vim)":null))].join('');
});
lt.objs.sidebar.command.command__GT_display = (function lt$objs$sidebar$command$command__GT_display(orig,scored,highlighted,item){
return [cljs.core.str("<p>"),cljs.core.str(highlighted),cljs.core.str("<p>"),cljs.core.str((function (){var temp__4657__auto__ = cljs.core.seq.call(null,lt.objs.keyboard.cmd__GT_bindings.call(null,item.call(null,new cljs.core.Keyword(null,"command","command",-894540724))));
if(temp__4657__auto__){
var binding = temp__4657__auto__;
return [cljs.core.str("<p class='binding'>"),cljs.core.str(clojure.string.join.call(null," | ",cljs.core.map.call(null,lt.objs.sidebar.command.__GT_binding,cljs.core.reverse.call(null,binding)))),cljs.core.str("</p>")].join('');
} else {
return null;
}
})())].join('');
});
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.command","sidebar.command","lt.objs.sidebar.command/sidebar.command",721327747),new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"sidebar.command","sidebar.command",-1541105038),null], null), null),new cljs.core.Keyword(null,"label","label",1718410804),"command",new cljs.core.Keyword(null,"active","active",1895962068),null,new cljs.core.Keyword(null,"order","order",-1254677256),(3),new cljs.core.Keyword(null,"init","init",-1875481434),(function (this$){
var commands = crate.binding.subatom.call(null,lt.objs.command.manager,new cljs.core.Keyword(null,"commands","commands",161008658));
var f2 = crate.binding.computed.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [commands], null),((function (commands){
return (function (cmds){
return cljs.core.filter.call(null,((function (commands){
return (function (p1__15970_SHARP_){
return cljs.core.not.call(null,new cljs.core.Keyword(null,"hidden","hidden",-312506092).cljs$core$IFn$_invoke$arity$1(p1__15970_SHARP_));
});})(commands))
,cljs.core.vals.call(null,cmds));
});})(commands))
);
var s2 = lt.objs.sidebar.command.filter_list.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"items","items",1031954938),f2,new cljs.core.Keyword(null,"transform","transform",1381301764),((function (commands,f2){
return (function (p1__15971_SHARP_,p2__15972_SHARP_,p3__15973_SHARP_,p4__15974_SHARP_){
return lt.objs.sidebar.command.command__GT_display.call(null,p1__15971_SHARP_,p2__15972_SHARP_,p3__15973_SHARP_,p4__15974_SHARP_);
});})(commands,f2))
,new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"desc","desc",2093485764)], null));
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"selector","selector",762528866),s2], null));

lt.object.add_tags.call(null,s2,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"command.selector","command.selector",42032912)], null));

return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),crate.binding.bound.call(null,this$,lt.objs.sidebar.command.__GT_command_class)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.selector","div.selector",749885639),lt.object.__GT_content.call(null,s2)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.options","div.options",-1118306305),lt.objs.sidebar.command.header_button.call(null,this$),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),crate.binding.bound.call(null,crate.binding.subatom.call(null,this$,new cljs.core.Keyword(null,"active","active",1895962068)),((function (commands,f2,s2){
return (function (p1__15975_SHARP_){
return lt.objs.sidebar.command.__GT_options.call(null,this$,p1__15975_SHARP_);
});})(commands,f2,s2))
)], null)], null)], null);
}));
/**
 * 
 */
lt.objs.sidebar.command.__BEH__init_commands = (function lt$objs$sidebar$command$__BEH__init_commands(app){
return lt.object.raise.call(null,lt.objs.sidebar.command.sidebar_command,new cljs.core.Keyword(null,"refresh!","refresh!",156149341));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.command","init-commands","lt.objs.sidebar.command/init-commands",1954306957),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"post-init","post-init",1539646468),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.command.__BEH__init_commands);
lt.objs.sidebar.command.sidebar_command = lt.object.create.call(null,new cljs.core.Keyword("lt.objs.sidebar.command","sidebar.command","lt.objs.sidebar.command/sidebar.command",721327747));
lt.objs.context.in_BANG_.call(null,new cljs.core.Keyword(null,"commandbar","commandbar",1544341803),lt.objs.sidebar.command.sidebar_command);
lt.objs.sidebar.add_item.call(null,lt.objs.sidebar.rightbar,lt.objs.sidebar.command.sidebar_command);
lt.objs.sidebar.command.command = lt.objs.command.command;
lt.objs.sidebar.command.show_and_focus = (function lt$objs$sidebar$command$show_and_focus(opts){
return lt.object.raise.call(null,lt.objs.sidebar.rightbar,new cljs.core.Keyword(null,"toggle","toggle",1291842030),lt.objs.sidebar.command.sidebar_command,opts);
});
lt.objs.sidebar.command.pre_fill = (function lt$objs$sidebar$command$pre_fill(v){
return lt.util.dom.val.call(null,lt.util.dom.$.call(null,new cljs.core.Keyword(null,".search",".search",-1559053770),lt.object.__GT_content.call(null,lt.objs.sidebar.command.sidebar_command)),v);
});
lt.objs.sidebar.command.show_filled = (function lt$objs$sidebar$command$show_filled(fill,opts){
lt.objs.sidebar.command.pre_fill.call(null,fill);

lt.object.raise.call(null,lt.objs.sidebar.rightbar,new cljs.core.Keyword(null,"toggle","toggle",1291842030),lt.objs.sidebar.command.sidebar_command,cljs.core.assoc.call(null,opts,new cljs.core.Keyword(null,"soft?","soft?",-1339668477),true));

return lt.object.raise.call(null,lt.objs.sidebar.command.sidebar_command,new cljs.core.Keyword(null,"soft-focus!","soft-focus!",17652340));
});
lt.objs.sidebar.command.exec_BANG_ = lt.objs.command.exec_BANG_;
lt.objs.sidebar.command.exec_active_BANG_ = (function lt$objs$sidebar$command$exec_active_BANG_(var_args){
var args__7875__auto__ = [];
var len__7868__auto___15977 = arguments.length;
var i__7869__auto___15978 = (0);
while(true){
if((i__7869__auto___15978 < len__7868__auto___15977)){
args__7875__auto__.push((arguments[i__7869__auto___15978]));

var G__15979 = (i__7869__auto___15978 + (1));
i__7869__auto___15978 = G__15979;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((0) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((0)),(0),null)):null);
return lt.objs.sidebar.command.exec_active_BANG_.cljs$core$IFn$_invoke$arity$variadic(argseq__7876__auto__);
});

lt.objs.sidebar.command.exec_active_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (args){
return lt.object.raise.call(null,lt.objs.sidebar.command.sidebar_command,new cljs.core.Keyword(null,"exec-active!","exec-active!",33479948),args);
});

lt.objs.sidebar.command.exec_active_BANG_.cljs$lang$maxFixedArity = (0);

lt.objs.sidebar.command.exec_active_BANG_.cljs$lang$applyTo = (function (seq15976){
return lt.objs.sidebar.command.exec_active_BANG_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq15976));
});

lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"show-commandbar","show-commandbar",-1659752270),new cljs.core.Keyword(null,"desc","desc",2093485764),"Command: Show command bar",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.objs.sidebar.command.show_and_focus.call(null,cljs.core.PersistentArrayMap.EMPTY);
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"show-commandbar-transient","show-commandbar-transient",1931838326),new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"desc","desc",2093485764),"Command: Show command bar transiently",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.objs.sidebar.command.show_and_focus.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"transient?","transient?",1694525927),true], null));
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"quit","quit",53285210),new cljs.core.Keyword(null,"desc","desc",2093485764),"Window: Quit Light Table",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.objs.app.close.call(null);
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"passthrough","passthrough",2059714258),new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"desc","desc",2093485764),"No-op key passthrough",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.objs.keyboard.passthrough.call(null);
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"filter-list.input.move-selection","filter-list.input.move-selection",709137389),new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"desc","desc",2093485764),"FilterList: move selection",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (dir){
return lt.object.raise.call(null,lt.objs.context.__GT_obj.call(null,new cljs.core.Keyword(null,"filter-list.input","filter-list.input",-328755840)),new cljs.core.Keyword(null,"move-selection","move-selection",-360291088),dir);
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"filter-list.input.select!","filter-list.input.select!",1699759914),new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"desc","desc",2093485764),"FilterList: select",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.object.raise.call(null,lt.objs.context.__GT_obj.call(null,new cljs.core.Keyword(null,"filter-list.input","filter-list.input",-328755840)),new cljs.core.Keyword(null,"select!","select!",1013647471));
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"filter-list.input.escape!","filter-list.input.escape!",-106008913),new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"desc","desc",2093485764),"FilterList: escape",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (force_QMARK_){
return lt.object.raise.call(null,lt.objs.context.__GT_obj.call(null,new cljs.core.Keyword(null,"filter-list.input","filter-list.input",-328755840)),new cljs.core.Keyword(null,"escape!","escape!",1850102229),force_QMARK_);
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"options-input.select!","options-input.select!",-348025500),new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"desc","desc",2093485764),"OptionsInput: select",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.object.raise.call(null,lt.objs.context.__GT_obj.call(null,new cljs.core.Keyword(null,"options-input","options-input",-2143404893)),new cljs.core.Keyword(null,"select!","select!",1013647471));
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"options-input.escape!","options-input.escape!",1599174401),new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"desc","desc",2093485764),"OptionsInput: escape",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.object.raise.call(null,lt.objs.context.__GT_obj.call(null,new cljs.core.Keyword(null,"options-input","options-input",-2143404893)),new cljs.core.Keyword(null,"escape!","escape!",1850102229));
})], null));
