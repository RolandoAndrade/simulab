import {CanvasQueue} from "./canvas-queue";

export class InputQueue extends CanvasQueue {
    draw(): void {
        this.ctx.fillStyle = 'cyan';
        this.ctx.fillRect(this.position.x, this.position.y - 2, 10, 4);
    }
}