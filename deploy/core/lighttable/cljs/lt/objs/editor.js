// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.objs.editor');
goog.require('cljs.core');
goog.require('lt.objs.command');
goog.require('lt.objs.platform');
goog.require('crate.core');
goog.require('lt.object');
goog.require('lt.util.dom');
goog.require('lt.objs.menu');
goog.require('lt.util.load');
goog.require('lt.util.events');
goog.require('lt.objs.files');
goog.require('lt.objs.context');
/**
 * Return editor `e`'s CodeMirror object.
 */
lt.objs.editor.__GT_cm_ed = (function lt$objs$editor$__GT_cm_ed(e){
if(((!((e == null)))?((((e.cljs$lang$protocol_mask$partition0$ & (32768))) || (e.cljs$core$IDeref$))?true:(((!e.cljs$lang$protocol_mask$partition0$))?cljs.core.native_satisfies_QMARK_.call(null,cljs.core.IDeref,e):false)):cljs.core.native_satisfies_QMARK_.call(null,cljs.core.IDeref,e))){
return new cljs.core.Keyword(null,"ed","ed",436294224).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,e));
} else {
return e;
}
});
/**
 * Return DOM element of editor `e`'s CodeMirror object
 */
lt.objs.editor.__GT_elem = (function lt$objs$editor$__GT_elem(e){
return lt.objs.editor.__GT_cm_ed.call(null,e).getScrollerElement().parentElement;
});
/**
 * Set content value `v` of editor `e`'s CodeMirror object. Cursor position is lost. Returns `e`.
 */
lt.objs.editor.set_val = (function lt$objs$editor$set_val(e,v){
lt.objs.editor.__GT_cm_ed.call(null,e).setValue((function (){var or__6793__auto__ = v;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return "";
}
})());

return e;
});
/**
 * Same as [[set-val]] but current cursor position is kept.
 */
lt.objs.editor.set_val_and_keep_cursor = (function lt$objs$editor$set_val_and_keep_cursor(e,v){
var cursor = lt.objs.editor.__GT_cm_ed.call(null,e).getCursor();
lt.objs.editor.set_val.call(null,e,v);

return lt.objs.editor.__GT_cm_ed.call(null,e).setCursor(cursor);
});
/**
 * Given a map of options, set each pair as an option on editor `e`'s
 *   CodeMirror object. Returns `e`.
 */
lt.objs.editor.set_options = (function lt$objs$editor$set_options(e,m){
var seq__14273_14283 = cljs.core.seq.call(null,m);
var chunk__14274_14284 = null;
var count__14275_14285 = (0);
var i__14276_14286 = (0);
while(true){
if((i__14276_14286 < count__14275_14285)){
var vec__14277_14287 = cljs.core._nth.call(null,chunk__14274_14284,i__14276_14286);
var k_14288 = cljs.core.nth.call(null,vec__14277_14287,(0),null);
var v_14289 = cljs.core.nth.call(null,vec__14277_14287,(1),null);
lt.objs.editor.__GT_cm_ed.call(null,e).setOption(cljs.core.name.call(null,k_14288),v_14289);

var G__14290 = seq__14273_14283;
var G__14291 = chunk__14274_14284;
var G__14292 = count__14275_14285;
var G__14293 = (i__14276_14286 + (1));
seq__14273_14283 = G__14290;
chunk__14274_14284 = G__14291;
count__14275_14285 = G__14292;
i__14276_14286 = G__14293;
continue;
} else {
var temp__4657__auto___14294 = cljs.core.seq.call(null,seq__14273_14283);
if(temp__4657__auto___14294){
var seq__14273_14295__$1 = temp__4657__auto___14294;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14273_14295__$1)){
var c__7604__auto___14296 = cljs.core.chunk_first.call(null,seq__14273_14295__$1);
var G__14297 = cljs.core.chunk_rest.call(null,seq__14273_14295__$1);
var G__14298 = c__7604__auto___14296;
var G__14299 = cljs.core.count.call(null,c__7604__auto___14296);
var G__14300 = (0);
seq__14273_14283 = G__14297;
chunk__14274_14284 = G__14298;
count__14275_14285 = G__14299;
i__14276_14286 = G__14300;
continue;
} else {
var vec__14280_14301 = cljs.core.first.call(null,seq__14273_14295__$1);
var k_14302 = cljs.core.nth.call(null,vec__14280_14301,(0),null);
var v_14303 = cljs.core.nth.call(null,vec__14280_14301,(1),null);
lt.objs.editor.__GT_cm_ed.call(null,e).setOption(cljs.core.name.call(null,k_14302),v_14303);

var G__14304 = cljs.core.next.call(null,seq__14273_14295__$1);
var G__14305 = null;
var G__14306 = (0);
var G__14307 = (0);
seq__14273_14283 = G__14304;
chunk__14274_14284 = G__14305;
count__14275_14285 = G__14306;
i__14276_14286 = G__14307;
continue;
}
} else {
}
}
break;
}

return e;
});
/**
 * Clear the history of editor `e`. Returns `e`.
 */
lt.objs.editor.clear_history = (function lt$objs$editor$clear_history(e){
lt.objs.editor.__GT_cm_ed.call(null,e).clearHistory();

return e;
});
/**
 * Returns the history of editor `e`.
 */
lt.objs.editor.get_history = (function lt$objs$editor$get_history(e){
return lt.objs.editor.__GT_cm_ed.call(null,e).getHistory();
});
/**
 * Set the history of editor `e` with provided value `v`.
 */
lt.objs.editor.set_history = (function lt$objs$editor$set_history(e,v){
lt.objs.editor.__GT_cm_ed.call(null,e).setHistory(v);

return e;
});
lt.objs.editor.expand_tab = (function lt$objs$editor$expand_tab(cm){
if(cljs.core.truth_(cm.somethingSelected())){
return cm.indentSelection("add");
} else {
if(cljs.core.truth_(cm.getOption("indentWithTabs"))){
return cm.replaceSelection("\t","end","+input");
} else {
var spaces = Array((cm.getOption("indentUnit") + (1))).join(" ");
return cm.replaceSelection(spaces,"end","+input");

}
}
});
/**
 * Create a headless CodeMirror object using `opts`.
 */
lt.objs.editor.headless = (function lt$objs$editor$headless(opts){
return lt.objs.editor.set_options.call(null,(new CodeMirror((function (){
return null;
}))),opts);
});
lt.objs.editor.make = (function lt$objs$editor$make(context){
var e = lt.objs.editor.headless.call(null,new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"mode","mode",654403691),(cljs.core.truth_(new cljs.core.Keyword(null,"mime","mime",-1846414642).cljs$core$IFn$_invoke$arity$1(context))?cljs.core.name.call(null,new cljs.core.Keyword(null,"mime","mime",-1846414642).cljs$core$IFn$_invoke$arity$1(context)):"plaintext"),new cljs.core.Keyword(null,"autoClearEmptyLines","autoClearEmptyLines",62836823),true,new cljs.core.Keyword(null,"dragDrop","dragDrop",-853414848),false,new cljs.core.Keyword(null,"undoDepth","undoDepth",-1389579692),(10000),new cljs.core.Keyword(null,"matchBrackets","matchBrackets",1256448936),true,new cljs.core.Keyword(null,"singleCursorHeightPerLine","singleCursorHeightPerLine",-1591125729),false,new cljs.core.Keyword(null,"showCursorWhenSelecting","showCursorWhenSelecting",169880137),true], null));
var temp__4657__auto___14308 = new cljs.core.Keyword(null,"content","content",15833224).cljs$core$IFn$_invoke$arity$1(context);
if(cljs.core.truth_(temp__4657__auto___14308)){
var c_14309 = temp__4657__auto___14308;
lt.objs.editor.set_val.call(null,e,c_14309);

lt.objs.editor.clear_history.call(null,e);
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(context))){
e.swapDoc(new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(context))));
} else {
}

return e;
});
/**
 * Register event handler `ev`, which fires `func`, on editor `ed`'s CodeMirror object.
 */
lt.objs.editor.on = (function lt$objs$editor$on(ed,ev,func){
return lt.objs.editor.__GT_cm_ed.call(null,ed).on(cljs.core.name.call(null,ev),func);
});
/**
 * Remove event handler `ev`, which fires `func`, on editor `ed`'s CodeMirror object.
 */
lt.objs.editor.off = (function lt$objs$editor$off(ed,ev,func){
return lt.objs.editor.__GT_cm_ed.call(null,ed).off(cljs.core.name.call(null,ev),func);
});
lt.objs.editor.wrap_object_events = (function lt$objs$editor$wrap_object_events(ed,obj){
lt.util.dom.on.call(null,lt.objs.editor.__GT_elem.call(null,ed),new cljs.core.Keyword(null,"contextmenu","contextmenu",-15887481),(function (p1__14310_SHARP_){
return lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"menu!","menu!",-1593399467),p1__14310_SHARP_);
}));

lt.objs.editor.on.call(null,ed,new cljs.core.Keyword(null,"dragstart","dragstart",955864218),(function (p1__14312_SHARP_,p2__14311_SHARP_){
return p2__14311_SHARP_.preventDefault();
}));

lt.objs.editor.on.call(null,ed,new cljs.core.Keyword(null,"dragenter","dragenter",-237546900),(function (p1__14314_SHARP_,p2__14313_SHARP_){
return p2__14313_SHARP_.preventDefault();
}));

lt.objs.editor.on.call(null,ed,new cljs.core.Keyword(null,"dragover","dragover",-1169536926),(function (p1__14316_SHARP_,p2__14315_SHARP_){
return p2__14315_SHARP_.preventDefault();
}));

lt.objs.editor.on.call(null,ed,new cljs.core.Keyword(null,"drop","drop",364481611),(function (p1__14318_SHARP_,p2__14317_SHARP_){
return p2__14317_SHARP_.preventDefault();
}));

lt.objs.editor.on.call(null,ed,new cljs.core.Keyword(null,"scroll","scroll",971553779),(function (p1__14319_SHARP_){
return lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"scroll","scroll",971553779),p1__14319_SHARP_);
}));

lt.objs.editor.on.call(null,ed,new cljs.core.Keyword(null,"update","update",1045576396),(function (p1__14320_SHARP_,p2__14321_SHARP_){
return lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"update","update",1045576396),p1__14320_SHARP_,p2__14321_SHARP_);
}));

lt.objs.editor.on.call(null,ed,new cljs.core.Keyword(null,"change","change",-1163046502),(function (p1__14322_SHARP_,p2__14323_SHARP_){
return lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"change","change",-1163046502),p1__14322_SHARP_,p2__14323_SHARP_);
}));

lt.objs.editor.on.call(null,ed,new cljs.core.Keyword(null,"inputRead","inputRead",1319869881),(function (p1__14324_SHARP_,p2__14325_SHARP_){
return lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"input","input",556931961),p1__14324_SHARP_,p2__14325_SHARP_);
}));

lt.objs.editor.on.call(null,ed,new cljs.core.Keyword(null,"cursorActivity","cursorActivity",1969301321),(function (p1__14326_SHARP_,p2__14327_SHARP_){
return lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"move","move",-2110884309),p1__14326_SHARP_,p2__14327_SHARP_);
}));

lt.objs.editor.on.call(null,ed,new cljs.core.Keyword(null,"focus","focus",234677911),(function (p1__14328_SHARP_){
return lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"focus","focus",234677911),p1__14328_SHARP_);
}));

return lt.objs.editor.on.call(null,ed,new cljs.core.Keyword(null,"blur","blur",-453500461),(function (p1__14329_SHARP_){
return lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"blur","blur",-453500461),p1__14329_SHARP_);
}));
});
/**
 * Return editor `e`'s buffer content.
 */
lt.objs.editor.__GT_val = (function lt$objs$editor$__GT_val(e){
return lt.objs.editor.__GT_cm_ed.call(null,e).getValue();
});
/**
 * Returns token located as `pos` within editor `e`.
 * 
 *   See [getTokenAt](http://codemirror.net/doc/manual.html#getTokenAt).
 */
lt.objs.editor.__GT_token = (function lt$objs$editor$__GT_token(e,pos){
return cljs.core.js__GT_clj.call(null,lt.objs.editor.__GT_cm_ed.call(null,e).getTokenAt(cljs.core.clj__GT_js.call(null,pos)),new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true);
});
lt.objs.editor.__GT_token_js = (function lt$objs$editor$__GT_token_js(e,pos){
return lt.objs.editor.__GT_cm_ed.call(null,e).getTokenAt(cljs.core.clj__GT_js.call(null,pos));
});
/**
 * Return the type of token located at position `pos` for editor `e`.
 * 
 *   See [getTokenTypeAt](http://codemirror.net/doc/manual.html#getTokenTypeAt).
 */
lt.objs.editor.__GT_token_type = (function lt$objs$editor$__GT_token_type(e,pos){
return lt.objs.editor.__GT_cm_ed.call(null,e).getTokenTypeAt(cljs.core.clj__GT_js.call(null,pos));
});
/**
 * Returns cursor's coordinates of the form `{:left :top: bottom}` for editor `e`.
 * 
 *   See [cursorCoords](http://codemirror.net/doc/manual.html#cursorCoords).
 */
lt.objs.editor.__GT_coords = (function lt$objs$editor$__GT_coords(e){
return cljs.core.js__GT_clj.call(null,lt.objs.editor.__GT_cm_ed.call(null,e).cursorCoords(),new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true,new cljs.core.Keyword(null,"force-obj","force-obj",-1346953566),true);
});
/**
 * Add class `klass` to editor `e`. Returns `e`.
 */
lt.objs.editor._PLUS_class = (function lt$objs$editor$_PLUS_class(e,klass){
lt.util.dom.add_class.call(null,lt.objs.editor.__GT_elem.call(null,e),cljs.core.name.call(null,klass));

return e;
});
/**
 * Remove class `klass` from editor `e`. Returns `e`.
 */
lt.objs.editor._class = (function lt$objs$editor$_class(e,klass){
lt.util.dom.remove_class.call(null,lt.objs.editor.__GT_elem.call(null,e),cljs.core.name.call(null,klass));

return e;
});
/**
 * Return cursor position of editor `e`'s as js object. Returns JSON not edn...
 *   use [[->cursor]] for edn.
 * 
 *   Example:
 *   ```
 *   (cursor e)
 *   ;;=> {"line": 144, "ch": 9}
 *   ```
 */
lt.objs.editor.cursor = (function lt$objs$editor$cursor(var_args){
var args14330 = [];
var len__7868__auto___14333 = arguments.length;
var i__7869__auto___14334 = (0);
while(true){
if((i__7869__auto___14334 < len__7868__auto___14333)){
args14330.push((arguments[i__7869__auto___14334]));

var G__14335 = (i__7869__auto___14334 + (1));
i__7869__auto___14334 = G__14335;
continue;
} else {
}
break;
}

var G__14332 = args14330.length;
switch (G__14332) {
case 1:
return lt.objs.editor.cursor.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return lt.objs.editor.cursor.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args14330.length)].join('')));

}
});

lt.objs.editor.cursor.cljs$core$IFn$_invoke$arity$1 = (function (e){
return lt.objs.editor.cursor.call(null,e,null);
});

lt.objs.editor.cursor.cljs$core$IFn$_invoke$arity$2 = (function (e,side){
return lt.objs.editor.__GT_cm_ed.call(null,e).getCursor(side);
});

lt.objs.editor.cursor.cljs$lang$maxFixedArity = 2;

/**
 * Same as [[cursor]] but returned as edn.
 */
lt.objs.editor.__GT_cursor = (function lt$objs$editor$__GT_cursor(var_args){
var args__7875__auto__ = [];
var len__7868__auto___14343 = arguments.length;
var i__7869__auto___14344 = (0);
while(true){
if((i__7869__auto___14344 < len__7868__auto___14343)){
args__7875__auto__.push((arguments[i__7869__auto___14344]));

var G__14345 = (i__7869__auto___14344 + (1));
i__7869__auto___14344 = G__14345;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((1) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((1)),(0),null)):null);
return lt.objs.editor.__GT_cursor.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7876__auto__);
});

lt.objs.editor.__GT_cursor.cljs$core$IFn$_invoke$arity$variadic = (function (e,p__14339){
var vec__14340 = p__14339;
var side = cljs.core.nth.call(null,vec__14340,(0),null);
var pos = lt.objs.editor.cursor.call(null,e,side);
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",212345235),pos.line,new cljs.core.Keyword(null,"ch","ch",-554717905),pos.ch], null);
});

lt.objs.editor.__GT_cursor.cljs$lang$maxFixedArity = (1);

lt.objs.editor.__GT_cursor.cljs$lang$applyTo = (function (seq14337){
var G__14338 = cljs.core.first.call(null,seq14337);
var seq14337__$1 = cljs.core.next.call(null,seq14337);
return lt.objs.editor.__GT_cursor.cljs$core$IFn$_invoke$arity$variadic(G__14338,seq14337__$1);
});

/**
 * Returns integer based on position `pos` from editor's CodeMirror Object.
 *   Position consists of line and character indexes as JSON, such as:
 * 
 *   ```
 *   {"line": 144, "ch": 9}
 *   ```
 * 
 *   Reverse of [posFromIndex](http://codemirror.net/doc/manual.html#posFromIndex).
 */
lt.objs.editor.pos__GT_index = (function lt$objs$editor$pos__GT_index(e,pos){
return lt.objs.editor.__GT_cm_ed.call(null,e).indexFromPos(cljs.core.clj__GT_js.call(null,pos));
});
/**
 * Marks text in editor `e` within range of `from` and `to`.
 * 
 *   See [markText](http://codemirror.net/doc/manual.html#markText).
 */
lt.objs.editor.mark = (function lt$objs$editor$mark(e,from,to,opts){
return lt.objs.editor.__GT_cm_ed.call(null,e).markText(cljs.core.clj__GT_js.call(null,from),cljs.core.clj__GT_js.call(null,to),cljs.core.clj__GT_js.call(null,opts));
});
/**
 * Returns marks found at `pos` in .
 * 
 *   See [findMarksAt](http://codemirror.net/doc/manual.html#findMarksAt).
 */
lt.objs.editor.find_marks = (function lt$objs$editor$find_marks(e,pos){
return lt.objs.editor.__GT_cm_ed.call(null,e).findMarksAt(cljs.core.clj__GT_js.call(null,pos));
});
/**
 * Insert bookmark at position `from` for widget `widg`.
 * 
 *   See [setBookmark](http://codemirror.net/doc/manual.html#setBookmark).
 */
lt.objs.editor.bookmark = (function lt$objs$editor$bookmark(e,from,widg){
return lt.objs.editor.__GT_cm_ed.call(null,e).setBookmark(cljs.core.clj__GT_js.call(null,from),cljs.core.clj__GT_js.call(null,widg));
});
/**
 * Return value for option name `o` on editor `e`.
 * 
 *   See [getOption](http://codemirror.net/doc/manual.html#getOption).
 */
lt.objs.editor.option = (function lt$objs$editor$option(e,o){
return lt.objs.editor.__GT_cm_ed.call(null,e).getOption(cljs.core.name.call(null,o));
});
/**
 * Set mode option for editor `e`.
 * 
 *   See [getOption](http://codemirror.net/doc/manual.html#getOption).
 */
lt.objs.editor.set_mode = (function lt$objs$editor$set_mode(e,m){
lt.objs.editor.__GT_cm_ed.call(null,e).setOption("mode",m);

return e;
});
/**
 * Return outer mode object for editor `e`.
 * 
 *   See [getMode](http://codemirror.net/doc/manual.html#getMode).
 */
lt.objs.editor.__GT_mode = (function lt$objs$editor$__GT_mode(e){
return lt.objs.editor.__GT_cm_ed.call(null,e).getMode();
});
/**
 * Return focus of editor.
 * 
 *   See [focus](http://codemirror.net/doc/manual.html#focus).
 */
lt.objs.editor.focus = (function lt$objs$editor$focus(e){
lt.objs.editor.__GT_cm_ed.call(null,e).focus();

return e;
});
/**
 * Return input field element of editor.
 * 
 *   See [getInputField](http://codemirror.net/doc/manual.html#getInputField).
 */
lt.objs.editor.input_field = (function lt$objs$editor$input_field(e){
return e.getInputField();
});
/**
 * Blurs input field `e`. Returns `e`.
 */
lt.objs.editor.blur = (function lt$objs$editor$blur(e){
lt.objs.editor.input_field.call(null,e).blur();

return e;
});
/**
 * Refreshes editor. Returns `e`.
 * 
 *   See [refresh](http://codemirror.net/doc/manual.html#refresh).
 */
lt.objs.editor.refresh = (function lt$objs$editor$refresh(e){
lt.objs.editor.__GT_cm_ed.call(null,e).refresh();

return e;
});
/**
 * Add function `func` to trigger when `onCursorActivity` event fires.
 *   `func` should take two arguments, `ed` and `delta`. Returns `e`.
 * 
 *   See [cursorActivity](http://codemirror.net/doc/manual.html#event_cursorActivity)
 */
lt.objs.editor.on_move = (function lt$objs$editor$on_move(e,func){
e.on("onCursorActivity",(function (ed,delta){
return func.call(null,ed,delta);
}));

return e;
});
/**
 * Add function `func` to trigger when `onChange` event fires.
 *   `func` should take two arguments, `ed` and `delta`. Returns `e`.
 * 
 *   See [change](http://codemirror.net/doc/manual.html#event_change)
 */
lt.objs.editor.on_change = (function lt$objs$editor$on_change(e,func){
e.on("onChange",(function (ed,delta){
return func.call(null,ed,delta);
}));

return e;
});
/**
 * Add function `func` to trigger when `onUpdate` event fires.
 *   `func` should take two arguments, `ed` and `delta`. Returns `e`.
 * 
 *   See [update](http://codemirror.net/doc/manual.html#event_update)
 */
lt.objs.editor.on_update = (function lt$objs$editor$on_update(e,func){
e.on("onUpdate",(function (ed,delta){
return func.call(null,ed,delta);
}));

return e;
});
/**
 * Add function `func` to trigger when `onScroll` event fires.
 *   `func` should take two arguments, `ed`. Returns `e`.
 * 
 *   See [scroll](http://codemirror.net/doc/manual.html#event_scroll)
 */
lt.objs.editor.on_scroll = (function lt$objs$editor$on_scroll(e,func){
e.on("onScroll",(function (ed){
return func.call(null,ed);
}));

return e;
});
/**
 * Replace text starting at position `from` for editor with text `v`. If provided, replace will stop at position `to`.
 * 
 *   See [replaceRange](http://codemirror.net/doc/manual.html#replaceRange).
 */
lt.objs.editor.replace = (function lt$objs$editor$replace(var_args){
var args14346 = [];
var len__7868__auto___14349 = arguments.length;
var i__7869__auto___14350 = (0);
while(true){
if((i__7869__auto___14350 < len__7868__auto___14349)){
args14346.push((arguments[i__7869__auto___14350]));

var G__14351 = (i__7869__auto___14350 + (1));
i__7869__auto___14350 = G__14351;
continue;
} else {
}
break;
}

var G__14348 = args14346.length;
switch (G__14348) {
case 3:
return lt.objs.editor.replace.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return lt.objs.editor.replace.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args14346.length)].join('')));

}
});

lt.objs.editor.replace.cljs$core$IFn$_invoke$arity$3 = (function (e,from,v){
return lt.objs.editor.__GT_cm_ed.call(null,e).replaceRange(v,cljs.core.clj__GT_js.call(null,from));
});

lt.objs.editor.replace.cljs$core$IFn$_invoke$arity$4 = (function (e,from,to,v){
return lt.objs.editor.__GT_cm_ed.call(null,e).replaceRange(v,cljs.core.clj__GT_js.call(null,from),cljs.core.clj__GT_js.call(null,to));
});

lt.objs.editor.replace.cljs$lang$maxFixedArity = 4;

/**
 * Returns text between positions `from` and `to`.
 * 
 *   See [getRange](http://codemirror.net/doc/manual.html#getRange).
 */
lt.objs.editor.range = (function lt$objs$editor$range(e,from,to){
return lt.objs.editor.__GT_cm_ed.call(null,e).getRange(cljs.core.clj__GT_js.call(null,from),cljs.core.clj__GT_js.call(null,to));
});
/**
 * Returns the number of lines in the editor.
 * 
 *   See [lineCount](http://codemirror.net/doc/manual.html#lineCount).
 */
lt.objs.editor.line_count = (function lt$objs$editor$line_count(e){
return lt.objs.editor.__GT_cm_ed.call(null,e).lineCount();
});
/**
 * Insert into editor `ed` text `s` at cursor's position. Returns `ed`.
 */
lt.objs.editor.insert_at_cursor = (function lt$objs$editor$insert_at_cursor(ed,s){
lt.objs.editor.replace.call(null,lt.objs.editor.__GT_cm_ed.call(null,ed),lt.objs.editor.__GT_cursor.call(null,ed),s);

return ed;
});
/**
 * Moves editor `ed`'s cursor to position `pos`. If `pos` is nil then default position of line 0, ch 0 is used.
 * 
 *   See [setCursor](http://codemirror.net/doc/manual.html#setCursor).
 */
lt.objs.editor.move_cursor = (function lt$objs$editor$move_cursor(ed,pos){
return lt.objs.editor.__GT_cm_ed.call(null,ed).setCursor(cljs.core.clj__GT_js.call(null,(function (){var or__6793__auto__ = pos;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",212345235),(0),new cljs.core.Keyword(null,"ch","ch",-554717905),(0)], null);
}
})()));
});
/**
 * Scroll editor to pixel position `x`,`y`.
 * 
 *   See [scrollTo](http://codemirror.net/doc/manual.html#scrollTo).
 */
lt.objs.editor.scroll_to = (function lt$objs$editor$scroll_to(ed,x,y){
return lt.objs.editor.__GT_cm_ed.call(null,ed).scrollTo(x,y);
});
/**
 * Scrolls editor `ed` to the cursor and places it in the center of screen.
 */
lt.objs.editor.center_cursor = (function lt$objs$editor$center_cursor(ed){
var l = new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(lt.objs.editor.__GT_cursor.call(null,ed));
var y = lt.objs.editor.__GT_cm_ed.call(null,ed).charCoords(cljs.core.clj__GT_js.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",212345235),l,new cljs.core.Keyword(null,"ch","ch",-554717905),(0)], null)),"local").top;
var half_h = (lt.objs.editor.__GT_cm_ed.call(null,ed).getScrollerElement().offsetHeight / (2));
return lt.objs.editor.scroll_to.call(null,ed,null,((y - half_h) - (-55)));
});
/**
 * True if text is selected in editor.
 * 
 *   See [somethingSelected](http://codemirror.net/doc/manual.html#somethingSelected).
 */
lt.objs.editor.selection_QMARK_ = (function lt$objs$editor$selection_QMARK_(e){
return lt.objs.editor.__GT_cm_ed.call(null,e).somethingSelected();
});
/**
 * When text is selected, returns position `{:from x :to y}` where `x` and `y` are the cursor's start and end values.
 */
lt.objs.editor.selection_bounds = (function lt$objs$editor$selection_bounds(e){
if(cljs.core.truth_(lt.objs.editor.selection_QMARK_.call(null,e))){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"from","from",1815293044),lt.objs.editor.__GT_cursor.call(null,e,"start"),new cljs.core.Keyword(null,"to","to",192099007),lt.objs.editor.__GT_cursor.call(null,e,"end")], null);
} else {
return null;
}
});
/**
 * Returns currently selected text in editor.
 * 
 *   See [getSelection](http://codemirror.net/doc/manual.html#getSelection).
 */
lt.objs.editor.selection = (function lt$objs$editor$selection(e){
return lt.objs.editor.__GT_cm_ed.call(null,e).getSelection();
});
/**
 * Sets editor's selection to `start` and `end` positions.
 * 
 *   See [setSelection](http://codemirror.net/doc/manual.html#setSelection).
 */
lt.objs.editor.set_selection = (function lt$objs$editor$set_selection(e,start,end){
return lt.objs.editor.__GT_cm_ed.call(null,e).setSelection(cljs.core.clj__GT_js.call(null,start),cljs.core.clj__GT_js.call(null,end));
});
/**
 * Sets editor's 'extending' flag to `ext?`.
 * 
 *   See [setExtending](http://codemirror.net/doc/manual.html#setExtending).
 */
lt.objs.editor.set_extending = (function lt$objs$editor$set_extending(e,ext_QMARK_){
return lt.objs.editor.__GT_cm_ed.call(null,e).setExtending(ext_QMARK_);
});
/**
 * Replace selection with `neue` for editor `e`.
 * 
 *   See [replaceSelection](http://codemirror.net/doc/manual.html#replaceSelection).
 */
lt.objs.editor.replace_selection = (function lt$objs$editor$replace_selection(var_args){
var args__7875__auto__ = [];
var len__7868__auto___14360 = arguments.length;
var i__7869__auto___14361 = (0);
while(true){
if((i__7869__auto___14361 < len__7868__auto___14360)){
args__7875__auto__.push((arguments[i__7869__auto___14361]));

var G__14362 = (i__7869__auto___14361 + (1));
i__7869__auto___14361 = G__14362;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((2) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((2)),(0),null)):null);
return lt.objs.editor.replace_selection.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__7876__auto__);
});

lt.objs.editor.replace_selection.cljs$core$IFn$_invoke$arity$variadic = (function (e,neue,p__14356){
var vec__14357 = p__14356;
var after = cljs.core.nth.call(null,vec__14357,(0),null);
return lt.objs.editor.__GT_cm_ed.call(null,e).replaceSelection(neue,cljs.core.name.call(null,(function (){var or__6793__auto__ = after;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return new cljs.core.Keyword(null,"end","end",-268185958);
}
})()),"+input");
});

lt.objs.editor.replace_selection.cljs$lang$maxFixedArity = (2);

lt.objs.editor.replace_selection.cljs$lang$applyTo = (function (seq14353){
var G__14354 = cljs.core.first.call(null,seq14353);
var seq14353__$1 = cljs.core.next.call(null,seq14353);
var G__14355 = cljs.core.first.call(null,seq14353__$1);
var seq14353__$2 = cljs.core.next.call(null,seq14353__$1);
return lt.objs.editor.replace_selection.cljs$core$IFn$_invoke$arity$variadic(G__14354,G__14355,seq14353__$2);
});

/**
 * Undo one edit for editor `e`, if any exist.
 * 
 *   See [undo](http://codemirror.net/doc/manual.html#undo).
 */
lt.objs.editor.undo = (function lt$objs$editor$undo(e){
return lt.objs.editor.__GT_cm_ed.call(null,e).undo();
});
/**
 * Redo one edit for editor `e`, if any exist.
 * 
 *   See [redo](http://codemirror.net/doc/manual.html#redo).
 */
lt.objs.editor.redo = (function lt$objs$editor$redo(e){
return lt.objs.editor.__GT_cm_ed.call(null,e).redo();
});
/**
 * Copies currently selected text from editor.
 */
lt.objs.editor.copy = (function lt$objs$editor$copy(e){
return lt.objs.platform.copy.call(null,lt.objs.editor.selection.call(null,e));
});
/**
 * Cut currently selected text from editor.
 */
lt.objs.editor.cut = (function lt$objs$editor$cut(e){
lt.objs.editor.copy.call(null,e);

return lt.objs.editor.replace_selection.call(null,e,"");
});
/**
 * Paste into editor's current cursor position 
 */
lt.objs.editor.paste = (function lt$objs$editor$paste(e){
return lt.objs.editor.replace_selection.call(null,e,lt.objs.platform.paste.call(null));
});
/**
 * Returns position and dimension, based off of `pos` for editor `e`, in map consisting of `{:left :right :top :bottom}`.
 * 
 *   See [charChords](http://codemirror.net/doc/manual.html#charCoords).
 */
lt.objs.editor.char_coords = (function lt$objs$editor$char_coords(e,pos){
return cljs.core.js__GT_clj.call(null,lt.objs.editor.__GT_cm_ed.call(null,e).charCoords(cljs.core.clj__GT_js.call(null,pos)),new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true,new cljs.core.Keyword(null,"force-obj","force-obj",-1346953566),true);
});
/**
 * Returns `e` rather than the return value of your function `func`.
 * 
 *   See [operation](http://codemirror.net/doc/manual.html#operation).
 */
lt.objs.editor.operation = (function lt$objs$editor$operation(e,func){
lt.objs.editor.__GT_cm_ed.call(null,e).operation(func);

return e;
});
/**
 * Add function `func` to trigger when `:mousedown` fires.
 * 
 *   Returns editor `e`.
 */
lt.objs.editor.on_click = (function lt$objs$editor$on_click(e,func){
var elem = lt.objs.editor.__GT_elem.call(null,e);
lt.util.events.capture.call(null,elem,new cljs.core.Keyword(null,"mousedown","mousedown",1391242074),func);

return e;
});
/**
 * Add function `func` named `name` to CodeMirror API.
 * 
 *   See [defineExtension](http://codemirror.net/doc/manual.html#defineExtension).
 */
lt.objs.editor.extension = (function lt$objs$editor$extension(name,func){
return CodeMirror.defineExtension(name,func);
});
/**
 * Add line widget `elem` (an element), along with any options, at `line` to editor `e`.
 * 
 *   See [addLineWidget](http://codemirror.net/doc/manual.html#addLineWidget).
 */
lt.objs.editor.line_widget = (function lt$objs$editor$line_widget(var_args){
var args__7875__auto__ = [];
var len__7868__auto___14371 = arguments.length;
var i__7869__auto___14372 = (0);
while(true){
if((i__7869__auto___14372 < len__7868__auto___14371)){
args__7875__auto__.push((arguments[i__7869__auto___14372]));

var G__14373 = (i__7869__auto___14372 + (1));
i__7869__auto___14372 = G__14373;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((3) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((3)),(0),null)):null);
return lt.objs.editor.line_widget.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__7876__auto__);
});

lt.objs.editor.line_widget.cljs$core$IFn$_invoke$arity$variadic = (function (e,line,elem,p__14367){
var vec__14368 = p__14367;
var opts = cljs.core.nth.call(null,vec__14368,(0),null);
return lt.objs.editor.__GT_cm_ed.call(null,e).addLineWidget(line,elem,cljs.core.clj__GT_js.call(null,opts));
});

lt.objs.editor.line_widget.cljs$lang$maxFixedArity = (3);

lt.objs.editor.line_widget.cljs$lang$applyTo = (function (seq14363){
var G__14364 = cljs.core.first.call(null,seq14363);
var seq14363__$1 = cljs.core.next.call(null,seq14363);
var G__14365 = cljs.core.first.call(null,seq14363__$1);
var seq14363__$2 = cljs.core.next.call(null,seq14363__$1);
var G__14366 = cljs.core.first.call(null,seq14363__$2);
var seq14363__$3 = cljs.core.next.call(null,seq14363__$2);
return lt.objs.editor.line_widget.cljs$core$IFn$_invoke$arity$variadic(G__14364,G__14365,G__14366,seq14363__$3);
});

/**
 * Remove widget `widg` from editor `e`. Opposite of `line-widget`.
 */
lt.objs.editor.remove_line_widget = (function lt$objs$editor$remove_line_widget(e,widg){
return lt.objs.editor.__GT_cm_ed.call(null,e).removeLineWidget(widg);
});
/**
 * Returns the content of line `l` from editor `e`.
 * 
 *   See [getLine](http://codemirror.net/doc/manual.html#getLine).
 */
lt.objs.editor.line = (function lt$objs$editor$line(e,l){
return lt.objs.editor.__GT_cm_ed.call(null,e).getLine(l);
});
/**
 * Returns the first line of editor `e`.
 * 
 *   See [firstLine](http://codemirror.net/doc/manual.html#firstLine).
 */
lt.objs.editor.first_line = (function lt$objs$editor$first_line(e){
return lt.objs.editor.__GT_cm_ed.call(null,e).firstLine();
});
/**
 * Returns the last line of editor `e`.
 * 
 *   See [lastLine](http://codemirror.net/doc/manual.html#lastLine).
 */
lt.objs.editor.last_line = (function lt$objs$editor$last_line(e){
return lt.objs.editor.__GT_cm_ed.call(null,e).lastLine();
});
/**
 * Returns `LineHandle` object from editor `e` for line `l`.
 * 
 *   See [getLineHandle](http://codemirror.net/doc/manual.html#getLineHandle).
 */
lt.objs.editor.line_handle = (function lt$objs$editor$line_handle(e,l){
return lt.objs.editor.__GT_cm_ed.call(null,e).getLineHandle(l);
});
/**
 * Given LineHandle object `lh`, returns integer for corresponding line from editor `e`.
 * 
 *   See [getLineNumber](http://codemirror.net/doc/manual.html#getLineNumber).
 */
lt.objs.editor.lh__GT_line = (function lt$objs$editor$lh__GT_line(e,lh){
return lt.objs.editor.__GT_cm_ed.call(null,e).getLineNumber(lh);
});
/**
 * Returns the length of line `l` from editor `e`.
 */
lt.objs.editor.line_length = (function lt$objs$editor$line_length(e,l){
return cljs.core.count.call(null,lt.objs.editor.line.call(null,e,l));
});
/**
 * Select all lines from editor `e`.
 */
lt.objs.editor.select_all = (function lt$objs$editor$select_all(e){
return lt.objs.editor.set_selection.call(null,e,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",212345235),lt.objs.editor.first_line.call(null,e),new cljs.core.Keyword(null,"ch","ch",-554717905),(0)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"line","line",212345235),lt.objs.editor.last_line.call(null,e)], null));
});
/**
 * Replace content at line `l` with `text` for editor `e`.
 */
lt.objs.editor.set_line = (function lt$objs$editor$set_line(e,l,text){
var length = lt.objs.editor.line_length.call(null,e,l);
return lt.objs.editor.replace.call(null,e,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",212345235),l,new cljs.core.Keyword(null,"ch","ch",-554717905),(0)], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",212345235),l,new cljs.core.Keyword(null,"ch","ch",-554717905),length], null),text);
});
/**
 * Add CSS class name `class` to LineHandle `lh` at element `plane` for editor `e`.
 * 
 *   See [addLineClass](http://codemirror.net/doc/manual.html#addLineClass).
 */
lt.objs.editor._PLUS_line_class = (function lt$objs$editor$_PLUS_line_class(e,lh,plane,class$){
return lt.objs.editor.__GT_cm_ed.call(null,e).addLineClass(lh,cljs.core.name.call(null,plane),cljs.core.name.call(null,class$));
});
/**
 * Remove CSS class name `class` from LineHandle `lh` at element `plane` for editor `e`.
 *   Opposite of `+line-class`.
 * 
 *   See [removeLineClass](http://codemirror.net/doc/manual.html#removeLineClass).
 */
lt.objs.editor._line_class = (function lt$objs$editor$_line_class(e,lh,plane,class$){
return lt.objs.editor.__GT_cm_ed.call(null,e).removeLineClass(lh,cljs.core.name.call(null,plane),cljs.core.name.call(null,class$));
});
/**
 * Display hint `hint-fn` for editor `e` with any provided options.
 * 
 *   See [show-hint.js](http://codemirror.net/addon/hint/show-hint.js).
 */
lt.objs.editor.show_hints = (function lt$objs$editor$show_hints(e,hint_fn,options){
CodeMirror.showHint(lt.objs.editor.__GT_cm_ed.call(null,e),hint_fn,cljs.core.clj__GT_js.call(null,options));

return e;
});
/**
 * Sets the innerMode of editor `e`'s CodeMirror object with `state` if provided. Returns the mode.
 */
lt.objs.editor.inner_mode = (function lt$objs$editor$inner_mode(var_args){
var args14374 = [];
var len__7868__auto___14377 = arguments.length;
var i__7869__auto___14378 = (0);
while(true){
if((i__7869__auto___14378 < len__7868__auto___14377)){
args14374.push((arguments[i__7869__auto___14378]));

var G__14379 = (i__7869__auto___14378 + (1));
i__7869__auto___14378 = G__14379;
continue;
} else {
}
break;
}

var G__14376 = args14374.length;
switch (G__14376) {
case 1:
return lt.objs.editor.inner_mode.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return lt.objs.editor.inner_mode.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args14374.length)].join('')));

}
});

lt.objs.editor.inner_mode.cljs$core$IFn$_invoke$arity$1 = (function (e){
return lt.objs.editor.inner_mode.call(null,e,null);
});

lt.objs.editor.inner_mode.cljs$core$IFn$_invoke$arity$2 = (function (e,state){
var state__$1 = (function (){var or__6793__auto__ = state;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return lt.objs.editor.__GT_token_js.call(null,e,lt.objs.editor.cursor.call(null,e)).state;
}
})();
return CodeMirror.innerMode(lt.objs.editor.__GT_cm_ed.call(null,e).getMode(),state__$1).mode;
});

lt.objs.editor.inner_mode.cljs$lang$maxFixedArity = 2;

/**
 * Adjust position `loc` with integer offset `dir` and the key `axis`. Axis should either be `:line` or `:ch`.
 *   If `axis` is not specified, defaults to `:ch`.
 */
lt.objs.editor.adjust_loc = (function lt$objs$editor$adjust_loc(var_args){
var args14381 = [];
var len__7868__auto___14384 = arguments.length;
var i__7869__auto___14385 = (0);
while(true){
if((i__7869__auto___14385 < len__7868__auto___14384)){
args14381.push((arguments[i__7869__auto___14385]));

var G__14386 = (i__7869__auto___14385 + (1));
i__7869__auto___14385 = G__14386;
continue;
} else {
}
break;
}

var G__14383 = args14381.length;
switch (G__14383) {
case 2:
return lt.objs.editor.adjust_loc.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return lt.objs.editor.adjust_loc.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args14381.length)].join('')));

}
});

lt.objs.editor.adjust_loc.cljs$core$IFn$_invoke$arity$2 = (function (loc,dir){
return lt.objs.editor.adjust_loc.call(null,loc,dir,new cljs.core.Keyword(null,"ch","ch",-554717905));
});

lt.objs.editor.adjust_loc.cljs$core$IFn$_invoke$arity$3 = (function (loc,dir,axis){
if(cljs.core.truth_(loc)){
return cljs.core.update_in.call(null,loc,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [axis], null),cljs.core._PLUS_,dir);
} else {
return null;
}
});

lt.objs.editor.adjust_loc.cljs$lang$maxFixedArity = 3;

/**
 * Returns the characters found from integer offest `dir` to the current cursor position.
 * 
 *   See range.
 */
lt.objs.editor.get_char = (function lt$objs$editor$get_char(ed,dir){
var loc = lt.objs.editor.__GT_cursor.call(null,ed);
if((dir > (0))){
return lt.objs.editor.range.call(null,ed,loc,lt.objs.editor.adjust_loc.call(null,loc,dir));
} else {
return lt.objs.editor.range.call(null,ed,lt.objs.editor.adjust_loc.call(null,loc,dir),loc);
}
});
/**
 * Indents the line `l` based on the `dir` specified for editor `e`.
 * 
 *   See [indent-line](http://codemirror.net/doc/manual.html#indentLine).
 */
lt.objs.editor.indent_line = (function lt$objs$editor$indent_line(e,l,dir){
return lt.objs.editor.__GT_cm_ed.call(null,e).indentLine(l,dir);
});
/**
 * Indents lines within the range resulting from `from` and `to` based on the `dir` specified
 *   for editor `e`.
 * 
 *   See [indent-line](http://codemirror.net/doc/manual.html#indentLine).
 */
lt.objs.editor.indent_lines = (function lt$objs$editor$indent_lines(e,from,to,dir){
var ed = lt.objs.editor.__GT_cm_ed.call(null,e);
var diff = (new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(to) - new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(from));
if((diff === (0))){
return ed.indentLine(new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(to),dir);
} else {
var n__7708__auto__ = (diff + (1));
var x = (0);
while(true){
if((x < n__7708__auto__)){
ed.indentLine((new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(from) + x));

var G__14388 = (x + (1));
x = G__14388;
continue;
} else {
return null;
}
break;
}
}
});
/**
 * Intent current selection in editor `e` by integer offset `dir`.
 */
lt.objs.editor.indent_selection = (function lt$objs$editor$indent_selection(e,dir){
return lt.objs.editor.__GT_cm_ed.call(null,e).indentSelection(dir);
});
/**
 * Changes lines within range of `from` and `to` into line comments for editor `e`.
 * 
 *   See [lineComment](http://codemirror.net/doc/manual.html#lineComment).
 */
lt.objs.editor.line_comment = (function lt$objs$editor$line_comment(e,from,to,opts){
return lt.objs.editor.__GT_cm_ed.call(null,e).lineComment(cljs.core.clj__GT_js.call(null,from),cljs.core.clj__GT_js.call(null,to),cljs.core.clj__GT_js.call(null,opts));
});
/**
 * Attempts to uncomment lines within range of `from` and `to` for editor `e`.
 * 
 *   Returns `true` if comment range was successfully removed.
 * 
 *   See [uncomment](http://codemirror.net/doc/manual.html#uncomment).
 */
lt.objs.editor.uncomment = (function lt$objs$editor$uncomment(e,from,to,opts){
return lt.objs.editor.__GT_cm_ed.call(null,e).uncomment(cljs.core.clj__GT_js.call(null,from),cljs.core.clj__GT_js.call(null,to),cljs.core.clj__GT_js.call(null,opts));
});
/**
 * Wrap lines within range of `from` and `to` for editor `e`.
 * 
 *   See [blockComment](http://codemirror.net/doc/manual.html#blockComment).
 */
lt.objs.editor.block_comment = (function lt$objs$editor$block_comment(e,from,to,opts){
return lt.objs.editor.__GT_cm_ed.call(null,e).blockComment(cljs.core.clj__GT_js.call(null,from),cljs.core.clj__GT_js.call(null,to),cljs.core.clj__GT_js.call(null,opts));
});
/**
 * Toggle comment and if multiline toggle apply block comment
 */
lt.objs.editor.toggle_comment = (function lt$objs$editor$toggle_comment(e,from,to,opts){
if(cljs.core.truth_(lt.objs.editor.uncomment.call(null,e,from,to,opts))){
return null;
} else {
if(!(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(from),new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(to)))){
return lt.objs.editor.block_comment.call(null,e,from,to,opts);
} else {
return lt.objs.editor.line_comment.call(null,e,from,lt.objs.editor.__GT_cursor.call(null,e,"end"),opts);
}
}
});
/**
 * Returns an integer that can be used to test if edits have occurred.
 * 
 *   See [changeGeneration](http://codemirror.net/doc/manual.html#changeGeneration).
 */
lt.objs.editor.__GT_generation = (function lt$objs$editor$__GT_generation(e){
return lt.objs.editor.__GT_cm_ed.call(null,e).changeGeneration();
});
/**
 * Returns true if document is not clean for generation `gen`. The document is not clean if it has been modified since it was in a clean state.
 * 
 *   See [isClean](http://codemirror.net/doc/manual.html#isClean).
 */
lt.objs.editor.dirty_QMARK_ = (function lt$objs$editor$dirty_QMARK_(e,gen){
return cljs.core.not.call(null,lt.objs.editor.__GT_cm_ed.call(null,e).isClean(gen));
});
/**
 * Returns currently active document for the editor.
 * 
 *   See [getDoc](http://codemirror.net/doc/manual.html#getDoc).
 */
lt.objs.editor.get_doc = (function lt$objs$editor$get_doc(e){
return lt.objs.editor.__GT_cm_ed.call(null,e).getDoc();
});
/**
 * Adds document `doc` to editor `e`. If there is already a document associated with the editor then it is replaced. Returns old document.
 * 
 *   See [swapDoc](http://codemirror.net/doc/manual.html#swapDoc).
 */
lt.objs.editor.set_doc_BANG_ = (function lt$objs$editor$set_doc_BANG_(e,doc){
lt.object.merge_BANG_.call(null,e,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"doc","doc",1913296891),doc], null));

return lt.objs.editor.__GT_cm_ed.call(null,e).swapDoc(new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,doc)));
});
/**
 * Attempts to fold code starting at position `loc`. If position is not provided then folding will be attempted at the cursor position.
 * 
 *   If the code is already folded then an attempt to unfold will occur.
 * 
 *   See [foldcode.js](http://codemirror.net/addon/fold/foldcode.js) addon.
 */
lt.objs.editor.fold_code = (function lt$objs$editor$fold_code(var_args){
var args14389 = [];
var len__7868__auto___14392 = arguments.length;
var i__7869__auto___14393 = (0);
while(true){
if((i__7869__auto___14393 < len__7868__auto___14392)){
args14389.push((arguments[i__7869__auto___14393]));

var G__14394 = (i__7869__auto___14393 + (1));
i__7869__auto___14393 = G__14394;
continue;
} else {
}
break;
}

var G__14391 = args14389.length;
switch (G__14391) {
case 1:
return lt.objs.editor.fold_code.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return lt.objs.editor.fold_code.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args14389.length)].join('')));

}
});

lt.objs.editor.fold_code.cljs$core$IFn$_invoke$arity$1 = (function (e){
return lt.objs.editor.fold_code.call(null,e,lt.objs.editor.__GT_cursor.call(null,e));
});

lt.objs.editor.fold_code.cljs$core$IFn$_invoke$arity$2 = (function (e,loc){
return lt.objs.editor.__GT_cm_ed.call(null,e).foldCode(cljs.core.clj__GT_js.call(null,loc));
});

lt.objs.editor.fold_code.cljs$lang$maxFixedArity = 2;

lt.objs.editor.gutter_widths = (function lt$objs$editor$gutter_widths(e){
var gutter_div = lt.util.dom.$.call(null,new cljs.core.Keyword(null,"div.CodeMirror-gutters","div.CodeMirror-gutters",664233465),lt.object.__GT_content.call(null,e));
var gutter_divs = lt.util.dom.$$.call(null,new cljs.core.Keyword(null,"div.CodeMirror-gutter","div.CodeMirror-gutter",-690221510),gutter_div);
var current_widths = cljs.core.reduce.call(null,((function (gutter_div,gutter_divs){
return (function (res,gutter){
var gutter_class = clojure.string.replace_first.call(null,lt.util.dom.attr.call(null,gutter,"class"),"CodeMirror-gutter ","");
return cljs.core.assoc.call(null,res,gutter_class,lt.util.dom.width.call(null,gutter));
});})(gutter_div,gutter_divs))
,cljs.core.PersistentArrayMap.EMPTY,gutter_divs);
return current_widths;
});
lt.objs.editor.update_gutters = (function lt$objs$editor$update_gutters(e,class_names,class_widths){
var gutter_div = lt.util.dom.$.call(null,new cljs.core.Keyword(null,"div.CodeMirror-gutters","div.CodeMirror-gutters",664233465),lt.object.__GT_content.call(null,e));
return lt.objs.editor.operation.call(null,e,((function (gutter_div){
return (function (){
lt.objs.editor.set_options.call(null,e,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"gutters","gutters",688671428),cljs.core.clj__GT_js.call(null,class_names)], null));

var seq__14406 = cljs.core.seq.call(null,class_widths);
var chunk__14407 = null;
var count__14408 = (0);
var i__14409 = (0);
while(true){
if((i__14409 < count__14408)){
var vec__14410 = cljs.core._nth.call(null,chunk__14407,i__14409);
var k = cljs.core.nth.call(null,vec__14410,(0),null);
var v = cljs.core.nth.call(null,vec__14410,(1),null);
var temp__4655__auto___14416 = lt.util.dom.$.call(null,[cljs.core.str("div."),cljs.core.str(k)].join(''),gutter_div);
if(cljs.core.truth_(temp__4655__auto___14416)){
var gutter_14417 = temp__4655__auto___14416;
lt.util.dom.set_css.call(null,gutter_14417,new cljs.core.PersistentArrayMap(null, 1, ["width",[cljs.core.str(v),cljs.core.str("px")].join('')], null));
} else {
}

var G__14418 = seq__14406;
var G__14419 = chunk__14407;
var G__14420 = count__14408;
var G__14421 = (i__14409 + (1));
seq__14406 = G__14418;
chunk__14407 = G__14419;
count__14408 = G__14420;
i__14409 = G__14421;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__14406);
if(temp__4657__auto__){
var seq__14406__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14406__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__14406__$1);
var G__14422 = cljs.core.chunk_rest.call(null,seq__14406__$1);
var G__14423 = c__7604__auto__;
var G__14424 = cljs.core.count.call(null,c__7604__auto__);
var G__14425 = (0);
seq__14406 = G__14422;
chunk__14407 = G__14423;
count__14408 = G__14424;
i__14409 = G__14425;
continue;
} else {
var vec__14413 = cljs.core.first.call(null,seq__14406__$1);
var k = cljs.core.nth.call(null,vec__14413,(0),null);
var v = cljs.core.nth.call(null,vec__14413,(1),null);
var temp__4655__auto___14426 = lt.util.dom.$.call(null,[cljs.core.str("div."),cljs.core.str(k)].join(''),gutter_div);
if(cljs.core.truth_(temp__4655__auto___14426)){
var gutter_14427 = temp__4655__auto___14426;
lt.util.dom.set_css.call(null,gutter_14427,new cljs.core.PersistentArrayMap(null, 1, ["width",[cljs.core.str(v),cljs.core.str("px")].join('')], null));
} else {
}

var G__14428 = cljs.core.next.call(null,seq__14406__$1);
var G__14429 = null;
var G__14430 = (0);
var G__14431 = (0);
seq__14406 = G__14428;
chunk__14407 = G__14429;
count__14408 = G__14430;
i__14409 = G__14431;
continue;
}
} else {
return null;
}
}
break;
}
});})(gutter_div))
);
});
/**
 * Add gutter with `class-name` of specified `width` to editor `e`.
 */
lt.objs.editor.add_gutter = (function lt$objs$editor$add_gutter(e,class_name,width){
var gutter_classes = cljs.core.set.call(null,cljs.core.conj.call(null,cljs.core.js__GT_clj.call(null,lt.objs.editor.option.call(null,e,"gutters")),class_name));
var current_widths = lt.objs.editor.gutter_widths.call(null,e);
var new_gutter_widths = cljs.core.assoc.call(null,current_widths,class_name,width);
return lt.objs.editor.update_gutters.call(null,e,gutter_classes,new_gutter_widths);
});
/**
 * Remove gutter with `class-name` from editor `e`.
 */
lt.objs.editor.remove_gutter = (function lt$objs$editor$remove_gutter(e,class_name){
var gutter_classes = cljs.core.remove.call(null,cljs.core.PersistentHashSet.fromArray([class_name], true),cljs.core.js__GT_clj.call(null,lt.objs.editor.option.call(null,e,"gutters")));
var current_widths = lt.objs.editor.gutter_widths.call(null,e);
return lt.objs.editor.update_gutters.call(null,e,gutter_classes,current_widths);
});
lt.util.load.js.call(null,"core/node_modules/codemirror/lib/codemirror.js",new cljs.core.Keyword(null,"sync","sync",-624148946));
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.editor","editor","lt.objs.editor/editor",-787440333),new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"editor.keys.normal","editor.keys.normal",-1649567699),null,new cljs.core.Keyword(null,"editor.inline-result","editor.inline-result",389762224),null,new cljs.core.Keyword(null,"editor","editor",-989377770),null], null), null),new cljs.core.Keyword(null,"init","init",-1875481434),(function (obj,info){
var ed = lt.objs.editor.make.call(null,info);
lt.object.merge_BANG_.call(null,obj,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"ed","ed",436294224),ed,new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(info),new cljs.core.Keyword(null,"info","info",-317069002),cljs.core.dissoc.call(null,info,new cljs.core.Keyword(null,"content","content",15833224),new cljs.core.Keyword(null,"doc","doc",1913296891))], null));

lt.objs.editor.wrap_object_events.call(null,ed,obj);

return lt.objs.editor.__GT_elem.call(null,ed);
}));
/**
 * 
 */
lt.objs.editor.__BEH__wrap = (function lt$objs$editor$__BEH__wrap(obj){
return lt.objs.editor.set_options.call(null,obj,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"lineWrapping","lineWrapping",1248501985),true], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.editor","wrap","lt.objs.editor/wrap",381126076),new cljs.core.Keyword(null,"exclusive","exclusive",-1507998718),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("lt.objs.editor","no-wrap","lt.objs.editor/no-wrap",514716809)], null),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Wrap lines",new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"object.instant","object.instant",-29936727),null,new cljs.core.Keyword("lt.object","tags-removed","lt.object/tags-removed",1746536637),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.editor.__BEH__wrap);
/**
 * 
 */
lt.objs.editor.__BEH__no_wrap = (function lt$objs$editor$__BEH__no_wrap(obj){
return lt.objs.editor.set_options.call(null,obj,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"lineWrapping","lineWrapping",1248501985),false], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.editor","no-wrap","lt.objs.editor/no-wrap",514716809),new cljs.core.Keyword(null,"exclusive","exclusive",-1507998718),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("lt.objs.editor","wrap","lt.objs.editor/wrap",381126076)], null),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Unwrap lines",new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"object.instant","object.instant",-29936727),null,new cljs.core.Keyword("lt.object","tags-removed","lt.object/tags-removed",1746536637),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.editor.__BEH__no_wrap);
/**
 * 
 */
lt.objs.editor.__BEH__line_numbers = (function lt$objs$editor$__BEH__line_numbers(this$){
return lt.objs.editor.set_options.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"lineNumbers","lineNumbers",1374890941),true], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.editor","line-numbers","lt.objs.editor/line-numbers",286728446),new cljs.core.Keyword(null,"exclusive","exclusive",-1507998718),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("lt.objs.editor","hide-line-numbers","lt.objs.editor/hide-line-numbers",-555755799)], null),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Show line numbers",new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"object.instant","object.instant",-29936727),null,new cljs.core.Keyword("lt.object","tags-removed","lt.object/tags-removed",1746536637),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.editor.__BEH__line_numbers);
/**
 * 
 */
lt.objs.editor.__BEH__hide_line_numbers = (function lt$objs$editor$__BEH__hide_line_numbers(this$){
return lt.objs.editor.set_options.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"lineNumbers","lineNumbers",1374890941),false], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.editor","hide-line-numbers","lt.objs.editor/hide-line-numbers",-555755799),new cljs.core.Keyword(null,"exclusive","exclusive",-1507998718),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("lt.objs.editor","line-numbers","lt.objs.editor/line-numbers",286728446)], null),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Hide line numbers",new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"object.instant","object.instant",-29936727),null,new cljs.core.Keyword("lt.object","tags-removed","lt.object/tags-removed",1746536637),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.editor.__BEH__hide_line_numbers);
/**
 * 
 */
lt.objs.editor.__BEH__fold_gutter = (function lt$objs$editor$__BEH__fold_gutter(this$){
return lt.objs.editor.set_options.call(null,this$,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"foldGutter","foldGutter",-191001083),true,new cljs.core.Keyword(null,"gutters","gutters",688671428),cljs.core.clj__GT_js.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["CodeMirror-foldgutter"], null))], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.editor","fold-gutter","lt.objs.editor/fold-gutter",680101080),new cljs.core.Keyword(null,"exclusive","exclusive",-1507998718),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("lt.objs.editor","hide-fold-gutter","lt.objs.editor/hide-fold-gutter",-1810199528)], null),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Show fold gutter",new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"object.instant","object.instant",-29936727),null,new cljs.core.Keyword("lt.object","tags-removed","lt.object/tags-removed",1746536637),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.editor.__BEH__fold_gutter);
/**
 * 
 */
lt.objs.editor.__BEH__hide_fold_gutter = (function lt$objs$editor$__BEH__hide_fold_gutter(this$){
return lt.objs.editor.set_options.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"foldGutter","foldGutter",-191001083),false], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.editor","hide-fold-gutter","lt.objs.editor/hide-fold-gutter",-1810199528),new cljs.core.Keyword(null,"exclusive","exclusive",-1507998718),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("lt.objs.editor","fold-gutter","lt.objs.editor/fold-gutter",680101080)], null),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Hide fold gutter",new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"object.instant","object.instant",-29936727),null,new cljs.core.Keyword("lt.object","tags-removed","lt.object/tags-removed",1746536637),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.editor.__BEH__hide_fold_gutter);
/**
 * 
 */
lt.objs.editor.__BEH__scroll_past_end = (function lt$objs$editor$__BEH__scroll_past_end(this$){
return lt.objs.editor.set_options.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"scrollPastEnd","scrollPastEnd",-441016532),true], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.editor","scroll-past-end","lt.objs.editor/scroll-past-end",-1293550555),new cljs.core.Keyword(null,"exclusive","exclusive",-1507998718),true,new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Allow scrolling past the end of the file",new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"object.instant","object.instant",-29936727),null,new cljs.core.Keyword("lt.object","tags-removed","lt.object/tags-removed",1746536637),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.editor.__BEH__scroll_past_end);
/**
 * 
 */
lt.objs.editor.__BEH__tab_settings = (function lt$objs$editor$__BEH__tab_settings(obj,use_tabs_QMARK_,tab_size,indent_unit){
return lt.objs.editor.set_options.call(null,obj,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"tabSize","tabSize",1424875757),tab_size,new cljs.core.Keyword(null,"indentWithTabs","indentWithTabs",520478820),use_tabs_QMARK_,new cljs.core.Keyword(null,"indentUnit","indentUnit",438562839),indent_unit], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.editor","tab-settings","lt.objs.editor/tab-settings",328356318),new cljs.core.Keyword(null,"exclusive","exclusive",-1507998718),true,new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: indent settings (tab size, etc)",new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"Use tabs?",new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"boolean","boolean",-1919418404)], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"Tab size in spaces",new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"number","number",1570378438)], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"Spaces per indent",new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"number","number",1570378438)], null)], null),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"object.instant","object.instant",-29936727),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.editor.__BEH__tab_settings);
/**
 * 
 */
lt.objs.editor.__BEH__set_codemirror_flags = (function lt$objs$editor$__BEH__set_codemirror_flags(this$,flags){
return lt.objs.editor.set_options.call(null,this$,flags);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.editor","set-codemirror-flags","lt.objs.editor/set-codemirror-flags",612717516),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Set CodeMirror flags",new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"Flags map",new cljs.core.Keyword(null,"ex","ex",-1413771341),"{:undoDepth 1000}"], null)], null),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"object.instant","object.instant",-29936727),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.editor.__BEH__set_codemirror_flags);
/**
 * 
 */
lt.objs.editor.__BEH__read_only = (function lt$objs$editor$__BEH__read_only(this$){
lt.object.update_BANG_.call(null,this$,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",-317069002),new cljs.core.Keyword(null,"name","name",1843675177)], null),cljs.core.str," (read-only)");

return lt.objs.editor.set_options.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"readOnly","readOnly",-1749118317),true], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.editor","read-only","lt.objs.editor/read-only",-527935789),new cljs.core.Keyword(null,"exclusive","exclusive",-1507998718),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("lt.objs.editor","not-read-only","lt.objs.editor/not-read-only",-905686214)], null),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: make editor read-only",new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"object.instant","object.instant",-29936727),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.editor.__BEH__read_only);
/**
 * 
 */
lt.objs.editor.__BEH__not_read_only = (function lt$objs$editor$__BEH__not_read_only(this$){
return lt.objs.editor.set_options.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"readOnly","readOnly",-1749118317),false], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.editor","not-read-only","lt.objs.editor/not-read-only",-905686214),new cljs.core.Keyword(null,"exclusive","exclusive",-1507998718),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("lt.objs.editor","read-only","lt.objs.editor/read-only",-527935789)], null),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: make editor writable",new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"object.instant","object.instant",-29936727),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.editor.__BEH__not_read_only);
/**
 * 
 */
lt.objs.editor.__BEH__blink_rate = (function lt$objs$editor$__BEH__blink_rate(this$,rate){
if(cljs.core.truth_(rate)){
return lt.objs.editor.set_options.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cursorBlinkRate","cursorBlinkRate",1916335188),rate], null));
} else {
return lt.objs.editor.set_options.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cursorBlinkRate","cursorBlinkRate",1916335188),(0)], null));
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.editor","blink-rate","lt.objs.editor/blink-rate",2038603526),new cljs.core.Keyword(null,"exclusive","exclusive",-1507998718),true,new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: set cursor blink rate",new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"object.instant","object.instant",-29936727),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.editor.__BEH__blink_rate);
/**
 * 
 */
lt.objs.editor.__BEH__active_on_focus = (function lt$objs$editor$__BEH__active_on_focus(obj){
lt.object.add_tags.call(null,obj,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"editor.active","editor.active",-359264465)], null));

return lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"active","active",1895962068));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.editor","active-on-focus","lt.objs.editor/active-on-focus",-2099431236),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"focus","focus",234677911),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.editor.__BEH__active_on_focus);
/**
 * 
 */
lt.objs.editor.__BEH__inactive_on_blur = (function lt$objs$editor$__BEH__inactive_on_blur(obj){
lt.object.remove_tags.call(null,obj,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"editor.active","editor.active",-359264465)], null));

return lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"inactive","inactive",-306247616));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.editor","inactive-on-blur","lt.objs.editor/inactive-on-blur",479760578),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"blur","blur",-453500461),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.editor.__BEH__inactive_on_blur);
/**
 * 
 */
lt.objs.editor.__BEH__refresh_BANG_ = (function lt$objs$editor$__BEH__refresh_BANG_(this$){
return lt.objs.editor.refresh.call(null,this$);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.editor","refresh!","lt.objs.editor/refresh!",624571526),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"refresh!","refresh!",156149341),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.editor.__BEH__refresh_BANG_);
/**
 * 
 */
lt.objs.editor.__BEH__on_tags_added = (function lt$objs$editor$__BEH__on_tags_added(this$,added){
var seq__14438 = cljs.core.seq.call(null,added);
var chunk__14440 = null;
var count__14441 = (0);
var i__14442 = (0);
while(true){
if((i__14442 < count__14441)){
var a = cljs.core._nth.call(null,chunk__14440,i__14442);
if(cljs.core.truth_(a)){
lt.objs.context.in_BANG_.call(null,a,this$);

var G__14444 = seq__14438;
var G__14445 = chunk__14440;
var G__14446 = count__14441;
var G__14447 = (i__14442 + (1));
seq__14438 = G__14444;
chunk__14440 = G__14445;
count__14441 = G__14446;
i__14442 = G__14447;
continue;
} else {
var G__14448 = seq__14438;
var G__14449 = chunk__14440;
var G__14450 = count__14441;
var G__14451 = (i__14442 + (1));
seq__14438 = G__14448;
chunk__14440 = G__14449;
count__14441 = G__14450;
i__14442 = G__14451;
continue;
}
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__14438);
if(temp__4657__auto__){
var seq__14438__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14438__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__14438__$1);
var G__14452 = cljs.core.chunk_rest.call(null,seq__14438__$1);
var G__14453 = c__7604__auto__;
var G__14454 = cljs.core.count.call(null,c__7604__auto__);
var G__14455 = (0);
seq__14438 = G__14452;
chunk__14440 = G__14453;
count__14441 = G__14454;
i__14442 = G__14455;
continue;
} else {
var a = cljs.core.first.call(null,seq__14438__$1);
if(cljs.core.truth_(a)){
lt.objs.context.in_BANG_.call(null,a,this$);

var G__14456 = cljs.core.next.call(null,seq__14438__$1);
var G__14457 = null;
var G__14458 = (0);
var G__14459 = (0);
seq__14438 = G__14456;
chunk__14440 = G__14457;
count__14441 = G__14458;
i__14442 = G__14459;
continue;
} else {
var G__14460 = cljs.core.next.call(null,seq__14438__$1);
var G__14461 = null;
var G__14462 = (0);
var G__14463 = (0);
seq__14438 = G__14460;
chunk__14440 = G__14461;
count__14441 = G__14462;
i__14442 = G__14463;
continue;
}
}
} else {
return null;
}
}
break;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.editor","on-tags-added","lt.objs.editor/on-tags-added",1531779953),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("lt.object","tags-added","lt.object/tags-added",-1159163937),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.editor.__BEH__on_tags_added);
/**
 * 
 */
lt.objs.editor.__BEH__on_tags_removed = (function lt$objs$editor$__BEH__on_tags_removed(this$,removed){
var seq__14470 = cljs.core.seq.call(null,removed);
var chunk__14472 = null;
var count__14473 = (0);
var i__14474 = (0);
while(true){
if((i__14474 < count__14473)){
var r = cljs.core._nth.call(null,chunk__14472,i__14474);
if(cljs.core.truth_(r)){
lt.objs.context.out_BANG_.call(null,r,this$);

var G__14476 = seq__14470;
var G__14477 = chunk__14472;
var G__14478 = count__14473;
var G__14479 = (i__14474 + (1));
seq__14470 = G__14476;
chunk__14472 = G__14477;
count__14473 = G__14478;
i__14474 = G__14479;
continue;
} else {
var G__14480 = seq__14470;
var G__14481 = chunk__14472;
var G__14482 = count__14473;
var G__14483 = (i__14474 + (1));
seq__14470 = G__14480;
chunk__14472 = G__14481;
count__14473 = G__14482;
i__14474 = G__14483;
continue;
}
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__14470);
if(temp__4657__auto__){
var seq__14470__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14470__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__14470__$1);
var G__14484 = cljs.core.chunk_rest.call(null,seq__14470__$1);
var G__14485 = c__7604__auto__;
var G__14486 = cljs.core.count.call(null,c__7604__auto__);
var G__14487 = (0);
seq__14470 = G__14484;
chunk__14472 = G__14485;
count__14473 = G__14486;
i__14474 = G__14487;
continue;
} else {
var r = cljs.core.first.call(null,seq__14470__$1);
if(cljs.core.truth_(r)){
lt.objs.context.out_BANG_.call(null,r,this$);

var G__14488 = cljs.core.next.call(null,seq__14470__$1);
var G__14489 = null;
var G__14490 = (0);
var G__14491 = (0);
seq__14470 = G__14488;
chunk__14472 = G__14489;
count__14473 = G__14490;
i__14474 = G__14491;
continue;
} else {
var G__14492 = cljs.core.next.call(null,seq__14470__$1);
var G__14493 = null;
var G__14494 = (0);
var G__14495 = (0);
seq__14470 = G__14492;
chunk__14472 = G__14493;
count__14473 = G__14494;
i__14474 = G__14495;
continue;
}
}
} else {
return null;
}
}
break;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.editor","on-tags-removed","lt.objs.editor/on-tags-removed",-284379004),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("lt.object","tags-removed","lt.object/tags-removed",1746536637),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.editor.__BEH__on_tags_removed);
/**
 * 
 */
lt.objs.editor.__BEH__context_on_active = (function lt$objs$editor$__BEH__context_on_active(obj){
return lt.objs.context.in_BANG_.call(null,new cljs.core.Keyword(null,"tags","tags",1771418977).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,obj)),obj);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.editor","context-on-active","lt.objs.editor/context-on-active",931778665),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"active","active",1895962068),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.editor.__BEH__context_on_active);
/**
 * 
 */
lt.objs.editor.__BEH__context_on_inactive = (function lt$objs$editor$__BEH__context_on_inactive(obj){
var tags = new cljs.core.Keyword(null,"tags","tags",1771418977).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,obj));
var cur_editor = lt.objs.context.__GT_obj.call(null,new cljs.core.Keyword(null,"editor","editor",-989377770));
lt.objs.context.out_BANG_.call(null,tags);

if(cljs.core.truth_((function (){var and__6781__auto__ = cur_editor;
if(cljs.core.truth_(and__6781__auto__)){
return cljs.core.not_EQ_.call(null,cur_editor,obj);
} else {
return and__6781__auto__;
}
})())){
lt.objs.context.in_BANG_.call(null,new cljs.core.Keyword(null,"tags","tags",1771418977).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cur_editor)),cur_editor);
} else {
}

return lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"deactivated","deactivated",1307356258));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.editor","context-on-inactive","lt.objs.editor/context-on-inactive",-185483655),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"inactive","inactive",-306247616),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.editor.__BEH__context_on_inactive);
/**
 * 
 */
lt.objs.editor.__BEH__refresh_on_show = (function lt$objs$editor$__BEH__refresh_on_show(obj){
lt.objs.editor.refresh.call(null,new cljs.core.Keyword(null,"ed","ed",436294224).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,obj)));

return lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"focus!","focus!",-1344984927));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.editor","refresh-on-show","lt.objs.editor/refresh-on-show",1200105960),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"show","show",-576705889),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.editor.__BEH__refresh_on_show);
/**
 * 
 */
lt.objs.editor.__BEH__focus = (function lt$objs$editor$__BEH__focus(obj){
return lt.objs.editor.focus.call(null,new cljs.core.Keyword(null,"ed","ed",436294224).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,obj)));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.editor","focus","lt.objs.editor/focus",-500478798),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"focus!","focus!",-1344984927),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.editor.__BEH__focus);
/**
 * 
 */
lt.objs.editor.__BEH__destroy_on_close = (function lt$objs$editor$__BEH__destroy_on_close(obj){
lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"closed","closed",-919675359));

return lt.object.destroy_BANG_.call(null,obj);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.editor","destroy-on-close","lt.objs.editor/destroy-on-close",2082884211),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"close.force","close.force",1317039245),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.editor.__BEH__destroy_on_close);
/**
 * 
 */
lt.objs.editor.__BEH__highlight_current_line = (function lt$objs$editor$__BEH__highlight_current_line(this$){
return lt.objs.editor.set_options.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"styleActiveLine","styleActiveLine",-677594147),true], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.editor","highlight-current-line","lt.objs.editor/highlight-current-line",-1179913622),new cljs.core.Keyword(null,"exclusive","exclusive",-1507998718),true,new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Highlight the current line",new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"object.instant","object.instant",-29936727),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.editor.__BEH__highlight_current_line);
/**
 * 
 */
lt.objs.editor.__BEH__on_change = (function lt$objs$editor$__BEH__on_change(var_args){
var args__7875__auto__ = [];
var len__7868__auto___14499 = arguments.length;
var i__7869__auto___14500 = (0);
while(true){
if((i__7869__auto___14500 < len__7868__auto___14499)){
args__7875__auto__.push((arguments[i__7869__auto___14500]));

var G__14501 = (i__7869__auto___14500 + (1));
i__7869__auto___14500 = G__14501;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((2) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((2)),(0),null)):null);
return lt.objs.editor.__BEH__on_change.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__7876__auto__);
});

lt.objs.editor.__BEH__on_change.cljs$core$IFn$_invoke$arity$variadic = (function (this$,cmd,args){
return cljs.core.apply.call(null,lt.objs.command.exec_BANG_,cmd,args);
});

lt.objs.editor.__BEH__on_change.cljs$lang$maxFixedArity = (2);

lt.objs.editor.__BEH__on_change.cljs$lang$applyTo = (function (seq14496){
var G__14497 = cljs.core.first.call(null,seq14496);
var seq14496__$1 = cljs.core.next.call(null,seq14496);
var G__14498 = cljs.core.first.call(null,seq14496__$1);
var seq14496__$2 = cljs.core.next.call(null,seq14496__$1);
return lt.objs.editor.__BEH__on_change.cljs$core$IFn$_invoke$arity$variadic(G__14497,G__14498,seq14496__$2);
});


lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.editor","on-change","lt.objs.editor/on-change",-1200329948),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: On change execute command",new cljs.core.Keyword(null,"debounce","debounce",-871550296),(300),new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1718410804),"command"], null)], null),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"change","change",-1163046502),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.editor.__BEH__on_change);
/**
 * 
 */
lt.objs.editor.__BEH__menu_BANG_ = (function lt$objs$editor$__BEH__menu_BANG_(this$,e){
var items_14502 = cljs.core.sort_by.call(null,new cljs.core.Keyword(null,"order","order",-1254677256),lt.object.raise_reduce.call(null,this$,new cljs.core.Keyword(null,"menu+","menu+",276559402),cljs.core.PersistentVector.EMPTY));
lt.objs.menu.show_menu.call(null,lt.objs.menu.menu.call(null,items_14502));

lt.util.dom.prevent.call(null,e);

return lt.util.dom.stop_propagation.call(null,e);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.editor","menu!","lt.objs.editor/menu!",487117358),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"menu!","menu!",-1593399467),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.editor.__BEH__menu_BANG_);
/**
 * 
 */
lt.objs.editor.__BEH__copy_paste_menu_PLUS_ = (function lt$objs$editor$__BEH__copy_paste_menu_PLUS_(this$,items){
return cljs.core.conj.call(null,items,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"label","label",1718410804),"Copy",new cljs.core.Keyword(null,"order","order",-1254677256),(1),new cljs.core.Keyword(null,"enabled","enabled",1195909756),cljs.core.boolean$.call(null,lt.objs.editor.selection_QMARK_.call(null,this$)),new cljs.core.Keyword(null,"click","click",1912301393),(function (){
return lt.objs.editor.copy.call(null,this$);
})], null),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"label","label",1718410804),"Cut",new cljs.core.Keyword(null,"order","order",-1254677256),(2),new cljs.core.Keyword(null,"enabled","enabled",1195909756),cljs.core.boolean$.call(null,lt.objs.editor.selection_QMARK_.call(null,this$)),new cljs.core.Keyword(null,"click","click",1912301393),(function (){
return lt.objs.editor.cut.call(null,this$);
})], null),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"label","label",1718410804),"Paste",new cljs.core.Keyword(null,"order","order",-1254677256),(3),new cljs.core.Keyword(null,"enabled","enabled",1195909756),cljs.core.boolean$.call(null,!(cljs.core.empty_QMARK_.call(null,lt.objs.platform.paste.call(null)))),new cljs.core.Keyword(null,"click","click",1912301393),(function (){
return lt.objs.editor.paste.call(null,this$);
})], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),"separator",new cljs.core.Keyword(null,"order","order",-1254677256),(4)], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"label","label",1718410804),"Select all",new cljs.core.Keyword(null,"order","order",-1254677256),(5),new cljs.core.Keyword(null,"click","click",1912301393),(function (){
return lt.objs.editor.select_all.call(null,this$);
})], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.editor","copy-paste-menu+","lt.objs.editor/copy-paste-menu+",1395404160),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"menu+","menu+",276559402),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.editor.__BEH__copy_paste_menu_PLUS_);
/**
 * Modes to not load on startup
 */
lt.objs.editor.mode_blacklist = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 6, ["htmlembedded",null,"clojure",null,"css",null,"javascript",null,"python",null,"htmlmixed",null], null), null);
/**
 * 
 */
lt.objs.editor.__BEH__init_codemirror = (function lt$objs$editor$__BEH__init_codemirror(this$){
lt.util.load.js.call(null,"core/node_modules/codemirror/addon/edit/matchbrackets.js",new cljs.core.Keyword(null,"sync","sync",-624148946));

lt.util.load.js.call(null,"core/node_modules/codemirror/addon/edit/closebrackets.js",new cljs.core.Keyword(null,"sync","sync",-624148946));

lt.util.load.js.call(null,"core/node_modules/codemirror/addon/comment/comment.js",new cljs.core.Keyword(null,"sync","sync",-624148946));

lt.util.load.js.call(null,"core/node_modules/codemirror/addon/selection/active-line.js",new cljs.core.Keyword(null,"sync","sync",-624148946));

lt.util.load.js.call(null,"core/node_modules/codemirror/addon/mode/overlay.js",new cljs.core.Keyword(null,"sync","sync",-624148946));

lt.util.load.js.call(null,"core/node_modules/codemirror/addon/scroll/scrollpastend.js",new cljs.core.Keyword(null,"sync","sync",-624148946));

var seq__14514_14524 = cljs.core.seq.call(null,lt.objs.files.ls.call(null,lt.objs.files.lt_home.call(null,"core/node_modules/codemirror/addon/fold")));
var chunk__14516_14525 = null;
var count__14517_14526 = (0);
var i__14518_14527 = (0);
while(true){
if((i__14518_14527 < count__14517_14526)){
var file_14528 = cljs.core._nth.call(null,chunk__14516_14525,i__14518_14527);
if(cljs.core._EQ_.call(null,lt.objs.files.ext.call(null,file_14528),"js")){
lt.util.load.js.call(null,[cljs.core.str("core/node_modules/codemirror/addon/fold/"),cljs.core.str(file_14528)].join(''),new cljs.core.Keyword(null,"sync","sync",-624148946));

var G__14529 = seq__14514_14524;
var G__14530 = chunk__14516_14525;
var G__14531 = count__14517_14526;
var G__14532 = (i__14518_14527 + (1));
seq__14514_14524 = G__14529;
chunk__14516_14525 = G__14530;
count__14517_14526 = G__14531;
i__14518_14527 = G__14532;
continue;
} else {
var G__14533 = seq__14514_14524;
var G__14534 = chunk__14516_14525;
var G__14535 = count__14517_14526;
var G__14536 = (i__14518_14527 + (1));
seq__14514_14524 = G__14533;
chunk__14516_14525 = G__14534;
count__14517_14526 = G__14535;
i__14518_14527 = G__14536;
continue;
}
} else {
var temp__4657__auto___14537 = cljs.core.seq.call(null,seq__14514_14524);
if(temp__4657__auto___14537){
var seq__14514_14538__$1 = temp__4657__auto___14537;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14514_14538__$1)){
var c__7604__auto___14539 = cljs.core.chunk_first.call(null,seq__14514_14538__$1);
var G__14540 = cljs.core.chunk_rest.call(null,seq__14514_14538__$1);
var G__14541 = c__7604__auto___14539;
var G__14542 = cljs.core.count.call(null,c__7604__auto___14539);
var G__14543 = (0);
seq__14514_14524 = G__14540;
chunk__14516_14525 = G__14541;
count__14517_14526 = G__14542;
i__14518_14527 = G__14543;
continue;
} else {
var file_14544 = cljs.core.first.call(null,seq__14514_14538__$1);
if(cljs.core._EQ_.call(null,lt.objs.files.ext.call(null,file_14544),"js")){
lt.util.load.js.call(null,[cljs.core.str("core/node_modules/codemirror/addon/fold/"),cljs.core.str(file_14544)].join(''),new cljs.core.Keyword(null,"sync","sync",-624148946));

var G__14545 = cljs.core.next.call(null,seq__14514_14538__$1);
var G__14546 = null;
var G__14547 = (0);
var G__14548 = (0);
seq__14514_14524 = G__14545;
chunk__14516_14525 = G__14546;
count__14517_14526 = G__14547;
i__14518_14527 = G__14548;
continue;
} else {
var G__14549 = cljs.core.next.call(null,seq__14514_14538__$1);
var G__14550 = null;
var G__14551 = (0);
var G__14552 = (0);
seq__14514_14524 = G__14549;
chunk__14516_14525 = G__14550;
count__14517_14526 = G__14551;
i__14518_14527 = G__14552;
continue;
}
}
} else {
}
}
break;
}

lt.util.load.css.call(null,"node_modules/codemirror/addon/fold/foldgutter.css");

lt.util.load.js.call(null,"core/node_modules/codemirror/keymap/sublime.js",new cljs.core.Keyword(null,"sync","sync",-624148946));

lt.util.load.js.call(null,"core/node_modules/codemirror/addon/mode/simple.js",new cljs.core.Keyword(null,"sync","sync",-624148946));

var seq__14520_14553 = cljs.core.seq.call(null,lt.objs.files.filter_walk.call(null,(function (p1__14503_SHARP_){
return (cljs.core._EQ_.call(null,lt.objs.files.ext.call(null,p1__14503_SHARP_),"js")) && (cljs.core.not.call(null,cljs.core.some.call(null,(function (m){
return (p1__14503_SHARP_.indexOf([cljs.core.str("core/node_modules/codemirror/mode/"),cljs.core.str(m),cljs.core.str("/")].join('')) > (-1));
}),lt.objs.editor.mode_blacklist))) && (cljs.core.not.call(null,p1__14503_SHARP_.endsWith("test.js")));
}),lt.objs.files.lt_home.call(null,"core/node_modules/codemirror/mode")));
var chunk__14521_14554 = null;
var count__14522_14555 = (0);
var i__14523_14556 = (0);
while(true){
if((i__14523_14556 < count__14522_14555)){
var path_14557 = cljs.core._nth.call(null,chunk__14521_14554,i__14523_14556);
lt.util.load.js.call(null,path_14557,new cljs.core.Keyword(null,"sync","sync",-624148946));

var G__14558 = seq__14520_14553;
var G__14559 = chunk__14521_14554;
var G__14560 = count__14522_14555;
var G__14561 = (i__14523_14556 + (1));
seq__14520_14553 = G__14558;
chunk__14521_14554 = G__14559;
count__14522_14555 = G__14560;
i__14523_14556 = G__14561;
continue;
} else {
var temp__4657__auto___14562 = cljs.core.seq.call(null,seq__14520_14553);
if(temp__4657__auto___14562){
var seq__14520_14563__$1 = temp__4657__auto___14562;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14520_14563__$1)){
var c__7604__auto___14564 = cljs.core.chunk_first.call(null,seq__14520_14563__$1);
var G__14565 = cljs.core.chunk_rest.call(null,seq__14520_14563__$1);
var G__14566 = c__7604__auto___14564;
var G__14567 = cljs.core.count.call(null,c__7604__auto___14564);
var G__14568 = (0);
seq__14520_14553 = G__14565;
chunk__14521_14554 = G__14566;
count__14522_14555 = G__14567;
i__14523_14556 = G__14568;
continue;
} else {
var path_14569 = cljs.core.first.call(null,seq__14520_14563__$1);
lt.util.load.js.call(null,path_14569,new cljs.core.Keyword(null,"sync","sync",-624148946));

var G__14570 = cljs.core.next.call(null,seq__14520_14563__$1);
var G__14571 = null;
var G__14572 = (0);
var G__14573 = (0);
seq__14520_14553 = G__14570;
chunk__14521_14554 = G__14571;
count__14522_14555 = G__14572;
i__14523_14556 = G__14573;
continue;
}
} else {
}
}
break;
}

return (CodeMirror.keyMap.basic["Tab"] = lt.objs.editor.expand_tab);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.editor","init-codemirror","lt.objs.editor/init-codemirror",-1196605866),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"init","init",-1875481434),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.editor.__BEH__init_codemirror);
/**
 * 
 */
lt.objs.editor.__BEH__load_addon = (function lt$objs$editor$__BEH__load_addon(this$,path){
var paths = cljs.core.map.call(null,(function (p1__14574_SHARP_){
return lt.objs.files.join.call(null,lt.objs.files.lt_home.call(null),"core/node_modules/codemirror/addon",p1__14574_SHARP_);
}),((cljs.core.coll_QMARK_.call(null,path))?path:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [path], null)));
lt.object.call_behavior_reaction.call(null,new cljs.core.Keyword("lt.objs.plugins","load-js","lt.objs.plugins/load-js",-1745643293),this$,cljs.core.filter.call(null,((function (paths){
return (function (p1__14575_SHARP_){
return cljs.core._EQ_.call(null,lt.objs.files.ext.call(null,p1__14575_SHARP_),"js");
});})(paths))
,paths));

return lt.object.call_behavior_reaction.call(null,new cljs.core.Keyword("lt.objs.plugins","load-css","lt.objs.plugins/load-css",480386133),this$,cljs.core.filter.call(null,((function (paths){
return (function (p1__14576_SHARP_){
return cljs.core._EQ_.call(null,lt.objs.files.ext.call(null,p1__14576_SHARP_),"css");
});})(paths))
,paths));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.editor","load-addon","lt.objs.editor/load-addon",-765460179),new cljs.core.Keyword(null,"desc","desc",2093485764),"App: Load CodeMirror addon path(s)",new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"path(s)",new cljs.core.Keyword(null,"example","example",-1755779144),"edit/matchtags.js"], null)], null),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"object.instant-load","object.instant-load",853728870),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.editor.__BEH__load_addon);
/**
 * 
 */
lt.objs.editor.__BEH__set_rulers = (function lt$objs$editor$__BEH__set_rulers(this$,rulers){
if(cljs.core.truth_(lt.objs.editor.__GT_cm_ed.call(null,this$).getOption("rulers"))){
} else {
lt.util.load.js.call(null,"core/node_modules/codemirror/addon/display/rulers.js",new cljs.core.Keyword(null,"sync","sync",-624148946));
}

var rulers__$1 = (function (){var or__6793__auto__ = rulers;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"lineStyle","lineStyle",-1451095436),"dashed",new cljs.core.Keyword(null,"color","color",1011675173),"#aff",new cljs.core.Keyword(null,"column","column",2078222095),(80)], null)], null);
}
})();
return lt.objs.editor.set_options.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"rulers","rulers",756731282),cljs.core.clj__GT_js.call(null,rulers__$1)], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.editor","set-rulers","lt.objs.editor/set-rulers",-937738186),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Set CodeMirror rulers",new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"Vector of rulers",new cljs.core.Keyword(null,"example","example",-1755779144),"[{:color \"#cfc\" :column 100 :lineStyle \"dashed\"}]"], null)], null),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"object.instant","object.instant",-29936727),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.editor.__BEH__set_rulers);
/**
 * 
 */
lt.objs.editor.__BEH__autoclose_brackets = (function lt$objs$editor$__BEH__autoclose_brackets(this$,opts){
if(cljs.core.truth_(opts)){
return lt.objs.editor.set_options.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"autoCloseBrackets","autoCloseBrackets",1157493311),cljs.core.clj__GT_js.call(null,opts)], null));
} else {
return lt.objs.editor.set_options.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"autoCloseBrackets","autoCloseBrackets",1157493311),true], null));
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.editor","autoclose-brackets","lt.objs.editor/autoclose-brackets",213231418),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Enable autoclose brackets",new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"map",new cljs.core.Keyword(null,"example","example",-1755779144),"{:pairs \"()[]{}''\\\"\\\"\" :explode \"[]{}\"}"], null)], null),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"object.instant","object.instant",-29936727),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.editor.__BEH__autoclose_brackets);
