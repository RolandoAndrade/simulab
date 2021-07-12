import { GraphNode } from "../../nodes/domain";
import {Edge} from "../../edge";
import {NodeCreator} from "../../nodes/domain/node-creator";


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

    /**
     * @description Creates a node
     * @param nodeCreator Node creator for an specific node
     * @param x Start position x
     * @param y Start position y
     * */
    public abstract createNode(nodeCreator: NodeCreator, x?: number, y?: number): void;
}
