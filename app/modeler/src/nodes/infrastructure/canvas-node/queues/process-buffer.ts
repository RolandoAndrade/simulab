import {CanvasQueue} from "./canvas-queue";
import {CanvasServerNode} from "../queue-components";
import {Point} from "../../../../shared";

export class ProcessBuffer extends CanvasQueue {
    constructor(node: CanvasServerNode) {
        super(node);
    }

    get position(): Point {
        return {
            x: this.node.position.x,
            y: this.node.position.y - 30
        }
    }

    draw(): void {
        this.ctx.fillStyle = 'cyan';
        this.ctx.fillRect(this.position.x, this.position.y - CanvasQueue.HEIGHT / 2,
            CanvasQueue.WIDTH, CanvasQueue.HEIGHT);
        this.drawEntities();
    }
}