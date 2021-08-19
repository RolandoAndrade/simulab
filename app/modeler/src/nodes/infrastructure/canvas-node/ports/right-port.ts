import { CanvasPort } from "./index";
import { CanvasNode } from "../canvas-node";
import {Point} from "../../../../shared";

export class RightPort extends CanvasPort {
    constructor(node: CanvasNode) {
        super(node, {
            x: node.position.x + node.dimensions.width + 2 * CanvasPort.MARGIN,
            y: node.position.y + node.dimensions.height / 2,
        });
    }

    public get position(): Point {
        return {
            x: this.node.position.x + this.node.dimensions.width + 2 * CanvasPort.MARGIN,
            y: this.node.position.y + this.node.dimensions.height / 2,
        };
    }


    hover(x: number, y: number): boolean {
        return this.contains(x, y);
    }
}