import { CanvasNode } from "../../canvas-node";
import { QueueCanvasComponentProperties } from "../../queue-canvas-component-properties";
import {RightPort} from "../../ports/right-port";

export class CanvasSourceNode extends CanvasNode {
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
