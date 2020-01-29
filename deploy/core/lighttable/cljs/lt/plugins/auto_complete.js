// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.plugins.auto_complete');
goog.require('cljs.core');
goog.require('lt.objs.command');
goog.require('lt.objs.context');
goog.require('lt.objs.thread');
goog.require('lt.objs.editor');
goog.require('lt.object');
goog.require('lt.util.dom');
goog.require('lt.objs.keyboard');
goog.require('lt.util.load');
goog.require('lt.objs.editor.pool');
goog.require('clojure.string');
goog.require('lt.util.js');
goog.require('lt.objs.sidebar.command');
lt.plugins.auto_complete.stream = (function lt$plugins$auto_complete$stream(str){
return (new CodeMirror.StringStream(str));
});
lt.plugins.auto_complete.advance = (function lt$plugins$auto_complete$advance(s){
return s.start = s.pos;
});
lt.plugins.auto_complete.next_STAR_ = (function lt$plugins$auto_complete$next_STAR_(s){
return s.next();
});
lt.plugins.auto_complete.current = (function lt$plugins$auto_complete$current(s){
return s.current();
});
lt.plugins.auto_complete.peek_STAR_ = (function lt$plugins$auto_complete$peek_STAR_(s){
return s.peek();
});
lt.plugins.auto_complete.skip_space = (function lt$plugins$auto_complete$skip_space(s){
if(cljs.core.truth_((function (){var and__6781__auto__ = lt.plugins.auto_complete.peek_STAR_.call(null,s);
if(cljs.core.truth_(and__6781__auto__)){
return cljs.core.re_seq.call(null,/\s/,lt.plugins.auto_complete.peek_STAR_.call(null,s));
} else {
return and__6781__auto__;
}
})())){
s.eatSpace();

return lt.plugins.auto_complete.advance.call(null,s);
} else {
return null;
}
});
lt.plugins.auto_complete.eat_while = (function lt$plugins$auto_complete$eat_while(s,r){
return s.eatWhile(r);
});
lt.plugins.auto_complete.string__GT_tokens = (function lt$plugins$auto_complete$string__GT_tokens(str,pattern){
var s = lt.plugins.auto_complete.stream.call(null,str);
var res = {};
lt.plugins.auto_complete.skip_space.call(null,s);

while(true){
if(cljs.core.truth_(lt.plugins.auto_complete.peek_STAR_.call(null,s))){
lt.plugins.auto_complete.eat_while.call(null,s,pattern);

if(!(cljs.core.empty_QMARK_.call(null,lt.plugins.auto_complete.current.call(null,s)))){
(res[lt.plugins.auto_complete.current.call(null,s)] = true);

lt.plugins.auto_complete.advance.call(null,s);
} else {
lt.plugins.auto_complete.next_STAR_.call(null,s);

lt.plugins.auto_complete.advance.call(null,s);
}

lt.plugins.auto_complete.skip_space.call(null,s);

continue;
} else {
}
break;
}

return cljs.core.into_array.call(null,cljs.core.map.call(null,((function (s,res){
return (function (p1__22609_SHARP_){
return ({"completion": p1__22609_SHARP_});
});})(s,res))
,Object.keys(res)));
});
lt.plugins.auto_complete.default_pattern = /[\w_$]/;
lt.plugins.auto_complete.get_pattern = (function lt$plugins$auto_complete$get_pattern(ed){
var mode = lt.objs.editor.inner_mode.call(null,ed);
var or__6793__auto__ = new cljs.core.Keyword(null,"hint-pattern","hint-pattern",-1622710880).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed));
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
var or__6793__auto____$1 = (mode["hint-pattern"]);
if(cljs.core.truth_(or__6793__auto____$1)){
return or__6793__auto____$1;
} else {
return lt.plugins.auto_complete.default_pattern;
}
}
});
lt.plugins.auto_complete.get_token = (function lt$plugins$auto_complete$get_token(ed,pos){
var line = lt.objs.editor.line.call(null,ed,new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(pos));
var pattern = lt.plugins.auto_complete.get_pattern.call(null,ed);
var s = lt.plugins.auto_complete.stream.call(null,line);
var ch = new cljs.core.Keyword(null,"ch","ch",-554717905).cljs$core$IFn$_invoke$arity$1(pos);
lt.plugins.auto_complete.skip_space.call(null,s);

while(true){
lt.plugins.auto_complete.eat_while.call(null,s,pattern);

if((!(cljs.core.empty_QMARK_.call(null,lt.plugins.auto_complete.current.call(null,s)))) && ((s.start <= ch)) && ((s.pos >= ch))){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"start","start",-355208981),s.start,new cljs.core.Keyword(null,"end","end",-268185958),s.pos,new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(pos),new cljs.core.Keyword(null,"string","string",-1989541586),lt.plugins.auto_complete.current.call(null,s)], null);
} else {
if(cljs.core.not.call(null,lt.plugins.auto_complete.peek_STAR_.call(null,s))){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(pos),new cljs.core.Keyword(null,"start","start",-355208981),new cljs.core.Keyword(null,"ch","ch",-554717905).cljs$core$IFn$_invoke$arity$1(pos),new cljs.core.Keyword(null,"end","end",-268185958),new cljs.core.Keyword(null,"ch","ch",-554717905).cljs$core$IFn$_invoke$arity$1(pos)], null);
} else {
lt.plugins.auto_complete.next_STAR_.call(null,s);

lt.plugins.auto_complete.advance.call(null,s);

lt.plugins.auto_complete.skip_space.call(null,s);

continue;
}
}
break;
}
});
lt.plugins.auto_complete.non_token_change_QMARK_ = (function lt$plugins$auto_complete$non_token_change_QMARK_(ed,ch){
var pattern = lt.plugins.auto_complete.get_pattern.call(null,ed);
var text = cljs.core.map.call(null,cljs.core.str,ch.text);
var pred__22618 = cljs.core._EQ_;
var expr__22619 = ch.origin;
if(cljs.core.truth_(pred__22618.call(null,"+input",expr__22619))){
return cljs.core.some.call(null,((function (pred__22618,expr__22619,pattern,text){
return (function (p1__22614_SHARP_){
return cljs.core.not.call(null,cljs.core.re_seq.call(null,pattern,p1__22614_SHARP_));
});})(pred__22618,expr__22619,pattern,text))
,text);
} else {
if(cljs.core.truth_(pred__22618.call(null,"paste",expr__22619))){
return true;
} else {
return false;
}
}
});
lt.plugins.auto_complete.w = lt.objs.thread.thread_STAR_.call(null,(function lt$plugins$auto_complete$tfun22622(){
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
return (function (obj_id,m){
console.log("M:",cljs.core.pr_str.call(null,obj_id),cljs.core.pr_str.call(null,m));

var StringStream = require([cljs.core.str(ltpath),cljs.core.str("/core/node_modules/codemirror/addon/runmode/runmode.node.js")].join('')).StringStream;
var stream = ((function (StringStream,orig__8016__auto__,msg__8017__auto__,args__8018__auto__,raise){
return (function (s){
return (new StringStream(s));
});})(StringStream,orig__8016__auto__,msg__8017__auto__,args__8018__auto__,raise))
;
var advance = ((function (StringStream,stream,orig__8016__auto__,msg__8017__auto__,args__8018__auto__,raise){
return (function (s){
return s.start = s.pos;
});})(StringStream,stream,orig__8016__auto__,msg__8017__auto__,args__8018__auto__,raise))
;
var next_STAR_ = ((function (StringStream,stream,advance,orig__8016__auto__,msg__8017__auto__,args__8018__auto__,raise){
return (function (s){
return s.next();
});})(StringStream,stream,advance,orig__8016__auto__,msg__8017__auto__,args__8018__auto__,raise))
;
var peek_STAR_ = ((function (StringStream,stream,advance,next_STAR_,orig__8016__auto__,msg__8017__auto__,args__8018__auto__,raise){
return (function (s){
return s.peek();
});})(StringStream,stream,advance,next_STAR_,orig__8016__auto__,msg__8017__auto__,args__8018__auto__,raise))
;
var current = ((function (StringStream,stream,advance,next_STAR_,peek_STAR_,orig__8016__auto__,msg__8017__auto__,args__8018__auto__,raise){
return (function (s){
return s.current();
});})(StringStream,stream,advance,next_STAR_,peek_STAR_,orig__8016__auto__,msg__8017__auto__,args__8018__auto__,raise))
;
var skip_space = ((function (StringStream,stream,advance,next_STAR_,peek_STAR_,current,orig__8016__auto__,msg__8017__auto__,args__8018__auto__,raise){
return (function (s){
if(cljs.core.truth_((function (){var and__6781__auto__ = peek_STAR_.call(null,s);
if(cljs.core.truth_(and__6781__auto__)){
return cljs.core.re_seq.call(null,/\s/,peek_STAR_.call(null,s));
} else {
return and__6781__auto__;
}
})())){
s.eatSpace();

return advance.call(null,s);
} else {
return null;
}
});})(StringStream,stream,advance,next_STAR_,peek_STAR_,current,orig__8016__auto__,msg__8017__auto__,args__8018__auto__,raise))
;
var eat_while = ((function (StringStream,stream,advance,next_STAR_,peek_STAR_,current,skip_space,orig__8016__auto__,msg__8017__auto__,args__8018__auto__,raise){
return (function (s,r){
return s.eatWhile(r);
});})(StringStream,stream,advance,next_STAR_,peek_STAR_,current,skip_space,orig__8016__auto__,msg__8017__auto__,args__8018__auto__,raise))
;
var string__GT_tokens = ((function (StringStream,stream,advance,next_STAR_,peek_STAR_,current,skip_space,eat_while,orig__8016__auto__,msg__8017__auto__,args__8018__auto__,raise){
return (function (str,pattern){
console.log("PATTERN",cljs.core.pr_str.call(null,pattern));

var s = stream.call(null,str);
var pattern__$1 = cljs.core.re_pattern.call(null,pattern);
var res = {};
console.log("REPATTERN",cljs.core.pr_str.call(null,pattern__$1));

skip_space.call(null,s);

while(true){
if(cljs.core.truth_(peek_STAR_.call(null,s))){
eat_while.call(null,s,pattern__$1);

if(!(cljs.core.empty_QMARK_.call(null,current.call(null,s)))){
(res[current.call(null,s)] = true);

advance.call(null,s);
} else {
next_STAR_.call(null,s);

advance.call(null,s);
}

skip_space.call(null,s);

continue;
} else {
}
break;
}

return cljs.core.into_array.call(null,cljs.core.map.call(null,((function (s,pattern__$1,res,StringStream,stream,advance,next_STAR_,peek_STAR_,current,skip_space,eat_while,orig__8016__auto__,msg__8017__auto__,args__8018__auto__,raise){
return (function (p1__22621_SHARP_){
return ({"completion": p1__22621_SHARP_});
});})(s,pattern__$1,res,StringStream,stream,advance,next_STAR_,peek_STAR_,current,skip_space,eat_while,orig__8016__auto__,msg__8017__auto__,args__8018__auto__,raise))
,Object.keys(res)));
});})(StringStream,stream,advance,next_STAR_,peek_STAR_,current,skip_space,eat_while,orig__8016__auto__,msg__8017__auto__,args__8018__auto__,raise))
;
return _send(obj_id,new cljs.core.Keyword(null,"hint-tokens","hint-tokens",703440569),string__GT_tokens.call(null,new cljs.core.Keyword(null,"string","string",-1989541586).cljs$core$IFn$_invoke$arity$1(m),new cljs.core.Keyword(null,"pattern","pattern",242135423).cljs$core$IFn$_invoke$arity$1(m)));
});})(orig__8016__auto__,msg__8017__auto__,args__8018__auto__,raise))
.apply(null,cljs.core.to_array.call(null,cljs.core.cons.call(null,msg__8017__auto__.obj,args__8018__auto__)));
}));
lt.plugins.auto_complete.async_hints = (function lt$plugins$auto_complete$async_hints(this$){
if(cljs.core.truth_(cljs.core.deref.call(null,this$))){
return lt.plugins.auto_complete.w.call(null,this$,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"string","string",-1989541586),lt.objs.editor.__GT_val.call(null,this$),new cljs.core.Keyword(null,"pattern","pattern",242135423),lt.plugins.auto_complete.get_pattern.call(null,this$).source], null));
} else {
return null;
}
});
lt.plugins.auto_complete.text_BAR_completion = (function lt$plugins$auto_complete$text_BAR_completion(x){
var or__6793__auto__ = x.text;
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return x.completion;
}
});
lt.plugins.auto_complete.text_PLUS_completion = (function lt$plugins$auto_complete$text_PLUS_completion(x){
return [cljs.core.str(x.text),cljs.core.str(x.completion)].join('');
});
lt.plugins.auto_complete.distinct_completions = (function lt$plugins$auto_complete$distinct_completions(hints){
var seen = ({});
return cljs.core.filter.call(null,((function (seen){
return (function (hint){
if((seen[hint.completion]) === true){
return false;
} else {
return (seen[hint.completion] = true);
}
});})(seen))
,hints);
});
lt.plugins.auto_complete.remove_long_completions = (function lt$plugins$auto_complete$remove_long_completions(hints){
return cljs.core.filter.call(null,(function (p1__22627_SHARP_){
return (p1__22627_SHARP_.completion.length < new cljs.core.Keyword(null,"hint-limit","hint-limit",55979791).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.auto_complete.hinter)));
}),hints);
});
lt.plugins.auto_complete.hinter = lt.object.add_tags.call(null,lt.objs.sidebar.command.filter_list.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"items","items",1031954938),(function (){
var temp__4657__auto__ = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.truth_(temp__4657__auto__)){
var cur = temp__4657__auto__;
var token = new cljs.core.Keyword(null,"string","string",-1989541586).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"starting-token","starting-token",-930654029).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.auto_complete.hinter)));
return lt.plugins.auto_complete.distinct_completions.call(null,lt.plugins.auto_complete.remove_long_completions.call(null,(cljs.core.truth_(token)?cljs.core.remove.call(null,((function (token,cur,temp__4657__auto__){
return (function (p1__22628_SHARP_){
return cljs.core._EQ_.call(null,token,p1__22628_SHARP_.completion);
});})(token,cur,temp__4657__auto__))
,lt.object.raise_reduce.call(null,cur,new cljs.core.Keyword(null,"hints+","hints+",924172113),cljs.core.PersistentVector.EMPTY,token)):lt.object.raise_reduce.call(null,cur,new cljs.core.Keyword(null,"hints+","hints+",924172113),cljs.core.PersistentVector.EMPTY))));
} else {
return null;
}
}),new cljs.core.Keyword(null,"key","key",-1516042587),lt.plugins.auto_complete.text_BAR_completion], null)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"hinter","hinter",21599289)], null));
lt.plugins.auto_complete.on_line_change = (function lt$plugins$auto_complete$on_line_change(line,ch){
return lt.object.raise.call(null,lt.plugins.auto_complete.hinter,new cljs.core.Keyword(null,"line-change","line-change",180842672),line,ch);
});
/**
 * 
 */
lt.plugins.auto_complete.__BEH__set_hint_limit = (function lt$plugins$auto_complete$__BEH__set_hint_limit(this$,n){
return lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"hint-limit","hint-limit",55979791),n], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.auto-complete","set-hint-limit","lt.plugins.auto-complete/set-hint-limit",849210029),new cljs.core.Keyword(null,"desc","desc",2093485764),"Auto-complete: Set maximum length of an autocomplete hint",new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"Number",new cljs.core.Keyword(null,"example","example",-1755779144),(1000)], null)], null),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"object.instant","object.instant",-29936727),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.plugins.auto_complete.__BEH__set_hint_limit);
/**
 * 
 */
lt.plugins.auto_complete.__BEH__textual_hints = (function lt$plugins$auto_complete$__BEH__textual_hints(this$,hints){
return cljs.core.concat.call(null,new cljs.core.Keyword("lt.plugins.auto-complete","hints","lt.plugins.auto-complete/hints",1519987280).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),hints);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.auto-complete","textual-hints","lt.plugins.auto-complete/textual-hints",-1745587195),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"hints+","hints+",924172113),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.plugins.auto_complete.__BEH__textual_hints);
/**
 * 
 */
lt.plugins.auto_complete.__BEH__escape_BANG_ = (function lt$plugins$auto_complete$__BEH__escape_BANG_(this$,force_QMARK_){
var elem = lt.object.__GT_content.call(null,this$);
if(cljs.core.truth_(new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)))){
CodeMirror.off(new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),"change",lt.plugins.auto_complete.on_line_change);
} else {
}

lt.objs.context.out_BANG_.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"editor.keys.hinting.active","editor.keys.hinting.active",1645703466)], null));

lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"active","active",1895962068),false,new cljs.core.Keyword(null,"selected","selected",574897764),(0),new cljs.core.Keyword(null,"ed","ed",436294224),null,new cljs.core.Keyword(null,"starting-token","starting-token",-930654029),null,new cljs.core.Keyword(null,"token","token",-1211463215),null,new cljs.core.Keyword(null,"search","search",1564939822),""], null));

lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"inactive","inactive",-306247616));

if(cljs.core.truth_(lt.util.dom.parent.call(null,elem))){
return lt.util.dom.remove.call(null,elem);
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.auto-complete","escape!","lt.plugins.auto-complete/escape!",434780340),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"escape!","escape!",1850102229),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.plugins.auto_complete.__BEH__escape_BANG_);
/**
 * 
 */
lt.plugins.auto_complete.__BEH__select = (function lt$plugins$auto_complete$__BEH__select(this$,c){
var token = new cljs.core.Keyword(null,"token","token",-1211463215).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$));
var start = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(token),new cljs.core.Keyword(null,"ch","ch",-554717905),new cljs.core.Keyword(null,"start","start",-355208981).cljs$core$IFn$_invoke$arity$1(token)], null);
var end = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(token),new cljs.core.Keyword(null,"ch","ch",-554717905),new cljs.core.Keyword(null,"end","end",-268185958).cljs$core$IFn$_invoke$arity$1(token)], null);
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"active","active",1895962068),false], null));

if(cljs.core.truth_(c.select)){
c.select.call(null,cljs.core.partial.call(null,lt.objs.editor.replace,new cljs.core.Keyword(null,"ed","ed",436294224).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),start,end),c);
} else {
lt.objs.editor.replace.call(null,new cljs.core.Keyword(null,"ed","ed",436294224).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),start,end,c.completion);
}

return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"escape!","escape!",1850102229));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.auto-complete","select","lt.plugins.auto-complete/select",-776539590),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"select","select",1147833503),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.plugins.auto_complete.__BEH__select);
/**
 * 
 */
lt.plugins.auto_complete.__BEH__select_unknown = (function lt$plugins$auto_complete$__BEH__select_unknown(this$,v){
lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"escape!","escape!",1850102229));

return lt.objs.keyboard.passthrough.call(null);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.auto-complete","select-unknown","lt.plugins.auto-complete/select-unknown",699333870),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"select-unknown","select-unknown",-1025304823),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.plugins.auto_complete.__BEH__select_unknown);
/**
 * 
 */
lt.plugins.auto_complete.__BEH__line_change = (function lt$plugins$auto_complete$__BEH__line_change(this$,l,c){
if(cljs.core.truth_(new cljs.core.Keyword(null,"active","active",1895962068).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.auto_complete.hinter)))){
var pos = lt.objs.editor.__GT_cursor.call(null,new cljs.core.Keyword(null,"ed","ed",436294224).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
var token = lt.plugins.auto_complete.get_token.call(null,new cljs.core.Keyword(null,"ed","ed",436294224).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),pos);
if(cljs.core.truth_((function (){var or__6793__auto__ = lt.plugins.auto_complete.non_token_change_QMARK_.call(null,new cljs.core.Keyword(null,"ed","ed",436294224).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),c);
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return (new cljs.core.Keyword(null,"ch","ch",-554717905).cljs$core$IFn$_invoke$arity$1(pos) < new cljs.core.Keyword(null,"start","start",-355208981).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"starting-token","starting-token",-930654029).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.auto_complete.hinter))));
}
})())){
return lt.object.raise.call(null,lt.plugins.auto_complete.hinter,new cljs.core.Keyword(null,"escape!","escape!",1850102229));
} else {
lt.object.raise.call(null,lt.plugins.auto_complete.hinter,new cljs.core.Keyword(null,"change!","change!",850472699),new cljs.core.Keyword(null,"string","string",-1989541586).cljs$core$IFn$_invoke$arity$1(token));

if(cljs.core._EQ_.call(null,(0),cljs.core.count.call(null,new cljs.core.Keyword(null,"cur","cur",1153190599).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.auto_complete.hinter))))){
lt.objs.context.out_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"editor.keys.hinting.active","editor.keys.hinting.active",1645703466),new cljs.core.Keyword(null,"filter-list.input","filter-list.input",-328755840)], null));
} else {
if(cljs.core.truth_(lt.objs.context.in_QMARK_.call(null,new cljs.core.Keyword(null,"editor.keys.hinting.active","editor.keys.hinting.active",1645703466)))){
} else {
lt.objs.context.in_BANG_.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"filter-list.input","filter-list.input",-328755840)], null),lt.plugins.auto_complete.hinter);

lt.objs.context.in_BANG_.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"editor.keys.hinting.active","editor.keys.hinting.active",1645703466)], null),new cljs.core.Keyword(null,"ed","ed",436294224).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.auto_complete.hinter)));
}
}

return lt.object.merge_BANG_.call(null,lt.plugins.auto_complete.hinter,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"token","token",-1211463215),token], null));
}
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.auto-complete","line-change","lt.plugins.auto-complete/line-change",-1743582775),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"line-change","line-change",180842672),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.plugins.auto_complete.__BEH__line_change);
/**
 * 
 */
lt.plugins.auto_complete.__BEH__async_hint_tokens = (function lt$plugins$auto_complete$__BEH__async_hint_tokens(this$,tokens){
return lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("lt.plugins.auto-complete","hints","lt.plugins.auto-complete/hints",1519987280),tokens], null));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.auto-complete","async-hint-tokens","lt.plugins.auto-complete/async-hint-tokens",-912627743),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"hint-tokens","hint-tokens",703440569),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.plugins.auto_complete.__BEH__async_hint_tokens);
/**
 * 
 */
lt.plugins.auto_complete.__BEH__intra_buffer_string_hints = (function lt$plugins$auto_complete$__BEH__intra_buffer_string_hints(this$,ch){
if((cljs.core.not_EQ_.call(null,new cljs.core.Keyword(null,"ed","ed",436294224).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.auto_complete.hinter)),this$)) || (cljs.core.not.call(null,new cljs.core.Keyword(null,"active","active",1895962068).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.auto_complete.hinter))))){
return lt.plugins.auto_complete.async_hints.call(null,this$);
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.auto-complete","intra-buffer-string-hints","lt.plugins.auto-complete/intra-buffer-string-hints",-594731033),new cljs.core.Keyword(null,"debounce","debounce",-871550296),(400),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"change","change",-1163046502),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.plugins.auto_complete.__BEH__intra_buffer_string_hints);
lt.plugins.auto_complete.start_hinting = (function lt$plugins$auto_complete$start_hinting(var_args){
var args22629 = [];
var len__7868__auto___22632 = arguments.length;
var i__7869__auto___22633 = (0);
while(true){
if((i__7869__auto___22633 < len__7868__auto___22632)){
args22629.push((arguments[i__7869__auto___22633]));

var G__22634 = (i__7869__auto___22633 + (1));
i__7869__auto___22633 = G__22634;
continue;
} else {
}
break;
}

var G__22631 = args22629.length;
switch (G__22631) {
case 1:
return lt.plugins.auto_complete.start_hinting.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return lt.plugins.auto_complete.start_hinting.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args22629.length)].join('')));

}
});

lt.plugins.auto_complete.start_hinting.cljs$core$IFn$_invoke$arity$1 = (function (this$){
return lt.plugins.auto_complete.start_hinting.call(null,this$,null);
});

lt.plugins.auto_complete.start_hinting.cljs$core$IFn$_invoke$arity$2 = (function (this$,opts){
var pos = lt.objs.editor.__GT_cursor.call(null,this$);
var token = lt.plugins.auto_complete.get_token.call(null,this$,pos);
var line = lt.objs.editor.line_handle.call(null,this$,new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(pos));
var elem = lt.object.__GT_content.call(null,lt.plugins.auto_complete.hinter);
lt.objs.context.in_BANG_.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"editor.keys.hinting.active","editor.keys.hinting.active",1645703466)], null),this$);

lt.object.merge_BANG_.call(null,lt.plugins.auto_complete.hinter,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"token","token",-1211463215),token,new cljs.core.Keyword(null,"starting-token","starting-token",-930654029),token,new cljs.core.Keyword(null,"ed","ed",436294224),this$,new cljs.core.Keyword(null,"active","active",1895962068),true,new cljs.core.Keyword(null,"line","line",212345235),line], null));

lt.object.raise.call(null,lt.plugins.auto_complete.hinter,new cljs.core.Keyword(null,"change!","change!",850472699),new cljs.core.Keyword(null,"string","string",-1989541586).cljs$core$IFn$_invoke$arity$1(token));

lt.object.raise.call(null,lt.plugins.auto_complete.hinter,new cljs.core.Keyword(null,"active","active",1895962068));

var count = cljs.core.count.call(null,new cljs.core.Keyword(null,"cur","cur",1153190599).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.auto_complete.hinter)));
if(cljs.core._EQ_.call(null,(0),count)){
return lt.objs.context.out_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"editor.keys.hinting.active","editor.keys.hinting.active",1645703466),new cljs.core.Keyword(null,"filter-list.input","filter-list.input",-328755840)], null));
} else {
if(cljs.core.truth_((function (){var and__6781__auto__ = cljs.core._EQ_.call(null,(1),count);
if(and__6781__auto__){
return new cljs.core.Keyword(null,"select-single","select-single",516810952).cljs$core$IFn$_invoke$arity$1(opts);
} else {
return and__6781__auto__;
}
})())){
return lt.object.raise.call(null,lt.plugins.auto_complete.hinter,new cljs.core.Keyword(null,"select!","select!",1013647471),(0));
} else {
CodeMirror.on(line,"change",lt.plugins.auto_complete.on_line_change);

lt.util.dom.append.call(null,lt.util.dom.$.call(null,new cljs.core.Keyword(null,"body","body",-2049205669)),elem);

return CodeMirror.positionHint(lt.objs.editor.__GT_cm_ed.call(null,this$),elem,new cljs.core.Keyword(null,"start","start",-355208981).cljs$core$IFn$_invoke$arity$1(token));

}
}
});

lt.plugins.auto_complete.start_hinting.cljs$lang$maxFixedArity = 2;

/**
 * 
 */
lt.plugins.auto_complete.__BEH__show_hint = (function lt$plugins$auto_complete$__BEH__show_hint(this$,opts){
var cur = clojure.string.trim.call(null,lt.objs.editor.get_char.call(null,this$,(-1)));
var opts__$1 = cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"select-single","select-single",516810952),true], null),opts);
if(cljs.core.truth_((function (){var and__6781__auto__ = new cljs.core.Keyword(null,"active","active",1895962068).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.auto_complete.hinter));
if(cljs.core.truth_(and__6781__auto__)){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"ed","ed",436294224).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.auto_complete.hinter)),this$);
} else {
return and__6781__auto__;
}
})())){
return lt.object.raise.call(null,lt.plugins.auto_complete.hinter,new cljs.core.Keyword(null,"select!","select!",1013647471));
} else {
if((cljs.core.empty_QMARK_.call(null,cur)) && (cljs.core.not.call(null,new cljs.core.Keyword(null,"force?","force?",1839038675).cljs$core$IFn$_invoke$arity$1(opts__$1)))){
return lt.objs.keyboard.passthrough.call(null);
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"active","active",1895962068).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.auto_complete.hinter)))){
lt.object.raise.call(null,lt.plugins.auto_complete.hinter,new cljs.core.Keyword(null,"escape!","escape!",1850102229));

return lt.plugins.auto_complete.start_hinting.call(null,this$);
} else {
return lt.plugins.auto_complete.start_hinting.call(null,this$,opts__$1);

}
}
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.auto-complete","show-hint","lt.plugins.auto-complete/show-hint",1307935500),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"hint","hint",439639918),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.plugins.auto_complete.__BEH__show_hint);
/**
 * 
 */
lt.plugins.auto_complete.__BEH__remove_on_scroll_inactive = (function lt$plugins$auto_complete$__BEH__remove_on_scroll_inactive(this$){
if(cljs.core.truth_(new cljs.core.Keyword(null,"active","active",1895962068).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.auto_complete.hinter)))){
return lt.object.raise.call(null,lt.plugins.auto_complete.hinter,new cljs.core.Keyword(null,"escape!","escape!",1850102229));
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.auto-complete","remove-on-scroll-inactive","lt.plugins.auto-complete/remove-on-scroll-inactive",-973912636),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"inactive","inactive",-306247616),null,new cljs.core.Keyword(null,"scroll","scroll",971553779),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.plugins.auto_complete.__BEH__remove_on_scroll_inactive);
/**
 * 
 */
lt.plugins.auto_complete.__BEH__remove_on_move_line = (function lt$plugins$auto_complete$__BEH__remove_on_move_line(this$,c){
if(cljs.core.truth_(new cljs.core.Keyword(null,"active","active",1895962068).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.auto_complete.hinter)))){
return lt.util.js.wait.call(null,(0),(function (){
var starting = new cljs.core.Keyword(null,"starting-token","starting-token",-930654029).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.auto_complete.hinter));
var cur = new cljs.core.Keyword(null,"token","token",-1211463215).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.auto_complete.hinter));
var cursor = lt.objs.editor.__GT_cursor.call(null,this$);
if(cljs.core.truth_((function (){var and__6781__auto__ = starting;
if(cljs.core.truth_(and__6781__auto__)){
var and__6781__auto____$1 = cur;
if(cljs.core.truth_(and__6781__auto____$1)){
return (!(((new cljs.core.Keyword(null,"start","start",-355208981).cljs$core$IFn$_invoke$arity$1(cur) <= new cljs.core.Keyword(null,"ch","ch",-554717905).cljs$core$IFn$_invoke$arity$1(cursor))) && ((new cljs.core.Keyword(null,"ch","ch",-554717905).cljs$core$IFn$_invoke$arity$1(cursor) <= new cljs.core.Keyword(null,"end","end",-268185958).cljs$core$IFn$_invoke$arity$1(cur))))) || (cljs.core.not_EQ_.call(null,new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(starting),new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(cursor)));
} else {
return and__6781__auto____$1;
}
} else {
return and__6781__auto__;
}
})())){
return lt.object.raise.call(null,lt.plugins.auto_complete.hinter,new cljs.core.Keyword(null,"escape!","escape!",1850102229));
} else {
return null;
}
}));
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.auto-complete","remove-on-move-line","lt.plugins.auto-complete/remove-on-move-line",1423448015),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"move","move",-2110884309),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.plugins.auto_complete.__BEH__remove_on_move_line);
/**
 * 
 */
lt.plugins.auto_complete.__BEH__auto_show_on_input = (function lt$plugins$auto_complete$__BEH__auto_show_on_input(this$,_,ch){
if(cljs.core.truth_(lt.plugins.auto_complete.non_token_change_QMARK_.call(null,this$,ch))){
return null;
} else {
if(cljs.core.truth_((function (){var and__6781__auto__ = new cljs.core.Keyword(null,"active","active",1895962068).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.auto_complete.hinter));
if(cljs.core.truth_(and__6781__auto__)){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"ed","ed",436294224).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.auto_complete.hinter)),this$);
} else {
return and__6781__auto__;
}
})())){
return null;
} else {
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"hint","hint",439639918),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"select-single","select-single",516810952),false], null));
}
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.auto-complete","auto-show-on-input","lt.plugins.auto-complete/auto-show-on-input",1941262562),new cljs.core.Keyword(null,"desc","desc",2093485764),"Auto-complete: Show on change",new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"input","input",556931961),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.plugins.auto_complete.__BEH__auto_show_on_input);
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"auto-complete.remove","auto-complete.remove",-1872566024),new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Auto complete hide",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
if(cljs.core.truth_(new cljs.core.Keyword(null,"active","active",1895962068).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.auto_complete.hinter)))){
lt.object.raise.call(null,lt.plugins.auto_complete.hinter,new cljs.core.Keyword(null,"escape!","escape!",1850102229));
} else {
}

return lt.objs.keyboard.passthrough.call(null);
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"auto-complete","auto-complete",244958848),new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Auto complete",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var ed = lt.objs.editor.pool.last_active.call(null);
if(cljs.core.not.call(null,lt.objs.editor.selection_QMARK_.call(null,ed))){
return lt.object.raise.call(null,ed,new cljs.core.Keyword(null,"hint","hint",439639918));
} else {
return lt.objs.keyboard.passthrough.call(null);
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",-894540724),new cljs.core.Keyword(null,"auto-complete.force","auto-complete.force",-1621663572),new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"desc","desc",2093485764),"Editor: Force auto complete",new cljs.core.Keyword(null,"exec","exec",1625568743),(function (){
var ed = lt.objs.editor.pool.last_active.call(null);
return lt.object.raise.call(null,ed,new cljs.core.Keyword(null,"hint","hint",439639918),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"force?","force?",1839038675),true], null));
})], null));
/**
 * 
 */
lt.plugins.auto_complete.__BEH__init = (function lt$plugins$auto_complete$__BEH__init(this$){
lt.util.load.js.call(null,"core/node_modules/codemirror_addons/show-hint.js",new cljs.core.Keyword(null,"sync","sync",-624148946));

CodeMirror.extendMode("clojure",cljs.core.clj__GT_js.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"hint-pattern","hint-pattern",-1622710880),/[\w\-\>\:\*\$\?\<\!\+\.\\/foo]/], null)));

CodeMirror.extendMode("text/x-clojurescript",cljs.core.clj__GT_js.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"hint-pattern","hint-pattern",-1622710880),/[\w\-\>\:\*\$\?\<\!\+\.\\/foo]/], null)));

return CodeMirror.extendMode("css",cljs.core.clj__GT_js.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"hint-pattern","hint-pattern",-1622710880),/[\w\.\-\#]/], null)));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.auto-complete","init","lt.plugins.auto-complete/init",-1193131591),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"init","init",-1875481434),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.plugins.auto_complete.__BEH__init);
