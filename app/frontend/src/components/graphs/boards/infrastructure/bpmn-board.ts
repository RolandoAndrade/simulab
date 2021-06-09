import {Board} from "@/components/graphs/boards/domain/board";
// @ts-ignore
import pizzaDiagram from './example.bpmn';

import BpmnViewer from 'bpmn-js';

export class BPMNBoard extends Board {
    constructor(container: HTMLElement) {
        super(container);
        // we use stringify to inline an example XML document


        var viewer = new BpmnViewer({
            container: `#${container.id}`
        });
        viewer.importXML(pizzaDiagram, (err, warn)=>{
            console.log('success !', warn);

            viewer.get('canvas').zoom('fit-viewport');
        });
    }


    importModel(model: any): void {
    }

}
