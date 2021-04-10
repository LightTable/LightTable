/// <reference types="node" />
import { EventEmitter } from "events";
export declare type SocketId = string;
export declare type Room = string;
export interface BroadcastFlags {
    volatile?: boolean;
    compress?: boolean;
    local?: boolean;
    broadcast?: boolean;
    binary?: boolean;
}
export interface BroadcastOptions {
    rooms: Set<Room>;
    except?: Set<SocketId>;
    flags?: BroadcastFlags;
}
export declare class Adapter extends EventEmitter {
    readonly nsp: any;
    rooms: Map<Room, Set<SocketId>>;
    sids: Map<SocketId, Set<Room>>;
    private readonly encoder;
    /**
     * In-memory adapter constructor.
     *
     * @param {Namespace} nsp
     */
    constructor(nsp: any);
    /**
     * To be overridden
     */
    init(): Promise<void> | void;
    /**
     * To be overridden
     */
    close(): Promise<void> | void;
    /**
     * Adds a socket to a list of room.
     *
     * @param {SocketId}  id      the socket id
     * @param {Set<Room>} rooms   a set of rooms
     * @public
     */
    addAll(id: SocketId, rooms: Set<Room>): Promise<void> | void;
    /**
     * Removes a socket from a room.
     *
     * @param {SocketId} id     the socket id
     * @param {Room}     room   the room name
     */
    del(id: SocketId, room: Room): Promise<void> | void;
    private _del;
    /**
     * Removes a socket from all rooms it's joined.
     *
     * @param {SocketId} id   the socket id
     */
    delAll(id: SocketId): void;
    /**
     * Broadcasts a packet.
     *
     * Options:
     *  - `flags` {Object} flags for this packet
     *  - `except` {Array} sids that should be excluded
     *  - `rooms` {Array} list of rooms to broadcast to
     *
     * @param {Object} packet   the packet object
     * @param {Object} opts     the options
     * @public
     */
    broadcast(packet: any, opts: BroadcastOptions): void;
    /**
     * Gets a list of sockets by sid.
     *
     * @param {Set<Room>} rooms   the explicit set of rooms to check.
     */
    sockets(rooms: Set<Room>): Promise<Set<SocketId>>;
    /**
     * Gets the list of rooms a given socket has joined.
     *
     * @param {SocketId} id   the socket id
     */
    socketRooms(id: SocketId): Set<Room> | undefined;
    /**
     * Returns the matching socket instances
     *
     * @param opts - the filters to apply
     */
    fetchSockets(opts: BroadcastOptions): Promise<any[]>;
    /**
     * Makes the matching socket instances join the specified rooms
     *
     * @param opts - the filters to apply
     * @param rooms - the rooms to join
     */
    addSockets(opts: BroadcastOptions, rooms: Room[]): void;
    /**
     * Makes the matching socket instances leave the specified rooms
     *
     * @param opts - the filters to apply
     * @param rooms - the rooms to leave
     */
    delSockets(opts: BroadcastOptions, rooms: Room[]): void;
    /**
     * Makes the matching socket instances disconnect
     *
     * @param opts - the filters to apply
     * @param close - whether to close the underlying connection
     */
    disconnectSockets(opts: BroadcastOptions, close: boolean): void;
    private apply;
    private computeExceptSids;
}
