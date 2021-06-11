import {Board} from "@/components/graphs/boards/domain/board";

export class SVGBoard extends Board {

    constructor(container: HTMLElement) {
        super(container);
        const image = require("@/assets/queue-components/router.png");
        container.innerHTML += '<svg xmlns="http://www.w3.org/2000/svg" style="z-index:10;margin:0;padding:0;top:0em" onclick="go()" width="100%" height="100%">' +
            '<image href="'+ image +'" height="80" width="80" x="10" y="20" style="fill: red"/>\n' +
            '</svg>';
    }


    importModel(model: any): void {
    }

}
