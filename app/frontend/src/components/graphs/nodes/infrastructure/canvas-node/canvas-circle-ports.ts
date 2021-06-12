import {CanvasPort} from "@/components/graphs/nodes/infrastructure/canvas-node/canvas-port";
const RADIUS = 5;
export class CanvasCirclePorts extends CanvasPort {
    private hoverRight: boolean = false;
    private hoverLeft: boolean = false;

    constructor(public cx: number,
                public cy: number,
                public r: number) {
        super();
    }

    public contains(x: number, y: number): boolean {
        const cxr = this.cx + this.r, cxl = this.cx - this.r;
        const right =  (x - cxr)**2 + (y - this.cy)**2 <= (RADIUS * 2) ** 2 ;
        const left =  (x - cxl)**2 + (y - this.cy)**2 <= (RADIUS * 2 )**2;
        this.hoverRight = right;
        this.hoverLeft = left;
        return right || left;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        // x = cx + r * cos(a)
        // y = cy + r * sin(a)
        ctx.beginPath();
        ctx.fillStyle = CanvasPort.COLOR;
        ctx.arc(this.cx + this.r, this.cy, this.hoverRight ? RADIUS * 2 : RADIUS, 0, 2 * Math.PI, false);
        ctx.arc(this.cx - this.r, this.cy, this.hoverLeft ? RADIUS * 2 : RADIUS, 0, 2 * Math.PI, false);
        ctx.fill();
    }
}
