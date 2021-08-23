import { GraphNode } from "../../domain";
import { CanvasImageNodeProperties } from "./canvas-image-node-properties";
import {roundedRect} from "../../../shared/functions/canvas.functions";
import {CanvasPortManager} from "./ports/canvas-port-manager";
import {CanvasNode} from "./canvas-node";

export abstract class CanvasImageNode extends CanvasNode {
    protected image: HTMLImageElement;

    protected constructor(properties: CanvasImageNodeProperties) {
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
}