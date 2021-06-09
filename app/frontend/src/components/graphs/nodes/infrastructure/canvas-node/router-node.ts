import {CanvasNode} from "@/components/graphs/nodes/infrastructure/canvas-node/canvas-node";
import {QueueCanvasComponentProperties} from "@/components/graphs/nodes/infrastructure/canvas-node/queue-canvas-component-properties";

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

    select(): void {
    }
}
