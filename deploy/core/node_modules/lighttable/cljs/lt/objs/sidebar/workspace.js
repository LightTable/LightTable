// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.objs.sidebar.workspace');
goog.require('cljs.core');
goog.require('lt.objs.command');
goog.require('lt.objs.context');
goog.require('lt.objs.opener');
goog.require('lt.object');
goog.require('lt.util.dom');
goog.require('lt.util.cljs');
goog.require('lt.objs.menu');
goog.require('lt.objs.popup');
goog.require('lt.objs.workspace');
goog.require('lt.objs.dialogs');
goog.require('lt.objs.files');
goog.require('lt.objs.sidebar');
goog.require('clojure.string');
goog.require('lt.objs.document');
goog.require('crate.binding');
lt.objs.sidebar.workspace.files_and_folders = (function lt$objs$sidebar$workspace$files_and_folders(path){
var fs = lt.objs.workspace.files_and_folders.call(null,path);
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"files","files",-472457450),cljs.core.mapv.call(null,((function (fs){
return (function (p1__21930_SHARP_){
return lt.object.create.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","workspace.file","lt.objs.sidebar.workspace/workspace.file",-188628499),p1__21930_SHARP_);
});})(fs))
,new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(fs)),new cljs.core.Keyword(null,"folders","folders",44248772),cljs.core.mapv.call(null,((function (fs){
return (function (p1__21931_SHARP_){
return lt.object.create.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","workspace.folder","lt.objs.sidebar.workspace/workspace.folder",-483966665),p1__21931_SHARP_);
});})(fs))
,new cljs.core.Keyword(null,"folders","folders",44248772).cljs$core$IFn$_invoke$arity$1(fs))], null);
});
lt.objs.sidebar.workspace.root_folder = (function lt$objs$sidebar$workspace$root_folder(path){
return lt.object.add_tags.call(null,lt.object.create.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","workspace.folder","lt.objs.sidebar.workspace/workspace.folder",-483966665),path),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"workspace.folder.root","workspace.folder.root",-1531354287)], null));
});
lt.objs.sidebar.workspace.root_file = (function lt$objs$sidebar$workspace$root_file(path){
return lt.object.add_tags.call(null,lt.object.create.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","workspace.file","lt.objs.sidebar.workspace/workspace.file",-188628499),path),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"workspace.file.root","workspace.file.root",-569371600)], null));
});
lt.objs.sidebar.workspace.remove_child = (function lt$objs$sidebar$workspace$remove_child(p,child){
if(cljs.core.truth_(lt.object.has_tag_QMARK_.call(null,child,new cljs.core.Keyword(null,"workspace.file","workspace.file",-1996295850)))){
return lt.object.update_BANG_.call(null,p,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"files","files",-472457450)], null),(function (cur){
return cljs.core.vec.call(null,cljs.core.remove.call(null,cljs.core.PersistentHashSet.fromArray([child], true),cur));
}));
} else {
return lt.object.update_BANG_.call(null,p,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"folders","folders",44248772)], null),(function (cur){
return cljs.core.vec.call(null,cljs.core.remove.call(null,cljs.core.PersistentHashSet.fromArray([child], true),cur));
}));
}
});
lt.objs.sidebar.workspace.find_by_path = (function lt$objs$sidebar$workspace$find_by_path(path){
return cljs.core.first.call(null,cljs.core.filter.call(null,(function (p1__21932_SHARP_){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,p1__21932_SHARP_)),path);
}),lt.object.by_tag.call(null,new cljs.core.Keyword(null,"tree-item","tree-item",1467250318))));
});
/**
 * 
 */
lt.objs.sidebar.workspace.__BEH__add_ws_folder = (function lt$objs$sidebar$workspace$__BEH__add_ws_folder(this$,path){
return lt.object.raise.call(null,lt.objs.workspace.current_ws,new cljs.core.Keyword(null,"add.folder!","add.folder!",755480535),path);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","add-ws-folder","lt.objs.sidebar.workspace/add-ws-folder",-1225213429),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"workspace.add.folder!","workspace.add.folder!",-291748281),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.workspace.__BEH__add_ws_folder);
/**
 * 
 */
lt.objs.sidebar.workspace.__BEH__add_ws_file = (function lt$objs$sidebar$workspace$__BEH__add_ws_file(this$,path){
lt.object.raise.call(null,lt.objs.workspace.current_ws,new cljs.core.Keyword(null,"add.file!","add.file!",-439765985),path);

return lt.object.raise.call(null,cljs.core.first.call(null,lt.object.by_tag.call(null,new cljs.core.Keyword(null,"opener","opener",1027381943))),new cljs.core.Keyword(null,"open!","open!",1145596908),path);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","add-ws-file","lt.objs.sidebar.workspace/add-ws-file",-1314854103),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"workspace.add.file!","workspace.add.file!",-382028482),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.workspace.__BEH__add_ws_file);
/**
 * 
 */
lt.objs.sidebar.workspace.__BEH__on_open_ls = (function lt$objs$sidebar$workspace$__BEH__on_open_ls(this$){
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"open?","open?",1238443125),true], null));

if(cljs.core.truth_(new cljs.core.Keyword(null,"realized?","realized?",-1433302186).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)))){
return null;
} else {
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"realized?","realized?",-1433302186),true], null));

lt.object.merge_BANG_.call(null,this$,lt.objs.sidebar.workspace.files_and_folders.call(null,new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))));

var folder = lt.util.dom.$.call(null,new cljs.core.Keyword(null,"ul","ul",-1349521403),lt.object.__GT_content.call(null,this$));
var width = lt.util.dom.scroll_width.call(null,folder);
var seq__21937 = cljs.core.seq.call(null,lt.util.dom.children.call(null,folder));
var chunk__21938 = null;
var count__21939 = (0);
var i__21940 = (0);
while(true){
if((i__21940 < count__21939)){
var child = cljs.core._nth.call(null,chunk__21938,i__21940);
lt.util.dom.css.call(null,child,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"width","width",-384071477),width], null));

var G__21941 = seq__21937;
var G__21942 = chunk__21938;
var G__21943 = count__21939;
var G__21944 = (i__21940 + (1));
seq__21937 = G__21941;
chunk__21938 = G__21942;
count__21939 = G__21943;
i__21940 = G__21944;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__21937);
if(temp__4657__auto__){
var seq__21937__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__21937__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__21937__$1);
var G__21945 = cljs.core.chunk_rest.call(null,seq__21937__$1);
var G__21946 = c__7604__auto__;
var G__21947 = cljs.core.count.call(null,c__7604__auto__);
var G__21948 = (0);
seq__21937 = G__21945;
chunk__21938 = G__21946;
count__21939 = G__21947;
i__21940 = G__21948;
continue;
} else {
var child = cljs.core.first.call(null,seq__21937__$1);
lt.util.dom.css.call(null,child,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"width","width",-384071477),width], null));

var G__21949 = cljs.core.next.call(null,seq__21937__$1);
var G__21950 = null;
var G__21951 = (0);
var G__21952 = (0);
seq__21937 = G__21949;
chunk__21938 = G__21950;
count__21939 = G__21951;
i__21940 = G__21952;
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

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","on-open-ls","lt.objs.sidebar.workspace/on-open-ls",1427894438),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"open!","open!",1145596908),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.workspace.__BEH__on_open_ls);
/**
 * 
 */
lt.objs.sidebar.workspace.__BEH__refresh = (function lt$objs$sidebar$workspace$__BEH__refresh(this$){
var seq__21957_21961 = cljs.core.seq.call(null,cljs.core.concat.call(null,new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),new cljs.core.Keyword(null,"folders","folders",44248772).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))));
var chunk__21958_21962 = null;
var count__21959_21963 = (0);
var i__21960_21964 = (0);
while(true){
if((i__21960_21964 < count__21959_21963)){
var f_21965 = cljs.core._nth.call(null,chunk__21958_21962,i__21960_21964);
lt.object.destroy_BANG_.call(null,f_21965);

var G__21966 = seq__21957_21961;
var G__21967 = chunk__21958_21962;
var G__21968 = count__21959_21963;
var G__21969 = (i__21960_21964 + (1));
seq__21957_21961 = G__21966;
chunk__21958_21962 = G__21967;
count__21959_21963 = G__21968;
i__21960_21964 = G__21969;
continue;
} else {
var temp__4657__auto___21970 = cljs.core.seq.call(null,seq__21957_21961);
if(temp__4657__auto___21970){
var seq__21957_21971__$1 = temp__4657__auto___21970;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__21957_21971__$1)){
var c__7604__auto___21972 = cljs.core.chunk_first.call(null,seq__21957_21971__$1);
var G__21973 = cljs.core.chunk_rest.call(null,seq__21957_21971__$1);
var G__21974 = c__7604__auto___21972;
var G__21975 = cljs.core.count.call(null,c__7604__auto___21972);
var G__21976 = (0);
seq__21957_21961 = G__21973;
chunk__21958_21962 = G__21974;
count__21959_21963 = G__21975;
i__21960_21964 = G__21976;
continue;
} else {
var f_21977 = cljs.core.first.call(null,seq__21957_21971__$1);
lt.object.destroy_BANG_.call(null,f_21977);

var G__21978 = cljs.core.next.call(null,seq__21957_21971__$1);
var G__21979 = null;
var G__21980 = (0);
var G__21981 = (0);
seq__21957_21961 = G__21978;
chunk__21958_21962 = G__21979;
count__21959_21963 = G__21980;
i__21960_21964 = G__21981;
continue;
}
} else {
}
}
break;
}

lt.object.raise.call(null,lt.objs.workspace.current_ws,new cljs.core.Keyword(null,"refresh","refresh",1947415525),new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));

return lt.object.merge_BANG_.call(null,this$,lt.objs.sidebar.workspace.files_and_folders.call(null,new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","refresh","lt.objs.sidebar.workspace/refresh",-1613433778),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"refresh!","refresh!",156149341),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.workspace.__BEH__refresh);
/**
 * 
 */
lt.objs.sidebar.workspace.__BEH__on_close = (function lt$objs$sidebar$workspace$__BEH__on_close(this$){
return lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"open?","open?",1238443125),false], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","on-close","lt.objs.sidebar.workspace/on-close",1742738963),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"close!","close!",-2079310498),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.workspace.__BEH__on_close);
/**
 * 
 */
lt.objs.sidebar.workspace.__BEH__on_open_file = (function lt$objs$sidebar$workspace$__BEH__on_open_file(this$){
return lt.object.raise.call(null,lt.objs.opener.opener,new cljs.core.Keyword(null,"open!","open!",1145596908),new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","on-open-file","lt.objs.sidebar.workspace/on-open-file",-2073837269),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"open!","open!",1145596908),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.workspace.__BEH__on_open_file);
/**
 * 
 */
lt.objs.sidebar.workspace.__BEH__on_remove = (function lt$objs$sidebar$workspace$__BEH__on_remove(this$,item){
if(cljs.core.truth_(lt.object.has_tag_QMARK_.call(null,item,new cljs.core.Keyword(null,"workspace.folder","workspace.folder",644219274)))){
return lt.object.raise.call(null,lt.objs.workspace.current_ws,new cljs.core.Keyword(null,"remove.folder!","remove.folder!",-153450498),new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,item)));
} else {
return lt.object.raise.call(null,lt.objs.workspace.current_ws,new cljs.core.Keyword(null,"remove.file!","remove.file!",2141287199),new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,item)));
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","on-remove","lt.objs.sidebar.workspace/on-remove",-1145412986),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"remove!","remove!",1683409659),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.workspace.__BEH__on_remove);
/**
 * 
 */
lt.objs.sidebar.workspace.__BEH__on_clear = (function lt$objs$sidebar$workspace$__BEH__on_clear(this$){
return lt.object.raise.call(null,lt.objs.workspace.current_ws,new cljs.core.Keyword(null,"clear!","clear!",-144814418));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","on-clear","lt.objs.sidebar.workspace/on-clear",-1274309108),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"clear!","clear!",-144814418),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.workspace.__BEH__on_clear);
/**
 * 
 */
lt.objs.sidebar.workspace.__BEH__on_ws_add = (function lt$objs$sidebar$workspace$__BEH__on_ws_add(ws,f){
if(cljs.core.truth_(lt.objs.files.file_QMARK_.call(null,f))){
return lt.object.update_BANG_.call(null,lt.objs.sidebar.workspace.tree,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"files","files",-472457450)], null),cljs.core.conj,lt.objs.sidebar.workspace.root_file.call(null,f));
} else {
return lt.object.update_BANG_.call(null,lt.objs.sidebar.workspace.tree,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"folders","folders",44248772)], null),cljs.core.conj,lt.objs.sidebar.workspace.root_folder.call(null,f));
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","on-ws-add","lt.objs.sidebar.workspace/on-ws-add",1374554584),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"add","add",235287739),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.workspace.__BEH__on_ws_add);
/**
 * 
 */
lt.objs.sidebar.workspace.__BEH__on_ws_remove = (function lt$objs$sidebar$workspace$__BEH__on_ws_remove(ws,f){
var item = lt.objs.sidebar.workspace.find_by_path.call(null,f);
if(cljs.core.truth_(lt.objs.files.file_QMARK_.call(null,f))){
lt.object.update_BANG_.call(null,lt.objs.sidebar.workspace.tree,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"files","files",-472457450)], null),((function (item){
return (function (cur){
return cljs.core.vec.call(null,cljs.core.remove.call(null,cljs.core.PersistentHashSet.fromArray([item], true),cur));
});})(item))
);
} else {
lt.object.update_BANG_.call(null,lt.objs.sidebar.workspace.tree,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"folders","folders",44248772)], null),((function (item){
return (function (cur){
return cljs.core.vec.call(null,cljs.core.remove.call(null,cljs.core.PersistentHashSet.fromArray([item], true),cur));
});})(item))
);
}

return lt.object.destroy_BANG_.call(null,item);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","on-ws-remove","lt.objs.sidebar.workspace/on-ws-remove",85756965),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"remove","remove",-131428414),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.workspace.__BEH__on_ws_remove);
/**
 * 
 */
lt.objs.sidebar.workspace.__BEH__on_ws_set = (function lt$objs$sidebar$workspace$__BEH__on_ws_set(ws){
var map__21984 = cljs.core.deref.call(null,ws);
var map__21984__$1 = ((((!((map__21984 == null)))?((((map__21984.cljs$lang$protocol_mask$partition0$ & (64))) || (map__21984.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__21984):map__21984);
var folders = cljs.core.get.call(null,map__21984__$1,new cljs.core.Keyword(null,"folders","folders",44248772));
var files = cljs.core.get.call(null,map__21984__$1,new cljs.core.Keyword(null,"files","files",-472457450));
return lt.object.merge_BANG_.call(null,lt.objs.sidebar.workspace.tree,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"files","files",-472457450),cljs.core.mapv.call(null,lt.objs.sidebar.workspace.root_file,files),new cljs.core.Keyword(null,"folders","folders",44248772),cljs.core.mapv.call(null,lt.objs.sidebar.workspace.root_folder,folders),new cljs.core.Keyword(null,"open-dirs","open-dirs",-20403535),cljs.core.PersistentHashSet.EMPTY], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","on-ws-set","lt.objs.sidebar.workspace/on-ws-set",1697355339),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"set","set",304602554),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.workspace.__BEH__on_ws_set);
/**
 * 
 */
lt.objs.sidebar.workspace.__BEH__track_and_watch_open_dirs = (function lt$objs$sidebar$workspace$__BEH__track_and_watch_open_dirs(this$){
lt.objs.workspace.watch_BANG_.call(null,new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));

return lt.object.update_BANG_.call(null,lt.objs.sidebar.workspace.tree,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"open-dirs","open-dirs",-20403535)], null),cljs.core.conj,new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","track-and-watch-open-dirs","lt.objs.sidebar.workspace/track-and-watch-open-dirs",-621069865),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"open!","open!",1145596908),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.workspace.__BEH__track_and_watch_open_dirs);
/**
 * 
 */
lt.objs.sidebar.workspace.__BEH__untrack_closed_dirs = (function lt$objs$sidebar$workspace$__BEH__untrack_closed_dirs(this$){
return lt.object.update_BANG_.call(null,lt.objs.sidebar.workspace.tree,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"open-dirs","open-dirs",-20403535)], null),cljs.core.disj,new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","untrack-closed-dirs","lt.objs.sidebar.workspace/untrack-closed-dirs",619231734),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"close!","close!",-2079310498),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.workspace.__BEH__untrack_closed_dirs);
/**
 * 
 */
lt.objs.sidebar.workspace.__BEH__watch_open_dirs_paths = (function lt$objs$sidebar$workspace$__BEH__watch_open_dirs_paths(this$,cur){
return cljs.core.concat.call(null,cur,new cljs.core.Keyword(null,"open-dirs","open-dirs",-20403535).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.sidebar.workspace.tree)));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","watch-open-dirs-paths","lt.objs.sidebar.workspace/watch-open-dirs-paths",-2050005985),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"watch-paths+","watch-paths+",-81342563),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.workspace.__BEH__watch_open_dirs_paths);
/**
 * 
 */
lt.objs.sidebar.workspace.__BEH__watched__DOT__delete = (function lt$objs$sidebar$workspace$__BEH__watched__DOT__delete(ws,path){
var temp__4657__auto__ = lt.objs.sidebar.workspace.find_by_path.call(null,path);
if(cljs.core.truth_(temp__4657__auto__)){
var child = temp__4657__auto__;
var temp__4657__auto___21986__$1 = lt.objs.sidebar.workspace.find_by_path.call(null,lt.objs.files.parent.call(null,path));
if(cljs.core.truth_(temp__4657__auto___21986__$1)){
var p_21987 = temp__4657__auto___21986__$1;
lt.objs.sidebar.workspace.remove_child.call(null,p_21987,child);
} else {
}

return lt.object.destroy_BANG_.call(null,child);
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","watched.delete","lt.objs.sidebar.workspace/watched.delete",993903507),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"watched.delete","watched.delete",-2013789460),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.workspace.__BEH__watched__DOT__delete);
/**
 * 
 */
lt.objs.sidebar.workspace.__BEH__watched__DOT__create = (function lt$objs$sidebar$workspace$__BEH__watched__DOT__create(ws,path){
if(cljs.core.truth_((function (){var and__6781__auto__ = lt.objs.sidebar.workspace.find_by_path.call(null,path);
if(cljs.core.truth_(and__6781__auto__)){
return cljs.core.not.call(null,cljs.core.re_seq.call(null,lt.objs.files.ignore_pattern,lt.objs.files.basename.call(null,path)));
} else {
return and__6781__auto__;
}
})())){
return null;
} else {
var temp__4657__auto__ = lt.objs.sidebar.workspace.find_by_path.call(null,lt.objs.files.parent.call(null,path));
if(cljs.core.truth_(temp__4657__auto__)){
var parent = temp__4657__auto__;
if(cljs.core.truth_(new cljs.core.Keyword(null,"realized?","realized?",-1433302186).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,parent)))){
if(cljs.core.truth_(lt.objs.files.dir_QMARK_.call(null,path))){
return lt.object.update_BANG_.call(null,parent,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"folders","folders",44248772)], null),cljs.core.conj,lt.object.create.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","workspace.folder","lt.objs.sidebar.workspace/workspace.folder",-483966665),path));
} else {
return lt.object.update_BANG_.call(null,parent,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"files","files",-472457450)], null),cljs.core.conj,lt.object.create.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","workspace.file","lt.objs.sidebar.workspace/workspace.file",-188628499),path));
}
} else {
return null;
}
} else {
return null;
}
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","watched.create","lt.objs.sidebar.workspace/watched.create",-1456875723),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"watched.create","watched.create",1567266238),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.workspace.__BEH__watched__DOT__create);
/**
 * 
 */
lt.objs.sidebar.workspace.__BEH__on_drop = (function lt$objs$sidebar$workspace$__BEH__on_drop(this$,e){
var size = e.dataTransfer.files.length;
var i = (0);
while(true){
if((i < size)){
var path_21988 = (e.dataTransfer.files[i]).path;
if(cljs.core.truth_(lt.objs.files.dir_QMARK_.call(null,path_21988))){
lt.object.raise.call(null,lt.objs.workspace.current_ws,new cljs.core.Keyword(null,"add.folder!","add.folder!",755480535),path_21988);
} else {
lt.object.raise.call(null,lt.objs.workspace.current_ws,new cljs.core.Keyword(null,"add.file!","add.file!",-439765985),path_21988);
}

var G__21989 = (i + (1));
i = G__21989;
continue;
} else {
return null;
}
break;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","on-drop","lt.objs.sidebar.workspace/on-drop",1293166756),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"drop","drop",364481611),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.workspace.__BEH__on_drop);
/**
 * 
 */
lt.objs.sidebar.workspace.__BEH__on_menu = (function lt$objs$sidebar$workspace$__BEH__on_menu(this$,e){
var items = cljs.core.sort_by.call(null,new cljs.core.Keyword(null,"order","order",-1254677256),lt.object.raise_reduce.call(null,this$,new cljs.core.Keyword(null,"menu-items","menu-items",-1870634357),cljs.core.PersistentVector.EMPTY));
return lt.objs.menu.show_menu.call(null,lt.objs.menu.menu.call(null,items));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","on-menu","lt.objs.sidebar.workspace/on-menu",-2073241183),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"menu!","menu!",-1593399467),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.workspace.__BEH__on_menu);
/**
 * 
 */
lt.objs.sidebar.workspace.__BEH__on_root_menu = (function lt$objs$sidebar$workspace$__BEH__on_root_menu(this$,items){
return cljs.core.conj.call(null,items,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),"separator",new cljs.core.Keyword(null,"order","order",-1254677256),(9)], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"label","label",1718410804),"Remove from workspace",new cljs.core.Keyword(null,"order","order",-1254677256),(10),new cljs.core.Keyword(null,"click","click",1912301393),(function (){
return lt.object.raise.call(null,lt.objs.sidebar.workspace.tree,new cljs.core.Keyword(null,"remove!","remove!",1683409659),this$);
})], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","on-root-menu","lt.objs.sidebar.workspace/on-root-menu",1810226725),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"menu-items","menu-items",-1870634357),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.workspace.__BEH__on_root_menu);
/**
 * 
 */
lt.objs.sidebar.workspace.__BEH__subfile_menu = (function lt$objs$sidebar$workspace$__BEH__subfile_menu(this$,items){
return cljs.core.conj.call(null,items,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"label","label",1718410804),"Duplicate",new cljs.core.Keyword(null,"order","order",-1254677256),(1),new cljs.core.Keyword(null,"click","click",1912301393),(function (){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"duplicate!","duplicate!",-1916156478));
})], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"label","label",1718410804),"Rename",new cljs.core.Keyword(null,"order","order",-1254677256),(2),new cljs.core.Keyword(null,"click","click",1912301393),(function (){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"start-rename!","start-rename!",335884224));
})], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"label","label",1718410804),"Delete",new cljs.core.Keyword(null,"order","order",-1254677256),(3),new cljs.core.Keyword(null,"click","click",1912301393),(function (){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"delete!","delete!",-593410251));
})], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","subfile-menu","lt.objs.sidebar.workspace/subfile-menu",-535794464),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"menu-items","menu-items",-1870634357),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.workspace.__BEH__subfile_menu);
/**
 * 
 */
lt.objs.sidebar.workspace.__BEH__subfolder_menu = (function lt$objs$sidebar$workspace$__BEH__subfolder_menu(this$,items){
return cljs.core.conj.call(null,items,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"label","label",1718410804),"New file",new cljs.core.Keyword(null,"order","order",-1254677256),(0),new cljs.core.Keyword(null,"click","click",1912301393),(function (){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"new-file!","new-file!",-774606557));
})], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"label","label",1718410804),"Rename",new cljs.core.Keyword(null,"order","order",-1254677256),(2),new cljs.core.Keyword(null,"click","click",1912301393),(function (){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"start-rename!","start-rename!",335884224));
})], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),"separator",new cljs.core.Keyword(null,"order","order",-1254677256),(3)], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"label","label",1718410804),"New folder",new cljs.core.Keyword(null,"order","order",-1254677256),(4),new cljs.core.Keyword(null,"click","click",1912301393),(function (){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"new-folder!","new-folder!",-84424674));
})], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"label","label",1718410804),"Delete folder",new cljs.core.Keyword(null,"order","order",-1254677256),(5),new cljs.core.Keyword(null,"click","click",1912301393),(function (){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"delete!","delete!",-593410251));
})], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"label","label",1718410804),"Refresh folder",new cljs.core.Keyword(null,"order","order",-1254677256),(6),new cljs.core.Keyword(null,"click","click",1912301393),(function (){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"refresh!","refresh!",156149341));
})], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","subfolder-menu","lt.objs.sidebar.workspace/subfolder-menu",72994240),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"menu-items","menu-items",-1870634357),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.workspace.__BEH__subfolder_menu);
/**
 * 
 */
lt.objs.sidebar.workspace.__BEH__force_delete_file = (function lt$objs$sidebar$workspace$__BEH__force_delete_file(this$){
lt.objs.files.delete_BANG_.call(null,new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));

lt.util.dom.remove.call(null,lt.object.__GT_content.call(null,this$));

lt.object.raise.call(null,lt.objs.workspace.current_ws,new cljs.core.Keyword(null,"watched.delete","watched.delete",-2013789460),new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));

return lt.object.destroy_BANG_.call(null,this$);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","force-delete-file","lt.objs.sidebar.workspace/force-delete-file",-664300999),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"force-delete!","force-delete!",-2147117930),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.workspace.__BEH__force_delete_file);
/**
 * 
 */
lt.objs.sidebar.workspace.__BEH__delete_file = (function lt$objs$sidebar$workspace$__BEH__delete_file(this$){
return lt.objs.popup.popup_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"header","header",119441134),"Delete this file?",new cljs.core.Keyword(null,"body","body",-2049205669),[cljs.core.str("This will delete "),cljs.core.str(new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))),cljs.core.str(" from disk and cannot be undone.")].join(''),new cljs.core.Keyword(null,"buttons","buttons",-1953831197),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"Delete file",new cljs.core.Keyword(null,"action","action",-811238024),(function (){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"force-delete!","force-delete!",-2147117930));
})], null),lt.objs.popup.cancel_button], null)], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","delete-file","lt.objs.sidebar.workspace/delete-file",330730710),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"delete!","delete!",-593410251),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.workspace.__BEH__delete_file);
/**
 * 
 */
lt.objs.sidebar.workspace.__BEH__force_delete_folder = (function lt$objs$sidebar$workspace$__BEH__force_delete_folder(this$){
lt.objs.files.delete_BANG_.call(null,new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));

lt.util.dom.remove.call(null,lt.object.__GT_content.call(null,this$));

lt.object.raise.call(null,lt.objs.workspace.current_ws,new cljs.core.Keyword(null,"watched.delete","watched.delete",-2013789460),new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));

return lt.object.destroy_BANG_.call(null,this$);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","force-delete-folder","lt.objs.sidebar.workspace/force-delete-folder",-974990372),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"force-delete!","force-delete!",-2147117930),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.workspace.__BEH__force_delete_folder);
/**
 * 
 */
lt.objs.sidebar.workspace.__BEH__delete_folder = (function lt$objs$sidebar$workspace$__BEH__delete_folder(this$){
return lt.objs.popup.popup_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"header","header",119441134),"Delete this folder?",new cljs.core.Keyword(null,"body","body",-2049205669),[cljs.core.str("This will delete "),cljs.core.str(new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))),cljs.core.str(" from disk and cannot be undone.")].join(''),new cljs.core.Keyword(null,"buttons","buttons",-1953831197),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"Delete folder",new cljs.core.Keyword(null,"action","action",-811238024),(function (){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"force-delete!","force-delete!",-2147117930));
})], null),lt.objs.popup.cancel_button], null)], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","delete-folder","lt.objs.sidebar.workspace/delete-folder",-856019611),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"delete!","delete!",-593410251),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.workspace.__BEH__delete_folder);
/**
 * 
 */
lt.objs.sidebar.workspace.__BEH__new_file_BANG_ = (function lt$objs$sidebar$workspace$__BEH__new_file_BANG_(this$){
var ext = (function (){var temp__4655__auto__ = cljs.core.first.call(null,new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
if(cljs.core.truth_(temp__4655__auto__)){
var ffile = temp__4655__auto__;
var temp__4657__auto__ = new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ffile));
if(cljs.core.truth_(temp__4657__auto__)){
var path = temp__4657__auto__;
return lt.objs.files.ext.call(null,path);
} else {
return null;
}
} else {
return "txt";
}
})();
var path = lt.objs.files.join.call(null,new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),[cljs.core.str("untitled."),cljs.core.str(ext)].join(''));
var final_path = lt.objs.files.next_available_name.call(null,path);
var folder = lt.object.create.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","workspace.file","lt.objs.sidebar.workspace/workspace.file",-188628499),final_path);
lt.object.update_BANG_.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"files","files",-472457450)], null),cljs.core.conj,folder);

lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"open?","open?",1238443125),true], null));

lt.objs.files.save.call(null,final_path,"");

lt.object.raise.call(null,lt.objs.opener.opener,new cljs.core.Keyword(null,"open!","open!",1145596908),final_path);

return lt.object.raise.call(null,folder,new cljs.core.Keyword(null,"start-rename!","start-rename!",335884224));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","new-file!","lt.objs.sidebar.workspace/new-file!",496349114),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"new-file!","new-file!",-774606557),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.workspace.__BEH__new_file_BANG_);
/**
 * 
 */
lt.objs.sidebar.workspace.__BEH__new_folder_BANG_ = (function lt$objs$sidebar$workspace$__BEH__new_folder_BANG_(this$){
var path = lt.objs.files.join.call(null,new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),"NewFolder");
var final_path = lt.objs.files.next_available_name.call(null,path);
var folder = lt.object.create.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","workspace.folder","lt.objs.sidebar.workspace/workspace.folder",-483966665),final_path);
lt.object.update_BANG_.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"folders","folders",44248772)], null),cljs.core.conj,folder);

lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"open?","open?",1238443125),true], null));

lt.objs.files.mkdir.call(null,final_path);

return lt.object.raise.call(null,folder,new cljs.core.Keyword(null,"start-rename!","start-rename!",335884224));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","new-folder!","lt.objs.sidebar.workspace/new-folder!",-1497726267),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"new-folder!","new-folder!",-84424674),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.workspace.__BEH__new_folder_BANG_);
/**
 * 
 */
lt.objs.sidebar.workspace.__BEH__rename_folder = (function lt$objs$sidebar$workspace$__BEH__rename_folder(this$,n){
var path = new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$));
var neue = lt.objs.files.join.call(null,lt.objs.files.parent.call(null,path),n);
if(cljs.core._EQ_.call(null,path,neue)){
return null;
} else {
if(cljs.core.truth_((function (){var and__6781__auto__ = cljs.core.not_EQ_.call(null,clojure.string.lower_case.call(null,path),clojure.string.lower_case.call(null,neue));
if(and__6781__auto__){
return lt.objs.files.exists_QMARK_.call(null,neue);
} else {
return and__6781__auto__;
}
})())){
return lt.objs.popup.popup_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"header","header",119441134),"Folder already exists.",new cljs.core.Keyword(null,"body","body",-2049205669),[cljs.core.str("The folder "),cljs.core.str(neue),cljs.core.str(" already exists, you'll have to pick a different name.")].join(''),new cljs.core.Keyword(null,"buttons","buttons",-1953831197),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"ok",new cljs.core.Keyword(null,"post-action","post-action",-542405960),((function (path,neue){
return (function (){
lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"rename.cancel","rename.cancel",-736696812));

return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"start-rename!","start-rename!",335884224));
});})(path,neue))
], null)], null)], null));
} else {
var root_QMARK_ = lt.object.has_tag_QMARK_.call(null,this$,new cljs.core.Keyword(null,"workspace.folder.root","workspace.folder.root",-1531354287));
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"path","path",-188191168),neue,new cljs.core.Keyword(null,"realized?","realized?",-1433302186),false], null));

lt.objs.files.move_BANG_.call(null,path,neue);

lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"refresh!","refresh!",156149341));

var docs_21998 = cljs.core.get_in.call(null,cljs.core.deref.call(null,lt.objs.document.manager),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"files","files",-472457450)], null));
var old_path_21999 = clojure.string.join.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [path,lt.objs.files.separator], null));
var affected_22000 = cljs.core.filter.call(null,((function (docs_21998,old_path_21999,root_QMARK_,path,neue){
return (function (x){
return x.startsWith(old_path_21999);
});})(docs_21998,old_path_21999,root_QMARK_,path,neue))
,cljs.core.keys.call(null,docs_21998));
var seq__21994_22001 = cljs.core.seq.call(null,affected_22000);
var chunk__21995_22002 = null;
var count__21996_22003 = (0);
var i__21997_22004 = (0);
while(true){
if((i__21997_22004 < count__21996_22003)){
var old_fpath_22005 = cljs.core._nth.call(null,chunk__21995_22002,i__21997_22004);
var new_fpath_22006 = clojure.string.replace_first.call(null,old_fpath_22005,path,neue);
lt.objs.document.move_doc.call(null,old_fpath_22005,new_fpath_22006);

var G__22007 = seq__21994_22001;
var G__22008 = chunk__21995_22002;
var G__22009 = count__21996_22003;
var G__22010 = (i__21997_22004 + (1));
seq__21994_22001 = G__22007;
chunk__21995_22002 = G__22008;
count__21996_22003 = G__22009;
i__21997_22004 = G__22010;
continue;
} else {
var temp__4657__auto___22011 = cljs.core.seq.call(null,seq__21994_22001);
if(temp__4657__auto___22011){
var seq__21994_22012__$1 = temp__4657__auto___22011;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__21994_22012__$1)){
var c__7604__auto___22013 = cljs.core.chunk_first.call(null,seq__21994_22012__$1);
var G__22014 = cljs.core.chunk_rest.call(null,seq__21994_22012__$1);
var G__22015 = c__7604__auto___22013;
var G__22016 = cljs.core.count.call(null,c__7604__auto___22013);
var G__22017 = (0);
seq__21994_22001 = G__22014;
chunk__21995_22002 = G__22015;
count__21996_22003 = G__22016;
i__21997_22004 = G__22017;
continue;
} else {
var old_fpath_22018 = cljs.core.first.call(null,seq__21994_22012__$1);
var new_fpath_22019 = clojure.string.replace_first.call(null,old_fpath_22018,path,neue);
lt.objs.document.move_doc.call(null,old_fpath_22018,new_fpath_22019);

var G__22020 = cljs.core.next.call(null,seq__21994_22012__$1);
var G__22021 = null;
var G__22022 = (0);
var G__22023 = (0);
seq__21994_22001 = G__22020;
chunk__21995_22002 = G__22021;
count__21996_22003 = G__22022;
i__21997_22004 = G__22023;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(root_QMARK_)){
return lt.object.raise.call(null,lt.objs.workspace.current_ws,new cljs.core.Keyword(null,"rename!","rename!",154389790),path,neue);
} else {
return lt.object.raise.call(null,lt.objs.workspace.current_ws,new cljs.core.Keyword(null,"watched.rename","watched.rename",67923309),path,neue);
}
}
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","rename-folder","lt.objs.sidebar.workspace/rename-folder",576462569),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"rename","rename",1508157613),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.workspace.__BEH__rename_folder);
/**
 * 
 */
lt.objs.sidebar.workspace.__BEH__rename_file = (function lt$objs$sidebar$workspace$__BEH__rename_file(this$,n){
var path = new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$));
var neue = lt.objs.files.join.call(null,lt.objs.files.parent.call(null,path),n);
if(cljs.core._EQ_.call(null,path,neue)){
return null;
} else {
if(cljs.core.truth_((function (){var and__6781__auto__ = cljs.core.not_EQ_.call(null,clojure.string.lower_case.call(null,path),clojure.string.lower_case.call(null,neue));
if(and__6781__auto__){
return lt.objs.files.exists_QMARK_.call(null,neue);
} else {
return and__6781__auto__;
}
})())){
return lt.objs.popup.popup_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"header","header",119441134),"File already exists.",new cljs.core.Keyword(null,"body","body",-2049205669),[cljs.core.str("The file"),cljs.core.str(neue),cljs.core.str(" already exists, you'll have to pick a different name.")].join(''),new cljs.core.Keyword(null,"buttons","buttons",-1953831197),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"ok",new cljs.core.Keyword(null,"post-action","post-action",-542405960),((function (path,neue){
return (function (){
lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"rename.cancel","rename.cancel",-736696812));

return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"start-rename!","start-rename!",335884224));
});})(path,neue))
], null)], null)], null));
} else {
if(cljs.core.truth_((function (){var or__6793__auto__ = lt.object.has_tag_QMARK_.call(null,this$,new cljs.core.Keyword(null,"workspace.folder.root","workspace.folder.root",-1531354287));
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return lt.object.has_tag_QMARK_.call(null,this$,new cljs.core.Keyword(null,"workspace.file.root","workspace.file.root",-569371600));
}
})())){
lt.object.raise.call(null,lt.objs.workspace.current_ws,new cljs.core.Keyword(null,"rename!","rename!",154389790),path,neue);
} else {
lt.object.raise.call(null,lt.objs.workspace.current_ws,new cljs.core.Keyword(null,"watched.rename","watched.rename",67923309),path,neue);
}

lt.objs.files.move_BANG_.call(null,path,neue);

return lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"path","path",-188191168),neue], null));
}
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","rename-file","lt.objs.sidebar.workspace/rename-file",1852139957),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"rename","rename",1508157613),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.workspace.__BEH__rename_file);
/**
 * 
 */
lt.objs.sidebar.workspace.__BEH__start_rename = (function lt$objs$sidebar$workspace$__BEH__start_rename(this$){
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"renaming?","renaming?",-692692442),true], null));

var input = lt.util.dom.$.call(null,new cljs.core.Keyword(null,"input","input",556931961),lt.object.__GT_content.call(null,this$));
var len = cljs.core.count.call(null,lt.objs.files.without_ext.call(null,lt.objs.files.basename.call(null,new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)))));
var width = lt.util.dom.scroll_width.call(null,lt.util.dom.parent.call(null,input));
lt.util.dom.css.call(null,input,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"width","width",-384071477),width], null));

lt.util.dom.focus.call(null,input);

return lt.util.dom.selection.call(null,input,(0),len,"forward");
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","start-rename","lt.objs.sidebar.workspace/start-rename",-1753183029),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"start-rename!","start-rename!",335884224),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.workspace.__BEH__start_rename);
/**
 * 
 */
lt.objs.sidebar.workspace.__BEH__rename_focus = (function lt$objs$sidebar$workspace$__BEH__rename_focus(this$){
return lt.objs.context.in_BANG_.call(null,new cljs.core.Keyword(null,"tree.rename","tree.rename",1886094939),this$);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","rename-focus","lt.objs.sidebar.workspace/rename-focus",90440283),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"rename.focus","rename.focus",1177600987),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.workspace.__BEH__rename_focus);
/**
 * 
 */
lt.objs.sidebar.workspace.__BEH__rename_submit = (function lt$objs$sidebar$workspace$__BEH__rename_submit(this$){
var val = lt.util.dom.val.call(null,lt.util.dom.$.call(null,new cljs.core.Keyword(null,"input","input",556931961),lt.object.__GT_content.call(null,this$)));
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"renaming?","renaming?",-692692442),false], null));

return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"rename","rename",1508157613),val);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","rename-submit","lt.objs.sidebar.workspace/rename-submit",997611384),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"rename.submit!","rename.submit!",834323059),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.workspace.__BEH__rename_submit);
/**
 * 
 */
lt.objs.sidebar.workspace.__BEH__rename_blur = (function lt$objs$sidebar$workspace$__BEH__rename_blur(this$){
lt.objs.context.out_BANG_.call(null,new cljs.core.Keyword(null,"tree.rename","tree.rename",1886094939));

if(cljs.core.truth_(new cljs.core.Keyword(null,"renaming?","renaming?",-692692442).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)))){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"rename.submit!","rename.submit!",834323059));
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","rename-blur","lt.objs.sidebar.workspace/rename-blur",-2103106290),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"rename.blur","rename.blur",-1821157150),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.workspace.__BEH__rename_blur);
/**
 * 
 */
lt.objs.sidebar.workspace.__BEH__rename_cancel = (function lt$objs$sidebar$workspace$__BEH__rename_cancel(this$){
return lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"renaming?","renaming?",-692692442),false], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","rename-cancel","lt.objs.sidebar.workspace/rename-cancel",819573265),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"rename.cancel!","rename.cancel!",-1845937529),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.workspace.__BEH__rename_cancel);
/**
 * 
 */
lt.objs.sidebar.workspace.__BEH__duplicate = (function lt$objs$sidebar$workspace$__BEH__duplicate(this$){
var base_name = lt.objs.files.without_ext.call(null,lt.objs.files.basename.call(null,new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))));
var new_name = [cljs.core.str(base_name),cljs.core.str(" copy."),cljs.core.str(lt.objs.files.ext.call(null,new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))))].join('');
var new_path = lt.objs.files.join.call(null,lt.objs.files.parent.call(null,new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))),new_name);
return lt.objs.files.copy.call(null,new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),new_path);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","duplicate","lt.objs.sidebar.workspace/duplicate",1178310165),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"duplicate!","duplicate!",-1916156478),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.workspace.__BEH__duplicate);
/**
 * 
 */
lt.objs.sidebar.workspace.__BEH__destroy_sub_tree = (function lt$objs$sidebar$workspace$__BEH__destroy_sub_tree(this$){
var seq__22028 = cljs.core.seq.call(null,cljs.core.concat.call(null,new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),new cljs.core.Keyword(null,"folders","folders",44248772).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))));
var chunk__22029 = null;
var count__22030 = (0);
var i__22031 = (0);
while(true){
if((i__22031 < count__22030)){
var f = cljs.core._nth.call(null,chunk__22029,i__22031);
lt.object.destroy_BANG_.call(null,f);

var G__22032 = seq__22028;
var G__22033 = chunk__22029;
var G__22034 = count__22030;
var G__22035 = (i__22031 + (1));
seq__22028 = G__22032;
chunk__22029 = G__22033;
count__22030 = G__22034;
i__22031 = G__22035;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__22028);
if(temp__4657__auto__){
var seq__22028__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__22028__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__22028__$1);
var G__22036 = cljs.core.chunk_rest.call(null,seq__22028__$1);
var G__22037 = c__7604__auto__;
var G__22038 = cljs.core.count.call(null,c__7604__auto__);
var G__22039 = (0);
seq__22028 = G__22036;
chunk__22029 = G__22037;
count__22030 = G__22038;
i__22031 = G__22039;
continue;
} else {
var f = cljs.core.first.call(null,seq__22028__$1);
lt.object.destroy_BANG_.call(null,f);

var G__22040 = cljs.core.next.call(null,seq__22028__$1);
var G__22041 = null;
var G__22042 = (0);
var G__22043 = (0);
seq__22028 = G__22040;
chunk__22029 = G__22041;
count__22030 = G__22042;
i__22031 = G__22043;
continue;
}
} else {
return null;
}
}
break;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","destroy-sub-tree","lt.objs.sidebar.workspace/destroy-sub-tree",-2037994020),new cljs.core.Keyword(null,"trigger","trigger",103466139),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"destroy","destroy",-843660405),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.workspace.__BEH__destroy_sub_tree);
/**
 * 
 */
lt.objs.sidebar.workspace.file_toggle = (function lt$objs$sidebar$workspace$file_toggle(this$){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),crate.binding.bound.call(null,this$,(function (){
return lt.objs.files.basename.call(null,new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
}))], null));
var seq__22054_22064 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"contextmenu","contextmenu",-15887481),((function (e__7942__auto__){
return (function (e){
lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"menu!","menu!",-1593399467),e);

lt.util.dom.prevent.call(null,e);

return lt.util.dom.stop_propagation.call(null,e);
});})(e__7942__auto__))
,new cljs.core.Keyword(null,"dblclick","dblclick",-1821330376),((function (e__7942__auto__){
return (function (e){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"dblopen!","dblopen!",-1938022001));
});})(e__7942__auto__))
,new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (e){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"open!","open!",1145596908));
});})(e__7942__auto__))
], null)));
var chunk__22055_22065 = null;
var count__22056_22066 = (0);
var i__22057_22067 = (0);
while(true){
if((i__22057_22067 < count__22056_22066)){
var vec__22058_22068 = cljs.core._nth.call(null,chunk__22055_22065,i__22057_22067);
var ev__7943__auto___22069 = cljs.core.nth.call(null,vec__22058_22068,(0),null);
var func__7944__auto___22070 = cljs.core.nth.call(null,vec__22058_22068,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___22069,func__7944__auto___22070);

var G__22071 = seq__22054_22064;
var G__22072 = chunk__22055_22065;
var G__22073 = count__22056_22066;
var G__22074 = (i__22057_22067 + (1));
seq__22054_22064 = G__22071;
chunk__22055_22065 = G__22072;
count__22056_22066 = G__22073;
i__22057_22067 = G__22074;
continue;
} else {
var temp__4657__auto___22075 = cljs.core.seq.call(null,seq__22054_22064);
if(temp__4657__auto___22075){
var seq__22054_22076__$1 = temp__4657__auto___22075;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__22054_22076__$1)){
var c__7604__auto___22077 = cljs.core.chunk_first.call(null,seq__22054_22076__$1);
var G__22078 = cljs.core.chunk_rest.call(null,seq__22054_22076__$1);
var G__22079 = c__7604__auto___22077;
var G__22080 = cljs.core.count.call(null,c__7604__auto___22077);
var G__22081 = (0);
seq__22054_22064 = G__22078;
chunk__22055_22065 = G__22079;
count__22056_22066 = G__22080;
i__22057_22067 = G__22081;
continue;
} else {
var vec__22061_22082 = cljs.core.first.call(null,seq__22054_22076__$1);
var ev__7943__auto___22083 = cljs.core.nth.call(null,vec__22061_22082,(0),null);
var func__7944__auto___22084 = cljs.core.nth.call(null,vec__22061_22082,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___22083,func__7944__auto___22084);

var G__22085 = cljs.core.next.call(null,seq__22054_22076__$1);
var G__22086 = null;
var G__22087 = (0);
var G__22088 = (0);
seq__22054_22064 = G__22085;
chunk__22055_22065 = G__22086;
count__22056_22066 = G__22087;
i__22057_22067 = G__22088;
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
lt.objs.sidebar.workspace.folder_toggle = (function lt$objs$sidebar$workspace$folder_toggle(this$){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p.folder","p.folder",488856541),crate.binding.bound.call(null,this$,(function (){
return [cljs.core.str(lt.objs.files.basename.call(null,new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)))),cljs.core.str(lt.objs.files.separator)].join('');
}))], null));
var seq__22099_22109 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"contextmenu","contextmenu",-15887481),((function (e__7942__auto__){
return (function (e){
lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"menu!","menu!",-1593399467),e);

lt.util.dom.prevent.call(null,e);

return lt.util.dom.stop_propagation.call(null,e);
});})(e__7942__auto__))
,new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (){
if(cljs.core.not.call(null,new cljs.core.Keyword(null,"open?","open?",1238443125).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)))){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"open!","open!",1145596908));
} else {
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"close!","close!",-2079310498));
}
});})(e__7942__auto__))
], null)));
var chunk__22100_22110 = null;
var count__22101_22111 = (0);
var i__22102_22112 = (0);
while(true){
if((i__22102_22112 < count__22101_22111)){
var vec__22103_22113 = cljs.core._nth.call(null,chunk__22100_22110,i__22102_22112);
var ev__7943__auto___22114 = cljs.core.nth.call(null,vec__22103_22113,(0),null);
var func__7944__auto___22115 = cljs.core.nth.call(null,vec__22103_22113,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___22114,func__7944__auto___22115);

var G__22116 = seq__22099_22109;
var G__22117 = chunk__22100_22110;
var G__22118 = count__22101_22111;
var G__22119 = (i__22102_22112 + (1));
seq__22099_22109 = G__22116;
chunk__22100_22110 = G__22117;
count__22101_22111 = G__22118;
i__22102_22112 = G__22119;
continue;
} else {
var temp__4657__auto___22120 = cljs.core.seq.call(null,seq__22099_22109);
if(temp__4657__auto___22120){
var seq__22099_22121__$1 = temp__4657__auto___22120;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__22099_22121__$1)){
var c__7604__auto___22122 = cljs.core.chunk_first.call(null,seq__22099_22121__$1);
var G__22123 = cljs.core.chunk_rest.call(null,seq__22099_22121__$1);
var G__22124 = c__7604__auto___22122;
var G__22125 = cljs.core.count.call(null,c__7604__auto___22122);
var G__22126 = (0);
seq__22099_22109 = G__22123;
chunk__22100_22110 = G__22124;
count__22101_22111 = G__22125;
i__22102_22112 = G__22126;
continue;
} else {
var vec__22106_22127 = cljs.core.first.call(null,seq__22099_22121__$1);
var ev__7943__auto___22128 = cljs.core.nth.call(null,vec__22106_22127,(0),null);
var func__7944__auto___22129 = cljs.core.nth.call(null,vec__22106_22127,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___22128,func__7944__auto___22129);

var G__22130 = cljs.core.next.call(null,seq__22099_22121__$1);
var G__22131 = null;
var G__22132 = (0);
var G__22133 = (0);
seq__22099_22109 = G__22130;
chunk__22100_22110 = G__22131;
count__22101_22111 = G__22132;
i__22102_22112 = G__22133;
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
lt.objs.sidebar.workspace.sub_folders = (function lt$objs$sidebar$workspace$sub_folders(p__22136){
var map__22157 = p__22136;
var map__22157__$1 = ((((!((map__22157 == null)))?((((map__22157.cljs$lang$protocol_mask$partition0$ & (64))) || (map__22157.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__22157):map__22157);
var folders = cljs.core.get.call(null,map__22157__$1,new cljs.core.Keyword(null,"folders","folders",44248772));
var files = cljs.core.get.call(null,map__22157__$1,new cljs.core.Keyword(null,"files","files",-472457450));
var open_QMARK_ = cljs.core.get.call(null,map__22157__$1,new cljs.core.Keyword(null,"open?","open?",1238443125));
var path = cljs.core.get.call(null,map__22157__$1,new cljs.core.Keyword(null,"path","path",-188191168));
var root_QMARK_ = cljs.core.get.call(null,map__22157__$1,new cljs.core.Keyword(null,"root?","root?",-2045639518));
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",-1349521403),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),[cljs.core.str((cljs.core.truth_(root_QMARK_)?null:"sub ")),cljs.core.str((cljs.core.truth_(open_QMARK_)?"opened":null))].join('')], null),(function (){var iter__7573__auto__ = ((function (map__22157,map__22157__$1,folders,files,open_QMARK_,path,root_QMARK_){
return (function lt$objs$sidebar$workspace$sub_folders_$_iter__22159(s__22160){
return (new cljs.core.LazySeq(null,((function (map__22157,map__22157__$1,folders,files,open_QMARK_,path,root_QMARK_){
return (function (){
var s__22160__$1 = s__22160;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__22160__$1);
if(temp__4657__auto__){
var s__22160__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__22160__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__22160__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__22162 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__22161 = (0);
while(true){
if((i__22161 < size__7572__auto__)){
var f = cljs.core._nth.call(null,c__7571__auto__,i__22161);
cljs.core.chunk_append.call(null,b__22162,lt.object.__GT_content.call(null,f));

var G__22177 = (i__22161 + (1));
i__22161 = G__22177;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__22162),lt$objs$sidebar$workspace$sub_folders_$_iter__22159.call(null,cljs.core.chunk_rest.call(null,s__22160__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__22162),null);
}
} else {
var f = cljs.core.first.call(null,s__22160__$2);
return cljs.core.cons.call(null,lt.object.__GT_content.call(null,f),lt$objs$sidebar$workspace$sub_folders_$_iter__22159.call(null,cljs.core.rest.call(null,s__22160__$2)));
}
} else {
return null;
}
break;
}
});})(map__22157,map__22157__$1,folders,files,open_QMARK_,path,root_QMARK_))
,null,null));
});})(map__22157,map__22157__$1,folders,files,open_QMARK_,path,root_QMARK_))
;
return iter__7573__auto__.call(null,cljs.core.sort_by.call(null,((function (iter__7573__auto__,map__22157,map__22157__$1,folders,files,open_QMARK_,path,root_QMARK_){
return (function (p1__22134_SHARP_){
return clojure.string.lower_case.call(null,lt.objs.files.basename.call(null,new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,p1__22134_SHARP_))));
});})(iter__7573__auto__,map__22157,map__22157__$1,folders,files,open_QMARK_,path,root_QMARK_))
,folders));
})(),(function (){var iter__7573__auto__ = ((function (map__22157,map__22157__$1,folders,files,open_QMARK_,path,root_QMARK_){
return (function lt$objs$sidebar$workspace$sub_folders_$_iter__22163(s__22164){
return (new cljs.core.LazySeq(null,((function (map__22157,map__22157__$1,folders,files,open_QMARK_,path,root_QMARK_){
return (function (){
var s__22164__$1 = s__22164;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__22164__$1);
if(temp__4657__auto__){
var s__22164__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__22164__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__22164__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__22166 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__22165 = (0);
while(true){
if((i__22165 < size__7572__auto__)){
var f = cljs.core._nth.call(null,c__7571__auto__,i__22165);
cljs.core.chunk_append.call(null,b__22166,lt.object.__GT_content.call(null,f));

var G__22178 = (i__22165 + (1));
i__22165 = G__22178;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__22166),lt$objs$sidebar$workspace$sub_folders_$_iter__22163.call(null,cljs.core.chunk_rest.call(null,s__22164__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__22166),null);
}
} else {
var f = cljs.core.first.call(null,s__22164__$2);
return cljs.core.cons.call(null,lt.object.__GT_content.call(null,f),lt$objs$sidebar$workspace$sub_folders_$_iter__22163.call(null,cljs.core.rest.call(null,s__22164__$2)));
}
} else {
return null;
}
break;
}
});})(map__22157,map__22157__$1,folders,files,open_QMARK_,path,root_QMARK_))
,null,null));
});})(map__22157,map__22157__$1,folders,files,open_QMARK_,path,root_QMARK_))
;
return iter__7573__auto__.call(null,cljs.core.sort_by.call(null,((function (iter__7573__auto__,map__22157,map__22157__$1,folders,files,open_QMARK_,path,root_QMARK_){
return (function (p1__22135_SHARP_){
return clojure.string.lower_case.call(null,lt.objs.files.basename.call(null,new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,p1__22135_SHARP_))));
});})(iter__7573__auto__,map__22157,map__22157__$1,folders,files,open_QMARK_,path,root_QMARK_))
,files));
})()], null));
var seq__22167_22179 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),cljs.core.PersistentVector.EMPTY));
var chunk__22168_22180 = null;
var count__22169_22181 = (0);
var i__22170_22182 = (0);
while(true){
if((i__22170_22182 < count__22169_22181)){
var vec__22171_22183 = cljs.core._nth.call(null,chunk__22168_22180,i__22170_22182);
var ev__7943__auto___22184 = cljs.core.nth.call(null,vec__22171_22183,(0),null);
var func__7944__auto___22185 = cljs.core.nth.call(null,vec__22171_22183,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___22184,func__7944__auto___22185);

var G__22186 = seq__22167_22179;
var G__22187 = chunk__22168_22180;
var G__22188 = count__22169_22181;
var G__22189 = (i__22170_22182 + (1));
seq__22167_22179 = G__22186;
chunk__22168_22180 = G__22187;
count__22169_22181 = G__22188;
i__22170_22182 = G__22189;
continue;
} else {
var temp__4657__auto___22190 = cljs.core.seq.call(null,seq__22167_22179);
if(temp__4657__auto___22190){
var seq__22167_22191__$1 = temp__4657__auto___22190;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__22167_22191__$1)){
var c__7604__auto___22192 = cljs.core.chunk_first.call(null,seq__22167_22191__$1);
var G__22193 = cljs.core.chunk_rest.call(null,seq__22167_22191__$1);
var G__22194 = c__7604__auto___22192;
var G__22195 = cljs.core.count.call(null,c__7604__auto___22192);
var G__22196 = (0);
seq__22167_22179 = G__22193;
chunk__22168_22180 = G__22194;
count__22169_22181 = G__22195;
i__22170_22182 = G__22196;
continue;
} else {
var vec__22174_22197 = cljs.core.first.call(null,seq__22167_22191__$1);
var ev__7943__auto___22198 = cljs.core.nth.call(null,vec__22174_22197,(0),null);
var func__7944__auto___22199 = cljs.core.nth.call(null,vec__22174_22197,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___22198,func__7944__auto___22199);

var G__22200 = cljs.core.next.call(null,seq__22167_22191__$1);
var G__22201 = null;
var G__22202 = (0);
var G__22203 = (0);
seq__22167_22179 = G__22200;
chunk__22168_22180 = G__22201;
count__22169_22181 = G__22202;
i__22170_22182 = G__22203;
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
lt.objs.sidebar.workspace.rename_input = (function lt$objs$sidebar$workspace$rename_input(this$){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input.rename","input.rename",156258344),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),"text",new cljs.core.Keyword(null,"value","value",305978217),lt.objs.files.basename.call(null,new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)))], null)], null));
var seq__22214_22224 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"focus","focus",234677911),((function (e__7942__auto__){
return (function (){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"rename.focus","rename.focus",1177600987));
});})(e__7942__auto__))
,new cljs.core.Keyword(null,"blur","blur",-453500461),((function (e__7942__auto__){
return (function (){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"rename.blur","rename.blur",-1821157150));
});})(e__7942__auto__))
], null)));
var chunk__22215_22225 = null;
var count__22216_22226 = (0);
var i__22217_22227 = (0);
while(true){
if((i__22217_22227 < count__22216_22226)){
var vec__22218_22228 = cljs.core._nth.call(null,chunk__22215_22225,i__22217_22227);
var ev__7943__auto___22229 = cljs.core.nth.call(null,vec__22218_22228,(0),null);
var func__7944__auto___22230 = cljs.core.nth.call(null,vec__22218_22228,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___22229,func__7944__auto___22230);

var G__22231 = seq__22214_22224;
var G__22232 = chunk__22215_22225;
var G__22233 = count__22216_22226;
var G__22234 = (i__22217_22227 + (1));
seq__22214_22224 = G__22231;
chunk__22215_22225 = G__22232;
count__22216_22226 = G__22233;
i__22217_22227 = G__22234;
continue;
} else {
var temp__4657__auto___22235 = cljs.core.seq.call(null,seq__22214_22224);
if(temp__4657__auto___22235){
var seq__22214_22236__$1 = temp__4657__auto___22235;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__22214_22236__$1)){
var c__7604__auto___22237 = cljs.core.chunk_first.call(null,seq__22214_22236__$1);
var G__22238 = cljs.core.chunk_rest.call(null,seq__22214_22236__$1);
var G__22239 = c__7604__auto___22237;
var G__22240 = cljs.core.count.call(null,c__7604__auto___22237);
var G__22241 = (0);
seq__22214_22224 = G__22238;
chunk__22215_22225 = G__22239;
count__22216_22226 = G__22240;
i__22217_22227 = G__22241;
continue;
} else {
var vec__22221_22242 = cljs.core.first.call(null,seq__22214_22236__$1);
var ev__7943__auto___22243 = cljs.core.nth.call(null,vec__22221_22242,(0),null);
var func__7944__auto___22244 = cljs.core.nth.call(null,vec__22221_22242,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___22243,func__7944__auto___22244);

var G__22245 = cljs.core.next.call(null,seq__22214_22236__$1);
var G__22246 = null;
var G__22247 = (0);
var G__22248 = (0);
seq__22214_22224 = G__22245;
chunk__22215_22225 = G__22246;
count__22216_22226 = G__22247;
i__22217_22227 = G__22248;
continue;
}
} else {
}
}
break;
}

return e__7942__auto__;
});
lt.objs.sidebar.workspace.renameable = (function lt$objs$sidebar$workspace$renameable(this$,cur,content){
if(cljs.core.truth_(cur)){
return lt.objs.sidebar.workspace.rename_input.call(null,this$);
} else {
return content;
}
});
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","workspace.file","lt.objs.sidebar.workspace/workspace.file",-188628499),new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"tree-item","tree-item",1467250318),null,new cljs.core.Keyword(null,"workspace.file","workspace.file",-1996295850),null], null), null),new cljs.core.Keyword(null,"path","path",-188191168),"",new cljs.core.Keyword(null,"init","init",-1875481434),(function (this$,path){
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"path","path",-188191168),path], null));

return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),crate.binding.bound.call(null,this$,(function (p1__22249_SHARP_){
if(cljs.core.truth_(new cljs.core.Keyword(null,"renaming?","renaming?",-692692442).cljs$core$IFn$_invoke$arity$1(p1__22249_SHARP_))){
return "renaming";
} else {
return "";
}
}))], null),lt.objs.sidebar.workspace.rename_input.call(null,this$),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.tree-item","div.tree-item",464397449),lt.objs.sidebar.workspace.file_toggle.call(null,this$)], null)], null);
}));
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","workspace.folder","lt.objs.sidebar.workspace/workspace.folder",-483966665),new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"workspace.folder","workspace.folder",644219274),null,new cljs.core.Keyword(null,"tree-item","tree-item",1467250318),null], null), null),new cljs.core.Keyword(null,"path","path",-188191168),"",new cljs.core.Keyword(null,"open?","open?",1238443125),false,new cljs.core.Keyword(null,"realized?","realized?",-1433302186),false,new cljs.core.Keyword(null,"folders","folders",44248772),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"files","files",-472457450),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"init","init",-1875481434),(function (this$,path){
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"path","path",-188191168),path], null));

return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),crate.binding.bound.call(null,this$,(function (p1__22250_SHARP_){
if(cljs.core.truth_(new cljs.core.Keyword(null,"renaming?","renaming?",-692692442).cljs$core$IFn$_invoke$arity$1(p1__22250_SHARP_))){
return "renaming";
} else {
return "";
}
}))], null),lt.objs.sidebar.workspace.rename_input.call(null,this$),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.tree-item","div.tree-item",464397449),(cljs.core.truth_(path)?lt.objs.sidebar.workspace.folder_toggle.call(null,this$):null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),crate.binding.bound.call(null,this$,lt.objs.sidebar.workspace.sub_folders)], null)], null)], null);
}));
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","workspace.root","lt.objs.sidebar.workspace/workspace.root",1601669621),new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"workspace.root","workspace.root",-1145517492),null], null), null),new cljs.core.Keyword(null,"root?","root?",-2045639518),true,new cljs.core.Keyword(null,"open-dirs","open-dirs",-20403535),cljs.core.PersistentHashSet.EMPTY,new cljs.core.Keyword(null,"files","files",-472457450),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"folders","folders",44248772),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"open?","open?",1238443125),true,new cljs.core.Keyword(null,"init","init",-1875481434),(function (this$){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.tree-root","div.tree-root",729450401),crate.binding.bound.call(null,this$,lt.objs.sidebar.workspace.sub_folders)], null);
}));
lt.objs.sidebar.workspace.tree = lt.object.create.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","workspace.root","lt.objs.sidebar.workspace/workspace.root",1601669621));
/**
 * 
 */
lt.objs.sidebar.workspace.input = (function lt$objs$sidebar$workspace$input(type,event){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"type","type",1174270348),"file",type,true,new cljs.core.Keyword(null,"style","style",-496642736),"display:none;"], true, false)], null));
var seq__22261_22271 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"change","change",-1163046502),((function (e__7942__auto__){
return (function (){
var me = this;
if(cljs.core.empty_QMARK_.call(null,lt.util.dom.val.call(null,me))){
return null;
} else {
return lt.object.raise.call(null,lt.objs.sidebar.workspace.tree,event,lt.util.dom.val.call(null,me));
}
});})(e__7942__auto__))
], null)));
var chunk__22262_22272 = null;
var count__22263_22273 = (0);
var i__22264_22274 = (0);
while(true){
if((i__22264_22274 < count__22263_22273)){
var vec__22265_22275 = cljs.core._nth.call(null,chunk__22262_22272,i__22264_22274);
var ev__7943__auto___22276 = cljs.core.nth.call(null,vec__22265_22275,(0),null);
var func__7944__auto___22277 = cljs.core.nth.call(null,vec__22265_22275,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___22276,func__7944__auto___22277);

var G__22278 = seq__22261_22271;
var G__22279 = chunk__22262_22272;
var G__22280 = count__22263_22273;
var G__22281 = (i__22264_22274 + (1));
seq__22261_22271 = G__22278;
chunk__22262_22272 = G__22279;
count__22263_22273 = G__22280;
i__22264_22274 = G__22281;
continue;
} else {
var temp__4657__auto___22282 = cljs.core.seq.call(null,seq__22261_22271);
if(temp__4657__auto___22282){
var seq__22261_22283__$1 = temp__4657__auto___22282;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__22261_22283__$1)){
var c__7604__auto___22284 = cljs.core.chunk_first.call(null,seq__22261_22283__$1);
var G__22285 = cljs.core.chunk_rest.call(null,seq__22261_22283__$1);
var G__22286 = c__7604__auto___22284;
var G__22287 = cljs.core.count.call(null,c__7604__auto___22284);
var G__22288 = (0);
seq__22261_22271 = G__22285;
chunk__22262_22272 = G__22286;
count__22263_22273 = G__22287;
i__22264_22274 = G__22288;
continue;
} else {
var vec__22268_22289 = cljs.core.first.call(null,seq__22261_22283__$1);
var ev__7943__auto___22290 = cljs.core.nth.call(null,vec__22268_22289,(0),null);
var func__7944__auto___22291 = cljs.core.nth.call(null,vec__22268_22289,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___22290,func__7944__auto___22291);

var G__22292 = cljs.core.next.call(null,seq__22261_22283__$1);
var G__22293 = null;
var G__22294 = (0);
var G__22295 = (0);
seq__22261_22271 = G__22292;
chunk__22262_22272 = G__22293;
count__22263_22273 = G__22294;
i__22264_22274 = G__22295;
continue;
}
} else {
}
}
break;
}

return e__7942__auto__;
});
lt.objs.sidebar.workspace.open_folder = (function lt$objs$sidebar$workspace$open_folder(){
return lt.objs.dialogs.dir.call(null,lt.objs.sidebar.workspace.tree,new cljs.core.Keyword(null,"workspace.add.folder!","workspace.add.folder!",-291748281));
});
lt.objs.sidebar.workspace.open_file = (function lt$objs$sidebar$workspace$open_file(){
return lt.objs.dialogs.file.call(null,lt.objs.sidebar.workspace.tree,new cljs.core.Keyword(null,"workspace.add.file!","workspace.add.file!",-382028482));
});
/**
 * 
 */
lt.objs.sidebar.workspace.button = (function lt$objs$sidebar$workspace$button(name,action){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),name], null));
var seq__22306_22316 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),action], null)));
var chunk__22307_22317 = null;
var count__22308_22318 = (0);
var i__22309_22319 = (0);
while(true){
if((i__22309_22319 < count__22308_22318)){
var vec__22310_22320 = cljs.core._nth.call(null,chunk__22307_22317,i__22309_22319);
var ev__7943__auto___22321 = cljs.core.nth.call(null,vec__22310_22320,(0),null);
var func__7944__auto___22322 = cljs.core.nth.call(null,vec__22310_22320,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___22321,func__7944__auto___22322);

var G__22323 = seq__22306_22316;
var G__22324 = chunk__22307_22317;
var G__22325 = count__22308_22318;
var G__22326 = (i__22309_22319 + (1));
seq__22306_22316 = G__22323;
chunk__22307_22317 = G__22324;
count__22308_22318 = G__22325;
i__22309_22319 = G__22326;
continue;
} else {
var temp__4657__auto___22327 = cljs.core.seq.call(null,seq__22306_22316);
if(temp__4657__auto___22327){
var seq__22306_22328__$1 = temp__4657__auto___22327;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__22306_22328__$1)){
var c__7604__auto___22329 = cljs.core.chunk_first.call(null,seq__22306_22328__$1);
var G__22330 = cljs.core.chunk_rest.call(null,seq__22306_22328__$1);
var G__22331 = c__7604__auto___22329;
var G__22332 = cljs.core.count.call(null,c__7604__auto___22329);
var G__22333 = (0);
seq__22306_22316 = G__22330;
chunk__22307_22317 = G__22331;
count__22308_22318 = G__22332;
i__22309_22319 = G__22333;
continue;
} else {
var vec__22313_22334 = cljs.core.first.call(null,seq__22306_22328__$1);
var ev__7943__auto___22335 = cljs.core.nth.call(null,vec__22313_22334,(0),null);
var func__7944__auto___22336 = cljs.core.nth.call(null,vec__22313_22334,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___22335,func__7944__auto___22336);

var G__22337 = cljs.core.next.call(null,seq__22306_22328__$1);
var G__22338 = null;
var G__22339 = (0);
var G__22340 = (0);
seq__22306_22316 = G__22337;
chunk__22307_22317 = G__22338;
count__22308_22318 = G__22339;
i__22309_22319 = G__22340;
continue;
}
} else {
}
}
break;
}

return e__7942__auto__;
});
lt.objs.sidebar.workspace.recent = (function lt$objs$sidebar$workspace$recent(this$){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"recent!","recent!",-1515777611));
});
/**
 * 
 */
lt.objs.sidebar.workspace.recents_item = (function lt$objs$sidebar$workspace$recents_item(this$){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul.folders","ul.folders",-1463452329),(function (){var iter__7573__auto__ = (function lt$objs$sidebar$workspace$recents_item_$_iter__22359(s__22360){
return (new cljs.core.LazySeq(null,(function (){
var s__22360__$1 = s__22360;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__22360__$1);
if(temp__4657__auto__){
var s__22360__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__22360__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__22360__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__22362 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__22361 = (0);
while(true){
if((i__22361 < size__7572__auto__)){
var f = cljs.core._nth.call(null,c__7571__auto__,i__22361);
cljs.core.chunk_append.call(null,b__22362,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),lt.objs.files.basename.call(null,f),lt.objs.files.separator], null));

var G__22377 = (i__22361 + (1));
i__22361 = G__22377;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__22362),lt$objs$sidebar$workspace$recents_item_$_iter__22359.call(null,cljs.core.chunk_rest.call(null,s__22360__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__22362),null);
}
} else {
var f = cljs.core.first.call(null,s__22360__$2);
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),lt.objs.files.basename.call(null,f),lt.objs.files.separator], null),lt$objs$sidebar$workspace$recents_item_$_iter__22359.call(null,cljs.core.rest.call(null,s__22360__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__7573__auto__.call(null,new cljs.core.Keyword(null,"folders","folders",44248772).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
})()], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul.files","ul.files",1940783393),(function (){var iter__7573__auto__ = (function lt$objs$sidebar$workspace$recents_item_$_iter__22363(s__22364){
return (new cljs.core.LazySeq(null,(function (){
var s__22364__$1 = s__22364;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__22364__$1);
if(temp__4657__auto__){
var s__22364__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__22364__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__22364__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__22366 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__22365 = (0);
while(true){
if((i__22365 < size__7572__auto__)){
var f = cljs.core._nth.call(null,c__7571__auto__,i__22365);
cljs.core.chunk_append.call(null,b__22366,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),lt.objs.files.basename.call(null,f)], null));

var G__22378 = (i__22365 + (1));
i__22365 = G__22378;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__22366),lt$objs$sidebar$workspace$recents_item_$_iter__22363.call(null,cljs.core.chunk_rest.call(null,s__22364__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__22366),null);
}
} else {
var f = cljs.core.first.call(null,s__22364__$2);
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),lt.objs.files.basename.call(null,f)], null),lt$objs$sidebar$workspace$recents_item_$_iter__22363.call(null,cljs.core.rest.call(null,s__22364__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__7573__auto__.call(null,new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
})()], null)], null));
var seq__22367_22379 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"contextmenu","contextmenu",-15887481),((function (e__7942__auto__){
return (function (e){
lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"menu!","menu!",-1593399467),e);

lt.util.dom.prevent.call(null,e);

return lt.util.dom.stop_propagation.call(null,e);
});})(e__7942__auto__))
,new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"select!","select!",1013647471));
});})(e__7942__auto__))
], null)));
var chunk__22368_22380 = null;
var count__22369_22381 = (0);
var i__22370_22382 = (0);
while(true){
if((i__22370_22382 < count__22369_22381)){
var vec__22371_22383 = cljs.core._nth.call(null,chunk__22368_22380,i__22370_22382);
var ev__7943__auto___22384 = cljs.core.nth.call(null,vec__22371_22383,(0),null);
var func__7944__auto___22385 = cljs.core.nth.call(null,vec__22371_22383,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___22384,func__7944__auto___22385);

var G__22386 = seq__22367_22379;
var G__22387 = chunk__22368_22380;
var G__22388 = count__22369_22381;
var G__22389 = (i__22370_22382 + (1));
seq__22367_22379 = G__22386;
chunk__22368_22380 = G__22387;
count__22369_22381 = G__22388;
i__22370_22382 = G__22389;
continue;
} else {
var temp__4657__auto___22390 = cljs.core.seq.call(null,seq__22367_22379);
if(temp__4657__auto___22390){
var seq__22367_22391__$1 = temp__4657__auto___22390;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__22367_22391__$1)){
var c__7604__auto___22392 = cljs.core.chunk_first.call(null,seq__22367_22391__$1);
var G__22393 = cljs.core.chunk_rest.call(null,seq__22367_22391__$1);
var G__22394 = c__7604__auto___22392;
var G__22395 = cljs.core.count.call(null,c__7604__auto___22392);
var G__22396 = (0);
seq__22367_22379 = G__22393;
chunk__22368_22380 = G__22394;
count__22369_22381 = G__22395;
i__22370_22382 = G__22396;
continue;
} else {
var vec__22374_22397 = cljs.core.first.call(null,seq__22367_22391__$1);
var ev__7943__auto___22398 = cljs.core.nth.call(null,vec__22374_22397,(0),null);
var func__7944__auto___22399 = cljs.core.nth.call(null,vec__22374_22397,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___22398,func__7944__auto___22399);

var G__22400 = cljs.core.next.call(null,seq__22367_22391__$1);
var G__22401 = null;
var G__22402 = (0);
var G__22403 = (0);
seq__22367_22379 = G__22400;
chunk__22368_22380 = G__22401;
count__22369_22381 = G__22402;
i__22370_22382 = G__22403;
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
lt.objs.sidebar.workspace.back_button = (function lt$objs$sidebar$workspace$back_button(this$){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),"Select a workspace"], null));
var seq__22414_22424 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"tree!","tree!",-1706577853));
});})(e__7942__auto__))
], null)));
var chunk__22415_22425 = null;
var count__22416_22426 = (0);
var i__22417_22427 = (0);
while(true){
if((i__22417_22427 < count__22416_22426)){
var vec__22418_22428 = cljs.core._nth.call(null,chunk__22415_22425,i__22417_22427);
var ev__7943__auto___22429 = cljs.core.nth.call(null,vec__22418_22428,(0),null);
var func__7944__auto___22430 = cljs.core.nth.call(null,vec__22418_22428,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___22429,func__7944__auto___22430);

var G__22431 = seq__22414_22424;
var G__22432 = chunk__22415_22425;
var G__22433 = count__22416_22426;
var G__22434 = (i__22417_22427 + (1));
seq__22414_22424 = G__22431;
chunk__22415_22425 = G__22432;
count__22416_22426 = G__22433;
i__22417_22427 = G__22434;
continue;
} else {
var temp__4657__auto___22435 = cljs.core.seq.call(null,seq__22414_22424);
if(temp__4657__auto___22435){
var seq__22414_22436__$1 = temp__4657__auto___22435;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__22414_22436__$1)){
var c__7604__auto___22437 = cljs.core.chunk_first.call(null,seq__22414_22436__$1);
var G__22438 = cljs.core.chunk_rest.call(null,seq__22414_22436__$1);
var G__22439 = c__7604__auto___22437;
var G__22440 = cljs.core.count.call(null,c__7604__auto___22437);
var G__22441 = (0);
seq__22414_22424 = G__22438;
chunk__22415_22425 = G__22439;
count__22416_22426 = G__22440;
i__22417_22427 = G__22441;
continue;
} else {
var vec__22421_22442 = cljs.core.first.call(null,seq__22414_22436__$1);
var ev__7943__auto___22443 = cljs.core.nth.call(null,vec__22421_22442,(0),null);
var func__7944__auto___22444 = cljs.core.nth.call(null,vec__22421_22442,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___22443,func__7944__auto___22444);

var G__22445 = cljs.core.next.call(null,seq__22414_22436__$1);
var G__22446 = null;
var G__22447 = (0);
var G__22448 = (0);
seq__22414_22424 = G__22445;
chunk__22415_22425 = G__22446;
count__22416_22426 = G__22447;
i__22417_22427 = G__22448;
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
lt.objs.sidebar.workspace.recents = (function lt$objs$sidebar$workspace$recents(this$,rs){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),lt.objs.sidebar.workspace.back_button.call(null,this$),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",-1349521403),(function (){var iter__7573__auto__ = (function lt$objs$sidebar$workspace$recents_$_iter__22463(s__22464){
return (new cljs.core.LazySeq(null,(function (){
var s__22464__$1 = s__22464;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__22464__$1);
if(temp__4657__auto__){
var s__22464__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__22464__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__22464__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__22466 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__22465 = (0);
while(true){
if((i__22465 < size__7572__auto__)){
var r = cljs.core._nth.call(null,c__7571__auto__,i__22465);
cljs.core.chunk_append.call(null,b__22466,lt.object.__GT_content.call(null,r));

var G__22477 = (i__22465 + (1));
i__22465 = G__22477;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__22466),lt$objs$sidebar$workspace$recents_$_iter__22463.call(null,cljs.core.chunk_rest.call(null,s__22464__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__22466),null);
}
} else {
var r = cljs.core.first.call(null,s__22464__$2);
return cljs.core.cons.call(null,lt.object.__GT_content.call(null,r),lt$objs$sidebar$workspace$recents_$_iter__22463.call(null,cljs.core.rest.call(null,s__22464__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__7573__auto__.call(null,rs);
})()], null)], null));
var seq__22467_22478 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),cljs.core.PersistentVector.EMPTY));
var chunk__22468_22479 = null;
var count__22469_22480 = (0);
var i__22470_22481 = (0);
while(true){
if((i__22470_22481 < count__22469_22480)){
var vec__22471_22482 = cljs.core._nth.call(null,chunk__22468_22479,i__22470_22481);
var ev__7943__auto___22483 = cljs.core.nth.call(null,vec__22471_22482,(0),null);
var func__7944__auto___22484 = cljs.core.nth.call(null,vec__22471_22482,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___22483,func__7944__auto___22484);

var G__22485 = seq__22467_22478;
var G__22486 = chunk__22468_22479;
var G__22487 = count__22469_22480;
var G__22488 = (i__22470_22481 + (1));
seq__22467_22478 = G__22485;
chunk__22468_22479 = G__22486;
count__22469_22480 = G__22487;
i__22470_22481 = G__22488;
continue;
} else {
var temp__4657__auto___22489 = cljs.core.seq.call(null,seq__22467_22478);
if(temp__4657__auto___22489){
var seq__22467_22490__$1 = temp__4657__auto___22489;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__22467_22490__$1)){
var c__7604__auto___22491 = cljs.core.chunk_first.call(null,seq__22467_22490__$1);
var G__22492 = cljs.core.chunk_rest.call(null,seq__22467_22490__$1);
var G__22493 = c__7604__auto___22491;
var G__22494 = cljs.core.count.call(null,c__7604__auto___22491);
var G__22495 = (0);
seq__22467_22478 = G__22492;
chunk__22468_22479 = G__22493;
count__22469_22480 = G__22494;
i__22470_22481 = G__22495;
continue;
} else {
var vec__22474_22496 = cljs.core.first.call(null,seq__22467_22490__$1);
var ev__7943__auto___22497 = cljs.core.nth.call(null,vec__22474_22496,(0),null);
var func__7944__auto___22498 = cljs.core.nth.call(null,vec__22474_22496,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___22497,func__7944__auto___22498);

var G__22499 = cljs.core.next.call(null,seq__22467_22490__$1);
var G__22500 = null;
var G__22501 = (0);
var G__22502 = (0);
seq__22467_22478 = G__22499;
chunk__22468_22479 = G__22500;
count__22469_22480 = G__22501;
i__22470_22481 = G__22502;
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
lt.objs.sidebar.workspace.__BEH__recent_BANG_ = (function lt$objs$sidebar$workspace$__BEH__recent_BANG_(this$){
var seq__22508_22512 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"recents","recents",1354038854).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
var chunk__22509_22513 = null;
var count__22510_22514 = (0);
var i__22511_22515 = (0);
while(true){
if((i__22511_22515 < count__22510_22514)){
var r_22516 = cljs.core._nth.call(null,chunk__22509_22513,i__22511_22515);
lt.object.destroy_BANG_.call(null,r_22516);

var G__22517 = seq__22508_22512;
var G__22518 = chunk__22509_22513;
var G__22519 = count__22510_22514;
var G__22520 = (i__22511_22515 + (1));
seq__22508_22512 = G__22517;
chunk__22509_22513 = G__22518;
count__22510_22514 = G__22519;
i__22511_22515 = G__22520;
continue;
} else {
var temp__4657__auto___22521 = cljs.core.seq.call(null,seq__22508_22512);
if(temp__4657__auto___22521){
var seq__22508_22522__$1 = temp__4657__auto___22521;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__22508_22522__$1)){
var c__7604__auto___22523 = cljs.core.chunk_first.call(null,seq__22508_22522__$1);
var G__22524 = cljs.core.chunk_rest.call(null,seq__22508_22522__$1);
var G__22525 = c__7604__auto___22523;
var G__22526 = cljs.core.count.call(null,c__7604__auto___22523);
var G__22527 = (0);
seq__22508_22512 = G__22524;
chunk__22509_22513 = G__22525;
count__22510_22514 = G__22526;
i__22511_22515 = G__22527;
continue;
} else {
var r_22528 = cljs.core.first.call(null,seq__22508_22522__$1);
lt.object.destroy_BANG_.call(null,r_22528);

var G__22529 = cljs.core.next.call(null,seq__22508_22522__$1);
var G__22530 = null;
var G__22531 = (0);
var G__22532 = (0);
seq__22508_22512 = G__22529;
chunk__22509_22513 = G__22530;
count__22510_22514 = G__22531;
i__22511_22515 = G__22532;
continue;
}
} else {
}
}
break;
}

return lt.object.merge_BANG_.call(null,this$,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"recents","recents",1354038854)],[cljs.core.map.call(null,(function (p1__22503_SHARP_){
return lt.object.create.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","recent-workspace","lt.objs.sidebar.workspace/recent-workspace",1678198322),p1__22503_SHARP_);
}),lt.objs.workspace.all.call(null))]));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","recent!","lt.objs.sidebar.workspace/recent!",-104279772),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"recent!","recent!",-1515777611),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.workspace.__BEH__recent_BANG_);
/**
 * 
 */
lt.objs.sidebar.workspace.__BEH__tree_BANG_ = (function lt$objs$sidebar$workspace$__BEH__tree_BANG_(this$){
var seq__22537_22541 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"recents","recents",1354038854).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
var chunk__22538_22542 = null;
var count__22539_22543 = (0);
var i__22540_22544 = (0);
while(true){
if((i__22540_22544 < count__22539_22543)){
var r_22545 = cljs.core._nth.call(null,chunk__22538_22542,i__22540_22544);
lt.object.destroy_BANG_.call(null,r_22545);

var G__22546 = seq__22537_22541;
var G__22547 = chunk__22538_22542;
var G__22548 = count__22539_22543;
var G__22549 = (i__22540_22544 + (1));
seq__22537_22541 = G__22546;
chunk__22538_22542 = G__22547;
count__22539_22543 = G__22548;
i__22540_22544 = G__22549;
continue;
} else {
var temp__4657__auto___22550 = cljs.core.seq.call(null,seq__22537_22541);
if(temp__4657__auto___22550){
var seq__22537_22551__$1 = temp__4657__auto___22550;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__22537_22551__$1)){
var c__7604__auto___22552 = cljs.core.chunk_first.call(null,seq__22537_22551__$1);
var G__22553 = cljs.core.chunk_rest.call(null,seq__22537_22551__$1);
var G__22554 = c__7604__auto___22552;
var G__22555 = cljs.core.count.call(null,c__7604__auto___22552);
var G__22556 = (0);
seq__22537_22541 = G__22553;
chunk__22538_22542 = G__22554;
count__22539_22543 = G__22555;
i__22540_22544 = G__22556;
continue;
} else {
var r_22557 = cljs.core.first.call(null,seq__22537_22551__$1);
lt.object.destroy_BANG_.call(null,r_22557);

var G__22558 = cljs.core.next.call(null,seq__22537_22551__$1);
var G__22559 = null;
var G__22560 = (0);
var G__22561 = (0);
seq__22537_22541 = G__22558;
chunk__22538_22542 = G__22559;
count__22539_22543 = G__22560;
i__22540_22544 = G__22561;
continue;
}
} else {
}
}
break;
}

return lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"recents","recents",1354038854),null], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","tree!","lt.objs.sidebar.workspace/tree!",-561057842),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tree!","tree!",-1706577853),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.workspace.__BEH__tree_BANG_);
/**
 * 
 */
lt.objs.sidebar.workspace.__BEH__recent__DOT__select_BANG_ = (function lt$objs$sidebar$workspace$__BEH__recent__DOT__select_BANG_(this$){
lt.objs.workspace.open.call(null,lt.objs.workspace.current_ws,new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));

return lt.object.raise.call(null,lt.objs.sidebar.workspace.sidebar_workspace,new cljs.core.Keyword(null,"tree!","tree!",-1706577853));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","recent.select!","lt.objs.sidebar.workspace/recent.select!",-1679936993),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"select!","select!",1013647471),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.workspace.__BEH__recent__DOT__select_BANG_);
/**
 * 
 */
lt.objs.sidebar.workspace.__BEH__recent__DOT__delete_BANG_ = (function lt$objs$sidebar$workspace$__BEH__recent__DOT__delete_BANG_(this$){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.workspace.current_ws)),lt.objs.files.basename.call(null,new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))))){
lt.object.raise.call(null,lt.objs.sidebar.workspace.tree,new cljs.core.Keyword(null,"clear!","clear!",-144814418));
} else {
}

lt.objs.files.delete_BANG_.call(null,new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));

return lt.object.raise.call(null,lt.objs.sidebar.workspace.sidebar_workspace,new cljs.core.Keyword(null,"recent!","recent!",-1515777611));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","recent.delete!","lt.objs.sidebar.workspace/recent.delete!",2058129523),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"delete!","delete!",-593410251),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.workspace.__BEH__recent__DOT__delete_BANG_);
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","recent-workspace","lt.objs.sidebar.workspace/recent-workspace",1678198322),new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"recent-workspace","recent-workspace",1472497289),null], null), null),new cljs.core.Keyword(null,"init","init",-1875481434),(function (this$,r){
lt.object.merge_BANG_.call(null,this$,r);

return lt.objs.sidebar.workspace.recents_item.call(null,this$);
}));
lt.objs.sidebar.workspace.ws_class = (function lt$objs$sidebar$workspace$ws_class(ws){
return [cljs.core.str("workspace"),cljs.core.str((cljs.core.truth_(new cljs.core.Keyword(null,"recents","recents",1354038854).cljs$core$IFn$_invoke$arity$1(ws))?" recents":null))].join('');
});
/**
 * 
 */
lt.objs.sidebar.workspace.workspace_ui = (function lt$objs$sidebar$workspace$workspace_ui(this$){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),crate.binding.bound.call(null,this$,lt.objs.sidebar.workspace.ws_class)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.wstree","div.wstree",965087796),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul.buttons","ul.buttons",165942935),lt.objs.sidebar.workspace.button.call(null,"folder",lt.objs.sidebar.workspace.open_folder),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li.sep","li.sep",-1432904837),"|"], null),lt.objs.sidebar.workspace.button.call(null,"file",lt.objs.sidebar.workspace.open_file),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li.sep","li.sep",-1432904837),"|"], null),lt.objs.sidebar.workspace.button.call(null,"recent",(function (){
return lt.objs.sidebar.workspace.recent.call(null,this$);
}))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul.root","ul.root",1170273099),lt.object.__GT_content.call(null,lt.objs.sidebar.workspace.tree)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.recent","div.recent",2058400800),crate.binding.bound.call(null,this$,(function (sw){
return lt.objs.sidebar.workspace.recents.call(null,this$,new cljs.core.Keyword(null,"recents","recents",1354038854).cljs$core$IFn$_invoke$arity$1(sw));
}))], null)], null));
var seq__22572_22582 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dragover","dragover",-1169536926),((function (e__7942__auto__){
return (function (e){
e.dataTransfer.dropEffect = "move";

lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"dragover","dragover",-1169536926),e);

lt.util.dom.prevent.call(null,e);

return false;
});})(e__7942__auto__))
,new cljs.core.Keyword(null,"drop","drop",364481611),((function (e__7942__auto__){
return (function (e){
lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"drop","drop",364481611),e);

lt.util.dom.stop_propagation.call(null,e);

return lt.util.dom.prevent.call(null,e);
});})(e__7942__auto__))
,new cljs.core.Keyword(null,"contextmenu","contextmenu",-15887481),((function (e__7942__auto__){
return (function (e){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"menu!","menu!",-1593399467),e);
});})(e__7942__auto__))
], null)));
var chunk__22573_22583 = null;
var count__22574_22584 = (0);
var i__22575_22585 = (0);
while(true){
if((i__22575_22585 < count__22574_22584)){
var vec__22576_22586 = cljs.core._nth.call(null,chunk__22573_22583,i__22575_22585);
var ev__7943__auto___22587 = cljs.core.nth.call(null,vec__22576_22586,(0),null);
var func__7944__auto___22588 = cljs.core.nth.call(null,vec__22576_22586,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___22587,func__7944__auto___22588);

var G__22589 = seq__22572_22582;
var G__22590 = chunk__22573_22583;
var G__22591 = count__22574_22584;
var G__22592 = (i__22575_22585 + (1));
seq__22572_22582 = G__22589;
chunk__22573_22583 = G__22590;
count__22574_22584 = G__22591;
i__22575_22585 = G__22592;
continue;
} else {
var temp__4657__auto___22593 = cljs.core.seq.call(null,seq__22572_22582);
if(temp__4657__auto___22593){
var seq__22572_22594__$1 = temp__4657__auto___22593;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__22572_22594__$1)){
var c__7604__auto___22595 = cljs.core.chunk_first.call(null,seq__22572_22594__$1);
var G__22596 = cljs.core.chunk_rest.call(null,seq__22572_22594__$1);
var G__22597 = c__7604__auto___22595;
var G__22598 = cljs.core.count.call(null,c__7604__auto___22595);
var G__22599 = (0);
seq__22572_22582 = G__22596;
chunk__22573_22583 = G__22597;
count__22574_22584 = G__22598;
i__22575_22585 = G__22599;
continue;
} else {
var vec__22579_22600 = cljs.core.first.call(null,seq__22572_22594__$1);
var ev__7943__auto___22601 = cljs.core.nth.call(null,vec__22579_22600,(0),null);
var func__7944__auto___22602 = cljs.core.nth.call(null,vec__22579_22600,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___22601,func__7944__auto___22602);

var G__22603 = cljs.core.next.call(null,seq__22572_22594__$1);
var G__22604 = null;
var G__22605 = (0);
var G__22606 = (0);
seq__22572_22582 = G__22603;
chunk__22573_22583 = G__22604;
count__22574_22584 = G__22605;
i__22575_22585 = G__22606;
continue;
}
} else {
}
}
break;
}

return e__7942__auto__;
});
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","sidebar.workspace","lt.objs.sidebar.workspace/sidebar.workspace",717389989),new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"sidebar.workspace","sidebar.workspace",1585561596),null], null), null),new cljs.core.Keyword(null,"label","label",1718410804),"workspace",new cljs.core.Keyword(null,"order","order",-1254677256),(-7),new cljs.core.Keyword(null,"init","init",-1875481434),(function (this$){
return lt.objs.sidebar.workspace.workspace_ui.call(null,this$);
}));
/**
 * 
 */
lt.objs.sidebar.workspace.__BEH__sidebar_menu = (function lt$objs$sidebar$workspace$__BEH__sidebar_menu(this$,items){
return cljs.core.conj.call(null,items,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"Add folder",new cljs.core.Keyword(null,"click","click",1912301393),(function (){
return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"workspace.add-folder","workspace.add-folder",-1962688089));
})], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"Add file",new cljs.core.Keyword(null,"click","click",1912301393),(function (){
return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"workspace.add-file","workspace.add-file",-685410938));
})], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"Open recent workspace",new cljs.core.Keyword(null,"click","click",1912301393),(function (){
return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"workspace.show-recents","workspace.show-recents",1671442122));
})], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),"separator"], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"Clear workspace",new cljs.core.Keyword(null,"click","click",1912301393),(function (){
return lt.object.raise.call(null,lt.objs.sidebar.workspace.tree,new cljs.core.Keyword(null,"clear!","clear!",-144814418));
})], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","sidebar-menu","lt.objs.sidebar.workspace/sidebar-menu",-1724111606),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"menu-items","menu-items",-1870634357),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.workspace.__BEH__sidebar_menu);
/**
 * 
 */
lt.objs.sidebar.workspace.__BEH__recent_menu = (function lt$objs$sidebar$workspace$__BEH__recent_menu(this$,items){
return cljs.core.conj.call(null,items,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"Delete Workspace",new cljs.core.Keyword(null,"click","click",1912301393),(function (){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"delete!","delete!",-593410251));
})], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","recent-menu","lt.objs.sidebar.workspace/recent-menu",908450826),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"menu-items","menu-items",-1870634357),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.workspace.__BEH__recent_menu);
/**
 * 
 */
lt.objs.sidebar.workspace.__BEH__workspace__DOT__open_on_start = (function lt$objs$sidebar$workspace$__BEH__workspace__DOT__open_on_start(this$){
return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"workspace.show","workspace.show",-1449362332));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","workspace.open-on-start","lt.objs.sidebar.workspace/workspace.open-on-start",-689547786),new cljs.core.Keyword(null,"desc","desc",2093485764),"Workspace: Show workspace on start",new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"init","init",-1875481434),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.workspace.__BEH__workspace__DOT__open_on_start);
lt.objs.sidebar.workspace.sidebar_workspace = lt.object.create.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","sidebar.workspace","lt.objs.sidebar.workspace/sidebar.workspace",717389989));
lt.objs.sidebar.add_item.call(null,lt.objs.sidebar.sidebar,lt.objs.sidebar.workspace.sidebar_workspace);
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"workspace.add-folder","workspace.add-folder",-1962688089),new cljs.core.Keyword(null,"desc","desc",2093485764),"Workspace: add folder",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.objs.sidebar.workspace.open_folder.call(null);
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"workspace.add-file","workspace.add-file",-685410938),new cljs.core.Keyword(null,"desc","desc",2093485764),"Workspace: add file",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.objs.sidebar.workspace.open_file.call(null);
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"workspace.show","workspace.show",-1449362332),new cljs.core.Keyword(null,"desc","desc",2093485764),"Workspace: Toggle workspace tree",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (force_QMARK_){
return lt.object.raise.call(null,lt.objs.sidebar.sidebar,new cljs.core.Keyword(null,"toggle","toggle",1291842030),lt.objs.sidebar.workspace.sidebar_workspace,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"transient?","transient?",1694525927),false,new cljs.core.Keyword(null,"force?","force?",1839038675),force_QMARK_], null));
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"workspace.rename.cancel!","workspace.rename.cancel!",2062060048),new cljs.core.Keyword(null,"desc","desc",2093485764),"Workspace: Cancel rename",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.context.__GT_obj.call(null,new cljs.core.Keyword(null,"tree.rename","tree.rename",1886094939));
if(cljs.core.truth_(temp__4657__auto__)){
var c = temp__4657__auto__;
return lt.object.raise.call(null,c,new cljs.core.Keyword(null,"rename.cancel!","rename.cancel!",-1845937529));
} else {
return null;
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"workspace.rename.submit!","workspace.rename.submit!",-775635686),new cljs.core.Keyword(null,"desc","desc",2093485764),"Workspace: Submit rename",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.context.__GT_obj.call(null,new cljs.core.Keyword(null,"tree.rename","tree.rename",1886094939));
if(cljs.core.truth_(temp__4657__auto__)){
var c = temp__4657__auto__;
return lt.object.raise.call(null,c,new cljs.core.Keyword(null,"rename.submit!","rename.submit!",834323059));
} else {
return null;
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"workspace.show-recents","workspace.show-recents",1671442122),new cljs.core.Keyword(null,"desc","desc",2093485764),"Workspace: Open recent workspace",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"workspace.show","workspace.show",-1449362332),new cljs.core.Keyword(null,"force","force",781957286));

return lt.objs.sidebar.workspace.recent.call(null,lt.objs.sidebar.workspace.sidebar_workspace);
})], null));
