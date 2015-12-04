if(!lt.util.load.provided_QMARK_('lt.plugins.user')) {
goog.provide('lt.plugins.user');
goog.require('cljs.core');
goog.require('lt.objs.command');
goog.require('lt.objs.command');
goog.require('lt.objs.tabs');
goog.require('lt.objs.tabs');
goog.require('lt.object');
goog.require('lt.object');
lt.plugins.user.hello_panel = (function hello_panel(this$){var e__7755__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h1","h1",1013907515),"Hello World!"], null));var seq__8077_8083 = cljs.core.seq.call(null,cljs.core.partition.call(null,2,cljs.core.PersistentVector.EMPTY));var chunk__8078_8084 = null;var count__8079_8085 = 0;var i__8080_8086 = 0;while(true){
if((i__8080_8086 < count__8079_8085))
{var vec__8081_8087 = cljs.core._nth.call(null,chunk__8078_8084,i__8080_8086);var ev__7756__auto___8088 = cljs.core.nth.call(null,vec__8081_8087,0,null);var func__7757__auto___8089 = cljs.core.nth.call(null,vec__8081_8087,1,null);lt.util.dom.on.call(null,e__7755__auto__,ev__7756__auto___8088,func__7757__auto___8089);
{
var G__8090 = seq__8077_8083;
var G__8091 = chunk__8078_8084;
var G__8092 = count__8079_8085;
var G__8093 = (i__8080_8086 + 1);
seq__8077_8083 = G__8090;
chunk__8078_8084 = G__8091;
count__8079_8085 = G__8092;
i__8080_8086 = G__8093;
continue;
}
} else
{var temp__4126__auto___8094 = cljs.core.seq.call(null,seq__8077_8083);if(temp__4126__auto___8094)
{var seq__8077_8095__$1 = temp__4126__auto___8094;if(cljs.core.chunked_seq_QMARK_.call(null,seq__8077_8095__$1))
{var c__7112__auto___8096 = cljs.core.chunk_first.call(null,seq__8077_8095__$1);{
var G__8097 = cljs.core.chunk_rest.call(null,seq__8077_8095__$1);
var G__8098 = c__7112__auto___8096;
var G__8099 = cljs.core.count.call(null,c__7112__auto___8096);
var G__8100 = 0;
seq__8077_8083 = G__8097;
chunk__8078_8084 = G__8098;
count__8079_8085 = G__8099;
i__8080_8086 = G__8100;
continue;
}
} else
{var vec__8082_8101 = cljs.core.first.call(null,seq__8077_8095__$1);var ev__7756__auto___8102 = cljs.core.nth.call(null,vec__8082_8101,0,null);var func__7757__auto___8103 = cljs.core.nth.call(null,vec__8082_8101,1,null);lt.util.dom.on.call(null,e__7755__auto__,ev__7756__auto___8102,func__7757__auto___8103);
{
var G__8104 = cljs.core.next.call(null,seq__8077_8095__$1);
var G__8105 = null;
var G__8106 = 0;
var G__8107 = 0;
seq__8077_8083 = G__8104;
chunk__8078_8084 = G__8105;
count__8079_8085 = G__8106;
i__8080_8086 = G__8107;
continue;
}
}
} else
{}
}
break;
}
return e__7755__auto__;
});
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.plugins.user","user.hello","lt.plugins.user/user.hello",3780889681),new cljs.core.Keyword(null,"tags","tags",1017456523),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"user.hello","user.hello",1535287393)], null),new cljs.core.Keyword(null,"behaviors","behaviors",607554515),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("lt.plugins.user","on-close-destroy","lt.plugins.user/on-close-destroy",4509098889)], null),new cljs.core.Keyword(null,"init","init",1017141378),(function (this$){return lt.plugins.user.hello_panel.call(null,this$);
}));
lt.plugins.user.__BEH__on_close_destroy = (function __BEH__on_close_destroy(this$){return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"destroy","destroy",2571277164));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.user","on-close-destroy","lt.plugins.user/on-close-destroy",4509098889),new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"close","close",1108660586),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.user.__BEH__on_close_destroy);
lt.plugins.user.hello = lt.object.create.call(null,new cljs.core.Keyword("lt.plugins.user","user.hello","lt.plugins.user/user.hello",3780889681));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"user.say-hello","user.say-hello",576535935),new cljs.core.Keyword(null,"desc","desc",1016984067),"User: Say Hello",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){return lt.objs.tabs.add_or_focus_BANG_.call(null,lt.plugins.user.hello);
})], null));
}

//# sourceMappingURL=user_compiled.js.map