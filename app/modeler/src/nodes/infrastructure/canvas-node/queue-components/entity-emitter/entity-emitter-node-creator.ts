import {GraphNode, NodeCreator} from "../../../../domain";
import {CanvasEntityEmitterNode} from "./entity-emitter-node";


export class EntityEmitterNodeCreator extends NodeCreator {
    create(options: {
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number
    }): GraphNode {
        return new CanvasEntityEmitterNode({
            ctx: options.ctx,
            x: options.x - Math.sqrt(3) * 50 /2,
            y: options.y - 50/2,
            id: this.entity.name,
            entity: this.entity
        });
    }
}