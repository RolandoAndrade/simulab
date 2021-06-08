// @ts-nocheck
import {Board} from "@/components/graphs/boards/domain/board";
import pizzaDiagram from './example.bpmn';

import BpmnViewer from 'bpmn-js';

export class BPMNBoard extends Board {
    constructor(container: HTMLElement) {
        super(container);
        // we use stringify to inline an example XML document


        var viewer = new BpmnViewer({
            container: `#${container.id}`
        });
        viewer.importXML(pizzaDiagram).then(function(result) {

            const { warnings } = result;

            console.log('success !', warnings);

            viewer.get('canvas').zoom('fit-viewport');
        }).catch(function(err) {

            const { warnings, message } = err;

            console.log('something went wrong:', warnings, message);
        });
    }


    importModel(model: any): void {
    }

}
