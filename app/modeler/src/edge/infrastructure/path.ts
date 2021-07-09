import {Edge} from "../domain/edge";
import {GraphNode} from "../../nodes";
import {Point} from "../../shared";

export class Path extends Edge{
    constructor(private readonly ctx: CanvasRenderingContext2D, from: GraphNode, to: GraphNode | Point) {
        super(from, to);
    }

    draw(): void {
        this.ctx.beginPath();
        this.ctx.moveTo(this.from.position.x,this.from.position.y);
        this.ctx.lineTo(this.toPosition.x,this.toPosition.y);
        this.ctx.stroke();
    }

}
