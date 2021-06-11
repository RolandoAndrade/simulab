import {CanvasPort} from "@/components/graphs/nodes/infrastructure/canvas-node/canvas-port";

export class CanvasCirclePorts extends CanvasPort {
    constructor(protected readonly cx: number,
                protected readonly cy: number,
                protected readonly r: number) {
        super();
    }

    public contains(x: number, y: number): boolean {
        // x = cx + r * cos(a)
        // y = cy + r * sin(a)
        // tan(a) = (y2 - y1) / (x2 - x1) = sen(a)/cos(a)
        return (x - this.cx)**2 + (y - this.cy)**2 <= this.r**2;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.strokeStyle = CanvasPort.COLOR;
        ctx.setLineDash(CanvasPort.LINE_DASH);
        ctx.arc(this.cx, this.cy, this.r, 0, 2 * Math.PI, false);
        ctx.stroke();
    }

}
