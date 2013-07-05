(function(window) {

  var start = (new Date()).getTime();
  var fs = require("fs");
  var walk = require("walkdir");

  var head = window.document.querySelector("head");
  var body = window.document.querySelector("body");

  process.on("uncaughtException", uncaughtError);
  window.onerror = uncaughtError;

  function uncaughtError(e) {
    console.log("ERROR: " + e);
    console.log(e.stack);
  }

  function appendScript(path, isFile) {
    script= document.createElement('script');
    script.type= 'text/javascript';
    script.async = false;
    if(isFile) {
      path = "file://" + path;
    }
    script.src= path;
    body.appendChild(script);
    return script;
  }

  function appendCss(path, isFile) {
    css = document.createElement('link');
    css.type= 'text/css';
    if(isFile) {
      path = "file://" + path;
    }
    css.rel = "stylesheet";
    css.href = path;
    head.appendChild(css);
    return css;
  }

  function ext(path) {
    var i = path.lastIndexOf(".");
    var ext = path.substring(i+1);
    return ext;
  }

  function hasExt(path, exts) {
    var e = ext(path);
    for(var i in exts) {
      if ( e == exts[i] ) return true;
    }
    return false;
  }

  function readParse(json) {
    try {
      var code = fs.readFileSync(json);
    } catch (e) {
      return null;
    }
    return JSON.parse(code);
  }

  function asVersion(str) {
    var v = str.split(".");
    return {major: parseInt(v[0]), minor: parseInt(v[1]), patch: parseInt(v[2])};
  }

  function compareVersions(nstr, ostr) {
    var nv = asVersion(nstr);
    var ov = asVersion(ostr);
    // 0.2.3 0.3.4
    if( nv.major > ov.major ) return true;
    if( nv.major == ov.major && nv.minor > ov.minor) return true;
    if( nv.major == ov.major && nv.minor == ov.minor && nv.patch >= ov.patch) return true;

    return false;
  }

  compareVersions("0.3.9", "0.3.10");

  function newerVersion(n,o) {
    if(!n) {
      return false;
    } else if(!o) {
      return true;
    }

    return compareVersions(n.version, o.version);
  }

  try {
  var home = "";

  if (process.env.LTHOME) {
    home = process.env.LTHOME;
  } else if (process.platform == "win32") {
    home = process.env.USERPROFILE;
  } else {
    home = process.env.HOME;
  }

  var ltcore = home + "/.lighttable/";
  var root = "";

  var ltversion = readParse(ltcore + "version.json");
  var localversion = readParse("deploy/version.json");

  var ltbootstrap = ltcore + "js/bootstrap.js";
  var depbootstrap = "deploy/js/bootstrap.js";

  var upToDate = newerVersion(ltversion, localversion);

  if(upToDate) {
    root = ltcore;
    isFile = true;
  } else {
    root = "deploy/";
    isFile = false;
  }

  if(process.env.LTLOCAL) {
    //console.debug("Using local files");
    root = process.env.LTLOCAL;
    isFile = true;
    upToDate = false;
  }

  //console.debug("Root is: " + root);

  var bootstrap = root + "js/bootstrap.js";
  var order = JSON.parse(fs.readFileSync(root + "order.json"));

  order.forEach(function(path) {
    if(hasExt(path, ["css"])) appendCss(root + path, isFile);
    if(hasExt(path, ["js"])) appendScript(root + path, isFile);
  });

  var win = require("nw.gui").Window.get();
  if(localStorage.width) {
    win.resizeTo(parseInt(localStorage.width), parseInt(localStorage.height));
    win.moveTo(parseInt(localStorage.x), parseInt(localStorage.y));
  }
  win.show();

  /* ready to go - let's load bootstrap */
  if(fs.existsSync(bootstrap)) {
    var script = appendScript(bootstrap, isFile);
    script.onload = function() {
        try {
            lt.objs.app.init();
        } catch (e) {
            uncaughtError(e);
        }
    }
  }

  window.setup = {version: "0.3.0",
                  compareVersions: compareVersions,
                  startTime: start,
                  upToDate: upToDate,
                  uncaughtError: uncaughtError};
  } catch (e) {
    uncaughtError(e);
  }

})(window);

