import {GraphNode} from "./graph-node";
import {Entity} from "../../shared/types/entity";

export enum NodeCreatorType {
    SOURCE = "SOURCE",
    SERVER = "SERVER",
    SINK = "SINK",
    COMBINER = "COMBINER",
    SEPARATOR = "SEPARATOR",
    LABEL = "LABEL",
    ENTITY_EMITTER = "ENTITY_EMITTER"
}

export abstract class NodeCreator {
    constructor(protected entity: Entity) {
    }

    abstract create(options?: any): GraphNode
}
