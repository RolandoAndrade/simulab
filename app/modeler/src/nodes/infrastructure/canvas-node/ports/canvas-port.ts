import { CanvasNode } from "../canvas-node";
import {Point} from "../../../../shared";

export abstract class CanvasPort {
    protected static readonly COLOR = "#000000";
    protected static readonly IN_COLOR = "#583e7b";
    protected static readonly OUT_COLOR = "#7d2cff";

    protected static readonly LINE_DASH = [10];
    protected static readonly RADIUS = 5;
    protected static readonly MARGIN = 10;

    protected constructor(protected node: CanvasNode) {}

    abstract contains(x: number, y: number): boolean;
    abstract hover(x: number, y: number): boolean;
    abstract draw(ctx: CanvasRenderingContext2D): void;

    public get positionRightPoint(): Point {
        return {
            x: this.node.position.x + this.node.dimensions.width + 2 * CanvasPort.MARGIN,
            y: this.node.position.y + this.node.dimensions.height / 2,
        };
    }

    public get positionLeftPoint(): Point {
        return {
            x: this.node.position.x - 2 * CanvasPort.MARGIN,
            y: this.node.position.y + this.node.dimensions.height / 2,
        };
    }
}
