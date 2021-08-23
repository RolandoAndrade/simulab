import {CanvasImageNode} from "../../canvas-image-node";
import {QueueCanvasComponentProperties} from "../../queue-canvas-component-properties";
import {LeftPort} from "../../ports/left-port";

export class CanvasSinkNode extends CanvasImageNode {
    constructor(properties: QueueCanvasComponentProperties) {
        const image = require("assets/queue-components/sink.png");
        super({
            ...properties,
            width: 75,
            height: 50,
            padding: 0,
            image,
        });
        this.portManager.destinationPorts.push(new LeftPort(this))
    }
}
