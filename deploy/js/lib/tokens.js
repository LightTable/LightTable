var ignores = {"number": true, "\n": true};
  function gatherTokens (cm) {
    var outer = cm.getMode(), text = cm.getValue().split("\n");
    var state = CodeMirror.copyState(outer, cm.getTokenAt({line: 0, ch:0}).state);
    var tabSize = cm.getOption("tabSize");

    var tokens = {};
    for (var i = 0; i < text.length; ++i) {
      var stream = new CodeMirror.StringStream(text[i], tabSize);
      while (!stream.eol()) {
        var inner = CodeMirror.innerMode(outer, state);
        var style = outer.token(stream, state), cur = stream.current();
        stream.start = stream.pos;
        if(style && !ignores[style] && !ignores[cur]) {
         tokens[cur] = true;
        }
      }
    }
    tokens = Object.keys(tokens);
    tokens.sort();
    return tokens;

  }