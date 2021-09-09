import {CanvasQueue} from "./canvas-queue";
import {CanvasPort} from "../ports";

export class InputQueue extends CanvasQueue {
    constructor(node: CanvasPort) {
        super(node)
    }

    draw(): void {
        this.ctx.fillStyle = 'cyan';
        this.ctx.fillRect(this.position.x - CanvasQueue.WIDTH, this.position.y - CanvasQueue.HEIGHT / 2,
            CanvasQueue.WIDTH, CanvasQueue.HEIGHT);
        this.drawEntities()
    }
}