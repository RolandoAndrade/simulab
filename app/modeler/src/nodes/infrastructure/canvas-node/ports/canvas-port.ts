import { CanvasNode } from "../canvas-node";
import {Point} from "../../../../shared";
import {GraphNode, NodeProperties} from "../../../domain";
import {CanvasQueue} from "../queues";

export abstract class CanvasPort extends GraphNode {
    protected static readonly COLOR = "#000000";
    protected static readonly IN_COLOR = "#583e7b";
    protected static readonly OUT_COLOR = "#7d2cff";

    protected static readonly LINE_DASH = [10];
    protected static readonly RADIUS = 5;
    protected static readonly PADDING = 5;
    protected static readonly SELECTION_RADIUS = CanvasPort.RADIUS * 1.5;
    public static readonly MARGIN = 10;


    protected queue: CanvasQueue

    protected constructor(public readonly node: CanvasNode,  position: Point) {
        super({
            entity: undefined,
            height: 10,
            id: "",
            padding: CanvasPort.PADDING,
            width: CanvasPort.RADIUS * 2,
            x: position.x,
            y: position.y
        })
    }

    abstract hover(x: number, y: number): boolean;

    public get positionLeftPoint(): Point {
        return {
            x: this.node.position.x - 2 * CanvasPort.MARGIN,
            y: this.node.position.y + this.node.dimensions.height / 2,
        };
    }

    public contains(x: number, y: number): boolean {
        const path = new Path2D();
        path.rect(this.position.x - this.properties.padding, this.position.y - this.properties.padding,
            this.dimensions.width + this.properties.padding * 2, this.dimensions.height + this.properties.padding * 2);
        const contained = this.node.ctx.isPointInPath(path, x, y)
        path.closePath();
        return contained;
    }

    public get ctx(): CanvasRenderingContext2D {
        return this.node.ctx;
    }

    public draw(): void {
        if (!!this.queue) this.queue.draw();
        this.node.ctx.save();
        this.node.ctx.translate(this.position.x, this.position.y);
        this.node.ctx.rotate(Math.PI / 4);
        this.node.ctx.fillStyle = CanvasPort.OUT_COLOR;
        this.node.ctx.translate(-CanvasPort.RADIUS, -CanvasPort.RADIUS);
        this.node.ctx.fillRect(0, 0, 2 * CanvasPort.RADIUS, 2 * CanvasPort.RADIUS);
        this.node.ctx.restore();
    }
}
