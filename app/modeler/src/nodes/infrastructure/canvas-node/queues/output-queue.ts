import {CanvasQueue} from "./canvas-queue";
import {CanvasPort} from "../ports";

export class OutputQueue extends CanvasQueue {
    constructor(node: CanvasPort) {
        super(node)
    }

    draw(): void {
        this.ctx.fillStyle = 'cyan';
        this.ctx.fillRect(this.position.x, this.position.y - CanvasQueue.HEIGHT / 2,
            CanvasQueue.WIDTH, CanvasQueue.HEIGHT);
    }
}