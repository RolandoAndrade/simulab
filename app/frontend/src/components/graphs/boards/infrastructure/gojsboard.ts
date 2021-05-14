import {Board} from "@/components/graphs/boards/domain/board";
import {Diagram, GraphObject, Model} from "gojs";

export class GoJSBoard extends Board{

    private readonly diagram: Diagram;

    constructor(container: HTMLElement) {
        super(container);
        this.diagram = GraphObject.make(Diagram, container.id, {
            "undoManager.isEnabled": true
        });
        const model = GraphObject.make(Model);
        model.nodeDataArray = [  { key: "Alpha" },
            { key: "Beta" },
            { key: "Gamma" }];
        this.diagram.model = model;
        console.log(this)
    }
}
