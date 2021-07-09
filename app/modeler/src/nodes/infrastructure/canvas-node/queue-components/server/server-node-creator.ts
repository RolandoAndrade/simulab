import {GraphNode, NodeCreator} from "../../../../domain";
import {CanvasServerNode} from "./server-node";

export class ServerNodeCreator extends NodeCreator {
    create(ctx: CanvasRenderingContext2D): GraphNode {
        return new CanvasServerNode({
            ctx: ctx,
            x: 120,
            y: 100,
            id: this.entity.name,
            entity: this.entity
        });
    }
}
