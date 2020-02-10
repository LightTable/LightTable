// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.objs.files');
goog.require('cljs.core');
goog.require('lt.object');
goog.require('lt.util.load');
goog.require('clojure.string');
goog.require('lt.objs.platform');
goog.require('lt.util.js');
lt.objs.files.fs = require("fs");
lt.objs.files.fpath = require("path");
lt.objs.files.shell = lt.util.load.node_module.call(null,"shelljs");
lt.objs.files.electron_shell = require("electron").shell;
lt.objs.files.os = require("os");
lt.objs.files.data_path = lt.objs.platform.get_data_path.call(null);
lt.objs.files.typelist__GT_index = (function lt$objs$files$typelist__GT_index(cur,types){
var full = cljs.core.map.call(null,cljs.core.juxt.call(null,new cljs.core.Keyword(null,"name","name",1843675177),cljs.core.identity),types);
var ext = (function (){var iter__7573__auto__ = ((function (full){
return (function lt$objs$files$typelist__GT_index_$_iter__13460(s__13461){
return (new cljs.core.LazySeq(null,((function (full){
return (function (){
var s__13461__$1 = s__13461;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__13461__$1);
if(temp__4657__auto__){
var xs__5205__auto__ = temp__4657__auto__;
var cur__$1 = cljs.core.first.call(null,xs__5205__auto__);
var iterys__7569__auto__ = ((function (s__13461__$1,cur__$1,xs__5205__auto__,temp__4657__auto__,full){
return (function lt$objs$files$typelist__GT_index_$_iter__13460_$_iter__13462(s__13463){
return (new cljs.core.LazySeq(null,((function (s__13461__$1,cur__$1,xs__5205__auto__,temp__4657__auto__,full){
return (function (){
var s__13463__$1 = s__13463;
while(true){
var temp__4657__auto____$1 = cljs.core.seq.call(null,s__13463__$1);
if(temp__4657__auto____$1){
var s__13463__$2 = temp__4657__auto____$1;
if(cljs.core.chunked_seq_QMARK_.call(null,s__13463__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__13463__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__13465 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__13464 = (0);
while(true){
if((i__13464 < size__7572__auto__)){
var ext = cljs.core._nth.call(null,c__7571__auto__,i__13464);
cljs.core.chunk_append.call(null,b__13465,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ext,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(cur__$1)], null));

var G__13466 = (i__13464 + (1));
i__13464 = G__13466;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__13465),lt$objs$files$typelist__GT_index_$_iter__13460_$_iter__13462.call(null,cljs.core.chunk_rest.call(null,s__13463__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__13465),null);
}
} else {
var ext = cljs.core.first.call(null,s__13463__$2);
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ext,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(cur__$1)], null),lt$objs$files$typelist__GT_index_$_iter__13460_$_iter__13462.call(null,cljs.core.rest.call(null,s__13463__$2)));
}
} else {
return null;
}
break;
}
});})(s__13461__$1,cur__$1,xs__5205__auto__,temp__4657__auto__,full))
,null,null));
});})(s__13461__$1,cur__$1,xs__5205__auto__,temp__4657__auto__,full))
;
var fs__7570__auto__ = cljs.core.seq.call(null,iterys__7569__auto__.call(null,new cljs.core.Keyword(null,"exts","exts",-946342126).cljs$core$IFn$_invoke$arity$1(cur__$1)));
if(fs__7570__auto__){
return cljs.core.concat.call(null,fs__7570__auto__,lt$objs$files$typelist__GT_index_$_iter__13460.call(null,cljs.core.rest.call(null,s__13461__$1)));
} else {
var G__13467 = cljs.core.rest.call(null,s__13461__$1);
s__13461__$1 = G__13467;
continue;
}
} else {
return null;
}
break;
}
});})(full))
,null,null));
});})(full))
;
return iter__7573__auto__.call(null,types);
})();
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"types","types",590030639),cljs.core.into.call(null,new cljs.core.Keyword(null,"types","types",590030639).cljs$core$IFn$_invoke$arity$2(cur,cljs.core.PersistentArrayMap.EMPTY),full),new cljs.core.Keyword(null,"exts","exts",-946342126),cljs.core.into.call(null,new cljs.core.Keyword(null,"exts","exts",-946342126).cljs$core$IFn$_invoke$arity$2(cur,cljs.core.PersistentArrayMap.EMPTY),ext)], null);
});
lt.objs.files.join = (function lt$objs$files$join(var_args){
var args__7875__auto__ = [];
var len__7868__auto___13469 = arguments.length;
var i__7869__auto___13470 = (0);
while(true){
if((i__7869__auto___13470 < len__7868__auto___13469)){
args__7875__auto__.push((arguments[i__7869__auto___13470]));

var G__13471 = (i__7869__auto___13470 + (1));
i__7869__auto___13470 = G__13471;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((0) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((0)),(0),null)):null);
return lt.objs.files.join.cljs$core$IFn$_invoke$arity$variadic(argseq__7876__auto__);
});

lt.objs.files.join.cljs$core$IFn$_invoke$arity$variadic = (function (segs){
return cljs.core.apply.call(null,lt.objs.files.fpath.join,cljs.core.filter.call(null,cljs.core.string_QMARK_,cljs.core.map.call(null,cljs.core.str,segs)));
});

lt.objs.files.join.cljs$lang$maxFixedArity = (0);

lt.objs.files.join.cljs$lang$applyTo = (function (seq13468){
return lt.objs.files.join.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq13468));
});

/**
 * Regex pattern consisting of files, folders, etc... to ignore.
 */
lt.objs.files.ignore_pattern = /(^\..*)|\.class$|target\/|^[_.]svn$|^CVS$|^\.hg$|^\.git$|\.pyc|~|\.swp|\.jar|.DS_Store/;
/**
 * 
 */
lt.objs.files.__BEH__file_types = (function lt$objs$files$__BEH__file_types(this$,types){
return lt.object.merge_BANG_.call(null,lt.objs.files.files_obj,lt.objs.files.typelist__GT_index.call(null,cljs.core.deref.call(null,lt.objs.files.files_obj),types));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.files","file-types","lt.objs.files/file-types",1701622850),new cljs.core.Keyword(null,"desc","desc",2093485764),"Files: Associate file types",new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"types",new cljs.core.Keyword(null,"example","example",-1755779144),"[{:exts [:wisp],\n  :mime \"text/x-clojurescript\",\n  :name \"Wisp\",\n  :tags [:editor.wisp]}]"], null)], null),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"object.instant","object.instant",-29936727),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.files.__BEH__file_types);
/**
 * 
 */
lt.objs.files.__BEH__file__DOT__ignore_pattern = (function lt$objs$files$__BEH__file__DOT__ignore_pattern(this$,pattern){
return lt.objs.files.ignore_pattern = (new RegExp(pattern));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.files","file.ignore-pattern","lt.objs.files/file.ignore-pattern",2106920273),new cljs.core.Keyword(null,"exclusive","exclusive",-1507998718),true,new cljs.core.Keyword(null,"desc","desc",2093485764),"Files: Set ignore pattern",new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"pattern",new cljs.core.Keyword(null,"example","example",-1755779144),"\"\\\\.git|\\\\.pyc\""], null)], null),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"object.instant","object.instant",-29936727),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.files.__BEH__file__DOT__ignore_pattern);
/**
 * 
 */
lt.objs.files.__BEH__open_failed = (function lt$objs$files$__BEH__open_failed(this$,path,e){
return lt.objs.console.error([cljs.core.str("Failed to open path '"),cljs.core.str(path),cljs.core.str("' with error: "),cljs.core.str(e)].join(''));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.files","open-failed","lt.objs.files/open-failed",-61333032),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"files.open.error","files.open.error",713301707),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.files.__BEH__open_failed);
lt.objs.files.files_obj = lt.object.create.call(null,lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.files","files","lt.objs.files/files",-2114736485),new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"files","files",-472457450)], null),new cljs.core.Keyword(null,"exts","exts",-946342126),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"types","types",590030639),cljs.core.PersistentArrayMap.EMPTY));
/**
 * Current platform-specific line ending.
 */
lt.objs.files.line_ending = lt.objs.files.os.EOL;
/**
 * Current platform-specific file separator.
 */
lt.objs.files.separator = lt.objs.files.fpath.sep;
lt.objs.files.available_drives = cljs.core.PersistentHashSet.EMPTY;
/**
 * Directory process is started in.
 */
lt.objs.files.cwd = process.cwd();
if(cljs.core._EQ_.call(null,lt.objs.files.separator,"\\")){
require("child_process").exec("wmic logicaldisk get name",(function (_,out,___$1){
var ds = cljs.core.rest.call(null,out.split(/\r\n|\r|\n/));
var ds__$1 = cljs.core.map.call(null,((function (ds){
return (function (p1__13472_SHARP_){
return [cljs.core.str(p1__13472_SHARP_.trim()),cljs.core.str(lt.objs.files.separator)].join('');
});})(ds))
,cljs.core.remove.call(null,cljs.core.empty_QMARK_,ds));
return lt.objs.files.available_drives = cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,ds__$1);
}));
} else {
}
/**
 * Extracts the basename of the `path`, typically the end of the path.
 * 
 *   If `ext` is provided then the result returned will not contain the extension.
 * 
 *   Example:
 *   ```
 *   (basename "/foo/bar/baz.txt")
 *   ;;=> "baz.txt"
 * 
 *   (basename "/foo/bar/baz.txt" ".txt")
 *   ;;=> "baz"
 *   ```
 */
lt.objs.files.basename = (function lt$objs$files$basename(var_args){
var args13473 = [];
var len__7868__auto___13476 = arguments.length;
var i__7869__auto___13477 = (0);
while(true){
if((i__7869__auto___13477 < len__7868__auto___13476)){
args13473.push((arguments[i__7869__auto___13477]));

var G__13478 = (i__7869__auto___13477 + (1));
i__7869__auto___13477 = G__13478;
continue;
} else {
}
break;
}

var G__13475 = args13473.length;
switch (G__13475) {
case 1:
return lt.objs.files.basename.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return lt.objs.files.basename.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13473.length)].join('')));

}
});

lt.objs.files.basename.cljs$core$IFn$_invoke$arity$1 = (function (path){
return lt.objs.files.fpath.basename(path);
});

lt.objs.files.basename.cljs$core$IFn$_invoke$arity$2 = (function (path,ext){
return lt.objs.files.fpath.basename(path,ext);
});

lt.objs.files.basename.cljs$lang$maxFixedArity = 2;

/**
 * Example:
 *   ```
 *   (get-roots) ;;=> #{"/"}
 *   ```
 */
lt.objs.files.get_roots = (function lt$objs$files$get_roots(){
if(cljs.core._EQ_.call(null,lt.objs.files.separator,"\\")){
return lt.objs.files.available_drives;
} else {
return new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, ["/",null], null), null);
}
});
/**
 * Returns the exploded basename of `path` with each element after the first split on `.`.
 * 
 *   Example:
 *   ```
 *   (get-file-parts "./foo/bar/")
 *   ;;=> ["bar"]
 * 
 *   (get-file-parts "./foo/bar/bas.txt.md.clj")
 *   ;;=> ["bas.txt.md.clj" "txt.md.clj" "md.clj" "clj"]
 *   ```
 */
lt.objs.files.get_file_parts = (function lt$objs$files$get_file_parts(path){
var filename = lt.objs.files.basename.call(null,path);
var file_parts = clojure.string.split.call(null,filename,/\./);
var parts = file_parts;
var acc = cljs.core.PersistentVector.EMPTY;
while(true){
if(cljs.core.empty_QMARK_.call(null,parts)){
return acc;
} else {
var G__13480 = cljs.core.rest.call(null,parts);
var G__13481 = cljs.core.conj.call(null,acc,clojure.string.join.call(null,".",parts));
parts = G__13480;
acc = G__13481;
continue;
}
break;
}
});
/**
 * Returns the last extention of `path`, without the leading `.`, determined by the final `.` of the path.
 * 
 *   Example:
 *   ```
 *   (ext "foo.txt")         ;;=> "txt"
 * 
 *   (ext "foo/bar.txt.tar") ;;=> "tar"
 * 
 *   (ext "foo.")            ;;=> ""
 * 
 *   (ext "foo")             ;;=> ""
 *   ```
 */
lt.objs.files.ext = (function lt$objs$files$ext(path){
return cljs.core.subs.call(null,lt.objs.files.fpath.extname(path),(1));
});
/**
 * Returns the `path`, but without the last extension, determined by the final `.` of the path.
 * 
 *   Example:
 *   ```
 *   (without-ext "foo.txt")         ;;=> "foo"
 * 
 *   (without-ext "foo/bar.txt.tar") ;;=> "foo/bar.txt"
 * 
 *   (without-ext "foo.")            ;;=> "foo"
 * 
 *   (without-ext "foo")             ;;=> "foo"
 *   ```
 */
lt.objs.files.without_ext = (function lt$objs$files$without_ext(path){
var i = path.lastIndexOf(".");
if((i > (0))){
return cljs.core.subs.call(null,path,(0),i);
} else {
return path;
}
});
/**
 * Extracts type information based on `ext`, which must be a keyword.
 * 
 *   Example:
 *   ```
 *   (ext->type :txt)
 *   ;;=> {:exts [:txt], :mime "plaintext", :tags [:editor.plaintext], :name "Plain Text"}
 * 
 *   (ext->type :cljs)
 *   ;;=> {:exts [:cljs], :mime "text/x-clojurescript", :tags [:editor.cljs :editor.clojurescript], :name "ClojureScript"}
 * 
 *   (ext->type :clj)
 *   ;;=> {:exts [:clj], :mime "text/x-clojure", :tags [:editor.clj :editor.clojure], :name "Clojure"}
 *   ```
 */
lt.objs.files.ext__GT_type = (function lt$objs$files$ext__GT_type(ext){
var exts = new cljs.core.Keyword(null,"exts","exts",-946342126).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.files.files_obj));
var types = new cljs.core.Keyword(null,"types","types",590030639).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.files.files_obj));
return types.call(null,cljs.core.get.call(null,exts,ext));
});
/**
 * Extracts the `:mime` information from `ext`, which must be a keyword.
 * 
 *   Example:
 *   ```
 *   (ext->mode :txt)  ;;=> "plaintext"
 * 
 *   (ext->mode :cljs) ;;=> "text/x-clojurescript"
 * 
 *   (ext->mode :clj)  ;;=> "text/x-clojure"
 *   ```
 */
lt.objs.files.ext__GT_mode = (function lt$objs$files$ext__GT_mode(ext){
return new cljs.core.Keyword(null,"mime","mime",-1846414642).cljs$core$IFn$_invoke$arity$1(lt.objs.files.ext__GT_type.call(null,ext));
});
/**
 * Given a `path`, returns type information if a file. Returns an empty string if `path` is a directory.
 * 
 *   Example:
 *   ```
 *   (path->type "/foo/bar/baz.txt")
 *   ;;=> {:exts [:txt], :mime "plaintext", :tags [:editor.plaintext], :name "Plain Text"}
 * 
 *   (path->type "foo.cljs")
 *   ;;=> {:exts [:cljs], :mime "text/x-clojurescript", :tags [:editor.cljs :editor.clojurescript], :name "ClojureScript"}
 * 
 *   (path->type "foo.clj")
 *   ;;=> {:exts [:clj], :mime "text/x-clojure", :tags [:editor.clj :editor.clojure], :name "Clojure"}
 * 
 *   (path->type "/foo/bar/")
 *   ;;=> "" ; No type information is returned as it is a directory.
 *   ```
 */
lt.objs.files.path__GT_type = (function lt$objs$files$path__GT_type(path){
return cljs.core.first.call(null,cljs.core.remove.call(null,cljs.core.nil_QMARK_,cljs.core.map.call(null,(function (p1__13482_SHARP_){
return lt.objs.files.ext__GT_type.call(null,cljs.core.keyword.call(null,p1__13482_SHARP_));
}),lt.objs.files.get_file_parts.call(null,path))));
});
/**
 * Given a `path`, returns mime information.
 * 
 *   Example:
 *   ```
 *   (path->mode "/foo/bar/baz.txt") ;;=> "plaintext"
 * 
 *   (path->mode "foo.cljs")         ;;=> "text/x-clojurescript"
 * 
 *   (path->mode "foo.clj")          ;;=> "text/x-clojure"
 * 
 *   (path->mode "foo")              ;;=> ""
 *   ```
 */
lt.objs.files.path__GT_mode = (function lt$objs$files$path__GT_mode(path){
return cljs.core.first.call(null,cljs.core.remove.call(null,cljs.core.nil_QMARK_,cljs.core.map.call(null,(function (p1__13483_SHARP_){
return lt.objs.files.ext__GT_mode.call(null,cljs.core.keyword.call(null,p1__13483_SHARP_));
}),lt.objs.files.get_file_parts.call(null,path))));
});
lt.objs.files.determine_line_ending = (function lt$objs$files$determine_line_ending(text){
var text__$1 = cljs.core.subs.call(null,text,(0),(1000));
var rn = cljs.core.re_seq.call(null,/\r\n/,text__$1);
var n = cljs.core.re_seq.call(null,/[^\r]\n/,text__$1);
if(cljs.core.truth_((function (){var and__6781__auto__ = rn;
if(cljs.core.truth_(and__6781__auto__)){
return n;
} else {
return and__6781__auto__;
}
})())){
return lt.objs.files.line_ending;
} else {
if((cljs.core.not.call(null,rn)) && (cljs.core.not.call(null,n))){
return lt.objs.files.line_ending;
} else {
if(cljs.core.not.call(null,n)){
return "\r\n";
} else {
return "\n";

}
}
}
});
/**
 * True if `path` exists on filesystem.
 */
lt.objs.files.exists_QMARK_ = (function lt$objs$files$exists_QMARK_(path){
return lt.objs.files.fs.existsSync(path);
});
/**
 * If `path` exists then returns [fs.Stats](https://nodejs.org/api/fs.html#fs_class_fs_stats) instance.
 */
lt.objs.files.stats = (function lt$objs$files$stats(path){
if(cljs.core.truth_(lt.objs.files.exists_QMARK_.call(null,path))){
return lt.objs.files.fs.statSync(path);
} else {
return null;
}
});
/**
 * True if `path` corresponds to a directory that exists.
 */
lt.objs.files.dir_QMARK_ = (function lt$objs$files$dir_QMARK_(path){
if(cljs.core.truth_(lt.objs.files.exists_QMARK_.call(null,path))){
var stat = lt.objs.files.fs.statSync(path);
return stat.isDirectory();
} else {
return null;
}
});
/**
 * True if `path` corresponds to a file that exists.
 */
lt.objs.files.file_QMARK_ = (function lt$objs$files$file_QMARK_(path){
if(cljs.core.truth_(lt.objs.files.exists_QMARK_.call(null,path))){
var stat = lt.objs.files.fs.statSync(path);
return stat.isFile();
} else {
return null;
}
});
/**
 * True if `path` is formatted as an absolute filepath. False otherwise.
 *   Does not check if `path` exists or otherwise valid.
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
lt.objs.files.absolute_QMARK_ = (function lt$objs$files$absolute_QMARK_(path){
return cljs.core.boolean$.call(null,cljs.core.re_seq.call(null,/^[\\\\/]|([\w]+:[\\\\/])/,path));
});
/**
 * Returns 7, 6, 3, or 2 based on file permissions. `path` must exist.
 */
lt.objs.files.writable_QMARK_ = (function lt$objs$files$writable_QMARK_(path){
var perm = [cljs.core.str(parseInt(lt.objs.files.fs.statSync(path).mode.toString((8)),(10)))].join('');
var perm__$1 = cljs.core.subs.call(null,perm,(cljs.core.count.call(null,perm) - (3)));
return new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, ["3",null,"7",null,"6",null,"2",null], null), null).call(null,cljs.core.first.call(null,perm__$1));
});
/**
 * See [path.resolve](https://nodejs.org/api/path.html#path_path_resolve_path).
 * 
 *   Example:
 *   ```
 *   (resolve "/" "/home/user")   ;;=> "/home/user"
 * 
 *   (resolve "/foo" "./bar/baz") ;;=> "/foo/bar/baz"
 * 
 *   (resolve "./" "codox")       ;;=> "/home/user/dev/LightTable/codox"
 *   ```
 */
lt.objs.files.resolve = (function lt$objs$files$resolve(base,cur){
return lt.objs.files.fpath.resolve(base,cur);
});
/**
 * Returns the canonicalized absolute pathname, expanding symbolic links.
 * 
 *   Example:
 * 
 *   Assume current directory is `/foo/bar/` and `/foo/bar/baz` exists too.
 *   ```
 *   (real-path "./")           ;;=> "/foo/bar/"
 * 
 *   (real-path ".././bar/baz") ;;=> "/foo/bar/baz/"
 *   ```
 */
lt.objs.files.real_path = (function lt$objs$files$real_path(c){
return lt.objs.files.fs.realpathSync(c);
});
/**
 * If `path` and `f` together form a valid directory, then `f` is returned as a directory. Otherwise, `f` is returned as a file
 * 
 *   Example:
 *   ```
 *   (->file|dir "/foo/" "bar.txt") ;;=> "bar.txt"
 * 
 *   (->file|dir "./foo/" "bar/")   ;;=> "bar/"
 *   ```
 */
lt.objs.files.__GT_file_BAR_dir = (function lt$objs$files$__GT_file_BAR_dir(path,f){
if(cljs.core.truth_(lt.objs.files.dir_QMARK_.call(null,[cljs.core.str(path),cljs.core.str(lt.objs.files.separator),cljs.core.str(f)].join('')))){
return [cljs.core.str(f),cljs.core.str(lt.objs.files.separator)].join('');
} else {
return [cljs.core.str(f)].join('');
}
});
lt.objs.files.bomless_read = (function lt$objs$files$bomless_read(path){

var content = lt.objs.files.fs.readFileSync(path,"utf-8");
return clojure.string.replace.call(null,content,"\uFEFF","");
});
/**
 * Open file and in callback return map with file's content in `:content`
 */
lt.objs.files.open = (function lt$objs$files$open(path,cb){
try{var content = lt.objs.files.bomless_read.call(null,path);
if(cljs.core.truth_(content)){
var e = lt.objs.files.ext.call(null,path);
cb.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"content","content",15833224),content,new cljs.core.Keyword(null,"line-ending","line-ending",1603768237),lt.objs.files.determine_line_ending.call(null,content),new cljs.core.Keyword(null,"type","type",1174270348),(function (){var or__6793__auto__ = lt.objs.files.path__GT_mode.call(null,path);
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return e;
}
})()], null));

return lt.object.raise.call(null,lt.objs.files.files_obj,new cljs.core.Keyword(null,"files.open","files.open",-1968808365),content);
} else {
return null;
}
}catch (e13485){var e = e13485;
lt.object.raise.call(null,lt.objs.files.files_obj,new cljs.core.Keyword(null,"files.open.error","files.open.error",713301707),path,e);

if(cljs.core.truth_(cb)){
return cb.call(null,null,e);
} else {
return null;
}
}});
/**
 * Open file and return map with file's content in `:content`.
 */
lt.objs.files.open_sync = (function lt$objs$files$open_sync(path){
try{var content = lt.objs.files.bomless_read.call(null,path);
if(cljs.core.truth_(content)){
var e = lt.objs.files.ext.call(null,path);
lt.object.raise.call(null,lt.objs.files.files_obj,new cljs.core.Keyword(null,"files.open","files.open",-1968808365),content);

return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"content","content",15833224),content,new cljs.core.Keyword(null,"line-ending","line-ending",1603768237),lt.objs.files.determine_line_ending.call(null,content),new cljs.core.Keyword(null,"type","type",1174270348),(function (){var or__6793__auto__ = lt.objs.files.ext__GT_mode.call(null,cljs.core.keyword.call(null,e));
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return e;
}
})()], null);
} else {
return null;
}
}catch (e13487){var e = e13487;
lt.object.raise.call(null,lt.objs.files.files_obj,new cljs.core.Keyword(null,"files.open.error","files.open.error",713301707),path,e);

return null;
}});
/**
 * Save `path` with given `content`. Optional callback called after save.
 */
lt.objs.files.save = (function lt$objs$files$save(var_args){
var args__7875__auto__ = [];
var len__7868__auto___13496 = arguments.length;
var i__7869__auto___13497 = (0);
while(true){
if((i__7869__auto___13497 < len__7868__auto___13496)){
args__7875__auto__.push((arguments[i__7869__auto___13497]));

var G__13498 = (i__7869__auto___13497 + (1));
i__7869__auto___13497 = G__13498;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((2) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((2)),(0),null)):null);
return lt.objs.files.save.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__7876__auto__);
});

lt.objs.files.save.cljs$core$IFn$_invoke$arity$variadic = (function (path,content,p__13491){
var vec__13492 = p__13491;
var cb = cljs.core.nth.call(null,vec__13492,(0),null);
try{lt.objs.files.fs.writeFileSync(path,content);

lt.object.raise.call(null,lt.objs.files.files_obj,new cljs.core.Keyword(null,"files.save","files.save",746766807),path);

if(cljs.core.truth_(cb)){
return cb.call(null);
} else {
return null;
}
}catch (e13495){var e = e13495;
lt.object.raise.call(null,lt.objs.files.files_obj,new cljs.core.Keyword(null,"files.save.error","files.save.error",-359859819),path,e);

if(cljs.core.truth_(cb)){
return cb.call(null,e);
} else {
return null;
}
}});

lt.objs.files.save.cljs$lang$maxFixedArity = (2);

lt.objs.files.save.cljs$lang$applyTo = (function (seq13488){
var G__13489 = cljs.core.first.call(null,seq13488);
var seq13488__$1 = cljs.core.next.call(null,seq13488);
var G__13490 = cljs.core.first.call(null,seq13488__$1);
var seq13488__$2 = cljs.core.next.call(null,seq13488__$1);
return lt.objs.files.save.cljs$core$IFn$_invoke$arity$variadic(G__13489,G__13490,seq13488__$2);
});

/**
 * Append `content` to `path`. Optional callback called after append.
 */
lt.objs.files.append = (function lt$objs$files$append(var_args){
var args__7875__auto__ = [];
var len__7868__auto___13507 = arguments.length;
var i__7869__auto___13508 = (0);
while(true){
if((i__7869__auto___13508 < len__7868__auto___13507)){
args__7875__auto__.push((arguments[i__7869__auto___13508]));

var G__13509 = (i__7869__auto___13508 + (1));
i__7869__auto___13508 = G__13509;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((2) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((2)),(0),null)):null);
return lt.objs.files.append.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__7876__auto__);
});

lt.objs.files.append.cljs$core$IFn$_invoke$arity$variadic = (function (path,content,p__13502){
var vec__13503 = p__13502;
var cb = cljs.core.nth.call(null,vec__13503,(0),null);
try{lt.objs.files.fs.appendFileSync(path,content);

lt.object.raise.call(null,lt.objs.files.files_obj,new cljs.core.Keyword(null,"files.save","files.save",746766807),path);

if(cljs.core.truth_(cb)){
return cb.call(null);
} else {
return null;
}
}catch (e13506){var e = e13506;
lt.object.raise.call(null,lt.objs.files.files_obj,new cljs.core.Keyword(null,"files.save.error","files.save.error",-359859819),path,e);

if(cljs.core.truth_(cb)){
return cb.call(null,e);
} else {
return null;
}
}});

lt.objs.files.append.cljs$lang$maxFixedArity = (2);

lt.objs.files.append.cljs$lang$applyTo = (function (seq13499){
var G__13500 = cljs.core.first.call(null,seq13499);
var seq13499__$1 = cljs.core.next.call(null,seq13499);
var G__13501 = cljs.core.first.call(null,seq13499__$1);
var seq13499__$2 = cljs.core.next.call(null,seq13499__$1);
return lt.objs.files.append.cljs$core$IFn$_invoke$arity$variadic(G__13500,G__13501,seq13499__$2);
});

/**
 * Move file to trash and returns boolean status.
 */
lt.objs.files.trash_BANG_ = (function lt$objs$files$trash_BANG_(path){
return lt.objs.files.electron_shell.moveItemTotrash(path);
});
/**
 * Delete file or directory from filesystem.
 */
lt.objs.files.delete_BANG_ = (function lt$objs$files$delete_BANG_(path){
if(cljs.core.truth_(lt.objs.files.dir_QMARK_.call(null,path))){
return lt.objs.files.shell.rm("-r",path);
} else {
return lt.objs.files.fs.unlinkSync(path);
}
});
/**
 * Move file or directory to given `path`.
 */
lt.objs.files.move_BANG_ = (function lt$objs$files$move_BANG_(from,to){
return lt.objs.files.fs.renameSync(from,to);
});
/**
 * Copy file or directory to given `path`.
 */
lt.objs.files.copy = (function lt$objs$files$copy(from,to){
if(cljs.core.truth_(lt.objs.files.dir_QMARK_.call(null,from))){
return lt.objs.files.shell.cp("-R",from,to);
} else {
return lt.objs.files.save.call(null,to,new cljs.core.Keyword(null,"content","content",15833224).cljs$core$IFn$_invoke$arity$1(lt.objs.files.open_sync.call(null,from)));
}
});
/**
 * Make given directory.
 */
lt.objs.files.mkdir = (function lt$objs$files$mkdir(path){
return lt.objs.files.fs.mkdirSync(path);
});
/**
 * Return directory of `path`.
 */
lt.objs.files.parent = (function lt$objs$files$parent(path){
return lt.objs.files.fpath.dirname(path);
});
/**
 * Given a `path`, if it already exists then append a digit (starts at 1 and increments after) to the end of `path` and check again.
 */
lt.objs.files.next_available_name = (function lt$objs$files$next_available_name(path){
if(cljs.core.not.call(null,lt.objs.files.exists_QMARK_.call(null,path))){
return path;
} else {
var ext = lt.objs.files.ext.call(null,path);
var name = lt.objs.files.without_ext.call(null,lt.objs.files.basename.call(null,path));
var p = lt.objs.files.parent.call(null,path);
var x = (1);
var cur = lt.objs.files.join.call(null,p,[cljs.core.str(name),cljs.core.str(x),cljs.core.str("."),cljs.core.str(ext)].join(''));
while(true){
if(cljs.core.not.call(null,lt.objs.files.exists_QMARK_.call(null,cur))){
return cur;
} else {
var G__13510 = (x + (1));
var G__13511 = lt.objs.files.join.call(null,p,[cljs.core.str(name),cljs.core.str((x + (1))),cljs.core.str((cljs.core.truth_(ext)?[cljs.core.str("."),cljs.core.str(ext)].join(''):null))].join(''));
x = G__13510;
cur = G__13511;
continue;
}
break;
}
}
});
/**
 * Return directory's files.
 */
lt.objs.files.ls = (function lt$objs$files$ls(var_args){
var args13512 = [];
var len__7868__auto___13516 = arguments.length;
var i__7869__auto___13517 = (0);
while(true){
if((i__7869__auto___13517 < len__7868__auto___13516)){
args13512.push((arguments[i__7869__auto___13517]));

var G__13518 = (i__7869__auto___13517 + (1));
i__7869__auto___13517 = G__13518;
continue;
} else {
}
break;
}

var G__13514 = args13512.length;
switch (G__13514) {
case 1:
return lt.objs.files.ls.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return lt.objs.files.ls.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13512.length)].join('')));

}
});

lt.objs.files.ls.cljs$core$IFn$_invoke$arity$1 = (function (path){
return lt.objs.files.ls.call(null,path,null);
});

lt.objs.files.ls.cljs$core$IFn$_invoke$arity$2 = (function (path,cb){
try{var fs = cljs.core.map.call(null,cljs.core.partial.call(null,lt.objs.files.__GT_file_BAR_dir,path),lt.objs.files.fs.readdirSync(path));
if(cljs.core.truth_(cb)){
return cb.call(null,fs);
} else {
return fs;
}
}catch (e13515){var e = e13515;
if(cljs.core.truth_(cb)){
cb.call(null,null);
} else {
}

return null;
}});

lt.objs.files.ls.cljs$lang$maxFixedArity = 2;

/**
 * Return directory's files applying ignore-pattern. Takes map of options with keys:
 * 
 *   * `:files` - When set only returns files
 *   * `:dirs` - When set only return directories
 */
lt.objs.files.ls_sync = (function lt$objs$files$ls_sync(path,opts){
try{var fs = cljs.core.remove.call(null,(function (p1__13520_SHARP_){
return cljs.core.re_seq.call(null,lt.objs.files.ignore_pattern,p1__13520_SHARP_);
}),cljs.core.map.call(null,cljs.core.partial.call(null,lt.objs.files.__GT_file_BAR_dir,path),lt.objs.files.fs.readdirSync(path)));
if(cljs.core.truth_(new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(opts))){
return cljs.core.filter.call(null,((function (fs){
return (function (p1__13521_SHARP_){
return lt.objs.files.file_QMARK_.call(null,lt.objs.files.join.call(null,path,p1__13521_SHARP_));
});})(fs))
,fs);
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"dirs","dirs",-18955571).cljs$core$IFn$_invoke$arity$1(opts))){
return cljs.core.filter.call(null,((function (fs){
return (function (p1__13522_SHARP_){
return lt.objs.files.dir_QMARK_.call(null,lt.objs.files.join.call(null,path,p1__13522_SHARP_));
});})(fs))
,fs);
} else {
return fs;

}
}
}catch (e13524){var e = e13524;
return lt.objs.console.error(e);
}});
/**
 * Return directory's files as full paths.
 */
lt.objs.files.full_path_ls = (function lt$objs$files$full_path_ls(path){
try{return cljs.core.doall.call(null,cljs.core.map.call(null,cljs.core.partial.call(null,lt.objs.files.join,path),lt.objs.files.fs.readdirSync(path)));
}catch (e13526){var e = e13526;
return lt.objs.console.error(e);
}});
/**
 * Return directory's directories.
 */
lt.objs.files.dirs = (function lt$objs$files$dirs(path){
try{return cljs.core.filter.call(null,lt.objs.files.dir_QMARK_,cljs.core.map.call(null,cljs.core.partial.call(null,lt.objs.files.join,path),lt.objs.files.fs.readdirSync(path)));
}catch (e13528){var e = e13528;
return lt.objs.console.error(e);
}});
/**
 * Return users' home directory (e.g. ~/) or path under it.
 */
lt.objs.files.home = (function lt$objs$files$home(var_args){
var args13529 = [];
var len__7868__auto___13532 = arguments.length;
var i__7869__auto___13533 = (0);
while(true){
if((i__7869__auto___13533 < len__7868__auto___13532)){
args13529.push((arguments[i__7869__auto___13533]));

var G__13534 = (i__7869__auto___13533 + (1));
i__7869__auto___13533 = G__13534;
continue;
} else {
}
break;
}

var G__13531 = args13529.length;
switch (G__13531) {
case 0:
return lt.objs.files.home.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return lt.objs.files.home.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13529.length)].join('')));

}
});

lt.objs.files.home.cljs$core$IFn$_invoke$arity$0 = (function (){
return lt.objs.files.home.call(null,null);
});

lt.objs.files.home.cljs$core$IFn$_invoke$arity$1 = (function (path){
var h = ((cljs.core._EQ_.call(null,process.platform,"win32"))?process.env.USERPROFILE:process.env.HOME);
return lt.objs.files.join.call(null,h,(function (){var or__6793__auto__ = path;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return lt.objs.files.separator;
}
})());
});

lt.objs.files.home.cljs$lang$maxFixedArity = 1;

/**
 * Return LT's home directory.
 */
lt.objs.files.lt_home = (function lt$objs$files$lt_home(var_args){
var args13536 = [];
var len__7868__auto___13539 = arguments.length;
var i__7869__auto___13540 = (0);
while(true){
if((i__7869__auto___13540 < len__7868__auto___13539)){
args13536.push((arguments[i__7869__auto___13540]));

var G__13541 = (i__7869__auto___13540 + (1));
i__7869__auto___13540 = G__13541;
continue;
} else {
}
break;
}

var G__13538 = args13536.length;
switch (G__13538) {
case 0:
return lt.objs.files.lt_home.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return lt.objs.files.lt_home.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13536.length)].join('')));

}
});

lt.objs.files.lt_home.cljs$core$IFn$_invoke$arity$0 = (function (){
return lt.util.load.dir;
});

lt.objs.files.lt_home.cljs$core$IFn$_invoke$arity$1 = (function (path){
return lt.objs.files.join.call(null,lt.objs.files.lt_home.call(null),path);
});

lt.objs.files.lt_home.cljs$lang$maxFixedArity = 1;

/**
 * Return LT's user directory. Used for storing user-related content (e.g.,
 *   settings, plugins, logs, and caches).
 */
lt.objs.files.lt_user_dir = (function lt$objs$files$lt_user_dir(var_args){
var args13543 = [];
var len__7868__auto___13546 = arguments.length;
var i__7869__auto___13547 = (0);
while(true){
if((i__7869__auto___13547 < len__7868__auto___13546)){
args13543.push((arguments[i__7869__auto___13547]));

var G__13548 = (i__7869__auto___13547 + (1));
i__7869__auto___13547 = G__13548;
continue;
} else {
}
break;
}

var G__13545 = args13543.length;
switch (G__13545) {
case 0:
return lt.objs.files.lt_user_dir.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return lt.objs.files.lt_user_dir.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13543.length)].join('')));

}
});

lt.objs.files.lt_user_dir.cljs$core$IFn$_invoke$arity$0 = (function (){
return lt.objs.files.lt_user_dir.call(null,"");
});

lt.objs.files.lt_user_dir.cljs$core$IFn$_invoke$arity$1 = (function (path){
if(cljs.core.truth_(process.env.LT_USER_DIR)){
return lt.objs.files.join.call(null,process.env.LT_USER_DIR,path);
} else {
return lt.objs.files.join.call(null,lt.objs.files.data_path,path);
}
});

lt.objs.files.lt_user_dir.cljs$lang$maxFixedArity = 1;

/**
 * Starting at `start` path, walk up parent directories and return first path
 *   whose basename matches find.
 */
lt.objs.files.walk_up_find = (function lt$objs$files$walk_up_find(start,find){
var roots = lt.objs.files.get_roots.call(null);
var cur = start;
var prev = "";
while(true){
if(cljs.core.truth_((function (){var or__6793__auto__ = cljs.core.empty_QMARK_.call(null,cur);
if(or__6793__auto__){
return or__6793__auto__;
} else {
var or__6793__auto____$1 = roots.call(null,cur);
if(cljs.core.truth_(or__6793__auto____$1)){
return or__6793__auto____$1;
} else {
return cljs.core._EQ_.call(null,cur,prev);
}
}
})())){
return null;
} else {
if(cljs.core.truth_(lt.objs.files.exists_QMARK_.call(null,lt.objs.files.join.call(null,cur,find)))){
return lt.objs.files.join.call(null,cur,find);
} else {
var G__13550 = lt.objs.files.parent.call(null,cur);
var G__13551 = cur;
cur = G__13550;
prev = G__13551;
continue;
}
}
break;
}
});
/**
 * Returns a relative path, if there is one, from `a` to `b`.
 */
lt.objs.files.relative = (function lt$objs$files$relative(a,b){
return lt.objs.files.fpath.relative(a,b);
});
lt.objs.files.__GT_name_BAR_path = (function lt$objs$files$__GT_name_BAR_path(var_args){
var args__7875__auto__ = [];
var len__7868__auto___13558 = arguments.length;
var i__7869__auto___13559 = (0);
while(true){
if((i__7869__auto___13559 < len__7868__auto___13558)){
args__7875__auto__.push((arguments[i__7869__auto___13559]));

var G__13560 = (i__7869__auto___13559 + (1));
i__7869__auto___13559 = G__13560;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((1) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((1)),(0),null)):null);
return lt.objs.files.__GT_name_BAR_path.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7876__auto__);
});

lt.objs.files.__GT_name_BAR_path.cljs$core$IFn$_invoke$arity$variadic = (function (f,p__13554){
var vec__13555 = p__13554;
var rel = cljs.core.nth.call(null,vec__13555,(0),null);
var path = (cljs.core.truth_(rel)?lt.objs.files.relative.call(null,rel,f):f);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.objs.files.fpath.basename(f),path], null);
});

lt.objs.files.__GT_name_BAR_path.cljs$lang$maxFixedArity = (1);

lt.objs.files.__GT_name_BAR_path.cljs$lang$applyTo = (function (seq13552){
var G__13553 = cljs.core.first.call(null,seq13552);
var seq13552__$1 = cljs.core.next.call(null,seq13552);
return lt.objs.files.__GT_name_BAR_path.cljs$core$IFn$_invoke$arity$variadic(G__13553,seq13552__$1);
});

lt.objs.files.path_segs = (function lt$objs$files$path_segs(path){
var segs = path.split(lt.objs.files.separator);
var segs__$1 = (cljs.core.truth_((function (){var or__6793__auto__ = lt.objs.files.fpath.extname(cljs.core.last.call(null,segs));
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return cljs.core.empty_QMARK_.call(null,cljs.core.last.call(null,segs));
}
})())?cljs.core.butlast.call(null,segs):segs);
return cljs.core.vec.call(null,cljs.core.map.call(null,((function (segs,segs__$1){
return (function (p1__13561_SHARP_){
return [cljs.core.str(p1__13561_SHARP_),cljs.core.str(lt.objs.files.separator)].join('');
});})(segs,segs__$1))
,segs__$1));
});
/**
 * Returns files and directories under `path` where `func` returns true.
 * 
 *   Example:
 *   ```
 *   (filter-walk
 *  (fn [x] (= (basename x) "LightTable"))
 *  "/home/sbauer/dev/LightTable/")
 *   ;;=> ("/home/sbauer/dev/LightTable/builds/lighttable-0.8.1-linux/LightTable"
 *     "/home/sbauer/dev/LightTable/.git/refs/remotes/LightTable"
 *     "/home/sbauer/dev/LightTable/.git/logs/refs/remotes/LightTable")
 *   ```
 */
lt.objs.files.filter_walk = (function lt$objs$files$filter_walk(func,path){
var to_walk = lt.objs.files.dirs.call(null,path);
var found = cljs.core.filterv.call(null,func,lt.objs.files.full_path_ls.call(null,path));
while(true){
if(cljs.core.not.call(null,cljs.core.seq.call(null,to_walk))){
return found;
} else {
var cur = cljs.core.first.call(null,to_walk);
var neue = cljs.core.filterv.call(null,func,lt.objs.files.full_path_ls.call(null,cur));
var G__13562 = cljs.core.concat.call(null,cljs.core.rest.call(null,to_walk),lt.objs.files.dirs.call(null,cur));
var G__13563 = cljs.core.concat.call(null,found,neue);
to_walk = G__13562;
found = G__13563;
continue;
}
break;
}
});
