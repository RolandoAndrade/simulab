import {GraphNode} from "../../domain/graph-node";
import {CanvasNodeProperties} from "./canvas-node-properties";
import {CanvasPort} from "./canvas-port";


export abstract class CanvasNode extends GraphNode {
    protected image: HTMLImageElement;
    protected isHover: boolean = false;

    protected constructor(properties: CanvasNodeProperties) {
        super(properties);
        this.image = new Image();
        this.image.src = require("../../../../assets/queue-components/router.png")
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

    public isOverPort(x: number, y: number) {
        return this.portCreator.contains(x, y);
    }
}
