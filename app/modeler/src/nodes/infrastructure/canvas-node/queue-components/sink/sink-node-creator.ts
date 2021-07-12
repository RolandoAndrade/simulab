import {GraphNode, NodeCreator} from "../../../../domain";
import {CanvasSinkNode} from "./sink-node";

export class SinkNodeCreator extends NodeCreator {
    create(options: {
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number
    }): GraphNode {
        return new CanvasSinkNode({
            ctx: options.ctx,
            x: options.x - 75/2,
            y: options.y - 50/2,
            id: this.entity.name,
            entity: this.entity
        });
    }
}
