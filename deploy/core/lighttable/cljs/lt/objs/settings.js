// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.objs.settings');
goog.require('cljs.core');
goog.require('lt.objs.command');
goog.require('lt.objs.notifos');
goog.require('lt.objs.console');
goog.require('lt.objs.keyboard');
goog.require('lt.objs.editor');
goog.require('lt.object');
goog.require('lt.util.dom');
goog.require('lt.util.cljs');
goog.require('lt.objs.app');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.workspace');
goog.require('lt.objs.tabs');
goog.require('lt.objs.files');
goog.require('clojure.string');
goog.require('lt.objs.sidebar.command');
goog.require('cljs.reader');
lt.objs.settings.safe_read = (function lt$objs$settings$safe_read(s,file){
if(cljs.core.truth_(s)){
try{return cljs.reader.read_string.call(null,s);
}catch (e17184){var e = e17184;
lt.objs.console.error.call(null,[cljs.core.str("Invalid settings file: "),cljs.core.str(file),cljs.core.str("\n"),cljs.core.str(e)].join(''));

return null;
}} else {
return null;
}
});
lt.objs.settings._PLUS_behaviors = (function lt$objs$settings$_PLUS_behaviors(cur,m){
return cljs.core.assoc.call(null,cur,new cljs.core.Keyword(null,"+","+",1913524883),cljs.core.reduce.call(null,(function (res,p__17190){
var vec__17191 = p__17190;
var k = cljs.core.nth.call(null,vec__17191,(0),null);
var v = cljs.core.nth.call(null,vec__17191,(1),null);
return cljs.core.update_in.call(null,res,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [k], null),((function (vec__17191,k,v){
return (function (p1__17185_SHARP_){
return cljs.core.apply.call(null,cljs.core.conj,(function (){var or__6793__auto__ = p1__17185_SHARP_;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return cljs.core.List.EMPTY;
}
})(),v);
});})(vec__17191,k,v))
);
}),new cljs.core.Keyword(null,"+","+",1913524883).cljs$core$IFn$_invoke$arity$1(cur),m));
});
lt.objs.settings._behaviors = (function lt$objs$settings$_behaviors(cur,m){
return cljs.core.assoc.call(null,cur,new cljs.core.Keyword(null,"+","+",1913524883),cljs.core.reduce.call(null,(function (res,p__17204){
var vec__17205 = p__17204;
var k = cljs.core.nth.call(null,vec__17205,(0),null);
var v = cljs.core.nth.call(null,vec__17205,(1),null);
return cljs.core.update_in.call(null,res,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [k], null),((function (vec__17205,k,v){
return (function (p1__17194_SHARP_){
return cljs.core.remove.call(null,cljs.core.set.call(null,v),p1__17194_SHARP_);
});})(vec__17205,k,v))
);
}),new cljs.core.Keyword(null,"+","+",1913524883).cljs$core$IFn$_invoke$arity$1(cur),m),new cljs.core.Keyword(null,"-","-",-2112348439),cljs.core.reduce.call(null,(function (res,p__17208){
var vec__17209 = p__17208;
var k = cljs.core.nth.call(null,vec__17209,(0),null);
var v = cljs.core.nth.call(null,vec__17209,(1),null);
return cljs.core.update_in.call(null,res,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [k], null),((function (vec__17209,k,v){
return (function (p1__17195_SHARP_){
return cljs.core.apply.call(null,cljs.core.conj,(function (){var or__6793__auto__ = p1__17195_SHARP_;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return cljs.core.List.EMPTY;
}
})(),v);
});})(vec__17209,k,v))
);
}),new cljs.core.Keyword(null,"-","-",-2112348439).cljs$core$IFn$_invoke$arity$1(cur),m));
});
lt.objs.settings.behavior_diff = (function lt$objs$settings$behavior_diff(p__17212,final$){
var map__17215 = p__17212;
var map__17215__$1 = ((((!((map__17215 == null)))?((((map__17215.cljs$lang$protocol_mask$partition0$ & (64))) || (map__17215.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__17215):map__17215);
var diff = map__17215__$1;
var add = cljs.core.get.call(null,map__17215__$1,new cljs.core.Keyword(null,"+","+",1913524883));
var rem = cljs.core.get.call(null,map__17215__$1,new cljs.core.Keyword(null,"-","-",-2112348439));
if(cljs.core.not.call(null,diff)){
return final$;
} else {
return lt.objs.settings._behaviors.call(null,lt.objs.settings._PLUS_behaviors.call(null,final$,add),rem);
}
});
lt.objs.settings.reverse_diff = (function lt$objs$settings$reverse_diff(p__17217){
var map__17220 = p__17217;
var map__17220__$1 = ((((!((map__17220 == null)))?((((map__17220.cljs$lang$protocol_mask$partition0$ & (64))) || (map__17220.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__17220):map__17220);
var add = cljs.core.get.call(null,map__17220__$1,new cljs.core.Keyword(null,"+","+",1913524883));
var rem = cljs.core.get.call(null,map__17220__$1,new cljs.core.Keyword(null,"-","-",-2112348439));
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"+","+",1913524883),rem,new cljs.core.Keyword(null,"-","-",-2112348439),add], null);
});
lt.objs.settings.apply_diff = (function lt$objs$settings$apply_diff(diff){
var final$ = lt.objs.settings.behavior_diff.call(null,diff,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"+","+",1913524883),cljs.core.deref.call(null,lt.object.tags)], null));
return cljs.core.reset_BANG_.call(null,lt.object.tags,new cljs.core.Keyword(null,"+","+",1913524883).cljs$core$IFn$_invoke$arity$1(final$));
});
lt.objs.settings.keyword__GT_str = (function lt$objs$settings$keyword__GT_str(kw){
if((kw instanceof cljs.core.Keyword)){
return cljs.core.subs.call(null,[cljs.core.str(kw)].join(''),(1));
} else {
return kw;
}
});
lt.objs.settings.flat_behaviors__GT_map = (function lt$objs$settings$flat_behaviors__GT_map(flat){
var adds = {};
var removes = {};
var seq__17248_17266 = cljs.core.seq.call(null,flat);
var chunk__17250_17267 = null;
var count__17251_17268 = (0);
var i__17252_17269 = (0);
while(true){
if((i__17252_17269 < count__17251_17268)){
var vec__17254_17270 = cljs.core._nth.call(null,chunk__17250_17267,i__17252_17269);
var tag_17271 = cljs.core.nth.call(null,vec__17254_17270,(0),null);
var behavior_17272 = cljs.core.nth.call(null,vec__17254_17270,(1),null);
var all_17273 = vec__17254_17270;
var vec__17257_17274 = ((cljs.core._EQ_.call(null,(lt.objs.settings.keyword__GT_str.call(null,behavior_17272)[(0)]),"-"))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [removes,cljs.core.subs.call(null,lt.objs.settings.keyword__GT_str.call(null,behavior_17272),(1))], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [adds,lt.objs.settings.keyword__GT_str.call(null,behavior_17272)], null));
var coll_17275 = cljs.core.nth.call(null,vec__17257_17274,(0),null);
var behavior_17276__$1 = cljs.core.nth.call(null,vec__17257_17274,(1),null);
var tag_17277__$1 = lt.objs.settings.keyword__GT_str.call(null,tag_17271);
if(cljs.core.truth_((coll_17275[tag_17277__$1]))){
} else {
(coll_17275[tag_17277__$1] = []);
}

(coll_17275[tag_17277__$1]).push((((cljs.core.count.call(null,all_17273) > (2)))?cljs.core.conj.call(null,cljs.core.seq.call(null,cljs.core.subvec.call(null,all_17273,(2))),cljs.core.keyword.call(null,behavior_17276__$1)):cljs.core.keyword.call(null,behavior_17276__$1)));

var G__17278 = seq__17248_17266;
var G__17279 = chunk__17250_17267;
var G__17280 = count__17251_17268;
var G__17281 = (i__17252_17269 + (1));
seq__17248_17266 = G__17278;
chunk__17250_17267 = G__17279;
count__17251_17268 = G__17280;
i__17252_17269 = G__17281;
continue;
} else {
var temp__4657__auto___17282 = cljs.core.seq.call(null,seq__17248_17266);
if(temp__4657__auto___17282){
var seq__17248_17283__$1 = temp__4657__auto___17282;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__17248_17283__$1)){
var c__7604__auto___17284 = cljs.core.chunk_first.call(null,seq__17248_17283__$1);
var G__17285 = cljs.core.chunk_rest.call(null,seq__17248_17283__$1);
var G__17286 = c__7604__auto___17284;
var G__17287 = cljs.core.count.call(null,c__7604__auto___17284);
var G__17288 = (0);
seq__17248_17266 = G__17285;
chunk__17250_17267 = G__17286;
count__17251_17268 = G__17287;
i__17252_17269 = G__17288;
continue;
} else {
var vec__17260_17289 = cljs.core.first.call(null,seq__17248_17283__$1);
var tag_17290 = cljs.core.nth.call(null,vec__17260_17289,(0),null);
var behavior_17291 = cljs.core.nth.call(null,vec__17260_17289,(1),null);
var all_17292 = vec__17260_17289;
var vec__17263_17293 = ((cljs.core._EQ_.call(null,(lt.objs.settings.keyword__GT_str.call(null,behavior_17291)[(0)]),"-"))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [removes,cljs.core.subs.call(null,lt.objs.settings.keyword__GT_str.call(null,behavior_17291),(1))], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [adds,lt.objs.settings.keyword__GT_str.call(null,behavior_17291)], null));
var coll_17294 = cljs.core.nth.call(null,vec__17263_17293,(0),null);
var behavior_17295__$1 = cljs.core.nth.call(null,vec__17263_17293,(1),null);
var tag_17296__$1 = lt.objs.settings.keyword__GT_str.call(null,tag_17290);
if(cljs.core.truth_((coll_17294[tag_17296__$1]))){
} else {
(coll_17294[tag_17296__$1] = []);
}

(coll_17294[tag_17296__$1]).push((((cljs.core.count.call(null,all_17292) > (2)))?cljs.core.conj.call(null,cljs.core.seq.call(null,cljs.core.subvec.call(null,all_17292,(2))),cljs.core.keyword.call(null,behavior_17295__$1)):cljs.core.keyword.call(null,behavior_17295__$1)));

var G__17297 = cljs.core.next.call(null,seq__17248_17283__$1);
var G__17298 = null;
var G__17299 = (0);
var G__17300 = (0);
seq__17248_17266 = G__17297;
chunk__17250_17267 = G__17298;
count__17251_17268 = G__17299;
i__17252_17269 = G__17300;
continue;
}
} else {
}
}
break;
}

return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"+","+",1913524883),cljs.core.js__GT_clj.call(null,adds,new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true),new cljs.core.Keyword(null,"-","-",-2112348439),cljs.core.js__GT_clj.call(null,removes,new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true)], null);
});
lt.objs.settings.map__GT_flat_behaviors = (function lt$objs$settings$map__GT_flat_behaviors(behaviors_map){
var flat = [];
var seq__17347_17393 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"+","+",1913524883).cljs$core$IFn$_invoke$arity$1(behaviors_map));
var chunk__17355_17394 = null;
var count__17356_17395 = (0);
var i__17357_17396 = (0);
while(true){
if((i__17357_17396 < count__17356_17395)){
var vec__17365_17397 = cljs.core._nth.call(null,chunk__17355_17394,i__17357_17396);
var tag_17398 = cljs.core.nth.call(null,vec__17365_17397,(0),null);
var behs_17399 = cljs.core.nth.call(null,vec__17365_17397,(1),null);
var tag_vec_17400 = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [tag_17398], null);
var seq__17359_17401 = cljs.core.seq.call(null,behs_17399);
var chunk__17361_17402 = null;
var count__17362_17403 = (0);
var i__17363_17404 = (0);
while(true){
if((i__17363_17404 < count__17362_17403)){
var beh_17405 = cljs.core._nth.call(null,chunk__17361_17402,i__17363_17404);
var beh_17406__$1 = ((cljs.core.coll_QMARK_.call(null,beh_17405))?beh_17405:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [beh_17405], null));
flat.push(cljs.core.into.call(null,tag_vec_17400,beh_17406__$1));

var G__17407 = seq__17359_17401;
var G__17408 = chunk__17361_17402;
var G__17409 = count__17362_17403;
var G__17410 = (i__17363_17404 + (1));
seq__17359_17401 = G__17407;
chunk__17361_17402 = G__17408;
count__17362_17403 = G__17409;
i__17363_17404 = G__17410;
continue;
} else {
var temp__4657__auto___17411 = cljs.core.seq.call(null,seq__17359_17401);
if(temp__4657__auto___17411){
var seq__17359_17412__$1 = temp__4657__auto___17411;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__17359_17412__$1)){
var c__7604__auto___17413 = cljs.core.chunk_first.call(null,seq__17359_17412__$1);
var G__17414 = cljs.core.chunk_rest.call(null,seq__17359_17412__$1);
var G__17415 = c__7604__auto___17413;
var G__17416 = cljs.core.count.call(null,c__7604__auto___17413);
var G__17417 = (0);
seq__17359_17401 = G__17414;
chunk__17361_17402 = G__17415;
count__17362_17403 = G__17416;
i__17363_17404 = G__17417;
continue;
} else {
var beh_17418 = cljs.core.first.call(null,seq__17359_17412__$1);
var beh_17419__$1 = ((cljs.core.coll_QMARK_.call(null,beh_17418))?beh_17418:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [beh_17418], null));
flat.push(cljs.core.into.call(null,tag_vec_17400,beh_17419__$1));

var G__17420 = cljs.core.next.call(null,seq__17359_17412__$1);
var G__17421 = null;
var G__17422 = (0);
var G__17423 = (0);
seq__17359_17401 = G__17420;
chunk__17361_17402 = G__17421;
count__17362_17403 = G__17422;
i__17363_17404 = G__17423;
continue;
}
} else {
}
}
break;
}

var G__17424 = seq__17347_17393;
var G__17425 = chunk__17355_17394;
var G__17426 = count__17356_17395;
var G__17427 = (i__17357_17396 + (1));
seq__17347_17393 = G__17424;
chunk__17355_17394 = G__17425;
count__17356_17395 = G__17426;
i__17357_17396 = G__17427;
continue;
} else {
var temp__4657__auto___17428 = cljs.core.seq.call(null,seq__17347_17393);
if(temp__4657__auto___17428){
var seq__17347_17429__$1 = temp__4657__auto___17428;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__17347_17429__$1)){
var c__7604__auto___17430 = cljs.core.chunk_first.call(null,seq__17347_17429__$1);
var G__17431 = cljs.core.chunk_rest.call(null,seq__17347_17429__$1);
var G__17432 = c__7604__auto___17430;
var G__17433 = cljs.core.count.call(null,c__7604__auto___17430);
var G__17434 = (0);
seq__17347_17393 = G__17431;
chunk__17355_17394 = G__17432;
count__17356_17395 = G__17433;
i__17357_17396 = G__17434;
continue;
} else {
var vec__17368_17435 = cljs.core.first.call(null,seq__17347_17429__$1);
var tag_17436 = cljs.core.nth.call(null,vec__17368_17435,(0),null);
var behs_17437 = cljs.core.nth.call(null,vec__17368_17435,(1),null);
var tag_vec_17438 = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [tag_17436], null);
var seq__17349_17439 = cljs.core.seq.call(null,behs_17437);
var chunk__17351_17440 = null;
var count__17352_17441 = (0);
var i__17353_17442 = (0);
while(true){
if((i__17353_17442 < count__17352_17441)){
var beh_17443 = cljs.core._nth.call(null,chunk__17351_17440,i__17353_17442);
var beh_17444__$1 = ((cljs.core.coll_QMARK_.call(null,beh_17443))?beh_17443:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [beh_17443], null));
flat.push(cljs.core.into.call(null,tag_vec_17438,beh_17444__$1));

var G__17445 = seq__17349_17439;
var G__17446 = chunk__17351_17440;
var G__17447 = count__17352_17441;
var G__17448 = (i__17353_17442 + (1));
seq__17349_17439 = G__17445;
chunk__17351_17440 = G__17446;
count__17352_17441 = G__17447;
i__17353_17442 = G__17448;
continue;
} else {
var temp__4657__auto___17449__$1 = cljs.core.seq.call(null,seq__17349_17439);
if(temp__4657__auto___17449__$1){
var seq__17349_17450__$1 = temp__4657__auto___17449__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__17349_17450__$1)){
var c__7604__auto___17451 = cljs.core.chunk_first.call(null,seq__17349_17450__$1);
var G__17452 = cljs.core.chunk_rest.call(null,seq__17349_17450__$1);
var G__17453 = c__7604__auto___17451;
var G__17454 = cljs.core.count.call(null,c__7604__auto___17451);
var G__17455 = (0);
seq__17349_17439 = G__17452;
chunk__17351_17440 = G__17453;
count__17352_17441 = G__17454;
i__17353_17442 = G__17455;
continue;
} else {
var beh_17456 = cljs.core.first.call(null,seq__17349_17450__$1);
var beh_17457__$1 = ((cljs.core.coll_QMARK_.call(null,beh_17456))?beh_17456:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [beh_17456], null));
flat.push(cljs.core.into.call(null,tag_vec_17438,beh_17457__$1));

var G__17458 = cljs.core.next.call(null,seq__17349_17450__$1);
var G__17459 = null;
var G__17460 = (0);
var G__17461 = (0);
seq__17349_17439 = G__17458;
chunk__17351_17440 = G__17459;
count__17352_17441 = G__17460;
i__17353_17442 = G__17461;
continue;
}
} else {
}
}
break;
}

var G__17462 = cljs.core.next.call(null,seq__17347_17429__$1);
var G__17463 = null;
var G__17464 = (0);
var G__17465 = (0);
seq__17347_17393 = G__17462;
chunk__17355_17394 = G__17463;
count__17356_17395 = G__17464;
i__17357_17396 = G__17465;
continue;
}
} else {
}
}
break;
}

var seq__17371_17466 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"-","-",-2112348439).cljs$core$IFn$_invoke$arity$1(behaviors_map));
var chunk__17378_17467 = null;
var count__17379_17468 = (0);
var i__17380_17469 = (0);
while(true){
if((i__17380_17469 < count__17379_17468)){
var vec__17387_17470 = cljs.core._nth.call(null,chunk__17378_17467,i__17380_17469);
var tag_17471 = cljs.core.nth.call(null,vec__17387_17470,(0),null);
var behs_17472 = cljs.core.nth.call(null,vec__17387_17470,(1),null);
var seq__17381_17473 = cljs.core.seq.call(null,behs_17472);
var chunk__17383_17474 = null;
var count__17384_17475 = (0);
var i__17385_17476 = (0);
while(true){
if((i__17385_17476 < count__17384_17475)){
var beh_17477 = cljs.core._nth.call(null,chunk__17383_17474,i__17385_17476);
var beh_17478__$1 = ((cljs.core.coll_QMARK_.call(null,beh_17477))?beh_17477:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [beh_17477], null));
var tag_vec_17479 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tag_17471,cljs.core.keyword.call(null,[cljs.core.str("-"),cljs.core.str(lt.objs.settings.keyword__GT_str.call(null,cljs.core.first.call(null,beh_17478__$1)))].join(''))], null);
flat.push(cljs.core.into.call(null,tag_vec_17479,cljs.core.rest.call(null,beh_17478__$1)));

var G__17480 = seq__17381_17473;
var G__17481 = chunk__17383_17474;
var G__17482 = count__17384_17475;
var G__17483 = (i__17385_17476 + (1));
seq__17381_17473 = G__17480;
chunk__17383_17474 = G__17481;
count__17384_17475 = G__17482;
i__17385_17476 = G__17483;
continue;
} else {
var temp__4657__auto___17484 = cljs.core.seq.call(null,seq__17381_17473);
if(temp__4657__auto___17484){
var seq__17381_17485__$1 = temp__4657__auto___17484;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__17381_17485__$1)){
var c__7604__auto___17486 = cljs.core.chunk_first.call(null,seq__17381_17485__$1);
var G__17487 = cljs.core.chunk_rest.call(null,seq__17381_17485__$1);
var G__17488 = c__7604__auto___17486;
var G__17489 = cljs.core.count.call(null,c__7604__auto___17486);
var G__17490 = (0);
seq__17381_17473 = G__17487;
chunk__17383_17474 = G__17488;
count__17384_17475 = G__17489;
i__17385_17476 = G__17490;
continue;
} else {
var beh_17491 = cljs.core.first.call(null,seq__17381_17485__$1);
var beh_17492__$1 = ((cljs.core.coll_QMARK_.call(null,beh_17491))?beh_17491:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [beh_17491], null));
var tag_vec_17493 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tag_17471,cljs.core.keyword.call(null,[cljs.core.str("-"),cljs.core.str(lt.objs.settings.keyword__GT_str.call(null,cljs.core.first.call(null,beh_17492__$1)))].join(''))], null);
flat.push(cljs.core.into.call(null,tag_vec_17493,cljs.core.rest.call(null,beh_17492__$1)));

var G__17494 = cljs.core.next.call(null,seq__17381_17485__$1);
var G__17495 = null;
var G__17496 = (0);
var G__17497 = (0);
seq__17381_17473 = G__17494;
chunk__17383_17474 = G__17495;
count__17384_17475 = G__17496;
i__17385_17476 = G__17497;
continue;
}
} else {
}
}
break;
}

var G__17498 = seq__17371_17466;
var G__17499 = chunk__17378_17467;
var G__17500 = count__17379_17468;
var G__17501 = (i__17380_17469 + (1));
seq__17371_17466 = G__17498;
chunk__17378_17467 = G__17499;
count__17379_17468 = G__17500;
i__17380_17469 = G__17501;
continue;
} else {
var temp__4657__auto___17502 = cljs.core.seq.call(null,seq__17371_17466);
if(temp__4657__auto___17502){
var seq__17371_17503__$1 = temp__4657__auto___17502;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__17371_17503__$1)){
var c__7604__auto___17504 = cljs.core.chunk_first.call(null,seq__17371_17503__$1);
var G__17505 = cljs.core.chunk_rest.call(null,seq__17371_17503__$1);
var G__17506 = c__7604__auto___17504;
var G__17507 = cljs.core.count.call(null,c__7604__auto___17504);
var G__17508 = (0);
seq__17371_17466 = G__17505;
chunk__17378_17467 = G__17506;
count__17379_17468 = G__17507;
i__17380_17469 = G__17508;
continue;
} else {
var vec__17390_17509 = cljs.core.first.call(null,seq__17371_17503__$1);
var tag_17510 = cljs.core.nth.call(null,vec__17390_17509,(0),null);
var behs_17511 = cljs.core.nth.call(null,vec__17390_17509,(1),null);
var seq__17372_17512 = cljs.core.seq.call(null,behs_17511);
var chunk__17374_17513 = null;
var count__17375_17514 = (0);
var i__17376_17515 = (0);
while(true){
if((i__17376_17515 < count__17375_17514)){
var beh_17516 = cljs.core._nth.call(null,chunk__17374_17513,i__17376_17515);
var beh_17517__$1 = ((cljs.core.coll_QMARK_.call(null,beh_17516))?beh_17516:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [beh_17516], null));
var tag_vec_17518 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tag_17510,cljs.core.keyword.call(null,[cljs.core.str("-"),cljs.core.str(lt.objs.settings.keyword__GT_str.call(null,cljs.core.first.call(null,beh_17517__$1)))].join(''))], null);
flat.push(cljs.core.into.call(null,tag_vec_17518,cljs.core.rest.call(null,beh_17517__$1)));

var G__17519 = seq__17372_17512;
var G__17520 = chunk__17374_17513;
var G__17521 = count__17375_17514;
var G__17522 = (i__17376_17515 + (1));
seq__17372_17512 = G__17519;
chunk__17374_17513 = G__17520;
count__17375_17514 = G__17521;
i__17376_17515 = G__17522;
continue;
} else {
var temp__4657__auto___17523__$1 = cljs.core.seq.call(null,seq__17372_17512);
if(temp__4657__auto___17523__$1){
var seq__17372_17524__$1 = temp__4657__auto___17523__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__17372_17524__$1)){
var c__7604__auto___17525 = cljs.core.chunk_first.call(null,seq__17372_17524__$1);
var G__17526 = cljs.core.chunk_rest.call(null,seq__17372_17524__$1);
var G__17527 = c__7604__auto___17525;
var G__17528 = cljs.core.count.call(null,c__7604__auto___17525);
var G__17529 = (0);
seq__17372_17512 = G__17526;
chunk__17374_17513 = G__17527;
count__17375_17514 = G__17528;
i__17376_17515 = G__17529;
continue;
} else {
var beh_17530 = cljs.core.first.call(null,seq__17372_17524__$1);
var beh_17531__$1 = ((cljs.core.coll_QMARK_.call(null,beh_17530))?beh_17530:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [beh_17530], null));
var tag_vec_17532 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tag_17510,cljs.core.keyword.call(null,[cljs.core.str("-"),cljs.core.str(lt.objs.settings.keyword__GT_str.call(null,cljs.core.first.call(null,beh_17531__$1)))].join(''))], null);
flat.push(cljs.core.into.call(null,tag_vec_17532,cljs.core.rest.call(null,beh_17531__$1)));

var G__17533 = cljs.core.next.call(null,seq__17372_17524__$1);
var G__17534 = null;
var G__17535 = (0);
var G__17536 = (0);
seq__17372_17512 = G__17533;
chunk__17374_17513 = G__17534;
count__17375_17514 = G__17535;
i__17376_17515 = G__17536;
continue;
}
} else {
}
}
break;
}

var G__17537 = cljs.core.next.call(null,seq__17371_17503__$1);
var G__17538 = null;
var G__17539 = (0);
var G__17540 = (0);
seq__17371_17466 = G__17537;
chunk__17378_17467 = G__17538;
count__17379_17468 = G__17539;
i__17380_17469 = G__17540;
continue;
}
} else {
}
}
break;
}

return cljs.core.vec.call(null,cljs.core.sort_by.call(null,cljs.core.first,cljs.core.js__GT_clj.call(null,flat)));
});
lt.objs.settings.parse_behaviors = (function lt$objs$settings$parse_behaviors(behs,file){
if(cljs.core.map_QMARK_.call(null,behs)){
return behs;
} else {
if(cljs.core.vector_QMARK_.call(null,behs)){
return lt.objs.settings.flat_behaviors__GT_map.call(null,behs);
} else {
return lt.objs.console.error.call(null,[cljs.core.str("Invalid behaviors file: "),cljs.core.str(file),cljs.core.str(". Behaviors must be either a vector or a map.")].join(''));

}
}
});
lt.objs.settings.parse_file = (function lt$objs$settings$parse_file(file){
return lt.objs.settings.parse_behaviors.call(null,lt.objs.settings.safe_read.call(null,new cljs.core.Keyword(null,"content","content",15833224).cljs$core$IFn$_invoke$arity$1(lt.objs.files.open_sync.call(null,file)),file),file);
});
lt.objs.settings.pprint_flat_behaviors = (function lt$objs$settings$pprint_flat_behaviors(flat){
return [cljs.core.str(new cljs.core.Keyword(null,"str","str",1089608819).cljs$core$IFn$_invoke$arity$1(cljs.core.reduce.call(null,(function (result,cur){
var new_tag = cljs.core.first.call(null,cur);
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"str","str",1089608819),[cljs.core.str(new cljs.core.Keyword(null,"str","str",1089608819).cljs$core$IFn$_invoke$arity$1(result)),cljs.core.str(((!(cljs.core._EQ_.call(null,new_tag,new cljs.core.Keyword(null,"tag","tag",-1290361223).cljs$core$IFn$_invoke$arity$1(result))))?"\n":null)),cljs.core.str("\n "),cljs.core.str(cljs.core.pr_str.call(null,cur))].join(''),new cljs.core.Keyword(null,"tag","tag",-1290361223),new_tag], null);
}),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"tag","tag",-1290361223),cljs.core.first.call(null,cljs.core.first.call(null,flat)),new cljs.core.Keyword(null,"str","str",1089608819),"["], null),flat))),cljs.core.str("\n]")].join('');
});
lt.objs.settings.behavior_diffs_in = (function lt$objs$settings$behavior_diffs_in(path){
if(cljs.core.truth_(lt.objs.files.exists_QMARK_.call(null,path))){
return cljs.core.mapv.call(null,lt.objs.settings.parse_file,cljs.core.filter.call(null,(function (p1__17541_SHARP_){
return cljs.core._EQ_.call(null,lt.objs.files.ext.call(null,p1__17541_SHARP_),"behaviors");
}),lt.objs.files.full_path_ls.call(null,path)));
} else {
return null;
}
});
lt.objs.settings.load_all = (function lt$objs$settings$load_all(){
var final$ = cljs.core.reduce.call(null,(function (fin,cur){
return lt.objs.settings.behavior_diff.call(null,cur,fin);
}),cljs.core.PersistentArrayMap.EMPTY,cljs.core.concat.call(null,lt.object.raise_reduce.call(null,lt.objs.app.app,new cljs.core.Keyword(null,"behaviors.diffs.default+","behaviors.diffs.default+",-659027530),cljs.core.PersistentVector.EMPTY),lt.object.raise_reduce.call(null,lt.objs.app.app,new cljs.core.Keyword(null,"behaviors.diffs.plugin+","behaviors.diffs.plugin+",-195662477),cljs.core.PersistentVector.EMPTY),lt.object.raise_reduce.call(null,lt.objs.app.app,new cljs.core.Keyword(null,"behaviors.diffs.user+","behaviors.diffs.user+",-916482803),cljs.core.PersistentVector.EMPTY)));
var ws_diff = new cljs.core.Keyword(null,"ws-behaviors","ws-behaviors",-1322175278).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.workspace.current_ws));
var final$__$1 = (cljs.core.truth_((function (){var and__6781__auto__ = ws_diff;
if(cljs.core.truth_(and__6781__auto__)){
return !(cljs.core.empty_QMARK_.call(null,ws_diff));
} else {
return and__6781__auto__;
}
})())?lt.objs.settings.behavior_diff.call(null,lt.objs.settings.parse_behaviors.call(null,lt.objs.settings.safe_read.call(null,ws_diff,"workspace.behaviors"),"workspace.behaviors"),final$):final$);
cljs.core.reset_BANG_.call(null,lt.object.negated_tags,(function (){var or__6793__auto__ = new cljs.core.Keyword(null,"-","-",-2112348439).cljs$core$IFn$_invoke$arity$1(final$__$1);
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})());

return cljs.core.reset_BANG_.call(null,lt.object.tags,(function (){var or__6793__auto__ = new cljs.core.Keyword(null,"+","+",1913524883).cljs$core$IFn$_invoke$arity$1(final$__$1);
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})());
});
lt.objs.settings.refresh_all = (function lt$objs$settings$refresh_all(objs){
if(cljs.core.not.call(null,cljs.core.seq.call(null,objs))){
lt.object.raise.call(null,lt.objs.app.app,new cljs.core.Keyword(null,"behaviors.refreshed","behaviors.refreshed",-919120200));

return lt.objs.notifos.done_working.call(null,"Behaviors loaded");
} else {
try{lt.object.refresh_BANG_.call(null,cljs.core.first.call(null,objs));
}catch (e17543){var e_17544 = e17543;
lt.objs.console.error.call(null,e_17544);
}
return process.nextTick((function (){
return lt$objs$settings$refresh_all.call(null,cljs.core.next.call(null,objs));
}));
}
});
lt.objs.settings.refresh_diffed = (function lt$objs$settings$refresh_diffed(diff){
return lt.objs.settings.refresh_all.call(null,cljs.core.mapcat.call(null,lt.object.by_tag,cljs.core.concat.call(null,cljs.core.keys.call(null,new cljs.core.Keyword(null,"+","+",1913524883).cljs$core$IFn$_invoke$arity$1(diff)),cljs.core.keys.call(null,new cljs.core.Keyword(null,"-","-",-2112348439).cljs$core$IFn$_invoke$arity$1(diff)))));
});
lt.objs.settings.__GT_ordered_keystr = (function lt$objs$settings$__GT_ordered_keystr(k){
var char$ = ((cljs.core._EQ_.call(null,cljs.core.last.call(null,k),"-"))?"-":cljs.core.last.call(null,clojure.string.split.call(null,k,"-")));
return [cljs.core.str((cljs.core.truth_(lt.util.cljs.str_contains_QMARK_.call(null,k,"ctrl"))?"ctrl-":null)),cljs.core.str((cljs.core.truth_(lt.util.cljs.str_contains_QMARK_.call(null,k,"cmd"))?"cmd-":null)),cljs.core.str((cljs.core.truth_(lt.util.cljs.str_contains_QMARK_.call(null,k,"meta"))?"meta-":null)),cljs.core.str((cljs.core.truth_(lt.util.cljs.str_contains_QMARK_.call(null,k,"altgr"))?"altgr-":null)),cljs.core.str((cljs.core.truth_(lt.util.cljs.str_contains_QMARK_.call(null,k,"alt"))?"alt-":null)),cljs.core.str((cljs.core.truth_(lt.util.cljs.str_contains_QMARK_.call(null,k,"shift"))?"shift-":null)),cljs.core.str(char$)].join('');
});
lt.objs.settings.fix_key = (function lt$objs$settings$fix_key(k){
var k__$1 = clojure.string.replace.call(null,k,"pmeta",lt.objs.keyboard.meta);
var keys = clojure.string.split.call(null,k__$1," ");
return cljs.core.reduce.call(null,((function (k__$1,keys){
return (function (p1__17545_SHARP_,p2__17546_SHARP_){
return [cljs.core.str(p1__17545_SHARP_),cljs.core.str(" "),cljs.core.str(p2__17546_SHARP_)].join('');
});})(k__$1,keys))
,cljs.core.map.call(null,lt.objs.settings.__GT_ordered_keystr,keys));
});
lt.objs.settings.fix_key_entry = (function lt$objs$settings$fix_key_entry(p__17547){
var vec__17551 = p__17547;
var k = cljs.core.nth.call(null,vec__17551,(0),null);
var v = cljs.core.nth.call(null,vec__17551,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.objs.settings.fix_key.call(null,k),v], null);
});
lt.objs.settings._PLUS_keys = (function lt$objs$settings$_PLUS_keys(cur,m){
return cljs.core.reduce.call(null,(function (res,p__17559){
var vec__17560 = p__17559;
var k = cljs.core.nth.call(null,vec__17560,(0),null);
var v = cljs.core.nth.call(null,vec__17560,(1),null);
return cljs.core.update_in.call(null,res,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [k], null),((function (vec__17560,k,v){
return (function (p1__17554_SHARP_){
return cljs.core.into.call(null,(function (){var or__6793__auto__ = p1__17554_SHARP_;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})(),cljs.core.map.call(null,lt.objs.settings.fix_key_entry,v));
});})(vec__17560,k,v))
);
}),cur,m);
});
lt.objs.settings._keys = (function lt$objs$settings$_keys(cur,m){
return cljs.core.reduce.call(null,(function (res,p__17568){
var vec__17569 = p__17568;
var k = cljs.core.nth.call(null,vec__17569,(0),null);
var v = cljs.core.nth.call(null,vec__17569,(1),null);
return cljs.core.update_in.call(null,res,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [k], null),((function (vec__17569,k,v){
return (function (p1__17563_SHARP_){
return cljs.core.apply.call(null,cljs.core.dissoc,p1__17563_SHARP_,cljs.core.map.call(null,lt.objs.settings.fix_key,((cljs.core.map_QMARK_.call(null,v))?cljs.core.keys.call(null,v):v)));
});})(vec__17569,k,v))
);
}),cur,m);
});
lt.objs.settings.key_diff = (function lt$objs$settings$key_diff(p__17572,final$){
var map__17575 = p__17572;
var map__17575__$1 = ((((!((map__17575 == null)))?((((map__17575.cljs$lang$protocol_mask$partition0$ & (64))) || (map__17575.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__17575):map__17575);
var add = cljs.core.get.call(null,map__17575__$1,new cljs.core.Keyword(null,"+","+",1913524883));
var rem = cljs.core.get.call(null,map__17575__$1,new cljs.core.Keyword(null,"-","-",-2112348439));
return lt.objs.settings._PLUS_keys.call(null,lt.objs.settings._keys.call(null,final$,rem),add);
});
lt.objs.settings.load_all_keys = (function lt$objs$settings$load_all_keys(){
var final$ = cljs.core.reduce.call(null,(function (fin,cur){
return lt.objs.settings.key_diff.call(null,cur,fin);
}),cljs.core.PersistentArrayMap.EMPTY,cljs.core.concat.call(null,lt.object.raise_reduce.call(null,lt.objs.app.app,new cljs.core.Keyword(null,"keymap.diffs.default+","keymap.diffs.default+",-577617345),cljs.core.PersistentVector.EMPTY),lt.object.raise_reduce.call(null,lt.objs.app.app,new cljs.core.Keyword(null,"keymap.diffs.plugin+","keymap.diffs.plugin+",844114694),cljs.core.PersistentVector.EMPTY),lt.object.raise_reduce.call(null,lt.objs.app.app,new cljs.core.Keyword(null,"keymap.diffs.user+","keymap.diffs.user+",-435792044),cljs.core.PersistentVector.EMPTY)));
return cljs.core.reset_BANG_.call(null,lt.objs.keyboard.keys,final$);
});
/**
 * 
 */
lt.objs.settings.__BEH__default_behavior_diffs = (function lt$objs$settings$__BEH__default_behavior_diffs(this$,diffs){
return cljs.core.concat.call(null,diffs,lt.objs.settings.behavior_diffs_in.call(null,lt.objs.files.lt_home.call(null,"settings/default/")));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.settings","default-behavior-diffs","lt.objs.settings/default-behavior-diffs",1037819685),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"behaviors.diffs.default+","behaviors.diffs.default+",-659027530),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.settings.__BEH__default_behavior_diffs);
lt.objs.settings.user_plugin_dir = lt.objs.files.lt_user_dir.call(null,"User");
/**
 * 
 */
lt.objs.settings.__BEH__user_behavior_diffs = (function lt$objs$settings$__BEH__user_behavior_diffs(this$,diffs){
return cljs.core.concat.call(null,diffs,lt.objs.settings.behavior_diffs_in.call(null,lt.objs.settings.user_plugin_dir));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.settings","user-behavior-diffs","lt.objs.settings/user-behavior-diffs",-1762471677),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"behaviors.diffs.user+","behaviors.diffs.user+",-916482803),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.settings.__BEH__user_behavior_diffs);
/**
 * 
 */
lt.objs.settings.__BEH__initial_behaviors = (function lt$objs$settings$__BEH__initial_behaviors(this$){
if(cljs.core.truth_(lt.objs.files.exists_QMARK_.call(null,lt.objs.settings.user_plugin_dir))){
} else {
lt.objs.files.mkdir.call(null,lt.objs.settings.user_plugin_dir);
}

lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"pre-load","pre-load",-1239999613));

lt.objs.settings.load_all.call(null);

var seq__17581_17585 = cljs.core.seq.call(null,cljs.core.vals.call(null,cljs.core.deref.call(null,lt.object.instances)));
var chunk__17582_17586 = null;
var count__17583_17587 = (0);
var i__17584_17588 = (0);
while(true){
if((i__17584_17588 < count__17583_17587)){
var inst_17589 = cljs.core._nth.call(null,chunk__17582_17586,i__17584_17588);
lt.object.refresh_BANG_.call(null,inst_17589);

var G__17590 = seq__17581_17585;
var G__17591 = chunk__17582_17586;
var G__17592 = count__17583_17587;
var G__17593 = (i__17584_17588 + (1));
seq__17581_17585 = G__17590;
chunk__17582_17586 = G__17591;
count__17583_17587 = G__17592;
i__17584_17588 = G__17593;
continue;
} else {
var temp__4657__auto___17594 = cljs.core.seq.call(null,seq__17581_17585);
if(temp__4657__auto___17594){
var seq__17581_17595__$1 = temp__4657__auto___17594;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__17581_17595__$1)){
var c__7604__auto___17596 = cljs.core.chunk_first.call(null,seq__17581_17595__$1);
var G__17597 = cljs.core.chunk_rest.call(null,seq__17581_17595__$1);
var G__17598 = c__7604__auto___17596;
var G__17599 = cljs.core.count.call(null,c__7604__auto___17596);
var G__17600 = (0);
seq__17581_17585 = G__17597;
chunk__17582_17586 = G__17598;
count__17583_17587 = G__17599;
i__17584_17588 = G__17600;
continue;
} else {
var inst_17601 = cljs.core.first.call(null,seq__17581_17595__$1);
lt.object.refresh_BANG_.call(null,inst_17601);

var G__17602 = cljs.core.next.call(null,seq__17581_17595__$1);
var G__17603 = null;
var G__17604 = (0);
var G__17605 = (0);
seq__17581_17585 = G__17602;
chunk__17582_17586 = G__17603;
count__17583_17587 = G__17604;
i__17584_17588 = G__17605;
continue;
}
} else {
}
}
break;
}

lt.objs.settings.load_all_keys.call(null);

return lt.objs.keyboard.refresh.call(null);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.settings","initial-behaviors","lt.objs.settings/initial-behaviors",123075103),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"pre-init","pre-init",423602427),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.settings.__BEH__initial_behaviors);
/**
 * 
 */
lt.objs.settings.__BEH__load_behaviors = (function lt$objs$settings$__BEH__load_behaviors(this$){
lt.objs.notifos.working.call(null,"loading behaviors...");

lt.objs.settings.load_all.call(null);

return lt.objs.settings.refresh_all.call(null,cljs.core.vals.call(null,cljs.core.deref.call(null,lt.object.instances)));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.settings","load-behaviors","lt.objs.settings/load-behaviors",221558706),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"behaviors.reload","behaviors.reload",2130924967),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.settings.__BEH__load_behaviors);
/**
 * 
 */
lt.objs.settings.__BEH__eval_settings = (function lt$objs$settings$__BEH__eval_settings(ed){
return lt.object.raise.call(null,ed,new cljs.core.Keyword(null,"save","save",1850079149));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.settings","eval-settings","lt.objs.settings/eval-settings",-1273726011),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"eval.one","eval.one",-520903538),null,new cljs.core.Keyword(null,"eval","eval",-1103567905),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.settings.__BEH__eval_settings);
/**
 * 
 */
lt.objs.settings.__BEH__grab_workspace_behaviors = (function lt$objs$settings$__BEH__grab_workspace_behaviors(workspace,old){
var old__$1 = new cljs.core.Keyword(null,"ws-behaviors","ws-behaviors",-1322175278).cljs$core$IFn$_invoke$arity$1(old);
var old__$2 = ((cljs.core.empty_QMARK_.call(null,old__$1))?null:lt.objs.settings.parse_behaviors.call(null,cljs.reader.read_string.call(null,old__$1),"workspace.behaviors"));
var neue = new cljs.core.Keyword(null,"ws-behaviors","ws-behaviors",-1322175278).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,workspace));
var neue__$1 = ((cljs.core.empty_QMARK_.call(null,neue))?null:lt.objs.settings.parse_behaviors.call(null,cljs.reader.read_string.call(null,neue),"workspace.behaviors"));
if(cljs.core.truth_(old__$2)){
lt.objs.settings.apply_diff.call(null,lt.objs.settings.reverse_diff.call(null,old__$2));

lt.objs.settings.refresh_diffed.call(null,old__$2);
} else {
}

if(cljs.core.truth_(neue__$1)){
lt.objs.settings.apply_diff.call(null,neue__$1);

return lt.objs.settings.refresh_diffed.call(null,neue__$1);
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.settings","grab-workspace-behaviors","lt.objs.settings/grab-workspace-behaviors",1485506549),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"set","set",304602554),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.settings.__BEH__grab_workspace_behaviors);
/**
 * 
 */
lt.objs.settings.__BEH__workspace_save = (function lt$objs$settings$__BEH__workspace_save(editor){
var map__17608 = cljs.core.deref.call(null,editor).call(null,new cljs.core.Keyword(null,"info","info",-317069002));
var map__17608__$1 = ((((!((map__17608 == null)))?((((map__17608.cljs$lang$protocol_mask$partition0$ & (64))) || (map__17608.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__17608):map__17608);
var path = cljs.core.get.call(null,map__17608__$1,new cljs.core.Keyword(null,"path","path",-188191168));
var final$ = lt.object.raise_reduce.call(null,editor,new cljs.core.Keyword(null,"save+","save+",-787237961),lt.objs.editor.__GT_val.call(null,editor));
lt.object.merge_BANG_.call(null,lt.objs.workspace.current_ws,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"ws-behaviors","ws-behaviors",-1322175278),final$], null));

lt.object.merge_BANG_.call(null,editor,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"dirty","dirty",729553281),false], null));

lt.object.raise.call(null,editor,new cljs.core.Keyword(null,"saved","saved",288760660));

lt.object.raise.call(null,editor,new cljs.core.Keyword(null,"clean","clean",41534079));

return lt.object.raise.call(null,lt.objs.workspace.current_ws,new cljs.core.Keyword(null,"serialize!","serialize!",1684731051));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.settings","workspace-save","lt.objs.settings/workspace-save",-870129491),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"save","save",1850079149),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.settings.__BEH__workspace_save);
lt.objs.settings.user_behaviors_path = lt.objs.files.join.call(null,lt.objs.settings.user_plugin_dir,"user.behaviors");
lt.objs.settings.user_keymap_path = lt.objs.files.join.call(null,lt.objs.settings.user_plugin_dir,"user.keymap");
lt.objs.settings.user_cljs_path = lt.objs.files.join.call(null,lt.objs.settings.user_plugin_dir,"src","lt","plugins","user.cljs");
lt.objs.settings.user_plugin_paths = new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, ["user.behaviors","user.keymap","src","project.clj","plugin.edn","user_compiled.js"], null);
/**
 * 
 */
lt.objs.settings.__BEH__create_user_plugin = (function lt$objs$settings$__BEH__create_user_plugin(app){
var seq__17614 = cljs.core.seq.call(null,lt.objs.settings.user_plugin_paths);
var chunk__17615 = null;
var count__17616 = (0);
var i__17617 = (0);
while(true){
if((i__17617 < count__17616)){
var path = cljs.core._nth.call(null,chunk__17615,i__17617);
var full_path_17618 = lt.objs.files.join.call(null,lt.objs.settings.user_plugin_dir,path);
if(cljs.core.truth_(lt.objs.files.exists_QMARK_.call(null,full_path_17618))){
} else {
if(cljs.core.truth_((function (){var and__6781__auto__ = cljs.core.contains_QMARK_.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["user.behaviors",null,"user.keymap",null], null), null),path);
if(and__6781__auto__){
return lt.objs.files.exists_QMARK_.call(null,lt.objs.files.lt_user_dir.call(null,[cljs.core.str("/settings/"),cljs.core.str(path)].join('')));
} else {
return and__6781__auto__;
}
})())){
lt.objs.files.copy.call(null,lt.objs.files.lt_user_dir.call(null,[cljs.core.str("/settings/"),cljs.core.str(path)].join('')),full_path_17618);
} else {
lt.objs.files.copy.call(null,lt.objs.files.lt_home.call(null,lt.objs.files.join.call(null,"core","User",path)),full_path_17618);
}
}

var G__17619 = seq__17614;
var G__17620 = chunk__17615;
var G__17621 = count__17616;
var G__17622 = (i__17617 + (1));
seq__17614 = G__17619;
chunk__17615 = G__17620;
count__17616 = G__17621;
i__17617 = G__17622;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__17614);
if(temp__4657__auto__){
var seq__17614__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__17614__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__17614__$1);
var G__17623 = cljs.core.chunk_rest.call(null,seq__17614__$1);
var G__17624 = c__7604__auto__;
var G__17625 = cljs.core.count.call(null,c__7604__auto__);
var G__17626 = (0);
seq__17614 = G__17623;
chunk__17615 = G__17624;
count__17616 = G__17625;
i__17617 = G__17626;
continue;
} else {
var path = cljs.core.first.call(null,seq__17614__$1);
var full_path_17627 = lt.objs.files.join.call(null,lt.objs.settings.user_plugin_dir,path);
if(cljs.core.truth_(lt.objs.files.exists_QMARK_.call(null,full_path_17627))){
} else {
if(cljs.core.truth_((function (){var and__6781__auto__ = cljs.core.contains_QMARK_.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["user.behaviors",null,"user.keymap",null], null), null),path);
if(and__6781__auto__){
return lt.objs.files.exists_QMARK_.call(null,lt.objs.files.lt_user_dir.call(null,[cljs.core.str("/settings/"),cljs.core.str(path)].join('')));
} else {
return and__6781__auto__;
}
})())){
lt.objs.files.copy.call(null,lt.objs.files.lt_user_dir.call(null,[cljs.core.str("/settings/"),cljs.core.str(path)].join('')),full_path_17627);
} else {
lt.objs.files.copy.call(null,lt.objs.files.lt_home.call(null,lt.objs.files.join.call(null,"core","User",path)),full_path_17627);
}
}

var G__17628 = cljs.core.next.call(null,seq__17614__$1);
var G__17629 = null;
var G__17630 = (0);
var G__17631 = (0);
seq__17614 = G__17628;
chunk__17615 = G__17629;
count__17616 = G__17630;
i__17617 = G__17631;
continue;
}
} else {
return null;
}
}
break;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.settings","create-user-plugin","lt.objs.settings/create-user-plugin",791464501),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"create-user-plugin","create-user-plugin",1061956772),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.settings.__BEH__create_user_plugin);
/**
 * If the given keymap or behaviors file is in the old map format,
 *   backs it up and converts it to the flattened vec format.
 */
lt.objs.settings.convert_file = (function lt$objs$settings$convert_file(file){
var config = lt.objs.settings.safe_read.call(null,new cljs.core.Keyword(null,"content","content",15833224).cljs$core$IFn$_invoke$arity$1(lt.objs.files.open_sync.call(null,file)),file);
if(cljs.core.map_QMARK_.call(null,config)){
var backup_file = [cljs.core.str(file),cljs.core.str(".bak")].join('');
var _ = lt.objs.files.copy.call(null,file,backup_file);
var convert_fn = (function (){var G__17633 = lt.objs.files.ext.call(null,file);
switch (G__17633) {
case "keymap":
return lt.objs.settings.map__GT_flat_keymap;

break;
case "behaviors":
return lt.objs.settings.map__GT_flat_behaviors;

break;
default:
return cljs.core.identity;

}
})();
var body = [cljs.core.str(";; Your file has been converted to the new flat format.\n"),cljs.core.str(";; Conversion does not preserve comments or indentation.\n"),cljs.core.str(";; File is backed up at "),cljs.core.str(backup_file),cljs.core.str("\n"),cljs.core.str(lt.objs.settings.pprint_flat_behaviors.call(null,convert_fn.call(null,config)))].join('');
return lt.objs.files.save.call(null,file,body);
} else {
return null;
}
});
/**
 * 
 */
lt.objs.settings.__BEH__flatten_map_settings = (function lt$objs$settings$__BEH__flatten_map_settings(app){
var seq__17640 = cljs.core.seq.call(null,cljs.core.filter.call(null,(function (p1__17635_SHARP_){
return cljs.core.contains_QMARK_.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["keymap",null,"behaviors",null], null), null),lt.objs.files.ext.call(null,p1__17635_SHARP_));
}),lt.objs.files.full_path_ls.call(null,lt.objs.settings.user_plugin_dir)));
var chunk__17641 = null;
var count__17642 = (0);
var i__17643 = (0);
while(true){
if((i__17643 < count__17642)){
var file = cljs.core._nth.call(null,chunk__17641,i__17643);
lt.objs.settings.convert_file.call(null,file);

var G__17644 = seq__17640;
var G__17645 = chunk__17641;
var G__17646 = count__17642;
var G__17647 = (i__17643 + (1));
seq__17640 = G__17644;
chunk__17641 = G__17645;
count__17642 = G__17646;
i__17643 = G__17647;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__17640);
if(temp__4657__auto__){
var seq__17640__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__17640__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__17640__$1);
var G__17648 = cljs.core.chunk_rest.call(null,seq__17640__$1);
var G__17649 = c__7604__auto__;
var G__17650 = cljs.core.count.call(null,c__7604__auto__);
var G__17651 = (0);
seq__17640 = G__17648;
chunk__17641 = G__17649;
count__17642 = G__17650;
i__17643 = G__17651;
continue;
} else {
var file = cljs.core.first.call(null,seq__17640__$1);
lt.objs.settings.convert_file.call(null,file);

var G__17652 = cljs.core.next.call(null,seq__17640__$1);
var G__17653 = null;
var G__17654 = (0);
var G__17655 = (0);
seq__17640 = G__17652;
chunk__17641 = G__17653;
count__17642 = G__17654;
i__17643 = G__17655;
continue;
}
} else {
return null;
}
}
break;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.settings","flatten-map-settings","lt.objs.settings/flatten-map-settings",1596709618),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"flatten-map-settings","flatten-map-settings",772619331),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.settings.__BEH__flatten_map_settings);
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"behaviors.reload","behaviors.reload",2130924967),new cljs.core.Keyword(null,"desc","desc",2093485764),"App: Reload behaviors",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.object.raise.call(null,cljs.core.first.call(null,lt.object.by_tag.call(null,new cljs.core.Keyword(null,"app","app",-560961707))),new cljs.core.Keyword(null,"behaviors.reload","behaviors.reload",2130924967));
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"keymaps.reload","keymaps.reload",-244540607),new cljs.core.Keyword(null,"desc","desc",2093485764),"App: Reload keymaps",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
lt.objs.settings.load_all_keys.call(null);

lt.objs.keyboard.refresh.call(null);

lt.object.raise.call(null,cljs.core.first.call(null,lt.object.by_tag.call(null,new cljs.core.Keyword(null,"app","app",-560961707))),new cljs.core.Keyword(null,"app.keys.load","app.keys.load",-1717839792));

return lt.objs.notifos.set_msg_BANG_.call(null,"keys loaded");
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"behaviors.modify-user","behaviors.modify-user",-973902490),new cljs.core.Keyword(null,"desc","desc",2093485764),"Settings: User behaviors",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"open-path","open-path",2082525233),lt.objs.settings.user_behaviors_path);
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"behaviors.view-default","behaviors.view-default",116065479),new cljs.core.Keyword(null,"desc","desc",2093485764),"Settings: Default behaviors",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"open-path","open-path",2082525233),lt.objs.files.lt_home.call(null,"/settings/default/default.behaviors"));
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"behaviors.modify-workspace","behaviors.modify-workspace",835008819),new cljs.core.Keyword(null,"desc","desc",2093485764),"Settings: Workspace behaviors",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"opener.open-info","opener.open-info",1573577989),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"mime","mime",-1846414642),"text/x-clojure",new cljs.core.Keyword(null,"name","name",1843675177),"workspace.behaviors",new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"editor.behaviors","editor.behaviors",-661211790),new cljs.core.Keyword(null,"editor.behaviors.workspace","editor.behaviors.workspace",-713102198)], null),new cljs.core.Keyword(null,"content","content",15833224),new cljs.core.Keyword(null,"ws-behaviors","ws-behaviors",-1322175278).cljs$core$IFn$_invoke$arity$2(cljs.core.deref.call(null,lt.objs.workspace.current_ws),"")], null));
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"keymap.modify-user","keymap.modify-user",1194420785),new cljs.core.Keyword(null,"desc","desc",2093485764),"Settings: User keymap",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"open-path","open-path",2082525233),lt.objs.settings.user_keymap_path);
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"keymap.view-default","keymap.view-default",1416925645),new cljs.core.Keyword(null,"desc","desc",2093485764),"Settings: Default keymap",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"open-path","open-path",2082525233),lt.objs.files.lt_home.call(null,"/settings/default/default.keymap"));
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"user.modify-user","user.modify-user",-829072516),new cljs.core.Keyword(null,"desc","desc",2093485764),"Settings: User script",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"open-path","open-path",2082525233),lt.objs.settings.user_cljs_path);
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"user.add-user-plugin-to-workspace","user.add-user-plugin-to-workspace",-1906213797),new cljs.core.Keyword(null,"desc","desc",2093485764),"Settings: Add User plugin to workspace",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.object.raise.call(null,lt.objs.workspace.current_ws,new cljs.core.Keyword(null,"add.folder!","add.folder!",755480535),lt.objs.settings.user_plugin_dir);
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"convert-to-flat-format","convert-to-flat-format",-589692592),new cljs.core.Keyword(null,"desc","desc",2093485764),"Settings: Convert current file to flat format",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
return lt.objs.settings.convert_file.call(null,cljs.core.get_in.call(null,cljs.core.deref.call(null,lt.objs.editor.pool.last_active.call(null)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",-317069002),new cljs.core.Keyword(null,"path","path",-188191168)], null)));
})], null));
/**
 * 
 */
lt.objs.settings.__BEH__on_close_remove = (function lt$objs$settings$__BEH__on_close_remove(this$){
return lt.objs.tabs.rem_BANG_.call(null,this$);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.settings","on-close-remove","lt.objs.settings/on-close-remove",957814399),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"close","close",1835149582),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.settings.__BEH__on_close_remove);
lt.objs.settings.flat_keymap__GT_map = (function lt$objs$settings$flat_keymap__GT_map(flat){
var adds = {};
var removes = {};
var seq__17718_17772 = cljs.core.seq.call(null,flat);
var chunk__17720_17773 = null;
var count__17721_17774 = (0);
var i__17722_17775 = (0);
while(true){
if((i__17722_17775 < count__17721_17774)){
var vec__17724_17776 = cljs.core._nth.call(null,chunk__17720_17773,i__17722_17775);
var tag_17777 = cljs.core.nth.call(null,vec__17724_17776,(0),null);
var key_17778 = cljs.core.nth.call(null,vec__17724_17776,(1),null);
var all_17779 = vec__17724_17776;
var vec__17727_17780 = (((cljs.core._EQ_.call(null,(lt.objs.settings.keyword__GT_str.call(null,key_17778)[(0)]),"-")) && ((cljs.core.count.call(null,lt.objs.settings.keyword__GT_str.call(null,key_17778)) > (1))))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [removes,cljs.core.subs.call(null,lt.objs.settings.keyword__GT_str.call(null,key_17778),(1))], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [adds,lt.objs.settings.keyword__GT_str.call(null,key_17778)], null));
var coll_17781 = cljs.core.nth.call(null,vec__17727_17780,(0),null);
var key_17782__$1 = cljs.core.nth.call(null,vec__17727_17780,(1),null);
var remove_QMARK__17783 = (coll_17781 === removes);
var tag_17784__$1 = lt.objs.settings.keyword__GT_str.call(null,tag_17777);
if(cljs.core.truth_((coll_17781[tag_17784__$1]))){
} else {
(coll_17781[tag_17784__$1] = ((remove_QMARK__17783)?[]:{}));
}

if(remove_QMARK__17783){
(coll_17781[tag_17784__$1]).push(key_17782__$1);
} else {
((coll_17781[tag_17784__$1])[key_17782__$1] = cljs.core.subvec.call(null,all_17779,(2)));
}

var G__17785 = seq__17718_17772;
var G__17786 = chunk__17720_17773;
var G__17787 = count__17721_17774;
var G__17788 = (i__17722_17775 + (1));
seq__17718_17772 = G__17785;
chunk__17720_17773 = G__17786;
count__17721_17774 = G__17787;
i__17722_17775 = G__17788;
continue;
} else {
var temp__4657__auto___17789 = cljs.core.seq.call(null,seq__17718_17772);
if(temp__4657__auto___17789){
var seq__17718_17790__$1 = temp__4657__auto___17789;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__17718_17790__$1)){
var c__7604__auto___17791 = cljs.core.chunk_first.call(null,seq__17718_17790__$1);
var G__17792 = cljs.core.chunk_rest.call(null,seq__17718_17790__$1);
var G__17793 = c__7604__auto___17791;
var G__17794 = cljs.core.count.call(null,c__7604__auto___17791);
var G__17795 = (0);
seq__17718_17772 = G__17792;
chunk__17720_17773 = G__17793;
count__17721_17774 = G__17794;
i__17722_17775 = G__17795;
continue;
} else {
var vec__17732_17796 = cljs.core.first.call(null,seq__17718_17790__$1);
var tag_17797 = cljs.core.nth.call(null,vec__17732_17796,(0),null);
var key_17798 = cljs.core.nth.call(null,vec__17732_17796,(1),null);
var all_17799 = vec__17732_17796;
var vec__17735_17800 = (((cljs.core._EQ_.call(null,(lt.objs.settings.keyword__GT_str.call(null,key_17798)[(0)]),"-")) && ((cljs.core.count.call(null,lt.objs.settings.keyword__GT_str.call(null,key_17798)) > (1))))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [removes,cljs.core.subs.call(null,lt.objs.settings.keyword__GT_str.call(null,key_17798),(1))], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [adds,lt.objs.settings.keyword__GT_str.call(null,key_17798)], null));
var coll_17801 = cljs.core.nth.call(null,vec__17735_17800,(0),null);
var key_17802__$1 = cljs.core.nth.call(null,vec__17735_17800,(1),null);
var remove_QMARK__17803 = (coll_17801 === removes);
var tag_17804__$1 = lt.objs.settings.keyword__GT_str.call(null,tag_17797);
if(cljs.core.truth_((coll_17801[tag_17804__$1]))){
} else {
(coll_17801[tag_17804__$1] = ((remove_QMARK__17803)?[]:{}));
}

if(remove_QMARK__17803){
(coll_17801[tag_17804__$1]).push(key_17802__$1);
} else {
((coll_17801[tag_17804__$1])[key_17802__$1] = cljs.core.subvec.call(null,all_17799,(2)));
}

var G__17805 = cljs.core.next.call(null,seq__17718_17790__$1);
var G__17806 = null;
var G__17807 = (0);
var G__17808 = (0);
seq__17718_17772 = G__17805;
chunk__17720_17773 = G__17806;
count__17721_17774 = G__17807;
i__17722_17775 = G__17808;
continue;
}
} else {
}
}
break;
}

return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"+","+",1913524883),cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__7573__auto__ = ((function (adds,removes){
return (function lt$objs$settings$flat_keymap__GT_map_$_iter__17740(s__17741){
return (new cljs.core.LazySeq(null,((function (adds,removes){
return (function (){
var s__17741__$1 = s__17741;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__17741__$1);
if(temp__4657__auto__){
var s__17741__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__17741__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__17741__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__17743 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__17742 = (0);
while(true){
if((i__17742 < size__7572__auto__)){
var vec__17750 = cljs.core._nth.call(null,c__7571__auto__,i__17742);
var tag = cljs.core.nth.call(null,vec__17750,(0),null);
var keys = cljs.core.nth.call(null,vec__17750,(1),null);
cljs.core.chunk_append.call(null,b__17743,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword.call(null,tag),keys], null));

var G__17809 = (i__17742 + (1));
i__17742 = G__17809;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__17743),lt$objs$settings$flat_keymap__GT_map_$_iter__17740.call(null,cljs.core.chunk_rest.call(null,s__17741__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__17743),null);
}
} else {
var vec__17753 = cljs.core.first.call(null,s__17741__$2);
var tag = cljs.core.nth.call(null,vec__17753,(0),null);
var keys = cljs.core.nth.call(null,vec__17753,(1),null);
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword.call(null,tag),keys], null),lt$objs$settings$flat_keymap__GT_map_$_iter__17740.call(null,cljs.core.rest.call(null,s__17741__$2)));
}
} else {
return null;
}
break;
}
});})(adds,removes))
,null,null));
});})(adds,removes))
;
return iter__7573__auto__.call(null,cljs.core.js__GT_clj.call(null,adds));
})()),new cljs.core.Keyword(null,"-","-",-2112348439),cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__7573__auto__ = ((function (adds,removes){
return (function lt$objs$settings$flat_keymap__GT_map_$_iter__17756(s__17757){
return (new cljs.core.LazySeq(null,((function (adds,removes){
return (function (){
var s__17757__$1 = s__17757;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__17757__$1);
if(temp__4657__auto__){
var s__17757__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__17757__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__17757__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__17759 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__17758 = (0);
while(true){
if((i__17758 < size__7572__auto__)){
var vec__17766 = cljs.core._nth.call(null,c__7571__auto__,i__17758);
var tag = cljs.core.nth.call(null,vec__17766,(0),null);
var keys = cljs.core.nth.call(null,vec__17766,(1),null);
cljs.core.chunk_append.call(null,b__17759,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword.call(null,tag),keys], null));

var G__17810 = (i__17758 + (1));
i__17758 = G__17810;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__17759),lt$objs$settings$flat_keymap__GT_map_$_iter__17756.call(null,cljs.core.chunk_rest.call(null,s__17757__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__17759),null);
}
} else {
var vec__17769 = cljs.core.first.call(null,s__17757__$2);
var tag = cljs.core.nth.call(null,vec__17769,(0),null);
var keys = cljs.core.nth.call(null,vec__17769,(1),null);
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword.call(null,tag),keys], null),lt$objs$settings$flat_keymap__GT_map_$_iter__17756.call(null,cljs.core.rest.call(null,s__17757__$2)));
}
} else {
return null;
}
break;
}
});})(adds,removes))
,null,null));
});})(adds,removes))
;
return iter__7573__auto__.call(null,cljs.core.js__GT_clj.call(null,removes));
})())], null);
});
lt.objs.settings.map__GT_flat_keymap = (function lt$objs$settings$map__GT_flat_keymap(keymap){
var flat = [];
var seq__17879_17947 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"+","+",1913524883).cljs$core$IFn$_invoke$arity$1(keymap));
var chunk__17886_17948 = null;
var count__17887_17949 = (0);
var i__17888_17950 = (0);
while(true){
if((i__17888_17950 < count__17887_17949)){
var vec__17895_17951 = cljs.core._nth.call(null,chunk__17886_17948,i__17888_17950);
var tag_17952 = cljs.core.nth.call(null,vec__17895_17951,(0),null);
var keys_17953 = cljs.core.nth.call(null,vec__17895_17951,(1),null);
var seq__17889_17954 = cljs.core.seq.call(null,keys_17953);
var chunk__17891_17955 = null;
var count__17892_17956 = (0);
var i__17893_17957 = (0);
while(true){
if((i__17893_17957 < count__17892_17956)){
var vec__17898_17958 = cljs.core._nth.call(null,chunk__17891_17955,i__17893_17957);
var key_17959 = cljs.core.nth.call(null,vec__17898_17958,(0),null);
var commands_17960 = cljs.core.nth.call(null,vec__17898_17958,(1),null);
var tag_vec_17961 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tag_17952,key_17959], null);
flat.push(cljs.core.into.call(null,tag_vec_17961,commands_17960));

var G__17962 = seq__17889_17954;
var G__17963 = chunk__17891_17955;
var G__17964 = count__17892_17956;
var G__17965 = (i__17893_17957 + (1));
seq__17889_17954 = G__17962;
chunk__17891_17955 = G__17963;
count__17892_17956 = G__17964;
i__17893_17957 = G__17965;
continue;
} else {
var temp__4657__auto___17966 = cljs.core.seq.call(null,seq__17889_17954);
if(temp__4657__auto___17966){
var seq__17889_17967__$1 = temp__4657__auto___17966;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__17889_17967__$1)){
var c__7604__auto___17968 = cljs.core.chunk_first.call(null,seq__17889_17967__$1);
var G__17969 = cljs.core.chunk_rest.call(null,seq__17889_17967__$1);
var G__17970 = c__7604__auto___17968;
var G__17971 = cljs.core.count.call(null,c__7604__auto___17968);
var G__17972 = (0);
seq__17889_17954 = G__17969;
chunk__17891_17955 = G__17970;
count__17892_17956 = G__17971;
i__17893_17957 = G__17972;
continue;
} else {
var vec__17901_17973 = cljs.core.first.call(null,seq__17889_17967__$1);
var key_17974 = cljs.core.nth.call(null,vec__17901_17973,(0),null);
var commands_17975 = cljs.core.nth.call(null,vec__17901_17973,(1),null);
var tag_vec_17976 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tag_17952,key_17974], null);
flat.push(cljs.core.into.call(null,tag_vec_17976,commands_17975));

var G__17977 = cljs.core.next.call(null,seq__17889_17967__$1);
var G__17978 = null;
var G__17979 = (0);
var G__17980 = (0);
seq__17889_17954 = G__17977;
chunk__17891_17955 = G__17978;
count__17892_17956 = G__17979;
i__17893_17957 = G__17980;
continue;
}
} else {
}
}
break;
}

var G__17981 = seq__17879_17947;
var G__17982 = chunk__17886_17948;
var G__17983 = count__17887_17949;
var G__17984 = (i__17888_17950 + (1));
seq__17879_17947 = G__17981;
chunk__17886_17948 = G__17982;
count__17887_17949 = G__17983;
i__17888_17950 = G__17984;
continue;
} else {
var temp__4657__auto___17985 = cljs.core.seq.call(null,seq__17879_17947);
if(temp__4657__auto___17985){
var seq__17879_17986__$1 = temp__4657__auto___17985;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__17879_17986__$1)){
var c__7604__auto___17987 = cljs.core.chunk_first.call(null,seq__17879_17986__$1);
var G__17988 = cljs.core.chunk_rest.call(null,seq__17879_17986__$1);
var G__17989 = c__7604__auto___17987;
var G__17990 = cljs.core.count.call(null,c__7604__auto___17987);
var G__17991 = (0);
seq__17879_17947 = G__17988;
chunk__17886_17948 = G__17989;
count__17887_17949 = G__17990;
i__17888_17950 = G__17991;
continue;
} else {
var vec__17904_17992 = cljs.core.first.call(null,seq__17879_17986__$1);
var tag_17993 = cljs.core.nth.call(null,vec__17904_17992,(0),null);
var keys_17994 = cljs.core.nth.call(null,vec__17904_17992,(1),null);
var seq__17880_17995 = cljs.core.seq.call(null,keys_17994);
var chunk__17882_17996 = null;
var count__17883_17997 = (0);
var i__17884_17998 = (0);
while(true){
if((i__17884_17998 < count__17883_17997)){
var vec__17907_17999 = cljs.core._nth.call(null,chunk__17882_17996,i__17884_17998);
var key_18000 = cljs.core.nth.call(null,vec__17907_17999,(0),null);
var commands_18001 = cljs.core.nth.call(null,vec__17907_17999,(1),null);
var tag_vec_18002 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tag_17993,key_18000], null);
flat.push(cljs.core.into.call(null,tag_vec_18002,commands_18001));

var G__18003 = seq__17880_17995;
var G__18004 = chunk__17882_17996;
var G__18005 = count__17883_17997;
var G__18006 = (i__17884_17998 + (1));
seq__17880_17995 = G__18003;
chunk__17882_17996 = G__18004;
count__17883_17997 = G__18005;
i__17884_17998 = G__18006;
continue;
} else {
var temp__4657__auto___18007__$1 = cljs.core.seq.call(null,seq__17880_17995);
if(temp__4657__auto___18007__$1){
var seq__17880_18008__$1 = temp__4657__auto___18007__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__17880_18008__$1)){
var c__7604__auto___18009 = cljs.core.chunk_first.call(null,seq__17880_18008__$1);
var G__18010 = cljs.core.chunk_rest.call(null,seq__17880_18008__$1);
var G__18011 = c__7604__auto___18009;
var G__18012 = cljs.core.count.call(null,c__7604__auto___18009);
var G__18013 = (0);
seq__17880_17995 = G__18010;
chunk__17882_17996 = G__18011;
count__17883_17997 = G__18012;
i__17884_17998 = G__18013;
continue;
} else {
var vec__17910_18014 = cljs.core.first.call(null,seq__17880_18008__$1);
var key_18015 = cljs.core.nth.call(null,vec__17910_18014,(0),null);
var commands_18016 = cljs.core.nth.call(null,vec__17910_18014,(1),null);
var tag_vec_18017 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tag_17993,key_18015], null);
flat.push(cljs.core.into.call(null,tag_vec_18017,commands_18016));

var G__18018 = cljs.core.next.call(null,seq__17880_18008__$1);
var G__18019 = null;
var G__18020 = (0);
var G__18021 = (0);
seq__17880_17995 = G__18018;
chunk__17882_17996 = G__18019;
count__17883_17997 = G__18020;
i__17884_17998 = G__18021;
continue;
}
} else {
}
}
break;
}

var G__18022 = cljs.core.next.call(null,seq__17879_17986__$1);
var G__18023 = null;
var G__18024 = (0);
var G__18025 = (0);
seq__17879_17947 = G__18022;
chunk__17886_17948 = G__18023;
count__17887_17949 = G__18024;
i__17888_17950 = G__18025;
continue;
}
} else {
}
}
break;
}

var seq__17913_18026 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"-","-",-2112348439).cljs$core$IFn$_invoke$arity$1(keymap));
var chunk__17920_18027 = null;
var count__17921_18028 = (0);
var i__17922_18029 = (0);
while(true){
if((i__17922_18029 < count__17921_18028)){
var vec__17929_18030 = cljs.core._nth.call(null,chunk__17920_18027,i__17922_18029);
var tag_18031 = cljs.core.nth.call(null,vec__17929_18030,(0),null);
var keys_18032 = cljs.core.nth.call(null,vec__17929_18030,(1),null);
var seq__17923_18033 = cljs.core.seq.call(null,keys_18032);
var chunk__17925_18034 = null;
var count__17926_18035 = (0);
var i__17927_18036 = (0);
while(true){
if((i__17927_18036 < count__17926_18035)){
var key_18037 = cljs.core._nth.call(null,chunk__17925_18034,i__17927_18036);
var vec__17932_18038 = ((cljs.core.map_QMARK_.call(null,keys_18032))?key_18037:new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_18037,cljs.core.PersistentVector.EMPTY], null));
var key_18039__$1 = cljs.core.nth.call(null,vec__17932_18038,(0),null);
var command_18040 = cljs.core.nth.call(null,vec__17932_18038,(1),null);
var tag_vec_18041 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tag_18031,[cljs.core.str("-"),cljs.core.str(key_18039__$1)].join('')], null);
flat.push(cljs.core.into.call(null,tag_vec_18041,command_18040));

var G__18042 = seq__17923_18033;
var G__18043 = chunk__17925_18034;
var G__18044 = count__17926_18035;
var G__18045 = (i__17927_18036 + (1));
seq__17923_18033 = G__18042;
chunk__17925_18034 = G__18043;
count__17926_18035 = G__18044;
i__17927_18036 = G__18045;
continue;
} else {
var temp__4657__auto___18046 = cljs.core.seq.call(null,seq__17923_18033);
if(temp__4657__auto___18046){
var seq__17923_18047__$1 = temp__4657__auto___18046;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__17923_18047__$1)){
var c__7604__auto___18048 = cljs.core.chunk_first.call(null,seq__17923_18047__$1);
var G__18049 = cljs.core.chunk_rest.call(null,seq__17923_18047__$1);
var G__18050 = c__7604__auto___18048;
var G__18051 = cljs.core.count.call(null,c__7604__auto___18048);
var G__18052 = (0);
seq__17923_18033 = G__18049;
chunk__17925_18034 = G__18050;
count__17926_18035 = G__18051;
i__17927_18036 = G__18052;
continue;
} else {
var key_18053 = cljs.core.first.call(null,seq__17923_18047__$1);
var vec__17935_18054 = ((cljs.core.map_QMARK_.call(null,keys_18032))?key_18053:new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_18053,cljs.core.PersistentVector.EMPTY], null));
var key_18055__$1 = cljs.core.nth.call(null,vec__17935_18054,(0),null);
var command_18056 = cljs.core.nth.call(null,vec__17935_18054,(1),null);
var tag_vec_18057 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tag_18031,[cljs.core.str("-"),cljs.core.str(key_18055__$1)].join('')], null);
flat.push(cljs.core.into.call(null,tag_vec_18057,command_18056));

var G__18058 = cljs.core.next.call(null,seq__17923_18047__$1);
var G__18059 = null;
var G__18060 = (0);
var G__18061 = (0);
seq__17923_18033 = G__18058;
chunk__17925_18034 = G__18059;
count__17926_18035 = G__18060;
i__17927_18036 = G__18061;
continue;
}
} else {
}
}
break;
}

var G__18062 = seq__17913_18026;
var G__18063 = chunk__17920_18027;
var G__18064 = count__17921_18028;
var G__18065 = (i__17922_18029 + (1));
seq__17913_18026 = G__18062;
chunk__17920_18027 = G__18063;
count__17921_18028 = G__18064;
i__17922_18029 = G__18065;
continue;
} else {
var temp__4657__auto___18066 = cljs.core.seq.call(null,seq__17913_18026);
if(temp__4657__auto___18066){
var seq__17913_18067__$1 = temp__4657__auto___18066;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__17913_18067__$1)){
var c__7604__auto___18068 = cljs.core.chunk_first.call(null,seq__17913_18067__$1);
var G__18069 = cljs.core.chunk_rest.call(null,seq__17913_18067__$1);
var G__18070 = c__7604__auto___18068;
var G__18071 = cljs.core.count.call(null,c__7604__auto___18068);
var G__18072 = (0);
seq__17913_18026 = G__18069;
chunk__17920_18027 = G__18070;
count__17921_18028 = G__18071;
i__17922_18029 = G__18072;
continue;
} else {
var vec__17938_18073 = cljs.core.first.call(null,seq__17913_18067__$1);
var tag_18074 = cljs.core.nth.call(null,vec__17938_18073,(0),null);
var keys_18075 = cljs.core.nth.call(null,vec__17938_18073,(1),null);
var seq__17914_18076 = cljs.core.seq.call(null,keys_18075);
var chunk__17916_18077 = null;
var count__17917_18078 = (0);
var i__17918_18079 = (0);
while(true){
if((i__17918_18079 < count__17917_18078)){
var key_18080 = cljs.core._nth.call(null,chunk__17916_18077,i__17918_18079);
var vec__17941_18081 = ((cljs.core.map_QMARK_.call(null,keys_18075))?key_18080:new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_18080,cljs.core.PersistentVector.EMPTY], null));
var key_18082__$1 = cljs.core.nth.call(null,vec__17941_18081,(0),null);
var command_18083 = cljs.core.nth.call(null,vec__17941_18081,(1),null);
var tag_vec_18084 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tag_18074,[cljs.core.str("-"),cljs.core.str(key_18082__$1)].join('')], null);
flat.push(cljs.core.into.call(null,tag_vec_18084,command_18083));

var G__18085 = seq__17914_18076;
var G__18086 = chunk__17916_18077;
var G__18087 = count__17917_18078;
var G__18088 = (i__17918_18079 + (1));
seq__17914_18076 = G__18085;
chunk__17916_18077 = G__18086;
count__17917_18078 = G__18087;
i__17918_18079 = G__18088;
continue;
} else {
var temp__4657__auto___18089__$1 = cljs.core.seq.call(null,seq__17914_18076);
if(temp__4657__auto___18089__$1){
var seq__17914_18090__$1 = temp__4657__auto___18089__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__17914_18090__$1)){
var c__7604__auto___18091 = cljs.core.chunk_first.call(null,seq__17914_18090__$1);
var G__18092 = cljs.core.chunk_rest.call(null,seq__17914_18090__$1);
var G__18093 = c__7604__auto___18091;
var G__18094 = cljs.core.count.call(null,c__7604__auto___18091);
var G__18095 = (0);
seq__17914_18076 = G__18092;
chunk__17916_18077 = G__18093;
count__17917_18078 = G__18094;
i__17918_18079 = G__18095;
continue;
} else {
var key_18096 = cljs.core.first.call(null,seq__17914_18090__$1);
var vec__17944_18097 = ((cljs.core.map_QMARK_.call(null,keys_18075))?key_18096:new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_18096,cljs.core.PersistentVector.EMPTY], null));
var key_18098__$1 = cljs.core.nth.call(null,vec__17944_18097,(0),null);
var command_18099 = cljs.core.nth.call(null,vec__17944_18097,(1),null);
var tag_vec_18100 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tag_18074,[cljs.core.str("-"),cljs.core.str(key_18098__$1)].join('')], null);
flat.push(cljs.core.into.call(null,tag_vec_18100,command_18099));

var G__18101 = cljs.core.next.call(null,seq__17914_18090__$1);
var G__18102 = null;
var G__18103 = (0);
var G__18104 = (0);
seq__17914_18076 = G__18101;
chunk__17916_18077 = G__18102;
count__17917_18078 = G__18103;
i__17918_18079 = G__18104;
continue;
}
} else {
}
}
break;
}

var G__18105 = cljs.core.next.call(null,seq__17913_18067__$1);
var G__18106 = null;
var G__18107 = (0);
var G__18108 = (0);
seq__17913_18026 = G__18105;
chunk__17920_18027 = G__18106;
count__17921_18028 = G__18107;
i__17922_18029 = G__18108;
continue;
}
} else {
}
}
break;
}

return cljs.core.vec.call(null,cljs.core.sort_by.call(null,cljs.core.first,cljs.core.js__GT_clj.call(null,flat)));
});
lt.objs.settings.parse_key_file = (function lt$objs$settings$parse_key_file(file){
var keys = lt.objs.settings.safe_read.call(null,new cljs.core.Keyword(null,"content","content",15833224).cljs$core$IFn$_invoke$arity$1(lt.objs.files.open_sync.call(null,file)),file);
if(cljs.core.map_QMARK_.call(null,keys)){
return keys;
} else {
if(cljs.core.vector_QMARK_.call(null,keys)){
return lt.objs.settings.flat_keymap__GT_map.call(null,keys);
} else {
return lt.objs.console.error.call(null,[cljs.core.str("Invalid keymap file: "),cljs.core.str(file),cljs.core.str(". Keymaps must be either a vector or a map.")].join(''));

}
}
});
lt.objs.settings.keymap_diffs_in = (function lt$objs$settings$keymap_diffs_in(path){
if(cljs.core.truth_(lt.objs.files.exists_QMARK_.call(null,path))){
return cljs.core.map.call(null,lt.objs.settings.parse_key_file,cljs.core.filter.call(null,(function (p1__18109_SHARP_){
return cljs.core._EQ_.call(null,lt.objs.files.ext.call(null,p1__18109_SHARP_),"keymap");
}),lt.objs.files.full_path_ls.call(null,path)));
} else {
return null;
}
});
/**
 * 
 */
lt.objs.settings.__BEH__default_keymap_diffs = (function lt$objs$settings$__BEH__default_keymap_diffs(this$,diffs){
return cljs.core.concat.call(null,diffs,lt.objs.settings.keymap_diffs_in.call(null,lt.objs.files.lt_home.call(null,"/settings/default/")));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.settings","default-keymap-diffs","lt.objs.settings/default-keymap-diffs",-637119362),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keymap.diffs.default+","keymap.diffs.default+",-577617345),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.settings.__BEH__default_keymap_diffs);
/**
 * 
 */
lt.objs.settings.__BEH__user_keymap_diffs = (function lt$objs$settings$__BEH__user_keymap_diffs(this$,diffs){
return cljs.core.concat.call(null,diffs,lt.objs.settings.keymap_diffs_in.call(null,lt.objs.settings.user_plugin_dir));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.settings","user-keymap-diffs","lt.objs.settings/user-keymap-diffs",-874328542),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keymap.diffs.user+","keymap.diffs.user+",-435792044),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.settings.__BEH__user_keymap_diffs);
lt.objs.settings.pair_keybindings = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.keys.normal","editor.keys.normal",-1649567699),new cljs.core.PersistentArrayMap(null, 7, ["\"",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Keyword(null,"editor.repeat-pair","editor.repeat-pair",-1356015822),"\"")], null),"(",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Keyword(null,"editor.open-pair","editor.open-pair",1089086685),"(")], null),")",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Keyword(null,"editor.close-pair","editor.close-pair",-1826198933),")")], null),"[",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Keyword(null,"editor.open-pair","editor.open-pair",1089086685),"[")], null),"{",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Keyword(null,"editor.open-pair","editor.open-pair",1089086685),"{")], null),"]",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Keyword(null,"editor.close-pair","editor.close-pair",-1826198933),"]")], null),"}",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Keyword(null,"editor.close-pair","editor.close-pair",-1826198933),"}")], null)], null)], null);
/**
 * 
 */
lt.objs.settings.__BEH__pair_keymap_diffs = (function lt$objs$settings$__BEH__pair_keymap_diffs(this$,diffs){
lt.objs.console.error.call(null,[cljs.core.str("[:app "),cljs.core.str(new cljs.core.Keyword("lt.objs.settings","pair-keymap-diffs","lt.objs.settings/pair-keymap-diffs",1514941387)),cljs.core.str("] is deprecated and will be removed in 0.9.0. Use [:editor :lt.objs.editor/autoclose-brackets] instead")].join(''));

return cljs.core.concat.call(null,diffs,(function (){var x__7627__auto__ = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"+","+",1913524883),lt.objs.settings.pair_keybindings], null);
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})());
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.settings","pair-keymap-diffs","lt.objs.settings/pair-keymap-diffs",1514941387),new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: auto-close parens/brackets/quotes/pairs",new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keymap.diffs.user+","keymap.diffs.user+",-435792044),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.settings.__BEH__pair_keymap_diffs);
/**
 * 
 */
lt.objs.settings.__BEH__on_behaviors_editor_save = (function lt$objs$settings$__BEH__on_behaviors_editor_save(editor){
return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"behaviors.reload","behaviors.reload",2130924967));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.settings","on-behaviors-editor-save","lt.objs.settings/on-behaviors-editor-save",460771607),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"saved","saved",288760660),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.settings.__BEH__on_behaviors_editor_save);
/**
 * 
 */
lt.objs.settings.__BEH__on_keymap_editor_save = (function lt$objs$settings$__BEH__on_keymap_editor_save(editor){
return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"keymaps.reload","keymaps.reload",-244540607));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.settings","on-keymap-editor-save","lt.objs.settings/on-keymap-editor-save",-1115486601),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"saved","saved",288760660),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.settings.__BEH__on_keymap_editor_save);
lt.object.tag_behaviors.call(null,new cljs.core.Keyword(null,"app","app",-560961707),new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("lt.objs.settings","initial-behaviors","lt.objs.settings/initial-behaviors",123075103),new cljs.core.Keyword("lt.objs.settings","create-user-plugin","lt.objs.settings/create-user-plugin",791464501),new cljs.core.Keyword("lt.objs.settings","flatten-map-settings","lt.objs.settings/flatten-map-settings",1596709618),new cljs.core.Keyword("lt.objs.settings","load-behaviors","lt.objs.settings/load-behaviors",221558706),new cljs.core.Keyword("lt.objs.settings","default-behavior-diffs","lt.objs.settings/default-behavior-diffs",1037819685),new cljs.core.Keyword("lt.objs.settings","user-behavior-diffs","lt.objs.settings/user-behavior-diffs",-1762471677),new cljs.core.Keyword("lt.objs.settings","default-keymap-diffs","lt.objs.settings/default-keymap-diffs",-637119362),new cljs.core.Keyword("lt.objs.settings","user-keymap-diffs","lt.objs.settings/user-keymap-diffs",-874328542)], null));
