import {Board} from "@/components/graphs/boards/domain/board";
import {mx} from "@/components/graphs/shared/config/infrastructure/mxgraph";

export class MXBoard extends Board{
    constructor(container: HTMLElement) {
        super(container);
        let model = new mx.mxGraphModel();
        const mxGraph = new mx.mxGraph(container, model);
        new mx.mxRubberband(mxGraph);
        let parent = mxGraph.getDefaultParent();

        // Gets the default parent for inserting new cells. This// is normally the first child of the root (ie. layer 0).// Obtenga el nodo primario predeterminado para el nodo insertado. // Este suele ser el primer hijo del nodo raízvar parent = graph.getDefaultParent();// Adds cells to the model in a single step// Agregar celdas en un paso separado
        model.beginUpdate();
        try {
            var v1 = mxGraph.insertVertex(parent, null, 'Hello,', 20, 20, 80, 30);
            var v2 = mxGraph.insertVertex(parent, null, 'World!', 200, 150, 80, 30);
            var e1 = mxGraph.insertEdge(parent, null, '', v1, v2);
        } finally {  // Updates the display// Actualizar pantalla
            model.endUpdate();
        }

    }

    importModel(model: any): void {
    }
}
