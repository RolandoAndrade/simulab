import { CanvasPort } from "./index";
import { CanvasNode } from "../canvas-node";
import {Point} from "../../../../shared";

export class LeftPort extends CanvasPort {
    constructor(node: CanvasNode) {
        super(node, {
            x: node.position.x - 2 * CanvasPort.MARGIN,
            y: node.position.y + node.dimensions.height / 2,
        });
    }

    contains(x: number, y: number): boolean {
        return super.contains(x, y);
    }

    public get position(): Point {
        return {
            x: this.node.position.x - 2 * CanvasPort.MARGIN,
            y: this.node.position.y + this.node.dimensions.height / 2,
        };
    }

    hover(x: number, y: number): boolean {
        return this.contains(x, y);
    }
}