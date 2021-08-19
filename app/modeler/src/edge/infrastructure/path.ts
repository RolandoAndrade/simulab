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

    private drawSameNode(){
        const portRight = (this.from as CanvasNode).portCreator.positionRightPoint;
        const portLeft = (this.from as CanvasNode).portCreator.positionLeftPoint;
        this.ctx.strokeStyle = Edge.COLOR;
        this.ctx.lineWidth = 2;
        const h = portRight.y - this.from.dimensions.height / 2 - CanvasPort.MARGIN * 2
        this.ctx.moveTo(portRight.x,portRight.y);
        this.ctx.lineTo(portRight.x, h);
        this.ctx.lineTo(portLeft.x,h);
        this.ctx.lineTo(portLeft.x,portLeft.y);
        this.ctx.stroke();
        this.from.draw();
    }

    private differentNode(){
        const port = (this.from as CanvasNode).portCreator.positionRightPoint;
        this.ctx.beginPath();
        this.ctx.strokeStyle = Edge.COLOR;
        this.ctx.lineWidth = 2;
        this.ctx.moveTo(port.x,port.y);
        this.ctx.lineTo(this.toPosition.x,this.toPosition.y);
        this.ctx.stroke();
        this.from.draw();
    }

    draw(): void {
        this.ctx.beginPath();
        if(this.isSameNode()){
            this.drawSameNode()
        } else {
            this.differentNode()
        }

    }

}
