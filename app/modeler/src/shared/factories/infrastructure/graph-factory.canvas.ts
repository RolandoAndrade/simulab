import {GraphFactory} from "../domain/graph-factory";
import {CanvasBoard} from "../../../boards/infrastructure/canvas-board";


export class GraphFactoryCanvas implements GraphFactory {
    createBoard(container: HTMLCanvasElement): CanvasBoard {
        return new CanvasBoard(container);
    }

}
