var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var dialog = require("dialog");
var ipc = require("ipc");
var fs = require('fs');

// Report crashes to our server.
// require('crash-reporter').tart();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var windows = {};

app.commandLine.appendSwitch('remote-debugging-port', '8315');

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  app.quit();
});

var browserWindowOptions = require(__dirname + '/../package.json').browserWindowOptions;

function createWindow() {
  var window = new BrowserWindow(browserWindowOptions);
  windows[window.id] = window;
  window.on("focus", function() {
    window.webContents.send("focus", "focus");
  });
  window.on("blur", function() {
    if (window.webContents)
      window.webContents.send("blur", "blur");
  });
  window.on("devtools-opened", function() {
    window.webContents.send("devtools-opened", "opened");
  });
  window.on("devtools-closed", function() {
    window.webContents.send("devtools-closed", "closed");
  });

  windowClosing = false;
  window.on("close", function(e) {
    if (!windowClosing) {
      e.preventDefault();
      window.webContents.send("app", "close!");
    }
  });

  // and load the index.html of the app.
  window.loadUrl('file://' + __dirname + '/LightTable.html?id=' + window.id);

  // Emitted when the window is closed.
  window.on('closed', function() {
    windows[window.id] = null;
  });

  return window;
}

// This method will be called when atom-shell has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
  ipc.on("createWindow", function(event, info) {
    createWindow();
  });

  ipc.on("closeWindow", function(event, id) {
    // This feels like a bad hack
    windowClosing = true;
    if(id && windows[id]) {
      windows[id].close();
    }
    windowClosing = false;
  });

  ipc.on("toggleDevTools", function(event, windowId) {
    if(windowId && windows[windowId]) {
      windows[windowId].toggleDevTools();
    }
  });

  // Generic IPC callback utilities

  function win(wid) {
    return wid && windows[wid];
  }

  function catargs(a, args) {
    for (var i = 0; i < args.length; i++) {
      a[a.length] = args[i];
    }
    return a;
  }

  function argify1(arg, data) {
    if (arg == ":lt.util.ipc/win") {
      return data.win;
    }
    return arg;
  }

  function modulify(arg, data) {
    arg = argify1(arg, data);
    if (typeof arg == 'string')
      arg = require(arg);
    return arg;
  }

  function argify(args, data) {
    for (var i = 0; i < args.length; i++) {
      args[i] = argify1(args[i], data);
    }
    return args;
  }

  ipc.on(":lt.util.ipc/callback", function(e, wid,
                                            mod, func, args,
                                            target, method) {
    if (win(wid)) {
      data = {win: win(wid)};
      mod = modulify(mod, data);
      args = argify(args, data);

      args[args.length] = function() {
        if (win(wid)) {
          var argList = [":lt.util.ipc/callback", target, method];
          catargs(argList, arguments);
          var wc = win(wid).webContents;
          wc.send.apply(wc, argList);
        }
      };
      mod[func].apply(mod, args);
    }
  });

  createWindow();
});
