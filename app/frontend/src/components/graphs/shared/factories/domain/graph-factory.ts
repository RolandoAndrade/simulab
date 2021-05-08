import {Board} from "@/components/graphs/boards/domain/board";

export interface GraphFactory{
    createBoard(container: HTMLElement): Board;
}
