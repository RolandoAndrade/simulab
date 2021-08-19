import { GraphNode } from "../../domain";
import { CanvasNodeProperties } from "./canvas-node-properties";
import { CanvasPort } from "./ports";
import {roundedRect} from "../../../shared/functions/canvas.functions";

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
        const BORDER_RADIUS = 8;
        const MARGIN = 2;
        if (this.isSelected) {
            //this.ctx.beginPath();
            //this.ctx.setLineDash([10, 4]);
            this.ctx.fillStyle = "purple";
            //this.ctx.lineWidth = 1;
            roundedRect(this.ctx, this.position.x - MARGIN, this.position.y - MARGIN,
                this.dimensions.width + 2 * MARGIN, this.dimensions.height + 2 * MARGIN, BORDER_RADIUS).fill()
            //this.ctx.setLineDash([])
        }
        this.ctx.fillStyle = "black";
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
