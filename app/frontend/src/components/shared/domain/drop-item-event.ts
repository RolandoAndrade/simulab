import { NodeCreatorType } from "modeler";

export interface DropItemEvent {
    node: NodeCreatorType;
    x?: number;
    y?: number;
}
