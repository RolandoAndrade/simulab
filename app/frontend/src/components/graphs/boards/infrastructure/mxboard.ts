import {Board} from "@/components/graphs/boards/domain/board";
import {mxgraph} from 'mxgraph';
import {mx} from "@/components/graphs/shared/config/infrastructure/mxgraph";

export class Mxboard extends Board{
    constructor(container: HTMLElement) {
        super(container);
        let model = new mx.mxGraphModel();
        const mxGraph = new mx.mxGraph(container, model);
        new mx.mxRubberband(mxGraph);
        let parent = mxGraph.getDefaultParent();

        // Adds cells to the model in a single step
        mxGraph.getModel().beginUpdate();
        try {
            var cell = new mx.mxCell('Classname', new mx.mxGeometry(0, 0, 160, 90),
                'swimlane;fontStyle=1;align=center;verticalAlign=top;childLayout=stackLayout;horizontal=1;startSize=26;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;');
            cell.vertex = true;

            var field = new mx.mxCell('+ field: type', new mx.mxGeometry(0, 0, 100, 26), 'text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;');
            field.vertex = true;

            var divider = new mx.mxCell('', new mx.mxGeometry(0, 0, 40, 8), 'line;strokeWidth=1;fillColor=none;align=left;verticalAlign=middle;spacingTop=-1;spacingLeft=3;spacingRight=3;rotatable=0;labelPosition=right;points=[];portConstraint=eastwest;');
            divider.vertex = true;
            cell.insert(field.clone());
            cell.insert(divider.clone());

            mxGraph.addCell(cell, parent)
            var v1 = mxGraph.insertVertex(parent, null,
                'Super,', 20, 20, 80, 30, 'fillColor=green');
            var v2 = mxGraph.insertVertex(parent, null,
                'Kirby!', 200, 150, 80, 30);
            var e1 = mxGraph.insertEdge(parent, null, '', v1, v2);
        } finally {
            // Updates the display
            mxGraph.getModel().endUpdate();
        }
    }
}
