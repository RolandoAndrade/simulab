import { CanvasNode } from "../../canvas-node";
import { QueueCanvasComponentProperties } from "../../queue-canvas-component-properties";

export class GraphLabel extends CanvasNode {
    public value: number;
    constructor(properties: QueueCanvasComponentProperties) {
        super({
            ...properties,
            width: 100,
            height: 30,
            padding: 0,
        });
        this.value = 0;
    }

    draw() {
        this.ctx.font = "16px Arial";
        this.ctx.textAlign = "right";
        let text = `${this.value}`
        this.ctx.fillStyle = "#eee";
        this.ctx.fillRect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height)
        this.ctx.fillStyle = "black";
        this.ctx.fillText(text, this.position.x + this.dimensions.width - 8, this.position.y + this.dimensions.height / 2 + 7);
    }
}