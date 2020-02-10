// Compiled by ClojureScript 1.9.229 {}
goog.provide('lt.objs.platform');
goog.require('cljs.core');
goog.require('lt.object');
goog.require('lt.util.dom');
lt.objs.platform.electron = true;
lt.objs.platform.fs = require("fs");
lt.objs.platform.remote = require("electron").remote;
lt.objs.platform.clipboard = require("electron").clipboard;
lt.objs.platform.electron_shell = require("electron").shell;
lt.objs.platform.get_data_path = (function lt$objs$platform$get_data_path(){
return lt.objs.platform.remote.app.getAppPath();
});
lt.objs.platform.normalize = (function lt$objs$platform$normalize(plat){
var pred__13437 = cljs.core._EQ_;
var expr__13438 = plat;
if(cljs.core.truth_(pred__13437.call(null,"win32",expr__13438))){
return new cljs.core.Keyword(null,"windows","windows",2068861701);
} else {
if(cljs.core.truth_(pred__13437.call(null,"linux",expr__13438))){
return new cljs.core.Keyword(null,"linux","linux",-238042662);
} else {
if(cljs.core.truth_(pred__13437.call(null,"darwin",expr__13438))){
return new cljs.core.Keyword(null,"mac","mac",-1879391650);
} else {
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(expr__13438)].join('')));
}
}
}
});
lt.objs.platform.open_url = (function lt$objs$platform$open_url(path){
return lt.objs.platform.electron_shell.openExternal(path);
});
/**
 * If the given path exists, open it with the desktop's default manner.
 *   Otherwise, open it as an external protocol e.g. a url.
 */
lt.objs.platform.open = (function lt$objs$platform$open(path){
if(cljs.core.truth_(lt.objs.platform.fs.existsSync(path))){
return lt.objs.platform.electron_shell.openItem(path);
} else {
return lt.objs.platform.open_url.call(null,path);
}
});
lt.objs.platform.show_item = (function lt$objs$platform$show_item(path){
return lt.objs.platform.electron_shell.showItemInFolder(path);
});
/**
 * Copies given text to platform's clipboard
 */
lt.objs.platform.copy = (function lt$objs$platform$copy(text){
return lt.objs.platform.clipboard.writeText(text);
});
/**
 * Returns text of last copy to platform's clipboard
 */
lt.objs.platform.paste = (function lt$objs$platform$paste(){
return lt.objs.platform.clipboard.readText();
});
lt.objs.platform.platform = lt.objs.platform.normalize.call(null,process.platform);
lt.objs.platform.mac_QMARK_ = (function lt$objs$platform$mac_QMARK_(){
return cljs.core._EQ_.call(null,lt.objs.platform.platform,new cljs.core.Keyword(null,"mac","mac",-1879391650));
});
lt.objs.platform.win_QMARK_ = (function lt$objs$platform$win_QMARK_(){
return cljs.core._EQ_.call(null,lt.objs.platform.platform,new cljs.core.Keyword(null,"windows","windows",2068861701));
});
lt.objs.platform.linux_QMARK_ = (function lt$objs$platform$linux_QMARK_(){
return cljs.core._EQ_.call(null,lt.objs.platform.platform,new cljs.core.Keyword(null,"linux","linux",-238042662));
});
