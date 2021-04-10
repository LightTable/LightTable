"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoteSocket = exports.BroadcastOperator = void 0;
const socket_1 = require("./socket");
const socket_io_parser_1 = require("socket.io-parser");
class BroadcastOperator {
    constructor(adapter, rooms = new Set(), exceptRooms = new Set(), flags = {}) {
        this.adapter = adapter;
        this.rooms = rooms;
        this.exceptRooms = exceptRooms;
        this.flags = flags;
    }
    /**
     * Targets a room when emitting.
     *
     * @param room
     * @return a new BroadcastOperator instance
     * @public
     */
    to(room) {
        const rooms = new Set(this.rooms);
        if (Array.isArray(room)) {
            room.forEach((r) => rooms.add(r));
        }
        else {
            rooms.add(room);
        }
        return new BroadcastOperator(this.adapter, rooms, this.exceptRooms, this.flags);
    }
    /**
     * Targets a room when emitting.
     *
     * @param room
     * @return a new BroadcastOperator instance
     * @public
     */
    in(room) {
        return this.to(room);
    }
    /**
     * Excludes a room when emitting.
     *
     * @param room
     * @return a new BroadcastOperator instance
     * @public
     */
    except(room) {
        const exceptRooms = new Set(this.exceptRooms);
        if (Array.isArray(room)) {
            room.forEach((r) => exceptRooms.add(r));
        }
        else {
            exceptRooms.add(room);
        }
        return new BroadcastOperator(this.adapter, this.rooms, exceptRooms, this.flags);
    }
    /**
     * Sets the compress flag.
     *
     * @param compress - if `true`, compresses the sending data
     * @return a new BroadcastOperator instance
     * @public
     */
    compress(compress) {
        const flags = Object.assign({}, this.flags, { compress });
        return new BroadcastOperator(this.adapter, this.rooms, this.exceptRooms, flags);
    }
    /**
     * Sets a modifier for a subsequent event emission that the event data may be lost if the client is not ready to
     * receive messages (because of network slowness or other issues, or because they’re connected through long polling
     * and is in the middle of a request-response cycle).
     *
     * @return a new BroadcastOperator instance
     * @public
     */
    get volatile() {
        const flags = Object.assign({}, this.flags, { volatile: true });
        return new BroadcastOperator(this.adapter, this.rooms, this.exceptRooms, flags);
    }
    /**
     * Sets a modifier for a subsequent event emission that the event data will only be broadcast to the current node.
     *
     * @return a new BroadcastOperator instance
     * @public
     */
    get local() {
        const flags = Object.assign({}, this.flags, { local: true });
        return new BroadcastOperator(this.adapter, this.rooms, this.exceptRooms, flags);
    }
    /**
     * Emits to all clients.
     *
     * @return Always true
     * @public
     */
    emit(ev, ...args) {
        if (socket_1.RESERVED_EVENTS.has(ev)) {
            throw new Error(`"${ev}" is a reserved event name`);
        }
        // set up packet object
        const data = [ev, ...args];
        const packet = {
            type: socket_io_parser_1.PacketType.EVENT,
            data: data,
        };
        if ("function" == typeof data[data.length - 1]) {
            throw new Error("Callbacks are not supported when broadcasting");
        }
        this.adapter.broadcast(packet, {
            rooms: this.rooms,
            except: this.exceptRooms,
            flags: this.flags,
        });
        return true;
    }
    /**
     * Gets a list of clients.
     *
     * @public
     */
    allSockets() {
        if (!this.adapter) {
            throw new Error("No adapter for this namespace, are you trying to get the list of clients of a dynamic namespace?");
        }
        return this.adapter.sockets(this.rooms);
    }
    /**
     * Returns the matching socket instances
     *
     * @public
     */
    fetchSockets() {
        return this.adapter
            .fetchSockets({
            rooms: this.rooms,
            except: this.exceptRooms,
        })
            .then((sockets) => {
            return sockets.map((socket) => {
                if (socket instanceof socket_1.Socket) {
                    // FIXME the TypeScript compiler complains about missing private properties
                    return socket;
                }
                else {
                    return new RemoteSocket(this.adapter, socket);
                }
            });
        });
    }
    /**
     * Makes the matching socket instances join the specified rooms
     *
     * @param room
     * @public
     */
    socketsJoin(room) {
        this.adapter.addSockets({
            rooms: this.rooms,
            except: this.exceptRooms,
        }, Array.isArray(room) ? room : [room]);
    }
    /**
     * Makes the matching socket instances leave the specified rooms
     *
     * @param room
     * @public
     */
    socketsLeave(room) {
        this.adapter.delSockets({
            rooms: this.rooms,
            except: this.exceptRooms,
        }, Array.isArray(room) ? room : [room]);
    }
    /**
     * Makes the matching socket instances disconnect
     *
     * @param close - whether to close the underlying connection
     * @public
     */
    disconnectSockets(close = false) {
        this.adapter.disconnectSockets({
            rooms: this.rooms,
            except: this.exceptRooms,
        }, close);
    }
}
exports.BroadcastOperator = BroadcastOperator;
/**
 * Expose of subset of the attributes and methods of the Socket class
 */
class RemoteSocket {
    constructor(adapter, details) {
        this.id = details.id;
        this.handshake = details.handshake;
        this.rooms = new Set(details.rooms);
        this.data = details.data;
        this.operator = new BroadcastOperator(adapter, new Set([this.id]));
    }
    emit(ev, ...args) {
        return this.operator.emit(ev, ...args);
    }
    /**
     * Joins a room.
     *
     * @param {String|Array} room - room or array of rooms
     * @public
     */
    join(room) {
        return this.operator.socketsJoin(room);
    }
    /**
     * Leaves a room.
     *
     * @param {String} room
     * @public
     */
    leave(room) {
        return this.operator.socketsLeave(room);
    }
    /**
     * Disconnects this client.
     *
     * @param {Boolean} close - if `true`, closes the underlying connection
     * @return {Socket} self
     *
     * @public
     */
    disconnect(close = false) {
        this.operator.disconnectSockets(close);
        return this;
    }
}
exports.RemoteSocket = RemoteSocket;
