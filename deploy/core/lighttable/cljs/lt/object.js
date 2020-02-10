// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.object');
goog.require('cljs.core');
goog.require('clojure.set');
goog.require('crate.core');
goog.require('lt.util.cljs');
goog.require('lt.util.dom');
goog.require('clojure.string');
goog.require('lt.util.js');
goog.require('crate.binding');
/**
 * Counter to guarantee unique object ids
 */
lt.object.obj_id = cljs.core.atom.call(null,(0));
/**
 * Map of object ids to objects created by object/create
 */
lt.object.instances = cljs.core.atom.call(null,cljs.core.sorted_map.call(null));
/**
 * Map of behavior names to behaviors created by macros/behavior
 */
lt.object.behaviors = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
/**
 * Map of object template keys to template maps created by object/object*
 */
lt.object.object_defs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
/**
 * Map of tags to associated lists of behaviors
 */
lt.object.tags = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
/**
 * Map of tags to dissociated lists of behaviors e.g. :-behavior
 */
lt.object.negated_tags = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
/**
 * Metadata of current behavior set during raise and raise-reduce
 */
lt.object._STAR_behavior_meta_STAR_ = null;
lt.object.add = (function lt$object$add(obj){
return cljs.core.swap_BANG_.call(null,lt.object.object_defs,cljs.core.assoc,new cljs.core.Keyword("lt.object","type","lt.object/type",1624522497).cljs$core$IFn$_invoke$arity$1(obj),obj);
});
lt.object.add_behavior = (function lt$object$add_behavior(beh){
return cljs.core.swap_BANG_.call(null,lt.object.behaviors,cljs.core.assoc,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(beh),beh);
});
/**
 * Return id of given object
 */
lt.object.__GT_id = (function lt$object$__GT_id(obj){
if(cljs.core.truth_(crate.binding.deref_QMARK_.call(null,obj))){
return new cljs.core.Keyword("lt.object","id","lt.object/id",-955176977).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,obj));
} else {
return new cljs.core.Keyword("lt.object","id","lt.object/id",-955176977).cljs$core$IFn$_invoke$arity$1(obj);
}
});
lt.object.__GT_behavior_name = (function lt$object$__GT_behavior_name(beh){
if(cljs.core.coll_QMARK_.call(null,beh)){
return cljs.core.first.call(null,beh);
} else {
return beh;
}
});
lt.object.__GT_behavior = (function lt$object$__GT_behavior(beh){
return cljs.core.deref.call(null,lt.object.behaviors).call(null,lt.object.__GT_behavior_name.call(null,beh));
});
lt.object.__GT_triggers = (function lt$object$__GT_triggers(behs){
var result = cljs.core.atom.call(null,cljs.core.transient$.call(null,cljs.core.PersistentArrayMap.EMPTY));
var seq__12983_12995 = cljs.core.seq.call(null,behs);
var chunk__12988_12996 = null;
var count__12989_12997 = (0);
var i__12990_12998 = (0);
while(true){
if((i__12990_12998 < count__12989_12997)){
var beh_12999 = cljs.core._nth.call(null,chunk__12988_12996,i__12990_12998);
var seq__12991_13000 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"triggers","triggers",-1443678770).cljs$core$IFn$_invoke$arity$1(lt.object.__GT_behavior.call(null,beh_12999)));
var chunk__12992_13001 = null;
var count__12993_13002 = (0);
var i__12994_13003 = (0);
while(true){
if((i__12994_13003 < count__12993_13002)){
var t_13004 = cljs.core._nth.call(null,chunk__12992_13001,i__12994_13003);
cljs.core.swap_BANG_.call(null,result,cljs.core.assoc_BANG_,t_13004,cljs.core.conj.call(null,(function (){var or__6793__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,result),t_13004);
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return cljs.core.PersistentVector.EMPTY;
}
})(),beh_12999));

var G__13005 = seq__12991_13000;
var G__13006 = chunk__12992_13001;
var G__13007 = count__12993_13002;
var G__13008 = (i__12994_13003 + (1));
seq__12991_13000 = G__13005;
chunk__12992_13001 = G__13006;
count__12993_13002 = G__13007;
i__12994_13003 = G__13008;
continue;
} else {
var temp__4657__auto___13009 = cljs.core.seq.call(null,seq__12991_13000);
if(temp__4657__auto___13009){
var seq__12991_13010__$1 = temp__4657__auto___13009;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__12991_13010__$1)){
var c__7604__auto___13011 = cljs.core.chunk_first.call(null,seq__12991_13010__$1);
var G__13012 = cljs.core.chunk_rest.call(null,seq__12991_13010__$1);
var G__13013 = c__7604__auto___13011;
var G__13014 = cljs.core.count.call(null,c__7604__auto___13011);
var G__13015 = (0);
seq__12991_13000 = G__13012;
chunk__12992_13001 = G__13013;
count__12993_13002 = G__13014;
i__12994_13003 = G__13015;
continue;
} else {
var t_13016 = cljs.core.first.call(null,seq__12991_13010__$1);
cljs.core.swap_BANG_.call(null,result,cljs.core.assoc_BANG_,t_13016,cljs.core.conj.call(null,(function (){var or__6793__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,result),t_13016);
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return cljs.core.PersistentVector.EMPTY;
}
})(),beh_12999));

var G__13017 = cljs.core.next.call(null,seq__12991_13010__$1);
var G__13018 = null;
var G__13019 = (0);
var G__13020 = (0);
seq__12991_13000 = G__13017;
chunk__12992_13001 = G__13018;
count__12993_13002 = G__13019;
i__12994_13003 = G__13020;
continue;
}
} else {
}
}
break;
}

var G__13021 = seq__12983_12995;
var G__13022 = chunk__12988_12996;
var G__13023 = count__12989_12997;
var G__13024 = (i__12990_12998 + (1));
seq__12983_12995 = G__13021;
chunk__12988_12996 = G__13022;
count__12989_12997 = G__13023;
i__12990_12998 = G__13024;
continue;
} else {
var temp__4657__auto___13025 = cljs.core.seq.call(null,seq__12983_12995);
if(temp__4657__auto___13025){
var seq__12983_13026__$1 = temp__4657__auto___13025;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__12983_13026__$1)){
var c__7604__auto___13027 = cljs.core.chunk_first.call(null,seq__12983_13026__$1);
var G__13028 = cljs.core.chunk_rest.call(null,seq__12983_13026__$1);
var G__13029 = c__7604__auto___13027;
var G__13030 = cljs.core.count.call(null,c__7604__auto___13027);
var G__13031 = (0);
seq__12983_12995 = G__13028;
chunk__12988_12996 = G__13029;
count__12989_12997 = G__13030;
i__12990_12998 = G__13031;
continue;
} else {
var beh_13032 = cljs.core.first.call(null,seq__12983_13026__$1);
var seq__12984_13033 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"triggers","triggers",-1443678770).cljs$core$IFn$_invoke$arity$1(lt.object.__GT_behavior.call(null,beh_13032)));
var chunk__12985_13034 = null;
var count__12986_13035 = (0);
var i__12987_13036 = (0);
while(true){
if((i__12987_13036 < count__12986_13035)){
var t_13037 = cljs.core._nth.call(null,chunk__12985_13034,i__12987_13036);
cljs.core.swap_BANG_.call(null,result,cljs.core.assoc_BANG_,t_13037,cljs.core.conj.call(null,(function (){var or__6793__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,result),t_13037);
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return cljs.core.PersistentVector.EMPTY;
}
})(),beh_13032));

var G__13038 = seq__12984_13033;
var G__13039 = chunk__12985_13034;
var G__13040 = count__12986_13035;
var G__13041 = (i__12987_13036 + (1));
seq__12984_13033 = G__13038;
chunk__12985_13034 = G__13039;
count__12986_13035 = G__13040;
i__12987_13036 = G__13041;
continue;
} else {
var temp__4657__auto___13042__$1 = cljs.core.seq.call(null,seq__12984_13033);
if(temp__4657__auto___13042__$1){
var seq__12984_13043__$1 = temp__4657__auto___13042__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__12984_13043__$1)){
var c__7604__auto___13044 = cljs.core.chunk_first.call(null,seq__12984_13043__$1);
var G__13045 = cljs.core.chunk_rest.call(null,seq__12984_13043__$1);
var G__13046 = c__7604__auto___13044;
var G__13047 = cljs.core.count.call(null,c__7604__auto___13044);
var G__13048 = (0);
seq__12984_13033 = G__13045;
chunk__12985_13034 = G__13046;
count__12986_13035 = G__13047;
i__12987_13036 = G__13048;
continue;
} else {
var t_13049 = cljs.core.first.call(null,seq__12984_13043__$1);
cljs.core.swap_BANG_.call(null,result,cljs.core.assoc_BANG_,t_13049,cljs.core.conj.call(null,(function (){var or__6793__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,result),t_13049);
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return cljs.core.PersistentVector.EMPTY;
}
})(),beh_13032));

var G__13050 = cljs.core.next.call(null,seq__12984_13043__$1);
var G__13051 = null;
var G__13052 = (0);
var G__13053 = (0);
seq__12984_13033 = G__13050;
chunk__12985_13034 = G__13051;
count__12986_13035 = G__13052;
i__12987_13036 = G__13053;
continue;
}
} else {
}
}
break;
}

var G__13054 = cljs.core.next.call(null,seq__12983_13026__$1);
var G__13055 = null;
var G__13056 = (0);
var G__13057 = (0);
seq__12983_12995 = G__13054;
chunk__12988_12996 = G__13055;
count__12989_12997 = G__13056;
i__12990_12998 = G__13057;
continue;
}
} else {
}
}
break;
}

return cljs.core.persistent_BANG_.call(null,cljs.core.deref.call(null,result));
});
lt.object.specificity_sort = (function lt$object$specificity_sort(var_args){
var args13058 = [];
var len__7868__auto___13065 = arguments.length;
var i__7869__auto___13066 = (0);
while(true){
if((i__7869__auto___13066 < len__7868__auto___13065)){
args13058.push((arguments[i__7869__auto___13066]));

var G__13067 = (i__7869__auto___13066 + (1));
i__7869__auto___13066 = G__13067;
continue;
} else {
}
break;
}

var G__13060 = args13058.length;
switch (G__13060) {
case 1:
return lt.object.specificity_sort.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return lt.object.specificity_sort.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13058.length)].join('')));

}
});

lt.object.specificity_sort.cljs$core$IFn$_invoke$arity$1 = (function (xs){
return lt.object.specificity_sort.call(null,xs,null);
});

lt.object.specificity_sort.cljs$core$IFn$_invoke$arity$2 = (function (xs,dir){
var arr = [];
var seq__13061_13069 = cljs.core.seq.call(null,xs);
var chunk__13062_13070 = null;
var count__13063_13071 = (0);
var i__13064_13072 = (0);
while(true){
if((i__13064_13072 < count__13063_13071)){
var x_13073 = cljs.core._nth.call(null,chunk__13062_13070,i__13064_13072);
arr.push([[cljs.core.str(x_13073)].join('').split(".").length,[cljs.core.str(x_13073)].join(''),x_13073]);

var G__13074 = seq__13061_13069;
var G__13075 = chunk__13062_13070;
var G__13076 = count__13063_13071;
var G__13077 = (i__13064_13072 + (1));
seq__13061_13069 = G__13074;
chunk__13062_13070 = G__13075;
count__13063_13071 = G__13076;
i__13064_13072 = G__13077;
continue;
} else {
var temp__4657__auto___13078 = cljs.core.seq.call(null,seq__13061_13069);
if(temp__4657__auto___13078){
var seq__13061_13079__$1 = temp__4657__auto___13078;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13061_13079__$1)){
var c__7604__auto___13080 = cljs.core.chunk_first.call(null,seq__13061_13079__$1);
var G__13081 = cljs.core.chunk_rest.call(null,seq__13061_13079__$1);
var G__13082 = c__7604__auto___13080;
var G__13083 = cljs.core.count.call(null,c__7604__auto___13080);
var G__13084 = (0);
seq__13061_13069 = G__13081;
chunk__13062_13070 = G__13082;
count__13063_13071 = G__13083;
i__13064_13072 = G__13084;
continue;
} else {
var x_13085 = cljs.core.first.call(null,seq__13061_13079__$1);
arr.push([[cljs.core.str(x_13085)].join('').split(".").length,[cljs.core.str(x_13085)].join(''),x_13085]);

var G__13086 = cljs.core.next.call(null,seq__13061_13079__$1);
var G__13087 = null;
var G__13088 = (0);
var G__13089 = (0);
seq__13061_13069 = G__13086;
chunk__13062_13070 = G__13087;
count__13063_13071 = G__13088;
i__13064_13072 = G__13089;
continue;
}
} else {
}
}
break;
}

arr.sort();

if(cljs.core.truth_(dir)){
} else {
arr.reverse();
}

var arr__8029__auto___13090 = arr;
var i_13091 = (0);
while(true){
if((i_13091 < arr__8029__auto___13090.length)){
(arr[i_13091] = (arr[i_13091][(2)]));

var G__13092 = (i_13091 + (1));
i_13091 = G__13092;
continue;
} else {
}
break;
}

return arr;
});

lt.object.specificity_sort.cljs$lang$maxFixedArity = 2;

lt.object.ts__GT_negations = (function lt$object$ts__GT_negations(ts){
var seen = {};
var seq__13101_13105 = cljs.core.seq.call(null,cljs.core.apply.call(null,cljs.core.concat,cljs.core.map.call(null,cljs.core.deref.call(null,lt.object.negated_tags),ts)));
var chunk__13102_13106 = null;
var count__13103_13107 = (0);
var i__13104_13108 = (0);
while(true){
if((i__13104_13108 < count__13103_13107)){
var beh_13109 = cljs.core._nth.call(null,chunk__13102_13106,i__13104_13108);
(seen[lt.object.__GT_behavior_name.call(null,beh_13109)] = true);

var G__13110 = seq__13101_13105;
var G__13111 = chunk__13102_13106;
var G__13112 = count__13103_13107;
var G__13113 = (i__13104_13108 + (1));
seq__13101_13105 = G__13110;
chunk__13102_13106 = G__13111;
count__13103_13107 = G__13112;
i__13104_13108 = G__13113;
continue;
} else {
var temp__4657__auto___13114 = cljs.core.seq.call(null,seq__13101_13105);
if(temp__4657__auto___13114){
var seq__13101_13115__$1 = temp__4657__auto___13114;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13101_13115__$1)){
var c__7604__auto___13116 = cljs.core.chunk_first.call(null,seq__13101_13115__$1);
var G__13117 = cljs.core.chunk_rest.call(null,seq__13101_13115__$1);
var G__13118 = c__7604__auto___13116;
var G__13119 = cljs.core.count.call(null,c__7604__auto___13116);
var G__13120 = (0);
seq__13101_13105 = G__13117;
chunk__13102_13106 = G__13118;
count__13103_13107 = G__13119;
i__13104_13108 = G__13120;
continue;
} else {
var beh_13121 = cljs.core.first.call(null,seq__13101_13115__$1);
(seen[lt.object.__GT_behavior_name.call(null,beh_13121)] = true);

var G__13122 = cljs.core.next.call(null,seq__13101_13115__$1);
var G__13123 = null;
var G__13124 = (0);
var G__13125 = (0);
seq__13101_13105 = G__13122;
chunk__13102_13106 = G__13123;
count__13103_13107 = G__13124;
i__13104_13108 = G__13125;
continue;
}
} else {
}
}
break;
}

return seen;
});
lt.object.tags__GT_behaviors = (function lt$object$tags__GT_behaviors(ts){
var duped = cljs.core.apply.call(null,cljs.core.concat,cljs.core.map.call(null,cljs.core.deref.call(null,lt.object.tags),lt.object.specificity_sort.call(null,ts)));
var de_duped = cljs.core.reduce.call(null,((function (duped){
return (function (res,cur){
if(cljs.core.truth_((new cljs.core.Keyword(null,"seen","seen",-518999789).cljs$core$IFn$_invoke$arity$1(res)[lt.object.__GT_behavior_name.call(null,cur)]))){
return res;
} else {
var beh = lt.object.__GT_behavior.call(null,cur);
if(cljs.core.truth_(new cljs.core.Keyword(null,"exclusive","exclusive",-1507998718).cljs$core$IFn$_invoke$arity$1(beh))){
if(cljs.core.coll_QMARK_.call(null,new cljs.core.Keyword(null,"exclusive","exclusive",-1507998718).cljs$core$IFn$_invoke$arity$1(beh))){
var seq__13130_13134 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"exclusive","exclusive",-1507998718).cljs$core$IFn$_invoke$arity$1(beh));
var chunk__13131_13135 = null;
var count__13132_13136 = (0);
var i__13133_13137 = (0);
while(true){
if((i__13133_13137 < count__13132_13136)){
var exclude_13138 = cljs.core._nth.call(null,chunk__13131_13135,i__13133_13137);
(new cljs.core.Keyword(null,"seen","seen",-518999789).cljs$core$IFn$_invoke$arity$1(res)[exclude_13138] = true);

var G__13139 = seq__13130_13134;
var G__13140 = chunk__13131_13135;
var G__13141 = count__13132_13136;
var G__13142 = (i__13133_13137 + (1));
seq__13130_13134 = G__13139;
chunk__13131_13135 = G__13140;
count__13132_13136 = G__13141;
i__13133_13137 = G__13142;
continue;
} else {
var temp__4657__auto___13143 = cljs.core.seq.call(null,seq__13130_13134);
if(temp__4657__auto___13143){
var seq__13130_13144__$1 = temp__4657__auto___13143;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13130_13144__$1)){
var c__7604__auto___13145 = cljs.core.chunk_first.call(null,seq__13130_13144__$1);
var G__13146 = cljs.core.chunk_rest.call(null,seq__13130_13144__$1);
var G__13147 = c__7604__auto___13145;
var G__13148 = cljs.core.count.call(null,c__7604__auto___13145);
var G__13149 = (0);
seq__13130_13134 = G__13146;
chunk__13131_13135 = G__13147;
count__13132_13136 = G__13148;
i__13133_13137 = G__13149;
continue;
} else {
var exclude_13150 = cljs.core.first.call(null,seq__13130_13144__$1);
(new cljs.core.Keyword(null,"seen","seen",-518999789).cljs$core$IFn$_invoke$arity$1(res)[exclude_13150] = true);

var G__13151 = cljs.core.next.call(null,seq__13130_13144__$1);
var G__13152 = null;
var G__13153 = (0);
var G__13154 = (0);
seq__13130_13134 = G__13151;
chunk__13131_13135 = G__13152;
count__13132_13136 = G__13153;
i__13133_13137 = G__13154;
continue;
}
} else {
}
}
break;
}
} else {
}

(new cljs.core.Keyword(null,"seen","seen",-518999789).cljs$core$IFn$_invoke$arity$1(res)[lt.object.__GT_behavior_name.call(null,cur)] = true);
} else {
}

cljs.core.conj_BANG_.call(null,new cljs.core.Keyword(null,"final","final",1157881357).cljs$core$IFn$_invoke$arity$1(res),cur);

return res;
}
});})(duped))
,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"seen","seen",-518999789),lt.object.ts__GT_negations.call(null,ts),new cljs.core.Keyword(null,"final","final",1157881357),cljs.core.transient$.call(null,cljs.core.PersistentVector.EMPTY)], null),duped);
return cljs.core.reverse.call(null,cljs.core.persistent_BANG_.call(null,new cljs.core.Keyword(null,"final","final",1157881357).cljs$core$IFn$_invoke$arity$1(de_duped)));
});
lt.object.trigger__GT_behaviors = (function lt$object$trigger__GT_behaviors(trig,ts){
return cljs.core.get.call(null,lt.object.__GT_triggers.call(null,lt.object.tags__GT_behaviors.call(null,ts)),trig);
});
lt.object.safe_report_error = (function lt$object$safe_report_error(e){
if(cljs.core.truth_(lt.objs.console)){
return lt.objs.console.error(e);
} else {
return console.error(((typeof e === 'string')?e:e.stack));
}
});
lt.object.raise_STAR_ = (function lt$object$raise_STAR_(var_args){
var args13155 = [];
var len__7868__auto___13172 = arguments.length;
var i__7869__auto___13173 = (0);
while(true){
if((i__7869__auto___13173 < len__7868__auto___13172)){
args13155.push((arguments[i__7869__auto___13173]));

var G__13174 = (i__7869__auto___13173 + (1));
i__7869__auto___13173 = G__13174;
continue;
} else {
}
break;
}

var G__13157 = args13155.length;
switch (G__13157) {
case 3:
return lt.object.raise_STAR_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return lt.object.raise_STAR_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13155.length)].join('')));

}
});

lt.object.raise_STAR_.cljs$core$IFn$_invoke$arity$3 = (function (obj,reactions,args){
return lt.object.raise_STAR_.call(null,obj,reactions,args,null);
});

lt.object.raise_STAR_.cljs$core$IFn$_invoke$arity$4 = (function (obj,reactions,args,trigger){
var seq__13158 = cljs.core.seq.call(null,reactions);
var chunk__13161 = null;
var count__13162 = (0);
var i__13163 = (0);
while(true){
if((i__13163 < count__13162)){
var r = cljs.core._nth.call(null,chunk__13161,i__13163);
var func = new cljs.core.Keyword(null,"reaction","reaction",490869788).cljs$core$IFn$_invoke$arity$1(lt.object.__GT_behavior.call(null,r));
var args__$1 = ((cljs.core.coll_QMARK_.call(null,r))?cljs.core.concat.call(null,cljs.core.rest.call(null,r),args):args);
var meta = ((cljs.core.coll_QMARK_.call(null,r))?cljs.core.meta.call(null,r):cljs.core.PersistentArrayMap.EMPTY);
if(cljs.core.truth_(func)){
try{var start13167_13176 = (new Date()).getTime();
var _STAR_behavior_meta_STAR_13168_13177 = lt.object._STAR_behavior_meta_STAR_;
lt.object._STAR_behavior_meta_STAR_ = meta;

try{cljs.core.apply.call(null,func,obj,args__$1);
}finally {lt.object._STAR_behavior_meta_STAR_ = _STAR_behavior_meta_STAR_13168_13177;
}
if(cljs.core._EQ_.call(null,trigger,new cljs.core.Keyword(null,"object.behavior.time","object.behavior.time",-1731850612))){
} else {
lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"object.behavior.time","object.behavior.time",-1731850612),r,((new Date()).getTime() - start13167_13176),trigger);
}
}catch (e13166){var e_13178 = e13166;
lt.object.safe_report_error.call(null,[cljs.core.str("Invalid behavior: "),cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(lt.object.__GT_behavior.call(null,r)))].join(''));

lt.object.safe_report_error.call(null,e_13178);
}
var G__13179 = seq__13158;
var G__13180 = chunk__13161;
var G__13181 = count__13162;
var G__13182 = (i__13163 + (1));
seq__13158 = G__13179;
chunk__13161 = G__13180;
count__13162 = G__13181;
i__13163 = G__13182;
continue;
} else {
var G__13183 = seq__13158;
var G__13184 = chunk__13161;
var G__13185 = count__13162;
var G__13186 = (i__13163 + (1));
seq__13158 = G__13183;
chunk__13161 = G__13184;
count__13162 = G__13185;
i__13163 = G__13186;
continue;
}
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__13158);
if(temp__4657__auto__){
var seq__13158__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13158__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__13158__$1);
var G__13187 = cljs.core.chunk_rest.call(null,seq__13158__$1);
var G__13188 = c__7604__auto__;
var G__13189 = cljs.core.count.call(null,c__7604__auto__);
var G__13190 = (0);
seq__13158 = G__13187;
chunk__13161 = G__13188;
count__13162 = G__13189;
i__13163 = G__13190;
continue;
} else {
var r = cljs.core.first.call(null,seq__13158__$1);
var func = new cljs.core.Keyword(null,"reaction","reaction",490869788).cljs$core$IFn$_invoke$arity$1(lt.object.__GT_behavior.call(null,r));
var args__$1 = ((cljs.core.coll_QMARK_.call(null,r))?cljs.core.concat.call(null,cljs.core.rest.call(null,r),args):args);
var meta = ((cljs.core.coll_QMARK_.call(null,r))?cljs.core.meta.call(null,r):cljs.core.PersistentArrayMap.EMPTY);
if(cljs.core.truth_(func)){
try{var start13170_13191 = (new Date()).getTime();
var _STAR_behavior_meta_STAR_13171_13192 = lt.object._STAR_behavior_meta_STAR_;
lt.object._STAR_behavior_meta_STAR_ = meta;

try{cljs.core.apply.call(null,func,obj,args__$1);
}finally {lt.object._STAR_behavior_meta_STAR_ = _STAR_behavior_meta_STAR_13171_13192;
}
if(cljs.core._EQ_.call(null,trigger,new cljs.core.Keyword(null,"object.behavior.time","object.behavior.time",-1731850612))){
} else {
lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"object.behavior.time","object.behavior.time",-1731850612),r,((new Date()).getTime() - start13170_13191),trigger);
}
}catch (e13169){var e_13193 = e13169;
lt.object.safe_report_error.call(null,[cljs.core.str("Invalid behavior: "),cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(lt.object.__GT_behavior.call(null,r)))].join(''));

lt.object.safe_report_error.call(null,e_13193);
}
var G__13194 = cljs.core.next.call(null,seq__13158__$1);
var G__13195 = null;
var G__13196 = (0);
var G__13197 = (0);
seq__13158 = G__13194;
chunk__13161 = G__13195;
count__13162 = G__13196;
i__13163 = G__13197;
continue;
} else {
var G__13198 = cljs.core.next.call(null,seq__13158__$1);
var G__13199 = null;
var G__13200 = (0);
var G__13201 = (0);
seq__13158 = G__13198;
chunk__13161 = G__13199;
count__13162 = G__13200;
i__13163 = G__13201;
continue;
}
}
} else {
return null;
}
}
break;
}
});

lt.object.raise_STAR_.cljs$lang$maxFixedArity = 4;

/**
 * Invoke object's behavior fns for given trigger. Args are passed to behavior fns
 */
lt.object.raise = (function lt$object$raise(var_args){
var args__7875__auto__ = [];
var len__7868__auto___13205 = arguments.length;
var i__7869__auto___13206 = (0);
while(true){
if((i__7869__auto___13206 < len__7868__auto___13205)){
args__7875__auto__.push((arguments[i__7869__auto___13206]));

var G__13207 = (i__7869__auto___13206 + (1));
i__7869__auto___13206 = G__13207;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((2) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((2)),(0),null)):null);
return lt.object.raise.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__7876__auto__);
});

lt.object.raise.cljs$core$IFn$_invoke$arity$variadic = (function (obj,k,args){
var reactions = k.call(null,new cljs.core.Keyword(null,"listeners","listeners",394544445).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,obj)));
return lt.object.raise_STAR_.call(null,obj,reactions,args,k);
});

lt.object.raise.cljs$lang$maxFixedArity = (2);

lt.object.raise.cljs$lang$applyTo = (function (seq13202){
var G__13203 = cljs.core.first.call(null,seq13202);
var seq13202__$1 = cljs.core.next.call(null,seq13202);
var G__13204 = cljs.core.first.call(null,seq13202__$1);
var seq13202__$2 = cljs.core.next.call(null,seq13202__$1);
return lt.object.raise.cljs$core$IFn$_invoke$arity$variadic(G__13203,G__13204,seq13202__$2);
});

/**
 * For a given behavior keyword id, call its :reaction fn with given args
 */
lt.object.call_behavior_reaction = (function lt$object$call_behavior_reaction(var_args){
var args__7875__auto__ = [];
var len__7868__auto___13210 = arguments.length;
var i__7869__auto___13211 = (0);
while(true){
if((i__7869__auto___13211 < len__7868__auto___13210)){
args__7875__auto__.push((arguments[i__7869__auto___13211]));

var G__13212 = (i__7869__auto___13211 + (1));
i__7869__auto___13211 = G__13212;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((1) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((1)),(0),null)):null);
return lt.object.call_behavior_reaction.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7876__auto__);
});

lt.object.call_behavior_reaction.cljs$core$IFn$_invoke$arity$variadic = (function (id,args){
var behavior_fn = new cljs.core.Keyword(null,"reaction","reaction",490869788).cljs$core$IFn$_invoke$arity$1(lt.object.__GT_behavior.call(null,id));
if(cljs.core.truth_(behavior_fn)){
} else {
throw (new Error("Assert failed: behavior-fn"));
}

return cljs.core.apply.call(null,behavior_fn,args);
});

lt.object.call_behavior_reaction.cljs$lang$maxFixedArity = (1);

lt.object.call_behavior_reaction.cljs$lang$applyTo = (function (seq13208){
var G__13209 = cljs.core.first.call(null,seq13208);
var seq13208__$1 = cljs.core.next.call(null,seq13208);
return lt.object.call_behavior_reaction.cljs$core$IFn$_invoke$arity$variadic(G__13209,seq13208__$1);
});

lt.object.update_listeners = (function lt$object$update_listeners(var_args){
var args13213 = [];
var len__7868__auto___13216 = arguments.length;
var i__7869__auto___13217 = (0);
while(true){
if((i__7869__auto___13217 < len__7868__auto___13216)){
args13213.push((arguments[i__7869__auto___13217]));

var G__13218 = (i__7869__auto___13217 + (1));
i__7869__auto___13217 = G__13218;
continue;
} else {
}
break;
}

var G__13215 = args13213.length;
switch (G__13215) {
case 1:
return lt.object.update_listeners.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return lt.object.update_listeners.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13213.length)].join('')));

}
});

lt.object.update_listeners.cljs$core$IFn$_invoke$arity$1 = (function (obj){
return lt.object.update_listeners.call(null,obj,null);
});

lt.object.update_listeners.cljs$core$IFn$_invoke$arity$2 = (function (obj,instants){
var cur = cljs.core.deref.call(null,obj);
var behs = cljs.core.set.call(null,cljs.core.concat.call(null,new cljs.core.Keyword(null,"behaviors","behaviors",120724909).cljs$core$IFn$_invoke$arity$1(cur),lt.object.tags__GT_behaviors.call(null,new cljs.core.Keyword(null,"tags","tags",1771418977).cljs$core$IFn$_invoke$arity$1(cur))));
var trigs = lt.object.__GT_triggers.call(null,behs);
var trigs__$1 = (cljs.core.truth_(new cljs.core.Keyword(null,"object.instant-load","object.instant-load",853728870).cljs$core$IFn$_invoke$arity$1(trigs))?(function (){
lt.object.raise_STAR_.call(null,obj,new cljs.core.Keyword(null,"object.instant-load","object.instant-load",853728870).cljs$core$IFn$_invoke$arity$1(trigs),null,new cljs.core.Keyword(null,"object.instant-load","object.instant-load",853728870));

return lt.object.__GT_triggers.call(null,behs);
})()
:trigs);
var trigs__$2 = (cljs.core.truth_(instants)?trigs__$1:cljs.core.dissoc.call(null,trigs__$1,new cljs.core.Keyword(null,"object.instant","object.instant",-29936727),new cljs.core.Keyword(null,"object.instant-load","object.instant-load",853728870)));
return cljs.core.assoc.call(null,cljs.core.deref.call(null,obj),new cljs.core.Keyword(null,"listeners","listeners",394544445),trigs__$2);
});

lt.object.update_listeners.cljs$lang$maxFixedArity = 2;

lt.object.make_object_STAR_ = (function lt$object$make_object_STAR_(var_args){
var args__7875__auto__ = [];
var len__7868__auto___13222 = arguments.length;
var i__7869__auto___13223 = (0);
while(true){
if((i__7869__auto___13223 < len__7868__auto___13222)){
args__7875__auto__.push((arguments[i__7869__auto___13223]));

var G__13224 = (i__7869__auto___13223 + (1));
i__7869__auto___13223 = G__13224;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((1) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((1)),(0),null)):null);
return lt.object.make_object_STAR_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7876__auto__);
});

lt.object.make_object_STAR_.cljs$core$IFn$_invoke$arity$variadic = (function (name,r){
var obj = cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"behaviors","behaviors",120724909),cljs.core.PersistentHashSet.EMPTY,new cljs.core.Keyword(null,"tags","tags",1771418977),cljs.core.PersistentHashSet.EMPTY,new cljs.core.Keyword(null,"triggers","triggers",-1443678770),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"listeners","listeners",394544445),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword("lt.object","type","lt.object/type",1624522497),name,new cljs.core.Keyword(null,"children","children",-940561982),cljs.core.PersistentArrayMap.EMPTY], null),cljs.core.apply.call(null,cljs.core.hash_map,r));
return obj;
});

lt.object.make_object_STAR_.cljs$lang$maxFixedArity = (1);

lt.object.make_object_STAR_.cljs$lang$applyTo = (function (seq13220){
var G__13221 = cljs.core.first.call(null,seq13220);
var seq13220__$1 = cljs.core.next.call(null,seq13220);
return lt.object.make_object_STAR_.cljs$core$IFn$_invoke$arity$variadic(G__13221,seq13220__$1);
});

lt.object.store_object_STAR_ = (function lt$object$store_object_STAR_(obj){
lt.object.add.call(null,obj);

return obj;
});
/**
 * Return all objects for given type (template name)
 */
lt.object.instances_by_type = (function lt$object$instances_by_type(type){
return cljs.core.filter.call(null,(function (p1__13225_SHARP_){
return cljs.core._EQ_.call(null,type,new cljs.core.Keyword("lt.object","type","lt.object/type",1624522497).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,p1__13225_SHARP_)));
}),cljs.core.vals.call(null,cljs.core.deref.call(null,lt.object.instances)));
});
/**
 * Merge map into object
 */
lt.object.merge_BANG_ = (function lt$object$merge_BANG_(obj,m){
if(cljs.core.truth_((function (){var and__6781__auto__ = m;
if(cljs.core.truth_(and__6781__auto__)){
return !(cljs.core.map_QMARK_.call(null,m));
} else {
return and__6781__auto__;
}
})())){
throw (new Error([cljs.core.str("Merge requires a map: "),cljs.core.str(m)].join('')));
} else {
}

return cljs.core.swap_BANG_.call(null,obj,cljs.core.merge,m);
});
lt.object.handle_redef = (function lt$object$handle_redef(odef){
var id = new cljs.core.Keyword("lt.object","type","lt.object/type",1624522497).cljs$core$IFn$_invoke$arity$1(odef);
var seq__13232_13238 = cljs.core.seq.call(null,lt.object.instances_by_type.call(null,id));
var chunk__13234_13239 = null;
var count__13235_13240 = (0);
var i__13236_13241 = (0);
while(true){
if((i__13236_13241 < count__13235_13240)){
var o_13242 = cljs.core._nth.call(null,chunk__13234_13239,i__13236_13241);
var o_13243__$1 = cljs.core.deref.call(null,o_13242);
var args_13244 = new cljs.core.Keyword(null,"args","args",1315556576).cljs$core$IFn$_invoke$arity$1(o_13243__$1);
var old_13245 = new cljs.core.Keyword(null,"content","content",15833224).cljs$core$IFn$_invoke$arity$1(o_13243__$1);
var behs_13246 = cljs.core.set.call(null,new cljs.core.Keyword(null,"behaviors","behaviors",120724909).cljs$core$IFn$_invoke$arity$1(o_13243__$1));
var inst_13247 = cljs.core.deref.call(null,lt.object.instances).call(null,lt.object.__GT_id.call(null,o_13243__$1));
var neue_13248 = (cljs.core.truth_(new cljs.core.Keyword(null,"init","init",-1875481434).cljs$core$IFn$_invoke$arity$1(odef))?cljs.core.apply.call(null,new cljs.core.Keyword(null,"init","init",-1875481434).cljs$core$IFn$_invoke$arity$1(odef),inst_13247,args_13244):null);
var neue_13249__$1 = ((cljs.core.vector_QMARK_.call(null,neue_13248))?crate.core.html.call(null,neue_13248):neue_13248);
lt.object.merge_BANG_.call(null,inst_13247,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"tags","tags",1771418977),clojure.set.union.call(null,new cljs.core.Keyword(null,"tags","tags",1771418977).cljs$core$IFn$_invoke$arity$1(o_13243__$1),new cljs.core.Keyword(null,"tags","tags",1771418977).cljs$core$IFn$_invoke$arity$1(odef)),new cljs.core.Keyword(null,"behaviors","behaviors",120724909),clojure.set.union.call(null,behs_13246,cljs.core.set.call(null,new cljs.core.Keyword(null,"behaviors","behaviors",120724909).cljs$core$IFn$_invoke$arity$1(odef))),new cljs.core.Keyword(null,"content","content",15833224),neue_13249__$1], null));

lt.object.merge_BANG_.call(null,inst_13247,lt.object.update_listeners.call(null,inst_13247));

if(cljs.core.truth_((function (){var and__6781__auto__ = old_13245;
if(cljs.core.truth_(and__6781__auto__)){
return neue_13249__$1;
} else {
return and__6781__auto__;
}
})())){
lt.util.dom.replace_with.call(null,old_13245,neue_13249__$1);
} else {
}

lt.object.raise.call(null,inst_13247,new cljs.core.Keyword(null,"redef","redef",1032704258));

var G__13250 = seq__13232_13238;
var G__13251 = chunk__13234_13239;
var G__13252 = count__13235_13240;
var G__13253 = (i__13236_13241 + (1));
seq__13232_13238 = G__13250;
chunk__13234_13239 = G__13251;
count__13235_13240 = G__13252;
i__13236_13241 = G__13253;
continue;
} else {
var temp__4657__auto___13254 = cljs.core.seq.call(null,seq__13232_13238);
if(temp__4657__auto___13254){
var seq__13232_13255__$1 = temp__4657__auto___13254;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13232_13255__$1)){
var c__7604__auto___13256 = cljs.core.chunk_first.call(null,seq__13232_13255__$1);
var G__13257 = cljs.core.chunk_rest.call(null,seq__13232_13255__$1);
var G__13258 = c__7604__auto___13256;
var G__13259 = cljs.core.count.call(null,c__7604__auto___13256);
var G__13260 = (0);
seq__13232_13238 = G__13257;
chunk__13234_13239 = G__13258;
count__13235_13240 = G__13259;
i__13236_13241 = G__13260;
continue;
} else {
var o_13261 = cljs.core.first.call(null,seq__13232_13255__$1);
var o_13262__$1 = cljs.core.deref.call(null,o_13261);
var args_13263 = new cljs.core.Keyword(null,"args","args",1315556576).cljs$core$IFn$_invoke$arity$1(o_13262__$1);
var old_13264 = new cljs.core.Keyword(null,"content","content",15833224).cljs$core$IFn$_invoke$arity$1(o_13262__$1);
var behs_13265 = cljs.core.set.call(null,new cljs.core.Keyword(null,"behaviors","behaviors",120724909).cljs$core$IFn$_invoke$arity$1(o_13262__$1));
var inst_13266 = cljs.core.deref.call(null,lt.object.instances).call(null,lt.object.__GT_id.call(null,o_13262__$1));
var neue_13267 = (cljs.core.truth_(new cljs.core.Keyword(null,"init","init",-1875481434).cljs$core$IFn$_invoke$arity$1(odef))?cljs.core.apply.call(null,new cljs.core.Keyword(null,"init","init",-1875481434).cljs$core$IFn$_invoke$arity$1(odef),inst_13266,args_13263):null);
var neue_13268__$1 = ((cljs.core.vector_QMARK_.call(null,neue_13267))?crate.core.html.call(null,neue_13267):neue_13267);
lt.object.merge_BANG_.call(null,inst_13266,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"tags","tags",1771418977),clojure.set.union.call(null,new cljs.core.Keyword(null,"tags","tags",1771418977).cljs$core$IFn$_invoke$arity$1(o_13262__$1),new cljs.core.Keyword(null,"tags","tags",1771418977).cljs$core$IFn$_invoke$arity$1(odef)),new cljs.core.Keyword(null,"behaviors","behaviors",120724909),clojure.set.union.call(null,behs_13265,cljs.core.set.call(null,new cljs.core.Keyword(null,"behaviors","behaviors",120724909).cljs$core$IFn$_invoke$arity$1(odef))),new cljs.core.Keyword(null,"content","content",15833224),neue_13268__$1], null));

lt.object.merge_BANG_.call(null,inst_13266,lt.object.update_listeners.call(null,inst_13266));

if(cljs.core.truth_((function (){var and__6781__auto__ = old_13264;
if(cljs.core.truth_(and__6781__auto__)){
return neue_13268__$1;
} else {
return and__6781__auto__;
}
})())){
lt.util.dom.replace_with.call(null,old_13264,neue_13268__$1);
} else {
}

lt.object.raise.call(null,inst_13266,new cljs.core.Keyword(null,"redef","redef",1032704258));

var G__13269 = cljs.core.next.call(null,seq__13232_13255__$1);
var G__13270 = null;
var G__13271 = (0);
var G__13272 = (0);
seq__13232_13238 = G__13269;
chunk__13234_13239 = G__13270;
count__13235_13240 = G__13271;
i__13236_13241 = G__13272;
continue;
}
} else {
}
}
break;
}

return id;
});
/**
 * Create object template (type) given keyword name and key-value pairs.
 *   These pairs serve as default attributes for an object. Following keys
 *   have special meaning:
 * 
 *   * :behaviors - Set of object's behaviors
 *   * :tags - Set of object's tags
 *   * :triggers - Set of object's triggers
 *   * :init - Init fn called when object is created. Fn's return value
 *          is hiccup html content and saved to :content
 *   * :listeners (internal) - Map of triggers to vectors of behaviors
 *   * :doc - Equivalent to a traditional function docstring.
 */
lt.object.object_STAR_ = (function lt$object$object_STAR_(var_args){
var args__7875__auto__ = [];
var len__7868__auto___13275 = arguments.length;
var i__7869__auto___13276 = (0);
while(true){
if((i__7869__auto___13276 < len__7868__auto___13275)){
args__7875__auto__.push((arguments[i__7869__auto___13276]));

var G__13277 = (i__7869__auto___13276 + (1));
i__7869__auto___13276 = G__13277;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((1) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((1)),(0),null)):null);
return lt.object.object_STAR_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7876__auto__);
});

lt.object.object_STAR_.cljs$core$IFn$_invoke$arity$variadic = (function (name,r){
return lt.object.handle_redef.call(null,lt.object.store_object_STAR_.call(null,cljs.core.apply.call(null,lt.object.make_object_STAR_,name,r)));
});

lt.object.object_STAR_.cljs$lang$maxFixedArity = (1);

lt.object.object_STAR_.cljs$lang$applyTo = (function (seq13273){
var G__13274 = cljs.core.first.call(null,seq13273);
var seq13273__$1 = cljs.core.next.call(null,seq13273);
return lt.object.object_STAR_.cljs$core$IFn$_invoke$arity$variadic(G__13274,seq13273__$1);
});

lt.object.make_behavior_STAR_ = (function lt$object$make_behavior_STAR_(var_args){
var args__7875__auto__ = [];
var len__7868__auto___13280 = arguments.length;
var i__7869__auto___13281 = (0);
while(true){
if((i__7869__auto___13281 < len__7868__auto___13280)){
args__7875__auto__.push((arguments[i__7869__auto___13281]));

var G__13282 = (i__7869__auto___13281 + (1));
i__7869__auto___13281 = G__13282;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((1) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((1)),(0),null)):null);
return lt.object.make_behavior_STAR_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7876__auto__);
});

lt.object.make_behavior_STAR_.cljs$core$IFn$_invoke$arity$variadic = (function (name,r){
var be = cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"name","name",1843675177),name], null),cljs.core.apply.call(null,cljs.core.hash_map,r));
return be;
});

lt.object.make_behavior_STAR_.cljs$lang$maxFixedArity = (1);

lt.object.make_behavior_STAR_.cljs$lang$applyTo = (function (seq13278){
var G__13279 = cljs.core.first.call(null,seq13278);
var seq13278__$1 = cljs.core.next.call(null,seq13278);
return lt.object.make_behavior_STAR_.cljs$core$IFn$_invoke$arity$variadic(G__13279,seq13278__$1);
});

lt.object.store_behavior_STAR_ = (function lt$object$store_behavior_STAR_(beh){
lt.object.add_behavior.call(null,beh);

return new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(beh);
});
lt.object.wrap_throttle = (function lt$object$wrap_throttle(beh){
var temp__4655__auto__ = new cljs.core.Keyword(null,"throttle","throttle",-1860340776).cljs$core$IFn$_invoke$arity$1(beh);
if(cljs.core.truth_(temp__4655__auto__)){
var thr = temp__4655__auto__;
return cljs.core.assoc.call(null,beh,new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.util.js.throttle.call(null,thr,new cljs.core.Keyword(null,"reaction","reaction",490869788).cljs$core$IFn$_invoke$arity$1(beh)));
} else {
return beh;
}
});
lt.object.wrap_debounce = (function lt$object$wrap_debounce(beh){
var temp__4655__auto__ = new cljs.core.Keyword(null,"debounce","debounce",-871550296).cljs$core$IFn$_invoke$arity$1(beh);
if(cljs.core.truth_(temp__4655__auto__)){
var thr = temp__4655__auto__;
return cljs.core.assoc.call(null,beh,new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.util.js.debounce.call(null,thr,new cljs.core.Keyword(null,"reaction","reaction",490869788).cljs$core$IFn$_invoke$arity$1(beh)));
} else {
return beh;
}
});
lt.object.behavior_STAR_ = (function lt$object$behavior_STAR_(var_args){
var args__7875__auto__ = [];
var len__7868__auto___13285 = arguments.length;
var i__7869__auto___13286 = (0);
while(true){
if((i__7869__auto___13286 < len__7868__auto___13285)){
args__7875__auto__.push((arguments[i__7869__auto___13286]));

var G__13287 = (i__7869__auto___13286 + (1));
i__7869__auto___13286 = G__13287;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((1) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((1)),(0),null)):null);
return lt.object.behavior_STAR_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7876__auto__);
});

lt.object.behavior_STAR_.cljs$core$IFn$_invoke$arity$variadic = (function (name,r){
return lt.object.store_behavior_STAR_.call(null,lt.object.wrap_debounce.call(null,lt.object.wrap_throttle.call(null,cljs.core.apply.call(null,lt.object.make_behavior_STAR_,name,r))));
});

lt.object.behavior_STAR_.cljs$lang$maxFixedArity = (1);

lt.object.behavior_STAR_.cljs$lang$applyTo = (function (seq13283){
var G__13284 = cljs.core.first.call(null,seq13283);
var seq13283__$1 = cljs.core.next.call(null,seq13283);
return lt.object.behavior_STAR_.cljs$core$IFn$_invoke$arity$variadic(G__13284,seq13283__$1);
});

/**
 * Reduce over invoked object's behavior fns for given trigger. Start
 *   is initial value for reduce and any args are passed to behavior fn
 */
lt.object.raise_reduce = (function lt$object$raise_reduce(var_args){
var args__7875__auto__ = [];
var len__7868__auto___13293 = arguments.length;
var i__7869__auto___13294 = (0);
while(true){
if((i__7869__auto___13294 < len__7868__auto___13293)){
args__7875__auto__.push((arguments[i__7869__auto___13294]));

var G__13295 = (i__7869__auto___13294 + (1));
i__7869__auto___13294 = G__13295;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((3) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((3)),(0),null)):null);
return lt.object.raise_reduce.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__7876__auto__);
});

lt.object.raise_reduce.cljs$core$IFn$_invoke$arity$variadic = (function (obj,k,start,args){
var reactions = k.call(null,new cljs.core.Keyword(null,"listeners","listeners",394544445).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,obj)));
return cljs.core.reduce.call(null,((function (reactions){
return (function (res,cur){
var func = new cljs.core.Keyword(null,"reaction","reaction",490869788).cljs$core$IFn$_invoke$arity$1(lt.object.__GT_behavior.call(null,cur));
var args__$1 = ((cljs.core.coll_QMARK_.call(null,cur))?cljs.core.concat.call(null,cljs.core.rest.call(null,cur),args):args);
var meta = ((cljs.core.coll_QMARK_.call(null,cur))?cljs.core.meta.call(null,cur):cljs.core.PersistentArrayMap.EMPTY);
if(cljs.core.not.call(null,func)){
return res;
} else {
var _STAR_behavior_meta_STAR_13292 = lt.object._STAR_behavior_meta_STAR_;
lt.object._STAR_behavior_meta_STAR_ = meta;

try{return cljs.core.apply.call(null,func,obj,res,args__$1);
}finally {lt.object._STAR_behavior_meta_STAR_ = _STAR_behavior_meta_STAR_13292;
}}
});})(reactions))
,start,reactions);
});

lt.object.raise_reduce.cljs$lang$maxFixedArity = (3);

lt.object.raise_reduce.cljs$lang$applyTo = (function (seq13288){
var G__13289 = cljs.core.first.call(null,seq13288);
var seq13288__$1 = cljs.core.next.call(null,seq13288);
var G__13290 = cljs.core.first.call(null,seq13288__$1);
var seq13288__$2 = cljs.core.next.call(null,seq13288__$1);
var G__13291 = cljs.core.first.call(null,seq13288__$2);
var seq13288__$3 = cljs.core.next.call(null,seq13288__$2);
return lt.object.raise_reduce.cljs$core$IFn$_invoke$arity$variadic(G__13289,G__13290,G__13291,seq13288__$3);
});

/**
 * Update object with update-in with [:key], fn and args
 */
lt.object.update_BANG_ = (function lt$object$update_BANG_(var_args){
var args__7875__auto__ = [];
var len__7868__auto___13299 = arguments.length;
var i__7869__auto___13300 = (0);
while(true){
if((i__7869__auto___13300 < len__7868__auto___13299)){
args__7875__auto__.push((arguments[i__7869__auto___13300]));

var G__13301 = (i__7869__auto___13300 + (1));
i__7869__auto___13300 = G__13301;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((1) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((1)),(0),null)):null);
return lt.object.update_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7876__auto__);
});

lt.object.update_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (obj,r){
return cljs.core.swap_BANG_.call(null,obj,(function (p1__13296_SHARP_){
return cljs.core.apply.call(null,cljs.core.update_in,p1__13296_SHARP_,r);
}));
});

lt.object.update_BANG_.cljs$lang$maxFixedArity = (1);

lt.object.update_BANG_.cljs$lang$applyTo = (function (seq13297){
var G__13298 = cljs.core.first.call(null,seq13297);
var seq13297__$1 = cljs.core.next.call(null,seq13297);
return lt.object.update_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__13298,seq13297__$1);
});

/**
 * Update object with assoc-in for given key and value
 */
lt.object.assoc_in_BANG_ = (function lt$object$assoc_in_BANG_(obj,k,v){
if(cljs.core.truth_((function (){var and__6781__auto__ = k;
if(cljs.core.truth_(and__6781__auto__)){
return !(cljs.core.sequential_QMARK_.call(null,k));
} else {
return and__6781__auto__;
}
})())){
throw (new Error([cljs.core.str("Associate requires a sequence of keys: "),cljs.core.str(k)].join('')));
} else {
}

return cljs.core.swap_BANG_.call(null,obj,(function (p1__13302_SHARP_){
return cljs.core.assoc_in.call(null,p1__13302_SHARP_,k,v);
}));
});
lt.object.__GT_inst = (function lt$object$__GT_inst(o){
if(cljs.core.map_QMARK_.call(null,o)){
return cljs.core.deref.call(null,lt.object.instances).call(null,lt.object.__GT_id.call(null,o));
} else {
if(cljs.core.truth_(crate.binding.deref_QMARK_.call(null,o))){
return o;
} else {
return cljs.core.deref.call(null,lt.object.instances).call(null,o);

}
}
});
/**
 * Return DOM content associated with object
 */
lt.object.__GT_content = (function lt$object$__GT_content(obj){
return new cljs.core.Keyword(null,"content","content",15833224).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,obj));
});
/**
 * Destroy object by calling its :destroy trigger, removing it from
 *   cache and removing associated DOM content
 */
lt.object.destroy_BANG_ = (function lt$object$destroy_BANG_(obj){
var temp__4657__auto__ = lt.object.__GT_inst.call(null,obj);
if(cljs.core.truth_(temp__4657__auto__)){
var inst = temp__4657__auto__;
lt.object.raise.call(null,inst,new cljs.core.Keyword(null,"destroy","destroy",-843660405));

cljs.core.swap_BANG_.call(null,lt.object.instances,cljs.core.dissoc,lt.object.__GT_id.call(null,inst));

if(cljs.core.truth_(lt.object.__GT_content.call(null,obj))){
lt.util.dom.remove.call(null,lt.object.__GT_content.call(null,obj));
} else {
}

return cljs.core.reset_BANG_.call(null,obj,null);
} else {
return null;
}
});
lt.object.store_inst = (function lt$object$store_inst(inst){
cljs.core.swap_BANG_.call(null,lt.object.instances,cljs.core.assoc,new cljs.core.Keyword("lt.object","id","lt.object/id",-955176977).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,inst)),inst);

return inst;
});
/**
 * Create object given keyword name of object template or an object template
 *   and key-value pairs. See object* for special keys.
 *   During object creation the following happens to object in order:
 * 
 *   * :init fn is called with given args
 *   * :object.instant trigger is raised
 *   * :init trigger is raised
 */
lt.object.create = (function lt$object$create(var_args){
var args__7875__auto__ = [];
var len__7868__auto___13305 = arguments.length;
var i__7869__auto___13306 = (0);
while(true){
if((i__7869__auto___13306 < len__7868__auto___13305)){
args__7875__auto__.push((arguments[i__7869__auto___13306]));

var G__13307 = (i__7869__auto___13306 + (1));
i__7869__auto___13306 = G__13307;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((1) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((1)),(0),null)):null);
return lt.object.create.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7876__auto__);
});

lt.object.create.cljs$core$IFn$_invoke$arity$variadic = (function (obj_name,args){
var obj = (((obj_name instanceof cljs.core.Keyword))?cljs.core.deref.call(null,lt.object.object_defs).call(null,obj_name):obj_name);
var id = (function (){var or__6793__auto__ = new cljs.core.Keyword("lt.object","id","lt.object/id",-955176977).cljs$core$IFn$_invoke$arity$1(obj);
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return cljs.core.swap_BANG_.call(null,lt.object.obj_id,cljs.core.inc);
}
})();
var inst = cljs.core.atom.call(null,cljs.core.assoc.call(null,cljs.core.dissoc.call(null,obj,new cljs.core.Keyword(null,"init","init",-1875481434)),new cljs.core.Keyword("lt.object","id","lt.object/id",-955176977),id,new cljs.core.Keyword(null,"args","args",1315556576),args,new cljs.core.Keyword(null,"behaviors","behaviors",120724909),cljs.core.set.call(null,new cljs.core.Keyword(null,"behaviors","behaviors",120724909).cljs$core$IFn$_invoke$arity$1(obj)),new cljs.core.Keyword(null,"tags","tags",1771418977),cljs.core.set.call(null,cljs.core.conj.call(null,new cljs.core.Keyword(null,"tags","tags",1771418977).cljs$core$IFn$_invoke$arity$1(obj),new cljs.core.Keyword(null,"object","object",1474613949)))));
var inst__$1 = lt.object.store_inst.call(null,inst);
var _ = lt.object.merge_BANG_.call(null,inst__$1,lt.object.update_listeners.call(null,inst__$1));
var content = (cljs.core.truth_(new cljs.core.Keyword(null,"init","init",-1875481434).cljs$core$IFn$_invoke$arity$1(obj))?cljs.core.apply.call(null,new cljs.core.Keyword(null,"init","init",-1875481434).cljs$core$IFn$_invoke$arity$1(obj),inst__$1,args):null);
var content__$1 = ((cljs.core.vector_QMARK_.call(null,content))?crate.core.html.call(null,content):content);
var final$ = lt.object.merge_BANG_.call(null,inst__$1,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"content","content",15833224),content__$1], null));
cljs.core.add_watch.call(null,inst__$1,new cljs.core.Keyword("lt.object","change","lt.object/change",-637349099),((function (obj,id,inst,inst__$1,_,content,content__$1,final$){
return (function (___$1,___$2,___$3,___$4){
return lt.object.raise.call(null,inst__$1,new cljs.core.Keyword(null,"object.change","object.change",1326688845));
});})(obj,id,inst,inst__$1,_,content,content__$1,final$))
);

lt.object.raise_STAR_.call(null,inst__$1,lt.object.trigger__GT_behaviors.call(null,new cljs.core.Keyword(null,"object.instant","object.instant",-29936727),new cljs.core.Keyword(null,"tags","tags",1771418977).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,inst__$1))),null);

lt.object.raise.call(null,inst__$1,new cljs.core.Keyword(null,"init","init",-1875481434));

return inst__$1;
});

lt.object.create.cljs$lang$maxFixedArity = (1);

lt.object.create.cljs$lang$applyTo = (function (seq13303){
var G__13304 = cljs.core.first.call(null,seq13303);
var seq13303__$1 = cljs.core.next.call(null,seq13303);
return lt.object.create.cljs$core$IFn$_invoke$arity$variadic(G__13304,seq13303__$1);
});

lt.object.refresh_BANG_ = (function lt$object$refresh_BANG_(obj){
cljs.core.reset_BANG_.call(null,obj,lt.object.update_listeners.call(null,obj));

lt.object.raise_STAR_.call(null,obj,lt.object.trigger__GT_behaviors.call(null,new cljs.core.Keyword(null,"object.instant","object.instant",-29936727),new cljs.core.Keyword(null,"tags","tags",1771418977).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,obj))),null);

return lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"object.refresh","object.refresh",108293994));
});
/**
 * Add behavior to object and update its listeners
 */
lt.object.add_behavior_BANG_ = (function lt$object$add_behavior_BANG_(obj,behavior){
lt.object.update_BANG_.call(null,obj,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"behaviors","behaviors",120724909)], null),cljs.core.conj,behavior);

return cljs.core.reset_BANG_.call(null,obj,lt.object.update_listeners.call(null,obj));
});
/**
 * Remove behavior from object and update its listeners
 */
lt.object.rem_behavior_BANG_ = (function lt$object$rem_behavior_BANG_(obj,behavior){
lt.object.update_BANG_.call(null,obj,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"behaviors","behaviors",120724909)], null),(function (p1__13308_SHARP_){
return cljs.core.remove.call(null,cljs.core.PersistentHashSet.fromArray([behavior], true),p1__13308_SHARP_);
}));

return cljs.core.reset_BANG_.call(null,obj,lt.object.update_listeners.call(null,obj));
});
lt.object.__GT_def = (function lt$object$__GT_def(def_BAR_name){
if(cljs.core.map_QMARK_.call(null,def_BAR_name)){
return def_BAR_name;
} else {
return cljs.core.deref.call(null,lt.object.object_defs).call(null,def_BAR_name);
}
});
/**
 * Find object by its unique numerical id
 */
lt.object.by_id = (function lt$object$by_id(id){
if(cljs.core.truth_(id)){
return cljs.core.deref.call(null,lt.object.instances).call(null,id);
} else {
return null;
}
});
/**
 * Find objects that have given tag
 */
lt.object.by_tag = (function lt$object$by_tag(tag){
return cljs.core.sort_by.call(null,cljs.core.comp.call(null,new cljs.core.Keyword("lt.object","id","lt.object/id",-955176977),cljs.core.deref),cljs.core.filter.call(null,(function (p1__13309_SHARP_){
var temp__4657__auto__ = new cljs.core.Keyword(null,"tags","tags",1771418977).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,p1__13309_SHARP_));
if(cljs.core.truth_(temp__4657__auto__)){
var ts = temp__4657__auto__;
return ts.call(null,tag);
} else {
return null;
}
}),cljs.core.vals.call(null,cljs.core.deref.call(null,lt.object.instances))));
});
lt.object.in_tag_QMARK_ = (function lt$object$in_tag_QMARK_(tag,behavior){
return cljs.core.first.call(null,cljs.core.filter.call(null,cljs.core.PersistentHashSet.fromArray([behavior], true),cljs.core.deref.call(null,lt.object.tags).call(null,tag)));
});
/**
 * Return truthy if object has tag
 */
lt.object.has_tag_QMARK_ = (function lt$object$has_tag_QMARK_(obj,tag){
return new cljs.core.Keyword(null,"tags","tags",1771418977).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,obj)).call(null,tag);
});
/**
 * Add tags to given object and updates effected behaviors and listeners.
 *   ::tags-added trigger is raised on object after update
 */
lt.object.add_tags = (function lt$object$add_tags(obj,ts){
lt.object.update_BANG_.call(null,obj,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tags","tags",1771418977)], null),(function (p1__13310_SHARP_){
return cljs.core.reduce.call(null,cljs.core.conj,p1__13310_SHARP_,cljs.core.filter.call(null,cljs.core.identity,ts));
}));

cljs.core.reset_BANG_.call(null,obj,lt.object.update_listeners.call(null,obj));

lt.object.raise.call(null,obj,new cljs.core.Keyword("lt.object","tags-added","lt.object/tags-added",-1159163937),ts);

lt.object.raise_STAR_.call(null,obj,lt.object.trigger__GT_behaviors.call(null,new cljs.core.Keyword(null,"object.instant","object.instant",-29936727),ts),null);

return obj;
});
/**
 * Remove tags from given object and updates effected behaviors and listeners.
 *   ::tags-removed trigger is raised on object after update
 */
lt.object.remove_tags = (function lt$object$remove_tags(obj,ts){
var cur = cljs.core.deref.call(null,obj);
var behs = cljs.core.apply.call(null,cljs.core.concat,cljs.core.map.call(null,cljs.core.deref.call(null,lt.object.tags),ts));
var cur__$1 = cljs.core.update_in.call(null,cljs.core.update_in.call(null,cljs.core.update_in.call(null,cur,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tags","tags",1771418977)], null),((function (cur,behs){
return (function (p1__13311_SHARP_){
return cljs.core.reduce.call(null,cljs.core.disj,p1__13311_SHARP_,ts);
});})(cur,behs))
),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"behaviors","behaviors",120724909)], null),((function (cur,behs){
return (function (p1__13312_SHARP_){
return cljs.core.remove.call(null,cljs.core.PersistentHashSet.fromArray([behs], true),p1__13312_SHARP_);
});})(cur,behs))
),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"listeners","listeners",394544445)], null),((function (cur,behs){
return (function (p1__13313_SHARP_){
return cljs.core.apply.call(null,cljs.core.dissoc,p1__13313_SHARP_,ts);
});})(cur,behs))
);
lt.object.merge_BANG_.call(null,obj,cur__$1);

cljs.core.reset_BANG_.call(null,obj,lt.object.update_listeners.call(null,obj));

lt.object.raise.call(null,obj,new cljs.core.Keyword("lt.object","tags-removed","lt.object/tags-removed",1746536637),ts);

return obj;
});
/**
 * Associate behaviors to given tag and refresh objects with given tag
 */
lt.object.tag_behaviors = (function lt$object$tag_behaviors(tag,behs){
cljs.core.swap_BANG_.call(null,lt.object.tags,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [tag], null),(function (p1__13314_SHARP_){
return cljs.core.reduce.call(null,cljs.core.conj,(function (){var or__6793__auto__ = p1__13314_SHARP_;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return cljs.core.List.EMPTY;
}
})(),behs);
}));

var seq__13319_13323 = cljs.core.seq.call(null,lt.object.by_tag.call(null,tag));
var chunk__13320_13324 = null;
var count__13321_13325 = (0);
var i__13322_13326 = (0);
while(true){
if((i__13322_13326 < count__13321_13325)){
var cur_13327 = cljs.core._nth.call(null,chunk__13320_13324,i__13322_13326);
lt.object.refresh_BANG_.call(null,cur_13327);

var G__13328 = seq__13319_13323;
var G__13329 = chunk__13320_13324;
var G__13330 = count__13321_13325;
var G__13331 = (i__13322_13326 + (1));
seq__13319_13323 = G__13328;
chunk__13320_13324 = G__13329;
count__13321_13325 = G__13330;
i__13322_13326 = G__13331;
continue;
} else {
var temp__4657__auto___13332 = cljs.core.seq.call(null,seq__13319_13323);
if(temp__4657__auto___13332){
var seq__13319_13333__$1 = temp__4657__auto___13332;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13319_13333__$1)){
var c__7604__auto___13334 = cljs.core.chunk_first.call(null,seq__13319_13333__$1);
var G__13335 = cljs.core.chunk_rest.call(null,seq__13319_13333__$1);
var G__13336 = c__7604__auto___13334;
var G__13337 = cljs.core.count.call(null,c__7604__auto___13334);
var G__13338 = (0);
seq__13319_13323 = G__13335;
chunk__13320_13324 = G__13336;
count__13321_13325 = G__13337;
i__13322_13326 = G__13338;
continue;
} else {
var cur_13339 = cljs.core.first.call(null,seq__13319_13333__$1);
lt.object.refresh_BANG_.call(null,cur_13339);

var G__13340 = cljs.core.next.call(null,seq__13319_13333__$1);
var G__13341 = null;
var G__13342 = (0);
var G__13343 = (0);
seq__13319_13323 = G__13340;
chunk__13320_13324 = G__13341;
count__13321_13325 = G__13342;
i__13322_13326 = G__13343;
continue;
}
} else {
}
}
break;
}

return cljs.core.deref.call(null,lt.object.tags).call(null,tag);
});
lt.object.remove_tag_behaviors = (function lt$object$remove_tag_behaviors(tag,behs){
cljs.core.swap_BANG_.call(null,lt.object.tags,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [tag], null),(function (p1__13344_SHARP_){
return cljs.core.remove.call(null,cljs.core.set.call(null,behs),(function (){var or__6793__auto__ = p1__13344_SHARP_;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return cljs.core.List.EMPTY;
}
})());
}));

var seq__13357 = cljs.core.seq.call(null,lt.object.by_tag.call(null,tag));
var chunk__13362 = null;
var count__13363 = (0);
var i__13364 = (0);
while(true){
if((i__13364 < count__13363)){
var cur = cljs.core._nth.call(null,chunk__13362,i__13364);
var seq__13365_13369 = cljs.core.seq.call(null,behs);
var chunk__13366_13370 = null;
var count__13367_13371 = (0);
var i__13368_13372 = (0);
while(true){
if((i__13368_13372 < count__13367_13371)){
var b_13373 = cljs.core._nth.call(null,chunk__13366_13370,i__13368_13372);
lt.object.rem_behavior_BANG_.call(null,cur,b_13373);

var G__13374 = seq__13365_13369;
var G__13375 = chunk__13366_13370;
var G__13376 = count__13367_13371;
var G__13377 = (i__13368_13372 + (1));
seq__13365_13369 = G__13374;
chunk__13366_13370 = G__13375;
count__13367_13371 = G__13376;
i__13368_13372 = G__13377;
continue;
} else {
var temp__4657__auto___13378 = cljs.core.seq.call(null,seq__13365_13369);
if(temp__4657__auto___13378){
var seq__13365_13379__$1 = temp__4657__auto___13378;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13365_13379__$1)){
var c__7604__auto___13380 = cljs.core.chunk_first.call(null,seq__13365_13379__$1);
var G__13381 = cljs.core.chunk_rest.call(null,seq__13365_13379__$1);
var G__13382 = c__7604__auto___13380;
var G__13383 = cljs.core.count.call(null,c__7604__auto___13380);
var G__13384 = (0);
seq__13365_13369 = G__13381;
chunk__13366_13370 = G__13382;
count__13367_13371 = G__13383;
i__13368_13372 = G__13384;
continue;
} else {
var b_13385 = cljs.core.first.call(null,seq__13365_13379__$1);
lt.object.rem_behavior_BANG_.call(null,cur,b_13385);

var G__13386 = cljs.core.next.call(null,seq__13365_13379__$1);
var G__13387 = null;
var G__13388 = (0);
var G__13389 = (0);
seq__13365_13369 = G__13386;
chunk__13366_13370 = G__13387;
count__13367_13371 = G__13388;
i__13368_13372 = G__13389;
continue;
}
} else {
}
}
break;
}

var G__13390 = seq__13357;
var G__13391 = chunk__13362;
var G__13392 = count__13363;
var G__13393 = (i__13364 + (1));
seq__13357 = G__13390;
chunk__13362 = G__13391;
count__13363 = G__13392;
i__13364 = G__13393;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__13357);
if(temp__4657__auto__){
var seq__13357__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13357__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__13357__$1);
var G__13394 = cljs.core.chunk_rest.call(null,seq__13357__$1);
var G__13395 = c__7604__auto__;
var G__13396 = cljs.core.count.call(null,c__7604__auto__);
var G__13397 = (0);
seq__13357 = G__13394;
chunk__13362 = G__13395;
count__13363 = G__13396;
i__13364 = G__13397;
continue;
} else {
var cur = cljs.core.first.call(null,seq__13357__$1);
var seq__13358_13398 = cljs.core.seq.call(null,behs);
var chunk__13359_13399 = null;
var count__13360_13400 = (0);
var i__13361_13401 = (0);
while(true){
if((i__13361_13401 < count__13360_13400)){
var b_13402 = cljs.core._nth.call(null,chunk__13359_13399,i__13361_13401);
lt.object.rem_behavior_BANG_.call(null,cur,b_13402);

var G__13403 = seq__13358_13398;
var G__13404 = chunk__13359_13399;
var G__13405 = count__13360_13400;
var G__13406 = (i__13361_13401 + (1));
seq__13358_13398 = G__13403;
chunk__13359_13399 = G__13404;
count__13360_13400 = G__13405;
i__13361_13401 = G__13406;
continue;
} else {
var temp__4657__auto___13407__$1 = cljs.core.seq.call(null,seq__13358_13398);
if(temp__4657__auto___13407__$1){
var seq__13358_13408__$1 = temp__4657__auto___13407__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13358_13408__$1)){
var c__7604__auto___13409 = cljs.core.chunk_first.call(null,seq__13358_13408__$1);
var G__13410 = cljs.core.chunk_rest.call(null,seq__13358_13408__$1);
var G__13411 = c__7604__auto___13409;
var G__13412 = cljs.core.count.call(null,c__7604__auto___13409);
var G__13413 = (0);
seq__13358_13398 = G__13410;
chunk__13359_13399 = G__13411;
count__13360_13400 = G__13412;
i__13361_13401 = G__13413;
continue;
} else {
var b_13414 = cljs.core.first.call(null,seq__13358_13408__$1);
lt.object.rem_behavior_BANG_.call(null,cur,b_13414);

var G__13415 = cljs.core.next.call(null,seq__13358_13408__$1);
var G__13416 = null;
var G__13417 = (0);
var G__13418 = (0);
seq__13358_13398 = G__13415;
chunk__13359_13399 = G__13416;
count__13360_13400 = G__13417;
i__13361_13401 = G__13418;
continue;
}
} else {
}
}
break;
}

var G__13419 = cljs.core.next.call(null,seq__13357__$1);
var G__13420 = null;
var G__13421 = (0);
var G__13422 = (0);
seq__13357 = G__13419;
chunk__13362 = G__13420;
count__13363 = G__13421;
i__13364 = G__13422;
continue;
}
} else {
return null;
}
}
break;
}
});
/**
 * 
 */
lt.object.__BEH__add_tag = (function lt$object$__BEH__add_tag(this$,t){
if(cljs.core.truth_(t)){
return lt.object.add_tags.call(null,this$,((cljs.core.coll_QMARK_.call(null,t))?t:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [t], null)));
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.object","add-tag","lt.object/add-tag",-1609816422),new cljs.core.Keyword(null,"desc","desc",2093485764),"App: Add tag to object",new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1718410804),"tag"], null)], null),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"object.instant","object.instant",-29936727),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.object.__BEH__add_tag);
/**
 * 
 */
lt.object.__BEH__remove_tag = (function lt$object$__BEH__remove_tag(this$,t){
if(cljs.core.truth_(lt.object.has_tag_QMARK_.call(null,this$,t))){
return lt.object.remove_tags.call(null,this$,((cljs.core.coll_QMARK_.call(null,t))?t:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [t], null)));
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.object","remove-tag","lt.object/remove-tag",232842813),new cljs.core.Keyword(null,"desc","desc",2093485764),"App: Remove tag from object",new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1718410804),"tag"], null)], null),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"object.instant","object.instant",-29936727),null,new cljs.core.Keyword("lt.object","tags-added","lt.object/tags-added",-1159163937),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.object.__BEH__remove_tag);
/**
 * 
 */
lt.object.__BEH__shadow_tag = (function lt$object$__BEH__shadow_tag(this$,to_shadow,to_add){
var has_shadow_QMARK_ = lt.object.has_tag_QMARK_.call(null,this$,to_shadow);
var has_add_QMARK_ = lt.object.has_tag_QMARK_.call(null,this$,to_add);
if(cljs.core.truth_((function (){var and__6781__auto__ = has_shadow_QMARK_;
if(cljs.core.truth_(and__6781__auto__)){
return cljs.core.not.call(null,has_add_QMARK_);
} else {
return and__6781__auto__;
}
})())){
return lt.object.add_tags.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [to_add], null));
} else {
if(cljs.core.truth_((function (){var and__6781__auto__ = cljs.core.not.call(null,has_shadow_QMARK_);
if(and__6781__auto__){
return has_add_QMARK_;
} else {
return and__6781__auto__;
}
})())){
return lt.object.remove_tags.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [to_add], null));
} else {
return null;

}
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.object","shadow-tag","lt.object/shadow-tag",1057483313),new cljs.core.Keyword(null,"desc","desc",2093485764),"App: Shadow a tag on an object",new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1718410804),"tag to shadow"], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1718410804),"tag to add"], null)], null),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"object.instant","object.instant",-29936727),null,new cljs.core.Keyword("lt.object","tags-removed","lt.object/tags-removed",1746536637),null,new cljs.core.Keyword("lt.object","tags-added","lt.object/tags-added",-1159163937),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.object.__BEH__shadow_tag);
/**
 * 
 */
lt.object.__BEH__report_time = (function lt$object$__BEH__report_time(this$,beh,time,trigger){
if(cljs.core.truth_(lt.objs.console)){
return lt.objs.console.log([cljs.core.str(beh),cljs.core.str(" triggered by "),cljs.core.str(trigger),cljs.core.str(" took "),cljs.core.str(time),cljs.core.str("ms")].join(''));
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.object","report-time","lt.object/report-time",-380592527),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"object.behavior.time","object.behavior.time",-1731850612),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.object.__BEH__report_time);
