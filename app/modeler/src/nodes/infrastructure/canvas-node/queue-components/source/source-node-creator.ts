import {GraphNode, NodeCreator} from "../../../../domain";
import {CanvasSourceNode} from "./source-node";

export class SourceNodeCreator extends NodeCreator {
    create(options: {
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number
    }): GraphNode {
        return new CanvasSourceNode({
            ctx: options.ctx,
            x: options.x,
            y: options.y,
            id: this.entity.name,
            entity: this.entity
        });
    }
}
