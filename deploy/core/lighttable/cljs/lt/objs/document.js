// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.objs.document');
goog.require('cljs.core');
goog.require('lt.object');
goog.require('lt.objs.files');
goog.require('lt.objs.popup');
lt.objs.document.doc_keys = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"line-ending","line-ending",1603768237),new cljs.core.Keyword(null,"mime","mime",-1846414642)], null);
lt.objs.document.create_STAR_ = (function lt$objs$document$create_STAR_(info){
return CodeMirror.Doc(new cljs.core.Keyword(null,"content","content",15833224).cljs$core$IFn$_invoke$arity$1(info),new cljs.core.Keyword(null,"mime","mime",-1846414642).cljs$core$IFn$_invoke$arity$1(info));
});
lt.objs.document.__GT_cm_doc = (function lt$objs$document$__GT_cm_doc(doc){
return new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,doc));
});
lt.objs.document.linked_STAR_ = (function lt$objs$document$linked_STAR_(doc,info){
var map__15550 = info;
var map__15550__$1 = ((((!((map__15550 == null)))?((((map__15550.cljs$lang$protocol_mask$partition0$ & (64))) || (map__15550.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15550):map__15550);
var from = cljs.core.get.call(null,map__15550__$1,new cljs.core.Keyword(null,"from","from",1815293044));
var to = cljs.core.get.call(null,map__15550__$1,new cljs.core.Keyword(null,"to","to",192099007));
var shared_history = cljs.core.get.call(null,map__15550__$1,new cljs.core.Keyword(null,"shared-history","shared-history",1034441328));
var type = cljs.core.get.call(null,map__15550__$1,new cljs.core.Keyword(null,"type","type",1174270348));
return lt.objs.document.__GT_cm_doc.call(null,doc).linkedDoc(cljs.core.clj__GT_js.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"from","from",1815293044),from,new cljs.core.Keyword(null,"to","to",192099007),to,new cljs.core.Keyword(null,"sharedHist","sharedHist",-86352352),shared_history,new cljs.core.Keyword(null,"mode","mode",654403691),type], null)));
});
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.document","document","lt.objs.document/document",-1581261284),new cljs.core.Keyword(null,"sub-docs","sub-docs",1634980346),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("lt.objs.document","this","lt.objs.document/this",-896546608),null], null), null),new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"document","document",-1329188687),null], null), null),new cljs.core.Keyword(null,"init","init",-1875481434),(function (this$,info){
lt.object.merge_BANG_.call(null,this$,cljs.core.merge.call(null,cljs.core.dissoc.call(null,info,new cljs.core.Keyword(null,"content","content",15833224)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"doc","doc",1913296891),(function (){var or__6793__auto__ = new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(info);
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return lt.objs.document.create_STAR_.call(null,info);
}
})()], null)));

return null;
}));
/**
 * 
 */
lt.objs.document.__BEH__close_document_on_editor_close = (function lt$objs$document$__BEH__close_document_on_editor_close(editor){
var temp__4657__auto__ = new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,editor));
if(cljs.core.truth_(temp__4657__auto__)){
var doc = temp__4657__auto__;
return lt.object.raise.call(null,doc,new cljs.core.Keyword(null,"close.force","close.force",1317039245));
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.document","close-document-on-editor-close","lt.objs.document/close-document-on-editor-close",1175883758),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"closed","closed",-919675359),null], null), null),new cljs.core.Keyword(null,"for","for",-1323786319),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor","editor",-989377770),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.document.__BEH__close_document_on_editor_close);
/**
 * 
 */
lt.objs.document.__BEH__close_linked_document = (function lt$objs$document$__BEH__close_linked_document(this$){
var temp__4657__auto___15552 = new cljs.core.Keyword(null,"root","root",-448657453).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$));
if(cljs.core.truth_(temp__4657__auto___15552)){
var root_15553 = temp__4657__auto___15552;
lt.objs.document.__GT_cm_doc.call(null,this$).unlinkDoc(lt.objs.document.__GT_cm_doc.call(null,root_15553));

lt.object.update_BANG_.call(null,root_15553,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sub-docs","sub-docs",1634980346)], null),cljs.core.disj,this$);
} else {
}

return lt.object.destroy_BANG_.call(null,this$);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.document","close-linked-document","lt.objs.document/close-linked-document",822403475),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"close.force","close.force",1317039245),null], null), null),new cljs.core.Keyword(null,"for","for",-1323786319),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"document","document",-1329188687),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.document.__BEH__close_linked_document);
/**
 * 
 */
lt.objs.document.__BEH__try_close_root_document = (function lt$objs$document$__BEH__try_close_root_document(this$){
if(cljs.core._EQ_.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("lt.objs.document","this","lt.objs.document/this",-896546608),null], null), null),new cljs.core.Keyword(null,"sub-docs","sub-docs",1634980346).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)))){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"close.force","close.force",1317039245));
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.document","try-close-root-document","lt.objs.document/try-close-root-document",1801961925),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"try-close","try-close",-2043616338),null], null), null),new cljs.core.Keyword(null,"for","for",-1323786319),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"document","document",-1329188687),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.document.__BEH__try_close_root_document);
/**
 * 
 */
lt.objs.document.__BEH__close_root_document = (function lt$objs$document$__BEH__close_root_document(this$){
if((cljs.core._EQ_.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("lt.objs.document","this","lt.objs.document/this",-896546608),null], null), null),new cljs.core.Keyword(null,"sub-docs","sub-docs",1634980346).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)))) && (cljs.core.not.call(null,lt.object.has_tag_QMARK_.call(null,this$,new cljs.core.Keyword(null,"document.linked","document.linked",116988911))))){
return lt.object.destroy_BANG_.call(null,this$);
} else {
return lt.object.update_BANG_.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sub-docs","sub-docs",1634980346)], null),cljs.core.disj,new cljs.core.Keyword("lt.objs.document","this","lt.objs.document/this",-896546608));
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.document","close-root-document","lt.objs.document/close-root-document",-628815912),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"close.force","close.force",1317039245),null], null), null),new cljs.core.Keyword(null,"for","for",-1323786319),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"document","document",-1329188687),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.document.__BEH__close_root_document);
lt.objs.document.default_linked_doc_options = cljs.core.PersistentArrayMap.EMPTY;
/**
 * 
 */
lt.objs.document.__BEH__set_linked_doc_options = (function lt$objs$document$__BEH__set_linked_doc_options(this$,opts){
return lt.objs.document.default_linked_doc_options = opts;
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.document","set-linked-doc-options","lt.objs.document/set-linked-doc-options",766394405),new cljs.core.Keyword(null,"exclusive","exclusive",-1507998718),true,new cljs.core.Keyword(null,"desc","desc",2093485764),"Doc: Set default options for new linked docs",new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"object.instant","object.instant",-29936727),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.document.__BEH__set_linked_doc_options);
lt.objs.document.create = (function lt$objs$document$create(info){
return lt.object.create.call(null,new cljs.core.Keyword("lt.objs.document","document","lt.objs.document/document",-1581261284),info);
});
lt.objs.document.create_sub = (function lt$objs$document$create_sub(var_args){
var args15554 = [];
var len__7868__auto___15557 = arguments.length;
var i__7869__auto___15558 = (0);
while(true){
if((i__7869__auto___15558 < len__7868__auto___15557)){
args15554.push((arguments[i__7869__auto___15558]));

var G__15559 = (i__7869__auto___15558 + (1));
i__7869__auto___15558 = G__15559;
continue;
} else {
}
break;
}

var G__15556 = args15554.length;
switch (G__15556) {
case 1:
return lt.objs.document.create_sub.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return lt.objs.document.create_sub.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args15554.length)].join('')));

}
});

lt.objs.document.create_sub.cljs$core$IFn$_invoke$arity$1 = (function (doc){
return lt.objs.document.create_sub.call(null,doc,null);
});

lt.objs.document.create_sub.cljs$core$IFn$_invoke$arity$2 = (function (doc,info){
var info__$1 = cljs.core.merge.call(null,lt.objs.document.default_linked_doc_options,info);
var neue = lt.objs.document.create.call(null,cljs.core.merge.call(null,cljs.core.select_keys.call(null,cljs.core.deref.call(null,doc),lt.objs.document.doc_keys),info__$1,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"doc","doc",1913296891),lt.objs.document.linked_STAR_.call(null,doc,info__$1),new cljs.core.Keyword(null,"root","root",-448657453),doc], null)));
lt.object.add_tags.call(null,neue,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"document.linked","document.linked",116988911)], null));

return lt.object.update_BANG_.call(null,doc,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sub-docs","sub-docs",1634980346)], null),cljs.core.conj,neue);
});

lt.objs.document.create_sub.cljs$lang$maxFixedArity = 2;

lt.objs.document.__GT_snapshot = (function lt$objs$document$__GT_snapshot(doc){
var d = lt.objs.document.__GT_cm_doc.call(null,doc);
var lines = cljs.core.transient$.call(null,cljs.core.PersistentVector.EMPTY);
d.eachLine(((function (d,lines){
return (function (line){
cljs.core.conj_BANG_.call(null,lines,line.text);

return null;
});})(d,lines))
);

return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"version","version",425292698),d.changeGeneration(),new cljs.core.Keyword(null,"lines","lines",-700165781),cljs.core.persistent_BANG_.call(null,lines),new cljs.core.Keyword(null,"doc","doc",1913296891),doc], null);
});
lt.objs.document.latest_snapshot_QMARK_ = (function lt$objs$document$latest_snapshot_QMARK_(snapshot){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"version","version",425292698).cljs$core$IFn$_invoke$arity$1(snapshot),lt.objs.document.__GT_cm_doc.call(null,new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(snapshot)).changeGeneration());
});
lt.objs.document.__GT_val = (function lt$objs$document$__GT_val(doc){
return lt.objs.document.__GT_cm_doc.call(null,doc).getValue();
});
lt.objs.document.set_val = (function lt$objs$document$set_val(doc,v){
return lt.objs.document.__GT_cm_doc.call(null,doc).setValue(v);
});
lt.objs.document.replace = (function lt$objs$document$replace(var_args){
var args15561 = [];
var len__7868__auto___15564 = arguments.length;
var i__7869__auto___15565 = (0);
while(true){
if((i__7869__auto___15565 < len__7868__auto___15564)){
args15561.push((arguments[i__7869__auto___15565]));

var G__15566 = (i__7869__auto___15565 + (1));
i__7869__auto___15565 = G__15566;
continue;
} else {
}
break;
}

var G__15563 = args15561.length;
switch (G__15563) {
case 3:
return lt.objs.document.replace.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return lt.objs.document.replace.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args15561.length)].join('')));

}
});

lt.objs.document.replace.cljs$core$IFn$_invoke$arity$3 = (function (d,from,v){
return lt.objs.document.__GT_cm_doc.call(null,d).replaceRange(v,cljs.core.clj__GT_js.call(null,from));
});

lt.objs.document.replace.cljs$core$IFn$_invoke$arity$4 = (function (d,from,to,v){
return lt.objs.document.__GT_cm_doc.call(null,d).replaceRange(v,cljs.core.clj__GT_js.call(null,from),cljs.core.clj__GT_js.call(null,to));
});

lt.objs.document.replace.cljs$lang$maxFixedArity = 4;

lt.objs.document.register_doc = (function lt$objs$document$register_doc(doc,path){
return lt.object.update_BANG_.call(null,lt.objs.document.manager,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"files","files",-472457450)], null),cljs.core.assoc,path,doc);
});
lt.objs.document.open = (function lt$objs$document$open(path,cb){
return lt.objs.files.open.call(null,path,(function (data){
var d = lt.objs.document.create.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"content","content",15833224),new cljs.core.Keyword(null,"content","content",15833224).cljs$core$IFn$_invoke$arity$1(data),new cljs.core.Keyword(null,"line-ending","line-ending",1603768237),new cljs.core.Keyword(null,"line-ending","line-ending",1603768237).cljs$core$IFn$_invoke$arity$1(data),new cljs.core.Keyword(null,"mtime","mtime",963165087),lt.objs.files.stats.call(null,path),new cljs.core.Keyword(null,"mime","mime",-1846414642),new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(data)], null));
lt.objs.document.register_doc.call(null,d,path);

if(cljs.core.truth_(cb)){
return cb.call(null,d);
} else {
return null;
}
}));
});
lt.objs.document.linked_open = (function lt$objs$document$linked_open(ed,ldoc_options,path,cb){
lt.objs.document.create_sub.call(null,new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed)),ldoc_options);

return lt.objs.files.open.call(null,path,(function (data){
var d = cljs.core.last.call(null,new cljs.core.Keyword(null,"sub-docs","sub-docs",1634980346).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed)))));
if(cljs.core.truth_(cb)){
return cb.call(null,d);
} else {
return null;
}
}));
});
lt.objs.document.check_mtime = (function lt$objs$document$check_mtime(prev,updated){
if(cljs.core.truth_((function (){var and__6781__auto__ = prev;
if(cljs.core.truth_(and__6781__auto__)){
return updated;
} else {
return and__6781__auto__;
}
})())){
return cljs.core._EQ_.call(null,prev.mtime.getTime(),updated.mtime.getTime());
} else {
return true;
}
});
/**
 * 
 */
lt.objs.document.button = (function lt$objs$document$button(var_args){
var args__7875__auto__ = [];
var len__7868__auto___15584 = arguments.length;
var i__7869__auto___15585 = (0);
while(true){
if((i__7869__auto___15585 < len__7868__auto___15584)){
args__7875__auto__.push((arguments[i__7869__auto___15585]));

var G__15586 = (i__7869__auto___15585 + (1));
i__7869__auto___15585 = G__15586;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((1) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((1)),(0),null)):null);
return lt.objs.document.button.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7876__auto__);
});

lt.objs.document.button.cljs$core$IFn$_invoke$arity$variadic = (function (label,p__15570){
var vec__15571 = p__15570;
var cb = cljs.core.nth.call(null,vec__15571,(0),null);
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.button.right","div.button.right",1623860542),label], null));
var seq__15574_15587 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__,vec__15571,cb){
return (function (){
if(cljs.core.truth_(cb)){
return cb.call(null);
} else {
return null;
}
});})(e__7942__auto__,vec__15571,cb))
], null)));
var chunk__15575_15588 = null;
var count__15576_15589 = (0);
var i__15577_15590 = (0);
while(true){
if((i__15577_15590 < count__15576_15589)){
var vec__15578_15591 = cljs.core._nth.call(null,chunk__15575_15588,i__15577_15590);
var ev__7943__auto___15592 = cljs.core.nth.call(null,vec__15578_15591,(0),null);
var func__7944__auto___15593 = cljs.core.nth.call(null,vec__15578_15591,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___15592,func__7944__auto___15593);

var G__15594 = seq__15574_15587;
var G__15595 = chunk__15575_15588;
var G__15596 = count__15576_15589;
var G__15597 = (i__15577_15590 + (1));
seq__15574_15587 = G__15594;
chunk__15575_15588 = G__15595;
count__15576_15589 = G__15596;
i__15577_15590 = G__15597;
continue;
} else {
var temp__4657__auto___15598 = cljs.core.seq.call(null,seq__15574_15587);
if(temp__4657__auto___15598){
var seq__15574_15599__$1 = temp__4657__auto___15598;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15574_15599__$1)){
var c__7604__auto___15600 = cljs.core.chunk_first.call(null,seq__15574_15599__$1);
var G__15601 = cljs.core.chunk_rest.call(null,seq__15574_15599__$1);
var G__15602 = c__7604__auto___15600;
var G__15603 = cljs.core.count.call(null,c__7604__auto___15600);
var G__15604 = (0);
seq__15574_15587 = G__15601;
chunk__15575_15588 = G__15602;
count__15576_15589 = G__15603;
i__15577_15590 = G__15604;
continue;
} else {
var vec__15581_15605 = cljs.core.first.call(null,seq__15574_15599__$1);
var ev__7943__auto___15606 = cljs.core.nth.call(null,vec__15581_15605,(0),null);
var func__7944__auto___15607 = cljs.core.nth.call(null,vec__15581_15605,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___15606,func__7944__auto___15607);

var G__15608 = cljs.core.next.call(null,seq__15574_15599__$1);
var G__15609 = null;
var G__15610 = (0);
var G__15611 = (0);
seq__15574_15587 = G__15608;
chunk__15575_15588 = G__15609;
count__15576_15589 = G__15610;
i__15577_15590 = G__15611;
continue;
}
} else {
}
}
break;
}

return e__7942__auto__;
});

lt.objs.document.button.cljs$lang$maxFixedArity = (1);

lt.objs.document.button.cljs$lang$applyTo = (function (seq15568){
var G__15569 = cljs.core.first.call(null,seq15568);
var seq15568__$1 = cljs.core.next.call(null,seq15568);
return lt.objs.document.button.cljs$core$IFn$_invoke$arity$variadic(G__15569,seq15568__$1);
});

lt.objs.document.overwrite_warn = (function lt$objs$document$overwrite_warn(cb){
return lt.objs.popup.popup_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"header","header",119441134),"This file was modified.",new cljs.core.Keyword(null,"body","body",-2049205669),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"It looks like this file was modified outside of Light Table and saving\n                  would overwrite those changes. Do you want to overwrite or cancel?"], null),new cljs.core.Keyword(null,"buttons","buttons",-1953831197),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"Overwrite file",new cljs.core.Keyword(null,"action","action",-811238024),cb], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1718410804),"Cancel"], null)], null)], null));
});
lt.objs.document.path__GT_doc = (function lt$objs$document$path__GT_doc(path){
return cljs.core.get.call(null,new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.document.manager)),path);
});
lt.objs.document.__GT_stats = (function lt$objs$document$__GT_stats(path){
return new cljs.core.Keyword(null,"mtime","mtime",963165087).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.document.path__GT_doc.call(null,path)));
});
lt.objs.document.update_stats = (function lt$objs$document$update_stats(path){
return lt.object.merge_BANG_.call(null,cljs.core.get_in.call(null,cljs.core.deref.call(null,lt.objs.document.manager),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"files","files",-472457450),path], null)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mtime","mtime",963165087),lt.objs.files.stats.call(null,path)], null));
});
lt.objs.document.move_doc = (function lt$objs$document$move_doc(old,neue){
var temp__4657__auto__ = lt.objs.document.path__GT_doc.call(null,old);
if(cljs.core.truth_(temp__4657__auto__)){
var old_d = temp__4657__auto__;
lt.object.update_BANG_.call(null,lt.objs.document.manager,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"files","files",-472457450)], null),cljs.core.assoc,neue,old_d);

lt.object.update_BANG_.call(null,lt.objs.document.manager,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"files","files",-472457450)], null),cljs.core.dissoc,old);

return lt.objs.document.update_stats.call(null,neue);
} else {
return null;
}
});
lt.objs.document.save_STAR_ = (function lt$objs$document$save_STAR_(path,content,cb){
return lt.objs.files.save.call(null,path,content,(function (data){
lt.objs.document.update_stats.call(null,path);

if(cljs.core.truth_(cb)){
return cb.call(null,data);
} else {
return null;
}
}));
});
lt.objs.document.save = (function lt$objs$document$save(path,content,cb){
var updated = lt.objs.files.stats.call(null,path);
var safe_QMARK_ = lt.objs.document.check_mtime.call(null,lt.objs.document.__GT_stats.call(null,path),updated);
if(cljs.core.not.call(null,safe_QMARK_)){
return lt.objs.document.overwrite_warn.call(null,((function (updated,safe_QMARK_){
return (function (){
return lt.objs.document.save_STAR_.call(null,path,content,cb);
});})(updated,safe_QMARK_))
);
} else {
return lt.objs.document.save_STAR_.call(null,path,content,cb);
}
});
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.document","doc-manager","lt.objs.document/doc-manager",-1062787319),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"behaviors","behaviors",120724909),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"files","files",-472457450),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"init","init",-1875481434),(function (){
return null;
}));
lt.objs.document.manager = lt.object.create.call(null,new cljs.core.Keyword("lt.objs.document","doc-manager","lt.objs.document/doc-manager",-1062787319));
