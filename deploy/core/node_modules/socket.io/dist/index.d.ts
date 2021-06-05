/// <reference types="node" />
import http = require("http");
import { ExtendedError, Namespace, ServerReservedEventsMap } from "./namespace";
import { Adapter, Room, SocketId } from "socket.io-adapter";
import * as parser from "socket.io-parser";
import type { Encoder } from "socket.io-parser";
import { Socket } from "./socket";
import type { CookieSerializeOptions } from "cookie";
import type { CorsOptions } from "cors";
import type { BroadcastOperator, RemoteSocket } from "./broadcast-operator";
import { EventsMap, DefaultEventsMap, EventParams, StrictEventEmitter, EventNames } from "./typed-events";
declare type Transport = "polling" | "websocket";
declare type ParentNspNameMatchFn = (name: string, auth: {
    [key: string]: any;
}, fn: (err: Error | null, success: boolean) => void) => void;
declare type AdapterConstructor = typeof Adapter | ((nsp: Namespace) => Adapter);
interface EngineOptions {
    /**
     * how many ms without a pong packet to consider the connection closed
     * @default 20000
     */
    pingTimeout: number;
    /**
     * how many ms before sending a new ping packet
     * @default 25000
     */
    pingInterval: number;
    /**
     * how many ms before an uncompleted transport upgrade is cancelled
     * @default 10000
     */
    upgradeTimeout: number;
    /**
     * how many bytes or characters a message can be, before closing the session (to avoid DoS).
     * @default 1e5 (100 KB)
     */
    maxHttpBufferSize: number;
    /**
     * A function that receives a given handshake or upgrade request as its first parameter,
     * and can decide whether to continue or not. The second argument is a function that needs
     * to be called with the decided information: fn(err, success), where success is a boolean
     * value where false means that the request is rejected, and err is an error code.
     */
    allowRequest: (req: http.IncomingMessage, fn: (err: string | null | undefined, success: boolean) => void) => void;
    /**
     * the low-level transports that are enabled
     * @default ["polling", "websocket"]
     */
    transports: Transport[];
    /**
     * whether to allow transport upgrades
     * @default true
     */
    allowUpgrades: boolean;
    /**
     * parameters of the WebSocket permessage-deflate extension (see ws module api docs). Set to false to disable.
     * @default false
     */
    perMessageDeflate: boolean | object;
    /**
     * parameters of the http compression for the polling transports (see zlib api docs). Set to false to disable.
     * @default true
     */
    httpCompression: boolean | object;
    /**
     * what WebSocket server implementation to use. Specified module must
     * conform to the ws interface (see ws module api docs).
     * An alternative c++ addon is also available by installing eiows module.
     *
     * @default `require("ws").Server`
     */
    wsEngine: Function;
    /**
     * an optional packet which will be concatenated to the handshake packet emitted by Engine.IO.
     */
    initialPacket: any;
    /**
     * configuration of the cookie that contains the client sid to send as part of handshake response headers. This cookie
     * might be used for sticky-session. Defaults to not sending any cookie.
     * @default false
     */
    cookie: CookieSerializeOptions | boolean;
    /**
     * the options that will be forwarded to the cors module
     */
    cors: CorsOptions;
    /**
     * whether to enable compatibility with Socket.IO v2 clients
     * @default false
     */
    allowEIO3: boolean;
}
interface AttachOptions {
    /**
     * name of the path to capture
     * @default "/engine.io"
     */
    path: string;
    /**
     * destroy unhandled upgrade requests
     * @default true
     */
    destroyUpgrade: boolean;
    /**
     * milliseconds after which unhandled requests are ended
     * @default 1000
     */
    destroyUpgradeTimeout: number;
}
interface EngineAttachOptions extends EngineOptions, AttachOptions {
}
interface ServerOptions extends EngineAttachOptions {
    /**
     * name of the path to capture
     * @default "/socket.io"
     */
    path: string;
    /**
     * whether to serve the client files
     * @default true
     */
    serveClient: boolean;
    /**
     * the adapter to use
     * @default the in-memory adapter (https://github.com/socketio/socket.io-adapter)
     */
    adapter: AdapterConstructor;
    /**
     * the parser to use
     * @default the default parser (https://github.com/socketio/socket.io-parser)
     */
    parser: any;
    /**
     * how many ms before a client without namespace is closed
     * @default 45000
     */
    connectTimeout: number;
}
export declare class Server<ListenEvents extends EventsMap = DefaultEventsMap, EmitEvents extends EventsMap = ListenEvents, ServerSideEvents extends EventsMap = DefaultEventsMap> extends StrictEventEmitter<ServerSideEvents, EmitEvents, ServerReservedEventsMap<ListenEvents, EmitEvents, ServerSideEvents>> {
    readonly sockets: Namespace<ListenEvents, EmitEvents, ServerSideEvents>;
    /**
     * A reference to the underlying Engine.IO server.
     *
     * Example:
     *
     * <code>
     *   const clientsCount = io.engine.clientsCount;
     * </code>
     *
     */
    engine: any;
    /** @private */
    readonly _parser: typeof parser;
    /** @private */
    readonly encoder: Encoder;
    /**
     * @private
     */
    _nsps: Map<string, Namespace<ListenEvents, EmitEvents, ServerSideEvents>>;
    private parentNsps;
    private _adapter?;
    private _serveClient;
    private opts;
    private eio;
    private _path;
    private clientPathRegex;
    /**
     * @private
     */
    _connectTimeout: number;
    private httpServer;
    /**
     * Server constructor.
     *
     * @param srv http server, port, or options
     * @param [opts]
     * @public
     */
    constructor(opts?: Partial<ServerOptions>);
    constructor(srv?: http.Server | number, opts?: Partial<ServerOptions>);
    constructor(srv: undefined | Partial<ServerOptions> | http.Server | number, opts?: Partial<ServerOptions>);
    /**
     * Sets/gets whether client code is being served.
     *
     * @param v - whether to serve client code
     * @return self when setting or value when getting
     * @public
     */
    serveClient(v: boolean): this;
    serveClient(): boolean;
    serveClient(v?: boolean): this | boolean;
    /**
     * Executes the middleware for an incoming namespace not already created on the server.
     *
     * @param name - name of incoming namespace
     * @param auth - the auth parameters
     * @param fn - callback
     *
     * @private
     */
    _checkNamespace(name: string, auth: {
        [key: string]: any;
    }, fn: (nsp: Namespace<ListenEvents, EmitEvents, ServerSideEvents> | false) => void): void;
    /**
     * Sets the client serving path.
     *
     * @param {String} v pathname
     * @return {Server|String} self when setting or value when getting
     * @public
     */
    path(v: string): this;
    path(): string;
    path(v?: string): this | string;
    /**
     * Set the delay after which a client without namespace is closed
     * @param v
     * @public
     */
    connectTimeout(v: number): this;
    connectTimeout(): number;
    connectTimeout(v?: number): this | number;
    /**
     * Sets the adapter for rooms.
     *
     * @param v pathname
     * @return self when setting or value when getting
     * @public
     */
    adapter(): AdapterConstructor | undefined;
    adapter(v: AdapterConstructor): this;
    /**
     * Attaches socket.io to a server or port.
     *
     * @param srv - server or port
     * @param opts - options passed to engine.io
     * @return self
     * @public
     */
    listen(srv: http.Server | number, opts?: Partial<ServerOptions>): this;
    /**
     * Attaches socket.io to a server or port.
     *
     * @param srv - server or port
     * @param opts - options passed to engine.io
     * @return self
     * @public
     */
    attach(srv: http.Server | number, opts?: Partial<ServerOptions>): this;
    /**
     * Initialize engine
     *
     * @param srv - the server to attach to
     * @param opts - options passed to engine.io
     * @private
     */
    private initEngine;
    /**
     * Attaches the static file serving.
     *
     * @param srv http server
     * @private
     */
    private attachServe;
    /**
     * Handles a request serving of client source and map
     *
     * @param req
     * @param res
     * @private
     */
    private serve;
    /**
     * @param filename
     * @param req
     * @param res
     * @private
     */
    private static sendFile;
    /**
     * Binds socket.io to an engine.io instance.
     *
     * @param {engine.Server} engine engine.io (or compatible) server
     * @return self
     * @public
     */
    bind(engine: any): this;
    /**
     * Called with each incoming transport connection.
     *
     * @param {engine.Socket} conn
     * @return self
     * @private
     */
    private onconnection;
    /**
     * Looks up a namespace.
     *
     * @param {String|RegExp|Function} name nsp name
     * @param fn optional, nsp `connection` ev handler
     * @public
     */
    of(name: string | RegExp | ParentNspNameMatchFn, fn?: (socket: Socket<ListenEvents, EmitEvents, ServerSideEvents>) => void): Namespace<ListenEvents, EmitEvents, ServerSideEvents>;
    /**
     * Closes server connection
     *
     * @param [fn] optional, called as `fn([err])` on error OR all conns closed
     * @public
     */
    close(fn?: (err?: Error) => void): void;
    /**
     * Sets up namespace middleware.
     *
     * @return self
     * @public
     */
    use(fn: (socket: Socket<ListenEvents, EmitEvents, ServerSideEvents>, next: (err?: ExtendedError) => void) => void): this;
    /**
     * Targets a room when emitting.
     *
     * @param room
     * @return self
     * @public
     */
    to(room: Room | Room[]): BroadcastOperator<EmitEvents>;
    /**
     * Targets a room when emitting.
     *
     * @param room
     * @return self
     * @public
     */
    in(room: Room | Room[]): BroadcastOperator<EmitEvents>;
    /**
     * Excludes a room when emitting.
     *
     * @param name
     * @return self
     * @public
     */
    except(name: Room | Room[]): Server<ListenEvents, EmitEvents, ServerSideEvents>;
    /**
     * Sends a `message` event to all clients.
     *
     * @return self
     * @public
     */
    send(...args: EventParams<EmitEvents, "message">): this;
    /**
     * Sends a `message` event to all clients.
     *
     * @return self
     * @public
     */
    write(...args: EventParams<EmitEvents, "message">): this;
    /**
     * Emit a packet to other Socket.IO servers
     *
     * @param ev - the event name
     * @param args - an array of arguments, which may include an acknowledgement callback at the end
     * @public
     */
    serverSideEmit<Ev extends EventNames<ServerSideEvents>>(ev: Ev, ...args: EventParams<ServerSideEvents, Ev>): boolean;
    /**
     * Gets a list of socket ids.
     *
     * @public
     */
    allSockets(): Promise<Set<SocketId>>;
    /**
     * Sets the compress flag.
     *
     * @param compress - if `true`, compresses the sending data
     * @return self
     * @public
     */
    compress(compress: boolean): BroadcastOperator<EmitEvents>;
    /**
     * Sets a modifier for a subsequent event emission that the event data may be lost if the client is not ready to
     * receive messages (because of network slowness or other issues, or because they’re connected through long polling
     * and is in the middle of a request-response cycle).
     *
     * @return self
     * @public
     */
    get volatile(): BroadcastOperator<EmitEvents>;
    /**
     * Sets a modifier for a subsequent event emission that the event data will only be broadcast to the current node.
     *
     * @return self
     * @public
     */
    get local(): BroadcastOperator<EmitEvents>;
    /**
     * Returns the matching socket instances
     *
     * @public
     */
    fetchSockets(): Promise<RemoteSocket<EmitEvents>[]>;
    /**
     * Makes the matching socket instances join the specified rooms
     *
     * @param room
     * @public
     */
    socketsJoin(room: Room | Room[]): void;
    /**
     * Makes the matching socket instances leave the specified rooms
     *
     * @param room
     * @public
     */
    socketsLeave(room: Room | Room[]): void;
    /**
     * Makes the matching socket instances disconnect
     *
     * @param close - whether to close the underlying connection
     * @public
     */
    disconnectSockets(close?: boolean): void;
}
export { Socket, ServerOptions, Namespace, BroadcastOperator, RemoteSocket };
