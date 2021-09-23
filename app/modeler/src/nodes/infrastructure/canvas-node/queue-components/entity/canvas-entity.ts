import {Entity, Point} from "../../../../../shared";
import {CanvasNode} from "../../canvas-node";
import {CanvasQueue} from "../../queues";

export class CanvasEntity extends CanvasNode {
    private offset: Point;

    constructor(entity: Entity, private queue: CanvasQueue) {
        super({
            width: Math.sqrt(3) * 10 /2,
            height: 10,
            entity,
            id: entity.name, padding: 0,
            x: queue.position.x,
            y: queue.position.y,
            ctx: queue.ctx,
            color: "#6df5bc"
        });
        this.offset = {
            x: 0,
            y: 0
        }
    }

    get position(): Point {
        return {
            x: this.queue.position.x + this.offset.x,
            y: this.queue.position.y + this.offset.y
        }
    }

    move(dx: number, dy: number) {
        this.offset = {
            x: this.offset.x + dx,
            y: this.offset.y + dy
        }
    }

    draw(): void {
        this.ctx.save();
        this.ctx.fillStyle = this.properties.color || "#000";
        this.ctx.strokeStyle = this.properties.color || "#000"
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