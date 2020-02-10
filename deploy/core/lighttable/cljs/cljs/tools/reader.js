// Compiled by ClojureScript 1.10.597 {}
goog.provide('cljs.tools.reader');
goog.require('cljs.core');
goog.require('cljs.tools.reader.reader_types');
goog.require('cljs.tools.reader.impl.utils');
goog.require('cljs.tools.reader.impl.commons');
goog.require('cljs.tools.reader.impl.errors');
goog.require('goog.array');
goog.require('goog.string');
goog.require('goog.string.StringBuffer');






cljs.tools.reader.macro_terminating_QMARK_ = (function cljs$tools$reader$macro_terminating_QMARK_(ch){
var G__7081 = ch;
switch (G__7081) {
case "\"":
case ";":
case "@":
case "^":
case "`":
case "~":
case "(":
case ")":
case "[":
case "]":
case "{":
case "}":
case "\\":
return true;

break;
default:
return false;

}
});
cljs.tools.reader.sb = (new goog.string.StringBuffer());
/**
 * Read in a single logical token from the reader
 */
cljs.tools.reader.read_token = (function cljs$tools$reader$read_token(rdr,kind,initch){
if((initch == null)){
return cljs.tools.reader.impl.errors.throw_eof_at_start.call(null,rdr,kind);
} else {
cljs.tools.reader.sb.clear();

var ch = initch;
while(true){
if(((cljs.tools.reader.impl.utils.whitespace_QMARK_.call(null,ch)) || (cljs.tools.reader.macro_terminating_QMARK_.call(null,ch)) || ((ch == null)))){
if((ch == null)){
} else {
cljs.tools.reader.reader_types.unread.call(null,rdr,ch);
}

return cljs.tools.reader.sb.toString();
} else {
cljs.tools.reader.sb.append(ch);

var G__7083 = cljs.tools.reader.reader_types.read_char.call(null,rdr);
ch = G__7083;
continue;
}
break;
}
}
});
cljs.tools.reader.read_dispatch = (function cljs$tools$reader$read_dispatch(rdr,_,opts,pending_forms){
var temp__5718__auto__ = cljs.tools.reader.reader_types.read_char.call(null,rdr);
if(cljs.core.truth_(temp__5718__auto__)){
var ch = temp__5718__auto__;
var temp__5718__auto____$1 = cljs.tools.reader.dispatch_macros.call(null,ch);
if(cljs.core.truth_(temp__5718__auto____$1)){
var dm = temp__5718__auto____$1;
return dm.call(null,rdr,ch,opts,pending_forms);
} else {
return cljs.tools.reader.read_tagged.call(null,(function (){var G__7084 = rdr;
cljs.tools.reader.reader_types.unread.call(null,G__7084,ch);

return G__7084;
})(),ch,opts,pending_forms);
}
} else {
return cljs.tools.reader.impl.errors.throw_eof_at_dispatch.call(null,rdr);
}
});
cljs.tools.reader.read_unmatched_delimiter = (function cljs$tools$reader$read_unmatched_delimiter(rdr,ch,opts,pending_forms){
return cljs.tools.reader.impl.errors.throw_unmatch_delimiter.call(null,rdr,ch);
});
cljs.tools.reader.read_regex = (function cljs$tools$reader$read_regex(rdr,ch,opts,pending_forms){
var sb = (new goog.string.StringBuffer());
var ch__$1 = cljs.tools.reader.reader_types.read_char.call(null,rdr);
while(true){
if(("\"" === ch__$1)){
return cljs.core.re_pattern.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb));
} else {
if((ch__$1 == null)){
return cljs.tools.reader.impl.errors.throw_eof_reading.call(null,rdr,new cljs.core.Keyword(null,"regex","regex",939488856),sb);
} else {
sb.append(ch__$1);

if(("\\" === ch__$1)){
var ch_7085__$2 = cljs.tools.reader.reader_types.read_char.call(null,rdr);
if((ch_7085__$2 == null)){
cljs.tools.reader.impl.errors.throw_eof_reading.call(null,rdr,new cljs.core.Keyword(null,"regex","regex",939488856),sb);
} else {
}

sb.append(ch_7085__$2);
} else {
}

var G__7086 = cljs.tools.reader.reader_types.read_char.call(null,rdr);
ch__$1 = G__7086;
continue;
}
}
break;
}
});
cljs.tools.reader.read_unicode_char = (function cljs$tools$reader$read_unicode_char(var_args){
var G__7088 = arguments.length;
switch (G__7088) {
case 4:
return cljs.tools.reader.read_unicode_char.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.tools.reader.read_unicode_char.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.tools.reader.read_unicode_char.cljs$core$IFn$_invoke$arity$4 = (function (token,offset,length,base){
var l = (offset + length);
if((cljs.core.count.call(null,token) === l)){
} else {
cljs.tools.reader.impl.errors.throw_invalid_unicode_literal.call(null,null,token);
}

var i = offset;
var uc = (0);
while(true){
if((i === l)){
return String.fromCharCode(uc);
} else {
var d = cljs.tools.reader.impl.utils.char_code.call(null,cljs.core.nth.call(null,token,i),base);
if((d === (-1))){
return cljs.tools.reader.impl.errors.throw_invalid_unicode_digit_in_token.call(null,null,cljs.core.nth.call(null,token,i),token);
} else {
var G__7090 = (i + (1));
var G__7091 = (d + (uc * base));
i = G__7090;
uc = G__7091;
continue;
}
}
break;
}
}));

(cljs.tools.reader.read_unicode_char.cljs$core$IFn$_invoke$arity$5 = (function (rdr,initch,base,length,exact_QMARK_){
var i = (1);
var uc = cljs.tools.reader.impl.utils.char_code.call(null,initch,base);
while(true){
if((uc === (-1))){
return cljs.tools.reader.impl.errors.throw_invalid_unicode_digit.call(null,rdr,initch);
} else {
if((!((i === length)))){
var ch = cljs.tools.reader.reader_types.peek_char.call(null,rdr);
if(cljs.core.truth_((function (){var or__4185__auto__ = cljs.tools.reader.impl.utils.whitespace_QMARK_.call(null,ch);
if(or__4185__auto__){
return or__4185__auto__;
} else {
var or__4185__auto____$1 = cljs.tools.reader.macros.call(null,ch);
if(cljs.core.truth_(or__4185__auto____$1)){
return or__4185__auto____$1;
} else {
return (ch == null);
}
}
})())){
if(cljs.core.truth_(exact_QMARK_)){
return cljs.tools.reader.impl.errors.throw_invalid_unicode_len.call(null,rdr,i,length);
} else {
return String.fromCharCode(uc);
}
} else {
var d = cljs.tools.reader.impl.utils.char_code.call(null,ch,base);
cljs.tools.reader.reader_types.read_char.call(null,rdr);

if((d === (-1))){
return cljs.tools.reader.impl.errors.throw_invalid_unicode_digit.call(null,rdr,ch);
} else {
var G__7092 = (i + (1));
var G__7093 = (d + (uc * base));
i = G__7092;
uc = G__7093;
continue;
}
}
} else {
return String.fromCharCode(uc);
}
}
break;
}
}));

(cljs.tools.reader.read_unicode_char.cljs$lang$maxFixedArity = 5);

cljs.tools.reader.upper_limit = "\uD7FF".charCodeAt((0));
cljs.tools.reader.lower_limit = "\uE000".charCodeAt((0));
cljs.tools.reader.valid_octal_QMARK_ = (function cljs$tools$reader$valid_octal_QMARK_(token,base){
return (parseInt(token,base) <= (255));
});
/**
 * Read in a character literal
 */
cljs.tools.reader.read_char_STAR_ = (function cljs$tools$reader$read_char_STAR_(rdr,backslash,opts,pending_forms){
var ch = cljs.tools.reader.reader_types.read_char.call(null,rdr);
if((!((ch == null)))){
var token = ((((cljs.tools.reader.macro_terminating_QMARK_.call(null,ch)) || (cljs.tools.reader.impl.utils.whitespace_QMARK_.call(null,ch))))?cljs.core.str.cljs$core$IFn$_invoke$arity$1(ch):cljs.tools.reader.read_token.call(null,rdr,new cljs.core.Keyword(null,"character","character",380652989),ch));
var token_len = token.length;
if(((1) === token_len)){
return token.charAt((0));
} else {
if(cljs.core._EQ_.call(null,token,"newline")){
return "\n";
} else {
if(cljs.core._EQ_.call(null,token,"space")){
return " ";
} else {
if(cljs.core._EQ_.call(null,token,"tab")){
return "\t";
} else {
if(cljs.core._EQ_.call(null,token,"backspace")){
return "\b";
} else {
if(cljs.core._EQ_.call(null,token,"formfeed")){
return "\f";
} else {
if(cljs.core._EQ_.call(null,token,"return")){
return "\r";
} else {
if(goog.string.startsWith(token,"u")){
var c = cljs.tools.reader.read_unicode_char.call(null,token,(1),(4),(16));
var ic = c.charCodeAt((0));
if((((ic > cljs.tools.reader.upper_limit)) && ((ic < cljs.tools.reader.lower_limit)))){
return cljs.tools.reader.impl.errors.throw_invalid_character_literal.call(null,rdr,ic.toString((16)));
} else {
return c;
}
} else {
if(goog.string.startsWith(token,"o")){
var len = (token_len - (1));
if((len > (3))){
return cljs.tools.reader.impl.errors.throw_invalid_octal_len.call(null,rdr,token);
} else {
var offset = (1);
var base = (8);
var uc = cljs.tools.reader.read_unicode_char.call(null,token,offset,len,base);
if((!(cljs.tools.reader.valid_octal_QMARK_.call(null,cljs.core.subs.call(null,token,offset),base)))){
return cljs.tools.reader.impl.errors.throw_bad_octal_number.call(null,rdr);
} else {
return uc;
}
}
} else {
return cljs.tools.reader.impl.errors.throw_unsupported_character.call(null,rdr,token);

}
}
}
}
}
}
}
}
}
} else {
return cljs.tools.reader.impl.errors.throw_eof_in_character.call(null,rdr);
}
});
cljs.tools.reader.starting_line_col_info = (function cljs$tools$reader$starting_line_col_info(rdr){
if(cljs.tools.reader.reader_types.indexing_reader_QMARK_.call(null,rdr)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.tools.reader.reader_types.get_line_number.call(null,rdr),((cljs.tools.reader.reader_types.get_column_number.call(null,rdr) - (1)) | (0))], null);
} else {
return null;
}
});
cljs.tools.reader.ending_line_col_info = (function cljs$tools$reader$ending_line_col_info(rdr){
if(cljs.tools.reader.reader_types.indexing_reader_QMARK_.call(null,rdr)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.tools.reader.reader_types.get_line_number.call(null,rdr),cljs.tools.reader.reader_types.get_column_number.call(null,rdr)], null);
} else {
return null;
}
});
if((typeof cljs !== 'undefined') && (typeof cljs.tools !== 'undefined') && (typeof cljs.tools.reader !== 'undefined') && (typeof cljs.tools.reader.READ_EOF !== 'undefined')){
} else {
cljs.tools.reader.READ_EOF = (new Object());
}
if((typeof cljs !== 'undefined') && (typeof cljs.tools !== 'undefined') && (typeof cljs.tools.reader !== 'undefined') && (typeof cljs.tools.reader.READ_FINISHED !== 'undefined')){
} else {
cljs.tools.reader.READ_FINISHED = (new Object());
}
cljs.tools.reader._STAR_read_delim_STAR_ = false;
cljs.tools.reader.read_delimited_internal = (function cljs$tools$reader$read_delimited_internal(kind,delim,rdr,opts,pending_forms){
var vec__7094 = cljs.tools.reader.starting_line_col_info.call(null,rdr);
var start_line = cljs.core.nth.call(null,vec__7094,(0),null);
var start_column = cljs.core.nth.call(null,vec__7094,(1),null);
var delim__$1 = cljs.tools.reader.impl.utils.char$.call(null,delim);
var a = cljs.core.transient$.call(null,cljs.core.PersistentVector.EMPTY);
while(true){
var form = cljs.tools.reader.read_STAR_.call(null,rdr,false,cljs.tools.reader.READ_EOF,delim__$1,opts,pending_forms);
if((form === cljs.tools.reader.READ_FINISHED)){
return cljs.core.persistent_BANG_.call(null,a);
} else {
if((form === cljs.tools.reader.READ_EOF)){
return cljs.tools.reader.impl.errors.throw_eof_delimited.call(null,rdr,kind,start_line,start_column,cljs.core.count.call(null,a));
} else {
var G__7097 = cljs.core.conj_BANG_.call(null,a,form);
a = G__7097;
continue;
}
}
break;
}
});
/**
 * Reads and returns a collection ended with delim
 */
cljs.tools.reader.read_delimited = (function cljs$tools$reader$read_delimited(kind,delim,rdr,opts,pending_forms){
var _STAR_read_delim_STAR__orig_val__7098 = cljs.tools.reader._STAR_read_delim_STAR_;
var _STAR_read_delim_STAR__temp_val__7099 = true;
(cljs.tools.reader._STAR_read_delim_STAR_ = _STAR_read_delim_STAR__temp_val__7099);

try{return cljs.tools.reader.read_delimited_internal.call(null,kind,delim,rdr,opts,pending_forms);
}finally {(cljs.tools.reader._STAR_read_delim_STAR_ = _STAR_read_delim_STAR__orig_val__7098);
}});
/**
 * Read in a list, including its location if the reader is an indexing reader
 */
cljs.tools.reader.read_list = (function cljs$tools$reader$read_list(rdr,_,opts,pending_forms){
var vec__7100 = cljs.tools.reader.starting_line_col_info.call(null,rdr);
var start_line = cljs.core.nth.call(null,vec__7100,(0),null);
var start_column = cljs.core.nth.call(null,vec__7100,(1),null);
var the_list = cljs.tools.reader.read_delimited.call(null,new cljs.core.Keyword(null,"list","list",765357683),")",rdr,opts,pending_forms);
var vec__7103 = cljs.tools.reader.ending_line_col_info.call(null,rdr);
var end_line = cljs.core.nth.call(null,vec__7103,(0),null);
var end_column = cljs.core.nth.call(null,vec__7103,(1),null);
return cljs.core.with_meta.call(null,((cljs.core.empty_QMARK_.call(null,the_list))?cljs.core.List.EMPTY:cljs.core.apply.call(null,cljs.core.list,the_list)),(cljs.core.truth_(start_line)?cljs.core.merge.call(null,(function (){var temp__5720__auto__ = cljs.tools.reader.reader_types.get_file_name.call(null,rdr);
if(cljs.core.truth_(temp__5720__auto__)){
var file = temp__5720__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"file","file",-1269645878),file], null);
} else {
return null;
}
})(),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"line","line",212345235),start_line,new cljs.core.Keyword(null,"column","column",2078222095),start_column,new cljs.core.Keyword(null,"end-line","end-line",1837326455),end_line,new cljs.core.Keyword(null,"end-column","end-column",1425389514),end_column], null)):null));
});
/**
 * Read in a vector, including its location if the reader is an indexing reader
 */
cljs.tools.reader.read_vector = (function cljs$tools$reader$read_vector(rdr,_,opts,pending_forms){
var vec__7106 = cljs.tools.reader.starting_line_col_info.call(null,rdr);
var start_line = cljs.core.nth.call(null,vec__7106,(0),null);
var start_column = cljs.core.nth.call(null,vec__7106,(1),null);
var the_vector = cljs.tools.reader.read_delimited.call(null,new cljs.core.Keyword(null,"vector","vector",1902966158),"]",rdr,opts,pending_forms);
var vec__7109 = cljs.tools.reader.ending_line_col_info.call(null,rdr);
var end_line = cljs.core.nth.call(null,vec__7109,(0),null);
var end_column = cljs.core.nth.call(null,vec__7109,(1),null);
return cljs.core.with_meta.call(null,the_vector,(cljs.core.truth_(start_line)?cljs.core.merge.call(null,(function (){var temp__5720__auto__ = cljs.tools.reader.reader_types.get_file_name.call(null,rdr);
if(cljs.core.truth_(temp__5720__auto__)){
var file = temp__5720__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"file","file",-1269645878),file], null);
} else {
return null;
}
})(),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"line","line",212345235),start_line,new cljs.core.Keyword(null,"column","column",2078222095),start_column,new cljs.core.Keyword(null,"end-line","end-line",1837326455),end_line,new cljs.core.Keyword(null,"end-column","end-column",1425389514),end_column], null)):null));
});
/**
 * Read in a map, including its location if the reader is an indexing reader
 */
cljs.tools.reader.read_map = (function cljs$tools$reader$read_map(rdr,_,opts,pending_forms){
var vec__7112 = cljs.tools.reader.starting_line_col_info.call(null,rdr);
var start_line = cljs.core.nth.call(null,vec__7112,(0),null);
var start_column = cljs.core.nth.call(null,vec__7112,(1),null);
var the_map = cljs.tools.reader.read_delimited.call(null,new cljs.core.Keyword(null,"map","map",1371690461),"}",rdr,opts,pending_forms);
var map_count = cljs.core.count.call(null,the_map);
var ks = cljs.core.take_nth.call(null,(2),the_map);
var key_set = cljs.core.set.call(null,ks);
var vec__7115 = cljs.tools.reader.ending_line_col_info.call(null,rdr);
var end_line = cljs.core.nth.call(null,vec__7115,(0),null);
var end_column = cljs.core.nth.call(null,vec__7115,(1),null);
if(cljs.core.odd_QMARK_.call(null,map_count)){
cljs.tools.reader.impl.errors.throw_odd_map.call(null,rdr,start_line,start_column,the_map);
} else {
}

if(cljs.core._EQ_.call(null,cljs.core.count.call(null,key_set),cljs.core.count.call(null,ks))){
} else {
cljs.tools.reader.impl.errors.throw_dup_keys.call(null,rdr,new cljs.core.Keyword(null,"map","map",1371690461),ks);
}

return cljs.core.with_meta.call(null,(((map_count <= ((2) * cljs.core.PersistentArrayMap.HASHMAP_THRESHOLD)))?cljs.core.PersistentArrayMap.fromArray(cljs.core.to_array.call(null,the_map),true,true):cljs.core.PersistentHashMap.fromArray(cljs.core.to_array.call(null,the_map),true)),(cljs.core.truth_(start_line)?cljs.core.merge.call(null,(function (){var temp__5720__auto__ = cljs.tools.reader.reader_types.get_file_name.call(null,rdr);
if(cljs.core.truth_(temp__5720__auto__)){
var file = temp__5720__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"file","file",-1269645878),file], null);
} else {
return null;
}
})(),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"line","line",212345235),start_line,new cljs.core.Keyword(null,"column","column",2078222095),start_column,new cljs.core.Keyword(null,"end-line","end-line",1837326455),end_line,new cljs.core.Keyword(null,"end-column","end-column",1425389514),end_column], null)):null));
});
cljs.tools.reader.read_number = (function cljs$tools$reader$read_number(rdr,initch){
var sb = (function (){var G__7118 = (new goog.string.StringBuffer());
G__7118.append(initch);

return G__7118;
})();
var ch = cljs.tools.reader.reader_types.read_char.call(null,rdr);
while(true){
if(cljs.core.truth_((function (){var or__4185__auto__ = cljs.tools.reader.impl.utils.whitespace_QMARK_.call(null,ch);
if(or__4185__auto__){
return or__4185__auto__;
} else {
var or__4185__auto____$1 = cljs.tools.reader.macros.call(null,ch);
if(cljs.core.truth_(or__4185__auto____$1)){
return or__4185__auto____$1;
} else {
return (ch == null);
}
}
})())){
var s = cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb);
cljs.tools.reader.reader_types.unread.call(null,rdr,ch);

var or__4185__auto__ = cljs.tools.reader.impl.commons.match_number.call(null,s);
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return cljs.tools.reader.impl.errors.throw_invalid_number.call(null,rdr,s);
}
} else {
var G__7120 = (function (){var G__7119 = sb;
G__7119.append(ch);

return G__7119;
})();
var G__7121 = cljs.tools.reader.reader_types.read_char.call(null,rdr);
sb = G__7120;
ch = G__7121;
continue;
}
break;
}
});
cljs.tools.reader.escape_char = (function cljs$tools$reader$escape_char(sb,rdr){
var ch = cljs.tools.reader.reader_types.read_char.call(null,rdr);
var G__7122 = ch;
switch (G__7122) {
case "t":
return "\t";

break;
case "r":
return "\r";

break;
case "n":
return "\n";

break;
case "\\":
return "\\";

break;
case "\"":
return "\"";

break;
case "b":
return "\b";

break;
case "f":
return "\f";

break;
case "u":
var ch__$1 = cljs.tools.reader.reader_types.read_char.call(null,rdr);
if(((-1) === parseInt((ch__$1 | (0)),(16)))){
return cljs.tools.reader.impl.errors.throw_invalid_unicode_escape.call(null,rdr,ch__$1);
} else {
return cljs.tools.reader.read_unicode_char.call(null,rdr,ch__$1,(16),(4),true);
}

break;
default:
if(cljs.tools.reader.impl.utils.numeric_QMARK_.call(null,ch)){
var ch__$1 = cljs.tools.reader.read_unicode_char.call(null,rdr,ch,(8),(3),false);
if(((ch__$1 | (0)) > (255))){
return cljs.tools.reader.impl.errors.throw_bad_octal_number.call(null,rdr);
} else {
return ch__$1;
}
} else {
return cljs.tools.reader.impl.errors.throw_bad_escape_char.call(null,rdr,ch);
}

}
});
cljs.tools.reader.read_string_STAR_ = (function cljs$tools$reader$read_string_STAR_(reader,_,opts,pending_forms){
var sb = (new goog.string.StringBuffer());
var ch = cljs.tools.reader.reader_types.read_char.call(null,reader);
while(true){
if((ch == null)){
return cljs.tools.reader.impl.errors.throw_eof_reading.call(null,reader,new cljs.core.Keyword(null,"string","string",-1989541586),"\"",sb);
} else {
var G__7124 = ch;
switch (G__7124) {
case "\\":
var G__7128 = (function (){var G__7125 = sb;
G__7125.append(cljs.tools.reader.escape_char.call(null,sb,reader));

return G__7125;
})();
var G__7129 = cljs.tools.reader.reader_types.read_char.call(null,reader);
sb = G__7128;
ch = G__7129;
continue;

break;
case "\"":
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb);

break;
default:
var G__7130 = (function (){var G__7126 = sb;
G__7126.append(ch);

return G__7126;
})();
var G__7131 = cljs.tools.reader.reader_types.read_char.call(null,reader);
sb = G__7130;
ch = G__7131;
continue;

}
}
break;
}
});
cljs.tools.reader.loc_info = (function cljs$tools$reader$loc_info(rdr,line,column){
if((line == null)){
return null;
} else {
var file = cljs.tools.reader.reader_types.get_file_name.call(null,rdr);
var filem = (((file == null))?null:new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"file","file",-1269645878),file], null));
var vec__7132 = cljs.tools.reader.ending_line_col_info.call(null,rdr);
var end_line = cljs.core.nth.call(null,vec__7132,(0),null);
var end_column = cljs.core.nth.call(null,vec__7132,(1),null);
var lcm = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"line","line",212345235),line,new cljs.core.Keyword(null,"column","column",2078222095),column,new cljs.core.Keyword(null,"end-line","end-line",1837326455),end_line,new cljs.core.Keyword(null,"end-column","end-column",1425389514),end_column], null);
return cljs.core.merge.call(null,filem,lcm);
}
});
cljs.tools.reader.read_symbol = (function cljs$tools$reader$read_symbol(rdr,initch){
var vec__7135 = cljs.tools.reader.starting_line_col_info.call(null,rdr);
var line = cljs.core.nth.call(null,vec__7135,(0),null);
var column = cljs.core.nth.call(null,vec__7135,(1),null);
var token = cljs.tools.reader.read_token.call(null,rdr,new cljs.core.Keyword(null,"symbol","symbol",-1038572696),initch);
if((token == null)){
return null;
} else {
var G__7138 = token;
switch (G__7138) {
case "nil":
return null;

break;
case "true":
return true;

break;
case "false":
return false;

break;
case "/":
return new cljs.core.Symbol(null,"/","/",-1371932971,null);

break;
default:
var p = cljs.tools.reader.impl.commons.parse_symbol.call(null,token);
if((!((p == null)))){
var sym = cljs.core.symbol.call(null,cljs.core._nth.call(null,p,(0)),cljs.core._nth.call(null,p,(1)));
return cljs.core._with_meta.call(null,sym,cljs.tools.reader.loc_info.call(null,rdr,line,column));
} else {
return cljs.tools.reader.impl.errors.throw_invalid.call(null,rdr,new cljs.core.Keyword(null,"symbol","symbol",-1038572696),token);
}

}
}
});
/**
 * Map from ns alias to ns, if non-nil, it will be used to resolve read-time
 * ns aliases.
 * 
 * Defaults to nil
 */
cljs.tools.reader._STAR_alias_map_STAR_ = null;
cljs.tools.reader.resolve_alias = (function cljs$tools$reader$resolve_alias(sym){
return cljs.core.get.call(null,cljs.tools.reader._STAR_alias_map_STAR_,sym);
});
cljs.tools.reader.resolve_ns = (function cljs$tools$reader$resolve_ns(sym){
var or__4185__auto__ = cljs.tools.reader.resolve_alias.call(null,sym);
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
var temp__5720__auto__ = cljs.core.find_ns.call(null,sym);
if(cljs.core.truth_(temp__5720__auto__)){
var ns = temp__5720__auto__;
return cljs.core.symbol.call(null,cljs.core.ns_name.call(null,ns));
} else {
return null;
}
}
});
cljs.tools.reader.read_keyword = (function cljs$tools$reader$read_keyword(reader,initch,opts,pending_forms){
var ch = cljs.tools.reader.reader_types.read_char.call(null,reader);
if((!(cljs.tools.reader.impl.utils.whitespace_QMARK_.call(null,ch)))){
var token = cljs.tools.reader.read_token.call(null,reader,new cljs.core.Keyword(null,"keyword","keyword",811389747),ch);
var s = cljs.tools.reader.impl.commons.parse_symbol.call(null,token);
if((!((s == null)))){
var ns = cljs.core._nth.call(null,s,(0));
var name = cljs.core._nth.call(null,s,(1));
if((":" === token.charAt((0)))){
if((!((ns == null)))){
var temp__5718__auto__ = cljs.tools.reader.resolve_alias.call(null,cljs.core.symbol.call(null,cljs.core.subs.call(null,ns,(1))));
if(cljs.core.truth_(temp__5718__auto__)){
var ns__$1 = temp__5718__auto__;
return cljs.core.keyword.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns__$1),name);
} else {
return cljs.tools.reader.impl.errors.throw_invalid.call(null,reader,new cljs.core.Keyword(null,"keyword","keyword",811389747),[":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(token)].join(''));
}
} else {
var temp__5718__auto__ = cljs.core._STAR_ns_STAR_;
if(cljs.core.truth_(temp__5718__auto__)){
var ns__$1 = temp__5718__auto__;
return cljs.core.keyword.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns__$1),cljs.core.subs.call(null,name,(1)));
} else {
return cljs.tools.reader.impl.errors.reader_error.call(null,reader,"Invalid token: :",token);
}
}
} else {
return cljs.core.keyword.call(null,ns,name);
}
} else {
return cljs.tools.reader.impl.errors.throw_invalid.call(null,reader,new cljs.core.Keyword(null,"keyword","keyword",811389747),[":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(token)].join(''));
}
} else {
return cljs.tools.reader.impl.errors.throw_single_colon.call(null,reader);
}
});
/**
 * Returns a function which wraps a reader in a call to sym
 */
cljs.tools.reader.wrapping_reader = (function cljs$tools$reader$wrapping_reader(sym){
return (function (rdr,_,opts,pending_forms){
return (new cljs.core.List(null,sym,(new cljs.core.List(null,cljs.tools.reader.read_STAR_.call(null,rdr,true,null,opts,pending_forms),null,(1),null)),(2),null));
});
});
/**
 * Read metadata and return the following object with the metadata applied
 */
cljs.tools.reader.read_meta = (function cljs$tools$reader$read_meta(rdr,_,opts,pending_forms){
if(((cljs.tools.reader.reader_types.source_logging_reader_QMARK_.call(null,rdr)) && ((!(cljs.tools.reader.impl.utils.whitespace_QMARK_.call(null,cljs.tools.reader.reader_types.peek_char.call(null,rdr))))))){
return cljs.tools.reader.reader_types.log_source_STAR_.call(null,rdr,(function (){
var vec__7140 = cljs.tools.reader.starting_line_col_info.call(null,rdr);
var line = cljs.core.nth.call(null,vec__7140,(0),null);
var column = cljs.core.nth.call(null,vec__7140,(1),null);
var m = cljs.tools.reader.impl.utils.desugar_meta.call(null,cljs.tools.reader.read_STAR_.call(null,rdr,true,null,opts,pending_forms));
if(cljs.core.map_QMARK_.call(null,m)){
} else {
cljs.tools.reader.impl.errors.throw_bad_metadata.call(null,rdr,m);
}

var o = cljs.tools.reader.read_STAR_.call(null,rdr,true,null,opts,pending_forms);
if((((!((o == null))))?(((((o.cljs$lang$protocol_mask$partition0$ & (131072))) || ((cljs.core.PROTOCOL_SENTINEL === o.cljs$core$IMeta$))))?true:false):false)){
var m__$1 = (cljs.core.truth_((function (){var and__4174__auto__ = line;
if(cljs.core.truth_(and__4174__auto__)){
return cljs.core.seq_QMARK_.call(null,o);
} else {
return and__4174__auto__;
}
})())?cljs.core.assoc.call(null,m,new cljs.core.Keyword(null,"line","line",212345235),line,new cljs.core.Keyword(null,"column","column",2078222095),column):m);
if((((!((o == null))))?(((((o.cljs$lang$protocol_mask$partition0$ & (262144))) || ((cljs.core.PROTOCOL_SENTINEL === o.cljs$core$IWithMeta$))))?true:false):false)){
return cljs.core.with_meta.call(null,o,cljs.core.merge.call(null,cljs.core.meta.call(null,o),m__$1));
} else {
return cljs.core.reset_meta_BANG_.call(null,o,m__$1);
}
} else {
return cljs.tools.reader.impl.errors.throw_bad_metadata_target.call(null,rdr,o);
}
}));
} else {
var vec__7145 = cljs.tools.reader.starting_line_col_info.call(null,rdr);
var line = cljs.core.nth.call(null,vec__7145,(0),null);
var column = cljs.core.nth.call(null,vec__7145,(1),null);
var m = cljs.tools.reader.impl.utils.desugar_meta.call(null,cljs.tools.reader.read_STAR_.call(null,rdr,true,null,opts,pending_forms));
if(cljs.core.map_QMARK_.call(null,m)){
} else {
cljs.tools.reader.impl.errors.throw_bad_metadata.call(null,rdr,m);
}

var o = cljs.tools.reader.read_STAR_.call(null,rdr,true,null,opts,pending_forms);
if((((!((o == null))))?(((((o.cljs$lang$protocol_mask$partition0$ & (131072))) || ((cljs.core.PROTOCOL_SENTINEL === o.cljs$core$IMeta$))))?true:false):false)){
var m__$1 = (cljs.core.truth_((function (){var and__4174__auto__ = line;
if(cljs.core.truth_(and__4174__auto__)){
return cljs.core.seq_QMARK_.call(null,o);
} else {
return and__4174__auto__;
}
})())?cljs.core.assoc.call(null,m,new cljs.core.Keyword(null,"line","line",212345235),line,new cljs.core.Keyword(null,"column","column",2078222095),column):m);
if((((!((o == null))))?(((((o.cljs$lang$protocol_mask$partition0$ & (262144))) || ((cljs.core.PROTOCOL_SENTINEL === o.cljs$core$IWithMeta$))))?true:false):false)){
return cljs.core.with_meta.call(null,o,cljs.core.merge.call(null,cljs.core.meta.call(null,o),m__$1));
} else {
return cljs.core.reset_meta_BANG_.call(null,o,m__$1);
}
} else {
return cljs.tools.reader.impl.errors.throw_bad_metadata_target.call(null,rdr,o);
}
}
});
cljs.tools.reader.read_set = (function cljs$tools$reader$read_set(rdr,_,opts,pending_forms){
var vec__7150 = cljs.tools.reader.starting_line_col_info.call(null,rdr);
var start_line = cljs.core.nth.call(null,vec__7150,(0),null);
var start_column = cljs.core.nth.call(null,vec__7150,(1),null);
var start_column__$1 = (cljs.core.truth_(start_column)?((start_column - (1)) | (0)):null);
var coll = cljs.tools.reader.read_delimited.call(null,new cljs.core.Keyword(null,"set","set",304602554),"}",rdr,opts,pending_forms);
var the_set = cljs.core.set.call(null,coll);
var vec__7153 = cljs.tools.reader.ending_line_col_info.call(null,rdr);
var end_line = cljs.core.nth.call(null,vec__7153,(0),null);
var end_column = cljs.core.nth.call(null,vec__7153,(1),null);
if(cljs.core._EQ_.call(null,cljs.core.count.call(null,coll),cljs.core.count.call(null,the_set))){
} else {
cljs.tools.reader.impl.errors.reader_error.call(null,rdr,cljs.tools.reader.impl.errors.throw_dup_keys.call(null,rdr,new cljs.core.Keyword(null,"set","set",304602554),coll));
}

return cljs.core.with_meta.call(null,the_set,(cljs.core.truth_(start_line)?cljs.core.merge.call(null,(function (){var temp__5720__auto__ = cljs.tools.reader.reader_types.get_file_name.call(null,rdr);
if(cljs.core.truth_(temp__5720__auto__)){
var file = temp__5720__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"file","file",-1269645878),file], null);
} else {
return null;
}
})(),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"line","line",212345235),start_line,new cljs.core.Keyword(null,"column","column",2078222095),start_column__$1,new cljs.core.Keyword(null,"end-line","end-line",1837326455),end_line,new cljs.core.Keyword(null,"end-column","end-column",1425389514),end_column], null)):null));
});
/**
 * Read and discard the first object from rdr
 */
cljs.tools.reader.read_discard = (function cljs$tools$reader$read_discard(rdr,_,opts,pending_forms){
var G__7156 = rdr;
cljs.tools.reader.read_STAR_.call(null,G__7156,true,null,opts,pending_forms);

return G__7156;
});
cljs.tools.reader.read_symbolic_value = (function cljs$tools$reader$read_symbolic_value(rdr,_,opts,pending_forms){
var sym = cljs.tools.reader.read_STAR_.call(null,rdr,true,null,opts,pending_forms);
var G__7157 = sym;
if(cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"NaN","NaN",666918153,null),G__7157)){
return Number.NaN;
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"-Inf","-Inf",-2123243689,null),G__7157)){
return Number.NEGATIVE_INFINITY;
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"Inf","Inf",647172781,null),G__7157)){
return Number.POSITIVE_INFINITY;
} else {
return cljs.tools.reader.impl.errors.reader_error.call(null,rdr,["Invalid token: ##",cljs.core.str.cljs$core$IFn$_invoke$arity$1(sym)].join(''));

}
}
}
});
cljs.tools.reader.RESERVED_FEATURES = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"else","else",-1508377146),null,new cljs.core.Keyword(null,"none","none",1333468478),null], null), null);
cljs.tools.reader.has_feature_QMARK_ = (function cljs$tools$reader$has_feature_QMARK_(rdr,feature,opts){
if((feature instanceof cljs.core.Keyword)){
return ((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"default","default",-1987822328),feature)) || (cljs.core.contains_QMARK_.call(null,cljs.core.get.call(null,opts,new cljs.core.Keyword(null,"features","features",-1146962336)),feature)));
} else {
return cljs.tools.reader.impl.errors.reader_error.call(null,rdr,"Feature should be a keyword: ",feature);
}
});
cljs.tools.reader.check_eof_error = (function cljs$tools$reader$check_eof_error(form,rdr,first_line){
if((form === cljs.tools.reader.READ_EOF)){
return cljs.tools.reader.impl.errors.throw_eof_error.call(null,rdr,(((first_line < (0)))?first_line:false));
} else {
return null;
}
});
cljs.tools.reader.check_reserved_features = (function cljs$tools$reader$check_reserved_features(rdr,form){
if(cljs.core.truth_(cljs.core.get.call(null,cljs.tools.reader.RESERVED_FEATURES,form))){
return cljs.tools.reader.impl.errors.reader_error.call(null,rdr,"Feature name ",form," is reserved");
} else {
return null;
}
});
cljs.tools.reader.check_invalid_read_cond = (function cljs$tools$reader$check_invalid_read_cond(form,rdr,first_line){
if((form === cljs.tools.reader.READ_FINISHED)){
if((first_line < (0))){
return cljs.tools.reader.impl.errors.reader_error.call(null,rdr,"read-cond requires an even number of forms");
} else {
return cljs.tools.reader.impl.errors.reader_error.call(null,rdr,"read-cond starting on line ",first_line," requires an even number of forms");
}
} else {
return null;
}
});
/**
 * Read next form and suppress. Return nil or READ_FINISHED.
 */
cljs.tools.reader.read_suppress = (function cljs$tools$reader$read_suppress(first_line,rdr,opts,pending_forms){
var _STAR_suppress_read_STAR__orig_val__7158 = cljs.tools.reader._STAR_suppress_read_STAR_;
var _STAR_suppress_read_STAR__temp_val__7159 = true;
(cljs.tools.reader._STAR_suppress_read_STAR_ = _STAR_suppress_read_STAR__temp_val__7159);

try{var form = cljs.tools.reader.read_STAR_.call(null,rdr,false,cljs.tools.reader.READ_EOF,")",opts,pending_forms);
cljs.tools.reader.check_eof_error.call(null,form,rdr,first_line);

if((form === cljs.tools.reader.READ_FINISHED)){
return cljs.tools.reader.READ_FINISHED;
} else {
return null;
}
}finally {(cljs.tools.reader._STAR_suppress_read_STAR_ = _STAR_suppress_read_STAR__orig_val__7158);
}});
if((typeof cljs !== 'undefined') && (typeof cljs.tools !== 'undefined') && (typeof cljs.tools.reader !== 'undefined') && (typeof cljs.tools.reader.NO_MATCH !== 'undefined')){
} else {
cljs.tools.reader.NO_MATCH = (new Object());
}
/**
 * Read next feature. If matched, read next form and return.
 * Otherwise, read and skip next form, returning READ_FINISHED or nil.
 */
cljs.tools.reader.match_feature = (function cljs$tools$reader$match_feature(first_line,rdr,opts,pending_forms){
var feature = cljs.tools.reader.read_STAR_.call(null,rdr,false,cljs.tools.reader.READ_EOF,")",opts,pending_forms);
cljs.tools.reader.check_eof_error.call(null,feature,rdr,first_line);

if(cljs.core._EQ_.call(null,feature,cljs.tools.reader.READ_FINISHED)){
return cljs.tools.reader.READ_FINISHED;
} else {
cljs.tools.reader.check_reserved_features.call(null,rdr,feature);

if(cljs.tools.reader.has_feature_QMARK_.call(null,rdr,feature,opts)){
var G__7160 = cljs.tools.reader.read_STAR_.call(null,rdr,false,cljs.tools.reader.READ_EOF,")",opts,pending_forms);
cljs.tools.reader.check_eof_error.call(null,G__7160,rdr,first_line);

cljs.tools.reader.check_invalid_read_cond.call(null,G__7160,rdr,first_line);

return G__7160;
} else {
var or__4185__auto__ = cljs.tools.reader.read_suppress.call(null,first_line,rdr,opts,pending_forms);
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return cljs.tools.reader.NO_MATCH;
}
}
}
});
cljs.tools.reader.read_cond_delimited = (function cljs$tools$reader$read_cond_delimited(rdr,splicing,opts,pending_forms){
var first_line = ((cljs.tools.reader.reader_types.indexing_reader_QMARK_.call(null,rdr))?cljs.tools.reader.reader_types.get_line_number.call(null,rdr):(-1));
var result = (function (){var matched = cljs.tools.reader.NO_MATCH;
var finished = null;
while(true){
if((matched === cljs.tools.reader.NO_MATCH)){
var match = cljs.tools.reader.match_feature.call(null,first_line,rdr,opts,pending_forms);
if((match === cljs.tools.reader.READ_FINISHED)){
return cljs.tools.reader.READ_FINISHED;
} else {
var G__7162 = match;
var G__7163 = null;
matched = G__7162;
finished = G__7163;
continue;
}
} else {
if((!((finished === cljs.tools.reader.READ_FINISHED)))){
var G__7164 = matched;
var G__7165 = cljs.tools.reader.read_suppress.call(null,first_line,rdr,opts,pending_forms);
matched = G__7164;
finished = G__7165;
continue;
} else {
return matched;

}
}
break;
}
})();
if((result === cljs.tools.reader.READ_FINISHED)){
return rdr;
} else {
if(cljs.core.truth_(splicing)){
if((((!((result == null))))?(((((result.cljs$lang$protocol_mask$partition0$ & (16777216))) || ((cljs.core.PROTOCOL_SENTINEL === result.cljs$core$ISequential$))))?true:false):false)){
goog.array.insertArrayAt(pending_forms,cljs.core.to_array.call(null,result),(0));

return rdr;
} else {
return cljs.tools.reader.impl.errors.reader_error.call(null,rdr,"Spliced form list in read-cond-splicing must implement ISequential");
}
} else {
return result;
}
}
});
cljs.tools.reader.read_cond = (function cljs$tools$reader$read_cond(rdr,_,opts,pending_forms){
if(cljs.core.not.call(null,(function (){var and__4174__auto__ = opts;
if(cljs.core.truth_(and__4174__auto__)){
return new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"preserve","preserve",1276846509),null,new cljs.core.Keyword(null,"allow","allow",-1857325745),null], null), null).call(null,new cljs.core.Keyword(null,"read-cond","read-cond",1056899244).cljs$core$IFn$_invoke$arity$1(opts));
} else {
return and__4174__auto__;
}
})())){
throw cljs.core.ex_info.call(null,"Conditional read not allowed",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"runtime-exception","runtime-exception",-1495664514)], null));
} else {
}

var temp__5718__auto__ = cljs.tools.reader.reader_types.read_char.call(null,rdr);
if(cljs.core.truth_(temp__5718__auto__)){
var ch = temp__5718__auto__;
var splicing = cljs.core._EQ_.call(null,ch,"@");
var ch__$1 = ((splicing)?cljs.tools.reader.reader_types.read_char.call(null,rdr):ch);
if(splicing){
if(cljs.core.truth_(cljs.tools.reader._STAR_read_delim_STAR_)){
} else {
cljs.tools.reader.impl.errors.reader_error.call(null,rdr,"cond-splice not in list");
}
} else {
}

var temp__5718__auto____$1 = ((cljs.tools.reader.impl.utils.whitespace_QMARK_.call(null,ch__$1))?cljs.tools.reader.impl.commons.read_past.call(null,cljs.tools.reader.impl.utils.whitespace_QMARK_,rdr):ch__$1);
if(cljs.core.truth_(temp__5718__auto____$1)){
var ch__$2 = temp__5718__auto____$1;
if(cljs.core.not_EQ_.call(null,ch__$2,"(")){
throw cljs.core.ex_info.call(null,"read-cond body must be a list",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"runtime-exception","runtime-exception",-1495664514)], null));
} else {
var _STAR_suppress_read_STAR__orig_val__7166 = cljs.tools.reader._STAR_suppress_read_STAR_;
var _STAR_suppress_read_STAR__temp_val__7167 = (function (){var or__4185__auto__ = cljs.tools.reader._STAR_suppress_read_STAR_;
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"preserve","preserve",1276846509),new cljs.core.Keyword(null,"read-cond","read-cond",1056899244).cljs$core$IFn$_invoke$arity$1(opts));
}
})();
(cljs.tools.reader._STAR_suppress_read_STAR_ = _STAR_suppress_read_STAR__temp_val__7167);

try{if(cljs.core.truth_(cljs.tools.reader._STAR_suppress_read_STAR_)){
return cljs.tools.reader.impl.utils.reader_conditional.call(null,cljs.tools.reader.read_list.call(null,rdr,ch__$2,opts,pending_forms),splicing);
} else {
return cljs.tools.reader.read_cond_delimited.call(null,rdr,splicing,opts,pending_forms);
}
}finally {(cljs.tools.reader._STAR_suppress_read_STAR_ = _STAR_suppress_read_STAR__orig_val__7166);
}}
} else {
return cljs.tools.reader.impl.errors.throw_eof_in_character.call(null,rdr);
}
} else {
return cljs.tools.reader.impl.errors.throw_eof_in_character.call(null,rdr);
}
});
cljs.tools.reader.arg_env = null;
/**
 * Get a symbol for an anonymous ?argument?
 */
cljs.tools.reader.garg = (function cljs$tools$reader$garg(n){
return cljs.core.symbol.call(null,[((((-1) === n))?"rest":["p",cljs.core.str.cljs$core$IFn$_invoke$arity$1(n)].join('')),"__",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.tools.reader.impl.utils.next_id.call(null)),"#"].join(''));
});
cljs.tools.reader.read_fn = (function cljs$tools$reader$read_fn(rdr,_,opts,pending_forms){
if(cljs.core.truth_(cljs.tools.reader.arg_env)){
throw cljs.core.ex_info.call(null,"Nested #()s are not allowed",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"illegal-state","illegal-state",-1519851182)], null));
} else {
}

var arg_env_orig_val__7168 = cljs.tools.reader.arg_env;
var arg_env_temp_val__7169 = cljs.core.sorted_map.call(null);
(cljs.tools.reader.arg_env = arg_env_temp_val__7169);

try{var form = cljs.tools.reader.read_STAR_.call(null,(function (){var G__7170 = rdr;
cljs.tools.reader.reader_types.unread.call(null,G__7170,"(");

return G__7170;
})(),true,null,opts,pending_forms);
var rargs = cljs.core.rseq.call(null,cljs.tools.reader.arg_env);
var args = ((rargs)?(function (){var higharg = cljs.core.key.call(null,cljs.core.first.call(null,rargs));
var args = (function (){var i = (1);
var args = cljs.core.transient$.call(null,cljs.core.PersistentVector.EMPTY);
while(true){
if((i > higharg)){
return cljs.core.persistent_BANG_.call(null,args);
} else {
var G__7171 = (i + (1));
var G__7172 = cljs.core.conj_BANG_.call(null,args,(function (){var or__4185__auto__ = cljs.core.get.call(null,cljs.tools.reader.arg_env,i);
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return cljs.tools.reader.garg.call(null,i);
}
})());
i = G__7171;
args = G__7172;
continue;
}
break;
}
})();
var args__$1 = (cljs.core.truth_(cljs.tools.reader.arg_env.call(null,(-1)))?cljs.core.conj.call(null,args,new cljs.core.Symbol(null,"&","&",-2144855648,null),cljs.tools.reader.arg_env.call(null,(-1))):args);
return args__$1;
})():cljs.core.PersistentVector.EMPTY);
return (new cljs.core.List(null,new cljs.core.Symbol(null,"fn*","fn*",-752876845,null),(new cljs.core.List(null,args,(new cljs.core.List(null,form,null,(1),null)),(2),null)),(3),null));
}finally {(cljs.tools.reader.arg_env = arg_env_orig_val__7168);
}});
/**
 * Registers an argument to the arg-env
 */
cljs.tools.reader.register_arg = (function cljs$tools$reader$register_arg(n){
if(cljs.core.truth_(cljs.tools.reader.arg_env)){
var temp__5718__auto__ = cljs.tools.reader.arg_env.call(null,n);
if(cljs.core.truth_(temp__5718__auto__)){
var ret = temp__5718__auto__;
return ret;
} else {
var g = cljs.tools.reader.garg.call(null,n);
(cljs.tools.reader.arg_env = cljs.core.assoc.call(null,cljs.tools.reader.arg_env,n,g));

return g;
}
} else {
throw cljs.core.ex_info.call(null,"Arg literal not in #()",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"illegal-state","illegal-state",-1519851182)], null));
}
});
cljs.tools.reader.read_arg = (function cljs$tools$reader$read_arg(rdr,pct,opts,pending_forms){
if((cljs.tools.reader.arg_env == null)){
return cljs.tools.reader.read_symbol.call(null,rdr,pct);
} else {
var ch = cljs.tools.reader.reader_types.peek_char.call(null,rdr);
if(((cljs.tools.reader.impl.utils.whitespace_QMARK_.call(null,ch)) || (cljs.tools.reader.macro_terminating_QMARK_.call(null,ch)) || ((ch == null)))){
return cljs.tools.reader.register_arg.call(null,(1));
} else {
if(cljs.core._EQ_.call(null,ch,"&")){
cljs.tools.reader.reader_types.read_char.call(null,rdr);

return cljs.tools.reader.register_arg.call(null,(-1));
} else {
var n = cljs.tools.reader.read_STAR_.call(null,rdr,true,null,opts,pending_forms);
if((!(cljs.core.integer_QMARK_.call(null,n)))){
throw cljs.core.ex_info.call(null,"Arg literal must be %, %& or %integer",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"illegal-state","illegal-state",-1519851182)], null));
} else {
return cljs.tools.reader.register_arg.call(null,n);
}

}
}
}
});
cljs.tools.reader.gensym_env = null;
cljs.tools.reader.read_unquote = (function cljs$tools$reader$read_unquote(rdr,comma,opts,pending_forms){
var temp__5718__auto__ = cljs.tools.reader.reader_types.peek_char.call(null,rdr);
if(cljs.core.truth_(temp__5718__auto__)){
var ch = temp__5718__auto__;
if(cljs.core._EQ_.call(null,"@",ch)){
return cljs.tools.reader.wrapping_reader.call(null,new cljs.core.Symbol("clojure.core","unquote-splicing","clojure.core/unquote-splicing",-552003150,null)).call(null,(function (){var G__7173 = rdr;
cljs.tools.reader.reader_types.read_char.call(null,G__7173);

return G__7173;
})(),"@",opts,pending_forms);
} else {
return cljs.tools.reader.wrapping_reader.call(null,new cljs.core.Symbol("clojure.core","unquote","clojure.core/unquote",843087510,null)).call(null,rdr,"~",opts,pending_forms);
}
} else {
return null;
}
});
cljs.tools.reader.unquote_splicing_QMARK_ = (function cljs$tools$reader$unquote_splicing_QMARK_(form){
return ((cljs.core.seq_QMARK_.call(null,form)) && (cljs.core._EQ_.call(null,cljs.core.first.call(null,form),new cljs.core.Symbol("clojure.core","unquote-splicing","clojure.core/unquote-splicing",-552003150,null))));
});
cljs.tools.reader.unquote_QMARK_ = (function cljs$tools$reader$unquote_QMARK_(form){
return ((cljs.core.seq_QMARK_.call(null,form)) && (cljs.core._EQ_.call(null,cljs.core.first.call(null,form),new cljs.core.Symbol("clojure.core","unquote","clojure.core/unquote",843087510,null))));
});
/**
 * Expand a list by resolving its syntax quotes and unquotes
 */
cljs.tools.reader.expand_list = (function cljs$tools$reader$expand_list(s){
var s__$1 = cljs.core.seq.call(null,s);
var r = cljs.core.transient$.call(null,cljs.core.PersistentVector.EMPTY);
while(true){
if(s__$1){
var item = cljs.core.first.call(null,s__$1);
var ret = cljs.core.conj_BANG_.call(null,r,((cljs.tools.reader.unquote_QMARK_.call(null,item))?(new cljs.core.List(null,new cljs.core.Symbol("clojure.core","list","clojure.core/list",-1119203325,null),(new cljs.core.List(null,cljs.core.second.call(null,item),null,(1),null)),(2),null)):((cljs.tools.reader.unquote_splicing_QMARK_.call(null,item))?cljs.core.second.call(null,item):(new cljs.core.List(null,new cljs.core.Symbol("clojure.core","list","clojure.core/list",-1119203325,null),(new cljs.core.List(null,cljs.tools.reader.syntax_quote_STAR_.call(null,item),null,(1),null)),(2),null))
)));
var G__7174 = cljs.core.next.call(null,s__$1);
var G__7175 = ret;
s__$1 = G__7174;
r = G__7175;
continue;
} else {
return cljs.core.seq.call(null,cljs.core.persistent_BANG_.call(null,r));
}
break;
}
});
/**
 * Flatten a map into a seq of alternate keys and values
 */
cljs.tools.reader.flatten_map = (function cljs$tools$reader$flatten_map(form){
var s = cljs.core.seq.call(null,form);
var key_vals = cljs.core.transient$.call(null,cljs.core.PersistentVector.EMPTY);
while(true){
if(s){
var e = cljs.core.first.call(null,s);
var G__7176 = cljs.core.next.call(null,s);
var G__7177 = cljs.core.conj_BANG_.call(null,cljs.core.conj_BANG_.call(null,key_vals,cljs.core.key.call(null,e)),cljs.core.val.call(null,e));
s = G__7176;
key_vals = G__7177;
continue;
} else {
return cljs.core.seq.call(null,cljs.core.persistent_BANG_.call(null,key_vals));
}
break;
}
});
cljs.tools.reader.register_gensym = (function cljs$tools$reader$register_gensym(sym){
if(cljs.core.not.call(null,cljs.tools.reader.gensym_env)){
throw cljs.core.ex_info.call(null,"Gensym literal not in syntax-quote",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"illegal-state","illegal-state",-1519851182)], null));
} else {
}

var or__4185__auto__ = cljs.core.get.call(null,cljs.tools.reader.gensym_env,sym);
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
var gs = cljs.core.symbol.call(null,[cljs.core.subs.call(null,cljs.core.name.call(null,sym),(0),(((cljs.core.name.call(null,sym)).length) - (1))),"__",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.tools.reader.impl.utils.next_id.call(null)),"__auto__"].join(''));
(cljs.tools.reader.gensym_env = cljs.core.assoc.call(null,cljs.tools.reader.gensym_env,sym,gs));

return gs;
}
});
cljs.tools.reader.add_meta = (function cljs$tools$reader$add_meta(form,ret){
if((((((!((form == null))))?(((((form.cljs$lang$protocol_mask$partition0$ & (262144))) || ((cljs.core.PROTOCOL_SENTINEL === form.cljs$core$IWithMeta$))))?true:false):false))?cljs.core.seq.call(null,cljs.core.dissoc.call(null,cljs.core.meta.call(null,form),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"source","source",-433931539))):false)){
return (new cljs.core.List(null,new cljs.core.Symbol("cljs.core","with-meta","cljs.core/with-meta",749126446,null),(new cljs.core.List(null,ret,(new cljs.core.List(null,cljs.tools.reader.syntax_quote_STAR_.call(null,cljs.core.meta.call(null,form)),null,(1),null)),(2),null)),(3),null));
} else {
return ret;
}
});
cljs.tools.reader.syntax_quote_coll = (function cljs$tools$reader$syntax_quote_coll(type,coll){
var res = (new cljs.core.List(null,new cljs.core.Symbol("cljs.core","sequence","cljs.core/sequence",1908459032,null),(new cljs.core.List(null,cljs.core.cons.call(null,new cljs.core.Symbol("cljs.core","concat","cljs.core/concat",-1133584918,null),cljs.tools.reader.expand_list.call(null,coll)),null,(1),null)),(2),null));
if(cljs.core.truth_(type)){
return (new cljs.core.List(null,new cljs.core.Symbol("cljs.core","apply","cljs.core/apply",1757277831,null),(new cljs.core.List(null,type,(new cljs.core.List(null,res,null,(1),null)),(2),null)),(3),null));
} else {
return res;
}
});
/**
 * Decide which map type to use, array-map if less than 16 elements
 */
cljs.tools.reader.map_func = (function cljs$tools$reader$map_func(coll){
if((cljs.core.count.call(null,coll) >= (16))){
return new cljs.core.Symbol("cljs.core","hash-map","cljs.core/hash-map",303385767,null);
} else {
return new cljs.core.Symbol("cljs.core","array-map","cljs.core/array-map",-1519210683,null);
}
});
cljs.tools.reader.bool_QMARK_ = (function cljs$tools$reader$bool_QMARK_(x){
return (((x instanceof Boolean)) || (x === true) || (x === false));
});
/**
 * Resolve a symbol s into its fully qualified namespace version
 */
cljs.tools.reader.resolve_symbol = (function cljs$tools$reader$resolve_symbol(s){
throw cljs.core.ex_info.call(null,"resolve-symbol is not implemented",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"sym","sym",-1444860305),s], null));
});
cljs.tools.reader.syntax_quote_STAR_ = (function cljs$tools$reader$syntax_quote_STAR_(form){
return cljs.tools.reader.add_meta.call(null,form,((cljs.core.special_symbol_QMARK_.call(null,form))?(new cljs.core.List(null,new cljs.core.Symbol(null,"quote","quote",1377916282,null),(new cljs.core.List(null,form,null,(1),null)),(2),null)):(((form instanceof cljs.core.Symbol))?(new cljs.core.List(null,new cljs.core.Symbol(null,"quote","quote",1377916282,null),(new cljs.core.List(null,((((cljs.core.not.call(null,cljs.core.namespace.call(null,form))) && (goog.string.endsWith(cljs.core.name.call(null,form),"#"))))?cljs.tools.reader.register_gensym.call(null,form):(function (){var sym = cljs.core.str.cljs$core$IFn$_invoke$arity$1(form);
if(goog.string.endsWith(sym,".")){
var csym = cljs.core.symbol.call(null,cljs.core.subs.call(null,sym,(0),(((sym).length) - (1))));
return cljs.core.symbol.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.tools.reader.resolve_symbol.call(null,csym)),"."].join(''));
} else {
return cljs.tools.reader.resolve_symbol.call(null,form);
}
})()),null,(1),null)),(2),null)):((cljs.tools.reader.unquote_QMARK_.call(null,form))?cljs.core.second.call(null,form):((cljs.tools.reader.unquote_splicing_QMARK_.call(null,form))?(function(){throw cljs.core.ex_info.call(null,"unquote-splice not in list",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"illegal-state","illegal-state",-1519851182)], null))})():((cljs.core.coll_QMARK_.call(null,form))?(((((!((form == null))))?(((((form.cljs$lang$protocol_mask$partition0$ & (67108864))) || ((cljs.core.PROTOCOL_SENTINEL === form.cljs$core$IRecord$))))?true:false):false))?form:((cljs.core.map_QMARK_.call(null,form))?cljs.tools.reader.syntax_quote_coll.call(null,cljs.tools.reader.map_func.call(null,form),cljs.tools.reader.flatten_map.call(null,form)):((cljs.core.vector_QMARK_.call(null,form))?(new cljs.core.List(null,new cljs.core.Symbol("cljs.core","vec","cljs.core/vec",307622519,null),(new cljs.core.List(null,cljs.tools.reader.syntax_quote_coll.call(null,null,form),null,(1),null)),(2),null)):((cljs.core.set_QMARK_.call(null,form))?cljs.tools.reader.syntax_quote_coll.call(null,new cljs.core.Symbol("cljs.core","hash-set","cljs.core/hash-set",1130426749,null),form):((((cljs.core.seq_QMARK_.call(null,form)) || (cljs.core.list_QMARK_.call(null,form))))?(function (){var seq = cljs.core.seq.call(null,form);
if(seq){
return cljs.tools.reader.syntax_quote_coll.call(null,null,seq);
} else {
return cljs.core.list(new cljs.core.Symbol("cljs.core","list","cljs.core/list",-1331406371,null));
}
})():(function(){throw cljs.core.ex_info.call(null,"Unknown Collection type",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"unsupported-operation","unsupported-operation",1890540953)], null))})()
))))):(((((form instanceof cljs.core.Keyword)) || (typeof form === 'number') || (typeof form === 'string') || ((form == null)) || (cljs.tools.reader.bool_QMARK_.call(null,form)) || ((form instanceof RegExp))))?form:(new cljs.core.List(null,new cljs.core.Symbol(null,"quote","quote",1377916282,null),(new cljs.core.List(null,form,null,(1),null)),(2),null))
)))))));
});
cljs.tools.reader.read_syntax_quote = (function cljs$tools$reader$read_syntax_quote(rdr,backquote,opts,pending_forms){
var gensym_env_orig_val__7182 = cljs.tools.reader.gensym_env;
var gensym_env_temp_val__7183 = cljs.core.PersistentArrayMap.EMPTY;
(cljs.tools.reader.gensym_env = gensym_env_temp_val__7183);

try{return cljs.tools.reader.syntax_quote_STAR_.call(null,cljs.tools.reader.read_STAR_.call(null,rdr,true,null,opts,pending_forms));
}finally {(cljs.tools.reader.gensym_env = gensym_env_orig_val__7182);
}});
cljs.tools.reader.read_namespaced_map = (function cljs$tools$reader$read_namespaced_map(rdr,_,opts,pending_forms){
var token = cljs.tools.reader.read_token.call(null,rdr,new cljs.core.Keyword(null,"namespaced-map","namespaced-map",1235665380),cljs.tools.reader.reader_types.read_char.call(null,rdr));
var temp__5718__auto__ = ((cljs.core._EQ_.call(null,token,":"))?cljs.core.ns_name.call(null,cljs.core._STAR_ns_STAR_):((cljs.core._EQ_.call(null,":",cljs.core.first.call(null,token)))?(function (){var G__7184 = token;
var G__7184__$1 = (((G__7184 == null))?null:cljs.core.subs.call(null,G__7184,(1)));
var G__7184__$2 = (((G__7184__$1 == null))?null:cljs.tools.reader.impl.commons.parse_symbol.call(null,G__7184__$1));
var G__7184__$3 = (((G__7184__$2 == null))?null:cljs.tools.reader.impl.utils.second_SINGLEQUOTE_.call(null,G__7184__$2));
var G__7184__$4 = (((G__7184__$3 == null))?null:cljs.core.symbol.call(null,G__7184__$3));
if((G__7184__$4 == null)){
return null;
} else {
return cljs.tools.reader.resolve_ns.call(null,G__7184__$4);
}
})():(function (){var G__7185 = token;
var G__7185__$1 = (((G__7185 == null))?null:cljs.tools.reader.impl.commons.parse_symbol.call(null,G__7185));
if((G__7185__$1 == null)){
return null;
} else {
return cljs.tools.reader.impl.utils.second_SINGLEQUOTE_.call(null,G__7185__$1);
}
})()
));
if(cljs.core.truth_(temp__5718__auto__)){
var ns = temp__5718__auto__;
var ch = cljs.tools.reader.impl.commons.read_past.call(null,cljs.tools.reader.impl.utils.whitespace_QMARK_,rdr);
if((ch === "{")){
var items = cljs.tools.reader.read_delimited.call(null,new cljs.core.Keyword(null,"namespaced-map","namespaced-map",1235665380),"}",rdr,opts,pending_forms);
if(cljs.core.odd_QMARK_.call(null,cljs.core.count.call(null,items))){
cljs.tools.reader.impl.errors.throw_odd_map.call(null,rdr,null,null,items);
} else {
}

var keys = cljs.tools.reader.impl.utils.namespace_keys.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns),cljs.core.take_nth.call(null,(2),items));
var vals = cljs.core.take_nth.call(null,(2),cljs.core.rest.call(null,items));
if(cljs.core._EQ_.call(null,cljs.core.count.call(null,cljs.core.set.call(null,keys)),cljs.core.count.call(null,keys))){
} else {
cljs.tools.reader.impl.errors.throw_dup_keys.call(null,rdr,new cljs.core.Keyword(null,"namespaced-map","namespaced-map",1235665380),keys);
}

return cljs.core.zipmap.call(null,keys,vals);
} else {
return cljs.tools.reader.impl.errors.throw_ns_map_no_map.call(null,rdr,token);
}
} else {
return cljs.tools.reader.impl.errors.throw_bad_ns.call(null,rdr,token);
}
});
cljs.tools.reader.macros = (function cljs$tools$reader$macros(ch){
var G__7186 = ch;
switch (G__7186) {
case "\"":
return cljs.tools.reader.read_string_STAR_;

break;
case ":":
return cljs.tools.reader.read_keyword;

break;
case ";":
return cljs.tools.reader.impl.commons.read_comment;

break;
case "'":
return cljs.tools.reader.wrapping_reader.call(null,new cljs.core.Symbol(null,"quote","quote",1377916282,null));

break;
case "@":
return cljs.tools.reader.wrapping_reader.call(null,new cljs.core.Symbol("clojure.core","deref","clojure.core/deref",188719157,null));

break;
case "^":
return cljs.tools.reader.read_meta;

break;
case "`":
return cljs.tools.reader.read_syntax_quote;

break;
case "~":
return cljs.tools.reader.read_unquote;

break;
case "(":
return cljs.tools.reader.read_list;

break;
case ")":
return cljs.tools.reader.read_unmatched_delimiter;

break;
case "[":
return cljs.tools.reader.read_vector;

break;
case "]":
return cljs.tools.reader.read_unmatched_delimiter;

break;
case "{":
return cljs.tools.reader.read_map;

break;
case "}":
return cljs.tools.reader.read_unmatched_delimiter;

break;
case "\\":
return cljs.tools.reader.read_char_STAR_;

break;
case "%":
return cljs.tools.reader.read_arg;

break;
case "#":
return cljs.tools.reader.read_dispatch;

break;
default:
return null;

}
});
cljs.tools.reader.dispatch_macros = (function cljs$tools$reader$dispatch_macros(ch){
var G__7188 = ch;
switch (G__7188) {
case "^":
return cljs.tools.reader.read_meta;

break;
case "'":
return cljs.tools.reader.wrapping_reader.call(null,new cljs.core.Symbol(null,"var","var",870848730,null));

break;
case "(":
return cljs.tools.reader.read_fn;

break;
case "{":
return cljs.tools.reader.read_set;

break;
case "<":
return cljs.tools.reader.impl.commons.throwing_reader.call(null,"Unreadable form");

break;
case "=":
return cljs.tools.reader.impl.commons.throwing_reader.call(null,"read-eval not supported");

break;
case "\"":
return cljs.tools.reader.read_regex;

break;
case "!":
return cljs.tools.reader.impl.commons.read_comment;

break;
case "_":
return cljs.tools.reader.read_discard;

break;
case "?":
return cljs.tools.reader.read_cond;

break;
case ":":
return cljs.tools.reader.read_namespaced_map;

break;
case "#":
return cljs.tools.reader.read_symbolic_value;

break;
default:
return null;

}
});
cljs.tools.reader.read_tagged = (function cljs$tools$reader$read_tagged(rdr,initch,opts,pending_forms){
var tag = cljs.tools.reader.read_STAR_.call(null,rdr,true,null,opts,pending_forms);
if((!((tag instanceof cljs.core.Symbol)))){
cljs.tools.reader.impl.errors.throw_bad_reader_tag.call(null,rdr,tag);
} else {
}

if(cljs.core.truth_(cljs.tools.reader._STAR_suppress_read_STAR_)){
return cljs.core.tagged_literal.call(null,tag,cljs.tools.reader.read_STAR_.call(null,rdr,true,null,opts,pending_forms));
} else {
var temp__5718__auto__ = (function (){var or__4185__auto__ = cljs.tools.reader._STAR_data_readers_STAR_.call(null,tag);
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return cljs.tools.reader.default_data_readers.call(null,tag);
}
})();
if(cljs.core.truth_(temp__5718__auto__)){
var f = temp__5718__auto__;
return f.call(null,cljs.tools.reader.read_STAR_.call(null,rdr,true,null,opts,pending_forms));
} else {
var temp__5718__auto____$1 = cljs.tools.reader._STAR_default_data_reader_fn_STAR_;
if(cljs.core.truth_(temp__5718__auto____$1)){
var f = temp__5718__auto____$1;
return f.call(null,tag,cljs.tools.reader.read_STAR_.call(null,rdr,true,null,opts,pending_forms));
} else {
return cljs.tools.reader.impl.errors.throw_unknown_reader_tag.call(null,rdr,tag);
}
}
}
});
/**
 * Map from reader tag symbols to data reader Vars.
 *   Reader tags without namespace qualifiers are reserved for Clojure.
 *   This light version of tools.reader has no implementation for default
 *   reader tags such as #inst and #uuid.
 */
cljs.tools.reader._STAR_data_readers_STAR_ = cljs.core.PersistentArrayMap.EMPTY;
/**
 * When no data reader is found for a tag and *default-data-reader-fn*
 *   is non-nil, it will be called with two arguments, the tag and the value.
 *   If *default-data-reader-fn* is nil (the default value), an exception
 *   will be thrown for the unknown tag.
 */
cljs.tools.reader._STAR_default_data_reader_fn_STAR_ = null;
cljs.tools.reader._STAR_suppress_read_STAR_ = false;
/**
 * Default map of data reader functions provided by Clojure.
 *   May be overridden by binding *data-readers*
 */
cljs.tools.reader.default_data_readers = cljs.core.PersistentArrayMap.EMPTY;
cljs.tools.reader.read_STAR__internal = (function cljs$tools$reader$read_STAR__internal(reader,eof_error_QMARK_,sentinel,return_on,opts,pending_forms){
while(true){
if(((cljs.tools.reader.reader_types.source_logging_reader_QMARK_.call(null,reader)) && ((!(cljs.tools.reader.impl.utils.whitespace_QMARK_.call(null,cljs.tools.reader.reader_types.peek_char.call(null,reader))))))){
return cljs.tools.reader.reader_types.log_source_STAR_.call(null,reader,(function (){
while(true){
if((!(goog.array.isEmpty(pending_forms)))){
var form = (pending_forms[(0)]);
goog.array.removeAt(pending_forms,(0));

return form;
} else {
var ch = cljs.tools.reader.reader_types.read_char.call(null,reader);
if(cljs.tools.reader.impl.utils.whitespace_QMARK_.call(null,ch)){
continue;
} else {
if((ch == null)){
if(eof_error_QMARK_){
return cljs.tools.reader.impl.errors.throw_eof_error.call(null,reader,null);
} else {
return sentinel;
}
} else {
if((ch === return_on)){
return cljs.tools.reader.READ_FINISHED;
} else {
if(cljs.tools.reader.impl.commons.number_literal_QMARK_.call(null,reader,ch)){
return cljs.tools.reader.read_number.call(null,reader,ch);
} else {
var f = cljs.tools.reader.macros.call(null,ch);
if((!((f == null)))){
var res = f.call(null,reader,ch,opts,pending_forms);
if((res === reader)){
continue;
} else {
return res;
}
} else {
return cljs.tools.reader.read_symbol.call(null,reader,ch);
}

}
}
}
}
}
break;
}
}));
} else {
if((!(goog.array.isEmpty(pending_forms)))){
var form = (pending_forms[(0)]);
goog.array.removeAt(pending_forms,(0));

return form;
} else {
var ch = cljs.tools.reader.reader_types.read_char.call(null,reader);
if(cljs.tools.reader.impl.utils.whitespace_QMARK_.call(null,ch)){
continue;
} else {
if((ch == null)){
if(eof_error_QMARK_){
return cljs.tools.reader.impl.errors.throw_eof_error.call(null,reader,null);
} else {
return sentinel;
}
} else {
if((ch === return_on)){
return cljs.tools.reader.READ_FINISHED;
} else {
if(cljs.tools.reader.impl.commons.number_literal_QMARK_.call(null,reader,ch)){
return cljs.tools.reader.read_number.call(null,reader,ch);
} else {
var f = cljs.tools.reader.macros.call(null,ch);
if((!((f == null)))){
var res = f.call(null,reader,ch,opts,pending_forms);
if((res === reader)){
continue;
} else {
return res;
}
} else {
return cljs.tools.reader.read_symbol.call(null,reader,ch);
}

}
}
}
}
}
}
break;
}
});
cljs.tools.reader.read_STAR_ = (function cljs$tools$reader$read_STAR_(var_args){
var G__7191 = arguments.length;
switch (G__7191) {
case 5:
return cljs.tools.reader.read_STAR_.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 6:
return cljs.tools.reader.read_STAR_.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.tools.reader.read_STAR_.cljs$core$IFn$_invoke$arity$5 = (function (reader,eof_error_QMARK_,sentinel,opts,pending_forms){
return cljs.tools.reader.read_STAR_.call(null,reader,eof_error_QMARK_,sentinel,null,opts,pending_forms);
}));

(cljs.tools.reader.read_STAR_.cljs$core$IFn$_invoke$arity$6 = (function (reader,eof_error_QMARK_,sentinel,return_on,opts,pending_forms){
try{return cljs.tools.reader.read_STAR__internal.call(null,reader,eof_error_QMARK_,sentinel,return_on,opts,pending_forms);
}catch (e7192){if((e7192 instanceof Error)){
var e = e7192;
if(cljs.tools.reader.impl.utils.ex_info_QMARK_.call(null,e)){
var d = cljs.core.ex_data.call(null,e);
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"reader-exception","reader-exception",-1938323098),new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(d))){
throw e;
} else {
throw cljs.core.ex_info.call(null,e.message,cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"reader-exception","reader-exception",-1938323098)], null),d,((cljs.tools.reader.reader_types.indexing_reader_QMARK_.call(null,reader))?new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),cljs.tools.reader.reader_types.get_line_number.call(null,reader),new cljs.core.Keyword(null,"column","column",2078222095),cljs.tools.reader.reader_types.get_column_number.call(null,reader),new cljs.core.Keyword(null,"file","file",-1269645878),cljs.tools.reader.reader_types.get_file_name.call(null,reader)], null):null)),e);
}
} else {
throw cljs.core.ex_info.call(null,e.message,cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"reader-exception","reader-exception",-1938323098)], null),((cljs.tools.reader.reader_types.indexing_reader_QMARK_.call(null,reader))?new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),cljs.tools.reader.reader_types.get_line_number.call(null,reader),new cljs.core.Keyword(null,"column","column",2078222095),cljs.tools.reader.reader_types.get_column_number.call(null,reader),new cljs.core.Keyword(null,"file","file",-1269645878),cljs.tools.reader.reader_types.get_file_name.call(null,reader)], null):null)),e);
}
} else {
throw e7192;

}
}}));

(cljs.tools.reader.read_STAR_.cljs$lang$maxFixedArity = 6);

/**
 * Reads the first object from an IPushbackReader.
 * Returns the object read. If EOF, throws if eof-error? is true.
 * Otherwise returns sentinel. If no stream is provided, *in* will be used.
 * 
 * Opts is a persistent map with valid keys:
 *  :read-cond - :allow to process reader conditionals, or
 *               :preserve to keep all branches
 *  :features - persistent set of feature keywords for reader conditionals
 *  :eof - on eof, return value unless :eofthrow, then throw.
 *         if not specified, will throw
 * 
 * To read data structures only, use clojure.tools.reader.edn/read
 * 
 * Note that the function signature of clojure.tools.reader/read and
 * clojure.tools.reader.edn/read is not the same for eof-handling
 */
cljs.tools.reader.read = (function cljs$tools$reader$read(var_args){
var G__7195 = arguments.length;
switch (G__7195) {
case 1:
return cljs.tools.reader.read.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.tools.reader.read.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.tools.reader.read.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.tools.reader.read.cljs$core$IFn$_invoke$arity$1 = (function (reader){
return cljs.tools.reader.read.call(null,reader,true,null);
}));

(cljs.tools.reader.read.cljs$core$IFn$_invoke$arity$2 = (function (p__7196,reader){
var map__7197 = p__7196;
var map__7197__$1 = (((((!((map__7197 == null))))?(((((map__7197.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__7197.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__7197):map__7197);
var opts = map__7197__$1;
var eof = cljs.core.get.call(null,map__7197__$1,new cljs.core.Keyword(null,"eof","eof",-489063237),new cljs.core.Keyword(null,"eofthrow","eofthrow",-334166531));
return cljs.tools.reader.read_STAR_.call(null,reader,cljs.core._EQ_.call(null,eof,new cljs.core.Keyword(null,"eofthrow","eofthrow",-334166531)),eof,null,opts,cljs.core.to_array.call(null,cljs.core.PersistentVector.EMPTY));
}));

(cljs.tools.reader.read.cljs$core$IFn$_invoke$arity$3 = (function (reader,eof_error_QMARK_,sentinel){
return cljs.tools.reader.read_STAR_.call(null,reader,eof_error_QMARK_,sentinel,null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.to_array.call(null,cljs.core.PersistentVector.EMPTY));
}));

(cljs.tools.reader.read.cljs$lang$maxFixedArity = 3);

/**
 * Reads one object from the string s.
 * Returns nil when s is nil or empty.
 * 
 * To read data structures only, use clojure.tools.reader.edn/read-string
 * 
 * Note that the function signature of clojure.tools.reader/read-string and
 * clojure.tools.reader.edn/read-string is not the same for eof-handling
 */
cljs.tools.reader.read_string = (function cljs$tools$reader$read_string(var_args){
var G__7201 = arguments.length;
switch (G__7201) {
case 1:
return cljs.tools.reader.read_string.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.tools.reader.read_string.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.tools.reader.read_string.cljs$core$IFn$_invoke$arity$1 = (function (s){
return cljs.tools.reader.read_string.call(null,cljs.core.PersistentArrayMap.EMPTY,s);
}));

(cljs.tools.reader.read_string.cljs$core$IFn$_invoke$arity$2 = (function (opts,s){
if(cljs.core.truth_((function (){var and__4174__auto__ = s;
if(cljs.core.truth_(and__4174__auto__)){
return (!((s === "")));
} else {
return and__4174__auto__;
}
})())){
return cljs.tools.reader.read.call(null,opts,cljs.tools.reader.reader_types.string_push_back_reader.call(null,s));
} else {
return null;
}
}));

(cljs.tools.reader.read_string.cljs$lang$maxFixedArity = 2);

/**
 * Like read, and taking the same args. reader must be a SourceLoggingPushbackReader.
 *   Returns a vector containing the object read and the (whitespace-trimmed) string read.
 */
cljs.tools.reader.read_PLUS_string = (function cljs$tools$reader$read_PLUS_string(var_args){
var G__7204 = arguments.length;
switch (G__7204) {
case 1:
return cljs.tools.reader.read_PLUS_string.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 3:
return cljs.tools.reader.read_PLUS_string.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 2:
return cljs.tools.reader.read_PLUS_string.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.tools.reader.read_PLUS_string.cljs$core$IFn$_invoke$arity$1 = (function (stream){
return cljs.tools.reader.read_PLUS_string.call(null,stream,true,null);
}));

(cljs.tools.reader.read_PLUS_string.cljs$core$IFn$_invoke$arity$3 = (function (stream,eof_error_QMARK_,eof_value){
var buf = (function (reader){
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"buffer","buffer",617295198).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,stream.frames)));
});
var offset = ((buf.call(null,stream)).length);
var o = ((((cljs.tools.reader.reader_types.source_logging_reader_QMARK_.call(null,stream)) && ((!(cljs.tools.reader.impl.utils.whitespace_QMARK_.call(null,cljs.tools.reader.reader_types.peek_char.call(null,stream)))))))?cljs.tools.reader.reader_types.log_source_STAR_.call(null,stream,(function (){
return cljs.tools.reader.read.call(null,stream,eof_error_QMARK_,eof_value);
})):cljs.tools.reader.read.call(null,stream,eof_error_QMARK_,eof_value));
var s = cljs.core.subs.call(null,buf.call(null,stream),offset).trim();
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [o,s], null);
}));

(cljs.tools.reader.read_PLUS_string.cljs$core$IFn$_invoke$arity$2 = (function (opts,stream){
var buf = (function (reader){
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"buffer","buffer",617295198).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,stream.frames)));
});
var offset = ((buf.call(null,stream)).length);
var o = ((((cljs.tools.reader.reader_types.source_logging_reader_QMARK_.call(null,stream)) && ((!(cljs.tools.reader.impl.utils.whitespace_QMARK_.call(null,cljs.tools.reader.reader_types.peek_char.call(null,stream)))))))?cljs.tools.reader.reader_types.log_source_STAR_.call(null,stream,(function (){
return cljs.tools.reader.read.call(null,opts,stream);
})):cljs.tools.reader.read.call(null,opts,stream));
var s = cljs.core.subs.call(null,buf.call(null,stream),offset).trim();
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [o,s], null);
}));

(cljs.tools.reader.read_PLUS_string.cljs$lang$maxFixedArity = 3);

