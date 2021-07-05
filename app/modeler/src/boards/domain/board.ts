import { GraphNode } from "../../nodes/domain";

export abstract class Board {
    protected nodes: GraphNode[];
    protected constructor(protected container: HTMLElement) {
        this.nodes = [];
    }

    /**
     * @description Imports a previous created model.
     * @param model Model to be imported.
     * */
    public abstract importModel(model: any): void;
}
