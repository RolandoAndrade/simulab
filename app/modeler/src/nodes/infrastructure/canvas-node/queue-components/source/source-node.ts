import {CanvasNode, CanvasSourcePort} from "@/nodes";
import {QueueCanvasComponentProperties} from "@/nodes";


export class CanvasSourceNode extends CanvasNode {
    protected port: CanvasSourcePort;
    constructor(properties: QueueCanvasComponentProperties) {
        const image = require("@/assets/queue-components/source.png");
        super({
            ...properties,
            width: 80,
            height: 80,
            padding: 5,
            image
        });
        this.port = new CanvasSourcePort(this);
    }

    get portCreator(): CanvasSourcePort {
        return this.port;
    }
}
