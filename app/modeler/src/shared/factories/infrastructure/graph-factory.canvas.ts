import { CanvasBoard } from "../../../boards/infrastructure";
import {GraphFactory} from "../domain/graph-factory";

export class GraphFactoryCanvas implements GraphFactory {
    createBoard(container: HTMLCanvasElement): CanvasBoard {
        return new CanvasBoard(container);
    }
}
