// Compiled by ClojureScript 1.9.229 {}
goog.provide('crate.util');
goog.require('cljs.core');
goog.require('clojure.string');
crate.util._STAR_base_url_STAR_ = null;
crate.util.as_str = (function crate$util$as_str(var_args){
var args12292 = [];
var len__7868__auto___12297 = arguments.length;
var i__7869__auto___12298 = (0);
while(true){
if((i__7869__auto___12298 < len__7868__auto___12297)){
args12292.push((arguments[i__7869__auto___12298]));

var G__12299 = (i__7869__auto___12298 + (1));
i__7869__auto___12298 = G__12299;
continue;
} else {
}
break;
}

var G__12296 = args12292.length;
switch (G__12296) {
case 0:
return crate.util.as_str.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return crate.util.as_str.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
var argseq__7887__auto__ = (new cljs.core.IndexedSeq(args12292.slice((1)),(0),null));
return crate.util.as_str.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7887__auto__);

}
});

crate.util.as_str.cljs$core$IFn$_invoke$arity$0 = (function (){
return "";
});

crate.util.as_str.cljs$core$IFn$_invoke$arity$1 = (function (x){
if(((x instanceof cljs.core.Symbol)) || ((x instanceof cljs.core.Keyword))){
return cljs.core.name.call(null,x);
} else {
return [cljs.core.str(x)].join('');
}
});

crate.util.as_str.cljs$core$IFn$_invoke$arity$variadic = (function (x,xs){
return (function (s,more){
while(true){
if(cljs.core.truth_(more)){
var G__12301 = [cljs.core.str(s),cljs.core.str(crate.util.as_str.call(null,cljs.core.first.call(null,more)))].join('');
var G__12302 = cljs.core.next.call(null,more);
s = G__12301;
more = G__12302;
continue;
} else {
return s;
}
break;
}
}).call(null,crate.util.as_str.call(null,x),xs);
});

crate.util.as_str.cljs$lang$applyTo = (function (seq12293){
var G__12294 = cljs.core.first.call(null,seq12293);
var seq12293__$1 = cljs.core.next.call(null,seq12293);
return crate.util.as_str.cljs$core$IFn$_invoke$arity$variadic(G__12294,seq12293__$1);
});

crate.util.as_str.cljs$lang$maxFixedArity = (1);

/**
 * Change special characters into HTML character entities.
 */
crate.util.escape_html = (function crate$util$escape_html(text){
return clojure.string.replace.call(null,clojure.string.replace.call(null,clojure.string.replace.call(null,clojure.string.replace.call(null,crate.util.as_str.call(null,text),"&","&amp;"),"<","&lt;"),">","&gt;"),"\"","&quot;");
});
/**
 * Prepends the base-url to the supplied URI.
 */
crate.util.to_uri = (function crate$util$to_uri(uri){
if(cljs.core.truth_(cljs.core.re_matches.call(null,/^\w+:.*/,uri))){
return uri;
} else {
return [cljs.core.str(crate.util._STAR_base_url_STAR_),cljs.core.str(uri)].join('');
}
});
crate.util.url_encode_component = (function crate$util$url_encode_component(s){

return encodeURIComponent(crate.util.as_str.call(null,s));
});
/**
 * Turn a map of parameters into a urlencoded string.
 */
crate.util.url_encode = (function crate$util$url_encode(params){
return clojure.string.join.call(null,"&",(function (){var iter__7573__auto__ = (function crate$util$url_encode_$_iter__12319(s__12320){
return (new cljs.core.LazySeq(null,(function (){
var s__12320__$1 = s__12320;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__12320__$1);
if(temp__4657__auto__){
var s__12320__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__12320__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__12320__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__12322 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__12321 = (0);
while(true){
if((i__12321 < size__7572__auto__)){
var vec__12329 = cljs.core._nth.call(null,c__7571__auto__,i__12321);
var k = cljs.core.nth.call(null,vec__12329,(0),null);
var v = cljs.core.nth.call(null,vec__12329,(1),null);
cljs.core.chunk_append.call(null,b__12322,[cljs.core.str(crate.util.url_encode_component.call(null,k)),cljs.core.str("="),cljs.core.str(crate.util.url_encode_component.call(null,v))].join(''));

var G__12335 = (i__12321 + (1));
i__12321 = G__12335;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__12322),crate$util$url_encode_$_iter__12319.call(null,cljs.core.chunk_rest.call(null,s__12320__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__12322),null);
}
} else {
var vec__12332 = cljs.core.first.call(null,s__12320__$2);
var k = cljs.core.nth.call(null,vec__12332,(0),null);
var v = cljs.core.nth.call(null,vec__12332,(1),null);
return cljs.core.cons.call(null,[cljs.core.str(crate.util.url_encode_component.call(null,k)),cljs.core.str("="),cljs.core.str(crate.util.url_encode_component.call(null,v))].join(''),crate$util$url_encode_$_iter__12319.call(null,cljs.core.rest.call(null,s__12320__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__7573__auto__.call(null,params);
})());
});
/**
 * Creates a URL string from a variable list of arguments and an optional
 *   parameter map as the last argument. For example:
 *  (url "/group/" 4 "/products" {:page 9})
 *  => "/group/4/products?page=9"
 */
crate.util.url = (function crate$util$url(var_args){
var args__7875__auto__ = [];
var len__7868__auto___12337 = arguments.length;
var i__7869__auto___12338 = (0);
while(true){
if((i__7869__auto___12338 < len__7868__auto___12337)){
args__7875__auto__.push((arguments[i__7869__auto___12338]));

var G__12339 = (i__7869__auto___12338 + (1));
i__7869__auto___12338 = G__12339;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((0) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((0)),(0),null)):null);
return crate.util.url.cljs$core$IFn$_invoke$arity$variadic(argseq__7876__auto__);
});

crate.util.url.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var params = cljs.core.last.call(null,args);
var args__$1 = cljs.core.butlast.call(null,args);
return [cljs.core.str(crate.util.to_uri.call(null,[cljs.core.str(cljs.core.apply.call(null,cljs.core.str,args__$1)),cljs.core.str(((cljs.core.map_QMARK_.call(null,params))?[cljs.core.str("?"),cljs.core.str(crate.util.url_encode.call(null,params))].join(''):params))].join('')))].join('');
});

crate.util.url.cljs$lang$maxFixedArity = (0);

crate.util.url.cljs$lang$applyTo = (function (seq12336){
return crate.util.url.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq12336));
});

