import {CanvasNode} from "@/components/graphs/nodes/infrastructure/canvas-node/canvas-node";
import {QueueCanvasComponentProperties} from "@/components/graphs/nodes/infrastructure/canvas-node/queue-canvas-component-properties";
import {drawCircumference} from "@/components/graphs/nodes/infrastructure/canvas-node/canvas-shape";
import {CanvasCirclePorts} from "@/components/graphs/nodes/infrastructure/canvas-node/canvas-circle-ports";
import {CanvasPort} from "@/components/graphs/nodes/infrastructure/canvas-node/canvas-port";

export class RouterNode extends CanvasNode {
    protected ports: CanvasCirclePorts;
    constructor(properties: QueueCanvasComponentProperties) {
        const image = require("@/assets/queue-components/router.png");
        super({
            ...properties,
            width: 80,
            height: 80,
            padding: 5,
            image
        });
        this.ports = new CanvasCirclePorts(this.position.x + this.dimensions.width / 2, this.position.y + this.dimensions.height / 2 , 40);

    }

    get portCreator(): CanvasPort {
        this.ports.cx = this.position.x + this.dimensions.width / 2;
        this.ports.cy = this.position.y + this.dimensions.height / 2;
        return this.ports;
    }
}
