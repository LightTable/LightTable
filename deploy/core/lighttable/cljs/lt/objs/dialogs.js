// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.objs.dialogs');
goog.require('cljs.core');
goog.require('lt.object');
goog.require('lt.util.dom');
goog.require('lt.objs.app');
lt.objs.dialogs.remote = require("electron").remote;
lt.objs.dialogs.dialog = lt.objs.dialogs.remote.dialog;
lt.objs.dialogs.dir = (function lt$objs$dialogs$dir(obj,event){
var files = lt.objs.dialogs.dialog.showOpenDialog(lt.objs.app.win,({"properties": ["openDirectory","multiSelections"]}));
var seq__16164 = cljs.core.seq.call(null,files);
var chunk__16165 = null;
var count__16166 = (0);
var i__16167 = (0);
while(true){
if((i__16167 < count__16166)){
var file = cljs.core._nth.call(null,chunk__16165,i__16167);
lt.object.raise.call(null,obj,event,file);

var G__16168 = seq__16164;
var G__16169 = chunk__16165;
var G__16170 = count__16166;
var G__16171 = (i__16167 + (1));
seq__16164 = G__16168;
chunk__16165 = G__16169;
count__16166 = G__16170;
i__16167 = G__16171;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__16164);
if(temp__4657__auto__){
var seq__16164__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__16164__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__16164__$1);
var G__16172 = cljs.core.chunk_rest.call(null,seq__16164__$1);
var G__16173 = c__7604__auto__;
var G__16174 = cljs.core.count.call(null,c__7604__auto__);
var G__16175 = (0);
seq__16164 = G__16172;
chunk__16165 = G__16173;
count__16166 = G__16174;
i__16167 = G__16175;
continue;
} else {
var file = cljs.core.first.call(null,seq__16164__$1);
lt.object.raise.call(null,obj,event,file);

var G__16176 = cljs.core.next.call(null,seq__16164__$1);
var G__16177 = null;
var G__16178 = (0);
var G__16179 = (0);
seq__16164 = G__16176;
chunk__16165 = G__16177;
count__16166 = G__16178;
i__16167 = G__16179;
continue;
}
} else {
return null;
}
}
break;
}
});
lt.objs.dialogs.file = (function lt$objs$dialogs$file(obj,event){
var files = lt.objs.dialogs.dialog.showOpenDialog(lt.objs.app.win,({"properties": ["openFile","multiSelections"]}));
var seq__16184 = cljs.core.seq.call(null,files);
var chunk__16185 = null;
var count__16186 = (0);
var i__16187 = (0);
while(true){
if((i__16187 < count__16186)){
var file__$1 = cljs.core._nth.call(null,chunk__16185,i__16187);
lt.object.raise.call(null,obj,event,file__$1);

var G__16188 = seq__16184;
var G__16189 = chunk__16185;
var G__16190 = count__16186;
var G__16191 = (i__16187 + (1));
seq__16184 = G__16188;
chunk__16185 = G__16189;
count__16186 = G__16190;
i__16187 = G__16191;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__16184);
if(temp__4657__auto__){
var seq__16184__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__16184__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__16184__$1);
var G__16192 = cljs.core.chunk_rest.call(null,seq__16184__$1);
var G__16193 = c__7604__auto__;
var G__16194 = cljs.core.count.call(null,c__7604__auto__);
var G__16195 = (0);
seq__16184 = G__16192;
chunk__16185 = G__16193;
count__16186 = G__16194;
i__16187 = G__16195;
continue;
} else {
var file__$1 = cljs.core.first.call(null,seq__16184__$1);
lt.object.raise.call(null,obj,event,file__$1);

var G__16196 = cljs.core.next.call(null,seq__16184__$1);
var G__16197 = null;
var G__16198 = (0);
var G__16199 = (0);
seq__16184 = G__16196;
chunk__16185 = G__16197;
count__16186 = G__16198;
i__16187 = G__16199;
continue;
}
} else {
return null;
}
}
break;
}
});
lt.objs.dialogs.save_as = (function lt$objs$dialogs$save_as(obj,event,path){
var temp__4657__auto__ = lt.objs.dialogs.dialog.showSaveDialog(lt.objs.app.win,({"defaultPath": path}));
if(cljs.core.truth_(temp__4657__auto__)){
var file = temp__4657__auto__;
return lt.object.raise.call(null,obj,event,file);
} else {
return null;
}
});
