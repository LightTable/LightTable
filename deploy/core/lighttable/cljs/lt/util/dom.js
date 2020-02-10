// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.util.dom');
goog.require('cljs.core');
/**
 * Return lazy seq of NodeList.
 */
lt.util.dom.lazy_nl_via_item = (function lt$util$dom$lazy_nl_via_item(var_args){
var args12782 = [];
var len__7868__auto___12785 = arguments.length;
var i__7869__auto___12786 = (0);
while(true){
if((i__7869__auto___12786 < len__7868__auto___12785)){
args12782.push((arguments[i__7869__auto___12786]));

var G__12787 = (i__7869__auto___12786 + (1));
i__7869__auto___12786 = G__12787;
continue;
} else {
}
break;
}

var G__12784 = args12782.length;
switch (G__12784) {
case 1:
return lt.util.dom.lazy_nl_via_item.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return lt.util.dom.lazy_nl_via_item.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args12782.length)].join('')));

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
var args12789 = [];
var len__7868__auto___12792 = arguments.length;
var i__7869__auto___12793 = (0);
while(true){
if((i__7869__auto___12793 < len__7868__auto___12792)){
args12789.push((arguments[i__7869__auto___12793]));

var G__12794 = (i__7869__auto___12793 + (1));
i__7869__auto___12793 = G__12794;
continue;
} else {
}
break;
}

var G__12791 = args12789.length;
switch (G__12791) {
case 1:
return lt.util.dom.$$.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return lt.util.dom.$$.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args12789.length)].join('')));

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
var args12796 = [];
var len__7868__auto___12799 = arguments.length;
var i__7869__auto___12800 = (0);
while(true){
if((i__7869__auto___12800 < len__7868__auto___12799)){
args12796.push((arguments[i__7869__auto___12800]));

var G__12801 = (i__7869__auto___12800 + (1));
i__7869__auto___12800 = G__12801;
continue;
} else {
}
break;
}

var G__12798 = args12796.length;
switch (G__12798) {
case 1:
return lt.util.dom.$.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return lt.util.dom.$.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args12796.length)].join('')));

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
var seq__12813 = cljs.core.seq.call(null,things);
var chunk__12814 = null;
var count__12815 = (0);
var i__12816 = (0);
while(true){
if((i__12816 < count__12815)){
var vec__12817 = cljs.core._nth.call(null,chunk__12814,i__12816);
var k = cljs.core.nth.call(null,vec__12817,(0),null);
var v = cljs.core.nth.call(null,vec__12817,(1),null);
(elem.style[cljs.core.name.call(null,k)] = (((v instanceof cljs.core.Keyword))?cljs.core.name.call(null,v):v));

var G__12823 = seq__12813;
var G__12824 = chunk__12814;
var G__12825 = count__12815;
var G__12826 = (i__12816 + (1));
seq__12813 = G__12823;
chunk__12814 = G__12824;
count__12815 = G__12825;
i__12816 = G__12826;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__12813);
if(temp__4657__auto__){
var seq__12813__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__12813__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__12813__$1);
var G__12827 = cljs.core.chunk_rest.call(null,seq__12813__$1);
var G__12828 = c__7604__auto__;
var G__12829 = cljs.core.count.call(null,c__7604__auto__);
var G__12830 = (0);
seq__12813 = G__12827;
chunk__12814 = G__12828;
count__12815 = G__12829;
i__12816 = G__12830;
continue;
} else {
var vec__12820 = cljs.core.first.call(null,seq__12813__$1);
var k = cljs.core.nth.call(null,vec__12820,(0),null);
var v = cljs.core.nth.call(null,vec__12820,(1),null);
(elem.style[cljs.core.name.call(null,k)] = (((v instanceof cljs.core.Keyword))?cljs.core.name.call(null,v):v));

var G__12831 = cljs.core.next.call(null,seq__12813__$1);
var G__12832 = null;
var G__12833 = (0);
var G__12834 = (0);
seq__12813 = G__12831;
chunk__12814 = G__12832;
count__12815 = G__12833;
i__12816 = G__12834;
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
var seq__12845 = cljs.core.seq.call(null,things);
var chunk__12846 = null;
var count__12847 = (0);
var i__12848 = (0);
while(true){
if((i__12848 < count__12847)){
var vec__12849 = cljs.core._nth.call(null,chunk__12846,i__12848);
var k = cljs.core.nth.call(null,vec__12849,(0),null);
var v = cljs.core.nth.call(null,vec__12849,(1),null);
elem.setAttribute(cljs.core.name.call(null,k),(((v instanceof cljs.core.Keyword))?cljs.core.name.call(null,v):v));

var G__12855 = seq__12845;
var G__12856 = chunk__12846;
var G__12857 = count__12847;
var G__12858 = (i__12848 + (1));
seq__12845 = G__12855;
chunk__12846 = G__12856;
count__12847 = G__12857;
i__12848 = G__12858;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__12845);
if(temp__4657__auto__){
var seq__12845__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__12845__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__12845__$1);
var G__12859 = cljs.core.chunk_rest.call(null,seq__12845__$1);
var G__12860 = c__7604__auto__;
var G__12861 = cljs.core.count.call(null,c__7604__auto__);
var G__12862 = (0);
seq__12845 = G__12859;
chunk__12846 = G__12860;
count__12847 = G__12861;
i__12848 = G__12862;
continue;
} else {
var vec__12852 = cljs.core.first.call(null,seq__12845__$1);
var k = cljs.core.nth.call(null,vec__12852,(0),null);
var v = cljs.core.nth.call(null,vec__12852,(1),null);
elem.setAttribute(cljs.core.name.call(null,k),(((v instanceof cljs.core.Keyword))?cljs.core.name.call(null,v):v));

var G__12863 = cljs.core.next.call(null,seq__12845__$1);
var G__12864 = null;
var G__12865 = (0);
var G__12866 = (0);
seq__12845 = G__12863;
chunk__12846 = G__12864;
count__12847 = G__12865;
i__12848 = G__12866;
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
var len__7868__auto___12873 = arguments.length;
var i__7869__auto___12874 = (0);
while(true){
if((i__7869__auto___12874 < len__7868__auto___12873)){
args__7875__auto__.push((arguments[i__7869__auto___12874]));

var G__12875 = (i__7869__auto___12874 + (1));
i__7869__auto___12874 = G__12875;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((1) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((1)),(0),null)):null);
return lt.util.dom.val.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7876__auto__);
});

lt.util.dom.val.cljs$core$IFn$_invoke$arity$variadic = (function (elem,p__12869){
var vec__12870 = p__12869;
var v = cljs.core.nth.call(null,vec__12870,(0),null);
if(cljs.core.not.call(null,v)){
return elem.value;
} else {
return elem.value = v;
}
});

lt.util.dom.val.cljs$lang$maxFixedArity = (1);

lt.util.dom.val.cljs$lang$applyTo = (function (seq12867){
var G__12868 = cljs.core.first.call(null,seq12867);
var seq12867__$1 = cljs.core.next.call(null,seq12867);
return lt.util.dom.val.cljs$core$IFn$_invoke$arity$variadic(G__12868,seq12867__$1);
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
var G__12876 = lt.util.dom.parent.call(null,p);
p = G__12876;
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
var len__7868__auto___12883 = arguments.length;
var i__7869__auto___12884 = (0);
while(true){
if((i__7869__auto___12884 < len__7868__auto___12883)){
args__7875__auto__.push((arguments[i__7869__auto___12884]));

var G__12885 = (i__7869__auto___12884 + (1));
i__7869__auto___12884 = G__12885;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((1) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((1)),(0),null)):null);
return lt.util.dom.scroll_top.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7876__auto__);
});

lt.util.dom.scroll_top.cljs$core$IFn$_invoke$arity$variadic = (function (elem,p__12879){
var vec__12880 = p__12879;
var v = cljs.core.nth.call(null,vec__12880,(0),null);
if(cljs.core.not.call(null,v)){
return elem.scrollTop;
} else {
return elem.scrollTop = v;
}
});

lt.util.dom.scroll_top.cljs$lang$maxFixedArity = (1);

lt.util.dom.scroll_top.cljs$lang$applyTo = (function (seq12877){
var G__12878 = cljs.core.first.call(null,seq12877);
var seq12877__$1 = cljs.core.next.call(null,seq12877);
return lt.util.dom.scroll_top.cljs$core$IFn$_invoke$arity$variadic(G__12878,seq12877__$1);
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
var len__7868__auto___12892 = arguments.length;
var i__7869__auto___12893 = (0);
while(true){
if((i__7869__auto___12893 < len__7868__auto___12892)){
args__7875__auto__.push((arguments[i__7869__auto___12893]));

var G__12894 = (i__7869__auto___12893 + (1));
i__7869__auto___12893 = G__12894;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((1) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((1)),(0),null)):null);
return lt.util.dom.html.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7876__auto__);
});

lt.util.dom.html.cljs$core$IFn$_invoke$arity$variadic = (function (elem,p__12888){
var vec__12889 = p__12888;
var h = cljs.core.nth.call(null,vec__12889,(0),null);
if(cljs.core.not.call(null,h)){
return elem.innerHTML;
} else {
return elem.innerHTML = h;
}
});

lt.util.dom.html.cljs$lang$maxFixedArity = (1);

lt.util.dom.html.cljs$lang$applyTo = (function (seq12886){
var G__12887 = cljs.core.first.call(null,seq12886);
var seq12886__$1 = cljs.core.next.call(null,seq12886);
return lt.util.dom.html.cljs$core$IFn$_invoke$arity$variadic(G__12887,seq12886__$1);
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
var len__7868__auto___12902 = arguments.length;
var i__7869__auto___12903 = (0);
while(true){
if((i__7869__auto___12903 < len__7868__auto___12902)){
args__7875__auto__.push((arguments[i__7869__auto___12903]));

var G__12904 = (i__7869__auto___12903 + (1));
i__7869__auto___12903 = G__12904;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((2) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((2)),(0),null)):null);
return lt.util.dom.trigger.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__7876__auto__);
});

lt.util.dom.trigger.cljs$core$IFn$_invoke$arity$variadic = (function (elem,ev,p__12898){
var vec__12899 = p__12898;
var opts = cljs.core.nth.call(null,vec__12899,(0),null);
var e = document.createEvent("HTMLEvents");
e.initEvent(cljs.core.name.call(null,ev),true,true);

e.opts = opts;

return elem.dispatchEvent(e);
});

lt.util.dom.trigger.cljs$lang$maxFixedArity = (2);

lt.util.dom.trigger.cljs$lang$applyTo = (function (seq12895){
var G__12896 = cljs.core.first.call(null,seq12895);
var seq12895__$1 = cljs.core.next.call(null,seq12895);
var G__12897 = cljs.core.first.call(null,seq12895__$1);
var seq12895__$2 = cljs.core.next.call(null,seq12895__$1);
return lt.util.dom.trigger.cljs$core$IFn$_invoke$arity$variadic(G__12896,G__12897,seq12895__$2);
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
var seq__12915 = cljs.core.seq.call(null,evs);
var chunk__12916 = null;
var count__12917 = (0);
var i__12918 = (0);
while(true){
if((i__12918 < count__12917)){
var vec__12919 = cljs.core._nth.call(null,chunk__12916,i__12918);
var ev = cljs.core.nth.call(null,vec__12919,(0),null);
var cb = cljs.core.nth.call(null,vec__12919,(1),null);
elem.addEventListener(lt.util.dom.__GT_ev.call(null,ev),cb);

var G__12925 = seq__12915;
var G__12926 = chunk__12916;
var G__12927 = count__12917;
var G__12928 = (i__12918 + (1));
seq__12915 = G__12925;
chunk__12916 = G__12926;
count__12917 = G__12927;
i__12918 = G__12928;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__12915);
if(temp__4657__auto__){
var seq__12915__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__12915__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__12915__$1);
var G__12929 = cljs.core.chunk_rest.call(null,seq__12915__$1);
var G__12930 = c__7604__auto__;
var G__12931 = cljs.core.count.call(null,c__7604__auto__);
var G__12932 = (0);
seq__12915 = G__12929;
chunk__12916 = G__12930;
count__12917 = G__12931;
i__12918 = G__12932;
continue;
} else {
var vec__12922 = cljs.core.first.call(null,seq__12915__$1);
var ev = cljs.core.nth.call(null,vec__12922,(0),null);
var cb = cljs.core.nth.call(null,vec__12922,(1),null);
elem.addEventListener(lt.util.dom.__GT_ev.call(null,ev),cb);

var G__12933 = cljs.core.next.call(null,seq__12915__$1);
var G__12934 = null;
var G__12935 = (0);
var G__12936 = (0);
seq__12915 = G__12933;
chunk__12916 = G__12934;
count__12917 = G__12935;
i__12918 = G__12936;
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
var G__12937 = (i + (1));
i = G__12937;
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
var seq__12942_12946 = cljs.core.seq.call(null,items);
var chunk__12943_12947 = null;
var count__12944_12948 = (0);
var i__12945_12949 = (0);
while(true){
if((i__12945_12949 < count__12944_12948)){
var i_12950 = cljs.core._nth.call(null,chunk__12943_12947,i__12945_12949);
frag.appendChild(i_12950);

var G__12951 = seq__12942_12946;
var G__12952 = chunk__12943_12947;
var G__12953 = count__12944_12948;
var G__12954 = (i__12945_12949 + (1));
seq__12942_12946 = G__12951;
chunk__12943_12947 = G__12952;
count__12944_12948 = G__12953;
i__12945_12949 = G__12954;
continue;
} else {
var temp__4657__auto___12955 = cljs.core.seq.call(null,seq__12942_12946);
if(temp__4657__auto___12955){
var seq__12942_12956__$1 = temp__4657__auto___12955;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__12942_12956__$1)){
var c__7604__auto___12957 = cljs.core.chunk_first.call(null,seq__12942_12956__$1);
var G__12958 = cljs.core.chunk_rest.call(null,seq__12942_12956__$1);
var G__12959 = c__7604__auto___12957;
var G__12960 = cljs.core.count.call(null,c__7604__auto___12957);
var G__12961 = (0);
seq__12942_12946 = G__12958;
chunk__12943_12947 = G__12959;
count__12944_12948 = G__12960;
i__12945_12949 = G__12961;
continue;
} else {
var i_12962 = cljs.core.first.call(null,seq__12942_12956__$1);
frag.appendChild(i_12962);

var G__12963 = cljs.core.next.call(null,seq__12942_12956__$1);
var G__12964 = null;
var G__12965 = (0);
var G__12966 = (0);
seq__12942_12946 = G__12963;
chunk__12943_12947 = G__12964;
count__12944_12948 = G__12965;
i__12945_12949 = G__12966;
continue;
}
} else {
}
}
break;
}

return frag;
});
