var opposites = {
  "(": ")",
  "[": "]",
  "{": "}",
  ")": "(",
  "]": "[",
  "}": "{"
};

var chars = /[^\s\)\]\}]/;

//{:+ {:app [:foo (:blah "asdf" {:foo 234}) :zomg]}}
//var example = "{:+ {:app [(:lt.objs.style/set-skin \"dark\")\n           (:lt.plugins.vim/map-keys {\"-\" \"$\",\n                                      \"0\" \"^\",\n                                      \"<BS>\" \"<PageUp>\",\n                                      \"<Space>\" \"<PageDown>\",\n                                      \"j\" \"gj\",\n                                      \"k\" \"gk\"})\n           :lt.objs.intro/show-new-file \n           ],\n\n     :editor [:lt.plugins.vim/activate-vim\n              :lt.objs.editor/no-wrap\n              :lt.plugins.rainbow-parens/rainbow-parens\n              :lt.plugins.auto-complete/auto-show-on-input\n              (:lt.objs.style/set-theme \"ibdknox\")],\n\n     :editor.behaviors [:lt.plugins.rainbow-parens/rainbow-parens],\n\n     :editor.clj [:lt.plugins.rainbow-parens/rainbow-parens],\n\n     :editor.clj.instarepl [:lt.plugins.rainbow-parens/rainbow-parens\n                            (:lt.objs.langs.clj/print-length 1000)],\n\n     :editor.cljs [:lt.plugins.rainbow-parens/rainbow-parens],\n\n     :editor.javascript [(:lt.plugins.jshint/jshint-options {:maxparams false})\n                         :lt.plugins.jshint/on-save],\n\n     :editor.keymap [:lt.plugins.rainbow-parens/rainbow-parens],\n\n     :editor.markdown [:lt.objs.editor/wrap],\n\n     :editor.plaintext [:lt.objs.editor/wrap],\n\n     :editor.python [(:lt.objs.style/set-theme \"tomorrow-night\")],\n\n     :files [(:lt.objs.files/file-types [{:exts [:wisp],\n                                          :mime \"text/x-clojurescript\",\n                                          :name \"Wisp\",\n                                          :tags [:editor.wisp]}])]},\n\n :- {:app [:lt.objs.intro/show-intro]}}\n";


//{:+ {:app {"a" [:foo]}}}

// parseFlat(new CodeMirror.StringStream("[[:app :foo :bar] [:zomg :baz 234 \"hi how are you?\"]]"));
function parseFlat(stream) {

  var state = { level: 0, stack: []};
  var errors = [];
  var entries = [];
  var curEntry;

  stream.eatSpace();
  while(stream.peek()) {
    var ch = stream.next();

    if (ch == "\"") {
      stream.start = stream.pos - 1;
      state.mode = "string";
      var pos = stream.pos;
      var next, escaped = false;
      while ((next = stream.next()) != null) {
        if (next == "\"" && !escaped) {

          state.mode = false;
          break;
        }
        escaped = !escaped && next == "\\";
      }

      if(state.level === 2) {
        curEntry.tokens.push({start: stream.start, end: stream.pos, value: stream.current(), type: "string"});
      }

    } else if (ch == ";") { // comment
      stream.skipTo("\n"); // rest of the line is a comment

    } else if (ch == "(" || ch == "[" || ch == "{") {
      state.stack.push({type: ch, pos: stream.pos});
      state.level++;
      if(state.level === 2) {
        curEntry = {start: stream.pos - 1,
                    tokens: []};
        entries.push(curEntry);
      } else if(state.level === 3) {
        curEntry.tokens.push({start: stream.pos - 1,
                              type: "collection",
                              tokens: []});
      } else if(state.level === 4) {
        var lastToken = curEntry.tokens[curEntry.tokens.length - 1];
        lastToken.tokens.push({start: stream.pos - 1,
                              type: "collection",
                              tokens: []});
      }

    } else if (ch == ")" || ch == "]" || ch == "}") {
      if(state.stack.length && state.stack[state.stack.length - 1].type == opposites[ch]) {
        state.stack.pop();
        state.level--;

        if(state.level === 1) {
          curEntry.end = stream.pos;
        } else if(state.level === 2) {
          curEntry.tokens[curEntry.tokens.length - 1].end = stream.pos;
          stream.start = stream.pos;
        } else if(state.level === 3) {
          var lastToken = curEntry.tokens[curEntry.tokens.length - 1];
          lastToken.tokens[lastToken.tokens.length - 1].end = stream.pos;
          stream.start = stream.pos;
        }

      } else {
        var expected = "the end of the file";
        if(state.stack[state.stack.length - 1]) {
          var expected = opposites[state.stack[state.stack.length - 1].type];
        }
        errors.push({error: "Unmatched delimiter " + ch + " expected to see " + expected + "", from: stream.start, to: stream.pos});
      }


    } else if ( ch == ":" ) {
      stream.start = stream.pos - 1;
      stream.eatWhile(chars);
      if(state.level === 2) {
        curEntry.tokens.push({start: stream.start, end: stream.pos, value: stream.current(), type: "keyword"});
      } else if(state.level === 3) {
        var lastToken = curEntry.tokens[curEntry.tokens.length - 1];
        lastToken.tokens.push({start: stream.start, end: stream.pos, value: stream.current(), type: "keyword"});
      }
      stream.start = stream.pos;
    } else if(ch.match(chars)) {
      stream.start = stream.pos - 1;
      var pos = stream.pos;
      stream.eatWhile(chars);
      if(state.level === 2) {
        curEntry.tokens.push({start: stream.start, end: stream.pos, value: stream.current(), type: "atom"});
      } else if(state.level === 3) {
        var lastToken = curEntry.tokens[curEntry.tokens.length - 1];
        lastToken.tokens.push({start: stream.start, end: stream.pos, value: stream.current(), type: "keyword"});
      }
      stream.start = stream.pos;
    }
  }

  return {errors: errors, entries: entries};
}

exports.parseFlat = parseFlat;
