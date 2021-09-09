import { QueueCanvasComponentProperties } from "../../queue-canvas-component-properties";
import {LeftPort} from "../../ports/left-port";
import {RightPort} from "../../ports/right-port";
import {CanvasImageNode} from "../../canvas-image-node";
import {ProcessBuffer} from "../../queues";

export class CanvasServerNode extends CanvasImageNode {
    protected processBuffer: ProcessBuffer;

    constructor(properties: QueueCanvasComponentProperties) {
        const image = require("assets/queue-components/server.png");
        super({
            ...properties,
            width: 75,
            height: 50,
            padding: 0,
            image,
        });
        this.processBuffer = new ProcessBuffer(this);
        this.portManager.sourcePorts.push(new RightPort(this))
        this.portManager.destinationPorts.push(new LeftPort(this))
    }

    draw() {
        this.processBuffer.draw();
        super.draw();
    }
}
