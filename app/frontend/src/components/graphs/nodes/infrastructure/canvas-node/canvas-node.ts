import {GraphNode} from "@/components/graphs/nodes/domain/graph-node";
import {CanvasNodeProperties} from "@/components/graphs/nodes/infrastructure/canvas-node/canvas-node-properties";
import {CanvasPort} from "@/components/graphs/nodes/infrastructure/canvas-node/canvas-port";

export abstract class CanvasNode extends GraphNode {
    protected image: HTMLImageElement;
    protected isHover: boolean = false;

    protected constructor(properties: CanvasNodeProperties) {
        super(properties);
        this.image = new Image();
        this.image.src = require("@/assets/queue-components/router.png")
        this.image.onload = () => {
            this.draw()
        }
    }

    public draw() {
        this.ctx.drawImage(this.image, this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
        if(this.isSelected){
            this.portCreator.draw(this.ctx);
        }
    }

    public get ctx(): CanvasRenderingContext2D {
        return (this.properties as CanvasNodeProperties).ctx
    }


    public abstract get portCreator(): CanvasPort;

    public hover(x: number, y: number) {
        if(this.contains(x, y)){
            return this.portCreator.hover(x, y);
        }
        return false;
    }
}
