import { Socket } from "./socket";
import type { Server } from "./index";
import { EventParams, EventNames, EventsMap, StrictEventEmitter, DefaultEventsMap } from "./typed-events";
import type { Client } from "./client";
import type { Adapter, Room, SocketId } from "socket.io-adapter";
import { BroadcastOperator, RemoteSocket } from "./broadcast-operator";
export interface ExtendedError extends Error {
    data?: any;
}
export interface NamespaceReservedEventsMap<ListenEvents extends EventsMap, EmitEvents extends EventsMap> {
    connect: (socket: Socket<ListenEvents, EmitEvents>) => void;
    connection: (socket: Socket<ListenEvents, EmitEvents>) => void;
}
export declare class Namespace<ListenEvents extends EventsMap = DefaultEventsMap, EmitEvents extends EventsMap = ListenEvents> extends StrictEventEmitter<{}, EmitEvents, NamespaceReservedEventsMap<ListenEvents, EmitEvents>> {
    readonly name: string;
    readonly sockets: Map<SocketId, Socket<ListenEvents, EmitEvents>>;
    adapter: Adapter;
    /** @private */
    readonly server: Server<ListenEvents, EmitEvents>;
    /** @private */
    _fns: Array<(socket: Socket<ListenEvents, EmitEvents>, next: (err?: ExtendedError) => void) => void>;
    /** @private */
    _ids: number;
    /**
     * Namespace constructor.
     *
     * @param server instance
     * @param name
     */
    constructor(server: Server<ListenEvents, EmitEvents>, name: string);
    /**
     * Initializes the `Adapter` for this nsp.
     * Run upon changing adapter by `Server#adapter`
     * in addition to the constructor.
     *
     * @private
     */
    _initAdapter(): void;
    /**
     * Sets up namespace middleware.
     *
     * @return self
     * @public
     */
    use(fn: (socket: Socket<ListenEvents, EmitEvents>, next: (err?: ExtendedError) => void) => void): this;
    /**
     * Executes the middleware for an incoming client.
     *
     * @param socket - the socket that will get added
     * @param fn - last fn call in the middleware
     * @private
     */
    private run;
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
     * @param room
     * @return self
     * @public
     */
    except(room: Room | Room[]): BroadcastOperator<EmitEvents>;
    /**
     * Adds a new client.
     *
     * @return {Socket}
     * @private
     */
    _add(client: Client<ListenEvents, EmitEvents>, query: any, fn?: () => void): Socket<ListenEvents, EmitEvents>;
    /**
     * Removes a client. Called by each `Socket`.
     *
     * @private
     */
    _remove(socket: Socket<ListenEvents, EmitEvents>): void;
    /**
     * Emits to all clients.
     *
     * @return Always true
     * @public
     */
    emit<Ev extends EventNames<EmitEvents>>(ev: Ev, ...args: EventParams<EmitEvents, Ev>): boolean;
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
     * Gets a list of clients.
     *
     * @return self
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
