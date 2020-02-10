// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.objs.statusbar');
goog.require('cljs.core');
goog.require('lt.objs.command');
goog.require('lt.objs.editor');
goog.require('lt.object');
goog.require('lt.util.cljs');
goog.require('lt.util.dom');
goog.require('lt.objs.canvas');
goog.require('lt.objs.tabs');
goog.require('lt.objs.bottombar');
goog.require('crate.binding');
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.statusbar","statusbar-container","lt.objs.statusbar/statusbar-container",-1032563573),new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"statusbar","statusbar",-680036405),null], null), null),new cljs.core.Keyword(null,"items","items",1031954938),cljs.core.sorted_set_by.call(null,(function (p1__15123_SHARP_){
return new cljs.core.Keyword(null,"order","order",-1254677256).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,p1__15123_SHARP_));
})),new cljs.core.Keyword(null,"init","init",-1875481434),(function (this$){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#statusbar-container","div#statusbar-container",1248433478)], null);
}));
lt.objs.statusbar.container = lt.object.create.call(null,new cljs.core.Keyword("lt.objs.statusbar","statusbar-container","lt.objs.statusbar/statusbar-container",-1032563573));
/**
 * Add an object to the statusbar container. When you wish the object to be displayed or hidden,
 *   raise :show! or :hide! respectively. Objects must have :order and :height keys in order to determine
 *   the space required for the object.
 */
lt.objs.statusbar.add_container = (function lt$objs$statusbar$add_container(obj){
lt.object.add_tags.call(null,obj,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"statusbar-item","statusbar-item",-26211382)], null));

lt.object.update_BANG_.call(null,lt.objs.statusbar.container,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"items","items",1031954938)], null),cljs.core.conj,obj);

var i = lt.util.cljs.index_of.call(null,obj,new cljs.core.Keyword(null,"items","items",1031954938).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.statusbar.container)));
if(cljs.core._EQ_.call(null,i,(0))){
return lt.util.dom.prepend.call(null,lt.object.__GT_content.call(null,lt.objs.statusbar.container),lt.object.__GT_content.call(null,obj));
} else {
return lt.util.dom.after.call(null,lt.object.__GT_content.call(null,cljs.core.get.call(null,new cljs.core.Keyword(null,"items","items",1031954938).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.statusbar.container)),i)),lt.object.__GT_content.call(null,obj));
}
});
/**
 * 
 */
lt.objs.statusbar.__BEH__on_show_BANG_ = (function lt$objs$statusbar$__BEH__on_show_BANG_(this$){
if(cljs.core.truth_(new cljs.core.Keyword("lt.objs.statusbar","shown","lt.objs.statusbar/shown",170188730).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)))){
return null;
} else {
lt.util.dom.css.call(null,lt.object.__GT_content.call(null,this$),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"height","height",1025178622),new cljs.core.Keyword(null,"height","height",1025178622).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))], null));

lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("lt.objs.statusbar","shown","lt.objs.statusbar/shown",170188730),true], null));

return lt.object.raise.call(null,lt.objs.tabs.multi,new cljs.core.Keyword(null,"tabset-bottom!","tabset-bottom!",507682936),new cljs.core.Keyword(null,"height","height",1025178622).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.statusbar","on-show!","lt.objs.statusbar/on-show!",2131964034),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"show!","show!",1939158011),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.statusbar.__BEH__on_show_BANG_);
/**
 * 
 */
lt.objs.statusbar.__BEH__on_hide_BANG_ = (function lt$objs$statusbar$__BEH__on_hide_BANG_(this$){
if(cljs.core.truth_(new cljs.core.Keyword("lt.objs.statusbar","shown","lt.objs.statusbar/shown",170188730).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)))){
lt.util.dom.css.call(null,lt.object.__GT_content.call(null,this$),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"height","height",1025178622),(0)], null));

lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("lt.objs.statusbar","shown","lt.objs.statusbar/shown",170188730),false], null));

return lt.object.raise.call(null,lt.objs.tabs.multi,new cljs.core.Keyword(null,"tabset-bottom!","tabset-bottom!",507682936),(- new cljs.core.Keyword(null,"height","height",1025178622).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))));
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.statusbar","on-hide!","lt.objs.statusbar/on-hide!",-799753366),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"hide!","hide!",-2041470693),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.statusbar.__BEH__on_hide_BANG_);
/**
 * 
 */
lt.objs.statusbar.__BEH__init_statusbar = (function lt$objs$statusbar$__BEH__init_statusbar(app){
return lt.util.dom.append.call(null,lt.object.__GT_content.call(null,lt.objs.tabs.multi),lt.object.__GT_content.call(null,lt.objs.statusbar.container));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.statusbar","init-statusbar","lt.objs.statusbar/init-statusbar",-979788424),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"init","init",-1875481434),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.statusbar.__BEH__init_statusbar);
/**
 * 
 */
lt.objs.statusbar.statusbar_item = (function lt$objs$statusbar$statusbar_item(content,class$){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),class$], null),content], null));
var seq__15134_15144 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),cljs.core.PersistentVector.EMPTY));
var chunk__15135_15145 = null;
var count__15136_15146 = (0);
var i__15137_15147 = (0);
while(true){
if((i__15137_15147 < count__15136_15146)){
var vec__15138_15148 = cljs.core._nth.call(null,chunk__15135_15145,i__15137_15147);
var ev__7943__auto___15149 = cljs.core.nth.call(null,vec__15138_15148,(0),null);
var func__7944__auto___15150 = cljs.core.nth.call(null,vec__15138_15148,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___15149,func__7944__auto___15150);

var G__15151 = seq__15134_15144;
var G__15152 = chunk__15135_15145;
var G__15153 = count__15136_15146;
var G__15154 = (i__15137_15147 + (1));
seq__15134_15144 = G__15151;
chunk__15135_15145 = G__15152;
count__15136_15146 = G__15153;
i__15137_15147 = G__15154;
continue;
} else {
var temp__4657__auto___15155 = cljs.core.seq.call(null,seq__15134_15144);
if(temp__4657__auto___15155){
var seq__15134_15156__$1 = temp__4657__auto___15155;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15134_15156__$1)){
var c__7604__auto___15157 = cljs.core.chunk_first.call(null,seq__15134_15156__$1);
var G__15158 = cljs.core.chunk_rest.call(null,seq__15134_15156__$1);
var G__15159 = c__7604__auto___15157;
var G__15160 = cljs.core.count.call(null,c__7604__auto___15157);
var G__15161 = (0);
seq__15134_15144 = G__15158;
chunk__15135_15145 = G__15159;
count__15136_15146 = G__15160;
i__15137_15147 = G__15161;
continue;
} else {
var vec__15141_15162 = cljs.core.first.call(null,seq__15134_15156__$1);
var ev__7943__auto___15163 = cljs.core.nth.call(null,vec__15141_15162,(0),null);
var func__7944__auto___15164 = cljs.core.nth.call(null,vec__15141_15162,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___15163,func__7944__auto___15164);

var G__15165 = cljs.core.next.call(null,seq__15134_15156__$1);
var G__15166 = null;
var G__15167 = (0);
var G__15168 = (0);
seq__15134_15144 = G__15165;
chunk__15135_15145 = G__15166;
count__15136_15146 = G__15167;
i__15137_15147 = G__15168;
continue;
}
} else {
}
}
break;
}

return e__7942__auto__;
});
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.statusbar","statusbar","lt.objs.statusbar/statusbar",-1530344258),new cljs.core.Keyword(null,"items","items",1031954938),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"height","height",1025178622),(34),new cljs.core.Keyword(null,"order","order",-1254677256),(0),new cljs.core.Keyword(null,"init","init",-1875481434),(function (this$){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul#statusbar","ul#statusbar",419168499),crate.binding.map_bound.call(null,(function (p1__15169_SHARP_){
return lt.object.__GT_content.call(null,cljs.core.deref.call(null,p1__15169_SHARP_));
}),this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"path","path",-188191168),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"items","items",1031954938)], null)], null))], null);
}));
lt.objs.statusbar.statusbar = lt.object.create.call(null,new cljs.core.Keyword("lt.objs.statusbar","statusbar","lt.objs.statusbar/statusbar",-1530344258));
lt.objs.statusbar.add_container.call(null,lt.objs.statusbar.statusbar);
/**
 * 
 */
lt.objs.statusbar.__BEH__show_statusbar = (function lt$objs$statusbar$__BEH__show_statusbar(this$){
return lt.object.raise.call(null,lt.objs.statusbar.statusbar,new cljs.core.Keyword(null,"show!","show!",1939158011));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.statusbar","show-statusbar","lt.objs.statusbar/show-statusbar",64983689),new cljs.core.Keyword(null,"desc","desc",2093485764),"App: Show statusbar at the bottom of the editor",new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"init","init",-1875481434),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.statusbar.__BEH__show_statusbar);
lt.objs.statusbar.add_statusbar_item = (function lt$objs$statusbar$add_statusbar_item(item){
return lt.object.update_BANG_.call(null,lt.objs.statusbar.statusbar,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"items","items",1031954938)], null),cljs.core.conj,item);
});
lt.objs.statusbar.__GT_cursor_str = (function lt$objs$statusbar$__GT_cursor_str(p__15170){
var map__15173 = p__15170;
var map__15173__$1 = ((((!((map__15173 == null)))?((((map__15173.cljs$lang$protocol_mask$partition0$ & (64))) || (map__15173.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15173):map__15173);
var pos = cljs.core.get.call(null,map__15173__$1,new cljs.core.Keyword(null,"pos","pos",-864607220));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.pos","span.pos",-211797588),[cljs.core.str(""),cljs.core.str((new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(pos) + (1))),cljs.core.str(" / "),cljs.core.str((new cljs.core.Keyword(null,"ch","ch",-554717905).cljs$core$IFn$_invoke$arity$1(pos) + (1)))].join('')], null);
});
/**
 * 
 */
lt.objs.statusbar.__BEH__update_cursor_location = (function lt$objs$statusbar$__BEH__update_cursor_location(this$,pos){
return lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"pos","pos",-864607220),pos], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.statusbar","update-cursor-location","lt.objs.statusbar/update-cursor-location",-432219703),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"update!","update!",-1453508586),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.statusbar.__BEH__update_cursor_location);
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.statusbar","statusbar.cursor","lt.objs.statusbar/statusbar.cursor",1923827157),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),cljs.core.PersistentHashSet.EMPTY,new cljs.core.Keyword(null,"behaviors","behaviors",120724909),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("lt.objs.statusbar","update-cursor-location","lt.objs.statusbar/update-cursor-location",-432219703),null], null), null),new cljs.core.Keyword(null,"pos","pos",-864607220),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",212345235),(0),new cljs.core.Keyword(null,"ch","ch",-554717905),(0)], null),new cljs.core.Keyword(null,"init","init",-1875481434),(function (this$){
return lt.objs.statusbar.statusbar_item.call(null,crate.binding.bound.call(null,this$,lt.objs.statusbar.__GT_cursor_str),"");
}));
lt.objs.statusbar.statusbar_cursor = lt.object.create.call(null,new cljs.core.Keyword("lt.objs.statusbar","statusbar.cursor","lt.objs.statusbar/statusbar.cursor",1923827157));
lt.objs.statusbar.add_statusbar_item.call(null,lt.objs.statusbar.statusbar_cursor);
/**
 * 
 */
lt.objs.statusbar.__BEH__report_cursor_location = (function lt$objs$statusbar$__BEH__report_cursor_location(this$){
return lt.object.raise.call(null,lt.objs.statusbar.statusbar_cursor,new cljs.core.Keyword(null,"update!","update!",-1453508586),lt.objs.editor.__GT_cursor.call(null,this$));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.statusbar","report-cursor-location","lt.objs.statusbar/report-cursor-location",-799384459),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"move","move",-2110884309),null,new cljs.core.Keyword(null,"active","active",1895962068),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.statusbar.__BEH__report_cursor_location);
lt.objs.statusbar.loader_disp = (function lt$objs$statusbar$loader_disp(this$){
if((new cljs.core.Keyword(null,"loaders","loaders",1141127131).cljs$core$IFn$_invoke$arity$1(this$) > (0))){
return "";
} else {
return "none";
}
});
lt.objs.statusbar.arrow_disp = (function lt$objs$statusbar$arrow_disp(this$){
if((new cljs.core.Keyword(null,"loaders","loaders",1141127131).cljs$core$IFn$_invoke$arity$1(this$) > (0))){
return "none";
} else {
return "";
}
});
/**
 * 
 */
lt.objs.statusbar.loader = (function lt$objs$statusbar$loader(this$){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.load-wrapper","span.load-wrapper",-822389692),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"display","display",242065432),crate.binding.bound.call(null,this$,lt.objs.statusbar.loader_disp)], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.img","span.img",-675856048)], null)], null));
var seq__15185_15195 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"toggle","toggle",1291842030));
});})(e__7942__auto__))
], null)));
var chunk__15186_15196 = null;
var count__15187_15197 = (0);
var i__15188_15198 = (0);
while(true){
if((i__15188_15198 < count__15187_15197)){
var vec__15189_15199 = cljs.core._nth.call(null,chunk__15186_15196,i__15188_15198);
var ev__7943__auto___15200 = cljs.core.nth.call(null,vec__15189_15199,(0),null);
var func__7944__auto___15201 = cljs.core.nth.call(null,vec__15189_15199,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___15200,func__7944__auto___15201);

var G__15202 = seq__15185_15195;
var G__15203 = chunk__15186_15196;
var G__15204 = count__15187_15197;
var G__15205 = (i__15188_15198 + (1));
seq__15185_15195 = G__15202;
chunk__15186_15196 = G__15203;
count__15187_15197 = G__15204;
i__15188_15198 = G__15205;
continue;
} else {
var temp__4657__auto___15206 = cljs.core.seq.call(null,seq__15185_15195);
if(temp__4657__auto___15206){
var seq__15185_15207__$1 = temp__4657__auto___15206;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15185_15207__$1)){
var c__7604__auto___15208 = cljs.core.chunk_first.call(null,seq__15185_15207__$1);
var G__15209 = cljs.core.chunk_rest.call(null,seq__15185_15207__$1);
var G__15210 = c__7604__auto___15208;
var G__15211 = cljs.core.count.call(null,c__7604__auto___15208);
var G__15212 = (0);
seq__15185_15195 = G__15209;
chunk__15186_15196 = G__15210;
count__15187_15197 = G__15211;
i__15188_15198 = G__15212;
continue;
} else {
var vec__15192_15213 = cljs.core.first.call(null,seq__15185_15207__$1);
var ev__7943__auto___15214 = cljs.core.nth.call(null,vec__15192_15213,(0),null);
var func__7944__auto___15215 = cljs.core.nth.call(null,vec__15192_15213,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___15214,func__7944__auto___15215);

var G__15216 = cljs.core.next.call(null,seq__15185_15207__$1);
var G__15217 = null;
var G__15218 = (0);
var G__15219 = (0);
seq__15185_15195 = G__15216;
chunk__15186_15196 = G__15217;
count__15187_15197 = G__15218;
i__15188_15198 = G__15219;
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
lt.objs.statusbar.log_item = (function lt$objs$statusbar$log_item(i){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),crate.binding.bound.call(null,i,new cljs.core.Keyword(null,"text","text",-1790561697))], null));
var seq__15230_15240 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),cljs.core.PersistentVector.EMPTY));
var chunk__15231_15241 = null;
var count__15232_15242 = (0);
var i__15233_15243 = (0);
while(true){
if((i__15233_15243 < count__15232_15242)){
var vec__15234_15244 = cljs.core._nth.call(null,chunk__15231_15241,i__15233_15243);
var ev__7943__auto___15245 = cljs.core.nth.call(null,vec__15234_15244,(0),null);
var func__7944__auto___15246 = cljs.core.nth.call(null,vec__15234_15244,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___15245,func__7944__auto___15246);

var G__15247 = seq__15230_15240;
var G__15248 = chunk__15231_15241;
var G__15249 = count__15232_15242;
var G__15250 = (i__15233_15243 + (1));
seq__15230_15240 = G__15247;
chunk__15231_15241 = G__15248;
count__15232_15242 = G__15249;
i__15233_15243 = G__15250;
continue;
} else {
var temp__4657__auto___15251 = cljs.core.seq.call(null,seq__15230_15240);
if(temp__4657__auto___15251){
var seq__15230_15252__$1 = temp__4657__auto___15251;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15230_15252__$1)){
var c__7604__auto___15253 = cljs.core.chunk_first.call(null,seq__15230_15252__$1);
var G__15254 = cljs.core.chunk_rest.call(null,seq__15230_15252__$1);
var G__15255 = c__7604__auto___15253;
var G__15256 = cljs.core.count.call(null,c__7604__auto___15253);
var G__15257 = (0);
seq__15230_15240 = G__15254;
chunk__15231_15241 = G__15255;
count__15232_15242 = G__15256;
i__15233_15243 = G__15257;
continue;
} else {
var vec__15237_15258 = cljs.core.first.call(null,seq__15230_15252__$1);
var ev__7943__auto___15259 = cljs.core.nth.call(null,vec__15237_15258,(0),null);
var func__7944__auto___15260 = cljs.core.nth.call(null,vec__15237_15258,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___15259,func__7944__auto___15260);

var G__15261 = cljs.core.next.call(null,seq__15230_15252__$1);
var G__15262 = null;
var G__15263 = (0);
var G__15264 = (0);
seq__15230_15240 = G__15261;
chunk__15231_15241 = G__15262;
count__15232_15242 = G__15263;
i__15233_15243 = G__15264;
continue;
}
} else {
}
}
break;
}

return e__7942__auto__;
});
lt.objs.statusbar.__GT_message_class = (function lt$objs$statusbar$__GT_message_class(m){
return [cljs.core.str("message "),cljs.core.str((function (){var or__6793__auto__ = m;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return "";
}
})())].join('');
});
/**
 * 
 */
lt.objs.statusbar.log = (function lt$objs$statusbar$log(this$){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.log","div.log",518813601),lt.objs.statusbar.loader.call(null,this$),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),crate.binding.bound.call(null,this$,(function (p1__15265_SHARP_){
return lt.objs.statusbar.__GT_message_class.call(null,new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(p1__15265_SHARP_));
}))], null),crate.binding.bound.call(null,this$,new cljs.core.Keyword(null,"message","message",-406056002))], null)], null));
var seq__15276_15286 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),cljs.core.PersistentVector.EMPTY));
var chunk__15277_15287 = null;
var count__15278_15288 = (0);
var i__15279_15289 = (0);
while(true){
if((i__15279_15289 < count__15278_15288)){
var vec__15280_15290 = cljs.core._nth.call(null,chunk__15277_15287,i__15279_15289);
var ev__7943__auto___15291 = cljs.core.nth.call(null,vec__15280_15290,(0),null);
var func__7944__auto___15292 = cljs.core.nth.call(null,vec__15280_15290,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___15291,func__7944__auto___15292);

var G__15293 = seq__15276_15286;
var G__15294 = chunk__15277_15287;
var G__15295 = count__15278_15288;
var G__15296 = (i__15279_15289 + (1));
seq__15276_15286 = G__15293;
chunk__15277_15287 = G__15294;
count__15278_15288 = G__15295;
i__15279_15289 = G__15296;
continue;
} else {
var temp__4657__auto___15297 = cljs.core.seq.call(null,seq__15276_15286);
if(temp__4657__auto___15297){
var seq__15276_15298__$1 = temp__4657__auto___15297;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15276_15298__$1)){
var c__7604__auto___15299 = cljs.core.chunk_first.call(null,seq__15276_15298__$1);
var G__15300 = cljs.core.chunk_rest.call(null,seq__15276_15298__$1);
var G__15301 = c__7604__auto___15299;
var G__15302 = cljs.core.count.call(null,c__7604__auto___15299);
var G__15303 = (0);
seq__15276_15286 = G__15300;
chunk__15277_15287 = G__15301;
count__15278_15288 = G__15302;
i__15279_15289 = G__15303;
continue;
} else {
var vec__15283_15304 = cljs.core.first.call(null,seq__15276_15298__$1);
var ev__7943__auto___15305 = cljs.core.nth.call(null,vec__15283_15304,(0),null);
var func__7944__auto___15306 = cljs.core.nth.call(null,vec__15283_15304,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___15305,func__7944__auto___15306);

var G__15307 = cljs.core.next.call(null,seq__15276_15298__$1);
var G__15308 = null;
var G__15309 = (0);
var G__15310 = (0);
seq__15276_15286 = G__15307;
chunk__15277_15287 = G__15308;
count__15278_15288 = G__15309;
i__15279_15289 = G__15310;
continue;
}
} else {
}
}
break;
}

return e__7942__auto__;
});
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.statusbar","statusbar.loader","lt.objs.statusbar/statusbar.loader",1273250339),new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"statusbar.console","statusbar.console",-268311840),null], null), null),new cljs.core.Keyword(null,"loaders","loaders",1141127131),(0),new cljs.core.Keyword(null,"message","message",-406056002),"",new cljs.core.Keyword(null,"init","init",-1875481434),(function (this$){
return lt.objs.statusbar.statusbar_item.call(null,lt.objs.statusbar.log.call(null,this$),"left");
}));
lt.objs.statusbar.statusbar_loader = lt.object.create.call(null,new cljs.core.Keyword("lt.objs.statusbar","statusbar.loader","lt.objs.statusbar/statusbar.loader",1273250339));
lt.objs.statusbar.add_statusbar_item.call(null,lt.objs.statusbar.statusbar_loader);
lt.objs.statusbar.loader_set = (function lt$objs$statusbar$loader_set(){
return lt.object.merge_BANG_.call(null,lt.objs.statusbar.statusbar_loader,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"loaders","loaders",1141127131),(0)], null));
});
lt.objs.statusbar.loader_inc = (function lt$objs$statusbar$loader_inc(){
return lt.object.update_BANG_.call(null,lt.objs.statusbar.statusbar_loader,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"loaders","loaders",1141127131)], null),cljs.core.inc);
});
lt.objs.statusbar.loader_dec = (function lt$objs$statusbar$loader_dec(){
if((new cljs.core.Keyword(null,"loaders","loaders",1141127131).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.statusbar.statusbar_loader)) > (0))){
return lt.object.update_BANG_.call(null,lt.objs.statusbar.statusbar_loader,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"loaders","loaders",1141127131)], null),cljs.core.dec);
} else {
return null;
}
});
lt.objs.statusbar.toggle_class = (function lt$objs$statusbar$toggle_class(p__15311){
var map__15314 = p__15311;
var map__15314__$1 = ((((!((map__15314 == null)))?((((map__15314.cljs$lang$protocol_mask$partition0$ & (64))) || (map__15314.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15314):map__15314);
var dirty = cljs.core.get.call(null,map__15314__$1,new cljs.core.Keyword(null,"dirty","dirty",729553281));
var class$ = cljs.core.get.call(null,map__15314__$1,new cljs.core.Keyword(null,"class","class",-2030961996));
return [cljs.core.str("console-toggle "),cljs.core.str((cljs.core.truth_(class$)?[cljs.core.str(class$),cljs.core.str(" ")].join(''):null)),cljs.core.str((((dirty > (0)))?"dirty":null))].join('');
});
/**
 * 
 */
lt.objs.statusbar.toggle_span = (function lt$objs$statusbar$toggle_span(this$){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),crate.binding.bound.call(null,this$,lt.objs.statusbar.toggle_class)], null),crate.binding.bound.call(null,this$,new cljs.core.Keyword(null,"dirty","dirty",729553281))], null));
var seq__15326_15336 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (){
return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"toggle-console","toggle-console",2094748794));
});})(e__7942__auto__))
], null)));
var chunk__15327_15337 = null;
var count__15328_15338 = (0);
var i__15329_15339 = (0);
while(true){
if((i__15329_15339 < count__15328_15338)){
var vec__15330_15340 = cljs.core._nth.call(null,chunk__15327_15337,i__15329_15339);
var ev__7943__auto___15341 = cljs.core.nth.call(null,vec__15330_15340,(0),null);
var func__7944__auto___15342 = cljs.core.nth.call(null,vec__15330_15340,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___15341,func__7944__auto___15342);

var G__15343 = seq__15326_15336;
var G__15344 = chunk__15327_15337;
var G__15345 = count__15328_15338;
var G__15346 = (i__15329_15339 + (1));
seq__15326_15336 = G__15343;
chunk__15327_15337 = G__15344;
count__15328_15338 = G__15345;
i__15329_15339 = G__15346;
continue;
} else {
var temp__4657__auto___15347 = cljs.core.seq.call(null,seq__15326_15336);
if(temp__4657__auto___15347){
var seq__15326_15348__$1 = temp__4657__auto___15347;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15326_15348__$1)){
var c__7604__auto___15349 = cljs.core.chunk_first.call(null,seq__15326_15348__$1);
var G__15350 = cljs.core.chunk_rest.call(null,seq__15326_15348__$1);
var G__15351 = c__7604__auto___15349;
var G__15352 = cljs.core.count.call(null,c__7604__auto___15349);
var G__15353 = (0);
seq__15326_15336 = G__15350;
chunk__15327_15337 = G__15351;
count__15328_15338 = G__15352;
i__15329_15339 = G__15353;
continue;
} else {
var vec__15333_15354 = cljs.core.first.call(null,seq__15326_15348__$1);
var ev__7943__auto___15355 = cljs.core.nth.call(null,vec__15333_15354,(0),null);
var func__7944__auto___15356 = cljs.core.nth.call(null,vec__15333_15354,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___15355,func__7944__auto___15356);

var G__15357 = cljs.core.next.call(null,seq__15326_15348__$1);
var G__15358 = null;
var G__15359 = (0);
var G__15360 = (0);
seq__15326_15336 = G__15357;
chunk__15327_15337 = G__15358;
count__15328_15338 = G__15359;
i__15329_15339 = G__15360;
continue;
}
} else {
}
}
break;
}

return e__7942__auto__;
});
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.statusbar","statusbar.console-toggle","lt.objs.statusbar/statusbar.console-toggle",-439495097),new cljs.core.Keyword(null,"dirty","dirty",729553281),(0),new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"statusbar.console-toggle","statusbar.console-toggle",1232417086)], null),new cljs.core.Keyword(null,"init","init",-1875481434),(function (this$){
return lt.objs.statusbar.statusbar_item.call(null,lt.objs.statusbar.toggle_span.call(null,this$),"");
}));
lt.objs.statusbar.console_toggle = lt.object.create.call(null,new cljs.core.Keyword("lt.objs.statusbar","statusbar.console-toggle","lt.objs.statusbar/statusbar.console-toggle",-439495097));
lt.objs.statusbar.add_statusbar_item.call(null,lt.objs.statusbar.console_toggle);
lt.objs.statusbar.dirty = (function lt$objs$statusbar$dirty(){
return lt.object.update_BANG_.call(null,lt.objs.statusbar.console_toggle,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dirty","dirty",729553281)], null),cljs.core.inc);
});
lt.objs.statusbar.clean = (function lt$objs$statusbar$clean(){
return lt.object.merge_BANG_.call(null,lt.objs.statusbar.console_toggle,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"dirty","dirty",729553281),(0),new cljs.core.Keyword(null,"class","class",-2030961996),null], null));
});
lt.objs.statusbar.console_class = (function lt$objs$statusbar$console_class(class$){
return lt.object.merge_BANG_.call(null,lt.objs.statusbar.console_toggle,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),class$], null));
});
