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
}catch (e14094){var e = e14094;
return lt.objs.console.error(e);
}});})(opts__$1))
):opts__$1);
return (new lt.objs.menu.MenuItem(cljs.core.clj__GT_js.call(null,opts__$1)));
});
lt.objs.menu.submenu = (function lt$objs$menu$submenu(items){
var menu = (new lt.objs.menu.Menu());
var seq__14101_14107 = cljs.core.seq.call(null,items);
var chunk__14103_14108 = null;
var count__14104_14109 = (0);
var i__14105_14110 = (0);
while(true){
if((i__14105_14110 < count__14104_14109)){
var i_14111 = cljs.core._nth.call(null,chunk__14103_14108,i__14105_14110);
if(cljs.core.truth_(i_14111)){
menu.append(lt.objs.menu.menu_item.call(null,i_14111));

var G__14112 = seq__14101_14107;
var G__14113 = chunk__14103_14108;
var G__14114 = count__14104_14109;
var G__14115 = (i__14105_14110 + (1));
seq__14101_14107 = G__14112;
chunk__14103_14108 = G__14113;
count__14104_14109 = G__14114;
i__14105_14110 = G__14115;
continue;
} else {
var G__14116 = seq__14101_14107;
var G__14117 = chunk__14103_14108;
var G__14118 = count__14104_14109;
var G__14119 = (i__14105_14110 + (1));
seq__14101_14107 = G__14116;
chunk__14103_14108 = G__14117;
count__14104_14109 = G__14118;
i__14105_14110 = G__14119;
continue;
}
} else {
var temp__4657__auto___14120 = cljs.core.seq.call(null,seq__14101_14107);
if(temp__4657__auto___14120){
var seq__14101_14121__$1 = temp__4657__auto___14120;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14101_14121__$1)){
var c__7604__auto___14122 = cljs.core.chunk_first.call(null,seq__14101_14121__$1);
var G__14123 = cljs.core.chunk_rest.call(null,seq__14101_14121__$1);
var G__14124 = c__7604__auto___14122;
var G__14125 = cljs.core.count.call(null,c__7604__auto___14122);
var G__14126 = (0);
seq__14101_14107 = G__14123;
chunk__14103_14108 = G__14124;
count__14104_14109 = G__14125;
i__14105_14110 = G__14126;
continue;
} else {
var i_14127 = cljs.core.first.call(null,seq__14101_14121__$1);
if(cljs.core.truth_(i_14127)){
menu.append(lt.objs.menu.menu_item.call(null,i_14127));

var G__14128 = cljs.core.next.call(null,seq__14101_14121__$1);
var G__14129 = null;
var G__14130 = (0);
var G__14131 = (0);
seq__14101_14107 = G__14128;
chunk__14103_14108 = G__14129;
count__14104_14109 = G__14130;
i__14105_14110 = G__14131;
continue;
} else {
var G__14132 = cljs.core.next.call(null,seq__14101_14121__$1);
var G__14133 = null;
var G__14134 = (0);
var G__14135 = (0);
seq__14101_14107 = G__14132;
chunk__14103_14108 = G__14133;
count__14104_14109 = G__14134;
i__14105_14110 = G__14135;
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
var seq__14140_14144 = cljs.core.seq.call(null,items);
var chunk__14141_14145 = null;
var count__14142_14146 = (0);
var i__14143_14147 = (0);
while(true){
if((i__14143_14147 < count__14142_14146)){
var i_14148 = cljs.core._nth.call(null,chunk__14141_14145,i__14143_14147);
menu_instance.append(lt.objs.menu.menu_item.call(null,i_14148));

var G__14149 = seq__14140_14144;
var G__14150 = chunk__14141_14145;
var G__14151 = count__14142_14146;
var G__14152 = (i__14143_14147 + (1));
seq__14140_14144 = G__14149;
chunk__14141_14145 = G__14150;
count__14142_14146 = G__14151;
i__14143_14147 = G__14152;
continue;
} else {
var temp__4657__auto___14153 = cljs.core.seq.call(null,seq__14140_14144);
if(temp__4657__auto___14153){
var seq__14140_14154__$1 = temp__4657__auto___14153;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14140_14154__$1)){
var c__7604__auto___14155 = cljs.core.chunk_first.call(null,seq__14140_14154__$1);
var G__14156 = cljs.core.chunk_rest.call(null,seq__14140_14154__$1);
var G__14157 = c__7604__auto___14155;
var G__14158 = cljs.core.count.call(null,c__7604__auto___14155);
var G__14159 = (0);
seq__14140_14144 = G__14156;
chunk__14141_14145 = G__14157;
count__14142_14146 = G__14158;
i__14143_14147 = G__14159;
continue;
} else {
var i_14160 = cljs.core.first.call(null,seq__14140_14154__$1);
menu_instance.append(lt.objs.menu.menu_item.call(null,i_14160));

var G__14161 = cljs.core.next.call(null,seq__14140_14154__$1);
var G__14162 = null;
var G__14163 = (0);
var G__14164 = (0);
seq__14140_14144 = G__14161;
chunk__14141_14145 = G__14162;
count__14142_14146 = G__14163;
i__14143_14147 = G__14164;
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
var seq__14171_14177 = cljs.core.seq.call(null,items);
var chunk__14173_14178 = null;
var count__14174_14179 = (0);
var i__14175_14180 = (0);
while(true){
if((i__14175_14180 < count__14174_14179)){
var i_14181 = cljs.core._nth.call(null,chunk__14173_14178,i__14175_14180);
if(cljs.core.truth_(i_14181)){
menubar.append(lt.objs.menu.menu_item.call(null,i_14181));

var G__14182 = seq__14171_14177;
var G__14183 = chunk__14173_14178;
var G__14184 = count__14174_14179;
var G__14185 = (i__14175_14180 + (1));
seq__14171_14177 = G__14182;
chunk__14173_14178 = G__14183;
count__14174_14179 = G__14184;
i__14175_14180 = G__14185;
continue;
} else {
var G__14186 = seq__14171_14177;
var G__14187 = chunk__14173_14178;
var G__14188 = count__14174_14179;
var G__14189 = (i__14175_14180 + (1));
seq__14171_14177 = G__14186;
chunk__14173_14178 = G__14187;
count__14174_14179 = G__14188;
i__14175_14180 = G__14189;
continue;
}
} else {
var temp__4657__auto___14190 = cljs.core.seq.call(null,seq__14171_14177);
if(temp__4657__auto___14190){
var seq__14171_14191__$1 = temp__4657__auto___14190;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14171_14191__$1)){
var c__7604__auto___14192 = cljs.core.chunk_first.call(null,seq__14171_14191__$1);
var G__14193 = cljs.core.chunk_rest.call(null,seq__14171_14191__$1);
var G__14194 = c__7604__auto___14192;
var G__14195 = cljs.core.count.call(null,c__7604__auto___14192);
var G__14196 = (0);
seq__14171_14177 = G__14193;
chunk__14173_14178 = G__14194;
count__14174_14179 = G__14195;
i__14175_14180 = G__14196;
continue;
} else {
var i_14197 = cljs.core.first.call(null,seq__14171_14191__$1);
if(cljs.core.truth_(i_14197)){
menubar.append(lt.objs.menu.menu_item.call(null,i_14197));

var G__14198 = cljs.core.next.call(null,seq__14171_14191__$1);
var G__14199 = null;
var G__14200 = (0);
var G__14201 = (0);
seq__14171_14177 = G__14198;
chunk__14173_14178 = G__14199;
count__14174_14179 = G__14200;
i__14175_14180 = G__14201;
continue;
} else {
var G__14202 = cljs.core.next.call(null,seq__14171_14191__$1);
var G__14203 = null;
var G__14204 = (0);
var G__14205 = (0);
seq__14171_14177 = G__14202;
chunk__14173_14178 = G__14203;
count__14174_14179 = G__14204;
i__14175_14180 = G__14205;
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
return (function lt$objs$menu$command__GT_menu_binding_$_iter__14226(s__14227){
return (new cljs.core.LazySeq(null,((function (ks,parts){
return (function (){
var s__14227__$1 = s__14227;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__14227__$1);
if(temp__4657__auto__){
var s__14227__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__14227__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__14227__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__14229 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__14228 = (0);
while(true){
if((i__14228 < size__7572__auto__)){
var part = cljs.core._nth.call(null,c__7571__auto__,i__14228);
var ks__$1 = (function (){var iter__7573__auto__ = ((function (i__14228,part,c__7571__auto__,size__7572__auto__,b__14229,s__14227__$2,temp__4657__auto__,ks,parts){
return (function lt$objs$menu$command__GT_menu_binding_$_iter__14226_$_iter__14238(s__14239){
return (new cljs.core.LazySeq(null,((function (i__14228,part,c__7571__auto__,size__7572__auto__,b__14229,s__14227__$2,temp__4657__auto__,ks,parts){
return (function (){
var s__14239__$1 = s__14239;
while(true){
var temp__4657__auto____$1 = cljs.core.seq.call(null,s__14239__$1);
if(temp__4657__auto____$1){
var s__14239__$2 = temp__4657__auto____$1;
if(cljs.core.chunked_seq_QMARK_.call(null,s__14239__$2)){
var c__7571__auto____$1 = cljs.core.chunk_first.call(null,s__14239__$2);
var size__7572__auto____$1 = cljs.core.count.call(null,c__7571__auto____$1);
var b__14241 = cljs.core.chunk_buffer.call(null,size__7572__auto____$1);
if((function (){var i__14240 = (0);
while(true){
if((i__14240 < size__7572__auto____$1)){
var key = cljs.core._nth.call(null,c__7571__auto____$1,i__14240);
cljs.core.chunk_append.call(null,b__14241,(function (){var or__6793__auto__ = lt.objs.menu.key_mappings.call(null,key);
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return key;
}
})());

var G__14246 = (i__14240 + (1));
i__14240 = G__14246;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__14241),lt$objs$menu$command__GT_menu_binding_$_iter__14226_$_iter__14238.call(null,cljs.core.chunk_rest.call(null,s__14239__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__14241),null);
}
} else {
var key = cljs.core.first.call(null,s__14239__$2);
return cljs.core.cons.call(null,(function (){var or__6793__auto__ = lt.objs.menu.key_mappings.call(null,key);
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return key;
}
})(),lt$objs$menu$command__GT_menu_binding_$_iter__14226_$_iter__14238.call(null,cljs.core.rest.call(null,s__14239__$2)));
}
} else {
return null;
}
break;
}
});})(i__14228,part,c__7571__auto__,size__7572__auto__,b__14229,s__14227__$2,temp__4657__auto__,ks,parts))
,null,null));
});})(i__14228,part,c__7571__auto__,size__7572__auto__,b__14229,s__14227__$2,temp__4657__auto__,ks,parts))
;
return iter__7573__auto__.call(null,clojure.string.split.call(null,part,"-"));
})();
cljs.core.chunk_append.call(null,b__14229,clojure.string.join.call(null,"+",ks__$1));

var G__14247 = (i__14228 + (1));
i__14228 = G__14247;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__14229),lt$objs$menu$command__GT_menu_binding_$_iter__14226.call(null,cljs.core.chunk_rest.call(null,s__14227__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__14229),null);
}
} else {
var part = cljs.core.first.call(null,s__14227__$2);
var ks__$1 = (function (){var iter__7573__auto__ = ((function (part,s__14227__$2,temp__4657__auto__,ks,parts){
return (function lt$objs$menu$command__GT_menu_binding_$_iter__14226_$_iter__14242(s__14243){
return (new cljs.core.LazySeq(null,((function (part,s__14227__$2,temp__4657__auto__,ks,parts){
return (function (){
var s__14243__$1 = s__14243;
while(true){
var temp__4657__auto____$1 = cljs.core.seq.call(null,s__14243__$1);
if(temp__4657__auto____$1){
var s__14243__$2 = temp__4657__auto____$1;
if(cljs.core.chunked_seq_QMARK_.call(null,s__14243__$2)){
var c__7571__auto__ = cljs.core.chunk_first.call(null,s__14243__$2);
var size__7572__auto__ = cljs.core.count.call(null,c__7571__auto__);
var b__14245 = cljs.core.chunk_buffer.call(null,size__7572__auto__);
if((function (){var i__14244 = (0);
while(true){
if((i__14244 < size__7572__auto__)){
var key = cljs.core._nth.call(null,c__7571__auto__,i__14244);
cljs.core.chunk_append.call(null,b__14245,(function (){var or__6793__auto__ = lt.objs.menu.key_mappings.call(null,key);
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return key;
}
})());

var G__14248 = (i__14244 + (1));
i__14244 = G__14248;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__14245),lt$objs$menu$command__GT_menu_binding_$_iter__14226_$_iter__14242.call(null,cljs.core.chunk_rest.call(null,s__14243__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__14245),null);
}
} else {
var key = cljs.core.first.call(null,s__14243__$2);
return cljs.core.cons.call(null,(function (){var or__6793__auto__ = lt.objs.menu.key_mappings.call(null,key);
if(cljs.core.truth_(or__6793__auto__)){
return or__6793__auto__;
} else {
return key;
}
})(),lt$objs$menu$command__GT_menu_binding_$_iter__14226_$_iter__14242.call(null,cljs.core.rest.call(null,s__14243__$2)));
}
} else {
return null;
}
break;
}
});})(part,s__14227__$2,temp__4657__auto__,ks,parts))
,null,null));
});})(part,s__14227__$2,temp__4657__auto__,ks,parts))
;
return iter__7573__auto__.call(null,clojure.string.split.call(null,part,"-"));
})();
return cljs.core.cons.call(null,clojure.string.join.call(null,"+",ks__$1),lt$objs$menu$command__GT_menu_binding_$_iter__14226.call(null,cljs.core.rest.call(null,s__14227__$2)));
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
var args14249 = [];
var len__7868__auto___14252 = arguments.length;
var i__7869__auto___14253 = (0);
while(true){
if((i__7869__auto___14253 < len__7868__auto___14252)){
args14249.push((arguments[i__7869__auto___14253]));

var G__14254 = (i__7869__auto___14253 + (1));
i__7869__auto___14253 = G__14254;
continue;
} else {
}
break;
}

var G__14251 = args14249.length;
switch (G__14251) {
case 2:
return lt.objs.menu.cmd_item.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return lt.objs.menu.cmd_item.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args14249.length)].join('')));

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
var items_14256 = cljs.core.sort_by.call(null,new cljs.core.Keyword(null,"order","order",-1254677256),cljs.core.filter.call(null,cljs.core.identity,lt.object.raise_reduce.call(null,this$,new cljs.core.Keyword(null,"menu+","menu+",276559402),cljs.core.PersistentVector.EMPTY,e)));
lt.objs.menu.show_menu.call(null,lt.objs.menu.menu.call(null,items_14256));

lt.util.dom.prevent.call(null,e);

return lt.util.dom.stop_propagation.call(null,e);
});

lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.objs.menu","menu!","lt.objs.menu/menu!",1496396572),new cljs.core.Keyword(null,"triggers","triggers",-1443678770),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"menu!","menu!",-1593399467),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",490869788),lt.objs.menu.__BEH__menu_BANG_);
