"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParentNamespace = void 0;
const namespace_1 = require("./namespace");
class ParentNamespace extends namespace_1.Namespace {
    constructor(server) {
        super(server, "/_" + ParentNamespace.count++);
        this.children = new Set();
    }
    /**
     * @private
     */
    _initAdapter() {
        const broadcast = (packet, opts) => {
            this.children.forEach((nsp) => {
                nsp.adapter.broadcast(packet, opts);
            });
        };
        // @ts-ignore FIXME is there a way to declare an inner class in TypeScript?
        this.adapter = { broadcast };
    }
    emit(ev, ...args) {
        this.children.forEach((nsp) => {
            nsp.emit(ev, ...args);
        });
        return true;
    }
    createChild(name) {
        const namespace = new namespace_1.Namespace(this.server, name);
        namespace._fns = this._fns.slice(0);
        this.listeners("connect").forEach((listener) => namespace.on("connect", listener));
        this.listeners("connection").forEach((listener) => namespace.on("connection", listener));
        this.children.add(namespace);
        this.server._nsps.set(name, namespace);
        return namespace;
    }
}
exports.ParentNamespace = ParentNamespace;
ParentNamespace.count = 0;
