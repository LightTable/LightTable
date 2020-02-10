// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.objs.langs.keymap');
goog.require('cljs.core');
goog.require('lt.objs.command');
goog.require('lt.objs.context');
goog.require('lt.objs.editor');
goog.require('lt.object');
goog.require('lt.util.dom');
goog.require('lt.objs.langs.behaviors');
goog.require('clojure.string');
lt.objs.langs.keymap.completions = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Keyword(null,"tag","tag",-1290361223).cljs$core$IFn$_invoke$arity$1(lt.objs.langs.behaviors.completions),new cljs.core.Keyword(null,"command","command",-894540724),lt.objs.command.completions], null);
lt.objs.langs.keymap.idx__GT_entry_info = (function lt$objs$langs$keymap$idx__GT_entry_info(idx,entries){
var vec__19868 = lt.objs.langs.behaviors.idx__GT_item.call(null,idx,entries);
var ix = cljs.core.nth.call(null,vec__19868,(0),null);
var entry = cljs.core.nth.call(null,vec__19868,(1),null);
var vec__19871 = lt.objs.langs.behaviors.idx__GT_item.call(null,idx,new cljs.core.Keyword(null,"tokens","tokens",-818939304).cljs$core$IFn$_invoke$arity$1(entry));
var tokenIx = cljs.core.nth.call(null,vec__19871,(0),null);
var token = cljs.core.nth.call(null,vec__19871,(1),null);
var vec__19874 = (cljs.core.truth_(new cljs.core.Keyword(null,"tokens","tokens",-818939304).cljs$core$IFn$_invoke$arity$1(token))?lt.objs.langs.behaviors.idx__GT_item.call(null,idx,new cljs.core.Keyword(null,"tokens","tokens",-818939304).cljs$core$IFn$_invoke$arity$1(token)):null);
var argIx = cljs.core.nth.call(null,vec__19874,(0),null);
var arg = cljs.core.nth.call(null,vec__19874,(1),null);
var vec__19877 = new cljs.core.Keyword(null,"tokens","tokens",-818939304).cljs$core$IFn$_invoke$arity$1(entry);
var tag = cljs.core.nth.call(null,vec__19877,(0),null);
var key = cljs.core.nth.call(null,vec__19877,(1),null);
var first_command = cljs.core.nth.call(null,vec__19877,(2),null);
var tag__$1 = (cljs.core.truth_(tag)?lt.objs.langs.behaviors.str__GT_ns_keyword.call(null,new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(tag)):null);
var past_last_token = (idx > (new cljs.core.Keyword(null,"end","end",-268185958).cljs$core$IFn$_invoke$arity$1(cljs.core.last.call(null,new cljs.core.Keyword(null,"tokens","tokens",-818939304).cljs$core$IFn$_invoke$arity$1(entry))) + (1)));
var pos = (((cljs.core.not.call(null,tokenIx)) && (past_last_token))?cljs.core.count.call(null,new cljs.core.Keyword(null,"tokens","tokens",-818939304).cljs$core$IFn$_invoke$arity$1(entry)):((cljs.core.not.call(null,tokenIx))?(cljs.core.count.call(null,new cljs.core.Keyword(null,"tokens","tokens",-818939304).cljs$core$IFn$_invoke$arity$1(entry)) - (1)):tokenIx
));
var past_last_arg = (idx > (new cljs.core.Keyword(null,"end","end",-268185958).cljs$core$IFn$_invoke$arity$1(cljs.core.last.call(null,new cljs.core.Keyword(null,"tokens","tokens",-818939304).cljs$core$IFn$_invoke$arity$1(token))) + (1)));
var arg_pos = (cljs.core.truth_(new cljs.core.Keyword(null,"tokens","tokens",-818939304).cljs$core$IFn$_invoke$arity$1(token))?(((cljs.core.not.call(null,argIx)) && (past_last_arg))?cljs.core.count.call(null,new cljs.core.Keyword(null,"tokens","tokens",-818939304).cljs$core$IFn$_invoke$arity$1(token)):((cljs.core.not.call(null,argIx))?(cljs.core.count.call(null,new cljs.core.Keyword(null,"tokens","tokens",-818939304).cljs$core$IFn$_invoke$arity$1(token)) - (1)):argIx
)):null);
var command = (cljs.core.truth_((function (){var and__6781__auto__ = tokenIx;
if(cljs.core.truth_(and__6781__auto__)){
return (tokenIx > (1));
} else {
return and__6781__auto__;
}
})())?(cljs.core.truth_(arg_pos)?lt.objs.langs.behaviors.str__GT_ns_keyword.call(null,new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(cljs.core.first.call(null,new cljs.core.Keyword(null,"tokens","tokens",-818939304).cljs$core$IFn$_invoke$arity$1(token)))):lt.objs.langs.behaviors.str__GT_ns_keyword.call(null,new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(token))
):null);
var first_command__$1 = (cljs.core.truth_(first_command)?(cljs.core.truth_(new cljs.core.Keyword(null,"tokens","tokens",-818939304).cljs$core$IFn$_invoke$arity$1(first_command))?lt.objs.langs.behaviors.str__GT_ns_keyword.call(null,new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(cljs.core.first.call(null,new cljs.core.Keyword(null,"tokens","tokens",-818939304).cljs$core$IFn$_invoke$arity$1(first_command)))):lt.objs.langs.behaviors.str__GT_ns_keyword.call(null,new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(first_command))
):null);
return new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"tag","tag",-1290361223),tag__$1,new cljs.core.Keyword(null,"key","key",-1516042587),key,new cljs.core.Keyword(null,"first-command","first-command",2126889267),first_command__$1,new cljs.core.Keyword(null,"command-at-pos","command-at-pos",-1084895945),command,new cljs.core.Keyword(null,"arg-pos","arg-pos",967865317),arg_pos,new cljs.core.Keyword(null,"pos","pos",-864607220),pos], null);
});
lt.objs.langs.keymap.pos__GT_token_type = (function lt$objs$langs$keymap$pos__GT_token_type(pos){
var pred__19883 = cljs.core._EQ_;
var expr__19884 = pos;
if(cljs.core.truth_(pred__19883.call(null,(0),expr__19884))){
return new cljs.core.Keyword(null,"tag","tag",-1290361223);
} else {
if(cljs.core.truth_(pred__19883.call(null,(1),expr__19884))){
return new cljs.core.Keyword(null,"key","key",-1516042587);
} else {
return new cljs.core.Keyword(null,"command","command",-894540724);
}
}
});
/**
 * 
 */
lt.objs.langs.keymap.__BEH__keymap_hints = (function lt$objs$langs$keymap$__BEH__keymap_hints(this$,hints,token){
var idx = lt.objs.langs.behaviors.__GT_index.call(null,this$);
var map__19888 = lt.objs.langs.keymap.idx__GT_entry_info.call(null,idx,new cljs.core.Keyword(null,"entries","entries",-86943161).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
var map__19888__$1 = ((((!((map__19888 == null)))?((((map__19888.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19888.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__19888):map__19888);
var tag = cljs.core.get.call(null,map__19888__$1,new cljs.core.Keyword(null,"tag","tag",-1290361223));
var key = cljs.core.get.call(null,map__19888__$1,new cljs.core.Keyword(null,"key","key",-1516042587));
var pos = cljs.core.get.call(null,map__19888__$1,new cljs.core.Keyword(null,"pos","pos",-864607220));
var command_at_pos = cljs.core.get.call(null,map__19888__$1,new cljs.core.Keyword(null,"command-at-pos","command-at-pos",-1084895945));
var arg_pos = cljs.core.get.call(null,map__19888__$1,new cljs.core.Keyword(null,"arg-pos","arg-pos",967865317));
var comps = (((cljs.core.not.call(null,arg_pos)) || ((arg_pos < (1))))?lt.objs.langs.keymap.completions.call(null,lt.objs.langs.keymap.pos__GT_token_type.call(null,pos)):null);
if(cljs.core.not.call(null,comps)){
return hints;
} else {
return comps.call(null,token);
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.langs.keymap","keymap-hints","lt.objs.langs.keymap/keymap-hints",1641370826),new cljs.core.Keyword(null,"exclusive","exclusive",-1507998718),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("lt.plugins.auto-complete","textual-hints","lt.plugins.auto-complete/textual-hints",-1745587195)], null),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"hints+","hints+",924172113),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.langs.keymap.__BEH__keymap_hints);
/**
 * 
 */
lt.objs.langs.keymap.__BEH__show_info_on_move = (function lt$objs$langs$keymap$__BEH__show_info_on_move(this$){
var idx = lt.objs.langs.behaviors.__GT_index.call(null,this$);
var map__19892 = lt.objs.langs.keymap.idx__GT_entry_info.call(null,idx,new cljs.core.Keyword(null,"entries","entries",-86943161).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
var map__19892__$1 = ((((!((map__19892 == null)))?((((map__19892.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19892.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__19892):map__19892);
var command_at_pos = cljs.core.get.call(null,map__19892__$1,new cljs.core.Keyword(null,"command-at-pos","command-at-pos",-1084895945));
var arg_pos = cljs.core.get.call(null,map__19892__$1,new cljs.core.Keyword(null,"arg-pos","arg-pos",967865317));
var first_command = cljs.core.get.call(null,map__19892__$1,new cljs.core.Keyword(null,"first-command","first-command",2126889267));
var command = cljs.core.get.call(null,new cljs.core.Keyword(null,"commands","commands",161008658).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.command.manager)),(function (){var or__6793__auto__ = command_at_pos;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return first_command;
}
})());
if(cljs.core.truth_(command)){
return lt.object.raise.call(null,lt.objs.langs.keymap.helper,new cljs.core.Keyword(null,"show!","show!",1939158011),this$,command,arg_pos);
} else {
return lt.object.raise.call(null,lt.objs.langs.keymap.helper,new cljs.core.Keyword(null,"clear!","clear!",-144814418),this$);
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.langs.keymap","show-info-on-move","lt.objs.langs.keymap/show-info-on-move",-1949608426),new cljs.core.Keyword(null,"debounce","debounce",-871550296),(200),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"move","move",-2110884309),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.langs.keymap.__BEH__show_info_on_move);
/**
 * 
 */
lt.objs.langs.keymap.__BEH__keymap_hint_pattern = (function lt$objs$langs$keymap$__BEH__keymap_hint_pattern(this$){
return lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"hint-pattern","hint-pattern",-1622710880),/[\w\-\>\:\*\$\?\<\!\+\.\"\\/]/], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.langs.keymap","keymap-hint-pattern","lt.objs.langs.keymap/keymap-hint-pattern",-589681060),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"object.instant","object.instant",-29936727),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.langs.keymap.__BEH__keymap_hint_pattern);
/**
 * 
 */
lt.objs.langs.keymap.__BEH__on_changed = (function lt$objs$langs$keymap$__BEH__on_changed(this$){
return lt.objs.langs.behaviors.flat_parser.call(null,this$,lt.objs.editor.__GT_val.call(null,this$));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.langs.keymap","on-changed","lt.objs.langs.keymap/on-changed",1775377483),new cljs.core.Keyword(null,"debounce","debounce",-871550296),(50),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"create","create",-1301499256),null,new cljs.core.Keyword(null,"change","change",-1163046502),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.langs.keymap.__BEH__on_changed);
/**
 * 
 */
lt.objs.langs.keymap.__BEH__parsed = (function lt$objs$langs$keymap$__BEH__parsed(this$,results){
lt.object.merge_BANG_.call(null,this$,cljs.core.js__GT_clj.call(null,results,new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true));

return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"move","move",-2110884309));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.langs.keymap","parsed","lt.objs.langs.keymap/parsed",1743451178),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"parsed","parsed",-819589156),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.langs.keymap.__BEH__parsed);
lt.objs.langs.keymap.inline = (function lt$objs$langs$keymap$inline(this$,ed,opts){
return lt.object.create.call(null,new cljs.core.Keyword("lt.objs.eval","inline-result","lt.objs.eval/inline-result",1129209318),new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"ed","ed",436294224),ed,new cljs.core.Keyword(null,"class","class",-2030961996),"behavior-helper",new cljs.core.Keyword(null,"opts","opts",155075701),opts,new cljs.core.Keyword(null,"result","result",1415092211),lt.object.__GT_content.call(null,this$),new cljs.core.Keyword(null,"above","above",-1286866470),cljs.core.boolean$.call(null,(new cljs.core.Keyword(null,"prev-line","prev-line",361343201).cljs$core$IFn$_invoke$arity$1(opts) < new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(opts))),new cljs.core.Keyword(null,"loc","loc",-584284901),opts,new cljs.core.Keyword(null,"line","line",212345235),lt.objs.editor.line_handle.call(null,ed,new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(opts))], null));
});
/**
 * 
 */
lt.objs.langs.keymap.__GT_helper = (function lt$objs$langs$keymap$__GT_helper(keym){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),new cljs.core.Keyword(null,"desc","desc",2093485764).cljs$core$IFn$_invoke$arity$2(keym,new cljs.core.Keyword(null,"command","command",-894540724).cljs$core$IFn$_invoke$arity$1(keym))], null),(cljs.core.truth_(new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(keym))?(function (){var iter__7573__auto__ = (function lt$objs$langs$keymap$__GT_helper_$_iter__19908(s__19909){
return (new cljs.core.LazySeq(null,(function (){
var s__19909__$1 = s__19909;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__19909__$1);
if(temp__4657__auto__){
var s__19909__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__19909__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__19909__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__19911 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__19910 = (0);
while(true){
if((i__19910 < size__7572__auto__)){
var p = cljs.core._nth.call(null,c__7571__auto__,i__19910);
cljs.core.chunk_append.call(null,b__19911,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),new cljs.core.Keyword(null,"label","label",1718410804).cljs$core$IFn$_invoke$arity$1(p),(cljs.core.truth_(new cljs.core.Keyword(null,"example","example",-1755779144).cljs$core$IFn$_invoke$arity$1(p))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pre.example","pre.example",-1014445954),new cljs.core.Keyword(null,"example","example",-1755779144).cljs$core$IFn$_invoke$arity$1(p)], null):null)], null));

var G__19922 = (i__19910 + (1));
i__19910 = G__19922;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__19911),lt$objs$langs$keymap$__GT_helper_$_iter__19908.call(null,cljs.core.chunk_rest.call(null,s__19909__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__19911),null);
}
} else {
var p = cljs.core.first.call(null,s__19909__$2);
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),new cljs.core.Keyword(null,"label","label",1718410804).cljs$core$IFn$_invoke$arity$1(p),(cljs.core.truth_(new cljs.core.Keyword(null,"example","example",-1755779144).cljs$core$IFn$_invoke$arity$1(p))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pre.example","pre.example",-1014445954),new cljs.core.Keyword(null,"example","example",-1755779144).cljs$core$IFn$_invoke$arity$1(p)], null):null)], null),lt$objs$langs$keymap$__GT_helper_$_iter__19908.call(null,cljs.core.rest.call(null,s__19909__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__7573__auto__.call(null,new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(keym));
})():null)], null));
var seq__19912_19923 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),cljs.core.PersistentVector.EMPTY));
var chunk__19913_19924 = null;
var count__19914_19925 = (0);
var i__19915_19926 = (0);
while(true){
if((i__19915_19926 < count__19914_19925)){
var vec__19916_19927 = cljs.core._nth.call(null,chunk__19913_19924,i__19915_19926);
var ev__7943__auto___19928 = cljs.core.nth.call(null,vec__19916_19927,(0),null);
var func__7944__auto___19929 = cljs.core.nth.call(null,vec__19916_19927,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___19928,func__7944__auto___19929);

var G__19930 = seq__19912_19923;
var G__19931 = chunk__19913_19924;
var G__19932 = count__19914_19925;
var G__19933 = (i__19915_19926 + (1));
seq__19912_19923 = G__19930;
chunk__19913_19924 = G__19931;
count__19914_19925 = G__19932;
i__19915_19926 = G__19933;
continue;
} else {
var temp__4657__auto___19934 = cljs.core.seq.call(null,seq__19912_19923);
if(temp__4657__auto___19934){
var seq__19912_19935__$1 = temp__4657__auto___19934;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__19912_19935__$1)){
var c__7604__auto___19936 = cljs.core.chunk_first.call(null,seq__19912_19935__$1);
var G__19937 = cljs.core.chunk_rest.call(null,seq__19912_19935__$1);
var G__19938 = c__7604__auto___19936;
var G__19939 = cljs.core.count.call(null,c__7604__auto___19936);
var G__19940 = (0);
seq__19912_19923 = G__19937;
chunk__19913_19924 = G__19938;
count__19914_19925 = G__19939;
i__19915_19926 = G__19940;
continue;
} else {
var vec__19919_19941 = cljs.core.first.call(null,seq__19912_19935__$1);
var ev__7943__auto___19942 = cljs.core.nth.call(null,vec__19919_19941,(0),null);
var func__7944__auto___19943 = cljs.core.nth.call(null,vec__19919_19941,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___19942,func__7944__auto___19943);

var G__19944 = cljs.core.next.call(null,seq__19912_19935__$1);
var G__19945 = null;
var G__19946 = (0);
var G__19947 = (0);
seq__19912_19923 = G__19944;
chunk__19913_19924 = G__19945;
count__19914_19925 = G__19946;
i__19915_19926 = G__19947;
continue;
}
} else {
}
}
break;
}

return e__7942__auto__;
});
lt.objs.langs.keymap.set_param = (function lt$objs$langs$keymap$set_param(this$,idx){
var lis = lt.util.dom.$$.call(null,"span",lt.object.__GT_content.call(null,this$));
var seq__19952_19956 = cljs.core.seq.call(null,lis);
var chunk__19953_19957 = null;
var count__19954_19958 = (0);
var i__19955_19959 = (0);
while(true){
if((i__19955_19959 < count__19954_19958)){
var li_19960 = cljs.core._nth.call(null,chunk__19953_19957,i__19955_19959);
lt.util.dom.remove_class.call(null,li_19960,new cljs.core.Keyword(null,"active","active",1895962068));

var G__19961 = seq__19952_19956;
var G__19962 = chunk__19953_19957;
var G__19963 = count__19954_19958;
var G__19964 = (i__19955_19959 + (1));
seq__19952_19956 = G__19961;
chunk__19953_19957 = G__19962;
count__19954_19958 = G__19963;
i__19955_19959 = G__19964;
continue;
} else {
var temp__4657__auto___19965 = cljs.core.seq.call(null,seq__19952_19956);
if(temp__4657__auto___19965){
var seq__19952_19966__$1 = temp__4657__auto___19965;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__19952_19966__$1)){
var c__7604__auto___19967 = cljs.core.chunk_first.call(null,seq__19952_19966__$1);
var G__19968 = cljs.core.chunk_rest.call(null,seq__19952_19966__$1);
var G__19969 = c__7604__auto___19967;
var G__19970 = cljs.core.count.call(null,c__7604__auto___19967);
var G__19971 = (0);
seq__19952_19956 = G__19968;
chunk__19953_19957 = G__19969;
count__19954_19958 = G__19970;
i__19955_19959 = G__19971;
continue;
} else {
var li_19972 = cljs.core.first.call(null,seq__19952_19966__$1);
lt.util.dom.remove_class.call(null,li_19972,new cljs.core.Keyword(null,"active","active",1895962068));

var G__19973 = cljs.core.next.call(null,seq__19952_19966__$1);
var G__19974 = null;
var G__19975 = (0);
var G__19976 = (0);
seq__19952_19956 = G__19973;
chunk__19953_19957 = G__19974;
count__19954_19958 = G__19975;
i__19955_19959 = G__19976;
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
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.langs.keymap","helper","lt.objs.langs.keymap/helper",-1451849137),new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.keymap.helper","editor.keymap.helper",1576513224),null], null), null));
/**
 * 
 */
lt.objs.langs.keymap.__BEH__helper__DOT__show_BANG_ = (function lt$objs$langs$keymap$__BEH__helper__DOT__show_BANG_(this$,ed,keym,param_idx){
var loc = lt.objs.editor.__GT_cursor.call(null,ed);
if((cljs.core.not_EQ_.call(null,keym,new cljs.core.Keyword(null,"key","key",-1516042587).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)))) || (cljs.core.not_EQ_.call(null,ed,new cljs.core.Keyword(null,"ed","ed",436294224).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))))){
if(cljs.core.truth_(new cljs.core.Keyword(null,"mark","mark",-373816345).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)))){
lt.objs.editor._line_class.call(null,ed,new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),new cljs.core.Keyword(null,"text","text",-1790561697),"behavior-helper-line");

lt.object.raise.call(null,new cljs.core.Keyword(null,"mark","mark",-373816345).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),new cljs.core.Keyword(null,"clear!","clear!",-144814418));
} else {
}

lt.objs.editor._PLUS_line_class.call(null,ed,new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(loc),new cljs.core.Keyword(null,"text","text",-1790561697),"behavior-helper-line");

lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"content","content",15833224),lt.objs.langs.keymap.__GT_helper.call(null,keym)], null));

lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"mark","mark",-373816345),lt.objs.langs.keymap.inline.call(null,this$,ed,cljs.core.assoc.call(null,loc,new cljs.core.Keyword(null,"prev-line","prev-line",361343201),new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)))),new cljs.core.Keyword(null,"key","key",-1516042587),keym,new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(loc),new cljs.core.Keyword(null,"ed","ed",436294224),ed], null));
} else {
}

return lt.objs.langs.keymap.set_param.call(null,this$,param_idx);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.langs.keymap","helper.show!","lt.objs.langs.keymap/helper.show!",358523237),new cljs.core.Keyword(null,"desc","desc",2093485764),"Keymap.helper: show",new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"show!","show!",1939158011),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.langs.keymap.__BEH__helper__DOT__show_BANG_);
lt.objs.langs.keymap.helper = lt.object.create.call(null,new cljs.core.Keyword("lt.objs.langs.keymap","helper","lt.objs.langs.keymap/helper",-1451849137));
