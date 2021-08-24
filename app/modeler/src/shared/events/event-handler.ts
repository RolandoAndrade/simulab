import { ModelerEvents } from "./modeler.events";

export class EventHandler {
    private events: {
        [event: string]: Set<(params: any) => void>
    } = {}

    public emit(message: ModelerEvents, params: any) {
        for(const call of this.events[message]) {
            call(params);
        }
    }

    public onEvent(message: ModelerEvents, callback: (params: any) => void) {
        if (!this.events[message]) {
            this.events[message] = new Set();
        }
        this.events[message].add(callback);
    }
}