import { CanvasNode } from "../canvas-node";

export abstract class CanvasPort {
    protected static readonly COLOR = "#000000";
    protected static readonly IN_COLOR = "#1f1f1f";
    protected static readonly OUT_COLOR = "#7d2cff";

    protected static readonly LINE_DASH = [10];
    protected static readonly RADIUS = 5;
    protected static readonly MARGIN = 10;

    protected constructor(protected node: CanvasNode) {}

    abstract contains(x: number, y: number): boolean;
    abstract hover(x: number, y: number): boolean;
    abstract draw(ctx: CanvasRenderingContext2D): void;
}
