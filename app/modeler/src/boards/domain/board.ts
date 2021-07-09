import { GraphNode } from "../../nodes/domain";
import {Edge} from "../../edge";


export abstract class Board {
    protected nodes: GraphNode[];
    protected paths: Edge[]
    protected isCreatingPathEnable: boolean = false;

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
    public setPathCreation(value: boolean) {
        this.isCreatingPathEnable = value;
    }
}
