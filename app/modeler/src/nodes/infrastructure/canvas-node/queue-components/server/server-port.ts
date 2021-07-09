import { CanvasPort } from "../../ports";
import { CanvasNode } from "../../canvas-node";
import { Point } from "../../../../../shared/types";

export class CanvasServerPort extends CanvasPort {
    private hoverRight: boolean = false;
    private hoverLeft: boolean = false;

    constructor(node: CanvasNode) {
        super(node);
    }

    private containsPoint(position: Point, x: number, y: number): boolean {
        return (
            position.x - CanvasPort.RADIUS <= x &&
            x <= position.x + CanvasPort.RADIUS &&
            position.y - CanvasPort.RADIUS <= y &&
            y <= position.y + CanvasPort.RADIUS
        );
    }

    public contains(x: number, y: number): boolean {
        return this.containsPoint(this.positionRightPoint, x, y) || this.containsPoint(this.positionLeftPoint, x, y);
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        ctx.translate(this.positionRightPoint.x, this.positionRightPoint.y);
        ctx.rotate(Math.PI / 4);
        ctx.fillStyle = CanvasPort.OUT_COLOR;
        ctx.translate(-CanvasPort.RADIUS, -CanvasPort.RADIUS);
        ctx.fillRect(0, 0, 2 * CanvasPort.RADIUS, 2 * CanvasPort.RADIUS);
        ctx.restore();
        ctx.save();
        ctx.translate(this.positionLeftPoint.x, this.positionLeftPoint.y);
        ctx.rotate(Math.PI / 4);
        ctx.fillStyle = CanvasPort.IN_COLOR;
        ctx.translate(-CanvasPort.RADIUS, -CanvasPort.RADIUS);
        ctx.fillRect(0, 0, 2 * CanvasPort.RADIUS, 2 * CanvasPort.RADIUS);
        ctx.restore();
    }

    hover(x: number, y: number): boolean {
        this.hoverRight = this.containsPoint(this.positionRightPoint, x, y);
        this.hoverLeft = this.containsPoint(this.positionLeftPoint, x, y);
        return this.hoverRight || this.hoverLeft;
    }
}
