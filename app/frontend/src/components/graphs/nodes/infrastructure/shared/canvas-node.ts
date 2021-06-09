import {GraphNode} from "@/components/graphs/nodes/domain/graph-node";
import {CanvasNodeProperties} from "@/components/graphs/nodes/infrastructure/shared/canvas-node-properties";

export abstract class CanvasNode extends GraphNode {
    protected image: HTMLImageElement;

    protected constructor(properties: CanvasNodeProperties) {
        super(properties);
        this.image = new Image();
        this.image.src = "http://i.stack.imgur.com/cZ0gC.png"
    }

    draw(ctx: CanvasRenderingContext2D) {
        // change color
        ctx.fillStyle = this.properties.color || "#000";
        ctx.fillRect(0, 0, this.properties.width, this.properties.height);
        ctx.globalCompositeOperation = "destination-in";

        //draw image
        ctx.drawImage(this.image, this.properties.x, this.properties.y, this.properties.width, this.properties.height);

        //return context state
        ctx.globalCompositeOperation = "source-over";
    }
}
