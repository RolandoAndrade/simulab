import { CanvasNode } from "../../canvas-node";
import { QueueCanvasComponentProperties } from "../../queue-canvas-component-properties";

export class CanvasEntityEmitterNode extends CanvasNode {
    constructor(properties: QueueCanvasComponentProperties) {
        super({
            ...properties,
            width: Math.sqrt(3) * 50 /2,
            height: 50,
            padding: 0,
        });
    }

    draw() {
        this.ctx.fillStyle = this.properties.color;
        this.ctx.beginPath();
        this.ctx.moveTo(this.position.x - this.dimensions.width / 2, this.position.y - this.dimensions.height / 2);
        this.ctx.lineTo(this.position.x - this.dimensions.width / 2, this.position.y + this.dimensions.height / 2);
        this.ctx.lineTo(this.position.x + this.dimensions.width / 2, this.position.y);
        this.ctx.closePath();
        this.ctx.fill();
    }
}