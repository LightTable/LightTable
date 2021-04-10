import { Namespace } from "./namespace";
import type { Server } from "./index";
import type { EventParams, EventNames, EventsMap, DefaultEventsMap } from "./typed-events";
export declare class ParentNamespace<ListenEvents extends EventsMap = DefaultEventsMap, EmitEvents extends EventsMap = ListenEvents> extends Namespace<ListenEvents, EmitEvents> {
    private static count;
    private children;
    constructor(server: Server<ListenEvents, EmitEvents>);
    /**
     * @private
     */
    _initAdapter(): void;
    emit<Ev extends EventNames<EmitEvents>>(ev: Ev, ...args: EventParams<EmitEvents, Ev>): boolean;
    createChild(name: string): Namespace<ListenEvents, EmitEvents>;
}
