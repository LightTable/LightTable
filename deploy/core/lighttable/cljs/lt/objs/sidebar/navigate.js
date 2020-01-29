// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.objs.sidebar.navigate');
goog.require('cljs.core');
goog.require('lt.objs.sidebar.command');
goog.require('lt.objs.notifos');
goog.require('lt.objs.context');
goog.require('lt.objs.opener');
goog.require('lt.objs.thread');
goog.require('crate.core');
goog.require('lt.object');
goog.require('lt.util.dom');
goog.require('lt.objs.keyboard');
goog.require('lt.util.load');
goog.require('lt.objs.workspace');
goog.require('lt.objs.files');
goog.require('lt.objs.sidebar');
goog.require('crate.binding');
lt.objs.sidebar.navigate.file_filters = (function lt$objs$sidebar$navigate$file_filters(f){
return cljs.core.re_seq.call(null,lt.objs.files.ignore_pattern,f);
});
lt.objs.sidebar.navigate.populate_bg = lt.objs.thread.thread_STAR_.call(null,(function lt$objs$sidebar$navigate$tfun21518(){
console.log("BACKGROUND:");

console.log("ARGS:",arguments);

console.log("ARR:",argsArray(arguments));

var orig__8016__auto__ = argsArray(arguments);
var msg__8017__auto__ = orig__8016__auto__.shift();
var args__8018__auto__ = orig__8016__auto__.map(cljs.reader.read_string);
var raise = ((function (orig__8016__auto__,msg__8017__auto__,args__8018__auto__){
return (function (obj__8019__auto__,k__8020__auto__,v__8021__auto__){
return _send(obj__8019__auto__,k__8020__auto__,cljs.core.pr_str.call(null,v__8021__auto__),"clj");
});})(orig__8016__auto__,msg__8017__auto__,args__8018__auto__))
;
console.log("MAPARG:",cljs.core.pr_str.call(null,cljs.core.cons.call(null,msg__8017__auto__.obj,args__8018__auto__)),cljs.core.pr_str.call(null,args__8018__auto__));

console.log("MAPARG2:",cljs.core.pr_str.call(null,cljs.core.to_array.call(null,cljs.core.cons.call(null,msg__8017__auto__.obj,args__8018__auto__))),cljs.core.pr_str.call(null,args__8018__auto__));

return ((function (orig__8016__auto__,msg__8017__auto__,args__8018__auto__,raise){
return (function (obj_id,p__21528){
var map__21529 = p__21528;
var map__21529__$1 = ((((!((map__21529 == null)))?((((map__21529.cljs$lang$protocol_mask$partition0$ & (64))) || (map__21529.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__21529):map__21529);
var lim = cljs.core.get.call(null,map__21529__$1,new cljs.core.Keyword(null,"lim","lim",1172958742));
var pattern = cljs.core.get.call(null,map__21529__$1,new cljs.core.Keyword(null,"pattern","pattern",242135423));
var ws = cljs.core.get.call(null,map__21529__$1,new cljs.core.Keyword(null,"ws","ws",86841443));
var fs = require("fs");
var fpath = require("path");
var walkdir = require([cljs.core.str(ltpath),cljs.core.str("/core/node_modules/lighttable/background/walkdir2.js")].join(''));
var grab_files = ((function (fs,fpath,walkdir,map__21529,map__21529__$1,lim,pattern,ws,orig__8016__auto__,msg__8017__auto__,args__8018__auto__,raise){
return (function (all_files,folder){
var root_length = (cljs.core.count.call(null,fpath.dirname(folder)) + (1));
var walked = walkdir.call(null,folder,(function (){var obj21532 = {"filter":(new RegExp(pattern)),"limit":lim};
return obj21532;
})());
return all_files.concat(walked.paths.map(((function (root_length,walked,fs,fpath,walkdir,map__21529,map__21529__$1,lim,pattern,ws,orig__8016__auto__,msg__8017__auto__,args__8018__auto__,raise){
return (function (p1__21516_SHARP_){
var obj21534 = {"full":p1__21516_SHARP_,"rel":cljs.core.subs.call(null,p1__21516_SHARP_,root_length)};
return obj21534;
});})(root_length,walked,fs,fpath,walkdir,map__21529,map__21529__$1,lim,pattern,ws,orig__8016__auto__,msg__8017__auto__,args__8018__auto__,raise))
));
});})(fs,fpath,walkdir,map__21529,map__21529__$1,lim,pattern,ws,orig__8016__auto__,msg__8017__auto__,args__8018__auto__,raise))
;
var all_files = cljs.core.to_array.call(null,new cljs.core.Keyword(null,"folders","folders",44248772).cljs$core$IFn$_invoke$arity$1(ws)).reduce(grab_files,[]);
var other_files = cljs.core.to_array.call(null,new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(ws)).map(((function (fs,fpath,walkdir,grab_files,all_files,map__21529,map__21529__$1,lim,pattern,ws,orig__8016__auto__,msg__8017__auto__,args__8018__auto__,raise){
return (function (p1__21517_SHARP_){
var obj21536 = {"full":p1__21517_SHARP_,"rel":fpath.basename(p1__21517_SHARP_)};
return obj21536;
});})(fs,fpath,walkdir,grab_files,all_files,map__21529,map__21529__$1,lim,pattern,ws,orig__8016__auto__,msg__8017__auto__,args__8018__auto__,raise))
);
var final$ = all_files.concat(other_files);
return _send(obj_id,new cljs.core.Keyword(null,"workspace-files","workspace-files",2129954136),final$);
});})(orig__8016__auto__,msg__8017__auto__,args__8018__auto__,raise))
.apply(null,cljs.core.to_array.call(null,cljs.core.cons.call(null,msg__8017__auto__.obj,args__8018__auto__)));
}));
/**
 * 
 */
lt.objs.sidebar.navigate.__BEH__workspace_files = (function lt$objs$sidebar$navigate$__BEH__workspace_files(this$,files){
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"files","files",-472457450),cljs.core.js__GT_clj.call(null,files,new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true)], null));

return lt.object.raise.call(null,new cljs.core.Keyword(null,"filter-list","filter-list",-321279505).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),new cljs.core.Keyword(null,"refresh!","refresh!",156149341));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.navigate","workspace-files","lt.objs.sidebar.navigate/workspace-files",-2078974809),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"workspace-files","workspace-files",2129954136),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.navigate.__BEH__workspace_files);
/**
 * 
 */
lt.objs.sidebar.navigate.__BEH__populate_on_ws_update = (function lt$objs$sidebar$navigate$__BEH__populate_on_ws_update(ws){
return lt.objs.sidebar.navigate.populate_bg.call(null,lt.objs.sidebar.navigate.sidebar_navigate,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"lim","lim",1172958742),(new cljs.core.Keyword(null,"file-limit","file-limit",-954194843).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.sidebar.navigate.sidebar_navigate)) - (1)),new cljs.core.Keyword(null,"pattern","pattern",242135423),lt.objs.files.ignore_pattern.source,new cljs.core.Keyword(null,"ws","ws",86841443),lt.objs.workspace.serialize.call(null,cljs.core.deref.call(null,ws))], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.navigate","populate-on-ws-update","lt.objs.sidebar.navigate/populate-on-ws-update",718436176),new cljs.core.Keyword(null,"debounce","debounce",-871550296),(150),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"refresh","refresh",1947415525),null,new cljs.core.Keyword(null,"updated","updated",-1627192056),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.navigate.__BEH__populate_on_ws_update);
/**
 * 
 */
lt.objs.sidebar.navigate.__BEH__watched__DOT__create = (function lt$objs$sidebar$navigate$__BEH__watched__DOT__create(ws,path){
if(cljs.core.truth_(lt.objs.sidebar.navigate.file_filters.call(null,lt.objs.files.basename.call(null,path)))){
return null;
} else {
var ws_parent = lt.objs.files.parent.call(null,cljs.core.first.call(null,cljs.core.filter.call(null,(function (p1__21537_SHARP_){
return cljs.core._EQ_.call(null,(0),path.indexOf(p1__21537_SHARP_));
}),new cljs.core.Keyword(null,"folders","folders",44248772).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ws)))));
var rel_length = (cljs.core.count.call(null,ws_parent) + (1));
lt.object.update_BANG_.call(null,lt.objs.sidebar.navigate.sidebar_navigate,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"files","files",-472457450)], null),cljs.core.conj,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"full","full",436801220),path,new cljs.core.Keyword(null,"rel","rel",1378823488),cljs.core.subs.call(null,path,rel_length)], null));

return lt.object.raise.call(null,new cljs.core.Keyword(null,"filter-list","filter-list",-321279505).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.sidebar.navigate.sidebar_navigate)),new cljs.core.Keyword(null,"refresh!","refresh!",156149341));
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.navigate","watched.create","lt.objs.sidebar.navigate/watched.create",-531926899),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"watched.create","watched.create",1567266238),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.navigate.__BEH__watched__DOT__create);
/**
 * 
 */
lt.objs.sidebar.navigate.__BEH__watched__DOT__delete = (function lt$objs$sidebar$navigate$__BEH__watched__DOT__delete(ws,path){
lt.object.update_BANG_.call(null,lt.objs.sidebar.navigate.sidebar_navigate,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"files","files",-472457450)], null),(function (p1__21538_SHARP_){
return cljs.core.remove.call(null,(function (x){
return cljs.core._EQ_.call(null,(0),new cljs.core.Keyword(null,"full","full",436801220).cljs$core$IFn$_invoke$arity$1(x).indexOf(path));
}),p1__21538_SHARP_);
}));

return lt.object.raise.call(null,new cljs.core.Keyword(null,"filter-list","filter-list",-321279505).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.sidebar.navigate.sidebar_navigate)),new cljs.core.Keyword(null,"refresh!","refresh!",156149341));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.navigate","watched.delete","lt.objs.sidebar.navigate/watched.delete",1927247899),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"watched.delete","watched.delete",-2013789460),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.navigate.__BEH__watched__DOT__delete);
/**
 * 
 */
lt.objs.sidebar.navigate.__BEH__focus_BANG_ = (function lt$objs$sidebar$navigate$__BEH__focus_BANG_(this$){
return lt.object.raise.call(null,new cljs.core.Keyword(null,"filter-list","filter-list",-321279505).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),new cljs.core.Keyword(null,"focus!","focus!",-1344984927));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.navigate","focus!","lt.objs.sidebar.navigate/focus!",-1292570286),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"focus!","focus!",-1344984927),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.navigate.__BEH__focus_BANG_);
/**
 * 
 */
lt.objs.sidebar.navigate.__BEH__focus_on_show = (function lt$objs$sidebar$navigate$__BEH__focus_on_show(this$){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"focus!","focus!",-1344984927));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.navigate","focus-on-show","lt.objs.sidebar.navigate/focus-on-show",-406818046),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"show","show",-576705889),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.navigate.__BEH__focus_on_show);
/**
 * 
 */
lt.objs.sidebar.navigate.__BEH__open_on_select = (function lt$objs$sidebar$navigate$__BEH__open_on_select(this$,cur){
return lt.object.raise.call(null,lt.objs.opener.opener,new cljs.core.Keyword(null,"open!","open!",1145596908),new cljs.core.Keyword(null,"full","full",436801220).cljs$core$IFn$_invoke$arity$1(cur));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.navigate","open-on-select","lt.objs.sidebar.navigate/open-on-select",-1297509676),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"select","select",1147833503),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.navigate.__BEH__open_on_select);
/**
 * 
 */
lt.objs.sidebar.navigate.__BEH__escape_BANG_ = (function lt$objs$sidebar$navigate$__BEH__escape_BANG_(this$){
lt.objs.sidebar.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"escape-navigate","escape-navigate",1117972736));

return lt.objs.sidebar.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"focus-last-editor","focus-last-editor",-555034320));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.navigate","escape!","lt.objs.sidebar.navigate/escape!",1902603528),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"escape!","escape!",1850102229),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.navigate.__BEH__escape_BANG_);
/**
 * 
 */
lt.objs.sidebar.navigate.__BEH__pop_transient_on_select = (function lt$objs$sidebar$navigate$__BEH__pop_transient_on_select(this$){
return lt.object.raise.call(null,lt.objs.sidebar.rightbar,new cljs.core.Keyword(null,"close!","close!",-2079310498));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.navigate","pop-transient-on-select","lt.objs.sidebar.navigate/pop-transient-on-select",-651942869),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"selected","selected",574897764),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.navigate.__BEH__pop_transient_on_select);
/**
 * 
 */
lt.objs.sidebar.navigate.__BEH__set_file_limit = (function lt$objs$sidebar$navigate$__BEH__set_file_limit(this$,n){
return lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"file-limit","file-limit",-954194843),n], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.navigate","set-file-limit","lt.objs.sidebar.navigate/set-file-limit",-1062113351),new cljs.core.Keyword(null,"desc","desc",2093485764),"Navigate: set maximum number of indexed files",new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"Number",new cljs.core.Keyword(null,"example","example",-1755779144),(8000)], null)], null),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"object.instant","object.instant",-29936727),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.sidebar.navigate.__BEH__set_file_limit);
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.sidebar.navigate","sidebar.navigate","lt.objs.sidebar.navigate/sidebar.navigate",1924909782),new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"navigator","navigator",2050004181),null], null), null),new cljs.core.Keyword(null,"label","label",1718410804),"navigate",new cljs.core.Keyword(null,"order","order",-1254677256),(-3),new cljs.core.Keyword(null,"selected","selected",574897764),(0),new cljs.core.Keyword(null,"files","files",-472457450),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"file-limit","file-limit",-954194843),(8000),new cljs.core.Keyword(null,"search","search",1564939822),"",new cljs.core.Keyword(null,"init","init",-1875481434),(function (this$){
var list = lt.objs.sidebar.command.filter_list.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"rel","rel",1378823488),new cljs.core.Keyword(null,"transform","transform",1381301764),(function (p1__21539_SHARP_,p2__21541_SHARP_,p3__21540_SHARP_){
return [cljs.core.str("<h2>"),cljs.core.str(lt.objs.files.basename.call(null,p1__21539_SHARP_)),cljs.core.str("</h2><p>"),cljs.core.str(p3__21540_SHARP_),cljs.core.str("</p>")].join('');
}),new cljs.core.Keyword(null,"items","items",1031954938),crate.binding.subatom.call(null,this$,new cljs.core.Keyword(null,"files","files",-472457450)),new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),"file"], null));
lt.object.add_tags.call(null,list,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"navigate.selector","navigate.selector",-1327991510)], null));

lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"filter-list","filter-list",-321279505),list], null));

return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.navigate","div.navigate",-797790736),lt.object.__GT_content.call(null,list)], null);
}));
lt.objs.sidebar.navigate.sidebar_navigate = lt.object.create.call(null,new cljs.core.Keyword("lt.objs.sidebar.navigate","sidebar.navigate","lt.objs.sidebar.navigate/sidebar.navigate",1924909782));
lt.objs.sidebar.add_item.call(null,lt.objs.sidebar.rightbar,lt.objs.sidebar.navigate.sidebar_navigate);
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"navigate-workspace","navigate-workspace",-1523284137),new cljs.core.Keyword(null,"desc","desc",2093485764),"Navigate: open navigate",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.object.raise.call(null,lt.objs.sidebar.rightbar,new cljs.core.Keyword(null,"toggle","toggle",1291842030),lt.objs.sidebar.navigate.sidebar_navigate,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"transient?","transient?",1694525927),false], null));
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"navigate-workspace-transient","navigate-workspace-transient",-1413476288),new cljs.core.Keyword(null,"desc","desc",2093485764),"Navigate: open navigate transient",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.object.raise.call(null,lt.objs.sidebar.rightbar,new cljs.core.Keyword(null,"toggle","toggle",1291842030),lt.objs.sidebar.navigate.sidebar_navigate,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"transient?","transient?",1694525927),true], null));
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"escape-navigate","escape-navigate",1117972736),new cljs.core.Keyword(null,"desc","desc",2093485764),"Navigate: exit navigate",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
lt.objs.sidebar.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"close-sidebar","close-sidebar",-480192451));

return lt.objs.sidebar.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"focus-last-editor","focus-last-editor",-555034320));
})], null));
