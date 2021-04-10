import type { BroadcastFlags, Room, SocketId } from "socket.io-adapter";
import { Handshake } from "./socket";
import type { Adapter } from "socket.io-adapter";
import type { EventParams, EventNames, EventsMap, TypedEventBroadcaster } from "./typed-events";
export declare class BroadcastOperator<EmitEvents extends EventsMap> implements TypedEventBroadcaster<EmitEvents> {
    private readonly adapter;
    private readonly rooms;
    private readonly exceptRooms;
    private readonly flags;
    constructor(adapter: Adapter, rooms?: Set<Room>, exceptRooms?: Set<Room>, flags?: BroadcastFlags);
    /**
     * Targets a room when emitting.
     *
     * @param room
     * @return a new BroadcastOperator instance
     * @public
     */
    to(room: Room | Room[]): BroadcastOperator<EmitEvents>;
    /**
     * Targets a room when emitting.
     *
     * @param room
     * @return a new BroadcastOperator instance
     * @public
     */
    in(room: Room | Room[]): BroadcastOperator<EmitEvents>;
    /**
     * Excludes a room when emitting.
     *
     * @param room
     * @return a new BroadcastOperator instance
     * @public
     */
    except(room: Room | Room[]): BroadcastOperator<EmitEvents>;
    /**
     * Sets the compress flag.
     *
     * @param compress - if `true`, compresses the sending data
     * @return a new BroadcastOperator instance
     * @public
     */
    compress(compress: boolean): BroadcastOperator<EmitEvents>;
    /**
     * Sets a modifier for a subsequent event emission that the event data may be lost if the client is not ready to
     * receive messages (because of network slowness or other issues, or because they’re connected through long polling
     * and is in the middle of a request-response cycle).
     *
     * @return a new BroadcastOperator instance
     * @public
     */
    get volatile(): BroadcastOperator<EmitEvents>;
    /**
     * Sets a modifier for a subsequent event emission that the event data will only be broadcast to the current node.
     *
     * @return a new BroadcastOperator instance
     * @public
     */
    get local(): BroadcastOperator<EmitEvents>;
    /**
     * Emits to all clients.
     *
     * @return Always true
     * @public
     */
    emit<Ev extends EventNames<EmitEvents>>(ev: Ev, ...args: EventParams<EmitEvents, Ev>): boolean;
    /**
     * Gets a list of clients.
     *
     * @public
     */
    allSockets(): Promise<Set<SocketId>>;
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
/**
 * Format of the data when the Socket instance exists on another Socket.IO server
 */
interface SocketDetails {
    id: SocketId;
    handshake: Handshake;
    rooms: Room[];
    data: any;
}
/**
 * Expose of subset of the attributes and methods of the Socket class
 */
export declare class RemoteSocket<EmitEvents extends EventsMap> implements TypedEventBroadcaster<EmitEvents> {
    readonly id: SocketId;
    readonly handshake: Handshake;
    readonly rooms: Set<Room>;
    readonly data: any;
    private readonly operator;
    constructor(adapter: Adapter, details: SocketDetails);
    emit<Ev extends EventNames<EmitEvents>>(ev: Ev, ...args: EventParams<EmitEvents, Ev>): boolean;
    /**
     * Joins a room.
     *
     * @param {String|Array} room - room or array of rooms
     * @public
     */
    join(room: Room | Room[]): void;
    /**
     * Leaves a room.
     *
     * @param {String} room
     * @public
     */
    leave(room: Room): void;
    /**
     * Disconnects this client.
     *
     * @param {Boolean} close - if `true`, closes the underlying connection
     * @return {Socket} self
     *
     * @public
     */
    disconnect(close?: boolean): this;
}
export {};
