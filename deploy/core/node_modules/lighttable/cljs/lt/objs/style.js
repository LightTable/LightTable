// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.objs.style');
goog.require('cljs.core');
goog.require('lt.objs.sidebar.command');
goog.require('lt.objs.context');
goog.require('lt.objs.deploy');
goog.require('lt.objs.editor');
goog.require('lt.object');
goog.require('lt.util.dom');
goog.require('crate.compiler');
goog.require('lt.objs.app');
goog.require('lt.util.load');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.tabs');
goog.require('lt.objs.files');
goog.require('clojure.string');
goog.require('lt.objs.plugins');
goog.require('crate.binding');
lt.objs.style.css_expr = (function lt$objs$style$css_expr(k,v){
return [cljs.core.str(cljs.core.name.call(null,k)),cljs.core.str(":"),cljs.core.str(v),cljs.core.str(" !important; ")].join('');
});
lt.objs.style.selector = (function lt$objs$style$selector(var_args){
var args__7875__auto__ = [];
var len__7868__auto___21306 = arguments.length;
var i__7869__auto___21307 = (0);
while(true){
if((i__7869__auto___21307 < len__7868__auto___21306)){
args__7875__auto__.push((arguments[i__7869__auto___21307]));

var G__21308 = (i__7869__auto___21307 + (1));
i__7869__auto___21307 = G__21308;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((1) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((1)),(0),null)):null);
return lt.objs.style.selector.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7876__auto__);
});

lt.objs.style.selector.cljs$core$IFn$_invoke$arity$variadic = (function (sel,body){
return [cljs.core.str(sel),cljs.core.str(" { "),cljs.core.str(cljs.core.apply.call(null,cljs.core.str,body)),cljs.core.str(" }")].join('');
});

lt.objs.style.selector.cljs$lang$maxFixedArity = (1);

lt.objs.style.selector.cljs$lang$applyTo = (function (seq21304){
var G__21305 = cljs.core.first.call(null,seq21304);
var seq21304__$1 = cljs.core.next.call(null,seq21304);
return lt.objs.style.selector.cljs$core$IFn$_invoke$arity$variadic(G__21305,seq21304__$1);
});

lt.objs.style.str_font_family = (function lt$objs$style$str_font_family(x){
if(cljs.core.vector_QMARK_.call(null,x)){
return clojure.string.join.call(null,", ",cljs.core.map.call(null,cljs.core.pr_str,x));
} else {
return cljs.core.pr_str.call(null,x);
}
});
lt.objs.style.__GT_css = (function lt$objs$style$__GT_css(settings){
return lt.objs.style.selector.call(null,".CodeMirror",(cljs.core.truth_(new cljs.core.Keyword(null,"line-height","line-height",1870784992).cljs$core$IFn$_invoke$arity$1(settings))?lt.objs.style.css_expr.call(null,new cljs.core.Keyword(null,"line-height","line-height",1870784992),[cljs.core.str(new cljs.core.Keyword(null,"line-height","line-height",1870784992).cljs$core$IFn$_invoke$arity$1(settings)),cljs.core.str("em")].join('')):null),(cljs.core.truth_(new cljs.core.Keyword(null,"font-family","font-family",-667419874).cljs$core$IFn$_invoke$arity$1(settings))?lt.objs.style.css_expr.call(null,new cljs.core.Keyword(null,"font-family","font-family",-667419874),lt.objs.style.str_font_family.call(null,new cljs.core.Keyword(null,"font-family","font-family",-667419874).cljs$core$IFn$_invoke$arity$1(settings))):null),(cljs.core.truth_(new cljs.core.Keyword(null,"font-size","font-size",-1847940346).cljs$core$IFn$_invoke$arity$1(settings))?lt.objs.style.css_expr.call(null,new cljs.core.Keyword(null,"font-size","font-size",-1847940346),[cljs.core.str(new cljs.core.Keyword(null,"font-size","font-size",-1847940346).cljs$core$IFn$_invoke$arity$1(settings)),cljs.core.str("pt")].join('')):null));
});
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.style","styles","lt.objs.style/styles",-1424388684),new cljs.core.Keyword(null,"init","init",-1875481434),(function (this$){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),"text/css"], null),crate.binding.bound.call(null,crate.binding.subatom.call(null,this$,new cljs.core.Keyword(null,"font-settings","font-settings",-1277843564)),lt.objs.style.__GT_css)], null)], null);
}));
lt.objs.style.styles = lt.object.create.call(null,new cljs.core.Keyword("lt.objs.style","styles","lt.objs.style/styles",-1424388684),new cljs.core.Keyword(null,"theme","theme",-1247880880),"default");
/**
 * 
 */
lt.objs.style.__BEH__style_on_init = (function lt$objs$style$__BEH__style_on_init(app){
return lt.util.dom.append.call(null,lt.util.dom.$.call(null,new cljs.core.Keyword(null,"head","head",-771383919)),new cljs.core.Keyword(null,"content","content",15833224).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.style.styles)));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.style","style-on-init","lt.objs.style/style-on-init",1714420970),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"init","init",-1875481434),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.style.__BEH__style_on_init);
/**
 * 
 */
lt.objs.style.__BEH__font_settings = (function lt$objs$style$__BEH__font_settings(this$,family,size,line_height){
var final$ = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"font-family","font-family",-667419874),family], null);
var final$__$1 = (cljs.core.truth_(size)?cljs.core.assoc.call(null,final$,new cljs.core.Keyword(null,"font-size","font-size",-1847940346),size):final$);
var final$__$2 = (cljs.core.truth_((function (){var and__6781__auto__ = line_height;
if(cljs.core.truth_(and__6781__auto__)){
return (line_height > (0));
} else {
return and__6781__auto__;
}
})())?cljs.core.assoc.call(null,final$__$1,new cljs.core.Keyword(null,"line-height","line-height",1870784992),line_height):final$__$1);
return lt.object.merge_BANG_.call(null,lt.objs.style.styles,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"font-settings","font-settings",-1277843564),final$__$2], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.style","font-settings","lt.objs.style/font-settings",1515927497),new cljs.core.Keyword(null,"exclusive","exclusive",-1507998718),true,new cljs.core.Keyword(null,"desc","desc",2093485764),"App: Font settings",new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"Font family",new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"string","string",-1989541586)], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"Size (pt)",new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"number","number",1570378438)], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"Line height (em)",new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"number","number",1570378438)], null)], null),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"object.instant","object.instant",-29936727),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.style.__BEH__font_settings);
lt.objs.style.load_skin = (function lt$objs$style$load_skin(skin){
var skins = lt.object.raise_reduce.call(null,lt.objs.app.app,new cljs.core.Keyword(null,"skins+","skins+",492750740),cljs.core.PersistentArrayMap.EMPTY);
var path = cljs.core.get.call(null,skins,skin,lt.objs.plugins.adjust_path.call(null,"core/css/skins/new-dark.css"));
var elem = lt.util.load.css.call(null,path);
crate.compiler.dom_attr.call(null,elem,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"id","id",-1388402092),[cljs.core.str("skin-"),cljs.core.str(skin)].join('')], null));

return elem;
});
lt.objs.style.inject_skin = (function lt$objs$style$inject_skin(skin){
if(cljs.core.truth_(new cljs.core.Keyword(null,"skin","skin",2146317821).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.style.styles)))){
lt.util.dom.remove_class.call(null,lt.util.dom.$.call(null,new cljs.core.Keyword(null,"body","body",-2049205669)),[cljs.core.str("skin-"),cljs.core.str(new cljs.core.Keyword(null,"skin","skin",2146317821).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.style.styles)))].join(''));

lt.util.dom.remove.call(null,lt.util.dom.$.call(null,[cljs.core.str("#skin-"),cljs.core.str(new cljs.core.Keyword(null,"skin","skin",2146317821).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.style.styles)))].join('')));
} else {
}

lt.object.merge_BANG_.call(null,lt.objs.style.styles,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"skin","skin",2146317821),skin], null));

lt.util.dom.add_class.call(null,lt.util.dom.$.call(null,new cljs.core.Keyword(null,"body","body",-2049205669)),[cljs.core.str("skin-"),cljs.core.str(skin)].join(''));

if(cljs.core.truth_(lt.util.dom.$.call(null,[cljs.core.str("#skin-"),cljs.core.str(skin)].join('')))){
return null;
} else {
return lt.util.dom.append.call(null,lt.util.dom.$.call(null,new cljs.core.Keyword(null,"head","head",-771383919)),lt.objs.style.load_skin.call(null,skin));
}
});
lt.objs.style.get_skins = (function lt$objs$style$get_skins(){
return cljs.core.sort_by.call(null,(function (p1__21309_SHARP_){
return p1__21309_SHARP_.text;
}),(function (){var iter__7573__auto__ = (function lt$objs$style$get_skins_$_iter__21326(s__21327){
return (new cljs.core.LazySeq(null,(function (){
var s__21327__$1 = s__21327;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__21327__$1);
if(temp__4657__auto__){
var s__21327__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__21327__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__21327__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__21329 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__21328 = (0);
while(true){
if((i__21328 < size__7572__auto__)){
var vec__21336 = cljs.core._nth.call(null,c__7571__auto__,i__21328);
var skin = cljs.core.nth.call(null,vec__21336,(0),null);
var path = cljs.core.nth.call(null,vec__21336,(1),null);
cljs.core.chunk_append.call(null,b__21329,({"text": cljs.core.pr_str.call(null,skin), "completion": cljs.core.pr_str.call(null,skin)}));

var G__21342 = (i__21328 + (1));
i__21328 = G__21342;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__21329),lt$objs$style$get_skins_$_iter__21326.call(null,cljs.core.chunk_rest.call(null,s__21327__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__21329),null);
}
} else {
var vec__21339 = cljs.core.first.call(null,s__21327__$2);
var skin = cljs.core.nth.call(null,vec__21339,(0),null);
var path = cljs.core.nth.call(null,vec__21339,(1),null);
return cljs.core.cons.call(null,({"text": cljs.core.pr_str.call(null,skin), "completion": cljs.core.pr_str.call(null,skin)}),lt$objs$style$get_skins_$_iter__21326.call(null,cljs.core.rest.call(null,s__21327__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__7573__auto__.call(null,lt.object.raise_reduce.call(null,lt.objs.app.app,new cljs.core.Keyword(null,"skins+","skins+",492750740),cljs.core.PersistentArrayMap.EMPTY));
})());
});
/**
 * 
 */
lt.objs.style.__BEH__set_skin = (function lt$objs$style$__BEH__set_skin(this$,skin){
return lt.objs.style.inject_skin.call(null,skin);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.style","set-skin","lt.objs.style/set-skin",-1097644256),new cljs.core.Keyword(null,"desc","desc",2093485764),"Style: Set Light Table skin",new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"label","label",1718410804),"skin",new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"list","list",765357683),new cljs.core.Keyword(null,"items","items",1031954938),lt.objs.style.get_skins], null)], null),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"object.instant","object.instant",-29936727),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.style.__BEH__set_skin);
/**
 * 
 */
lt.objs.style.__BEH__provide_skin = (function lt$objs$style$__BEH__provide_skin(this$,skins,name,path){
return cljs.core.assoc.call(null,skins,name,lt.objs.plugins.adjust_path.call(null,path));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.style","provide-skin","lt.objs.style/provide-skin",820344110),new cljs.core.Keyword(null,"desc","desc",2093485764),"Style: Provide skin",new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1718410804),"name"], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1718410804),"path"], null)], null),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"skins+","skins+",492750740),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.style.__BEH__provide_skin);
lt.objs.style.load_theme = (function lt$objs$style$load_theme(theme){
var themes = lt.object.raise_reduce.call(null,lt.objs.app.app,new cljs.core.Keyword(null,"themes+","themes+",902736573),cljs.core.PersistentArrayMap.EMPTY);
var path = cljs.core.get.call(null,themes,theme,lt.objs.plugins.adjust_path.call(null,"core/css/themes/default.css"));
var elem = lt.util.load.css.call(null,path);
crate.compiler.dom_attr.call(null,elem,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"id","id",-1388402092),[cljs.core.str("theme-"),cljs.core.str(theme)].join('')], null));

return elem;
});
lt.objs.style.inject_theme = (function lt$objs$style$inject_theme(theme){
if(cljs.core.truth_(new cljs.core.Keyword(null,"theme","theme",-1247880880).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.style.styles)))){
lt.util.dom.remove_class.call(null,lt.util.dom.$.call(null,new cljs.core.Keyword(null,"#multi","#multi",-846692035)),[cljs.core.str("theme-"),cljs.core.str(new cljs.core.Keyword(null,"theme","theme",-1247880880).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.style.styles)))].join(''));
} else {
}

lt.object.merge_BANG_.call(null,lt.objs.style.styles,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"theme","theme",-1247880880),theme], null));

lt.util.dom.add_class.call(null,lt.util.dom.$.call(null,new cljs.core.Keyword(null,"#multi","#multi",-846692035)),[cljs.core.str("theme-"),cljs.core.str(theme)].join(''));

if(cljs.core.truth_(lt.util.dom.$.call(null,[cljs.core.str("#theme-"),cljs.core.str(theme)].join('')))){
return null;
} else {
return lt.util.dom.append.call(null,lt.util.dom.$.call(null,new cljs.core.Keyword(null,"head","head",-771383919)),lt.objs.style.load_theme.call(null,theme));
}
});
lt.objs.style.get_themes = (function lt$objs$style$get_themes(){
return cljs.core.sort_by.call(null,(function (p1__21343_SHARP_){
return p1__21343_SHARP_.text;
}),(function (){var iter__7573__auto__ = (function lt$objs$style$get_themes_$_iter__21360(s__21361){
return (new cljs.core.LazySeq(null,(function (){
var s__21361__$1 = s__21361;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__21361__$1);
if(temp__4657__auto__){
var s__21361__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__21361__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__21361__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__21363 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__21362 = (0);
while(true){
if((i__21362 < size__7572__auto__)){
var vec__21370 = cljs.core._nth.call(null,c__7571__auto__,i__21362);
var theme = cljs.core.nth.call(null,vec__21370,(0),null);
var path = cljs.core.nth.call(null,vec__21370,(1),null);
cljs.core.chunk_append.call(null,b__21363,({"text": cljs.core.pr_str.call(null,theme), "completion": cljs.core.pr_str.call(null,theme)}));

var G__21376 = (i__21362 + (1));
i__21362 = G__21376;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__21363),lt$objs$style$get_themes_$_iter__21360.call(null,cljs.core.chunk_rest.call(null,s__21361__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__21363),null);
}
} else {
var vec__21373 = cljs.core.first.call(null,s__21361__$2);
var theme = cljs.core.nth.call(null,vec__21373,(0),null);
var path = cljs.core.nth.call(null,vec__21373,(1),null);
return cljs.core.cons.call(null,({"text": cljs.core.pr_str.call(null,theme), "completion": cljs.core.pr_str.call(null,theme)}),lt$objs$style$get_themes_$_iter__21360.call(null,cljs.core.rest.call(null,s__21361__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__7573__auto__.call(null,lt.object.raise_reduce.call(null,lt.objs.app.app,new cljs.core.Keyword(null,"themes+","themes+",902736573),cljs.core.PersistentArrayMap.EMPTY));
})());
});
/**
 * 
 */
lt.objs.style.__BEH__provide_theme = (function lt$objs$style$__BEH__provide_theme(this$,themes,name,path){
return cljs.core.assoc.call(null,themes,name,lt.objs.plugins.adjust_path.call(null,path));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.style","provide-theme","lt.objs.style/provide-theme",531410667),new cljs.core.Keyword(null,"desc","desc",2093485764),"Style: Provide editor theme",new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1718410804),"name"], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1718410804),"path"], null)], null),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"themes+","themes+",902736573),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.style.__BEH__provide_theme);
/**
 * 
 */
lt.objs.style.__BEH__remove_theme = (function lt$objs$style$__BEH__remove_theme(this$){
if(cljs.core.truth_(lt.object.has_tag_QMARK_.call(null,lt.objs.tabs.active_tab.call(null),new cljs.core.Keyword(null,"editor","editor",-989377770)))){
return null;
} else {
if(cljs.core.empty_QMARK_.call(null,new cljs.core.Keyword(null,"theme","theme",-1247880880).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.style.styles)))){
return null;
} else {
return lt.util.dom.remove_class.call(null,lt.util.dom.$.call(null,new cljs.core.Keyword(null,"#multi","#multi",-846692035)),[cljs.core.str("theme-"),cljs.core.str(new cljs.core.Keyword(null,"theme","theme",-1247880880).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.style.styles)))].join(''));
}
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.style","remove-theme","lt.objs.style/remove-theme",-1330301400),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"deactivated","deactivated",1307356258),null,new cljs.core.Keyword(null,"destroy","destroy",-843660405),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.style.__BEH__remove_theme);
/**
 * 
 */
lt.objs.style.__BEH__set_theme = (function lt$objs$style$__BEH__set_theme(this$,sel){
lt.objs.style.inject_theme.call(null,sel);

return lt.objs.editor.set_options.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"theme","theme",-1247880880),sel], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.style","set-theme","lt.objs.style/set-theme",-1703235776),new cljs.core.Keyword(null,"exclusive","exclusive",-1507998718),true,new cljs.core.Keyword(null,"desc","desc",2093485764),"Style: Set the editor theme",new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"label","label",1718410804),"theme",new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"list","list",765357683),new cljs.core.Keyword(null,"items","items",1031954938),lt.objs.style.get_themes], null)], null),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"object.instant","object.instant",-29936727),null,new cljs.core.Keyword(null,"show","show",-576705889),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.style.__BEH__set_theme);
