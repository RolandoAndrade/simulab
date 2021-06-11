import {Board} from "@/components/graphs/boards/domain/board";
import {RouterNode} from "@/components/graphs/nodes/infrastructure/canvas-node/router-node";
import {CanvasNode} from "@/components/graphs/nodes/infrastructure/canvas-node/canvas-node";

export class CanvasBoard extends Board{
    private readonly ctx: CanvasRenderingContext2D;
    private nodes: CanvasNode[];
    private selectedNode: CanvasNode | undefined;

    constructor(container: HTMLCanvasElement) {
        super(container);
        this.setSize(container.offsetWidth, container.offsetHeight);
        this.ctx = container.getContext("2d")!;
        this.nodes = []
        window.addEventListener("resize", () => {
            this.setSize(window.innerWidth, window.innerHeight)
        });

        window.addEventListener("mousedown", (e) => {
            console.log(e.clientX, e.clientY)
            for (const node of this.nodes){
                console.log(node.position)
                if (node.contains(e.clientX, e.clientY)) {
                    this.selectedNode = node.select() as CanvasNode;
                }
            }
        });
        window.addEventListener("mousemove", (e) => {
            if(!!this.selectedNode){
                this.selectedNode.move(e.clientX - this.selectedNode.position.x, e.clientY - this.selectedNode.position.y);
                this.draw()
                this.container.style.cursor = "grab";
            }
        });
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

    private setSize(width: number, height: number){
        const canvas = this.container as HTMLCanvasElement;
        canvas.width = width;
        canvas.height = height;
        this.container = canvas;
    }

    draw(){
        this.ctx.clearRect(0, 0, this.container.offsetWidth, this.container.offsetHeight)
        for (const node of this.nodes) {
            node.draw();
        }
    }

    importModel(model: object) {
    }
}
