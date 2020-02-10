// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.objs.menu');
goog.require('cljs.core');
goog.require('lt.objs.command');
goog.require('lt.objs.platform');
goog.require('lt.object');
goog.require('lt.util.dom');
goog.require('lt.objs.keyboard');
goog.require('lt.objs.app');
goog.require('clojure.string');
lt.objs.menu.remote = require("electron").remote;
lt.objs.menu.Menu = lt.objs.menu.remote.Menu;
lt.objs.menu.MenuItem = lt.objs.menu.remote.MenuItem;
lt.objs.menu.menu_item = (function lt$objs$menu$menu_item(opts){
var opts__$1 = ((cljs.core.not.call(null,new cljs.core.Keyword(null,"submenu","submenu",2142563344).cljs$core$IFn$_invoke$arity$1(opts)))?opts:cljs.core.assoc.call(null,opts,new cljs.core.Keyword(null,"submenu","submenu",2142563344),lt.objs.menu.submenu.call(null,new cljs.core.Keyword(null,"submenu","submenu",2142563344).cljs$core$IFn$_invoke$arity$1(opts))));
var opts2 = (cljs.core.truth_(new cljs.core.Keyword(null,"click","click",1912301393).cljs$core$IFn$_invoke$arity$1(opts__$1))?cljs.core.assoc.call(null,opts__$1,new cljs.core.Keyword(null,"click","click",1912301393),((function (opts__$1){
return (function (){
try{var temp__4657__auto__ = new cljs.core.Keyword(null,"click","click",1912301393).cljs$core$IFn$_invoke$arity$1(opts__$1);
if(cljs.core.truth_(temp__4657__auto__)){
var func = temp__4657__auto__;
return func.call(null);
} else {
return null;
}
}catch (e14096){var e = e14096;
return lt.objs.console.error(e);
}});})(opts__$1))
):opts__$1);
return (new lt.objs.menu.MenuItem(cljs.core.clj__GT_js.call(null,opts__$1)));
});
lt.objs.menu.submenu = (function lt$objs$menu$submenu(items){
var menu = (new lt.objs.menu.Menu());
var seq__14103_14109 = cljs.core.seq.call(null,items);
var chunk__14105_14110 = null;
var count__14106_14111 = (0);
var i__14107_14112 = (0);
while(true){
if((i__14107_14112 < count__14106_14111)){
var i_14113 = cljs.core._nth.call(null,chunk__14105_14110,i__14107_14112);
if(cljs.core.truth_(i_14113)){
menu.append(lt.objs.menu.menu_item.call(null,i_14113));

var G__14114 = seq__14103_14109;
var G__14115 = chunk__14105_14110;
var G__14116 = count__14106_14111;
var G__14117 = (i__14107_14112 + (1));
seq__14103_14109 = G__14114;
chunk__14105_14110 = G__14115;
count__14106_14111 = G__14116;
i__14107_14112 = G__14117;
continue;
} else {
var G__14118 = seq__14103_14109;
var G__14119 = chunk__14105_14110;
var G__14120 = count__14106_14111;
var G__14121 = (i__14107_14112 + (1));
seq__14103_14109 = G__14118;
chunk__14105_14110 = G__14119;
count__14106_14111 = G__14120;
i__14107_14112 = G__14121;
continue;
}
} else {
var temp__4657__auto___14122 = cljs.core.seq.call(null,seq__14103_14109);
if(temp__4657__auto___14122){
var seq__14103_14123__$1 = temp__4657__auto___14122;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14103_14123__$1)){
var c__7604__auto___14124 = cljs.core.chunk_first.call(null,seq__14103_14123__$1);
var G__14125 = cljs.core.chunk_rest.call(null,seq__14103_14123__$1);
var G__14126 = c__7604__auto___14124;
var G__14127 = cljs.core.count.call(null,c__7604__auto___14124);
var G__14128 = (0);
seq__14103_14109 = G__14125;
chunk__14105_14110 = G__14126;
count__14106_14111 = G__14127;
i__14107_14112 = G__14128;
continue;
} else {
var i_14129 = cljs.core.first.call(null,seq__14103_14123__$1);
if(cljs.core.truth_(i_14129)){
menu.append(lt.objs.menu.menu_item.call(null,i_14129));

var G__14130 = cljs.core.next.call(null,seq__14103_14123__$1);
var G__14131 = null;
var G__14132 = (0);
var G__14133 = (0);
seq__14103_14109 = G__14130;
chunk__14105_14110 = G__14131;
count__14106_14111 = G__14132;
i__14107_14112 = G__14133;
continue;
} else {
var G__14134 = cljs.core.next.call(null,seq__14103_14123__$1);
var G__14135 = null;
var G__14136 = (0);
var G__14137 = (0);
seq__14103_14109 = G__14134;
chunk__14105_14110 = G__14135;
count__14106_14111 = G__14136;
i__14107_14112 = G__14137;
continue;
}
}
} else {
}
}
break;
}

return menu;
});
lt.objs.menu.menu = (function lt$objs$menu$menu(items){
var menu_instance = (new lt.objs.menu.Menu());
var seq__14142_14146 = cljs.core.seq.call(null,items);
var chunk__14143_14147 = null;
var count__14144_14148 = (0);
var i__14145_14149 = (0);
while(true){
if((i__14145_14149 < count__14144_14148)){
var i_14150 = cljs.core._nth.call(null,chunk__14143_14147,i__14145_14149);
menu_instance.append(lt.objs.menu.menu_item.call(null,i_14150));

var G__14151 = seq__14142_14146;
var G__14152 = chunk__14143_14147;
var G__14153 = count__14144_14148;
var G__14154 = (i__14145_14149 + (1));
seq__14142_14146 = G__14151;
chunk__14143_14147 = G__14152;
count__14144_14148 = G__14153;
i__14145_14149 = G__14154;
continue;
} else {
var temp__4657__auto___14155 = cljs.core.seq.call(null,seq__14142_14146);
if(temp__4657__auto___14155){
var seq__14142_14156__$1 = temp__4657__auto___14155;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14142_14156__$1)){
var c__7604__auto___14157 = cljs.core.chunk_first.call(null,seq__14142_14156__$1);
var G__14158 = cljs.core.chunk_rest.call(null,seq__14142_14156__$1);
var G__14159 = c__7604__auto___14157;
var G__14160 = cljs.core.count.call(null,c__7604__auto___14157);
var G__14161 = (0);
seq__14142_14146 = G__14158;
chunk__14143_14147 = G__14159;
count__14144_14148 = G__14160;
i__14145_14149 = G__14161;
continue;
} else {
var i_14162 = cljs.core.first.call(null,seq__14142_14156__$1);
menu_instance.append(lt.objs.menu.menu_item.call(null,i_14162));

var G__14163 = cljs.core.next.call(null,seq__14142_14156__$1);
var G__14164 = null;
var G__14165 = (0);
var G__14166 = (0);
seq__14142_14146 = G__14163;
chunk__14143_14147 = G__14164;
count__14144_14148 = G__14165;
i__14145_14149 = G__14166;
continue;
}
} else {
}
}
break;
}

return menu_instance;
});
lt.objs.menu.show_menu = (function lt$objs$menu$show_menu(m){
return m.popup(lt.objs.menu.remote.getCurrentWindow());
});
lt.util.dom.on.call(null,lt.util.dom.$.call(null,new cljs.core.Keyword(null,"body","body",-2049205669)),new cljs.core.Keyword(null,"contextmenu","contextmenu",-15887481),(function (e){
lt.util.dom.prevent.call(null,e);

lt.util.dom.stop_propagation.call(null,e);

return false;
}));
lt.objs.menu.set_menubar = (function lt$objs$menu$set_menubar(items){
var menubar = (new lt.objs.menu.Menu());
var seq__14173_14179 = cljs.core.seq.call(null,items);
var chunk__14175_14180 = null;
var count__14176_14181 = (0);
var i__14177_14182 = (0);
while(true){
if((i__14177_14182 < count__14176_14181)){
var i_14183 = cljs.core._nth.call(null,chunk__14175_14180,i__14177_14182);
if(cljs.core.truth_(i_14183)){
menubar.append(lt.objs.menu.menu_item.call(null,i_14183));

var G__14184 = seq__14173_14179;
var G__14185 = chunk__14175_14180;
var G__14186 = count__14176_14181;
var G__14187 = (i__14177_14182 + (1));
seq__14173_14179 = G__14184;
chunk__14175_14180 = G__14185;
count__14176_14181 = G__14186;
i__14177_14182 = G__14187;
continue;
} else {
var G__14188 = seq__14173_14179;
var G__14189 = chunk__14175_14180;
var G__14190 = count__14176_14181;
var G__14191 = (i__14177_14182 + (1));
seq__14173_14179 = G__14188;
chunk__14175_14180 = G__14189;
count__14176_14181 = G__14190;
i__14177_14182 = G__14191;
continue;
}
} else {
var temp__4657__auto___14192 = cljs.core.seq.call(null,seq__14173_14179);
if(temp__4657__auto___14192){
var seq__14173_14193__$1 = temp__4657__auto___14192;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14173_14193__$1)){
var c__7604__auto___14194 = cljs.core.chunk_first.call(null,seq__14173_14193__$1);
var G__14195 = cljs.core.chunk_rest.call(null,seq__14173_14193__$1);
var G__14196 = c__7604__auto___14194;
var G__14197 = cljs.core.count.call(null,c__7604__auto___14194);
var G__14198 = (0);
seq__14173_14179 = G__14195;
chunk__14175_14180 = G__14196;
count__14176_14181 = G__14197;
i__14177_14182 = G__14198;
continue;
} else {
var i_14199 = cljs.core.first.call(null,seq__14173_14193__$1);
if(cljs.core.truth_(i_14199)){
menubar.append(lt.objs.menu.menu_item.call(null,i_14199));

var G__14200 = cljs.core.next.call(null,seq__14173_14193__$1);
var G__14201 = null;
var G__14202 = (0);
var G__14203 = (0);
seq__14173_14179 = G__14200;
chunk__14175_14180 = G__14201;
count__14176_14181 = G__14202;
i__14177_14182 = G__14203;
continue;
} else {
var G__14204 = cljs.core.next.call(null,seq__14173_14193__$1);
var G__14205 = null;
var G__14206 = (0);
var G__14207 = (0);
seq__14173_14179 = G__14204;
chunk__14175_14180 = G__14205;
count__14176_14181 = G__14206;
i__14177_14182 = G__14207;
continue;
}
}
} else {
}
}
break;
}

return lt.objs.menu.Menu.setApplicationMenu.call(null,menubar);
});
lt.objs.menu.key_mappings = new cljs.core.PersistentArrayMap(null, 4, ["cmd","Command","shift","Shift","ctrl","Control","alt","Alt"], null);
lt.objs.menu.command__GT_menu_binding = (function lt$objs$menu$command__GT_menu_binding(cmd){
var ks = cljs.core.first.call(null,lt.objs.keyboard.cmd__GT_current_binding.call(null,cmd));
var parts = clojure.string.split.call(null,ks," ");
var parts__$1 = (function (){var iter__7573__auto__ = ((function (ks,parts){
return (function lt$objs$menu$command__GT_menu_binding_$_iter__14228(s__14229){
return (new cljs.core.LazySeq(null,((function (ks,parts){
return (function (){
var s__14229__$1 = s__14229;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__14229__$1);
if(temp__4657__auto__){
var s__14229__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__14229__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__14229__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__14231 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__14230 = (0);
while(true){
if((i__14230 < size__7572__auto__)){
var part = cljs.core._nth.call(null,c__7571__auto__,i__14230);
var ks__$1 = (function (){var iter__7573__auto__ = ((function (i__14230,part,c__7571__auto__,size__7572__auto__,b__14231,s__14229__$2,temp__4657__auto__,ks,parts){
return (function lt$objs$menu$command__GT_menu_binding_$_iter__14228_$_iter__14240(s__14241){
return (new cljs.core.LazySeq(null,((function (i__14230,part,c__7571__auto__,size__7572__auto__,b__14231,s__14229__$2,temp__4657__auto__,ks,parts){
return (function (){
var s__14241__$1 = s__14241;
while(true){
var temp__4657__auto____$1 = cljs.core.seq.call(null,s__14241__$1);
if(temp__4657__auto____$1){
var s__14241__$2 = temp__4657__auto____$1;
if(cljs.core.chunked_seq_QMARK_.call(null,s__14241__$2)){
var c__7571__auto____$1 = cljs.core.chunk_first.call(null,s__14241__$2);
var size__7572__auto____$1 = cljs.core.count.call(null,c__7571__auto____$1);
var b__14243 = cljs.core.chunk_buffer.call(null,size__7572__auto____$1);
if((function (){var i__14242 = (0);
while(true){
if((i__14242 < size__7572__auto____$1)){
var key = cljs.core._nth.call(null,c__7571__auto____$1,i__14242);
cljs.core.chunk_append.call(null,b__14243,(function (){var or__6793__auto__ = lt.objs.menu.key_mappings.call(null,key);
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return key;
}
})());

var G__14248 = (i__14242 + (1));
i__14242 = G__14248;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__14243),lt$objs$menu$command__GT_menu_binding_$_iter__14228_$_iter__14240.call(null,cljs.core.chunk_rest.call(null,s__14241__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__14243),null);
}
} else {
var key = cljs.core.first.call(null,s__14241__$2);
return cljs.core.cons.call(null,(function (){var or__6793__auto__ = lt.objs.menu.key_mappings.call(null,key);
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return key;
}
})(),lt$objs$menu$command__GT_menu_binding_$_iter__14228_$_iter__14240.call(null,cljs.core.rest.call(null,s__14241__$2)));
}
} else {
return null;
}
break;
}
});})(i__14230,part,c__7571__auto__,size__7572__auto__,b__14231,s__14229__$2,temp__4657__auto__,ks,parts))
,null,null));
});})(i__14230,part,c__7571__auto__,size__7572__auto__,b__14231,s__14229__$2,temp__4657__auto__,ks,parts))
;
return iter__7573__auto__.call(null,clojure.string.split.call(null,part,"-"));
})();
cljs.core.chunk_append.call(null,b__14231,clojure.string.join.call(null,"+",ks__$1));

var G__14249 = (i__14230 + (1));
i__14230 = G__14249;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__14231),lt$objs$menu$command__GT_menu_binding_$_iter__14228.call(null,cljs.core.chunk_rest.call(null,s__14229__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__14231),null);
}
} else {
var part = cljs.core.first.call(null,s__14229__$2);
var ks__$1 = (function (){var iter__7573__auto__ = ((function (part,s__14229__$2,temp__4657__auto__,ks,parts){
return (function lt$objs$menu$command__GT_menu_binding_$_iter__14228_$_iter__14244(s__14245){
return (new cljs.core.LazySeq(null,((function (part,s__14229__$2,temp__4657__auto__,ks,parts){
return (function (){
var s__14245__$1 = s__14245;
while(true){
var temp__4657__auto____$1 = cljs.core.seq.call(null,s__14245__$1);
if(temp__4657__auto____$1){
var s__14245__$2 = temp__4657__auto____$1;
if(cljs.core.chunked_seq_QMARK_.call(null,s__14245__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__14245__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__14247 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__14246 = (0);
while(true){
if((i__14246 < size__7572__auto__)){
var key = cljs.core._nth.call(null,c__7571__auto__,i__14246);
cljs.core.chunk_append.call(null,b__14247,(function (){var or__6793__auto__ = lt.objs.menu.key_mappings.call(null,key);
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return key;
}
})());

var G__14250 = (i__14246 + (1));
i__14246 = G__14250;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__14247),lt$objs$menu$command__GT_menu_binding_$_iter__14228_$_iter__14244.call(null,cljs.core.chunk_rest.call(null,s__14245__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__14247),null);
}
} else {
var key = cljs.core.first.call(null,s__14245__$2);
return cljs.core.cons.call(null,(function (){var or__6793__auto__ = lt.objs.menu.key_mappings.call(null,key);
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return key;
}
})(),lt$objs$menu$command__GT_menu_binding_$_iter__14228_$_iter__14244.call(null,cljs.core.rest.call(null,s__14245__$2)));
}
} else {
return null;
}
break;
}
});})(part,s__14229__$2,temp__4657__auto__,ks,parts))
,null,null));
});})(part,s__14229__$2,temp__4657__auto__,ks,parts))
;
return iter__7573__auto__.call(null,clojure.string.split.call(null,part,"-"));
})();
return cljs.core.cons.call(null,clojure.string.join.call(null,"+",ks__$1),lt$objs$menu$command__GT_menu_binding_$_iter__14228.call(null,cljs.core.rest.call(null,s__14229__$2)));
}
} else {
return null;
}
break;
}
});})(ks,parts))
,null,null));
});})(ks,parts))
;
return iter__7573__auto__.call(null,parts);
})();
if((cljs.core.seq.call(null,parts__$1)) && ((cljs.core.not.call(null,lt.objs.platform.mac_QMARK_.call(null))) || (cljs.core._EQ_.call(null,cljs.core.count.call(null,parts__$1),(1))))){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"accelerator","accelerator",1975205785),clojure.string.join.call(null," ",parts__$1)], null);
} else {
return null;
}
});
lt.objs.menu.cmd_item = (function lt$objs$menu$cmd_item(var_args){
var args14251 = [];
var len__7868__auto___14254 = arguments.length;
var i__7869__auto___14255 = (0);
while(true){
if((i__7869__auto___14255 < len__7868__auto___14254)){
args14251.push((arguments[i__7869__auto___14255]));

var G__14256 = (i__7869__auto___14255 + (1));
i__7869__auto___14255 = G__14256;
continue;
} else {
}
break;
}

var G__14253 = args14251.length;
switch (G__14253) {
case 2:
return lt.objs.menu.cmd_item.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return lt.objs.menu.cmd_item.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args14251.length)].join('')));

}
});

lt.objs.menu.cmd_item.cljs$core$IFn$_invoke$arity$2 = (function (label,cmd){
return lt.objs.menu.cmd_item.call(null,label,cmd,cljs.core.PersistentArrayMap.EMPTY);
});

lt.objs.menu.cmd_item.cljs$core$IFn$_invoke$arity$3 = (function (label,cmd,opts){
return cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),label,new cljs.core.Keyword(null,"click","click",1912301393),(cljs.core.truth_(new cljs.core.Keyword(null,"role","role",-736691072).cljs$core$IFn$_invoke$arity$1(opts))?null:(function (){
return lt.objs.command.exec_BANG_.call(null,cmd);
}))], null),opts,lt.objs.menu.command__GT_menu_binding.call(null,cmd));
});

lt.objs.menu.cmd_item.cljs$lang$maxFixedArity = 3;

lt.objs.menu.unknown_menu = (function lt$objs$menu$unknown_menu(){
return lt.objs.menu.set_menubar.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.truth_(lt.objs.platform.mac_QMARK_.call(null))?new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"",new cljs.core.Keyword(null,"submenu","submenu",2142563344),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.objs.menu.cmd_item.call(null,"About Light Table",new cljs.core.Keyword(null,"version","version",425292698)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),"separator"], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"label","label",1718410804),"Hide Light Table",new cljs.core.Keyword(null,"accelerator","accelerator",1975205785),"Command+H",new cljs.core.Keyword(null,"role","role",-736691072),"hide"], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"label","label",1718410804),"Hide Others",new cljs.core.Keyword(null,"accelerator","accelerator",1975205785),"Command+Alt+H",new cljs.core.Keyword(null,"role","role",-736691072),"hideothers"], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),"separator"], null),lt.objs.menu.cmd_item.call(null,"Quit Light Table",new cljs.core.Keyword(null,"quit","quit",53285210),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"accelerator","accelerator",1975205785),"Command+Q"], null))], null)], null):null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"Edit",new cljs.core.Keyword(null,"submenu","submenu",2142563344),new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.objs.menu.cmd_item.call(null,"Undo",new cljs.core.Keyword(null,"editor.undo","editor.undo",504443764),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"role","role",-736691072),"undo",new cljs.core.Keyword(null,"accelerator","accelerator",1975205785),"CommandOrControl+Z"], null)),lt.objs.menu.cmd_item.call(null,"Redo",new cljs.core.Keyword(null,"editor.redo","editor.redo",181793908),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"role","role",-736691072),"redo",new cljs.core.Keyword(null,"accelerator","accelerator",1975205785),"Command+Shift+Z"], null)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),"separator"], null),lt.objs.menu.cmd_item.call(null,"Cut",new cljs.core.Keyword(null,"editor.cut","editor.cut",-1960645712),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"role","role",-736691072),"cut",new cljs.core.Keyword(null,"accelerator","accelerator",1975205785),"CommandOrControl+X"], null)),lt.objs.menu.cmd_item.call(null,"Copy",new cljs.core.Keyword(null,"editor.copy","editor.copy",-1879637400),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"role","role",-736691072),"copy",new cljs.core.Keyword(null,"accelerator","accelerator",1975205785),"CommandOrControl+C"], null)),lt.objs.menu.cmd_item.call(null,"Paste",new cljs.core.Keyword(null,"editor.paste","editor.paste",-706576083),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"role","role",-736691072),"paste",new cljs.core.Keyword(null,"accelerator","accelerator",1975205785),"CommandOrControl+V"], null)),lt.objs.menu.cmd_item.call(null,"Select All",new cljs.core.Keyword(null,"editor.select-all","editor.select-all",-1230577580),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"role","role",-736691072),"selectall",new cljs.core.Keyword(null,"accelerator","accelerator",1975205785),"CommandOrControl+A"], null))], null)], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"Window",new cljs.core.Keyword(null,"submenu","submenu",2142563344),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.objs.menu.cmd_item.call(null,"Minimize",new cljs.core.Keyword(null,"window.minimize","window.minimize",-1025606910),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"role","role",-736691072),"minimize",new cljs.core.Keyword(null,"accelerator","accelerator",1975205785),"Command+M"], null)),lt.objs.menu.cmd_item.call(null,"Close window",new cljs.core.Keyword(null,"window.close","window.close",-983383177),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"role","role",-736691072),"close",new cljs.core.Keyword(null,"accelerator","accelerator",1975205785),"Command+W"], null))], null)], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"Help",new cljs.core.Keyword(null,"submenu","submenu",2142563344),cljs.core.PersistentVector.EMPTY], null)], null));
});
lt.objs.menu.main_menu = (function lt$objs$menu$main_menu(){
return lt.objs.menu.set_menubar.call(null,new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.truth_(lt.objs.platform.mac_QMARK_.call(null))?new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"",new cljs.core.Keyword(null,"submenu","submenu",2142563344),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.objs.menu.cmd_item.call(null,"About Light Table",new cljs.core.Keyword(null,"version","version",425292698)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),"separator"], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"label","label",1718410804),"Hide Light Table",new cljs.core.Keyword(null,"accelerator","accelerator",1975205785),"Command+H",new cljs.core.Keyword(null,"role","role",-736691072),"hide"], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"label","label",1718410804),"Hide Others",new cljs.core.Keyword(null,"accelerator","accelerator",1975205785),"Command+Alt+H",new cljs.core.Keyword(null,"role","role",-736691072),"hideothers"], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),"separator"], null),lt.objs.menu.cmd_item.call(null,"Quit Light Table",new cljs.core.Keyword(null,"quit","quit",53285210),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"accelerator","accelerator",1975205785),"Command+Q"], null))], null)], null):null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"&File",new cljs.core.Keyword(null,"submenu","submenu",2142563344),cljs.core.into.call(null,new cljs.core.PersistentVector(null, 11, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.objs.menu.cmd_item.call(null,"New file",new cljs.core.Keyword(null,"new-file","new-file",1507201273)),lt.objs.menu.cmd_item.call(null,"Open file",new cljs.core.Keyword(null,"open-file","open-file",-895422430)),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"Open folder",new cljs.core.Keyword(null,"click","click",1912301393),(function (){
lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"workspace.show","workspace.show",-1449362332),new cljs.core.Keyword(null,"force","force",781957286));

return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"workspace.add-folder","workspace.add-folder",-1962688089));
})], null),lt.objs.menu.cmd_item.call(null,"Open recent workspace",new cljs.core.Keyword(null,"workspace.show-recents","workspace.show-recents",1671442122),cljs.core.PersistentArrayMap.EMPTY),lt.objs.menu.cmd_item.call(null,"Save file",new cljs.core.Keyword(null,"save","save",1850079149)),lt.objs.menu.cmd_item.call(null,"Save file as..",new cljs.core.Keyword(null,"save-as","save-as",-1722047792)),lt.objs.menu.cmd_item.call(null,"Close file",new cljs.core.Keyword(null,"tabs.close","tabs.close",-2075421183)),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"Settings",new cljs.core.Keyword(null,"submenu","submenu",2142563344),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.objs.menu.cmd_item.call(null,"User keymap",new cljs.core.Keyword(null,"keymap.modify-user","keymap.modify-user",1194420785)),lt.objs.menu.cmd_item.call(null,"User behaviors",new cljs.core.Keyword(null,"behaviors.modify-user","behaviors.modify-user",-973902490)),lt.objs.menu.cmd_item.call(null,"User script",new cljs.core.Keyword(null,"user.modify-user","user.modify-user",-829072516))], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),"separator"], null),lt.objs.menu.cmd_item.call(null,"New window",new cljs.core.Keyword(null,"window.new","window.new",-572789814)),lt.objs.menu.cmd_item.call(null,"Close window",new cljs.core.Keyword(null,"window.close","window.close",-983383177))], null),(cljs.core.truth_(lt.objs.platform.mac_QMARK_.call(null))?null:new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),"separator"], null),lt.objs.menu.cmd_item.call(null,"About Light Table",new cljs.core.Keyword(null,"version","version",425292698)),lt.objs.menu.cmd_item.call(null,"Quit Light Table",new cljs.core.Keyword(null,"quit","quit",53285210),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"accelerator","accelerator",1975205785),"Control+Q"], null))], null)))], null),(cljs.core.truth_(lt.objs.platform.mac_QMARK_.call(null))?new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"Edit",new cljs.core.Keyword(null,"submenu","submenu",2142563344),new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.objs.menu.cmd_item.call(null,"Undo",new cljs.core.Keyword(null,"editor.undo","editor.undo",504443764),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"role","role",-736691072),"undo",new cljs.core.Keyword(null,"accelerator","accelerator",1975205785),"CommandOrControl+Z"], null)),lt.objs.menu.cmd_item.call(null,"Redo",new cljs.core.Keyword(null,"editor.redo","editor.redo",181793908),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"role","role",-736691072),"redo",new cljs.core.Keyword(null,"accelerator","accelerator",1975205785),"CommandOrControl+Shift+Z"], null)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),"separator"], null),lt.objs.menu.cmd_item.call(null,"Cut",new cljs.core.Keyword(null,"editor.cut","editor.cut",-1960645712),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"role","role",-736691072),"cut",new cljs.core.Keyword(null,"accelerator","accelerator",1975205785),"CommandOrControl+X"], null)),lt.objs.menu.cmd_item.call(null,"Copy",new cljs.core.Keyword(null,"editor.copy","editor.copy",-1879637400),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"role","role",-736691072),"copy",new cljs.core.Keyword(null,"accelerator","accelerator",1975205785),"CommandOrControl+C"], null)),lt.objs.menu.cmd_item.call(null,"Paste",new cljs.core.Keyword(null,"editor.paste","editor.paste",-706576083),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"role","role",-736691072),"paste",new cljs.core.Keyword(null,"accelerator","accelerator",1975205785),"CommandOrControl+V"], null)),lt.objs.menu.cmd_item.call(null,"Select All",new cljs.core.Keyword(null,"editor.select-all","editor.select-all",-1230577580),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"role","role",-736691072),"selectall",new cljs.core.Keyword(null,"accelerator","accelerator",1975205785),"CommandOrControl+A"], null))], null)], null):new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"&Edit",new cljs.core.Keyword(null,"submenu","submenu",2142563344),new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.objs.menu.cmd_item.call(null,"Undo",new cljs.core.Keyword(null,"editor.undo","editor.undo",504443764)),lt.objs.menu.cmd_item.call(null,"Redo",new cljs.core.Keyword(null,"editor.redo","editor.redo",181793908)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),"separator"], null),lt.objs.menu.cmd_item.call(null,"Cut",new cljs.core.Keyword(null,"editor.cut","editor.cut",-1960645712)),lt.objs.menu.cmd_item.call(null,"Copy",new cljs.core.Keyword(null,"editor.copy","editor.copy",-1879637400)),lt.objs.menu.cmd_item.call(null,"Paste",new cljs.core.Keyword(null,"editor.paste","editor.paste",-706576083)),lt.objs.menu.cmd_item.call(null,"Select All",new cljs.core.Keyword(null,"editor.select-all","editor.select-all",-1230577580))], null)], null)),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"&View",new cljs.core.Keyword(null,"submenu","submenu",2142563344),new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.objs.menu.cmd_item.call(null,"Workspace",new cljs.core.Keyword(null,"workspace.show","workspace.show",-1449362332)),lt.objs.menu.cmd_item.call(null,"Connections",new cljs.core.Keyword(null,"show-connect","show-connect",-2130622063)),lt.objs.menu.cmd_item.call(null,"Navigator",new cljs.core.Keyword(null,"navigate-workspace-transient","navigate-workspace-transient",-1413476288)),lt.objs.menu.cmd_item.call(null,"Commands",new cljs.core.Keyword(null,"show-commandbar-transient","show-commandbar-transient",1931838326)),lt.objs.menu.cmd_item.call(null,"Plugin Manager",new cljs.core.Keyword(null,"plugin-manager.show","plugin-manager.show",-401374110)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),"separator"], null),lt.objs.menu.cmd_item.call(null,"Language docs",new cljs.core.Keyword(null,"docs.search.show","docs.search.show",-659879847)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),"separator"], null),lt.objs.menu.cmd_item.call(null,"Console",new cljs.core.Keyword(null,"toggle-console","toggle-console",2094748794)),lt.objs.menu.cmd_item.call(null,"Developer Tools",new cljs.core.Keyword(null,"dev-inspector","dev-inspector",-994386787))], null)], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"&Window",new cljs.core.Keyword(null,"submenu","submenu",2142563344),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.objs.menu.cmd_item.call(null,"Minimize",new cljs.core.Keyword(null,"window.minimize","window.minimize",-1025606910)),lt.objs.menu.cmd_item.call(null,"Maximize",new cljs.core.Keyword(null,"window.maximize","window.maximize",-1691981841)),lt.objs.menu.cmd_item.call(null,"Fullscreen",new cljs.core.Keyword(null,"window.fullscreen","window.fullscreen",-881944320))], null)], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"&Help",new cljs.core.Keyword(null,"submenu","submenu",2142563344),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.objs.menu.cmd_item.call(null,"Documentation",new cljs.core.Keyword(null,"show-docs","show-docs",-332260169)),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"Report an Issue",new cljs.core.Keyword(null,"click","click",1912301393),(function (){
return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"add-browser-tab","add-browser-tab",612625027),"https://github.com/LightTable/LightTable/issues?state=open");
})], null),(cljs.core.truth_(lt.objs.platform.mac_QMARK_.call(null))?null:lt.objs.menu.cmd_item.call(null,"About Light Table",new cljs.core.Keyword(null,"version","version",425292698)))], null)], null)], null));
});
/**
 * 
 */
lt.objs.menu.__BEH__create_menu = (function lt$objs$menu$__BEH__create_menu(this$){
if(cljs.core.truth_(lt.objs.platform.mac_QMARK_.call(null))){
lt.objs.app.win.Menu = null;
} else {
}

return lt.objs.menu.main_menu.call(null);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.menu","create-menu","lt.objs.menu/create-menu",-1678005673),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"init","init",-1875481434),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.menu.__BEH__create_menu);
/**
 * 
 */
lt.objs.menu.__BEH__recreate_menu = (function lt$objs$menu$__BEH__recreate_menu(app){
if(cljs.core.truth_(lt.objs.platform.mac_QMARK_.call(null))){
return lt.objs.menu.main_menu.call(null);
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.menu","recreate-menu","lt.objs.menu/recreate-menu",-19822152),new cljs.core.Keyword(null,"debounce","debounce",-871550296),(20),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"app.keys.load","app.keys.load",-1717839792),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.menu.__BEH__recreate_menu);
/**
 * 
 */
lt.objs.menu.__BEH__set_menu = (function lt$objs$menu$__BEH__set_menu(this$){
if(cljs.core.truth_(lt.objs.platform.mac_QMARK_.call(null))){
return lt.objs.menu.main_menu.call(null);
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.menu","set-menu","lt.objs.menu/set-menu",-1064022065),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"focus","focus",234677911),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.menu.__BEH__set_menu);
/**
 * 
 */
lt.objs.menu.__BEH__remove_menu_close = (function lt$objs$menu$__BEH__remove_menu_close(this$){
if(cljs.core.truth_(lt.objs.platform.mac_QMARK_.call(null))){
return lt.objs.menu.unknown_menu.call(null);
} else {
return null;
}
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.menu","remove-menu-close","lt.objs.menu/remove-menu-close",-281927298),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"closed","closed",-919675359),null,new cljs.core.Keyword(null,"blur","blur",-453500461),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.menu.__BEH__remove_menu_close);
/**
 * 
 */
lt.objs.menu.__BEH__menu_BANG_ = (function lt$objs$menu$__BEH__menu_BANG_(this$,e){
var items_14258 = cljs.core.sort_by.call(null,new cljs.core.Keyword(null,"order","order",-1254677256),cljs.core.filter.call(null,cljs.core.identity,lt.object.raise_reduce.call(null,this$,new cljs.core.Keyword(null,"menu+","menu+",276559402),cljs.core.PersistentVector.EMPTY,e)));
lt.objs.menu.show_menu.call(null,lt.objs.menu.menu.call(null,items_14258));

lt.util.dom.prevent.call(null,e);

return lt.util.dom.stop_propagation.call(null,e);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.menu","menu!","lt.objs.menu/menu!",1496396572),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"menu!","menu!",-1593399467),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.menu.__BEH__menu_BANG_);
