// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.util.load');
goog.require('cljs.core');
goog.require('clojure.string');
/**
 * Provides access to Node/Electron [path library](https://nodejs.org/api/path.html).
 */
lt.util.load.fpath = require("path");
/**
 * Provides access to Node/Electron [fs library](https://nodejs.org/api/fs.html).
 */
lt.util.load.fs = require("fs");
/**
 * Directory where Light Table is being executed.
 */
lt.util.load.dir = [cljs.core.str(__dirname),cljs.core.str("/..")].join('');
/**
 * When true, various parts of Light Table will reload.
 */
lt.util.load._STAR_force_reload_STAR_ = false;
/**
 * Current platform-specific file separator.
 */
lt.util.load.separator = lt.util.load.fpath.sep;
/**
 * True if `path` is formatted as an absolute filepath. False otherwise.
 *   Does not check if `path` exists or is otherwise valid.
 * 
 *   Example:
 *   ```
 *   (absolute? "/foo/bar/baz")     ;;=> true
 * 
 *   (absolute? "/foo/bar/baz.txt") ;;=> true
 * 
 *   (absolute? "./foo/bar")        ;;=> false
 * 
 *   (absolute? "foo/bar")          ;;=> false
 *   ```
 */
lt.util.load.absolute_QMARK_ = (function lt$util$load$absolute_QMARK_(path){
return cljs.core.boolean$.call(null,cljs.core.re_seq.call(null,/^\s*[\\\\/]|([\w]+:[\\\\/])/,path));
});
/**
 * Requires Light Table's bundled node modules located at `path`.
 */
lt.util.load.node_module = (function lt$util$load$node_module(path){
return require([cljs.core.str(lt.util.load.dir),cljs.core.str("/core/node_modules/"),cljs.core.str(path)].join(''));
});
/**
 * Converts source mapping to use absolute paths for URLs. Also converts `\` to `/` in order to maintain compatibility with Windows.
 */
lt.util.load.abs_source_mapping_url = (function lt$util$load$abs_source_mapping_url(code,file){
var temp__4655__auto__ = cljs.core.second.call(null,cljs.core.re_find.call(null,/\n\/\/# sourceMappingURL=(.*\.map)/,code));
if(cljs.core.truth_(temp__4655__auto__)){
var path_to_source_map = temp__4655__auto__;
if(cljs.core.not.call(null,lt.util.load.absolute_QMARK_.call(null,path_to_source_map))){
var abs_path_to_source_map = clojure.string.replace.call(null,lt.util.load.fpath.join(lt.util.load.fpath.dirname(file),path_to_source_map),"\\","/");
var abs_path_to_source_map__$1 = ((cljs.core._EQ_.call(null,lt.util.load.separator,"\\"))?[cljs.core.str("/"),cljs.core.str(abs_path_to_source_map)].join(''):abs_path_to_source_map);
return clojure.string.replace_first.call(null,code,/\n\/\/# sourceMappingURL=.*/,[cljs.core.str("\n//# sourceMappingURL="),cljs.core.str(encodeURI(abs_path_to_source_map__$1))].join(''));
} else {
return code;
}
} else {
return code;
}
});
lt.util.load.prep = (function lt$util$load$prep(code,file){
return [cljs.core.str(lt.util.load.abs_source_mapping_url.call(null,code,file)),cljs.core.str("\n\n//# sourceURL="),cljs.core.str(encodeURI(file))].join('');
});
/**
 * Loads `file`, into Light Table and evaluates it.
 * 
 *   If `sync` is not provided then it defaults to `false`. If `sync` is truthy then `file` will be loaded synchronously.
 */
lt.util.load.js = (function lt$util$load$js(var_args){
var args13442 = [];
var len__7868__auto___13445 = arguments.length;
var i__7869__auto___13446 = (0);
while(true){
if((i__7869__auto___13446 < len__7868__auto___13445)){
args13442.push((arguments[i__7869__auto___13446]));

var G__13447 = (i__7869__auto___13446 + (1));
i__7869__auto___13446 = G__13447;
continue;
} else {
}
break;
}

var G__13444 = args13442.length;
switch (G__13444) {
case 1:
return lt.util.load.js.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return lt.util.load.js.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13442.length)].join('')));

}
});

lt.util.load.js.cljs$core$IFn$_invoke$arity$1 = (function (file){
return lt.util.load.js.call(null,file,false);
});

lt.util.load.js.cljs$core$IFn$_invoke$arity$2 = (function (file,sync){
var file__$1 = ((cljs.core.not.call(null,lt.util.load.absolute_QMARK_.call(null,file)))?lt.util.load.fpath.join(lt.util.load.dir,file):file);
if(cljs.core.truth_(sync)){
return window.eval(lt.util.load.prep.call(null,lt.util.load.fs.readFileSync(file__$1).toString(),file__$1));
} else {
return lt.util.load.fs.readFile(lt.util.load.fpath.join(lt.util.load.dir,file__$1),((function (file__$1){
return (function (content){
return window.eval(lt.util.load.prep.call(null,content.toString(),file__$1));
});})(file__$1))
);
}
});

lt.util.load.js.cljs$lang$maxFixedArity = 2;

/**
 * Loads `file` into Light Table as CSS. Returns the resulting link.
 */
lt.util.load.css = (function lt$util$load$css(file){
var link = document.createElement("link");
link.type = "text/css";

link.rel = "stylesheet";

link.href = (cljs.core.truth_(lt.util.load.absolute_QMARK_.call(null,file))?[cljs.core.str("file://"),cljs.core.str(file)].join(''):file);

document.head.appendChild(link);

return link;
});
/**
 * When string `s` corresponds to a Javascript object already existing in Light Table then return the found object.
 */
lt.util.load.obj_exists_QMARK_ = (function lt$util$load$obj_exists_QMARK_(s){
var parts = clojure.string.split.call(null,s,".");
var cur = window;
while(true){
if(cljs.core.not.call(null,cljs.core.first.call(null,parts))){
return cur;
} else {
var temp__4655__auto__ = (cur[cljs.core.first.call(null,parts)]);
if(cljs.core.truth_(temp__4655__auto__)){
var cur__$1 = temp__4655__auto__;
var G__13449 = cljs.core.rest.call(null,parts);
var G__13450 = cur__$1;
parts = G__13449;
cur = G__13450;
continue;
} else {
return null;
}
}
break;
}
});
/**
 * An empty Javascript object.
 */
lt.util.load.provided = ({});
/**
 * Return the number of ancestors of `parent`.
 */
lt.util.load.provided_ancestors = (function lt$util$load$provided_ancestors(parent){
return cljs.core.count.call(null,Object.keys(lt.util.load.provided).filter((function (p1__13451_SHARP_){
return (p1__13451_SHARP_.indexOf(parent) > (-1));
})));
});
/**
 * True if the number of keys is less than or equal to the number of ancestors found.
 */
lt.util.load.only_ancestors_QMARK_ = (function lt$util$load$only_ancestors_QMARK_(cur,s){
return (Object.keys(cur).length <= lt.util.load.provided_ancestors.call(null,s));
});
/**
 * No usage was found in Light Table core and is a candidate for deprecation. Do not use.
 */
lt.util.load.provided_QMARK_ = (function lt$util$load$provided_QMARK_(s){
if(cljs.core.truth_(lt.util.load._STAR_force_reload_STAR_)){
return false;
} else {
var res = (cljs.core.truth_((lt.util.load.provided[s]))?true:(function (){var temp__4657__auto__ = lt.util.load.obj_exists_QMARK_.call(null,s);
if(cljs.core.truth_(temp__4657__auto__)){
var cur = temp__4657__auto__;
return cljs.core.not.call(null,lt.util.load.only_ancestors_QMARK_.call(null,cur,s));
} else {
return null;
}
})());
(lt.util.load.provided[s] = true);

return res;
}
});
