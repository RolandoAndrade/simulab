import {CanvasPort} from "../../ports";
import {CanvasNode} from "../../canvas-node";

export class CanvasSinkPort extends CanvasPort {
    private hoverRight: boolean = false;

    constructor(node: CanvasNode) {
        super(node);
    }

    public contains(x: number, y: number): boolean {
        return this.containsLeftPort(x, y)
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        ctx.translate(this.positionLeftPoint.x, this.positionLeftPoint.y);
        ctx.rotate(Math.PI / 4);
        ctx.fillStyle = CanvasPort.IN_COLOR;
        ctx.translate(-CanvasPort.RADIUS, -CanvasPort.RADIUS);
        ctx.fillRect(0, 0, 2 * CanvasPort.RADIUS, 2 * CanvasPort.RADIUS);
        ctx.restore();
    }

    hover(x: number, y: number): boolean {
        this.hoverRight = this.contains(x, y);
        return this.hoverRight;
    }

    containsLeftPort(x: number, y: number): boolean {
        return (
            this.positionLeftPoint.x - CanvasPort.SELECTION_RADIUS <= x &&
            x <= this.positionLeftPoint.x + CanvasPort.SELECTION_RADIUS &&
            this.positionLeftPoint.y - CanvasPort.SELECTION_RADIUS <= y &&
            y <= this.positionLeftPoint.y + CanvasPort.SELECTION_RADIUS
        );
    }

    containsRightPort(x: number, y: number): boolean {
        return false
    }
}
