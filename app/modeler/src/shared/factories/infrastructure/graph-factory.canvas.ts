import { GraphFactory } from "../domain";
import { CanvasBoard } from "../../../boards/infrastructure";

export class GraphFactoryCanvas implements GraphFactory {
    createBoard(container: HTMLCanvasElement): CanvasBoard {
        return new CanvasBoard(container);
    }
}
