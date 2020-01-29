// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.objs.version');
goog.require('cljs.core');
goog.require('lt.objs.sidebar.command');
goog.require('lt.objs.opener');
goog.require('lt.objs.deploy');
goog.require('lt.objs.editor');
goog.require('lt.object');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.tabs');
goog.require('lt.objs.files');
/**
 * 
 */
lt.objs.version.check_button = (function lt$objs$version$check_button(){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.button","div.button",-1553026367),"Check for updates"], null));
var seq__16878_16888 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (){
return lt.objs.deploy.check_version.call(null,true);
});})(e__7942__auto__))
], null)));
var chunk__16879_16889 = null;
var count__16880_16890 = (0);
var i__16881_16891 = (0);
while(true){
if((i__16881_16891 < count__16880_16890)){
var vec__16882_16892 = cljs.core._nth.call(null,chunk__16879_16889,i__16881_16891);
var ev__7943__auto___16893 = cljs.core.nth.call(null,vec__16882_16892,(0),null);
var func__7944__auto___16894 = cljs.core.nth.call(null,vec__16882_16892,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___16893,func__7944__auto___16894);

var G__16895 = seq__16878_16888;
var G__16896 = chunk__16879_16889;
var G__16897 = count__16880_16890;
var G__16898 = (i__16881_16891 + (1));
seq__16878_16888 = G__16895;
chunk__16879_16889 = G__16896;
count__16880_16890 = G__16897;
i__16881_16891 = G__16898;
continue;
} else {
var temp__4657__auto___16899 = cljs.core.seq.call(null,seq__16878_16888);
if(temp__4657__auto___16899){
var seq__16878_16900__$1 = temp__4657__auto___16899;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__16878_16900__$1)){
var c__7604__auto___16901 = cljs.core.chunk_first.call(null,seq__16878_16900__$1);
var G__16902 = cljs.core.chunk_rest.call(null,seq__16878_16900__$1);
var G__16903 = c__7604__auto___16901;
var G__16904 = cljs.core.count.call(null,c__7604__auto___16901);
var G__16905 = (0);
seq__16878_16888 = G__16902;
chunk__16879_16889 = G__16903;
count__16880_16890 = G__16904;
i__16881_16891 = G__16905;
continue;
} else {
var vec__16885_16906 = cljs.core.first.call(null,seq__16878_16900__$1);
var ev__7943__auto___16907 = cljs.core.nth.call(null,vec__16885_16906,(0),null);
var func__7944__auto___16908 = cljs.core.nth.call(null,vec__16885_16906,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___16907,func__7944__auto___16908);

var G__16909 = cljs.core.next.call(null,seq__16878_16900__$1);
var G__16910 = null;
var G__16911 = (0);
var G__16912 = (0);
seq__16878_16888 = G__16909;
chunk__16879_16889 = G__16910;
count__16880_16890 = G__16911;
i__16881_16891 = G__16912;
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
lt.objs.version.__BEH__on_show_refresh_eds = (function lt$objs$version$__BEH__on_show_refresh_eds(this$){
return lt.object.raise.call(null,new cljs.core.Keyword(null,"ed","ed",436294224).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),new cljs.core.Keyword(null,"show","show",-576705889));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.version","on-show-refresh-eds","lt.objs.version/on-show-refresh-eds",553341837),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"show","show",-576705889),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.version.__BEH__on_show_refresh_eds);
/**
 * 
 */
lt.objs.version.__BEH__destroy_on_close = (function lt$objs$version$__BEH__destroy_on_close(this$){
return lt.object.destroy_BANG_.call(null,this$);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.version","destroy-on-close","lt.objs.version/destroy-on-close",-598762938),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"close","close",1835149582),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.version.__BEH__destroy_on_close);
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.version","version-pane","lt.objs.version/version-pane",55860981),new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"version","version",425292698),null], null), null),new cljs.core.Keyword(null,"name","name",1843675177),"Version",new cljs.core.Keyword(null,"init","init",-1875481434),(function (this$){
var main = lt.objs.editor.pool.create.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"mime","mime",-1846414642),"markdown",new cljs.core.Keyword(null,"content","content",15833224),new cljs.core.Keyword(null,"content","content",15833224).cljs$core$IFn$_invoke$arity$1(lt.objs.files.open_sync.call(null,lt.objs.files.lt_home.call(null,"/core/changelog.md")))], null));
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"ed","ed",436294224),main], null));

return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#version-info","div#version-info",-193956374),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.info","div.info",-1023482078),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dl","dl",-2140151713),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dt","dt",-368444759),"Light Table version"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dd","dd",-1340437629),new cljs.core.Keyword(null,"version","version",425292698).cljs$core$IFn$_invoke$arity$1(lt.objs.deploy.version)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dt","dt",-368444759),"Binary version"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dd","dd",-1340437629),lt.objs.deploy.binary_version.call(null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dt","dt",-368444759),"Plugins directory",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dd","dd",-1340437629),lt.objs.files.lt_user_dir.call(null,"plugins")], null)], null)], null),lt.objs.version.check_button.call(null)], null),lt.objs.editor.__GT_elem.call(null,main)], null);
}));
lt.objs.version.add = (function lt$objs$version$add(){
var v = lt.object.create.call(null,new cljs.core.Keyword("lt.objs.version","version-pane","lt.objs.version/version-pane",55860981));
lt.objs.tabs.add_BANG_.call(null,v);

return lt.objs.tabs.active_BANG_.call(null,v);
});
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"version","version",425292698),new cljs.core.Keyword(null,"desc","desc",2093485764),"App: Light Table version",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (_){
return lt.objs.version.add.call(null);
})], null));
