export abstract class CanvasPort {
    protected static readonly COLOR = "#78d5ea";
    protected static readonly LINE_DASH = [10];

    abstract contains(x: number, y: number): boolean;
    abstract draw(ctx: CanvasRenderingContext2D): void;
}
