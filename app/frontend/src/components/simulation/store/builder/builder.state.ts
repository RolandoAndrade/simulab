import {Board, CanvasNode, Path} from "modeler";
import { ExpressionManager } from "@/components/simulation/domain/expression-manager";

export interface BuilderState {
    boardContainer?: HTMLCanvasElement;
    board?: Board;
    selected?: Path | CanvasNode;
    expressionManager: ExpressionManager;
    emitters: string[]
}
