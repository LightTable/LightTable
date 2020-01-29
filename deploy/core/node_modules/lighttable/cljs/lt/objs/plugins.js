// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.objs.plugins');
goog.require('cljs.core');
goog.require('lt.objs.command');
goog.require('lt.objs.notifos');
goog.require('lt.objs.platform');
goog.require('lt.objs.console');
goog.require('clojure.set');
goog.require('lt.objs.context');
goog.require('lt.objs.deploy');
goog.require('lt.objs.settings');
goog.require('fetch.core');
goog.require('crate.core');
goog.require('lt.object');
goog.require('lt.util.dom');
goog.require('lt.objs.app');
goog.require('lt.util.load');
goog.require('lt.objs.popup');
goog.require('lt.objs.editor.pool');
goog.require('clojure.walk');
goog.require('lt.objs.tabs');
goog.require('lt.objs.files');
goog.require('lt.util.kahn');
goog.require('clojure.string');
goog.require('lt.util.js');
goog.require('cljs.reader');
goog.require('crate.binding');
lt.objs.plugins.plugins_dir = lt.objs.files.lt_home.call(null,"plugins");
lt.objs.plugins.user_plugins_dir = lt.objs.files.lt_user_dir.call(null,"plugins");
lt.objs.plugins._STAR_plugin_dir_STAR_ = null;
lt.objs.plugins.EOF_read = (function lt$objs$plugins$EOF_read(s){
if(cljs.core.truth_((function (){var and__6781__auto__ = s;
if(cljs.core.truth_(and__6781__auto__)){
return cljs.core.seq.call(null,s);
} else {
return and__6781__auto__;
}
})())){
return cljs.reader.read_string.call(null,s);
} else {
return null;
}
});
lt.objs.plugins.munge_plugin_name = (function lt$objs$plugins$munge_plugin_name(n){
if(cljs.core.truth_(n)){
return clojure.string.replace.call(null,clojure.string.replace.call(null,clojure.string.replace.call(null,n," ","_"),"-","_"),".","_");
} else {
return null;
}
});
lt.objs.plugins.adjust_path = (function lt$objs$plugins$adjust_path(path){
if(cljs.core.truth_(lt.objs.files.absolute_QMARK_.call(null,path))){
return path;
} else {
return lt.objs.files.join.call(null,(function (){var or__6793__auto__ = new cljs.core.Keyword("lt.objs.plugins","dir","lt.objs.plugins/dir",651688593).cljs$core$IFn$_invoke$arity$1(lt.object._STAR_behavior_meta_STAR_);
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return lt.objs.files.lt_home.call(null);
}
})(),path);
}
});
lt.objs.plugins.find_plugin = (function lt$objs$plugins$find_plugin(plugin_name){
var plugin_name__$1 = lt.objs.plugins.munge_plugin_name.call(null,plugin_name);
if(cljs.core.truth_(new cljs.core.Keyword("lt.objs.plugins","dir","lt.objs.plugins/dir",651688593).cljs$core$IFn$_invoke$arity$1(lt.object._STAR_behavior_meta_STAR_))){
return new cljs.core.Keyword("lt.objs.plugins","dir","lt.objs.plugins/dir",651688593).cljs$core$IFn$_invoke$arity$1(lt.object._STAR_behavior_meta_STAR_);
} else {
if(cljs.core.truth_(lt.objs.files.exists_QMARK_.call(null,lt.objs.files.join.call(null,lt.objs.plugins.user_plugins_dir,plugin_name__$1)))){
return lt.objs.files.join.call(null,lt.objs.plugins.user_plugins_dir,plugin_name__$1);
} else {
if(cljs.core.truth_(lt.objs.files.exists_QMARK_.call(null,lt.objs.files.join.call(null,lt.objs.plugins.plugins_dir,plugin_name__$1)))){
return lt.objs.files.join.call(null,lt.objs.plugins.plugins_dir,plugin_name__$1);
} else {
return null;

}
}
}
});
lt.objs.plugins.local_module = (function lt$objs$plugins$local_module(plugin_name,module_name){
var temp__4657__auto__ = lt.objs.plugins.find_plugin.call(null,plugin_name);
if(cljs.core.truth_(temp__4657__auto__)){
var plugin_path = temp__4657__auto__;
return lt.objs.files.join.call(null,plugin_path,"node_modules",module_name);
} else {
return null;
}
});
lt.objs.plugins.by_name = (function lt$objs$plugins$by_name(plugin_name){
return cljs.core.get.call(null,new cljs.core.Keyword("lt.objs.plugins","plugins","lt.objs.plugins/plugins",-1345299551).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.app.app)),plugin_name);
});
lt.objs.plugins.installed_QMARK_ = (function lt$objs$plugins$installed_QMARK_(plugin_name){
return cljs.core.boolean$.call(null,lt.objs.plugins.by_name.call(null,plugin_name));
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"build","build",964396370),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: build file or project",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
return lt.object.raise.call(null,ed,new cljs.core.Keyword(null,"build","build",964396370));
} else {
return null;
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"behaviors.force-reload","behaviors.force-reload",98969940),new cljs.core.Keyword(null,"desc","desc",2093485764),"Plugins: Ignore cache and force reload the current behaviors file",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
if(cljs.core.truth_(lt.object.has_tag_QMARK_.call(null,ed,new cljs.core.Keyword(null,"editor.behaviors","editor.behaviors",-661211790)))){
cljs.core.swap_BANG_.call(null,lt.objs.plugins.manager,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("lt.objs.plugins","force-reload","lt.objs.plugins/force-reload",180193649)], null),((function (ed,temp__4657__auto__){
return (function (p1__20440_SHARP_){
return cljs.core.conj.call(null,(function (){var or__6793__auto__ = p1__20440_SHARP_;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return cljs.core.PersistentHashSet.EMPTY;
}
})(),cljs.core.get_in.call(null,cljs.core.deref.call(null,ed),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",-317069002),new cljs.core.Keyword(null,"path","path",-188191168)], null)));
});})(ed,temp__4657__auto__))
);

return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"behaviors.reload","behaviors.reload",2130924967));
} else {
return null;
}
} else {
return null;
}
})], null));
lt.objs.plugins.validate = (function lt$objs$plugins$validate(plugin,filename){
var valid_QMARK_ = cljs.core.every_QMARK_.call(null,plugin,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"author","author",2111686192),new cljs.core.Keyword(null,"behaviors","behaviors",120724909),new cljs.core.Keyword(null,"desc","desc",2093485764)], null));
if(!(valid_QMARK_)){
lt.objs.console.error.call(null,[cljs.core.str("Invalid "),cljs.core.str(filename),cljs.core.str(" file: "),cljs.core.str(new cljs.core.Keyword(null,"dir","dir",1734754661).cljs$core$IFn$_invoke$arity$1(plugin)),cljs.core.str("/"),cljs.core.str(filename),cljs.core.str("\nPlugins "),cljs.core.str("must include values for name, version, author, behaviors, and desc.")].join(''));

return null;
} else {
return plugin;
}
});
lt.objs.plugins.plugin_edn = (function lt$objs$plugins$plugin_edn(dir){
var file = lt.objs.files.join.call(null,dir,"plugin.edn");
var temp__4657__auto__ = (function (){var and__6781__auto__ = lt.objs.files.exists_QMARK_.call(null,file);
if(cljs.core.truth_(and__6781__auto__)){
return lt.objs.files.open_sync.call(null,file);
} else {
return and__6781__auto__;
}
})();
if(cljs.core.truth_(temp__4657__auto__)){
var content = temp__4657__auto__;
try{return lt.objs.plugins.validate.call(null,cljs.core.assoc.call(null,lt.objs.plugins.EOF_read.call(null,new cljs.core.Keyword(null,"content","content",15833224).cljs$core$IFn$_invoke$arity$1(content)),new cljs.core.Keyword(null,"dir","dir",1734754661),dir),"plugin.edn");
}catch (e20442){var e = e20442;
return lt.objs.console.error.call(null,[cljs.core.str("FAILED to load plugin.edn: "),cljs.core.str(dir)].join(''));
}} else {
return null;
}
});
lt.objs.plugins.plugin_json = (function lt$objs$plugins$plugin_json(dir){
var file = lt.objs.files.join.call(null,dir,"plugin.json");
var temp__4657__auto__ = (function (){var and__6781__auto__ = lt.objs.files.exists_QMARK_.call(null,file);
if(cljs.core.truth_(and__6781__auto__)){
return lt.objs.files.open_sync.call(null,file);
} else {
return and__6781__auto__;
}
})();
if(cljs.core.truth_(temp__4657__auto__)){
var content = temp__4657__auto__;
return lt.objs.plugins.validate.call(null,cljs.core.assoc.call(null,cljs.core.js__GT_clj.call(null,JSON.parse(new cljs.core.Keyword(null,"content","content",15833224).cljs$core$IFn$_invoke$arity$1(content)),new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true),new cljs.core.Keyword(null,"dir","dir",1734754661),dir),"plugin.json");
} else {
return null;
}
});
lt.objs.plugins.plugin_info = (function lt$objs$plugins$plugin_info(dir){
var or__6793__auto__ = lt.objs.plugins.plugin_json.call(null,dir);
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return lt.objs.plugins.plugin_edn.call(null,dir);
}
});
lt.objs.plugins.missing_deps = (function lt$objs$plugins$missing_deps(all){
var deps = cljs.core.mapcat.call(null,cljs.core.comp.call(null,cljs.core.seq,new cljs.core.Keyword(null,"dependencies","dependencies",1108064605)),cljs.core.vals.call(null,all));
return cljs.core.seq.call(null,cljs.core.vals.call(null,cljs.core.persistent_BANG_.call(null,cljs.core.reduce.call(null,((function (deps){
return (function (final$,p__20447){
var vec__20448 = p__20447;
var name = cljs.core.nth.call(null,vec__20448,(0),null);
var version = cljs.core.nth.call(null,vec__20448,(1),null);
var name__$1 = cljs.core.name.call(null,name);
var temp__4655__auto__ = (function (){var or__6793__auto__ = cljs.core.get.call(null,all,name__$1);
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return cljs.core.get.call(null,final$,name__$1);
}
})();
if(cljs.core.truth_(temp__4655__auto__)){
var cur = temp__4655__auto__;
if(cljs.core.truth_(lt.objs.deploy.is_newer_QMARK_.call(null,new cljs.core.Keyword(null,"version","version",425292698).cljs$core$IFn$_invoke$arity$1(cur),version))){
return cljs.core.assoc_BANG_.call(null,final$,name__$1,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"name","name",1843675177),name__$1,new cljs.core.Keyword(null,"version","version",425292698),version], null));
} else {
return final$;
}
} else {
return cljs.core.assoc_BANG_.call(null,final$,name__$1,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"name","name",1843675177),name__$1,new cljs.core.Keyword(null,"version","version",425292698),version], null));
}
});})(deps))
,cljs.core.transient$.call(null,cljs.core.PersistentArrayMap.EMPTY),deps))));
});
lt.objs.plugins.outdated_QMARK_ = (function lt$objs$plugins$outdated_QMARK_(plugin){
var cached = new cljs.core.Keyword(null,"latest-version","latest-version",-1985110248).cljs$core$IFn$_invoke$arity$1(cljs.core.get.call(null,new cljs.core.Keyword(null,"server-plugins","server-plugins",-514262131).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.plugins.manager)),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(plugin)));
if(cljs.core.truth_(cached)){
return lt.objs.deploy.is_newer_QMARK_.call(null,new cljs.core.Keyword(null,"version","version",425292698).cljs$core$IFn$_invoke$arity$1(plugin),cached);
} else {
return null;
}
});
lt.objs.plugins.plugin_behaviors = (function lt$objs$plugins$plugin_behaviors(plug){
if(cljs.core.seq.call(null,plug)){
try{var map__20455 = plug;
var map__20455__$1 = ((((!((map__20455 == null)))?((((map__20455.cljs$lang$protocol_mask$partition0$ & (64))) || (map__20455.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__20455):map__20455);
var behaviors = cljs.core.get.call(null,map__20455__$1,new cljs.core.Keyword(null,"behaviors","behaviors",120724909));
var dir = cljs.core.get.call(null,map__20455__$1,new cljs.core.Keyword(null,"dir","dir",1734754661));
var file = lt.objs.files.join.call(null,dir,behaviors);
var file__$1 = lt.objs.files.real_path.call(null,file);
var behs = lt.objs.settings.parse_file.call(null,file__$1);
var force_QMARK_ = cljs.core.get.call(null,new cljs.core.Keyword("lt.objs.plugins","force-reload","lt.objs.plugins/force-reload",180193649).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.plugins.manager)),file__$1);
if(cljs.core.truth_(force_QMARK_)){
cljs.core.swap_BANG_.call(null,lt.objs.plugins.manager,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("lt.objs.plugins","force-reload","lt.objs.plugins/force-reload",180193649)], null),cljs.core.disj,file__$1);
} else {
}

if(cljs.core.truth_(behs)){
clojure.walk.prewalk.call(null,((function (map__20455,map__20455__$1,behaviors,dir,file,file__$1,behs,force_QMARK_){
return (function (x){
if(cljs.core.coll_QMARK_.call(null,x)){
cljs.core.alter_meta_BANG_.call(null,x,cljs.core.assoc,new cljs.core.Keyword("lt.objs.plugins","dir","lt.objs.plugins/dir",651688593),dir,new cljs.core.Keyword("lt.objs.plugins","force-reload","lt.objs.plugins/force-reload",180193649),force_QMARK_);
} else {
}

return x;
});})(map__20455,map__20455__$1,behaviors,dir,file,file__$1,behs,force_QMARK_))
,behs);

return behs;
} else {
return null;
}
}catch (e20454){var e = e20454;
lt.objs.console.error.call(null,[cljs.core.str("Could not load behaviors for plugin: "),cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(plug))].join(''));

return cljs.core.PersistentArrayMap.EMPTY;
}} else {
return null;
}
});
lt.objs.plugins.plugin_dependency_graph = (function lt$objs$plugins$plugin_dependency_graph(plugins){
return cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__7573__auto__ = (function lt$objs$plugins$plugin_dependency_graph_$_iter__20473(s__20474){
return (new cljs.core.LazySeq(null,(function (){
var s__20474__$1 = s__20474;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__20474__$1);
if(temp__4657__auto__){
var s__20474__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__20474__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__20474__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__20476 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__20475 = (0);
while(true){
if((i__20475 < size__7572__auto__)){
var vec__20483 = cljs.core._nth.call(null,c__7571__auto__,i__20475);
var nme = cljs.core.nth.call(null,vec__20483,(0),null);
var v = cljs.core.nth.call(null,vec__20483,(1),null);
cljs.core.chunk_append.call(null,b__20476,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [nme,cljs.core.set.call(null,cljs.core.map.call(null,cljs.core.name,cljs.core.keys.call(null,new cljs.core.Keyword(null,"dependencies","dependencies",1108064605).cljs$core$IFn$_invoke$arity$1(v))))], null));

var G__20489 = (i__20475 + (1));
i__20475 = G__20489;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__20476),lt$objs$plugins$plugin_dependency_graph_$_iter__20473.call(null,cljs.core.chunk_rest.call(null,s__20474__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__20476),null);
}
} else {
var vec__20486 = cljs.core.first.call(null,s__20474__$2);
var nme = cljs.core.nth.call(null,vec__20486,(0),null);
var v = cljs.core.nth.call(null,vec__20486,(1),null);
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [nme,cljs.core.set.call(null,cljs.core.map.call(null,cljs.core.name,cljs.core.keys.call(null,new cljs.core.Keyword(null,"dependencies","dependencies",1108064605).cljs$core$IFn$_invoke$arity$1(v))))], null),lt$objs$plugins$plugin_dependency_graph_$_iter__20473.call(null,cljs.core.rest.call(null,s__20474__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__7573__auto__.call(null,plugins);
})());
});
lt.objs.plugins.find_cycles = (function lt$objs$plugins$find_cycles(cur,p__20490){
var map__20497 = p__20490;
var map__20497__$1 = ((((!((map__20497 == null)))?((((map__20497.cljs$lang$protocol_mask$partition0$ & (64))) || (map__20497.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__20497):map__20497);
var state = map__20497__$1;
var seen = cljs.core.get.call(null,map__20497__$1,new cljs.core.Keyword(null,"seen","seen",-518999789));
var root = cljs.core.get.call(null,map__20497__$1,new cljs.core.Keyword(null,"root","root",-448657453));
var stack = cljs.core.get.call(null,map__20497__$1,new cljs.core.Keyword(null,"stack","stack",-793405930));
var graph = cljs.core.get.call(null,map__20497__$1,new cljs.core.Keyword(null,"graph","graph",1558099509));
return cljs.core.first.call(null,cljs.core.filter.call(null,cljs.core.identity,(function (){var iter__7573__auto__ = ((function (map__20497,map__20497__$1,state,seen,root,stack,graph){
return (function lt$objs$plugins$find_cycles_$_iter__20499(s__20500){
return (new cljs.core.LazySeq(null,((function (map__20497,map__20497__$1,state,seen,root,stack,graph){
return (function (){
var s__20500__$1 = s__20500;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__20500__$1);
if(temp__4657__auto__){
var s__20500__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__20500__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__20500__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__20502 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__20501 = (0);
while(true){
if((i__20501 < size__7572__auto__)){
var c = cljs.core._nth.call(null,c__7571__auto__,i__20501);
cljs.core.chunk_append.call(null,b__20502,((cljs.core._EQ_.call(null,c,root))?cljs.core.conj.call(null,stack,c):lt$objs$plugins$find_cycles.call(null,cljs.core.get.call(null,graph,c),cljs.core.update_in.call(null,cljs.core.update_in.call(null,state,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"stack","stack",-793405930)], null),cljs.core.conj,c),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"seen","seen",-518999789)], null),cljs.core.conj,c))));

var G__20503 = (i__20501 + (1));
i__20501 = G__20503;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__20502),lt$objs$plugins$find_cycles_$_iter__20499.call(null,cljs.core.chunk_rest.call(null,s__20500__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__20502),null);
}
} else {
var c = cljs.core.first.call(null,s__20500__$2);
return cljs.core.cons.call(null,((cljs.core._EQ_.call(null,c,root))?cljs.core.conj.call(null,stack,c):lt$objs$plugins$find_cycles.call(null,cljs.core.get.call(null,graph,c),cljs.core.update_in.call(null,cljs.core.update_in.call(null,state,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"stack","stack",-793405930)], null),cljs.core.conj,c),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"seen","seen",-518999789)], null),cljs.core.conj,c))),lt$objs$plugins$find_cycles_$_iter__20499.call(null,cljs.core.rest.call(null,s__20500__$2)));
}
} else {
return null;
}
break;
}
});})(map__20497,map__20497__$1,state,seen,root,stack,graph))
,null,null));
});})(map__20497,map__20497__$1,state,seen,root,stack,graph))
;
return iter__7573__auto__.call(null,cljs.core.remove.call(null,seen,cur));
})()));
});
lt.objs.plugins.__GT_cycles = (function lt$objs$plugins$__GT_cycles(graph){
return cljs.core.filterv.call(null,cljs.core.identity,(function (){var iter__7573__auto__ = (function lt$objs$plugins$__GT_cycles_$_iter__20520(s__20521){
return (new cljs.core.LazySeq(null,(function (){
var s__20521__$1 = s__20521;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__20521__$1);
if(temp__4657__auto__){
var s__20521__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__20521__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__20521__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__20523 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__20522 = (0);
while(true){
if((i__20522 < size__7572__auto__)){
var vec__20530 = cljs.core._nth.call(null,c__7571__auto__,i__20522);
var root = cljs.core.nth.call(null,vec__20530,(0),null);
var deps = cljs.core.nth.call(null,vec__20530,(1),null);
var stack = lt.objs.plugins.find_cycles.call(null,deps,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"seen","seen",-518999789),cljs.core.PersistentHashSet.EMPTY,new cljs.core.Keyword(null,"stack","stack",-793405930),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [root], null),new cljs.core.Keyword(null,"graph","graph",1558099509),graph,new cljs.core.Keyword(null,"root","root",-448657453),root], null));
cljs.core.chunk_append.call(null,b__20523,stack);

var G__20536 = (i__20522 + (1));
i__20522 = G__20536;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__20523),lt$objs$plugins$__GT_cycles_$_iter__20520.call(null,cljs.core.chunk_rest.call(null,s__20521__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__20523),null);
}
} else {
var vec__20533 = cljs.core.first.call(null,s__20521__$2);
var root = cljs.core.nth.call(null,vec__20533,(0),null);
var deps = cljs.core.nth.call(null,vec__20533,(1),null);
var stack = lt.objs.plugins.find_cycles.call(null,deps,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"seen","seen",-518999789),cljs.core.PersistentHashSet.EMPTY,new cljs.core.Keyword(null,"stack","stack",-793405930),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [root], null),new cljs.core.Keyword(null,"graph","graph",1558099509),graph,new cljs.core.Keyword(null,"root","root",-448657453),root], null));
return cljs.core.cons.call(null,stack,lt$objs$plugins$__GT_cycles_$_iter__20520.call(null,cljs.core.rest.call(null,s__20521__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__7573__auto__.call(null,graph);
})());
});
lt.objs.plugins.cycle_desc = (function lt$objs$plugins$cycle_desc(cycles){
var iter__7573__auto__ = (function lt$objs$plugins$cycle_desc_$_iter__20541(s__20542){
return (new cljs.core.LazySeq(null,(function (){
var s__20542__$1 = s__20542;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__20542__$1);
if(temp__4657__auto__){
var s__20542__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__20542__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__20542__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__20544 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__20543 = (0);
while(true){
if((i__20543 < size__7572__auto__)){
var cycle = cljs.core._nth.call(null,c__7571__auto__,i__20543);
cljs.core.chunk_append.call(null,b__20544,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),cljs.core.reduce.call(null,cljs.core.str,cljs.core.interpose.call(null," => ",cycle))], null));

var G__20545 = (i__20543 + (1));
i__20543 = G__20545;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__20544),lt$objs$plugins$cycle_desc_$_iter__20541.call(null,cljs.core.chunk_rest.call(null,s__20542__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__20544),null);
}
} else {
var cycle = cljs.core.first.call(null,s__20542__$2);
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),cljs.core.reduce.call(null,cljs.core.str,cljs.core.interpose.call(null," => ",cycle))], null),lt$objs$plugins$cycle_desc_$_iter__20541.call(null,cljs.core.rest.call(null,s__20542__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__7573__auto__.call(null,cycles);
});
lt.objs.plugins.metadata_commits = "https://api.github.com/repos/LightTable/plugin-metadata/commits";
lt.objs.plugins.metadata_download = "https://api.github.com/repos/LightTable/plugin-metadata/tarball/master";
lt.objs.plugins.metadata_dir = lt.objs.files.lt_user_dir.call(null,"metadata");
lt.objs.plugins.metadata_cache = lt.objs.files.join.call(null,lt.objs.plugins.metadata_dir,"cache.json");
lt.objs.plugins.version_sort = (function lt$objs$plugins$version_sort(a,b){
if(cljs.core._EQ_.call(null,a,b)){
return (0);
} else {
if(cljs.core.truth_(lt.objs.deploy.is_newer_QMARK_.call(null,a,b))){
return (-1);
} else {
return (1);

}
}
});
lt.objs.plugins.valid_plugin_dir_QMARK_ = (function lt$objs$plugins$valid_plugin_dir_QMARK_(path){
var and__6781__auto__ = lt.objs.files.dir_QMARK_.call(null,path);
if(cljs.core.truth_(and__6781__auto__)){
return !(cljs.core._EQ_.call(null,"script",lt.objs.files.basename.call(null,path)));
} else {
return and__6781__auto__;
}
});
lt.objs.plugins.build_cache = (function lt$objs$plugins$build_cache(sha){
var items = cljs.core.filter.call(null,lt.objs.plugins.valid_plugin_dir_QMARK_,lt.objs.files.full_path_ls.call(null,lt.objs.plugins.metadata_dir));
var cache = cljs.core.into.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"__sha","__sha",1382835112),sha], null),(function (){var iter__7573__auto__ = ((function (items){
return (function lt$objs$plugins$build_cache_$_iter__20550(s__20551){
return (new cljs.core.LazySeq(null,((function (items){
return (function (){
var s__20551__$1 = s__20551;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__20551__$1);
if(temp__4657__auto__){
var s__20551__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__20551__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__20551__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__20553 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__20552 = (0);
while(true){
if((i__20552 < size__7572__auto__)){
var plugin = cljs.core._nth.call(null,c__7571__auto__,i__20552);
var versions = cljs.core.vec.call(null,cljs.core.sort_by.call(null,new cljs.core.Keyword(null,"version","version",425292698),lt.objs.plugins.version_sort,cljs.core.map.call(null,lt.objs.plugins.plugin_info,cljs.core.filter.call(null,lt.objs.files.dir_QMARK_,lt.objs.files.full_path_ls.call(null,plugin)))));
var latest = cljs.core.last.call(null,versions);
cljs.core.chunk_append.call(null,b__20553,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(latest),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"versions","versions",536521978),cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,cljs.core.juxt.call(null,new cljs.core.Keyword(null,"version","version",425292698),cljs.core.identity),versions)),new cljs.core.Keyword(null,"latest-version","latest-version",-1985110248),new cljs.core.Keyword(null,"version","version",425292698).cljs$core$IFn$_invoke$arity$1(latest)], null)], null));

var G__20554 = (i__20552 + (1));
i__20552 = G__20554;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__20553),lt$objs$plugins$build_cache_$_iter__20550.call(null,cljs.core.chunk_rest.call(null,s__20551__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__20553),null);
}
} else {
var plugin = cljs.core.first.call(null,s__20551__$2);
var versions = cljs.core.vec.call(null,cljs.core.sort_by.call(null,new cljs.core.Keyword(null,"version","version",425292698),lt.objs.plugins.version_sort,cljs.core.map.call(null,lt.objs.plugins.plugin_info,cljs.core.filter.call(null,lt.objs.files.dir_QMARK_,lt.objs.files.full_path_ls.call(null,plugin)))));
var latest = cljs.core.last.call(null,versions);
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(latest),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"versions","versions",536521978),cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,cljs.core.juxt.call(null,new cljs.core.Keyword(null,"version","version",425292698),cljs.core.identity),versions)),new cljs.core.Keyword(null,"latest-version","latest-version",-1985110248),new cljs.core.Keyword(null,"version","version",425292698).cljs$core$IFn$_invoke$arity$1(latest)], null)], null),lt$objs$plugins$build_cache_$_iter__20550.call(null,cljs.core.rest.call(null,s__20551__$2)));
}
} else {
return null;
}
break;
}
});})(items))
,null,null));
});})(items))
;
return iter__7573__auto__.call(null,items);
})());
return cache;
});
lt.objs.plugins.save_cache = (function lt$objs$plugins$save_cache(cache){
return lt.objs.files.save.call(null,lt.objs.plugins.metadata_cache,JSON.stringify(cljs.core.clj__GT_js.call(null,cache)));
});
lt.objs.plugins.latest_metadata_sha = (function lt$objs$plugins$latest_metadata_sha(){
return fetch.core.xhr.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"get","get",1683182755),lt.objs.plugins.metadata_commits], null),cljs.core.PersistentArrayMap.EMPTY,(function (data){
var temp__4657__auto__ = (function (){try{return JSON.parse(data);
}catch (e20556){var e = e20556;
return lt.objs.console.error.call(null,[cljs.core.str("Invalid JSON response from "),cljs.core.str(lt.objs.plugins.metadata_commits),cljs.core.str(": "),cljs.core.str(cljs.core.pr_str.call(null,data))].join(''));
}})();
if(cljs.core.truth_(temp__4657__auto__)){
var parsed = temp__4657__auto__;
var sha = ((parsed[(0)])["sha"]);
return lt.object.raise.call(null,lt.objs.plugins.manager,new cljs.core.Keyword(null,"metadata.sha","metadata.sha",-275753543),sha);
} else {
return null;
}
}));
});
lt.objs.plugins.download_metadata = (function lt$objs$plugins$download_metadata(sha){
var tmp_gz = lt.objs.files.lt_user_dir.call(null,"metadata-temp.tar.gz");
var tmp_dir = lt.objs.files.lt_user_dir.call(null,"metadata-temp");
lt.objs.notifos.working.call(null,"Updating plugin metadata");

return lt.objs.deploy.download_file.call(null,lt.objs.plugins.metadata_download,tmp_gz,((function (tmp_gz,tmp_dir){
return (function (){
return lt.objs.deploy.untar.call(null,tmp_gz,tmp_dir,((function (tmp_gz,tmp_dir){
return (function (){
lt.objs.notifos.done_working.call(null);

var munged_dir = cljs.core.first.call(null,lt.objs.files.full_path_ls.call(null,tmp_dir));
if(cljs.core.truth_(munged_dir)){
if(cljs.core.truth_(lt.objs.files.exists_QMARK_.call(null,lt.objs.plugins.metadata_dir))){
lt.objs.files.delete_BANG_.call(null,lt.objs.plugins.metadata_dir);
} else {
}

lt.objs.files.move_BANG_.call(null,munged_dir,lt.objs.plugins.metadata_dir);
} else {
}

lt.objs.files.delete_BANG_.call(null,tmp_dir);

lt.objs.files.delete_BANG_.call(null,tmp_gz);

if(cljs.core.truth_(munged_dir)){
lt.objs.plugins.save_cache.call(null,lt.objs.plugins.build_cache.call(null,sha));

lt.objs.notifos.done_working.call(null,[cljs.core.str("Plugin metadata updated. ")].join(''));

return lt.object.raise.call(null,lt.objs.plugins.manager,new cljs.core.Keyword(null,"metadata.updated","metadata.updated",745911191));
} else {
return lt.objs.plugins.install_failed.call(null,"metadata");
}
});})(tmp_gz,tmp_dir))
);
});})(tmp_gz,tmp_dir))
);
});
lt.objs.plugins.read_cache = (function lt$objs$plugins$read_cache(){
if(cljs.core.truth_(lt.objs.files.exists_QMARK_.call(null,lt.objs.plugins.metadata_cache))){
return cljs.core.js__GT_clj.call(null,JSON.parse(new cljs.core.Keyword(null,"content","content",15833224).cljs$core$IFn$_invoke$arity$1(lt.objs.files.open_sync.call(null,lt.objs.plugins.metadata_cache))),new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true);
} else {
return null;
}
});
lt.objs.plugins.search_plugins = (function lt$objs$plugins$search_plugins(plugins,search){
var search__$1 = search.toLowerCase();
return cljs.core.filter.call(null,((function (search__$1){
return (function (plugin){
return ((new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$2(plugin,"").toLowerCase().indexOf(search__$1) > (-1))) || ((new cljs.core.Keyword(null,"author","author",2111686192).cljs$core$IFn$_invoke$arity$2(plugin,"").toLowerCase().indexOf(search__$1) > (-1))) || ((new cljs.core.Keyword(null,"desc","desc",2093485764).cljs$core$IFn$_invoke$arity$2(plugin,"").toLowerCase().indexOf(search__$1) > (-1)));
});})(search__$1))
,plugins);
});
lt.objs.plugins.latest_version_merge = (function lt$objs$plugins$latest_version_merge(neue,old){
var neue__$1 = cljs.core.seq.call(null,neue);
return cljs.core.reduce.call(null,((function (neue__$1){
return (function (final$,p__20561){
var vec__20562 = p__20561;
var name = cljs.core.nth.call(null,vec__20562,(0),null);
var ver = cljs.core.nth.call(null,vec__20562,(1),null);
var temp__4655__auto__ = new cljs.core.Keyword(null,"version","version",425292698).cljs$core$IFn$_invoke$arity$1(final$.call(null,name));
if(cljs.core.truth_(temp__4655__auto__)){
var cur_ver = temp__4655__auto__;
if(cljs.core.truth_(lt.objs.deploy.is_newer_QMARK_.call(null,ver,cur_ver))){
return cljs.core.assoc.call(null,final$,name,ver);
} else {
return final$;
}
} else {
return cljs.core.assoc.call(null,final$,name,ver);
}
});})(neue__$1))
,old,neue__$1);
});
lt.objs.plugins.transitive_deps = (function lt$objs$plugins$transitive_deps(plugins,p__20565,seen){
var vec__20569 = p__20565;
var name = cljs.core.nth.call(null,vec__20569,(0),null);
var ver = cljs.core.nth.call(null,vec__20569,(1),null);
var name__$1 = cljs.core.keyword.call(null,name);
var temp__4655__auto__ = cljs.core.get_in.call(null,plugins,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [name__$1,new cljs.core.Keyword(null,"versions","versions",536521978),cljs.core.keyword.call(null,ver)], null));
if(cljs.core.truth_(temp__4655__auto__)){
var cur = temp__4655__auto__;
var deps = new cljs.core.Keyword(null,"dependencies","dependencies",1108064605).cljs$core$IFn$_invoke$arity$1(cur);
var unique = cljs.core.remove.call(null,seen,cljs.core.keys.call(null,deps));
var seen__$1 = lt.objs.plugins.latest_version_merge.call(null,cljs.core.PersistentArrayMap.fromArray([name__$1,cur], true, false),seen);
return cljs.core.reduce.call(null,((function (deps,unique,seen__$1,cur,temp__4655__auto__,name__$1,vec__20569,name,ver){
return (function (seen__$2,cur__$1){
return lt$objs$plugins$transitive_deps.call(null,plugins,cur__$1,seen__$2);
});})(deps,unique,seen__$1,cur,temp__4655__auto__,name__$1,vec__20569,name,ver))
,seen__$1,cljs.core.select_keys.call(null,deps,unique));
} else {
return seen;
}
});
lt.objs.plugins.latest_version = (function lt$objs$plugins$latest_version(plugin){
return cljs.core.get.call(null,new cljs.core.Keyword(null,"versions","versions",536521978).cljs$core$IFn$_invoke$arity$1(plugin),cljs.core.keyword.call(null,new cljs.core.Keyword(null,"latest-version","latest-version",-1985110248).cljs$core$IFn$_invoke$arity$1(plugin)));
});
lt.objs.plugins.all_latest = (function lt$objs$plugins$all_latest(plugins){
return cljs.core.map.call(null,lt.objs.plugins.latest_version,cljs.core.vals.call(null,cljs.core.dissoc.call(null,plugins,new cljs.core.Keyword(null,"__sha","__sha",1382835112))));
});
lt.objs.plugins.install_failed = (function lt$objs$plugins$install_failed(name){
if(cljs.core.truth_((function (){var and__6781__auto__ = lt.objs.plugins.by_name.call(null,name);
if(cljs.core.truth_(and__6781__auto__)){
return cljs.core.not.call(null,new cljs.core.Keyword(null,"version","version",425292698).cljs$core$IFn$_invoke$arity$1(lt.objs.plugins.by_name.call(null,name)));
} else {
return and__6781__auto__;
}
})())){
lt.object.update_BANG_.call(null,lt.objs.app.app,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("lt.objs.plugins","plugins","lt.objs.plugins/plugins",-1345299551)], null),cljs.core.dissoc,name);
} else {
}

return lt.objs.notifos.done_working.call(null,[cljs.core.str("Plugin install failed for: "),cljs.core.str(name)].join(''));
});
lt.objs.plugins.plugin__GT_tar = (function lt$objs$plugins$plugin__GT_tar(plugin){
var vec__20576 = cljs.core.take.call(null,(2),cljs.core.filter.call(null,(function (p1__20572_SHARP_){
return cljs.core.not_EQ_.call(null,p1__20572_SHARP_,"");
}),cljs.core.reverse.call(null,clojure.string.split.call(null,new cljs.core.Keyword(null,"source","source",-433931539).cljs$core$IFn$_invoke$arity$1(plugin),"/"))));
var repo = cljs.core.nth.call(null,vec__20576,(0),null);
var username = cljs.core.nth.call(null,vec__20576,(1),null);
var repo__$1 = repo.replace(/.git/,"");
return [cljs.core.str("https://api.github.com/repos/"),cljs.core.str(username),cljs.core.str("/"),cljs.core.str(repo__$1),cljs.core.str("/tarball/"),cljs.core.str(new cljs.core.Keyword(null,"version","version",425292698).cljs$core$IFn$_invoke$arity$1(plugin))].join('');
});
lt.objs.plugins.fetch_and_install = (function lt$objs$plugins$fetch_and_install(url,name,cb){
var munged_name = lt.objs.plugins.munge_plugin_name.call(null,name);
var tmp_gz = [cljs.core.str(lt.objs.plugins.user_plugins_dir),cljs.core.str("/"),cljs.core.str(munged_name),cljs.core.str("-tmp.tar.gz")].join('');
var tmp_dir = [cljs.core.str(lt.objs.plugins.user_plugins_dir),cljs.core.str("/"),cljs.core.str(munged_name),cljs.core.str("-tmp")].join('');
lt.objs.notifos.working.call(null,[cljs.core.str("Downloading plugin: "),cljs.core.str(name)].join(''));

return lt.objs.deploy.download_file.call(null,url,tmp_gz,((function (munged_name,tmp_gz,tmp_dir){
return (function (){
lt.objs.notifos.done_working.call(null);

lt.objs.notifos.working.call(null,"Extracting plugin...");

return lt.objs.deploy.untar.call(null,tmp_gz,tmp_dir,((function (munged_name,tmp_gz,tmp_dir){
return (function (){
var munged_dir = cljs.core.first.call(null,lt.objs.files.full_path_ls.call(null,tmp_dir));
var final_path = [cljs.core.str(lt.objs.plugins.user_plugins_dir),cljs.core.str("/"),cljs.core.str(munged_name),cljs.core.str("/")].join('');
if(cljs.core.truth_(munged_dir)){
if(cljs.core.truth_(lt.objs.files.exists_QMARK_.call(null,final_path))){
lt.objs.files.delete_BANG_.call(null,final_path);
} else {
}

lt.objs.files.move_BANG_.call(null,munged_dir,final_path);
} else {
}

lt.objs.files.delete_BANG_.call(null,tmp_dir);

lt.objs.files.delete_BANG_.call(null,tmp_gz);

if(cljs.core.truth_(munged_dir)){
lt.objs.notifos.done_working.call(null,[cljs.core.str("Plugin fetched: "),cljs.core.str(name)].join(''));

lt.object.raise.call(null,lt.objs.plugins.manager,new cljs.core.Keyword(null,"plugin.fetched","plugin.fetched",-359787238));

if(cljs.core.truth_(cb)){
return cb.call(null);
} else {
return null;
}
} else {
return lt.objs.plugins.install_failed.call(null,name);
}
});})(munged_name,tmp_gz,tmp_dir))
);
});})(munged_name,tmp_gz,tmp_dir))
);
});
lt.objs.plugins.install_version = (function lt$objs$plugins$install_version(plugin,cb){
var name = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(plugin);
var ver = new cljs.core.Keyword(null,"version","version",425292698).cljs$core$IFn$_invoke$arity$1(plugin);
var installed_QMARK_ = cljs.core.get.call(null,new cljs.core.Keyword("lt.objs.plugins","plugins","lt.objs.plugins/plugins",-1345299551).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.app.app)),name);
if(cljs.core.truth_((function (){var or__6793__auto__ = cljs.core.not.call(null,installed_QMARK_);
if(or__6793__auto__){
return or__6793__auto__;
} else {
var and__6781__auto__ = new cljs.core.Keyword(null,"version","version",425292698).cljs$core$IFn$_invoke$arity$1(installed_QMARK_);
if(cljs.core.truth_(and__6781__auto__)){
return lt.objs.deploy.is_newer_QMARK_.call(null,new cljs.core.Keyword(null,"version","version",425292698).cljs$core$IFn$_invoke$arity$1(installed_QMARK_),ver);
} else {
return and__6781__auto__;
}
}
})())){
lt.object.update_BANG_.call(null,lt.objs.app.app,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("lt.objs.plugins","plugins","lt.objs.plugins/plugins",-1345299551)], null),cljs.core.assoc,name,cljs.core.PersistentArrayMap.EMPTY);

return lt.objs.plugins.fetch_and_install.call(null,lt.objs.plugins.plugin__GT_tar.call(null,plugin),name,((function (name,ver,installed_QMARK_){
return (function (){
if(cljs.core.truth_(cb)){
return cb.call(null,true);
} else {
return null;
}
});})(name,ver,installed_QMARK_))
);
} else {
lt.objs.notifos.set_msg_BANG_.call(null,[cljs.core.str(name),cljs.core.str(" is already installed")].join(''));

if(cljs.core.truth_(cb)){
return cb.call(null,false);
} else {
return null;
}
}
});
lt.objs.plugins.transitive_install = (function lt$objs$plugins$transitive_install(plugin,deps,cb){
var cur = cljs.core.keyword.call(null,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(plugin));
var others = cljs.core.dissoc.call(null,deps,cur);
var counter = cljs.core.atom.call(null,cljs.core.count.call(null,others));
var count_down = ((function (cur,others,counter){
return (function (){
cljs.core.swap_BANG_.call(null,counter,cljs.core.dec);

if((cljs.core.deref.call(null,counter) <= (0))){
return lt.objs.plugins.install_version.call(null,deps.call(null,cur),((function (cur,others,counter){
return (function (installed_QMARK_){
if(cljs.core.truth_(cb)){
return cb.call(null,installed_QMARK_);
} else {
return null;
}
});})(cur,others,counter))
);
} else {
return null;
}
});})(cur,others,counter))
;
if(cljs.core.seq.call(null,others)){
var seq__20589 = cljs.core.seq.call(null,others);
var chunk__20590 = null;
var count__20591 = (0);
var i__20592 = (0);
while(true){
if((i__20592 < count__20591)){
var vec__20593 = cljs.core._nth.call(null,chunk__20590,i__20592);
var _ = cljs.core.nth.call(null,vec__20593,(0),null);
var dep = cljs.core.nth.call(null,vec__20593,(1),null);
lt.objs.plugins.install_version.call(null,dep,count_down);

var G__20599 = seq__20589;
var G__20600 = chunk__20590;
var G__20601 = count__20591;
var G__20602 = (i__20592 + (1));
seq__20589 = G__20599;
chunk__20590 = G__20600;
count__20591 = G__20601;
i__20592 = G__20602;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__20589);
if(temp__4657__auto__){
var seq__20589__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__20589__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__20589__$1);
var G__20603 = cljs.core.chunk_rest.call(null,seq__20589__$1);
var G__20604 = c__7604__auto__;
var G__20605 = cljs.core.count.call(null,c__7604__auto__);
var G__20606 = (0);
seq__20589 = G__20603;
chunk__20590 = G__20604;
count__20591 = G__20605;
i__20592 = G__20606;
continue;
} else {
var vec__20596 = cljs.core.first.call(null,seq__20589__$1);
var _ = cljs.core.nth.call(null,vec__20596,(0),null);
var dep = cljs.core.nth.call(null,vec__20596,(1),null);
lt.objs.plugins.install_version.call(null,dep,count_down);

var G__20607 = cljs.core.next.call(null,seq__20589__$1);
var G__20608 = null;
var G__20609 = (0);
var G__20610 = (0);
seq__20589 = G__20607;
chunk__20590 = G__20608;
count__20591 = G__20609;
i__20592 = G__20610;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return count_down.call(null);
}
});
lt.objs.plugins.discover_deps = (function lt$objs$plugins$discover_deps(plugin,cb){
var deps = lt.objs.plugins.transitive_deps.call(null,new cljs.core.Keyword(null,"server-plugins","server-plugins",-514262131).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.plugins.manager)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(plugin),new cljs.core.Keyword(null,"version","version",425292698).cljs$core$IFn$_invoke$arity$1(plugin)], null),cljs.core.PersistentArrayMap.EMPTY);
if(cljs.core.not.call(null,cljs.core.seq.call(null,deps))){
return lt.objs.plugins.install_failed.call(null,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(plugin));
} else {
return lt.objs.plugins.transitive_install.call(null,plugin,deps,cb);
}
});
lt.objs.plugins.install_missing = (function lt$objs$plugins$install_missing(missing){
var counter = cljs.core.atom.call(null,cljs.core.count.call(null,missing));
var count_down = ((function (counter){
return (function (){
cljs.core.swap_BANG_.call(null,counter,cljs.core.dec);

if((cljs.core.deref.call(null,counter) <= (0))){
lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"behaviors.reload","behaviors.reload",2130924967));

lt.object.raise.call(null,lt.objs.plugins.manager,new cljs.core.Keyword(null,"refresh!","refresh!",156149341));

return lt.objs.notifos.set_msg_BANG_.call(null,"All missing dependencies installed.");
} else {
return null;
}
});})(counter))
;
var seq__20615 = cljs.core.seq.call(null,missing);
var chunk__20616 = null;
var count__20617 = (0);
var i__20618 = (0);
while(true){
if((i__20618 < count__20617)){
var dep = cljs.core._nth.call(null,chunk__20616,i__20618);
lt.objs.plugins.discover_deps.call(null,dep,count_down);

var G__20619 = seq__20615;
var G__20620 = chunk__20616;
var G__20621 = count__20617;
var G__20622 = (i__20618 + (1));
seq__20615 = G__20619;
chunk__20616 = G__20620;
count__20617 = G__20621;
i__20618 = G__20622;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__20615);
if(temp__4657__auto__){
var seq__20615__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__20615__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__20615__$1);
var G__20623 = cljs.core.chunk_rest.call(null,seq__20615__$1);
var G__20624 = c__7604__auto__;
var G__20625 = cljs.core.count.call(null,c__7604__auto__);
var G__20626 = (0);
seq__20615 = G__20623;
chunk__20616 = G__20624;
count__20617 = G__20625;
i__20618 = G__20626;
continue;
} else {
var dep = cljs.core.first.call(null,seq__20615__$1);
lt.objs.plugins.discover_deps.call(null,dep,count_down);

var G__20627 = cljs.core.next.call(null,seq__20615__$1);
var G__20628 = null;
var G__20629 = (0);
var G__20630 = (0);
seq__20615 = G__20627;
chunk__20616 = G__20628;
count__20617 = G__20629;
i__20618 = G__20630;
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
 * Check a plugins map for outdated or missing :dependencies and prompt
 *   to install missing ones
 */
lt.objs.plugins.check_missing = (function lt$objs$plugins$check_missing(deps){
var temp__4657__auto__ = lt.objs.plugins.missing_deps.call(null,deps);
if(cljs.core.truth_(temp__4657__auto__)){
var missing_QMARK_ = temp__4657__auto__;
return lt.objs.popup.popup_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"header","header",119441134),"Some plugin dependencies are missing.",new cljs.core.Keyword(null,"body","body",-2049205669),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),"We found that the following plugin dependencies are missing: "], null),(function (){var iter__7573__auto__ = ((function (missing_QMARK_,temp__4657__auto__){
return (function lt$objs$plugins$check_missing_$_iter__20643(s__20644){
return (new cljs.core.LazySeq(null,((function (missing_QMARK_,temp__4657__auto__){
return (function (){
var s__20644__$1 = s__20644;
while(true){
var temp__4657__auto____$1 = cljs.core.seq.call(null,s__20644__$1);
if(temp__4657__auto____$1){
var s__20644__$2 = temp__4657__auto____$1;
if(cljs.core.chunked_seq_QMARK_.call(null,s__20644__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__20644__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__20646 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__20645 = (0);
while(true){
if((i__20645 < size__7572__auto__)){
var map__20651 = cljs.core._nth.call(null,c__7571__auto__,i__20645);
var map__20651__$1 = ((((!((map__20651 == null)))?((((map__20651.cljs$lang$protocol_mask$partition0$ & (64))) || (map__20651.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__20651):map__20651);
var name = cljs.core.get.call(null,map__20651__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var version = cljs.core.get.call(null,map__20651__$1,new cljs.core.Keyword(null,"version","version",425292698));
cljs.core.chunk_append.call(null,b__20646,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),name," ",version," "], null));

var G__20655 = (i__20645 + (1));
i__20645 = G__20655;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__20646),lt$objs$plugins$check_missing_$_iter__20643.call(null,cljs.core.chunk_rest.call(null,s__20644__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__20646),null);
}
} else {
var map__20653 = cljs.core.first.call(null,s__20644__$2);
var map__20653__$1 = ((((!((map__20653 == null)))?((((map__20653.cljs$lang$protocol_mask$partition0$ & (64))) || (map__20653.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__20653):map__20653);
var name = cljs.core.get.call(null,map__20653__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var version = cljs.core.get.call(null,map__20653__$1,new cljs.core.Keyword(null,"version","version",425292698));
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),name," ",version," "], null),lt$objs$plugins$check_missing_$_iter__20643.call(null,cljs.core.rest.call(null,s__20644__$2)));
}
} else {
return null;
}
break;
}
});})(missing_QMARK_,temp__4657__auto__))
,null,null));
});})(missing_QMARK_,temp__4657__auto__))
;
return iter__7573__auto__.call(null,missing_QMARK_);
})(),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),"Would you like us to install them?"], null)], null),new cljs.core.Keyword(null,"buttons","buttons",-1953831197),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1718410804),"Cancel"], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"Install all",new cljs.core.Keyword(null,"action","action",-811238024),((function (missing_QMARK_,temp__4657__auto__){
return (function (){
return lt.objs.plugins.install_missing.call(null,missing_QMARK_);
});})(missing_QMARK_,temp__4657__auto__))
], null)], null)], null));
} else {
return null;
}
});
/**
 * Return a map of plugins by plugin name based on what's read from filesystem
 */
lt.objs.plugins.available_plugins = (function lt$objs$plugins$available_plugins(){
var ds = cljs.core.concat.call(null,lt.objs.files.dirs.call(null,lt.objs.plugins.user_plugins_dir),lt.objs.files.dirs.call(null,lt.objs.plugins.plugins_dir),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.objs.settings.user_plugin_dir], null));
var plugins = cljs.core.filterv.call(null,cljs.core.identity,cljs.core.map.call(null,lt.objs.plugins.plugin_info,ds));
return cljs.core.persistent_BANG_.call(null,cljs.core.reduce.call(null,((function (ds,plugins){
return (function (final$,p){
var temp__4655__auto__ = cljs.core.get.call(null,final$,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(p));
if(cljs.core.truth_(temp__4655__auto__)){
var cur = temp__4655__auto__;
if(cljs.core.truth_(lt.objs.deploy.is_newer_QMARK_.call(null,new cljs.core.Keyword(null,"version","version",425292698).cljs$core$IFn$_invoke$arity$1(cur),new cljs.core.Keyword(null,"version","version",425292698).cljs$core$IFn$_invoke$arity$1(p)))){
return cljs.core.assoc_BANG_.call(null,final$,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(p),p);
} else {
return final$;
}
} else {
return cljs.core.assoc_BANG_.call(null,final$,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(p),p);
}
});})(ds,plugins))
,cljs.core.transient$.call(null,cljs.core.PersistentArrayMap.EMPTY),plugins));
});
lt.objs.plugins.uninstall = (function lt$objs$plugins$uninstall(plugin){
if(cljs.core.truth_(new cljs.core.Keyword(null,"dir","dir",1734754661).cljs$core$IFn$_invoke$arity$1(plugin))){
lt.objs.files.delete_BANG_.call(null,new cljs.core.Keyword(null,"dir","dir",1734754661).cljs$core$IFn$_invoke$arity$1(plugin));

lt.object.raise.call(null,lt.objs.plugins.manager,new cljs.core.Keyword(null,"refresh!","refresh!",156149341),new cljs.core.Keyword(null,"ignore-missing","ignore-missing",836103362),true);

return lt.objs.notifos.set_msg_BANG_.call(null,[cljs.core.str("Uninstalled "),cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(plugin)),cljs.core.str(" "),cljs.core.str(new cljs.core.Keyword(null,"version","version",425292698).cljs$core$IFn$_invoke$arity$1(plugin))].join(''));
} else {
return null;
}
});
/**
 * 
 */
lt.objs.plugins.url_input = (function lt$objs$plugins$url_input(){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),"text",new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),"Github URL"], null)], null));
var seq__20666_20676 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"focus","focus",234677911),((function (e__7942__auto__){
return (function (){
return lt.objs.context.in_BANG_.call(null,new cljs.core.Keyword(null,"popup.input","popup.input",-1726140162));
});})(e__7942__auto__))
,new cljs.core.Keyword(null,"blur","blur",-453500461),((function (e__7942__auto__){
return (function (){
return lt.objs.context.out_BANG_.call(null,new cljs.core.Keyword(null,"popup.input","popup.input",-1726140162));
});})(e__7942__auto__))
], null)));
var chunk__20667_20677 = null;
var count__20668_20678 = (0);
var i__20669_20679 = (0);
while(true){
if((i__20669_20679 < count__20668_20678)){
var vec__20670_20680 = cljs.core._nth.call(null,chunk__20667_20677,i__20669_20679);
var ev__7943__auto___20681 = cljs.core.nth.call(null,vec__20670_20680,(0),null);
var func__7944__auto___20682 = cljs.core.nth.call(null,vec__20670_20680,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___20681,func__7944__auto___20682);

var G__20683 = seq__20666_20676;
var G__20684 = chunk__20667_20677;
var G__20685 = count__20668_20678;
var G__20686 = (i__20669_20679 + (1));
seq__20666_20676 = G__20683;
chunk__20667_20677 = G__20684;
count__20668_20678 = G__20685;
i__20669_20679 = G__20686;
continue;
} else {
var temp__4657__auto___20687 = cljs.core.seq.call(null,seq__20666_20676);
if(temp__4657__auto___20687){
var seq__20666_20688__$1 = temp__4657__auto___20687;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__20666_20688__$1)){
var c__7604__auto___20689 = cljs.core.chunk_first.call(null,seq__20666_20688__$1);
var G__20690 = cljs.core.chunk_rest.call(null,seq__20666_20688__$1);
var G__20691 = c__7604__auto___20689;
var G__20692 = cljs.core.count.call(null,c__7604__auto___20689);
var G__20693 = (0);
seq__20666_20676 = G__20690;
chunk__20667_20677 = G__20691;
count__20668_20678 = G__20692;
i__20669_20679 = G__20693;
continue;
} else {
var vec__20673_20694 = cljs.core.first.call(null,seq__20666_20688__$1);
var ev__7943__auto___20695 = cljs.core.nth.call(null,vec__20673_20694,(0),null);
var func__7944__auto___20696 = cljs.core.nth.call(null,vec__20673_20694,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___20695,func__7944__auto___20696);

var G__20697 = cljs.core.next.call(null,seq__20666_20688__$1);
var G__20698 = null;
var G__20699 = (0);
var G__20700 = (0);
seq__20666_20676 = G__20697;
chunk__20667_20677 = G__20698;
count__20668_20678 = G__20699;
i__20669_20679 = G__20700;
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
lt.objs.plugins.tab = (function lt$objs$plugins$tab(this$,tab_name,label){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),crate.binding.bound.call(null,this$,(function (p1__20701_SHARP_){
if(cljs.core._EQ_.call(null,tab_name,new cljs.core.Keyword(null,"tab","tab",-559583621).cljs$core$IFn$_invoke$arity$1(p1__20701_SHARP_))){
return "active";
} else {
return null;
}
}))], null),label], null));
var seq__20712_20722 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (){
return lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tab","tab",-559583621),tab_name], null));
});})(e__7942__auto__))
], null)));
var chunk__20713_20723 = null;
var count__20714_20724 = (0);
var i__20715_20725 = (0);
while(true){
if((i__20715_20725 < count__20714_20724)){
var vec__20716_20726 = cljs.core._nth.call(null,chunk__20713_20723,i__20715_20725);
var ev__7943__auto___20727 = cljs.core.nth.call(null,vec__20716_20726,(0),null);
var func__7944__auto___20728 = cljs.core.nth.call(null,vec__20716_20726,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___20727,func__7944__auto___20728);

var G__20729 = seq__20712_20722;
var G__20730 = chunk__20713_20723;
var G__20731 = count__20714_20724;
var G__20732 = (i__20715_20725 + (1));
seq__20712_20722 = G__20729;
chunk__20713_20723 = G__20730;
count__20714_20724 = G__20731;
i__20715_20725 = G__20732;
continue;
} else {
var temp__4657__auto___20733 = cljs.core.seq.call(null,seq__20712_20722);
if(temp__4657__auto___20733){
var seq__20712_20734__$1 = temp__4657__auto___20733;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__20712_20734__$1)){
var c__7604__auto___20735 = cljs.core.chunk_first.call(null,seq__20712_20734__$1);
var G__20736 = cljs.core.chunk_rest.call(null,seq__20712_20734__$1);
var G__20737 = c__7604__auto___20735;
var G__20738 = cljs.core.count.call(null,c__7604__auto___20735);
var G__20739 = (0);
seq__20712_20722 = G__20736;
chunk__20713_20723 = G__20737;
count__20714_20724 = G__20738;
i__20715_20725 = G__20739;
continue;
} else {
var vec__20719_20740 = cljs.core.first.call(null,seq__20712_20734__$1);
var ev__7943__auto___20741 = cljs.core.nth.call(null,vec__20719_20740,(0),null);
var func__7944__auto___20742 = cljs.core.nth.call(null,vec__20719_20740,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___20741,func__7944__auto___20742);

var G__20743 = cljs.core.next.call(null,seq__20712_20734__$1);
var G__20744 = null;
var G__20745 = (0);
var G__20746 = (0);
seq__20712_20722 = G__20743;
chunk__20713_20723 = G__20744;
count__20714_20724 = G__20745;
i__20715_20725 = G__20746;
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
lt.objs.plugins.search_input = (function lt$objs$plugins$search_input(this$){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),"Search available plugins"], null)], null));
var seq__20757_20767 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"focus","focus",234677911),((function (e__7942__auto__){
return (function (){
return lt.objs.context.in_BANG_.call(null,new cljs.core.Keyword(null,"plugin-manager.search","plugin-manager.search",-770563448),this$);
});})(e__7942__auto__))
,new cljs.core.Keyword(null,"blur","blur",-453500461),((function (e__7942__auto__){
return (function (){
return lt.objs.context.out_BANG_.call(null,new cljs.core.Keyword(null,"plugin-manager.search","plugin-manager.search",-770563448));
});})(e__7942__auto__))
], null)));
var chunk__20758_20768 = null;
var count__20759_20769 = (0);
var i__20760_20770 = (0);
while(true){
if((i__20760_20770 < count__20759_20769)){
var vec__20761_20771 = cljs.core._nth.call(null,chunk__20758_20768,i__20760_20770);
var ev__7943__auto___20772 = cljs.core.nth.call(null,vec__20761_20771,(0),null);
var func__7944__auto___20773 = cljs.core.nth.call(null,vec__20761_20771,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___20772,func__7944__auto___20773);

var G__20774 = seq__20757_20767;
var G__20775 = chunk__20758_20768;
var G__20776 = count__20759_20769;
var G__20777 = (i__20760_20770 + (1));
seq__20757_20767 = G__20774;
chunk__20758_20768 = G__20775;
count__20759_20769 = G__20776;
i__20760_20770 = G__20777;
continue;
} else {
var temp__4657__auto___20778 = cljs.core.seq.call(null,seq__20757_20767);
if(temp__4657__auto___20778){
var seq__20757_20779__$1 = temp__4657__auto___20778;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__20757_20779__$1)){
var c__7604__auto___20780 = cljs.core.chunk_first.call(null,seq__20757_20779__$1);
var G__20781 = cljs.core.chunk_rest.call(null,seq__20757_20779__$1);
var G__20782 = c__7604__auto___20780;
var G__20783 = cljs.core.count.call(null,c__7604__auto___20780);
var G__20784 = (0);
seq__20757_20767 = G__20781;
chunk__20758_20768 = G__20782;
count__20759_20769 = G__20783;
i__20760_20770 = G__20784;
continue;
} else {
var vec__20764_20785 = cljs.core.first.call(null,seq__20757_20779__$1);
var ev__7943__auto___20786 = cljs.core.nth.call(null,vec__20764_20785,(0),null);
var func__7944__auto___20787 = cljs.core.nth.call(null,vec__20764_20785,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___20786,func__7944__auto___20787);

var G__20788 = cljs.core.next.call(null,seq__20757_20779__$1);
var G__20789 = null;
var G__20790 = (0);
var G__20791 = (0);
seq__20757_20767 = G__20788;
chunk__20758_20768 = G__20789;
count__20759_20769 = G__20790;
i__20760_20770 = G__20791;
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
lt.objs.plugins.tabs_and_search = (function lt$objs$plugins$tabs_and_search(this$){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.tabs","div.tabs",-1767258748),lt.objs.plugins.tab.call(null,this$,new cljs.core.Keyword(null,"installed","installed",553977691),"Installed"),lt.objs.plugins.tab.call(null,this$,new cljs.core.Keyword(null,"server","server",1499190120),"Available"),lt.objs.plugins.search_input.call(null,this$)], null));
var seq__20802_20812 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),cljs.core.PersistentVector.EMPTY));
var chunk__20803_20813 = null;
var count__20804_20814 = (0);
var i__20805_20815 = (0);
while(true){
if((i__20805_20815 < count__20804_20814)){
var vec__20806_20816 = cljs.core._nth.call(null,chunk__20803_20813,i__20805_20815);
var ev__7943__auto___20817 = cljs.core.nth.call(null,vec__20806_20816,(0),null);
var func__7944__auto___20818 = cljs.core.nth.call(null,vec__20806_20816,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___20817,func__7944__auto___20818);

var G__20819 = seq__20802_20812;
var G__20820 = chunk__20803_20813;
var G__20821 = count__20804_20814;
var G__20822 = (i__20805_20815 + (1));
seq__20802_20812 = G__20819;
chunk__20803_20813 = G__20820;
count__20804_20814 = G__20821;
i__20805_20815 = G__20822;
continue;
} else {
var temp__4657__auto___20823 = cljs.core.seq.call(null,seq__20802_20812);
if(temp__4657__auto___20823){
var seq__20802_20824__$1 = temp__4657__auto___20823;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__20802_20824__$1)){
var c__7604__auto___20825 = cljs.core.chunk_first.call(null,seq__20802_20824__$1);
var G__20826 = cljs.core.chunk_rest.call(null,seq__20802_20824__$1);
var G__20827 = c__7604__auto___20825;
var G__20828 = cljs.core.count.call(null,c__7604__auto___20825);
var G__20829 = (0);
seq__20802_20812 = G__20826;
chunk__20803_20813 = G__20827;
count__20804_20814 = G__20828;
i__20805_20815 = G__20829;
continue;
} else {
var vec__20809_20830 = cljs.core.first.call(null,seq__20802_20824__$1);
var ev__7943__auto___20831 = cljs.core.nth.call(null,vec__20809_20830,(0),null);
var func__7944__auto___20832 = cljs.core.nth.call(null,vec__20809_20830,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___20831,func__7944__auto___20832);

var G__20833 = cljs.core.next.call(null,seq__20802_20824__$1);
var G__20834 = null;
var G__20835 = (0);
var G__20836 = (0);
seq__20802_20812 = G__20833;
chunk__20803_20813 = G__20834;
count__20804_20814 = G__20835;
i__20805_20815 = G__20836;
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
lt.objs.plugins.source_button = (function lt$objs$plugins$source_button(plugin){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.source","span.source",910479131),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",-2123407586),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$2(plugin,new cljs.core.Keyword(null,"source","source",-433931539).cljs$core$IFn$_invoke$arity$1(plugin))], null),"website"], null)], null));
var seq__20847_20857 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (e){
lt.util.dom.prevent.call(null,e);

lt.util.dom.stop_propagation.call(null,e);

return lt.objs.platform.open_url.call(null,new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$2(plugin,new cljs.core.Keyword(null,"source","source",-433931539).cljs$core$IFn$_invoke$arity$1(plugin)));
});})(e__7942__auto__))
], null)));
var chunk__20848_20858 = null;
var count__20849_20859 = (0);
var i__20850_20860 = (0);
while(true){
if((i__20850_20860 < count__20849_20859)){
var vec__20851_20861 = cljs.core._nth.call(null,chunk__20848_20858,i__20850_20860);
var ev__7943__auto___20862 = cljs.core.nth.call(null,vec__20851_20861,(0),null);
var func__7944__auto___20863 = cljs.core.nth.call(null,vec__20851_20861,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___20862,func__7944__auto___20863);

var G__20864 = seq__20847_20857;
var G__20865 = chunk__20848_20858;
var G__20866 = count__20849_20859;
var G__20867 = (i__20850_20860 + (1));
seq__20847_20857 = G__20864;
chunk__20848_20858 = G__20865;
count__20849_20859 = G__20866;
i__20850_20860 = G__20867;
continue;
} else {
var temp__4657__auto___20868 = cljs.core.seq.call(null,seq__20847_20857);
if(temp__4657__auto___20868){
var seq__20847_20869__$1 = temp__4657__auto___20868;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__20847_20869__$1)){
var c__7604__auto___20870 = cljs.core.chunk_first.call(null,seq__20847_20869__$1);
var G__20871 = cljs.core.chunk_rest.call(null,seq__20847_20869__$1);
var G__20872 = c__7604__auto___20870;
var G__20873 = cljs.core.count.call(null,c__7604__auto___20870);
var G__20874 = (0);
seq__20847_20857 = G__20871;
chunk__20848_20858 = G__20872;
count__20849_20859 = G__20873;
i__20850_20860 = G__20874;
continue;
} else {
var vec__20854_20875 = cljs.core.first.call(null,seq__20847_20869__$1);
var ev__7943__auto___20876 = cljs.core.nth.call(null,vec__20854_20875,(0),null);
var func__7944__auto___20877 = cljs.core.nth.call(null,vec__20854_20875,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___20876,func__7944__auto___20877);

var G__20878 = cljs.core.next.call(null,seq__20847_20869__$1);
var G__20879 = null;
var G__20880 = (0);
var G__20881 = (0);
seq__20847_20857 = G__20878;
chunk__20848_20858 = G__20879;
count__20849_20859 = G__20880;
i__20850_20860 = G__20881;
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
lt.objs.plugins.update_button = (function lt$objs$plugins$update_button(plugin){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.update","span.update",-1010830276)], null));
var seq__20892_20902 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (e){
lt.util.dom.prevent.call(null,e);

lt.util.dom.stop_propagation.call(null,e);

return lt.objs.plugins.discover_deps.call(null,plugin,((function (e__7942__auto__){
return (function (){
lt.object.raise.call(null,lt.objs.plugins.manager,new cljs.core.Keyword(null,"refresh!","refresh!",156149341));

lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"behaviors.reload","behaviors.reload",2130924967));

return lt.util.js.wait.call(null,(1000),((function (e__7942__auto__){
return (function (){
return lt.objs.notifos.set_msg_BANG_.call(null,[cljs.core.str("Updated "),cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(plugin)),cljs.core.str(" "),cljs.core.str(new cljs.core.Keyword(null,"version","version",425292698).cljs$core$IFn$_invoke$arity$1(plugin))].join(''));
});})(e__7942__auto__))
);
});})(e__7942__auto__))
);
});})(e__7942__auto__))
], null)));
var chunk__20893_20903 = null;
var count__20894_20904 = (0);
var i__20895_20905 = (0);
while(true){
if((i__20895_20905 < count__20894_20904)){
var vec__20896_20906 = cljs.core._nth.call(null,chunk__20893_20903,i__20895_20905);
var ev__7943__auto___20907 = cljs.core.nth.call(null,vec__20896_20906,(0),null);
var func__7944__auto___20908 = cljs.core.nth.call(null,vec__20896_20906,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___20907,func__7944__auto___20908);

var G__20909 = seq__20892_20902;
var G__20910 = chunk__20893_20903;
var G__20911 = count__20894_20904;
var G__20912 = (i__20895_20905 + (1));
seq__20892_20902 = G__20909;
chunk__20893_20903 = G__20910;
count__20894_20904 = G__20911;
i__20895_20905 = G__20912;
continue;
} else {
var temp__4657__auto___20913 = cljs.core.seq.call(null,seq__20892_20902);
if(temp__4657__auto___20913){
var seq__20892_20914__$1 = temp__4657__auto___20913;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__20892_20914__$1)){
var c__7604__auto___20915 = cljs.core.chunk_first.call(null,seq__20892_20914__$1);
var G__20916 = cljs.core.chunk_rest.call(null,seq__20892_20914__$1);
var G__20917 = c__7604__auto___20915;
var G__20918 = cljs.core.count.call(null,c__7604__auto___20915);
var G__20919 = (0);
seq__20892_20902 = G__20916;
chunk__20893_20903 = G__20917;
count__20894_20904 = G__20918;
i__20895_20905 = G__20919;
continue;
} else {
var vec__20899_20920 = cljs.core.first.call(null,seq__20892_20914__$1);
var ev__7943__auto___20921 = cljs.core.nth.call(null,vec__20899_20920,(0),null);
var func__7944__auto___20922 = cljs.core.nth.call(null,vec__20899_20920,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___20921,func__7944__auto___20922);

var G__20923 = cljs.core.next.call(null,seq__20892_20914__$1);
var G__20924 = null;
var G__20925 = (0);
var G__20926 = (0);
seq__20892_20902 = G__20923;
chunk__20893_20903 = G__20924;
count__20894_20904 = G__20925;
i__20895_20905 = G__20926;
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
lt.objs.plugins.install_button = (function lt$objs$plugins$install_button(plugin){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.install","span.install",-1588354777)], null));
var seq__20937_20947 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (e){
var me_20951 = this;
lt.objs.plugins.discover_deps.call(null,plugin,((function (me_20951,e__7942__auto__){
return (function (){
lt.util.dom.remove.call(null,lt.util.dom.parent.call(null,me_20951));

lt.object.raise.call(null,lt.objs.plugins.manager,new cljs.core.Keyword(null,"refresh!","refresh!",156149341));

lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"behaviors.reload","behaviors.reload",2130924967));

return lt.util.js.wait.call(null,(1000),((function (me_20951,e__7942__auto__){
return (function (){
return lt.objs.notifos.set_msg_BANG_.call(null,[cljs.core.str("Installed "),cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(plugin)),cljs.core.str(" "),cljs.core.str(new cljs.core.Keyword(null,"version","version",425292698).cljs$core$IFn$_invoke$arity$1(plugin))].join(''));
});})(me_20951,e__7942__auto__))
);
});})(me_20951,e__7942__auto__))
);

lt.util.dom.prevent.call(null,e);

return lt.util.dom.stop_propagation.call(null,e);
});})(e__7942__auto__))
], null)));
var chunk__20938_20948 = null;
var count__20939_20949 = (0);
var i__20940_20950 = (0);
while(true){
if((i__20940_20950 < count__20939_20949)){
var vec__20941_20952 = cljs.core._nth.call(null,chunk__20938_20948,i__20940_20950);
var ev__7943__auto___20953 = cljs.core.nth.call(null,vec__20941_20952,(0),null);
var func__7944__auto___20954 = cljs.core.nth.call(null,vec__20941_20952,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___20953,func__7944__auto___20954);

var G__20955 = seq__20937_20947;
var G__20956 = chunk__20938_20948;
var G__20957 = count__20939_20949;
var G__20958 = (i__20940_20950 + (1));
seq__20937_20947 = G__20955;
chunk__20938_20948 = G__20956;
count__20939_20949 = G__20957;
i__20940_20950 = G__20958;
continue;
} else {
var temp__4657__auto___20959 = cljs.core.seq.call(null,seq__20937_20947);
if(temp__4657__auto___20959){
var seq__20937_20960__$1 = temp__4657__auto___20959;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__20937_20960__$1)){
var c__7604__auto___20961 = cljs.core.chunk_first.call(null,seq__20937_20960__$1);
var G__20962 = cljs.core.chunk_rest.call(null,seq__20937_20960__$1);
var G__20963 = c__7604__auto___20961;
var G__20964 = cljs.core.count.call(null,c__7604__auto___20961);
var G__20965 = (0);
seq__20937_20947 = G__20962;
chunk__20938_20948 = G__20963;
count__20939_20949 = G__20964;
i__20940_20950 = G__20965;
continue;
} else {
var vec__20944_20966 = cljs.core.first.call(null,seq__20937_20960__$1);
var ev__7943__auto___20967 = cljs.core.nth.call(null,vec__20944_20966,(0),null);
var func__7944__auto___20968 = cljs.core.nth.call(null,vec__20944_20966,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___20967,func__7944__auto___20968);

var G__20969 = cljs.core.next.call(null,seq__20937_20960__$1);
var G__20970 = null;
var G__20971 = (0);
var G__20972 = (0);
seq__20937_20947 = G__20969;
chunk__20938_20948 = G__20970;
count__20939_20949 = G__20971;
i__20940_20950 = G__20972;
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
lt.objs.plugins.plugin_link_title = (function lt$objs$plugins$plugin_link_title(plugin){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.link","span.link",1320447716),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(plugin)], null));
var seq__20983_20993 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (e){
lt.util.dom.prevent.call(null,e);

lt.util.dom.stop_propagation.call(null,e);

return lt.objs.platform.open_url.call(null,new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$2(plugin,new cljs.core.Keyword(null,"source","source",-433931539).cljs$core$IFn$_invoke$arity$1(plugin)));
});})(e__7942__auto__))
], null)));
var chunk__20984_20994 = null;
var count__20985_20995 = (0);
var i__20986_20996 = (0);
while(true){
if((i__20986_20996 < count__20985_20995)){
var vec__20987_20997 = cljs.core._nth.call(null,chunk__20984_20994,i__20986_20996);
var ev__7943__auto___20998 = cljs.core.nth.call(null,vec__20987_20997,(0),null);
var func__7944__auto___20999 = cljs.core.nth.call(null,vec__20987_20997,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___20998,func__7944__auto___20999);

var G__21000 = seq__20983_20993;
var G__21001 = chunk__20984_20994;
var G__21002 = count__20985_20995;
var G__21003 = (i__20986_20996 + (1));
seq__20983_20993 = G__21000;
chunk__20984_20994 = G__21001;
count__20985_20995 = G__21002;
i__20986_20996 = G__21003;
continue;
} else {
var temp__4657__auto___21004 = cljs.core.seq.call(null,seq__20983_20993);
if(temp__4657__auto___21004){
var seq__20983_21005__$1 = temp__4657__auto___21004;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__20983_21005__$1)){
var c__7604__auto___21006 = cljs.core.chunk_first.call(null,seq__20983_21005__$1);
var G__21007 = cljs.core.chunk_rest.call(null,seq__20983_21005__$1);
var G__21008 = c__7604__auto___21006;
var G__21009 = cljs.core.count.call(null,c__7604__auto___21006);
var G__21010 = (0);
seq__20983_20993 = G__21007;
chunk__20984_20994 = G__21008;
count__20985_20995 = G__21009;
i__20986_20996 = G__21010;
continue;
} else {
var vec__20990_21011 = cljs.core.first.call(null,seq__20983_21005__$1);
var ev__7943__auto___21012 = cljs.core.nth.call(null,vec__20990_21011,(0),null);
var func__7944__auto___21013 = cljs.core.nth.call(null,vec__20990_21011,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21012,func__7944__auto___21013);

var G__21014 = cljs.core.next.call(null,seq__20983_21005__$1);
var G__21015 = null;
var G__21016 = (0);
var G__21017 = (0);
seq__20983_20993 = G__21014;
chunk__20984_20994 = G__21015;
count__20985_20995 = G__21016;
i__20986_20996 = G__21017;
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
lt.objs.plugins.plugin_title = (function lt$objs$plugins$plugin_title(plugin){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h1","h1",-1896887462),lt.objs.plugins.plugin_link_title.call(null,plugin),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.version","span.version",937544592),new cljs.core.Keyword(null,"version","version",425292698).cljs$core$IFn$_invoke$arity$1(plugin)], null)], null));
var seq__21028_21038 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),cljs.core.PersistentVector.EMPTY));
var chunk__21029_21039 = null;
var count__21030_21040 = (0);
var i__21031_21041 = (0);
while(true){
if((i__21031_21041 < count__21030_21040)){
var vec__21032_21042 = cljs.core._nth.call(null,chunk__21029_21039,i__21031_21041);
var ev__7943__auto___21043 = cljs.core.nth.call(null,vec__21032_21042,(0),null);
var func__7944__auto___21044 = cljs.core.nth.call(null,vec__21032_21042,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21043,func__7944__auto___21044);

var G__21045 = seq__21028_21038;
var G__21046 = chunk__21029_21039;
var G__21047 = count__21030_21040;
var G__21048 = (i__21031_21041 + (1));
seq__21028_21038 = G__21045;
chunk__21029_21039 = G__21046;
count__21030_21040 = G__21047;
i__21031_21041 = G__21048;
continue;
} else {
var temp__4657__auto___21049 = cljs.core.seq.call(null,seq__21028_21038);
if(temp__4657__auto___21049){
var seq__21028_21050__$1 = temp__4657__auto___21049;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__21028_21050__$1)){
var c__7604__auto___21051 = cljs.core.chunk_first.call(null,seq__21028_21050__$1);
var G__21052 = cljs.core.chunk_rest.call(null,seq__21028_21050__$1);
var G__21053 = c__7604__auto___21051;
var G__21054 = cljs.core.count.call(null,c__7604__auto___21051);
var G__21055 = (0);
seq__21028_21038 = G__21052;
chunk__21029_21039 = G__21053;
count__21030_21040 = G__21054;
i__21031_21041 = G__21055;
continue;
} else {
var vec__21035_21056 = cljs.core.first.call(null,seq__21028_21050__$1);
var ev__7943__auto___21057 = cljs.core.nth.call(null,vec__21035_21056,(0),null);
var func__7944__auto___21058 = cljs.core.nth.call(null,vec__21035_21056,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21057,func__7944__auto___21058);

var G__21059 = cljs.core.next.call(null,seq__21028_21050__$1);
var G__21060 = null;
var G__21061 = (0);
var G__21062 = (0);
seq__21028_21038 = G__21059;
chunk__21029_21039 = G__21060;
count__21030_21040 = G__21061;
i__21031_21041 = G__21062;
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
lt.objs.plugins.server_plugin_ui = (function lt$objs$plugins$server_plugin_ui(plugin){
var e__7942__auto__ = crate.core.html.call(null,(function (){var info = plugin;
var ver = new cljs.core.Keyword(null,"version","version",425292698).cljs$core$IFn$_invoke$arity$1(info);
var installed = cljs.core.get.call(null,new cljs.core.Keyword("lt.objs.plugins","plugins","lt.objs.plugins/plugins",-1345299551).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.app.app)),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(info));
var update_QMARK_ = (function (){var and__6781__auto__ = new cljs.core.Keyword(null,"version","version",425292698).cljs$core$IFn$_invoke$arity$1(installed);
if(cljs.core.truth_(and__6781__auto__)){
return lt.objs.deploy.is_newer_QMARK_.call(null,new cljs.core.Keyword(null,"version","version",425292698).cljs$core$IFn$_invoke$arity$1(installed),ver);
} else {
return and__6781__auto__;
}
})();
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),(cljs.core.truth_(update_QMARK_)?"has-update":null)], null),((cljs.core.not.call(null,installed))?lt.objs.plugins.install_button.call(null,plugin):(cljs.core.truth_(update_QMARK_)?lt.objs.plugins.update_button.call(null,plugin):new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.installed","span.installed",1342874909)], null))),lt.objs.plugins.source_button.call(null,plugin),lt.objs.plugins.plugin_title.call(null,plugin),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),new cljs.core.Keyword(null,"author","author",2111686192).cljs$core$IFn$_invoke$arity$1(info)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"desc","desc",2093485764).cljs$core$IFn$_invoke$arity$1(info)], null)], null);
})());
var seq__21073_21083 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),cljs.core.PersistentVector.EMPTY));
var chunk__21074_21084 = null;
var count__21075_21085 = (0);
var i__21076_21086 = (0);
while(true){
if((i__21076_21086 < count__21075_21085)){
var vec__21077_21087 = cljs.core._nth.call(null,chunk__21074_21084,i__21076_21086);
var ev__7943__auto___21088 = cljs.core.nth.call(null,vec__21077_21087,(0),null);
var func__7944__auto___21089 = cljs.core.nth.call(null,vec__21077_21087,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21088,func__7944__auto___21089);

var G__21090 = seq__21073_21083;
var G__21091 = chunk__21074_21084;
var G__21092 = count__21075_21085;
var G__21093 = (i__21076_21086 + (1));
seq__21073_21083 = G__21090;
chunk__21074_21084 = G__21091;
count__21075_21085 = G__21092;
i__21076_21086 = G__21093;
continue;
} else {
var temp__4657__auto___21094 = cljs.core.seq.call(null,seq__21073_21083);
if(temp__4657__auto___21094){
var seq__21073_21095__$1 = temp__4657__auto___21094;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__21073_21095__$1)){
var c__7604__auto___21096 = cljs.core.chunk_first.call(null,seq__21073_21095__$1);
var G__21097 = cljs.core.chunk_rest.call(null,seq__21073_21095__$1);
var G__21098 = c__7604__auto___21096;
var G__21099 = cljs.core.count.call(null,c__7604__auto___21096);
var G__21100 = (0);
seq__21073_21083 = G__21097;
chunk__21074_21084 = G__21098;
count__21075_21085 = G__21099;
i__21076_21086 = G__21100;
continue;
} else {
var vec__21080_21101 = cljs.core.first.call(null,seq__21073_21095__$1);
var ev__7943__auto___21102 = cljs.core.nth.call(null,vec__21080_21101,(0),null);
var func__7944__auto___21103 = cljs.core.nth.call(null,vec__21080_21101,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21102,func__7944__auto___21103);

var G__21104 = cljs.core.next.call(null,seq__21073_21095__$1);
var G__21105 = null;
var G__21106 = (0);
var G__21107 = (0);
seq__21073_21083 = G__21104;
chunk__21074_21084 = G__21105;
count__21075_21085 = G__21106;
i__21076_21086 = G__21107;
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
lt.objs.plugins.uninstall_button = (function lt$objs$plugins$uninstall_button(plugin){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.uninstall","span.uninstall",1805638532)], null));
var seq__21118_21128 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (){
return lt.objs.popup.popup_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"header","header",119441134),"Uninstall plugin?",new cljs.core.Keyword(null,"body","body",-2049205669),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),"This will delete the plugin from your system, removing any local\n                                 changes you may have made, and cannot be undone."], null),new cljs.core.Keyword(null,"buttons","buttons",-1953831197),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"Delete plugin",new cljs.core.Keyword(null,"action","action",-811238024),((function (e__7942__auto__){
return (function (){
return lt.objs.plugins.uninstall.call(null,plugin);
});})(e__7942__auto__))
], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1718410804),"Cancel"], null)], null)], null));
});})(e__7942__auto__))
], null)));
var chunk__21119_21129 = null;
var count__21120_21130 = (0);
var i__21121_21131 = (0);
while(true){
if((i__21121_21131 < count__21120_21130)){
var vec__21122_21132 = cljs.core._nth.call(null,chunk__21119_21129,i__21121_21131);
var ev__7943__auto___21133 = cljs.core.nth.call(null,vec__21122_21132,(0),null);
var func__7944__auto___21134 = cljs.core.nth.call(null,vec__21122_21132,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21133,func__7944__auto___21134);

var G__21135 = seq__21118_21128;
var G__21136 = chunk__21119_21129;
var G__21137 = count__21120_21130;
var G__21138 = (i__21121_21131 + (1));
seq__21118_21128 = G__21135;
chunk__21119_21129 = G__21136;
count__21120_21130 = G__21137;
i__21121_21131 = G__21138;
continue;
} else {
var temp__4657__auto___21139 = cljs.core.seq.call(null,seq__21118_21128);
if(temp__4657__auto___21139){
var seq__21118_21140__$1 = temp__4657__auto___21139;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__21118_21140__$1)){
var c__7604__auto___21141 = cljs.core.chunk_first.call(null,seq__21118_21140__$1);
var G__21142 = cljs.core.chunk_rest.call(null,seq__21118_21140__$1);
var G__21143 = c__7604__auto___21141;
var G__21144 = cljs.core.count.call(null,c__7604__auto___21141);
var G__21145 = (0);
seq__21118_21128 = G__21142;
chunk__21119_21129 = G__21143;
count__21120_21130 = G__21144;
i__21121_21131 = G__21145;
continue;
} else {
var vec__21125_21146 = cljs.core.first.call(null,seq__21118_21140__$1);
var ev__7943__auto___21147 = cljs.core.nth.call(null,vec__21125_21146,(0),null);
var func__7944__auto___21148 = cljs.core.nth.call(null,vec__21125_21146,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21147,func__7944__auto___21148);

var G__21149 = cljs.core.next.call(null,seq__21118_21140__$1);
var G__21150 = null;
var G__21151 = (0);
var G__21152 = (0);
seq__21118_21128 = G__21149;
chunk__21119_21129 = G__21150;
count__21120_21130 = G__21151;
i__21121_21131 = G__21152;
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
lt.objs.plugins.installed_plugin_ui = (function lt$objs$plugins$installed_plugin_ui(plugin){
var e__7942__auto__ = crate.core.html.call(null,(function (){var cached = new cljs.core.Keyword(null,"latest-version","latest-version",-1985110248).cljs$core$IFn$_invoke$arity$1(cljs.core.get.call(null,new cljs.core.Keyword(null,"server-plugins","server-plugins",-514262131).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.plugins.manager)),cljs.core.keyword.call(null,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(plugin))));
var update_QMARK_ = (cljs.core.truth_(cached)?lt.objs.deploy.is_newer_QMARK_.call(null,new cljs.core.Keyword(null,"version","version",425292698).cljs$core$IFn$_invoke$arity$1(plugin),cached):null);
return new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),(cljs.core.truth_(update_QMARK_)?"has-update":null)], null),(cljs.core.truth_(update_QMARK_)?lt.objs.plugins.update_button.call(null,cljs.core.assoc.call(null,plugin,new cljs.core.Keyword(null,"version","version",425292698),cached)):null),lt.objs.plugins.uninstall_button.call(null,plugin),lt.objs.plugins.source_button.call(null,plugin),lt.objs.plugins.plugin_title.call(null,plugin),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),new cljs.core.Keyword(null,"author","author",2111686192).cljs$core$IFn$_invoke$arity$1(plugin)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"desc","desc",2093485764).cljs$core$IFn$_invoke$arity$1(plugin)], null)], null);
})());
var seq__21163_21173 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),cljs.core.PersistentVector.EMPTY));
var chunk__21164_21174 = null;
var count__21165_21175 = (0);
var i__21166_21176 = (0);
while(true){
if((i__21166_21176 < count__21165_21175)){
var vec__21167_21177 = cljs.core._nth.call(null,chunk__21164_21174,i__21166_21176);
var ev__7943__auto___21178 = cljs.core.nth.call(null,vec__21167_21177,(0),null);
var func__7944__auto___21179 = cljs.core.nth.call(null,vec__21167_21177,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21178,func__7944__auto___21179);

var G__21180 = seq__21163_21173;
var G__21181 = chunk__21164_21174;
var G__21182 = count__21165_21175;
var G__21183 = (i__21166_21176 + (1));
seq__21163_21173 = G__21180;
chunk__21164_21174 = G__21181;
count__21165_21175 = G__21182;
i__21166_21176 = G__21183;
continue;
} else {
var temp__4657__auto___21184 = cljs.core.seq.call(null,seq__21163_21173);
if(temp__4657__auto___21184){
var seq__21163_21185__$1 = temp__4657__auto___21184;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__21163_21185__$1)){
var c__7604__auto___21186 = cljs.core.chunk_first.call(null,seq__21163_21185__$1);
var G__21187 = cljs.core.chunk_rest.call(null,seq__21163_21185__$1);
var G__21188 = c__7604__auto___21186;
var G__21189 = cljs.core.count.call(null,c__7604__auto___21186);
var G__21190 = (0);
seq__21163_21173 = G__21187;
chunk__21164_21174 = G__21188;
count__21165_21175 = G__21189;
i__21166_21176 = G__21190;
continue;
} else {
var vec__21170_21191 = cljs.core.first.call(null,seq__21163_21185__$1);
var ev__7943__auto___21192 = cljs.core.nth.call(null,vec__21170_21191,(0),null);
var func__7944__auto___21193 = cljs.core.nth.call(null,vec__21170_21191,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21192,func__7944__auto___21193);

var G__21194 = cljs.core.next.call(null,seq__21163_21185__$1);
var G__21195 = null;
var G__21196 = (0);
var G__21197 = (0);
seq__21163_21173 = G__21194;
chunk__21164_21174 = G__21195;
count__21165_21175 = G__21196;
i__21166_21176 = G__21197;
continue;
}
} else {
}
}
break;
}

return e__7942__auto__;
});
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.plugins","plugin-manager","lt.objs.plugins/plugin-manager",1307241720),new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"plugin-manager","plugin-manager",-1975892988),null], null), null),new cljs.core.Keyword(null,"name","name",1843675177),"Plugins",new cljs.core.Keyword(null,"tab","tab",-559583621),new cljs.core.Keyword(null,"installed","installed",553977691),new cljs.core.Keyword(null,"init","init",-1875481434),(function (this$){
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"server-plugins","server-plugins",-514262131),lt.objs.plugins.read_cache.call(null)], null));

return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),crate.binding.bound.call(null,this$,(function (p1__21198_SHARP_){
return [cljs.core.str("plugin-manager"),cljs.core.str(((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"tab","tab",-559583621).cljs$core$IFn$_invoke$arity$1(p1__21198_SHARP_),new cljs.core.Keyword(null,"server","server",1499190120)))?" server":null))].join('');
}))], null),lt.objs.plugins.tabs_and_search.call(null,this$),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul.server-plugins","ul.server-plugins",1725626404)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul.plugins","ul.plugins",-1500673029)], null)], null);
}));
lt.objs.plugins.manager = lt.object.create.call(null,new cljs.core.Keyword("lt.objs.plugins","plugin-manager","lt.objs.plugins/plugin-manager",1307241720));
/**
 * 
 */
lt.objs.plugins.__BEH__check_local_metadata_cache = (function lt$objs$plugins$__BEH__check_local_metadata_cache(this$,sha){
if(!(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"__sha","__sha",1382835112).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"server-plugins","server-plugins",-514262131).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))),sha))){
return lt.objs.plugins.download_metadata.call(null,sha);
} else {
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"metadata.updated","metadata.updated",745911191));
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.plugins","check-local-metadata-cache","lt.objs.plugins/check-local-metadata-cache",-1519445176),new cljs.core.Keyword(null,"desc","desc",2093485764),"Plugin Manager: check local metadata cache for update",new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"metadata.sha","metadata.sha",-275753543),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.plugins.__BEH__check_local_metadata_cache);
/**
 * 
 */
lt.objs.plugins.__BEH__draw_plugins_on_updated = (function lt$objs$plugins$__BEH__draw_plugins_on_updated(this$,sha){
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"server-plugins","server-plugins",-514262131),lt.objs.plugins.read_cache.call(null)], null));

return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"plugin-results","plugin-results",-2136889402),lt.objs.plugins.all_latest.call(null,new cljs.core.Keyword(null,"server-plugins","server-plugins",-514262131).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.plugins","draw-plugins-on-updated","lt.objs.plugins/draw-plugins-on-updated",-778374643),new cljs.core.Keyword(null,"desc","desc",2093485764),"Plugin Manager: draw plugins on metadata update",new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"metadata.updated","metadata.updated",745911191),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.plugins.__BEH__draw_plugins_on_updated);
/**
 * 
 */
lt.objs.plugins.__BEH__get_latest_metadata_sha = (function lt$objs$plugins$__BEH__get_latest_metadata_sha(this$,sha){
return lt.objs.plugins.latest_metadata_sha.call(null);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.plugins","get-latest-metadata-sha","lt.objs.plugins/get-latest-metadata-sha",-1241515287),new cljs.core.Keyword(null,"desc","desc",2093485764),"Plugin Manager: get the latest metadata sha",new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"fetch-plugins","fetch-plugins",37225319),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.plugins.__BEH__get_latest_metadata_sha);
/**
 * 
 */
lt.objs.plugins.__BEH__render_server_plugins = (function lt$objs$plugins$__BEH__render_server_plugins(this$,plugins){
var ul = lt.util.dom.$.call(null,new cljs.core.Keyword(null,".server-plugins",".server-plugins",254338048),lt.object.__GT_content.call(null,this$));
lt.util.dom.empty.call(null,ul);

return lt.util.dom.append.call(null,ul,lt.util.dom.fragment.call(null,cljs.core.map.call(null,lt.objs.plugins.server_plugin_ui,cljs.core.remove.call(null,((function (ul){
return (function (p1__21199_SHARP_){
return lt.objs.plugins.installed_QMARK_.call(null,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(p1__21199_SHARP_));
});})(ul))
,plugins))));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.plugins","render-server-plugins","lt.objs.plugins/render-server-plugins",672426141),new cljs.core.Keyword(null,"desc","desc",2093485764),"Plugin Manager: render plugin results",new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"plugin-results","plugin-results",-2136889402),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.plugins.__BEH__render_server_plugins);
/**
 * 
 */
lt.objs.plugins.__BEH__search_server_plugins = (function lt$objs$plugins$__BEH__search_server_plugins(this$,search){
var plugins = lt.objs.plugins.all_latest.call(null,new cljs.core.Keyword(null,"server-plugins","server-plugins",-514262131).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.plugins.manager)));
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"plugin-results","plugin-results",-2136889402),((cljs.core.empty_QMARK_.call(null,search))?plugins:lt.objs.plugins.search_plugins.call(null,plugins,search)));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.plugins","search-server-plugins","lt.objs.plugins/search-server-plugins",-28716632),new cljs.core.Keyword(null,"desc","desc",2093485764),"Plugin Manager: search plugins",new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"search-plugins!","search-plugins!",-246727177),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.plugins.__BEH__search_server_plugins);
lt.objs.plugins.save_plugins = (function lt$objs$plugins$save_plugins(plugin_maps){
var plugin_edn_file = lt.objs.files.join.call(null,lt.objs.settings.user_plugin_dir,"plugin.edn");
var plugin_edn = lt.objs.settings.safe_read.call(null,new cljs.core.Keyword(null,"content","content",15833224).cljs$core$IFn$_invoke$arity$1(lt.objs.files.open_sync.call(null,plugin_edn_file)),plugin_edn_file);
var plugin_name = (function (){var G__21203 = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(plugin_edn);
if(cljs.core.truth_(G__21203)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("User plugin doesn't have a :name"),cljs.core.str("\n"),cljs.core.str("G__21203")].join('')));
}

return G__21203;
})();
var deps = cljs.core.into.call(null,cljs.core.sorted_map.call(null),cljs.core.map.call(null,cljs.core.juxt.call(null,new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"version","version",425292698)),cljs.core.remove.call(null,((function (plugin_edn_file,plugin_edn,plugin_name){
return (function (p1__21200_SHARP_){
return cljs.core.contains_QMARK_.call(null,cljs.core.PersistentHashSet.fromArray([plugin_name], true),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(p1__21200_SHARP_));
});})(plugin_edn_file,plugin_edn,plugin_name))
,cljs.core.vals.call(null,plugin_maps))));
var plugin_edn_body = cljs.core.pr_str.call(null,cljs.core.assoc.call(null,plugin_edn,new cljs.core.Keyword(null,"dependencies","dependencies",1108064605),deps));
return lt.objs.files.save.call(null,plugin_edn_file,clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,clojure.string.replace.call(null,plugin_edn_body,/(\"\s*,|\{|\},)/,((function (plugin_edn_file,plugin_edn,plugin_name,deps,plugin_edn_body){
return (function (p1__21201_SHARP_){
return [cljs.core.str(p1__21201_SHARP_),cljs.core.str("\n")].join('');
});})(plugin_edn_file,plugin_edn,plugin_name,deps,plugin_edn_body))
),/^\{\n/,"{"),/:dependencies/,";; Do not edit - :dependencies are auto-generated\n:dependencies"));
});
/**
 * 
 */
lt.objs.plugins.__BEH__save_user_plugin_dependencies = (function lt$objs$plugins$__BEH__save_user_plugin_dependencies(var_args){
var args__7875__auto__ = [];
var len__7868__auto___21206 = arguments.length;
var i__7869__auto___21207 = (0);
while(true){
if((i__7869__auto___21207 < len__7868__auto___21206)){
args__7875__auto__.push((arguments[i__7869__auto___21207]));

var G__21208 = (i__7869__auto___21207 + (1));
i__7869__auto___21207 = G__21208;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((1) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((1)),(0),null)):null);
return lt.objs.plugins.__BEH__save_user_plugin_dependencies.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7876__auto__);
});

lt.objs.plugins.__BEH__save_user_plugin_dependencies.cljs$core$IFn$_invoke$arity$variadic = (function (this$,opts){
return lt.objs.plugins.save_plugins.call(null,lt.objs.plugins.available_plugins.call(null));
});

lt.objs.plugins.__BEH__save_user_plugin_dependencies.cljs$lang$maxFixedArity = (1);

lt.objs.plugins.__BEH__save_user_plugin_dependencies.cljs$lang$applyTo = (function (seq21204){
var G__21205 = cljs.core.first.call(null,seq21204);
var seq21204__$1 = cljs.core.next.call(null,seq21204);
return lt.objs.plugins.__BEH__save_user_plugin_dependencies.cljs$core$IFn$_invoke$arity$variadic(G__21205,seq21204__$1);
});


lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.plugins","save-user-plugin-dependencies","lt.objs.plugins/save-user-plugin-dependencies",1116558032),new cljs.core.Keyword(null,"desc","desc",2093485764),"Saves dependencies to user's plugin.edn",new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"refresh!","refresh!",156149341),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.plugins.__BEH__save_user_plugin_dependencies);
/**
 * 
 */
lt.objs.plugins.__BEH__render_installed_plugins = (function lt$objs$plugins$__BEH__render_installed_plugins(var_args){
var args__7875__auto__ = [];
var len__7868__auto___21215 = arguments.length;
var i__7869__auto___21216 = (0);
while(true){
if((i__7869__auto___21216 < len__7868__auto___21215)){
args__7875__auto__.push((arguments[i__7869__auto___21216]));

var G__21217 = (i__7869__auto___21216 + (1));
i__7869__auto___21216 = G__21217;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((1) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((1)),(0),null)):null);
return lt.objs.plugins.__BEH__render_installed_plugins.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7876__auto__);
});

lt.objs.plugins.__BEH__render_installed_plugins.cljs$core$IFn$_invoke$arity$variadic = (function (this$,p__21212){
var map__21213 = p__21212;
var map__21213__$1 = ((((!((map__21213 == null)))?((((map__21213.cljs$lang$protocol_mask$partition0$ & (64))) || (map__21213.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__21213):map__21213);
var ignore_missing = cljs.core.get.call(null,map__21213__$1,new cljs.core.Keyword(null,"ignore-missing","ignore-missing",836103362));
lt.object.merge_BANG_.call(null,lt.objs.app.app,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("lt.objs.plugins","plugins","lt.objs.plugins/plugins",-1345299551),lt.objs.plugins.available_plugins.call(null)], null));

if(cljs.core.truth_(ignore_missing)){
} else {
lt.objs.plugins.check_missing.call(null,new cljs.core.Keyword("lt.objs.plugins","plugins","lt.objs.plugins/plugins",-1345299551).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.app.app)));
}

var ul = lt.util.dom.$.call(null,new cljs.core.Keyword(null,".plugins",".plugins",425396696),lt.object.__GT_content.call(null,this$));
lt.util.dom.empty.call(null,ul);

return lt.util.dom.append.call(null,ul,lt.util.dom.fragment.call(null,cljs.core.map.call(null,lt.objs.plugins.installed_plugin_ui,cljs.core.sort_by.call(null,((function (ul,map__21213,map__21213__$1,ignore_missing){
return (function (p1__21209_SHARP_){
return new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(p1__21209_SHARP_).toUpperCase();
});})(ul,map__21213,map__21213__$1,ignore_missing))
,cljs.core.vals.call(null,new cljs.core.Keyword("lt.objs.plugins","plugins","lt.objs.plugins/plugins",-1345299551).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.app.app)))))));
});

lt.objs.plugins.__BEH__render_installed_plugins.cljs$lang$maxFixedArity = (1);

lt.objs.plugins.__BEH__render_installed_plugins.cljs$lang$applyTo = (function (seq21210){
var G__21211 = cljs.core.first.call(null,seq21210);
var seq21210__$1 = cljs.core.next.call(null,seq21210);
return lt.objs.plugins.__BEH__render_installed_plugins.cljs$core$IFn$_invoke$arity$variadic(G__21211,seq21210__$1);
});


lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.plugins","render-installed-plugins","lt.objs.plugins/render-installed-plugins",1742015148),new cljs.core.Keyword(null,"desc","desc",2093485764),"Plugin Manager: refresh installed plugins",new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"refresh!","refresh!",156149341),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.plugins.__BEH__render_installed_plugins);
/**
 * 
 */
lt.objs.plugins.__BEH__on_close = (function lt$objs$plugins$__BEH__on_close(this$){
return lt.objs.tabs.rem_BANG_.call(null,this$);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.plugins","on-close","lt.objs.plugins/on-close",-1793651150),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"close","close",1835149582),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.plugins.__BEH__on_close);
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"plugin-manager.search","plugin-manager.search",-770563448),new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"desc","desc",2093485764),"Plugins: Search",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (term){
var term__$1 = (function (){var or__6793__auto__ = term;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return lt.util.dom.val.call(null,lt.util.dom.$.call(null,new cljs.core.Keyword(null,"input","input",556931961),lt.object.__GT_content.call(null,lt.objs.plugins.manager)));
}
})();
lt.object.merge_BANG_.call(null,lt.objs.plugins.manager,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tab","tab",-559583621),new cljs.core.Keyword(null,"server","server",1499190120)], null));

return lt.object.raise.call(null,lt.objs.plugins.manager,new cljs.core.Keyword(null,"search-plugins!","search-plugins!",-246727177),term__$1);
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"plugin-manager.refresh","plugin-manager.refresh",1682385037),new cljs.core.Keyword(null,"desc","desc",2093485764),"Plugins: Refresh plugin list",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
lt.object.raise.call(null,lt.objs.plugins.manager,new cljs.core.Keyword(null,"refresh!","refresh!",156149341));

return lt.object.raise.call(null,lt.objs.plugins.manager,new cljs.core.Keyword(null,"fetch-plugins","fetch-plugins",37225319));
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"plugin-manager.show","plugin-manager.show",-401374110),new cljs.core.Keyword(null,"desc","desc",2093485764),"Plugins: Show plugin manager",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
lt.objs.tabs.add_or_focus_BANG_.call(null,lt.objs.plugins.manager);

lt.util.dom.focus.call(null,lt.util.dom.$.call(null,new cljs.core.Keyword(null,"input","input",556931961),lt.object.__GT_content.call(null,lt.objs.plugins.manager)));

return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"plugin-manager.refresh","plugin-manager.refresh",1682385037));
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"plugin-manager.update-outdated","plugin-manager.update-outdated",238956641),new cljs.core.Keyword(null,"desc","desc",2093485764),"Plugins: Update all outdated",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var outdated = cljs.core.filter.call(null,lt.objs.plugins.outdated_QMARK_,cljs.core.vals.call(null,new cljs.core.Keyword("lt.objs.plugins","plugins","lt.objs.plugins/plugins",-1345299551).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.app.app))));
var names = cljs.core.atom.call(null,cljs.core.PersistentHashSet.EMPTY);
var countdown = cljs.core.atom.call(null,cljs.core.count.call(null,outdated));
var seq__21218 = cljs.core.seq.call(null,outdated);
var chunk__21221 = null;
var count__21222 = (0);
var i__21223 = (0);
while(true){
if((i__21223 < count__21222)){
var plugin = cljs.core._nth.call(null,chunk__21221,i__21223);
if(cljs.core.seq.call(null,outdated)){
var cached_21226 = new cljs.core.Keyword(null,"latest-version","latest-version",-1985110248).cljs$core$IFn$_invoke$arity$1(cljs.core.get.call(null,new cljs.core.Keyword(null,"server-plugins","server-plugins",-514262131).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.plugins.manager)),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(plugin)));
lt.objs.plugins.discover_deps.call(null,cljs.core.assoc.call(null,plugin,new cljs.core.Keyword(null,"version","version",425292698),cached_21226),((function (seq__21218,chunk__21221,count__21222,i__21223,cached_21226,plugin,outdated,names,countdown){
return (function (){
cljs.core.swap_BANG_.call(null,names,cljs.core.conj,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(plugin));

cljs.core.swap_BANG_.call(null,countdown,cljs.core.dec);

lt.object.raise.call(null,lt.objs.plugins.manager,new cljs.core.Keyword(null,"refresh!","refresh!",156149341));

if((cljs.core.deref.call(null,countdown) <= (0))){
lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"behaviors.reload","behaviors.reload",2130924967));

return lt.objs.notifos.set_msg_BANG_.call(null,cljs.core.apply.call(null,cljs.core.str,"Updated: ",cljs.core.interpose.call(null,", ",cljs.core.deref.call(null,names))));
} else {
return null;
}
});})(seq__21218,chunk__21221,count__21222,i__21223,cached_21226,plugin,outdated,names,countdown))
);

var G__21227 = seq__21218;
var G__21228 = chunk__21221;
var G__21229 = count__21222;
var G__21230 = (i__21223 + (1));
seq__21218 = G__21227;
chunk__21221 = G__21228;
count__21222 = G__21229;
i__21223 = G__21230;
continue;
} else {
var G__21231 = seq__21218;
var G__21232 = chunk__21221;
var G__21233 = count__21222;
var G__21234 = (i__21223 + (1));
seq__21218 = G__21231;
chunk__21221 = G__21232;
count__21222 = G__21233;
i__21223 = G__21234;
continue;
}
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__21218);
if(temp__4657__auto__){
var seq__21218__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__21218__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__21218__$1);
var G__21235 = cljs.core.chunk_rest.call(null,seq__21218__$1);
var G__21236 = c__7604__auto__;
var G__21237 = cljs.core.count.call(null,c__7604__auto__);
var G__21238 = (0);
seq__21218 = G__21235;
chunk__21221 = G__21236;
count__21222 = G__21237;
i__21223 = G__21238;
continue;
} else {
var plugin = cljs.core.first.call(null,seq__21218__$1);
if(cljs.core.seq.call(null,outdated)){
var cached_21239 = new cljs.core.Keyword(null,"latest-version","latest-version",-1985110248).cljs$core$IFn$_invoke$arity$1(cljs.core.get.call(null,new cljs.core.Keyword(null,"server-plugins","server-plugins",-514262131).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.plugins.manager)),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(plugin)));
lt.objs.plugins.discover_deps.call(null,cljs.core.assoc.call(null,plugin,new cljs.core.Keyword(null,"version","version",425292698),cached_21239),((function (seq__21218,chunk__21221,count__21222,i__21223,cached_21239,plugin,seq__21218__$1,temp__4657__auto__,outdated,names,countdown){
return (function (){
cljs.core.swap_BANG_.call(null,names,cljs.core.conj,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(plugin));

cljs.core.swap_BANG_.call(null,countdown,cljs.core.dec);

lt.object.raise.call(null,lt.objs.plugins.manager,new cljs.core.Keyword(null,"refresh!","refresh!",156149341));

if((cljs.core.deref.call(null,countdown) <= (0))){
lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"behaviors.reload","behaviors.reload",2130924967));

return lt.objs.notifos.set_msg_BANG_.call(null,cljs.core.apply.call(null,cljs.core.str,"Updated: ",cljs.core.interpose.call(null,", ",cljs.core.deref.call(null,names))));
} else {
return null;
}
});})(seq__21218,chunk__21221,count__21222,i__21223,cached_21239,plugin,seq__21218__$1,temp__4657__auto__,outdated,names,countdown))
);

var G__21240 = cljs.core.next.call(null,seq__21218__$1);
var G__21241 = null;
var G__21242 = (0);
var G__21243 = (0);
seq__21218 = G__21240;
chunk__21221 = G__21241;
count__21222 = G__21242;
i__21223 = G__21243;
continue;
} else {
var G__21244 = cljs.core.next.call(null,seq__21218__$1);
var G__21245 = null;
var G__21246 = (0);
var G__21247 = (0);
seq__21218 = G__21244;
chunk__21221 = G__21245;
count__21222 = G__21246;
i__21223 = G__21247;
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
/**
 * 
 */
lt.objs.plugins.__BEH__init_plugins = (function lt$objs$plugins$__BEH__init_plugins(app){
if(cljs.core.truth_(lt.objs.files.exists_QMARK_.call(null,lt.objs.plugins.user_plugins_dir))){
} else {
lt.objs.files.mkdir.call(null,lt.objs.plugins.user_plugins_dir);
}

lt.object.raise.call(null,lt.objs.app.app,new cljs.core.Keyword(null,"create-user-plugin","create-user-plugin",1061956772));

lt.object.raise.call(null,lt.objs.app.app,new cljs.core.Keyword(null,"flatten-map-settings","flatten-map-settings",772619331));

lt.object.merge_BANG_.call(null,lt.objs.app.app,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("lt.objs.plugins","plugins","lt.objs.plugins/plugins",-1345299551),lt.objs.plugins.available_plugins.call(null)], null));

return lt.objs.plugins.check_missing.call(null,new cljs.core.Keyword("lt.objs.plugins","plugins","lt.objs.plugins/plugins",-1345299551).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.app.app)));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.plugins","init-plugins","lt.objs.plugins/init-plugins",-1184369360),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"pre-load","pre-load",-1239999613),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.plugins.__BEH__init_plugins);
/**
 * 
 */
lt.objs.plugins.__BEH__behaviors__DOT__refreshed_load_keys = (function lt$objs$plugins$__BEH__behaviors__DOT__refreshed_load_keys(){
return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"keymaps.reload","keymaps.reload",-244540607));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.plugins","behaviors.refreshed-load-keys","lt.objs.plugins/behaviors.refreshed-load-keys",-515974854),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"behaviors.refreshed","behaviors.refreshed",-919120200),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.plugins.__BEH__behaviors__DOT__refreshed_load_keys);
/**
 * 
 */
lt.objs.plugins.__BEH__plugin_behavior_diffs = (function lt$objs$plugins$__BEH__plugin_behavior_diffs(this$,diffs){
var plugins = new cljs.core.Keyword("lt.objs.plugins","plugins","lt.objs.plugins/plugins",-1345299551).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$));
var dep_graph = lt.objs.plugins.plugin_dependency_graph.call(null,plugins);
var dep_ordered = cljs.core.seq.call(null,lt.util.kahn.kahn_sort.call(null,dep_graph));
var mapped = ((dep_ordered)?cljs.core.map.call(null,plugins,dep_ordered):cljs.core.vals.call(null,plugins));
if(cljs.core.truth_((function (){var and__6781__auto__ = plugins;
if(cljs.core.truth_(and__6781__auto__)){
return (cljs.core.not.call(null,dep_ordered)) && (cljs.core.not.call(null,new cljs.core.Keyword("lt.objs.plugins","cycle-warned","lt.objs.plugins/cycle-warned",389538336).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))));
} else {
return and__6781__auto__;
}
})())){
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("lt.objs.plugins","cycle-warned","lt.objs.plugins/cycle-warned",389538336),true], null));

lt.objs.popup.popup_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"header","header",119441134),"There's a cycle in your plugin dependencies.",new cljs.core.Keyword(null,"body","body",-2049205669),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),"As a result, we can't come up with an optimal way to load them.\n                                                This means there may be unexpected consequences to being loaded out of order.\n                                                Here are the plugins causing the cycle: ",lt.objs.plugins.cycle_desc.call(null,lt.objs.plugins.__GT_cycles.call(null,dep_graph))], null),new cljs.core.Keyword(null,"buttons","buttons",-1953831197),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1718410804),"ok"], null)], null)], null));
} else {
}

return cljs.core.concat.call(null,diffs,cljs.core.mapv.call(null,lt.objs.plugins.plugin_behaviors,mapped));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.plugins","plugin-behavior-diffs","lt.objs.plugins/plugin-behavior-diffs",223443609),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"behaviors.diffs.plugin+","behaviors.diffs.plugin+",-195662477),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.plugins.__BEH__plugin_behavior_diffs);
/**
 * 
 */
lt.objs.plugins.__BEH__plugin_keymap_diffs = (function lt$objs$plugins$__BEH__plugin_keymap_diffs(this$,diffs){
return cljs.core.concat.call(null,diffs,cljs.core.filter.call(null,cljs.core.identity,cljs.core.mapv.call(null,lt.objs.settings.parse_key_file,new cljs.core.Keyword("lt.objs.plugins","keymaps","lt.objs.plugins/keymaps",371725296).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)))));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.plugins","plugin-keymap-diffs","lt.objs.plugins/plugin-keymap-diffs",1117010566),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keymap.diffs.plugin+","keymap.diffs.plugin+",844114694),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.plugins.__BEH__plugin_keymap_diffs);
/**
 * 
 */
lt.objs.plugins.__BEH__load_js = (function lt$objs$plugins$__BEH__load_js(this$,path){
var _STAR_plugin_dir_STAR_21257 = lt.objs.plugins._STAR_plugin_dir_STAR_;
var _STAR_force_reload_STAR_21258 = lt.util.load._STAR_force_reload_STAR_;
lt.objs.plugins._STAR_plugin_dir_STAR_ = new cljs.core.Keyword("lt.objs.plugins","dir","lt.objs.plugins/dir",651688593).cljs$core$IFn$_invoke$arity$1(lt.object._STAR_behavior_meta_STAR_);

lt.util.load._STAR_force_reload_STAR_ = new cljs.core.Keyword("lt.objs.plugins","force-reload","lt.objs.plugins/force-reload",180193649).cljs$core$IFn$_invoke$arity$1(lt.object._STAR_behavior_meta_STAR_);

try{var paths = ((cljs.core.coll_QMARK_.call(null,path))?path:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [path], null));
var seq__21259 = cljs.core.seq.call(null,paths);
var chunk__21260 = null;
var count__21261 = (0);
var i__21262 = (0);
while(true){
if((i__21262 < count__21261)){
var path__$1 = cljs.core._nth.call(null,chunk__21260,i__21262);
var path_21265__$2 = lt.objs.plugins.adjust_path.call(null,path__$1);
if(cljs.core.truth_((function (){var or__6793__auto__ = lt.util.load._STAR_force_reload_STAR_;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return cljs.core.not.call(null,cljs.core.get.call(null,new cljs.core.Keyword("lt.objs.plugins","loaded-files","lt.objs.plugins/loaded-files",-79546456).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),path_21265__$2));
}
})())){
try{lt.util.load.js.call(null,path_21265__$2,true);

lt.object.update_BANG_.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("lt.objs.plugins","loaded-files","lt.objs.plugins/loaded-files",-79546456)], null),((function (seq__21259,chunk__21260,count__21261,i__21262,path_21265__$2,path__$1,paths,_STAR_plugin_dir_STAR_21257,_STAR_force_reload_STAR_21258){
return (function (p1__21248_SHARP_){
return cljs.core.conj.call(null,(function (){var or__6793__auto__ = p1__21248_SHARP_;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return cljs.core.PersistentHashSet.EMPTY;
}
})(),path_21265__$2);
});})(seq__21259,chunk__21260,count__21261,i__21262,path_21265__$2,path__$1,paths,_STAR_plugin_dir_STAR_21257,_STAR_force_reload_STAR_21258))
);
}catch (e21263){var e_21266 = e21263;
lt.objs.console.error.call(null,[cljs.core.str("Error loading JS file: "),cljs.core.str(path_21265__$2),cljs.core.str(" : "),cljs.core.str(e_21266)].join(''),e_21266);
}} else {
}

var G__21267 = seq__21259;
var G__21268 = chunk__21260;
var G__21269 = count__21261;
var G__21270 = (i__21262 + (1));
seq__21259 = G__21267;
chunk__21260 = G__21268;
count__21261 = G__21269;
i__21262 = G__21270;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__21259);
if(temp__4657__auto__){
var seq__21259__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__21259__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__21259__$1);
var G__21271 = cljs.core.chunk_rest.call(null,seq__21259__$1);
var G__21272 = c__7604__auto__;
var G__21273 = cljs.core.count.call(null,c__7604__auto__);
var G__21274 = (0);
seq__21259 = G__21271;
chunk__21260 = G__21272;
count__21261 = G__21273;
i__21262 = G__21274;
continue;
} else {
var path__$1 = cljs.core.first.call(null,seq__21259__$1);
var path_21275__$2 = lt.objs.plugins.adjust_path.call(null,path__$1);
if(cljs.core.truth_((function (){var or__6793__auto__ = lt.util.load._STAR_force_reload_STAR_;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return cljs.core.not.call(null,cljs.core.get.call(null,new cljs.core.Keyword("lt.objs.plugins","loaded-files","lt.objs.plugins/loaded-files",-79546456).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),path_21275__$2));
}
})())){
try{lt.util.load.js.call(null,path_21275__$2,true);

lt.object.update_BANG_.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("lt.objs.plugins","loaded-files","lt.objs.plugins/loaded-files",-79546456)], null),((function (seq__21259,chunk__21260,count__21261,i__21262,path_21275__$2,path__$1,seq__21259__$1,temp__4657__auto__,paths,_STAR_plugin_dir_STAR_21257,_STAR_force_reload_STAR_21258){
return (function (p1__21248_SHARP_){
return cljs.core.conj.call(null,(function (){var or__6793__auto__ = p1__21248_SHARP_;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return cljs.core.PersistentHashSet.EMPTY;
}
})(),path_21275__$2);
});})(seq__21259,chunk__21260,count__21261,i__21262,path_21275__$2,path__$1,seq__21259__$1,temp__4657__auto__,paths,_STAR_plugin_dir_STAR_21257,_STAR_force_reload_STAR_21258))
);
}catch (e21264){var e_21276 = e21264;
lt.objs.console.error.call(null,[cljs.core.str("Error loading JS file: "),cljs.core.str(path_21275__$2),cljs.core.str(" : "),cljs.core.str(e_21276)].join(''),e_21276);
}} else {
}

var G__21277 = cljs.core.next.call(null,seq__21259__$1);
var G__21278 = null;
var G__21279 = (0);
var G__21280 = (0);
seq__21259 = G__21277;
chunk__21260 = G__21278;
count__21261 = G__21279;
i__21262 = G__21280;
continue;
}
} else {
return null;
}
}
break;
}
}finally {lt.util.load._STAR_force_reload_STAR_ = _STAR_force_reload_STAR_21258;

lt.objs.plugins._STAR_plugin_dir_STAR_ = _STAR_plugin_dir_STAR_21257;
}});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.plugins","load-js","lt.objs.plugins/load-js",-1745643293),new cljs.core.Keyword(null,"desc","desc",2093485764),"App: Load javascript file(s)",new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1718410804),"path(s)"], null)], null),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"object.instant-load","object.instant-load",853728870),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.plugins.__BEH__load_js);
/**
 * 
 */
lt.objs.plugins.__BEH__load_css = (function lt$objs$plugins$__BEH__load_css(this$,path){
var paths = cljs.core.map.call(null,lt.objs.plugins.adjust_path,((cljs.core.coll_QMARK_.call(null,path))?path:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [path], null)));
var seq__21286 = cljs.core.seq.call(null,paths);
var chunk__21287 = null;
var count__21288 = (0);
var i__21289 = (0);
while(true){
if((i__21289 < count__21288)){
var path__$1 = cljs.core._nth.call(null,chunk__21287,i__21289);
if(cljs.core.truth_((function (){var or__6793__auto__ = lt.util.load._STAR_force_reload_STAR_;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return cljs.core.not.call(null,cljs.core.get.call(null,new cljs.core.Keyword("lt.objs.plugins","loaded-files","lt.objs.plugins/loaded-files",-79546456).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),path__$1));
}
})())){
lt.object.update_BANG_.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("lt.objs.plugins","loaded-files","lt.objs.plugins/loaded-files",-79546456)], null),((function (seq__21286,chunk__21287,count__21288,i__21289,path__$1,paths){
return (function (p1__21281_SHARP_){
return cljs.core.conj.call(null,(function (){var or__6793__auto__ = p1__21281_SHARP_;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return cljs.core.PersistentHashSet.EMPTY;
}
})(),path__$1);
});})(seq__21286,chunk__21287,count__21288,i__21289,path__$1,paths))
);

lt.util.load.css.call(null,path__$1);
} else {
}

var G__21290 = seq__21286;
var G__21291 = chunk__21287;
var G__21292 = count__21288;
var G__21293 = (i__21289 + (1));
seq__21286 = G__21290;
chunk__21287 = G__21291;
count__21288 = G__21292;
i__21289 = G__21293;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__21286);
if(temp__4657__auto__){
var seq__21286__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__21286__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__21286__$1);
var G__21294 = cljs.core.chunk_rest.call(null,seq__21286__$1);
var G__21295 = c__7604__auto__;
var G__21296 = cljs.core.count.call(null,c__7604__auto__);
var G__21297 = (0);
seq__21286 = G__21294;
chunk__21287 = G__21295;
count__21288 = G__21296;
i__21289 = G__21297;
continue;
} else {
var path__$1 = cljs.core.first.call(null,seq__21286__$1);
if(cljs.core.truth_((function (){var or__6793__auto__ = lt.util.load._STAR_force_reload_STAR_;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return cljs.core.not.call(null,cljs.core.get.call(null,new cljs.core.Keyword("lt.objs.plugins","loaded-files","lt.objs.plugins/loaded-files",-79546456).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),path__$1));
}
})())){
lt.object.update_BANG_.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("lt.objs.plugins","loaded-files","lt.objs.plugins/loaded-files",-79546456)], null),((function (seq__21286,chunk__21287,count__21288,i__21289,path__$1,seq__21286__$1,temp__4657__auto__,paths){
return (function (p1__21281_SHARP_){
return cljs.core.conj.call(null,(function (){var or__6793__auto__ = p1__21281_SHARP_;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return cljs.core.PersistentHashSet.EMPTY;
}
})(),path__$1);
});})(seq__21286,chunk__21287,count__21288,i__21289,path__$1,seq__21286__$1,temp__4657__auto__,paths))
);

lt.util.load.css.call(null,path__$1);
} else {
}

var G__21298 = cljs.core.next.call(null,seq__21286__$1);
var G__21299 = null;
var G__21300 = (0);
var G__21301 = (0);
seq__21286 = G__21298;
chunk__21287 = G__21299;
count__21288 = G__21300;
i__21289 = G__21301;
continue;
}
} else {
return null;
}
}
break;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.plugins","load-css","lt.objs.plugins/load-css",480386133),new cljs.core.Keyword(null,"desc","desc",2093485764),"App: Load css file(s)",new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1718410804),"path(s)"], null)], null),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"object.instant","object.instant",-29936727),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.plugins.__BEH__load_css);
/**
 * 
 */
lt.objs.plugins.__BEH__load_keymap = (function lt$objs$plugins$__BEH__load_keymap(this$,path){
var path__$1 = lt.objs.plugins.adjust_path.call(null,path);
if(cljs.core.truth_(new cljs.core.Keyword("lt.objs.plugins","keymaps","lt.objs.plugins/keymaps",371725296).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)))){
return lt.object.update_BANG_.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("lt.objs.plugins","keymaps","lt.objs.plugins/keymaps",371725296)], null),cljs.core.conj,path__$1);
} else {
return lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("lt.objs.plugins","keymaps","lt.objs.plugins/keymaps",371725296),cljs.core.PersistentHashSet.fromArray([path__$1], true)], null));
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.plugins","load-keymap","lt.objs.plugins/load-keymap",904677993),new cljs.core.Keyword(null,"desc","desc",2093485764),"App: Load a keymap file",new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1718410804),"path"], null)], null),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"object.instant","object.instant",-29936727),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.plugins.__BEH__load_keymap);
/**
 * 
 */
lt.objs.plugins.__BEH__check_for_plugin_file = (function lt$objs$plugins$__BEH__check_for_plugin_file(this$){
var path = new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
var plugin_edn = (function (){var or__6793__auto__ = lt.objs.files.walk_up_find.call(null,path,"plugin.json");
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return lt.objs.files.walk_up_find.call(null,path,"plugin.edn");
}
})();
if(cljs.core.truth_(plugin_edn)){
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("lt.objs.plugins","plugin-path","lt.objs.plugins/plugin-path",-1106303476),lt.objs.files.parent.call(null,plugin_edn)], null));

return lt.object.add_tags.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"plugin.file","plugin.file",1804030614)], null));
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.plugins","check-for-plugin-file","lt.objs.plugins/check-for-plugin-file",-2052849661),new cljs.core.Keyword(null,"desc","desc",2093485764),"Plugin: Determine if this is a plugin file",new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"create","create",-1301499256),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.plugins.__BEH__check_for_plugin_file);
lt.object.tag_behaviors.call(null,new cljs.core.Keyword(null,"app","app",-560961707),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("lt.objs.plugins","init-plugins","lt.objs.plugins/init-plugins",-1184369360),new cljs.core.Keyword("lt.objs.plugins","plugin-behavior-diffs","lt.objs.plugins/plugin-behavior-diffs",223443609),new cljs.core.Keyword("lt.objs.plugins","plugin-keymap-diffs","lt.objs.plugins/plugin-keymap-diffs",1117010566)], null));
