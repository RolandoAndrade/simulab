import { CanvasImageNodeProperties } from "./canvas-image-node-properties";
import {roundedRect} from "../../../shared/functions/canvas.functions";
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
        super.draw();
        const BORDER_RADIUS = 8;
        const MARGIN = 2;
        if (this.isSelected) {
            this.ctx.fillStyle = "purple";
            roundedRect(this.ctx, this.position.x - MARGIN, this.position.y - MARGIN,
                this.dimensions.width + 2 * MARGIN, this.dimensions.height + 2 * MARGIN, BORDER_RADIUS).fill()
        }
        this.ctx.drawImage(this.image, this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
    }
}