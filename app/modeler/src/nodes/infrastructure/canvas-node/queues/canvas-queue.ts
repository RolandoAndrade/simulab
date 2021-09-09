import {GraphNode} from "../../../domain";
import {CanvasEntity} from "../queue-components/entity";

export abstract class CanvasQueue {
    protected entities: CanvasEntity[]
    protected constructor(protected node: GraphNode) {
    }

    abstract draw(): void;
}