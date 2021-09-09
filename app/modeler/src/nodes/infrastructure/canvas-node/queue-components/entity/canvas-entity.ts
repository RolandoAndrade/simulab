import {Entity, Point} from "../../../../../shared";
import {CanvasNode} from "../../canvas-node";

export class CanvasEntity extends CanvasNode {
    constructor(entity: Entity, private node: CanvasNode) {
        super({
            width: Math.sqrt(3) * 30 /2,
            height: 30,
            entity,
            id: entity.name, padding: 0,
            x: node.position.x,
            y: node.position.y,
            ctx: node.ctx,
            color: "#888"
        });
    }

    get position(): Point {
        return this.node.position
    }

    draw(): void {
        this.ctx.save();
        this.ctx.fillStyle = this.properties.color || "#000";
        this.ctx.beginPath();
        this.ctx.lineJoin = "round";
        this.ctx.lineWidth = 8;
        this.ctx.moveTo(this.position.x, this.position.y);
        this.ctx.lineTo(this.position.x, this.position.y + this.dimensions.height);
        this.ctx.lineTo(this.position.x + this.dimensions.width , this.position.y + this.dimensions.height / 2);
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.restore();
    }
}