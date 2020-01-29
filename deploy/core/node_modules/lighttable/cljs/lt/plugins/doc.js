// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.plugins.doc');
goog.require('cljs.core');
goog.require('lt.objs.command');
goog.require('lt.objs.notifos');
goog.require('clojure.set');
goog.require('lt.objs.context');
goog.require('lt.objs.editor');
goog.require('lt.object');
goog.require('lt.util.dom');
goog.require('lt.util.cljs');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.sidebar');
goog.require('lt.objs.clients');
lt.plugins.doc.doc_on_line_QMARK_ = (function lt$plugins$doc$doc_on_line_QMARK_(editor,line){
var line__$1 = lt.objs.editor.line_handle.call(null,editor,line);
return cljs.core.get_in.call(null,cljs.core.deref.call(null,editor),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"widgets","widgets",-159098978),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [line__$1,new cljs.core.Keyword(null,"underline","underline",2018066703)], null)], null));
});
lt.plugins.doc.remove_BANG_ = (function lt$plugins$doc$remove_BANG_(editor,cur){
lt.object.update_BANG_.call(null,editor,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"widgets","widgets",-159098978)], null),cljs.core.dissoc,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cur)),new cljs.core.Keyword(null,"underline","underline",2018066703)], null));

return lt.object.raise.call(null,cur,new cljs.core.Keyword(null,"clear!","clear!",-144814418));
});
/**
 * 
 */
lt.plugins.doc.__BEH__clear = (function lt$plugins$doc$__BEH__clear(this$){
return lt.object.update_BANG_.call(null,new cljs.core.Keyword(null,"ed","ed",436294224).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"widgets","widgets",-159098978)], null),cljs.core.dissoc,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),new cljs.core.Keyword(null,"underline","underline",2018066703)], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.doc","clear","lt.plugins.doc/clear",2066619075),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"clear","clear",1877104959),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.plugins.doc.__BEH__clear);
lt.plugins.doc.inline_doc = (function lt$plugins$doc$inline_doc(this$,res,opts,loc){
var ed = new cljs.core.Keyword(null,"ed","ed",436294224).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$));
var type = new cljs.core.Keyword(null,"underline","underline",2018066703);
var line = lt.objs.editor.line_handle.call(null,ed,new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(loc));
var res_obj = lt.object.create.call(null,new cljs.core.Keyword("lt.objs.eval","underline-result","lt.objs.eval/underline-result",285332309),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"ed","ed",436294224),this$,new cljs.core.Keyword(null,"class","class",-2030961996),cljs.core.name.call(null,type),new cljs.core.Keyword(null,"opts","opts",155075701),opts,new cljs.core.Keyword(null,"result","result",1415092211),res,new cljs.core.Keyword(null,"loc","loc",-584284901),loc,new cljs.core.Keyword(null,"line","line",212345235),line], null));
lt.object.add_tags.call(null,res_obj,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"inline.doc","inline.doc",629094558)], null));

lt.object.update_BANG_.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"widgets","widgets",-159098978)], null),cljs.core.assoc,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [line,new cljs.core.Keyword(null,"underline","underline",2018066703)], null),res_obj);

return res_obj;
});
/**
 * 
 */
lt.plugins.doc.__BEH__doc_menu_PLUS_ = (function lt$plugins$doc$__BEH__doc_menu_PLUS_(this$,items){
return cljs.core.conj.call(null,items,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"label","label",1718410804),"Toggle docs",new cljs.core.Keyword(null,"order","order",-1254677256),0.1,new cljs.core.Keyword(null,"enabled","enabled",1195909756),cljs.core.not.call(null,lt.objs.editor.selection_QMARK_.call(null,this$)),new cljs.core.Keyword(null,"click","click",1912301393),(function (){
return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"editor.doc.toggle","editor.doc.toggle",1846705788));
})], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),"separator",new cljs.core.Keyword(null,"order","order",-1254677256),0.2], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.doc","doc-menu+","lt.plugins.doc/doc-menu+",339295038),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"menu+","menu+",276559402),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.plugins.doc.__BEH__doc_menu_PLUS_);
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.doc.toggle","editor.doc.toggle",1846705788),new cljs.core.Keyword(null,"desc","desc",2093485764),"Docs: Toggle documentation at cursor",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
var loc = lt.objs.editor.__GT_cursor.call(null,ed);
var temp__4655__auto__ = lt.plugins.doc.doc_on_line_QMARK_.call(null,ed,new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(loc));
if(cljs.core.truth_(temp__4655__auto__)){
var cur = temp__4655__auto__;
return lt.plugins.doc.remove_BANG_.call(null,ed,cur);
} else {
return lt.object.raise.call(null,ed,new cljs.core.Keyword(null,"editor.doc","editor.doc",1362020278));
}
} else {
return null;
}
})], null));
/**
 * 
 */
lt.plugins.doc.doc_ui = (function lt$plugins$doc$doc_ui(doc){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.inline-doc","div.inline-doc",-266998265),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h1","h1",-1896887462),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(doc)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(doc)], null),(cljs.core.truth_((function (){var and__6781__auto__ = new cljs.core.Keyword(null,"args","args",1315556576).cljs$core$IFn$_invoke$arity$1(doc);
if(cljs.core.truth_(and__6781__auto__)){
return cljs.core.not_EQ_.call(null,new cljs.core.Keyword(null,"args","args",1315556576).cljs$core$IFn$_invoke$arity$1(doc),"nil");
} else {
return and__6781__auto__;
}
})())?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),new cljs.core.Keyword(null,"args","args",1315556576).cljs$core$IFn$_invoke$arity$1(doc)], null):null),(cljs.core.truth_((function (){var and__6781__auto__ = new cljs.core.Keyword(null,"labels","labels",-626734591).cljs$core$IFn$_invoke$arity$1(doc);
if(cljs.core.truth_(and__6781__auto__)){
return cljs.core.not_EQ_.call(null,new cljs.core.Keyword(null,"labels","labels",-626734591).cljs$core$IFn$_invoke$arity$1(doc),"");
} else {
return and__6781__auto__;
}
})())?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),[cljs.core.str("["),cljs.core.str(new cljs.core.Keyword(null,"labels","labels",-626734591).cljs$core$IFn$_invoke$arity$1(doc)),cljs.core.str("]")].join('')], null):null),(cljs.core.truth_((function (){var and__6781__auto__ = new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(doc);
if(cljs.core.truth_(and__6781__auto__)){
return cljs.core.not_EQ_.call(null,new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(doc),"nil");
} else {
return and__6781__auto__;
}
})())?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pre","pre",2118456869),new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(doc)], null):null)], null));
var seq__21554_21564 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),cljs.core.PersistentVector.EMPTY));
var chunk__21555_21565 = null;
var count__21556_21566 = (0);
var i__21557_21567 = (0);
while(true){
if((i__21557_21567 < count__21556_21566)){
var vec__21558_21568 = cljs.core._nth.call(null,chunk__21555_21565,i__21557_21567);
var ev__7943__auto___21569 = cljs.core.nth.call(null,vec__21558_21568,(0),null);
var func__7944__auto___21570 = cljs.core.nth.call(null,vec__21558_21568,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21569,func__7944__auto___21570);

var G__21571 = seq__21554_21564;
var G__21572 = chunk__21555_21565;
var G__21573 = count__21556_21566;
var G__21574 = (i__21557_21567 + (1));
seq__21554_21564 = G__21571;
chunk__21555_21565 = G__21572;
count__21556_21566 = G__21573;
i__21557_21567 = G__21574;
continue;
} else {
var temp__4657__auto___21575 = cljs.core.seq.call(null,seq__21554_21564);
if(temp__4657__auto___21575){
var seq__21554_21576__$1 = temp__4657__auto___21575;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__21554_21576__$1)){
var c__7604__auto___21577 = cljs.core.chunk_first.call(null,seq__21554_21576__$1);
var G__21578 = cljs.core.chunk_rest.call(null,seq__21554_21576__$1);
var G__21579 = c__7604__auto___21577;
var G__21580 = cljs.core.count.call(null,c__7604__auto___21577);
var G__21581 = (0);
seq__21554_21564 = G__21578;
chunk__21555_21565 = G__21579;
count__21556_21566 = G__21580;
i__21557_21567 = G__21581;
continue;
} else {
var vec__21561_21582 = cljs.core.first.call(null,seq__21554_21576__$1);
var ev__7943__auto___21583 = cljs.core.nth.call(null,vec__21561_21582,(0),null);
var func__7944__auto___21584 = cljs.core.nth.call(null,vec__21561_21582,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21583,func__7944__auto___21584);

var G__21585 = cljs.core.next.call(null,seq__21554_21576__$1);
var G__21586 = null;
var G__21587 = (0);
var G__21588 = (0);
seq__21554_21564 = G__21585;
chunk__21555_21565 = G__21586;
count__21556_21566 = G__21587;
i__21557_21567 = G__21588;
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
 * Helper method for behavior `editor.doc.show!` to determine if the given `ns` and `name`
 *   match existing behaviors.
 * 
 *   Returns found behavior or `nil`.
 */
lt.plugins.doc.retrieve_behavior = (function lt$plugins$doc$retrieve_behavior(ns,name){
return cljs.core.deref.call(null,lt.object.behaviors).call(null,cljs.core.keyword.call(null,[cljs.core.str(ns),cljs.core.str("/"),cljs.core.str(cljs.core.subs.call(null,name,(2)))].join('')));
});
/**
 * Helper method for behavior `editor.doc.show!` to determine if the given `ns` and `name`
 *   match existing object defs. Not recommended to print whole object def... use destructuring.
 * 
 *   Returns found object def or `nil`.
 */
lt.plugins.doc.retrieve_object_def = (function lt$plugins$doc$retrieve_object_def(ns,name){
return cljs.core.deref.call(null,lt.object.object_defs).call(null,cljs.core.keyword.call(null,[cljs.core.str(ns),cljs.core.str("/"),cljs.core.str(cljs.core.subs.call(null,name,(2)))].join('')));
});
lt.plugins.doc.retrieve = (function lt$plugins$doc$retrieve(ns,name){
var or__6793__auto__ = lt.plugins.doc.retrieve_behavior.call(null,ns,name);
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return lt.plugins.doc.retrieve_object_def.call(null,ns,name);
}
});
/**
 * Helper method for behavior `editor.doc.show!` that returns the docstring for a matching
 *   object or behavior. If `:doc` is not found, then `:desc` is used. Otherwise `nil`.
 */
lt.plugins.doc.retrieve_docstring = (function lt$plugins$doc$retrieve_docstring(ns,name){
var o = lt.plugins.doc.retrieve.call(null,ns,name);
var or__6793__auto__ = new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(o);
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return new cljs.core.Keyword(null,"desc","desc",2093485764).cljs$core$IFn$_invoke$arity$1(o);
}
});
lt.plugins.doc.retrieve_labels = (function lt$plugins$doc$retrieve_labels(ns,name){
var o = lt.plugins.doc.retrieve.call(null,ns,name);
return clojure.string.join.call(null,", ",cljs.core.map.call(null,((function (o){
return (function (p1__21589_SHARP_){
return cljs.core.get.call(null,p1__21589_SHARP_,new cljs.core.Keyword(null,"label","label",1718410804));
});})(o))
,new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$2(o,cljs.core.PersistentVector.EMPTY)));
});
/**
 * 
 */
lt.plugins.doc.__BEH__editor__DOT__doc__DOT__show_BANG_ = (function lt$plugins$doc$__BEH__editor__DOT__doc__DOT__show_BANG_(editor,doc){
if(cljs.core.not_EQ_.call(null,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(doc),"")){
var doc__$1 = ((((new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(doc) == null)) && ((new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(doc) == null)))?cljs.core.merge.call(null,doc,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"doc","doc",1913296891),lt.plugins.doc.retrieve_docstring.call(null,new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(doc),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(doc)),new cljs.core.Keyword(null,"labels","labels",-626734591),lt.plugins.doc.retrieve_labels.call(null,new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(doc),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(doc))], null)):doc);
return lt.plugins.doc.inline_doc.call(null,editor,lt.plugins.doc.doc_ui.call(null,doc__$1),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"loc","loc",-584284901).cljs$core$IFn$_invoke$arity$1(doc__$1));
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.doc","editor.doc.show!","lt.plugins.doc/editor.doc.show!",-1451914470),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.doc.show!","editor.doc.show!",345610910),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.plugins.doc.__BEH__editor__DOT__doc__DOT__show_BANG_);
/**
 * 
 */
lt.plugins.doc.search_item = (function lt$plugins$doc$search_item(item){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(item)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(item)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pre","pre",2118456869),[cljs.core.str(new cljs.core.Keyword(null,"args","args",1315556576).cljs$core$IFn$_invoke$arity$1(item))].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pre","pre",2118456869),new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(item)], null)], null));
var seq__21600_21610 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),cljs.core.PersistentVector.EMPTY));
var chunk__21601_21611 = null;
var count__21602_21612 = (0);
var i__21603_21613 = (0);
while(true){
if((i__21603_21613 < count__21602_21612)){
var vec__21604_21614 = cljs.core._nth.call(null,chunk__21601_21611,i__21603_21613);
var ev__7943__auto___21615 = cljs.core.nth.call(null,vec__21604_21614,(0),null);
var func__7944__auto___21616 = cljs.core.nth.call(null,vec__21604_21614,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21615,func__7944__auto___21616);

var G__21617 = seq__21600_21610;
var G__21618 = chunk__21601_21611;
var G__21619 = count__21602_21612;
var G__21620 = (i__21603_21613 + (1));
seq__21600_21610 = G__21617;
chunk__21601_21611 = G__21618;
count__21602_21612 = G__21619;
i__21603_21613 = G__21620;
continue;
} else {
var temp__4657__auto___21621 = cljs.core.seq.call(null,seq__21600_21610);
if(temp__4657__auto___21621){
var seq__21600_21622__$1 = temp__4657__auto___21621;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__21600_21622__$1)){
var c__7604__auto___21623 = cljs.core.chunk_first.call(null,seq__21600_21622__$1);
var G__21624 = cljs.core.chunk_rest.call(null,seq__21600_21622__$1);
var G__21625 = c__7604__auto___21623;
var G__21626 = cljs.core.count.call(null,c__7604__auto___21623);
var G__21627 = (0);
seq__21600_21610 = G__21624;
chunk__21601_21611 = G__21625;
count__21602_21612 = G__21626;
i__21603_21613 = G__21627;
continue;
} else {
var vec__21607_21628 = cljs.core.first.call(null,seq__21600_21622__$1);
var ev__7943__auto___21629 = cljs.core.nth.call(null,vec__21607_21628,(0),null);
var func__7944__auto___21630 = cljs.core.nth.call(null,vec__21607_21628,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21629,func__7944__auto___21630);

var G__21631 = cljs.core.next.call(null,seq__21600_21622__$1);
var G__21632 = null;
var G__21633 = (0);
var G__21634 = (0);
seq__21600_21610 = G__21631;
chunk__21601_21611 = G__21632;
count__21602_21612 = G__21633;
i__21603_21613 = G__21634;
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
lt.plugins.doc.search_input = (function lt$plugins$doc$search_input(this$){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input.search","input.search",-420752064),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),"text",new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),"search docs"], null)], null));
var seq__21645_21655 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"focus","focus",234677911),((function (e__7942__auto__){
return (function (){
return lt.objs.context.in_BANG_.call(null,new cljs.core.Keyword(null,"sidebar.doc.search.input","sidebar.doc.search.input",-2136594248),this$);
});})(e__7942__auto__))
,new cljs.core.Keyword(null,"blur","blur",-453500461),((function (e__7942__auto__){
return (function (){
return lt.objs.context.out_BANG_.call(null,new cljs.core.Keyword(null,"sidebar.doc.search.input","sidebar.doc.search.input",-2136594248));
});})(e__7942__auto__))
], null)));
var chunk__21646_21656 = null;
var count__21647_21657 = (0);
var i__21648_21658 = (0);
while(true){
if((i__21648_21658 < count__21647_21657)){
var vec__21649_21659 = cljs.core._nth.call(null,chunk__21646_21656,i__21648_21658);
var ev__7943__auto___21660 = cljs.core.nth.call(null,vec__21649_21659,(0),null);
var func__7944__auto___21661 = cljs.core.nth.call(null,vec__21649_21659,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21660,func__7944__auto___21661);

var G__21662 = seq__21645_21655;
var G__21663 = chunk__21646_21656;
var G__21664 = count__21647_21657;
var G__21665 = (i__21648_21658 + (1));
seq__21645_21655 = G__21662;
chunk__21646_21656 = G__21663;
count__21647_21657 = G__21664;
i__21648_21658 = G__21665;
continue;
} else {
var temp__4657__auto___21666 = cljs.core.seq.call(null,seq__21645_21655);
if(temp__4657__auto___21666){
var seq__21645_21667__$1 = temp__4657__auto___21666;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__21645_21667__$1)){
var c__7604__auto___21668 = cljs.core.chunk_first.call(null,seq__21645_21667__$1);
var G__21669 = cljs.core.chunk_rest.call(null,seq__21645_21667__$1);
var G__21670 = c__7604__auto___21668;
var G__21671 = cljs.core.count.call(null,c__7604__auto___21668);
var G__21672 = (0);
seq__21645_21655 = G__21669;
chunk__21646_21656 = G__21670;
count__21647_21657 = G__21671;
i__21648_21658 = G__21672;
continue;
} else {
var vec__21652_21673 = cljs.core.first.call(null,seq__21645_21667__$1);
var ev__7943__auto___21674 = cljs.core.nth.call(null,vec__21652_21673,(0),null);
var func__7944__auto___21675 = cljs.core.nth.call(null,vec__21652_21673,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21674,func__7944__auto___21675);

var G__21676 = cljs.core.next.call(null,seq__21645_21667__$1);
var G__21677 = null;
var G__21678 = (0);
var G__21679 = (0);
seq__21645_21655 = G__21676;
chunk__21646_21656 = G__21677;
count__21647_21657 = G__21678;
i__21648_21658 = G__21679;
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
lt.plugins.doc.type_item = (function lt$plugins$doc$type_item(this$,i){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.Keyword(null,"label","label",1718410804).cljs$core$IFn$_invoke$arity$1(i)], null));
var seq__21690_21700 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"set-item!","set-item!",-2069575582),i);
});})(e__7942__auto__))
], null)));
var chunk__21691_21701 = null;
var count__21692_21702 = (0);
var i__21693_21703 = (0);
while(true){
if((i__21693_21703 < count__21692_21702)){
var vec__21694_21704 = cljs.core._nth.call(null,chunk__21691_21701,i__21693_21703);
var ev__7943__auto___21705 = cljs.core.nth.call(null,vec__21694_21704,(0),null);
var func__7944__auto___21706 = cljs.core.nth.call(null,vec__21694_21704,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21705,func__7944__auto___21706);

var G__21707 = seq__21690_21700;
var G__21708 = chunk__21691_21701;
var G__21709 = count__21692_21702;
var G__21710 = (i__21693_21703 + (1));
seq__21690_21700 = G__21707;
chunk__21691_21701 = G__21708;
count__21692_21702 = G__21709;
i__21693_21703 = G__21710;
continue;
} else {
var temp__4657__auto___21711 = cljs.core.seq.call(null,seq__21690_21700);
if(temp__4657__auto___21711){
var seq__21690_21712__$1 = temp__4657__auto___21711;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__21690_21712__$1)){
var c__7604__auto___21713 = cljs.core.chunk_first.call(null,seq__21690_21712__$1);
var G__21714 = cljs.core.chunk_rest.call(null,seq__21690_21712__$1);
var G__21715 = c__7604__auto___21713;
var G__21716 = cljs.core.count.call(null,c__7604__auto___21713);
var G__21717 = (0);
seq__21690_21700 = G__21714;
chunk__21691_21701 = G__21715;
count__21692_21702 = G__21716;
i__21693_21703 = G__21717;
continue;
} else {
var vec__21697_21718 = cljs.core.first.call(null,seq__21690_21712__$1);
var ev__7943__auto___21719 = cljs.core.nth.call(null,vec__21697_21718,(0),null);
var func__7944__auto___21720 = cljs.core.nth.call(null,vec__21697_21718,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21719,func__7944__auto___21720);

var G__21721 = cljs.core.next.call(null,seq__21690_21712__$1);
var G__21722 = null;
var G__21723 = (0);
var G__21724 = (0);
seq__21690_21700 = G__21721;
chunk__21691_21701 = G__21722;
count__21692_21702 = G__21723;
i__21693_21703 = G__21724;
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
lt.plugins.doc.type_list = (function lt$plugins$doc$type_list(this$){
var e__7942__auto__ = crate.core.html.call(null,(function (){var types = lt.object.raise_reduce.call(null,this$,new cljs.core.Keyword(null,"types+","types+",590378171),cljs.core.PersistentVector.EMPTY);
var cur = (function (){var or__6793__auto__ = new cljs.core.Keyword(null,"cur","cur",1153190599).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$));
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return cljs.core.first.call(null,types);
}
})();
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.types","div.types",2043608691),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),new cljs.core.Keyword(null,"label","label",1718410804).cljs$core$IFn$_invoke$arity$1(cur)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul.types","ul.types",-281400801),cljs.core.map.call(null,cljs.core.partial.call(null,lt.plugins.doc.type_item,this$),types)], null)], null);
})());
var seq__21735_21745 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),cljs.core.PersistentVector.EMPTY));
var chunk__21736_21746 = null;
var count__21737_21747 = (0);
var i__21738_21748 = (0);
while(true){
if((i__21738_21748 < count__21737_21747)){
var vec__21739_21749 = cljs.core._nth.call(null,chunk__21736_21746,i__21738_21748);
var ev__7943__auto___21750 = cljs.core.nth.call(null,vec__21739_21749,(0),null);
var func__7944__auto___21751 = cljs.core.nth.call(null,vec__21739_21749,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21750,func__7944__auto___21751);

var G__21752 = seq__21735_21745;
var G__21753 = chunk__21736_21746;
var G__21754 = count__21737_21747;
var G__21755 = (i__21738_21748 + (1));
seq__21735_21745 = G__21752;
chunk__21736_21746 = G__21753;
count__21737_21747 = G__21754;
i__21738_21748 = G__21755;
continue;
} else {
var temp__4657__auto___21756 = cljs.core.seq.call(null,seq__21735_21745);
if(temp__4657__auto___21756){
var seq__21735_21757__$1 = temp__4657__auto___21756;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__21735_21757__$1)){
var c__7604__auto___21758 = cljs.core.chunk_first.call(null,seq__21735_21757__$1);
var G__21759 = cljs.core.chunk_rest.call(null,seq__21735_21757__$1);
var G__21760 = c__7604__auto___21758;
var G__21761 = cljs.core.count.call(null,c__7604__auto___21758);
var G__21762 = (0);
seq__21735_21745 = G__21759;
chunk__21736_21746 = G__21760;
count__21737_21747 = G__21761;
i__21738_21748 = G__21762;
continue;
} else {
var vec__21742_21763 = cljs.core.first.call(null,seq__21735_21757__$1);
var ev__7943__auto___21764 = cljs.core.nth.call(null,vec__21742_21763,(0),null);
var func__7944__auto___21765 = cljs.core.nth.call(null,vec__21742_21763,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21764,func__7944__auto___21765);

var G__21766 = cljs.core.next.call(null,seq__21735_21757__$1);
var G__21767 = null;
var G__21768 = (0);
var G__21769 = (0);
seq__21735_21745 = G__21766;
chunk__21736_21746 = G__21767;
count__21737_21747 = G__21768;
i__21738_21748 = G__21769;
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
lt.plugins.doc.connect_button = (function lt$plugins$doc$connect_button(){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),"Connect"], null));
var seq__21780_21790 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (){
return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"show-add-connection","show-add-connection",652692070));
});})(e__7942__auto__))
], null)));
var chunk__21781_21791 = null;
var count__21782_21792 = (0);
var i__21783_21793 = (0);
while(true){
if((i__21783_21793 < count__21782_21792)){
var vec__21784_21794 = cljs.core._nth.call(null,chunk__21781_21791,i__21783_21793);
var ev__7943__auto___21795 = cljs.core.nth.call(null,vec__21784_21794,(0),null);
var func__7944__auto___21796 = cljs.core.nth.call(null,vec__21784_21794,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21795,func__7944__auto___21796);

var G__21797 = seq__21780_21790;
var G__21798 = chunk__21781_21791;
var G__21799 = count__21782_21792;
var G__21800 = (i__21783_21793 + (1));
seq__21780_21790 = G__21797;
chunk__21781_21791 = G__21798;
count__21782_21792 = G__21799;
i__21783_21793 = G__21800;
continue;
} else {
var temp__4657__auto___21801 = cljs.core.seq.call(null,seq__21780_21790);
if(temp__4657__auto___21801){
var seq__21780_21802__$1 = temp__4657__auto___21801;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__21780_21802__$1)){
var c__7604__auto___21803 = cljs.core.chunk_first.call(null,seq__21780_21802__$1);
var G__21804 = cljs.core.chunk_rest.call(null,seq__21780_21802__$1);
var G__21805 = c__7604__auto___21803;
var G__21806 = cljs.core.count.call(null,c__7604__auto___21803);
var G__21807 = (0);
seq__21780_21790 = G__21804;
chunk__21781_21791 = G__21805;
count__21782_21792 = G__21806;
i__21783_21793 = G__21807;
continue;
} else {
var vec__21787_21808 = cljs.core.first.call(null,seq__21780_21802__$1);
var ev__7943__auto___21809 = cljs.core.nth.call(null,vec__21787_21808,(0),null);
var func__7944__auto___21810 = cljs.core.nth.call(null,vec__21787_21808,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21809,func__7944__auto___21810);

var G__21811 = cljs.core.next.call(null,seq__21780_21802__$1);
var G__21812 = null;
var G__21813 = (0);
var G__21814 = (0);
seq__21780_21790 = G__21811;
chunk__21781_21791 = G__21812;
count__21782_21792 = G__21813;
i__21783_21793 = G__21814;
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
lt.plugins.doc.no_client_ui = (function lt$plugins$doc$no_client_ui(this$){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.no-client","div.no-client",167474811),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"There's no client for us to use to search for these kinds of docs. "], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),lt.plugins.doc.connect_button.call(null)," to one."], null)], null));
var seq__21825_21835 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),cljs.core.PersistentVector.EMPTY));
var chunk__21826_21836 = null;
var count__21827_21837 = (0);
var i__21828_21838 = (0);
while(true){
if((i__21828_21838 < count__21827_21837)){
var vec__21829_21839 = cljs.core._nth.call(null,chunk__21826_21836,i__21828_21838);
var ev__7943__auto___21840 = cljs.core.nth.call(null,vec__21829_21839,(0),null);
var func__7944__auto___21841 = cljs.core.nth.call(null,vec__21829_21839,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21840,func__7944__auto___21841);

var G__21842 = seq__21825_21835;
var G__21843 = chunk__21826_21836;
var G__21844 = count__21827_21837;
var G__21845 = (i__21828_21838 + (1));
seq__21825_21835 = G__21842;
chunk__21826_21836 = G__21843;
count__21827_21837 = G__21844;
i__21828_21838 = G__21845;
continue;
} else {
var temp__4657__auto___21846 = cljs.core.seq.call(null,seq__21825_21835);
if(temp__4657__auto___21846){
var seq__21825_21847__$1 = temp__4657__auto___21846;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__21825_21847__$1)){
var c__7604__auto___21848 = cljs.core.chunk_first.call(null,seq__21825_21847__$1);
var G__21849 = cljs.core.chunk_rest.call(null,seq__21825_21847__$1);
var G__21850 = c__7604__auto___21848;
var G__21851 = cljs.core.count.call(null,c__7604__auto___21848);
var G__21852 = (0);
seq__21825_21835 = G__21849;
chunk__21826_21836 = G__21850;
count__21827_21837 = G__21851;
i__21828_21838 = G__21852;
continue;
} else {
var vec__21832_21853 = cljs.core.first.call(null,seq__21825_21847__$1);
var ev__7943__auto___21854 = cljs.core.nth.call(null,vec__21832_21853,(0),null);
var func__7944__auto___21855 = cljs.core.nth.call(null,vec__21832_21853,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21854,func__7944__auto___21855);

var G__21856 = cljs.core.next.call(null,seq__21825_21847__$1);
var G__21857 = null;
var G__21858 = (0);
var G__21859 = (0);
seq__21825_21835 = G__21856;
chunk__21826_21836 = G__21857;
count__21827_21837 = G__21858;
i__21828_21838 = G__21859;
continue;
}
} else {
}
}
break;
}

return e__7942__auto__;
});
lt.plugins.doc.try_trigger = (function lt$plugins$doc$try_trigger(this$,cur,v){
var cs = lt.objs.clients.discover_STAR_.call(null,new cljs.core.Keyword(null,"trigger","trigger",103466139).cljs$core$IFn$_invoke$arity$1(cur));
if(cljs.core.not.call(null,cljs.core.seq.call(null,cs))){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"no-client","no-client",-373374621));
} else {
var temp__4657__auto___21868 = lt.util.dom.$.call(null,new cljs.core.Keyword(null,".no-client",".no-client",1487117657),lt.object.__GT_content.call(null,this$));
if(cljs.core.truth_(temp__4657__auto___21868)){
var nc_21869 = temp__4657__auto___21868;
lt.util.dom.remove.call(null,nc_21869);
} else {
}

lt.objs.notifos.set_msg_BANG_.call(null,"Searching for docs...");

var seq__21864 = cljs.core.seq.call(null,cs);
var chunk__21865 = null;
var count__21866 = (0);
var i__21867 = (0);
while(true){
if((i__21867 < count__21866)){
var c = cljs.core._nth.call(null,chunk__21865,i__21867);
lt.objs.notifos.working.call(null);

lt.objs.clients.send.call(null,c,new cljs.core.Keyword(null,"trigger","trigger",103466139).cljs$core$IFn$_invoke$arity$1(cur),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"search","search",1564939822),v], null),new cljs.core.Keyword(null,"only","only",1907811652),this$);

var G__21870 = seq__21864;
var G__21871 = chunk__21865;
var G__21872 = count__21866;
var G__21873 = (i__21867 + (1));
seq__21864 = G__21870;
chunk__21865 = G__21871;
count__21866 = G__21872;
i__21867 = G__21873;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__21864);
if(temp__4657__auto__){
var seq__21864__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__21864__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__21864__$1);
var G__21874 = cljs.core.chunk_rest.call(null,seq__21864__$1);
var G__21875 = c__7604__auto__;
var G__21876 = cljs.core.count.call(null,c__7604__auto__);
var G__21877 = (0);
seq__21864 = G__21874;
chunk__21865 = G__21875;
count__21866 = G__21876;
i__21867 = G__21877;
continue;
} else {
var c = cljs.core.first.call(null,seq__21864__$1);
lt.objs.notifos.working.call(null);

lt.objs.clients.send.call(null,c,new cljs.core.Keyword(null,"trigger","trigger",103466139).cljs$core$IFn$_invoke$arity$1(cur),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"search","search",1564939822),v], null),new cljs.core.Keyword(null,"only","only",1907811652),this$);

var G__21878 = cljs.core.next.call(null,seq__21864__$1);
var G__21879 = null;
var G__21880 = (0);
var G__21881 = (0);
seq__21864 = G__21878;
chunk__21865 = G__21879;
count__21866 = G__21880;
i__21867 = G__21881;
continue;
}
} else {
return null;
}
}
break;
}
}
});
lt.plugins.doc.__GT_val = (function lt$plugins$doc$__GT_val(this$){
return lt.util.dom.val.call(null,lt.util.dom.$.call(null,new cljs.core.Keyword(null,"input.search","input.search",-420752064),lt.object.__GT_content.call(null,this$)));
});
lt.plugins.doc.grouped_items = (function lt$plugins$doc$grouped_items(results,v,prev){
var normal = lt.util.dom.fragment.call(null,cljs.core.PersistentVector.EMPTY);
var exact = lt.util.dom.fragment.call(null,cljs.core.PersistentVector.EMPTY);
var seq__21888_21894 = cljs.core.seq.call(null,results);
var chunk__21890_21895 = null;
var count__21891_21896 = (0);
var i__21892_21897 = (0);
while(true){
if((i__21892_21897 < count__21891_21896)){
var r_21898 = cljs.core._nth.call(null,chunk__21890_21895,i__21892_21897);
if(cljs.core.not.call(null,prev.call(null,r_21898))){
if(cljs.core.truth_(lt.util.cljs.str_contains_QMARK_.call(null,[cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(r_21898))].join(''),v))){
lt.util.dom.append.call(null,exact,lt.plugins.doc.search_item.call(null,r_21898));
} else {
lt.util.dom.append.call(null,normal,lt.plugins.doc.search_item.call(null,r_21898));
}

var G__21899 = seq__21888_21894;
var G__21900 = chunk__21890_21895;
var G__21901 = count__21891_21896;
var G__21902 = (i__21892_21897 + (1));
seq__21888_21894 = G__21899;
chunk__21890_21895 = G__21900;
count__21891_21896 = G__21901;
i__21892_21897 = G__21902;
continue;
} else {
var G__21903 = seq__21888_21894;
var G__21904 = chunk__21890_21895;
var G__21905 = count__21891_21896;
var G__21906 = (i__21892_21897 + (1));
seq__21888_21894 = G__21903;
chunk__21890_21895 = G__21904;
count__21891_21896 = G__21905;
i__21892_21897 = G__21906;
continue;
}
} else {
var temp__4657__auto___21907 = cljs.core.seq.call(null,seq__21888_21894);
if(temp__4657__auto___21907){
var seq__21888_21908__$1 = temp__4657__auto___21907;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__21888_21908__$1)){
var c__7604__auto___21909 = cljs.core.chunk_first.call(null,seq__21888_21908__$1);
var G__21910 = cljs.core.chunk_rest.call(null,seq__21888_21908__$1);
var G__21911 = c__7604__auto___21909;
var G__21912 = cljs.core.count.call(null,c__7604__auto___21909);
var G__21913 = (0);
seq__21888_21894 = G__21910;
chunk__21890_21895 = G__21911;
count__21891_21896 = G__21912;
i__21892_21897 = G__21913;
continue;
} else {
var r_21914 = cljs.core.first.call(null,seq__21888_21908__$1);
if(cljs.core.not.call(null,prev.call(null,r_21914))){
if(cljs.core.truth_(lt.util.cljs.str_contains_QMARK_.call(null,[cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(r_21914))].join(''),v))){
lt.util.dom.append.call(null,exact,lt.plugins.doc.search_item.call(null,r_21914));
} else {
lt.util.dom.append.call(null,normal,lt.plugins.doc.search_item.call(null,r_21914));
}

var G__21915 = cljs.core.next.call(null,seq__21888_21908__$1);
var G__21916 = null;
var G__21917 = (0);
var G__21918 = (0);
seq__21888_21894 = G__21915;
chunk__21890_21895 = G__21916;
count__21891_21896 = G__21917;
i__21892_21897 = G__21918;
continue;
} else {
var G__21919 = cljs.core.next.call(null,seq__21888_21908__$1);
var G__21920 = null;
var G__21921 = (0);
var G__21922 = (0);
seq__21888_21894 = G__21919;
chunk__21890_21895 = G__21920;
count__21891_21896 = G__21921;
i__21892_21897 = G__21922;
continue;
}
}
} else {
}
}
break;
}

return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"normal","normal",-1519123858),normal,new cljs.core.Keyword(null,"exact","exact",1438022323),exact], null);
});
/**
 * 
 */
lt.plugins.doc.__BEH__set_item = (function lt$plugins$doc$__BEH__set_item(this$,i){
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cur","cur",1153190599),i], null));

lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"clear!","clear!",-144814418));

lt.util.dom.replace_with.call(null,lt.util.dom.$.call(null,new cljs.core.Keyword(null,".types",".types",-727535595),lt.object.__GT_content.call(null,this$)),lt.plugins.doc.type_list.call(null,this$));

return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"focus!","focus!",-1344984927));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.doc","set-item","lt.plugins.doc/set-item",1723582074),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"set-item!","set-item!",-2069575582),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.plugins.doc.__BEH__set_item);
/**
 * 
 */
lt.plugins.doc.__BEH__clear_BANG_ = (function lt$plugins$doc$__BEH__clear_BANG_(this$){
lt.util.dom.empty.call(null,lt.util.dom.$.call(null,new cljs.core.Keyword(null,".results",".results",-1665293795),lt.object.__GT_content.call(null,this$)));

return lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"results","results",-1134170113),cljs.core.PersistentHashSet.EMPTY], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.doc","clear!","lt.plugins.doc/clear!",-493771470),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"clear!","clear!",-144814418),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.plugins.doc.__BEH__clear_BANG_);
/**
 * 
 */
lt.plugins.doc.__BEH__no_client = (function lt$plugins$doc$__BEH__no_client(this$){
if(cljs.core.truth_(lt.util.dom.$.call(null,new cljs.core.Keyword(null,".no-client",".no-client",1487117657),lt.object.__GT_content.call(null,this$)))){
return null;
} else {
return lt.util.dom.before.call(null,lt.util.dom.$.call(null,new cljs.core.Keyword(null,".results",".results",-1665293795),lt.object.__GT_content.call(null,this$)),lt.plugins.doc.no_client_ui.call(null,this$));
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.doc","no-client","lt.plugins.doc/no-client",-544067569),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"no-client","no-client",-373374621),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.plugins.doc.__BEH__no_client);
/**
 * 
 */
lt.plugins.doc.__BEH__cur_from_last_editor = (function lt$plugins$doc$__BEH__cur_from_last_editor(this$){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
var ed_type = new cljs.core.Keyword(null,"type-name","type-name",1911633753).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed)));
if(cljs.core.truth_(cljs.core.get.call(null,new cljs.core.Keyword(null,"file-types","file-types",457827029).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"cur","cur",1153190599).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))),ed_type))){
return null;
} else {
var temp__4657__auto____$1 = cljs.core.first.call(null,cljs.core.filter.call(null,((function (ed_type,ed,temp__4657__auto__){
return (function (p1__21923_SHARP_){
return cljs.core.get.call(null,new cljs.core.Keyword(null,"file-types","file-types",457827029).cljs$core$IFn$_invoke$arity$1(p1__21923_SHARP_),ed_type);
});})(ed_type,ed,temp__4657__auto__))
,lt.object.raise_reduce.call(null,this$,new cljs.core.Keyword(null,"types+","types+",590378171),cljs.core.PersistentVector.EMPTY)));
if(cljs.core.truth_(temp__4657__auto____$1)){
var neue = temp__4657__auto____$1;
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"set-item!","set-item!",-2069575582),neue);
} else {
return null;
}
}
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.doc","cur-from-last-editor","lt.plugins.doc/cur-from-last-editor",885322832),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"show","show",-576705889),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.plugins.doc.__BEH__cur_from_last_editor);
/**
 * 
 */
lt.plugins.doc.__BEH__sidebar__DOT__doc__DOT__search__DOT__exec = (function lt$plugins$doc$__BEH__sidebar__DOT__doc__DOT__search__DOT__exec(this$){
var v = lt.plugins.doc.__GT_val.call(null,this$);
var trigger = new cljs.core.Keyword(null,"trigger","trigger",103466139).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"cur","cur",1153190599).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"clear!","clear!",-144814418));

if(cljs.core.empty_QMARK_.call(null,v)){
return null;
} else {
if(cljs.core.fn_QMARK_.call(null,trigger)){
return trigger.call(null,v);
} else {
return lt.plugins.doc.try_trigger.call(null,this$,new cljs.core.Keyword(null,"cur","cur",1153190599).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),v);
}
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.doc","sidebar.doc.search.exec","lt.plugins.doc/sidebar.doc.search.exec",1325976483),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"sidebar.doc.search.exec","sidebar.doc.search.exec",1286922527),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.plugins.doc.__BEH__sidebar__DOT__doc__DOT__search__DOT__exec);
/**
 * 
 */
lt.plugins.doc.__BEH__doc__DOT__search__DOT__results = (function lt$plugins$doc$__BEH__doc__DOT__search__DOT__results(this$,results){
var v = lt.plugins.doc.__GT_val.call(null,this$);
var map__21926 = lt.plugins.doc.grouped_items.call(null,results,v,new cljs.core.Keyword(null,"results","results",-1134170113).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
var map__21926__$1 = ((((!((map__21926 == null)))?((((map__21926.cljs$lang$protocol_mask$partition0$ & (64))) || (map__21926.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__21926):map__21926);
var normal = cljs.core.get.call(null,map__21926__$1,new cljs.core.Keyword(null,"normal","normal",-1519123858));
var exact = cljs.core.get.call(null,map__21926__$1,new cljs.core.Keyword(null,"exact","exact",1438022323));
var old = lt.util.dom.$.call(null,new cljs.core.Keyword(null,".results",".results",-1665293795),lt.object.__GT_content.call(null,this$));
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"results","results",-1134170113),cljs.core.into.call(null,new cljs.core.Keyword(null,"results","results",-1134170113).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),results)], null));

lt.objs.notifos.done_working.call(null,[cljs.core.str("Found "),cljs.core.str(cljs.core.count.call(null,new cljs.core.Keyword(null,"results","results",-1134170113).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)))),cljs.core.str(" doc results.")].join(''));

lt.util.dom.prepend.call(null,old,exact);

return lt.util.dom.append.call(null,old,normal);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.doc","doc.search.results","lt.plugins.doc/doc.search.results",-1978301708),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"doc.search.results","doc.search.results",2126623352),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.plugins.doc.__BEH__doc__DOT__search__DOT__results);
/**
 * 
 */
lt.plugins.doc.__BEH__focus_on_show = (function lt$plugins$doc$__BEH__focus_on_show(this$){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"focus!","focus!",-1344984927));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.doc","focus-on-show","lt.plugins.doc/focus-on-show",-290022059),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"show","show",-576705889),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.plugins.doc.__BEH__focus_on_show);
/**
 * 
 */
lt.plugins.doc.__BEH__focus_BANG_ = (function lt$plugins$doc$__BEH__focus_BANG_(this$){
if(cljs.core.not.call(null,new cljs.core.Keyword(null,"active","active",1895962068).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)))){
var input = lt.util.dom.$.call(null,new cljs.core.Keyword(null,"input","input",556931961),lt.object.__GT_content.call(null,this$));
lt.util.dom.focus.call(null,input);

return input.select();
} else {
return lt.object.raise.call(null,new cljs.core.Keyword(null,"options","options",99638489).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"active","active",1895962068).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))),new cljs.core.Keyword(null,"focus!","focus!",-1344984927));
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.doc","focus!","lt.plugins.doc/focus!",-1384049115),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"focus!","focus!",-1344984927),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.plugins.doc.__BEH__focus_BANG_);
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.plugins.doc","sidebar.doc.search","lt.plugins.doc/sidebar.doc.search",-379319221),new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"sidebar.docs.search","sidebar.docs.search",-1175510939),null], null), null),new cljs.core.Keyword(null,"label","label",1718410804),"Doc search",new cljs.core.Keyword(null,"init","init",-1875481434),(function (this$){
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cur","cur",1153190599),cljs.core.first.call(null,lt.object.raise_reduce.call(null,this$,new cljs.core.Keyword(null,"types+","types+",590378171),cljs.core.PersistentVector.EMPTY))], null));

return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.docs-search.filter-list","div.docs-search.filter-list",-686952299),lt.plugins.doc.search_input.call(null,this$),lt.plugins.doc.type_list.call(null,this$),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul.results","ul.results",73752218)], null)], null);
}));
lt.plugins.doc.doc_search = null;
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"docs.search.exec","docs.search.exec",377976273),new cljs.core.Keyword(null,"desc","desc",2093485764),"Docs: Execute sidebar search",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
if(cljs.core.truth_(lt.plugins.doc.doc_search)){
return lt.object.raise.call(null,lt.plugins.doc.doc_search,new cljs.core.Keyword(null,"sidebar.doc.search.exec","sidebar.doc.search.exec",1286922527));
} else {
return null;
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"docs.search.show","docs.search.show",-659879847),new cljs.core.Keyword(null,"desc","desc",2093485764),"Docs: Search language docs",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (force_QMARK_){
if(cljs.core.truth_(lt.plugins.doc.doc_search)){
return lt.object.raise.call(null,lt.objs.sidebar.rightbar,new cljs.core.Keyword(null,"toggle","toggle",1291842030),lt.plugins.doc.doc_search,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"force?","force?",1839038675),force_QMARK_], null));
} else {
return null;
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"docs.search.hide","docs.search.hide",-1928947334),new cljs.core.Keyword(null,"desc","desc",2093485764),"Docs: hide language docs",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (force_QMARK_){
if(cljs.core.truth_(lt.plugins.doc.doc_search)){
return lt.object.raise.call(null,lt.objs.sidebar.rightbar,new cljs.core.Keyword(null,"close!","close!",-2079310498));
} else {
return null;
}
})], null));
/**
 * 
 */
lt.plugins.doc.__BEH__init_doc_search = (function lt$plugins$doc$__BEH__init_doc_search(this$){
lt.plugins.doc.doc_search = lt.object.create.call(null,new cljs.core.Keyword("lt.plugins.doc","sidebar.doc.search","lt.plugins.doc/sidebar.doc.search",-379319221));

return lt.objs.sidebar.add_item.call(null,lt.objs.sidebar.rightbar,lt.plugins.doc.doc_search);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.doc","init-doc-search","lt.plugins.doc/init-doc-search",1412884991),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"init","init",-1875481434),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.plugins.doc.__BEH__init_doc_search);
