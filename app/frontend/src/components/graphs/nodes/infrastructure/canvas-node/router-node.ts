import {CanvasNode} from "@/components/graphs/nodes/infrastructure/canvas-node/canvas-node";
import {QueueCanvasComponentProperties} from "@/components/graphs/nodes/infrastructure/canvas-node/queue-canvas-component-properties";
import {drawCircumference} from "@/components/graphs/nodes/infrastructure/canvas-node/canvas-shape";
import {CanvasCirclePorts} from "@/components/graphs/nodes/infrastructure/canvas-node/canvas-circle-ports";
import {CanvasPort} from "@/components/graphs/nodes/infrastructure/canvas-node/canvas-port";

export class RouterNode extends CanvasNode {
    constructor(properties: QueueCanvasComponentProperties) {
        const image = require("@/assets/queue-components/router.png");
        super({
            ...properties,
            width: 80,
            height: 80,
            image
        });

    }

    get portCreator(): CanvasPort {
        return new CanvasCirclePorts(this.position.x + this.dimensions.width / 2, this.position.y + this.dimensions.height / 2 , 50);
    }
}
