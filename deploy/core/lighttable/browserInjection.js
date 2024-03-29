(function(window) {

  const { ipcMain, ipcRenderer } = require('electron');

  function toArray(arrayLike) {
    var final = [];
    for(var i = 0, len = arrayLike.length; i < len; i++) {
      final.push(arrayLike.item(i));
    }
    return final;
  }

  ipcMain.on("editor.eval.css", function(args) {
    var nodeName = args.name.replace(/\./, "-");
    var code = args.code;
    var styleElem = document.createElement("style");
    styleElem.type = "text/css"
    styleElem.id = nodeName;
    styleElem.innerHTML = code;
    var prev = document.getElementById(nodeName);
    if(prev) {
      prev.parentNode.removeChild(prev);
    } else {
      var link = toArray(document.head.querySelectorAll("link")).filter(function(cur) {
        return cur.href.indexOf(args.name) > -1;
      });
      if(link[0]) {
        link[0].parentNode.removeChild(link[0]);
      }
    }
    document.head.appendChild(styleElem);
  });


  ipcMain.on("editor.eval.cljs.exec", function(args) {
      for(var i = 0; i < args.results.length; i++) {
        var data = args.results[i];
        var meta = args.results[i].meta;
        meta.verbatim = true;
        try {
          var res = eval.call(window, args.results[i].code);
          if(window.cljs) {
            ipcRenderer.sendToHost("browser-raise", [args.client, "editor.eval.cljs.result", {result: cljs.core.pr_str(res), meta: meta}]);
          } else {
            ipcRenderer.sendToHost("browser-raise", [args.client, "editor.eval.cljs.result", {result: safeStringify(res), meta: meta}]);
          }
        } catch (e) {
          var exdata = cljs.core.ex_data(e);
          var error = "";
          if (exdata) {
            error = e.message + ": " + cljs.core.pr_str(exdata);
          } else {
            error = cljs.core.pr_str(e);
          }

          if(e.stack) {
            error += "\n" + e.stack;
          }
          ipcRenderer.sendToHost("browser-raise", [args.client, "editor.eval.cljs.exception", {ex: error, meta: meta}]);
        }
      }
  });

  window.addEventListener("hashchange", function(e) {
    ipcRenderer.sendToHost("browser-event", ["hashchange", {href: window.location.href, hash: window.location.hash}]);
  });

  function replacer(key, value) {
    if(window.jQuery && value instanceof jQuery) {
      return "[jQuery $(" + value.selector + ")]";
    }
    if(value instanceof Element) {
      return "[Element " + value.tagName.toLowerCase() + (value.id != "" ? "#" : "") + value.id + "]";
    }
    if(value instanceof Array) {
      return value;
    }
    if(typeof(value) == "object") {
      if(cache.indexOf(value) > -1) {
        return "circular";
      }
      cache.push(value);
      return value;
    }
    if(typeof value == "function") {
      return "[function]";
    }
    return value;
  }

  function safeStringify(res) {
    cache = [];
    return JSON.stringify(res, replacer);
  }

  window.lttools = {
    watch: function(exp, meta) {
      if(meta.ev == "editor.eval.cljs.watch") {
        var final = cljs.core.pr_str(exp);
      } else {
        meta["no-inspect"] = true;
        var final = safeStringify(exp);
      }
      ipcRenderer.sendToHost("browser-raise", [meta.obj, meta.ev, {result: final, meta: meta}]);
      return exp;
    }
  }


})(window);
