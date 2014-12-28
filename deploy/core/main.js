"use strict";

var app = require('app'),  // Module to control application life.
    BrowserWindow = require('browser-window'),  // Module to create native browser window.
    dialog = require("dialog"),
    ipc = require("ipc"),
    fs = require('fs'),
    optimist = require('optimist');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var windows = {};
var openFiles = []; // Track files for open-file event

var packageJSON = require(__dirname + '/../package.json');
var parsedArgs, windowClosing; // vars used by multiple functions

function createWindow() {
  var browserWindowOptions = packageJSON.browserWindowOptions;
  browserWindowOptions.icon = __dirname + '/' + browserWindowOptions.icon;
  var window = new BrowserWindow(browserWindowOptions);
  windows[window.id] = window;
  window.focus();

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
};

function onReady() {
  ipc.on("createWindow", function(event, info) {
    createWindow();
  });

  ipc.on("initWindow", function(event, id) {
    windows[id].webContents.send('cli', parsedArgs);
    windows[id].webContents.send('openFile', openFiles);
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
      var data = {win: win(wid)};
      mod = modulify(mod, data);
      args = argify(args, data);

      args[args.length] = function() {
        if (win(wid)) {
          var argList = [":lt.util.ipc/callback", target, method];
          catargs(argList, arguments);
          var wc = win(wid).webContents;
          if (wc) {
            wc.send.apply(wc, argList);
          }
        }
      };
      mod[func].apply(mod, args);
    }
  });

  createWindow();
};

function parseArgs() {
  optimist.usage("Light Table " + packageJSON.version + "\n" +
                 // TODO: Use a consistent name for executables or vary executable
                 // name per platform. $0 currently gives an unwieldy name
                 "Usage: light [options] [path ...]\n\n"+
                 "Paths are either a file or a directory.\n"+
                 "Files can take a line number e.g. file:line.");
  optimist.alias('h', 'help').boolean('h').describe('h', 'Print help');
  optimist.alias('a', 'add').boolean('a').describe('a', 'Add path(s) to workspace');
  parsedArgs = optimist.parse(process.argv);

  if (parsedArgs.help) {
    optimist.showHelp();
    process.exit(0);
  }
}

function start() {
  app.commandLine.appendSwitch('remote-debugging-port', '8315');
  app.commandLine.appendSwitch('js-flags', '--harmony');

  // This method will be called when atom-shell has done everything
  // initialization and ready for creating browser windows.
  app.on('ready', onReady);

  // Quit when all windows are closed.
  app.on('window-all-closed', function() {
    app.quit();
  });

  // open-file operates in two modes - before and after startup.
  // On startup and before a window has opened, event paths are
  // saved and then opened once windows are available.
  // After startup, event paths are sent to available windows.
  app.on('open-file', function(event, path) {
    if (Object.keys(windows).length > 0) {
      Object.keys(windows).forEach(function(id) {
        windows[id].webContents.send('openFileAfterStartup', path);
      });
    }
    else {
      openFiles.push(path);
    }
  });
  parseArgs();
};

start();
