import {Board} from "@/components/graphs/boards/domain/board";
import {RouterNode} from "@/components/graphs/nodes/infrastructure/canvas-node/router-node";

export class CanvasBoard extends Board{
    private readonly ctx: CanvasRenderingContext2D;

    constructor(container: HTMLCanvasElement) {
        super(container);
        this.setSize(container.offsetWidth, container.offsetHeight);
        this.ctx = container.getContext("2d")!;
        window.addEventListener("resize", () => {
            this.setSize(window.innerWidth, window.innerHeight)
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
            color: "#09f",
            ctx: this.ctx
        })

        const c3 =
            new RouterNode({
            x: 120,
            y: 100,
            id: "1111",
            color: "#fad",
            ctx: this.ctx
        })

        setTimeout(()=>{
            c1.draw();
            c2.draw();
            c3.draw()
        }, 1000)
    }

    private setSize(width: number, height: number){
        const canvas = this.container as HTMLCanvasElement;
        canvas.width = width;
        canvas.height = height;
        this.container = canvas;
    }

    importModel(model: object) {
    }
}
