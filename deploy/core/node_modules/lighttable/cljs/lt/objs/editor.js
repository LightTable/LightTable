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
var seq__14271_14281 = cljs.core.seq.call(null,m);
var chunk__14272_14282 = null;
var count__14273_14283 = (0);
var i__14274_14284 = (0);
while(true){
if((i__14274_14284 < count__14273_14283)){
var vec__14275_14285 = cljs.core._nth.call(null,chunk__14272_14282,i__14274_14284);
var k_14286 = cljs.core.nth.call(null,vec__14275_14285,(0),null);
var v_14287 = cljs.core.nth.call(null,vec__14275_14285,(1),null);
lt.objs.editor.__GT_cm_ed.call(null,e).setOption(cljs.core.name.call(null,k_14286),v_14287);

var G__14288 = seq__14271_14281;
var G__14289 = chunk__14272_14282;
var G__14290 = count__14273_14283;
var G__14291 = (i__14274_14284 + (1));
seq__14271_14281 = G__14288;
chunk__14272_14282 = G__14289;
count__14273_14283 = G__14290;
i__14274_14284 = G__14291;
continue;
} else {
var temp__4657__auto___14292 = cljs.core.seq.call(null,seq__14271_14281);
if(temp__4657__auto___14292){
var seq__14271_14293__$1 = temp__4657__auto___14292;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14271_14293__$1)){
var c__7604__auto___14294 = cljs.core.chunk_first.call(null,seq__14271_14293__$1);
var G__14295 = cljs.core.chunk_rest.call(null,seq__14271_14293__$1);
var G__14296 = c__7604__auto___14294;
var G__14297 = cljs.core.count.call(null,c__7604__auto___14294);
var G__14298 = (0);
seq__14271_14281 = G__14295;
chunk__14272_14282 = G__14296;
count__14273_14283 = G__14297;
i__14274_14284 = G__14298;
continue;
} else {
var vec__14278_14299 = cljs.core.first.call(null,seq__14271_14293__$1);
var k_14300 = cljs.core.nth.call(null,vec__14278_14299,(0),null);
var v_14301 = cljs.core.nth.call(null,vec__14278_14299,(1),null);
lt.objs.editor.__GT_cm_ed.call(null,e).setOption(cljs.core.name.call(null,k_14300),v_14301);

var G__14302 = cljs.core.next.call(null,seq__14271_14293__$1);
var G__14303 = null;
var G__14304 = (0);
var G__14305 = (0);
seq__14271_14281 = G__14302;
chunk__14272_14282 = G__14303;
count__14273_14283 = G__14304;
i__14274_14284 = G__14305;
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
var temp__4657__auto___14306 = new cljs.core.Keyword(null,"content","content",15833224).cljs$core$IFn$_invoke$arity$1(context);
if(cljs.core.truth_(temp__4657__auto___14306)){
var c_14307 = temp__4657__auto___14306;
lt.objs.editor.set_val.call(null,e,c_14307);

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
lt.util.dom.on.call(null,lt.objs.editor.__GT_elem.call(null,ed),new cljs.core.Keyword(null,"contextmenu","contextmenu",-15887481),(function (p1__14308_SHARP_){
return lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"menu!","menu!",-1593399467),p1__14308_SHARP_);
}));

lt.objs.editor.on.call(null,ed,new cljs.core.Keyword(null,"dragstart","dragstart",955864218),(function (p1__14310_SHARP_,p2__14309_SHARP_){
return p2__14309_SHARP_.preventDefault();
}));

lt.objs.editor.on.call(null,ed,new cljs.core.Keyword(null,"dragenter","dragenter",-237546900),(function (p1__14312_SHARP_,p2__14311_SHARP_){
return p2__14311_SHARP_.preventDefault();
}));

lt.objs.editor.on.call(null,ed,new cljs.core.Keyword(null,"dragover","dragover",-1169536926),(function (p1__14314_SHARP_,p2__14313_SHARP_){
return p2__14313_SHARP_.preventDefault();
}));

lt.objs.editor.on.call(null,ed,new cljs.core.Keyword(null,"drop","drop",364481611),(function (p1__14316_SHARP_,p2__14315_SHARP_){
return p2__14315_SHARP_.preventDefault();
}));

lt.objs.editor.on.call(null,ed,new cljs.core.Keyword(null,"scroll","scroll",971553779),(function (p1__14317_SHARP_){
return lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"scroll","scroll",971553779),p1__14317_SHARP_);
}));

lt.objs.editor.on.call(null,ed,new cljs.core.Keyword(null,"update","update",1045576396),(function (p1__14318_SHARP_,p2__14319_SHARP_){
return lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"update","update",1045576396),p1__14318_SHARP_,p2__14319_SHARP_);
}));

lt.objs.editor.on.call(null,ed,new cljs.core.Keyword(null,"change","change",-1163046502),(function (p1__14320_SHARP_,p2__14321_SHARP_){
return lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"change","change",-1163046502),p1__14320_SHARP_,p2__14321_SHARP_);
}));

lt.objs.editor.on.call(null,ed,new cljs.core.Keyword(null,"inputRead","inputRead",1319869881),(function (p1__14322_SHARP_,p2__14323_SHARP_){
return lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"input","input",556931961),p1__14322_SHARP_,p2__14323_SHARP_);
}));

lt.objs.editor.on.call(null,ed,new cljs.core.Keyword(null,"cursorActivity","cursorActivity",1969301321),(function (p1__14324_SHARP_,p2__14325_SHARP_){
return lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"move","move",-2110884309),p1__14324_SHARP_,p2__14325_SHARP_);
}));

lt.objs.editor.on.call(null,ed,new cljs.core.Keyword(null,"focus","focus",234677911),(function (p1__14326_SHARP_){
return lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"focus","focus",234677911),p1__14326_SHARP_);
}));

return lt.objs.editor.on.call(null,ed,new cljs.core.Keyword(null,"blur","blur",-453500461),(function (p1__14327_SHARP_){
return lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"blur","blur",-453500461),p1__14327_SHARP_);
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
var args14328 = [];
var len__7868__auto___14331 = arguments.length;
var i__7869__auto___14332 = (0);
while(true){
if((i__7869__auto___14332 < len__7868__auto___14331)){
args14328.push((arguments[i__7869__auto___14332]));

var G__14333 = (i__7869__auto___14332 + (1));
i__7869__auto___14332 = G__14333;
continue;
} else {
}
break;
}

var G__14330 = args14328.length;
switch (G__14330) {
case 1:
return lt.objs.editor.cursor.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return lt.objs.editor.cursor.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args14328.length)].join('')));

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
var len__7868__auto___14341 = arguments.length;
var i__7869__auto___14342 = (0);
while(true){
if((i__7869__auto___14342 < len__7868__auto___14341)){
args__7875__auto__.push((arguments[i__7869__auto___14342]));

var G__14343 = (i__7869__auto___14342 + (1));
i__7869__auto___14342 = G__14343;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((1) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((1)),(0),null)):null);
return lt.objs.editor.__GT_cursor.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7876__auto__);
});

lt.objs.editor.__GT_cursor.cljs$core$IFn$_invoke$arity$variadic = (function (e,p__14337){
var vec__14338 = p__14337;
var side = cljs.core.nth.call(null,vec__14338,(0),null);
var pos = lt.objs.editor.cursor.call(null,e,side);
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",212345235),pos.line,new cljs.core.Keyword(null,"ch","ch",-554717905),pos.ch], null);
});

lt.objs.editor.__GT_cursor.cljs$lang$maxFixedArity = (1);

lt.objs.editor.__GT_cursor.cljs$lang$applyTo = (function (seq14335){
var G__14336 = cljs.core.first.call(null,seq14335);
var seq14335__$1 = cljs.core.next.call(null,seq14335);
return lt.objs.editor.__GT_cursor.cljs$core$IFn$_invoke$arity$variadic(G__14336,seq14335__$1);
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
var args14344 = [];
var len__7868__auto___14347 = arguments.length;
var i__7869__auto___14348 = (0);
while(true){
if((i__7869__auto___14348 < len__7868__auto___14347)){
args14344.push((arguments[i__7869__auto___14348]));

var G__14349 = (i__7869__auto___14348 + (1));
i__7869__auto___14348 = G__14349;
continue;
} else {
}
break;
}

var G__14346 = args14344.length;
switch (G__14346) {
case 3:
return lt.objs.editor.replace.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return lt.objs.editor.replace.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args14344.length)].join('')));

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
var len__7868__auto___14358 = arguments.length;
var i__7869__auto___14359 = (0);
while(true){
if((i__7869__auto___14359 < len__7868__auto___14358)){
args__7875__auto__.push((arguments[i__7869__auto___14359]));

var G__14360 = (i__7869__auto___14359 + (1));
i__7869__auto___14359 = G__14360;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((2) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((2)),(0),null)):null);
return lt.objs.editor.replace_selection.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__7876__auto__);
});

lt.objs.editor.replace_selection.cljs$core$IFn$_invoke$arity$variadic = (function (e,neue,p__14354){
var vec__14355 = p__14354;
var after = cljs.core.nth.call(null,vec__14355,(0),null);
return lt.objs.editor.__GT_cm_ed.call(null,e).replaceSelection(neue,cljs.core.name.call(null,(function (){var or__6793__auto__ = after;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return new cljs.core.Keyword(null,"end","end",-268185958);
}
})()),"+input");
});

lt.objs.editor.replace_selection.cljs$lang$maxFixedArity = (2);

lt.objs.editor.replace_selection.cljs$lang$applyTo = (function (seq14351){
var G__14352 = cljs.core.first.call(null,seq14351);
var seq14351__$1 = cljs.core.next.call(null,seq14351);
var G__14353 = cljs.core.first.call(null,seq14351__$1);
var seq14351__$2 = cljs.core.next.call(null,seq14351__$1);
return lt.objs.editor.replace_selection.cljs$core$IFn$_invoke$arity$variadic(G__14352,G__14353,seq14351__$2);
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
var len__7868__auto___14369 = arguments.length;
var i__7869__auto___14370 = (0);
while(true){
if((i__7869__auto___14370 < len__7868__auto___14369)){
args__7875__auto__.push((arguments[i__7869__auto___14370]));

var G__14371 = (i__7869__auto___14370 + (1));
i__7869__auto___14370 = G__14371;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((3) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((3)),(0),null)):null);
return lt.objs.editor.line_widget.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__7876__auto__);
});

lt.objs.editor.line_widget.cljs$core$IFn$_invoke$arity$variadic = (function (e,line,elem,p__14365){
var vec__14366 = p__14365;
var opts = cljs.core.nth.call(null,vec__14366,(0),null);
return lt.objs.editor.__GT_cm_ed.call(null,e).addLineWidget(line,elem,cljs.core.clj__GT_js.call(null,opts));
});

lt.objs.editor.line_widget.cljs$lang$maxFixedArity = (3);

lt.objs.editor.line_widget.cljs$lang$applyTo = (function (seq14361){
var G__14362 = cljs.core.first.call(null,seq14361);
var seq14361__$1 = cljs.core.next.call(null,seq14361);
var G__14363 = cljs.core.first.call(null,seq14361__$1);
var seq14361__$2 = cljs.core.next.call(null,seq14361__$1);
var G__14364 = cljs.core.first.call(null,seq14361__$2);
var seq14361__$3 = cljs.core.next.call(null,seq14361__$2);
return lt.objs.editor.line_widget.cljs$core$IFn$_invoke$arity$variadic(G__14362,G__14363,G__14364,seq14361__$3);
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
var args14372 = [];
var len__7868__auto___14375 = arguments.length;
var i__7869__auto___14376 = (0);
while(true){
if((i__7869__auto___14376 < len__7868__auto___14375)){
args14372.push((arguments[i__7869__auto___14376]));

var G__14377 = (i__7869__auto___14376 + (1));
i__7869__auto___14376 = G__14377;
continue;
} else {
}
break;
}

var G__14374 = args14372.length;
switch (G__14374) {
case 1:
return lt.objs.editor.inner_mode.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return lt.objs.editor.inner_mode.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args14372.length)].join('')));

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
var args14379 = [];
var len__7868__auto___14382 = arguments.length;
var i__7869__auto___14383 = (0);
while(true){
if((i__7869__auto___14383 < len__7868__auto___14382)){
args14379.push((arguments[i__7869__auto___14383]));

var G__14384 = (i__7869__auto___14383 + (1));
i__7869__auto___14383 = G__14384;
continue;
} else {
}
break;
}

var G__14381 = args14379.length;
switch (G__14381) {
case 2:
return lt.objs.editor.adjust_loc.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return lt.objs.editor.adjust_loc.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args14379.length)].join('')));

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

var G__14386 = (x + (1));
x = G__14386;
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
var args14387 = [];
var len__7868__auto___14390 = arguments.length;
var i__7869__auto___14391 = (0);
while(true){
if((i__7869__auto___14391 < len__7868__auto___14390)){
args14387.push((arguments[i__7869__auto___14391]));

var G__14392 = (i__7869__auto___14391 + (1));
i__7869__auto___14391 = G__14392;
continue;
} else {
}
break;
}

var G__14389 = args14387.length;
switch (G__14389) {
case 1:
return lt.objs.editor.fold_code.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return lt.objs.editor.fold_code.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args14387.length)].join('')));

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

var seq__14404 = cljs.core.seq.call(null,class_widths);
var chunk__14405 = null;
var count__14406 = (0);
var i__14407 = (0);
while(true){
if((i__14407 < count__14406)){
var vec__14408 = cljs.core._nth.call(null,chunk__14405,i__14407);
var k = cljs.core.nth.call(null,vec__14408,(0),null);
var v = cljs.core.nth.call(null,vec__14408,(1),null);
var temp__4655__auto___14414 = lt.util.dom.$.call(null,[cljs.core.str("div."),cljs.core.str(k)].join(''),gutter_div);
if(cljs.core.truth_(temp__4655__auto___14414)){
var gutter_14415 = temp__4655__auto___14414;
lt.util.dom.set_css.call(null,gutter_14415,new cljs.core.PersistentArrayMap(null, 1, ["width",[cljs.core.str(v),cljs.core.str("px")].join('')], null));
} else {
}

var G__14416 = seq__14404;
var G__14417 = chunk__14405;
var G__14418 = count__14406;
var G__14419 = (i__14407 + (1));
seq__14404 = G__14416;
chunk__14405 = G__14417;
count__14406 = G__14418;
i__14407 = G__14419;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__14404);
if(temp__4657__auto__){
var seq__14404__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14404__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__14404__$1);
var G__14420 = cljs.core.chunk_rest.call(null,seq__14404__$1);
var G__14421 = c__7604__auto__;
var G__14422 = cljs.core.count.call(null,c__7604__auto__);
var G__14423 = (0);
seq__14404 = G__14420;
chunk__14405 = G__14421;
count__14406 = G__14422;
i__14407 = G__14423;
continue;
} else {
var vec__14411 = cljs.core.first.call(null,seq__14404__$1);
var k = cljs.core.nth.call(null,vec__14411,(0),null);
var v = cljs.core.nth.call(null,vec__14411,(1),null);
var temp__4655__auto___14424 = lt.util.dom.$.call(null,[cljs.core.str("div."),cljs.core.str(k)].join(''),gutter_div);
if(cljs.core.truth_(temp__4655__auto___14424)){
var gutter_14425 = temp__4655__auto___14424;
lt.util.dom.set_css.call(null,gutter_14425,new cljs.core.PersistentArrayMap(null, 1, ["width",[cljs.core.str(v),cljs.core.str("px")].join('')], null));
} else {
}

var G__14426 = cljs.core.next.call(null,seq__14404__$1);
var G__14427 = null;
var G__14428 = (0);
var G__14429 = (0);
seq__14404 = G__14426;
chunk__14405 = G__14427;
count__14406 = G__14428;
i__14407 = G__14429;
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
var seq__14436 = cljs.core.seq.call(null,added);
var chunk__14438 = null;
var count__14439 = (0);
var i__14440 = (0);
while(true){
if((i__14440 < count__14439)){
var a = cljs.core._nth.call(null,chunk__14438,i__14440);
if(cljs.core.truth_(a)){
lt.objs.context.in_BANG_.call(null,a,this$);

var G__14442 = seq__14436;
var G__14443 = chunk__14438;
var G__14444 = count__14439;
var G__14445 = (i__14440 + (1));
seq__14436 = G__14442;
chunk__14438 = G__14443;
count__14439 = G__14444;
i__14440 = G__14445;
continue;
} else {
var G__14446 = seq__14436;
var G__14447 = chunk__14438;
var G__14448 = count__14439;
var G__14449 = (i__14440 + (1));
seq__14436 = G__14446;
chunk__14438 = G__14447;
count__14439 = G__14448;
i__14440 = G__14449;
continue;
}
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__14436);
if(temp__4657__auto__){
var seq__14436__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14436__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__14436__$1);
var G__14450 = cljs.core.chunk_rest.call(null,seq__14436__$1);
var G__14451 = c__7604__auto__;
var G__14452 = cljs.core.count.call(null,c__7604__auto__);
var G__14453 = (0);
seq__14436 = G__14450;
chunk__14438 = G__14451;
count__14439 = G__14452;
i__14440 = G__14453;
continue;
} else {
var a = cljs.core.first.call(null,seq__14436__$1);
if(cljs.core.truth_(a)){
lt.objs.context.in_BANG_.call(null,a,this$);

var G__14454 = cljs.core.next.call(null,seq__14436__$1);
var G__14455 = null;
var G__14456 = (0);
var G__14457 = (0);
seq__14436 = G__14454;
chunk__14438 = G__14455;
count__14439 = G__14456;
i__14440 = G__14457;
continue;
} else {
var G__14458 = cljs.core.next.call(null,seq__14436__$1);
var G__14459 = null;
var G__14460 = (0);
var G__14461 = (0);
seq__14436 = G__14458;
chunk__14438 = G__14459;
count__14439 = G__14460;
i__14440 = G__14461;
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
var seq__14468 = cljs.core.seq.call(null,removed);
var chunk__14470 = null;
var count__14471 = (0);
var i__14472 = (0);
while(true){
if((i__14472 < count__14471)){
var r = cljs.core._nth.call(null,chunk__14470,i__14472);
if(cljs.core.truth_(r)){
lt.objs.context.out_BANG_.call(null,r,this$);

var G__14474 = seq__14468;
var G__14475 = chunk__14470;
var G__14476 = count__14471;
var G__14477 = (i__14472 + (1));
seq__14468 = G__14474;
chunk__14470 = G__14475;
count__14471 = G__14476;
i__14472 = G__14477;
continue;
} else {
var G__14478 = seq__14468;
var G__14479 = chunk__14470;
var G__14480 = count__14471;
var G__14481 = (i__14472 + (1));
seq__14468 = G__14478;
chunk__14470 = G__14479;
count__14471 = G__14480;
i__14472 = G__14481;
continue;
}
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__14468);
if(temp__4657__auto__){
var seq__14468__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14468__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__14468__$1);
var G__14482 = cljs.core.chunk_rest.call(null,seq__14468__$1);
var G__14483 = c__7604__auto__;
var G__14484 = cljs.core.count.call(null,c__7604__auto__);
var G__14485 = (0);
seq__14468 = G__14482;
chunk__14470 = G__14483;
count__14471 = G__14484;
i__14472 = G__14485;
continue;
} else {
var r = cljs.core.first.call(null,seq__14468__$1);
if(cljs.core.truth_(r)){
lt.objs.context.out_BANG_.call(null,r,this$);

var G__14486 = cljs.core.next.call(null,seq__14468__$1);
var G__14487 = null;
var G__14488 = (0);
var G__14489 = (0);
seq__14468 = G__14486;
chunk__14470 = G__14487;
count__14471 = G__14488;
i__14472 = G__14489;
continue;
} else {
var G__14490 = cljs.core.next.call(null,seq__14468__$1);
var G__14491 = null;
var G__14492 = (0);
var G__14493 = (0);
seq__14468 = G__14490;
chunk__14470 = G__14491;
count__14471 = G__14492;
i__14472 = G__14493;
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
var len__7868__auto___14497 = arguments.length;
var i__7869__auto___14498 = (0);
while(true){
if((i__7869__auto___14498 < len__7868__auto___14497)){
args__7875__auto__.push((arguments[i__7869__auto___14498]));

var G__14499 = (i__7869__auto___14498 + (1));
i__7869__auto___14498 = G__14499;
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

lt.objs.editor.__BEH__on_change.cljs$lang$applyTo = (function (seq14494){
var G__14495 = cljs.core.first.call(null,seq14494);
var seq14494__$1 = cljs.core.next.call(null,seq14494);
var G__14496 = cljs.core.first.call(null,seq14494__$1);
var seq14494__$2 = cljs.core.next.call(null,seq14494__$1);
return lt.objs.editor.__BEH__on_change.cljs$core$IFn$_invoke$arity$variadic(G__14495,G__14496,seq14494__$2);
});


lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.editor","on-change","lt.objs.editor/on-change",-1200329948),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: On change execute command",new cljs.core.Keyword(null,"debounce","debounce",-871550296),(300),new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1718410804),"command"], null)], null),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"change","change",-1163046502),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.editor.__BEH__on_change);
/**
 * 
 */
lt.objs.editor.__BEH__menu_BANG_ = (function lt$objs$editor$__BEH__menu_BANG_(this$,e){
var items_14500 = cljs.core.sort_by.call(null,new cljs.core.Keyword(null,"order","order",-1254677256),lt.object.raise_reduce.call(null,this$,new cljs.core.Keyword(null,"menu+","menu+",276559402),cljs.core.PersistentVector.EMPTY));
lt.objs.menu.show_menu.call(null,lt.objs.menu.menu.call(null,items_14500));

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

lt.util.load.js.call(null,"core/node_modules/codemirror_addons/overlay.js",new cljs.core.Keyword(null,"sync","sync",-624148946));

lt.util.load.js.call(null,"core/node_modules/codemirror/addon/scroll/scrollpastend.js",new cljs.core.Keyword(null,"sync","sync",-624148946));

var seq__14512_14522 = cljs.core.seq.call(null,lt.objs.files.ls.call(null,lt.objs.files.lt_home.call(null,"core/node_modules/codemirror/addon/fold")));
var chunk__14514_14523 = null;
var count__14515_14524 = (0);
var i__14516_14525 = (0);
while(true){
if((i__14516_14525 < count__14515_14524)){
var file_14526 = cljs.core._nth.call(null,chunk__14514_14523,i__14516_14525);
if(cljs.core._EQ_.call(null,lt.objs.files.ext.call(null,file_14526),"js")){
lt.util.load.js.call(null,[cljs.core.str("core/node_modules/codemirror/addon/fold/"),cljs.core.str(file_14526)].join(''),new cljs.core.Keyword(null,"sync","sync",-624148946));

var G__14527 = seq__14512_14522;
var G__14528 = chunk__14514_14523;
var G__14529 = count__14515_14524;
var G__14530 = (i__14516_14525 + (1));
seq__14512_14522 = G__14527;
chunk__14514_14523 = G__14528;
count__14515_14524 = G__14529;
i__14516_14525 = G__14530;
continue;
} else {
var G__14531 = seq__14512_14522;
var G__14532 = chunk__14514_14523;
var G__14533 = count__14515_14524;
var G__14534 = (i__14516_14525 + (1));
seq__14512_14522 = G__14531;
chunk__14514_14523 = G__14532;
count__14515_14524 = G__14533;
i__14516_14525 = G__14534;
continue;
}
} else {
var temp__4657__auto___14535 = cljs.core.seq.call(null,seq__14512_14522);
if(temp__4657__auto___14535){
var seq__14512_14536__$1 = temp__4657__auto___14535;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14512_14536__$1)){
var c__7604__auto___14537 = cljs.core.chunk_first.call(null,seq__14512_14536__$1);
var G__14538 = cljs.core.chunk_rest.call(null,seq__14512_14536__$1);
var G__14539 = c__7604__auto___14537;
var G__14540 = cljs.core.count.call(null,c__7604__auto___14537);
var G__14541 = (0);
seq__14512_14522 = G__14538;
chunk__14514_14523 = G__14539;
count__14515_14524 = G__14540;
i__14516_14525 = G__14541;
continue;
} else {
var file_14542 = cljs.core.first.call(null,seq__14512_14536__$1);
if(cljs.core._EQ_.call(null,lt.objs.files.ext.call(null,file_14542),"js")){
lt.util.load.js.call(null,[cljs.core.str("core/node_modules/codemirror/addon/fold/"),cljs.core.str(file_14542)].join(''),new cljs.core.Keyword(null,"sync","sync",-624148946));

var G__14543 = cljs.core.next.call(null,seq__14512_14536__$1);
var G__14544 = null;
var G__14545 = (0);
var G__14546 = (0);
seq__14512_14522 = G__14543;
chunk__14514_14523 = G__14544;
count__14515_14524 = G__14545;
i__14516_14525 = G__14546;
continue;
} else {
var G__14547 = cljs.core.next.call(null,seq__14512_14536__$1);
var G__14548 = null;
var G__14549 = (0);
var G__14550 = (0);
seq__14512_14522 = G__14547;
chunk__14514_14523 = G__14548;
count__14515_14524 = G__14549;
i__14516_14525 = G__14550;
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

var seq__14518_14551 = cljs.core.seq.call(null,lt.objs.files.filter_walk.call(null,(function (p1__14501_SHARP_){
return (cljs.core._EQ_.call(null,lt.objs.files.ext.call(null,p1__14501_SHARP_),"js")) && (cljs.core.not.call(null,cljs.core.some.call(null,(function (m){
return (p1__14501_SHARP_.indexOf([cljs.core.str("core/node_modules/codemirror/mode/"),cljs.core.str(m),cljs.core.str("/")].join('')) > (-1));
}),lt.objs.editor.mode_blacklist))) && (cljs.core.not.call(null,p1__14501_SHARP_.endsWith("test.js")));
}),lt.objs.files.lt_home.call(null,"core/node_modules/codemirror/mode")));
var chunk__14519_14552 = null;
var count__14520_14553 = (0);
var i__14521_14554 = (0);
while(true){
if((i__14521_14554 < count__14520_14553)){
var path_14555 = cljs.core._nth.call(null,chunk__14519_14552,i__14521_14554);
lt.util.load.js.call(null,path_14555,new cljs.core.Keyword(null,"sync","sync",-624148946));

var G__14556 = seq__14518_14551;
var G__14557 = chunk__14519_14552;
var G__14558 = count__14520_14553;
var G__14559 = (i__14521_14554 + (1));
seq__14518_14551 = G__14556;
chunk__14519_14552 = G__14557;
count__14520_14553 = G__14558;
i__14521_14554 = G__14559;
continue;
} else {
var temp__4657__auto___14560 = cljs.core.seq.call(null,seq__14518_14551);
if(temp__4657__auto___14560){
var seq__14518_14561__$1 = temp__4657__auto___14560;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14518_14561__$1)){
var c__7604__auto___14562 = cljs.core.chunk_first.call(null,seq__14518_14561__$1);
var G__14563 = cljs.core.chunk_rest.call(null,seq__14518_14561__$1);
var G__14564 = c__7604__auto___14562;
var G__14565 = cljs.core.count.call(null,c__7604__auto___14562);
var G__14566 = (0);
seq__14518_14551 = G__14563;
chunk__14519_14552 = G__14564;
count__14520_14553 = G__14565;
i__14521_14554 = G__14566;
continue;
} else {
var path_14567 = cljs.core.first.call(null,seq__14518_14561__$1);
lt.util.load.js.call(null,path_14567,new cljs.core.Keyword(null,"sync","sync",-624148946));

var G__14568 = cljs.core.next.call(null,seq__14518_14561__$1);
var G__14569 = null;
var G__14570 = (0);
var G__14571 = (0);
seq__14518_14551 = G__14568;
chunk__14519_14552 = G__14569;
count__14520_14553 = G__14570;
i__14521_14554 = G__14571;
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
var paths = cljs.core.map.call(null,(function (p1__14572_SHARP_){
return lt.objs.files.join.call(null,lt.objs.files.lt_home.call(null),"core/node_modules/codemirror/addon",p1__14572_SHARP_);
}),((cljs.core.coll_QMARK_.call(null,path))?path:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [path], null)));
lt.object.call_behavior_reaction.call(null,new cljs.core.Keyword("lt.objs.plugins","load-js","lt.objs.plugins/load-js",-1745643293),this$,cljs.core.filter.call(null,((function (paths){
return (function (p1__14573_SHARP_){
return cljs.core._EQ_.call(null,lt.objs.files.ext.call(null,p1__14573_SHARP_),"js");
});})(paths))
,paths));

return lt.object.call_behavior_reaction.call(null,new cljs.core.Keyword("lt.objs.plugins","load-css","lt.objs.plugins/load-css",480386133),this$,cljs.core.filter.call(null,((function (paths){
return (function (p1__14574_SHARP_){
return cljs.core._EQ_.call(null,lt.objs.files.ext.call(null,p1__14574_SHARP_),"css");
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
