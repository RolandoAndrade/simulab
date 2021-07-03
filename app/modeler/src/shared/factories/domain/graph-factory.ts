import {Board} from "../../../boards/domain";


export interface GraphFactory{
    createBoard(container: HTMLElement): Board;
}
