// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.objs.animations');
goog.require('cljs.core');
goog.require('lt.object');
goog.require('lt.util.dom');
lt.objs.animations.$body = lt.util.dom.$.call(null,new cljs.core.Keyword(null,"body","body",-2049205669));
lt.objs.animations.force_off = false;
lt.objs.animations.on = (function lt$objs$animations$on(){
if(cljs.core.truth_(lt.objs.animations.force_off)){
return null;
} else {
return lt.util.dom.add_class.call(null,lt.objs.animations.$body,new cljs.core.Keyword(null,"animated","animated",129318795));
}
});
lt.objs.animations.off = (function lt$objs$animations$off(){
if(cljs.core.truth_(lt.objs.animations.force_off)){
return null;
} else {
return lt.util.dom.remove_class.call(null,lt.objs.animations.$body,new cljs.core.Keyword(null,"animated","animated",129318795));
}
});
lt.objs.animations.on_QMARK_ = (function lt$objs$animations$on_QMARK_(){
if(cljs.core.truth_(lt.objs.animations.force_off)){
return null;
} else {
return lt.util.dom.has_class_QMARK_.call(null,lt.objs.animations.$body,new cljs.core.Keyword(null,"animated","animated",129318795));
}
});
/**
 * 
 */
lt.objs.animations.__BEH__animate_on_init = (function lt$objs$animations$__BEH__animate_on_init(app){
return lt.objs.animations.on.call(null);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.animations","animate-on-init","lt.objs.animations/animate-on-init",225169883),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"init","init",-1875481434),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.animations.__BEH__animate_on_init);
/**
 * 
 */
lt.objs.animations.__BEH__toggle_animations = (function lt$objs$animations$__BEH__toggle_animations(this$,active_QMARK_){
lt.objs.animations.force_off = cljs.core.not.call(null,active_QMARK_);

if(cljs.core.truth_(active_QMARK_)){
return lt.objs.animations.on.call(null);
} else {
return lt.objs.animations.off.call(null);
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.animations","toggle-animations","lt.objs.animations/toggle-animations",-1681413507),new cljs.core.Keyword(null,"desc","desc",2093485764),"App: Enable or disable UI animations",new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"object.instant","object.instant",-29936727),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.animations.__BEH__toggle_animations);
