import {GraphNode, NodeCreator} from "../../../../domain";
import {CanvasSourceNode} from "./source-node";

export class SourceNodeCreator extends NodeCreator {
    create(ctx: CanvasRenderingContext2D): GraphNode {
        return new CanvasSourceNode({
            ctx: ctx,
            x: 120,
            y: 100,
            id: this.entity.name,
            entity: this.entity
        });
    }
}
