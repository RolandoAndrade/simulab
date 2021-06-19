import {GraphNode} from "@/nodes/domain/graph-node";


export abstract class Board {
    protected nodes: GraphNode[];
    protected constructor(protected container: HTMLElement) {
        this.nodes = []
    }

    /**
     * @description Imports a previous created model.
     * @param model Model to be imported.
     * */
    public abstract importModel(model: any): void;

    onSelectionChanged(...args: any[]){

    }

    onModelChanged(...args: any[]) {

    }
}
