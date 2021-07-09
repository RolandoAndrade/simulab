import {Edge} from "../domain/edge";
import {CanvasNode, CanvasPort, GraphNode} from "../../nodes";
import {Point} from "../../shared";

export class Path extends Edge{
    constructor(private readonly ctx: CanvasRenderingContext2D, from: GraphNode, to: GraphNode | Point) {
        super(from, to);
    }

    public get toPosition(): Point{
        if (this.to instanceof Point) {
            return this.to;
        }
        return (this.to as CanvasNode).portCreator.positionLeftPoint;
    }

    draw(): void {
        this.ctx.beginPath();
        const port = (this.from as CanvasNode).portCreator.positionRightPoint;
        this.ctx.strokeStyle = Edge.COLOR;
        this.ctx.lineWidth = 2;
        this.ctx.moveTo(port.x,port.y);
        this.ctx.lineTo(this.toPosition.x,this.toPosition.y);
        this.ctx.stroke();
        this.from.draw();
    }

}
