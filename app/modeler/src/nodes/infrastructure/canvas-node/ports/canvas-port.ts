import {CanvasNode} from "@/nodes";

export abstract class CanvasPort {
    protected static readonly COLOR = "#000000";
    protected static readonly LINE_DASH = [10];
    protected static readonly RADIUS = 5;
    protected static readonly MARGIN = 5;

    protected constructor(protected node: CanvasNode) {
    }

    abstract contains(x: number, y: number): boolean;
    abstract hover(x: number, y: number): boolean;
    abstract draw(ctx: CanvasRenderingContext2D): void;
}
