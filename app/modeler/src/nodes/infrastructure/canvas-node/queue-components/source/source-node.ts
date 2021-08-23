import {CanvasImageNode} from "../../canvas-image-node";
import { QueueCanvasComponentProperties } from "../../queue-canvas-component-properties";
import {RightPort} from "../../ports/right-port";

export class CanvasSourceNode extends CanvasImageNode {
    constructor(properties: QueueCanvasComponentProperties) {
        const image = require("assets/queue-components/source.png");
        super({
            ...properties,
            width: 75,
            height: 50,
            padding: 0,
            image,
        });

        this.portManager.sourcePorts.push(new RightPort(this))
    }
}
