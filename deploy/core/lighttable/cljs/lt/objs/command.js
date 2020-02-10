// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.objs.command');
goog.require('cljs.core');
goog.require('lt.object');
lt.objs.command.required_keys = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"desc","desc",2093485764),null,new cljs.core.Keyword(null,"exec","exec",1625568743),null,new cljs.core.Keyword(null,"command","command",-894540724),null], null), null);
/**
 * Define a command given a map with the following keys:
 * 
 *   * :command (required) - Unique keyword name for command
 *   * :desc (required) - Brief description of command
 *   * :exec (required)  - Function to invoke when command is called
 *   * :hidden - When true, command is hidden from command bar. Not set by default
 */
lt.objs.command.command = (function lt$objs$command$command(cmd){
if(cljs.core.every_QMARK_.call(null,cmd,lt.objs.command.required_keys)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str([cljs.core.str("Command doesn't have required keys: "),cljs.core.str(lt.objs.command.required_keys)].join('')),cljs.core.str("\n"),cljs.core.str("(every? cmd required-keys)")].join('')));
}

lt.object.update_BANG_.call(null,lt.objs.command.manager,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"commands","commands",161008658)], null),cljs.core.assoc,new cljs.core.Keyword(null,"command","command",-894540724).cljs$core$IFn$_invoke$arity$1(cmd),cmd);

if(cljs.core.truth_(new cljs.core.Keyword(null,"options","options",99638489).cljs$core$IFn$_invoke$arity$1(cmd))){
lt.object.add_tags.call(null,new cljs.core.Keyword(null,"options","options",99638489).cljs$core$IFn$_invoke$arity$1(cmd),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"command.options","command.options",-2007668255)], null));
} else {
}

return lt.object.raise.call(null,lt.objs.command.manager,new cljs.core.Keyword(null,"added","added",2057651688),cmd);
});
lt.objs.command.by_id = (function lt$objs$command$by_id(k){
return cljs.core.get.call(null,new cljs.core.Keyword(null,"commands","commands",161008658).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.command.manager)),((cljs.core.map_QMARK_.call(null,k))?new cljs.core.Keyword(null,"command","command",-894540724).cljs$core$IFn$_invoke$arity$1(k):k));
});
lt.objs.command.completions = (function lt$objs$command$completions(token){
if(cljs.core.truth_((function (){var and__6781__auto__ = token;
if(cljs.core.truth_(and__6781__auto__)){
return cljs.core._EQ_.call(null,cljs.core.subs.call(null,token,(0),(1)),":");
} else {
return and__6781__auto__;
}
})())){
return cljs.core.map.call(null,(function (p1__13425_SHARP_){
return ({"completion": [cljs.core.str(new cljs.core.Keyword(null,"command","command",-894540724).cljs$core$IFn$_invoke$arity$1(p1__13425_SHARP_))].join(''), "text": [cljs.core.str(new cljs.core.Keyword(null,"command","command",-894540724).cljs$core$IFn$_invoke$arity$1(p1__13425_SHARP_))].join('')});
}),cljs.core.vals.call(null,new cljs.core.Keyword(null,"commands","commands",161008658).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.command.manager))));
} else {
return cljs.core.map.call(null,(function (p1__13426_SHARP_){
if(cljs.core.not.call(null,new cljs.core.Keyword(null,"desc","desc",2093485764).cljs$core$IFn$_invoke$arity$1(p1__13426_SHARP_))){
return ({"completion": [cljs.core.str(new cljs.core.Keyword(null,"command","command",-894540724).cljs$core$IFn$_invoke$arity$1(p1__13426_SHARP_))].join(''), "text": [cljs.core.str(new cljs.core.Keyword(null,"command","command",-894540724).cljs$core$IFn$_invoke$arity$1(p1__13426_SHARP_))].join('')});
} else {
return ({"completion": [cljs.core.str(new cljs.core.Keyword(null,"command","command",-894540724).cljs$core$IFn$_invoke$arity$1(p1__13426_SHARP_))].join(''), "text": new cljs.core.Keyword(null,"desc","desc",2093485764).cljs$core$IFn$_invoke$arity$1(p1__13426_SHARP_)});
}
}),cljs.core.vals.call(null,new cljs.core.Keyword(null,"commands","commands",161008658).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.command.manager))));
}
});
/**
 * Execute a Light Table command with the given args
 */
lt.objs.command.exec_BANG_ = (function lt$objs$command$exec_BANG_(var_args){
var args__7875__auto__ = [];
var len__7868__auto___13429 = arguments.length;
var i__7869__auto___13430 = (0);
while(true){
if((i__7869__auto___13430 < len__7868__auto___13429)){
args__7875__auto__.push((arguments[i__7869__auto___13430]));

var G__13431 = (i__7869__auto___13430 + (1));
i__7869__auto___13430 = G__13431;
continue;
} else {
}
break;
}

var argseq__7876__auto__ = ((((1) < args__7875__auto__.length))?(new cljs.core.IndexedSeq(args__7875__auto__.slice((1)),(0),null)):null);
return lt.objs.command.exec_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7876__auto__);
});

lt.objs.command.exec_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (cmd,args){
var cmd__$1 = lt.objs.command.by_id.call(null,cmd);
if(cljs.core.truth_((function (){var and__6781__auto__ = cmd__$1;
if(cljs.core.truth_(and__6781__auto__)){
return new cljs.core.Keyword(null,"exec","exec",1625568743).cljs$core$IFn$_invoke$arity$1(cmd__$1);
} else {
return and__6781__auto__;
}
})())){
if(cljs.core.truth_(new cljs.core.Keyword(null,"options","options",99638489).cljs$core$IFn$_invoke$arity$1(cmd__$1))){
return cljs.core.apply.call(null,lt.object.raise,cljs.core.first.call(null,lt.object.by_tag.call(null,new cljs.core.Keyword(null,"sidebar.command","sidebar.command",-1541105038))),new cljs.core.Keyword(null,"exec!","exec!",707596729),cmd__$1,args);
} else {
return cljs.core.apply.call(null,new cljs.core.Keyword(null,"exec","exec",1625568743).cljs$core$IFn$_invoke$arity$1(cmd__$1),args);
}
} else {
return null;
}
});

lt.objs.command.exec_BANG_.cljs$lang$maxFixedArity = (1);

lt.objs.command.exec_BANG_.cljs$lang$applyTo = (function (seq13427){
var G__13428 = cljs.core.first.call(null,seq13427);
var seq13427__$1 = cljs.core.next.call(null,seq13427);
return lt.objs.command.exec_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__13428,seq13427__$1);
});

lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.command","command.manager","lt.objs.command/command.manager",-922176480),new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"command.manager","command.manager",-780692353),null], null), null),new cljs.core.Keyword(null,"commands","commands",161008658),cljs.core.PersistentArrayMap.EMPTY);
lt.objs.command.manager = lt.object.create.call(null,new cljs.core.Keyword("lt.objs.command","command.manager","lt.objs.command/command.manager",-922176480));
