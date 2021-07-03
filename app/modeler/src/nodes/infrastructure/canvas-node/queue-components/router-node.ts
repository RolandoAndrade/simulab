import {CanvasNode} from "@/nodes";
import {CanvasCirclePorts} from "@/nodes";
import {QueueCanvasComponentProperties} from "@/nodes";
import {CanvasPort} from "@/nodes";


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
