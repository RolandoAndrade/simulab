import { GraphNode } from "../../domain";
import { CanvasImageNodeProperties } from "./canvas-image-node-properties";
import {CanvasPortManager} from "./ports/canvas-port-manager";

export abstract class CanvasNode extends GraphNode {
    public readonly portManager: CanvasPortManager;

    protected constructor(properties: CanvasImageNodeProperties) {
        super(properties);
        this.portManager = new CanvasPortManager();
    }

    public draw() {
        this.ctx.fillStyle = "black";
        this.ctx.font = "12px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText(this.properties.id, this.position.x + this.dimensions.width / 2, this.position.y + this.dimensions.height + 15);
        this.portManager.draw();
    }

    public get ctx(): CanvasRenderingContext2D {
        return (this.properties as CanvasImageNodeProperties).ctx;
    }

    public contains(x: number, y: number): boolean {
        const path = new Path2D();
        path.rect(this.position.x - this.properties.padding, this.position.y - this.properties.padding,
            this.dimensions.width + this.properties.padding * 2, this.dimensions.height + this.properties.padding * 2);
        const contained = this.ctx.isPointInPath(path, x, y)
        path.closePath();
        return contained;
    }
}
