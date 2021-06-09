import {GraphNode} from "@/components/graphs/nodes/domain/graph-node";
import {CanvasNodeProperties} from "@/components/graphs/nodes/infrastructure/canvas-node/canvas-node-properties";
import {QueueCanvasComponentProperties} from "@/components/graphs/nodes/infrastructure/canvas-node/queue-canvas-component-properties";

export abstract class CanvasNode extends GraphNode {
    protected image: HTMLImageElement;

    protected constructor(properties: CanvasNodeProperties) {
        super(properties);
        this.image = new Image();
        this.image.src = require("@/assets/queue-components/router.png")
        this.image.onload = () => {
            this.draw()
        }
    }

    draw() {
        const ctx = (this.properties as any).ctx;
        ctx.drawImage(this.image, this.properties.x, this.properties.y, this.properties.width, this.properties.height);
    }
}
