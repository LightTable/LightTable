// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.objs.langs.behaviors');
goog.require('cljs.core');
goog.require('lt.objs.command');
goog.require('lt.objs.context');
goog.require('lt.objs.thread');
goog.require('lt.objs.editor');
goog.require('lt.object');
goog.require('lt.util.dom');
goog.require('clojure.string');
goog.require('lt.util.js');
lt.objs.langs.behaviors.flat_parser = lt.objs.thread.thread_STAR_.call(null,(function lt$objs$langs$behaviors$tfun19549(){
console.log("BACKGROUND:");

console.log("ARGS:",arguments);

console.log("ARR:",argsArray(arguments));

var orig__8016__auto__ = argsArray(arguments);
var msg__8017__auto__ = orig__8016__auto__.shift();
var args__8018__auto__ = orig__8016__auto__.map(cljs.reader.read_string);
var raise = ((function (orig__8016__auto__,msg__8017__auto__,args__8018__auto__){
return (function (obj__8019__auto__,k__8020__auto__,v__8021__auto__){
return _send(obj__8019__auto__,k__8020__auto__,cljs.core.pr_str.call(null,v__8021__auto__),"clj");
});})(orig__8016__auto__,msg__8017__auto__,args__8018__auto__))
;
console.log("MAPARG:",cljs.core.pr_str.call(null,cljs.core.cons.call(null,msg__8017__auto__.obj,args__8018__auto__)),cljs.core.pr_str.call(null,args__8018__auto__));

console.log("MAPARG2:",cljs.core.pr_str.call(null,cljs.core.to_array.call(null,cljs.core.cons.call(null,msg__8017__auto__.obj,args__8018__auto__))),cljs.core.pr_str.call(null,args__8018__auto__));

return ((function (orig__8016__auto__,msg__8017__auto__,args__8018__auto__,raise){
return (function (obj_id,contents){
var StringStream = require([cljs.core.str(ltpath),cljs.core.str("/core/node_modules/codemirror/addon/runmode/runmode.node.js")].join('')).StringStream;
var parser = require([cljs.core.str(ltpath),cljs.core.str("/core/node_modules/lighttable/background/behaviorsParser.js")].join('')).parseFlat;
var parsed = parser.call(null,(new StringStream(contents)));
return _send(obj_id,new cljs.core.Keyword(null,"parsed","parsed",-819589156),parsed);
});})(orig__8016__auto__,msg__8017__auto__,args__8018__auto__,raise))
.apply(null,cljs.core.to_array.call(null,cljs.core.cons.call(null,msg__8017__auto__.obj,args__8018__auto__)));
}));
lt.objs.langs.behaviors.str__GT_ns_keyword = (function lt$objs$langs$behaviors$str__GT_ns_keyword(s){
if(cljs.core.truth_(s)){
var s__$1 = ((cljs.core._EQ_.call(null,":",cljs.core.first.call(null,s)))?cljs.core.subs.call(null,s,(1)):s);
var parts = clojure.string.split.call(null,s__$1,"/");
if(cljs.core.seq.call(null,parts)){
return cljs.core.apply.call(null,cljs.core.keyword,parts);
} else {
return null;
}
} else {
return null;
}
});
lt.objs.langs.behaviors.__GT_index = (function lt$objs$langs$behaviors$__GT_index(this$){
return lt.objs.editor.pos__GT_index.call(null,this$,lt.objs.editor.cursor.call(null,this$));
});
lt.objs.langs.behaviors.idx__GT_item = (function lt$objs$langs$behaviors$idx__GT_item(idx,items){
return cljs.core.first.call(null,cljs.core.filter.call(null,(function (p1__19550_SHARP_){
return (((new cljs.core.Keyword(null,"end","end",-268185958).cljs$core$IFn$_invoke$arity$1(cljs.core.second.call(null,p1__19550_SHARP_)) + (1)) > idx)) && ((idx > (new cljs.core.Keyword(null,"start","start",-355208981).cljs$core$IFn$_invoke$arity$1(cljs.core.second.call(null,p1__19550_SHARP_)) - (1))));
}),cljs.core.map_indexed.call(null,cljs.core.vector,items)));
});
lt.objs.langs.behaviors.idx__GT_entry_info = (function lt$objs$langs$behaviors$idx__GT_entry_info(idx,entries){
var vec__19560 = lt.objs.langs.behaviors.idx__GT_item.call(null,idx,entries);
var ix = cljs.core.nth.call(null,vec__19560,(0),null);
var entry = cljs.core.nth.call(null,vec__19560,(1),null);
var vec__19563 = lt.objs.langs.behaviors.idx__GT_item.call(null,idx,new cljs.core.Keyword(null,"tokens","tokens",-818939304).cljs$core$IFn$_invoke$arity$1(entry));
var tokenIx = cljs.core.nth.call(null,vec__19563,(0),null);
var token = cljs.core.nth.call(null,vec__19563,(1),null);
var vec__19566 = new cljs.core.Keyword(null,"tokens","tokens",-818939304).cljs$core$IFn$_invoke$arity$1(entry);
var seq__19567 = cljs.core.seq.call(null,vec__19566);
var first__19568 = cljs.core.first.call(null,seq__19567);
var seq__19567__$1 = cljs.core.next.call(null,seq__19567);
var tag = first__19568;
var first__19568__$1 = cljs.core.first.call(null,seq__19567__$1);
var seq__19567__$2 = cljs.core.next.call(null,seq__19567__$1);
var behavior = first__19568__$1;
var args = seq__19567__$2;
var tag__$1 = (cljs.core.truth_(tag)?lt.objs.langs.behaviors.str__GT_ns_keyword.call(null,new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(tag)):null);
var behavior__$1 = (cljs.core.truth_(behavior)?lt.objs.langs.behaviors.str__GT_ns_keyword.call(null,new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(behavior)):null);
var past_last_token = (idx > (new cljs.core.Keyword(null,"end","end",-268185958).cljs$core$IFn$_invoke$arity$1(cljs.core.last.call(null,new cljs.core.Keyword(null,"tokens","tokens",-818939304).cljs$core$IFn$_invoke$arity$1(entry))) + (1)));
var pos = (((cljs.core.not.call(null,tokenIx)) && (past_last_token))?cljs.core.count.call(null,new cljs.core.Keyword(null,"tokens","tokens",-818939304).cljs$core$IFn$_invoke$arity$1(entry)):((cljs.core.not.call(null,tokenIx))?(cljs.core.count.call(null,new cljs.core.Keyword(null,"tokens","tokens",-818939304).cljs$core$IFn$_invoke$arity$1(entry)) - (1)):tokenIx
));
var param_pos = (((pos > (1)))?(pos - (2)):null);
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"tag","tag",-1290361223),tag__$1,new cljs.core.Keyword(null,"behavior","behavior",1202392908),behavior__$1,new cljs.core.Keyword(null,"param-pos","param-pos",1762409505),param_pos,new cljs.core.Keyword(null,"pos","pos",-864607220),pos], null);
});
lt.objs.langs.behaviors.user_behavior_completions = (function lt$objs$langs$behaviors$user_behavior_completions(token,_,___$1){
if(cljs.core.truth_((function (){var and__6781__auto__ = token;
if(cljs.core.truth_(and__6781__auto__)){
return cljs.core._EQ_.call(null,cljs.core.subs.call(null,token,(0),(1)),":");
} else {
return and__6781__auto__;
}
})())){
return cljs.core.map.call(null,(function (p1__19569_SHARP_){
return ({"text": [cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(p1__19569_SHARP_))].join(''), "completion": [cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(p1__19569_SHARP_))].join('')});
}),cljs.core.vals.call(null,cljs.core.deref.call(null,lt.object.behaviors)));
} else {
return cljs.core.map.call(null,(function (p1__19570_SHARP_){
if(cljs.core.not.call(null,new cljs.core.Keyword(null,"desc","desc",2093485764).cljs$core$IFn$_invoke$arity$1(p1__19570_SHARP_))){
return ({"text": [cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(p1__19570_SHARP_))].join(''), "completion": [cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(p1__19570_SHARP_))].join('')});
} else {
return ({"text": new cljs.core.Keyword(null,"desc","desc",2093485764).cljs$core$IFn$_invoke$arity$1(p1__19570_SHARP_), "completion": [cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(p1__19570_SHARP_))].join('')});
}
}),cljs.core.filter.call(null,(function (p1__19571_SHARP_){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(p1__19571_SHARP_),new cljs.core.Keyword(null,"user","user",1532431356));
}),cljs.core.vals.call(null,cljs.core.deref.call(null,lt.object.behaviors))));
}
});
lt.objs.langs.behaviors.completions = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"tag","tag",-1290361223),(function (){
return cljs.core.map.call(null,(function (p1__19572_SHARP_){
return ({"text": [cljs.core.str(p1__19572_SHARP_)].join(''), "completion": [cljs.core.str(p1__19572_SHARP_)].join('')});
}),cljs.core.keys.call(null,cljs.core.deref.call(null,lt.object.tags)));
}),new cljs.core.Keyword(null,"behavior","behavior",1202392908),lt.objs.langs.behaviors.user_behavior_completions,new cljs.core.Keyword(null,"behavior-param","behavior-param",1900847699),(function (token,beh,param_pos){
var params = new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(beh);
var param = cljs.core.get.call(null,params,param_pos);
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(param),new cljs.core.Keyword(null,"list","list",765357683))){
if(cljs.core.fn_QMARK_.call(null,new cljs.core.Keyword(null,"items","items",1031954938).cljs$core$IFn$_invoke$arity$1(param))){
return new cljs.core.Keyword(null,"items","items",1031954938).cljs$core$IFn$_invoke$arity$1(param).call(null);
} else {
return new cljs.core.Keyword(null,"items","items",1031954938).cljs$core$IFn$_invoke$arity$1(param);
}
} else {
return null;
}
})], null);
lt.objs.langs.behaviors.pos__GT_token_type = (function lt$objs$langs$behaviors$pos__GT_token_type(pos){
var pred__19576 = cljs.core._EQ_;
var expr__19577 = pos;
if(cljs.core.truth_(pred__19576.call(null,(0),expr__19577))){
return new cljs.core.Keyword(null,"tag","tag",-1290361223);
} else {
if(cljs.core.truth_(pred__19576.call(null,(1),expr__19577))){
return new cljs.core.Keyword(null,"behavior","behavior",1202392908);
} else {
return new cljs.core.Keyword(null,"behavior-param","behavior-param",1900847699);
}
}
});
/**
 * 
 */
lt.objs.langs.behaviors.__BEH__behavior_hints = (function lt$objs$langs$behaviors$__BEH__behavior_hints(this$,hints,token){
var idx = lt.objs.langs.behaviors.__GT_index.call(null,this$);
var map__19581 = lt.objs.langs.behaviors.idx__GT_entry_info.call(null,idx,new cljs.core.Keyword(null,"entries","entries",-86943161).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
var map__19581__$1 = ((((!((map__19581 == null)))?((((map__19581.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19581.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__19581):map__19581);
var info = map__19581__$1;
var tag = cljs.core.get.call(null,map__19581__$1,new cljs.core.Keyword(null,"tag","tag",-1290361223));
var behavior = cljs.core.get.call(null,map__19581__$1,new cljs.core.Keyword(null,"behavior","behavior",1202392908));
var param_pos = cljs.core.get.call(null,map__19581__$1,new cljs.core.Keyword(null,"param-pos","param-pos",1762409505));
var pos = cljs.core.get.call(null,map__19581__$1,new cljs.core.Keyword(null,"pos","pos",-864607220));
var behavior_info = cljs.core.deref.call(null,lt.object.behaviors).call(null,behavior);
var token_type = lt.objs.langs.behaviors.pos__GT_token_type.call(null,pos);
var completions_set = lt.objs.langs.behaviors.completions.call(null,token_type);
return completions_set.call(null,token,behavior_info,param_pos,token);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.langs.behaviors","behavior-hints","lt.objs.langs.behaviors/behavior-hints",-1474997371),new cljs.core.Keyword(null,"exclusive","exclusive",-1507998718),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("lt.plugins.auto-complete","textual-hints","lt.plugins.auto-complete/textual-hints",-1745587195)], null),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"hints+","hints+",924172113),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.langs.behaviors.__BEH__behavior_hints);
/**
 * 
 */
lt.objs.langs.behaviors.__BEH__show_info_on_move = (function lt$objs$langs$behaviors$__BEH__show_info_on_move(this$){
var idx = lt.objs.langs.behaviors.__GT_index.call(null,this$);
var map__19585 = lt.objs.langs.behaviors.idx__GT_entry_info.call(null,idx,new cljs.core.Keyword(null,"entries","entries",-86943161).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
var map__19585__$1 = ((((!((map__19585 == null)))?((((map__19585.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19585.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__19585):map__19585);
var info = map__19585__$1;
var tag = cljs.core.get.call(null,map__19585__$1,new cljs.core.Keyword(null,"tag","tag",-1290361223));
var behavior = cljs.core.get.call(null,map__19585__$1,new cljs.core.Keyword(null,"behavior","behavior",1202392908));
var param_pos = cljs.core.get.call(null,map__19585__$1,new cljs.core.Keyword(null,"param-pos","param-pos",1762409505));
var behavior_info = cljs.core.deref.call(null,lt.object.behaviors).call(null,behavior);
if(cljs.core.truth_(new cljs.core.Keyword(null,"desc","desc",2093485764).cljs$core$IFn$_invoke$arity$1(behavior_info))){
return lt.object.raise.call(null,lt.objs.langs.behaviors.helper,new cljs.core.Keyword(null,"show!","show!",1939158011),this$,behavior_info,param_pos);
} else {
return lt.object.raise.call(null,lt.objs.langs.behaviors.helper,new cljs.core.Keyword(null,"clear!","clear!",-144814418));
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.langs.behaviors","show-info-on-move","lt.objs.langs.behaviors/show-info-on-move",-144122596),new cljs.core.Keyword(null,"debounce","debounce",-871550296),(200),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"move","move",-2110884309),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.langs.behaviors.__BEH__show_info_on_move);
/**
 * 
 */
lt.objs.langs.behaviors.__BEH__behavior_hint_pattern = (function lt$objs$langs$behaviors$__BEH__behavior_hint_pattern(this$){
return lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"hint-pattern","hint-pattern",-1622710880),/[\w\-\>\:\*\$\?\<\!\+\.\"\\/]/], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.langs.behaviors","behavior-hint-pattern","lt.objs.langs.behaviors/behavior-hint-pattern",1414310947),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"object.instant","object.instant",-29936727),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.langs.behaviors.__BEH__behavior_hint_pattern);
/**
 * 
 */
lt.objs.langs.behaviors.__BEH__on_changed = (function lt$objs$langs$behaviors$__BEH__on_changed(this$){
console.log("::on-changed being hit");

return lt.objs.langs.behaviors.flat_parser.call(null,this$,lt.objs.editor.__GT_val.call(null,this$));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.langs.behaviors","on-changed","lt.objs.langs.behaviors/on-changed",1580186637),new cljs.core.Keyword(null,"debounce","debounce",-871550296),(100),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"create","create",-1301499256),null,new cljs.core.Keyword(null,"change","change",-1163046502),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.langs.behaviors.__BEH__on_changed);
/**
 * 
 */
lt.objs.langs.behaviors.__BEH__parsed = (function lt$objs$langs$behaviors$__BEH__parsed(this$,results){
lt.object.merge_BANG_.call(null,this$,cljs.core.js__GT_clj.call(null,results,new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true));

return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"move","move",-2110884309));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.langs.behaviors","parsed","lt.objs.langs.behaviors/parsed",998790384),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"parsed","parsed",-819589156),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.langs.behaviors.__BEH__parsed);
lt.objs.langs.behaviors.inline = (function lt$objs$langs$behaviors$inline(this$,ed,opts){
return lt.object.create.call(null,new cljs.core.Keyword("lt.objs.eval","inline-result","lt.objs.eval/inline-result",1129209318),new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"ed","ed",436294224),ed,new cljs.core.Keyword(null,"class","class",-2030961996),"behavior-helper",new cljs.core.Keyword(null,"opts","opts",155075701),opts,new cljs.core.Keyword(null,"result","result",1415092211),lt.object.__GT_content.call(null,this$),new cljs.core.Keyword(null,"above","above",-1286866470),cljs.core.boolean$.call(null,(new cljs.core.Keyword(null,"prev-line","prev-line",361343201).cljs$core$IFn$_invoke$arity$1(opts) < new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(opts))),new cljs.core.Keyword(null,"loc","loc",-584284901),opts,new cljs.core.Keyword(null,"line","line",212345235),lt.objs.editor.line_handle.call(null,ed,new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(opts))], null));
});
/**
 * 
 */
lt.objs.langs.behaviors.__GT_helper = (function lt$objs$langs$behaviors$__GT_helper(beh){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),new cljs.core.Keyword(null,"desc","desc",2093485764).cljs$core$IFn$_invoke$arity$2(beh,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(beh))], null),(cljs.core.truth_(new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(beh))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),(function (){var iter__7573__auto__ = (function lt$objs$langs$behaviors$__GT_helper_$_iter__19601(s__19602){
return (new cljs.core.LazySeq(null,(function (){
var s__19602__$1 = s__19602;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__19602__$1);
if(temp__4657__auto__){
var s__19602__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__19602__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__19602__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__19604 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__19603 = (0);
while(true){
if((i__19603 < size__7572__auto__)){
var p = cljs.core._nth.call(null,c__7571__auto__,i__19603);
cljs.core.chunk_append.call(null,b__19604,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.param","span.param",-2079989519),new cljs.core.Keyword(null,"label","label",1718410804).cljs$core$IFn$_invoke$arity$1(p),(cljs.core.truth_(new cljs.core.Keyword(null,"example","example",-1755779144).cljs$core$IFn$_invoke$arity$1(p))?cljs.core._conj.call(null,(function (){var x__7627__auto__ = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pre.example","pre.example",-1014445954),new cljs.core.Keyword(null,"example","example",-1755779144).cljs$core$IFn$_invoke$arity$1(p)], null);
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})()," =>"):null)], null));

var G__19615 = (i__19603 + (1));
i__19603 = G__19615;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__19604),lt$objs$langs$behaviors$__GT_helper_$_iter__19601.call(null,cljs.core.chunk_rest.call(null,s__19602__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__19604),null);
}
} else {
var p = cljs.core.first.call(null,s__19602__$2);
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.param","span.param",-2079989519),new cljs.core.Keyword(null,"label","label",1718410804).cljs$core$IFn$_invoke$arity$1(p),(cljs.core.truth_(new cljs.core.Keyword(null,"example","example",-1755779144).cljs$core$IFn$_invoke$arity$1(p))?cljs.core._conj.call(null,(function (){var x__7627__auto__ = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pre.example","pre.example",-1014445954),new cljs.core.Keyword(null,"example","example",-1755779144).cljs$core$IFn$_invoke$arity$1(p)], null);
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto__);
})()," =>"):null)], null),lt$objs$langs$behaviors$__GT_helper_$_iter__19601.call(null,cljs.core.rest.call(null,s__19602__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__7573__auto__.call(null,new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(beh));
})()], null):null)], null));
var seq__19605_19616 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),cljs.core.PersistentVector.EMPTY));
var chunk__19606_19617 = null;
var count__19607_19618 = (0);
var i__19608_19619 = (0);
while(true){
if((i__19608_19619 < count__19607_19618)){
var vec__19609_19620 = cljs.core._nth.call(null,chunk__19606_19617,i__19608_19619);
var ev__7943__auto___19621 = cljs.core.nth.call(null,vec__19609_19620,(0),null);
var func__7944__auto___19622 = cljs.core.nth.call(null,vec__19609_19620,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___19621,func__7944__auto___19622);

var G__19623 = seq__19605_19616;
var G__19624 = chunk__19606_19617;
var G__19625 = count__19607_19618;
var G__19626 = (i__19608_19619 + (1));
seq__19605_19616 = G__19623;
chunk__19606_19617 = G__19624;
count__19607_19618 = G__19625;
i__19608_19619 = G__19626;
continue;
} else {
var temp__4657__auto___19627 = cljs.core.seq.call(null,seq__19605_19616);
if(temp__4657__auto___19627){
var seq__19605_19628__$1 = temp__4657__auto___19627;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__19605_19628__$1)){
var c__7604__auto___19629 = cljs.core.chunk_first.call(null,seq__19605_19628__$1);
var G__19630 = cljs.core.chunk_rest.call(null,seq__19605_19628__$1);
var G__19631 = c__7604__auto___19629;
var G__19632 = cljs.core.count.call(null,c__7604__auto___19629);
var G__19633 = (0);
seq__19605_19616 = G__19630;
chunk__19606_19617 = G__19631;
count__19607_19618 = G__19632;
i__19608_19619 = G__19633;
continue;
} else {
var vec__19612_19634 = cljs.core.first.call(null,seq__19605_19628__$1);
var ev__7943__auto___19635 = cljs.core.nth.call(null,vec__19612_19634,(0),null);
var func__7944__auto___19636 = cljs.core.nth.call(null,vec__19612_19634,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___19635,func__7944__auto___19636);

var G__19637 = cljs.core.next.call(null,seq__19605_19628__$1);
var G__19638 = null;
var G__19639 = (0);
var G__19640 = (0);
seq__19605_19616 = G__19637;
chunk__19606_19617 = G__19638;
count__19607_19618 = G__19639;
i__19608_19619 = G__19640;
continue;
}
} else {
}
}
break;
}

return e__7942__auto__;
});
lt.objs.langs.behaviors.set_param = (function lt$objs$langs$behaviors$set_param(this$,idx){
var lis = lt.util.dom.$$.call(null,"span.param",lt.object.__GT_content.call(null,this$));
var seq__19645_19649 = cljs.core.seq.call(null,lis);
var chunk__19646_19650 = null;
var count__19647_19651 = (0);
var i__19648_19652 = (0);
while(true){
if((i__19648_19652 < count__19647_19651)){
var li_19653 = cljs.core._nth.call(null,chunk__19646_19650,i__19648_19652);
lt.util.dom.remove_class.call(null,li_19653,new cljs.core.Keyword(null,"active","active",1895962068));

var G__19654 = seq__19645_19649;
var G__19655 = chunk__19646_19650;
var G__19656 = count__19647_19651;
var G__19657 = (i__19648_19652 + (1));
seq__19645_19649 = G__19654;
chunk__19646_19650 = G__19655;
count__19647_19651 = G__19656;
i__19648_19652 = G__19657;
continue;
} else {
var temp__4657__auto___19658 = cljs.core.seq.call(null,seq__19645_19649);
if(temp__4657__auto___19658){
var seq__19645_19659__$1 = temp__4657__auto___19658;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__19645_19659__$1)){
var c__7604__auto___19660 = cljs.core.chunk_first.call(null,seq__19645_19659__$1);
var G__19661 = cljs.core.chunk_rest.call(null,seq__19645_19659__$1);
var G__19662 = c__7604__auto___19660;
var G__19663 = cljs.core.count.call(null,c__7604__auto___19660);
var G__19664 = (0);
seq__19645_19649 = G__19661;
chunk__19646_19650 = G__19662;
count__19647_19651 = G__19663;
i__19648_19652 = G__19664;
continue;
} else {
var li_19665 = cljs.core.first.call(null,seq__19645_19659__$1);
lt.util.dom.remove_class.call(null,li_19665,new cljs.core.Keyword(null,"active","active",1895962068));

var G__19666 = cljs.core.next.call(null,seq__19645_19659__$1);
var G__19667 = null;
var G__19668 = (0);
var G__19669 = (0);
seq__19645_19649 = G__19666;
chunk__19646_19650 = G__19667;
count__19647_19651 = G__19668;
i__19648_19652 = G__19669;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(idx)){
return lt.util.dom.add_class.call(null,(lis[idx]),new cljs.core.Keyword(null,"active","active",1895962068));
} else {
return null;
}
});
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.langs.behaviors","helper","lt.objs.langs.behaviors/helper",-36361707),new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.behaviors.helper","editor.behaviors.helper",-1925193177),null], null), null));
/**
 * 
 */
lt.objs.langs.behaviors.__BEH__helper__DOT__clear_BANG_ = (function lt$objs$langs$behaviors$__BEH__helper__DOT__clear_BANG_(this$){
if(cljs.core.truth_(new cljs.core.Keyword(null,"mark","mark",-373816345).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)))){
if(cljs.core.truth_((function (){var and__6781__auto__ = new cljs.core.Keyword(null,"ed","ed",436294224).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$));
if(cljs.core.truth_(and__6781__auto__)){
return cljs.core.deref.call(null,new cljs.core.Keyword(null,"ed","ed",436294224).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
} else {
return and__6781__auto__;
}
})())){
lt.objs.editor._line_class.call(null,new cljs.core.Keyword(null,"ed","ed",436294224).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),new cljs.core.Keyword(null,"text","text",-1790561697),"behavior-helper-line");
} else {
}

lt.object.raise.call(null,new cljs.core.Keyword(null,"mark","mark",-373816345).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),new cljs.core.Keyword(null,"clear!","clear!",-144814418));
} else {
}

lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"content","content",15833224),null], null));

return lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"mark","mark",-373816345),null,new cljs.core.Keyword(null,"behavior","behavior",1202392908),null,new cljs.core.Keyword(null,"line","line",212345235),null,new cljs.core.Keyword(null,"ed","ed",436294224),null], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.langs.behaviors","helper.clear!","lt.objs.langs.behaviors/helper.clear!",2091014616),new cljs.core.Keyword(null,"desc","desc",2093485764),"Behaviors.helper: clear",new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"clear!","clear!",-144814418),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.langs.behaviors.__BEH__helper__DOT__clear_BANG_);
/**
 * 
 */
lt.objs.langs.behaviors.__BEH__helper__DOT__show_BANG_ = (function lt$objs$langs$behaviors$__BEH__helper__DOT__show_BANG_(this$,ed,beh,param_idx){
var loc = lt.objs.editor.__GT_cursor.call(null,ed);
if((cljs.core.not_EQ_.call(null,beh,new cljs.core.Keyword(null,"behavior","behavior",1202392908).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)))) || (cljs.core.not_EQ_.call(null,ed,new cljs.core.Keyword(null,"ed","ed",436294224).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))))){
if(cljs.core.truth_(new cljs.core.Keyword(null,"mark","mark",-373816345).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)))){
lt.objs.editor._line_class.call(null,ed,new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),new cljs.core.Keyword(null,"text","text",-1790561697),"behavior-helper-line");

lt.object.raise.call(null,new cljs.core.Keyword(null,"mark","mark",-373816345).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),new cljs.core.Keyword(null,"clear!","clear!",-144814418));
} else {
}

lt.objs.editor._PLUS_line_class.call(null,ed,new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(loc),new cljs.core.Keyword(null,"text","text",-1790561697),"behavior-helper-line");

lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"content","content",15833224),lt.objs.langs.behaviors.__GT_helper.call(null,beh)], null));

lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"mark","mark",-373816345),lt.objs.langs.behaviors.inline.call(null,this$,ed,cljs.core.assoc.call(null,loc,new cljs.core.Keyword(null,"prev-line","prev-line",361343201),new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)))),new cljs.core.Keyword(null,"behavior","behavior",1202392908),beh,new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(loc),new cljs.core.Keyword(null,"ed","ed",436294224),ed], null));
} else {
}

return lt.objs.langs.behaviors.set_param.call(null,this$,param_idx);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.langs.behaviors","helper.show!","lt.objs.langs.behaviors/helper.show!",1102970915),new cljs.core.Keyword(null,"desc","desc",2093485764),"Behaviors.helper: show",new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"show!","show!",1939158011),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.langs.behaviors.__BEH__helper__DOT__show_BANG_);
lt.objs.langs.behaviors.helper = lt.object.create.call(null,new cljs.core.Keyword("lt.objs.langs.behaviors","helper","lt.objs.langs.behaviors/helper",-36361707));
