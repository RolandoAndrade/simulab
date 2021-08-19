import { CanvasPort } from "./index";
import { CanvasNode } from "../canvas-node";

export class LeftPort extends CanvasPort {
    constructor(node: CanvasNode) {
        super(node);
    }

    public contains(x: number, y: number): boolean {
        const path = new Path2D();
        path.rect(this.positionLeftPoint.x - CanvasPort.SELECTION_RADIUS,
            this.positionLeftPoint.y - CanvasPort.SELECTION_RADIUS,
            this.positionLeftPoint.x + CanvasPort.SELECTION_RADIUS,
            this.positionLeftPoint.y + CanvasPort.SELECTION_RADIUS);
        const contained = this.node.ctx.isPointInPath(path, x, y);
        path.closePath();
        return contained;
    }

    public draw(): void {
        this.node.ctx.save();
        this.node.ctx.translate(this.positionLeftPoint.x, this.positionLeftPoint.y);
        this.node.ctx.rotate(Math.PI / 4);
        this.node.ctx.fillStyle = CanvasPort.OUT_COLOR;
        this.node.ctx.translate(-CanvasPort.RADIUS, -CanvasPort.RADIUS);
        this.node.ctx.fillRect(0, 0, 2 * CanvasPort.RADIUS, 2 * CanvasPort.RADIUS);
        this.node.ctx.restore();
    }

    hover(x: number, y: number): boolean {
        return this.contains(x, y);
    }
}