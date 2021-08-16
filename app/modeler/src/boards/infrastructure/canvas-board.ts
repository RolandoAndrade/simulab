import {Board} from "../domain";
import {CanvasNode} from "../../nodes/infrastructure/canvas-node";
import {Point} from "../../shared/types";
import {Edge, Path} from "../../edge";
import {NodeCreator} from "../../nodes";
//@ts-ignore
import {ResizeObserver} from "resize-observer";
import {BoardMode} from "../domain/board-mode";

const deleteCursor = require("assets/cursors/cursor-eraser.png")

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
        this.onResize({} as UIEvent);
        new ResizeObserver(this.onResize.bind(this)).observe(this.container)
        this.container.addEventListener("mousedown", this.onClick.bind(this));
        this.container.addEventListener("mouseup", this.onMouseUp.bind(this));
        this.container.addEventListener("mousemove", this.onMouseMove.bind(this));
    }

    private setSize(width: number, height: number) {
        this.container.width = width;
        this.container.height = height - 7;
    }

    draw() {
        this.clear();
        for (const path of this.paths) {
            path.draw();
        }
        for (const node of this.nodes) {
            node.draw();
        }
        if (!!this.selectedNode) {
            this.selectedNode.draw();
        }
        if (!!this.createdPath) {
            this.createdPath.draw();
        }
    }

    importModel(model: object) {}

    private onResize(event: UIEvent) {
        this.setSize(this.container.offsetWidth, this.container.offsetHeight);
        this.origin = new Point(0,0)
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
            if (node.portCreator.containsRightPort(this.dragStartPoint.x, this.dragStartPoint.y)) {
                this.createdPath = new Path(this.ctx, node, this.dragStartPoint);
                this.draw();
                return;
            }
        }
        this.setMode(BoardMode.DEFAULT_MODE);
    }

    private onClick(event: MouseEvent) {
        this.isMouseDown = true;
        this.dragStartPoint = new Point(event.offsetX + this.origin.x, event.offsetY + this.origin.y);
        if(this.isCreatingPathEnable){
            this.createPath();
        } else {
            this.selectNode();
            if (this.isDeletingEnable){
                if (this.selectedNode){
                    this.nodes = this.nodes.filter((node)=>node!=this.selectedNode);
                    this.selectedNode = undefined;
                    this.draw();
                }
            }
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
                event.x + this.origin.x,
                event.y + this.origin.y
            );
            this.container.style.cursor = "cell";
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
        }
    }

    private finishPath(event: Point){
        const rNodes = this.nodes.reverse();
        for (const node of rNodes) {
            if (node.portCreator.containsLeftPort(event.x, event.y)) {
                this.paths.push(new Path(this.ctx, this.createdPath!.fromNode, node));
                break;
            }
        }
        this.createdPath = undefined;
        this.setMode(BoardMode.DEFAULT_MODE);
        this.draw();
    }

    private onMouseUp(event: MouseEvent) {
        this.isMouseDown = false;

        if(!!this.selectedNode){
            this.selectedNode.unselect();
        }
        if(!!this.createdPath){
            this.setMode(BoardMode.CREATING_PATH_MODE);
            this.finishPath(new Point(event.offsetX + this.origin.x, event.offsetY + this.origin.y))
        }
        this.setMode(BoardMode.DEFAULT_MODE);
    }

    private moveContext(dx: number, dy: number) {
        this.ctx.translate(dx, dy);
        this.origin.x -= dx;
        this.origin.y -= dy;
    }

    public clear(color = "#fafafa") {
        this.ctx.save();
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.container.width, this.container.height);
        this.ctx.restore();
    }

    public setMode(value: BoardMode) {
        super.setMode(value);
        if (this.isCreatingPathEnable) {
            this.container.style.cursor = "crosshair";
        } else if (this.isDeletingEnable) {

            this.container.style.cursor = `url(${deleteCursor}), auto`;
        } else {
            this.container.style.cursor = "default";
        }
    }

    public createNode(nodeCreator: NodeCreator, x: number = 120, y: number = 120) {
        this.nodes.push(nodeCreator.create({
            ctx: this.ctx,
            x: this.origin.x + x,
            y: this.origin.y + y
        }) as CanvasNode);
        this.draw();
    }
}
