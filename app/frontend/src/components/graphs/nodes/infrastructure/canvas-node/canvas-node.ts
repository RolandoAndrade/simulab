import {GraphNode} from "@/components/graphs/nodes/domain/graph-node";
import {CanvasNodeProperties} from "@/components/graphs/nodes/infrastructure/canvas-node/canvas-node-properties";

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

    public draw() {
        const ctx = (this.properties as CanvasNodeProperties).ctx;
        ctx.drawImage(this.image, this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
    }
}
