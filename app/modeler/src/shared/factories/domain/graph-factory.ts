import {Board} from "../../../boards/domain/board";

export interface GraphFactory{
    createBoard(container: HTMLElement): Board;
}
