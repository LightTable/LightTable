// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.objs.jump_stack');
goog.require('cljs.core');
goog.require('lt.objs.command');
goog.require('lt.objs.notifos');
goog.require('lt.objs.editor');
goog.require('lt.object');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.files');
lt.objs.jump_stack.jump_to = (function lt$objs$jump_stack$jump_to(file,pos){
lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"open-path","open-path",2082525233),file);

var cur = lt.objs.editor.pool.last_active.call(null);
lt.objs.editor.move_cursor.call(null,cur,pos);

return lt.objs.editor.center_cursor.call(null,cur);
});
/**
 * 
 */
lt.objs.jump_stack.__BEH__jump_stack__DOT__push = (function lt$objs$jump_stack$__BEH__jump_stack__DOT__push(jump_stack,editor,file,pos){
var old_file = new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,editor)));
var old_pos = lt.objs.editor.__GT_cursor.call(null,editor);
if(cljs.core.not.call(null,lt.objs.files.exists_QMARK_.call(null,file))){
return lt.objs.notifos.set_msg_BANG_.call(null,[cljs.core.str("Could not find file: "),cljs.core.str(file)].join(''),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"error"], null));
} else {
lt.objs.jump_stack.jump_to.call(null,file,pos);

return lt.object.update_BANG_.call(null,jump_stack,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"stack","stack",-793405930)], null),cljs.core.conj,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [old_file,old_pos], null));
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.jump-stack","jump-stack.push","lt.objs.jump-stack/jump-stack.push",541082988),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"jump-stack.push!","jump-stack.push!",-460327428),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.jump_stack.__BEH__jump_stack__DOT__push);
/**
 * 
 */
lt.objs.jump_stack.__BEH__jump_stack__DOT__pop = (function lt$objs$jump_stack$__BEH__jump_stack__DOT__pop(jump_stack,file,pos){
var stack = new cljs.core.Keyword(null,"stack","stack",-793405930).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,jump_stack));
if(cljs.core.empty_QMARK_.call(null,stack)){
return lt.objs.notifos.set_msg_BANG_.call(null,"Nowhere left to jump",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"error"], null));
} else {
var vec__20424 = cljs.core.last.call(null,stack);
var file__$1 = cljs.core.nth.call(null,vec__20424,(0),null);
var pos__$1 = cljs.core.nth.call(null,vec__20424,(1),null);
if(cljs.core.not.call(null,lt.objs.files.exists_QMARK_.call(null,file__$1))){
return lt.objs.notifos.set_msg_BANG_.call(null,[cljs.core.str("Could not find file: "),cljs.core.str(file__$1)].join(''),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"error"], null));
} else {
lt.objs.jump_stack.jump_to.call(null,file__$1,pos__$1);

return lt.object.update_BANG_.call(null,jump_stack,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"stack","stack",-793405930)], null),cljs.core.pop);
}
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.jump-stack","jump-stack.pop","lt.objs.jump-stack/jump-stack.pop",-969049059),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"jump-stack.pop!","jump-stack.pop!",-58406562),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.jump_stack.__BEH__jump_stack__DOT__pop);
lt.objs.jump_stack.jump_stack = lt.object.create.call(null,lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.jump-stack","jump-stack","lt.objs.jump-stack/jump-stack",-1529960607),new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"jump-stack","jump-stack",-1147154474)], null),new cljs.core.Keyword(null,"stack","stack",-793405930),cljs.core.PersistentVector.EMPTY));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.jump-to-definition-at-cursor","editor.jump-to-definition-at-cursor",-1094627239),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Jump to definition at cursor",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
return lt.object.raise.call(null,ed,new cljs.core.Keyword(null,"editor.jump-to-definition-at-cursor!","editor.jump-to-definition-at-cursor!",-1544081520));
} else {
return null;
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.unjump","editor.unjump",-566074248),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Jump back to where you jumped from",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.object.raise.call(null,lt.objs.jump_stack.jump_stack,new cljs.core.Keyword(null,"jump-stack.pop!","jump-stack.pop!",-58406562));
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.jump-to","editor.jump-to",1730886072),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Jump to file/pos",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (file,pos){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
return lt.object.raise.call(null,lt.objs.jump_stack.jump_stack,new cljs.core.Keyword(null,"jump-stack.push!","jump-stack.push!",-460327428),ed,file,pos);
} else {
return null;
}
})], null));
