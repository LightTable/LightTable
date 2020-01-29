// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.util.dom');
goog.require('cljs.core');
/**
 * Return lazy seq of NodeList.
 */
lt.util.dom.lazy_nl_via_item = (function lt$util$dom$lazy_nl_via_item(var_args){
var args12780 = [];
var len__7868__auto___12783 = arguments.length;
var i__7869__auto___12784 = (0);
while(true){
if((i__7869__auto___12784 < len__7868__auto___12783)){
args12780.push((arguments[i__7869__auto___12784]));

var G__12785 = (i__7869__auto___12784 + (1));
i__7869__auto___12784 = G__12785;
continue;
} else {
}
break;
}

var G__12782 = args12780.length;
switch (G__12782) {
case 1:
return lt.util.dom.lazy_nl_via_item.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return lt.util.dom.lazy_nl_via_item.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args12780.length)].join('')));

}
});

lt.util.dom.lazy_nl_via_item.cljs$core$IFn$_invoke$arity$1 = (function (nl){
return lt.util.dom.lazy_nl_via_item.call(null,nl,(0));
});

lt.util.dom.lazy_nl_via_item.cljs$core$IFn$_invoke$arity$2 = (function (nl,n){
if((n < nl.length)){
return (new cljs.core.LazySeq(null,(function (){
return cljs.core.cons.call(null,nl.item(n),lt.util.dom.lazy_nl_via_item.call(null,nl,(n + (1))));
}),null,null));
} else {
return null;
}
});

lt.util.dom.lazy_nl_via_item.cljs$lang$maxFixedArity = 2;

HTMLCollection.prototype.cljs$core$ISeqable$ = true;

HTMLCollection.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this$){
var this$__$1 = this;
return lt.util.dom.lazy_nl_via_item.call(null,this$__$1);
});

HTMLCollection.prototype.cljs$core$ICounted$ = true;

HTMLCollection.prototype.cljs$core$ICounted$_count$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1.length;
});

HTMLCollection.prototype.cljs$core$IIndexed$ = true;

HTMLCollection.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (this$,n){
var this$__$1 = this;
return this$__$1.item(n);
});

HTMLCollection.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (this$,n,not_found){
var this$__$1 = this;
var or__6793__auto__ = this$__$1.item(n);
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return not_found;
}
});
NodeList.prototype.cljs$core$ISeqable$ = true;

NodeList.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this$){
var this$__$1 = this;
return lt.util.dom.lazy_nl_via_item.call(null,this$__$1);
});

NodeList.prototype.cljs$core$ICounted$ = true;

NodeList.prototype.cljs$core$ICounted$_count$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1.length;
});

NodeList.prototype.cljs$core$IIndexed$ = true;

NodeList.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (this$,n){
var this$__$1 = this;
return this$__$1.item(n);
});

NodeList.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (this$,n,not_found){
var this$__$1 = this;
var or__6793__auto__ = this$__$1.item(n);
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return not_found;
}
});
/**
 * Create a text node containing string `text`.
 */
lt.util.dom.text_node = (function lt$util$dom$text_node(text){
return document.createTextNode(text);
});
/**
 * Returns a NodeList of all elements within `elem` that match `query`.
 * 
 *   If `elem` is not specified then the entire document is used.
 */
lt.util.dom.$$ = (function lt$util$dom$$$(var_args){
var args12787 = [];
var len__7868__auto___12790 = arguments.length;
var i__7869__auto___12791 = (0);
while(true){
if((i__7869__auto___12791 < len__7868__auto___12790)){
args12787.push((arguments[i__7869__auto___12791]));

var G__12792 = (i__7869__auto___12791 + (1));
i__7869__auto___12791 = G__12792;
continue;
} else {
}
break;
}

var G__12789 = args12787.length;
switch (G__12789) {
case 1:
return lt.util.dom.$$.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return lt.util.dom.$$.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args12787.length)].join('')));

}
});

lt.util.dom.$$.cljs$core$IFn$_invoke$arity$1 = (function (query){
return lt.util.dom.$$.call(null,query,document);
});

lt.util.dom.$$.cljs$core$IFn$_invoke$arity$2 = (function (query,elem){
return elem.querySelectorAll(cljs.core.name.call(null,query));
});

lt.util.dom.$$.cljs$lang$maxFixedArity = 2;

/**
 * Returns the first element found within `elem` that matches `query`.
 * 
 *   If `elem` is not specified then the entire document is used.
 * 
 *   Example:
 *   ```
 *   ;; Assume there exists a div such as:
 *   ;; <div class="tabsets">
 * 
 *   ($ "div .tabsets")
 *   ;;=> #<[object HTMLDivElement]>
 *   ```
 */
lt.util.dom.$ = (function lt$util$dom$$(var_args){
var args12794 = [];
var len__7868__auto___12797 = arguments.length;
var i__7869__auto___12798 = (0);
while(true){
if((i__7869__auto___12798 < len__7868__auto___12797)){
args12794.push((arguments[i__7869__auto___12798]));

var G__12799 = (i__7869__auto___12798 + (1));
i__7869__auto___12798 = G__12799;
continue;
} else {
}
break;
}

var G__12796 = args12794.length;
switch (G__12796) {
case 1:
return lt.util.dom.$.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return lt.util.dom.$.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args12794.length)].join('')));

}
});

lt.util.dom.$.cljs$core$IFn$_invoke$arity$1 = (function (query){
return lt.util.dom.$.call(null,query,document);
});

lt.util.dom.$.cljs$core$IFn$_invoke$arity$2 = (function (query,elem){
return elem.querySelector(cljs.core.name.call(null,query));
});

lt.util.dom.$.cljs$lang$maxFixedArity = 2;

/**
 * Append `child` to the `parent` as a child node. If `child` already exists
 *   as a node then it is moved to the new location.
 * 
 *   Returns `parent`.
 */
lt.util.dom.append = (function lt$util$dom$append(parent,child){
parent.appendChild(child);

return parent;
});
/**
 * Insert `child` as the first child node of `parent`, if there already exist children nodes.
 *   Otherwise, [[append]] `child`.
 */
lt.util.dom.prepend = (function lt$util$dom$prepend(parent,child){
if(cljs.core.truth_(parent.firstChild)){
return parent.insertBefore(child,parent.firstChild);
} else {
return lt.util.dom.append.call(null,parent,child);
}
});
/**
 * Add `class` to the classList of `elem`.
 */
lt.util.dom.add_class = (function lt$util$dom$add_class(elem,class$){
if(cljs.core.truth_((function (){var and__6781__auto__ = elem;
if(cljs.core.truth_(and__6781__auto__)){
return !(cljs.core.empty_QMARK_.call(null,cljs.core.name.call(null,class$)));
} else {
return and__6781__auto__;
}
})())){
return elem.classList.add(cljs.core.name.call(null,class$));
} else {
return null;
}
});
/**
 * Remove `class` from the classList of `elem`.
 */
lt.util.dom.remove_class = (function lt$util$dom$remove_class(elem,class$){
if(cljs.core.truth_((function (){var and__6781__auto__ = elem;
if(cljs.core.truth_(and__6781__auto__)){
return !(cljs.core.empty_QMARK_.call(null,cljs.core.name.call(null,class$)));
} else {
return and__6781__auto__;
}
})())){
return elem.classList.remove(cljs.core.name.call(null,class$));
} else {
return null;
}
});
/**
 * True when `elem` has `class` in its classList.
 */
lt.util.dom.has_class_QMARK_ = (function lt$util$dom$has_class_QMARK_(elem,class$){
if(cljs.core.truth_((function (){var and__6781__auto__ = elem;
if(cljs.core.truth_(and__6781__auto__)){
return !(cljs.core.empty_QMARK_.call(null,cljs.core.name.call(null,class$)));
} else {
return and__6781__auto__;
}
})())){
return elem.classList.contains(cljs.core.name.call(null,class$));
} else {
return null;
}
});
/**
 * If `elem` has `class` then remove `class`. Otherwise, `class` is added to `elem`.
 */
lt.util.dom.toggle_class = (function lt$util$dom$toggle_class(elem,class$){
if(cljs.core.truth_(lt.util.dom.has_class_QMARK_.call(null,elem,class$))){
return lt.util.dom.remove_class.call(null,elem,class$);
} else {
return lt.util.dom.add_class.call(null,elem,class$);
}
});
/**
 * Add each key-value pair in `things` to `elem`'s style.
 * 
 *   Returns `nil`, if change was successful.
 * 
 *   Example:
 *   ```
 *   ;; Assume there exists a div such as:
 *   ;; <div class="tabsets" style="bottom: 34px;">
 * 
 *   ;; Returns nil, but makes the change.
 *   (dom/set-css ($ "div") {"bottom" "50px"})
 *   ;;=> nil
 *   ;; div is now: <div class="tabsets" style="bottom: 50px;">
 *   ```
 */
lt.util.dom.set_css = (function lt$util$dom$set_css(elem,things){
var seq__12811 = cljs.core.seq.call(null,things);
var chunk__12812 = null;
var count__12813 = (0);
var i__12814 = (0);
while(true){
if((i__12814 < count__12813)){
var vec__12815 = cljs.core._nth.call(null,chunk__12812,i__12814);
var k = cljs.core.nth.call(null,vec__12815,(0),null);
var v = cljs.core.nth.call(null,vec__12815,(1),null);
(elem.style[cljs.core.name.call(null,k)] = (((v instanceof cljs.core.Keyword))?cljs.core.name.call(null,v):v));

var G__12821 = seq__12811;
var G__12822 = chunk__12812;
var G__12823 = count__12813;
var G__12824 = (i__12814 + (1));
seq__12811 = G__12821;
chunk__12812 = G__12822;
count__12813 = G__12823;
i__12814 = G__12824;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__12811);
if(temp__4657__auto__){
var seq__12811__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__12811__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__12811__$1);
var G__12825 = cljs.core.chunk_rest.call(null,seq__12811__$1);
var G__12826 = c__7604__auto__;
var G__12827 = cljs.core.count.call(null,c__7604__auto__);
var G__12828 = (0);
seq__12811 = G__12825;
chunk__12812 = G__12826;
count__12813 = G__12827;
i__12814 = G__12828;
continue;
} else {
var vec__12818 = cljs.core.first.call(null,seq__12811__$1);
var k = cljs.core.nth.call(null,vec__12818,(0),null);
var v = cljs.core.nth.call(null,vec__12818,(1),null);
(elem.style[cljs.core.name.call(null,k)] = (((v instanceof cljs.core.Keyword))?cljs.core.name.call(null,v):v));

var G__12829 = cljs.core.next.call(null,seq__12811__$1);
var G__12830 = null;
var G__12831 = (0);
var G__12832 = (0);
seq__12811 = G__12829;
chunk__12812 = G__12830;
count__12813 = G__12831;
i__12814 = G__12832;
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
 * If `things` is a map, sets the CSS of `elem` via [[set-css]]. Otherwise,
 *   returns what is located at key `things` in `elem`.
 * 
 *   Example:
 *   ```
 *   ;; Assume there exists a div such as:
 *   ;; <div class="tabsets" style="bottom: 34px;">
 * 
 *   (css ($ "div .tabsets") :bottom)
 *   ;;=> "34px"
 * 
 *   ;; Returns nil, but makes the change.
 *   (css ($ "div .tabsets") {"bottom" "50px"})
 *   ;;=> nil
 * 
 *   (css ($ "div .tabsets") "bottom")
 *   ;;=> "50px"
 *   ```
 */
lt.util.dom.css = (function lt$util$dom$css(elem,things){
var things__$1 = ((cljs.core._EQ_.call(null,Object,cljs.core.type.call(null,things)))?cljs.core.js__GT_clj.call(null,things):things);
if(cljs.core.map_QMARK_.call(null,things__$1)){
return lt.util.dom.set_css.call(null,elem,things__$1);
} else {
return (elem.style[cljs.core.name.call(null,things__$1)]);
}
});
/**
 * Add each key-value pair in `things` to `elem`'s attributes.
 * 
 *   Returns `nil`, if change was successful.
 * 
 *   Example:
 *   ```
 *   ;; Assume there exists a div such as:
 *   ;; <div class="tabsets">
 * 
 *   ;; Returns nil, but makes the change.
 *   (dom/set-attr ($ "div .tabsets") {:draggable "true"})
 *   ;;=> nil
 *   ;; div is now: <div class="tabsets" draggable="true";>
 *   ```
 */
lt.util.dom.set_attr = (function lt$util$dom$set_attr(elem,things){
var seq__12843 = cljs.core.seq.call(null,things);
var chunk__12844 = null;
var count__12845 = (0);
var i__12846 = (0);
while(true){
if((i__12846 < count__12845)){
var vec__12847 = cljs.core._nth.call(null,chunk__12844,i__12846);
var k = cljs.core.nth.call(null,vec__12847,(0),null);
var v = cljs.core.nth.call(null,vec__12847,(1),null);
elem.setAttribute(cljs.core.name.call(null,k),(((v instanceof cljs.core.Keyword))?cljs.core.name.call(null,v):v));

var G__12853 = seq__12843;
var G__12854 = chunk__12844;
var G__12855 = count__12845;
var G__12856 = (i__12846 + (1));
seq__12843 = G__12853;
chunk__12844 = G__12854;
count__12845 = G__12855;
i__12846 = G__12856;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__12843);
if(temp__4657__auto__){
var seq__12843__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__12843__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__12843__$1);
var G__12857 = cljs.core.chunk_rest.call(null,seq__12843__$1);
var G__12858 = c__7604__auto__;
var G__12859 = cljs.core.count.call(null,c__7604__auto__);
var G__12860 = (0);
seq__12843 = G__12857;
chunk__12844 = G__12858;
count__12845 = G__12859;
i__12846 = G__12860;
continue;
} else {
var vec__12850 = cljs.core.first.call(null,seq__12843__$1);
var k = cljs.core.nth.call(null,vec__12850,(0),null);
var v = cljs.core.nth.call(null,vec__12850,(1),null);
elem.setAttribute(cljs.core.name.call(null,k),(((v instanceof cljs.core.Keyword))?cljs.core.name.call(null,v):v));

var G__12861 = cljs.core.next.call(null,seq__12843__$1);
var G__12862 = null;
var G__12863 = (0);
var G__12864 = (0);
seq__12843 = G__12861;
chunk__12844 = G__12862;
count__12845 = G__12863;
i__12846 = G__12864;
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
 * If `things` is a map, sets the attributes of `elem` via [[set-attr]]. Otherwise, returns
 *   what is located at key `things` in `elem`.
 * 
 *   Example:
 *   ```
 *   ;; Assume there exists a div such as:
 *   ;; <div class="tabsets" draggable="true";>
 * 
 *   (attr ($ "div .tabsets") "draggable")
 *   ;;=> "true"
 * 
 *   ;; Returns nil, but makes the change.
 *   (attr ($ "div .tabsets") {"draggable" "false"})
 *   ;;=> nil
 * 
 *   (attr ($ "div .tabsets") "draggable")
 *   ;;=> "false"
 *   ```
 */
lt.util.dom.attr = (function lt$util$dom$attr(elem,things){
if(cljs.core.map_QMARK_.call(null,things)){
return lt.util.dom.set_attr.call(null,elem,things);
} else {
return elem.getAttribute(cljs.core.name.call(null,things));
}
});
/**
 * Return the parent node of `elem`.
 * 
 *   Note: using `parent` on the document node will result in a type error.
 * 
 *   Example:
 *   ```
 *   (parent ($ "body"))
 *   ;;=> #<[object HTMLHtmlElement]>
 * 
 *   (.-nodeName (parent ($ "body")))
 *   ;;=> "HTML"
 *   ```
 */
lt.util.dom.parent = (function lt$util$dom$parent(elem){
return elem.parentNode;
});
/**
 * Return the child nodes of `elem`.
 */
lt.util.dom.children = (function lt$util$dom$children(elem){
return elem.children;
});
/**
 * Remove `elem` from the DOM tree.
 */
lt.util.dom.remove = (function lt$util$dom$remove(elem){
var temp__4657__auto__ = lt.util.dom.parent.call(null,elem);
if(cljs.core.truth_(temp__4657__auto__)){
var p = temp__4657__auto__;
return p.removeChild(elem);
} else {
return null;
}
});
/**
 * Sets the inner HTML of `elem` to an empty string.
 */
lt.util.dom.empty = (function lt$util$dom$empty(elem){
return elem.innerHTML = "";
});
/**
 * If `v` is provided then set the value of `elem` to `v`. Otherwise, return the
 *   current value of `elem`.
 */
lt.util.dom.val = (function lt$util$dom$val(var_args){
var args__7875__auto__ = [];
var len__7868__auto___12871 = arguments.length;
var i__7869__auto___12872 = (0);
while(true){
if((i__7869__auto___12872 < len__7868__auto___12871)){
args__7875__auto__.push((arguments[i__7869__auto___12872]));

var G__12873 = (i__7869__auto___12872 + (1));
i__7869__auto___12872 = G__12873;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((1) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((1)),(0),null)):null);
return lt.util.dom.val.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7876__auto__);
});

lt.util.dom.val.cljs$core$IFn$_invoke$arity$variadic = (function (elem,p__12867){
var vec__12868 = p__12867;
var v = cljs.core.nth.call(null,vec__12868,(0),null);
if(cljs.core.not.call(null,v)){
return elem.value;
} else {
return elem.value = v;
}
});

lt.util.dom.val.cljs$lang$maxFixedArity = (1);

lt.util.dom.val.cljs$lang$applyTo = (function (seq12865){
var G__12866 = cljs.core.first.call(null,seq12865);
var seq12865__$1 = cljs.core.next.call(null,seq12865);
return lt.util.dom.val.cljs$core$IFn$_invoke$arity$variadic(G__12866,seq12865__$1);
});

/**
 * Cancel event `e`, if it is cancelable. Does not stop further propagation.
 * 
 *   See [[stop-propagation]].
 */
lt.util.dom.prevent = (function lt$util$dom$prevent(e){
return e.preventDefault();
});
/**
 * Stop further propagation of event `e`.
 * 
 *   See [[prevent]].
 */
lt.util.dom.stop_propagation = (function lt$util$dom$stop_propagation(e){
return e.stopPropagation();
});
/**
 * Return child nodes of `elem`'s parent.
 */
lt.util.dom.siblings = (function lt$util$dom$siblings(elem){
return lt.util.dom.parent.call(null,elem).children;
});
/**
 * Starting with `elem`'s immediate parent going up, returns first parent of
 *   `elem` that has a selector matching `sel` or `nil` if no match is found.
 */
lt.util.dom.parents = (function lt$util$dom$parents(elem,sel){
var root = lt.util.dom.parent.call(null,lt.util.dom.$.call(null,new cljs.core.Keyword(null,"body","body",-2049205669)));
var p = lt.util.dom.parent.call(null,elem);
while(true){
if(cljs.core.truth_((function (){var and__6781__auto__ = p;
if(cljs.core.truth_(and__6781__auto__)){
return cljs.core.not_EQ_.call(null,p,root);
} else {
return and__6781__auto__;
}
})())){
if(cljs.core.truth_(p.webkitMatchesSelector(cljs.core.name.call(null,sel)))){
return p;
} else {
var G__12874 = lt.util.dom.parent.call(null,p);
p = G__12874;
continue;
}
} else {
return null;
}
break;
}
});
/**
 * Returns the next element at the same level of `elem` in the DOM tree.
 *   `nil` if there are no siblings.
 */
lt.util.dom.next = (function lt$util$dom$next(elem){
return elem.nextElementSibling;
});
/**
 * Insert element `neue` into `elem`'s parent in the position before `elem`.
 * 
 *   See [[after]].
 */
lt.util.dom.before = (function lt$util$dom$before(elem,neue){
return lt.util.dom.parent.call(null,elem).insertBefore(neue,elem);
});
/**
 * Insert element `neue` into `elem`'s parent in the position after `elem`.
 * 
 *   See [[before]].
 */
lt.util.dom.after = (function lt$util$dom$after(elem,neue){
var temp__4655__auto__ = lt.util.dom.next.call(null,elem);
if(cljs.core.truth_(temp__4655__auto__)){
var n = temp__4655__auto__;
return lt.util.dom.before.call(null,n,neue);
} else {
return lt.util.dom.append.call(null,lt.util.dom.parent.call(null,elem),neue);
}
});
/**
 * Replace `orig` with `neue`.
 */
lt.util.dom.replace_with = (function lt$util$dom$replace_with(orig,neue){
var temp__4657__auto__ = lt.util.dom.parent.call(null,orig);
if(cljs.core.truth_(temp__4657__auto__)){
var p = temp__4657__auto__;
return p.replaceChild(neue,orig);
} else {
return null;
}
});
/**
 * Returns the height of the visible area for `elem`, in pixels. The value
 *   contains the height with the padding, but it does not include the scrollBar,
 *   border, and the margin.
 */
lt.util.dom.height = (function lt$util$dom$height(elem){
return elem.clientHeight;
});
/**
 * Returns the width of the visible area for `elem`, in pixels. The value
 *   contains the width with the padding, but it does not include the scrollBar,
 *   border, and the margin.
 */
lt.util.dom.width = (function lt$util$dom$width(elem){
return elem.clientWidth;
});
/**
 * Returns, in pixels, whichever is greater, the width of the content within
 *   `elem` or the width of `elem` itself.
 */
lt.util.dom.scroll_width = (function lt$util$dom$scroll_width(elem){
return elem.scrollWidth;
});
/**
 * Return, in pixels, the offset of `elem` relative to the top of the
 *   parent.
 */
lt.util.dom.offset_top = (function lt$util$dom$offset_top(elem){
return elem.offsetTop;
});
/**
 * Returns or sets the scrollTop value of `elem` depending on if `v` was
 *   provided.
 */
lt.util.dom.scroll_top = (function lt$util$dom$scroll_top(var_args){
var args__7875__auto__ = [];
var len__7868__auto___12881 = arguments.length;
var i__7869__auto___12882 = (0);
while(true){
if((i__7869__auto___12882 < len__7868__auto___12881)){
args__7875__auto__.push((arguments[i__7869__auto___12882]));

var G__12883 = (i__7869__auto___12882 + (1));
i__7869__auto___12882 = G__12883;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((1) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((1)),(0),null)):null);
return lt.util.dom.scroll_top.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7876__auto__);
});

lt.util.dom.scroll_top.cljs$core$IFn$_invoke$arity$variadic = (function (elem,p__12877){
var vec__12878 = p__12877;
var v = cljs.core.nth.call(null,vec__12878,(0),null);
if(cljs.core.not.call(null,v)){
return elem.scrollTop;
} else {
return elem.scrollTop = v;
}
});

lt.util.dom.scroll_top.cljs$lang$maxFixedArity = (1);

lt.util.dom.scroll_top.cljs$lang$applyTo = (function (seq12875){
var G__12876 = cljs.core.first.call(null,seq12875);
var seq12875__$1 = cljs.core.next.call(null,seq12875);
return lt.util.dom.scroll_top.cljs$core$IFn$_invoke$arity$variadic(G__12876,seq12875__$1);
});

/**
 * Return the `:top` style of `elem`.
 */
lt.util.dom.top = (function lt$util$dom$top(elem){
return lt.util.dom.css.call(null,elem,new cljs.core.Keyword(null,"top","top",-1856271961));
});
/**
 * Return the `:bottom` style of `elem`.
 */
lt.util.dom.bottom = (function lt$util$dom$bottom(elem){
return lt.util.dom.css.call(null,elem,new cljs.core.Keyword(null,"bottom","bottom",-1550509018));
});
/**
 * Return the `:left` style of `elem`.
 */
lt.util.dom.left = (function lt$util$dom$left(elem){
return lt.util.dom.css.call(null,elem,new cljs.core.Keyword(null,"left","left",-399115937));
});
/**
 * Return the `:right` style of `elem`.
 */
lt.util.dom.right = (function lt$util$dom$right(elem){
return lt.util.dom.css.call(null,elem,new cljs.core.Keyword(null,"right","right",-452581833));
});
/**
 * Return the inner HTML of `elem` or set the inner HTML to `h`.
 */
lt.util.dom.html = (function lt$util$dom$html(var_args){
var args__7875__auto__ = [];
var len__7868__auto___12890 = arguments.length;
var i__7869__auto___12891 = (0);
while(true){
if((i__7869__auto___12891 < len__7868__auto___12890)){
args__7875__auto__.push((arguments[i__7869__auto___12891]));

var G__12892 = (i__7869__auto___12891 + (1));
i__7869__auto___12891 = G__12892;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((1) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((1)),(0),null)):null);
return lt.util.dom.html.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7876__auto__);
});

lt.util.dom.html.cljs$core$IFn$_invoke$arity$variadic = (function (elem,p__12886){
var vec__12887 = p__12886;
var h = cljs.core.nth.call(null,vec__12887,(0),null);
if(cljs.core.not.call(null,h)){
return elem.innerHTML;
} else {
return elem.innerHTML = h;
}
});

lt.util.dom.html.cljs$lang$maxFixedArity = (1);

lt.util.dom.html.cljs$lang$applyTo = (function (seq12884){
var G__12885 = cljs.core.first.call(null,seq12884);
var seq12884__$1 = cljs.core.next.call(null,seq12884);
return lt.util.dom.html.cljs$core$IFn$_invoke$arity$variadic(G__12885,seq12884__$1);
});

/**
 * Convert `ev` to string.
 */
lt.util.dom.__GT_ev = (function lt$util$dom$__GT_ev(ev){
return [cljs.core.str(cljs.core.name.call(null,ev))].join('');
});
/**
 * Trigger a HTMLEvents event named `ev` on `elem` with `opts` set on the
 *   event.
 */
lt.util.dom.trigger = (function lt$util$dom$trigger(var_args){
var args__7875__auto__ = [];
var len__7868__auto___12900 = arguments.length;
var i__7869__auto___12901 = (0);
while(true){
if((i__7869__auto___12901 < len__7868__auto___12900)){
args__7875__auto__.push((arguments[i__7869__auto___12901]));

var G__12902 = (i__7869__auto___12901 + (1));
i__7869__auto___12901 = G__12902;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((2) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((2)),(0),null)):null);
return lt.util.dom.trigger.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__7876__auto__);
});

lt.util.dom.trigger.cljs$core$IFn$_invoke$arity$variadic = (function (elem,ev,p__12896){
var vec__12897 = p__12896;
var opts = cljs.core.nth.call(null,vec__12897,(0),null);
var e = document.createEvent("HTMLEvents");
e.initEvent(cljs.core.name.call(null,ev),true,true);

e.opts = opts;

return elem.dispatchEvent(e);
});

lt.util.dom.trigger.cljs$lang$maxFixedArity = (2);

lt.util.dom.trigger.cljs$lang$applyTo = (function (seq12893){
var G__12894 = cljs.core.first.call(null,seq12893);
var seq12893__$1 = cljs.core.next.call(null,seq12893);
var G__12895 = cljs.core.first.call(null,seq12893__$1);
var seq12893__$2 = cljs.core.next.call(null,seq12893__$1);
return lt.util.dom.trigger.cljs$core$IFn$_invoke$arity$variadic(G__12894,G__12895,seq12893__$2);
});

/**
 * Add event listener named `ev` on `elem` with callback function `cb`.
 */
lt.util.dom.on = (function lt$util$dom$on(elem,ev,cb){
return elem.addEventListener(lt.util.dom.__GT_ev.call(null,ev),cb);
});
/**
 * Remove event listener named `ev` on `elem` with callback function `cb`.
 */
lt.util.dom.off = (function lt$util$dom$off(elem,ev,cb){
return elem.removeEventListener(lt.util.dom.__GT_ev.call(null,ev),cb);
});
/**
 * Add multiple event listeners to `elem`.
 * 
 *   `evs` should be a map of the form `{:ev cb}` where `:ev` is the name and
 *   `cb` the callback function.
 */
lt.util.dom.on_STAR_ = (function lt$util$dom$on_STAR_(elem,evs){
var seq__12913 = cljs.core.seq.call(null,evs);
var chunk__12914 = null;
var count__12915 = (0);
var i__12916 = (0);
while(true){
if((i__12916 < count__12915)){
var vec__12917 = cljs.core._nth.call(null,chunk__12914,i__12916);
var ev = cljs.core.nth.call(null,vec__12917,(0),null);
var cb = cljs.core.nth.call(null,vec__12917,(1),null);
elem.addEventListener(lt.util.dom.__GT_ev.call(null,ev),cb);

var G__12923 = seq__12913;
var G__12924 = chunk__12914;
var G__12925 = count__12915;
var G__12926 = (i__12916 + (1));
seq__12913 = G__12923;
chunk__12914 = G__12924;
count__12915 = G__12925;
i__12916 = G__12926;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__12913);
if(temp__4657__auto__){
var seq__12913__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__12913__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__12913__$1);
var G__12927 = cljs.core.chunk_rest.call(null,seq__12913__$1);
var G__12928 = c__7604__auto__;
var G__12929 = cljs.core.count.call(null,c__7604__auto__);
var G__12930 = (0);
seq__12913 = G__12927;
chunk__12914 = G__12928;
count__12915 = G__12929;
i__12916 = G__12930;
continue;
} else {
var vec__12920 = cljs.core.first.call(null,seq__12913__$1);
var ev = cljs.core.nth.call(null,vec__12920,(0),null);
var cb = cljs.core.nth.call(null,vec__12920,(1),null);
elem.addEventListener(lt.util.dom.__GT_ev.call(null,ev),cb);

var G__12931 = cljs.core.next.call(null,seq__12913__$1);
var G__12932 = null;
var G__12933 = (0);
var G__12934 = (0);
seq__12913 = G__12931;
chunk__12914 = G__12932;
count__12915 = G__12933;
i__12916 = G__12934;
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
 * Return the active element of the document.
 * 
 *   An active element does not necessarily have focus, but an element with focus
 *   is always the active element in a document.
 */
lt.util.dom.active_element = (function lt$util$dom$active_element(){
return document.activeElement;
});
/**
 * Sets focus on `elem`.
 */
lt.util.dom.focus = (function lt$util$dom$focus(elem){
return elem.focus();
});
/**
 * Remove focus from `elem`.
 */
lt.util.dom.blur = (function lt$util$dom$blur(elem){
return elem.blur();
});
/**
 * Set the current selection range on `elem` with `start` and `stop` being the
 *   indexes which respectively contain the first and last characters of the
 *   selection.
 * 
 *   `dir` can be used to set the direction in which selection occurs.
 */
lt.util.dom.selection = (function lt$util$dom$selection(elem,start,stop,dir){
return elem.setSelectionRange(start,stop,dir);
});
/**
 * Create div containing `str` as inner HTML. Returns HTMLCollection of
 *   resulting div.
 * 
 *   See [[children]].
 */
lt.util.dom.make = (function lt$util$dom$make(str){
var d = document.createElement("div");
lt.util.dom.html.call(null,d,str);

return lt.util.dom.children.call(null,d);
});
/**
 * Returns the index of element `e`, which is where `e` is located inside of its
 *   parent's list of children, or -1 if there is no parent.
 */
lt.util.dom.index = (function lt$util$dom$index(e){
var p = lt.util.dom.parent.call(null,e);
var c = (cljs.core.truth_(p)?lt.util.dom.children.call(null,p):[]);
var len = c.length;
if(cljs.core.not.call(null,p)){
return (-1);
} else {
var i = (0);
while(true){
if((i >= len)){
return null;
} else {
if(cljs.core._EQ_.call(null,(c[i]),e)){
return i;
} else {
var G__12935 = (i + (1));
i = G__12935;
continue;
}
}
break;
}
}
});
/**
 * Trigger `func` when `:DOMContentLoaded` fires on the document.
 */
lt.util.dom.ready = (function lt$util$dom$ready(func){
return lt.util.dom.on.call(null,document,new cljs.core.Keyword(null,"DOMContentLoaded","DOMContentLoaded",88046845),func);
});
/**
 * Create and return a document fragment with `items` appended to it as
 *   children.
 */
lt.util.dom.fragment = (function lt$util$dom$fragment(items){
var frag = document.createDocumentFragment();
var seq__12940_12944 = cljs.core.seq.call(null,items);
var chunk__12941_12945 = null;
var count__12942_12946 = (0);
var i__12943_12947 = (0);
while(true){
if((i__12943_12947 < count__12942_12946)){
var i_12948 = cljs.core._nth.call(null,chunk__12941_12945,i__12943_12947);
frag.appendChild(i_12948);

var G__12949 = seq__12940_12944;
var G__12950 = chunk__12941_12945;
var G__12951 = count__12942_12946;
var G__12952 = (i__12943_12947 + (1));
seq__12940_12944 = G__12949;
chunk__12941_12945 = G__12950;
count__12942_12946 = G__12951;
i__12943_12947 = G__12952;
continue;
} else {
var temp__4657__auto___12953 = cljs.core.seq.call(null,seq__12940_12944);
if(temp__4657__auto___12953){
var seq__12940_12954__$1 = temp__4657__auto___12953;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__12940_12954__$1)){
var c__7604__auto___12955 = cljs.core.chunk_first.call(null,seq__12940_12954__$1);
var G__12956 = cljs.core.chunk_rest.call(null,seq__12940_12954__$1);
var G__12957 = c__7604__auto___12955;
var G__12958 = cljs.core.count.call(null,c__7604__auto___12955);
var G__12959 = (0);
seq__12940_12944 = G__12956;
chunk__12941_12945 = G__12957;
count__12942_12946 = G__12958;
i__12943_12947 = G__12959;
continue;
} else {
var i_12960 = cljs.core.first.call(null,seq__12940_12954__$1);
frag.appendChild(i_12960);

var G__12961 = cljs.core.next.call(null,seq__12940_12954__$1);
var G__12962 = null;
var G__12963 = (0);
var G__12964 = (0);
seq__12940_12944 = G__12961;
chunk__12941_12945 = G__12962;
count__12942_12946 = G__12963;
i__12943_12947 = G__12964;
continue;
}
} else {
}
}
break;
}

return frag;
});
