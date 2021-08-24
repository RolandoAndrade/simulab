import {Board, CanvasNode, Path} from "modeler";

export interface BuilderState {
    boardContainer?: HTMLCanvasElement;
    board?: Board;
    selected?: Path | CanvasNode
}