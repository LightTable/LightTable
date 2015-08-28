## Intro

Please read [Electron's Quick start](https://github.com/atom/electron/blob/master/docs/tutorial/quick-start.md). The rest of this document assumes you've read it.

## Electron App Layout

Light Table's Electron app has the following layout:

```
deploy/core/
├── package.json
├── main.js
├── LightTable.html
├── node_modules/
└── ../../src/
```

Description of each file/directory:

* [package.json](../deploy/core/package.json) - This is a manifest file that sets the name, version and the js file to start the main process. To learn more about how Electron uses it [read the source](https://github.com/atom/electron/blob/c441dd143690aab71a925f0b941a6d9760768fa5/atom/browser/lib/init.coffee#L62).
   * Our package.json has an additional 'browserWindowOptions' key. This key is used by the main process to set [BrowserWindow](https://github.com/atom/electron/blob/master/docs/api/browser-window.md) options. This is placed in package.json because it is a declaration of an Electron app, like the rest of the file.
* [main.js](../deploy/core/main.js) - This is the heart of the main process. _All_ GUI interactions run through this file. This also handles the CLI. Recommend understanding this file.
* [LightTable.html](../deploy/core/LightTable.html) - This is the web page we see as our editor. It lives in the renderer process.
* [node\_modules](../deploy/core/node_modules) - These are node packages used by the renderer process. These are described in [this doc](../doc/for-committers.md#node-packages)
* [../../src/](../src) - This is the ClojureScript code that is run in the renderer process. It is [loaded by LightTable.html](https://github.com/LightTable/LightTable/blob/8e8d20a5da5d2ee42db4ff761eb2cd15a2c178b2/deploy/core/LightTable.html#L24-L40).

## Miscellaneous Pointers

* Communication between `main.js` (main process) and ClojureScript code (renderer process) happens through [ipc messages](https://github.com/atom/electron/blob/master/docs/api/ipc-main-process.md) and [remote objects](https://github.com/atom/electron/blob/master/docs/api/remote.md).
  * For example, when a window [receives a focus event](https://github.com/LightTable/LightTable/blob/686c9b1e5e24fcb08ff44eb57eb7889e31e37806/deploy/core/main.js#L33-L36), the main process sends an ipc message on the "app" channel to the renderer process. The renderer process [receives that message](https://github.com/LightTable/LightTable/blob/686c9b1e5e24fcb08ff44eb57eb7889e31e37806/src/lt/objs/app.cljs#L228) and invokes a :focus trigger on the app object.
* We use [webview](https://github.com/atom/electron/blob/master/docs/api/web-view-tag.md) for our browser.
* We use [remote-debugging-port](https://github.com/atom/electron/blob/1bc49487add140f22ea4e454dcb0050e08679b4b/docs/api/chrome-command-line-switches.md#--remote-debugging-portport) to do browser eval.

## Additional Links

* [Electron docs](https://github.com/atom/electron/tree/master/docs) - Modules to know: browser-window, app, dialog, ipc, remote
* [Mature ClojureScript Electron app](https://github.com/oakmac/cuttle)
* [Our ipc util fns](https://github.com/LightTable/LightTable/blob/master/src/lt/util/ipc.cljs)
