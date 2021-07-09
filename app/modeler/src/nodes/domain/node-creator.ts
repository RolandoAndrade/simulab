import {GraphNode} from "./graph-node";
import {Entity} from "../../shared/types/entity";

export enum NodeCreatorType {
    SOURCE = "SOURCE",
    SERVER = "SERVER"
}

export abstract class NodeCreator {
    constructor(protected entity: Entity) {
    }

    abstract create(options?: any): GraphNode
}
