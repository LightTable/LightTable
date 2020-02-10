// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.util.js');
goog.require('cljs.core');
/**
 * Execute `func` every `ms` milliseconds.
 */
lt.util.js.every = (function lt$util$js$every(ms,func){
return setInterval(func,ms);
});
/**
 * Wait `ms` milliseconds before executing `func`.
 */
lt.util.js.wait = (function lt$util$js$wait(ms,func){
return setTimeout(func,ms);
});
/**
 * Return the current time in milliseconds starting from the Unix epoch.
 */
lt.util.js.now = (function lt$util$js$now(){
return (new Date()).getTime();
});
/**
 * If `cur` equals `op` then return `op2`. Otherwise return `op`.
 */
lt.util.js.toggler = (function lt$util$js$toggler(cur,op,op2){
if(cljs.core._EQ_.call(null,cur,op)){
return op2;
} else {
return op;
}
});
/**
 * Debounce execution of `func` with a delay of `ts` milliseconds.
 * 
 *   In other words, returns a new function that executes `func` only once
 *   after `ts` milliseconds regardless the number of times the new function is called
 *   during the `ts` milliseconds.
 * 
 *   See [[throttle]].
 */
lt.util.js.debounce = (function lt$util$js$debounce(ts,func){
return Cowboy.debounce(ts,func);
});
/**
 * Throttle execution of `func` with a delay of `ts` milliseconds.
 * 
 *   In other words, returns a new function that executes `func` no more than
 *   once every `ts` milliseconds.
 * 
 *   See [[debounce]].
 */
lt.util.js.throttle = (function lt$util$js$throttle(ts,func){
return Cowboy.throttle(ts,func);
});
/**
 * Convert JSON `data` to ClojureScript with keywords enabled.
 * 
 *   See [js->clj](http://cljs.github.io/api/cljs.core/js-GTclj).
 */
lt.util.js.__GT_clj = (function lt$util$js$__GT_clj(data){
return cljs.core.js__GT_clj.call(null,data,new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true);
});
/**
 * Map of entities, such as `&`, to their corresponding character reference.
 */
lt.util.js.entities = new cljs.core.PersistentArrayMap(null, 6, ["&","&amp;","<","&lt;",">","&gt;","\"","&quot;","'","&#39;","/","&#x2F;"], null);
/**
 * Replace characters in `str` that are in [[entities]] with their escaped equivalent.
 */
lt.util.js.escape = (function lt$util$js$escape(str){
if(cljs.core.truth_(str)){
return str.replace((new RegExp("[&<>\"'/]","g")),(function (s){
return lt.util.js.entities.call(null,s);
}));
} else {
return null;
}
});
