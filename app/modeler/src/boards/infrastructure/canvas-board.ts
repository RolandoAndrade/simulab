import { Board } from "../domain";
import {CanvasNode, CanvasServerNode, CanvasSourceNode} from "../../nodes/infrastructure/canvas-node";
import { Point } from "../../shared/types";
import {Edge, Path} from "../../edge";

export class CanvasBoard extends Board {
    private readonly ctx: CanvasRenderingContext2D;
    protected nodes: CanvasNode[];

    private isMouseDown: boolean;

    private selectedNode: CanvasNode | undefined;
    private createdPath: Edge | undefined;


    private origin: Point;
    private dragStartPoint: Point;

    constructor(protected readonly container: HTMLCanvasElement) {
        super(container);
        this.ctx = this.container.getContext("2d")!;
        this.nodes = [];
        this.origin = new Point(0, 0);
        this.dragStartPoint = new Point(0, 0);
        this.isMouseDown = false;
        this.isCreatingPathEnable = true;
        this.onResize({} as UIEvent);
        window.addEventListener("resize", this.onResize.bind(this));
        this.container.addEventListener("mousedown", this.onClick.bind(this));
        this.container.addEventListener("mouseup", this.onMouseUp.bind(this));
        this.container.addEventListener("mousemove", this.onMouseMove.bind(this));


        const c1 = new CanvasSourceNode({
            x: 10,
            y: 10,
            id: "Source1",
            ctx: this.ctx,
        });

        const c2 = new CanvasServerNode({
            x: 100,
            y: 10,
            id: "Server1",
            ctx: this.ctx,
        });

        const c3 = new CanvasSourceNode({
            x: 120,
            y: 100,
            id: "Source3",
            ctx: this.ctx,
        });

        this.nodes = [c1, c2, c3];
    }

    private setSize(width: number, height: number) {
        this.container.width = width;
        this.container.height = height;
    }

    draw() {
        this.clear();
        for (const node of this.nodes) {
            node.draw();
        }
        if (!!this.selectedNode) {
            this.selectedNode.draw();
        }
    }

    importModel(model: object) {}

    private onResize(event: UIEvent) {
        this.setSize(this.container.offsetWidth, this.container.offsetHeight);
        this.draw();
    }

    private selectNode(){
        const rNodes = this.nodes.reverse();
        for (const node of rNodes) {
            if (node.contains(this.dragStartPoint.x, this.dragStartPoint.y)) {
                if (this.selectedNode) {
                    this.selectedNode.unselect();
                }
                this.selectedNode = node.select() as CanvasNode;
                this.draw();
                return;
            }
        }
        if (this.selectedNode) {
            this.selectedNode.unselect();
            this.draw();
            this.selectedNode = undefined;
        }
    }

    private createPath(){
        const rNodes = this.nodes.reverse();
        for (const node of rNodes) {
            if (node.isOverPort(this.dragStartPoint.x, this.dragStartPoint.y)) {
                this.createdPath = new Path(this.ctx, node, this.dragStartPoint);
                return;
            }
        }
    }

    private onClick(event: MouseEvent) {
        this.isMouseDown = true;
        this.dragStartPoint = new Point(event.offsetX + this.origin.x, event.offsetY + this.origin.y);
        if(this.isCreatingPathEnable){
            this.createPath();
        } else {
            this.selectNode();
        }

    }

    private moveBoard(event: Point) {
        const dx = this.origin.x + event.x - this.dragStartPoint.x;
        const dy = this.origin.y + event.y - this.dragStartPoint.y;
        this.moveContext(dx, dy);
        this.container.style.cursor = "move";
    }

    private moveNode(event: Point){
        if (!!this.selectedNode) {
            this.selectedNode.move(
                event.x + this.origin.x - this.selectedNode.position.x,
                event.y + this.origin.y - this.selectedNode.position.y
            );
            this.container.style.cursor = "grab";
        } else {
            this.moveBoard(event)
        }
    }

    private movePath(event: Point){
        if (!!this.createdPath) {
            this.createdPath.move(
                event.x + this.origin.x - this.createdPath.toPosition.x,
                event.y + this.origin.y - this.createdPath.toPosition.y
            );
            this.container.style.cursor = "grab";
        } else {
            this.moveBoard(event)
        }
    }

    private onMouseMove(event: MouseEvent) {
        if (this.isMouseDown) {
            if(this.isCreatingPathEnable){
                this.movePath(new Point(event.offsetX, event.offsetY))
            } else {
                this.moveNode(new Point(event.offsetX, event.offsetY))
            }

            this.draw();
        } else if (!!this.selectedNode) {
            this.selectedNode.isOverPort(event.offsetX + this.origin.x, event.offsetY + this.origin.y);
            this.draw();
        }
    }

    private onMouseUp(event: MouseEvent) {
        if(!!this.selectedNode){
            this.selectedNode.unselect();
        }
        this.isMouseDown = false;
        this.container.style.cursor = "default";
    }

    private moveContext(dx: number, dy: number) {
        this.ctx.translate(dx, dy);
        this.origin.x -= dx;
        this.origin.y -= dy;
    }

    public clear(color = "#fff") {
        this.ctx.save();
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.container.width, this.container.height);
        this.ctx.restore();
    }
}
