import {Board} from "@/components/graphs/boards/domain/board";
import {RouterNode} from "@/components/graphs/nodes/infrastructure/canvas-node/router-node";
import {CanvasNode} from "@/components/graphs/nodes/infrastructure/canvas-node/canvas-node";

export class CanvasBoard extends Board {
    private readonly ctx: CanvasRenderingContext2D;
    protected nodes: CanvasNode[];

    private isMouseDown: boolean;

    private selectedNode: CanvasNode | undefined;
    private origin: {
        x: number,
        y: number
    }

    constructor(protected readonly container: HTMLCanvasElement) {
        super(container);
        this.setSize(container.offsetWidth, container.offsetHeight);
        this.ctx = container.getContext("2d")!;
        this.nodes = [];
        this.origin = {
            x: 0,
            y: 0
        }
        this.isMouseDown = false;
        window.addEventListener("resize", this.onResize.bind(this));
        window.addEventListener("mousedown", this.onClick.bind(this));
        window.addEventListener("mouseup", this.onMouseUp.bind(this));
        window.addEventListener("mousemove", this.onMouseMove.bind(this));

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
        this.ctx.clearRect(0, 0, this.container.offsetWidth, this.container.offsetHeight)
        for (const node of this.nodes) {
            node.draw();
        }
        if (!!this.selectedNode){
            this.selectedNode.draw()
        }
    }

    importModel(model: object) {
    }

    private onResize(event: UIEvent) {
        let PIXEL_RATIO = window.devicePixelRatio;
        this.setSize(window.innerWidth * PIXEL_RATIO, window.innerHeight * PIXEL_RATIO)
        this.ctx.setTransform(PIXEL_RATIO, 0, 0, PIXEL_RATIO, 0, 0);
        this.draw();
    }

    private onClick(event: MouseEvent) {
        this.isMouseDown = true;
        const rNodes = this.nodes.reverse();
        for (const node of rNodes) {
            if (node.contains(event.clientX, event.clientY)) {
                this.selectedNode = node.select() as CanvasNode;
                return;
            }
        }
        if (this.selectedNode) {
            this.selectedNode.unselect();
            this.selectedNode = undefined;
        }
    }

    private onMouseMove(event: MouseEvent) {
        if(this.isMouseDown){
            if (!!this.selectedNode) {
                this.selectedNode.move(event.clientX - this.selectedNode.position.x, event.clientY - this.selectedNode.position.y);
                this.draw()
                this.container.style.cursor = "grab";
            }
        }
    }

    private onMouseUp(event: MouseEvent) {
        this.isMouseDown = false;
        this.container.style.cursor = "default"
    }

    private moveContext(dx: number, dy: number)
    {
        this.ctx.translate(dx, dy);
        this.draw();
    }
}
