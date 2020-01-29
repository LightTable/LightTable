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
var seq__16162 = cljs.core.seq.call(null,files);
var chunk__16163 = null;
var count__16164 = (0);
var i__16165 = (0);
while(true){
if((i__16165 < count__16164)){
var file = cljs.core._nth.call(null,chunk__16163,i__16165);
lt.object.raise.call(null,obj,event,file);

var G__16166 = seq__16162;
var G__16167 = chunk__16163;
var G__16168 = count__16164;
var G__16169 = (i__16165 + (1));
seq__16162 = G__16166;
chunk__16163 = G__16167;
count__16164 = G__16168;
i__16165 = G__16169;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__16162);
if(temp__4657__auto__){
var seq__16162__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__16162__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__16162__$1);
var G__16170 = cljs.core.chunk_rest.call(null,seq__16162__$1);
var G__16171 = c__7604__auto__;
var G__16172 = cljs.core.count.call(null,c__7604__auto__);
var G__16173 = (0);
seq__16162 = G__16170;
chunk__16163 = G__16171;
count__16164 = G__16172;
i__16165 = G__16173;
continue;
} else {
var file = cljs.core.first.call(null,seq__16162__$1);
lt.object.raise.call(null,obj,event,file);

var G__16174 = cljs.core.next.call(null,seq__16162__$1);
var G__16175 = null;
var G__16176 = (0);
var G__16177 = (0);
seq__16162 = G__16174;
chunk__16163 = G__16175;
count__16164 = G__16176;
i__16165 = G__16177;
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
var seq__16182 = cljs.core.seq.call(null,files);
var chunk__16183 = null;
var count__16184 = (0);
var i__16185 = (0);
while(true){
if((i__16185 < count__16184)){
var file__$1 = cljs.core._nth.call(null,chunk__16183,i__16185);
lt.object.raise.call(null,obj,event,file__$1);

var G__16186 = seq__16182;
var G__16187 = chunk__16183;
var G__16188 = count__16184;
var G__16189 = (i__16185 + (1));
seq__16182 = G__16186;
chunk__16183 = G__16187;
count__16184 = G__16188;
i__16185 = G__16189;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__16182);
if(temp__4657__auto__){
var seq__16182__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__16182__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__16182__$1);
var G__16190 = cljs.core.chunk_rest.call(null,seq__16182__$1);
var G__16191 = c__7604__auto__;
var G__16192 = cljs.core.count.call(null,c__7604__auto__);
var G__16193 = (0);
seq__16182 = G__16190;
chunk__16183 = G__16191;
count__16184 = G__16192;
i__16185 = G__16193;
continue;
} else {
var file__$1 = cljs.core.first.call(null,seq__16182__$1);
lt.object.raise.call(null,obj,event,file__$1);

var G__16194 = cljs.core.next.call(null,seq__16182__$1);
var G__16195 = null;
var G__16196 = (0);
var G__16197 = (0);
seq__16182 = G__16194;
chunk__16183 = G__16195;
count__16184 = G__16196;
i__16185 = G__16197;
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
