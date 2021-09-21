import { CanvasNode } from "../../canvas-node";
import { QueueCanvasComponentProperties } from "../../queue-canvas-component-properties";

export class GraphLabel extends CanvasNode {
    constructor(properties: QueueCanvasComponentProperties) {
        super({
            ...properties,
            width: 150,
            height: 30,
            padding: 0,
        });
    }

    draw() {
        this.ctx.fillStyle = "black";
        this.ctx.font = "16px Arial";
        this.ctx.textAlign = "right";
        let text = "0"
        if (this.getEntity().properties.length > 1) {
            text = this.getEntity().properties[1].propertyValue;
        }
        this.ctx.fillText(text, this.position.x + this.dimensions.width / 2, this.position.y + this.dimensions.height / 2);
    }
}