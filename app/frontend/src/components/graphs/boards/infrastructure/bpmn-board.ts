import {Board} from "@/components/graphs/boards/domain/board";
// @ts-ignore
import pizzaDiagram from './example.bpmn';

import BpmnModeler from 'bpmn-js/lib/Modeler';

export class BPMNBoard extends Board {
    constructor(container: HTMLElement) {
        super(container);
        // we use stringify to inline an example XML document


        var modeler = new BpmnModeler({
            container: `#${container.id}`
        });
        function createNewDiagram() {
            openDiagram(pizzaDiagram);
        }

        async function openDiagram(xml: any) {

            try {
                await modeler.importXML(xml);
                container.classList.remove('with-error');
                container.classList.add('with-diagram');

            } catch (err) {
                console.error(err);
            }
        }
        function registerFileDrop(container: HTMLElement, callback: { (xml: any): Promise<void>; (arg0: string | ArrayBuffer | null): void; }) {

            function handleFileSelect(e: any) {
                e.stopPropagation();
                e.preventDefault();

                var files = e.dataTransfer.files;

                var file = files[0];

                var reader = new FileReader();

                reader.onload = function(e) {

                    var xml = e.target!.result;

                    callback(xml);
                };

                reader.readAsText(file);
            }

            function handleDragOver(e: any) {
                e.stopPropagation();
                e.preventDefault();

                e.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
            }

            container.addEventListener('dragover', handleDragOver, false);
            container.addEventListener('drop', handleFileSelect, false);
        }


// file drag / drop ///////////////////////

// check file api availability
        if (!window.FileList || !window.FileReader) {
            window.alert(
                'Looks like you use an older browser that does not support drag and drop. ' +
                'Try using Chrome, Firefox or the Internet Explorer > 10.');
        } else {
            registerFileDrop(container, openDiagram);
        }

// bootstrap diagram functions
        createNewDiagram()


// helpers //////////////////////

        function debounce(fn: TimerHandler, timeout: number | undefined) {

            var timer: any;

            return function() {
                if (timer) {
                    clearTimeout(timer);
                }

                timer = setTimeout(fn, timeout);
            };
        }
    }


    importModel(model: any): void {
    }

}
