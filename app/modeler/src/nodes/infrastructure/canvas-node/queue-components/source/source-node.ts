import { CanvasNode } from "../../canvas-node";
import { CanvasSourcePort } from "./source-port";
import { QueueCanvasComponentProperties } from "../../queue-canvas-component-properties";

export class CanvasSourceNode extends CanvasNode {
    protected port: CanvasSourcePort;
    constructor(properties: QueueCanvasComponentProperties) {
        const image = require("assets/queue-components/source.png");
        super({
            ...properties,
            width: 75,
            height: 50,
            padding: 0,
            image,
        });
        this.port = new CanvasSourcePort(this);
    }

    get portCreator(): CanvasSourcePort {
        return this.port;
    }
}
