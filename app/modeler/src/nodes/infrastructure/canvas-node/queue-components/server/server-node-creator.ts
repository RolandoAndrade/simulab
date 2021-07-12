import {GraphNode, NodeCreator} from "../../../../domain";
import {CanvasServerNode} from "./server-node";

export class ServerNodeCreator extends NodeCreator {
    create(options: {
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number
    }): GraphNode {
        return new CanvasServerNode({
            ctx: options.ctx,
            x: options.x,
            y: options.y,
            id: this.entity.name,
            entity: this.entity
        });
    }
}
