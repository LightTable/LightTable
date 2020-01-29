// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.objs.editor.file');
goog.require('cljs.core');
goog.require('lt.objs.command');
goog.require('lt.objs.notifos');
goog.require('lt.objs.document');
goog.require('lt.objs.editor');
goog.require('lt.object');
goog.require('lt.objs.files');
goog.require('clojure.string');
/**
 * 
 */
lt.objs.editor.file.__BEH__file_save = (function lt$objs$editor$file$__BEH__file_save(editor){
var map__16202 = cljs.core.deref.call(null,editor).call(null,new cljs.core.Keyword(null,"info","info",-317069002));
var map__16202__$1 = ((((!((map__16202 == null)))?((((map__16202.cljs$lang$protocol_mask$partition0$ & (64))) || (map__16202.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__16202):map__16202);
var path = cljs.core.get.call(null,map__16202__$1,new cljs.core.Keyword(null,"path","path",-188191168));
var final$ = lt.object.raise_reduce.call(null,editor,new cljs.core.Keyword(null,"save+","save+",-787237961),lt.objs.editor.__GT_val.call(null,editor));
if(cljs.core.not_EQ_.call(null,final$,lt.objs.editor.__GT_val.call(null,editor))){
var y_position_16204 = lt.objs.editor.__GT_cm_ed.call(null,editor).getScrollInfo().top;
lt.objs.editor.set_val_and_keep_cursor.call(null,editor,final$);

lt.objs.editor.scroll_to.call(null,editor,(0),y_position_16204);
} else {
}

return lt.objs.document.save.call(null,path,final$,((function (map__16202,map__16202__$1,path,final$){
return (function (){
lt.object.merge_BANG_.call(null,editor,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"dirty","dirty",729553281),false,new cljs.core.Keyword(null,"editor.generation","editor.generation",-1223834691),lt.objs.editor.__GT_generation.call(null,editor)], null));

lt.object.raise.call(null,editor,new cljs.core.Keyword(null,"saved","saved",288760660));

return lt.object.raise.call(null,editor,new cljs.core.Keyword(null,"clean","clean",41534079));
});})(map__16202,map__16202__$1,path,final$))
);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.editor.file","file-save","lt.objs.editor.file/file-save",-778741404),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"save","save",1850079149),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.editor.file.__BEH__file_save);
/**
 * 
 */
lt.objs.editor.file.__BEH__dirty_on_change = (function lt$objs$editor$file$__BEH__dirty_on_change(obj){
var dirty_QMARK_ = lt.objs.editor.dirty_QMARK_.call(null,obj,new cljs.core.Keyword(null,"editor.generation","editor.generation",-1223834691).cljs$core$IFn$_invoke$arity$2(cljs.core.deref.call(null,obj),(0)));
if(cljs.core.not_EQ_.call(null,new cljs.core.Keyword(null,"dirty","dirty",729553281).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,obj)),dirty_QMARK_)){
if(cljs.core.truth_(dirty_QMARK_)){
lt.object.merge_BANG_.call(null,obj,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"dirty","dirty",729553281),true], null));

return lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"dirty","dirty",729553281));
} else {
lt.object.merge_BANG_.call(null,obj,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"dirty","dirty",729553281),false], null));

return lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"clean","clean",41534079));
}
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.editor.file","dirty-on-change","lt.objs.editor.file/dirty-on-change",-14323201),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"change","change",-1163046502),null], null), null),new cljs.core.Keyword(null,"throttle","throttle",-1860340776),(100),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.editor.file.__BEH__dirty_on_change);
/**
 * 
 */
lt.objs.editor.file.__BEH__preserve_line_endings = (function lt$objs$editor$file$__BEH__preserve_line_endings(editor,content){
if(cljs.core._EQ_.call(null,"\r\n",(function (){var or__6793__auto__ = new cljs.core.Keyword(null,"line-ending","line-ending",1603768237).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,editor)));
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return lt.objs.files.line_ending;
}
})())){
return clojure.string.replace.call(null,content,(new RegExp("(\r?\n|\n)","gm")),"\r\n");
} else {
return content;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.editor.file","preserve-line-endings","lt.objs.editor.file/preserve-line-endings",-1626442190),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"save+","save+",-787237961),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.editor.file.__BEH__preserve_line_endings);
/**
 * 
 */
lt.objs.editor.file.__BEH__remove_trailing_whitespace = (function lt$objs$editor$file$__BEH__remove_trailing_whitespace(editor,content){
return content.replace((new RegExp("[ \\t]+$","gm")),"");
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.editor.file","remove-trailing-whitespace","lt.objs.editor.file/remove-trailing-whitespace",169988211),new cljs.core.Keyword(null,"exclusive","exclusive",-1507998718),true,new cljs.core.Keyword(null,"desc","desc",2093485764),"Save: Remove trailing whitespace",new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"save+","save+",-787237961),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.editor.file.__BEH__remove_trailing_whitespace);
/**
 * 
 */
lt.objs.editor.file.__BEH__last_char_newline = (function lt$objs$editor$file$__BEH__last_char_newline(editor,content){
var line_ending = new cljs.core.Keyword(null,"line-ending","line-ending",1603768237).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,editor)));
if(cljs.core._EQ_.call(null,cljs.core.last.call(null,content),"\n")){
return content;
} else {
return [cljs.core.str(content),cljs.core.str(line_ending)].join('');
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.editor.file","last-char-newline","lt.objs.editor.file/last-char-newline",1953540694),new cljs.core.Keyword(null,"exclusive","exclusive",-1507998718),true,new cljs.core.Keyword(null,"desc","desc",2093485764),"Save: Ensure the file ends with a new-line",new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"save+","save+",-787237961),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.editor.file.__BEH__last_char_newline);
/**
 * 
 */
lt.objs.editor.file.__BEH__on_save = (function lt$objs$editor$file$__BEH__on_save(var_args){
var args__7875__auto__ = [];
var len__7868__auto___16208 = arguments.length;
var i__7869__auto___16209 = (0);
while(true){
if((i__7869__auto___16209 < len__7868__auto___16208)){
args__7875__auto__.push((arguments[i__7869__auto___16209]));

var G__16210 = (i__7869__auto___16209 + (1));
i__7869__auto___16209 = G__16210;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((2) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((2)),(0),null)):null);
return lt.objs.editor.file.__BEH__on_save.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__7876__auto__);
});

lt.objs.editor.file.__BEH__on_save.cljs$core$IFn$_invoke$arity$variadic = (function (this$,cmd,args){
return cljs.core.apply.call(null,lt.objs.command.exec_BANG_,cmd,args);
});

lt.objs.editor.file.__BEH__on_save.cljs$lang$maxFixedArity = (2);

lt.objs.editor.file.__BEH__on_save.cljs$lang$applyTo = (function (seq16205){
var G__16206 = cljs.core.first.call(null,seq16205);
var seq16205__$1 = cljs.core.next.call(null,seq16205);
var G__16207 = cljs.core.first.call(null,seq16205__$1);
var seq16205__$2 = cljs.core.next.call(null,seq16205__$1);
return lt.objs.editor.file.__BEH__on_save.cljs$core$IFn$_invoke$arity$variadic(G__16206,G__16207,seq16205__$2);
});


lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.editor.file","on-save","lt.objs.editor.file/on-save",415557753),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: On save execute command",new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1718410804),"command"], null)], null),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"save","save",1850079149),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.editor.file.__BEH__on_save);
