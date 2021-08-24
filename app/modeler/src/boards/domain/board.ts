import {GraphNode} from "../../nodes/domain";
import {Edge} from "../../edge";
import {NodeCreator} from "../../nodes/domain/node-creator";
import {BoardMode} from "./board-mode";


export abstract class Board {
    protected nodes: GraphNode[];
    protected paths: Edge[]
    protected isCreatingPathEnable: boolean = false;
    protected isDeletingEnable: boolean = false;
    protected currentMode: BoardMode = BoardMode.DEFAULT_MODE;

    protected constructor(protected container: HTMLElement) {
        this.nodes = [];
        this.paths = [];
    }

    /**
     * @description Imports a previous created model.
     * @param model Model to be imported.
     * */
    public abstract importModel(model: any): void;


    /**
     * @description Sets the path creation mode
     * @param value Enable or disable
     * */
    public setMode(value: BoardMode) {
        const modes = {
            [BoardMode.CREATING_PATH_MODE]: false,
            [BoardMode.ERASING_MODE]: false,
            [BoardMode.DEFAULT_MODE]: false,
        }
        modes[value] = true;
        this.isCreatingPathEnable = modes[BoardMode.CREATING_PATH_MODE];
        this.isDeletingEnable = modes[BoardMode.ERASING_MODE];
        this.currentMode = value;
    }

    /**
     * @description Gets the mode of the board.
     * */
    public getMode(): BoardMode {
        return this.currentMode;
    }

    /**
     * @description Creates a node
     * @param nodeCreator Node creator for an specific node
     * @param x Start position x
     * @param y Start position y
     * */
    public abstract createNode(nodeCreator: NodeCreator, x?: number, y?: number): void;
}
