import {Board} from "@/components/graphs/boards/domain/board";

export class CanvasBoard extends Board{
    private readonly ctx: CanvasRenderingContext2D;

    constructor(container: HTMLCanvasElement) {
        super(container);
        this.setSize(container.offsetWidth, container.offsetHeight);
        this.ctx = container.getContext("2d")!;
        window.addEventListener("resize", () => {
            this.setSize(window.innerWidth, window.innerHeight)
        });
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
