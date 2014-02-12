(function(window) {

  var fromMessage = function(message) {
    return {client: message[0],
            command: message[1],
            data: message[2]};
  };

  var toMessage = function(prev, command, data) {
    return [prev.client,
            command,
            data];
  };

  var cache = [];

  function replacer(key, value) {
    if(cache.length > 20) {
      return;
    }
    if(window.jQuery && value instanceof jQuery) {
      return "[jQuery $(" + value.selector + ")]";
    }
    if(value instanceof Element) {
      return "[Element " + value.tagName.toLowerCase() + (value.id != "" ? "#" : "") + value.id + "]";
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

  var thisScript = document.getElementById("lt_ws");
  var parts = thisScript.src.split(":");
  if(parts.length > 2) {
    var host = parts[0]+":"+parts[1];
    var port = parts[2].split("/")[0];
  } else {
    var host = parts[0];
    var port = parts[1].split("/")[0];
  }

  function init() {
    var socket = io.connect(host + ':' + port);

    socket.on("connect", function() {
      socket.emit("init", {name: window.location.host || window.title || window.location.href,
                           types: ["js","css","html"],
                           commands: ["editor.eval.js",
                                      "editor.eval.cljs.exec",
                                      "editor.eval.html",
                                      "editor.eval.css"]});
    });


    socket.on('client.close', function(message) {
      socket.disconnect();
    });

    socket.on('editor.eval.css', function (message) {
      var prev = fromMessage(message);
      var name =  prev.data.name.replace(".", "-");
      var existing = document.querySelector("#" + name);

      if(existing) {
        existing.parentNode.removeChild(existing);
      }

      var neue = document.createElement("style");
      neue.id = name;
      neue.type = "text/css";
      neue.innerHTML = prev.data.code;

      document.head.appendChild(neue);

      socket.emit("result",  toMessage(prev, "editor.eval.css.result", {result: name}));
    });

    socket.on('editor.eval.html', function (message) {
      var prev = fromMessage(message);
      socket.emit("result",  toMessage(prev, "editor.eval.html.success", null));
      document.location.reload(true);
    });

    socket.on('editor.eval.js', function (message) {
      var prev = fromMessage(message);
      try {
        var res = eval.call(window, prev.data.code);
        socket.emit("result", toMessage(prev,"editor.eval.js.result", {result: safeStringify(res), meta: prev.data.meta, "no-inspect": true}));
      } catch (e) {
        var ex = e.toString();
        if(e.stack) {
          ex = e.stack;
        }
        socket.emit("result",  toMessage(prev, "editor.eval.js.exception", {ex: ex, meta: prev.data.meta}));
      }
    });

    socket.on('editor.eval.cljs.exec', function (message) {
      var prev = fromMessage(message);
      for(var i = 0; i < prev.data.results.length; i++) {
        var data = prev.data.results[i];
        var meta = prev.data.results[i].meta;
        meta.verbatim = true;
        try {
          var res = eval.call(window, prev.data.results[i].code);
          socket.emit("result", toMessage(prev, "editor.eval.cljs.result", {result: cljs.core.pr_str(res), meta: meta}));
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
          socket.emit("result", toMessage(prev, "editor.eval.cljs.exception", {ex: error, meta: meta}));
        }
      }
    });


    window.lttools = {
      watch: function(exp, meta) {
        if(meta.ev == "editor.eval.cljs.watch") {
          var final = cljs.core.pr_str(exp);
        } else {
          meta["no-inspect"] = true;
          var final = safeStringify(exp);
        }
        socket.emit("result", toMessage({}, "clients.raise-on-object", [meta.obj, meta.ev, {result: final, meta: meta}]))
        return exp;
      }
    };
  }

  function loadScript(sScriptSrc,callbackfunction) {
    var oHead = document.getElementsByTagName('head')[0];
    var oScript = document.createElement('script');
    oScript.setAttribute('src',sScriptSrc);
    oScript.setAttribute('type','text/javascript');
    var loadFunction = function() {
      if (this.readyState == 'complete' || this.readyState == 'loaded') {
        callbackfunction();
      }
    };
    oScript.onreadystatechange = loadFunction;
    oScript.onload = callbackfunction;
    oHead.appendChild(oScript);
  }



  if(window.io) {
    init();
  } else {
    loadScript(host + ":" + port + "/socket.io/socket.io.js", init);
  }

})(window);
