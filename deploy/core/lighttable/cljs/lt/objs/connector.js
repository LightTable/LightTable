// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.objs.connector');
goog.require('cljs.core');
goog.require('lt.object');
goog.require('lt.objs.canvas');
goog.require('lt.objs.popup');
goog.require('lt.objs.eval');
/**
 * 
 */
lt.objs.connector.__BEH__on_selected = (function lt$objs$connector$__BEH__on_selected(this$,client){
var temp__4657__auto___18642 = new cljs.core.Keyword(null,"cb","cb",589947841).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$));
if(cljs.core.truth_(temp__4657__auto___18642)){
var cb_18643 = temp__4657__auto___18642;
cb_18643.call(null,client);
} else {
}

return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"close!","close!",-2079310498));
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.connector","on-selected","lt.objs.connector/on-selected",2124409800),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"selected","selected",574897764),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.connector.__BEH__on_selected);
/**
 * 
 */
lt.objs.connector.__BEH__on_close_BANG_ = (function lt$objs$connector$__BEH__on_close_BANG_(this$){
lt.object.raise.call(null,new cljs.core.Keyword(null,"popup","popup",635890211).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),new cljs.core.Keyword(null,"close!","close!",-2079310498));

return lt.object.destroy_BANG_.call(null,this$);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.connector","on-close!","lt.objs.connector/on-close!",33037260),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"close!","close!",-2079310498),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.connector.__BEH__on_close_BANG_);
/**
 * 
 */
lt.objs.connector.client_button = (function lt$objs$connector$client_button(obj,client){
var e__7942__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li.button","li.button",-182721201),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,client))], null));
var seq__18654_18664 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1912301393),((function (e__7942__auto__){
return (function (){
return lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"selected","selected",574897764),client);
});})(e__7942__auto__))
], null)));
var chunk__18655_18665 = null;
var count__18656_18666 = (0);
var i__18657_18667 = (0);
while(true){
if((i__18657_18667 < count__18656_18666)){
var vec__18658_18668 = cljs.core._nth.call(null,chunk__18655_18665,i__18657_18667);
var ev__7943__auto___18669 = cljs.core.nth.call(null,vec__18658_18668,(0),null);
var func__7944__auto___18670 = cljs.core.nth.call(null,vec__18658_18668,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___18669,func__7944__auto___18670);

var G__18671 = seq__18654_18664;
var G__18672 = chunk__18655_18665;
var G__18673 = count__18656_18666;
var G__18674 = (i__18657_18667 + (1));
seq__18654_18664 = G__18671;
chunk__18655_18665 = G__18672;
count__18656_18666 = G__18673;
i__18657_18667 = G__18674;
continue;
} else {
var temp__4657__auto___18675 = cljs.core.seq.call(null,seq__18654_18664);
if(temp__4657__auto___18675){
var seq__18654_18676__$1 = temp__4657__auto___18675;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__18654_18676__$1)){
var c__7604__auto___18677 = cljs.core.chunk_first.call(null,seq__18654_18676__$1);
var G__18678 = cljs.core.chunk_rest.call(null,seq__18654_18676__$1);
var G__18679 = c__7604__auto___18677;
var G__18680 = cljs.core.count.call(null,c__7604__auto___18677);
var G__18681 = (0);
seq__18654_18664 = G__18678;
chunk__18655_18665 = G__18679;
count__18656_18666 = G__18680;
i__18657_18667 = G__18681;
continue;
} else {
var vec__18661_18682 = cljs.core.first.call(null,seq__18654_18676__$1);
var ev__7943__auto___18683 = cljs.core.nth.call(null,vec__18661_18682,(0),null);
var func__7944__auto___18684 = cljs.core.nth.call(null,vec__18661_18682,(1),null);
lt.util.dom.on.call(null,e__7942__auto__,ev__7943__auto___18683,func__7944__auto___18684);

var G__18685 = cljs.core.next.call(null,seq__18654_18676__$1);
var G__18686 = null;
var G__18687 = (0);
var G__18688 = (0);
seq__18654_18664 = G__18685;
chunk__18655_18665 = G__18686;
count__18656_18666 = G__18687;
i__18657_18667 = G__18688;
continue;
}
} else {
}
}
break;
}

return e__7942__auto__;
});
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.objs.connector","client-selector","lt.objs.connector/client-selector",788418534),new cljs.core.Keyword(null,"tags","tags",1771418977),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"client.selector","client.selector",1408411534),null], null), null),new cljs.core.Keyword(null,"init","init",-1875481434),(function (this$,clients,cb){
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"cb","cb",589947841),cb,new cljs.core.Keyword(null,"popup","popup",635890211),lt.objs.popup.popup_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"header","header",119441134),"Which client?",new cljs.core.Keyword(null,"body","body",-2049205669),(function (){var x__7627__auto__ = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"There are multiple clients that could potentially handle this.\n                                                            Which one do you want us to use for this file?"], null);
return cljs.core._conj.call(null,(function (){var x__7627__auto____$1 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",-1349521403),cljs.core.map.call(null,cljs.core.partial.call(null,lt.objs.connector.client_button,this$),clients)], null);
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__7627__auto____$1);
})(),x__7627__auto__);
})()], null))], null));

return null;
}));
/**
 * 
 */
lt.objs.connector.__BEH__select_client = (function lt$objs$connector$__BEH__select_client(obj,potentials,cb){
return lt.object.create.call(null,new cljs.core.Keyword("lt.objs.connector","client-selector","lt.objs.connector/client-selector",788418534),potentials,cb);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.connector","select-client","lt.objs.connector/select-client",-96962801),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"select-client","select-client",1739667626),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.connector.__BEH__select_client);
lt.object.add_behavior_BANG_.call(null,lt.objs.eval.evaler,new cljs.core.Keyword("lt.objs.connector","select-client","lt.objs.connector/select-client",-96962801));
