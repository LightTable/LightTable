// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.objs.opener');
goog.require('cljs.core');
goog.require('lt.objs.sidebar.command');
goog.require('lt.objs.notifos');
goog.require('lt.objs.console');
goog.require('lt.objs.document');
goog.require('lt.objs.editor');
goog.require('lt.object');
goog.require('lt.objs.metrics');
goog.require('lt.util.dom');
goog.require('lt.util.cljs');
goog.require('lt.objs.app');
goog.require('lt.objs.popup');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.workspace');
goog.require('lt.objs.dialogs');
goog.require('lt.objs.tabs');
goog.require('lt.objs.files');
goog.require('lt.objs.editor.file');
goog.require('crate.binding');
lt.objs.opener.path__GT_info = (function lt$objs$opener$path__GT_info(path){
if(cljs.core.truth_(path)){
var type = lt.objs.files.path__GT_type.call(null,path);
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"name","name",1843675177),lt.objs.files.basename.call(null,path),new cljs.core.Keyword(null,"type-name","type-name",1911633753),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(type),new cljs.core.Keyword(null,"path","path",-188191168),path,new cljs.core.Keyword(null,"mime","mime",-1846414642),new cljs.core.Keyword(null,"mime","mime",-1846414642).cljs$core$IFn$_invoke$arity$1(type),new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.Keyword(null,"tags","tags",1771418977).cljs$core$IFn$_invoke$arity$1(type)], null);
} else {
return null;
}
});
lt.objs.opener.untitled_count = cljs.core.atom.call(null,(0));
/**
 * 
 */
lt.objs.opener.__BEH__open_transient_editor = (function lt$objs$opener$__BEH__open_transient_editor(this$,path,dirty_QMARK_){
var last = lt.objs.editor.pool.last_active.call(null);
var info = cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"mime","mime",-1846414642),"plaintext",new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"editor.plaintext","editor.plaintext",381169459)], null),new cljs.core.Keyword(null,"name","name",1843675177),[cljs.core.str("untitled-"),cljs.core.str(cljs.core.swap_BANG_.call(null,lt.objs.opener.untitled_count,cljs.core.inc))].join('')], null),lt.objs.opener.path__GT_info.call(null,path));
var ed = lt.objs.editor.pool.create.call(null,info);
lt.object.add_tags.call(null,ed,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"editor.transient","editor.transient",1298858095)], null));

lt.object.merge_BANG_.call(null,ed,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"dirty","dirty",729553281),dirty_QMARK_], null));

lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"open","open",-1763596448),ed);

lt.objs.tabs.add_BANG_.call(null,ed);

return lt.objs.tabs.active_BANG_.call(null,ed);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.opener","open-transient-editor","lt.objs.opener/open-transient-editor",-1675511524),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"new!","new!",-1640547457),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.opener.__BEH__open_transient_editor);
/**
 * 
 */
lt.objs.opener.__BEH__transient_save = (function lt$objs$opener$__BEH__transient_save(this$){
var path = (function (){var or__6793__auto__ = cljs.core.first.call(null,new cljs.core.Keyword(null,"folders","folders",44248772).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.workspace.current_ws)));
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return lt.objs.files.home.call(null);
}
})();
var info = new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$));
var fname = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(info);
var ext = (function (){var temp__4657__auto__ = new cljs.core.Keyword(null,"exts","exts",-946342126).cljs$core$IFn$_invoke$arity$1(info);
if(cljs.core.truth_(temp__4657__auto__)){
var e = temp__4657__auto__;
return [cljs.core.str("."),cljs.core.str(cljs.core.name.call(null,cljs.core.first.call(null,e)))].join('');
} else {
return null;
}
})();
return lt.objs.dialogs.save_as.call(null,this$,new cljs.core.Keyword(null,"save-as!","save-as!",-243702372),lt.objs.files.join.call(null,path,[cljs.core.str(fname),cljs.core.str(ext)].join('')));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.opener","transient-save","lt.objs.opener/transient-save",1806824208),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"save-as-rename!","save-as-rename!",-681882775),null,new cljs.core.Keyword(null,"save","save",1850079149),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.opener.__BEH__transient_save);
/**
 * 
 */
lt.objs.opener.__BEH__save_as_rename_BANG_ = (function lt$objs$opener$__BEH__save_as_rename_BANG_(this$){
return lt.objs.dialogs.save_as.call(null,this$,new cljs.core.Keyword(null,"save-as!","save-as!",-243702372),new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.opener","save-as-rename!","lt.objs.opener/save-as-rename!",-2112272872),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"save-as-rename!","save-as-rename!",-681882775),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.opener.__BEH__save_as_rename_BANG_);
/**
 * 
 */
lt.objs.opener.__BEH__save_as = (function lt$objs$opener$__BEH__save_as(this$,path){
if(!(cljs.core.empty_QMARK_.call(null,path))){
var type = lt.objs.files.path__GT_type.call(null,path);
var prev_tags = new cljs.core.Keyword(null,"tags","tags",1771418977).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
var mode = lt.objs.files.path__GT_mode.call(null,path);
var neue_doc = lt.objs.document.create.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"doc","doc",1913296891),lt.objs.editor.get_doc.call(null,this$),new cljs.core.Keyword(null,"line-ending","line-ending",1603768237),lt.objs.files.line_ending,new cljs.core.Keyword(null,"mtime","mtime",963165087),lt.objs.files.stats.call(null,path),new cljs.core.Keyword(null,"mime","mime",-1846414642),mode], null));
if(cljs.core.truth_(new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)))){
lt.object.raise.call(null,new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),new cljs.core.Keyword(null,"close.force","close.force",1317039245));
} else {
}

lt.objs.document.register_doc.call(null,neue_doc,path);

lt.object.update_BANG_.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",-317069002)], null),cljs.core.merge,lt.objs.opener.path__GT_info.call(null,path));

lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"dirty","dirty",729553281),true,new cljs.core.Keyword(null,"doc","doc",1913296891),neue_doc], null));

lt.objs.editor.set_mode.call(null,this$,mode);

lt.object.remove_tags.call(null,this$,cljs.core.conj.call(null,prev_tags,new cljs.core.Keyword(null,"editor.transient","editor.transient",1298858095)));

lt.object.add_tags.call(null,this$,cljs.core.conj.call(null,new cljs.core.Keyword(null,"tags","tags",1771418977).cljs$core$IFn$_invoke$arity$1(type),new cljs.core.Keyword(null,"editor.file-backed","editor.file-backed",-593706735)));

lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"save-as","save-as",-1722047792));

return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"save","save",1850079149));
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.opener","save-as","lt.objs.opener/save-as",2065542633),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"save-as!","save-as!",-243702372),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.opener.__BEH__save_as);
/**
 * 
 */
lt.objs.opener.__BEH__check_read_only = (function lt$objs$opener$__BEH__check_read_only(this$,ed){
var temp__4657__auto__ = new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed)));
if(cljs.core.truth_(temp__4657__auto__)){
var path = temp__4657__auto__;
if(cljs.core.truth_(lt.objs.files.exists_QMARK_.call(null,path))){
if(cljs.core.truth_(lt.objs.files.writable_QMARK_.call(null,path))){
return null;
} else {
return lt.object.add_tags.call(null,ed,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"editor.read-only","editor.read-only",1885839993)], null));
}
} else {
return null;
}
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.opener","check-read-only","lt.objs.opener/check-read-only",1104559356),new cljs.core.Keyword(null,"desc","desc",2093485764),"Opener: check if file is read only",new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"open","open",-1763596448),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.opener.__BEH__check_read_only);
/**
 * 
 */
lt.objs.opener.__BEH__open_from_info = (function lt$objs$opener$__BEH__open_from_info(obj,info){
var ed = lt.objs.editor.pool.create.call(null,info);
lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"open","open",-1763596448),ed);

lt.objs.tabs.add_BANG_.call(null,ed);

return lt.objs.tabs.active_BANG_.call(null,ed);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.opener","open-from-info","lt.objs.opener/open-from-info",-1046695679),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"open-info!","open-info!",1962239863),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.opener.__BEH__open_from_info);
lt.objs.opener.open_path_STAR_ = (function lt$objs$opener$open_path_STAR_(doc_fn,obj,path){
return doc_fn.call(null,path,(function (doc){
var type = lt.objs.files.path__GT_type.call(null,path);
var ed = lt.objs.editor.pool.create.call(null,cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"doc","doc",1913296891),doc,new cljs.core.Keyword(null,"line-ending","line-ending",1603768237),new cljs.core.Keyword(null,"line-ending","line-ending",1603768237).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,doc))], null),lt.objs.opener.path__GT_info.call(null,path)));
lt.objs.metrics.capture_BANG_.call(null,new cljs.core.Keyword(null,"editor.open","editor.open",-1014475526),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),(function (){var or__6793__auto__ = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(type);
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return lt.objs.files.ext.call(null,path);
}
})(),new cljs.core.Keyword(null,"lines","lines",-700165781),lt.objs.editor.last_line.call(null,ed)], null));

lt.object.add_tags.call(null,ed,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"editor.file-backed","editor.file-backed",-593706735)], null));

lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"open","open",-1763596448),ed);

lt.objs.tabs.add_BANG_.call(null,ed);

return lt.objs.tabs.active_BANG_.call(null,ed);
}));
});
/**
 * Open a path given an ::opener object and path
 */
lt.objs.opener.open_path = cljs.core.partial.call(null,lt.objs.opener.open_path_STAR_,lt.objs.document.open);
/**
 * Open a path as a linked doc given the editor with the document to be linked to.
 */
lt.objs.opener.open_linked_path = (function lt$objs$opener$open_linked_path(ed,obj,path,ldoc_options){
return lt.objs.opener.open_path_STAR_.call(null,cljs.core.partial.call(null,lt.objs.document.linked_open,ed,ldoc_options),obj,path);
});
/**
 * 
 */
lt.objs.opener.__BEH__existing_path_opens_linked_doc = (function lt$objs$opener$__BEH__existing_path_opens_linked_doc(this$,bool){
return lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"open-linked-doc","open-linked-doc",-1301456198),bool], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.opener","existing-path-opens-linked-doc","lt.objs.opener/existing-path-opens-linked-doc",-503631685),new cljs.core.Keyword(null,"exclusive","exclusive",-1507998718),true,new cljs.core.Keyword(null,"desc","desc",2093485764),"Doc: Open a linked document when the file is already opened",new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"object.instant","object.instant",-29936727),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.opener.__BEH__existing_path_opens_linked_doc);
/**
 * 
 */
lt.objs.opener.__BEH__open_standard_editor = (function lt$objs$opener$__BEH__open_standard_editor(obj,path){
if(cljs.core.not.call(null,lt.objs.files.file_QMARK_.call(null,path))){
if(cljs.core.truth_(lt.objs.files.dir_QMARK_.call(null,path))){
return lt.objs.notifos.set_msg_BANG_.call(null,[cljs.core.str("Cannot open a directory: "),cljs.core.str(path)].join(''));
} else {
return lt.objs.notifos.set_msg_BANG_.call(null,[cljs.core.str("No such file: "),cljs.core.str(path)].join(''));
}
} else {
var resolved_path = lt.objs.files.resolve.call(null,lt.objs.files.cwd,path);
var temp__4655__auto__ = cljs.core.first.call(null,lt.objs.editor.pool.by_path.call(null,resolved_path));
if(cljs.core.truth_(temp__4655__auto__)){
var ed = temp__4655__auto__;
if(cljs.core.truth_(new cljs.core.Keyword(null,"open-linked-doc","open-linked-doc",-1301456198).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,obj)))){
return lt.objs.opener.open_linked_path.call(null,ed,obj,resolved_path,cljs.core.PersistentArrayMap.EMPTY);
} else {
return lt.objs.tabs.active_BANG_.call(null,ed);
}
} else {
return lt.objs.opener.open_path.call(null,obj,resolved_path);
}
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.opener","open-standard-editor","lt.objs.opener/open-standard-editor",2017450813),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"open!","open!",1145596908),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.opener.__BEH__open_standard_editor);
/**
 * 
 */
lt.objs.opener.__BEH__track_open_files = (function lt$objs$opener$__BEH__track_open_files(this$,ed){
var temp__4657__auto__ = new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed)));
if(cljs.core.truth_(temp__4657__auto__)){
var path = temp__4657__auto__;
return lt.object.update_BANG_.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"open-files","open-files",-761921013)], null),cljs.core.conj,path);
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.opener","track-open-files","lt.objs.opener/track-open-files",-1394651081),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"open","open",-1763596448),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.opener.__BEH__track_open_files);
/**
 * 
 */
lt.objs.opener.__BEH__untrack_closed = (function lt$objs$opener$__BEH__untrack_closed(this$){
var temp__4657__auto__ = new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
if(cljs.core.truth_(temp__4657__auto__)){
var path = temp__4657__auto__;
return lt.object.update_BANG_.call(null,lt.objs.opener.opener,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"open-files","open-files",-761921013)], null),cljs.core.disj,new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))));
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.opener","untrack-closed","lt.objs.opener/untrack-closed",2118023469),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"destroy","destroy",-843660405),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.opener.__BEH__untrack_closed);
/**
 * 
 */
lt.objs.opener.__BEH__unwatch_closed = (function lt$objs$opener$__BEH__unwatch_closed(ed){
var temp__4657__auto__ = new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed)));
if(cljs.core.truth_(temp__4657__auto__)){
var path = temp__4657__auto__;
return lt.objs.workspace.unwatch_BANG_.call(null,new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed))));
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.opener","unwatch-closed","lt.objs.opener/unwatch-closed",1225534269),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"close.force","close.force",1317039245),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.opener.__BEH__unwatch_closed);
/**
 * 
 */
lt.objs.opener.__BEH__watch_on_open = (function lt$objs$opener$__BEH__watch_on_open(this$,ed){
var temp__4657__auto__ = new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed)));
if(cljs.core.truth_(temp__4657__auto__)){
var path = temp__4657__auto__;
return lt.objs.workspace.watch_BANG_.call(null,new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed))));
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.opener","watch-on-open","lt.objs.opener/watch-on-open",-412551804),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"open","open",-1763596448),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.opener.__BEH__watch_on_open);
/**
 * 
 */
lt.objs.opener.__BEH__watch_open_files = (function lt$objs$opener$__BEH__watch_open_files(this$,cur){
return cljs.core.concat.call(null,cur,new cljs.core.Keyword(null,"open-files","open-files",-761921013).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.opener.opener)));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.opener","watch-open-files","lt.objs.opener/watch-open-files",181346399),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"watch-paths+","watch-paths+",-81342563),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.opener.__BEH__watch_open_files);
/**
 * 
 */
lt.objs.opener.__BEH__save_on_focus_lost = (function lt$objs$opener$__BEH__save_on_focus_lost(this$){
if(cljs.core.truth_(lt.object.has_tag_QMARK_.call(null,this$,new cljs.core.Keyword(null,"editor","editor",-989377770)))){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"save","save",1850079149));
} else {
return lt.objs.sidebar.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"save","save",1850079149));
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.opener","save-on-focus-lost","lt.objs.opener/save-on-focus-lost",-1354527850),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Save on focus lost",new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"blur","blur",-453500461),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.opener.__BEH__save_on_focus_lost);
/**
 * 
 */
lt.objs.opener.__BEH__save_all_on_focus_lost = (function lt$objs$opener$__BEH__save_all_on_focus_lost(this$){
return lt.objs.sidebar.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"save-all","save-all",-1095821932));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.opener","save-all-on-focus-lost","lt.objs.opener/save-all-on-focus-lost",371673017),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Save all on focus lost",new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"blur","blur",-453500461),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.opener.__BEH__save_all_on_focus_lost);
/**
 * 
 */
lt.objs.opener.__BEH__save_failed = (function lt$objs$opener$__BEH__save_failed(this$,path,e){
return lt.objs.popup.popup_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"header","header",119441134),[cljs.core.str("Failed to save: "),cljs.core.str(lt.objs.files.basename.call(null,path))].join(''),new cljs.core.Keyword(null,"body","body",-2049205669),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pre","pre",2118456869),(cljs.core.truth_(e)?[cljs.core.str(e)].join(''):null)], null),new cljs.core.Keyword(null,"buttons","buttons",-1953831197),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1718410804),"cancel"], null)], null)], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.opener","save-failed","lt.objs.opener/save-failed",1202789005),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"files.save.error","files.save.error",-359859819),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.opener.__BEH__save_failed);
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.opener","opener","lt.objs.opener/opener",1468024140),new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"opener","opener",1027381943),null], null), null),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),cljs.core.PersistentHashSet.EMPTY,new cljs.core.Keyword(null,"open-files","open-files",-761921013),cljs.core.PersistentHashSet.EMPTY,new cljs.core.Keyword(null,"behaviors","behaviors",120724909),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("lt.objs.opener","open-standard-editor","lt.objs.opener/open-standard-editor",2017450813)], null),new cljs.core.Keyword(null,"init","init",-1875481434),(function (this$){
return null;
}));
lt.objs.opener.opener = lt.object.create.call(null,new cljs.core.Keyword("lt.objs.opener","opener","lt.objs.opener/opener",1468024140));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"new-file","new-file",1507201273),new cljs.core.Keyword(null,"desc","desc",2093485764),"File: New file",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (dirty_QMARK_){
return lt.object.raise.call(null,lt.objs.opener.opener,new cljs.core.Keyword(null,"new!","new!",-1640547457),null,dirty_QMARK_);
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"open-file","open-file",-895422430),new cljs.core.Keyword(null,"desc","desc",2093485764),"File: Open file",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.objs.dialogs.file.call(null,lt.objs.opener.opener,new cljs.core.Keyword(null,"open!","open!",1145596908));
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"open-path","open-path",2082525233),new cljs.core.Keyword(null,"desc","desc",2093485764),"File: Open path",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (path){
return lt.object.raise.call(null,lt.objs.opener.opener,new cljs.core.Keyword(null,"open!","open!",1145596908),path);
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"save","save",1850079149),new cljs.core.Keyword(null,"desc","desc",2093485764),"File: Save file",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
return lt.object.raise.call(null,ed,new cljs.core.Keyword(null,"save","save",1850079149));
} else {
return null;
}
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"save-all","save-all",-1095821932),new cljs.core.Keyword(null,"desc","desc",2093485764),"File: Save all",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var seq__16505 = cljs.core.seq.call(null,lt.object.by_tag.call(null,new cljs.core.Keyword(null,"editor.file-backed","editor.file-backed",-593706735)));
var chunk__16507 = null;
var count__16508 = (0);
var i__16509 = (0);
while(true){
if((i__16509 < count__16508)){
var ed = cljs.core._nth.call(null,chunk__16507,i__16509);
if(cljs.core.truth_(new cljs.core.Keyword(null,"dirty","dirty",729553281).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed)))){
lt.object.raise.call(null,ed,new cljs.core.Keyword(null,"save","save",1850079149));

var G__16511 = seq__16505;
var G__16512 = chunk__16507;
var G__16513 = count__16508;
var G__16514 = (i__16509 + (1));
seq__16505 = G__16511;
chunk__16507 = G__16512;
count__16508 = G__16513;
i__16509 = G__16514;
continue;
} else {
var G__16515 = seq__16505;
var G__16516 = chunk__16507;
var G__16517 = count__16508;
var G__16518 = (i__16509 + (1));
seq__16505 = G__16515;
chunk__16507 = G__16516;
count__16508 = G__16517;
i__16509 = G__16518;
continue;
}
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__16505);
if(temp__4657__auto__){
var seq__16505__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__16505__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__16505__$1);
var G__16519 = cljs.core.chunk_rest.call(null,seq__16505__$1);
var G__16520 = c__7604__auto__;
var G__16521 = cljs.core.count.call(null,c__7604__auto__);
var G__16522 = (0);
seq__16505 = G__16519;
chunk__16507 = G__16520;
count__16508 = G__16521;
i__16509 = G__16522;
continue;
} else {
var ed = cljs.core.first.call(null,seq__16505__$1);
if(cljs.core.truth_(new cljs.core.Keyword(null,"dirty","dirty",729553281).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed)))){
lt.object.raise.call(null,ed,new cljs.core.Keyword(null,"save","save",1850079149));

var G__16523 = cljs.core.next.call(null,seq__16505__$1);
var G__16524 = null;
var G__16525 = (0);
var G__16526 = (0);
seq__16505 = G__16523;
chunk__16507 = G__16524;
count__16508 = G__16525;
i__16509 = G__16526;
continue;
} else {
var G__16527 = cljs.core.next.call(null,seq__16505__$1);
var G__16528 = null;
var G__16529 = (0);
var G__16530 = (0);
seq__16505 = G__16527;
chunk__16507 = G__16528;
count__16508 = G__16529;
i__16509 = G__16530;
continue;
}
}
} else {
return null;
}
}
break;
}
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"save-as","save-as",-1722047792),new cljs.core.Keyword(null,"desc","desc",2093485764),"File: Save file as..",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
return lt.object.raise.call(null,ed,new cljs.core.Keyword(null,"save-as-rename!","save-as-rename!",-681882775));
} else {
return null;
}
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"opener.open-info","opener.open-info",1573577989),new cljs.core.Keyword(null,"desc","desc",2093485764),"Opener: open info",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (info){
return lt.object.raise.call(null,lt.objs.opener.opener,new cljs.core.Keyword(null,"open-info!","open-info!",1962239863),info);
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"opener.open-linked-doc","opener.open-linked-doc",1049442181),new cljs.core.Keyword(null,"desc","desc",2093485764),"File: Open another view of current file",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var ed = lt.objs.editor.pool.last_active.call(null);
return lt.objs.opener.open_linked_path.call(null,ed,lt.objs.opener.opener,cljs.core.get_in.call(null,cljs.core.deref.call(null,ed),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",-317069002),new cljs.core.Keyword(null,"path","path",-188191168)], null)),cljs.core.PersistentArrayMap.EMPTY);
})], null));
window.ondrop = (function (e){
try{var size = e.dataTransfer.files.length;
var i = (0);
while(true){
if((i < size)){
lt.object.raise.call(null,lt.objs.opener.opener,new cljs.core.Keyword(null,"open!","open!",1145596908),(e.dataTransfer.files[i]).path);

var G__16532 = (i + (1));
i = G__16532;
continue;
} else {
return null;
}
break;
}
}catch (e16531){var err = e16531;
return lt.objs.console.error.call(null,err);
}});
