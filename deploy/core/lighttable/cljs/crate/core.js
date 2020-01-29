// Compiled by ClojureScript 1.9.229 {}
goog.provide('crate.core');
goog.require('cljs.core');
goog.require('goog.dom');
goog.require('crate.compiler');
goog.require('crate.util');
crate.core.group_id = cljs.core.atom.call(null,(0));
crate.core.raw = (function crate$core$raw(html_str){
return goog.dom.htmlToDocumentFragment(html_str);
});
crate.core.html = (function crate$core$html(var_args){
var args__7875__auto__ = [];
var len__7868__auto___12761 = arguments.length;
var i__7869__auto___12762 = (0);
while(true){
if((i__7869__auto___12762 < len__7868__auto___12761)){
args__7875__auto__.push((arguments[i__7869__auto___12762]));

var G__12763 = (i__7869__auto___12762 + (1));
i__7869__auto___12762 = G__12763;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((0) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((0)),(0),null)):null);
return crate.core.html.cljs$core$IFn$_invoke$arity$variadic(argseq__7876__auto__);
});

crate.core.html.cljs$core$IFn$_invoke$arity$variadic = (function (tags){
var res = cljs.core.map.call(null,crate.compiler.elem_factory,tags);
if(cljs.core.truth_(cljs.core.second.call(null,res))){
return res;
} else {
return cljs.core.first.call(null,res);
}
});

crate.core.html.cljs$lang$maxFixedArity = (0);

crate.core.html.cljs$lang$applyTo = (function (seq12760){
return crate.core.html.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq12760));
});

/**
 * Alias for crate.util/escape-html
 */
crate.core.h = crate.util.escape_html;
