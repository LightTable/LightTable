// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.objs.intro');
goog.require('cljs.core');
goog.require('lt.objs.cli');
goog.require('lt.objs.command');
goog.require('lt.objs.deploy');
goog.require('crate.core');
goog.require('lt.object');
goog.require('lt.util.dom');
goog.require('lt.objs.app');
goog.require('lt.objs.tabs');
goog.require('lt.objs.style');
goog.require('crate.binding');
/**
 * 
 */
lt.objs.intro.__BEH__on_close_destroy = (function lt$objs$intro$__BEH__on_close_destroy(this$){
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"destroy","destroy",-843660405));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.intro","on-close-destroy","lt.objs.intro/on-close-destroy",-1030395861),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"close","close",1835149582),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.intro.__BEH__on_close_destroy);
lt.objs.intro.__GT_lt_image = cljs.core.constantly.call(null,"img/lighttabletextdark.png");
/**
 * 
 */
lt.objs.intro.docs = (function lt$objs$intro$docs(){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),"Light Table's online docs"], null));
var seq__21389_21399 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (){
return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"show-docs","show-docs",-332260169));
});})(e__7942__auto__))
], null)));
var chunk__21390_21400 = null;
var count__21391_21401 = (0);
var i__21392_21402 = (0);
while(true){
if((i__21392_21402 < count__21391_21401)){
var vec__21393_21403 = cljs.core._nth.call(null,chunk__21390_21400,i__21392_21402);
var ev__7943__auto___21404 = cljs.core.nth.call(null,vec__21393_21403,(0),null);
var func__7944__auto___21405 = cljs.core.nth.call(null,vec__21393_21403,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21404,func__7944__auto___21405);

var G__21406 = seq__21389_21399;
var G__21407 = chunk__21390_21400;
var G__21408 = count__21391_21401;
var G__21409 = (i__21392_21402 + (1));
seq__21389_21399 = G__21406;
chunk__21390_21400 = G__21407;
count__21391_21401 = G__21408;
i__21392_21402 = G__21409;
continue;
} else {
var temp__4657__auto___21410 = cljs.core.seq.call(null,seq__21389_21399);
if(temp__4657__auto___21410){
var seq__21389_21411__$1 = temp__4657__auto___21410;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__21389_21411__$1)){
var c__7604__auto___21412 = cljs.core.chunk_first.call(null,seq__21389_21411__$1);
var G__21413 = cljs.core.chunk_rest.call(null,seq__21389_21411__$1);
var G__21414 = c__7604__auto___21412;
var G__21415 = cljs.core.count.call(null,c__7604__auto___21412);
var G__21416 = (0);
seq__21389_21399 = G__21413;
chunk__21390_21400 = G__21414;
count__21391_21401 = G__21415;
i__21392_21402 = G__21416;
continue;
} else {
var vec__21396_21417 = cljs.core.first.call(null,seq__21389_21411__$1);
var ev__7943__auto___21418 = cljs.core.nth.call(null,vec__21396_21417,(0),null);
var func__7944__auto___21419 = cljs.core.nth.call(null,vec__21396_21417,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21418,func__7944__auto___21419);

var G__21420 = cljs.core.next.call(null,seq__21389_21411__$1);
var G__21421 = null;
var G__21422 = (0);
var G__21423 = (0);
seq__21389_21399 = G__21420;
chunk__21390_21400 = G__21421;
count__21391_21401 = G__21422;
i__21392_21402 = G__21423;
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
lt.objs.intro.reports = (function lt$objs$intro$reports(){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),"GitHub"], null));
var seq__21434_21444 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (){
return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"add-browser-tab","add-browser-tab",612625027),"https://github.com/LightTable/LightTable/issues?state=open");
});})(e__7942__auto__))
], null)));
var chunk__21435_21445 = null;
var count__21436_21446 = (0);
var i__21437_21447 = (0);
while(true){
if((i__21437_21447 < count__21436_21446)){
var vec__21438_21448 = cljs.core._nth.call(null,chunk__21435_21445,i__21437_21447);
var ev__7943__auto___21449 = cljs.core.nth.call(null,vec__21438_21448,(0),null);
var func__7944__auto___21450 = cljs.core.nth.call(null,vec__21438_21448,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21449,func__7944__auto___21450);

var G__21451 = seq__21434_21444;
var G__21452 = chunk__21435_21445;
var G__21453 = count__21436_21446;
var G__21454 = (i__21437_21447 + (1));
seq__21434_21444 = G__21451;
chunk__21435_21445 = G__21452;
count__21436_21446 = G__21453;
i__21437_21447 = G__21454;
continue;
} else {
var temp__4657__auto___21455 = cljs.core.seq.call(null,seq__21434_21444);
if(temp__4657__auto___21455){
var seq__21434_21456__$1 = temp__4657__auto___21455;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__21434_21456__$1)){
var c__7604__auto___21457 = cljs.core.chunk_first.call(null,seq__21434_21456__$1);
var G__21458 = cljs.core.chunk_rest.call(null,seq__21434_21456__$1);
var G__21459 = c__7604__auto___21457;
var G__21460 = cljs.core.count.call(null,c__7604__auto___21457);
var G__21461 = (0);
seq__21434_21444 = G__21458;
chunk__21435_21445 = G__21459;
count__21436_21446 = G__21460;
i__21437_21447 = G__21461;
continue;
} else {
var vec__21441_21462 = cljs.core.first.call(null,seq__21434_21456__$1);
var ev__7943__auto___21463 = cljs.core.nth.call(null,vec__21441_21462,(0),null);
var func__7944__auto___21464 = cljs.core.nth.call(null,vec__21441_21462,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21463,func__7944__auto___21464);

var G__21465 = cljs.core.next.call(null,seq__21434_21456__$1);
var G__21466 = null;
var G__21467 = (0);
var G__21468 = (0);
seq__21434_21444 = G__21465;
chunk__21435_21445 = G__21466;
count__21436_21446 = G__21467;
i__21437_21447 = G__21468;
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
lt.objs.intro.changelog = (function lt$objs$intro$changelog(){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),"changelog"], null));
var seq__21479_21489 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (){
return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"version","version",425292698));
});})(e__7942__auto__))
], null)));
var chunk__21480_21490 = null;
var count__21481_21491 = (0);
var i__21482_21492 = (0);
while(true){
if((i__21482_21492 < count__21481_21491)){
var vec__21483_21493 = cljs.core._nth.call(null,chunk__21480_21490,i__21482_21492);
var ev__7943__auto___21494 = cljs.core.nth.call(null,vec__21483_21493,(0),null);
var func__7944__auto___21495 = cljs.core.nth.call(null,vec__21483_21493,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21494,func__7944__auto___21495);

var G__21496 = seq__21479_21489;
var G__21497 = chunk__21480_21490;
var G__21498 = count__21481_21491;
var G__21499 = (i__21482_21492 + (1));
seq__21479_21489 = G__21496;
chunk__21480_21490 = G__21497;
count__21481_21491 = G__21498;
i__21482_21492 = G__21499;
continue;
} else {
var temp__4657__auto___21500 = cljs.core.seq.call(null,seq__21479_21489);
if(temp__4657__auto___21500){
var seq__21479_21501__$1 = temp__4657__auto___21500;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__21479_21501__$1)){
var c__7604__auto___21502 = cljs.core.chunk_first.call(null,seq__21479_21501__$1);
var G__21503 = cljs.core.chunk_rest.call(null,seq__21479_21501__$1);
var G__21504 = c__7604__auto___21502;
var G__21505 = cljs.core.count.call(null,c__7604__auto___21502);
var G__21506 = (0);
seq__21479_21489 = G__21503;
chunk__21480_21490 = G__21504;
count__21481_21491 = G__21505;
i__21482_21492 = G__21506;
continue;
} else {
var vec__21486_21507 = cljs.core.first.call(null,seq__21479_21501__$1);
var ev__7943__auto___21508 = cljs.core.nth.call(null,vec__21486_21507,(0),null);
var func__7944__auto___21509 = cljs.core.nth.call(null,vec__21486_21507,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21508,func__7944__auto___21509);

var G__21510 = cljs.core.next.call(null,seq__21479_21501__$1);
var G__21511 = null;
var G__21512 = (0);
var G__21513 = (0);
seq__21479_21489 = G__21510;
chunk__21480_21490 = G__21511;
count__21481_21491 = G__21512;
i__21482_21492 = G__21513;
continue;
}
} else {
}
}
break;
}

return e__7942__auto__;
});
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.intro","intro","lt.objs.intro/intro",1763816217),new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"intro","intro",-886090599),null], null), null),new cljs.core.Keyword(null,"behaviors","behaviors",120724909),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("lt.objs.intro","on-close-destroy","lt.objs.intro/on-close-destroy",-1030395861)], null),new cljs.core.Keyword(null,"name","name",1843675177),"Welcome",new cljs.core.Keyword(null,"init","init",-1875481434),(function (this$){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#intro","div#intro",2114916473),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h1","h1",-1896887462),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"img","img",1442687358),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"height","height",1025178622),(40),new cljs.core.Keyword(null,"src","src",-1651076051),crate.binding.bound.call(null,lt.objs.style.styles,lt.objs.intro.__GT_lt_image)], null)], null)], null),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"Welcome to the latest version of Light Table. To see the full list of what's been added/changed, checkout the ",lt.objs.intro.changelog.call(null),".\n                          Some of the highlights include deeper Javascript support, inline browsers, and Python eval! If you're new, you might want to take a look at ",lt.objs.intro.docs.call(null)," to get started."], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"If you run into any problems, report the issue on ",lt.objs.intro.reports.call(null),"!"], null)], null);
}));
/**
 * 
 */
lt.objs.intro.__BEH__show_intro = (function lt$objs$intro$__BEH__show_intro(this$){
if(cljs.core.truth_(lt.objs.cli.args.call(null))){
return null;
} else {
var intro = lt.object.create.call(null,new cljs.core.Keyword("lt.objs.intro","intro","lt.objs.intro/intro",1763816217));
lt.util.dom.focus.call(null,lt.util.dom.$.call(null,new cljs.core.Keyword(null,"body","body",-2049205669)));

lt.objs.tabs.add_BANG_.call(null,intro);

return lt.objs.tabs.active_BANG_.call(null,intro);
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.intro","show-intro","lt.objs.intro/show-intro",474415364),new cljs.core.Keyword(null,"exclusive","exclusive",-1507998718),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("lt.objs.intro","show-new-file","lt.objs.intro/show-new-file",-466266179)], null),new cljs.core.Keyword(null,"desc","desc",2093485764),"App: Open the welcome screen when Light Table starts",new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"post-init","post-init",1539646468),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.intro.__BEH__show_intro);
/**
 * 
 */
lt.objs.intro.__BEH__show_new_file = (function lt$objs$intro$__BEH__show_new_file(this$){
if(cljs.core.truth_(lt.objs.cli.args.call(null))){
return null;
} else {
return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"new-file","new-file",1507201273));
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.intro","show-new-file","lt.objs.intro/show-new-file",-466266179),new cljs.core.Keyword(null,"exclusive","exclusive",-1507998718),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("lt.objs.intro","show-intro","lt.objs.intro/show-intro",474415364)], null),new cljs.core.Keyword(null,"desc","desc",2093485764),"App: Open a new file when Light Table starts",new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"post-init","post-init",1539646468),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.intro.__BEH__show_new_file);
