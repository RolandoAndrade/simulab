import {CanvasPort} from "../../ports";
import {CanvasNode} from "../../canvas-node";
import {Point} from "../../../../../shared/types";


export class CanvasSourcePort extends CanvasPort {
    private hoverRight: boolean = false;

    constructor(node: CanvasNode) {
        super(node);
    }

    private get positionPoint(): Point{
        return {
            x: this.node.position.x + this.node.dimensions.width + 2 * CanvasPort.MARGIN,
            y: this.node.position.y + this.node.dimensions.height / 2,
        }
    }

    public contains(x: number, y: number): boolean {
        return this.positionPoint.x - CanvasPort.RADIUS <= x && x <= this.positionPoint.x + CanvasPort.RADIUS
            && this.positionPoint.y - CanvasPort.RADIUS <= y && y <= this.positionPoint.y + CanvasPort.RADIUS;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        ctx.translate(this.positionPoint.x, this.positionPoint.y);
        ctx.rotate(Math.PI / 4);
        ctx.fillStyle = CanvasPort.OUT_COLOR;
        ctx.translate(-CanvasPort.RADIUS, -CanvasPort.RADIUS);
        ctx.fillRect(0,0, 2 * CanvasPort.RADIUS, 2 * CanvasPort.RADIUS);
        ctx.restore();
    }

    hover(x: number, y: number): boolean {
        this.hoverRight = this.contains(x, y);
        return this.hoverRight;
    }
}
