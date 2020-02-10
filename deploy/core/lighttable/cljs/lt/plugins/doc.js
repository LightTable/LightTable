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
var seq__21564_21574 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),cljs.core.PersistentVector.EMPTY));
var chunk__21565_21575 = null;
var count__21566_21576 = (0);
var i__21567_21577 = (0);
while(true){
if((i__21567_21577 < count__21566_21576)){
var vec__21568_21578 = cljs.core._nth.call(null,chunk__21565_21575,i__21567_21577);
var ev__7943__auto___21579 = cljs.core.nth.call(null,vec__21568_21578,(0),null);
var func__7944__auto___21580 = cljs.core.nth.call(null,vec__21568_21578,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21579,func__7944__auto___21580);

var G__21581 = seq__21564_21574;
var G__21582 = chunk__21565_21575;
var G__21583 = count__21566_21576;
var G__21584 = (i__21567_21577 + (1));
seq__21564_21574 = G__21581;
chunk__21565_21575 = G__21582;
count__21566_21576 = G__21583;
i__21567_21577 = G__21584;
continue;
} else {
var temp__4657__auto___21585 = cljs.core.seq.call(null,seq__21564_21574);
if(temp__4657__auto___21585){
var seq__21564_21586__$1 = temp__4657__auto___21585;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__21564_21586__$1)){
var c__7604__auto___21587 = cljs.core.chunk_first.call(null,seq__21564_21586__$1);
var G__21588 = cljs.core.chunk_rest.call(null,seq__21564_21586__$1);
var G__21589 = c__7604__auto___21587;
var G__21590 = cljs.core.count.call(null,c__7604__auto___21587);
var G__21591 = (0);
seq__21564_21574 = G__21588;
chunk__21565_21575 = G__21589;
count__21566_21576 = G__21590;
i__21567_21577 = G__21591;
continue;
} else {
var vec__21571_21592 = cljs.core.first.call(null,seq__21564_21586__$1);
var ev__7943__auto___21593 = cljs.core.nth.call(null,vec__21571_21592,(0),null);
var func__7944__auto___21594 = cljs.core.nth.call(null,vec__21571_21592,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21593,func__7944__auto___21594);

var G__21595 = cljs.core.next.call(null,seq__21564_21586__$1);
var G__21596 = null;
var G__21597 = (0);
var G__21598 = (0);
seq__21564_21574 = G__21595;
chunk__21565_21575 = G__21596;
count__21566_21576 = G__21597;
i__21567_21577 = G__21598;
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
return (function (p1__21599_SHARP_){
return cljs.core.get.call(null,p1__21599_SHARP_,new cljs.core.Keyword(null,"label","label",1718410804));
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
var seq__21610_21620 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),cljs.core.PersistentVector.EMPTY));
var chunk__21611_21621 = null;
var count__21612_21622 = (0);
var i__21613_21623 = (0);
while(true){
if((i__21613_21623 < count__21612_21622)){
var vec__21614_21624 = cljs.core._nth.call(null,chunk__21611_21621,i__21613_21623);
var ev__7943__auto___21625 = cljs.core.nth.call(null,vec__21614_21624,(0),null);
var func__7944__auto___21626 = cljs.core.nth.call(null,vec__21614_21624,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21625,func__7944__auto___21626);

var G__21627 = seq__21610_21620;
var G__21628 = chunk__21611_21621;
var G__21629 = count__21612_21622;
var G__21630 = (i__21613_21623 + (1));
seq__21610_21620 = G__21627;
chunk__21611_21621 = G__21628;
count__21612_21622 = G__21629;
i__21613_21623 = G__21630;
continue;
} else {
var temp__4657__auto___21631 = cljs.core.seq.call(null,seq__21610_21620);
if(temp__4657__auto___21631){
var seq__21610_21632__$1 = temp__4657__auto___21631;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__21610_21632__$1)){
var c__7604__auto___21633 = cljs.core.chunk_first.call(null,seq__21610_21632__$1);
var G__21634 = cljs.core.chunk_rest.call(null,seq__21610_21632__$1);
var G__21635 = c__7604__auto___21633;
var G__21636 = cljs.core.count.call(null,c__7604__auto___21633);
var G__21637 = (0);
seq__21610_21620 = G__21634;
chunk__21611_21621 = G__21635;
count__21612_21622 = G__21636;
i__21613_21623 = G__21637;
continue;
} else {
var vec__21617_21638 = cljs.core.first.call(null,seq__21610_21632__$1);
var ev__7943__auto___21639 = cljs.core.nth.call(null,vec__21617_21638,(0),null);
var func__7944__auto___21640 = cljs.core.nth.call(null,vec__21617_21638,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21639,func__7944__auto___21640);

var G__21641 = cljs.core.next.call(null,seq__21610_21632__$1);
var G__21642 = null;
var G__21643 = (0);
var G__21644 = (0);
seq__21610_21620 = G__21641;
chunk__21611_21621 = G__21642;
count__21612_21622 = G__21643;
i__21613_21623 = G__21644;
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
var seq__21655_21665 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"focus","focus",234677911),((function (e__7942__auto__){
return (function (){
return lt.objs.context.in_BANG_.call(null,new cljs.core.Keyword(null,"sidebar.doc.search.input","sidebar.doc.search.input",-2136594248),this$);
});})(e__7942__auto__))
,new cljs.core.Keyword(null,"blur","blur",-453500461),((function (e__7942__auto__){
return (function (){
return lt.objs.context.out_BANG_.call(null,new cljs.core.Keyword(null,"sidebar.doc.search.input","sidebar.doc.search.input",-2136594248));
});})(e__7942__auto__))
], null)));
var chunk__21656_21666 = null;
var count__21657_21667 = (0);
var i__21658_21668 = (0);
while(true){
if((i__21658_21668 < count__21657_21667)){
var vec__21659_21669 = cljs.core._nth.call(null,chunk__21656_21666,i__21658_21668);
var ev__7943__auto___21670 = cljs.core.nth.call(null,vec__21659_21669,(0),null);
var func__7944__auto___21671 = cljs.core.nth.call(null,vec__21659_21669,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21670,func__7944__auto___21671);

var G__21672 = seq__21655_21665;
var G__21673 = chunk__21656_21666;
var G__21674 = count__21657_21667;
var G__21675 = (i__21658_21668 + (1));
seq__21655_21665 = G__21672;
chunk__21656_21666 = G__21673;
count__21657_21667 = G__21674;
i__21658_21668 = G__21675;
continue;
} else {
var temp__4657__auto___21676 = cljs.core.seq.call(null,seq__21655_21665);
if(temp__4657__auto___21676){
var seq__21655_21677__$1 = temp__4657__auto___21676;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__21655_21677__$1)){
var c__7604__auto___21678 = cljs.core.chunk_first.call(null,seq__21655_21677__$1);
var G__21679 = cljs.core.chunk_rest.call(null,seq__21655_21677__$1);
var G__21680 = c__7604__auto___21678;
var G__21681 = cljs.core.count.call(null,c__7604__auto___21678);
var G__21682 = (0);
seq__21655_21665 = G__21679;
chunk__21656_21666 = G__21680;
count__21657_21667 = G__21681;
i__21658_21668 = G__21682;
continue;
} else {
var vec__21662_21683 = cljs.core.first.call(null,seq__21655_21677__$1);
var ev__7943__auto___21684 = cljs.core.nth.call(null,vec__21662_21683,(0),null);
var func__7944__auto___21685 = cljs.core.nth.call(null,vec__21662_21683,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21684,func__7944__auto___21685);

var G__21686 = cljs.core.next.call(null,seq__21655_21677__$1);
var G__21687 = null;
var G__21688 = (0);
var G__21689 = (0);
seq__21655_21665 = G__21686;
chunk__21656_21666 = G__21687;
count__21657_21667 = G__21688;
i__21658_21668 = G__21689;
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
var seq__21700_21710 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"set-item!","set-item!",-2069575582),i);
});})(e__7942__auto__))
], null)));
var chunk__21701_21711 = null;
var count__21702_21712 = (0);
var i__21703_21713 = (0);
while(true){
if((i__21703_21713 < count__21702_21712)){
var vec__21704_21714 = cljs.core._nth.call(null,chunk__21701_21711,i__21703_21713);
var ev__7943__auto___21715 = cljs.core.nth.call(null,vec__21704_21714,(0),null);
var func__7944__auto___21716 = cljs.core.nth.call(null,vec__21704_21714,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21715,func__7944__auto___21716);

var G__21717 = seq__21700_21710;
var G__21718 = chunk__21701_21711;
var G__21719 = count__21702_21712;
var G__21720 = (i__21703_21713 + (1));
seq__21700_21710 = G__21717;
chunk__21701_21711 = G__21718;
count__21702_21712 = G__21719;
i__21703_21713 = G__21720;
continue;
} else {
var temp__4657__auto___21721 = cljs.core.seq.call(null,seq__21700_21710);
if(temp__4657__auto___21721){
var seq__21700_21722__$1 = temp__4657__auto___21721;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__21700_21722__$1)){
var c__7604__auto___21723 = cljs.core.chunk_first.call(null,seq__21700_21722__$1);
var G__21724 = cljs.core.chunk_rest.call(null,seq__21700_21722__$1);
var G__21725 = c__7604__auto___21723;
var G__21726 = cljs.core.count.call(null,c__7604__auto___21723);
var G__21727 = (0);
seq__21700_21710 = G__21724;
chunk__21701_21711 = G__21725;
count__21702_21712 = G__21726;
i__21703_21713 = G__21727;
continue;
} else {
var vec__21707_21728 = cljs.core.first.call(null,seq__21700_21722__$1);
var ev__7943__auto___21729 = cljs.core.nth.call(null,vec__21707_21728,(0),null);
var func__7944__auto___21730 = cljs.core.nth.call(null,vec__21707_21728,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21729,func__7944__auto___21730);

var G__21731 = cljs.core.next.call(null,seq__21700_21722__$1);
var G__21732 = null;
var G__21733 = (0);
var G__21734 = (0);
seq__21700_21710 = G__21731;
chunk__21701_21711 = G__21732;
count__21702_21712 = G__21733;
i__21703_21713 = G__21734;
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
var seq__21745_21755 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),cljs.core.PersistentVector.EMPTY));
var chunk__21746_21756 = null;
var count__21747_21757 = (0);
var i__21748_21758 = (0);
while(true){
if((i__21748_21758 < count__21747_21757)){
var vec__21749_21759 = cljs.core._nth.call(null,chunk__21746_21756,i__21748_21758);
var ev__7943__auto___21760 = cljs.core.nth.call(null,vec__21749_21759,(0),null);
var func__7944__auto___21761 = cljs.core.nth.call(null,vec__21749_21759,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21760,func__7944__auto___21761);

var G__21762 = seq__21745_21755;
var G__21763 = chunk__21746_21756;
var G__21764 = count__21747_21757;
var G__21765 = (i__21748_21758 + (1));
seq__21745_21755 = G__21762;
chunk__21746_21756 = G__21763;
count__21747_21757 = G__21764;
i__21748_21758 = G__21765;
continue;
} else {
var temp__4657__auto___21766 = cljs.core.seq.call(null,seq__21745_21755);
if(temp__4657__auto___21766){
var seq__21745_21767__$1 = temp__4657__auto___21766;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__21745_21767__$1)){
var c__7604__auto___21768 = cljs.core.chunk_first.call(null,seq__21745_21767__$1);
var G__21769 = cljs.core.chunk_rest.call(null,seq__21745_21767__$1);
var G__21770 = c__7604__auto___21768;
var G__21771 = cljs.core.count.call(null,c__7604__auto___21768);
var G__21772 = (0);
seq__21745_21755 = G__21769;
chunk__21746_21756 = G__21770;
count__21747_21757 = G__21771;
i__21748_21758 = G__21772;
continue;
} else {
var vec__21752_21773 = cljs.core.first.call(null,seq__21745_21767__$1);
var ev__7943__auto___21774 = cljs.core.nth.call(null,vec__21752_21773,(0),null);
var func__7944__auto___21775 = cljs.core.nth.call(null,vec__21752_21773,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21774,func__7944__auto___21775);

var G__21776 = cljs.core.next.call(null,seq__21745_21767__$1);
var G__21777 = null;
var G__21778 = (0);
var G__21779 = (0);
seq__21745_21755 = G__21776;
chunk__21746_21756 = G__21777;
count__21747_21757 = G__21778;
i__21748_21758 = G__21779;
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
var seq__21790_21800 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (){
return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"show-add-connection","show-add-connection",652692070));
});})(e__7942__auto__))
], null)));
var chunk__21791_21801 = null;
var count__21792_21802 = (0);
var i__21793_21803 = (0);
while(true){
if((i__21793_21803 < count__21792_21802)){
var vec__21794_21804 = cljs.core._nth.call(null,chunk__21791_21801,i__21793_21803);
var ev__7943__auto___21805 = cljs.core.nth.call(null,vec__21794_21804,(0),null);
var func__7944__auto___21806 = cljs.core.nth.call(null,vec__21794_21804,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21805,func__7944__auto___21806);

var G__21807 = seq__21790_21800;
var G__21808 = chunk__21791_21801;
var G__21809 = count__21792_21802;
var G__21810 = (i__21793_21803 + (1));
seq__21790_21800 = G__21807;
chunk__21791_21801 = G__21808;
count__21792_21802 = G__21809;
i__21793_21803 = G__21810;
continue;
} else {
var temp__4657__auto___21811 = cljs.core.seq.call(null,seq__21790_21800);
if(temp__4657__auto___21811){
var seq__21790_21812__$1 = temp__4657__auto___21811;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__21790_21812__$1)){
var c__7604__auto___21813 = cljs.core.chunk_first.call(null,seq__21790_21812__$1);
var G__21814 = cljs.core.chunk_rest.call(null,seq__21790_21812__$1);
var G__21815 = c__7604__auto___21813;
var G__21816 = cljs.core.count.call(null,c__7604__auto___21813);
var G__21817 = (0);
seq__21790_21800 = G__21814;
chunk__21791_21801 = G__21815;
count__21792_21802 = G__21816;
i__21793_21803 = G__21817;
continue;
} else {
var vec__21797_21818 = cljs.core.first.call(null,seq__21790_21812__$1);
var ev__7943__auto___21819 = cljs.core.nth.call(null,vec__21797_21818,(0),null);
var func__7944__auto___21820 = cljs.core.nth.call(null,vec__21797_21818,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21819,func__7944__auto___21820);

var G__21821 = cljs.core.next.call(null,seq__21790_21812__$1);
var G__21822 = null;
var G__21823 = (0);
var G__21824 = (0);
seq__21790_21800 = G__21821;
chunk__21791_21801 = G__21822;
count__21792_21802 = G__21823;
i__21793_21803 = G__21824;
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
var seq__21835_21845 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),cljs.core.PersistentVector.EMPTY));
var chunk__21836_21846 = null;
var count__21837_21847 = (0);
var i__21838_21848 = (0);
while(true){
if((i__21838_21848 < count__21837_21847)){
var vec__21839_21849 = cljs.core._nth.call(null,chunk__21836_21846,i__21838_21848);
var ev__7943__auto___21850 = cljs.core.nth.call(null,vec__21839_21849,(0),null);
var func__7944__auto___21851 = cljs.core.nth.call(null,vec__21839_21849,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21850,func__7944__auto___21851);

var G__21852 = seq__21835_21845;
var G__21853 = chunk__21836_21846;
var G__21854 = count__21837_21847;
var G__21855 = (i__21838_21848 + (1));
seq__21835_21845 = G__21852;
chunk__21836_21846 = G__21853;
count__21837_21847 = G__21854;
i__21838_21848 = G__21855;
continue;
} else {
var temp__4657__auto___21856 = cljs.core.seq.call(null,seq__21835_21845);
if(temp__4657__auto___21856){
var seq__21835_21857__$1 = temp__4657__auto___21856;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__21835_21857__$1)){
var c__7604__auto___21858 = cljs.core.chunk_first.call(null,seq__21835_21857__$1);
var G__21859 = cljs.core.chunk_rest.call(null,seq__21835_21857__$1);
var G__21860 = c__7604__auto___21858;
var G__21861 = cljs.core.count.call(null,c__7604__auto___21858);
var G__21862 = (0);
seq__21835_21845 = G__21859;
chunk__21836_21846 = G__21860;
count__21837_21847 = G__21861;
i__21838_21848 = G__21862;
continue;
} else {
var vec__21842_21863 = cljs.core.first.call(null,seq__21835_21857__$1);
var ev__7943__auto___21864 = cljs.core.nth.call(null,vec__21842_21863,(0),null);
var func__7944__auto___21865 = cljs.core.nth.call(null,vec__21842_21863,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21864,func__7944__auto___21865);

var G__21866 = cljs.core.next.call(null,seq__21835_21857__$1);
var G__21867 = null;
var G__21868 = (0);
var G__21869 = (0);
seq__21835_21845 = G__21866;
chunk__21836_21846 = G__21867;
count__21837_21847 = G__21868;
i__21838_21848 = G__21869;
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
var temp__4657__auto___21878 = lt.util.dom.$.call(null,new cljs.core.Keyword(null,".no-client",".no-client",1487117657),lt.object.__GT_content.call(null,this$));
if(cljs.core.truth_(temp__4657__auto___21878)){
var nc_21879 = temp__4657__auto___21878;
lt.util.dom.remove.call(null,nc_21879);
} else {
}

lt.objs.notifos.set_msg_BANG_.call(null,"Searching for docs...");

var seq__21874 = cljs.core.seq.call(null,cs);
var chunk__21875 = null;
var count__21876 = (0);
var i__21877 = (0);
while(true){
if((i__21877 < count__21876)){
var c = cljs.core._nth.call(null,chunk__21875,i__21877);
lt.objs.notifos.working.call(null);

lt.objs.clients.send.call(null,c,new cljs.core.Keyword(null,"trigger","trigger",103466139).cljs$core$IFn$_invoke$arity$1(cur),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"search","search",1564939822),v], null),new cljs.core.Keyword(null,"only","only",1907811652),this$);

var G__21880 = seq__21874;
var G__21881 = chunk__21875;
var G__21882 = count__21876;
var G__21883 = (i__21877 + (1));
seq__21874 = G__21880;
chunk__21875 = G__21881;
count__21876 = G__21882;
i__21877 = G__21883;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__21874);
if(temp__4657__auto__){
var seq__21874__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__21874__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__21874__$1);
var G__21884 = cljs.core.chunk_rest.call(null,seq__21874__$1);
var G__21885 = c__7604__auto__;
var G__21886 = cljs.core.count.call(null,c__7604__auto__);
var G__21887 = (0);
seq__21874 = G__21884;
chunk__21875 = G__21885;
count__21876 = G__21886;
i__21877 = G__21887;
continue;
} else {
var c = cljs.core.first.call(null,seq__21874__$1);
lt.objs.notifos.working.call(null);

lt.objs.clients.send.call(null,c,new cljs.core.Keyword(null,"trigger","trigger",103466139).cljs$core$IFn$_invoke$arity$1(cur),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"search","search",1564939822),v], null),new cljs.core.Keyword(null,"only","only",1907811652),this$);

var G__21888 = cljs.core.next.call(null,seq__21874__$1);
var G__21889 = null;
var G__21890 = (0);
var G__21891 = (0);
seq__21874 = G__21888;
chunk__21875 = G__21889;
count__21876 = G__21890;
i__21877 = G__21891;
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
var seq__21898_21904 = cljs.core.seq.call(null,results);
var chunk__21900_21905 = null;
var count__21901_21906 = (0);
var i__21902_21907 = (0);
while(true){
if((i__21902_21907 < count__21901_21906)){
var r_21908 = cljs.core._nth.call(null,chunk__21900_21905,i__21902_21907);
if(cljs.core.not.call(null,prev.call(null,r_21908))){
if(cljs.core.truth_(lt.util.cljs.str_contains_QMARK_.call(null,[cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(r_21908))].join(''),v))){
lt.util.dom.append.call(null,exact,lt.plugins.doc.search_item.call(null,r_21908));
} else {
lt.util.dom.append.call(null,normal,lt.plugins.doc.search_item.call(null,r_21908));
}

var G__21909 = seq__21898_21904;
var G__21910 = chunk__21900_21905;
var G__21911 = count__21901_21906;
var G__21912 = (i__21902_21907 + (1));
seq__21898_21904 = G__21909;
chunk__21900_21905 = G__21910;
count__21901_21906 = G__21911;
i__21902_21907 = G__21912;
continue;
} else {
var G__21913 = seq__21898_21904;
var G__21914 = chunk__21900_21905;
var G__21915 = count__21901_21906;
var G__21916 = (i__21902_21907 + (1));
seq__21898_21904 = G__21913;
chunk__21900_21905 = G__21914;
count__21901_21906 = G__21915;
i__21902_21907 = G__21916;
continue;
}
} else {
var temp__4657__auto___21917 = cljs.core.seq.call(null,seq__21898_21904);
if(temp__4657__auto___21917){
var seq__21898_21918__$1 = temp__4657__auto___21917;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__21898_21918__$1)){
var c__7604__auto___21919 = cljs.core.chunk_first.call(null,seq__21898_21918__$1);
var G__21920 = cljs.core.chunk_rest.call(null,seq__21898_21918__$1);
var G__21921 = c__7604__auto___21919;
var G__21922 = cljs.core.count.call(null,c__7604__auto___21919);
var G__21923 = (0);
seq__21898_21904 = G__21920;
chunk__21900_21905 = G__21921;
count__21901_21906 = G__21922;
i__21902_21907 = G__21923;
continue;
} else {
var r_21924 = cljs.core.first.call(null,seq__21898_21918__$1);
if(cljs.core.not.call(null,prev.call(null,r_21924))){
if(cljs.core.truth_(lt.util.cljs.str_contains_QMARK_.call(null,[cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(r_21924))].join(''),v))){
lt.util.dom.append.call(null,exact,lt.plugins.doc.search_item.call(null,r_21924));
} else {
lt.util.dom.append.call(null,normal,lt.plugins.doc.search_item.call(null,r_21924));
}

var G__21925 = cljs.core.next.call(null,seq__21898_21918__$1);
var G__21926 = null;
var G__21927 = (0);
var G__21928 = (0);
seq__21898_21904 = G__21925;
chunk__21900_21905 = G__21926;
count__21901_21906 = G__21927;
i__21902_21907 = G__21928;
continue;
} else {
var G__21929 = cljs.core.next.call(null,seq__21898_21918__$1);
var G__21930 = null;
var G__21931 = (0);
var G__21932 = (0);
seq__21898_21904 = G__21929;
chunk__21900_21905 = G__21930;
count__21901_21906 = G__21931;
i__21902_21907 = G__21932;
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
return (function (p1__21933_SHARP_){
return cljs.core.get.call(null,new cljs.core.Keyword(null,"file-types","file-types",457827029).cljs$core$IFn$_invoke$arity$1(p1__21933_SHARP_),ed_type);
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
var map__21936 = lt.plugins.doc.grouped_items.call(null,results,v,new cljs.core.Keyword(null,"results","results",-1134170113).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
var map__21936__$1 = ((((!((map__21936 == null)))?((((map__21936.cljs$lang$protocol_mask$partition0$ & (64))) || (map__21936.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__21936):map__21936);
var normal = cljs.core.get.call(null,map__21936__$1,new cljs.core.Keyword(null,"normal","normal",-1519123858));
var exact = cljs.core.get.call(null,map__21936__$1,new cljs.core.Keyword(null,"exact","exact",1438022323));
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
