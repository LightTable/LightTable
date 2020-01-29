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
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.statusbar","statusbar-container","lt.objs.statusbar/statusbar-container",-1032563573),new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"statusbar","statusbar",-680036405),null], null), null),new cljs.core.Keyword(null,"items","items",1031954938),cljs.core.sorted_set_by.call(null,(function (p1__15121_SHARP_){
return new cljs.core.Keyword(null,"order","order",-1254677256).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,p1__15121_SHARP_));
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
var seq__15132_15142 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),cljs.core.PersistentVector.EMPTY));
var chunk__15133_15143 = null;
var count__15134_15144 = (0);
var i__15135_15145 = (0);
while(true){
if((i__15135_15145 < count__15134_15144)){
var vec__15136_15146 = cljs.core._nth.call(null,chunk__15133_15143,i__15135_15145);
var ev__7943__auto___15147 = cljs.core.nth.call(null,vec__15136_15146,(0),null);
var func__7944__auto___15148 = cljs.core.nth.call(null,vec__15136_15146,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___15147,func__7944__auto___15148);

var G__15149 = seq__15132_15142;
var G__15150 = chunk__15133_15143;
var G__15151 = count__15134_15144;
var G__15152 = (i__15135_15145 + (1));
seq__15132_15142 = G__15149;
chunk__15133_15143 = G__15150;
count__15134_15144 = G__15151;
i__15135_15145 = G__15152;
continue;
} else {
var temp__4657__auto___15153 = cljs.core.seq.call(null,seq__15132_15142);
if(temp__4657__auto___15153){
var seq__15132_15154__$1 = temp__4657__auto___15153;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15132_15154__$1)){
var c__7604__auto___15155 = cljs.core.chunk_first.call(null,seq__15132_15154__$1);
var G__15156 = cljs.core.chunk_rest.call(null,seq__15132_15154__$1);
var G__15157 = c__7604__auto___15155;
var G__15158 = cljs.core.count.call(null,c__7604__auto___15155);
var G__15159 = (0);
seq__15132_15142 = G__15156;
chunk__15133_15143 = G__15157;
count__15134_15144 = G__15158;
i__15135_15145 = G__15159;
continue;
} else {
var vec__15139_15160 = cljs.core.first.call(null,seq__15132_15154__$1);
var ev__7943__auto___15161 = cljs.core.nth.call(null,vec__15139_15160,(0),null);
var func__7944__auto___15162 = cljs.core.nth.call(null,vec__15139_15160,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___15161,func__7944__auto___15162);

var G__15163 = cljs.core.next.call(null,seq__15132_15154__$1);
var G__15164 = null;
var G__15165 = (0);
var G__15166 = (0);
seq__15132_15142 = G__15163;
chunk__15133_15143 = G__15164;
count__15134_15144 = G__15165;
i__15135_15145 = G__15166;
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
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul#statusbar","ul#statusbar",419168499),crate.binding.map_bound.call(null,(function (p1__15167_SHARP_){
return lt.object.__GT_content.call(null,cljs.core.deref.call(null,p1__15167_SHARP_));
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
lt.objs.statusbar.__GT_cursor_str = (function lt$objs$statusbar$__GT_cursor_str(p__15168){
var map__15171 = p__15168;
var map__15171__$1 = ((((!((map__15171 == null)))?((((map__15171.cljs$lang$protocol_mask$partition0$ & (64))) || (map__15171.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15171):map__15171);
var pos = cljs.core.get.call(null,map__15171__$1,new cljs.core.Keyword(null,"pos","pos",-864607220));
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
var seq__15183_15193 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"toggle","toggle",1291842030));
});})(e__7942__auto__))
], null)));
var chunk__15184_15194 = null;
var count__15185_15195 = (0);
var i__15186_15196 = (0);
while(true){
if((i__15186_15196 < count__15185_15195)){
var vec__15187_15197 = cljs.core._nth.call(null,chunk__15184_15194,i__15186_15196);
var ev__7943__auto___15198 = cljs.core.nth.call(null,vec__15187_15197,(0),null);
var func__7944__auto___15199 = cljs.core.nth.call(null,vec__15187_15197,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___15198,func__7944__auto___15199);

var G__15200 = seq__15183_15193;
var G__15201 = chunk__15184_15194;
var G__15202 = count__15185_15195;
var G__15203 = (i__15186_15196 + (1));
seq__15183_15193 = G__15200;
chunk__15184_15194 = G__15201;
count__15185_15195 = G__15202;
i__15186_15196 = G__15203;
continue;
} else {
var temp__4657__auto___15204 = cljs.core.seq.call(null,seq__15183_15193);
if(temp__4657__auto___15204){
var seq__15183_15205__$1 = temp__4657__auto___15204;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15183_15205__$1)){
var c__7604__auto___15206 = cljs.core.chunk_first.call(null,seq__15183_15205__$1);
var G__15207 = cljs.core.chunk_rest.call(null,seq__15183_15205__$1);
var G__15208 = c__7604__auto___15206;
var G__15209 = cljs.core.count.call(null,c__7604__auto___15206);
var G__15210 = (0);
seq__15183_15193 = G__15207;
chunk__15184_15194 = G__15208;
count__15185_15195 = G__15209;
i__15186_15196 = G__15210;
continue;
} else {
var vec__15190_15211 = cljs.core.first.call(null,seq__15183_15205__$1);
var ev__7943__auto___15212 = cljs.core.nth.call(null,vec__15190_15211,(0),null);
var func__7944__auto___15213 = cljs.core.nth.call(null,vec__15190_15211,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___15212,func__7944__auto___15213);

var G__15214 = cljs.core.next.call(null,seq__15183_15205__$1);
var G__15215 = null;
var G__15216 = (0);
var G__15217 = (0);
seq__15183_15193 = G__15214;
chunk__15184_15194 = G__15215;
count__15185_15195 = G__15216;
i__15186_15196 = G__15217;
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
var seq__15228_15238 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),cljs.core.PersistentVector.EMPTY));
var chunk__15229_15239 = null;
var count__15230_15240 = (0);
var i__15231_15241 = (0);
while(true){
if((i__15231_15241 < count__15230_15240)){
var vec__15232_15242 = cljs.core._nth.call(null,chunk__15229_15239,i__15231_15241);
var ev__7943__auto___15243 = cljs.core.nth.call(null,vec__15232_15242,(0),null);
var func__7944__auto___15244 = cljs.core.nth.call(null,vec__15232_15242,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___15243,func__7944__auto___15244);

var G__15245 = seq__15228_15238;
var G__15246 = chunk__15229_15239;
var G__15247 = count__15230_15240;
var G__15248 = (i__15231_15241 + (1));
seq__15228_15238 = G__15245;
chunk__15229_15239 = G__15246;
count__15230_15240 = G__15247;
i__15231_15241 = G__15248;
continue;
} else {
var temp__4657__auto___15249 = cljs.core.seq.call(null,seq__15228_15238);
if(temp__4657__auto___15249){
var seq__15228_15250__$1 = temp__4657__auto___15249;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15228_15250__$1)){
var c__7604__auto___15251 = cljs.core.chunk_first.call(null,seq__15228_15250__$1);
var G__15252 = cljs.core.chunk_rest.call(null,seq__15228_15250__$1);
var G__15253 = c__7604__auto___15251;
var G__15254 = cljs.core.count.call(null,c__7604__auto___15251);
var G__15255 = (0);
seq__15228_15238 = G__15252;
chunk__15229_15239 = G__15253;
count__15230_15240 = G__15254;
i__15231_15241 = G__15255;
continue;
} else {
var vec__15235_15256 = cljs.core.first.call(null,seq__15228_15250__$1);
var ev__7943__auto___15257 = cljs.core.nth.call(null,vec__15235_15256,(0),null);
var func__7944__auto___15258 = cljs.core.nth.call(null,vec__15235_15256,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___15257,func__7944__auto___15258);

var G__15259 = cljs.core.next.call(null,seq__15228_15250__$1);
var G__15260 = null;
var G__15261 = (0);
var G__15262 = (0);
seq__15228_15238 = G__15259;
chunk__15229_15239 = G__15260;
count__15230_15240 = G__15261;
i__15231_15241 = G__15262;
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
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.log","div.log",518813601),lt.objs.statusbar.loader.call(null,this$),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),crate.binding.bound.call(null,this$,(function (p1__15263_SHARP_){
return lt.objs.statusbar.__GT_message_class.call(null,new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(p1__15263_SHARP_));
}))], null),crate.binding.bound.call(null,this$,new cljs.core.Keyword(null,"message","message",-406056002))], null)], null));
var seq__15274_15284 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),cljs.core.PersistentVector.EMPTY));
var chunk__15275_15285 = null;
var count__15276_15286 = (0);
var i__15277_15287 = (0);
while(true){
if((i__15277_15287 < count__15276_15286)){
var vec__15278_15288 = cljs.core._nth.call(null,chunk__15275_15285,i__15277_15287);
var ev__7943__auto___15289 = cljs.core.nth.call(null,vec__15278_15288,(0),null);
var func__7944__auto___15290 = cljs.core.nth.call(null,vec__15278_15288,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___15289,func__7944__auto___15290);

var G__15291 = seq__15274_15284;
var G__15292 = chunk__15275_15285;
var G__15293 = count__15276_15286;
var G__15294 = (i__15277_15287 + (1));
seq__15274_15284 = G__15291;
chunk__15275_15285 = G__15292;
count__15276_15286 = G__15293;
i__15277_15287 = G__15294;
continue;
} else {
var temp__4657__auto___15295 = cljs.core.seq.call(null,seq__15274_15284);
if(temp__4657__auto___15295){
var seq__15274_15296__$1 = temp__4657__auto___15295;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15274_15296__$1)){
var c__7604__auto___15297 = cljs.core.chunk_first.call(null,seq__15274_15296__$1);
var G__15298 = cljs.core.chunk_rest.call(null,seq__15274_15296__$1);
var G__15299 = c__7604__auto___15297;
var G__15300 = cljs.core.count.call(null,c__7604__auto___15297);
var G__15301 = (0);
seq__15274_15284 = G__15298;
chunk__15275_15285 = G__15299;
count__15276_15286 = G__15300;
i__15277_15287 = G__15301;
continue;
} else {
var vec__15281_15302 = cljs.core.first.call(null,seq__15274_15296__$1);
var ev__7943__auto___15303 = cljs.core.nth.call(null,vec__15281_15302,(0),null);
var func__7944__auto___15304 = cljs.core.nth.call(null,vec__15281_15302,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___15303,func__7944__auto___15304);

var G__15305 = cljs.core.next.call(null,seq__15274_15296__$1);
var G__15306 = null;
var G__15307 = (0);
var G__15308 = (0);
seq__15274_15284 = G__15305;
chunk__15275_15285 = G__15306;
count__15276_15286 = G__15307;
i__15277_15287 = G__15308;
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
lt.objs.statusbar.toggle_class = (function lt$objs$statusbar$toggle_class(p__15309){
var map__15312 = p__15309;
var map__15312__$1 = ((((!((map__15312 == null)))?((((map__15312.cljs$lang$protocol_mask$partition0$ & (64))) || (map__15312.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15312):map__15312);
var dirty = cljs.core.get.call(null,map__15312__$1,new cljs.core.Keyword(null,"dirty","dirty",729553281));
var class$ = cljs.core.get.call(null,map__15312__$1,new cljs.core.Keyword(null,"class","class",-2030961996));
return [cljs.core.str("console-toggle "),cljs.core.str((cljs.core.truth_(class$)?[cljs.core.str(class$),cljs.core.str(" ")].join(''):null)),cljs.core.str((((dirty > (0)))?"dirty":null))].join('');
});
/**
 * 
 */
lt.objs.statusbar.toggle_span = (function lt$objs$statusbar$toggle_span(this$){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),crate.binding.bound.call(null,this$,lt.objs.statusbar.toggle_class)], null),crate.binding.bound.call(null,this$,new cljs.core.Keyword(null,"dirty","dirty",729553281))], null));
var seq__15324_15334 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (){
return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"toggle-console","toggle-console",2094748794));
});})(e__7942__auto__))
], null)));
var chunk__15325_15335 = null;
var count__15326_15336 = (0);
var i__15327_15337 = (0);
while(true){
if((i__15327_15337 < count__15326_15336)){
var vec__15328_15338 = cljs.core._nth.call(null,chunk__15325_15335,i__15327_15337);
var ev__7943__auto___15339 = cljs.core.nth.call(null,vec__15328_15338,(0),null);
var func__7944__auto___15340 = cljs.core.nth.call(null,vec__15328_15338,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___15339,func__7944__auto___15340);

var G__15341 = seq__15324_15334;
var G__15342 = chunk__15325_15335;
var G__15343 = count__15326_15336;
var G__15344 = (i__15327_15337 + (1));
seq__15324_15334 = G__15341;
chunk__15325_15335 = G__15342;
count__15326_15336 = G__15343;
i__15327_15337 = G__15344;
continue;
} else {
var temp__4657__auto___15345 = cljs.core.seq.call(null,seq__15324_15334);
if(temp__4657__auto___15345){
var seq__15324_15346__$1 = temp__4657__auto___15345;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15324_15346__$1)){
var c__7604__auto___15347 = cljs.core.chunk_first.call(null,seq__15324_15346__$1);
var G__15348 = cljs.core.chunk_rest.call(null,seq__15324_15346__$1);
var G__15349 = c__7604__auto___15347;
var G__15350 = cljs.core.count.call(null,c__7604__auto___15347);
var G__15351 = (0);
seq__15324_15334 = G__15348;
chunk__15325_15335 = G__15349;
count__15326_15336 = G__15350;
i__15327_15337 = G__15351;
continue;
} else {
var vec__15331_15352 = cljs.core.first.call(null,seq__15324_15346__$1);
var ev__7943__auto___15353 = cljs.core.nth.call(null,vec__15331_15352,(0),null);
var func__7944__auto___15354 = cljs.core.nth.call(null,vec__15331_15352,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___15353,func__7944__auto___15354);

var G__15355 = cljs.core.next.call(null,seq__15324_15346__$1);
var G__15356 = null;
var G__15357 = (0);
var G__15358 = (0);
seq__15324_15334 = G__15355;
chunk__15325_15335 = G__15356;
count__15326_15336 = G__15357;
i__15327_15337 = G__15358;
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
