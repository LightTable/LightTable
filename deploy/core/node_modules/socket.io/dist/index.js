"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Namespace = exports.Socket = exports.Server = void 0;
const http = require("http");
const fs_1 = require("fs");
const zlib_1 = require("zlib");
const accepts = require("accepts");
const stream_1 = require("stream");
const path = require("path");
const engine = require("engine.io");
const client_1 = require("./client");
const events_1 = require("events");
const namespace_1 = require("./namespace");
Object.defineProperty(exports, "Namespace", { enumerable: true, get: function () { return namespace_1.Namespace; } });
const parent_namespace_1 = require("./parent-namespace");
const socket_io_adapter_1 = require("socket.io-adapter");
const parser = __importStar(require("socket.io-parser"));
const debug_1 = __importDefault(require("debug"));
const socket_1 = require("./socket");
Object.defineProperty(exports, "Socket", { enumerable: true, get: function () { return socket_1.Socket; } });
const typed_events_1 = require("./typed-events");
const debug = debug_1.default("socket.io:server");
const clientVersion = require("../package.json").version;
const dotMapRegex = /\.map/;
class Server extends typed_events_1.StrictEventEmitter {
    constructor(srv, opts = {}) {
        super();
        /**
         * @private
         */
        this._nsps = new Map();
        this.parentNsps = new Map();
        if ("object" === typeof srv &&
            srv instanceof Object &&
            !srv.listen) {
            opts = srv;
            srv = undefined;
        }
        this.path(opts.path || "/socket.io");
        this.connectTimeout(opts.connectTimeout || 45000);
        this.serveClient(false !== opts.serveClient);
        this._parser = opts.parser || parser;
        this.encoder = new this._parser.Encoder();
        this.adapter(opts.adapter || socket_io_adapter_1.Adapter);
        this.sockets = this.of("/");
        this.opts = opts;
        if (srv)
            this.attach(srv);
    }
    serveClient(v) {
        if (!arguments.length)
            return this._serveClient;
        this._serveClient = v;
        return this;
    }
    /**
     * Executes the middleware for an incoming namespace not already created on the server.
     *
     * @param name - name of incoming namespace
     * @param auth - the auth parameters
     * @param fn - callback
     *
     * @private
     */
    _checkNamespace(name, auth, fn) {
        if (this.parentNsps.size === 0)
            return fn(false);
        const keysIterator = this.parentNsps.keys();
        const run = () => {
            const nextFn = keysIterator.next();
            if (nextFn.done) {
                return fn(false);
            }
            nextFn.value(name, auth, (err, allow) => {
                if (err || !allow) {
                    run();
                }
                else {
                    fn(this.parentNsps.get(nextFn.value).createChild(name));
                }
            });
        };
        run();
    }
    path(v) {
        if (!arguments.length)
            return this._path;
        this._path = v.replace(/\/$/, "");
        const escapedPath = this._path.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
        this.clientPathRegex = new RegExp("^" +
            escapedPath +
            "/socket\\.io(\\.min|\\.msgpack\\.min)?\\.js(\\.map)?$");
        return this;
    }
    connectTimeout(v) {
        if (v === undefined)
            return this._connectTimeout;
        this._connectTimeout = v;
        return this;
    }
    adapter(v) {
        if (!arguments.length)
            return this._adapter;
        this._adapter = v;
        for (const nsp of this._nsps.values()) {
            nsp._initAdapter();
        }
        return this;
    }
    /**
     * Attaches socket.io to a server or port.
     *
     * @param srv - server or port
     * @param opts - options passed to engine.io
     * @return self
     * @public
     */
    listen(srv, opts = {}) {
        return this.attach(srv, opts);
    }
    /**
     * Attaches socket.io to a server or port.
     *
     * @param srv - server or port
     * @param opts - options passed to engine.io
     * @return self
     * @public
     */
    attach(srv, opts = {}) {
        if ("function" == typeof srv) {
            const msg = "You are trying to attach socket.io to an express " +
                "request handler function. Please pass a http.Server instance.";
            throw new Error(msg);
        }
        // handle a port as a string
        if (Number(srv) == srv) {
            srv = Number(srv);
        }
        if ("number" == typeof srv) {
            debug("creating http server and binding to %d", srv);
            const port = srv;
            srv = http.createServer((req, res) => {
                res.writeHead(404);
                res.end();
            });
            srv.listen(port);
        }
        // merge the options passed to the Socket.IO server
        Object.assign(opts, this.opts);
        // set engine.io path to `/socket.io`
        opts.path = opts.path || this._path;
        this.initEngine(srv, opts);
        return this;
    }
    /**
     * Initialize engine
     *
     * @param srv - the server to attach to
     * @param opts - options passed to engine.io
     * @private
     */
    initEngine(srv, opts) {
        // initialize engine
        debug("creating engine.io instance with opts %j", opts);
        this.eio = engine.attach(srv, opts);
        // attach static file serving
        if (this._serveClient)
            this.attachServe(srv);
        // Export http server
        this.httpServer = srv;
        // bind to engine events
        this.bind(this.eio);
    }
    /**
     * Attaches the static file serving.
     *
     * @param srv http server
     * @private
     */
    attachServe(srv) {
        debug("attaching client serving req handler");
        const evs = srv.listeners("request").slice(0);
        srv.removeAllListeners("request");
        srv.on("request", (req, res) => {
            if (this.clientPathRegex.test(req.url)) {
                this.serve(req, res);
            }
            else {
                for (let i = 0; i < evs.length; i++) {
                    evs[i].call(srv, req, res);
                }
            }
        });
    }
    /**
     * Handles a request serving of client source and map
     *
     * @param req
     * @param res
     * @private
     */
    serve(req, res) {
        const filename = req.url.replace(this._path, "");
        const isMap = dotMapRegex.test(filename);
        const type = isMap ? "map" : "source";
        // Per the standard, ETags must be quoted:
        // https://tools.ietf.org/html/rfc7232#section-2.3
        const expectedEtag = '"' + clientVersion + '"';
        const weakEtag = "W/" + expectedEtag;
        const etag = req.headers["if-none-match"];
        if (etag) {
            if (expectedEtag === etag || weakEtag === etag) {
                debug("serve client %s 304", type);
                res.writeHead(304);
                res.end();
                return;
            }
        }
        debug("serve client %s", type);
        res.setHeader("Cache-Control", "public, max-age=0");
        res.setHeader("Content-Type", "application/" + (isMap ? "json" : "javascript"));
        res.setHeader("ETag", expectedEtag);
        if (!isMap) {
            res.setHeader("X-SourceMap", filename.substring(1) + ".map");
        }
        Server.sendFile(filename, req, res);
    }
    /**
     * @param filename
     * @param req
     * @param res
     * @private
     */
    static sendFile(filename, req, res) {
        const readStream = fs_1.createReadStream(path.join(__dirname, "../client-dist/", filename));
        const encoding = accepts(req).encodings(["br", "gzip", "deflate"]);
        const onError = (err) => {
            if (err) {
                res.end();
            }
        };
        switch (encoding) {
            case "br":
                res.writeHead(200, { "content-encoding": "br" });
                readStream.pipe(zlib_1.createBrotliCompress()).pipe(res);
                stream_1.pipeline(readStream, zlib_1.createBrotliCompress(), res, onError);
                break;
            case "gzip":
                res.writeHead(200, { "content-encoding": "gzip" });
                stream_1.pipeline(readStream, zlib_1.createGzip(), res, onError);
                break;
            case "deflate":
                res.writeHead(200, { "content-encoding": "deflate" });
                stream_1.pipeline(readStream, zlib_1.createDeflate(), res, onError);
                break;
            default:
                res.writeHead(200);
                stream_1.pipeline(readStream, res, onError);
        }
    }
    /**
     * Binds socket.io to an engine.io instance.
     *
     * @param {engine.Server} engine engine.io (or compatible) server
     * @return self
     * @public
     */
    bind(engine) {
        this.engine = engine;
        this.engine.on("connection", this.onconnection.bind(this));
        return this;
    }
    /**
     * Called with each incoming transport connection.
     *
     * @param {engine.Socket} conn
     * @return self
     * @private
     */
    onconnection(conn) {
        debug("incoming connection with id %s", conn.id);
        const client = new client_1.Client(this, conn);
        if (conn.protocol === 3) {
            // @ts-ignore
            client.connect("/");
        }
        return this;
    }
    /**
     * Looks up a namespace.
     *
     * @param {String|RegExp|Function} name nsp name
     * @param fn optional, nsp `connection` ev handler
     * @public
     */
    of(name, fn) {
        if (typeof name === "function" || name instanceof RegExp) {
            const parentNsp = new parent_namespace_1.ParentNamespace(this);
            debug("initializing parent namespace %s", parentNsp.name);
            if (typeof name === "function") {
                this.parentNsps.set(name, parentNsp);
            }
            else {
                this.parentNsps.set((nsp, conn, next) => next(null, name.test(nsp)), parentNsp);
            }
            if (fn) {
                // @ts-ignore
                parentNsp.on("connect", fn);
            }
            return parentNsp;
        }
        if (String(name)[0] !== "/")
            name = "/" + name;
        let nsp = this._nsps.get(name);
        if (!nsp) {
            debug("initializing namespace %s", name);
            nsp = new namespace_1.Namespace(this, name);
            this._nsps.set(name, nsp);
        }
        if (fn)
            nsp.on("connect", fn);
        return nsp;
    }
    /**
     * Closes server connection
     *
     * @param [fn] optional, called as `fn([err])` on error OR all conns closed
     * @public
     */
    close(fn) {
        for (const socket of this.sockets.sockets.values()) {
            socket._onclose("server shutting down");
        }
        this.engine.close();
        if (this.httpServer) {
            this.httpServer.close(fn);
        }
        else {
            fn && fn();
        }
    }
    /**
     * Sets up namespace middleware.
     *
     * @return self
     * @public
     */
    use(fn) {
        this.sockets.use(fn);
        return this;
    }
    /**
     * Targets a room when emitting.
     *
     * @param room
     * @return self
     * @public
     */
    to(room) {
        return this.sockets.to(room);
    }
    /**
     * Targets a room when emitting.
     *
     * @param room
     * @return self
     * @public
     */
    in(room) {
        return this.sockets.in(room);
    }
    /**
     * Excludes a room when emitting.
     *
     * @param name
     * @return self
     * @public
     */
    except(name) {
        this.sockets.except(name);
        return this;
    }
    /**
     * Sends a `message` event to all clients.
     *
     * @return self
     * @public
     */
    send(...args) {
        this.sockets.emit("message", ...args);
        return this;
    }
    /**
     * Sends a `message` event to all clients.
     *
     * @return self
     * @public
     */
    write(...args) {
        this.sockets.emit("message", ...args);
        return this;
    }
    /**
     * Gets a list of socket ids.
     *
     * @public
     */
    allSockets() {
        return this.sockets.allSockets();
    }
    /**
     * Sets the compress flag.
     *
     * @param compress - if `true`, compresses the sending data
     * @return self
     * @public
     */
    compress(compress) {
        return this.sockets.compress(compress);
    }
    /**
     * Sets a modifier for a subsequent event emission that the event data may be lost if the client is not ready to
     * receive messages (because of network slowness or other issues, or because they’re connected through long polling
     * and is in the middle of a request-response cycle).
     *
     * @return self
     * @public
     */
    get volatile() {
        return this.sockets.volatile;
    }
    /**
     * Sets a modifier for a subsequent event emission that the event data will only be broadcast to the current node.
     *
     * @return self
     * @public
     */
    get local() {
        return this.sockets.local;
    }
    /**
     * Returns the matching socket instances
     *
     * @public
     */
    fetchSockets() {
        return this.sockets.fetchSockets();
    }
    /**
     * Makes the matching socket instances join the specified rooms
     *
     * @param room
     * @public
     */
    socketsJoin(room) {
        return this.sockets.socketsJoin(room);
    }
    /**
     * Makes the matching socket instances leave the specified rooms
     *
     * @param room
     * @public
     */
    socketsLeave(room) {
        return this.sockets.socketsLeave(room);
    }
    /**
     * Makes the matching socket instances disconnect
     *
     * @param close - whether to close the underlying connection
     * @public
     */
    disconnectSockets(close = false) {
        return this.sockets.disconnectSockets(close);
    }
}
exports.Server = Server;
/**
 * Expose main namespace (/).
 */
const emitterMethods = Object.keys(events_1.EventEmitter.prototype).filter(function (key) {
    return typeof events_1.EventEmitter.prototype[key] === "function";
});
emitterMethods.forEach(function (fn) {
    Server.prototype[fn] = function () {
        return this.sockets[fn].apply(this.sockets, arguments);
    };
});
module.exports = (srv, opts) => new Server(srv, opts);
module.exports.Server = Server;
