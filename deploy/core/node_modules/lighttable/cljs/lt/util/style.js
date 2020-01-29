// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.util.style');
goog.require('cljs.core');
/**
 * Appends "px" to `s`. If `s` is falsey then 0 is used.
 * 
 *   Example:
 *   ```
 *   (->px 75)    ;;=> "75px"
 * 
 *   (->px false) ;;=> "0px"
 *   ```
 */
lt.util.style.__GT_px = (function lt$util$style$__GT_px(s){
return [cljs.core.str((function (){var or__6793__auto__ = s;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return (0);
}
})()),cljs.core.str("px")].join('');
});
