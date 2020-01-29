// Compiled by ClojureScript 1.9.229 {}
goog.provide('fetch.core');
goog.require('cljs.core');
goog.require('goog.Uri.QueryData');
goog.require('goog.structs');
goog.require('clojure.browser.net');
goog.require('clojure.string');
goog.require('clojure.browser.event');
goog.require('cljs.reader');
fetch.core.__GT_method = (function fetch$core$__GT_method(m){
return clojure.string.upper_case.call(null,cljs.core.name.call(null,m));
});
fetch.core.parse_route = (function fetch$core$parse_route(route){
if(typeof route === 'string'){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["GET",route], null);
} else {
if(cljs.core.vector_QMARK_.call(null,route)){
var vec__13932 = route;
var m = cljs.core.nth.call(null,vec__13932,(0),null);
var u = cljs.core.nth.call(null,vec__13932,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [fetch.core.__GT_method.call(null,m),u], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["GET",route], null);

}
}
});
fetch.core.__GT_data = (function fetch$core$__GT_data(d){
var cur = cljs.core.clj__GT_js.call(null,d);
var query = goog.Uri.QueryData.createFromMap((new goog.structs.Map(cur)));
return [cljs.core.str(query)].join('');
});
fetch.core.__GT_callback = (function fetch$core$__GT_callback(callback){
if(cljs.core.truth_(callback)){
return (function (req){
var data = req.getResponseText();
return callback.call(null,data);
});
} else {
return null;
}
});
fetch.core.xhr = (function fetch$core$xhr(var_args){
var args__7875__auto__ = [];
var len__7868__auto___13946 = arguments.length;
var i__7869__auto___13947 = (0);
while(true){
if((i__7869__auto___13947 < len__7868__auto___13946)){
args__7875__auto__.push((arguments[i__7869__auto___13947]));

var G__13948 = (i__7869__auto___13947 + (1));
i__7869__auto___13947 = G__13948;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((3) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((3)),(0),null)):null);
return fetch.core.xhr.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__7876__auto__);
});

fetch.core.xhr.cljs$core$IFn$_invoke$arity$variadic = (function (route,content,callback,p__13939){
var vec__13940 = p__13939;
var opts = cljs.core.nth.call(null,vec__13940,(0),null);
var req = clojure.browser.net.xhr_connection.call(null);
var vec__13943 = fetch.core.parse_route.call(null,route);
var method = cljs.core.nth.call(null,vec__13943,(0),null);
var uri = cljs.core.nth.call(null,vec__13943,(1),null);
var data = fetch.core.__GT_data.call(null,content);
var callback__$1 = fetch.core.__GT_callback.call(null,callback);
if(cljs.core.truth_(callback__$1)){
clojure.browser.event.listen.call(null,req,new cljs.core.Keyword(null,"success","success",1890645906),((function (req,vec__13943,method,uri,data,callback__$1,vec__13940,opts){
return (function (){
return callback__$1.call(null,req);
});})(req,vec__13943,method,uri,data,callback__$1,vec__13940,opts))
);
} else {
}

return clojure.browser.net.transmit.call(null,req,uri,method,data,(cljs.core.truth_(opts)?cljs.core.clj__GT_js.call(null,opts):null));
});

fetch.core.xhr.cljs$lang$maxFixedArity = (3);

fetch.core.xhr.cljs$lang$applyTo = (function (seq13935){
var G__13936 = cljs.core.first.call(null,seq13935);
var seq13935__$1 = cljs.core.next.call(null,seq13935);
var G__13937 = cljs.core.first.call(null,seq13935__$1);
var seq13935__$2 = cljs.core.next.call(null,seq13935__$1);
var G__13938 = cljs.core.first.call(null,seq13935__$2);
var seq13935__$3 = cljs.core.next.call(null,seq13935__$2);
return fetch.core.xhr.cljs$core$IFn$_invoke$arity$variadic(G__13936,G__13937,G__13938,seq13935__$3);
});

