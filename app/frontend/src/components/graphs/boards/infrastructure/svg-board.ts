import {Board} from "@/components/graphs/boards/domain/board";

export class SVGBoard extends Board {

    constructor(container: HTMLElement) {
        super(container);
        container.innerHTML += '<svg xmlns="http://www.w3.org/2000/svg" style="z-index:10;margin:0;padding:0;top:0em" onclick="go()" width="100%" height="100%"><circle cx="40" cy="40" r="40" stroke="red" stroke-width="4" fill="blue" /></svg>';
    }


    importModel(model: any): void {
    }

}
