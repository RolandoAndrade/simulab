import {Board} from "../domain/board";
import {CanvasNode} from "../../nodes/infrastructure/canvas-node/canvas-node";
import {Point} from "../../shared/types/point";
import {RouterNode} from "../../nodes/infrastructure/canvas-node/router-node";

export class CanvasBoard extends Board {
    private readonly ctx: CanvasRenderingContext2D;
    protected nodes: CanvasNode[];

    private isMouseDown: boolean;

    private selectedNode: CanvasNode | undefined;
    private origin: Point
    private dragStartPoint: Point

    constructor(protected readonly container: HTMLCanvasElement) {
        super(container);
        this.setSize(container.offsetWidth, container.offsetHeight);
        this.ctx = container.getContext("2d")!;
        this.nodes = [];
        this.origin = new Point(0,0);
        this.dragStartPoint = new Point(0,0);
        this.isMouseDown = false;
        this.container.addEventListener("resize", this.onResize.bind(this));
        this.container.addEventListener("mousedown", this.onClick.bind(this));
        this.container.addEventListener("mouseup", this.onMouseUp.bind(this));
        this.container.addEventListener("mousemove", this.onMouseMove.bind(this));

        const c1 = new RouterNode({
            x: 10,
            y: 10,
            id: "1111",
            ctx: this.ctx
        })

        const c2 = new RouterNode({
            x: 100,
            y: 10,
            id: "1111",
            ctx: this.ctx
        })

        const c3 =
            new RouterNode({
                x: 120,
                y: 100,
                id: "1111",
                ctx: this.ctx
            })

        this.nodes = [c1, c2, c3]
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
            this.selectedNode.draw()
        }
    }

    importModel(model: object) {
    }

    private onResize(event: UIEvent) {
        this.setSize(this.container.offsetWidth, this.container.offsetHeight)
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.draw();
    }

    private onClick(event: MouseEvent) {
        this.isMouseDown = true;
        this.dragStartPoint = new Point(event.offsetX + this.origin.x, event.offsetY + this.origin.y);
        const rNodes = this.nodes.reverse();
        for (const node of rNodes) {
            if (node.contains(this.dragStartPoint.x, this.dragStartPoint.y)) {
                if(this.selectedNode) {
                    if (this.selectedNode == node) {
                        if (this.selectedNode.isOverPort(this.dragStartPoint.x, this.dragStartPoint.y)) {
                            console.log("Creating link")
                        }
                    } else {
                        this.selectedNode.unselect();
                    }
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

    private onMouseMove(event: MouseEvent) {
        if (this.isMouseDown) {
            if (!!this.selectedNode) {
                this.selectedNode.isOverPort(event.offsetX + this.origin.x, event.offsetY + this.origin.y);
                this.selectedNode.move(event.offsetX + this.origin.x - this.selectedNode.position.x, event.offsetY + this.origin.y - this.selectedNode.position.y);
                this.container.style.cursor = "grab";
            }
            else {
                const dx = this.origin.x + event.offsetX - this.dragStartPoint.x;
                const dy = this.origin.y + event.offsetY - this.dragStartPoint.y;
                this.moveContext(dx, dy);
                this.container.style.cursor = "move";
            }

            this.draw();
        }
        else if (!!this.selectedNode) {
            this.selectedNode.isOverPort(event.offsetX + this.origin.x, event.offsetY + this.origin.y);
            this.draw();
        }
    }

    private onMouseUp(event: MouseEvent) {
        this.isMouseDown = false;
        this.container.style.cursor = "default"
    }

    private moveContext(dx: number, dy: number) {
        this.ctx.translate(dx, dy);
        this.origin.x -= dx;
        this.origin.y -= dy;
    }

    public clear(color = "#fff")
    {
        this.ctx.save();
        this.ctx.setTransform(1,0,0,1,0,0);
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0,0,this.container.width,this.container.height);
        this.ctx.restore();
    }
}


