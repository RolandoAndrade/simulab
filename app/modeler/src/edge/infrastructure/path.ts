import {Edge} from "../domain/edge";
import {CanvasPort, GraphNode} from "../../nodes";
import {Point} from "../../shared";

export class Path extends Edge{
    public readonly portStart: CanvasPort;
    public readonly portEnd: CanvasPort | Point;

    constructor(private readonly ctx: CanvasRenderingContext2D, from: CanvasPort, to: CanvasPort | Point) {
        super(from.node, to instanceof Point ? to : to.node);
        this.portStart = from;
        this.portEnd = to;
    }

    public get toPosition(): Point{
        if (this.portEnd instanceof CanvasPort) {
            return this.portEnd.position;
        }
        return super.toPosition;
    }

    private drawSameNode(){
        console.log(this.from, this.to)
        console.log(this.portStart, this.portEnd)
        const portRight = this.portStart.position;
        const portLeft = (this.portEnd as GraphNode).position;
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
        const port = this.portStart.position;
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.isSelected ? "purple" : Edge.COLOR;
        this.ctx.lineWidth = this.isSelected ? 4 : 2;
        this.ctx.moveTo(port.x,port.y);
        this.ctx.lineTo(this.toPosition.x,this.toPosition.y);
        this.ctx.stroke();
        this.ctx.closePath();
        this.from.draw();
    }

    /**
     * @description Returns true if the given point is contained by the node
     * @param x Coordinate x inside the container
     * @param y Coordinate y inside the container
     * */
    public contains(x: number, y: number): boolean {
        const port = this.portStart.position;
        this.ctx.beginPath();
        this.ctx.lineWidth = 10;
        this.ctx.moveTo(port.x,port.y);
        this.ctx.lineTo(this.toPosition.x,this.toPosition.y);
        const contained = this.ctx.isPointInStroke(x, y)
        this.ctx.closePath();
        return contained;
    }

    draw(): void {
        if(this.isSameNode()){
            this.drawSameNode()
        } else {
            this.differentNode()
        }
    }
}
