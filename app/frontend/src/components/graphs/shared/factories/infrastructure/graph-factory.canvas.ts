import {GraphFactory} from "@/components/graphs/shared/factories/domain/graph-factory";
import {CanvasBoard} from "@/components/graphs/boards/infrastructure/canvas-board";

export class GraphFactoryCanvas implements GraphFactory {
    createBoard(container: HTMLCanvasElement): CanvasBoard {
        return new CanvasBoard(container);
    }

}
