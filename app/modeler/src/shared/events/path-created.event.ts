import {Edge} from "../../edge";

export interface PathCreatedEvent {
    path: Edge,
    onCreated: (path: Edge) => void;
}