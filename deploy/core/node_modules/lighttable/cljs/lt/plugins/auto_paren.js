// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.plugins.auto_paren');
goog.require('cljs.core');
goog.require('lt.objs.command');
goog.require('lt.objs.context');
goog.require('lt.objs.editor');
goog.require('lt.object');
goog.require('lt.objs.keyboard');
goog.require('lt.objs.editor.pool');
lt.plugins.auto_paren.pairs = new cljs.core.PersistentArrayMap(null, 5, ["(",")","{","}","[","]","\"","\"","<",">"], null);
lt.plugins.auto_paren.word_char = /[^\s\)\}\]\(\{\[]/;
lt.plugins.auto_paren.adjust_loc = (function lt$plugins$auto_paren$adjust_loc(loc,dir){
return cljs.core.update_in.call(null,loc,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ch","ch",-554717905)], null),cljs.core._PLUS_,dir);
});
lt.plugins.auto_paren.get_char = (function lt$plugins$auto_paren$get_char(ed,dir){
var loc = lt.objs.editor.__GT_cursor.call(null,ed);
if((dir > (0))){
return lt.objs.editor.range.call(null,ed,loc,lt.plugins.auto_paren.adjust_loc.call(null,loc,dir));
} else {
return lt.objs.editor.range.call(null,ed,lt.plugins.auto_paren.adjust_loc.call(null,loc,dir),loc);
}
});
lt.plugins.auto_paren.move_cursor = (function lt$plugins$auto_paren$move_cursor(ed,dir){
var loc = lt.objs.editor.__GT_cursor.call(null,ed);
return lt.objs.editor.move_cursor.call(null,ed,lt.plugins.auto_paren.adjust_loc.call(null,loc,dir));
});
/**
 * 
 */
lt.plugins.auto_paren.__BEH__open_pair = (function lt$plugins$auto_paren$__BEH__open_pair(this$,ch){
return lt.objs.editor.operation.call(null,this$,(function (){
var current_selection = lt.objs.editor.selection.call(null,this$);
if(!(cljs.core._EQ_.call(null,current_selection,""))){
return lt.objs.editor.replace_selection.call(null,this$,[cljs.core.str(ch),cljs.core.str(current_selection),cljs.core.str(lt.plugins.auto_paren.pairs.call(null,ch))].join(''),new cljs.core.Keyword(null,"around","around",-265975553));
} else {
if(cljs.core.truth_(cljs.core.re_seq.call(null,lt.plugins.auto_paren.word_char,lt.plugins.auto_paren.get_char.call(null,this$,(1))))){
return lt.objs.editor.insert_at_cursor.call(null,this$,ch);
} else {
lt.objs.editor.insert_at_cursor.call(null,this$,[cljs.core.str(ch),cljs.core.str(lt.plugins.auto_paren.pairs.call(null,ch))].join(''));

return lt.plugins.auto_paren.move_cursor.call(null,this$,(-1));
}
}
}));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.auto-paren","open-pair","lt.plugins.auto-paren/open-pair",-1563591477),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"open-pair!","open-pair!",-1160258469),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.plugins.auto_paren.__BEH__open_pair);
/**
 * 
 */
lt.plugins.auto_paren.__BEH__close_pair = (function lt$plugins$auto_paren$__BEH__close_pair(this$,ch){
if(cljs.core._EQ_.call(null,ch,lt.plugins.auto_paren.get_char.call(null,this$,(1)))){
return lt.plugins.auto_paren.move_cursor.call(null,this$,(1));
} else {
return lt.objs.keyboard.passthrough.call(null);
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.auto-paren","close-pair","lt.plugins.auto-paren/close-pair",366628832),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"close-pair!","close-pair!",350704872),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.plugins.auto_paren.__BEH__close_pair);
/**
 * 
 */
lt.plugins.auto_paren.__BEH__repeat_pair = (function lt$plugins$auto_paren$__BEH__repeat_pair(this$,ch){
return lt.objs.editor.operation.call(null,this$,(function (){
var current_selection = lt.objs.editor.selection.call(null,this$);
if(!(cljs.core._EQ_.call(null,current_selection,""))){
return lt.objs.editor.replace_selection.call(null,this$,[cljs.core.str(ch),cljs.core.str(current_selection),cljs.core.str(ch)].join(''));
} else {
if(cljs.core._EQ_.call(null,ch,lt.plugins.auto_paren.get_char.call(null,this$,(1)))){
return lt.plugins.auto_paren.move_cursor.call(null,this$,(1));
} else {
if(cljs.core.truth_(cljs.core.re_seq.call(null,lt.plugins.auto_paren.word_char,lt.plugins.auto_paren.get_char.call(null,this$,(1))))){
return lt.objs.editor.insert_at_cursor.call(null,this$,ch);
} else {
if(cljs.core.truth_(cljs.core.re_seq.call(null,lt.plugins.auto_paren.word_char,lt.plugins.auto_paren.get_char.call(null,this$,(-1))))){
return lt.objs.editor.insert_at_cursor.call(null,this$,ch);
} else {
lt.objs.editor.insert_at_cursor.call(null,this$,[cljs.core.str(ch),cljs.core.str(ch)].join(''));

return lt.plugins.auto_paren.move_cursor.call(null,this$,(-1));

}
}
}
}
}));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.auto-paren","repeat-pair","lt.plugins.auto-paren/repeat-pair",-154299245),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"repeat-pair!","repeat-pair!",1932401203),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.plugins.auto_paren.__BEH__repeat_pair);
/**
 * 
 */
lt.plugins.auto_paren.__BEH__try_remove_pair = (function lt$plugins$auto_paren$__BEH__try_remove_pair(this$){
if(cljs.core.not.call(null,lt.objs.editor.selection_QMARK_.call(null,this$))){
var ch = lt.plugins.auto_paren.get_char.call(null,this$,(-1));
if(cljs.core.truth_((function (){var and__6781__auto__ = lt.plugins.auto_paren.pairs.call(null,ch);
if(cljs.core.truth_(and__6781__auto__)){
return cljs.core._EQ_.call(null,lt.plugins.auto_paren.get_char.call(null,this$,(1)),lt.plugins.auto_paren.pairs.call(null,ch));
} else {
return and__6781__auto__;
}
})())){
var loc = lt.objs.editor.__GT_cursor.call(null,this$);
lt.objs.editor.replace.call(null,this$,lt.plugins.auto_paren.adjust_loc.call(null,loc,(-1)),lt.plugins.auto_paren.adjust_loc.call(null,loc,(1)),"");

return lt.objs.keyboard.stop_commands_BANG_.call(null);
} else {
return lt.objs.keyboard.passthrough.call(null);
}
} else {
return lt.objs.keyboard.passthrough.call(null);
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.auto-paren","try-remove-pair","lt.plugins.auto-paren/try-remove-pair",190439672),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"backspace!","backspace!",1763897986),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.plugins.auto_paren.__BEH__try_remove_pair);
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.close-pair","editor.close-pair",-1826198933),new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Close pair character",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (c){
return lt.object.raise.call(null,lt.objs.context.__GT_obj.call(null,new cljs.core.Keyword(null,"editor.keys.normal","editor.keys.normal",-1649567699)),new cljs.core.Keyword(null,"close-pair!","close-pair!",350704872),c);
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.open-pair","editor.open-pair",1089086685),new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Open pair character",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (c){
return lt.object.raise.call(null,lt.objs.context.__GT_obj.call(null,new cljs.core.Keyword(null,"editor.keys.normal","editor.keys.normal",-1649567699)),new cljs.core.Keyword(null,"open-pair!","open-pair!",-1160258469),c);
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.repeat-pair","editor.repeat-pair",-1356015822),new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Repeat pair character",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (c){
return lt.object.raise.call(null,lt.objs.context.__GT_obj.call(null,new cljs.core.Keyword(null,"editor.keys.normal","editor.keys.normal",-1649567699)),new cljs.core.Keyword(null,"repeat-pair!","repeat-pair!",1932401203),c);
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.backspace-pair","editor.backspace-pair",138318891),new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Pair aware backspace",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (c){
return lt.object.raise.call(null,lt.objs.context.__GT_obj.call(null,new cljs.core.Keyword(null,"editor.keys.normal","editor.keys.normal",-1649567699)),new cljs.core.Keyword(null,"backspace!","backspace!",1763897986),c);
})], null));
lt.plugins.auto_paren.pre_cursor_indent = (function lt$plugins$auto_paren$pre_cursor_indent(ed,p__17162){
var map__17165 = p__17162;
var map__17165__$1 = ((((!((map__17165 == null)))?((((map__17165.cljs$lang$protocol_mask$partition0$ & (64))) || (map__17165.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__17165):map__17165);
var line = cljs.core.get.call(null,map__17165__$1,new cljs.core.Keyword(null,"line","line",212345235));
var ch = cljs.core.get.call(null,map__17165__$1,new cljs.core.Keyword(null,"ch","ch",-554717905));
var tabs = lt.objs.editor.option.call(null,ed,new cljs.core.Keyword(null,"indentWithTabs","indentWithTabs",520478820));
var unit = lt.objs.editor.option.call(null,ed,new cljs.core.Keyword(null,"indentUnit","indentUnit",438562839));
var precursor = lt.objs.editor.line.call(null,ed,line).substring((0),ch);
var whitespace = cljs.core.count.call(null,cljs.core.re_find.call(null,(cljs.core.truth_(tabs)?/^\t*$/:/^ *$/),precursor));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.quot.call(null,whitespace,unit),cljs.core.mod.call(null,whitespace,unit)], null);
});
lt.plugins.auto_paren.backspace_indent = (function lt$plugins$auto_paren$backspace_indent(ed){
if(cljs.core.not.call(null,(function (){var or__6793__auto__ = lt.objs.editor.selection_QMARK_.call(null,ed);
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return (lt.objs.editor.__GT_cm_ed.call(null,ed).getSelections().length > (1));
}
})())){
var cursor = lt.objs.editor.__GT_cursor.call(null,ed);
var unit = lt.objs.editor.option.call(null,ed,new cljs.core.Keyword(null,"indentUnit","indentUnit",438562839));
var vec__17173 = lt.plugins.auto_paren.pre_cursor_indent.call(null,ed,cursor);
var indent = cljs.core.nth.call(null,vec__17173,(0),null);
var rem = cljs.core.nth.call(null,vec__17173,(1),null);
var cursor__$1 = (((rem > (0)))?lt.plugins.auto_paren.adjust_loc.call(null,lt.objs.editor.__GT_cursor.call(null,ed),(unit - rem)):cursor);
var vec__17176 = (((rem > (0)))?lt.plugins.auto_paren.pre_cursor_indent.call(null,ed,cursor__$1):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [indent,rem], null));
var indent__$1 = cljs.core.nth.call(null,vec__17176,(0),null);
var rem__$1 = cljs.core.nth.call(null,vec__17176,(1),null);
if(((indent__$1 > (0))) && ((rem__$1 === (0)))){
lt.objs.editor.replace.call(null,ed,lt.plugins.auto_paren.adjust_loc.call(null,cursor__$1,(- unit)),cursor__$1,"");

return lt.objs.keyboard.stop_commands_BANG_.call(null);
} else {
return lt.objs.keyboard.passthrough.call(null);
}
} else {
return lt.objs.keyboard.passthrough.call(null);
}
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.backspace-indent","editor.backspace-indent",-1485330143),new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Indent aware backspace",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.plugins.auto_paren.backspace_indent.call(null,lt.objs.context.__GT_obj.call(null,new cljs.core.Keyword(null,"editor.keys.normal","editor.keys.normal",-1649567699)));
})], null));
