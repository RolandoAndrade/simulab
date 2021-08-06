import { CanvasPort } from "../../ports";
import { CanvasNode } from "../../canvas-node";
import { Point } from "../../../../../shared/types";

export class CanvasSourcePort extends CanvasPort {
    private hoverRight: boolean = false;

    constructor(node: CanvasNode) {
        super(node);
    }

    public contains(x: number, y: number): boolean {
        return this.containsRightPort(x, y)
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        ctx.translate(this.positionRightPoint.x, this.positionRightPoint.y);
        ctx.rotate(Math.PI / 4);
        ctx.fillStyle = CanvasPort.OUT_COLOR;
        ctx.translate(-CanvasPort.RADIUS, -CanvasPort.RADIUS);
        ctx.fillRect(0, 0, 2 * CanvasPort.RADIUS, 2 * CanvasPort.RADIUS);
        ctx.restore();
    }

    hover(x: number, y: number): boolean {
        this.hoverRight = this.contains(x, y);
        return this.hoverRight;
    }

    containsLeftPort(x: number, y: number): boolean {
        return false
    }

    containsRightPort(x: number, y: number): boolean {
        return (
            this.positionRightPoint.x - CanvasPort.SELECTION_RADIUS <= x &&
            x <= this.positionRightPoint.x + CanvasPort.SELECTION_RADIUS &&
            this.positionRightPoint.y - CanvasPort.SELECTION_RADIUS <= y &&
            y <= this.positionRightPoint.y + CanvasPort.SELECTION_RADIUS
        );
    }
}
