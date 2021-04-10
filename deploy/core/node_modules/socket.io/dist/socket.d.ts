/// <reference types="node" />
import { Packet } from "socket.io-parser";
import { EventParams, EventNames, EventsMap, StrictEventEmitter, DefaultEventsMap } from "./typed-events";
import type { Client } from "./client";
import type { Namespace } from "./namespace";
import type { IncomingMessage, IncomingHttpHeaders } from "http";
import type { Room, SocketId } from "socket.io-adapter";
import type { ParsedUrlQuery } from "querystring";
import { BroadcastOperator } from "./broadcast-operator";
export interface SocketReservedEventsMap {
    disconnect: (reason: string) => void;
    disconnecting: (reason: string) => void;
    error: (err: Error) => void;
}
export interface EventEmitterReservedEventsMap {
    newListener: (eventName: string | Symbol, listener: (...args: any[]) => void) => void;
    removeListener: (eventName: string | Symbol, listener: (...args: any[]) => void) => void;
}
export declare const RESERVED_EVENTS: ReadonlySet<string | Symbol>;
/**
 * The handshake details
 */
export interface Handshake {
    /**
     * The headers sent as part of the handshake
     */
    headers: IncomingHttpHeaders;
    /**
     * The date of creation (as string)
     */
    time: string;
    /**
     * The ip of the client
     */
    address: string;
    /**
     * Whether the connection is cross-domain
     */
    xdomain: boolean;
    /**
     * Whether the connection is secure
     */
    secure: boolean;
    /**
     * The date of creation (as unix timestamp)
     */
    issued: number;
    /**
     * The request URL string
     */
    url: string;
    /**
     * The query object
     */
    query: ParsedUrlQuery;
    /**
     * The auth object
     */
    auth: {
        [key: string]: any;
    };
}
export declare class Socket<ListenEvents extends EventsMap = DefaultEventsMap, EmitEvents extends EventsMap = ListenEvents> extends StrictEventEmitter<ListenEvents, EmitEvents, SocketReservedEventsMap> {
    readonly nsp: Namespace<ListenEvents, EmitEvents>;
    readonly client: Client<ListenEvents, EmitEvents>;
    readonly id: SocketId;
    readonly handshake: Handshake;
    /**
     * Additional information that can be attached to the Socket instance and which will be used in the fetchSockets method
     */
    data: any;
    connected: boolean;
    disconnected: boolean;
    private readonly server;
    private readonly adapter;
    private acks;
    private fns;
    private flags;
    private _anyListeners?;
    /**
     * Interface to a `Client` for a given `Namespace`.
     *
     * @param {Namespace} nsp
     * @param {Client} client
     * @param {Object} auth
     * @package
     */
    constructor(nsp: Namespace<ListenEvents, EmitEvents>, client: Client<ListenEvents, EmitEvents>, auth: object);
    /**
     * Builds the `handshake` BC object
     *
     * @private
     */
    private buildHandshake;
    /**
     * Emits to this client.
     *
     * @return Always returns `true`.
     * @public
     */
    emit<Ev extends EventNames<EmitEvents>>(ev: Ev, ...args: EventParams<EmitEvents, Ev>): boolean;
    /**
     * Targets a room when broadcasting.
     *
     * @param room
     * @return self
     * @public
     */
    to(room: Room | Room[]): BroadcastOperator<EmitEvents>;
    /**
     * Targets a room when broadcasting.
     *
     * @param room
     * @return self
     * @public
     */
    in(room: Room | Room[]): BroadcastOperator<EmitEvents>;
    /**
     * Excludes a room when broadcasting.
     *
     * @param room
     * @return self
     * @public
     */
    except(room: Room | Room[]): BroadcastOperator<EmitEvents>;
    /**
     * Sends a `message` event.
     *
     * @return self
     * @public
     */
    send(...args: EventParams<EmitEvents, "message">): this;
    /**
     * Sends a `message` event.
     *
     * @return self
     * @public
     */
    write(...args: EventParams<EmitEvents, "message">): this;
    /**
     * Writes a packet.
     *
     * @param {Object} packet - packet object
     * @param {Object} opts - options
     * @private
     */
    private packet;
    /**
     * Joins a room.
     *
     * @param {String|Array} rooms - room or array of rooms
     * @return a Promise or nothing, depending on the adapter
     * @public
     */
    join(rooms: Room | Array<Room>): Promise<void> | void;
    /**
     * Leaves a room.
     *
     * @param {String} room
     * @return a Promise or nothing, depending on the adapter
     * @public
     */
    leave(room: string): Promise<void> | void;
    /**
     * Leave all rooms.
     *
     * @private
     */
    private leaveAll;
    /**
     * Called by `Namespace` upon successful
     * middleware execution (ie: authorization).
     * Socket is added to namespace array before
     * call to join, so adapters can access it.
     *
     * @private
     */
    _onconnect(): void;
    /**
     * Called with each packet. Called by `Client`.
     *
     * @param {Object} packet
     * @private
     */
    _onpacket(packet: Packet): void;
    /**
     * Called upon event packet.
     *
     * @param {Packet} packet - packet object
     * @private
     */
    private onevent;
    /**
     * Produces an ack callback to emit with an event.
     *
     * @param {Number} id - packet id
     * @private
     */
    private ack;
    /**
     * Called upon ack packet.
     *
     * @private
     */
    private onack;
    /**
     * Called upon client disconnect packet.
     *
     * @private
     */
    private ondisconnect;
    /**
     * Handles a client error.
     *
     * @private
     */
    _onerror(err: Error): void;
    /**
     * Called upon closing. Called by `Client`.
     *
     * @param {String} reason
     * @throw {Error} optional error object
     *
     * @private
     */
    _onclose(reason: string): this | undefined;
    /**
     * Produces an `error` packet.
     *
     * @param {Object} err - error object
     *
     * @private
     */
    _error(err: any): void;
    /**
     * Disconnects this client.
     *
     * @param {Boolean} close - if `true`, closes the underlying connection
     * @return {Socket} self
     *
     * @public
     */
    disconnect(close?: boolean): this;
    /**
     * Sets the compress flag.
     *
     * @param {Boolean} compress - if `true`, compresses the sending data
     * @return {Socket} self
     * @public
     */
    compress(compress: boolean): this;
    /**
     * Sets a modifier for a subsequent event emission that the event data may be lost if the client is not ready to
     * receive messages (because of network slowness or other issues, or because they’re connected through long polling
     * and is in the middle of a request-response cycle).
     *
     * @return {Socket} self
     * @public
     */
    get volatile(): this;
    /**
     * Sets a modifier for a subsequent event emission that the event data will only be broadcast to every sockets but the
     * sender.
     *
     * @return {Socket} self
     * @public
     */
    get broadcast(): BroadcastOperator<EmitEvents>;
    /**
     * Sets a modifier for a subsequent event emission that the event data will only be broadcast to the current node.
     *
     * @return {Socket} self
     * @public
     */
    get local(): BroadcastOperator<EmitEvents>;
    /**
     * Dispatch incoming event to socket listeners.
     *
     * @param {Array} event - event that will get emitted
     * @private
     */
    private dispatch;
    /**
     * Sets up socket middleware.
     *
     * @param {Function} fn - middleware function (event, next)
     * @return {Socket} self
     * @public
     */
    use(fn: (event: Array<any>, next: (err?: Error) => void) => void): this;
    /**
     * Executes the middleware for an incoming event.
     *
     * @param {Array} event - event that will get emitted
     * @param {Function} fn - last fn call in the middleware
     * @private
     */
    private run;
    /**
     * A reference to the request that originated the underlying Engine.IO Socket.
     *
     * @public
     */
    get request(): IncomingMessage;
    /**
     * A reference to the underlying Client transport connection (Engine.IO Socket object).
     *
     * @public
     */
    get conn(): any;
    /**
     * @public
     */
    get rooms(): Set<Room>;
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback.
     *
     * @param listener
     * @public
     */
    onAny(listener: (...args: any[]) => void): this;
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback. The listener is added to the beginning of the listeners array.
     *
     * @param listener
     * @public
     */
    prependAny(listener: (...args: any[]) => void): this;
    /**
     * Removes the listener that will be fired when any event is emitted.
     *
     * @param listener
     * @public
     */
    offAny(listener?: (...args: any[]) => void): this;
    /**
     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
     * e.g. to remove listeners.
     *
     * @public
     */
    listenersAny(): ((...args: any[]) => void)[];
    private newBroadcastOperator;
}
