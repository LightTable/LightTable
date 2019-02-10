if(!lt.util.load.provided_QMARK_('lt.plugins.lighttable-test-plugin')) {
goog.provide('lt.plugins.lighttable_test_plugin');
goog.require('cljs.core');
goog.require('lt.objs.command');
goog.require('lt.objs.command');
goog.require('lt.util.dom');
goog.require('lt.util.dom');
goog.require('lt.objs.popup');
goog.require('lt.objs.popup');
goog.require('clojure.string');
goog.require('clojure.string');
lt.plugins.lighttable_test_plugin.debug_file_path_input = cljs.core.atom.call(null,"");
/**
* Mocks show-file-dialog so native file dialog does not show.
* A popup dialog with a text field is shown instead. File paths
* can be specified in the path fields, seperated by commas to donate
* multiple files.
*/
lt.plugins.lighttable_test_plugin.show_file_dialog_mock = (function show_file_dialog_mock(type,options,callback){return lt.objs.popup.popup_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"id","id",1013907597),"test2",new cljs.core.Keyword(null,"body","body",1016933652),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1014003715),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h1","h1",1013907515),"File Dialog Mock"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",1114262332),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1017479852),"text",new cljs.core.Keyword(null,"id","id",1013907597),"debug-file-path"], null)], null)], null),new cljs.core.Keyword(null,"buttons","buttons",1255256819),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"id","id",1013907597),"test",new cljs.core.Keyword(null,"label","label",1116631654),"Okay",new cljs.core.Keyword(null,"action","action",3885920680),(function (){return cljs.core.swap_BANG_.call(null,lt.plugins.lighttable_test_plugin.debug_file_path_input,(function (_){return lt.util.dom.val.call(null,lt.util.dom.$.call(null,"#debug-file-path"));
}));
}),new cljs.core.Keyword(null,"post-action","post-action",4039331701),(function (){return callback.call(null,clojure.string.split.call(null,cljs.core.deref.call(null,lt.plugins.lighttable_test_plugin.debug_file_path_input),/,/));
})], null)], null)], null));
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"lt.testing.mock","lt.testing.mock",2290833600),new cljs.core.Keyword(null,"desc","desc",1016984067),"Test Env: Mocks light table components for automated tests.",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){return lt.objs.dialogs.set_show_file_dialog_fn_BANG_.call(null,lt.plugins.lighttable_test_plugin.show_file_dialog_mock).call(null);
})], null));
}

//# sourceMappingURL=lighttable test plugin_compiled.js.map