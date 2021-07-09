import { Board } from "../../../boards";

export interface GraphFactory {
    createBoard(container: HTMLElement): Board;
}
