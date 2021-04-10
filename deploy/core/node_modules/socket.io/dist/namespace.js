"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Namespace = void 0;
const socket_1 = require("./socket");
const typed_events_1 = require("./typed-events");
const debug_1 = __importDefault(require("debug"));
const broadcast_operator_1 = require("./broadcast-operator");
const debug = debug_1.default("socket.io:namespace");
class Namespace extends typed_events_1.StrictEventEmitter {
    /**
     * Namespace constructor.
     *
     * @param server instance
     * @param name
     */
    constructor(server, name) {
        super();
        this.sockets = new Map();
        /** @private */
        this._fns = [];
        /** @private */
        this._ids = 0;
        this.server = server;
        this.name = name;
        this._initAdapter();
    }
    /**
     * Initializes the `Adapter` for this nsp.
     * Run upon changing adapter by `Server#adapter`
     * in addition to the constructor.
     *
     * @private
     */
    _initAdapter() {
        this.adapter = new (this.server.adapter())(this);
    }
    /**
     * Sets up namespace middleware.
     *
     * @return self
     * @public
     */
    use(fn) {
        this._fns.push(fn);
        return this;
    }
    /**
     * Executes the middleware for an incoming client.
     *
     * @param socket - the socket that will get added
     * @param fn - last fn call in the middleware
     * @private
     */
    run(socket, fn) {
        const fns = this._fns.slice(0);
        if (!fns.length)
            return fn(null);
        function run(i) {
            fns[i](socket, function (err) {
                // upon error, short-circuit
                if (err)
                    return fn(err);
                // if no middleware left, summon callback
                if (!fns[i + 1])
                    return fn(null);
                // go on to next
                run(i + 1);
            });
        }
        run(0);
    }
    /**
     * Targets a room when emitting.
     *
     * @param room
     * @return self
     * @public
     */
    to(room) {
        return new broadcast_operator_1.BroadcastOperator(this.adapter).to(room);
    }
    /**
     * Targets a room when emitting.
     *
     * @param room
     * @return self
     * @public
     */
    in(room) {
        return new broadcast_operator_1.BroadcastOperator(this.adapter).in(room);
    }
    /**
     * Excludes a room when emitting.
     *
     * @param room
     * @return self
     * @public
     */
    except(room) {
        return new broadcast_operator_1.BroadcastOperator(this.adapter).except(room);
    }
    /**
     * Adds a new client.
     *
     * @return {Socket}
     * @private
     */
    _add(client, query, fn) {
        debug("adding socket to nsp %s", this.name);
        const socket = new socket_1.Socket(this, client, query);
        this.run(socket, (err) => {
            process.nextTick(() => {
                if ("open" == client.conn.readyState) {
                    if (err) {
                        if (client.conn.protocol === 3) {
                            return socket._error(err.data || err.message);
                        }
                        else {
                            return socket._error({
                                message: err.message,
                                data: err.data,
                            });
                        }
                    }
                    // track socket
                    this.sockets.set(socket.id, socket);
                    // it's paramount that the internal `onconnect` logic
                    // fires before user-set events to prevent state order
                    // violations (such as a disconnection before the connection
                    // logic is complete)
                    socket._onconnect();
                    if (fn)
                        fn();
                    // fire user-set events
                    this.emitReserved("connect", socket);
                    this.emitReserved("connection", socket);
                }
                else {
                    debug("next called after client was closed - ignoring socket");
                }
            });
        });
        return socket;
    }
    /**
     * Removes a client. Called by each `Socket`.
     *
     * @private
     */
    _remove(socket) {
        if (this.sockets.has(socket.id)) {
            this.sockets.delete(socket.id);
        }
        else {
            debug("ignoring remove for %s", socket.id);
        }
    }
    /**
     * Emits to all clients.
     *
     * @return Always true
     * @public
     */
    emit(ev, ...args) {
        return new broadcast_operator_1.BroadcastOperator(this.adapter).emit(ev, ...args);
    }
    /**
     * Sends a `message` event to all clients.
     *
     * @return self
     * @public
     */
    send(...args) {
        this.emit("message", ...args);
        return this;
    }
    /**
     * Sends a `message` event to all clients.
     *
     * @return self
     * @public
     */
    write(...args) {
        this.emit("message", ...args);
        return this;
    }
    /**
     * Gets a list of clients.
     *
     * @return self
     * @public
     */
    allSockets() {
        return new broadcast_operator_1.BroadcastOperator(this.adapter).allSockets();
    }
    /**
     * Sets the compress flag.
     *
     * @param compress - if `true`, compresses the sending data
     * @return self
     * @public
     */
    compress(compress) {
        return new broadcast_operator_1.BroadcastOperator(this.adapter).compress(compress);
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
        return new broadcast_operator_1.BroadcastOperator(this.adapter).volatile;
    }
    /**
     * Sets a modifier for a subsequent event emission that the event data will only be broadcast to the current node.
     *
     * @return self
     * @public
     */
    get local() {
        return new broadcast_operator_1.BroadcastOperator(this.adapter).local;
    }
    /**
     * Returns the matching socket instances
     *
     * @public
     */
    fetchSockets() {
        return new broadcast_operator_1.BroadcastOperator(this.adapter).fetchSockets();
    }
    /**
     * Makes the matching socket instances join the specified rooms
     *
     * @param room
     * @public
     */
    socketsJoin(room) {
        return new broadcast_operator_1.BroadcastOperator(this.adapter).socketsJoin(room);
    }
    /**
     * Makes the matching socket instances leave the specified rooms
     *
     * @param room
     * @public
     */
    socketsLeave(room) {
        return new broadcast_operator_1.BroadcastOperator(this.adapter).socketsLeave(room);
    }
    /**
     * Makes the matching socket instances disconnect
     *
     * @param close - whether to close the underlying connection
     * @public
     */
    disconnectSockets(close = false) {
        return new broadcast_operator_1.BroadcastOperator(this.adapter).disconnectSockets(close);
    }
}
exports.Namespace = Namespace;
