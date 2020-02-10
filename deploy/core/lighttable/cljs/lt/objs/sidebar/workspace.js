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
return (function (p1__21940_SHARP_){
return lt.object.create.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","workspace.file","lt.objs.sidebar.workspace/workspace.file",-188628499),p1__21940_SHARP_);
});})(fs))
,new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(fs)),new cljs.core.Keyword(null,"folders","folders",44248772),cljs.core.mapv.call(null,((function (fs){
return (function (p1__21941_SHARP_){
return lt.object.create.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","workspace.folder","lt.objs.sidebar.workspace/workspace.folder",-483966665),p1__21941_SHARP_);
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
return cljs.core.first.call(null,cljs.core.filter.call(null,(function (p1__21942_SHARP_){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,p1__21942_SHARP_)),path);
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
var seq__21947 = cljs.core.seq.call(null,lt.util.dom.children.call(null,folder));
var chunk__21948 = null;
var count__21949 = (0);
var i__21950 = (0);
while(true){
if((i__21950 < count__21949)){
var child = cljs.core._nth.call(null,chunk__21948,i__21950);
lt.util.dom.css.call(null,child,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"width","width",-384071477),width], null));

var G__21951 = seq__21947;
var G__21952 = chunk__21948;
var G__21953 = count__21949;
var G__21954 = (i__21950 + (1));
seq__21947 = G__21951;
chunk__21948 = G__21952;
count__21949 = G__21953;
i__21950 = G__21954;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__21947);
if(temp__4657__auto__){
var seq__21947__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__21947__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__21947__$1);
var G__21955 = cljs.core.chunk_rest.call(null,seq__21947__$1);
var G__21956 = c__7604__auto__;
var G__21957 = cljs.core.count.call(null,c__7604__auto__);
var G__21958 = (0);
seq__21947 = G__21955;
chunk__21948 = G__21956;
count__21949 = G__21957;
i__21950 = G__21958;
continue;
} else {
var child = cljs.core.first.call(null,seq__21947__$1);
lt.util.dom.css.call(null,child,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"width","width",-384071477),width], null));

var G__21959 = cljs.core.next.call(null,seq__21947__$1);
var G__21960 = null;
var G__21961 = (0);
var G__21962 = (0);
seq__21947 = G__21959;
chunk__21948 = G__21960;
count__21949 = G__21961;
i__21950 = G__21962;
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
var seq__21967_21971 = cljs.core.seq.call(null,cljs.core.concat.call(null,new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),new cljs.core.Keyword(null,"folders","folders",44248772).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))));
var chunk__21968_21972 = null;
var count__21969_21973 = (0);
var i__21970_21974 = (0);
while(true){
if((i__21970_21974 < count__21969_21973)){
var f_21975 = cljs.core._nth.call(null,chunk__21968_21972,i__21970_21974);
lt.object.destroy_BANG_.call(null,f_21975);

var G__21976 = seq__21967_21971;
var G__21977 = chunk__21968_21972;
var G__21978 = count__21969_21973;
var G__21979 = (i__21970_21974 + (1));
seq__21967_21971 = G__21976;
chunk__21968_21972 = G__21977;
count__21969_21973 = G__21978;
i__21970_21974 = G__21979;
continue;
} else {
var temp__4657__auto___21980 = cljs.core.seq.call(null,seq__21967_21971);
if(temp__4657__auto___21980){
var seq__21967_21981__$1 = temp__4657__auto___21980;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__21967_21981__$1)){
var c__7604__auto___21982 = cljs.core.chunk_first.call(null,seq__21967_21981__$1);
var G__21983 = cljs.core.chunk_rest.call(null,seq__21967_21981__$1);
var G__21984 = c__7604__auto___21982;
var G__21985 = cljs.core.count.call(null,c__7604__auto___21982);
var G__21986 = (0);
seq__21967_21971 = G__21983;
chunk__21968_21972 = G__21984;
count__21969_21973 = G__21985;
i__21970_21974 = G__21986;
continue;
} else {
var f_21987 = cljs.core.first.call(null,seq__21967_21981__$1);
lt.object.destroy_BANG_.call(null,f_21987);

var G__21988 = cljs.core.next.call(null,seq__21967_21981__$1);
var G__21989 = null;
var G__21990 = (0);
var G__21991 = (0);
seq__21967_21971 = G__21988;
chunk__21968_21972 = G__21989;
count__21969_21973 = G__21990;
i__21970_21974 = G__21991;
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
var map__21994 = cljs.core.deref.call(null,ws);
var map__21994__$1 = ((((!((map__21994 == null)))?((((map__21994.cljs$lang$protocol_mask$partition0$ & (64))) || (map__21994.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__21994):map__21994);
var folders = cljs.core.get.call(null,map__21994__$1,new cljs.core.Keyword(null,"folders","folders",44248772));
var files = cljs.core.get.call(null,map__21994__$1,new cljs.core.Keyword(null,"files","files",-472457450));
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
var temp__4657__auto___21996__$1 = lt.objs.sidebar.workspace.find_by_path.call(null,lt.objs.files.parent.call(null,path));
if(cljs.core.truth_(temp__4657__auto___21996__$1)){
var p_21997 = temp__4657__auto___21996__$1;
lt.objs.sidebar.workspace.remove_child.call(null,p_21997,child);
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
var path_21998 = (e.dataTransfer.files[i]).path;
if(cljs.core.truth_(lt.objs.files.dir_QMARK_.call(null,path_21998))){
lt.object.raise.call(null,lt.objs.workspace.current_ws,new cljs.core.Keyword(null,"add.folder!","add.folder!",755480535),path_21998);
} else {
lt.object.raise.call(null,lt.objs.workspace.current_ws,new cljs.core.Keyword(null,"add.file!","add.file!",-439765985),path_21998);
}

var G__21999 = (i + (1));
i = G__21999;
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

var docs_22008 = cljs.core.get_in.call(null,cljs.core.deref.call(null,lt.objs.document.manager),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"files","files",-472457450)], null));
var old_path_22009 = clojure.string.join.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [path,lt.objs.files.separator], null));
var affected_22010 = cljs.core.filter.call(null,((function (docs_22008,old_path_22009,root_QMARK_,path,neue){
return (function (x){
return x.startsWith(old_path_22009);
});})(docs_22008,old_path_22009,root_QMARK_,path,neue))
,cljs.core.keys.call(null,docs_22008));
var seq__22004_22011 = cljs.core.seq.call(null,affected_22010);
var chunk__22005_22012 = null;
var count__22006_22013 = (0);
var i__22007_22014 = (0);
while(true){
if((i__22007_22014 < count__22006_22013)){
var old_fpath_22015 = cljs.core._nth.call(null,chunk__22005_22012,i__22007_22014);
var new_fpath_22016 = clojure.string.replace_first.call(null,old_fpath_22015,path,neue);
lt.objs.document.move_doc.call(null,old_fpath_22015,new_fpath_22016);

var G__22017 = seq__22004_22011;
var G__22018 = chunk__22005_22012;
var G__22019 = count__22006_22013;
var G__22020 = (i__22007_22014 + (1));
seq__22004_22011 = G__22017;
chunk__22005_22012 = G__22018;
count__22006_22013 = G__22019;
i__22007_22014 = G__22020;
continue;
} else {
var temp__4657__auto___22021 = cljs.core.seq.call(null,seq__22004_22011);
if(temp__4657__auto___22021){
var seq__22004_22022__$1 = temp__4657__auto___22021;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__22004_22022__$1)){
var c__7604__auto___22023 = cljs.core.chunk_first.call(null,seq__22004_22022__$1);
var G__22024 = cljs.core.chunk_rest.call(null,seq__22004_22022__$1);
var G__22025 = c__7604__auto___22023;
var G__22026 = cljs.core.count.call(null,c__7604__auto___22023);
var G__22027 = (0);
seq__22004_22011 = G__22024;
chunk__22005_22012 = G__22025;
count__22006_22013 = G__22026;
i__22007_22014 = G__22027;
continue;
} else {
var old_fpath_22028 = cljs.core.first.call(null,seq__22004_22022__$1);
var new_fpath_22029 = clojure.string.replace_first.call(null,old_fpath_22028,path,neue);
lt.objs.document.move_doc.call(null,old_fpath_22028,new_fpath_22029);

var G__22030 = cljs.core.next.call(null,seq__22004_22022__$1);
var G__22031 = null;
var G__22032 = (0);
var G__22033 = (0);
seq__22004_22011 = G__22030;
chunk__22005_22012 = G__22031;
count__22006_22013 = G__22032;
i__22007_22014 = G__22033;
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
var seq__22038 = cljs.core.seq.call(null,cljs.core.concat.call(null,new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),new cljs.core.Keyword(null,"folders","folders",44248772).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))));
var chunk__22039 = null;
var count__22040 = (0);
var i__22041 = (0);
while(true){
if((i__22041 < count__22040)){
var f = cljs.core._nth.call(null,chunk__22039,i__22041);
lt.object.destroy_BANG_.call(null,f);

var G__22042 = seq__22038;
var G__22043 = chunk__22039;
var G__22044 = count__22040;
var G__22045 = (i__22041 + (1));
seq__22038 = G__22042;
chunk__22039 = G__22043;
count__22040 = G__22044;
i__22041 = G__22045;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__22038);
if(temp__4657__auto__){
var seq__22038__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__22038__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__22038__$1);
var G__22046 = cljs.core.chunk_rest.call(null,seq__22038__$1);
var G__22047 = c__7604__auto__;
var G__22048 = cljs.core.count.call(null,c__7604__auto__);
var G__22049 = (0);
seq__22038 = G__22046;
chunk__22039 = G__22047;
count__22040 = G__22048;
i__22041 = G__22049;
continue;
} else {
var f = cljs.core.first.call(null,seq__22038__$1);
lt.object.destroy_BANG_.call(null,f);

var G__22050 = cljs.core.next.call(null,seq__22038__$1);
var G__22051 = null;
var G__22052 = (0);
var G__22053 = (0);
seq__22038 = G__22050;
chunk__22039 = G__22051;
count__22040 = G__22052;
i__22041 = G__22053;
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
var seq__22064_22074 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"contextmenu","contextmenu",-15887481),((function (e__7942__auto__){
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
var chunk__22065_22075 = null;
var count__22066_22076 = (0);
var i__22067_22077 = (0);
while(true){
if((i__22067_22077 < count__22066_22076)){
var vec__22068_22078 = cljs.core._nth.call(null,chunk__22065_22075,i__22067_22077);
var ev__7943__auto___22079 = cljs.core.nth.call(null,vec__22068_22078,(0),null);
var func__7944__auto___22080 = cljs.core.nth.call(null,vec__22068_22078,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___22079,func__7944__auto___22080);

var G__22081 = seq__22064_22074;
var G__22082 = chunk__22065_22075;
var G__22083 = count__22066_22076;
var G__22084 = (i__22067_22077 + (1));
seq__22064_22074 = G__22081;
chunk__22065_22075 = G__22082;
count__22066_22076 = G__22083;
i__22067_22077 = G__22084;
continue;
} else {
var temp__4657__auto___22085 = cljs.core.seq.call(null,seq__22064_22074);
if(temp__4657__auto___22085){
var seq__22064_22086__$1 = temp__4657__auto___22085;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__22064_22086__$1)){
var c__7604__auto___22087 = cljs.core.chunk_first.call(null,seq__22064_22086__$1);
var G__22088 = cljs.core.chunk_rest.call(null,seq__22064_22086__$1);
var G__22089 = c__7604__auto___22087;
var G__22090 = cljs.core.count.call(null,c__7604__auto___22087);
var G__22091 = (0);
seq__22064_22074 = G__22088;
chunk__22065_22075 = G__22089;
count__22066_22076 = G__22090;
i__22067_22077 = G__22091;
continue;
} else {
var vec__22071_22092 = cljs.core.first.call(null,seq__22064_22086__$1);
var ev__7943__auto___22093 = cljs.core.nth.call(null,vec__22071_22092,(0),null);
var func__7944__auto___22094 = cljs.core.nth.call(null,vec__22071_22092,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___22093,func__7944__auto___22094);

var G__22095 = cljs.core.next.call(null,seq__22064_22086__$1);
var G__22096 = null;
var G__22097 = (0);
var G__22098 = (0);
seq__22064_22074 = G__22095;
chunk__22065_22075 = G__22096;
count__22066_22076 = G__22097;
i__22067_22077 = G__22098;
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
var seq__22109_22119 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"contextmenu","contextmenu",-15887481),((function (e__7942__auto__){
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
var chunk__22110_22120 = null;
var count__22111_22121 = (0);
var i__22112_22122 = (0);
while(true){
if((i__22112_22122 < count__22111_22121)){
var vec__22113_22123 = cljs.core._nth.call(null,chunk__22110_22120,i__22112_22122);
var ev__7943__auto___22124 = cljs.core.nth.call(null,vec__22113_22123,(0),null);
var func__7944__auto___22125 = cljs.core.nth.call(null,vec__22113_22123,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___22124,func__7944__auto___22125);

var G__22126 = seq__22109_22119;
var G__22127 = chunk__22110_22120;
var G__22128 = count__22111_22121;
var G__22129 = (i__22112_22122 + (1));
seq__22109_22119 = G__22126;
chunk__22110_22120 = G__22127;
count__22111_22121 = G__22128;
i__22112_22122 = G__22129;
continue;
} else {
var temp__4657__auto___22130 = cljs.core.seq.call(null,seq__22109_22119);
if(temp__4657__auto___22130){
var seq__22109_22131__$1 = temp__4657__auto___22130;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__22109_22131__$1)){
var c__7604__auto___22132 = cljs.core.chunk_first.call(null,seq__22109_22131__$1);
var G__22133 = cljs.core.chunk_rest.call(null,seq__22109_22131__$1);
var G__22134 = c__7604__auto___22132;
var G__22135 = cljs.core.count.call(null,c__7604__auto___22132);
var G__22136 = (0);
seq__22109_22119 = G__22133;
chunk__22110_22120 = G__22134;
count__22111_22121 = G__22135;
i__22112_22122 = G__22136;
continue;
} else {
var vec__22116_22137 = cljs.core.first.call(null,seq__22109_22131__$1);
var ev__7943__auto___22138 = cljs.core.nth.call(null,vec__22116_22137,(0),null);
var func__7944__auto___22139 = cljs.core.nth.call(null,vec__22116_22137,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___22138,func__7944__auto___22139);

var G__22140 = cljs.core.next.call(null,seq__22109_22131__$1);
var G__22141 = null;
var G__22142 = (0);
var G__22143 = (0);
seq__22109_22119 = G__22140;
chunk__22110_22120 = G__22141;
count__22111_22121 = G__22142;
i__22112_22122 = G__22143;
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
lt.objs.sidebar.workspace.sub_folders = (function lt$objs$sidebar$workspace$sub_folders(p__22146){
var map__22167 = p__22146;
var map__22167__$1 = ((((!((map__22167 == null)))?((((map__22167.cljs$lang$protocol_mask$partition0$ & (64))) || (map__22167.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__22167):map__22167);
var folders = cljs.core.get.call(null,map__22167__$1,new cljs.core.Keyword(null,"folders","folders",44248772));
var files = cljs.core.get.call(null,map__22167__$1,new cljs.core.Keyword(null,"files","files",-472457450));
var open_QMARK_ = cljs.core.get.call(null,map__22167__$1,new cljs.core.Keyword(null,"open?","open?",1238443125));
var path = cljs.core.get.call(null,map__22167__$1,new cljs.core.Keyword(null,"path","path",-188191168));
var root_QMARK_ = cljs.core.get.call(null,map__22167__$1,new cljs.core.Keyword(null,"root?","root?",-2045639518));
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",-1349521403),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),[cljs.core.str((cljs.core.truth_(root_QMARK_)?null:"sub ")),cljs.core.str((cljs.core.truth_(open_QMARK_)?"opened":null))].join('')], null),(function (){var iter__7573__auto__ = ((function (map__22167,map__22167__$1,folders,files,open_QMARK_,path,root_QMARK_){
return (function lt$objs$sidebar$workspace$sub_folders_$_iter__22169(s__22170){
return (new cljs.core.LazySeq(null,((function (map__22167,map__22167__$1,folders,files,open_QMARK_,path,root_QMARK_){
return (function (){
var s__22170__$1 = s__22170;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__22170__$1);
if(temp__4657__auto__){
var s__22170__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__22170__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__22170__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__22172 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__22171 = (0);
while(true){
if((i__22171 < size__7572__auto__)){
var f = cljs.core._nth.call(null,c__7571__auto__,i__22171);
cljs.core.chunk_append.call(null,b__22172,lt.object.__GT_content.call(null,f));

var G__22187 = (i__22171 + (1));
i__22171 = G__22187;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__22172),lt$objs$sidebar$workspace$sub_folders_$_iter__22169.call(null,cljs.core.chunk_rest.call(null,s__22170__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__22172),null);
}
} else {
var f = cljs.core.first.call(null,s__22170__$2);
return cljs.core.cons.call(null,lt.object.__GT_content.call(null,f),lt$objs$sidebar$workspace$sub_folders_$_iter__22169.call(null,cljs.core.rest.call(null,s__22170__$2)));
}
} else {
return null;
}
break;
}
});})(map__22167,map__22167__$1,folders,files,open_QMARK_,path,root_QMARK_))
,null,null));
});})(map__22167,map__22167__$1,folders,files,open_QMARK_,path,root_QMARK_))
;
return iter__7573__auto__.call(null,cljs.core.sort_by.call(null,((function (iter__7573__auto__,map__22167,map__22167__$1,folders,files,open_QMARK_,path,root_QMARK_){
return (function (p1__22144_SHARP_){
return clojure.string.lower_case.call(null,lt.objs.files.basename.call(null,new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,p1__22144_SHARP_))));
});})(iter__7573__auto__,map__22167,map__22167__$1,folders,files,open_QMARK_,path,root_QMARK_))
,folders));
})(),(function (){var iter__7573__auto__ = ((function (map__22167,map__22167__$1,folders,files,open_QMARK_,path,root_QMARK_){
return (function lt$objs$sidebar$workspace$sub_folders_$_iter__22173(s__22174){
return (new cljs.core.LazySeq(null,((function (map__22167,map__22167__$1,folders,files,open_QMARK_,path,root_QMARK_){
return (function (){
var s__22174__$1 = s__22174;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__22174__$1);
if(temp__4657__auto__){
var s__22174__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__22174__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__22174__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__22176 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__22175 = (0);
while(true){
if((i__22175 < size__7572__auto__)){
var f = cljs.core._nth.call(null,c__7571__auto__,i__22175);
cljs.core.chunk_append.call(null,b__22176,lt.object.__GT_content.call(null,f));

var G__22188 = (i__22175 + (1));
i__22175 = G__22188;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__22176),lt$objs$sidebar$workspace$sub_folders_$_iter__22173.call(null,cljs.core.chunk_rest.call(null,s__22174__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__22176),null);
}
} else {
var f = cljs.core.first.call(null,s__22174__$2);
return cljs.core.cons.call(null,lt.object.__GT_content.call(null,f),lt$objs$sidebar$workspace$sub_folders_$_iter__22173.call(null,cljs.core.rest.call(null,s__22174__$2)));
}
} else {
return null;
}
break;
}
});})(map__22167,map__22167__$1,folders,files,open_QMARK_,path,root_QMARK_))
,null,null));
});})(map__22167,map__22167__$1,folders,files,open_QMARK_,path,root_QMARK_))
;
return iter__7573__auto__.call(null,cljs.core.sort_by.call(null,((function (iter__7573__auto__,map__22167,map__22167__$1,folders,files,open_QMARK_,path,root_QMARK_){
return (function (p1__22145_SHARP_){
return clojure.string.lower_case.call(null,lt.objs.files.basename.call(null,new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,p1__22145_SHARP_))));
});})(iter__7573__auto__,map__22167,map__22167__$1,folders,files,open_QMARK_,path,root_QMARK_))
,files));
})()], null));
var seq__22177_22189 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),cljs.core.PersistentVector.EMPTY));
var chunk__22178_22190 = null;
var count__22179_22191 = (0);
var i__22180_22192 = (0);
while(true){
if((i__22180_22192 < count__22179_22191)){
var vec__22181_22193 = cljs.core._nth.call(null,chunk__22178_22190,i__22180_22192);
var ev__7943__auto___22194 = cljs.core.nth.call(null,vec__22181_22193,(0),null);
var func__7944__auto___22195 = cljs.core.nth.call(null,vec__22181_22193,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___22194,func__7944__auto___22195);

var G__22196 = seq__22177_22189;
var G__22197 = chunk__22178_22190;
var G__22198 = count__22179_22191;
var G__22199 = (i__22180_22192 + (1));
seq__22177_22189 = G__22196;
chunk__22178_22190 = G__22197;
count__22179_22191 = G__22198;
i__22180_22192 = G__22199;
continue;
} else {
var temp__4657__auto___22200 = cljs.core.seq.call(null,seq__22177_22189);
if(temp__4657__auto___22200){
var seq__22177_22201__$1 = temp__4657__auto___22200;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__22177_22201__$1)){
var c__7604__auto___22202 = cljs.core.chunk_first.call(null,seq__22177_22201__$1);
var G__22203 = cljs.core.chunk_rest.call(null,seq__22177_22201__$1);
var G__22204 = c__7604__auto___22202;
var G__22205 = cljs.core.count.call(null,c__7604__auto___22202);
var G__22206 = (0);
seq__22177_22189 = G__22203;
chunk__22178_22190 = G__22204;
count__22179_22191 = G__22205;
i__22180_22192 = G__22206;
continue;
} else {
var vec__22184_22207 = cljs.core.first.call(null,seq__22177_22201__$1);
var ev__7943__auto___22208 = cljs.core.nth.call(null,vec__22184_22207,(0),null);
var func__7944__auto___22209 = cljs.core.nth.call(null,vec__22184_22207,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___22208,func__7944__auto___22209);

var G__22210 = cljs.core.next.call(null,seq__22177_22201__$1);
var G__22211 = null;
var G__22212 = (0);
var G__22213 = (0);
seq__22177_22189 = G__22210;
chunk__22178_22190 = G__22211;
count__22179_22191 = G__22212;
i__22180_22192 = G__22213;
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
var seq__22224_22234 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"focus","focus",234677911),((function (e__7942__auto__){
return (function (){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"rename.focus","rename.focus",1177600987));
});})(e__7942__auto__))
,new cljs.core.Keyword(null,"blur","blur",-453500461),((function (e__7942__auto__){
return (function (){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"rename.blur","rename.blur",-1821157150));
});})(e__7942__auto__))
], null)));
var chunk__22225_22235 = null;
var count__22226_22236 = (0);
var i__22227_22237 = (0);
while(true){
if((i__22227_22237 < count__22226_22236)){
var vec__22228_22238 = cljs.core._nth.call(null,chunk__22225_22235,i__22227_22237);
var ev__7943__auto___22239 = cljs.core.nth.call(null,vec__22228_22238,(0),null);
var func__7944__auto___22240 = cljs.core.nth.call(null,vec__22228_22238,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___22239,func__7944__auto___22240);

var G__22241 = seq__22224_22234;
var G__22242 = chunk__22225_22235;
var G__22243 = count__22226_22236;
var G__22244 = (i__22227_22237 + (1));
seq__22224_22234 = G__22241;
chunk__22225_22235 = G__22242;
count__22226_22236 = G__22243;
i__22227_22237 = G__22244;
continue;
} else {
var temp__4657__auto___22245 = cljs.core.seq.call(null,seq__22224_22234);
if(temp__4657__auto___22245){
var seq__22224_22246__$1 = temp__4657__auto___22245;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__22224_22246__$1)){
var c__7604__auto___22247 = cljs.core.chunk_first.call(null,seq__22224_22246__$1);
var G__22248 = cljs.core.chunk_rest.call(null,seq__22224_22246__$1);
var G__22249 = c__7604__auto___22247;
var G__22250 = cljs.core.count.call(null,c__7604__auto___22247);
var G__22251 = (0);
seq__22224_22234 = G__22248;
chunk__22225_22235 = G__22249;
count__22226_22236 = G__22250;
i__22227_22237 = G__22251;
continue;
} else {
var vec__22231_22252 = cljs.core.first.call(null,seq__22224_22246__$1);
var ev__7943__auto___22253 = cljs.core.nth.call(null,vec__22231_22252,(0),null);
var func__7944__auto___22254 = cljs.core.nth.call(null,vec__22231_22252,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___22253,func__7944__auto___22254);

var G__22255 = cljs.core.next.call(null,seq__22224_22246__$1);
var G__22256 = null;
var G__22257 = (0);
var G__22258 = (0);
seq__22224_22234 = G__22255;
chunk__22225_22235 = G__22256;
count__22226_22236 = G__22257;
i__22227_22237 = G__22258;
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

return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),crate.binding.bound.call(null,this$,(function (p1__22259_SHARP_){
if(cljs.core.truth_(new cljs.core.Keyword(null,"renaming?","renaming?",-692692442).cljs$core$IFn$_invoke$arity$1(p1__22259_SHARP_))){
return "renaming";
} else {
return "";
}
}))], null),lt.objs.sidebar.workspace.rename_input.call(null,this$),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.tree-item","div.tree-item",464397449),lt.objs.sidebar.workspace.file_toggle.call(null,this$)], null)], null);
}));
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","workspace.folder","lt.objs.sidebar.workspace/workspace.folder",-483966665),new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"workspace.folder","workspace.folder",644219274),null,new cljs.core.Keyword(null,"tree-item","tree-item",1467250318),null], null), null),new cljs.core.Keyword(null,"path","path",-188191168),"",new cljs.core.Keyword(null,"open?","open?",1238443125),false,new cljs.core.Keyword(null,"realized?","realized?",-1433302186),false,new cljs.core.Keyword(null,"folders","folders",44248772),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"files","files",-472457450),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"init","init",-1875481434),(function (this$,path){
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"path","path",-188191168),path], null));

return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),crate.binding.bound.call(null,this$,(function (p1__22260_SHARP_){
if(cljs.core.truth_(new cljs.core.Keyword(null,"renaming?","renaming?",-692692442).cljs$core$IFn$_invoke$arity$1(p1__22260_SHARP_))){
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
var seq__22271_22281 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"change","change",-1163046502),((function (e__7942__auto__){
return (function (){
var me = this;
if(cljs.core.empty_QMARK_.call(null,lt.util.dom.val.call(null,me))){
return null;
} else {
return lt.object.raise.call(null,lt.objs.sidebar.workspace.tree,event,lt.util.dom.val.call(null,me));
}
});})(e__7942__auto__))
], null)));
var chunk__22272_22282 = null;
var count__22273_22283 = (0);
var i__22274_22284 = (0);
while(true){
if((i__22274_22284 < count__22273_22283)){
var vec__22275_22285 = cljs.core._nth.call(null,chunk__22272_22282,i__22274_22284);
var ev__7943__auto___22286 = cljs.core.nth.call(null,vec__22275_22285,(0),null);
var func__7944__auto___22287 = cljs.core.nth.call(null,vec__22275_22285,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___22286,func__7944__auto___22287);

var G__22288 = seq__22271_22281;
var G__22289 = chunk__22272_22282;
var G__22290 = count__22273_22283;
var G__22291 = (i__22274_22284 + (1));
seq__22271_22281 = G__22288;
chunk__22272_22282 = G__22289;
count__22273_22283 = G__22290;
i__22274_22284 = G__22291;
continue;
} else {
var temp__4657__auto___22292 = cljs.core.seq.call(null,seq__22271_22281);
if(temp__4657__auto___22292){
var seq__22271_22293__$1 = temp__4657__auto___22292;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__22271_22293__$1)){
var c__7604__auto___22294 = cljs.core.chunk_first.call(null,seq__22271_22293__$1);
var G__22295 = cljs.core.chunk_rest.call(null,seq__22271_22293__$1);
var G__22296 = c__7604__auto___22294;
var G__22297 = cljs.core.count.call(null,c__7604__auto___22294);
var G__22298 = (0);
seq__22271_22281 = G__22295;
chunk__22272_22282 = G__22296;
count__22273_22283 = G__22297;
i__22274_22284 = G__22298;
continue;
} else {
var vec__22278_22299 = cljs.core.first.call(null,seq__22271_22293__$1);
var ev__7943__auto___22300 = cljs.core.nth.call(null,vec__22278_22299,(0),null);
var func__7944__auto___22301 = cljs.core.nth.call(null,vec__22278_22299,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___22300,func__7944__auto___22301);

var G__22302 = cljs.core.next.call(null,seq__22271_22293__$1);
var G__22303 = null;
var G__22304 = (0);
var G__22305 = (0);
seq__22271_22281 = G__22302;
chunk__22272_22282 = G__22303;
count__22273_22283 = G__22304;
i__22274_22284 = G__22305;
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
var seq__22316_22326 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),action], null)));
var chunk__22317_22327 = null;
var count__22318_22328 = (0);
var i__22319_22329 = (0);
while(true){
if((i__22319_22329 < count__22318_22328)){
var vec__22320_22330 = cljs.core._nth.call(null,chunk__22317_22327,i__22319_22329);
var ev__7943__auto___22331 = cljs.core.nth.call(null,vec__22320_22330,(0),null);
var func__7944__auto___22332 = cljs.core.nth.call(null,vec__22320_22330,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___22331,func__7944__auto___22332);

var G__22333 = seq__22316_22326;
var G__22334 = chunk__22317_22327;
var G__22335 = count__22318_22328;
var G__22336 = (i__22319_22329 + (1));
seq__22316_22326 = G__22333;
chunk__22317_22327 = G__22334;
count__22318_22328 = G__22335;
i__22319_22329 = G__22336;
continue;
} else {
var temp__4657__auto___22337 = cljs.core.seq.call(null,seq__22316_22326);
if(temp__4657__auto___22337){
var seq__22316_22338__$1 = temp__4657__auto___22337;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__22316_22338__$1)){
var c__7604__auto___22339 = cljs.core.chunk_first.call(null,seq__22316_22338__$1);
var G__22340 = cljs.core.chunk_rest.call(null,seq__22316_22338__$1);
var G__22341 = c__7604__auto___22339;
var G__22342 = cljs.core.count.call(null,c__7604__auto___22339);
var G__22343 = (0);
seq__22316_22326 = G__22340;
chunk__22317_22327 = G__22341;
count__22318_22328 = G__22342;
i__22319_22329 = G__22343;
continue;
} else {
var vec__22323_22344 = cljs.core.first.call(null,seq__22316_22338__$1);
var ev__7943__auto___22345 = cljs.core.nth.call(null,vec__22323_22344,(0),null);
var func__7944__auto___22346 = cljs.core.nth.call(null,vec__22323_22344,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___22345,func__7944__auto___22346);

var G__22347 = cljs.core.next.call(null,seq__22316_22338__$1);
var G__22348 = null;
var G__22349 = (0);
var G__22350 = (0);
seq__22316_22326 = G__22347;
chunk__22317_22327 = G__22348;
count__22318_22328 = G__22349;
i__22319_22329 = G__22350;
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
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul.folders","ul.folders",-1463452329),(function (){var iter__7573__auto__ = (function lt$objs$sidebar$workspace$recents_item_$_iter__22369(s__22370){
return (new cljs.core.LazySeq(null,(function (){
var s__22370__$1 = s__22370;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__22370__$1);
if(temp__4657__auto__){
var s__22370__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__22370__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__22370__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__22372 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__22371 = (0);
while(true){
if((i__22371 < size__7572__auto__)){
var f = cljs.core._nth.call(null,c__7571__auto__,i__22371);
cljs.core.chunk_append.call(null,b__22372,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),lt.objs.files.basename.call(null,f),lt.objs.files.separator], null));

var G__22387 = (i__22371 + (1));
i__22371 = G__22387;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__22372),lt$objs$sidebar$workspace$recents_item_$_iter__22369.call(null,cljs.core.chunk_rest.call(null,s__22370__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__22372),null);
}
} else {
var f = cljs.core.first.call(null,s__22370__$2);
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),lt.objs.files.basename.call(null,f),lt.objs.files.separator], null),lt$objs$sidebar$workspace$recents_item_$_iter__22369.call(null,cljs.core.rest.call(null,s__22370__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__7573__auto__.call(null,new cljs.core.Keyword(null,"folders","folders",44248772).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
})()], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul.files","ul.files",1940783393),(function (){var iter__7573__auto__ = (function lt$objs$sidebar$workspace$recents_item_$_iter__22373(s__22374){
return (new cljs.core.LazySeq(null,(function (){
var s__22374__$1 = s__22374;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__22374__$1);
if(temp__4657__auto__){
var s__22374__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__22374__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__22374__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__22376 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__22375 = (0);
while(true){
if((i__22375 < size__7572__auto__)){
var f = cljs.core._nth.call(null,c__7571__auto__,i__22375);
cljs.core.chunk_append.call(null,b__22376,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),lt.objs.files.basename.call(null,f)], null));

var G__22388 = (i__22375 + (1));
i__22375 = G__22388;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__22376),lt$objs$sidebar$workspace$recents_item_$_iter__22373.call(null,cljs.core.chunk_rest.call(null,s__22374__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__22376),null);
}
} else {
var f = cljs.core.first.call(null,s__22374__$2);
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),lt.objs.files.basename.call(null,f)], null),lt$objs$sidebar$workspace$recents_item_$_iter__22373.call(null,cljs.core.rest.call(null,s__22374__$2)));
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
var seq__22377_22389 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"contextmenu","contextmenu",-15887481),((function (e__7942__auto__){
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
var chunk__22378_22390 = null;
var count__22379_22391 = (0);
var i__22380_22392 = (0);
while(true){
if((i__22380_22392 < count__22379_22391)){
var vec__22381_22393 = cljs.core._nth.call(null,chunk__22378_22390,i__22380_22392);
var ev__7943__auto___22394 = cljs.core.nth.call(null,vec__22381_22393,(0),null);
var func__7944__auto___22395 = cljs.core.nth.call(null,vec__22381_22393,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___22394,func__7944__auto___22395);

var G__22396 = seq__22377_22389;
var G__22397 = chunk__22378_22390;
var G__22398 = count__22379_22391;
var G__22399 = (i__22380_22392 + (1));
seq__22377_22389 = G__22396;
chunk__22378_22390 = G__22397;
count__22379_22391 = G__22398;
i__22380_22392 = G__22399;
continue;
} else {
var temp__4657__auto___22400 = cljs.core.seq.call(null,seq__22377_22389);
if(temp__4657__auto___22400){
var seq__22377_22401__$1 = temp__4657__auto___22400;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__22377_22401__$1)){
var c__7604__auto___22402 = cljs.core.chunk_first.call(null,seq__22377_22401__$1);
var G__22403 = cljs.core.chunk_rest.call(null,seq__22377_22401__$1);
var G__22404 = c__7604__auto___22402;
var G__22405 = cljs.core.count.call(null,c__7604__auto___22402);
var G__22406 = (0);
seq__22377_22389 = G__22403;
chunk__22378_22390 = G__22404;
count__22379_22391 = G__22405;
i__22380_22392 = G__22406;
continue;
} else {
var vec__22384_22407 = cljs.core.first.call(null,seq__22377_22401__$1);
var ev__7943__auto___22408 = cljs.core.nth.call(null,vec__22384_22407,(0),null);
var func__7944__auto___22409 = cljs.core.nth.call(null,vec__22384_22407,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___22408,func__7944__auto___22409);

var G__22410 = cljs.core.next.call(null,seq__22377_22401__$1);
var G__22411 = null;
var G__22412 = (0);
var G__22413 = (0);
seq__22377_22389 = G__22410;
chunk__22378_22390 = G__22411;
count__22379_22391 = G__22412;
i__22380_22392 = G__22413;
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
var seq__22424_22434 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"tree!","tree!",-1706577853));
});})(e__7942__auto__))
], null)));
var chunk__22425_22435 = null;
var count__22426_22436 = (0);
var i__22427_22437 = (0);
while(true){
if((i__22427_22437 < count__22426_22436)){
var vec__22428_22438 = cljs.core._nth.call(null,chunk__22425_22435,i__22427_22437);
var ev__7943__auto___22439 = cljs.core.nth.call(null,vec__22428_22438,(0),null);
var func__7944__auto___22440 = cljs.core.nth.call(null,vec__22428_22438,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___22439,func__7944__auto___22440);

var G__22441 = seq__22424_22434;
var G__22442 = chunk__22425_22435;
var G__22443 = count__22426_22436;
var G__22444 = (i__22427_22437 + (1));
seq__22424_22434 = G__22441;
chunk__22425_22435 = G__22442;
count__22426_22436 = G__22443;
i__22427_22437 = G__22444;
continue;
} else {
var temp__4657__auto___22445 = cljs.core.seq.call(null,seq__22424_22434);
if(temp__4657__auto___22445){
var seq__22424_22446__$1 = temp__4657__auto___22445;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__22424_22446__$1)){
var c__7604__auto___22447 = cljs.core.chunk_first.call(null,seq__22424_22446__$1);
var G__22448 = cljs.core.chunk_rest.call(null,seq__22424_22446__$1);
var G__22449 = c__7604__auto___22447;
var G__22450 = cljs.core.count.call(null,c__7604__auto___22447);
var G__22451 = (0);
seq__22424_22434 = G__22448;
chunk__22425_22435 = G__22449;
count__22426_22436 = G__22450;
i__22427_22437 = G__22451;
continue;
} else {
var vec__22431_22452 = cljs.core.first.call(null,seq__22424_22446__$1);
var ev__7943__auto___22453 = cljs.core.nth.call(null,vec__22431_22452,(0),null);
var func__7944__auto___22454 = cljs.core.nth.call(null,vec__22431_22452,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___22453,func__7944__auto___22454);

var G__22455 = cljs.core.next.call(null,seq__22424_22446__$1);
var G__22456 = null;
var G__22457 = (0);
var G__22458 = (0);
seq__22424_22434 = G__22455;
chunk__22425_22435 = G__22456;
count__22426_22436 = G__22457;
i__22427_22437 = G__22458;
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
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),lt.objs.sidebar.workspace.back_button.call(null,this$),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",-1349521403),(function (){var iter__7573__auto__ = (function lt$objs$sidebar$workspace$recents_$_iter__22473(s__22474){
return (new cljs.core.LazySeq(null,(function (){
var s__22474__$1 = s__22474;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__22474__$1);
if(temp__4657__auto__){
var s__22474__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__22474__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__22474__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__22476 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__22475 = (0);
while(true){
if((i__22475 < size__7572__auto__)){
var r = cljs.core._nth.call(null,c__7571__auto__,i__22475);
cljs.core.chunk_append.call(null,b__22476,lt.object.__GT_content.call(null,r));

var G__22487 = (i__22475 + (1));
i__22475 = G__22487;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__22476),lt$objs$sidebar$workspace$recents_$_iter__22473.call(null,cljs.core.chunk_rest.call(null,s__22474__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__22476),null);
}
} else {
var r = cljs.core.first.call(null,s__22474__$2);
return cljs.core.cons.call(null,lt.object.__GT_content.call(null,r),lt$objs$sidebar$workspace$recents_$_iter__22473.call(null,cljs.core.rest.call(null,s__22474__$2)));
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
var seq__22477_22488 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),cljs.core.PersistentVector.EMPTY));
var chunk__22478_22489 = null;
var count__22479_22490 = (0);
var i__22480_22491 = (0);
while(true){
if((i__22480_22491 < count__22479_22490)){
var vec__22481_22492 = cljs.core._nth.call(null,chunk__22478_22489,i__22480_22491);
var ev__7943__auto___22493 = cljs.core.nth.call(null,vec__22481_22492,(0),null);
var func__7944__auto___22494 = cljs.core.nth.call(null,vec__22481_22492,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___22493,func__7944__auto___22494);

var G__22495 = seq__22477_22488;
var G__22496 = chunk__22478_22489;
var G__22497 = count__22479_22490;
var G__22498 = (i__22480_22491 + (1));
seq__22477_22488 = G__22495;
chunk__22478_22489 = G__22496;
count__22479_22490 = G__22497;
i__22480_22491 = G__22498;
continue;
} else {
var temp__4657__auto___22499 = cljs.core.seq.call(null,seq__22477_22488);
if(temp__4657__auto___22499){
var seq__22477_22500__$1 = temp__4657__auto___22499;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__22477_22500__$1)){
var c__7604__auto___22501 = cljs.core.chunk_first.call(null,seq__22477_22500__$1);
var G__22502 = cljs.core.chunk_rest.call(null,seq__22477_22500__$1);
var G__22503 = c__7604__auto___22501;
var G__22504 = cljs.core.count.call(null,c__7604__auto___22501);
var G__22505 = (0);
seq__22477_22488 = G__22502;
chunk__22478_22489 = G__22503;
count__22479_22490 = G__22504;
i__22480_22491 = G__22505;
continue;
} else {
var vec__22484_22506 = cljs.core.first.call(null,seq__22477_22500__$1);
var ev__7943__auto___22507 = cljs.core.nth.call(null,vec__22484_22506,(0),null);
var func__7944__auto___22508 = cljs.core.nth.call(null,vec__22484_22506,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___22507,func__7944__auto___22508);

var G__22509 = cljs.core.next.call(null,seq__22477_22500__$1);
var G__22510 = null;
var G__22511 = (0);
var G__22512 = (0);
seq__22477_22488 = G__22509;
chunk__22478_22489 = G__22510;
count__22479_22490 = G__22511;
i__22480_22491 = G__22512;
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
var seq__22518_22522 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"recents","recents",1354038854).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
var chunk__22519_22523 = null;
var count__22520_22524 = (0);
var i__22521_22525 = (0);
while(true){
if((i__22521_22525 < count__22520_22524)){
var r_22526 = cljs.core._nth.call(null,chunk__22519_22523,i__22521_22525);
lt.object.destroy_BANG_.call(null,r_22526);

var G__22527 = seq__22518_22522;
var G__22528 = chunk__22519_22523;
var G__22529 = count__22520_22524;
var G__22530 = (i__22521_22525 + (1));
seq__22518_22522 = G__22527;
chunk__22519_22523 = G__22528;
count__22520_22524 = G__22529;
i__22521_22525 = G__22530;
continue;
} else {
var temp__4657__auto___22531 = cljs.core.seq.call(null,seq__22518_22522);
if(temp__4657__auto___22531){
var seq__22518_22532__$1 = temp__4657__auto___22531;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__22518_22532__$1)){
var c__7604__auto___22533 = cljs.core.chunk_first.call(null,seq__22518_22532__$1);
var G__22534 = cljs.core.chunk_rest.call(null,seq__22518_22532__$1);
var G__22535 = c__7604__auto___22533;
var G__22536 = cljs.core.count.call(null,c__7604__auto___22533);
var G__22537 = (0);
seq__22518_22522 = G__22534;
chunk__22519_22523 = G__22535;
count__22520_22524 = G__22536;
i__22521_22525 = G__22537;
continue;
} else {
var r_22538 = cljs.core.first.call(null,seq__22518_22532__$1);
lt.object.destroy_BANG_.call(null,r_22538);

var G__22539 = cljs.core.next.call(null,seq__22518_22532__$1);
var G__22540 = null;
var G__22541 = (0);
var G__22542 = (0);
seq__22518_22522 = G__22539;
chunk__22519_22523 = G__22540;
count__22520_22524 = G__22541;
i__22521_22525 = G__22542;
continue;
}
} else {
}
}
break;
}

return lt.object.merge_BANG_.call(null,this$,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"recents","recents",1354038854)],[cljs.core.map.call(null,(function (p1__22513_SHARP_){
return lt.object.create.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","recent-workspace","lt.objs.sidebar.workspace/recent-workspace",1678198322),p1__22513_SHARP_);
}),lt.objs.workspace.all.call(null))]));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.workspace","recent!","lt.objs.sidebar.workspace/recent!",-104279772),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"recent!","recent!",-1515777611),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.workspace.__BEH__recent_BANG_);
/**
 * 
 */
lt.objs.sidebar.workspace.__BEH__tree_BANG_ = (function lt$objs$sidebar$workspace$__BEH__tree_BANG_(this$){
var seq__22547_22551 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"recents","recents",1354038854).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
var chunk__22548_22552 = null;
var count__22549_22553 = (0);
var i__22550_22554 = (0);
while(true){
if((i__22550_22554 < count__22549_22553)){
var r_22555 = cljs.core._nth.call(null,chunk__22548_22552,i__22550_22554);
lt.object.destroy_BANG_.call(null,r_22555);

var G__22556 = seq__22547_22551;
var G__22557 = chunk__22548_22552;
var G__22558 = count__22549_22553;
var G__22559 = (i__22550_22554 + (1));
seq__22547_22551 = G__22556;
chunk__22548_22552 = G__22557;
count__22549_22553 = G__22558;
i__22550_22554 = G__22559;
continue;
} else {
var temp__4657__auto___22560 = cljs.core.seq.call(null,seq__22547_22551);
if(temp__4657__auto___22560){
var seq__22547_22561__$1 = temp__4657__auto___22560;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__22547_22561__$1)){
var c__7604__auto___22562 = cljs.core.chunk_first.call(null,seq__22547_22561__$1);
var G__22563 = cljs.core.chunk_rest.call(null,seq__22547_22561__$1);
var G__22564 = c__7604__auto___22562;
var G__22565 = cljs.core.count.call(null,c__7604__auto___22562);
var G__22566 = (0);
seq__22547_22551 = G__22563;
chunk__22548_22552 = G__22564;
count__22549_22553 = G__22565;
i__22550_22554 = G__22566;
continue;
} else {
var r_22567 = cljs.core.first.call(null,seq__22547_22561__$1);
lt.object.destroy_BANG_.call(null,r_22567);

var G__22568 = cljs.core.next.call(null,seq__22547_22561__$1);
var G__22569 = null;
var G__22570 = (0);
var G__22571 = (0);
seq__22547_22551 = G__22568;
chunk__22548_22552 = G__22569;
count__22549_22553 = G__22570;
i__22550_22554 = G__22571;
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
var seq__22582_22592 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dragover","dragover",-1169536926),((function (e__7942__auto__){
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
var chunk__22583_22593 = null;
var count__22584_22594 = (0);
var i__22585_22595 = (0);
while(true){
if((i__22585_22595 < count__22584_22594)){
var vec__22586_22596 = cljs.core._nth.call(null,chunk__22583_22593,i__22585_22595);
var ev__7943__auto___22597 = cljs.core.nth.call(null,vec__22586_22596,(0),null);
var func__7944__auto___22598 = cljs.core.nth.call(null,vec__22586_22596,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___22597,func__7944__auto___22598);

var G__22599 = seq__22582_22592;
var G__22600 = chunk__22583_22593;
var G__22601 = count__22584_22594;
var G__22602 = (i__22585_22595 + (1));
seq__22582_22592 = G__22599;
chunk__22583_22593 = G__22600;
count__22584_22594 = G__22601;
i__22585_22595 = G__22602;
continue;
} else {
var temp__4657__auto___22603 = cljs.core.seq.call(null,seq__22582_22592);
if(temp__4657__auto___22603){
var seq__22582_22604__$1 = temp__4657__auto___22603;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__22582_22604__$1)){
var c__7604__auto___22605 = cljs.core.chunk_first.call(null,seq__22582_22604__$1);
var G__22606 = cljs.core.chunk_rest.call(null,seq__22582_22604__$1);
var G__22607 = c__7604__auto___22605;
var G__22608 = cljs.core.count.call(null,c__7604__auto___22605);
var G__22609 = (0);
seq__22582_22592 = G__22606;
chunk__22583_22593 = G__22607;
count__22584_22594 = G__22608;
i__22585_22595 = G__22609;
continue;
} else {
var vec__22589_22610 = cljs.core.first.call(null,seq__22582_22604__$1);
var ev__7943__auto___22611 = cljs.core.nth.call(null,vec__22589_22610,(0),null);
var func__7944__auto___22612 = cljs.core.nth.call(null,vec__22589_22610,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___22611,func__7944__auto___22612);

var G__22613 = cljs.core.next.call(null,seq__22582_22604__$1);
var G__22614 = null;
var G__22615 = (0);
var G__22616 = (0);
seq__22582_22592 = G__22613;
chunk__22583_22593 = G__22614;
count__22584_22594 = G__22615;
i__22585_22595 = G__22616;
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
