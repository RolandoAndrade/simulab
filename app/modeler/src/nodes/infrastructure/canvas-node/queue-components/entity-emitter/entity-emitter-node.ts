import { CanvasNode } from "../../canvas-node";
import { QueueCanvasComponentProperties } from "../../queue-canvas-component-properties";

export class CanvasEntityEmitterNode extends CanvasNode {
    constructor(properties: QueueCanvasComponentProperties) {
        super({
            ...properties,
            width: Math.sqrt(3) * 30 /2,
            height: 30,
            padding: 0,
        });
    }

    draw() {
        this.ctx.save();
        this.ctx.fillStyle = this.properties.color || "#000";
        this.ctx.strokeStyle = this.isSelected ? 'purple': this.properties.color || "#000";
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
        this.ctx.fillStyle = "black";
        this.ctx.font = "12px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText(this.getEntity().name, this.position.x + this.dimensions.width / 2, this.position.y + this.dimensions.height + 25);
    }
}