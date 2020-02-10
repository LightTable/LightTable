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
var seq__21397_21407 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (){
return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"show-docs","show-docs",-332260169));
});})(e__7942__auto__))
], null)));
var chunk__21398_21408 = null;
var count__21399_21409 = (0);
var i__21400_21410 = (0);
while(true){
if((i__21400_21410 < count__21399_21409)){
var vec__21401_21411 = cljs.core._nth.call(null,chunk__21398_21408,i__21400_21410);
var ev__7943__auto___21412 = cljs.core.nth.call(null,vec__21401_21411,(0),null);
var func__7944__auto___21413 = cljs.core.nth.call(null,vec__21401_21411,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21412,func__7944__auto___21413);

var G__21414 = seq__21397_21407;
var G__21415 = chunk__21398_21408;
var G__21416 = count__21399_21409;
var G__21417 = (i__21400_21410 + (1));
seq__21397_21407 = G__21414;
chunk__21398_21408 = G__21415;
count__21399_21409 = G__21416;
i__21400_21410 = G__21417;
continue;
} else {
var temp__4657__auto___21418 = cljs.core.seq.call(null,seq__21397_21407);
if(temp__4657__auto___21418){
var seq__21397_21419__$1 = temp__4657__auto___21418;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__21397_21419__$1)){
var c__7604__auto___21420 = cljs.core.chunk_first.call(null,seq__21397_21419__$1);
var G__21421 = cljs.core.chunk_rest.call(null,seq__21397_21419__$1);
var G__21422 = c__7604__auto___21420;
var G__21423 = cljs.core.count.call(null,c__7604__auto___21420);
var G__21424 = (0);
seq__21397_21407 = G__21421;
chunk__21398_21408 = G__21422;
count__21399_21409 = G__21423;
i__21400_21410 = G__21424;
continue;
} else {
var vec__21404_21425 = cljs.core.first.call(null,seq__21397_21419__$1);
var ev__7943__auto___21426 = cljs.core.nth.call(null,vec__21404_21425,(0),null);
var func__7944__auto___21427 = cljs.core.nth.call(null,vec__21404_21425,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21426,func__7944__auto___21427);

var G__21428 = cljs.core.next.call(null,seq__21397_21419__$1);
var G__21429 = null;
var G__21430 = (0);
var G__21431 = (0);
seq__21397_21407 = G__21428;
chunk__21398_21408 = G__21429;
count__21399_21409 = G__21430;
i__21400_21410 = G__21431;
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
var seq__21442_21452 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (){
return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"add-browser-tab","add-browser-tab",612625027),"https://github.com/LightTable/LightTable/issues?state=open");
});})(e__7942__auto__))
], null)));
var chunk__21443_21453 = null;
var count__21444_21454 = (0);
var i__21445_21455 = (0);
while(true){
if((i__21445_21455 < count__21444_21454)){
var vec__21446_21456 = cljs.core._nth.call(null,chunk__21443_21453,i__21445_21455);
var ev__7943__auto___21457 = cljs.core.nth.call(null,vec__21446_21456,(0),null);
var func__7944__auto___21458 = cljs.core.nth.call(null,vec__21446_21456,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21457,func__7944__auto___21458);

var G__21459 = seq__21442_21452;
var G__21460 = chunk__21443_21453;
var G__21461 = count__21444_21454;
var G__21462 = (i__21445_21455 + (1));
seq__21442_21452 = G__21459;
chunk__21443_21453 = G__21460;
count__21444_21454 = G__21461;
i__21445_21455 = G__21462;
continue;
} else {
var temp__4657__auto___21463 = cljs.core.seq.call(null,seq__21442_21452);
if(temp__4657__auto___21463){
var seq__21442_21464__$1 = temp__4657__auto___21463;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__21442_21464__$1)){
var c__7604__auto___21465 = cljs.core.chunk_first.call(null,seq__21442_21464__$1);
var G__21466 = cljs.core.chunk_rest.call(null,seq__21442_21464__$1);
var G__21467 = c__7604__auto___21465;
var G__21468 = cljs.core.count.call(null,c__7604__auto___21465);
var G__21469 = (0);
seq__21442_21452 = G__21466;
chunk__21443_21453 = G__21467;
count__21444_21454 = G__21468;
i__21445_21455 = G__21469;
continue;
} else {
var vec__21449_21470 = cljs.core.first.call(null,seq__21442_21464__$1);
var ev__7943__auto___21471 = cljs.core.nth.call(null,vec__21449_21470,(0),null);
var func__7944__auto___21472 = cljs.core.nth.call(null,vec__21449_21470,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21471,func__7944__auto___21472);

var G__21473 = cljs.core.next.call(null,seq__21442_21464__$1);
var G__21474 = null;
var G__21475 = (0);
var G__21476 = (0);
seq__21442_21452 = G__21473;
chunk__21443_21453 = G__21474;
count__21444_21454 = G__21475;
i__21445_21455 = G__21476;
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
var seq__21487_21497 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (){
return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"version","version",425292698));
});})(e__7942__auto__))
], null)));
var chunk__21488_21498 = null;
var count__21489_21499 = (0);
var i__21490_21500 = (0);
while(true){
if((i__21490_21500 < count__21489_21499)){
var vec__21491_21501 = cljs.core._nth.call(null,chunk__21488_21498,i__21490_21500);
var ev__7943__auto___21502 = cljs.core.nth.call(null,vec__21491_21501,(0),null);
var func__7944__auto___21503 = cljs.core.nth.call(null,vec__21491_21501,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21502,func__7944__auto___21503);

var G__21504 = seq__21487_21497;
var G__21505 = chunk__21488_21498;
var G__21506 = count__21489_21499;
var G__21507 = (i__21490_21500 + (1));
seq__21487_21497 = G__21504;
chunk__21488_21498 = G__21505;
count__21489_21499 = G__21506;
i__21490_21500 = G__21507;
continue;
} else {
var temp__4657__auto___21508 = cljs.core.seq.call(null,seq__21487_21497);
if(temp__4657__auto___21508){
var seq__21487_21509__$1 = temp__4657__auto___21508;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__21487_21509__$1)){
var c__7604__auto___21510 = cljs.core.chunk_first.call(null,seq__21487_21509__$1);
var G__21511 = cljs.core.chunk_rest.call(null,seq__21487_21509__$1);
var G__21512 = c__7604__auto___21510;
var G__21513 = cljs.core.count.call(null,c__7604__auto___21510);
var G__21514 = (0);
seq__21487_21497 = G__21511;
chunk__21488_21498 = G__21512;
count__21489_21499 = G__21513;
i__21490_21500 = G__21514;
continue;
} else {
var vec__21494_21515 = cljs.core.first.call(null,seq__21487_21509__$1);
var ev__7943__auto___21516 = cljs.core.nth.call(null,vec__21494_21515,(0),null);
var func__7944__auto___21517 = cljs.core.nth.call(null,vec__21494_21515,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___21516,func__7944__auto___21517);

var G__21518 = cljs.core.next.call(null,seq__21487_21509__$1);
var G__21519 = null;
var G__21520 = (0);
var G__21521 = (0);
seq__21487_21497 = G__21518;
chunk__21488_21498 = G__21519;
count__21489_21499 = G__21520;
i__21490_21500 = G__21521;
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
