import {GraphNode} from "@/components/graphs/nodes/domain/graph-node";
import {CanvasNodeProperties} from "@/components/graphs/nodes/infrastructure/canvas-node/canvas-node-properties";
import {CanvasPort} from "@/components/graphs/nodes/infrastructure/canvas-node/canvas-port";
import {drawCircumference} from "@/components/graphs/nodes/infrastructure/canvas-node/canvas-shape";

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
        if(this.isSelected){
            this.portCreator.draw(this.ctx);
        }
        const ctx = (this.properties as CanvasNodeProperties).ctx;
        ctx.drawImage(this.image, this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
    }

    public get ctx(): CanvasRenderingContext2D {
        return (this.properties as CanvasNodeProperties).ctx
    }

    public abstract get portCreator(): CanvasPort;
}
