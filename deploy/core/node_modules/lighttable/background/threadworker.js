var fs = require("fs");
var funcs = {};
var ltpath = "";

var _send = function(obj, msg, res, format) {
  format = format || "json";
  process.send({msg: cljs.core.name(msg), res: res, obj:obj, format: format});
};

var argsArray = function(args) {
  var final = [];
  for(var i = 0; i < args.length; i++) {
    final.push(args[i]);
  }
  return final;
};

var lttools = {
  watch: function(exp, meta) {
    _send(meta.obj, cljs.core.keyword(meta.ev), cljs.core.pr_str(cljs.core.js__GT_clj({result: exp, meta: meta}, cljs.core.keyword("keywordize-keys"), true)), "clj");
  }
};

process.on("message", function(m) {
  try {
    switch(m.msg) {
      case "init":
        ltpath = m.ltpath;
        global.eval(fs.readFileSync(ltpath + "/core/node_modules/clojurescript/cljsDeps.js").toString());
        cljs.core._STAR_print_fn_STAR_ = function(x) {
          var final = clojure.string.trim(x);
          if(x != "\n") {
            console.log(final);
          }
        };
        _send(m.obj, "connect");
        break;
      case "register":
        eval("funcs['" + m.name + "'] = " + m.func);
        break;
      case "call":
        m.params.unshift(m);
        funcs[m.name].apply(null, m.params);
        break;
    }
  } catch (e) {
    console.error(e.stack);
  }
});

