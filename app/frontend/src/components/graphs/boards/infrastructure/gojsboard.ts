import {Board} from "@/components/graphs/boards/domain/board";
import {Diagram, GraphObject, Model, Size} from "gojs";

export class GoJSBoard extends Board{

    private readonly diagram: Diagram;

    constructor(container: HTMLElement) {
        super(container);
        this.diagram = GraphObject.make(Diagram, container.id, {
            initialAutoScale: Diagram.Uniform,
            ChangedSelection: this.onSelectionChanged.bind(this),
            "draggingTool.gridSnapCellSize": new Size(10, 1),
            "draggingTool.isGridSnapEnabled": true,
            "undoManager.isEnabled": true,
            ModelChanged: (e) => {     // just for demonstration purposes,
                if (e.isTransactionFinished) {  // show the model data in the page's TextArea
                    this.onModelChanged(e)
                }
            }
        });

        const model = GraphObject.make(Model);
        model.nodeDataArray = [  { key: "Alpha" },
            { key: "Beta" },
            { key: "Gamma" }];
        this.diagram.model = model;
        console.log(this)
    }

    importModel(model: object) {
    }
}
