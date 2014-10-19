if(!lt.util.load.provided_QMARK_('lt.plugins.user')) {
goog.provide('lt.plugins.user');
goog.require('cljs.core');
goog.require('lt.objs.command');
goog.require('lt.objs.command');
goog.require('lt.objs.tabs');
goog.require('lt.objs.tabs');
goog.require('lt.object');
goog.require('lt.object');
lt.plugins.user.hello_panel = (function hello_panel(this$){var e__7755__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h1","h1",1013907515),"Hello World!"], null));var seq__7845_7861 = cljs.core.seq.call(null,cljs.core.partition.call(null,2,cljs.core.PersistentVector.EMPTY));var chunk__7846_7862 = null;var count__7847_7863 = 0;var i__7848_7864 = 0;while(true){
if((i__7848_7864 < count__7847_7863))
{var vec__7849_7865 = cljs.core._nth.call(null,chunk__7846_7862,i__7848_7864);var ev__7756__auto___7866 = cljs.core.nth.call(null,vec__7849_7865,0,null);var func__7757__auto___7867 = cljs.core.nth.call(null,vec__7849_7865,1,null);lt.util.dom.on.call(null,e__7755__auto__,ev__7756__auto___7866,func__7757__auto___7867);
{
var G__7868 = seq__7845_7861;
var G__7869 = chunk__7846_7862;
var G__7870 = count__7847_7863;
var G__7871 = (i__7848_7864 + 1);
seq__7845_7861 = G__7868;
chunk__7846_7862 = G__7869;
count__7847_7863 = G__7870;
i__7848_7864 = G__7871;
continue;
}
} else
{var temp__4126__auto___7872 = cljs.core.seq.call(null,seq__7845_7861);if(temp__4126__auto___7872)
{var seq__7845_7873__$1 = temp__4126__auto___7872;if(cljs.core.chunked_seq_QMARK_.call(null,seq__7845_7873__$1))
{var c__7112__auto___7874 = cljs.core.chunk_first.call(null,seq__7845_7873__$1);{
var G__7875 = cljs.core.chunk_rest.call(null,seq__7845_7873__$1);
var G__7876 = c__7112__auto___7874;
var G__7877 = cljs.core.count.call(null,c__7112__auto___7874);
var G__7878 = 0;
seq__7845_7861 = G__7875;
chunk__7846_7862 = G__7876;
count__7847_7863 = G__7877;
i__7848_7864 = G__7878;
continue;
}
} else
{var vec__7850_7879 = cljs.core.first.call(null,seq__7845_7873__$1);var ev__7756__auto___7880 = cljs.core.nth.call(null,vec__7850_7879,0,null);var func__7757__auto___7881 = cljs.core.nth.call(null,vec__7850_7879,1,null);lt.util.dom.on.call(null,e__7755__auto__,ev__7756__auto___7880,func__7757__auto___7881);
{
var G__7882 = cljs.core.next.call(null,seq__7845_7873__$1);
var G__7883 = null;
var G__7884 = 0;
var G__7885 = 0;
seq__7845_7861 = G__7882;
chunk__7846_7862 = G__7883;
count__7847_7863 = G__7884;
i__7848_7864 = G__7885;
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
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword("lt.plugins.user","say-hello","lt.plugins.user/say-hello",853454032),new cljs.core.Keyword(null,"desc","desc",1016984067),"User: Say Hello",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){return lt.objs.tabs.add_or_focus_BANG_.call(null,lt.plugins.user.hello);
})], null));
}

//# sourceMappingURL=user_compiled.js.map