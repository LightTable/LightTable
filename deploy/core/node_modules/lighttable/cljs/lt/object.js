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
var seq__12981_12993 = cljs.core.seq.call(null,behs);
var chunk__12986_12994 = null;
var count__12987_12995 = (0);
var i__12988_12996 = (0);
while(true){
if((i__12988_12996 < count__12987_12995)){
var beh_12997 = cljs.core._nth.call(null,chunk__12986_12994,i__12988_12996);
var seq__12989_12998 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"triggers","triggers",-1443678770).cljs$core$IFn$_invoke$arity$1(lt.object.__GT_behavior.call(null,beh_12997)));
var chunk__12990_12999 = null;
var count__12991_13000 = (0);
var i__12992_13001 = (0);
while(true){
if((i__12992_13001 < count__12991_13000)){
var t_13002 = cljs.core._nth.call(null,chunk__12990_12999,i__12992_13001);
cljs.core.swap_BANG_.call(null,result,cljs.core.assoc_BANG_,t_13002,cljs.core.conj.call(null,(function (){var or__6793__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,result),t_13002);
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return cljs.core.PersistentVector.EMPTY;
}
})(),beh_12997));

var G__13003 = seq__12989_12998;
var G__13004 = chunk__12990_12999;
var G__13005 = count__12991_13000;
var G__13006 = (i__12992_13001 + (1));
seq__12989_12998 = G__13003;
chunk__12990_12999 = G__13004;
count__12991_13000 = G__13005;
i__12992_13001 = G__13006;
continue;
} else {
var temp__4657__auto___13007 = cljs.core.seq.call(null,seq__12989_12998);
if(temp__4657__auto___13007){
var seq__12989_13008__$1 = temp__4657__auto___13007;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__12989_13008__$1)){
var c__7604__auto___13009 = cljs.core.chunk_first.call(null,seq__12989_13008__$1);
var G__13010 = cljs.core.chunk_rest.call(null,seq__12989_13008__$1);
var G__13011 = c__7604__auto___13009;
var G__13012 = cljs.core.count.call(null,c__7604__auto___13009);
var G__13013 = (0);
seq__12989_12998 = G__13010;
chunk__12990_12999 = G__13011;
count__12991_13000 = G__13012;
i__12992_13001 = G__13013;
continue;
} else {
var t_13014 = cljs.core.first.call(null,seq__12989_13008__$1);
cljs.core.swap_BANG_.call(null,result,cljs.core.assoc_BANG_,t_13014,cljs.core.conj.call(null,(function (){var or__6793__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,result),t_13014);
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return cljs.core.PersistentVector.EMPTY;
}
})(),beh_12997));

var G__13015 = cljs.core.next.call(null,seq__12989_13008__$1);
var G__13016 = null;
var G__13017 = (0);
var G__13018 = (0);
seq__12989_12998 = G__13015;
chunk__12990_12999 = G__13016;
count__12991_13000 = G__13017;
i__12992_13001 = G__13018;
continue;
}
} else {
}
}
break;
}

var G__13019 = seq__12981_12993;
var G__13020 = chunk__12986_12994;
var G__13021 = count__12987_12995;
var G__13022 = (i__12988_12996 + (1));
seq__12981_12993 = G__13019;
chunk__12986_12994 = G__13020;
count__12987_12995 = G__13021;
i__12988_12996 = G__13022;
continue;
} else {
var temp__4657__auto___13023 = cljs.core.seq.call(null,seq__12981_12993);
if(temp__4657__auto___13023){
var seq__12981_13024__$1 = temp__4657__auto___13023;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__12981_13024__$1)){
var c__7604__auto___13025 = cljs.core.chunk_first.call(null,seq__12981_13024__$1);
var G__13026 = cljs.core.chunk_rest.call(null,seq__12981_13024__$1);
var G__13027 = c__7604__auto___13025;
var G__13028 = cljs.core.count.call(null,c__7604__auto___13025);
var G__13029 = (0);
seq__12981_12993 = G__13026;
chunk__12986_12994 = G__13027;
count__12987_12995 = G__13028;
i__12988_12996 = G__13029;
continue;
} else {
var beh_13030 = cljs.core.first.call(null,seq__12981_13024__$1);
var seq__12982_13031 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"triggers","triggers",-1443678770).cljs$core$IFn$_invoke$arity$1(lt.object.__GT_behavior.call(null,beh_13030)));
var chunk__12983_13032 = null;
var count__12984_13033 = (0);
var i__12985_13034 = (0);
while(true){
if((i__12985_13034 < count__12984_13033)){
var t_13035 = cljs.core._nth.call(null,chunk__12983_13032,i__12985_13034);
cljs.core.swap_BANG_.call(null,result,cljs.core.assoc_BANG_,t_13035,cljs.core.conj.call(null,(function (){var or__6793__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,result),t_13035);
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return cljs.core.PersistentVector.EMPTY;
}
})(),beh_13030));

var G__13036 = seq__12982_13031;
var G__13037 = chunk__12983_13032;
var G__13038 = count__12984_13033;
var G__13039 = (i__12985_13034 + (1));
seq__12982_13031 = G__13036;
chunk__12983_13032 = G__13037;
count__12984_13033 = G__13038;
i__12985_13034 = G__13039;
continue;
} else {
var temp__4657__auto___13040__$1 = cljs.core.seq.call(null,seq__12982_13031);
if(temp__4657__auto___13040__$1){
var seq__12982_13041__$1 = temp__4657__auto___13040__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__12982_13041__$1)){
var c__7604__auto___13042 = cljs.core.chunk_first.call(null,seq__12982_13041__$1);
var G__13043 = cljs.core.chunk_rest.call(null,seq__12982_13041__$1);
var G__13044 = c__7604__auto___13042;
var G__13045 = cljs.core.count.call(null,c__7604__auto___13042);
var G__13046 = (0);
seq__12982_13031 = G__13043;
chunk__12983_13032 = G__13044;
count__12984_13033 = G__13045;
i__12985_13034 = G__13046;
continue;
} else {
var t_13047 = cljs.core.first.call(null,seq__12982_13041__$1);
cljs.core.swap_BANG_.call(null,result,cljs.core.assoc_BANG_,t_13047,cljs.core.conj.call(null,(function (){var or__6793__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,result),t_13047);
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return cljs.core.PersistentVector.EMPTY;
}
})(),beh_13030));

var G__13048 = cljs.core.next.call(null,seq__12982_13041__$1);
var G__13049 = null;
var G__13050 = (0);
var G__13051 = (0);
seq__12982_13031 = G__13048;
chunk__12983_13032 = G__13049;
count__12984_13033 = G__13050;
i__12985_13034 = G__13051;
continue;
}
} else {
}
}
break;
}

var G__13052 = cljs.core.next.call(null,seq__12981_13024__$1);
var G__13053 = null;
var G__13054 = (0);
var G__13055 = (0);
seq__12981_12993 = G__13052;
chunk__12986_12994 = G__13053;
count__12987_12995 = G__13054;
i__12988_12996 = G__13055;
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
var args13056 = [];
var len__7868__auto___13063 = arguments.length;
var i__7869__auto___13064 = (0);
while(true){
if((i__7869__auto___13064 < len__7868__auto___13063)){
args13056.push((arguments[i__7869__auto___13064]));

var G__13065 = (i__7869__auto___13064 + (1));
i__7869__auto___13064 = G__13065;
continue;
} else {
}
break;
}

var G__13058 = args13056.length;
switch (G__13058) {
case 1:
return lt.object.specificity_sort.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return lt.object.specificity_sort.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13056.length)].join('')));

}
});

lt.object.specificity_sort.cljs$core$IFn$_invoke$arity$1 = (function (xs){
return lt.object.specificity_sort.call(null,xs,null);
});

lt.object.specificity_sort.cljs$core$IFn$_invoke$arity$2 = (function (xs,dir){
var arr = [];
var seq__13059_13067 = cljs.core.seq.call(null,xs);
var chunk__13060_13068 = null;
var count__13061_13069 = (0);
var i__13062_13070 = (0);
while(true){
if((i__13062_13070 < count__13061_13069)){
var x_13071 = cljs.core._nth.call(null,chunk__13060_13068,i__13062_13070);
arr.push([[cljs.core.str(x_13071)].join('').split(".").length,[cljs.core.str(x_13071)].join(''),x_13071]);

var G__13072 = seq__13059_13067;
var G__13073 = chunk__13060_13068;
var G__13074 = count__13061_13069;
var G__13075 = (i__13062_13070 + (1));
seq__13059_13067 = G__13072;
chunk__13060_13068 = G__13073;
count__13061_13069 = G__13074;
i__13062_13070 = G__13075;
continue;
} else {
var temp__4657__auto___13076 = cljs.core.seq.call(null,seq__13059_13067);
if(temp__4657__auto___13076){
var seq__13059_13077__$1 = temp__4657__auto___13076;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13059_13077__$1)){
var c__7604__auto___13078 = cljs.core.chunk_first.call(null,seq__13059_13077__$1);
var G__13079 = cljs.core.chunk_rest.call(null,seq__13059_13077__$1);
var G__13080 = c__7604__auto___13078;
var G__13081 = cljs.core.count.call(null,c__7604__auto___13078);
var G__13082 = (0);
seq__13059_13067 = G__13079;
chunk__13060_13068 = G__13080;
count__13061_13069 = G__13081;
i__13062_13070 = G__13082;
continue;
} else {
var x_13083 = cljs.core.first.call(null,seq__13059_13077__$1);
arr.push([[cljs.core.str(x_13083)].join('').split(".").length,[cljs.core.str(x_13083)].join(''),x_13083]);

var G__13084 = cljs.core.next.call(null,seq__13059_13077__$1);
var G__13085 = null;
var G__13086 = (0);
var G__13087 = (0);
seq__13059_13067 = G__13084;
chunk__13060_13068 = G__13085;
count__13061_13069 = G__13086;
i__13062_13070 = G__13087;
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

var arr__8027__auto___13088 = arr;
var i_13089 = (0);
while(true){
if((i_13089 < arr__8027__auto___13088.length)){
(arr[i_13089] = (arr[i_13089][(2)]));

var G__13090 = (i_13089 + (1));
i_13089 = G__13090;
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
var seq__13099_13103 = cljs.core.seq.call(null,cljs.core.apply.call(null,cljs.core.concat,cljs.core.map.call(null,cljs.core.deref.call(null,lt.object.negated_tags),ts)));
var chunk__13100_13104 = null;
var count__13101_13105 = (0);
var i__13102_13106 = (0);
while(true){
if((i__13102_13106 < count__13101_13105)){
var beh_13107 = cljs.core._nth.call(null,chunk__13100_13104,i__13102_13106);
(seen[lt.object.__GT_behavior_name.call(null,beh_13107)] = true);

var G__13108 = seq__13099_13103;
var G__13109 = chunk__13100_13104;
var G__13110 = count__13101_13105;
var G__13111 = (i__13102_13106 + (1));
seq__13099_13103 = G__13108;
chunk__13100_13104 = G__13109;
count__13101_13105 = G__13110;
i__13102_13106 = G__13111;
continue;
} else {
var temp__4657__auto___13112 = cljs.core.seq.call(null,seq__13099_13103);
if(temp__4657__auto___13112){
var seq__13099_13113__$1 = temp__4657__auto___13112;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13099_13113__$1)){
var c__7604__auto___13114 = cljs.core.chunk_first.call(null,seq__13099_13113__$1);
var G__13115 = cljs.core.chunk_rest.call(null,seq__13099_13113__$1);
var G__13116 = c__7604__auto___13114;
var G__13117 = cljs.core.count.call(null,c__7604__auto___13114);
var G__13118 = (0);
seq__13099_13103 = G__13115;
chunk__13100_13104 = G__13116;
count__13101_13105 = G__13117;
i__13102_13106 = G__13118;
continue;
} else {
var beh_13119 = cljs.core.first.call(null,seq__13099_13113__$1);
(seen[lt.object.__GT_behavior_name.call(null,beh_13119)] = true);

var G__13120 = cljs.core.next.call(null,seq__13099_13113__$1);
var G__13121 = null;
var G__13122 = (0);
var G__13123 = (0);
seq__13099_13103 = G__13120;
chunk__13100_13104 = G__13121;
count__13101_13105 = G__13122;
i__13102_13106 = G__13123;
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
var seq__13128_13132 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"exclusive","exclusive",-1507998718).cljs$core$IFn$_invoke$arity$1(beh));
var chunk__13129_13133 = null;
var count__13130_13134 = (0);
var i__13131_13135 = (0);
while(true){
if((i__13131_13135 < count__13130_13134)){
var exclude_13136 = cljs.core._nth.call(null,chunk__13129_13133,i__13131_13135);
(new cljs.core.Keyword(null,"seen","seen",-518999789).cljs$core$IFn$_invoke$arity$1(res)[exclude_13136] = true);

var G__13137 = seq__13128_13132;
var G__13138 = chunk__13129_13133;
var G__13139 = count__13130_13134;
var G__13140 = (i__13131_13135 + (1));
seq__13128_13132 = G__13137;
chunk__13129_13133 = G__13138;
count__13130_13134 = G__13139;
i__13131_13135 = G__13140;
continue;
} else {
var temp__4657__auto___13141 = cljs.core.seq.call(null,seq__13128_13132);
if(temp__4657__auto___13141){
var seq__13128_13142__$1 = temp__4657__auto___13141;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13128_13142__$1)){
var c__7604__auto___13143 = cljs.core.chunk_first.call(null,seq__13128_13142__$1);
var G__13144 = cljs.core.chunk_rest.call(null,seq__13128_13142__$1);
var G__13145 = c__7604__auto___13143;
var G__13146 = cljs.core.count.call(null,c__7604__auto___13143);
var G__13147 = (0);
seq__13128_13132 = G__13144;
chunk__13129_13133 = G__13145;
count__13130_13134 = G__13146;
i__13131_13135 = G__13147;
continue;
} else {
var exclude_13148 = cljs.core.first.call(null,seq__13128_13142__$1);
(new cljs.core.Keyword(null,"seen","seen",-518999789).cljs$core$IFn$_invoke$arity$1(res)[exclude_13148] = true);

var G__13149 = cljs.core.next.call(null,seq__13128_13142__$1);
var G__13150 = null;
var G__13151 = (0);
var G__13152 = (0);
seq__13128_13132 = G__13149;
chunk__13129_13133 = G__13150;
count__13130_13134 = G__13151;
i__13131_13135 = G__13152;
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
var args13153 = [];
var len__7868__auto___13170 = arguments.length;
var i__7869__auto___13171 = (0);
while(true){
if((i__7869__auto___13171 < len__7868__auto___13170)){
args13153.push((arguments[i__7869__auto___13171]));

var G__13172 = (i__7869__auto___13171 + (1));
i__7869__auto___13171 = G__13172;
continue;
} else {
}
break;
}

var G__13155 = args13153.length;
switch (G__13155) {
case 3:
return lt.object.raise_STAR_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return lt.object.raise_STAR_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13153.length)].join('')));

}
});

lt.object.raise_STAR_.cljs$core$IFn$_invoke$arity$3 = (function (obj,reactions,args){
return lt.object.raise_STAR_.call(null,obj,reactions,args,null);
});

lt.object.raise_STAR_.cljs$core$IFn$_invoke$arity$4 = (function (obj,reactions,args,trigger){
var seq__13156 = cljs.core.seq.call(null,reactions);
var chunk__13159 = null;
var count__13160 = (0);
var i__13161 = (0);
while(true){
if((i__13161 < count__13160)){
var r = cljs.core._nth.call(null,chunk__13159,i__13161);
var func = new cljs.core.Keyword(null,"reaction","reaction",490869788).cljs$core$IFn$_invoke$arity$1(lt.object.__GT_behavior.call(null,r));
var args__$1 = ((cljs.core.coll_QMARK_.call(null,r))?cljs.core.concat.call(null,cljs.core.rest.call(null,r),args):args);
var meta = ((cljs.core.coll_QMARK_.call(null,r))?cljs.core.meta.call(null,r):cljs.core.PersistentArrayMap.EMPTY);
if(cljs.core.truth_(func)){
try{var start13165_13174 = (new Date()).getTime();
var _STAR_behavior_meta_STAR_13166_13175 = lt.object._STAR_behavior_meta_STAR_;
lt.object._STAR_behavior_meta_STAR_ = meta;

try{cljs.core.apply.call(null,func,obj,args__$1);
}finally {lt.object._STAR_behavior_meta_STAR_ = _STAR_behavior_meta_STAR_13166_13175;
}
if(cljs.core._EQ_.call(null,trigger,new cljs.core.Keyword(null,"object.behavior.time","object.behavior.time",-1731850612))){
} else {
lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"object.behavior.time","object.behavior.time",-1731850612),r,((new Date()).getTime() - start13165_13174),trigger);
}
}catch (e13164){var e_13176 = e13164;
lt.object.safe_report_error.call(null,[cljs.core.str("Invalid behavior: "),cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(lt.object.__GT_behavior.call(null,r)))].join(''));

lt.object.safe_report_error.call(null,e_13176);
}
var G__13177 = seq__13156;
var G__13178 = chunk__13159;
var G__13179 = count__13160;
var G__13180 = (i__13161 + (1));
seq__13156 = G__13177;
chunk__13159 = G__13178;
count__13160 = G__13179;
i__13161 = G__13180;
continue;
} else {
var G__13181 = seq__13156;
var G__13182 = chunk__13159;
var G__13183 = count__13160;
var G__13184 = (i__13161 + (1));
seq__13156 = G__13181;
chunk__13159 = G__13182;
count__13160 = G__13183;
i__13161 = G__13184;
continue;
}
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__13156);
if(temp__4657__auto__){
var seq__13156__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13156__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__13156__$1);
var G__13185 = cljs.core.chunk_rest.call(null,seq__13156__$1);
var G__13186 = c__7604__auto__;
var G__13187 = cljs.core.count.call(null,c__7604__auto__);
var G__13188 = (0);
seq__13156 = G__13185;
chunk__13159 = G__13186;
count__13160 = G__13187;
i__13161 = G__13188;
continue;
} else {
var r = cljs.core.first.call(null,seq__13156__$1);
var func = new cljs.core.Keyword(null,"reaction","reaction",490869788).cljs$core$IFn$_invoke$arity$1(lt.object.__GT_behavior.call(null,r));
var args__$1 = ((cljs.core.coll_QMARK_.call(null,r))?cljs.core.concat.call(null,cljs.core.rest.call(null,r),args):args);
var meta = ((cljs.core.coll_QMARK_.call(null,r))?cljs.core.meta.call(null,r):cljs.core.PersistentArrayMap.EMPTY);
if(cljs.core.truth_(func)){
try{var start13168_13189 = (new Date()).getTime();
var _STAR_behavior_meta_STAR_13169_13190 = lt.object._STAR_behavior_meta_STAR_;
lt.object._STAR_behavior_meta_STAR_ = meta;

try{cljs.core.apply.call(null,func,obj,args__$1);
}finally {lt.object._STAR_behavior_meta_STAR_ = _STAR_behavior_meta_STAR_13169_13190;
}
if(cljs.core._EQ_.call(null,trigger,new cljs.core.Keyword(null,"object.behavior.time","object.behavior.time",-1731850612))){
} else {
lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"object.behavior.time","object.behavior.time",-1731850612),r,((new Date()).getTime() - start13168_13189),trigger);
}
}catch (e13167){var e_13191 = e13167;
lt.object.safe_report_error.call(null,[cljs.core.str("Invalid behavior: "),cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(lt.object.__GT_behavior.call(null,r)))].join(''));

lt.object.safe_report_error.call(null,e_13191);
}
var G__13192 = cljs.core.next.call(null,seq__13156__$1);
var G__13193 = null;
var G__13194 = (0);
var G__13195 = (0);
seq__13156 = G__13192;
chunk__13159 = G__13193;
count__13160 = G__13194;
i__13161 = G__13195;
continue;
} else {
var G__13196 = cljs.core.next.call(null,seq__13156__$1);
var G__13197 = null;
var G__13198 = (0);
var G__13199 = (0);
seq__13156 = G__13196;
chunk__13159 = G__13197;
count__13160 = G__13198;
i__13161 = G__13199;
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
var len__7868__auto___13203 = arguments.length;
var i__7869__auto___13204 = (0);
while(true){
if((i__7869__auto___13204 < len__7868__auto___13203)){
args__7875__auto__.push((arguments[i__7869__auto___13204]));

var G__13205 = (i__7869__auto___13204 + (1));
i__7869__auto___13204 = G__13205;
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

lt.object.raise.cljs$lang$applyTo = (function (seq13200){
var G__13201 = cljs.core.first.call(null,seq13200);
var seq13200__$1 = cljs.core.next.call(null,seq13200);
var G__13202 = cljs.core.first.call(null,seq13200__$1);
var seq13200__$2 = cljs.core.next.call(null,seq13200__$1);
return lt.object.raise.cljs$core$IFn$_invoke$arity$variadic(G__13201,G__13202,seq13200__$2);
});

/**
 * For a given behavior keyword id, call its :reaction fn with given args
 */
lt.object.call_behavior_reaction = (function lt$object$call_behavior_reaction(var_args){
var args__7875__auto__ = [];
var len__7868__auto___13208 = arguments.length;
var i__7869__auto___13209 = (0);
while(true){
if((i__7869__auto___13209 < len__7868__auto___13208)){
args__7875__auto__.push((arguments[i__7869__auto___13209]));

var G__13210 = (i__7869__auto___13209 + (1));
i__7869__auto___13209 = G__13210;
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

lt.object.call_behavior_reaction.cljs$lang$applyTo = (function (seq13206){
var G__13207 = cljs.core.first.call(null,seq13206);
var seq13206__$1 = cljs.core.next.call(null,seq13206);
return lt.object.call_behavior_reaction.cljs$core$IFn$_invoke$arity$variadic(G__13207,seq13206__$1);
});

lt.object.update_listeners = (function lt$object$update_listeners(var_args){
var args13211 = [];
var len__7868__auto___13214 = arguments.length;
var i__7869__auto___13215 = (0);
while(true){
if((i__7869__auto___13215 < len__7868__auto___13214)){
args13211.push((arguments[i__7869__auto___13215]));

var G__13216 = (i__7869__auto___13215 + (1));
i__7869__auto___13215 = G__13216;
continue;
} else {
}
break;
}

var G__13213 = args13211.length;
switch (G__13213) {
case 1:
return lt.object.update_listeners.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return lt.object.update_listeners.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13211.length)].join('')));

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
var len__7868__auto___13220 = arguments.length;
var i__7869__auto___13221 = (0);
while(true){
if((i__7869__auto___13221 < len__7868__auto___13220)){
args__7875__auto__.push((arguments[i__7869__auto___13221]));

var G__13222 = (i__7869__auto___13221 + (1));
i__7869__auto___13221 = G__13222;
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

lt.object.make_object_STAR_.cljs$lang$applyTo = (function (seq13218){
var G__13219 = cljs.core.first.call(null,seq13218);
var seq13218__$1 = cljs.core.next.call(null,seq13218);
return lt.object.make_object_STAR_.cljs$core$IFn$_invoke$arity$variadic(G__13219,seq13218__$1);
});

lt.object.store_object_STAR_ = (function lt$object$store_object_STAR_(obj){
lt.object.add.call(null,obj);

return obj;
});
/**
 * Return all objects for given type (template name)
 */
lt.object.instances_by_type = (function lt$object$instances_by_type(type){
return cljs.core.filter.call(null,(function (p1__13223_SHARP_){
return cljs.core._EQ_.call(null,type,new cljs.core.Keyword("lt.object","type","lt.object/type",1624522497).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,p1__13223_SHARP_)));
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
var seq__13230_13236 = cljs.core.seq.call(null,lt.object.instances_by_type.call(null,id));
var chunk__13232_13237 = null;
var count__13233_13238 = (0);
var i__13234_13239 = (0);
while(true){
if((i__13234_13239 < count__13233_13238)){
var o_13240 = cljs.core._nth.call(null,chunk__13232_13237,i__13234_13239);
var o_13241__$1 = cljs.core.deref.call(null,o_13240);
var args_13242 = new cljs.core.Keyword(null,"args","args",1315556576).cljs$core$IFn$_invoke$arity$1(o_13241__$1);
var old_13243 = new cljs.core.Keyword(null,"content","content",15833224).cljs$core$IFn$_invoke$arity$1(o_13241__$1);
var behs_13244 = cljs.core.set.call(null,new cljs.core.Keyword(null,"behaviors","behaviors",120724909).cljs$core$IFn$_invoke$arity$1(o_13241__$1));
var inst_13245 = cljs.core.deref.call(null,lt.object.instances).call(null,lt.object.__GT_id.call(null,o_13241__$1));
var neue_13246 = (cljs.core.truth_(new cljs.core.Keyword(null,"init","init",-1875481434).cljs$core$IFn$_invoke$arity$1(odef))?cljs.core.apply.call(null,new cljs.core.Keyword(null,"init","init",-1875481434).cljs$core$IFn$_invoke$arity$1(odef),inst_13245,args_13242):null);
var neue_13247__$1 = ((cljs.core.vector_QMARK_.call(null,neue_13246))?crate.core.html.call(null,neue_13246):neue_13246);
lt.object.merge_BANG_.call(null,inst_13245,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"tags","tags",1771418977),clojure.set.union.call(null,new cljs.core.Keyword(null,"tags","tags",1771418977).cljs$core$IFn$_invoke$arity$1(o_13241__$1),new cljs.core.Keyword(null,"tags","tags",1771418977).cljs$core$IFn$_invoke$arity$1(odef)),new cljs.core.Keyword(null,"behaviors","behaviors",120724909),clojure.set.union.call(null,behs_13244,cljs.core.set.call(null,new cljs.core.Keyword(null,"behaviors","behaviors",120724909).cljs$core$IFn$_invoke$arity$1(odef))),new cljs.core.Keyword(null,"content","content",15833224),neue_13247__$1], null));

lt.object.merge_BANG_.call(null,inst_13245,lt.object.update_listeners.call(null,inst_13245));

if(cljs.core.truth_((function (){var and__6781__auto__ = old_13243;
if(cljs.core.truth_(and__6781__auto__)){
return neue_13247__$1;
} else {
return and__6781__auto__;
}
})())){
lt.util.dom.replace_with.call(null,old_13243,neue_13247__$1);
} else {
}

lt.object.raise.call(null,inst_13245,new cljs.core.Keyword(null,"redef","redef",1032704258));

var G__13248 = seq__13230_13236;
var G__13249 = chunk__13232_13237;
var G__13250 = count__13233_13238;
var G__13251 = (i__13234_13239 + (1));
seq__13230_13236 = G__13248;
chunk__13232_13237 = G__13249;
count__13233_13238 = G__13250;
i__13234_13239 = G__13251;
continue;
} else {
var temp__4657__auto___13252 = cljs.core.seq.call(null,seq__13230_13236);
if(temp__4657__auto___13252){
var seq__13230_13253__$1 = temp__4657__auto___13252;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13230_13253__$1)){
var c__7604__auto___13254 = cljs.core.chunk_first.call(null,seq__13230_13253__$1);
var G__13255 = cljs.core.chunk_rest.call(null,seq__13230_13253__$1);
var G__13256 = c__7604__auto___13254;
var G__13257 = cljs.core.count.call(null,c__7604__auto___13254);
var G__13258 = (0);
seq__13230_13236 = G__13255;
chunk__13232_13237 = G__13256;
count__13233_13238 = G__13257;
i__13234_13239 = G__13258;
continue;
} else {
var o_13259 = cljs.core.first.call(null,seq__13230_13253__$1);
var o_13260__$1 = cljs.core.deref.call(null,o_13259);
var args_13261 = new cljs.core.Keyword(null,"args","args",1315556576).cljs$core$IFn$_invoke$arity$1(o_13260__$1);
var old_13262 = new cljs.core.Keyword(null,"content","content",15833224).cljs$core$IFn$_invoke$arity$1(o_13260__$1);
var behs_13263 = cljs.core.set.call(null,new cljs.core.Keyword(null,"behaviors","behaviors",120724909).cljs$core$IFn$_invoke$arity$1(o_13260__$1));
var inst_13264 = cljs.core.deref.call(null,lt.object.instances).call(null,lt.object.__GT_id.call(null,o_13260__$1));
var neue_13265 = (cljs.core.truth_(new cljs.core.Keyword(null,"init","init",-1875481434).cljs$core$IFn$_invoke$arity$1(odef))?cljs.core.apply.call(null,new cljs.core.Keyword(null,"init","init",-1875481434).cljs$core$IFn$_invoke$arity$1(odef),inst_13264,args_13261):null);
var neue_13266__$1 = ((cljs.core.vector_QMARK_.call(null,neue_13265))?crate.core.html.call(null,neue_13265):neue_13265);
lt.object.merge_BANG_.call(null,inst_13264,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"tags","tags",1771418977),clojure.set.union.call(null,new cljs.core.Keyword(null,"tags","tags",1771418977).cljs$core$IFn$_invoke$arity$1(o_13260__$1),new cljs.core.Keyword(null,"tags","tags",1771418977).cljs$core$IFn$_invoke$arity$1(odef)),new cljs.core.Keyword(null,"behaviors","behaviors",120724909),clojure.set.union.call(null,behs_13263,cljs.core.set.call(null,new cljs.core.Keyword(null,"behaviors","behaviors",120724909).cljs$core$IFn$_invoke$arity$1(odef))),new cljs.core.Keyword(null,"content","content",15833224),neue_13266__$1], null));

lt.object.merge_BANG_.call(null,inst_13264,lt.object.update_listeners.call(null,inst_13264));

if(cljs.core.truth_((function (){var and__6781__auto__ = old_13262;
if(cljs.core.truth_(and__6781__auto__)){
return neue_13266__$1;
} else {
return and__6781__auto__;
}
})())){
lt.util.dom.replace_with.call(null,old_13262,neue_13266__$1);
} else {
}

lt.object.raise.call(null,inst_13264,new cljs.core.Keyword(null,"redef","redef",1032704258));

var G__13267 = cljs.core.next.call(null,seq__13230_13253__$1);
var G__13268 = null;
var G__13269 = (0);
var G__13270 = (0);
seq__13230_13236 = G__13267;
chunk__13232_13237 = G__13268;
count__13233_13238 = G__13269;
i__13234_13239 = G__13270;
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
var len__7868__auto___13273 = arguments.length;
var i__7869__auto___13274 = (0);
while(true){
if((i__7869__auto___13274 < len__7868__auto___13273)){
args__7875__auto__.push((arguments[i__7869__auto___13274]));

var G__13275 = (i__7869__auto___13274 + (1));
i__7869__auto___13274 = G__13275;
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

lt.object.object_STAR_.cljs$lang$applyTo = (function (seq13271){
var G__13272 = cljs.core.first.call(null,seq13271);
var seq13271__$1 = cljs.core.next.call(null,seq13271);
return lt.object.object_STAR_.cljs$core$IFn$_invoke$arity$variadic(G__13272,seq13271__$1);
});

lt.object.make_behavior_STAR_ = (function lt$object$make_behavior_STAR_(var_args){
var args__7875__auto__ = [];
var len__7868__auto___13278 = arguments.length;
var i__7869__auto___13279 = (0);
while(true){
if((i__7869__auto___13279 < len__7868__auto___13278)){
args__7875__auto__.push((arguments[i__7869__auto___13279]));

var G__13280 = (i__7869__auto___13279 + (1));
i__7869__auto___13279 = G__13280;
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

lt.object.make_behavior_STAR_.cljs$lang$applyTo = (function (seq13276){
var G__13277 = cljs.core.first.call(null,seq13276);
var seq13276__$1 = cljs.core.next.call(null,seq13276);
return lt.object.make_behavior_STAR_.cljs$core$IFn$_invoke$arity$variadic(G__13277,seq13276__$1);
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
var len__7868__auto___13283 = arguments.length;
var i__7869__auto___13284 = (0);
while(true){
if((i__7869__auto___13284 < len__7868__auto___13283)){
args__7875__auto__.push((arguments[i__7869__auto___13284]));

var G__13285 = (i__7869__auto___13284 + (1));
i__7869__auto___13284 = G__13285;
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

lt.object.behavior_STAR_.cljs$lang$applyTo = (function (seq13281){
var G__13282 = cljs.core.first.call(null,seq13281);
var seq13281__$1 = cljs.core.next.call(null,seq13281);
return lt.object.behavior_STAR_.cljs$core$IFn$_invoke$arity$variadic(G__13282,seq13281__$1);
});

/**
 * Reduce over invoked object's behavior fns for given trigger. Start
 *   is initial value for reduce and any args are passed to behavior fn
 */
lt.object.raise_reduce = (function lt$object$raise_reduce(var_args){
var args__7875__auto__ = [];
var len__7868__auto___13291 = arguments.length;
var i__7869__auto___13292 = (0);
while(true){
if((i__7869__auto___13292 < len__7868__auto___13291)){
args__7875__auto__.push((arguments[i__7869__auto___13292]));

var G__13293 = (i__7869__auto___13292 + (1));
i__7869__auto___13292 = G__13293;
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
var _STAR_behavior_meta_STAR_13290 = lt.object._STAR_behavior_meta_STAR_;
lt.object._STAR_behavior_meta_STAR_ = meta;

try{return cljs.core.apply.call(null,func,obj,res,args__$1);
}finally {lt.object._STAR_behavior_meta_STAR_ = _STAR_behavior_meta_STAR_13290;
}}
});})(reactions))
,start,reactions);
});

lt.object.raise_reduce.cljs$lang$maxFixedArity = (3);

lt.object.raise_reduce.cljs$lang$applyTo = (function (seq13286){
var G__13287 = cljs.core.first.call(null,seq13286);
var seq13286__$1 = cljs.core.next.call(null,seq13286);
var G__13288 = cljs.core.first.call(null,seq13286__$1);
var seq13286__$2 = cljs.core.next.call(null,seq13286__$1);
var G__13289 = cljs.core.first.call(null,seq13286__$2);
var seq13286__$3 = cljs.core.next.call(null,seq13286__$2);
return lt.object.raise_reduce.cljs$core$IFn$_invoke$arity$variadic(G__13287,G__13288,G__13289,seq13286__$3);
});

/**
 * Update object with update-in with [:key], fn and args
 */
lt.object.update_BANG_ = (function lt$object$update_BANG_(var_args){
var args__7875__auto__ = [];
var len__7868__auto___13297 = arguments.length;
var i__7869__auto___13298 = (0);
while(true){
if((i__7869__auto___13298 < len__7868__auto___13297)){
args__7875__auto__.push((arguments[i__7869__auto___13298]));

var G__13299 = (i__7869__auto___13298 + (1));
i__7869__auto___13298 = G__13299;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((1) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((1)),(0),null)):null);
return lt.object.update_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7876__auto__);
});

lt.object.update_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (obj,r){
return cljs.core.swap_BANG_.call(null,obj,(function (p1__13294_SHARP_){
return cljs.core.apply.call(null,cljs.core.update_in,p1__13294_SHARP_,r);
}));
});

lt.object.update_BANG_.cljs$lang$maxFixedArity = (1);

lt.object.update_BANG_.cljs$lang$applyTo = (function (seq13295){
var G__13296 = cljs.core.first.call(null,seq13295);
var seq13295__$1 = cljs.core.next.call(null,seq13295);
return lt.object.update_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__13296,seq13295__$1);
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

return cljs.core.swap_BANG_.call(null,obj,(function (p1__13300_SHARP_){
return cljs.core.assoc_in.call(null,p1__13300_SHARP_,k,v);
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
var len__7868__auto___13303 = arguments.length;
var i__7869__auto___13304 = (0);
while(true){
if((i__7869__auto___13304 < len__7868__auto___13303)){
args__7875__auto__.push((arguments[i__7869__auto___13304]));

var G__13305 = (i__7869__auto___13304 + (1));
i__7869__auto___13304 = G__13305;
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

lt.object.create.cljs$lang$applyTo = (function (seq13301){
var G__13302 = cljs.core.first.call(null,seq13301);
var seq13301__$1 = cljs.core.next.call(null,seq13301);
return lt.object.create.cljs$core$IFn$_invoke$arity$variadic(G__13302,seq13301__$1);
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
lt.object.update_BANG_.call(null,obj,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"behaviors","behaviors",120724909)], null),(function (p1__13306_SHARP_){
return cljs.core.remove.call(null,cljs.core.PersistentHashSet.fromArray([behavior], true),p1__13306_SHARP_);
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
return cljs.core.sort_by.call(null,cljs.core.comp.call(null,new cljs.core.Keyword("lt.object","id","lt.object/id",-955176977),cljs.core.deref),cljs.core.filter.call(null,(function (p1__13307_SHARP_){
var temp__4657__auto__ = new cljs.core.Keyword(null,"tags","tags",1771418977).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,p1__13307_SHARP_));
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
lt.object.update_BANG_.call(null,obj,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tags","tags",1771418977)], null),(function (p1__13308_SHARP_){
return cljs.core.reduce.call(null,cljs.core.conj,p1__13308_SHARP_,cljs.core.filter.call(null,cljs.core.identity,ts));
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
return (function (p1__13309_SHARP_){
return cljs.core.reduce.call(null,cljs.core.disj,p1__13309_SHARP_,ts);
});})(cur,behs))
),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"behaviors","behaviors",120724909)], null),((function (cur,behs){
return (function (p1__13310_SHARP_){
return cljs.core.remove.call(null,cljs.core.PersistentHashSet.fromArray([behs], true),p1__13310_SHARP_);
});})(cur,behs))
),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"listeners","listeners",394544445)], null),((function (cur,behs){
return (function (p1__13311_SHARP_){
return cljs.core.apply.call(null,cljs.core.dissoc,p1__13311_SHARP_,ts);
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
cljs.core.swap_BANG_.call(null,lt.object.tags,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [tag], null),(function (p1__13312_SHARP_){
return cljs.core.reduce.call(null,cljs.core.conj,(function (){var or__6793__auto__ = p1__13312_SHARP_;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return cljs.core.List.EMPTY;
}
})(),behs);
}));

var seq__13317_13321 = cljs.core.seq.call(null,lt.object.by_tag.call(null,tag));
var chunk__13318_13322 = null;
var count__13319_13323 = (0);
var i__13320_13324 = (0);
while(true){
if((i__13320_13324 < count__13319_13323)){
var cur_13325 = cljs.core._nth.call(null,chunk__13318_13322,i__13320_13324);
lt.object.refresh_BANG_.call(null,cur_13325);

var G__13326 = seq__13317_13321;
var G__13327 = chunk__13318_13322;
var G__13328 = count__13319_13323;
var G__13329 = (i__13320_13324 + (1));
seq__13317_13321 = G__13326;
chunk__13318_13322 = G__13327;
count__13319_13323 = G__13328;
i__13320_13324 = G__13329;
continue;
} else {
var temp__4657__auto___13330 = cljs.core.seq.call(null,seq__13317_13321);
if(temp__4657__auto___13330){
var seq__13317_13331__$1 = temp__4657__auto___13330;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13317_13331__$1)){
var c__7604__auto___13332 = cljs.core.chunk_first.call(null,seq__13317_13331__$1);
var G__13333 = cljs.core.chunk_rest.call(null,seq__13317_13331__$1);
var G__13334 = c__7604__auto___13332;
var G__13335 = cljs.core.count.call(null,c__7604__auto___13332);
var G__13336 = (0);
seq__13317_13321 = G__13333;
chunk__13318_13322 = G__13334;
count__13319_13323 = G__13335;
i__13320_13324 = G__13336;
continue;
} else {
var cur_13337 = cljs.core.first.call(null,seq__13317_13331__$1);
lt.object.refresh_BANG_.call(null,cur_13337);

var G__13338 = cljs.core.next.call(null,seq__13317_13331__$1);
var G__13339 = null;
var G__13340 = (0);
var G__13341 = (0);
seq__13317_13321 = G__13338;
chunk__13318_13322 = G__13339;
count__13319_13323 = G__13340;
i__13320_13324 = G__13341;
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
cljs.core.swap_BANG_.call(null,lt.object.tags,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [tag], null),(function (p1__13342_SHARP_){
return cljs.core.remove.call(null,cljs.core.set.call(null,behs),(function (){var or__6793__auto__ = p1__13342_SHARP_;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return cljs.core.List.EMPTY;
}
})());
}));

var seq__13355 = cljs.core.seq.call(null,lt.object.by_tag.call(null,tag));
var chunk__13360 = null;
var count__13361 = (0);
var i__13362 = (0);
while(true){
if((i__13362 < count__13361)){
var cur = cljs.core._nth.call(null,chunk__13360,i__13362);
var seq__13363_13367 = cljs.core.seq.call(null,behs);
var chunk__13364_13368 = null;
var count__13365_13369 = (0);
var i__13366_13370 = (0);
while(true){
if((i__13366_13370 < count__13365_13369)){
var b_13371 = cljs.core._nth.call(null,chunk__13364_13368,i__13366_13370);
lt.object.rem_behavior_BANG_.call(null,cur,b_13371);

var G__13372 = seq__13363_13367;
var G__13373 = chunk__13364_13368;
var G__13374 = count__13365_13369;
var G__13375 = (i__13366_13370 + (1));
seq__13363_13367 = G__13372;
chunk__13364_13368 = G__13373;
count__13365_13369 = G__13374;
i__13366_13370 = G__13375;
continue;
} else {
var temp__4657__auto___13376 = cljs.core.seq.call(null,seq__13363_13367);
if(temp__4657__auto___13376){
var seq__13363_13377__$1 = temp__4657__auto___13376;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13363_13377__$1)){
var c__7604__auto___13378 = cljs.core.chunk_first.call(null,seq__13363_13377__$1);
var G__13379 = cljs.core.chunk_rest.call(null,seq__13363_13377__$1);
var G__13380 = c__7604__auto___13378;
var G__13381 = cljs.core.count.call(null,c__7604__auto___13378);
var G__13382 = (0);
seq__13363_13367 = G__13379;
chunk__13364_13368 = G__13380;
count__13365_13369 = G__13381;
i__13366_13370 = G__13382;
continue;
} else {
var b_13383 = cljs.core.first.call(null,seq__13363_13377__$1);
lt.object.rem_behavior_BANG_.call(null,cur,b_13383);

var G__13384 = cljs.core.next.call(null,seq__13363_13377__$1);
var G__13385 = null;
var G__13386 = (0);
var G__13387 = (0);
seq__13363_13367 = G__13384;
chunk__13364_13368 = G__13385;
count__13365_13369 = G__13386;
i__13366_13370 = G__13387;
continue;
}
} else {
}
}
break;
}

var G__13388 = seq__13355;
var G__13389 = chunk__13360;
var G__13390 = count__13361;
var G__13391 = (i__13362 + (1));
seq__13355 = G__13388;
chunk__13360 = G__13389;
count__13361 = G__13390;
i__13362 = G__13391;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__13355);
if(temp__4657__auto__){
var seq__13355__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13355__$1)){
var c__7604__auto__ = cljs.core.chunk_first.call(null,seq__13355__$1);
var G__13392 = cljs.core.chunk_rest.call(null,seq__13355__$1);
var G__13393 = c__7604__auto__;
var G__13394 = cljs.core.count.call(null,c__7604__auto__);
var G__13395 = (0);
seq__13355 = G__13392;
chunk__13360 = G__13393;
count__13361 = G__13394;
i__13362 = G__13395;
continue;
} else {
var cur = cljs.core.first.call(null,seq__13355__$1);
var seq__13356_13396 = cljs.core.seq.call(null,behs);
var chunk__13357_13397 = null;
var count__13358_13398 = (0);
var i__13359_13399 = (0);
while(true){
if((i__13359_13399 < count__13358_13398)){
var b_13400 = cljs.core._nth.call(null,chunk__13357_13397,i__13359_13399);
lt.object.rem_behavior_BANG_.call(null,cur,b_13400);

var G__13401 = seq__13356_13396;
var G__13402 = chunk__13357_13397;
var G__13403 = count__13358_13398;
var G__13404 = (i__13359_13399 + (1));
seq__13356_13396 = G__13401;
chunk__13357_13397 = G__13402;
count__13358_13398 = G__13403;
i__13359_13399 = G__13404;
continue;
} else {
var temp__4657__auto___13405__$1 = cljs.core.seq.call(null,seq__13356_13396);
if(temp__4657__auto___13405__$1){
var seq__13356_13406__$1 = temp__4657__auto___13405__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13356_13406__$1)){
var c__7604__auto___13407 = cljs.core.chunk_first.call(null,seq__13356_13406__$1);
var G__13408 = cljs.core.chunk_rest.call(null,seq__13356_13406__$1);
var G__13409 = c__7604__auto___13407;
var G__13410 = cljs.core.count.call(null,c__7604__auto___13407);
var G__13411 = (0);
seq__13356_13396 = G__13408;
chunk__13357_13397 = G__13409;
count__13358_13398 = G__13410;
i__13359_13399 = G__13411;
continue;
} else {
var b_13412 = cljs.core.first.call(null,seq__13356_13406__$1);
lt.object.rem_behavior_BANG_.call(null,cur,b_13412);

var G__13413 = cljs.core.next.call(null,seq__13356_13406__$1);
var G__13414 = null;
var G__13415 = (0);
var G__13416 = (0);
seq__13356_13396 = G__13413;
chunk__13357_13397 = G__13414;
count__13358_13398 = G__13415;
i__13359_13399 = G__13416;
continue;
}
} else {
}
}
break;
}

var G__13417 = cljs.core.next.call(null,seq__13355__$1);
var G__13418 = null;
var G__13419 = (0);
var G__13420 = (0);
seq__13355 = G__13417;
chunk__13360 = G__13418;
count__13361 = G__13419;
i__13362 = G__13420;
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
