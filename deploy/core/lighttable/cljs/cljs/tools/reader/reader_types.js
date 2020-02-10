// Compiled by ClojureScript 1.10.597 {}
goog.provide('cljs.tools.reader.reader_types');
goog.require('cljs.core');
goog.require('cljs.tools.reader.impl.utils');
goog.require('goog.string');
goog.require('goog.string.StringBuffer');

/**
 * @interface
 */
cljs.tools.reader.reader_types.Reader = function(){};

/**
 * Returns the next char from the Reader, nil if the end of stream has been reached
 */
cljs.tools.reader.reader_types.read_char = (function cljs$tools$reader$reader_types$read_char(reader){
if((((!((reader == null)))) && ((!((reader.cljs$tools$reader$reader_types$Reader$read_char$arity$1 == null)))))){
return reader.cljs$tools$reader$reader_types$Reader$read_char$arity$1(reader);
} else {
var x__4487__auto__ = (((reader == null))?null:reader);
var m__4488__auto__ = (cljs.tools.reader.reader_types.read_char[goog.typeOf(x__4487__auto__)]);
if((!((m__4488__auto__ == null)))){
return m__4488__auto__.call(null,reader);
} else {
var m__4485__auto__ = (cljs.tools.reader.reader_types.read_char["_"]);
if((!((m__4485__auto__ == null)))){
return m__4485__auto__.call(null,reader);
} else {
throw cljs.core.missing_protocol.call(null,"Reader.read-char",reader);
}
}
}
});

/**
 * Returns the next char from the Reader without removing it from the reader stream
 */
cljs.tools.reader.reader_types.peek_char = (function cljs$tools$reader$reader_types$peek_char(reader){
if((((!((reader == null)))) && ((!((reader.cljs$tools$reader$reader_types$Reader$peek_char$arity$1 == null)))))){
return reader.cljs$tools$reader$reader_types$Reader$peek_char$arity$1(reader);
} else {
var x__4487__auto__ = (((reader == null))?null:reader);
var m__4488__auto__ = (cljs.tools.reader.reader_types.peek_char[goog.typeOf(x__4487__auto__)]);
if((!((m__4488__auto__ == null)))){
return m__4488__auto__.call(null,reader);
} else {
var m__4485__auto__ = (cljs.tools.reader.reader_types.peek_char["_"]);
if((!((m__4485__auto__ == null)))){
return m__4485__auto__.call(null,reader);
} else {
throw cljs.core.missing_protocol.call(null,"Reader.peek-char",reader);
}
}
}
});


/**
 * @interface
 */
cljs.tools.reader.reader_types.IPushbackReader = function(){};

/**
 * Pushes back a single character on to the stream
 */
cljs.tools.reader.reader_types.unread = (function cljs$tools$reader$reader_types$unread(reader,ch){
if((((!((reader == null)))) && ((!((reader.cljs$tools$reader$reader_types$IPushbackReader$unread$arity$2 == null)))))){
return reader.cljs$tools$reader$reader_types$IPushbackReader$unread$arity$2(reader,ch);
} else {
var x__4487__auto__ = (((reader == null))?null:reader);
var m__4488__auto__ = (cljs.tools.reader.reader_types.unread[goog.typeOf(x__4487__auto__)]);
if((!((m__4488__auto__ == null)))){
return m__4488__auto__.call(null,reader,ch);
} else {
var m__4485__auto__ = (cljs.tools.reader.reader_types.unread["_"]);
if((!((m__4485__auto__ == null)))){
return m__4485__auto__.call(null,reader,ch);
} else {
throw cljs.core.missing_protocol.call(null,"IPushbackReader.unread",reader);
}
}
}
});


/**
 * @interface
 */
cljs.tools.reader.reader_types.IndexingReader = function(){};

/**
 * Returns the line number of the next character to be read from the stream
 */
cljs.tools.reader.reader_types.get_line_number = (function cljs$tools$reader$reader_types$get_line_number(reader){
if((((!((reader == null)))) && ((!((reader.cljs$tools$reader$reader_types$IndexingReader$get_line_number$arity$1 == null)))))){
return reader.cljs$tools$reader$reader_types$IndexingReader$get_line_number$arity$1(reader);
} else {
var x__4487__auto__ = (((reader == null))?null:reader);
var m__4488__auto__ = (cljs.tools.reader.reader_types.get_line_number[goog.typeOf(x__4487__auto__)]);
if((!((m__4488__auto__ == null)))){
return m__4488__auto__.call(null,reader);
} else {
var m__4485__auto__ = (cljs.tools.reader.reader_types.get_line_number["_"]);
if((!((m__4485__auto__ == null)))){
return m__4485__auto__.call(null,reader);
} else {
throw cljs.core.missing_protocol.call(null,"IndexingReader.get-line-number",reader);
}
}
}
});

/**
 * Returns the column number of the next character to be read from the stream
 */
cljs.tools.reader.reader_types.get_column_number = (function cljs$tools$reader$reader_types$get_column_number(reader){
if((((!((reader == null)))) && ((!((reader.cljs$tools$reader$reader_types$IndexingReader$get_column_number$arity$1 == null)))))){
return reader.cljs$tools$reader$reader_types$IndexingReader$get_column_number$arity$1(reader);
} else {
var x__4487__auto__ = (((reader == null))?null:reader);
var m__4488__auto__ = (cljs.tools.reader.reader_types.get_column_number[goog.typeOf(x__4487__auto__)]);
if((!((m__4488__auto__ == null)))){
return m__4488__auto__.call(null,reader);
} else {
var m__4485__auto__ = (cljs.tools.reader.reader_types.get_column_number["_"]);
if((!((m__4485__auto__ == null)))){
return m__4485__auto__.call(null,reader);
} else {
throw cljs.core.missing_protocol.call(null,"IndexingReader.get-column-number",reader);
}
}
}
});

/**
 * Returns the file name the reader is reading from, or nil
 */
cljs.tools.reader.reader_types.get_file_name = (function cljs$tools$reader$reader_types$get_file_name(reader){
if((((!((reader == null)))) && ((!((reader.cljs$tools$reader$reader_types$IndexingReader$get_file_name$arity$1 == null)))))){
return reader.cljs$tools$reader$reader_types$IndexingReader$get_file_name$arity$1(reader);
} else {
var x__4487__auto__ = (((reader == null))?null:reader);
var m__4488__auto__ = (cljs.tools.reader.reader_types.get_file_name[goog.typeOf(x__4487__auto__)]);
if((!((m__4488__auto__ == null)))){
return m__4488__auto__.call(null,reader);
} else {
var m__4485__auto__ = (cljs.tools.reader.reader_types.get_file_name["_"]);
if((!((m__4485__auto__ == null)))){
return m__4485__auto__.call(null,reader);
} else {
throw cljs.core.missing_protocol.call(null,"IndexingReader.get-file-name",reader);
}
}
}
});


/**
* @constructor
 * @implements {cljs.tools.reader.reader_types.Reader}
*/
cljs.tools.reader.reader_types.StringReader = (function (s,s_len,s_pos){
this.s = s;
this.s_len = s_len;
this.s_pos = s_pos;
});
(cljs.tools.reader.reader_types.StringReader.prototype.cljs$tools$reader$reader_types$Reader$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.tools.reader.reader_types.StringReader.prototype.cljs$tools$reader$reader_types$Reader$read_char$arity$1 = (function (reader){
var self__ = this;
var reader__$1 = this;
if((self__.s_len > self__.s_pos)){
var r = self__.s.charAt(self__.s_pos);
(self__.s_pos = (self__.s_pos + (1)));

return r;
} else {
return null;
}
}));

(cljs.tools.reader.reader_types.StringReader.prototype.cljs$tools$reader$reader_types$Reader$peek_char$arity$1 = (function (reader){
var self__ = this;
var reader__$1 = this;
if((self__.s_len > self__.s_pos)){
return self__.s.charAt(self__.s_pos);
} else {
return null;
}
}));

(cljs.tools.reader.reader_types.StringReader.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"s","s",-948495851,null),new cljs.core.Symbol(null,"s-len","s-len",1869978331,null),cljs.core.with_meta(new cljs.core.Symbol(null,"s-pos","s-pos",-540562492,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null))], null);
}));

(cljs.tools.reader.reader_types.StringReader.cljs$lang$type = true);

(cljs.tools.reader.reader_types.StringReader.cljs$lang$ctorStr = "cljs.tools.reader.reader-types/StringReader");

(cljs.tools.reader.reader_types.StringReader.cljs$lang$ctorPrWriter = (function (this__4428__auto__,writer__4429__auto__,opt__4430__auto__){
return cljs.core._write.call(null,writer__4429__auto__,"cljs.tools.reader.reader-types/StringReader");
}));

/**
 * Positional factory function for cljs.tools.reader.reader-types/StringReader.
 */
cljs.tools.reader.reader_types.__GT_StringReader = (function cljs$tools$reader$reader_types$__GT_StringReader(s,s_len,s_pos){
return (new cljs.tools.reader.reader_types.StringReader(s,s_len,s_pos));
});


/**
* @constructor
 * @implements {cljs.tools.reader.reader_types.Reader}
*/
cljs.tools.reader.reader_types.NodeReadableReader = (function (readable,buf){
this.readable = readable;
this.buf = buf;
});
(cljs.tools.reader.reader_types.NodeReadableReader.prototype.cljs$tools$reader$reader_types$Reader$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.tools.reader.reader_types.NodeReadableReader.prototype.cljs$tools$reader$reader_types$Reader$read_char$arity$1 = (function (reader){
var self__ = this;
var reader__$1 = this;
if(cljs.core.truth_(self__.buf)){
var c = (self__.buf[(0)]);
(self__.buf = null);

return cljs.tools.reader.impl.utils.char$.call(null,c);
} else {
var c = cljs.core.str.cljs$core$IFn$_invoke$arity$1(self__.readable.read((1)));
if(cljs.core.truth_(c)){
return cljs.tools.reader.impl.utils.char$.call(null,c);
} else {
return null;
}
}
}));

(cljs.tools.reader.reader_types.NodeReadableReader.prototype.cljs$tools$reader$reader_types$Reader$peek_char$arity$1 = (function (reader){
var self__ = this;
var reader__$1 = this;
if(cljs.core.truth_(self__.buf)){
} else {
(self__.buf = cljs.core.str.cljs$core$IFn$_invoke$arity$1(self__.readable.read((1))));
}

if(cljs.core.truth_(self__.buf)){
return cljs.tools.reader.impl.utils.char$.call(null,(self__.buf[(0)]));
} else {
return null;
}
}));

(cljs.tools.reader.reader_types.NodeReadableReader.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"readable","readable",2113054478,null),cljs.core.with_meta(new cljs.core.Symbol(null,"buf","buf",1426618187,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null))], null);
}));

(cljs.tools.reader.reader_types.NodeReadableReader.cljs$lang$type = true);

(cljs.tools.reader.reader_types.NodeReadableReader.cljs$lang$ctorStr = "cljs.tools.reader.reader-types/NodeReadableReader");

(cljs.tools.reader.reader_types.NodeReadableReader.cljs$lang$ctorPrWriter = (function (this__4428__auto__,writer__4429__auto__,opt__4430__auto__){
return cljs.core._write.call(null,writer__4429__auto__,"cljs.tools.reader.reader-types/NodeReadableReader");
}));

/**
 * Positional factory function for cljs.tools.reader.reader-types/NodeReadableReader.
 */
cljs.tools.reader.reader_types.__GT_NodeReadableReader = (function cljs$tools$reader$reader_types$__GT_NodeReadableReader(readable,buf){
return (new cljs.tools.reader.reader_types.NodeReadableReader(readable,buf));
});


/**
* @constructor
 * @implements {cljs.tools.reader.reader_types.Reader}
 * @implements {cljs.tools.reader.reader_types.IPushbackReader}
*/
cljs.tools.reader.reader_types.PushbackReader = (function (rdr,buf,buf_len,buf_pos){
this.rdr = rdr;
this.buf = buf;
this.buf_len = buf_len;
this.buf_pos = buf_pos;
});
(cljs.tools.reader.reader_types.PushbackReader.prototype.cljs$tools$reader$reader_types$Reader$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.tools.reader.reader_types.PushbackReader.prototype.cljs$tools$reader$reader_types$Reader$read_char$arity$1 = (function (reader){
var self__ = this;
var reader__$1 = this;
var c = (((self__.buf_pos < self__.buf_len))?(self__.buf[self__.buf_pos]):cljs.tools.reader.reader_types.read_char.call(null,self__.rdr));
if((self__.buf_pos < self__.buf_len)){
(self__.buf_pos = (self__.buf_pos + (1)));
} else {
}

return cljs.tools.reader.impl.utils.char$.call(null,c);
}));

(cljs.tools.reader.reader_types.PushbackReader.prototype.cljs$tools$reader$reader_types$Reader$peek_char$arity$1 = (function (reader){
var self__ = this;
var reader__$1 = this;
var c = (((self__.buf_pos < self__.buf_len))?(self__.buf[self__.buf_pos]):cljs.tools.reader.reader_types.peek_char.call(null,self__.rdr));
return cljs.tools.reader.impl.utils.char$.call(null,c);
}));

(cljs.tools.reader.reader_types.PushbackReader.prototype.cljs$tools$reader$reader_types$IPushbackReader$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.tools.reader.reader_types.PushbackReader.prototype.cljs$tools$reader$reader_types$IPushbackReader$unread$arity$2 = (function (reader,ch){
var self__ = this;
var reader__$1 = this;
if(cljs.core.truth_(ch)){
if((self__.buf_pos === (0))){
throw (new Error("Pushback buffer is full"));
} else {
}

(self__.buf_pos = (self__.buf_pos - (1)));

return (self__.buf[self__.buf_pos] = ch);
} else {
return null;
}
}));

(cljs.tools.reader.reader_types.PushbackReader.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"rdr","rdr",190007785,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol(null,"not-native","not-native",-236392494,null)], null)),new cljs.core.Symbol(null,"buf","buf",1426618187,null),new cljs.core.Symbol(null,"buf-len","buf-len",404510846,null),cljs.core.with_meta(new cljs.core.Symbol(null,"buf-pos","buf-pos",-807229033,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null))], null);
}));

(cljs.tools.reader.reader_types.PushbackReader.cljs$lang$type = true);

(cljs.tools.reader.reader_types.PushbackReader.cljs$lang$ctorStr = "cljs.tools.reader.reader-types/PushbackReader");

(cljs.tools.reader.reader_types.PushbackReader.cljs$lang$ctorPrWriter = (function (this__4428__auto__,writer__4429__auto__,opt__4430__auto__){
return cljs.core._write.call(null,writer__4429__auto__,"cljs.tools.reader.reader-types/PushbackReader");
}));

/**
 * Positional factory function for cljs.tools.reader.reader-types/PushbackReader.
 */
cljs.tools.reader.reader_types.__GT_PushbackReader = (function cljs$tools$reader$reader_types$__GT_PushbackReader(rdr,buf,buf_len,buf_pos){
return (new cljs.tools.reader.reader_types.PushbackReader(rdr,buf,buf_len,buf_pos));
});

cljs.tools.reader.reader_types.normalize_newline = (function cljs$tools$reader$reader_types$normalize_newline(rdr,ch){
if(("\r" === ch)){
var c = cljs.tools.reader.reader_types.peek_char.call(null,rdr);
if(((("\f" === c)) || (("\n" === c)))){
cljs.tools.reader.reader_types.read_char.call(null,rdr);
} else {
}

return "\n";
} else {
return ch;
}
});

/**
* @constructor
 * @implements {cljs.tools.reader.reader_types.IndexingReader}
 * @implements {cljs.tools.reader.reader_types.Reader}
 * @implements {cljs.tools.reader.reader_types.IPushbackReader}
*/
cljs.tools.reader.reader_types.IndexingPushbackReader = (function (rdr,line,column,line_start_QMARK_,prev,prev_column,file_name){
this.rdr = rdr;
this.line = line;
this.column = column;
this.line_start_QMARK_ = line_start_QMARK_;
this.prev = prev;
this.prev_column = prev_column;
this.file_name = file_name;
});
(cljs.tools.reader.reader_types.IndexingPushbackReader.prototype.cljs$tools$reader$reader_types$Reader$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.tools.reader.reader_types.IndexingPushbackReader.prototype.cljs$tools$reader$reader_types$Reader$read_char$arity$1 = (function (reader){
var self__ = this;
var reader__$1 = this;
var temp__5720__auto__ = cljs.tools.reader.reader_types.read_char.call(null,self__.rdr);
if(cljs.core.truth_(temp__5720__auto__)){
var ch = temp__5720__auto__;
var ch__$1 = cljs.tools.reader.reader_types.normalize_newline.call(null,self__.rdr,ch);
(self__.prev = self__.line_start_QMARK_);

(self__.line_start_QMARK_ = cljs.tools.reader.impl.utils.newline_QMARK_.call(null,ch__$1));

if(cljs.core.truth_(self__.line_start_QMARK_)){
(self__.prev_column = self__.column);

(self__.column = (0));

(self__.line = (self__.line + (1)));
} else {
}

(self__.column = (self__.column + (1)));

return ch__$1;
} else {
return null;
}
}));

(cljs.tools.reader.reader_types.IndexingPushbackReader.prototype.cljs$tools$reader$reader_types$Reader$peek_char$arity$1 = (function (reader){
var self__ = this;
var reader__$1 = this;
return cljs.tools.reader.reader_types.peek_char.call(null,self__.rdr);
}));

(cljs.tools.reader.reader_types.IndexingPushbackReader.prototype.cljs$tools$reader$reader_types$IPushbackReader$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.tools.reader.reader_types.IndexingPushbackReader.prototype.cljs$tools$reader$reader_types$IPushbackReader$unread$arity$2 = (function (reader,ch){
var self__ = this;
var reader__$1 = this;
if(cljs.core.truth_(self__.line_start_QMARK_)){
(self__.line = (self__.line - (1)));

(self__.column = self__.prev_column);
} else {
(self__.column = (self__.column - (1)));
}

(self__.line_start_QMARK_ = self__.prev);

return cljs.tools.reader.reader_types.unread.call(null,self__.rdr,ch);
}));

(cljs.tools.reader.reader_types.IndexingPushbackReader.prototype.cljs$tools$reader$reader_types$IndexingReader$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.tools.reader.reader_types.IndexingPushbackReader.prototype.cljs$tools$reader$reader_types$IndexingReader$get_line_number$arity$1 = (function (reader){
var self__ = this;
var reader__$1 = this;
return (self__.line | (0));
}));

(cljs.tools.reader.reader_types.IndexingPushbackReader.prototype.cljs$tools$reader$reader_types$IndexingReader$get_column_number$arity$1 = (function (reader){
var self__ = this;
var reader__$1 = this;
return (self__.column | (0));
}));

(cljs.tools.reader.reader_types.IndexingPushbackReader.prototype.cljs$tools$reader$reader_types$IndexingReader$get_file_name$arity$1 = (function (reader){
var self__ = this;
var reader__$1 = this;
return self__.file_name;
}));

(cljs.tools.reader.reader_types.IndexingPushbackReader.getBasis = (function (){
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"rdr","rdr",190007785,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol(null,"not-native","not-native",-236392494,null)], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"line","line",1852876762,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"column","column",-576213674,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"line-start?","line-start?",1357012474,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"prev","prev",43462301,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"prev-column","prev-column",324083974,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),new cljs.core.Symbol(null,"file-name","file-name",-13685732,null)], null);
}));

(cljs.tools.reader.reader_types.IndexingPushbackReader.cljs$lang$type = true);

(cljs.tools.reader.reader_types.IndexingPushbackReader.cljs$lang$ctorStr = "cljs.tools.reader.reader-types/IndexingPushbackReader");

(cljs.tools.reader.reader_types.IndexingPushbackReader.cljs$lang$ctorPrWriter = (function (this__4428__auto__,writer__4429__auto__,opt__4430__auto__){
return cljs.core._write.call(null,writer__4429__auto__,"cljs.tools.reader.reader-types/IndexingPushbackReader");
}));

/**
 * Positional factory function for cljs.tools.reader.reader-types/IndexingPushbackReader.
 */
cljs.tools.reader.reader_types.__GT_IndexingPushbackReader = (function cljs$tools$reader$reader_types$__GT_IndexingPushbackReader(rdr,line,column,line_start_QMARK_,prev,prev_column,file_name){
return (new cljs.tools.reader.reader_types.IndexingPushbackReader(rdr,line,column,line_start_QMARK_,prev,prev_column,file_name));
});

/**
 * Returns an object of the same type and value as `obj`, with its
 * metadata merged over `m`.
 */
cljs.tools.reader.reader_types.merge_meta = (function cljs$tools$reader$reader_types$merge_meta(obj,m){
var orig_meta = cljs.core.meta.call(null,obj);
return cljs.core.with_meta.call(null,obj,cljs.core.merge.call(null,m,cljs.core.dissoc.call(null,orig_meta,new cljs.core.Keyword(null,"source","source",-433931539))));
});
/**
 * Returns a string containing the contents of the top most source
 * logging frame.
 */
cljs.tools.reader.reader_types.peek_source_log = (function cljs$tools$reader$reader_types$peek_source_log(frames){
return cljs.core.subs.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"buffer","buffer",617295198).cljs$core$IFn$_invoke$arity$1(frames)),cljs.core.first.call(null,new cljs.core.Keyword(null,"offset","offset",296498311).cljs$core$IFn$_invoke$arity$1(frames)));
});
/**
 * Logs `char` to all currently active source logging frames.
 */
cljs.tools.reader.reader_types.log_source_char = (function cljs$tools$reader$reader_types$log_source_char(frames,char$){
var temp__5720__auto__ = new cljs.core.Keyword(null,"buffer","buffer",617295198).cljs$core$IFn$_invoke$arity$1(frames);
if(cljs.core.truth_(temp__5720__auto__)){
var buffer = temp__5720__auto__;
return buffer.append(char$);
} else {
return null;
}
});
/**
 * Removes the last logged character from all currently active source
 * logging frames. Called when pushing a character back.
 */
cljs.tools.reader.reader_types.drop_last_logged_char = (function cljs$tools$reader$reader_types$drop_last_logged_char(frames){
var temp__5720__auto__ = new cljs.core.Keyword(null,"buffer","buffer",617295198).cljs$core$IFn$_invoke$arity$1(frames);
if(cljs.core.truth_(temp__5720__auto__)){
var buffer = temp__5720__auto__;
return buffer.set(cljs.core.subs.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(buffer),(0),(buffer.getLength() - (1))));
} else {
return null;
}
});

/**
* @constructor
 * @implements {cljs.tools.reader.reader_types.IndexingReader}
 * @implements {cljs.tools.reader.reader_types.Reader}
 * @implements {cljs.tools.reader.reader_types.IPushbackReader}
*/
cljs.tools.reader.reader_types.SourceLoggingPushbackReader = (function (rdr,line,column,line_start_QMARK_,prev,prev_column,file_name,frames){
this.rdr = rdr;
this.line = line;
this.column = column;
this.line_start_QMARK_ = line_start_QMARK_;
this.prev = prev;
this.prev_column = prev_column;
this.file_name = file_name;
this.frames = frames;
});
(cljs.tools.reader.reader_types.SourceLoggingPushbackReader.prototype.cljs$tools$reader$reader_types$Reader$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.tools.reader.reader_types.SourceLoggingPushbackReader.prototype.cljs$tools$reader$reader_types$Reader$read_char$arity$1 = (function (reader){
var self__ = this;
var reader__$1 = this;
var temp__5720__auto__ = cljs.tools.reader.reader_types.read_char.call(null,self__.rdr);
if(cljs.core.truth_(temp__5720__auto__)){
var ch = temp__5720__auto__;
var ch__$1 = cljs.tools.reader.reader_types.normalize_newline.call(null,self__.rdr,ch);
(self__.prev = self__.line_start_QMARK_);

(self__.line_start_QMARK_ = cljs.tools.reader.impl.utils.newline_QMARK_.call(null,ch__$1));

if(cljs.core.truth_(self__.line_start_QMARK_)){
(self__.prev_column = self__.column);

(self__.column = (0));

(self__.line = (self__.line + (1)));
} else {
}

(self__.column = (self__.column + (1)));

cljs.tools.reader.reader_types.log_source_char.call(null,cljs.core.deref.call(null,self__.frames),ch__$1);

return ch__$1;
} else {
return null;
}
}));

(cljs.tools.reader.reader_types.SourceLoggingPushbackReader.prototype.cljs$tools$reader$reader_types$Reader$peek_char$arity$1 = (function (reader){
var self__ = this;
var reader__$1 = this;
return cljs.tools.reader.reader_types.peek_char.call(null,self__.rdr);
}));

(cljs.tools.reader.reader_types.SourceLoggingPushbackReader.prototype.cljs$tools$reader$reader_types$IPushbackReader$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.tools.reader.reader_types.SourceLoggingPushbackReader.prototype.cljs$tools$reader$reader_types$IPushbackReader$unread$arity$2 = (function (reader,ch){
var self__ = this;
var reader__$1 = this;
if(cljs.core.truth_(self__.line_start_QMARK_)){
(self__.line = (self__.line - (1)));

(self__.column = self__.prev_column);
} else {
(self__.column = (self__.column - (1)));
}

(self__.line_start_QMARK_ = self__.prev);

if(cljs.core.truth_(ch)){
cljs.tools.reader.reader_types.drop_last_logged_char.call(null,cljs.core.deref.call(null,self__.frames));
} else {
}

return cljs.tools.reader.reader_types.unread.call(null,self__.rdr,ch);
}));

(cljs.tools.reader.reader_types.SourceLoggingPushbackReader.prototype.cljs$tools$reader$reader_types$IndexingReader$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.tools.reader.reader_types.SourceLoggingPushbackReader.prototype.cljs$tools$reader$reader_types$IndexingReader$get_line_number$arity$1 = (function (reader){
var self__ = this;
var reader__$1 = this;
return (self__.line | (0));
}));

(cljs.tools.reader.reader_types.SourceLoggingPushbackReader.prototype.cljs$tools$reader$reader_types$IndexingReader$get_column_number$arity$1 = (function (reader){
var self__ = this;
var reader__$1 = this;
return (self__.column | (0));
}));

(cljs.tools.reader.reader_types.SourceLoggingPushbackReader.prototype.cljs$tools$reader$reader_types$IndexingReader$get_file_name$arity$1 = (function (reader){
var self__ = this;
var reader__$1 = this;
return self__.file_name;
}));

(cljs.tools.reader.reader_types.SourceLoggingPushbackReader.getBasis = (function (){
return new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"rdr","rdr",190007785,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol(null,"not-native","not-native",-236392494,null)], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"line","line",1852876762,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"column","column",-576213674,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"line-start?","line-start?",1357012474,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"prev","prev",43462301,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"prev-column","prev-column",324083974,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),new cljs.core.Symbol(null,"file-name","file-name",-13685732,null),new cljs.core.Symbol(null,"frames","frames",-888748272,null)], null);
}));

(cljs.tools.reader.reader_types.SourceLoggingPushbackReader.cljs$lang$type = true);

(cljs.tools.reader.reader_types.SourceLoggingPushbackReader.cljs$lang$ctorStr = "cljs.tools.reader.reader-types/SourceLoggingPushbackReader");

(cljs.tools.reader.reader_types.SourceLoggingPushbackReader.cljs$lang$ctorPrWriter = (function (this__4428__auto__,writer__4429__auto__,opt__4430__auto__){
return cljs.core._write.call(null,writer__4429__auto__,"cljs.tools.reader.reader-types/SourceLoggingPushbackReader");
}));

/**
 * Positional factory function for cljs.tools.reader.reader-types/SourceLoggingPushbackReader.
 */
cljs.tools.reader.reader_types.__GT_SourceLoggingPushbackReader = (function cljs$tools$reader$reader_types$__GT_SourceLoggingPushbackReader(rdr,line,column,line_start_QMARK_,prev,prev_column,file_name,frames){
return (new cljs.tools.reader.reader_types.SourceLoggingPushbackReader(rdr,line,column,line_start_QMARK_,prev,prev_column,file_name,frames));
});

/**
 * Returns true if the reader satisfies IndexingReader
 */
cljs.tools.reader.reader_types.indexing_reader_QMARK_ = (function cljs$tools$reader$reader_types$indexing_reader_QMARK_(rdr){
if((!((rdr == null)))){
if(((false) || ((cljs.core.PROTOCOL_SENTINEL === rdr.cljs$tools$reader$reader_types$IndexingReader$)))){
return true;
} else {
return false;
}
} else {
return false;
}
});
/**
 * Creates a StringReader from a given string
 */
cljs.tools.reader.reader_types.string_reader = (function cljs$tools$reader$reader_types$string_reader(s){
return (new cljs.tools.reader.reader_types.StringReader(s,cljs.core.count.call(null,s),(0)));
});
/**
 * Creates a PushbackReader from a given string
 */
cljs.tools.reader.reader_types.string_push_back_reader = (function cljs$tools$reader$reader_types$string_push_back_reader(var_args){
var G__6774 = arguments.length;
switch (G__6774) {
case 1:
return cljs.tools.reader.reader_types.string_push_back_reader.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.tools.reader.reader_types.string_push_back_reader.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.tools.reader.reader_types.string_push_back_reader.cljs$core$IFn$_invoke$arity$1 = (function (s){
return cljs.tools.reader.reader_types.string_push_back_reader.call(null,s,(1));
}));

(cljs.tools.reader.reader_types.string_push_back_reader.cljs$core$IFn$_invoke$arity$2 = (function (s,buf_len){
return (new cljs.tools.reader.reader_types.PushbackReader(cljs.tools.reader.reader_types.string_reader.call(null,s),cljs.core.object_array.call(null,buf_len),buf_len,buf_len));
}));

(cljs.tools.reader.reader_types.string_push_back_reader.cljs$lang$maxFixedArity = 2);

cljs.tools.reader.reader_types.node_readable_push_back_reader = (function cljs$tools$reader$reader_types$node_readable_push_back_reader(readable){
return (new cljs.tools.reader.reader_types.PushbackReader((new cljs.tools.reader.reader_types.NodeReadableReader(readable,null)),cljs.core.object_array.call(null,(1)),(1),(1)));
});
/**
 * Creates an IndexingPushbackReader from a given string or PushbackReader
 */
cljs.tools.reader.reader_types.indexing_push_back_reader = (function cljs$tools$reader$reader_types$indexing_push_back_reader(var_args){
var G__6777 = arguments.length;
switch (G__6777) {
case 1:
return cljs.tools.reader.reader_types.indexing_push_back_reader.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.tools.reader.reader_types.indexing_push_back_reader.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.tools.reader.reader_types.indexing_push_back_reader.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.tools.reader.reader_types.indexing_push_back_reader.cljs$core$IFn$_invoke$arity$1 = (function (s_or_rdr){
return cljs.tools.reader.reader_types.indexing_push_back_reader.call(null,s_or_rdr,(1));
}));

(cljs.tools.reader.reader_types.indexing_push_back_reader.cljs$core$IFn$_invoke$arity$2 = (function (s_or_rdr,buf_len){
return cljs.tools.reader.reader_types.indexing_push_back_reader.call(null,s_or_rdr,buf_len,null);
}));

(cljs.tools.reader.reader_types.indexing_push_back_reader.cljs$core$IFn$_invoke$arity$3 = (function (s_or_rdr,buf_len,file_name){
return (new cljs.tools.reader.reader_types.IndexingPushbackReader(((typeof s_or_rdr === 'string')?cljs.tools.reader.reader_types.string_push_back_reader.call(null,s_or_rdr,buf_len):s_or_rdr),(1),(1),true,null,(0),file_name));
}));

(cljs.tools.reader.reader_types.indexing_push_back_reader.cljs$lang$maxFixedArity = 3);

/**
 * Creates a SourceLoggingPushbackReader from a given string or PushbackReader
 */
cljs.tools.reader.reader_types.source_logging_push_back_reader = (function cljs$tools$reader$reader_types$source_logging_push_back_reader(var_args){
var G__6780 = arguments.length;
switch (G__6780) {
case 1:
return cljs.tools.reader.reader_types.source_logging_push_back_reader.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.tools.reader.reader_types.source_logging_push_back_reader.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.tools.reader.reader_types.source_logging_push_back_reader.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.tools.reader.reader_types.source_logging_push_back_reader.cljs$core$IFn$_invoke$arity$1 = (function (s_or_rdr){
return cljs.tools.reader.reader_types.source_logging_push_back_reader.call(null,s_or_rdr,(1));
}));

(cljs.tools.reader.reader_types.source_logging_push_back_reader.cljs$core$IFn$_invoke$arity$2 = (function (s_or_rdr,buf_len){
return cljs.tools.reader.reader_types.source_logging_push_back_reader.call(null,s_or_rdr,buf_len,null);
}));

(cljs.tools.reader.reader_types.source_logging_push_back_reader.cljs$core$IFn$_invoke$arity$3 = (function (s_or_rdr,buf_len,file_name){
return (new cljs.tools.reader.reader_types.SourceLoggingPushbackReader(((typeof s_or_rdr === 'string')?cljs.tools.reader.reader_types.string_push_back_reader.call(null,s_or_rdr,buf_len):s_or_rdr),(1),(1),true,null,(0),file_name,cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"buffer","buffer",617295198),(new goog.string.StringBuffer()),new cljs.core.Keyword(null,"offset","offset",296498311),cljs.core.list((0))], null))));
}));

(cljs.tools.reader.reader_types.source_logging_push_back_reader.cljs$lang$maxFixedArity = 3);

/**
 * Reads a line from the reader or from *in* if no reader is specified
 */
cljs.tools.reader.reader_types.read_line = (function cljs$tools$reader$reader_types$read_line(rdr){
var c = cljs.tools.reader.reader_types.read_char.call(null,rdr);
var s = (new goog.string.StringBuffer());
while(true){
if(cljs.tools.reader.impl.utils.newline_QMARK_.call(null,c)){
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(s);
} else {
var G__6782 = cljs.tools.reader.reader_types.read_char.call(null,rdr);
var G__6783 = s.append(c);
c = G__6782;
s = G__6783;
continue;
}
break;
}
});
cljs.tools.reader.reader_types.source_logging_reader_QMARK_ = (function cljs$tools$reader$reader_types$source_logging_reader_QMARK_(rdr){
return (rdr instanceof cljs.tools.reader.reader_types.SourceLoggingPushbackReader);
});
/**
 * Returns true if rdr is an IndexingReader and the current char starts a new line
 */
cljs.tools.reader.reader_types.line_start_QMARK_ = (function cljs$tools$reader$reader_types$line_start_QMARK_(rdr){
if(cljs.tools.reader.reader_types.indexing_reader_QMARK_.call(null,rdr)){
return ((1) === cljs.tools.reader.reader_types.get_column_number.call(null,rdr));
} else {
return null;
}
});
cljs.tools.reader.reader_types.log_source_STAR_ = (function cljs$tools$reader$reader_types$log_source_STAR_(reader,f){
var buffer = new cljs.core.Keyword(null,"buffer","buffer",617295198).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,reader.frames));
try{cljs.core.swap_BANG_.call(null,reader.frames,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"offset","offset",296498311)], null),cljs.core.conj,buffer.getLength());

var ret = f.call(null);
if((((!((ret == null))))?(((((ret.cljs$lang$protocol_mask$partition0$ & (131072))) || ((cljs.core.PROTOCOL_SENTINEL === ret.cljs$core$IMeta$))))?true:false):false)){
return cljs.tools.reader.reader_types.merge_meta.call(null,ret,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"source","source",-433931539),cljs.tools.reader.reader_types.peek_source_log.call(null,cljs.core.deref.call(null,reader.frames))], null));
} else {
return ret;
}
}finally {cljs.core.swap_BANG_.call(null,reader.frames,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"offset","offset",296498311)], null),cljs.core.rest);
}});
