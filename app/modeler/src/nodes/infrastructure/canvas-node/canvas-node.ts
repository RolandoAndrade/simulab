import { GraphNode } from "../../domain";
import { CanvasNodeProperties } from "./canvas-node-properties";
import {roundedRect} from "../../../shared/functions/canvas.functions";
import {CanvasPortManager} from "./ports/canvas-port-manager";

export abstract class CanvasNode extends GraphNode {
    protected image: HTMLImageElement;
    protected isHover: boolean = false;
    public readonly portManager: CanvasPortManager;

    protected constructor(properties: CanvasNodeProperties) {
        super(properties);
        this.image = new Image();
        this.image.src = properties.image;
        this.image.onload = () => {
            this.draw();
        };
        this.portManager = new CanvasPortManager();
    }

    public draw() {
        const BORDER_RADIUS = 8;
        const MARGIN = 2;
        if (this.isSelected) {
            this.ctx.fillStyle = "purple";
            roundedRect(this.ctx, this.position.x - MARGIN, this.position.y - MARGIN,
                this.dimensions.width + 2 * MARGIN, this.dimensions.height + 2 * MARGIN, BORDER_RADIUS).fill()
        }
        this.ctx.fillStyle = "black";
        this.ctx.drawImage(this.image, this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
        this.ctx.font = "12px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText(this.properties.id, this.position.x + this.dimensions.width / 2, this.position.y + this.dimensions.height + 15);
        this.portManager.draw();
    }

    public get ctx(): CanvasRenderingContext2D {
        return (this.properties as CanvasNodeProperties).ctx;
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
