// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.objs.deploy');
goog.require('cljs.core');
goog.require('lt.objs.sidebar.command');
goog.require('lt.objs.notifos');
goog.require('lt.objs.platform');
goog.require('lt.objs.console');
goog.require('fetch.core');
goog.require('lt.object');
goog.require('lt.util.cljs');
goog.require('lt.objs.app');
goog.require('lt.util.load');
goog.require('lt.objs.popup');
goog.require('lt.objs.files');
goog.require('lt.objs.clients');
goog.require('clojure.string');
goog.require('lt.util.js');
goog.require('lt.objs.cache');
lt.objs.deploy.shell = lt.util.load.node_module.call(null,"shelljs");
lt.objs.deploy.fs = require("fs");
lt.objs.deploy.zlib = require("zlib");
lt.objs.deploy.request = lt.util.load.node_module.call(null,"request");
lt.objs.deploy.tar = lt.util.load.node_module.call(null,"tar");
lt.objs.deploy.home_path = lt.objs.files.lt_home.call(null,"");
lt.objs.deploy.request_strict_ssl = true;
lt.objs.deploy.tar_path = (function lt$objs$deploy$tar_path(v){
if(cljs.core.truth_(lt.objs.cache.fetch.call(null,new cljs.core.Keyword(null,"edge","edge",919909153)))){
return [cljs.core.str("https://api.github.com/repos/LightTable/LightTable/tarball/master")].join('');
} else {
return [cljs.core.str("https://api.github.com/repos/LightTable/LightTable/tarball/"),cljs.core.str(v)].join('');
}
});
lt.objs.deploy.version_regex = /^\d+\.\d+\.\d+(-.*)?$/;
lt.objs.deploy.get_versions = (function lt$objs$deploy$get_versions(){
var vstr = new cljs.core.Keyword(null,"content","content",15833224).cljs$core$IFn$_invoke$arity$1(lt.objs.files.open_sync.call(null,lt.objs.files.lt_home.call(null,"core/version.json")));
return cljs.core.js__GT_clj.call(null,JSON.parse(vstr),new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true);
});
lt.objs.deploy.proxy_QMARK_ = (function lt$objs$deploy$proxy_QMARK_(){
var p = lt.objs.deploy.get_proxy.call(null,lt.objs.deploy.tar_path.call(null,"0.5.0"));
if(cljs.core.truth_(lt.util.cljs.str_contains_QMARK_.call(null,p,"PROXY"))){
return cljs.core.second.call(null,clojure.string.split.call(null,p," "));
} else {
return null;
}
});
lt.objs.deploy.version_timeout = (((60) * (60)) * (1000));
lt.objs.deploy.version = lt.objs.deploy.get_versions.call(null);
lt.objs.deploy.str__GT_version = (function lt$objs$deploy$str__GT_version(s){
var vec__16764 = clojure.string.split.call(null,s,".");
var major = cljs.core.nth.call(null,vec__16764,(0),null);
var minor = cljs.core.nth.call(null,vec__16764,(1),null);
var patch = cljs.core.nth.call(null,vec__16764,(2),null);
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"major","major",-27376078),parseInt(major),new cljs.core.Keyword(null,"minor","minor",-608536071),parseInt(minor),new cljs.core.Keyword(null,"patch","patch",380775109),parseInt(patch)], null);
});
lt.objs.deploy.compare_versions = (function lt$objs$deploy$compare_versions(v1,v2){
if(cljs.core._EQ_.call(null,v1,v2)){
return false;
} else {
return !(((new cljs.core.Keyword(null,"major","major",-27376078).cljs$core$IFn$_invoke$arity$1(v2) < new cljs.core.Keyword(null,"major","major",-27376078).cljs$core$IFn$_invoke$arity$1(v1))) || ((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"major","major",-27376078).cljs$core$IFn$_invoke$arity$1(v2),new cljs.core.Keyword(null,"major","major",-27376078).cljs$core$IFn$_invoke$arity$1(v1))) && ((new cljs.core.Keyword(null,"minor","minor",-608536071).cljs$core$IFn$_invoke$arity$1(v2) < new cljs.core.Keyword(null,"minor","minor",-608536071).cljs$core$IFn$_invoke$arity$1(v1)))) || ((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"major","major",-27376078).cljs$core$IFn$_invoke$arity$1(v2),new cljs.core.Keyword(null,"major","major",-27376078).cljs$core$IFn$_invoke$arity$1(v1))) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"minor","minor",-608536071).cljs$core$IFn$_invoke$arity$1(v2),new cljs.core.Keyword(null,"minor","minor",-608536071).cljs$core$IFn$_invoke$arity$1(v1))) && ((new cljs.core.Keyword(null,"patch","patch",380775109).cljs$core$IFn$_invoke$arity$1(v2) < new cljs.core.Keyword(null,"patch","patch",380775109).cljs$core$IFn$_invoke$arity$1(v1)))));
}
});
/**
 * Returns true if second version is newer/greater than first version.
 */
lt.objs.deploy.is_newer_QMARK_ = (function lt$objs$deploy$is_newer_QMARK_(v1,v2){
return lt.objs.deploy.compare_versions.call(null,lt.objs.deploy.str__GT_version.call(null,v1),lt.objs.deploy.str__GT_version.call(null,v2));
});
lt.objs.deploy.download_file = (function lt$objs$deploy$download_file(from,to,cb){
var options = (function (){var obj16772 = {"url":from,"headers":(function (){var obj16774 = {"User-Agent":"Light Table"};
return obj16774;
})(),"strictSSL":lt.objs.deploy.request_strict_ssl};
return obj16772;
})();
var out = lt.objs.deploy.fs.createWriteStream(to);
var temp__4657__auto___16775 = (function (){var or__6793__auto__ = process.env.http_proxy;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return process.env.https_proxy;
}
})();
if(cljs.core.truth_(temp__4657__auto___16775)){
var proxy_16776 = temp__4657__auto___16775;
options.proxy = proxy_16776;
} else {
}

return lt.objs.deploy.request.get(options,cb).on("response",((function (options,out){
return (function (resp){
if(cljs.core._EQ_.call(null,resp.statusCode,(200))){
return null;
} else {
lt.objs.notifos.done_working.call(null);

throw (new Error([cljs.core.str("Error downloading: "),cljs.core.str(from),cljs.core.str(" status code: "),cljs.core.str(resp.statusCode)].join('')));
}
});})(options,out))
).pipe(out);
});
lt.objs.deploy.download_zip = (function lt$objs$deploy$download_zip(ver,cb){
var n = lt.objs.notifos.working.call(null,[cljs.core.str("Downloading version "),cljs.core.str(ver),cljs.core.str(" ..")].join(''));
return lt.objs.deploy.download_file.call(null,lt.objs.deploy.tar_path.call(null,ver),[cljs.core.str(lt.objs.deploy.home_path),cljs.core.str("/tmp.tar.gz")].join(''),((function (n){
return (function (e,r,body){
lt.objs.notifos.done_working.call(null);

return cb.call(null,e,r,body);
});})(n))
);
});
lt.objs.deploy.untar = (function lt$objs$deploy$untar(from,to,cb){
var t = lt.objs.deploy.fs.createReadStream(from);
return t.pipe(lt.objs.deploy.zlib.createGunzip()).pipe(lt.objs.deploy.tar.Extract((function (){var obj16780 = {"path":to};
return obj16780;
})())).on("end",cb);
});
lt.objs.deploy.move_tmp = (function lt$objs$deploy$move_tmp(){
var parent_dir_16789 = cljs.core.first.call(null,lt.objs.files.full_path_ls.call(null,[cljs.core.str(lt.objs.deploy.home_path),cljs.core.str("/tmp/")].join('')));
var seq__16785_16790 = cljs.core.seq.call(null,lt.objs.files.full_path_ls.call(null,[cljs.core.str(parent_dir_16789),cljs.core.str("/deploy/")].join('')));
var chunk__16786_16791 = null;
var count__16787_16792 = (0);
var i__16788_16793 = (0);
while(true){
if((i__16788_16793 < count__16787_16792)){
var file_16794 = cljs.core._nth.call(null,chunk__16786_16791,i__16788_16793);
lt.objs.deploy.shell.cp("-rf",file_16794,lt.objs.deploy.home_path);

var G__16795 = seq__16785_16790;
var G__16796 = chunk__16786_16791;
var G__16797 = count__16787_16792;
var G__16798 = (i__16788_16793 + (1));
seq__16785_16790 = G__16795;
chunk__16786_16791 = G__16796;
count__16787_16792 = G__16797;
i__16788_16793 = G__16798;
continue;
} else {
var temp__4657__auto___16799 = cljs.core.seq.call(null,seq__16785_16790);
if(temp__4657__auto___16799){
var seq__16785_16800__$1 = temp__4657__auto___16799;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__16785_16800__$1)){
var c__7604__auto___16801 = cljs.core.chunk_first.call(null,seq__16785_16800__$1);
var G__16802 = cljs.core.chunk_rest.call(null,seq__16785_16800__$1);
var G__16803 = c__7604__auto___16801;
var G__16804 = cljs.core.count.call(null,c__7604__auto___16801);
var G__16805 = (0);
seq__16785_16790 = G__16802;
chunk__16786_16791 = G__16803;
count__16787_16792 = G__16804;
i__16788_16793 = G__16805;
continue;
} else {
var file_16806 = cljs.core.first.call(null,seq__16785_16800__$1);
lt.objs.deploy.shell.cp("-rf",file_16806,lt.objs.deploy.home_path);

var G__16807 = cljs.core.next.call(null,seq__16785_16800__$1);
var G__16808 = null;
var G__16809 = (0);
var G__16810 = (0);
seq__16785_16790 = G__16807;
chunk__16786_16791 = G__16808;
count__16787_16792 = G__16809;
i__16788_16793 = G__16810;
continue;
}
} else {
}
}
break;
}

return lt.objs.deploy.shell.rm("-rf",[cljs.core.str(lt.objs.deploy.home_path),cljs.core.str("/tmp*")].join(''));
});
lt.objs.deploy.fetch_and_deploy = (function lt$objs$deploy$fetch_and_deploy(ver){
return lt.objs.deploy.download_zip.call(null,ver,(function (){
lt.objs.notifos.working.call(null,"Extracting update...");

return lt.objs.deploy.untar.call(null,[cljs.core.str(lt.objs.deploy.home_path),cljs.core.str("/tmp.tar.gz")].join(''),[cljs.core.str(lt.objs.deploy.home_path),cljs.core.str("/tmp")].join(''),(function (){
lt.objs.deploy.move_tmp.call(null);

lt.objs.notifos.done_working.call(null);

lt.objs.deploy.version = cljs.core.assoc.call(null,lt.objs.deploy.version,new cljs.core.Keyword(null,"version","version",425292698),ver);

return lt.objs.popup.popup_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"header","header",119441134),"Light Table has been updated!",new cljs.core.Keyword(null,"body","body",-2049205669),[cljs.core.str("Light Table has been updated to "),cljs.core.str(ver),cljs.core.str("! Just\n                                                         restart to get the latest and greatest.")].join(''),new cljs.core.Keyword(null,"buttons","buttons",-1953831197),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1718410804),"ok"], null)], null)], null));
}));
}));
});
lt.objs.deploy.tags_url = "https://api.github.com/repos/LightTable/LightTable/tags";
lt.objs.deploy.should_update_popup = (function lt$objs$deploy$should_update_popup(data){
return lt.objs.popup.popup_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"header","header",119441134),"There's a newer version of Light Table!",new cljs.core.Keyword(null,"body","body",-2049205669),[cljs.core.str("Would you like us to download and install version "),cljs.core.str(data),cljs.core.str("?")].join(''),new cljs.core.Keyword(null,"buttons","buttons",-1953831197),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1718410804),"Cancel"], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"Download and install",new cljs.core.Keyword(null,"action","action",-811238024),(function (){
return lt.objs.deploy.fetch_and_deploy.call(null,data);
})], null)], null)], null));
});
/**
 * Returns latest LT version for github api tags endpoint.
 */
lt.objs.deploy.__GT_latest_version = (function lt$objs$deploy$__GT_latest_version(body){
var temp__4657__auto__ = (function (){try{return JSON.parse(body);
}catch (e16813){var e = e16813;
return lt.objs.console.error.call(null,[cljs.core.str("Invalid JSON response from "),cljs.core.str(lt.objs.deploy.tags_url),cljs.core.str(": "),cljs.core.str(cljs.core.pr_str.call(null,body))].join(''));
}})();
if(cljs.core.truth_(temp__4657__auto__)){
var parsed_body = temp__4657__auto__;
return cljs.core.last.call(null,cljs.core.sort.call(null,cljs.core.keep.call(null,((function (parsed_body,temp__4657__auto__){
return (function (p1__16811_SHARP_){
if(cljs.core.truth_(cljs.core.re_find.call(null,lt.objs.deploy.version_regex,p1__16811_SHARP_.name))){
return p1__16811_SHARP_.name;
} else {
return null;
}
});})(parsed_body,temp__4657__auto__))
,parsed_body)));
} else {
return null;
}
});
lt.objs.deploy.check_version = (function lt$objs$deploy$check_version(var_args){
var args__7875__auto__ = [];
var len__7868__auto___16819 = arguments.length;
var i__7869__auto___16820 = (0);
while(true){
if((i__7869__auto___16820 < len__7868__auto___16819)){
args__7875__auto__.push((arguments[i__7869__auto___16820]));

var G__16821 = (i__7869__auto___16820 + (1));
i__7869__auto___16820 = G__16821;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((0) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((0)),(0),null)):null);
return lt.objs.deploy.check_version.cljs$core$IFn$_invoke$arity$variadic(argseq__7876__auto__);
});

lt.objs.deploy.check_version.cljs$core$IFn$_invoke$arity$variadic = (function (p__16815){
var vec__16816 = p__16815;
var notify_QMARK_ = cljs.core.nth.call(null,vec__16816,(0),null);
return fetch.core.xhr.call(null,lt.objs.deploy.tags_url,cljs.core.PersistentArrayMap.EMPTY,((function (vec__16816,notify_QMARK_){
return (function (data){
var latest_version = lt.objs.deploy.__GT_latest_version.call(null,data);
if(cljs.core.truth_(cljs.core.re_find.call(null,lt.objs.deploy.version_regex,latest_version))){
if(cljs.core.truth_((function (){var and__6781__auto__ = cljs.core.not_EQ_.call(null,latest_version,"");
if(and__6781__auto__){
var and__6781__auto____$1 = cljs.core.not_EQ_.call(null,latest_version,new cljs.core.Keyword(null,"version","version",425292698).cljs$core$IFn$_invoke$arity$1(lt.objs.deploy.version));
if(and__6781__auto____$1){
var and__6781__auto____$2 = lt.objs.deploy.is_newer_QMARK_.call(null,new cljs.core.Keyword(null,"version","version",425292698).cljs$core$IFn$_invoke$arity$1(lt.objs.deploy.version),latest_version);
if(cljs.core.truth_(and__6781__auto____$2)){
var or__6793__auto__ = notify_QMARK_;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return cljs.core.not_EQ_.call(null,localStorage.fetchedVersion,latest_version);
}
} else {
return and__6781__auto____$2;
}
} else {
return and__6781__auto____$1;
}
} else {
return and__6781__auto__;
}
})())){
localStorage.fetchedVersion = latest_version;

return lt.objs.deploy.should_update_popup.call(null,latest_version);
} else {
if(cljs.core.truth_(notify_QMARK_)){
return lt.objs.notifos.set_msg_BANG_.call(null,[cljs.core.str("At latest version: "),cljs.core.str(new cljs.core.Keyword(null,"version","version",425292698).cljs$core$IFn$_invoke$arity$1(lt.objs.deploy.version))].join(''));
} else {
return null;
}
}
} else {
return null;
}
});})(vec__16816,notify_QMARK_))
);
});

lt.objs.deploy.check_version.cljs$lang$maxFixedArity = (0);

lt.objs.deploy.check_version.cljs$lang$applyTo = (function (seq16814){
return lt.objs.deploy.check_version.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq16814));
});

/**
 * Binary/electron version. The two versions are in sync since binaries updates
 *   only occur with electron updates.
 */
lt.objs.deploy.binary_version = (function lt$objs$deploy$binary_version(){
return (process.versions["electron"]);
});
/**
 * 
 */
lt.objs.deploy.button = (function lt$objs$deploy$button(var_args){
var args__7875__auto__ = [];
var len__7868__auto___16838 = arguments.length;
var i__7869__auto___16839 = (0);
while(true){
if((i__7869__auto___16839 < len__7868__auto___16838)){
args__7875__auto__.push((arguments[i__7869__auto___16839]));

var G__16840 = (i__7869__auto___16839 + (1));
i__7869__auto___16839 = G__16840;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((1) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((1)),(0),null)):null);
return lt.objs.deploy.button.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7876__auto__);
});

lt.objs.deploy.button.cljs$core$IFn$_invoke$arity$variadic = (function (label,p__16824){
var vec__16825 = p__16824;
var cb = cljs.core.nth.call(null,vec__16825,(0),null);
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.button.right","div.button.right",1623860542),label], null));
var seq__16828_16841 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__,vec__16825,cb){
return (function (){
if(cljs.core.truth_(cb)){
return cb.call(null);
} else {
return null;
}
});})(e__7942__auto__,vec__16825,cb))
], null)));
var chunk__16829_16842 = null;
var count__16830_16843 = (0);
var i__16831_16844 = (0);
while(true){
if((i__16831_16844 < count__16830_16843)){
var vec__16832_16845 = cljs.core._nth.call(null,chunk__16829_16842,i__16831_16844);
var ev__7943__auto___16846 = cljs.core.nth.call(null,vec__16832_16845,(0),null);
var func__7944__auto___16847 = cljs.core.nth.call(null,vec__16832_16845,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___16846,func__7944__auto___16847);

var G__16848 = seq__16828_16841;
var G__16849 = chunk__16829_16842;
var G__16850 = count__16830_16843;
var G__16851 = (i__16831_16844 + (1));
seq__16828_16841 = G__16848;
chunk__16829_16842 = G__16849;
count__16830_16843 = G__16850;
i__16831_16844 = G__16851;
continue;
} else {
var temp__4657__auto___16852 = cljs.core.seq.call(null,seq__16828_16841);
if(temp__4657__auto___16852){
var seq__16828_16853__$1 = temp__4657__auto___16852;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__16828_16853__$1)){
var c__7604__auto___16854 = cljs.core.chunk_first.call(null,seq__16828_16853__$1);
var G__16855 = cljs.core.chunk_rest.call(null,seq__16828_16853__$1);
var G__16856 = c__7604__auto___16854;
var G__16857 = cljs.core.count.call(null,c__7604__auto___16854);
var G__16858 = (0);
seq__16828_16841 = G__16855;
chunk__16829_16842 = G__16856;
count__16830_16843 = G__16857;
i__16831_16844 = G__16858;
continue;
} else {
var vec__16835_16859 = cljs.core.first.call(null,seq__16828_16853__$1);
var ev__7943__auto___16860 = cljs.core.nth.call(null,vec__16835_16859,(0),null);
var func__7944__auto___16861 = cljs.core.nth.call(null,vec__16835_16859,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___16860,func__7944__auto___16861);

var G__16862 = cljs.core.next.call(null,seq__16828_16853__$1);
var G__16863 = null;
var G__16864 = (0);
var G__16865 = (0);
seq__16828_16841 = G__16862;
chunk__16829_16842 = G__16863;
count__16830_16843 = G__16864;
i__16831_16844 = G__16865;
continue;
}
} else {
}
}
break;
}

return e__7942__auto__;
});

lt.objs.deploy.button.cljs$lang$maxFixedArity = (1);

lt.objs.deploy.button.cljs$lang$applyTo = (function (seq16822){
var G__16823 = cljs.core.first.call(null,seq16822);
var seq16822__$1 = cljs.core.next.call(null,seq16822);
return lt.objs.deploy.button.cljs$core$IFn$_invoke$arity$variadic(G__16823,seq16822__$1);
});

lt.objs.deploy.alert_binary_update = (function lt$objs$deploy$alert_binary_update(){
return lt.objs.popup.popup_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"header","header",119441134),"There's been a binary update!",new cljs.core.Keyword(null,"body","body",-2049205669),"There's a new version of the Light Table binary. Clicking below will open the\n                                 Light Table website so you can download the updated version.",new cljs.core.Keyword(null,"buttons","buttons",-1953831197),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"Download latest",new cljs.core.Keyword(null,"action","action",-811238024),(function (){
lt.objs.platform.open_url.call(null,"http://www.lighttable.com");

return lt.objs.popup.remain_open.call(null);
})], null)], null)], null));
});
/**
 * 
 */
lt.objs.deploy.__BEH__check_deploy = (function lt$objs$deploy$__BEH__check_deploy(this$){
if(cljs.core.truth_(lt.objs.deploy.is_newer_QMARK_.call(null,lt.objs.deploy.binary_version.call(null),new cljs.core.Keyword(null,"electron","electron",1312019442).cljs$core$IFn$_invoke$arity$1(lt.objs.deploy.version)))){
return lt.objs.deploy.alert_binary_update.call(null);
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.deploy","check-deploy","lt.objs.deploy/check-deploy",1282551742),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"deploy","deploy",-2006774212),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.deploy.__BEH__check_deploy);
/**
 * 
 */
lt.objs.deploy.__BEH__check_version = (function lt$objs$deploy$__BEH__check_version(this$){
if(cljs.core.truth_(lt.objs.app.first_window_QMARK_.call(null))){
localStorage.fetchedVersion = null;
} else {
}

lt.objs.deploy.check_version.call(null);

return lt.util.js.every.call(null,lt.objs.deploy.version_timeout,lt.objs.deploy.check_version);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.deploy","check-version","lt.objs.deploy/check-version",505502919),new cljs.core.Keyword(null,"desc","desc",2093485764),"App: Automatically check for updates",new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"init","init",-1875481434),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.deploy.__BEH__check_version);
/**
 * 
 */
lt.objs.deploy.__BEH__strict_ssl = (function lt$objs$deploy$__BEH__strict_ssl(this$){
return lt.objs.deploy.request_strict_ssl = true;
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.deploy","strict-ssl","lt.objs.deploy/strict-ssl",499803838),new cljs.core.Keyword(null,"exclusive","exclusive",-1507998718),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("lt.objs.deploy","disable-strict-ssl","lt.objs.deploy/disable-strict-ssl",2143973871)], null),new cljs.core.Keyword(null,"desc","desc",2093485764),"Enables strict SSL certificate checking when downloading LT and LT plugin repos (default setting)",new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"object.instant","object.instant",-29936727),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.deploy.__BEH__strict_ssl);
/**
 * 
 */
lt.objs.deploy.__BEH__disable_strict_ssl = (function lt$objs$deploy$__BEH__disable_strict_ssl(this$){
return lt.objs.deploy.request_strict_ssl = false;
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.deploy","disable-strict-ssl","lt.objs.deploy/disable-strict-ssl",2143973871),new cljs.core.Keyword(null,"exclusive","exclusive",-1507998718),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("lt.objs.deploy","strict-ssl","lt.objs.deploy/strict-ssl",499803838)], null),new cljs.core.Keyword(null,"desc","desc",2093485764),"Disables strict SSL certificate checking when downloading LT and LT plugin repos",new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"object.instant","object.instant",-29936727),null], null), null),new cljs.core.Keyword(null,"details","details",1956795411),"In some enterprise environments with SSL proxies strict certificate checking will fail due to MITM certificates used for monitoring SSL traffic. This option allows these network requests to succeed in such environments.",new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.deploy.__BEH__disable_strict_ssl);
lt.object.tag_behaviors.call(null,new cljs.core.Keyword(null,"app","app",-560961707),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("lt.objs.deploy","check-deploy","lt.objs.deploy/check-deploy",1282551742)], null));