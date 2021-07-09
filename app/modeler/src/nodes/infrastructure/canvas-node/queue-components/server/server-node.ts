import { CanvasNode } from "../../canvas-node";
import { CanvasServerPort } from "./server-port";
import { QueueCanvasComponentProperties } from "../../queue-canvas-component-properties";

export class CanvasServerNode extends CanvasNode {
    protected port: CanvasServerPort;
    constructor(properties: QueueCanvasComponentProperties) {
        const image = require("assets/queue-components/server.png");
        super({
            ...properties,
            width: 75,
            height: 50,
            padding: 0,
            image,
        });
        this.port = new CanvasServerPort(this);
    }

    get portCreator(): CanvasServerPort {
        return this.port;
    }
}
