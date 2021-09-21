import {GraphNode, NodeCreator} from "../../../../domain";
import {GraphLabel} from "./graph-label";



export class LabelNodeCreator extends NodeCreator {
    create(options: {
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number
    }): GraphNode {
        return new GraphLabel({
            ctx: options.ctx,
            x: options.x - 75,
            y: options.y - 30/2,
            id: this.entity.name,
            entity: this.entity
        });
    }
}