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
    console.log("here");
    if(windowId && windows[windowId]) {
      windows[windowId].toggleDevTools();
    }
  });

  createWindow();
});
