import {CanvasNode} from "../../canvas-node";
import {QueueCanvasComponentProperties} from "../../queue-canvas-component-properties";
import {CanvasSinkPort} from "./sink-port";

export class CanvasSinkNode extends CanvasNode {
    protected port: CanvasSinkPort;
    constructor(properties: QueueCanvasComponentProperties) {
        const image = require("assets/queue-components/sink.png");
        super({
            ...properties,
            width: 75,
            height: 50,
            padding: 0,
            image,
        });
        this.port = new CanvasSinkPort(this);
    }

    get portCreator(): CanvasSinkPort {
        return this.port;
    }
}
