export abstract class CanvasPort {
    protected static readonly COLOR = "#000000";
    protected static readonly LINE_DASH = [10];

    abstract hover(x: number, y: number): boolean;
    abstract draw(ctx: CanvasRenderingContext2D): void;
}
