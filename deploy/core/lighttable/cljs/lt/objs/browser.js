// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.objs.browser');
goog.require('cljs.core');
goog.require('lt.objs.command');
goog.require('lt.objs.notifos');
goog.require('lt.objs.platform');
goog.require('lt.objs.console');
goog.require('lt.objs.context');
goog.require('lt.objs.editor');
goog.require('crate.core');
goog.require('lt.object');
goog.require('lt.util.dom');
goog.require('lt.objs.sidebar.clients');
goog.require('lt.objs.menu');
goog.require('lt.objs.eval');
goog.require('lt.objs.keyboard');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.tabs');
goog.require('lt.objs.files');
goog.require('lt.objs.clients.devtools');
goog.require('lt.objs.clients');
goog.require('clojure.string');
goog.require('crate.binding');
lt.objs.browser.utils = {};
lttools = lt.objs.browser.utils;
lt.objs.browser.check_http = (function lt$objs$browser$check_http(url){
if((cljs.core._EQ_.call(null,url.indexOf("http"),(-1))) && (cljs.core._EQ_.call(null,url.indexOf("file://"),(-1)))){
return [cljs.core.str("http://"),cljs.core.str(url)].join('');
} else {
return url;
}
});
lt.objs.browser.add_util = (function lt$objs$browser$add_util(nme,fn){
return (lt.objs.browser.utils[cljs.core.name.call(null,nme)] = fn);
});
lt.objs.browser.browser_id = (function lt$objs$browser$browser_id(this$){
return [cljs.core.str("browser"),cljs.core.str(lt.object.__GT_id.call(null,this$))].join('');
});
lt.objs.browser.to_frame = (function lt$objs$browser$to_frame(this$){
return lt.util.dom.$.call(null,new cljs.core.Keyword(null,"webview","webview",-1131133239),lt.object.__GT_content.call(null,this$));
});
lt.objs.browser.client__GT_devtools = (function lt$objs$browser$client__GT_devtools(ed){
return new cljs.core.Keyword(null,"devtools-client","devtools-client",-729131942).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,new cljs.core.Keyword(null,"frame","frame",-1711082588).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed))));
});
lt.objs.browser.handle_cb = (function lt$objs$browser$handle_cb(cbid,command,data){
return lt.object.raise.call(null,lt.objs.clients.clients,new cljs.core.Keyword(null,"message","message",-406056002),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cbid,command,data], null));
});
lt.objs.browser.connect_client = (function lt$objs$browser$connect_client(this$){
return lt.objs.clients.handle_connection_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),new cljs.core.Keyword(null,"frame","frame",-1711082588),this$,new cljs.core.Keyword(null,"frame-id","frame-id",-636372072),lt.objs.browser.browser_id.call(null,this$),new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"frame.client","frame.client",-420458396)], null),new cljs.core.Keyword(null,"commands","commands",161008658),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"editor.eval.cljs.exec","editor.eval.cljs.exec",141962241),null,new cljs.core.Keyword(null,"editor.eval.css","editor.eval.css",601791630),null,new cljs.core.Keyword(null,"editor.eval.js","editor.eval.js",-264636460),null,new cljs.core.Keyword(null,"editor.eval.html","editor.eval.html",1110263869),null], null), null),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"frame","frame",-1711082588)], null));
});
lt.objs.browser.add = (function lt$objs$browser$add(){
var browser = lt.object.create.call(null,new cljs.core.Keyword("lt.objs.browser","browser","lt.objs.browser/browser",1226215459));
lt.objs.tabs.add_BANG_.call(null,browser);

lt.objs.tabs.active_BANG_.call(null,browser);

return browser;
});
/**
 * 
 */
lt.objs.browser.url_bar = (function lt$objs$browser$url_bar(this$){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input.url-bar","input.url-bar",-1824716954),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),"text",new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),"url",new cljs.core.Keyword(null,"value","value",305978217),crate.binding.bound.call(null,this$,new cljs.core.Keyword(null,"url","url",276297046))], null)], null));
var seq__19322_19332 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"focus","focus",234677911),((function (e__7942__auto__){
return (function (){
lt.objs.context.in_BANG_.call(null,new cljs.core.Keyword(null,"browser.url-bar","browser.url-bar",-1583742887),this$);

return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"active","active",1895962068));
});})(e__7942__auto__))
,new cljs.core.Keyword(null,"blur","blur",-453500461),((function (e__7942__auto__){
return (function (){
lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"inactive","inactive",-306247616));

return lt.objs.context.out_BANG_.call(null,new cljs.core.Keyword(null,"browser.url-bar","browser.url-bar",-1583742887));
});})(e__7942__auto__))
], null)));
var chunk__19323_19333 = null;
var count__19324_19334 = (0);
var i__19325_19335 = (0);
while(true){
if((i__19325_19335 < count__19324_19334)){
var vec__19326_19336 = cljs.core._nth.call(null,chunk__19323_19333,i__19325_19335);
var ev__7943__auto___19337 = cljs.core.nth.call(null,vec__19326_19336,(0),null);
var func__7944__auto___19338 = cljs.core.nth.call(null,vec__19326_19336,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___19337,func__7944__auto___19338);

var G__19339 = seq__19322_19332;
var G__19340 = chunk__19323_19333;
var G__19341 = count__19324_19334;
var G__19342 = (i__19325_19335 + (1));
seq__19322_19332 = G__19339;
chunk__19323_19333 = G__19340;
count__19324_19334 = G__19341;
i__19325_19335 = G__19342;
continue;
} else {
var temp__4657__auto___19343 = cljs.core.seq.call(null,seq__19322_19332);
if(temp__4657__auto___19343){
var seq__19322_19344__$1 = temp__4657__auto___19343;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__19322_19344__$1)){
var c__7604__auto___19345 = cljs.core.chunk_first.call(null,seq__19322_19344__$1);
var G__19346 = cljs.core.chunk_rest.call(null,seq__19322_19344__$1);
var G__19347 = c__7604__auto___19345;
var G__19348 = cljs.core.count.call(null,c__7604__auto___19345);
var G__19349 = (0);
seq__19322_19332 = G__19346;
chunk__19323_19333 = G__19347;
count__19324_19334 = G__19348;
i__19325_19335 = G__19349;
continue;
} else {
var vec__19329_19350 = cljs.core.first.call(null,seq__19322_19344__$1);
var ev__7943__auto___19351 = cljs.core.nth.call(null,vec__19329_19350,(0),null);
var func__7944__auto___19352 = cljs.core.nth.call(null,vec__19329_19350,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___19351,func__7944__auto___19352);

var G__19353 = cljs.core.next.call(null,seq__19322_19344__$1);
var G__19354 = null;
var G__19355 = (0);
var G__19356 = (0);
seq__19322_19332 = G__19353;
chunk__19323_19333 = G__19354;
count__19324_19334 = G__19355;
i__19325_19335 = G__19356;
continue;
}
} else {
}
}
break;
}

return e__7942__auto__;
});
/**
 * 
 */
lt.objs.browser.backward = (function lt$objs$browser$backward(this$){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),"<"], null),"<"], null));
var seq__19367_19377 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"back!","back!",464740510));
});})(e__7942__auto__))
], null)));
var chunk__19368_19378 = null;
var count__19369_19379 = (0);
var i__19370_19380 = (0);
while(true){
if((i__19370_19380 < count__19369_19379)){
var vec__19371_19381 = cljs.core._nth.call(null,chunk__19368_19378,i__19370_19380);
var ev__7943__auto___19382 = cljs.core.nth.call(null,vec__19371_19381,(0),null);
var func__7944__auto___19383 = cljs.core.nth.call(null,vec__19371_19381,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___19382,func__7944__auto___19383);

var G__19384 = seq__19367_19377;
var G__19385 = chunk__19368_19378;
var G__19386 = count__19369_19379;
var G__19387 = (i__19370_19380 + (1));
seq__19367_19377 = G__19384;
chunk__19368_19378 = G__19385;
count__19369_19379 = G__19386;
i__19370_19380 = G__19387;
continue;
} else {
var temp__4657__auto___19388 = cljs.core.seq.call(null,seq__19367_19377);
if(temp__4657__auto___19388){
var seq__19367_19389__$1 = temp__4657__auto___19388;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__19367_19389__$1)){
var c__7604__auto___19390 = cljs.core.chunk_first.call(null,seq__19367_19389__$1);
var G__19391 = cljs.core.chunk_rest.call(null,seq__19367_19389__$1);
var G__19392 = c__7604__auto___19390;
var G__19393 = cljs.core.count.call(null,c__7604__auto___19390);
var G__19394 = (0);
seq__19367_19377 = G__19391;
chunk__19368_19378 = G__19392;
count__19369_19379 = G__19393;
i__19370_19380 = G__19394;
continue;
} else {
var vec__19374_19395 = cljs.core.first.call(null,seq__19367_19389__$1);
var ev__7943__auto___19396 = cljs.core.nth.call(null,vec__19374_19395,(0),null);
var func__7944__auto___19397 = cljs.core.nth.call(null,vec__19374_19395,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___19396,func__7944__auto___19397);

var G__19398 = cljs.core.next.call(null,seq__19367_19389__$1);
var G__19399 = null;
var G__19400 = (0);
var G__19401 = (0);
seq__19367_19377 = G__19398;
chunk__19368_19378 = G__19399;
count__19369_19379 = G__19400;
i__19370_19380 = G__19401;
continue;
}
} else {
}
}
break;
}

return e__7942__auto__;
});
/**
 * 
 */
lt.objs.browser.forward = (function lt$objs$browser$forward(this$){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),">"], null),">"], null));
var seq__19412_19422 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"forward!","forward!",44176912));
});})(e__7942__auto__))
], null)));
var chunk__19413_19423 = null;
var count__19414_19424 = (0);
var i__19415_19425 = (0);
while(true){
if((i__19415_19425 < count__19414_19424)){
var vec__19416_19426 = cljs.core._nth.call(null,chunk__19413_19423,i__19415_19425);
var ev__7943__auto___19427 = cljs.core.nth.call(null,vec__19416_19426,(0),null);
var func__7944__auto___19428 = cljs.core.nth.call(null,vec__19416_19426,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___19427,func__7944__auto___19428);

var G__19429 = seq__19412_19422;
var G__19430 = chunk__19413_19423;
var G__19431 = count__19414_19424;
var G__19432 = (i__19415_19425 + (1));
seq__19412_19422 = G__19429;
chunk__19413_19423 = G__19430;
count__19414_19424 = G__19431;
i__19415_19425 = G__19432;
continue;
} else {
var temp__4657__auto___19433 = cljs.core.seq.call(null,seq__19412_19422);
if(temp__4657__auto___19433){
var seq__19412_19434__$1 = temp__4657__auto___19433;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__19412_19434__$1)){
var c__7604__auto___19435 = cljs.core.chunk_first.call(null,seq__19412_19434__$1);
var G__19436 = cljs.core.chunk_rest.call(null,seq__19412_19434__$1);
var G__19437 = c__7604__auto___19435;
var G__19438 = cljs.core.count.call(null,c__7604__auto___19435);
var G__19439 = (0);
seq__19412_19422 = G__19436;
chunk__19413_19423 = G__19437;
count__19414_19424 = G__19438;
i__19415_19425 = G__19439;
continue;
} else {
var vec__19419_19440 = cljs.core.first.call(null,seq__19412_19434__$1);
var ev__7943__auto___19441 = cljs.core.nth.call(null,vec__19419_19440,(0),null);
var func__7944__auto___19442 = cljs.core.nth.call(null,vec__19419_19440,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___19441,func__7944__auto___19442);

var G__19443 = cljs.core.next.call(null,seq__19412_19434__$1);
var G__19444 = null;
var G__19445 = (0);
var G__19446 = (0);
seq__19412_19422 = G__19443;
chunk__19413_19423 = G__19444;
count__19414_19424 = G__19445;
i__19415_19425 = G__19446;
continue;
}
} else {
}
}
break;
}

return e__7942__auto__;
});
/**
 * 
 */
lt.objs.browser.refresh = (function lt$objs$browser$refresh(this$){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),"re"], null),"\u21BA"], null));
var seq__19457_19467 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"refresh!","refresh!",156149341));
});})(e__7942__auto__))
], null)));
var chunk__19458_19468 = null;
var count__19459_19469 = (0);
var i__19460_19470 = (0);
while(true){
if((i__19460_19470 < count__19459_19469)){
var vec__19461_19471 = cljs.core._nth.call(null,chunk__19458_19468,i__19460_19470);
var ev__7943__auto___19472 = cljs.core.nth.call(null,vec__19461_19471,(0),null);
var func__7944__auto___19473 = cljs.core.nth.call(null,vec__19461_19471,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___19472,func__7944__auto___19473);

var G__19474 = seq__19457_19467;
var G__19475 = chunk__19458_19468;
var G__19476 = count__19459_19469;
var G__19477 = (i__19460_19470 + (1));
seq__19457_19467 = G__19474;
chunk__19458_19468 = G__19475;
count__19459_19469 = G__19476;
i__19460_19470 = G__19477;
continue;
} else {
var temp__4657__auto___19478 = cljs.core.seq.call(null,seq__19457_19467);
if(temp__4657__auto___19478){
var seq__19457_19479__$1 = temp__4657__auto___19478;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__19457_19479__$1)){
var c__7604__auto___19480 = cljs.core.chunk_first.call(null,seq__19457_19479__$1);
var G__19481 = cljs.core.chunk_rest.call(null,seq__19457_19479__$1);
var G__19482 = c__7604__auto___19480;
var G__19483 = cljs.core.count.call(null,c__7604__auto___19480);
var G__19484 = (0);
seq__19457_19467 = G__19481;
chunk__19458_19468 = G__19482;
count__19459_19469 = G__19483;
i__19460_19470 = G__19484;
continue;
} else {
var vec__19464_19485 = cljs.core.first.call(null,seq__19457_19479__$1);
var ev__7943__auto___19486 = cljs.core.nth.call(null,vec__19464_19485,(0),null);
var func__7944__auto___19487 = cljs.core.nth.call(null,vec__19464_19485,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___19486,func__7944__auto___19487);

var G__19488 = cljs.core.next.call(null,seq__19457_19479__$1);
var G__19489 = null;
var G__19490 = (0);
var G__19491 = (0);
seq__19457_19467 = G__19488;
chunk__19458_19468 = G__19489;
count__19459_19469 = G__19490;
i__19460_19470 = G__19491;
continue;
}
} else {
}
}
break;
}

return e__7942__auto__;
});
/**
 * 
 */
lt.objs.browser.webview = (function lt$objs$browser$webview(this$){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"webview","webview",-1131133239),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"src","src",-1651076051),crate.binding.bound.call(null,crate.binding.subatom.call(null,this$,new cljs.core.Keyword(null,"url","url",276297046))),new cljs.core.Keyword(null,"id","id",-1388402092),lt.objs.browser.browser_id.call(null,this$),new cljs.core.Keyword(null,"preload","preload",1646824722),lt.objs.files.lt_home.call(null,"core/lighttable/browserInjection.js")], null)], null));
var seq__19502_19512 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"focus","focus",234677911),((function (e__7942__auto__){
return (function (){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"active","active",1895962068));
});})(e__7942__auto__))
,new cljs.core.Keyword(null,"blur","blur",-453500461),((function (e__7942__auto__){
return (function (){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"inactive","inactive",-306247616));
});})(e__7942__auto__))
], null)));
var chunk__19503_19513 = null;
var count__19504_19514 = (0);
var i__19505_19515 = (0);
while(true){
if((i__19505_19515 < count__19504_19514)){
var vec__19506_19516 = cljs.core._nth.call(null,chunk__19503_19513,i__19505_19515);
var ev__7943__auto___19517 = cljs.core.nth.call(null,vec__19506_19516,(0),null);
var func__7944__auto___19518 = cljs.core.nth.call(null,vec__19506_19516,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___19517,func__7944__auto___19518);

var G__19519 = seq__19502_19512;
var G__19520 = chunk__19503_19513;
var G__19521 = count__19504_19514;
var G__19522 = (i__19505_19515 + (1));
seq__19502_19512 = G__19519;
chunk__19503_19513 = G__19520;
count__19504_19514 = G__19521;
i__19505_19515 = G__19522;
continue;
} else {
var temp__4657__auto___19523 = cljs.core.seq.call(null,seq__19502_19512);
if(temp__4657__auto___19523){
var seq__19502_19524__$1 = temp__4657__auto___19523;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__19502_19524__$1)){
var c__7604__auto___19525 = cljs.core.chunk_first.call(null,seq__19502_19524__$1);
var G__19526 = cljs.core.chunk_rest.call(null,seq__19502_19524__$1);
var G__19527 = c__7604__auto___19525;
var G__19528 = cljs.core.count.call(null,c__7604__auto___19525);
var G__19529 = (0);
seq__19502_19512 = G__19526;
chunk__19503_19513 = G__19527;
count__19504_19514 = G__19528;
i__19505_19515 = G__19529;
continue;
} else {
var vec__19509_19530 = cljs.core.first.call(null,seq__19502_19524__$1);
var ev__7943__auto___19531 = cljs.core.nth.call(null,vec__19509_19530,(0),null);
var func__7944__auto___19532 = cljs.core.nth.call(null,vec__19509_19530,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___19531,func__7944__auto___19532);

var G__19533 = cljs.core.next.call(null,seq__19502_19524__$1);
var G__19534 = null;
var G__19535 = (0);
var G__19536 = (0);
seq__19502_19512 = G__19533;
chunk__19503_19513 = G__19534;
count__19504_19514 = G__19535;
i__19505_19515 = G__19536;
continue;
}
} else {
}
}
break;
}

return e__7942__auto__;
});
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.browser","browser","lt.objs.browser/browser",1226215459),new cljs.core.Keyword(null,"name","name",1843675177),"browser",new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"browser","browser",828191719),null], null), null),new cljs.core.Keyword(null,"url","url",276297046),"about:blank",new cljs.core.Keyword(null,"init","init",-1875481434),(function (this$){
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"client","client",-1323448117),lt.objs.browser.connect_client.call(null,this$),new cljs.core.Keyword(null,"devtools-client","devtools-client",-729131942),lt.object.create.call(null,new cljs.core.Keyword("lt.objs.clients.devtools","devtools-client","lt.objs.clients.devtools/devtools-client",1379965666),new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)))], null));

lt.object.raise.call(null,new cljs.core.Keyword(null,"devtools-client","devtools-client",-729131942).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),new cljs.core.Keyword(null,"reconnect!","reconnect!",964525183));

return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#browser","div#browser",-413166357),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.frame-shade","div.frame-shade",-968604833)], null),lt.objs.browser.webview.call(null,this$),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"nav","nav",719540477),lt.objs.browser.backward.call(null,this$),lt.objs.browser.forward.call(null,this$),lt.objs.browser.url_bar.call(null,this$),lt.objs.browser.refresh.call(null,this$)], null)], null);
}));
/**
 * 
 */
lt.objs.browser.__BEH__reconnect_on_move = (function lt$objs$browser$__BEH__reconnect_on_move(this$){
return lt.object.raise.call(null,new cljs.core.Keyword(null,"devtools-client","devtools-client",-729131942).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),new cljs.core.Keyword(null,"reconnect!","reconnect!",964525183));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.browser","reconnect-on-move","lt.objs.browser/reconnect-on-move",668704509),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"move","move",-2110884309),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.browser.__BEH__reconnect_on_move);
/**
 * 
 */
lt.objs.browser.__BEH__destroy_on_close = (function lt$objs$browser$__BEH__destroy_on_close(this$){
lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"inactive","inactive",-306247616));

lt.object.destroy_BANG_.call(null,new cljs.core.Keyword(null,"devtools-client","devtools-client",-729131942).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));

return lt.object.destroy_BANG_.call(null,this$);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.browser","destroy-on-close","lt.objs.browser/destroy-on-close",-1067036522),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"close","close",1835149582),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.browser.__BEH__destroy_on_close);
/**
 * 
 */
lt.objs.browser.__BEH__rem_client = (function lt$objs$browser$__BEH__rem_client(this$){
if(cljs.core._EQ_.call(null,lt.objs.context.__GT_obj.call(null,new cljs.core.Keyword(null,"global.browser","global.browser",536949357)),this$)){
lt.objs.context.out_BANG_.call(null,new cljs.core.Keyword(null,"global.browser","global.browser",536949357));
} else {
}

var temp__4657__auto___19537 = cljs.core.first.call(null,cljs.core.remove.call(null,cljs.core.PersistentHashSet.fromArray([this$], true),lt.object.by_tag.call(null,new cljs.core.Keyword(null,"browser","browser",828191719))));
if(cljs.core.truth_(temp__4657__auto___19537)){
var b_19538 = temp__4657__auto___19537;
lt.objs.context.in_BANG_.call(null,new cljs.core.Keyword(null,"global.browser","global.browser",536949357),b_19538);
} else {
}

return lt.objs.clients.rem_BANG_.call(null,new cljs.core.Keyword(null,"client","client",-1323448117).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.browser","rem-client","lt.objs.browser/rem-client",1251586798),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"destroy","destroy",-843660405),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.browser.__BEH__rem_client);
/**
 * 
 */
lt.objs.browser.__BEH__navigate_BANG_ = (function lt$objs$browser$__BEH__navigate_BANG_(this$,n){
var bar = lt.util.dom.$.call(null,new cljs.core.Keyword(null,"input","input",556931961),lt.object.__GT_content.call(null,this$));
var url = lt.objs.browser.check_http.call(null,(function (){var or__6793__auto__ = n;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return lt.util.dom.val.call(null,bar);
}
})());
lt.objs.notifos.working.call(null);

return lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"url","url",276297046),url,new cljs.core.Keyword(null,"loading-counter","loading-counter",360873758),(new cljs.core.Keyword(null,"loading-counter","loading-counter",360873758).cljs$core$IFn$_invoke$arity$2(cljs.core.deref.call(null,this$),(0)) + (1))], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.browser","navigate!","lt.objs.browser/navigate!",447947080),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"navigate!","navigate!",79998348),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.browser.__BEH__navigate_BANG_);
/**
 * 
 */
lt.objs.browser.__BEH__url_focus_BANG_ = (function lt$objs$browser$__BEH__url_focus_BANG_(this$){
var url_input = lt.util.dom.$.call(null,new cljs.core.Keyword(null,"input","input",556931961),lt.object.__GT_content.call(null,this$));
lt.util.dom.focus.call(null,url_input);

return url_input.select();
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.browser","url-focus!","lt.objs.browser/url-focus!",2115507532),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"url.focus!","url.focus!",1123649603),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.browser.__BEH__url_focus_BANG_);
/**
 * 
 */
lt.objs.browser.__BEH__focus_BANG_ = (function lt$objs$browser$__BEH__focus_BANG_(this$){
return lt.util.dom.focus.call(null,lt.util.dom.$.call(null,new cljs.core.Keyword(null,"webview","webview",-1131133239),lt.object.__GT_content.call(null,this$)));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.browser","focus!","lt.objs.browser/focus!",-587352995),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"focus!","focus!",-1344984927),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.browser.__BEH__focus_BANG_);
/**
 * 
 */
lt.objs.browser.__BEH__back_BANG_ = (function lt$objs$browser$__BEH__back_BANG_(this$){
var frame = lt.objs.browser.to_frame.call(null,this$);
return frame.goBack();
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.browser","back!","lt.objs.browser/back!",-465316774),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"back!","back!",464740510),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.browser.__BEH__back_BANG_);
/**
 * 
 */
lt.objs.browser.__BEH__forward_BANG_ = (function lt$objs$browser$__BEH__forward_BANG_(this$){
var frame = lt.objs.browser.to_frame.call(null,this$);
return frame.goForward();
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.browser","forward!","lt.objs.browser/forward!",-376985148),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"forward!","forward!",44176912),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.browser.__BEH__forward_BANG_);
/**
 * 
 */
lt.objs.browser.__BEH__refresh_BANG_ = (function lt$objs$browser$__BEH__refresh_BANG_(this$){
var frame = lt.objs.browser.to_frame.call(null,this$);
return frame.reload();
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.browser","refresh!","lt.objs.browser/refresh!",-201706719),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"refresh!","refresh!",156149341),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.browser.__BEH__refresh_BANG_);
/**
 * 
 */
lt.objs.browser.__BEH__menu_BANG_ = (function lt$objs$browser$__BEH__menu_BANG_(this$,e){
var items_19539 = cljs.core.sort_by.call(null,new cljs.core.Keyword(null,"order","order",-1254677256),lt.object.raise_reduce.call(null,this$,new cljs.core.Keyword(null,"menu+","menu+",276559402),cljs.core.PersistentVector.EMPTY));
lt.objs.menu.show_menu.call(null,lt.objs.menu.menu.call(null,items_19539));

lt.util.dom.prevent.call(null,e);

return lt.util.dom.stop_propagation.call(null,e);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.browser","menu!","lt.objs.browser/menu!",-876031095),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"menu!","menu!",-1593399467),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.browser.__BEH__menu_BANG_);
/**
 * 
 */
lt.objs.browser.__BEH__menu_PLUS_ = (function lt$objs$browser$__BEH__menu_PLUS_(this$,menu){
return cljs.core.conj.call(null,menu,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"label","label",1718410804),"forward",new cljs.core.Keyword(null,"order","order",-1254677256),(0),new cljs.core.Keyword(null,"click","click",1912301393),(function (e){
return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"browser.forward","browser.forward",-1403890974));
})], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"label","label",1718410804),"back",new cljs.core.Keyword(null,"order","order",-1254677256),(1),new cljs.core.Keyword(null,"click","click",1912301393),(function (e){
return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"browser.back","browser.back",-285151307));
})], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),"separator",new cljs.core.Keyword(null,"order","order",-1254677256),(2)], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"label","label",1718410804),"copy",new cljs.core.Keyword(null,"order","order",-1254677256),(3),new cljs.core.Keyword(null,"click","click",1912301393),(function (e){
return lt.objs.browser.to_frame.call(null,this$).copy();
})], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"label","label",1718410804),"paste",new cljs.core.Keyword(null,"order","order",-1254677256),(4),new cljs.core.Keyword(null,"click","click",1912301393),(function (e){
return lt.objs.browser.to_frame.call(null,this$).paste();
})], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.browser","menu+","lt.objs.browser/menu+",121764470),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"menu+","menu+",276559402),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.browser.__BEH__menu_PLUS_);
/**
 * 
 */
lt.objs.browser.__BEH__init_BANG_ = (function lt$objs$browser$__BEH__init_BANG_(this$){
var frame = lt.util.dom.$.call(null,new cljs.core.Keyword(null,"webview","webview",-1131133239),lt.object.__GT_content.call(null,this$));
var bar = lt.util.dom.$.call(null,new cljs.core.Keyword(null,"input","input",556931961),lt.object.__GT_content.call(null,this$));
frame.addEventListener("ipc-message",((function (frame,bar){
return (function (e,arg){
var args = (e.args[(0)]);
var pred__19543 = cljs.core._EQ_;
var expr__19544 = e.channel;
if(cljs.core.truth_(pred__19543.call(null,"browser-event",expr__19544))){
return lt.object.raise.call(null,this$,cljs.core.keyword.call(null,(args[(0)])),(args[(1)]));
} else {
if(cljs.core.truth_(pred__19543.call(null,"browser-raise",expr__19544))){
return lt.object.raise.call(null,lt.object.by_id.call(null,(args[(0)])),cljs.core.keyword.call(null,(args[(1)])),cljs.core.js__GT_clj.call(null,(args[(2)]),new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true));
} else {
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(expr__19544)].join('')));
}
}
});})(frame,bar))
);

frame.addEventListener("contextmenu",((function (frame,bar){
return (function (e){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"menu!","menu!",-1593399467),e);
});})(frame,bar))
);

return frame.addEventListener("did-finish-load",((function (frame,bar){
return (function (){
var loc = frame.getUrl();
lt.objs.clients.devtools.clear_scripts_BANG_.call(null,new cljs.core.Keyword(null,"devtools-client","devtools-client",-729131942).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));

lt.util.dom.val.call(null,bar,loc);

return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"navigate","navigate",657596805),loc);
});})(frame,bar))
);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.browser","init!","lt.objs.browser/init!",1846742728),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"init","init",-1875481434),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.browser.__BEH__init_BANG_);
/**
 * 
 */
lt.objs.browser.__BEH__handle_hash_change = (function lt$objs$browser$__BEH__handle_hash_change(this$,info){
return lt.util.dom.val.call(null,lt.util.dom.$.call(null,new cljs.core.Keyword(null,"input","input",556931961),lt.object.__GT_content.call(null,this$)),info.href);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.browser","handle-hash-change","lt.objs.browser/handle-hash-change",-426696567),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"hashchange","hashchange",1795201042),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.browser.__BEH__handle_hash_change);
/**
 * 
 */
lt.objs.browser.__BEH__set_client_name = (function lt$objs$browser$__BEH__set_client_name(this$,loc){
var title = lt.objs.browser.to_frame.call(null,this$).getTitle();
var title__$1 = ((!(cljs.core.empty_QMARK_.call(null,title)))?title:"browser");
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"name","name",1843675177),title__$1], null));

lt.objs.tabs.refresh_BANG_.call(null,this$);

var n__7708__auto___19546 = new cljs.core.Keyword(null,"loading-counter","loading-counter",360873758).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$));
var x_19547 = (0);
while(true){
if((x_19547 < n__7708__auto___19546)){
lt.objs.notifos.done_working.call(null);

var G__19548 = (x_19547 + (1));
x_19547 = G__19548;
continue;
} else {
}
break;
}

return lt.object.merge_BANG_.call(null,new cljs.core.Keyword(null,"client","client",-1323448117).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"name","name",1843675177),loc], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.browser","set-client-name","lt.objs.browser/set-client-name",-25771735),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"navigate","navigate",657596805),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.browser.__BEH__set_client_name);
/**
 * 
 */
lt.objs.browser.__BEH__update_devtools_client_url = (function lt$objs$browser$__BEH__update_devtools_client_url(this$,loc){
return lt.object.merge_BANG_.call(null,new cljs.core.Keyword(null,"devtools-client","devtools-client",-729131942).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"url","url",276297046),loc], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.browser","update-devtools-client-url","lt.objs.browser/update-devtools-client-url",1260619941),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"navigate","navigate",657596805),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.browser.__BEH__update_devtools_client_url);
/**
 * 
 */
lt.objs.browser.__BEH__set_active = (function lt$objs$browser$__BEH__set_active(this$){
return lt.objs.context.in_BANG_.call(null,new cljs.core.Keyword(null,"global.browser","global.browser",536949357),this$);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.browser","set-active","lt.objs.browser/set-active",113469761),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"active","active",1895962068),null,new cljs.core.Keyword(null,"show","show",-576705889),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.browser.__BEH__set_active);
/**
 * 
 */
lt.objs.browser.__BEH__active_context = (function lt$objs$browser$__BEH__active_context(this$){
return lt.objs.context.in_BANG_.call(null,new cljs.core.Keyword(null,"browser","browser",828191719),this$);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.browser","active-context","lt.objs.browser/active-context",222462122),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"active","active",1895962068),null,new cljs.core.Keyword(null,"show","show",-576705889),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.browser.__BEH__active_context);
/**
 * 
 */
lt.objs.browser.__BEH__focus_on_show = (function lt$objs$browser$__BEH__focus_on_show(this$){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"focus!","focus!",-1344984927));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.browser","focus-on-show","lt.objs.browser/focus-on-show",-1038273011),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"show","show",-576705889),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.browser.__BEH__focus_on_show);
/**
 * 
 */
lt.objs.browser.__BEH__inactive_context = (function lt$objs$browser$__BEH__inactive_context(this$){
return lt.objs.context.out_BANG_.call(null,new cljs.core.Keyword(null,"browser","browser",828191719));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.browser","inactive-context","lt.objs.browser/inactive-context",1789641436),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"inactive","inactive",-306247616),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.browser.__BEH__inactive_context);
/**
 * 
 */
lt.objs.browser.__BEH__handle_send_BANG_ = (function lt$objs$browser$__BEH__handle_send_BANG_(this$,msg){
return lt.object.raise.call(null,this$,cljs.core.keyword.call(null,[cljs.core.str(new cljs.core.Keyword(null,"command","command",-894540724).cljs$core$IFn$_invoke$arity$1(msg)),cljs.core.str("!")].join('')),msg);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.browser","handle-send!","lt.objs.browser/handle-send!",1766256984),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"send!","send!",480076706),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.browser.__BEH__handle_send_BANG_);
/**
 * 
 */
lt.objs.browser.__BEH__handle_refresh_BANG_ = (function lt$objs$browser$__BEH__handle_refresh_BANG_(this$){
return lt.object.raise.call(null,new cljs.core.Keyword(null,"frame","frame",-1711082588).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),new cljs.core.Keyword(null,"refresh!","refresh!",156149341));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.browser","handle-refresh!","lt.objs.browser/handle-refresh!",-1859393901),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"client.refresh!","client.refresh!",-2094145525),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.browser.__BEH__handle_refresh_BANG_);
/**
 * 
 */
lt.objs.browser.__BEH__handle_close_BANG_ = (function lt$objs$browser$__BEH__handle_close_BANG_(this$){
lt.object.raise.call(null,new cljs.core.Keyword(null,"frame","frame",-1711082588).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),new cljs.core.Keyword(null,"close","close",1835149582));

return lt.objs.clients.rem_BANG_.call(null,this$);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.browser","handle-close!","lt.objs.browser/handle-close!",1531833591),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"client.close!","client.close!",-639418105),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.browser.__BEH__handle_close_BANG_);
/**
 * 
 */
lt.objs.browser.__BEH__change_live = (function lt$objs$browser$__BEH__change_live(this$,msg){
var temp__4657__auto__ = lt.objs.clients.cb__GT_obj.call(null,new cljs.core.Keyword(null,"cb","cb",589947841).cljs$core$IFn$_invoke$arity$1(msg));
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
if(cljs.core.truth_(new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(msg)))){
return lt.objs.clients.devtools.changelive_BANG_.call(null,ed,new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(msg)),lt.plugins.watches.watched_range(ed,null,null,lt.objs.langs.js.src__GT_watch),((function (ed,temp__4657__auto__){
return (function (res){
return lt.object.raise.call(null,ed,new cljs.core.Keyword(null,"editor.eval.js.change-live.success","editor.eval.js.change-live.success",1842084705));
});})(ed,temp__4657__auto__))
,cljs.core.identity);
} else {
return null;
}
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.browser","change-live","lt.objs.browser/change-live",1217081390),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.js.change-live!","editor.eval.js.change-live!",131748392),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.browser.__BEH__change_live);
/**
 * 
 */
lt.objs.browser.__BEH__js_eval_file = (function lt$objs$browser$__BEH__js_eval_file(this$,msg,cb){
var temp__4657__auto__ = lt.objs.clients.cb__GT_obj.call(null,new cljs.core.Keyword(null,"cb","cb",589947841).cljs$core$IFn$_invoke$arity$1(msg));
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
var data = new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(msg);
var data__$1 = cljs.core.assoc.call(null,data,new cljs.core.Keyword(null,"code","code",1586293142),[cljs.core.str(new cljs.core.Keyword(null,"code","code",1586293142).cljs$core$IFn$_invoke$arity$1(data)),cljs.core.str("\n\n//# sourceURL="),cljs.core.str(new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(data))].join(''));
return lt.objs.clients.devtools.eval_in_webview_client.call(null,lt.objs.browser.client__GT_devtools.call(null,this$),data__$1,((function (data,data__$1,ed,temp__4657__auto__){
return (function (res){
if(cljs.core.truth_(cb)){
cb.call(null);
} else {
}

return lt.object.raise.call(null,ed,new cljs.core.Keyword(null,"editor.eval.js.file.success","editor.eval.js.file.success",-1716848878));
});})(data,data__$1,ed,temp__4657__auto__))
);
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.browser","js-eval-file","lt.objs.browser/js-eval-file",1412489749),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.js.file!","editor.eval.js.file!",1221377215),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.browser.__BEH__js_eval_file);
/**
 * 
 */
lt.objs.browser.__BEH__html_eval = (function lt$objs$browser$__BEH__html_eval(this$,msg){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"client.refresh!","client.refresh!",-2094145525));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.browser","html-eval","lt.objs.browser/html-eval",1104819598),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.html!","editor.eval.html!",-1775758708),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.browser.__BEH__html_eval);
/**
 * 
 */
lt.objs.browser.__BEH__css_eval = (function lt$objs$browser$__BEH__css_eval(this$,msg){
var info = new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(msg);
var frame = lt.objs.browser.to_frame.call(null,new cljs.core.Keyword(null,"frame","frame",-1711082588).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
return frame.send("editor.eval.css",({"name": new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(info), "code": new cljs.core.Keyword(null,"code","code",1586293142).cljs$core$IFn$_invoke$arity$1(info)}));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.browser","css-eval","lt.objs.browser/css-eval",849827177),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.css!","editor.eval.css!",212410194),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.browser.__BEH__css_eval);
/**
 * 
 */
lt.objs.browser.__BEH__cljs_exec = (function lt$objs$browser$__BEH__cljs_exec(this$,msg){
var frame = lt.objs.browser.to_frame.call(null,new cljs.core.Keyword(null,"frame","frame",-1711082588).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
var info = new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(msg);
return frame.send("editor.eval.cljs.exec",({"results": cljs.core.clj__GT_js.call(null,new cljs.core.Keyword(null,"results","results",-1134170113).cljs$core$IFn$_invoke$arity$1(info)), "client": new cljs.core.Keyword(null,"cb","cb",589947841).cljs$core$IFn$_invoke$arity$1(msg)}));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.browser","cljs-exec","lt.objs.browser/cljs-exec",1394836537),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.cljs.exec!","editor.eval.cljs.exec!",349545863),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.browser.__BEH__cljs_exec);
lt.objs.browser.eval_js_form = (function lt$objs$browser$eval_js_form(this$,msg){
var data = cljs.core.assoc.call(null,new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(msg),new cljs.core.Keyword(null,"code","code",1586293142),lt.objs.eval.append_source_file.call(null,new cljs.core.Keyword(null,"code","code",1586293142).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(msg)),new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(msg))));
var devtools_client = lt.objs.browser.client__GT_devtools.call(null,this$);
lt.objs.clients.devtools.eval_in_webview_client.call(null,devtools_client,data,((function (data,devtools_client){
return (function (res){
var result = lt.objs.clients.devtools.inspector__GT_result.call(null,devtools_client,res);
var req = new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(msg);
var result__$1 = cljs.core.assoc.call(null,result,new cljs.core.Keyword(null,"meta","meta",1499536964),new cljs.core.Keyword(null,"meta","meta",1499536964).cljs$core$IFn$_invoke$arity$1(req),new cljs.core.Keyword(null,"no-inspect","no-inspect",-1343403980),true);
if(cljs.core.not.call(null,new cljs.core.Keyword(null,"ex","ex",-1413771341).cljs$core$IFn$_invoke$arity$1(result__$1))){
return lt.objs.browser.handle_cb.call(null,new cljs.core.Keyword(null,"cb","cb",589947841).cljs$core$IFn$_invoke$arity$1(msg),new cljs.core.Keyword(null,"editor.eval.js.result","editor.eval.js.result",1499033068),result__$1);
} else {
return lt.objs.browser.handle_cb.call(null,new cljs.core.Keyword(null,"cb","cb",589947841).cljs$core$IFn$_invoke$arity$1(msg),new cljs.core.Keyword(null,"editor.eval.js.exception","editor.eval.js.exception",1928121505),result__$1);
}
});})(data,devtools_client))
);

return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"editor.eval.js.change-live!","editor.eval.js.change-live!",131748392),msg);
});
lt.objs.browser.must_eval_file_QMARK_ = (function lt$objs$browser$must_eval_file_QMARK_(devtools,msg){
if(cljs.core.truth_(new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(msg)))){
return (cljs.core.not.call(null,new cljs.core.Keyword(null,"meta","meta",1499536964).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(msg)))) || (cljs.core.not.call(null,lt.objs.clients.devtools.find_script.call(null,devtools,new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(msg)))));
} else {
return null;
}
});
/**
 * 
 */
lt.objs.browser.__BEH__js_eval = (function lt$objs$browser$__BEH__js_eval(this$,msg){
var devtools = lt.objs.browser.client__GT_devtools.call(null,this$);
if(cljs.core.truth_(lt.objs.browser.must_eval_file_QMARK_.call(null,devtools,msg))){
var temp__4657__auto__ = lt.object.by_id.call(null,new cljs.core.Keyword(null,"cb","cb",589947841).cljs$core$IFn$_invoke$arity$1(msg));
if(cljs.core.truth_(temp__4657__auto__)){
var ed = temp__4657__auto__;
var data = new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(msg);
var data__$1 = cljs.core.assoc.call(null,data,new cljs.core.Keyword(null,"code","code",1586293142),[cljs.core.str(lt.objs.editor.__GT_val.call(null,ed)),cljs.core.str("\n\n//# sourceURL="),cljs.core.str(new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(data))].join(''));
return lt.objs.clients.devtools.eval_in_webview_client.call(null,lt.objs.browser.client__GT_devtools.call(null,this$),data__$1,((function (data,data__$1,ed,temp__4657__auto__,devtools){
return (function (res){
return lt.objs.browser.eval_js_form.call(null,this$,msg);
});})(data,data__$1,ed,temp__4657__auto__,devtools))
);
} else {
return null;
}
} else {
return lt.objs.browser.eval_js_form.call(null,this$,msg);
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.browser","js-eval","lt.objs.browser/js-eval",-822283744),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.js!","editor.eval.js!",-112112138),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.browser.__BEH__js_eval);
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"browser.url-bar.navigate!","browser.url-bar.navigate!",1632807293),new cljs.core.Keyword(null,"desc","desc",2093485764),"BrowserUrlBar: navigate to location",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (loc){
var temp__4657__auto__ = lt.objs.context.__GT_obj.call(null,new cljs.core.Keyword(null,"browser.url-bar","browser.url-bar",-1583742887));
if(cljs.core.truth_(temp__4657__auto__)){
var b = temp__4657__auto__;
if(cljs.core.truth_(cljs.core.deref.call(null,b))){
return lt.object.raise.call(null,b,new cljs.core.Keyword(null,"navigate!","navigate!",79998348),loc);
} else {
return null;
}
} else {
return null;
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"browser.url-bar.focus","browser.url-bar.focus",1619369742),new cljs.core.Keyword(null,"desc","desc",2093485764),"Browser: focus url",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (loc){
var temp__4657__auto__ = lt.objs.context.__GT_obj.call(null,new cljs.core.Keyword(null,"browser","browser",828191719));
if(cljs.core.truth_(temp__4657__auto__)){
var b = temp__4657__auto__;
if(cljs.core.truth_(cljs.core.deref.call(null,b))){
return lt.object.raise.call(null,b,new cljs.core.Keyword(null,"url.focus!","url.focus!",1123649603));
} else {
return null;
}
} else {
return null;
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"browser.focus-content","browser.focus-content",-925938530),new cljs.core.Keyword(null,"desc","desc",2093485764),"Browser: focus content",new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.context.__GT_obj.call(null,new cljs.core.Keyword(null,"browser","browser",828191719));
if(cljs.core.truth_(temp__4657__auto__)){
var b = temp__4657__auto__;
if(cljs.core.truth_(cljs.core.deref.call(null,b))){
return lt.object.raise.call(null,b,new cljs.core.Keyword(null,"focus!","focus!",-1344984927));
} else {
return null;
}
} else {
return null;
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"browser.back","browser.back",-285151307),new cljs.core.Keyword(null,"desc","desc",2093485764),"Browser: back",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.context.__GT_obj.call(null,new cljs.core.Keyword(null,"browser","browser",828191719));
if(cljs.core.truth_(temp__4657__auto__)){
var b = temp__4657__auto__;
if(cljs.core.truth_(cljs.core.deref.call(null,b))){
return lt.object.raise.call(null,b,new cljs.core.Keyword(null,"back!","back!",464740510));
} else {
return null;
}
} else {
return null;
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"browser.forward","browser.forward",-1403890974),new cljs.core.Keyword(null,"desc","desc",2093485764),"Browser: forward",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.context.__GT_obj.call(null,new cljs.core.Keyword(null,"browser","browser",828191719));
if(cljs.core.truth_(temp__4657__auto__)){
var b = temp__4657__auto__;
if(cljs.core.truth_(cljs.core.deref.call(null,b))){
return lt.object.raise.call(null,b,new cljs.core.Keyword(null,"forward!","forward!",44176912));
} else {
return null;
}
} else {
return null;
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"add-browser-tab","add-browser-tab",612625027),new cljs.core.Keyword(null,"desc","desc",2093485764),"Browser: add browser tab",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (loc){
var b = lt.objs.browser.add.call(null);
if(cljs.core.not.call(null,loc)){
return lt.object.raise.call(null,b,new cljs.core.Keyword(null,"focus!","focus!",-1344984927));
} else {
return lt.object.raise.call(null,b,new cljs.core.Keyword(null,"navigate!","navigate!",79998348),loc);
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"refresh-connected-browser","refresh-connected-browser",-2111951493),new cljs.core.Keyword(null,"desc","desc",2093485764),"Browser: refresh active browser tab",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var temp__4657__auto__ = lt.objs.context.__GT_obj.call(null,new cljs.core.Keyword(null,"global.browser","global.browser",536949357));
if(cljs.core.truth_(temp__4657__auto__)){
var b = temp__4657__auto__;
if(cljs.core.truth_(cljs.core.deref.call(null,b))){
return lt.object.raise.call(null,b,new cljs.core.Keyword(null,"refresh!","refresh!",156149341));
} else {
return null;
}
} else {
return null;
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"editor.open-current-file-in-browser","editor.open-current-file-in-browser",358325704),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Open current file in browser",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var b = lt.objs.context.__GT_obj.call(null,new cljs.core.Keyword(null,"global.browser","global.browser",536949357));
var ed = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_((function (){var and__6781__auto__ = ed;
if(cljs.core.truth_(and__6781__auto__)){
return new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed)));
} else {
return and__6781__auto__;
}
})())){
if(cljs.core.truth_(b)){
} else {
lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"add-browser-tab","add-browser-tab",612625027));
}

return lt.object.raise.call(null,lt.objs.context.__GT_obj.call(null,new cljs.core.Keyword(null,"global.browser","global.browser",536949357)),new cljs.core.Keyword(null,"navigate!","navigate!",79998348),[cljs.core.str("file://"),cljs.core.str(new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed))))].join(''));
} else {
return null;
}
})], null));
lt.objs.sidebar.clients.add_connector.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"name","name",1843675177),"Browser",new cljs.core.Keyword(null,"desc","desc",2093485764),"Open a browser tab to eval JavaScript, CSS, and HTML live.",new cljs.core.Keyword(null,"connect","connect",1232828233),(function (){
return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"add-browser-tab","add-browser-tab",612625027));
})], null));
