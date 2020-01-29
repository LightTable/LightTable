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
lt.util.load.js.call(null,"core/node_modules/lighttable/util/fuzzy.js",new cljs.core.Keyword(null,"sync","sync",-624148946));
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
lt.objs.sidebar.command.__GT_value = (function lt$objs$sidebar$command$__GT_value(p__15664){
var map__15667 = p__15664;
var map__15667__$1 = ((((!((map__15667 == null)))?((((map__15667.cljs$lang$protocol_mask$partition0$ & (64))) || (map__15667.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15667):map__15667);
var value = cljs.core.get.call(null,map__15667__$1,new cljs.core.Keyword(null,"value","value",305978217));
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
var seq__15679_15689 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"focus","focus",234677911),((function (e__7942__auto__){
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
var chunk__15680_15690 = null;
var count__15681_15691 = (0);
var i__15682_15692 = (0);
while(true){
if((i__15682_15692 < count__15681_15691)){
var vec__15683_15693 = cljs.core._nth.call(null,chunk__15680_15690,i__15682_15692);
var ev__7943__auto___15694 = cljs.core.nth.call(null,vec__15683_15693,(0),null);
var func__7944__auto___15695 = cljs.core.nth.call(null,vec__15683_15693,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___15694,func__7944__auto___15695);

var G__15696 = seq__15679_15689;
var G__15697 = chunk__15680_15690;
var G__15698 = count__15681_15691;
var G__15699 = (i__15682_15692 + (1));
seq__15679_15689 = G__15696;
chunk__15680_15690 = G__15697;
count__15681_15691 = G__15698;
i__15682_15692 = G__15699;
continue;
} else {
var temp__4657__auto___15700 = cljs.core.seq.call(null,seq__15679_15689);
if(temp__4657__auto___15700){
var seq__15679_15701__$1 = temp__4657__auto___15700;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15679_15701__$1)){
var c__7604__auto___15702 = cljs.core.chunk_first.call(null,seq__15679_15701__$1);
var G__15703 = cljs.core.chunk_rest.call(null,seq__15679_15701__$1);
var G__15704 = c__7604__auto___15702;
var G__15705 = cljs.core.count.call(null,c__7604__auto___15702);
var G__15706 = (0);
seq__15679_15689 = G__15703;
chunk__15680_15690 = G__15704;
count__15681_15691 = G__15705;
i__15682_15692 = G__15706;
continue;
} else {
var vec__15686_15707 = cljs.core.first.call(null,seq__15679_15701__$1);
var ev__7943__auto___15708 = cljs.core.nth.call(null,vec__15686_15707,(0),null);
var func__7944__auto___15709 = cljs.core.nth.call(null,vec__15686_15707,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___15708,func__7944__auto___15709);

var G__15710 = cljs.core.next.call(null,seq__15679_15701__$1);
var G__15711 = null;
var G__15712 = (0);
var G__15713 = (0);
seq__15679_15689 = G__15710;
chunk__15680_15690 = G__15711;
count__15681_15691 = G__15712;
i__15682_15692 = G__15713;
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
lt.objs.sidebar.command.fill_lis = (function lt$objs$sidebar$command$fill_lis(p__15717,results){
var map__15736 = p__15717;
var map__15736__$1 = ((((!((map__15736 == null)))?((((map__15736.cljs$lang$protocol_mask$partition0$ & (64))) || (map__15736.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15736):map__15736);
var this$ = map__15736__$1;
var lis = cljs.core.get.call(null,map__15736__$1,new cljs.core.Keyword(null,"lis","lis",-991188396));
var size = cljs.core.get.call(null,map__15736__$1,new cljs.core.Keyword(null,"size","size",1098693007));
var search = cljs.core.get.call(null,map__15736__$1,new cljs.core.Keyword(null,"search","search",1564939822));
var selected = cljs.core.get.call(null,map__15736__$1,new cljs.core.Keyword(null,"selected","selected",574897764));
var key = cljs.core.get.call(null,map__15736__$1,new cljs.core.Keyword(null,"key","key",-1516042587));
var transform = cljs.core.get.call(null,map__15736__$1,new cljs.core.Keyword(null,"transform","transform",1381301764));
var cnt = cljs.core.count.call(null,results);
var cur = cljs.core.mod.call(null,selected,(((cnt > size))?size:cnt));
var transform__$1 = (cljs.core.truth_(transform)?transform:((function (cnt,cur,map__15736,map__15736__$1,this$,lis,size,search,selected,key,transform){
return (function (p1__15715_SHARP_,p2__15716_SHARP_,p3__15714_SHARP_){
return p3__15714_SHARP_;
});})(cnt,cur,map__15736,map__15736__$1,this$,lis,size,search,selected,key,transform))
);
if(cljs.core._EQ_.call(null,cnt,(0))){
lt.util.dom.add_class.call(null,new cljs.core.Keyword(null,"content","content",15833224).cljs$core$IFn$_invoke$arity$1(this$),new cljs.core.Keyword(null,"empty","empty",767870958));
} else {
lt.util.dom.remove_class.call(null,new cljs.core.Keyword(null,"content","content",15833224).cljs$core$IFn$_invoke$arity$1(this$),new cljs.core.Keyword(null,"empty","empty",767870958));
}

var seq__15738_15754 = cljs.core.seq.call(null,cljs.core.map.call(null,cljs.core.vector,cljs.core.range.call(null),lis,results));
var chunk__15740_15755 = null;
var count__15741_15756 = (0);
var i__15742_15757 = (0);
while(true){
if((i__15742_15757 < count__15741_15756)){
var vec__15744_15758 = cljs.core._nth.call(null,chunk__15740_15755,i__15742_15757);
var i_15759 = cljs.core.nth.call(null,vec__15744_15758,(0),null);
var li_15760 = cljs.core.nth.call(null,vec__15744_15758,(1),null);
var res_15761 = cljs.core.nth.call(null,vec__15744_15758,(2),null);
if(cljs.core.truth_(res_15761)){
lt.util.dom.html.call(null,li_15760,transform__$1.call(null,(res_15761[(1)]),(res_15761[(4)]),((!(cljs.core.empty_QMARK_.call(null,search)))?wrapMatch((res_15761[(1)]),(res_15761[(4)])):(res_15761[(1)])),(res_15761[(0)])));

lt.util.dom.css.call(null,li_15760,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"display","display",242065432),"block"], null));

if(cljs.core._EQ_.call(null,i_15759,cur)){
lt.util.dom.add_class.call(null,li_15760,new cljs.core.Keyword(null,"selected","selected",574897764));
} else {
lt.util.dom.remove_class.call(null,li_15760,new cljs.core.Keyword(null,"selected","selected",574897764));
}

var G__15762 = seq__15738_15754;
var G__15763 = chunk__15740_15755;
var G__15764 = count__15741_15756;
var G__15765 = (i__15742_15757 + (1));
seq__15738_15754 = G__15762;
chunk__15740_15755 = G__15763;
count__15741_15756 = G__15764;
i__15742_15757 = G__15765;
continue;
} else {
var G__15766 = seq__15738_15754;
var G__15767 = chunk__15740_15755;
var G__15768 = count__15741_15756;
var G__15769 = (i__15742_15757 + (1));
seq__15738_15754 = G__15766;
chunk__15740_15755 = G__15767;
count__15741_15756 = G__15768;
i__15742_15757 = G__15769;
continue;
}
} else {
var temp__4657__auto___15770 = cljs.core.seq.call(null,seq__15738_15754);
if(temp__4657__auto___15770){
var seq__15738_15771__$1 = temp__4657__auto___15770;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15738_15771__$1)){
var c__7604__auto___15772 = cljs.core.chunk_first.call(null,seq__15738_15771__$1);
var G__15773 = cljs.core.chunk_rest.call(null,seq__15738_15771__$1);
var G__15774 = c__7604__auto___15772;
var G__15775 = cljs.core.count.call(null,c__7604__auto___15772);
var G__15776 = (0);
seq__15738_15754 = G__15773;
chunk__15740_15755 = G__15774;
count__15741_15756 = G__15775;
i__15742_15757 = G__15776;
continue;
} else {
var vec__15747_15777 = cljs.core.first.call(null,seq__15738_15771__$1);
var i_15778 = cljs.core.nth.call(null,vec__15747_15777,(0),null);
var li_15779 = cljs.core.nth.call(null,vec__15747_15777,(1),null);
var res_15780 = cljs.core.nth.call(null,vec__15747_15777,(2),null);
if(cljs.core.truth_(res_15780)){
lt.util.dom.html.call(null,li_15779,transform__$1.call(null,(res_15780[(1)]),(res_15780[(4)]),((!(cljs.core.empty_QMARK_.call(null,search)))?wrapMatch((res_15780[(1)]),(res_15780[(4)])):(res_15780[(1)])),(res_15780[(0)])));

lt.util.dom.css.call(null,li_15779,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"display","display",242065432),"block"], null));

if(cljs.core._EQ_.call(null,i_15778,cur)){
lt.util.dom.add_class.call(null,li_15779,new cljs.core.Keyword(null,"selected","selected",574897764));
} else {
lt.util.dom.remove_class.call(null,li_15779,new cljs.core.Keyword(null,"selected","selected",574897764));
}

var G__15781 = cljs.core.next.call(null,seq__15738_15771__$1);
var G__15782 = null;
var G__15783 = (0);
var G__15784 = (0);
seq__15738_15754 = G__15781;
chunk__15740_15755 = G__15782;
count__15741_15756 = G__15783;
i__15742_15757 = G__15784;
continue;
} else {
var G__15785 = cljs.core.next.call(null,seq__15738_15771__$1);
var G__15786 = null;
var G__15787 = (0);
var G__15788 = (0);
seq__15738_15754 = G__15785;
chunk__15740_15755 = G__15786;
count__15741_15756 = G__15787;
i__15742_15757 = G__15788;
continue;
}
}
} else {
}
}
break;
}

var seq__15750 = cljs.core.seq.call(null,cljs.core.drop.call(null,cnt,lis));
var chunk__15751 = null;
var count__15752 = (0);
var i__15753 = (0);
while(true){
if((i__15753 < count__15752)){
var li = cljs.core._nth.call(null,chunk__15751,i__15753);
lt.util.dom.css.call(null,li,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"display","display",242065432),"none"], null));

var G__15789 = seq__15750;
var G__15790 = chunk__15751;
var G__15791 = count__15752;
var G__15792 = (i__15753 + (1));
seq__15750 = G__15789;
chunk__15751 = G__15790;
count__15752 = G__15791;
i__15753 = G__15792;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__15750);
if(temp__4657__auto__){
var seq__15750__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15750__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__15750__$1);
var G__15793 = cljs.core.chunk_rest.call(null,seq__15750__$1);
var G__15794 = c__7604__auto__;
var G__15795 = cljs.core.count.call(null,c__7604__auto__);
var G__15796 = (0);
seq__15750 = G__15793;
chunk__15751 = G__15794;
count__15752 = G__15795;
i__15753 = G__15796;
continue;
} else {
var li = cljs.core.first.call(null,seq__15750__$1);
lt.util.dom.css.call(null,li,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"display","display",242065432),"none"], null));

var G__15797 = cljs.core.next.call(null,seq__15750__$1);
var G__15798 = null;
var G__15799 = (0);
var G__15800 = (0);
seq__15750 = G__15797;
chunk__15751 = G__15798;
count__15752 = G__15799;
i__15753 = G__15800;
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
var seq__15811_15821 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"focus","focus",234677911),((function (e__7942__auto__){
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
var chunk__15812_15822 = null;
var count__15813_15823 = (0);
var i__15814_15824 = (0);
while(true){
if((i__15814_15824 < count__15813_15823)){
var vec__15815_15825 = cljs.core._nth.call(null,chunk__15812_15822,i__15814_15824);
var ev__7943__auto___15826 = cljs.core.nth.call(null,vec__15815_15825,(0),null);
var func__7944__auto___15827 = cljs.core.nth.call(null,vec__15815_15825,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___15826,func__7944__auto___15827);

var G__15828 = seq__15811_15821;
var G__15829 = chunk__15812_15822;
var G__15830 = count__15813_15823;
var G__15831 = (i__15814_15824 + (1));
seq__15811_15821 = G__15828;
chunk__15812_15822 = G__15829;
count__15813_15823 = G__15830;
i__15814_15824 = G__15831;
continue;
} else {
var temp__4657__auto___15832 = cljs.core.seq.call(null,seq__15811_15821);
if(temp__4657__auto___15832){
var seq__15811_15833__$1 = temp__4657__auto___15832;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15811_15833__$1)){
var c__7604__auto___15834 = cljs.core.chunk_first.call(null,seq__15811_15833__$1);
var G__15835 = cljs.core.chunk_rest.call(null,seq__15811_15833__$1);
var G__15836 = c__7604__auto___15834;
var G__15837 = cljs.core.count.call(null,c__7604__auto___15834);
var G__15838 = (0);
seq__15811_15821 = G__15835;
chunk__15812_15822 = G__15836;
count__15813_15823 = G__15837;
i__15814_15824 = G__15838;
continue;
} else {
var vec__15818_15839 = cljs.core.first.call(null,seq__15811_15833__$1);
var ev__7943__auto___15840 = cljs.core.nth.call(null,vec__15818_15839,(0),null);
var func__7944__auto___15841 = cljs.core.nth.call(null,vec__15818_15839,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___15840,func__7944__auto___15841);

var G__15842 = cljs.core.next.call(null,seq__15811_15833__$1);
var G__15843 = null;
var G__15844 = (0);
var G__15845 = (0);
seq__15811_15821 = G__15842;
chunk__15812_15822 = G__15843;
count__15813_15823 = G__15844;
i__15814_15824 = G__15845;
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
lt.objs.sidebar.command.indexed_results = (function lt$objs$sidebar$command$indexed_results(p__15854){
var map__15857 = p__15854;
var map__15857__$1 = ((((!((map__15857 == null)))?((((map__15857.cljs$lang$protocol_mask$partition0$ & (64))) || (map__15857.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15857):map__15857);
var search = cljs.core.get.call(null,map__15857__$1,new cljs.core.Keyword(null,"search","search",1564939822));
var size = cljs.core.get.call(null,map__15857__$1,new cljs.core.Keyword(null,"size","size",1098693007));
var items = cljs.core.get.call(null,map__15857__$1,new cljs.core.Keyword(null,"items","items",1031954938));
var key = cljs.core.get.call(null,map__15857__$1,new cljs.core.Keyword(null,"key","key",-1516042587));
var items__$1 = cljs.core.apply.call(null,cljs.core.array,lt.objs.sidebar.command.__GT_items.call(null,items));
var map_func3 = ((function (items__$1,map__15857,map__15857__$1,search,size,items,key){
return (function (p1__15848_SHARP_){
return [p1__15848_SHARP_,key.call(null,p1__15848_SHARP_),fastScore(key.call(null,p1__15848_SHARP_),search),null,null];
});})(items__$1,map__15857,map__15857__$1,search,size,items,key))
;
var map_func = ((function (items__$1,map_func3,map__15857,map__15857__$1,search,size,items,key){
return (function (p1__15849_SHARP_){
(p1__15849_SHARP_[(3)] = (p1__15849_SHARP_[(1)]).score(search));

return p1__15849_SHARP_;
});})(items__$1,map_func3,map__15857,map__15857__$1,search,size,items,key))
;
var map_func2 = ((function (items__$1,map_func3,map_func,map__15857,map__15857__$1,search,size,items,key){
return (function (p1__15850_SHARP_){
(p1__15850_SHARP_[(4)] = score((p1__15850_SHARP_[(1)]),search));

return p1__15850_SHARP_;
});})(items__$1,map_func3,map_func,map__15857,map__15857__$1,search,size,items,key))
;
var has_score = ((function (items__$1,map_func3,map_func,map_func2,map__15857,map__15857__$1,search,size,items,key){
return (function (p1__15851_SHARP_){
return ((p1__15851_SHARP_[(4)]).score > (0));
});})(items__$1,map_func3,map_func,map_func2,map__15857,map__15857__$1,search,size,items,key))
;
if(!(cljs.core.empty_QMARK_.call(null,search))){
var score0 = items__$1.map(map_func3).filter(((function (items__$1,map_func3,map_func,map_func2,has_score,map__15857,map__15857__$1,search,size,items,key){
return (function (p1__15852_SHARP_){
return (p1__15852_SHARP_[(2)]);
});})(items__$1,map_func3,map_func,map_func2,has_score,map__15857,map__15857__$1,search,size,items,key))
);
var score1 = score0.map(map_func).sort(lt.objs.sidebar.command.score_sort);
var score2 = score1.slice((0),(50)).map(map_func2).filter(has_score).sort(lt.objs.sidebar.command.score_sort2);
return score2;
} else {
return items__$1.map(((function (items__$1,map_func3,map_func,map_func2,has_score,map__15857,map__15857__$1,search,size,items,key){
return (function (p1__15853_SHARP_){
return [p1__15853_SHARP_,key.call(null,p1__15853_SHARP_),null,null];
});})(items__$1,map_func3,map_func,map_func2,has_score,map__15857,map__15857__$1,search,size,items,key))
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
var seq__15869_15879 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"mousedown","mousedown",1391242074),((function (e__7942__auto__){
return (function (e){
lt.util.dom.prevent.call(null,e);

lt.util.dom.stop_propagation.call(null,e);

lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"set-selection!","set-selection!",223827241),x);

return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"select!","select!",1013647471),x);
});})(e__7942__auto__))
], null)));
var chunk__15870_15880 = null;
var count__15871_15881 = (0);
var i__15872_15882 = (0);
while(true){
if((i__15872_15882 < count__15871_15881)){
var vec__15873_15883 = cljs.core._nth.call(null,chunk__15870_15880,i__15872_15882);
var ev__7943__auto___15884 = cljs.core.nth.call(null,vec__15873_15883,(0),null);
var func__7944__auto___15885 = cljs.core.nth.call(null,vec__15873_15883,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___15884,func__7944__auto___15885);

var G__15886 = seq__15869_15879;
var G__15887 = chunk__15870_15880;
var G__15888 = count__15871_15881;
var G__15889 = (i__15872_15882 + (1));
seq__15869_15879 = G__15886;
chunk__15870_15880 = G__15887;
count__15871_15881 = G__15888;
i__15872_15882 = G__15889;
continue;
} else {
var temp__4657__auto___15890 = cljs.core.seq.call(null,seq__15869_15879);
if(temp__4657__auto___15890){
var seq__15869_15891__$1 = temp__4657__auto___15890;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15869_15891__$1)){
var c__7604__auto___15892 = cljs.core.chunk_first.call(null,seq__15869_15891__$1);
var G__15893 = cljs.core.chunk_rest.call(null,seq__15869_15891__$1);
var G__15894 = c__7604__auto___15892;
var G__15895 = cljs.core.count.call(null,c__7604__auto___15892);
var G__15896 = (0);
seq__15869_15879 = G__15893;
chunk__15870_15880 = G__15894;
count__15871_15881 = G__15895;
i__15872_15882 = G__15896;
continue;
} else {
var vec__15876_15897 = cljs.core.first.call(null,seq__15869_15891__$1);
var ev__7943__auto___15898 = cljs.core.nth.call(null,vec__15876_15897,(0),null);
var func__7944__auto___15899 = cljs.core.nth.call(null,vec__15876_15897,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___15898,func__7944__auto___15899);

var G__15900 = cljs.core.next.call(null,seq__15869_15891__$1);
var G__15901 = null;
var G__15902 = (0);
var G__15903 = (0);
seq__15869_15879 = G__15900;
chunk__15870_15880 = G__15901;
count__15871_15881 = G__15902;
i__15872_15882 = G__15903;
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
return (function lt$objs$sidebar$command$iter__15904(s__15905){
return (new cljs.core.LazySeq(null,((function (opts__$1){
return (function (){
var s__15905__$1 = s__15905;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__15905__$1);
if(temp__4657__auto__){
var s__15905__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__15905__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__15905__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__15907 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__15906 = (0);
while(true){
if((i__15906 < size__7572__auto__)){
var x = cljs.core._nth.call(null,c__7571__auto__,i__15906);
cljs.core.chunk_append.call(null,b__15907,lt.objs.sidebar.command.item.call(null,this$,x));

var G__15908 = (i__15906 + (1));
i__15906 = G__15908;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__15907),lt$objs$sidebar$command$iter__15904.call(null,cljs.core.chunk_rest.call(null,s__15905__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__15907),null);
}
} else {
var x = cljs.core.first.call(null,s__15905__$2);
return cljs.core.cons.call(null,lt.objs.sidebar.command.item.call(null,this$,x),lt$objs$sidebar$command$iter__15904.call(null,cljs.core.rest.call(null,s__15905__$2)));
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
var len__7868__auto___15912 = arguments.length;
var i__7869__auto___15913 = (0);
while(true){
if((i__7869__auto___15913 < len__7868__auto___15912)){
args__7875__auto__.push((arguments[i__7869__auto___15913]));

var G__15914 = (i__7869__auto___15913 + (1));
i__7869__auto___15913 = G__15914;
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

lt.objs.sidebar.command.__BEH__exec_command.cljs$lang$applyTo = (function (seq15909){
var G__15910 = cljs.core.first.call(null,seq15909);
var seq15909__$1 = cljs.core.next.call(null,seq15909);
var G__15911 = cljs.core.first.call(null,seq15909__$1);
var seq15909__$2 = cljs.core.next.call(null,seq15909__$1);
return lt.objs.sidebar.command.__BEH__exec_command.cljs$core$IFn$_invoke$arity$variadic(G__15910,G__15911,seq15909__$2);
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
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),crate.binding.bound.call(null,this$,(function (p1__15915_SHARP_){
return new cljs.core.Keyword(null,"desc","desc",2093485764).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"active","active",1895962068).cljs$core$IFn$_invoke$arity$1(p1__15915_SHARP_));
}))], null));
var seq__15926_15936 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"cancel!","cancel!",-676538519));
});})(e__7942__auto__))
], null)));
var chunk__15927_15937 = null;
var count__15928_15938 = (0);
var i__15929_15939 = (0);
while(true){
if((i__15929_15939 < count__15928_15938)){
var vec__15930_15940 = cljs.core._nth.call(null,chunk__15927_15937,i__15929_15939);
var ev__7943__auto___15941 = cljs.core.nth.call(null,vec__15930_15940,(0),null);
var func__7944__auto___15942 = cljs.core.nth.call(null,vec__15930_15940,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___15941,func__7944__auto___15942);

var G__15943 = seq__15926_15936;
var G__15944 = chunk__15927_15937;
var G__15945 = count__15928_15938;
var G__15946 = (i__15929_15939 + (1));
seq__15926_15936 = G__15943;
chunk__15927_15937 = G__15944;
count__15928_15938 = G__15945;
i__15929_15939 = G__15946;
continue;
} else {
var temp__4657__auto___15947 = cljs.core.seq.call(null,seq__15926_15936);
if(temp__4657__auto___15947){
var seq__15926_15948__$1 = temp__4657__auto___15947;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15926_15948__$1)){
var c__7604__auto___15949 = cljs.core.chunk_first.call(null,seq__15926_15948__$1);
var G__15950 = cljs.core.chunk_rest.call(null,seq__15926_15948__$1);
var G__15951 = c__7604__auto___15949;
var G__15952 = cljs.core.count.call(null,c__7604__auto___15949);
var G__15953 = (0);
seq__15926_15936 = G__15950;
chunk__15927_15937 = G__15951;
count__15928_15938 = G__15952;
i__15929_15939 = G__15953;
continue;
} else {
var vec__15933_15954 = cljs.core.first.call(null,seq__15926_15948__$1);
var ev__7943__auto___15955 = cljs.core.nth.call(null,vec__15933_15954,(0),null);
var func__7944__auto___15956 = cljs.core.nth.call(null,vec__15933_15954,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___15955,func__7944__auto___15956);

var G__15957 = cljs.core.next.call(null,seq__15926_15948__$1);
var G__15958 = null;
var G__15959 = (0);
var G__15960 = (0);
seq__15926_15936 = G__15957;
chunk__15927_15937 = G__15958;
count__15928_15938 = G__15959;
i__15929_15939 = G__15960;
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
lt.objs.sidebar.command.__GT_binding = (function lt$objs$sidebar$command$__GT_binding(p__15961){
var vec__15965 = p__15961;
var k = cljs.core.nth.call(null,vec__15965,(0),null);
var v = cljs.core.nth.call(null,vec__15965,(1),null);
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
return (function (p1__15968_SHARP_){
return cljs.core.not.call(null,new cljs.core.Keyword(null,"hidden","hidden",-312506092).cljs$core$IFn$_invoke$arity$1(p1__15968_SHARP_));
});})(commands))
,cljs.core.vals.call(null,cmds));
});})(commands))
);
var s2 = lt.objs.sidebar.command.filter_list.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"items","items",1031954938),f2,new cljs.core.Keyword(null,"transform","transform",1381301764),((function (commands,f2){
return (function (p1__15969_SHARP_,p2__15970_SHARP_,p3__15971_SHARP_,p4__15972_SHARP_){
return lt.objs.sidebar.command.command__GT_display.call(null,p1__15969_SHARP_,p2__15970_SHARP_,p3__15971_SHARP_,p4__15972_SHARP_);
});})(commands,f2))
,new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"desc","desc",2093485764)], null));
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"selector","selector",762528866),s2], null));

lt.object.add_tags.call(null,s2,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"command.selector","command.selector",42032912)], null));

return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),crate.binding.bound.call(null,this$,lt.objs.sidebar.command.__GT_command_class)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.selector","div.selector",749885639),lt.object.__GT_content.call(null,s2)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.options","div.options",-1118306305),lt.objs.sidebar.command.header_button.call(null,this$),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),crate.binding.bound.call(null,crate.binding.subatom.call(null,this$,new cljs.core.Keyword(null,"active","active",1895962068)),((function (commands,f2,s2){
return (function (p1__15973_SHARP_){
return lt.objs.sidebar.command.__GT_options.call(null,this$,p1__15973_SHARP_);
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
var len__7868__auto___15975 = arguments.length;
var i__7869__auto___15976 = (0);
while(true){
if((i__7869__auto___15976 < len__7868__auto___15975)){
args__7875__auto__.push((arguments[i__7869__auto___15976]));

var G__15977 = (i__7869__auto___15976 + (1));
i__7869__auto___15976 = G__15977;
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

lt.objs.sidebar.command.exec_active_BANG_.cljs$lang$applyTo = (function (seq15974){
return lt.objs.sidebar.command.exec_active_BANG_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq15974));
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
