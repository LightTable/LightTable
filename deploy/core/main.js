/*jshint esversion: 6 */
"use strict";

const {
    app,
    BrowserWindow,
    ipcMain
} = require('electron');


let yargs = require('yargs');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var windows = {};
global.browserOpenFiles = []; // Track files for open-file event

var packageJSON = require(__dirname + '/package.json');

// Returns Window object
function createWindow() {
    let browserWindowOptions = packageJSON.browserWindowOptions;
    browserWindowOptions.icon = __dirname + '/' + browserWindowOptions.icon;
    let window = new BrowserWindow(browserWindowOptions);
    windows[window.id] = window;
    window.webContents.toggleDevTools();
    window.focus();
    window.webContents.on("will-navigate", function(e) {
        e.preventDefault();
        window.webContents.send("app", "will-navigate");
    });

    if (process.platform == 'win32') {
        window.on("blur", function() {
            if (window.webContents)
                window.webContents.send("app", "blur");
        });
        window.on("focus", function() {
            if (window.webContents)
                window.webContents.send("app", "focus");
        });
    } else {
        window.on("blur", function() {
            window.webContents.send("app", "blur");
        });
        window.on("focus", function() {
            window.webContents.send("app", "focus");
        });
    }
    window.on("devtools-opened", function() {
        window.webContents.send("devtools", "disconnect");
    });
    window.on("devtools-closed", function() {
        window.webContents.send("devtools", "reconnect!");
    });

    // and load the index.html of the app.
    window.loadURL('file://' + __dirname + '/LightTable.html?id=' + window.id);

    // Notify LT that the user requested to close the window/app
    window.on("close", function(evt) {
        window.webContents.send("app", "close!");
        evt.preventDefault();
    });

    // Emitted when the window is closed.
    window.on('closed', function() {
        windows[window.id] = null;
    });

    return window;
}

function onReady() {
    ipcMain.on("createWindow", function(event, info) {
        createWindow();
    });

    ipcMain.on("initWindow", function(event, id) {
        // Moving this to createWindow() causes js loading issues
        windows[id].on("focus", function() {
            windows[id].webContents.send("app", "focus");
        });
    });

    ipcMain.on("toggleDevTools", function(event, windowId) {
        if (windowId && windows[windowId]) {
            windows[windowId].toggleDevTools();
        }
    });

    createWindow();
}

function parseArgs() {
    yargs.usage("\nLight Table " + app.getVersion() + "\n" +
        // TODO: Use a consistent name for executables or vary executable
        // name per platform. $0 currently gives an unwieldy name
        "Usage: light [options] [path ...]\n\n" +
        "Paths are either a file or a directory.\n" +
        "Files can take a line number e.g. file:line.");
    yargs.alias('h', 'help').boolean('h').describe('h', 'Print help');
    yargs.alias('a', 'add').boolean('a').describe('a', 'Add path(s) to workspace');
    global.browserParsedArgs = yargs.parse(process.argv);

    if (global.browserParsedArgs.help) {
        yargs.showHelp();
        process.exit(0);
    }
}

function start() {
    app.commandLine.appendSwitch('remote-debugging-port', '8315');
    app.commandLine.appendSwitch('js-flags', '--harmony');

    // This method will be called when electron has done everything
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
        } else {
            global.browserOpenFiles.push(path);
        }
    });
    parseArgs();
}

// Set $IPC_DEBUG to debug incoming and outgoing ipcMain messages for the main process
if (process.env["IPC_DEBUG"]) {
    let oldOn = ipcMain.on;
    ipcMain.on = function(channel, cb) {
        oldOn.call(ipcMain, channel, function() {
            console.log("\t\t\t\t\t->MAIN", channel, Array.prototype.slice.call(arguments).join(', '));
            cb.apply(null, arguments);
        });
    };
    let logSend = function(window) {
        let oldSend = window.webContents.send;
        window.webContents.send = function() {
            console.log("\t\t\t\t\tMAIN->", Array.prototype.slice.call(arguments).join(', '));
            oldSend.apply(window.webContents, arguments);
        };
    };
    let oldCreateWindow = createWindow;
    createWindow = function() {
        logSend(oldCreateWindow());
    };
}

start();