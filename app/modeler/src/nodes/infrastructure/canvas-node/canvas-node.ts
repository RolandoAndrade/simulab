import { GraphNode } from "../../domain";
import { CanvasNodeProperties } from "./canvas-node-properties";
import { CanvasPort } from "./ports";

export abstract class CanvasNode extends GraphNode {
    protected image: HTMLImageElement;
    protected isHover: boolean = false;

    protected constructor(properties: CanvasNodeProperties) {
        super(properties);
        this.image = new Image();
        this.image.src = properties.image;
        this.image.onload = () => {
            this.draw();
        };
    }

    public draw() {
        this.ctx.drawImage(this.image, this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
        this.ctx.font = "12px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText(this.properties.id, this.position.x + this.dimensions.width / 2, this.position.y + this.dimensions.height + 15);
        this.portCreator.draw(this.ctx);
    }

    public get ctx(): CanvasRenderingContext2D {
        return (this.properties as CanvasNodeProperties).ctx;
    }

    public abstract get portCreator(): CanvasPort;

    public isOverPort(x: number, y: number) {
        return this.portCreator.contains(x, y);
    }


}
