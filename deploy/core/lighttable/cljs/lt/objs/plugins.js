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
return (function (p1__20448_SHARP_){
return cljs.core.conj.call(null,(function (){var or__6793__auto__ = p1__20448_SHARP_;
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
}catch (e20450){var e = e20450;
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
return (function (final$,p__20455){
var vec__20456 = p__20455;
var name = cljs.core.nth.call(null,vec__20456,(0),null);
var version = cljs.core.nth.call(null,vec__20456,(1),null);
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
try{var map__20463 = plug;
var map__20463__$1 = ((((!((map__20463 == null)))?((((map__20463.cljs$lang$protocol_mask$partition0$ & (64))) || (map__20463.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__20463):map__20463);
var behaviors = cljs.core.get.call(null,map__20463__$1,new cljs.core.Keyword(null,"behaviors","behaviors",120724909));
var dir = cljs.core.get.call(null,map__20463__$1,new cljs.core.Keyword(null,"dir","dir",1734754661));
var file = lt.objs.files.join.call(null,dir,behaviors);
var file__$1 = lt.objs.files.real_path.call(null,file);
var behs = lt.objs.settings.parse_file.call(null,file__$1);
var force_QMARK_ = cljs.core.get.call(null,new cljs.core.Keyword("lt.objs.plugins","force-reload","lt.objs.plugins/force-reload",180193649).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.plugins.manager)),file__$1);
if(cljs.core.truth_(force_QMARK_)){
cljs.core.swap_BANG_.call(null,lt.objs.plugins.manager,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("lt.objs.plugins","force-reload","lt.objs.plugins/force-reload",180193649)], null),cljs.core.disj,file__$1);
} else {
}

if(cljs.core.truth_(behs)){
clojure.walk.prewalk.call(null,((function (map__20463,map__20463__$1,behaviors,dir,file,file__$1,behs,force_QMARK_){
return (function (x){
if(cljs.core.coll_QMARK_.call(null,x)){
cljs.core.alter_meta_BANG_.call(null,x,cljs.core.assoc,new cljs.core.Keyword("lt.objs.plugins","dir","lt.objs.plugins/dir",651688593),dir,new cljs.core.Keyword("lt.objs.plugins","force-reload","lt.objs.plugins/force-reload",180193649),force_QMARK_);
} else {
}

return x;
});})(map__20463,map__20463__$1,behaviors,dir,file,file__$1,behs,force_QMARK_))
,behs);

return behs;
} else {
return null;
}
}catch (e20462){var e = e20462;
lt.objs.console.error.call(null,[cljs.core.str("Could not load behaviors for plugin: "),cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(plug))].join(''));

return cljs.core.PersistentArrayMap.EMPTY;
}} else {
return null;
}
});
lt.objs.plugins.plugin_dependency_graph = (function lt$objs$plugins$plugin_dependency_graph(plugins){
return cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__7573__auto__ = (function lt$objs$plugins$plugin_dependency_graph_$_iter__20481(s__20482){
return (new cljs.core.LazySeq(null,(function (){
var s__20482__$1 = s__20482;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__20482__$1);
if(temp__4657__auto__){
var s__20482__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__20482__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__20482__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__20484 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__20483 = (0);
while(true){
if((i__20483 < size__7572__auto__)){
var vec__20491 = cljs.core._nth.call(null,c__7571__auto__,i__20483);
var nme = cljs.core.nth.call(null,vec__20491,(0),null);
var v = cljs.core.nth.call(null,vec__20491,(1),null);
cljs.core.chunk_append.call(null,b__20484,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [nme,cljs.core.set.call(null,cljs.core.map.call(null,cljs.core.name,cljs.core.keys.call(null,new cljs.core.Keyword(null,"dependencies","dependencies",1108064605).cljs$core$IFn$_invoke$arity$1(v))))], null));

var G__20497 = (i__20483 + (1));
i__20483 = G__20497;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__20484),lt$objs$plugins$plugin_dependency_graph_$_iter__20481.call(null,cljs.core.chunk_rest.call(null,s__20482__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__20484),null);
}
} else {
var vec__20494 = cljs.core.first.call(null,s__20482__$2);
var nme = cljs.core.nth.call(null,vec__20494,(0),null);
var v = cljs.core.nth.call(null,vec__20494,(1),null);
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [nme,cljs.core.set.call(null,cljs.core.map.call(null,cljs.core.name,cljs.core.keys.call(null,new cljs.core.Keyword(null,"dependencies","dependencies",1108064605).cljs$core$IFn$_invoke$arity$1(v))))], null),lt$objs$plugins$plugin_dependency_graph_$_iter__20481.call(null,cljs.core.rest.call(null,s__20482__$2)));
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
lt.objs.plugins.find_cycles = (function lt$objs$plugins$find_cycles(cur,p__20498){
var map__20505 = p__20498;
var map__20505__$1 = ((((!((map__20505 == null)))?((((map__20505.cljs$lang$protocol_mask$partition0$ & (64))) || (map__20505.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__20505):map__20505);
var state = map__20505__$1;
var seen = cljs.core.get.call(null,map__20505__$1,new cljs.core.Keyword(null,"seen","seen",-518999789));
var root = cljs.core.get.call(null,map__20505__$1,new cljs.core.Keyword(null,"root","root",-448657453));
var stack = cljs.core.get.call(null,map__20505__$1,new cljs.core.Keyword(null,"stack","stack",-793405930));
var graph = cljs.core.get.call(null,map__20505__$1,new cljs.core.Keyword(null,"graph","graph",1558099509));
return cljs.core.first.call(null,cljs.core.filter.call(null,cljs.core.identity,(function (){var iter__7573__auto__ = ((function (map__20505,map__20505__$1,state,seen,root,stack,graph){
return (function lt$objs$plugins$find_cycles_$_iter__20507(s__20508){
return (new cljs.core.LazySeq(null,((function (map__20505,map__20505__$1,state,seen,root,stack,graph){
return (function (){
var s__20508__$1 = s__20508;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__20508__$1);
if(temp__4657__auto__){
var s__20508__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__20508__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__20508__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__20510 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__20509 = (0);
while(true){
if((i__20509 < size__7572__auto__)){
var c = cljs.core._nth.call(null,c__7571__auto__,i__20509);
cljs.core.chunk_append.call(null,b__20510,((cljs.core._EQ_.call(null,c,root))?cljs.core.conj.call(null,stack,c):lt$objs$plugins$find_cycles.call(null,cljs.core.get.call(null,graph,c),cljs.core.update_in.call(null,cljs.core.update_in.call(null,state,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"stack","stack",-793405930)], null),cljs.core.conj,c),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"seen","seen",-518999789)], null),cljs.core.conj,c))));

var G__20511 = (i__20509 + (1));
i__20509 = G__20511;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__20510),lt$objs$plugins$find_cycles_$_iter__20507.call(null,cljs.core.chunk_rest.call(null,s__20508__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__20510),null);
}
} else {
var c = cljs.core.first.call(null,s__20508__$2);
return cljs.core.cons.call(null,((cljs.core._EQ_.call(null,c,root))?cljs.core.conj.call(null,stack,c):lt$objs$plugins$find_cycles.call(null,cljs.core.get.call(null,graph,c),cljs.core.update_in.call(null,cljs.core.update_in.call(null,state,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"stack","stack",-793405930)], null),cljs.core.conj,c),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"seen","seen",-518999789)], null),cljs.core.conj,c))),lt$objs$plugins$find_cycles_$_iter__20507.call(null,cljs.core.rest.call(null,s__20508__$2)));
}
} else {
return null;
}
break;
}
});})(map__20505,map__20505__$1,state,seen,root,stack,graph))
,null,null));
});})(map__20505,map__20505__$1,state,seen,root,stack,graph))
;
return iter__7573__auto__.call(null,cljs.core.remove.call(null,seen,cur));
})()));
});
lt.objs.plugins.__GT_cycles = (function lt$objs$plugins$__GT_cycles(graph){
return cljs.core.filterv.call(null,cljs.core.identity,(function (){var iter__7573__auto__ = (function lt$objs$plugins$__GT_cycles_$_iter__20528(s__20529){
return (new cljs.core.LazySeq(null,(function (){
var s__20529__$1 = s__20529;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__20529__$1);
if(temp__4657__auto__){
var s__20529__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__20529__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__20529__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__20531 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__20530 = (0);
while(true){
if((i__20530 < size__7572__auto__)){
var vec__20538 = cljs.core._nth.call(null,c__7571__auto__,i__20530);
var root = cljs.core.nth.call(null,vec__20538,(0),null);
var deps = cljs.core.nth.call(null,vec__20538,(1),null);
var stack = lt.objs.plugins.find_cycles.call(null,deps,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"seen","seen",-518999789),cljs.core.PersistentHashSet.EMPTY,new cljs.core.Keyword(null,"stack","stack",-793405930),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [root], null),new cljs.core.Keyword(null,"graph","graph",1558099509),graph,new cljs.core.Keyword(null,"root","root",-448657453),root], null));
cljs.core.chunk_append.call(null,b__20531,stack);

var G__20544 = (i__20530 + (1));
i__20530 = G__20544;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__20531),lt$objs$plugins$__GT_cycles_$_iter__20528.call(null,cljs.core.chunk_rest.call(null,s__20529__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__20531),null);
}
} else {
var vec__20541 = cljs.core.first.call(null,s__20529__$2);
var root = cljs.core.nth.call(null,vec__20541,(0),null);
var deps = cljs.core.nth.call(null,vec__20541,(1),null);
var stack = lt.objs.plugins.find_cycles.call(null,deps,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"seen","seen",-518999789),cljs.core.PersistentHashSet.EMPTY,new cljs.core.Keyword(null,"stack","stack",-793405930),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [root], null),new cljs.core.Keyword(null,"graph","graph",1558099509),graph,new cljs.core.Keyword(null,"root","root",-448657453),root], null));
return cljs.core.cons.call(null,stack,lt$objs$plugins$__GT_cycles_$_iter__20528.call(null,cljs.core.rest.call(null,s__20529__$2)));
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
var iter__7573__auto__ = (function lt$objs$plugins$cycle_desc_$_iter__20549(s__20550){
return (new cljs.core.LazySeq(null,(function (){
var s__20550__$1 = s__20550;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__20550__$1);
if(temp__4657__auto__){
var s__20550__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__20550__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__20550__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__20552 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__20551 = (0);
while(true){
if((i__20551 < size__7572__auto__)){
var cycle = cljs.core._nth.call(null,c__7571__auto__,i__20551);
cljs.core.chunk_append.call(null,b__20552,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),cljs.core.reduce.call(null,cljs.core.str,cljs.core.interpose.call(null," => ",cycle))], null));

var G__20553 = (i__20551 + (1));
i__20551 = G__20553;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__20552),lt$objs$plugins$cycle_desc_$_iter__20549.call(null,cljs.core.chunk_rest.call(null,s__20550__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__20552),null);
}
} else {
var cycle = cljs.core.first.call(null,s__20550__$2);
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),cljs.core.reduce.call(null,cljs.core.str,cljs.core.interpose.call(null," => ",cycle))], null),lt$objs$plugins$cycle_desc_$_iter__20549.call(null,cljs.core.rest.call(null,s__20550__$2)));
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
return (function lt$objs$plugins$build_cache_$_iter__20558(s__20559){
return (new cljs.core.LazySeq(null,((function (items){
return (function (){
var s__20559__$1 = s__20559;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__20559__$1);
if(temp__4657__auto__){
var s__20559__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__20559__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__20559__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__20561 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__20560 = (0);
while(true){
if((i__20560 < size__7572__auto__)){
var plugin = cljs.core._nth.call(null,c__7571__auto__,i__20560);
var versions = cljs.core.vec.call(null,cljs.core.sort_by.call(null,new cljs.core.Keyword(null,"version","version",425292698),lt.objs.plugins.version_sort,cljs.core.map.call(null,lt.objs.plugins.plugin_info,cljs.core.filter.call(null,lt.objs.files.dir_QMARK_,lt.objs.files.full_path_ls.call(null,plugin)))));
var latest = cljs.core.last.call(null,versions);
cljs.core.chunk_append.call(null,b__20561,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(latest),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"versions","versions",536521978),cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,cljs.core.juxt.call(null,new cljs.core.Keyword(null,"version","version",425292698),cljs.core.identity),versions)),new cljs.core.Keyword(null,"latest-version","latest-version",-1985110248),new cljs.core.Keyword(null,"version","version",425292698).cljs$core$IFn$_invoke$arity$1(latest)], null)], null));

var G__20562 = (i__20560 + (1));
i__20560 = G__20562;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__20561),lt$objs$plugins$build_cache_$_iter__20558.call(null,cljs.core.chunk_rest.call(null,s__20559__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__20561),null);
}
} else {
var plugin = cljs.core.first.call(null,s__20559__$2);
var versions = cljs.core.vec.call(null,cljs.core.sort_by.call(null,new cljs.core.Keyword(null,"version","version",425292698),lt.objs.plugins.version_sort,cljs.core.map.call(null,lt.objs.plugins.plugin_info,cljs.core.filter.call(null,lt.objs.files.dir_QMARK_,lt.objs.files.full_path_ls.call(null,plugin)))));
var latest = cljs.core.last.call(null,versions);
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(latest),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"versions","versions",536521978),cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,cljs.core.juxt.call(null,new cljs.core.Keyword(null,"version","version",425292698),cljs.core.identity),versions)),new cljs.core.Keyword(null,"latest-version","latest-version",-1985110248),new cljs.core.Keyword(null,"version","version",425292698).cljs$core$IFn$_invoke$arity$1(latest)], null)], null),lt$objs$plugins$build_cache_$_iter__20558.call(null,cljs.core.rest.call(null,s__20559__$2)));
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
}catch (e20564){var e = e20564;
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
return (function (final$,p__20569){
var vec__20570 = p__20569;
var name = cljs.core.nth.call(null,vec__20570,(0),null);
var ver = cljs.core.nth.call(null,vec__20570,(1),null);
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
lt.objs.plugins.transitive_deps = (function lt$objs$plugins$transitive_deps(plugins,p__20573,seen){
var vec__20577 = p__20573;
var name = cljs.core.nth.call(null,vec__20577,(0),null);
var ver = cljs.core.nth.call(null,vec__20577,(1),null);
var name__$1 = cljs.core.keyword.call(null,name);
var temp__4655__auto__ = cljs.core.get_in.call(null,plugins,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [name__$1,new cljs.core.Keyword(null,"versions","versions",536521978),cljs.core.keyword.call(null,ver)], null));
if(cljs.core.truth_(temp__4655__auto__)){
var cur = temp__4655__auto__;
var deps = new cljs.core.Keyword(null,"dependencies","dependencies",1108064605).cljs$core$IFn$_invoke$arity$1(cur);
var unique = cljs.core.remove.call(null,seen,cljs.core.keys.call(null,deps));
var seen__$1 = lt.objs.plugins.latest_version_merge.call(null,cljs.core.PersistentArrayMap.fromArray([name__$1,cur], true, false),seen);
return cljs.core.reduce.call(null,((function (deps,unique,seen__$1,cur,temp__4655__auto__,name__$1,vec__20577,name,ver){
return (function (seen__$2,cur__$1){
return lt$objs$plugins$transitive_deps.call(null,plugins,cur__$1,seen__$2);
});})(deps,unique,seen__$1,cur,temp__4655__auto__,name__$1,vec__20577,name,ver))
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
var vec__20584 = cljs.core.take.call(null,(2),cljs.core.filter.call(null,(function (p1__20580_SHARP_){
return cljs.core.not_EQ_.call(null,p1__20580_SHARP_,"");
}),cljs.core.reverse.call(null,clojure.string.split.call(null,new cljs.core.Keyword(null,"source","source",-433931539).cljs$core$IFn$_invoke$arity$1(plugin),"/"))));
var repo = cljs.core.nth.call(null,vec__20584,(0),null);
var username = cljs.core.nth.call(null,vec__20584,(1),null);
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
var seq__20597 = cljs.core.seq.call(null,others);
var chunk__20598 = null;
var count__20599 = (0);
var i__20600 = (0);
while(true){
if((i__20600 < count__20599)){
var vec__20601 = cljs.core._nth.call(null,chunk__20598,i__20600);
var _ = cljs.core.nth.call(null,vec__20601,(0),null);
var dep = cljs.core.nth.call(null,vec__20601,(1),null);
lt.objs.plugins.install_version.call(null,dep,count_down);

var G__20607 = seq__20597;
var G__20608 = chunk__20598;
var G__20609 = count__20599;
var G__20610 = (i__20600 + (1));
seq__20597 = G__20607;
chunk__20598 = G__20608;
count__20599 = G__20609;
i__20600 = G__20610;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__20597);
if(temp__4657__auto__){
var seq__20597__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__20597__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__20597__$1);
var G__20611 = cljs.core.chunk_rest.call(null,seq__20597__$1);
var G__20612 = c__7604__auto__;
var G__20613 = cljs.core.count.call(null,c__7604__auto__);
var G__20614 = (0);
seq__20597 = G__20611;
chunk__20598 = G__20612;
count__20599 = G__20613;
i__20600 = G__20614;
continue;
} else {
var vec__20604 = cljs.core.first.call(null,seq__20597__$1);
var _ = cljs.core.nth.call(null,vec__20604,(0),null);
var dep = cljs.core.nth.call(null,vec__20604,(1),null);
lt.objs.plugins.install_version.call(null,dep,count_down);

var G__20615 = cljs.core.next.call(null,seq__20597__$1);
var G__20616 = null;
var G__20617 = (0);
var G__20618 = (0);
seq__20597 = G__20615;
chunk__20598 = G__20616;
count__20599 = G__20617;
i__20600 = G__20618;
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
var seq__20623 = cljs.core.seq.call(null,missing);
var chunk__20624 = null;
var count__20625 = (0);
var i__20626 = (0);
while(true){
if((i__20626 < count__20625)){
var dep = cljs.core._nth.call(null,chunk__20624,i__20626);
lt.objs.plugins.discover_deps.call(null,dep,count_down);

var G__20627 = seq__20623;
var G__20628 = chunk__20624;
var G__20629 = count__20625;
var G__20630 = (i__20626 + (1));
seq__20623 = G__20627;
chunk__20624 = G__20628;
count__20625 = G__20629;
i__20626 = G__20630;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__20623);
if(temp__4657__auto__){
var seq__20623__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__20623__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__20623__$1);
var G__20631 = cljs.core.chunk_rest.call(null,seq__20623__$1);
var G__20632 = c__7604__auto__;
var G__20633 = cljs.core.count.call(null,c__7604__auto__);
var G__20634 = (0);
seq__20623 = G__20631;
chunk__20624 = G__20632;
count__20625 = G__20633;
i__20626 = G__20634;
continue;
} else {
var dep = cljs.core.first.call(null,seq__20623__$1);
lt.objs.plugins.discover_deps.call(null,dep,count_down);

var G__20635 = cljs.core.next.call(null,seq__20623__$1);
var G__20636 = null;
var G__20637 = (0);
var G__20638 = (0);
seq__20623 = G__20635;
chunk__20624 = G__20636;
count__20625 = G__20637;
i__20626 = G__20638;
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
return (function lt$objs$plugins$check_missing_$_iter__20651(s__20652){
return (new cljs.core.LazySeq(null,((function (missing_QMARK_,temp__4657__auto__){
return (function (){
var s__20652__$1 = s__20652;
while(true){
var temp__4657__auto____$1 = cljs.core.seq.call(null,s__20652__$1);
if(temp__4657__auto____$1){
var s__20652__$2 = temp__4657__auto____$1;
if(cljs.core.chunked_seq_QMARK_.call(null,s__20652__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__20652__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__20654 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__20653 = (0);
while(true){
if((i__20653 < size__7572__auto__)){
var map__20659 = cljs.core._nth.call(null,c__7571__auto__,i__20653);
var map__20659__$1 = ((((!((map__20659 == null)))?((((map__20659.cljs$lang$protocol_mask$partition0$ & (64))) || (map__20659.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__20659):map__20659);
var name = cljs.core.get.call(null,map__20659__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var version = cljs.core.get.call(null,map__20659__$1,new cljs.core.Keyword(null,"version","version",425292698));
cljs.core.chunk_append.call(null,b__20654,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),name," ",version," "], null));

var G__20663 = (i__20653 + (1));
i__20653 = G__20663;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__20654),lt$objs$plugins$check_missing_$_iter__20651.call(null,cljs.core.chunk_rest.call(null,s__20652__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__20654),null);
}
} else {
var map__20661 = cljs.core.first.call(null,s__20652__$2);
var map__20661__$1 = ((((!((map__20661 == null)))?((((map__20661.cljs$lang$protocol_mask$partition0$ & (64))) || (map__20661.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__20661):map__20661);
var name = cljs.core.get.call(null,map__20661__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var version = cljs.core.get.call(null,map__20661__$1,new cljs.core.Keyword(null,"version","version",425292698));
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),name," ",version," "], null),lt$objs$plugins$check_missing_$_iter__20651.call(null,cljs.core.rest.call(null,s__20652__$2)));
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
var seq__20674_20684 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"focus","focus",234677911),((function (e__7942__auto__){
return (function (){
return lt.objs.context.in_BANG_.call(null,new cljs.core.Keyword(null,"popup.input","popup.input",-1726140162));
});})(e__7942__auto__))
,new cljs.core.Keyword(null,"blur","blur",-453500461),((function (e__7942__auto__){
return (function (){
return lt.objs.context.out_BANG_.call(null,new cljs.core.Keyword(null,"popup.input","popup.input",-1726140162));
});})(e__7942__auto__))
], null)));
var chunk__20675_20685 = null;
var count__20676_20686 = (0);
var i__20677_20687 = (0);
while(true){
if((i__20677_20687 < count__20676_20686)){
var vec__20678_20688 = cljs.core._nth.call(null,chunk__20675_20685,i__20677_20687);
var ev__7943__auto___20689 = cljs.core.nth.call(null,vec__20678_20688,(0),null);
var func__7944__auto___20690 = cljs.core.nth.call(null,vec__20678_20688,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___20689,func__7944__auto___20690);

var G__20691 = seq__20674_20684;
var G__20692 = chunk__20675_20685;
var G__20693 = count__20676_20686;
var G__20694 = (i__20677_20687 + (1));
seq__20674_20684 = G__20691;
chunk__20675_20685 = G__20692;
count__20676_20686 = G__20693;
i__20677_20687 = G__20694;
continue;
} else {
var temp__4657__auto___20695 = cljs.core.seq.call(null,seq__20674_20684);
if(temp__4657__auto___20695){
var seq__20674_20696__$1 = temp__4657__auto___20695;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__20674_20696__$1)){
var c__7604__auto___20697 = cljs.core.chunk_first.call(null,seq__20674_20696__$1);
var G__20698 = cljs.core.chunk_rest.call(null,seq__20674_20696__$1);
var G__20699 = c__7604__auto___20697;
var G__20700 = cljs.core.count.call(null,c__7604__auto___20697);
var G__20701 = (0);
seq__20674_20684 = G__20698;
chunk__20675_20685 = G__20699;
count__20676_20686 = G__20700;
i__20677_20687 = G__20701;
continue;
} else {
var vec__20681_20702 = cljs.core.first.call(null,seq__20674_20696__$1);
var ev__7943__auto___20703 = cljs.core.nth.call(null,vec__20681_20702,(0),null);
var func__7944__auto___20704 = cljs.core.nth.call(null,vec__20681_20702,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___20703,func__7944__auto___20704);

var G__20705 = cljs.core.next.call(null,seq__20674_20696__$1);
var G__20706 = null;
var G__20707 = (0);
var G__20708 = (0);
seq__20674_20684 = G__20705;
chunk__20675_20685 = G__20706;
count__20676_20686 = G__20707;
i__20677_20687 = G__20708;
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
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),crate.binding.bound.call(null,this$,(function (p1__20709_SHARP_){
if(cljs.core._EQ_.call(null,tab_name,new cljs.core.Keyword(null,"tab","tab",-559583621).cljs$core$IFn$_invoke$arity$1(p1__20709_SHARP_))){
return "active";
} else {
return null;
}
}))], null),label], null));
var seq__20720_20730 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (){
return lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tab","tab",-559583621),tab_name], null));
});})(e__7942__auto__))
], null)));
var chunk__20721_20731 = null;
var count__20722_20732 = (0);
var i__20723_20733 = (0);
while(true){
if((i__20723_20733 < count__20722_20732)){
var vec__20724_20734 = cljs.core._nth.call(null,chunk__20721_20731,i__20723_20733);
var ev__7943__auto___20735 = cljs.core.nth.call(null,vec__20724_20734,(0),null);
var func__7944__auto___20736 = cljs.core.nth.call(null,vec__20724_20734,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___20735,func__7944__auto___20736);

var G__20737 = seq__20720_20730;
var G__20738 = chunk__20721_20731;
var G__20739 = count__20722_20732;
var G__20740 = (i__20723_20733 + (1));
seq__20720_20730 = G__20737;
chunk__20721_20731 = G__20738;
count__20722_20732 = G__20739;
i__20723_20733 = G__20740;
continue;
} else {
var temp__4657__auto___20741 = cljs.core.seq.call(null,seq__20720_20730);
if(temp__4657__auto___20741){
var seq__20720_20742__$1 = temp__4657__auto___20741;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__20720_20742__$1)){
var c__7604__auto___20743 = cljs.core.chunk_first.call(null,seq__20720_20742__$1);
var G__20744 = cljs.core.chunk_rest.call(null,seq__20720_20742__$1);
var G__20745 = c__7604__auto___20743;
var G__20746 = cljs.core.count.call(null,c__7604__auto___20743);
var G__20747 = (0);
seq__20720_20730 = G__20744;
chunk__20721_20731 = G__20745;
count__20722_20732 = G__20746;
i__20723_20733 = G__20747;
continue;
} else {
var vec__20727_20748 = cljs.core.first.call(null,seq__20720_20742__$1);
var ev__7943__auto___20749 = cljs.core.nth.call(null,vec__20727_20748,(0),null);
var func__7944__auto___20750 = cljs.core.nth.call(null,vec__20727_20748,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___20749,func__7944__auto___20750);

var G__20751 = cljs.core.next.call(null,seq__20720_20742__$1);
var G__20752 = null;
var G__20753 = (0);
var G__20754 = (0);
seq__20720_20730 = G__20751;
chunk__20721_20731 = G__20752;
count__20722_20732 = G__20753;
i__20723_20733 = G__20754;
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
var seq__20765_20775 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"focus","focus",234677911),((function (e__7942__auto__){
return (function (){
return lt.objs.context.in_BANG_.call(null,new cljs.core.Keyword(null,"plugin-manager.search","plugin-manager.search",-770563448),this$);
});})(e__7942__auto__))
,new cljs.core.Keyword(null,"blur","blur",-453500461),((function (e__7942__auto__){
return (function (){
return lt.objs.context.out_BANG_.call(null,new cljs.core.Keyword(null,"plugin-manager.search","plugin-manager.search",-770563448));
});})(e__7942__auto__))
], null)));
var chunk__20766_20776 = null;
var count__20767_20777 = (0);
var i__20768_20778 = (0);
while(true){
if((i__20768_20778 < count__20767_20777)){
var vec__20769_20779 = cljs.core._nth.call(null,chunk__20766_20776,i__20768_20778);
var ev__7943__auto___20780 = cljs.core.nth.call(null,vec__20769_20779,(0),null);
var func__7944__auto___20781 = cljs.core.nth.call(null,vec__20769_20779,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___20780,func__7944__auto___20781);

var G__20782 = seq__20765_20775;
var G__20783 = chunk__20766_20776;
var G__20784 = count__20767_20777;
var G__20785 = (i__20768_20778 + (1));
seq__20765_20775 = G__20782;
chunk__20766_20776 = G__20783;
count__20767_20777 = G__20784;
i__20768_20778 = G__20785;
continue;
} else {
var temp__4657__auto___20786 = cljs.core.seq.call(null,seq__20765_20775);
if(temp__4657__auto___20786){
var seq__20765_20787__$1 = temp__4657__auto___20786;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__20765_20787__$1)){
var c__7604__auto___20788 = cljs.core.chunk_first.call(null,seq__20765_20787__$1);
var G__20789 = cljs.core.chunk_rest.call(null,seq__20765_20787__$1);
var G__20790 = c__7604__auto___20788;
var G__20791 = cljs.core.count.call(null,c__7604__auto___20788);
var G__20792 = (0);
seq__20765_20775 = G__20789;
chunk__20766_20776 = G__20790;
count__20767_20777 = G__20791;
i__20768_20778 = G__20792;
continue;
} else {
var vec__20772_20793 = cljs.core.first.call(null,seq__20765_20787__$1);
var ev__7943__auto___20794 = cljs.core.nth.call(null,vec__20772_20793,(0),null);
var func__7944__auto___20795 = cljs.core.nth.call(null,vec__20772_20793,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___20794,func__7944__auto___20795);

var G__20796 = cljs.core.next.call(null,seq__20765_20787__$1);
var G__20797 = null;
var G__20798 = (0);
var G__20799 = (0);
seq__20765_20775 = G__20796;
chunk__20766_20776 = G__20797;
count__20767_20777 = G__20798;
i__20768_20778 = G__20799;
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
var seq__20810_20820 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),cljs.core.PersistentVector.EMPTY));
var chunk__20811_20821 = null;
var count__20812_20822 = (0);
var i__20813_20823 = (0);
while(true){
if((i__20813_20823 < count__20812_20822)){
var vec__20814_20824 = cljs.core._nth.call(null,chunk__20811_20821,i__20813_20823);
var ev__7943__auto___20825 = cljs.core.nth.call(null,vec__20814_20824,(0),null);
var func__7944__auto___20826 = cljs.core.nth.call(null,vec__20814_20824,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___20825,func__7944__auto___20826);

var G__20827 = seq__20810_20820;
var G__20828 = chunk__20811_20821;
var G__20829 = count__20812_20822;
var G__20830 = (i__20813_20823 + (1));
seq__20810_20820 = G__20827;
chunk__20811_20821 = G__20828;
count__20812_20822 = G__20829;
i__20813_20823 = G__20830;
continue;
} else {
var temp__4657__auto___20831 = cljs.core.seq.call(null,seq__20810_20820);
if(temp__4657__auto___20831){
var seq__20810_20832__$1 = temp__4657__auto___20831;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__20810_20832__$1)){
var c__7604__auto___20833 = cljs.core.chunk_first.call(null,seq__20810_20832__$1);
var G__20834 = cljs.core.chunk_rest.call(null,seq__20810_20832__$1);
var G__20835 = c__7604__auto___20833;
var G__20836 = cljs.core.count.call(null,c__7604__auto___20833);
var G__20837 = (0);
seq__20810_20820 = G__20834;
chunk__20811_20821 = G__20835;
count__20812_20822 = G__20836;
i__20813_20823 = G__20837;
continue;
} else {
var vec__20817_20838 = cljs.core.first.call(null,seq__20810_20832__$1);
var ev__7943__auto___20839 = cljs.core.nth.call(null,vec__20817_20838,(0),null);
var func__7944__auto___20840 = cljs.core.nth.call(null,vec__20817_20838,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___20839,func__7944__auto___20840);

var G__20841 = cljs.core.next.call(null,seq__20810_20832__$1);
var G__20842 = null;
var G__20843 = (0);
var G__20844 = (0);
seq__20810_20820 = G__20841;
chunk__20811_20821 = G__20842;
count__20812_20822 = G__20843;
i__20813_20823 = G__20844;
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
var seq__20855_20865 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (e){
lt.util.dom.prevent.call(null,e);

lt.util.dom.stop_propagation.call(null,e);

return lt.objs.platform.open_url.call(null,new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$2(plugin,new cljs.core.Keyword(null,"source","source",-433931539).cljs$core$IFn$_invoke$arity$1(plugin)));
});})(e__7942__auto__))
], null)));
var chunk__20856_20866 = null;
var count__20857_20867 = (0);
var i__20858_20868 = (0);
while(true){
if((i__20858_20868 < count__20857_20867)){
var vec__20859_20869 = cljs.core._nth.call(null,chunk__20856_20866,i__20858_20868);
var ev__7943__auto___20870 = cljs.core.nth.call(null,vec__20859_20869,(0),null);
var func__7944__auto___20871 = cljs.core.nth.call(null,vec__20859_20869,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___20870,func__7944__auto___20871);

var G__20872 = seq__20855_20865;
var G__20873 = chunk__20856_20866;
var G__20874 = count__20857_20867;
var G__20875 = (i__20858_20868 + (1));
seq__20855_20865 = G__20872;
chunk__20856_20866 = G__20873;
count__20857_20867 = G__20874;
i__20858_20868 = G__20875;
continue;
} else {
var temp__4657__auto___20876 = cljs.core.seq.call(null,seq__20855_20865);
if(temp__4657__auto___20876){
var seq__20855_20877__$1 = temp__4657__auto___20876;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__20855_20877__$1)){
var c__7604__auto___20878 = cljs.core.chunk_first.call(null,seq__20855_20877__$1);
var G__20879 = cljs.core.chunk_rest.call(null,seq__20855_20877__$1);
var G__20880 = c__7604__auto___20878;
var G__20881 = cljs.core.count.call(null,c__7604__auto___20878);
var G__20882 = (0);
seq__20855_20865 = G__20879;
chunk__20856_20866 = G__20880;
count__20857_20867 = G__20881;
i__20858_20868 = G__20882;
continue;
} else {
var vec__20862_20883 = cljs.core.first.call(null,seq__20855_20877__$1);
var ev__7943__auto___20884 = cljs.core.nth.call(null,vec__20862_20883,(0),null);
var func__7944__auto___20885 = cljs.core.nth.call(null,vec__20862_20883,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___20884,func__7944__auto___20885);

var G__20886 = cljs.core.next.call(null,seq__20855_20877__$1);
var G__20887 = null;
var G__20888 = (0);
var G__20889 = (0);
seq__20855_20865 = G__20886;
chunk__20856_20866 = G__20887;
count__20857_20867 = G__20888;
i__20858_20868 = G__20889;
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
var seq__20900_20910 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
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
var chunk__20901_20911 = null;
var count__20902_20912 = (0);
var i__20903_20913 = (0);
while(true){
if((i__20903_20913 < count__20902_20912)){
var vec__20904_20914 = cljs.core._nth.call(null,chunk__20901_20911,i__20903_20913);
var ev__7943__auto___20915 = cljs.core.nth.call(null,vec__20904_20914,(0),null);
var func__7944__auto___20916 = cljs.core.nth.call(null,vec__20904_20914,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___20915,func__7944__auto___20916);

var G__20917 = seq__20900_20910;
var G__20918 = chunk__20901_20911;
var G__20919 = count__20902_20912;
var G__20920 = (i__20903_20913 + (1));
seq__20900_20910 = G__20917;
chunk__20901_20911 = G__20918;
count__20902_20912 = G__20919;
i__20903_20913 = G__20920;
continue;
} else {
var temp__4657__auto___20921 = cljs.core.seq.call(null,seq__20900_20910);
if(temp__4657__auto___20921){
var seq__20900_20922__$1 = temp__4657__auto___20921;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__20900_20922__$1)){
var c__7604__auto___20923 = cljs.core.chunk_first.call(null,seq__20900_20922__$1);
var G__20924 = cljs.core.chunk_rest.call(null,seq__20900_20922__$1);
var G__20925 = c__7604__auto___20923;
var G__20926 = cljs.core.count.call(null,c__7604__auto___20923);
var G__20927 = (0);
seq__20900_20910 = G__20924;
chunk__20901_20911 = G__20925;
count__20902_20912 = G__20926;
i__20903_20913 = G__20927;
continue;
} else {
var vec__20907_20928 = cljs.core.first.call(null,seq__20900_20922__$1);
var ev__7943__auto___20929 = cljs.core.nth.call(null,vec__20907_20928,(0),null);
var func__7944__auto___20930 = cljs.core.nth.call(null,vec__20907_20928,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___20929,func__7944__auto___20930);

var G__20931 = cljs.core.next.call(null,seq__20900_20922__$1);
var G__20932 = null;
var G__20933 = (0);
var G__20934 = (0);
seq__20900_20910 = G__20931;
chunk__20901_20911 = G__20932;
count__20902_20912 = G__20933;
i__20903_20913 = G__20934;
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
var seq__20945_20955 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (e){
var me_20959 = this;
lt.objs.plugins.discover_deps.call(null,plugin,((function (me_20959,e__7942__auto__){
return (function (){
lt.util.dom.remove.call(null,lt.util.dom.parent.call(null,me_20959));

lt.object.raise.call(null,lt.objs.plugins.manager,new cljs.core.Keyword(null,"refresh!","refresh!",156149341));

lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"behaviors.reload","behaviors.reload",2130924967));

return lt.util.js.wait.call(null,(1000),((function (me_20959,e__7942__auto__){
return (function (){
return lt.objs.notifos.set_msg_BANG_.call(null,[cljs.core.str("Installed "),cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(plugin)),cljs.core.str(" "),cljs.core.str(new cljs.core.Keyword(null,"version","version",425292698).cljs$core$IFn$_invoke$arity$1(plugin))].join(''));
});})(me_20959,e__7942__auto__))
);
});})(me_20959,e__7942__auto__))
);

lt.util.dom.prevent.call(null,e);

return lt.util.dom.stop_propagation.call(null,e);
});})(e__7942__auto__))
], null)));
var chunk__20946_20956 = null;
var count__20947_20957 = (0);
var i__20948_20958 = (0);
while(true){
if((i__20948_20958 < count__20947_20957)){
var vec__20949_20960 = cljs.core._nth.call(null,chunk__20946_20956,i__20948_20958);
var ev__7943__auto___20961 = cljs.core.nth.call(null,vec__20949_20960,(0),null);
var func__7944__auto___20962 = cljs.core.nth.call(null,vec__20949_20960,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___20961,func__7944__auto___20962);

var G__20963 = seq__20945_20955;
var G__20964 = chunk__20946_20956;
var G__20965 = count__20947_20957;
var G__20966 = (i__20948_20958 + (1));
seq__20945_20955 = G__20963;
chunk__20946_20956 = G__20964;
count__20947_20957 = G__20965;
i__20948_20958 = G__20966;
continue;
} else {
var temp__4657__auto___20967 = cljs.core.seq.call(null,seq__20945_20955);
if(temp__4657__auto___20967){
var seq__20945_20968__$1 = temp__4657__auto___20967;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__20945_20968__$1)){
var c__7604__auto___20969 = cljs.core.chunk_first.call(null,seq__20945_20968__$1);
var G__20970 = cljs.core.chunk_rest.call(null,seq__20945_20968__$1);
var G__20971 = c__7604__auto___20969;
var G__20972 = cljs.core.count.call(null,c__7604__auto___20969);
var G__20973 = (0);
seq__20945_20955 = G__20970;
chunk__20946_20956 = G__20971;
count__20947_20957 = G__20972;
i__20948_20958 = G__20973;
continue;
} else {
var vec__20952_20974 = cljs.core.first.call(null,seq__20945_20968__$1);
var ev__7943__auto___20975 = cljs.core.nth.call(null,vec__20952_20974,(0),null);
var func__7944__auto___20976 = cljs.core.nth.call(null,vec__20952_20974,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___20975,func__7944__auto___20976);

var G__20977 = cljs.core.next.call(null,seq__20945_20968__$1);
var G__20978 = null;
var G__20979 = (0);
var G__20980 = (0);
seq__20945_20955 = G__20977;
chunk__20946_20956 = G__20978;
count__20947_20957 = G__20979;
i__20948_20958 = G__20980;
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
var seq__20991_21001 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (e){
lt.util.dom.prevent.call(null,e);

lt.util.dom.stop_propagation.call(null,e);

return lt.objs.platform.open_url.call(null,new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$2(plugin,new cljs.core.Keyword(null,"source","source",-433931539).cljs$core$IFn$_invoke$arity$1(plugin)));
});})(e__7942__auto__))
], null)));
var chunk__20992_21002 = null;
var count__20993_21003 = (0);
var i__20994_21004 = (0);
while(true){
if((i__20994_21004 < count__20993_21003)){
var vec__20995_21005 = cljs.core._nth.call(null,chunk__20992_21002,i__20994_21004);
var ev__7943__auto___21006 = cljs.core.nth.call(null,vec__20995_21005,(0),null);
var func__7944__auto___21007 = cljs.core.nth.call(null,vec__20995_21005,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21006,func__7944__auto___21007);

var G__21008 = seq__20991_21001;
var G__21009 = chunk__20992_21002;
var G__21010 = count__20993_21003;
var G__21011 = (i__20994_21004 + (1));
seq__20991_21001 = G__21008;
chunk__20992_21002 = G__21009;
count__20993_21003 = G__21010;
i__20994_21004 = G__21011;
continue;
} else {
var temp__4657__auto___21012 = cljs.core.seq.call(null,seq__20991_21001);
if(temp__4657__auto___21012){
var seq__20991_21013__$1 = temp__4657__auto___21012;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__20991_21013__$1)){
var c__7604__auto___21014 = cljs.core.chunk_first.call(null,seq__20991_21013__$1);
var G__21015 = cljs.core.chunk_rest.call(null,seq__20991_21013__$1);
var G__21016 = c__7604__auto___21014;
var G__21017 = cljs.core.count.call(null,c__7604__auto___21014);
var G__21018 = (0);
seq__20991_21001 = G__21015;
chunk__20992_21002 = G__21016;
count__20993_21003 = G__21017;
i__20994_21004 = G__21018;
continue;
} else {
var vec__20998_21019 = cljs.core.first.call(null,seq__20991_21013__$1);
var ev__7943__auto___21020 = cljs.core.nth.call(null,vec__20998_21019,(0),null);
var func__7944__auto___21021 = cljs.core.nth.call(null,vec__20998_21019,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21020,func__7944__auto___21021);

var G__21022 = cljs.core.next.call(null,seq__20991_21013__$1);
var G__21023 = null;
var G__21024 = (0);
var G__21025 = (0);
seq__20991_21001 = G__21022;
chunk__20992_21002 = G__21023;
count__20993_21003 = G__21024;
i__20994_21004 = G__21025;
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
var seq__21036_21046 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),cljs.core.PersistentVector.EMPTY));
var chunk__21037_21047 = null;
var count__21038_21048 = (0);
var i__21039_21049 = (0);
while(true){
if((i__21039_21049 < count__21038_21048)){
var vec__21040_21050 = cljs.core._nth.call(null,chunk__21037_21047,i__21039_21049);
var ev__7943__auto___21051 = cljs.core.nth.call(null,vec__21040_21050,(0),null);
var func__7944__auto___21052 = cljs.core.nth.call(null,vec__21040_21050,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21051,func__7944__auto___21052);

var G__21053 = seq__21036_21046;
var G__21054 = chunk__21037_21047;
var G__21055 = count__21038_21048;
var G__21056 = (i__21039_21049 + (1));
seq__21036_21046 = G__21053;
chunk__21037_21047 = G__21054;
count__21038_21048 = G__21055;
i__21039_21049 = G__21056;
continue;
} else {
var temp__4657__auto___21057 = cljs.core.seq.call(null,seq__21036_21046);
if(temp__4657__auto___21057){
var seq__21036_21058__$1 = temp__4657__auto___21057;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__21036_21058__$1)){
var c__7604__auto___21059 = cljs.core.chunk_first.call(null,seq__21036_21058__$1);
var G__21060 = cljs.core.chunk_rest.call(null,seq__21036_21058__$1);
var G__21061 = c__7604__auto___21059;
var G__21062 = cljs.core.count.call(null,c__7604__auto___21059);
var G__21063 = (0);
seq__21036_21046 = G__21060;
chunk__21037_21047 = G__21061;
count__21038_21048 = G__21062;
i__21039_21049 = G__21063;
continue;
} else {
var vec__21043_21064 = cljs.core.first.call(null,seq__21036_21058__$1);
var ev__7943__auto___21065 = cljs.core.nth.call(null,vec__21043_21064,(0),null);
var func__7944__auto___21066 = cljs.core.nth.call(null,vec__21043_21064,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21065,func__7944__auto___21066);

var G__21067 = cljs.core.next.call(null,seq__21036_21058__$1);
var G__21068 = null;
var G__21069 = (0);
var G__21070 = (0);
seq__21036_21046 = G__21067;
chunk__21037_21047 = G__21068;
count__21038_21048 = G__21069;
i__21039_21049 = G__21070;
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
var seq__21081_21091 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),cljs.core.PersistentVector.EMPTY));
var chunk__21082_21092 = null;
var count__21083_21093 = (0);
var i__21084_21094 = (0);
while(true){
if((i__21084_21094 < count__21083_21093)){
var vec__21085_21095 = cljs.core._nth.call(null,chunk__21082_21092,i__21084_21094);
var ev__7943__auto___21096 = cljs.core.nth.call(null,vec__21085_21095,(0),null);
var func__7944__auto___21097 = cljs.core.nth.call(null,vec__21085_21095,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21096,func__7944__auto___21097);

var G__21098 = seq__21081_21091;
var G__21099 = chunk__21082_21092;
var G__21100 = count__21083_21093;
var G__21101 = (i__21084_21094 + (1));
seq__21081_21091 = G__21098;
chunk__21082_21092 = G__21099;
count__21083_21093 = G__21100;
i__21084_21094 = G__21101;
continue;
} else {
var temp__4657__auto___21102 = cljs.core.seq.call(null,seq__21081_21091);
if(temp__4657__auto___21102){
var seq__21081_21103__$1 = temp__4657__auto___21102;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__21081_21103__$1)){
var c__7604__auto___21104 = cljs.core.chunk_first.call(null,seq__21081_21103__$1);
var G__21105 = cljs.core.chunk_rest.call(null,seq__21081_21103__$1);
var G__21106 = c__7604__auto___21104;
var G__21107 = cljs.core.count.call(null,c__7604__auto___21104);
var G__21108 = (0);
seq__21081_21091 = G__21105;
chunk__21082_21092 = G__21106;
count__21083_21093 = G__21107;
i__21084_21094 = G__21108;
continue;
} else {
var vec__21088_21109 = cljs.core.first.call(null,seq__21081_21103__$1);
var ev__7943__auto___21110 = cljs.core.nth.call(null,vec__21088_21109,(0),null);
var func__7944__auto___21111 = cljs.core.nth.call(null,vec__21088_21109,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21110,func__7944__auto___21111);

var G__21112 = cljs.core.next.call(null,seq__21081_21103__$1);
var G__21113 = null;
var G__21114 = (0);
var G__21115 = (0);
seq__21081_21091 = G__21112;
chunk__21082_21092 = G__21113;
count__21083_21093 = G__21114;
i__21084_21094 = G__21115;
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
var seq__21126_21136 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (){
return lt.objs.popup.popup_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"header","header",119441134),"Uninstall plugin?",new cljs.core.Keyword(null,"body","body",-2049205669),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),"This will delete the plugin from your system, removing any local\n                                 changes you may have made, and cannot be undone."], null),new cljs.core.Keyword(null,"buttons","buttons",-1953831197),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"Delete plugin",new cljs.core.Keyword(null,"action","action",-811238024),((function (e__7942__auto__){
return (function (){
return lt.objs.plugins.uninstall.call(null,plugin);
});})(e__7942__auto__))
], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1718410804),"Cancel"], null)], null)], null));
});})(e__7942__auto__))
], null)));
var chunk__21127_21137 = null;
var count__21128_21138 = (0);
var i__21129_21139 = (0);
while(true){
if((i__21129_21139 < count__21128_21138)){
var vec__21130_21140 = cljs.core._nth.call(null,chunk__21127_21137,i__21129_21139);
var ev__7943__auto___21141 = cljs.core.nth.call(null,vec__21130_21140,(0),null);
var func__7944__auto___21142 = cljs.core.nth.call(null,vec__21130_21140,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21141,func__7944__auto___21142);

var G__21143 = seq__21126_21136;
var G__21144 = chunk__21127_21137;
var G__21145 = count__21128_21138;
var G__21146 = (i__21129_21139 + (1));
seq__21126_21136 = G__21143;
chunk__21127_21137 = G__21144;
count__21128_21138 = G__21145;
i__21129_21139 = G__21146;
continue;
} else {
var temp__4657__auto___21147 = cljs.core.seq.call(null,seq__21126_21136);
if(temp__4657__auto___21147){
var seq__21126_21148__$1 = temp__4657__auto___21147;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__21126_21148__$1)){
var c__7604__auto___21149 = cljs.core.chunk_first.call(null,seq__21126_21148__$1);
var G__21150 = cljs.core.chunk_rest.call(null,seq__21126_21148__$1);
var G__21151 = c__7604__auto___21149;
var G__21152 = cljs.core.count.call(null,c__7604__auto___21149);
var G__21153 = (0);
seq__21126_21136 = G__21150;
chunk__21127_21137 = G__21151;
count__21128_21138 = G__21152;
i__21129_21139 = G__21153;
continue;
} else {
var vec__21133_21154 = cljs.core.first.call(null,seq__21126_21148__$1);
var ev__7943__auto___21155 = cljs.core.nth.call(null,vec__21133_21154,(0),null);
var func__7944__auto___21156 = cljs.core.nth.call(null,vec__21133_21154,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21155,func__7944__auto___21156);

var G__21157 = cljs.core.next.call(null,seq__21126_21148__$1);
var G__21158 = null;
var G__21159 = (0);
var G__21160 = (0);
seq__21126_21136 = G__21157;
chunk__21127_21137 = G__21158;
count__21128_21138 = G__21159;
i__21129_21139 = G__21160;
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
var seq__21171_21181 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),cljs.core.PersistentVector.EMPTY));
var chunk__21172_21182 = null;
var count__21173_21183 = (0);
var i__21174_21184 = (0);
while(true){
if((i__21174_21184 < count__21173_21183)){
var vec__21175_21185 = cljs.core._nth.call(null,chunk__21172_21182,i__21174_21184);
var ev__7943__auto___21186 = cljs.core.nth.call(null,vec__21175_21185,(0),null);
var func__7944__auto___21187 = cljs.core.nth.call(null,vec__21175_21185,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21186,func__7944__auto___21187);

var G__21188 = seq__21171_21181;
var G__21189 = chunk__21172_21182;
var G__21190 = count__21173_21183;
var G__21191 = (i__21174_21184 + (1));
seq__21171_21181 = G__21188;
chunk__21172_21182 = G__21189;
count__21173_21183 = G__21190;
i__21174_21184 = G__21191;
continue;
} else {
var temp__4657__auto___21192 = cljs.core.seq.call(null,seq__21171_21181);
if(temp__4657__auto___21192){
var seq__21171_21193__$1 = temp__4657__auto___21192;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__21171_21193__$1)){
var c__7604__auto___21194 = cljs.core.chunk_first.call(null,seq__21171_21193__$1);
var G__21195 = cljs.core.chunk_rest.call(null,seq__21171_21193__$1);
var G__21196 = c__7604__auto___21194;
var G__21197 = cljs.core.count.call(null,c__7604__auto___21194);
var G__21198 = (0);
seq__21171_21181 = G__21195;
chunk__21172_21182 = G__21196;
count__21173_21183 = G__21197;
i__21174_21184 = G__21198;
continue;
} else {
var vec__21178_21199 = cljs.core.first.call(null,seq__21171_21193__$1);
var ev__7943__auto___21200 = cljs.core.nth.call(null,vec__21178_21199,(0),null);
var func__7944__auto___21201 = cljs.core.nth.call(null,vec__21178_21199,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21200,func__7944__auto___21201);

var G__21202 = cljs.core.next.call(null,seq__21171_21193__$1);
var G__21203 = null;
var G__21204 = (0);
var G__21205 = (0);
seq__21171_21181 = G__21202;
chunk__21172_21182 = G__21203;
count__21173_21183 = G__21204;
i__21174_21184 = G__21205;
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

return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),crate.binding.bound.call(null,this$,(function (p1__21206_SHARP_){
return [cljs.core.str("plugin-manager"),cljs.core.str(((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"tab","tab",-559583621).cljs$core$IFn$_invoke$arity$1(p1__21206_SHARP_),new cljs.core.Keyword(null,"server","server",1499190120)))?" server":null))].join('');
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
return (function (p1__21207_SHARP_){
return lt.objs.plugins.installed_QMARK_.call(null,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(p1__21207_SHARP_));
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
var plugin_name = (function (){var G__21211 = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(plugin_edn);
if(cljs.core.truth_(G__21211)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("User plugin doesn't have a :name"),cljs.core.str("\n"),cljs.core.str("G__21211")].join('')));
}

return G__21211;
})();
var deps = cljs.core.into.call(null,cljs.core.sorted_map.call(null),cljs.core.map.call(null,cljs.core.juxt.call(null,new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"version","version",425292698)),cljs.core.remove.call(null,((function (plugin_edn_file,plugin_edn,plugin_name){
return (function (p1__21208_SHARP_){
return cljs.core.contains_QMARK_.call(null,cljs.core.PersistentHashSet.fromArray([plugin_name], true),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(p1__21208_SHARP_));
});})(plugin_edn_file,plugin_edn,plugin_name))
,cljs.core.vals.call(null,plugin_maps))));
var plugin_edn_body = cljs.core.pr_str.call(null,cljs.core.assoc.call(null,plugin_edn,new cljs.core.Keyword(null,"dependencies","dependencies",1108064605),deps));
return lt.objs.files.save.call(null,plugin_edn_file,clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,clojure.string.replace.call(null,plugin_edn_body,/(\"\s*,|\{|\},)/,((function (plugin_edn_file,plugin_edn,plugin_name,deps,plugin_edn_body){
return (function (p1__21209_SHARP_){
return [cljs.core.str(p1__21209_SHARP_),cljs.core.str("\n")].join('');
});})(plugin_edn_file,plugin_edn,plugin_name,deps,plugin_edn_body))
),/^\{\n/,"{"),/:dependencies/,";; Do not edit - :dependencies are auto-generated\n:dependencies"));
});
/**
 * 
 */
lt.objs.plugins.__BEH__save_user_plugin_dependencies = (function lt$objs$plugins$__BEH__save_user_plugin_dependencies(var_args){
var args__7875__auto__ = [];
var len__7868__auto___21214 = arguments.length;
var i__7869__auto___21215 = (0);
while(true){
if((i__7869__auto___21215 < len__7868__auto___21214)){
args__7875__auto__.push((arguments[i__7869__auto___21215]));

var G__21216 = (i__7869__auto___21215 + (1));
i__7869__auto___21215 = G__21216;
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

lt.objs.plugins.__BEH__save_user_plugin_dependencies.cljs$lang$applyTo = (function (seq21212){
var G__21213 = cljs.core.first.call(null,seq21212);
var seq21212__$1 = cljs.core.next.call(null,seq21212);
return lt.objs.plugins.__BEH__save_user_plugin_dependencies.cljs$core$IFn$_invoke$arity$variadic(G__21213,seq21212__$1);
});


lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.plugins","save-user-plugin-dependencies","lt.objs.plugins/save-user-plugin-dependencies",1116558032),new cljs.core.Keyword(null,"desc","desc",2093485764),"Saves dependencies to user's plugin.edn",new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"refresh!","refresh!",156149341),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.plugins.__BEH__save_user_plugin_dependencies);
/**
 * 
 */
lt.objs.plugins.__BEH__render_installed_plugins = (function lt$objs$plugins$__BEH__render_installed_plugins(var_args){
var args__7875__auto__ = [];
var len__7868__auto___21223 = arguments.length;
var i__7869__auto___21224 = (0);
while(true){
if((i__7869__auto___21224 < len__7868__auto___21223)){
args__7875__auto__.push((arguments[i__7869__auto___21224]));

var G__21225 = (i__7869__auto___21224 + (1));
i__7869__auto___21224 = G__21225;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((1) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((1)),(0),null)):null);
return lt.objs.plugins.__BEH__render_installed_plugins.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7876__auto__);
});

lt.objs.plugins.__BEH__render_installed_plugins.cljs$core$IFn$_invoke$arity$variadic = (function (this$,p__21220){
var map__21221 = p__21220;
var map__21221__$1 = ((((!((map__21221 == null)))?((((map__21221.cljs$lang$protocol_mask$partition0$ & (64))) || (map__21221.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__21221):map__21221);
var ignore_missing = cljs.core.get.call(null,map__21221__$1,new cljs.core.Keyword(null,"ignore-missing","ignore-missing",836103362));
lt.object.merge_BANG_.call(null,lt.objs.app.app,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("lt.objs.plugins","plugins","lt.objs.plugins/plugins",-1345299551),lt.objs.plugins.available_plugins.call(null)], null));

if(cljs.core.truth_(ignore_missing)){
} else {
lt.objs.plugins.check_missing.call(null,new cljs.core.Keyword("lt.objs.plugins","plugins","lt.objs.plugins/plugins",-1345299551).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.app.app)));
}

var ul = lt.util.dom.$.call(null,new cljs.core.Keyword(null,".plugins",".plugins",425396696),lt.object.__GT_content.call(null,this$));
lt.util.dom.empty.call(null,ul);

return lt.util.dom.append.call(null,ul,lt.util.dom.fragment.call(null,cljs.core.map.call(null,lt.objs.plugins.installed_plugin_ui,cljs.core.sort_by.call(null,((function (ul,map__21221,map__21221__$1,ignore_missing){
return (function (p1__21217_SHARP_){
return new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(p1__21217_SHARP_).toUpperCase();
});})(ul,map__21221,map__21221__$1,ignore_missing))
,cljs.core.vals.call(null,new cljs.core.Keyword("lt.objs.plugins","plugins","lt.objs.plugins/plugins",-1345299551).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.app.app)))))));
});

lt.objs.plugins.__BEH__render_installed_plugins.cljs$lang$maxFixedArity = (1);

lt.objs.plugins.__BEH__render_installed_plugins.cljs$lang$applyTo = (function (seq21218){
var G__21219 = cljs.core.first.call(null,seq21218);
var seq21218__$1 = cljs.core.next.call(null,seq21218);
return lt.objs.plugins.__BEH__render_installed_plugins.cljs$core$IFn$_invoke$arity$variadic(G__21219,seq21218__$1);
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
var seq__21226 = cljs.core.seq.call(null,outdated);
var chunk__21229 = null;
var count__21230 = (0);
var i__21231 = (0);
while(true){
if((i__21231 < count__21230)){
var plugin = cljs.core._nth.call(null,chunk__21229,i__21231);
if(cljs.core.seq.call(null,outdated)){
var cached_21234 = new cljs.core.Keyword(null,"latest-version","latest-version",-1985110248).cljs$core$IFn$_invoke$arity$1(cljs.core.get.call(null,new cljs.core.Keyword(null,"server-plugins","server-plugins",-514262131).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.plugins.manager)),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(plugin)));
lt.objs.plugins.discover_deps.call(null,cljs.core.assoc.call(null,plugin,new cljs.core.Keyword(null,"version","version",425292698),cached_21234),((function (seq__21226,chunk__21229,count__21230,i__21231,cached_21234,plugin,outdated,names,countdown){
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
});})(seq__21226,chunk__21229,count__21230,i__21231,cached_21234,plugin,outdated,names,countdown))
);

var G__21235 = seq__21226;
var G__21236 = chunk__21229;
var G__21237 = count__21230;
var G__21238 = (i__21231 + (1));
seq__21226 = G__21235;
chunk__21229 = G__21236;
count__21230 = G__21237;
i__21231 = G__21238;
continue;
} else {
var G__21239 = seq__21226;
var G__21240 = chunk__21229;
var G__21241 = count__21230;
var G__21242 = (i__21231 + (1));
seq__21226 = G__21239;
chunk__21229 = G__21240;
count__21230 = G__21241;
i__21231 = G__21242;
continue;
}
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__21226);
if(temp__4657__auto__){
var seq__21226__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__21226__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__21226__$1);
var G__21243 = cljs.core.chunk_rest.call(null,seq__21226__$1);
var G__21244 = c__7604__auto__;
var G__21245 = cljs.core.count.call(null,c__7604__auto__);
var G__21246 = (0);
seq__21226 = G__21243;
chunk__21229 = G__21244;
count__21230 = G__21245;
i__21231 = G__21246;
continue;
} else {
var plugin = cljs.core.first.call(null,seq__21226__$1);
if(cljs.core.seq.call(null,outdated)){
var cached_21247 = new cljs.core.Keyword(null,"latest-version","latest-version",-1985110248).cljs$core$IFn$_invoke$arity$1(cljs.core.get.call(null,new cljs.core.Keyword(null,"server-plugins","server-plugins",-514262131).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.plugins.manager)),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(plugin)));
lt.objs.plugins.discover_deps.call(null,cljs.core.assoc.call(null,plugin,new cljs.core.Keyword(null,"version","version",425292698),cached_21247),((function (seq__21226,chunk__21229,count__21230,i__21231,cached_21247,plugin,seq__21226__$1,temp__4657__auto__,outdated,names,countdown){
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
});})(seq__21226,chunk__21229,count__21230,i__21231,cached_21247,plugin,seq__21226__$1,temp__4657__auto__,outdated,names,countdown))
);

var G__21248 = cljs.core.next.call(null,seq__21226__$1);
var G__21249 = null;
var G__21250 = (0);
var G__21251 = (0);
seq__21226 = G__21248;
chunk__21229 = G__21249;
count__21230 = G__21250;
i__21231 = G__21251;
continue;
} else {
var G__21252 = cljs.core.next.call(null,seq__21226__$1);
var G__21253 = null;
var G__21254 = (0);
var G__21255 = (0);
seq__21226 = G__21252;
chunk__21229 = G__21253;
count__21230 = G__21254;
i__21231 = G__21255;
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
var _STAR_plugin_dir_STAR_21265 = lt.objs.plugins._STAR_plugin_dir_STAR_;
var _STAR_force_reload_STAR_21266 = lt.util.load._STAR_force_reload_STAR_;
lt.objs.plugins._STAR_plugin_dir_STAR_ = new cljs.core.Keyword("lt.objs.plugins","dir","lt.objs.plugins/dir",651688593).cljs$core$IFn$_invoke$arity$1(lt.object._STAR_behavior_meta_STAR_);

lt.util.load._STAR_force_reload_STAR_ = new cljs.core.Keyword("lt.objs.plugins","force-reload","lt.objs.plugins/force-reload",180193649).cljs$core$IFn$_invoke$arity$1(lt.object._STAR_behavior_meta_STAR_);

try{var paths = ((cljs.core.coll_QMARK_.call(null,path))?path:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [path], null));
var seq__21267 = cljs.core.seq.call(null,paths);
var chunk__21268 = null;
var count__21269 = (0);
var i__21270 = (0);
while(true){
if((i__21270 < count__21269)){
var path__$1 = cljs.core._nth.call(null,chunk__21268,i__21270);
var path_21273__$2 = lt.objs.plugins.adjust_path.call(null,path__$1);
if(cljs.core.truth_((function (){var or__6793__auto__ = lt.util.load._STAR_force_reload_STAR_;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return cljs.core.not.call(null,cljs.core.get.call(null,new cljs.core.Keyword("lt.objs.plugins","loaded-files","lt.objs.plugins/loaded-files",-79546456).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),path_21273__$2));
}
})())){
try{lt.util.load.js.call(null,path_21273__$2,true);

lt.object.update_BANG_.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("lt.objs.plugins","loaded-files","lt.objs.plugins/loaded-files",-79546456)], null),((function (seq__21267,chunk__21268,count__21269,i__21270,path_21273__$2,path__$1,paths,_STAR_plugin_dir_STAR_21265,_STAR_force_reload_STAR_21266){
return (function (p1__21256_SHARP_){
return cljs.core.conj.call(null,(function (){var or__6793__auto__ = p1__21256_SHARP_;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return cljs.core.PersistentHashSet.EMPTY;
}
})(),path_21273__$2);
});})(seq__21267,chunk__21268,count__21269,i__21270,path_21273__$2,path__$1,paths,_STAR_plugin_dir_STAR_21265,_STAR_force_reload_STAR_21266))
);
}catch (e21271){var e_21274 = e21271;
lt.objs.console.error.call(null,[cljs.core.str("Error loading JS file: "),cljs.core.str(path_21273__$2),cljs.core.str(" : "),cljs.core.str(e_21274)].join(''),e_21274);
}} else {
}

var G__21275 = seq__21267;
var G__21276 = chunk__21268;
var G__21277 = count__21269;
var G__21278 = (i__21270 + (1));
seq__21267 = G__21275;
chunk__21268 = G__21276;
count__21269 = G__21277;
i__21270 = G__21278;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__21267);
if(temp__4657__auto__){
var seq__21267__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__21267__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__21267__$1);
var G__21279 = cljs.core.chunk_rest.call(null,seq__21267__$1);
var G__21280 = c__7604__auto__;
var G__21281 = cljs.core.count.call(null,c__7604__auto__);
var G__21282 = (0);
seq__21267 = G__21279;
chunk__21268 = G__21280;
count__21269 = G__21281;
i__21270 = G__21282;
continue;
} else {
var path__$1 = cljs.core.first.call(null,seq__21267__$1);
var path_21283__$2 = lt.objs.plugins.adjust_path.call(null,path__$1);
if(cljs.core.truth_((function (){var or__6793__auto__ = lt.util.load._STAR_force_reload_STAR_;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return cljs.core.not.call(null,cljs.core.get.call(null,new cljs.core.Keyword("lt.objs.plugins","loaded-files","lt.objs.plugins/loaded-files",-79546456).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),path_21283__$2));
}
})())){
try{lt.util.load.js.call(null,path_21283__$2,true);

lt.object.update_BANG_.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("lt.objs.plugins","loaded-files","lt.objs.plugins/loaded-files",-79546456)], null),((function (seq__21267,chunk__21268,count__21269,i__21270,path_21283__$2,path__$1,seq__21267__$1,temp__4657__auto__,paths,_STAR_plugin_dir_STAR_21265,_STAR_force_reload_STAR_21266){
return (function (p1__21256_SHARP_){
return cljs.core.conj.call(null,(function (){var or__6793__auto__ = p1__21256_SHARP_;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return cljs.core.PersistentHashSet.EMPTY;
}
})(),path_21283__$2);
});})(seq__21267,chunk__21268,count__21269,i__21270,path_21283__$2,path__$1,seq__21267__$1,temp__4657__auto__,paths,_STAR_plugin_dir_STAR_21265,_STAR_force_reload_STAR_21266))
);
}catch (e21272){var e_21284 = e21272;
lt.objs.console.error.call(null,[cljs.core.str("Error loading JS file: "),cljs.core.str(path_21283__$2),cljs.core.str(" : "),cljs.core.str(e_21284)].join(''),e_21284);
}} else {
}

var G__21285 = cljs.core.next.call(null,seq__21267__$1);
var G__21286 = null;
var G__21287 = (0);
var G__21288 = (0);
seq__21267 = G__21285;
chunk__21268 = G__21286;
count__21269 = G__21287;
i__21270 = G__21288;
continue;
}
} else {
return null;
}
}
break;
}
}finally {lt.util.load._STAR_force_reload_STAR_ = _STAR_force_reload_STAR_21266;

lt.objs.plugins._STAR_plugin_dir_STAR_ = _STAR_plugin_dir_STAR_21265;
}});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.plugins","load-js","lt.objs.plugins/load-js",-1745643293),new cljs.core.Keyword(null,"desc","desc",2093485764),"App: Load javascript file(s)",new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1718410804),"path(s)"], null)], null),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"object.instant-load","object.instant-load",853728870),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.plugins.__BEH__load_js);
/**
 * 
 */
lt.objs.plugins.__BEH__load_css = (function lt$objs$plugins$__BEH__load_css(this$,path){
var paths = cljs.core.map.call(null,lt.objs.plugins.adjust_path,((cljs.core.coll_QMARK_.call(null,path))?path:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [path], null)));
var seq__21294 = cljs.core.seq.call(null,paths);
var chunk__21295 = null;
var count__21296 = (0);
var i__21297 = (0);
while(true){
if((i__21297 < count__21296)){
var path__$1 = cljs.core._nth.call(null,chunk__21295,i__21297);
if(cljs.core.truth_((function (){var or__6793__auto__ = lt.util.load._STAR_force_reload_STAR_;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return cljs.core.not.call(null,cljs.core.get.call(null,new cljs.core.Keyword("lt.objs.plugins","loaded-files","lt.objs.plugins/loaded-files",-79546456).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),path__$1));
}
})())){
lt.object.update_BANG_.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("lt.objs.plugins","loaded-files","lt.objs.plugins/loaded-files",-79546456)], null),((function (seq__21294,chunk__21295,count__21296,i__21297,path__$1,paths){
return (function (p1__21289_SHARP_){
return cljs.core.conj.call(null,(function (){var or__6793__auto__ = p1__21289_SHARP_;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return cljs.core.PersistentHashSet.EMPTY;
}
})(),path__$1);
});})(seq__21294,chunk__21295,count__21296,i__21297,path__$1,paths))
);

lt.util.load.css.call(null,path__$1);
} else {
}

var G__21298 = seq__21294;
var G__21299 = chunk__21295;
var G__21300 = count__21296;
var G__21301 = (i__21297 + (1));
seq__21294 = G__21298;
chunk__21295 = G__21299;
count__21296 = G__21300;
i__21297 = G__21301;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__21294);
if(temp__4657__auto__){
var seq__21294__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__21294__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__21294__$1);
var G__21302 = cljs.core.chunk_rest.call(null,seq__21294__$1);
var G__21303 = c__7604__auto__;
var G__21304 = cljs.core.count.call(null,c__7604__auto__);
var G__21305 = (0);
seq__21294 = G__21302;
chunk__21295 = G__21303;
count__21296 = G__21304;
i__21297 = G__21305;
continue;
} else {
var path__$1 = cljs.core.first.call(null,seq__21294__$1);
if(cljs.core.truth_((function (){var or__6793__auto__ = lt.util.load._STAR_force_reload_STAR_;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return cljs.core.not.call(null,cljs.core.get.call(null,new cljs.core.Keyword("lt.objs.plugins","loaded-files","lt.objs.plugins/loaded-files",-79546456).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),path__$1));
}
})())){
lt.object.update_BANG_.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("lt.objs.plugins","loaded-files","lt.objs.plugins/loaded-files",-79546456)], null),((function (seq__21294,chunk__21295,count__21296,i__21297,path__$1,seq__21294__$1,temp__4657__auto__,paths){
return (function (p1__21289_SHARP_){
return cljs.core.conj.call(null,(function (){var or__6793__auto__ = p1__21289_SHARP_;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return cljs.core.PersistentHashSet.EMPTY;
}
})(),path__$1);
});})(seq__21294,chunk__21295,count__21296,i__21297,path__$1,seq__21294__$1,temp__4657__auto__,paths))
);

lt.util.load.css.call(null,path__$1);
} else {
}

var G__21306 = cljs.core.next.call(null,seq__21294__$1);
var G__21307 = null;
var G__21308 = (0);
var G__21309 = (0);
seq__21294 = G__21306;
chunk__21295 = G__21307;
count__21296 = G__21308;
i__21297 = G__21309;
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
