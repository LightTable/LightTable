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
}catch (e17182){var e = e17182;
lt.objs.console.error.call(null,[cljs.core.str("Invalid settings file: "),cljs.core.str(file),cljs.core.str("\n"),cljs.core.str(e)].join(''));

return null;
}} else {
return null;
}
});
lt.objs.settings._PLUS_behaviors = (function lt$objs$settings$_PLUS_behaviors(cur,m){
return cljs.core.assoc.call(null,cur,new cljs.core.Keyword(null,"+","+",1913524883),cljs.core.reduce.call(null,(function (res,p__17188){
var vec__17189 = p__17188;
var k = cljs.core.nth.call(null,vec__17189,(0),null);
var v = cljs.core.nth.call(null,vec__17189,(1),null);
return cljs.core.update_in.call(null,res,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [k], null),((function (vec__17189,k,v){
return (function (p1__17183_SHARP_){
return cljs.core.apply.call(null,cljs.core.conj,(function (){var or__6793__auto__ = p1__17183_SHARP_;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return cljs.core.List.EMPTY;
}
})(),v);
});})(vec__17189,k,v))
);
}),new cljs.core.Keyword(null,"+","+",1913524883).cljs$core$IFn$_invoke$arity$1(cur),m));
});
lt.objs.settings._behaviors = (function lt$objs$settings$_behaviors(cur,m){
return cljs.core.assoc.call(null,cur,new cljs.core.Keyword(null,"+","+",1913524883),cljs.core.reduce.call(null,(function (res,p__17202){
var vec__17203 = p__17202;
var k = cljs.core.nth.call(null,vec__17203,(0),null);
var v = cljs.core.nth.call(null,vec__17203,(1),null);
return cljs.core.update_in.call(null,res,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [k], null),((function (vec__17203,k,v){
return (function (p1__17192_SHARP_){
return cljs.core.remove.call(null,cljs.core.set.call(null,v),p1__17192_SHARP_);
});})(vec__17203,k,v))
);
}),new cljs.core.Keyword(null,"+","+",1913524883).cljs$core$IFn$_invoke$arity$1(cur),m),new cljs.core.Keyword(null,"-","-",-2112348439),cljs.core.reduce.call(null,(function (res,p__17206){
var vec__17207 = p__17206;
var k = cljs.core.nth.call(null,vec__17207,(0),null);
var v = cljs.core.nth.call(null,vec__17207,(1),null);
return cljs.core.update_in.call(null,res,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [k], null),((function (vec__17207,k,v){
return (function (p1__17193_SHARP_){
return cljs.core.apply.call(null,cljs.core.conj,(function (){var or__6793__auto__ = p1__17193_SHARP_;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return cljs.core.List.EMPTY;
}
})(),v);
});})(vec__17207,k,v))
);
}),new cljs.core.Keyword(null,"-","-",-2112348439).cljs$core$IFn$_invoke$arity$1(cur),m));
});
lt.objs.settings.behavior_diff = (function lt$objs$settings$behavior_diff(p__17210,final$){
var map__17213 = p__17210;
var map__17213__$1 = ((((!((map__17213 == null)))?((((map__17213.cljs$lang$protocol_mask$partition0$ & (64))) || (map__17213.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__17213):map__17213);
var diff = map__17213__$1;
var add = cljs.core.get.call(null,map__17213__$1,new cljs.core.Keyword(null,"+","+",1913524883));
var rem = cljs.core.get.call(null,map__17213__$1,new cljs.core.Keyword(null,"-","-",-2112348439));
if(cljs.core.not.call(null,diff)){
return final$;
} else {
return lt.objs.settings._behaviors.call(null,lt.objs.settings._PLUS_behaviors.call(null,final$,add),rem);
}
});
lt.objs.settings.reverse_diff = (function lt$objs$settings$reverse_diff(p__17215){
var map__17218 = p__17215;
var map__17218__$1 = ((((!((map__17218 == null)))?((((map__17218.cljs$lang$protocol_mask$partition0$ & (64))) || (map__17218.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__17218):map__17218);
var add = cljs.core.get.call(null,map__17218__$1,new cljs.core.Keyword(null,"+","+",1913524883));
var rem = cljs.core.get.call(null,map__17218__$1,new cljs.core.Keyword(null,"-","-",-2112348439));
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
var seq__17246_17264 = cljs.core.seq.call(null,flat);
var chunk__17248_17265 = null;
var count__17249_17266 = (0);
var i__17250_17267 = (0);
while(true){
if((i__17250_17267 < count__17249_17266)){
var vec__17252_17268 = cljs.core._nth.call(null,chunk__17248_17265,i__17250_17267);
var tag_17269 = cljs.core.nth.call(null,vec__17252_17268,(0),null);
var behavior_17270 = cljs.core.nth.call(null,vec__17252_17268,(1),null);
var all_17271 = vec__17252_17268;
var vec__17255_17272 = ((cljs.core._EQ_.call(null,(lt.objs.settings.keyword__GT_str.call(null,behavior_17270)[(0)]),"-"))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [removes,cljs.core.subs.call(null,lt.objs.settings.keyword__GT_str.call(null,behavior_17270),(1))], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [adds,lt.objs.settings.keyword__GT_str.call(null,behavior_17270)], null));
var coll_17273 = cljs.core.nth.call(null,vec__17255_17272,(0),null);
var behavior_17274__$1 = cljs.core.nth.call(null,vec__17255_17272,(1),null);
var tag_17275__$1 = lt.objs.settings.keyword__GT_str.call(null,tag_17269);
if(cljs.core.truth_((coll_17273[tag_17275__$1]))){
} else {
(coll_17273[tag_17275__$1] = []);
}

(coll_17273[tag_17275__$1]).push((((cljs.core.count.call(null,all_17271) > (2)))?cljs.core.conj.call(null,cljs.core.seq.call(null,cljs.core.subvec.call(null,all_17271,(2))),cljs.core.keyword.call(null,behavior_17274__$1)):cljs.core.keyword.call(null,behavior_17274__$1)));

var G__17276 = seq__17246_17264;
var G__17277 = chunk__17248_17265;
var G__17278 = count__17249_17266;
var G__17279 = (i__17250_17267 + (1));
seq__17246_17264 = G__17276;
chunk__17248_17265 = G__17277;
count__17249_17266 = G__17278;
i__17250_17267 = G__17279;
continue;
} else {
var temp__4657__auto___17280 = cljs.core.seq.call(null,seq__17246_17264);
if(temp__4657__auto___17280){
var seq__17246_17281__$1 = temp__4657__auto___17280;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__17246_17281__$1)){
var c__7604__auto___17282 = cljs.core.chunk_first.call(null,seq__17246_17281__$1);
var G__17283 = cljs.core.chunk_rest.call(null,seq__17246_17281__$1);
var G__17284 = c__7604__auto___17282;
var G__17285 = cljs.core.count.call(null,c__7604__auto___17282);
var G__17286 = (0);
seq__17246_17264 = G__17283;
chunk__17248_17265 = G__17284;
count__17249_17266 = G__17285;
i__17250_17267 = G__17286;
continue;
} else {
var vec__17258_17287 = cljs.core.first.call(null,seq__17246_17281__$1);
var tag_17288 = cljs.core.nth.call(null,vec__17258_17287,(0),null);
var behavior_17289 = cljs.core.nth.call(null,vec__17258_17287,(1),null);
var all_17290 = vec__17258_17287;
var vec__17261_17291 = ((cljs.core._EQ_.call(null,(lt.objs.settings.keyword__GT_str.call(null,behavior_17289)[(0)]),"-"))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [removes,cljs.core.subs.call(null,lt.objs.settings.keyword__GT_str.call(null,behavior_17289),(1))], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [adds,lt.objs.settings.keyword__GT_str.call(null,behavior_17289)], null));
var coll_17292 = cljs.core.nth.call(null,vec__17261_17291,(0),null);
var behavior_17293__$1 = cljs.core.nth.call(null,vec__17261_17291,(1),null);
var tag_17294__$1 = lt.objs.settings.keyword__GT_str.call(null,tag_17288);
if(cljs.core.truth_((coll_17292[tag_17294__$1]))){
} else {
(coll_17292[tag_17294__$1] = []);
}

(coll_17292[tag_17294__$1]).push((((cljs.core.count.call(null,all_17290) > (2)))?cljs.core.conj.call(null,cljs.core.seq.call(null,cljs.core.subvec.call(null,all_17290,(2))),cljs.core.keyword.call(null,behavior_17293__$1)):cljs.core.keyword.call(null,behavior_17293__$1)));

var G__17295 = cljs.core.next.call(null,seq__17246_17281__$1);
var G__17296 = null;
var G__17297 = (0);
var G__17298 = (0);
seq__17246_17264 = G__17295;
chunk__17248_17265 = G__17296;
count__17249_17266 = G__17297;
i__17250_17267 = G__17298;
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
var seq__17345_17391 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"+","+",1913524883).cljs$core$IFn$_invoke$arity$1(behaviors_map));
var chunk__17353_17392 = null;
var count__17354_17393 = (0);
var i__17355_17394 = (0);
while(true){
if((i__17355_17394 < count__17354_17393)){
var vec__17363_17395 = cljs.core._nth.call(null,chunk__17353_17392,i__17355_17394);
var tag_17396 = cljs.core.nth.call(null,vec__17363_17395,(0),null);
var behs_17397 = cljs.core.nth.call(null,vec__17363_17395,(1),null);
var tag_vec_17398 = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [tag_17396], null);
var seq__17357_17399 = cljs.core.seq.call(null,behs_17397);
var chunk__17359_17400 = null;
var count__17360_17401 = (0);
var i__17361_17402 = (0);
while(true){
if((i__17361_17402 < count__17360_17401)){
var beh_17403 = cljs.core._nth.call(null,chunk__17359_17400,i__17361_17402);
var beh_17404__$1 = ((cljs.core.coll_QMARK_.call(null,beh_17403))?beh_17403:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [beh_17403], null));
flat.push(cljs.core.into.call(null,tag_vec_17398,beh_17404__$1));

var G__17405 = seq__17357_17399;
var G__17406 = chunk__17359_17400;
var G__17407 = count__17360_17401;
var G__17408 = (i__17361_17402 + (1));
seq__17357_17399 = G__17405;
chunk__17359_17400 = G__17406;
count__17360_17401 = G__17407;
i__17361_17402 = G__17408;
continue;
} else {
var temp__4657__auto___17409 = cljs.core.seq.call(null,seq__17357_17399);
if(temp__4657__auto___17409){
var seq__17357_17410__$1 = temp__4657__auto___17409;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__17357_17410__$1)){
var c__7604__auto___17411 = cljs.core.chunk_first.call(null,seq__17357_17410__$1);
var G__17412 = cljs.core.chunk_rest.call(null,seq__17357_17410__$1);
var G__17413 = c__7604__auto___17411;
var G__17414 = cljs.core.count.call(null,c__7604__auto___17411);
var G__17415 = (0);
seq__17357_17399 = G__17412;
chunk__17359_17400 = G__17413;
count__17360_17401 = G__17414;
i__17361_17402 = G__17415;
continue;
} else {
var beh_17416 = cljs.core.first.call(null,seq__17357_17410__$1);
var beh_17417__$1 = ((cljs.core.coll_QMARK_.call(null,beh_17416))?beh_17416:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [beh_17416], null));
flat.push(cljs.core.into.call(null,tag_vec_17398,beh_17417__$1));

var G__17418 = cljs.core.next.call(null,seq__17357_17410__$1);
var G__17419 = null;
var G__17420 = (0);
var G__17421 = (0);
seq__17357_17399 = G__17418;
chunk__17359_17400 = G__17419;
count__17360_17401 = G__17420;
i__17361_17402 = G__17421;
continue;
}
} else {
}
}
break;
}

var G__17422 = seq__17345_17391;
var G__17423 = chunk__17353_17392;
var G__17424 = count__17354_17393;
var G__17425 = (i__17355_17394 + (1));
seq__17345_17391 = G__17422;
chunk__17353_17392 = G__17423;
count__17354_17393 = G__17424;
i__17355_17394 = G__17425;
continue;
} else {
var temp__4657__auto___17426 = cljs.core.seq.call(null,seq__17345_17391);
if(temp__4657__auto___17426){
var seq__17345_17427__$1 = temp__4657__auto___17426;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__17345_17427__$1)){
var c__7604__auto___17428 = cljs.core.chunk_first.call(null,seq__17345_17427__$1);
var G__17429 = cljs.core.chunk_rest.call(null,seq__17345_17427__$1);
var G__17430 = c__7604__auto___17428;
var G__17431 = cljs.core.count.call(null,c__7604__auto___17428);
var G__17432 = (0);
seq__17345_17391 = G__17429;
chunk__17353_17392 = G__17430;
count__17354_17393 = G__17431;
i__17355_17394 = G__17432;
continue;
} else {
var vec__17366_17433 = cljs.core.first.call(null,seq__17345_17427__$1);
var tag_17434 = cljs.core.nth.call(null,vec__17366_17433,(0),null);
var behs_17435 = cljs.core.nth.call(null,vec__17366_17433,(1),null);
var tag_vec_17436 = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [tag_17434], null);
var seq__17347_17437 = cljs.core.seq.call(null,behs_17435);
var chunk__17349_17438 = null;
var count__17350_17439 = (0);
var i__17351_17440 = (0);
while(true){
if((i__17351_17440 < count__17350_17439)){
var beh_17441 = cljs.core._nth.call(null,chunk__17349_17438,i__17351_17440);
var beh_17442__$1 = ((cljs.core.coll_QMARK_.call(null,beh_17441))?beh_17441:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [beh_17441], null));
flat.push(cljs.core.into.call(null,tag_vec_17436,beh_17442__$1));

var G__17443 = seq__17347_17437;
var G__17444 = chunk__17349_17438;
var G__17445 = count__17350_17439;
var G__17446 = (i__17351_17440 + (1));
seq__17347_17437 = G__17443;
chunk__17349_17438 = G__17444;
count__17350_17439 = G__17445;
i__17351_17440 = G__17446;
continue;
} else {
var temp__4657__auto___17447__$1 = cljs.core.seq.call(null,seq__17347_17437);
if(temp__4657__auto___17447__$1){
var seq__17347_17448__$1 = temp__4657__auto___17447__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__17347_17448__$1)){
var c__7604__auto___17449 = cljs.core.chunk_first.call(null,seq__17347_17448__$1);
var G__17450 = cljs.core.chunk_rest.call(null,seq__17347_17448__$1);
var G__17451 = c__7604__auto___17449;
var G__17452 = cljs.core.count.call(null,c__7604__auto___17449);
var G__17453 = (0);
seq__17347_17437 = G__17450;
chunk__17349_17438 = G__17451;
count__17350_17439 = G__17452;
i__17351_17440 = G__17453;
continue;
} else {
var beh_17454 = cljs.core.first.call(null,seq__17347_17448__$1);
var beh_17455__$1 = ((cljs.core.coll_QMARK_.call(null,beh_17454))?beh_17454:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [beh_17454], null));
flat.push(cljs.core.into.call(null,tag_vec_17436,beh_17455__$1));

var G__17456 = cljs.core.next.call(null,seq__17347_17448__$1);
var G__17457 = null;
var G__17458 = (0);
var G__17459 = (0);
seq__17347_17437 = G__17456;
chunk__17349_17438 = G__17457;
count__17350_17439 = G__17458;
i__17351_17440 = G__17459;
continue;
}
} else {
}
}
break;
}

var G__17460 = cljs.core.next.call(null,seq__17345_17427__$1);
var G__17461 = null;
var G__17462 = (0);
var G__17463 = (0);
seq__17345_17391 = G__17460;
chunk__17353_17392 = G__17461;
count__17354_17393 = G__17462;
i__17355_17394 = G__17463;
continue;
}
} else {
}
}
break;
}

var seq__17369_17464 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"-","-",-2112348439).cljs$core$IFn$_invoke$arity$1(behaviors_map));
var chunk__17376_17465 = null;
var count__17377_17466 = (0);
var i__17378_17467 = (0);
while(true){
if((i__17378_17467 < count__17377_17466)){
var vec__17385_17468 = cljs.core._nth.call(null,chunk__17376_17465,i__17378_17467);
var tag_17469 = cljs.core.nth.call(null,vec__17385_17468,(0),null);
var behs_17470 = cljs.core.nth.call(null,vec__17385_17468,(1),null);
var seq__17379_17471 = cljs.core.seq.call(null,behs_17470);
var chunk__17381_17472 = null;
var count__17382_17473 = (0);
var i__17383_17474 = (0);
while(true){
if((i__17383_17474 < count__17382_17473)){
var beh_17475 = cljs.core._nth.call(null,chunk__17381_17472,i__17383_17474);
var beh_17476__$1 = ((cljs.core.coll_QMARK_.call(null,beh_17475))?beh_17475:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [beh_17475], null));
var tag_vec_17477 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tag_17469,cljs.core.keyword.call(null,[cljs.core.str("-"),cljs.core.str(lt.objs.settings.keyword__GT_str.call(null,cljs.core.first.call(null,beh_17476__$1)))].join(''))], null);
flat.push(cljs.core.into.call(null,tag_vec_17477,cljs.core.rest.call(null,beh_17476__$1)));

var G__17478 = seq__17379_17471;
var G__17479 = chunk__17381_17472;
var G__17480 = count__17382_17473;
var G__17481 = (i__17383_17474 + (1));
seq__17379_17471 = G__17478;
chunk__17381_17472 = G__17479;
count__17382_17473 = G__17480;
i__17383_17474 = G__17481;
continue;
} else {
var temp__4657__auto___17482 = cljs.core.seq.call(null,seq__17379_17471);
if(temp__4657__auto___17482){
var seq__17379_17483__$1 = temp__4657__auto___17482;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__17379_17483__$1)){
var c__7604__auto___17484 = cljs.core.chunk_first.call(null,seq__17379_17483__$1);
var G__17485 = cljs.core.chunk_rest.call(null,seq__17379_17483__$1);
var G__17486 = c__7604__auto___17484;
var G__17487 = cljs.core.count.call(null,c__7604__auto___17484);
var G__17488 = (0);
seq__17379_17471 = G__17485;
chunk__17381_17472 = G__17486;
count__17382_17473 = G__17487;
i__17383_17474 = G__17488;
continue;
} else {
var beh_17489 = cljs.core.first.call(null,seq__17379_17483__$1);
var beh_17490__$1 = ((cljs.core.coll_QMARK_.call(null,beh_17489))?beh_17489:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [beh_17489], null));
var tag_vec_17491 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tag_17469,cljs.core.keyword.call(null,[cljs.core.str("-"),cljs.core.str(lt.objs.settings.keyword__GT_str.call(null,cljs.core.first.call(null,beh_17490__$1)))].join(''))], null);
flat.push(cljs.core.into.call(null,tag_vec_17491,cljs.core.rest.call(null,beh_17490__$1)));

var G__17492 = cljs.core.next.call(null,seq__17379_17483__$1);
var G__17493 = null;
var G__17494 = (0);
var G__17495 = (0);
seq__17379_17471 = G__17492;
chunk__17381_17472 = G__17493;
count__17382_17473 = G__17494;
i__17383_17474 = G__17495;
continue;
}
} else {
}
}
break;
}

var G__17496 = seq__17369_17464;
var G__17497 = chunk__17376_17465;
var G__17498 = count__17377_17466;
var G__17499 = (i__17378_17467 + (1));
seq__17369_17464 = G__17496;
chunk__17376_17465 = G__17497;
count__17377_17466 = G__17498;
i__17378_17467 = G__17499;
continue;
} else {
var temp__4657__auto___17500 = cljs.core.seq.call(null,seq__17369_17464);
if(temp__4657__auto___17500){
var seq__17369_17501__$1 = temp__4657__auto___17500;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__17369_17501__$1)){
var c__7604__auto___17502 = cljs.core.chunk_first.call(null,seq__17369_17501__$1);
var G__17503 = cljs.core.chunk_rest.call(null,seq__17369_17501__$1);
var G__17504 = c__7604__auto___17502;
var G__17505 = cljs.core.count.call(null,c__7604__auto___17502);
var G__17506 = (0);
seq__17369_17464 = G__17503;
chunk__17376_17465 = G__17504;
count__17377_17466 = G__17505;
i__17378_17467 = G__17506;
continue;
} else {
var vec__17388_17507 = cljs.core.first.call(null,seq__17369_17501__$1);
var tag_17508 = cljs.core.nth.call(null,vec__17388_17507,(0),null);
var behs_17509 = cljs.core.nth.call(null,vec__17388_17507,(1),null);
var seq__17370_17510 = cljs.core.seq.call(null,behs_17509);
var chunk__17372_17511 = null;
var count__17373_17512 = (0);
var i__17374_17513 = (0);
while(true){
if((i__17374_17513 < count__17373_17512)){
var beh_17514 = cljs.core._nth.call(null,chunk__17372_17511,i__17374_17513);
var beh_17515__$1 = ((cljs.core.coll_QMARK_.call(null,beh_17514))?beh_17514:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [beh_17514], null));
var tag_vec_17516 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tag_17508,cljs.core.keyword.call(null,[cljs.core.str("-"),cljs.core.str(lt.objs.settings.keyword__GT_str.call(null,cljs.core.first.call(null,beh_17515__$1)))].join(''))], null);
flat.push(cljs.core.into.call(null,tag_vec_17516,cljs.core.rest.call(null,beh_17515__$1)));

var G__17517 = seq__17370_17510;
var G__17518 = chunk__17372_17511;
var G__17519 = count__17373_17512;
var G__17520 = (i__17374_17513 + (1));
seq__17370_17510 = G__17517;
chunk__17372_17511 = G__17518;
count__17373_17512 = G__17519;
i__17374_17513 = G__17520;
continue;
} else {
var temp__4657__auto___17521__$1 = cljs.core.seq.call(null,seq__17370_17510);
if(temp__4657__auto___17521__$1){
var seq__17370_17522__$1 = temp__4657__auto___17521__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__17370_17522__$1)){
var c__7604__auto___17523 = cljs.core.chunk_first.call(null,seq__17370_17522__$1);
var G__17524 = cljs.core.chunk_rest.call(null,seq__17370_17522__$1);
var G__17525 = c__7604__auto___17523;
var G__17526 = cljs.core.count.call(null,c__7604__auto___17523);
var G__17527 = (0);
seq__17370_17510 = G__17524;
chunk__17372_17511 = G__17525;
count__17373_17512 = G__17526;
i__17374_17513 = G__17527;
continue;
} else {
var beh_17528 = cljs.core.first.call(null,seq__17370_17522__$1);
var beh_17529__$1 = ((cljs.core.coll_QMARK_.call(null,beh_17528))?beh_17528:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [beh_17528], null));
var tag_vec_17530 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tag_17508,cljs.core.keyword.call(null,[cljs.core.str("-"),cljs.core.str(lt.objs.settings.keyword__GT_str.call(null,cljs.core.first.call(null,beh_17529__$1)))].join(''))], null);
flat.push(cljs.core.into.call(null,tag_vec_17530,cljs.core.rest.call(null,beh_17529__$1)));

var G__17531 = cljs.core.next.call(null,seq__17370_17522__$1);
var G__17532 = null;
var G__17533 = (0);
var G__17534 = (0);
seq__17370_17510 = G__17531;
chunk__17372_17511 = G__17532;
count__17373_17512 = G__17533;
i__17374_17513 = G__17534;
continue;
}
} else {
}
}
break;
}

var G__17535 = cljs.core.next.call(null,seq__17369_17501__$1);
var G__17536 = null;
var G__17537 = (0);
var G__17538 = (0);
seq__17369_17464 = G__17535;
chunk__17376_17465 = G__17536;
count__17377_17466 = G__17537;
i__17378_17467 = G__17538;
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
return cljs.core.mapv.call(null,lt.objs.settings.parse_file,cljs.core.filter.call(null,(function (p1__17539_SHARP_){
return cljs.core._EQ_.call(null,lt.objs.files.ext.call(null,p1__17539_SHARP_),"behaviors");
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
}catch (e17541){var e_17542 = e17541;
lt.objs.console.error.call(null,e_17542);
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
return (function (p1__17543_SHARP_,p2__17544_SHARP_){
return [cljs.core.str(p1__17543_SHARP_),cljs.core.str(" "),cljs.core.str(p2__17544_SHARP_)].join('');
});})(k__$1,keys))
,cljs.core.map.call(null,lt.objs.settings.__GT_ordered_keystr,keys));
});
lt.objs.settings.fix_key_entry = (function lt$objs$settings$fix_key_entry(p__17545){
var vec__17549 = p__17545;
var k = cljs.core.nth.call(null,vec__17549,(0),null);
var v = cljs.core.nth.call(null,vec__17549,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.objs.settings.fix_key.call(null,k),v], null);
});
lt.objs.settings._PLUS_keys = (function lt$objs$settings$_PLUS_keys(cur,m){
return cljs.core.reduce.call(null,(function (res,p__17557){
var vec__17558 = p__17557;
var k = cljs.core.nth.call(null,vec__17558,(0),null);
var v = cljs.core.nth.call(null,vec__17558,(1),null);
return cljs.core.update_in.call(null,res,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [k], null),((function (vec__17558,k,v){
return (function (p1__17552_SHARP_){
return cljs.core.into.call(null,(function (){var or__6793__auto__ = p1__17552_SHARP_;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})(),cljs.core.map.call(null,lt.objs.settings.fix_key_entry,v));
});})(vec__17558,k,v))
);
}),cur,m);
});
lt.objs.settings._keys = (function lt$objs$settings$_keys(cur,m){
return cljs.core.reduce.call(null,(function (res,p__17566){
var vec__17567 = p__17566;
var k = cljs.core.nth.call(null,vec__17567,(0),null);
var v = cljs.core.nth.call(null,vec__17567,(1),null);
return cljs.core.update_in.call(null,res,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [k], null),((function (vec__17567,k,v){
return (function (p1__17561_SHARP_){
return cljs.core.apply.call(null,cljs.core.dissoc,p1__17561_SHARP_,cljs.core.map.call(null,lt.objs.settings.fix_key,((cljs.core.map_QMARK_.call(null,v))?cljs.core.keys.call(null,v):v)));
});})(vec__17567,k,v))
);
}),cur,m);
});
lt.objs.settings.key_diff = (function lt$objs$settings$key_diff(p__17570,final$){
var map__17573 = p__17570;
var map__17573__$1 = ((((!((map__17573 == null)))?((((map__17573.cljs$lang$protocol_mask$partition0$ & (64))) || (map__17573.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__17573):map__17573);
var add = cljs.core.get.call(null,map__17573__$1,new cljs.core.Keyword(null,"+","+",1913524883));
var rem = cljs.core.get.call(null,map__17573__$1,new cljs.core.Keyword(null,"-","-",-2112348439));
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

var seq__17579_17583 = cljs.core.seq.call(null,cljs.core.vals.call(null,cljs.core.deref.call(null,lt.object.instances)));
var chunk__17580_17584 = null;
var count__17581_17585 = (0);
var i__17582_17586 = (0);
while(true){
if((i__17582_17586 < count__17581_17585)){
var inst_17587 = cljs.core._nth.call(null,chunk__17580_17584,i__17582_17586);
lt.object.refresh_BANG_.call(null,inst_17587);

var G__17588 = seq__17579_17583;
var G__17589 = chunk__17580_17584;
var G__17590 = count__17581_17585;
var G__17591 = (i__17582_17586 + (1));
seq__17579_17583 = G__17588;
chunk__17580_17584 = G__17589;
count__17581_17585 = G__17590;
i__17582_17586 = G__17591;
continue;
} else {
var temp__4657__auto___17592 = cljs.core.seq.call(null,seq__17579_17583);
if(temp__4657__auto___17592){
var seq__17579_17593__$1 = temp__4657__auto___17592;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__17579_17593__$1)){
var c__7604__auto___17594 = cljs.core.chunk_first.call(null,seq__17579_17593__$1);
var G__17595 = cljs.core.chunk_rest.call(null,seq__17579_17593__$1);
var G__17596 = c__7604__auto___17594;
var G__17597 = cljs.core.count.call(null,c__7604__auto___17594);
var G__17598 = (0);
seq__17579_17583 = G__17595;
chunk__17580_17584 = G__17596;
count__17581_17585 = G__17597;
i__17582_17586 = G__17598;
continue;
} else {
var inst_17599 = cljs.core.first.call(null,seq__17579_17593__$1);
lt.object.refresh_BANG_.call(null,inst_17599);

var G__17600 = cljs.core.next.call(null,seq__17579_17593__$1);
var G__17601 = null;
var G__17602 = (0);
var G__17603 = (0);
seq__17579_17583 = G__17600;
chunk__17580_17584 = G__17601;
count__17581_17585 = G__17602;
i__17582_17586 = G__17603;
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
var map__17606 = cljs.core.deref.call(null,editor).call(null,new cljs.core.Keyword(null,"info","info",-317069002));
var map__17606__$1 = ((((!((map__17606 == null)))?((((map__17606.cljs$lang$protocol_mask$partition0$ & (64))) || (map__17606.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__17606):map__17606);
var path = cljs.core.get.call(null,map__17606__$1,new cljs.core.Keyword(null,"path","path",-188191168));
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
var seq__17612 = cljs.core.seq.call(null,lt.objs.settings.user_plugin_paths);
var chunk__17613 = null;
var count__17614 = (0);
var i__17615 = (0);
while(true){
if((i__17615 < count__17614)){
var path = cljs.core._nth.call(null,chunk__17613,i__17615);
var full_path_17616 = lt.objs.files.join.call(null,lt.objs.settings.user_plugin_dir,path);
if(cljs.core.truth_(lt.objs.files.exists_QMARK_.call(null,full_path_17616))){
} else {
if(cljs.core.truth_((function (){var and__6781__auto__ = cljs.core.contains_QMARK_.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["user.behaviors",null,"user.keymap",null], null), null),path);
if(and__6781__auto__){
return lt.objs.files.exists_QMARK_.call(null,lt.objs.files.lt_user_dir.call(null,[cljs.core.str("/settings/"),cljs.core.str(path)].join('')));
} else {
return and__6781__auto__;
}
})())){
lt.objs.files.copy.call(null,lt.objs.files.lt_user_dir.call(null,[cljs.core.str("/settings/"),cljs.core.str(path)].join('')),full_path_17616);
} else {
lt.objs.files.copy.call(null,lt.objs.files.lt_home.call(null,lt.objs.files.join.call(null,"core","User",path)),full_path_17616);
}
}

var G__17617 = seq__17612;
var G__17618 = chunk__17613;
var G__17619 = count__17614;
var G__17620 = (i__17615 + (1));
seq__17612 = G__17617;
chunk__17613 = G__17618;
count__17614 = G__17619;
i__17615 = G__17620;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__17612);
if(temp__4657__auto__){
var seq__17612__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__17612__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__17612__$1);
var G__17621 = cljs.core.chunk_rest.call(null,seq__17612__$1);
var G__17622 = c__7604__auto__;
var G__17623 = cljs.core.count.call(null,c__7604__auto__);
var G__17624 = (0);
seq__17612 = G__17621;
chunk__17613 = G__17622;
count__17614 = G__17623;
i__17615 = G__17624;
continue;
} else {
var path = cljs.core.first.call(null,seq__17612__$1);
var full_path_17625 = lt.objs.files.join.call(null,lt.objs.settings.user_plugin_dir,path);
if(cljs.core.truth_(lt.objs.files.exists_QMARK_.call(null,full_path_17625))){
} else {
if(cljs.core.truth_((function (){var and__6781__auto__ = cljs.core.contains_QMARK_.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["user.behaviors",null,"user.keymap",null], null), null),path);
if(and__6781__auto__){
return lt.objs.files.exists_QMARK_.call(null,lt.objs.files.lt_user_dir.call(null,[cljs.core.str("/settings/"),cljs.core.str(path)].join('')));
} else {
return and__6781__auto__;
}
})())){
lt.objs.files.copy.call(null,lt.objs.files.lt_user_dir.call(null,[cljs.core.str("/settings/"),cljs.core.str(path)].join('')),full_path_17625);
} else {
lt.objs.files.copy.call(null,lt.objs.files.lt_home.call(null,lt.objs.files.join.call(null,"core","User",path)),full_path_17625);
}
}

var G__17626 = cljs.core.next.call(null,seq__17612__$1);
var G__17627 = null;
var G__17628 = (0);
var G__17629 = (0);
seq__17612 = G__17626;
chunk__17613 = G__17627;
count__17614 = G__17628;
i__17615 = G__17629;
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
var convert_fn = (function (){var G__17631 = lt.objs.files.ext.call(null,file);
switch (G__17631) {
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
var seq__17638 = cljs.core.seq.call(null,cljs.core.filter.call(null,(function (p1__17633_SHARP_){
return cljs.core.contains_QMARK_.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["keymap",null,"behaviors",null], null), null),lt.objs.files.ext.call(null,p1__17633_SHARP_));
}),lt.objs.files.full_path_ls.call(null,lt.objs.settings.user_plugin_dir)));
var chunk__17639 = null;
var count__17640 = (0);
var i__17641 = (0);
while(true){
if((i__17641 < count__17640)){
var file = cljs.core._nth.call(null,chunk__17639,i__17641);
lt.objs.settings.convert_file.call(null,file);

var G__17642 = seq__17638;
var G__17643 = chunk__17639;
var G__17644 = count__17640;
var G__17645 = (i__17641 + (1));
seq__17638 = G__17642;
chunk__17639 = G__17643;
count__17640 = G__17644;
i__17641 = G__17645;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__17638);
if(temp__4657__auto__){
var seq__17638__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__17638__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__17638__$1);
var G__17646 = cljs.core.chunk_rest.call(null,seq__17638__$1);
var G__17647 = c__7604__auto__;
var G__17648 = cljs.core.count.call(null,c__7604__auto__);
var G__17649 = (0);
seq__17638 = G__17646;
chunk__17639 = G__17647;
count__17640 = G__17648;
i__17641 = G__17649;
continue;
} else {
var file = cljs.core.first.call(null,seq__17638__$1);
lt.objs.settings.convert_file.call(null,file);

var G__17650 = cljs.core.next.call(null,seq__17638__$1);
var G__17651 = null;
var G__17652 = (0);
var G__17653 = (0);
seq__17638 = G__17650;
chunk__17639 = G__17651;
count__17640 = G__17652;
i__17641 = G__17653;
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
var seq__17716_17770 = cljs.core.seq.call(null,flat);
var chunk__17718_17771 = null;
var count__17719_17772 = (0);
var i__17720_17773 = (0);
while(true){
if((i__17720_17773 < count__17719_17772)){
var vec__17722_17774 = cljs.core._nth.call(null,chunk__17718_17771,i__17720_17773);
var tag_17775 = cljs.core.nth.call(null,vec__17722_17774,(0),null);
var key_17776 = cljs.core.nth.call(null,vec__17722_17774,(1),null);
var all_17777 = vec__17722_17774;
var vec__17725_17778 = (((cljs.core._EQ_.call(null,(lt.objs.settings.keyword__GT_str.call(null,key_17776)[(0)]),"-")) && ((cljs.core.count.call(null,lt.objs.settings.keyword__GT_str.call(null,key_17776)) > (1))))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [removes,cljs.core.subs.call(null,lt.objs.settings.keyword__GT_str.call(null,key_17776),(1))], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [adds,lt.objs.settings.keyword__GT_str.call(null,key_17776)], null));
var coll_17779 = cljs.core.nth.call(null,vec__17725_17778,(0),null);
var key_17780__$1 = cljs.core.nth.call(null,vec__17725_17778,(1),null);
var remove_QMARK__17781 = (coll_17779 === removes);
var tag_17782__$1 = lt.objs.settings.keyword__GT_str.call(null,tag_17775);
if(cljs.core.truth_((coll_17779[tag_17782__$1]))){
} else {
(coll_17779[tag_17782__$1] = ((remove_QMARK__17781)?[]:{}));
}

if(remove_QMARK__17781){
(coll_17779[tag_17782__$1]).push(key_17780__$1);
} else {
((coll_17779[tag_17782__$1])[key_17780__$1] = cljs.core.subvec.call(null,all_17777,(2)));
}

var G__17783 = seq__17716_17770;
var G__17784 = chunk__17718_17771;
var G__17785 = count__17719_17772;
var G__17786 = (i__17720_17773 + (1));
seq__17716_17770 = G__17783;
chunk__17718_17771 = G__17784;
count__17719_17772 = G__17785;
i__17720_17773 = G__17786;
continue;
} else {
var temp__4657__auto___17787 = cljs.core.seq.call(null,seq__17716_17770);
if(temp__4657__auto___17787){
var seq__17716_17788__$1 = temp__4657__auto___17787;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__17716_17788__$1)){
var c__7604__auto___17789 = cljs.core.chunk_first.call(null,seq__17716_17788__$1);
var G__17790 = cljs.core.chunk_rest.call(null,seq__17716_17788__$1);
var G__17791 = c__7604__auto___17789;
var G__17792 = cljs.core.count.call(null,c__7604__auto___17789);
var G__17793 = (0);
seq__17716_17770 = G__17790;
chunk__17718_17771 = G__17791;
count__17719_17772 = G__17792;
i__17720_17773 = G__17793;
continue;
} else {
var vec__17730_17794 = cljs.core.first.call(null,seq__17716_17788__$1);
var tag_17795 = cljs.core.nth.call(null,vec__17730_17794,(0),null);
var key_17796 = cljs.core.nth.call(null,vec__17730_17794,(1),null);
var all_17797 = vec__17730_17794;
var vec__17733_17798 = (((cljs.core._EQ_.call(null,(lt.objs.settings.keyword__GT_str.call(null,key_17796)[(0)]),"-")) && ((cljs.core.count.call(null,lt.objs.settings.keyword__GT_str.call(null,key_17796)) > (1))))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [removes,cljs.core.subs.call(null,lt.objs.settings.keyword__GT_str.call(null,key_17796),(1))], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [adds,lt.objs.settings.keyword__GT_str.call(null,key_17796)], null));
var coll_17799 = cljs.core.nth.call(null,vec__17733_17798,(0),null);
var key_17800__$1 = cljs.core.nth.call(null,vec__17733_17798,(1),null);
var remove_QMARK__17801 = (coll_17799 === removes);
var tag_17802__$1 = lt.objs.settings.keyword__GT_str.call(null,tag_17795);
if(cljs.core.truth_((coll_17799[tag_17802__$1]))){
} else {
(coll_17799[tag_17802__$1] = ((remove_QMARK__17801)?[]:{}));
}

if(remove_QMARK__17801){
(coll_17799[tag_17802__$1]).push(key_17800__$1);
} else {
((coll_17799[tag_17802__$1])[key_17800__$1] = cljs.core.subvec.call(null,all_17797,(2)));
}

var G__17803 = cljs.core.next.call(null,seq__17716_17788__$1);
var G__17804 = null;
var G__17805 = (0);
var G__17806 = (0);
seq__17716_17770 = G__17803;
chunk__17718_17771 = G__17804;
count__17719_17772 = G__17805;
i__17720_17773 = G__17806;
continue;
}
} else {
}
}
break;
}

return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"+","+",1913524883),cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__7573__auto__ = ((function (adds,removes){
return (function lt$objs$settings$flat_keymap__GT_map_$_iter__17738(s__17739){
return (new cljs.core.LazySeq(null,((function (adds,removes){
return (function (){
var s__17739__$1 = s__17739;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__17739__$1);
if(temp__4657__auto__){
var s__17739__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__17739__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__17739__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__17741 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__17740 = (0);
while(true){
if((i__17740 < size__7572__auto__)){
var vec__17748 = cljs.core._nth.call(null,c__7571__auto__,i__17740);
var tag = cljs.core.nth.call(null,vec__17748,(0),null);
var keys = cljs.core.nth.call(null,vec__17748,(1),null);
cljs.core.chunk_append.call(null,b__17741,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword.call(null,tag),keys], null));

var G__17807 = (i__17740 + (1));
i__17740 = G__17807;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__17741),lt$objs$settings$flat_keymap__GT_map_$_iter__17738.call(null,cljs.core.chunk_rest.call(null,s__17739__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__17741),null);
}
} else {
var vec__17751 = cljs.core.first.call(null,s__17739__$2);
var tag = cljs.core.nth.call(null,vec__17751,(0),null);
var keys = cljs.core.nth.call(null,vec__17751,(1),null);
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword.call(null,tag),keys], null),lt$objs$settings$flat_keymap__GT_map_$_iter__17738.call(null,cljs.core.rest.call(null,s__17739__$2)));
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
return (function lt$objs$settings$flat_keymap__GT_map_$_iter__17754(s__17755){
return (new cljs.core.LazySeq(null,((function (adds,removes){
return (function (){
var s__17755__$1 = s__17755;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__17755__$1);
if(temp__4657__auto__){
var s__17755__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__17755__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__17755__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__17757 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__17756 = (0);
while(true){
if((i__17756 < size__7572__auto__)){
var vec__17764 = cljs.core._nth.call(null,c__7571__auto__,i__17756);
var tag = cljs.core.nth.call(null,vec__17764,(0),null);
var keys = cljs.core.nth.call(null,vec__17764,(1),null);
cljs.core.chunk_append.call(null,b__17757,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword.call(null,tag),keys], null));

var G__17808 = (i__17756 + (1));
i__17756 = G__17808;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__17757),lt$objs$settings$flat_keymap__GT_map_$_iter__17754.call(null,cljs.core.chunk_rest.call(null,s__17755__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__17757),null);
}
} else {
var vec__17767 = cljs.core.first.call(null,s__17755__$2);
var tag = cljs.core.nth.call(null,vec__17767,(0),null);
var keys = cljs.core.nth.call(null,vec__17767,(1),null);
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword.call(null,tag),keys], null),lt$objs$settings$flat_keymap__GT_map_$_iter__17754.call(null,cljs.core.rest.call(null,s__17755__$2)));
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
var seq__17877_17945 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"+","+",1913524883).cljs$core$IFn$_invoke$arity$1(keymap));
var chunk__17884_17946 = null;
var count__17885_17947 = (0);
var i__17886_17948 = (0);
while(true){
if((i__17886_17948 < count__17885_17947)){
var vec__17893_17949 = cljs.core._nth.call(null,chunk__17884_17946,i__17886_17948);
var tag_17950 = cljs.core.nth.call(null,vec__17893_17949,(0),null);
var keys_17951 = cljs.core.nth.call(null,vec__17893_17949,(1),null);
var seq__17887_17952 = cljs.core.seq.call(null,keys_17951);
var chunk__17889_17953 = null;
var count__17890_17954 = (0);
var i__17891_17955 = (0);
while(true){
if((i__17891_17955 < count__17890_17954)){
var vec__17896_17956 = cljs.core._nth.call(null,chunk__17889_17953,i__17891_17955);
var key_17957 = cljs.core.nth.call(null,vec__17896_17956,(0),null);
var commands_17958 = cljs.core.nth.call(null,vec__17896_17956,(1),null);
var tag_vec_17959 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tag_17950,key_17957], null);
flat.push(cljs.core.into.call(null,tag_vec_17959,commands_17958));

var G__17960 = seq__17887_17952;
var G__17961 = chunk__17889_17953;
var G__17962 = count__17890_17954;
var G__17963 = (i__17891_17955 + (1));
seq__17887_17952 = G__17960;
chunk__17889_17953 = G__17961;
count__17890_17954 = G__17962;
i__17891_17955 = G__17963;
continue;
} else {
var temp__4657__auto___17964 = cljs.core.seq.call(null,seq__17887_17952);
if(temp__4657__auto___17964){
var seq__17887_17965__$1 = temp__4657__auto___17964;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__17887_17965__$1)){
var c__7604__auto___17966 = cljs.core.chunk_first.call(null,seq__17887_17965__$1);
var G__17967 = cljs.core.chunk_rest.call(null,seq__17887_17965__$1);
var G__17968 = c__7604__auto___17966;
var G__17969 = cljs.core.count.call(null,c__7604__auto___17966);
var G__17970 = (0);
seq__17887_17952 = G__17967;
chunk__17889_17953 = G__17968;
count__17890_17954 = G__17969;
i__17891_17955 = G__17970;
continue;
} else {
var vec__17899_17971 = cljs.core.first.call(null,seq__17887_17965__$1);
var key_17972 = cljs.core.nth.call(null,vec__17899_17971,(0),null);
var commands_17973 = cljs.core.nth.call(null,vec__17899_17971,(1),null);
var tag_vec_17974 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tag_17950,key_17972], null);
flat.push(cljs.core.into.call(null,tag_vec_17974,commands_17973));

var G__17975 = cljs.core.next.call(null,seq__17887_17965__$1);
var G__17976 = null;
var G__17977 = (0);
var G__17978 = (0);
seq__17887_17952 = G__17975;
chunk__17889_17953 = G__17976;
count__17890_17954 = G__17977;
i__17891_17955 = G__17978;
continue;
}
} else {
}
}
break;
}

var G__17979 = seq__17877_17945;
var G__17980 = chunk__17884_17946;
var G__17981 = count__17885_17947;
var G__17982 = (i__17886_17948 + (1));
seq__17877_17945 = G__17979;
chunk__17884_17946 = G__17980;
count__17885_17947 = G__17981;
i__17886_17948 = G__17982;
continue;
} else {
var temp__4657__auto___17983 = cljs.core.seq.call(null,seq__17877_17945);
if(temp__4657__auto___17983){
var seq__17877_17984__$1 = temp__4657__auto___17983;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__17877_17984__$1)){
var c__7604__auto___17985 = cljs.core.chunk_first.call(null,seq__17877_17984__$1);
var G__17986 = cljs.core.chunk_rest.call(null,seq__17877_17984__$1);
var G__17987 = c__7604__auto___17985;
var G__17988 = cljs.core.count.call(null,c__7604__auto___17985);
var G__17989 = (0);
seq__17877_17945 = G__17986;
chunk__17884_17946 = G__17987;
count__17885_17947 = G__17988;
i__17886_17948 = G__17989;
continue;
} else {
var vec__17902_17990 = cljs.core.first.call(null,seq__17877_17984__$1);
var tag_17991 = cljs.core.nth.call(null,vec__17902_17990,(0),null);
var keys_17992 = cljs.core.nth.call(null,vec__17902_17990,(1),null);
var seq__17878_17993 = cljs.core.seq.call(null,keys_17992);
var chunk__17880_17994 = null;
var count__17881_17995 = (0);
var i__17882_17996 = (0);
while(true){
if((i__17882_17996 < count__17881_17995)){
var vec__17905_17997 = cljs.core._nth.call(null,chunk__17880_17994,i__17882_17996);
var key_17998 = cljs.core.nth.call(null,vec__17905_17997,(0),null);
var commands_17999 = cljs.core.nth.call(null,vec__17905_17997,(1),null);
var tag_vec_18000 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tag_17991,key_17998], null);
flat.push(cljs.core.into.call(null,tag_vec_18000,commands_17999));

var G__18001 = seq__17878_17993;
var G__18002 = chunk__17880_17994;
var G__18003 = count__17881_17995;
var G__18004 = (i__17882_17996 + (1));
seq__17878_17993 = G__18001;
chunk__17880_17994 = G__18002;
count__17881_17995 = G__18003;
i__17882_17996 = G__18004;
continue;
} else {
var temp__4657__auto___18005__$1 = cljs.core.seq.call(null,seq__17878_17993);
if(temp__4657__auto___18005__$1){
var seq__17878_18006__$1 = temp__4657__auto___18005__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__17878_18006__$1)){
var c__7604__auto___18007 = cljs.core.chunk_first.call(null,seq__17878_18006__$1);
var G__18008 = cljs.core.chunk_rest.call(null,seq__17878_18006__$1);
var G__18009 = c__7604__auto___18007;
var G__18010 = cljs.core.count.call(null,c__7604__auto___18007);
var G__18011 = (0);
seq__17878_17993 = G__18008;
chunk__17880_17994 = G__18009;
count__17881_17995 = G__18010;
i__17882_17996 = G__18011;
continue;
} else {
var vec__17908_18012 = cljs.core.first.call(null,seq__17878_18006__$1);
var key_18013 = cljs.core.nth.call(null,vec__17908_18012,(0),null);
var commands_18014 = cljs.core.nth.call(null,vec__17908_18012,(1),null);
var tag_vec_18015 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tag_17991,key_18013], null);
flat.push(cljs.core.into.call(null,tag_vec_18015,commands_18014));

var G__18016 = cljs.core.next.call(null,seq__17878_18006__$1);
var G__18017 = null;
var G__18018 = (0);
var G__18019 = (0);
seq__17878_17993 = G__18016;
chunk__17880_17994 = G__18017;
count__17881_17995 = G__18018;
i__17882_17996 = G__18019;
continue;
}
} else {
}
}
break;
}

var G__18020 = cljs.core.next.call(null,seq__17877_17984__$1);
var G__18021 = null;
var G__18022 = (0);
var G__18023 = (0);
seq__17877_17945 = G__18020;
chunk__17884_17946 = G__18021;
count__17885_17947 = G__18022;
i__17886_17948 = G__18023;
continue;
}
} else {
}
}
break;
}

var seq__17911_18024 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"-","-",-2112348439).cljs$core$IFn$_invoke$arity$1(keymap));
var chunk__17918_18025 = null;
var count__17919_18026 = (0);
var i__17920_18027 = (0);
while(true){
if((i__17920_18027 < count__17919_18026)){
var vec__17927_18028 = cljs.core._nth.call(null,chunk__17918_18025,i__17920_18027);
var tag_18029 = cljs.core.nth.call(null,vec__17927_18028,(0),null);
var keys_18030 = cljs.core.nth.call(null,vec__17927_18028,(1),null);
var seq__17921_18031 = cljs.core.seq.call(null,keys_18030);
var chunk__17923_18032 = null;
var count__17924_18033 = (0);
var i__17925_18034 = (0);
while(true){
if((i__17925_18034 < count__17924_18033)){
var key_18035 = cljs.core._nth.call(null,chunk__17923_18032,i__17925_18034);
var vec__17930_18036 = ((cljs.core.map_QMARK_.call(null,keys_18030))?key_18035:new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_18035,cljs.core.PersistentVector.EMPTY], null));
var key_18037__$1 = cljs.core.nth.call(null,vec__17930_18036,(0),null);
var command_18038 = cljs.core.nth.call(null,vec__17930_18036,(1),null);
var tag_vec_18039 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tag_18029,[cljs.core.str("-"),cljs.core.str(key_18037__$1)].join('')], null);
flat.push(cljs.core.into.call(null,tag_vec_18039,command_18038));

var G__18040 = seq__17921_18031;
var G__18041 = chunk__17923_18032;
var G__18042 = count__17924_18033;
var G__18043 = (i__17925_18034 + (1));
seq__17921_18031 = G__18040;
chunk__17923_18032 = G__18041;
count__17924_18033 = G__18042;
i__17925_18034 = G__18043;
continue;
} else {
var temp__4657__auto___18044 = cljs.core.seq.call(null,seq__17921_18031);
if(temp__4657__auto___18044){
var seq__17921_18045__$1 = temp__4657__auto___18044;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__17921_18045__$1)){
var c__7604__auto___18046 = cljs.core.chunk_first.call(null,seq__17921_18045__$1);
var G__18047 = cljs.core.chunk_rest.call(null,seq__17921_18045__$1);
var G__18048 = c__7604__auto___18046;
var G__18049 = cljs.core.count.call(null,c__7604__auto___18046);
var G__18050 = (0);
seq__17921_18031 = G__18047;
chunk__17923_18032 = G__18048;
count__17924_18033 = G__18049;
i__17925_18034 = G__18050;
continue;
} else {
var key_18051 = cljs.core.first.call(null,seq__17921_18045__$1);
var vec__17933_18052 = ((cljs.core.map_QMARK_.call(null,keys_18030))?key_18051:new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_18051,cljs.core.PersistentVector.EMPTY], null));
var key_18053__$1 = cljs.core.nth.call(null,vec__17933_18052,(0),null);
var command_18054 = cljs.core.nth.call(null,vec__17933_18052,(1),null);
var tag_vec_18055 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tag_18029,[cljs.core.str("-"),cljs.core.str(key_18053__$1)].join('')], null);
flat.push(cljs.core.into.call(null,tag_vec_18055,command_18054));

var G__18056 = cljs.core.next.call(null,seq__17921_18045__$1);
var G__18057 = null;
var G__18058 = (0);
var G__18059 = (0);
seq__17921_18031 = G__18056;
chunk__17923_18032 = G__18057;
count__17924_18033 = G__18058;
i__17925_18034 = G__18059;
continue;
}
} else {
}
}
break;
}

var G__18060 = seq__17911_18024;
var G__18061 = chunk__17918_18025;
var G__18062 = count__17919_18026;
var G__18063 = (i__17920_18027 + (1));
seq__17911_18024 = G__18060;
chunk__17918_18025 = G__18061;
count__17919_18026 = G__18062;
i__17920_18027 = G__18063;
continue;
} else {
var temp__4657__auto___18064 = cljs.core.seq.call(null,seq__17911_18024);
if(temp__4657__auto___18064){
var seq__17911_18065__$1 = temp__4657__auto___18064;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__17911_18065__$1)){
var c__7604__auto___18066 = cljs.core.chunk_first.call(null,seq__17911_18065__$1);
var G__18067 = cljs.core.chunk_rest.call(null,seq__17911_18065__$1);
var G__18068 = c__7604__auto___18066;
var G__18069 = cljs.core.count.call(null,c__7604__auto___18066);
var G__18070 = (0);
seq__17911_18024 = G__18067;
chunk__17918_18025 = G__18068;
count__17919_18026 = G__18069;
i__17920_18027 = G__18070;
continue;
} else {
var vec__17936_18071 = cljs.core.first.call(null,seq__17911_18065__$1);
var tag_18072 = cljs.core.nth.call(null,vec__17936_18071,(0),null);
var keys_18073 = cljs.core.nth.call(null,vec__17936_18071,(1),null);
var seq__17912_18074 = cljs.core.seq.call(null,keys_18073);
var chunk__17914_18075 = null;
var count__17915_18076 = (0);
var i__17916_18077 = (0);
while(true){
if((i__17916_18077 < count__17915_18076)){
var key_18078 = cljs.core._nth.call(null,chunk__17914_18075,i__17916_18077);
var vec__17939_18079 = ((cljs.core.map_QMARK_.call(null,keys_18073))?key_18078:new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_18078,cljs.core.PersistentVector.EMPTY], null));
var key_18080__$1 = cljs.core.nth.call(null,vec__17939_18079,(0),null);
var command_18081 = cljs.core.nth.call(null,vec__17939_18079,(1),null);
var tag_vec_18082 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tag_18072,[cljs.core.str("-"),cljs.core.str(key_18080__$1)].join('')], null);
flat.push(cljs.core.into.call(null,tag_vec_18082,command_18081));

var G__18083 = seq__17912_18074;
var G__18084 = chunk__17914_18075;
var G__18085 = count__17915_18076;
var G__18086 = (i__17916_18077 + (1));
seq__17912_18074 = G__18083;
chunk__17914_18075 = G__18084;
count__17915_18076 = G__18085;
i__17916_18077 = G__18086;
continue;
} else {
var temp__4657__auto___18087__$1 = cljs.core.seq.call(null,seq__17912_18074);
if(temp__4657__auto___18087__$1){
var seq__17912_18088__$1 = temp__4657__auto___18087__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__17912_18088__$1)){
var c__7604__auto___18089 = cljs.core.chunk_first.call(null,seq__17912_18088__$1);
var G__18090 = cljs.core.chunk_rest.call(null,seq__17912_18088__$1);
var G__18091 = c__7604__auto___18089;
var G__18092 = cljs.core.count.call(null,c__7604__auto___18089);
var G__18093 = (0);
seq__17912_18074 = G__18090;
chunk__17914_18075 = G__18091;
count__17915_18076 = G__18092;
i__17916_18077 = G__18093;
continue;
} else {
var key_18094 = cljs.core.first.call(null,seq__17912_18088__$1);
var vec__17942_18095 = ((cljs.core.map_QMARK_.call(null,keys_18073))?key_18094:new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_18094,cljs.core.PersistentVector.EMPTY], null));
var key_18096__$1 = cljs.core.nth.call(null,vec__17942_18095,(0),null);
var command_18097 = cljs.core.nth.call(null,vec__17942_18095,(1),null);
var tag_vec_18098 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tag_18072,[cljs.core.str("-"),cljs.core.str(key_18096__$1)].join('')], null);
flat.push(cljs.core.into.call(null,tag_vec_18098,command_18097));

var G__18099 = cljs.core.next.call(null,seq__17912_18088__$1);
var G__18100 = null;
var G__18101 = (0);
var G__18102 = (0);
seq__17912_18074 = G__18099;
chunk__17914_18075 = G__18100;
count__17915_18076 = G__18101;
i__17916_18077 = G__18102;
continue;
}
} else {
}
}
break;
}

var G__18103 = cljs.core.next.call(null,seq__17911_18065__$1);
var G__18104 = null;
var G__18105 = (0);
var G__18106 = (0);
seq__17911_18024 = G__18103;
chunk__17918_18025 = G__18104;
count__17919_18026 = G__18105;
i__17920_18027 = G__18106;
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
return cljs.core.map.call(null,lt.objs.settings.parse_key_file,cljs.core.filter.call(null,(function (p1__18107_SHARP_){
return cljs.core._EQ_.call(null,lt.objs.files.ext.call(null,p1__18107_SHARP_),"keymap");
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
