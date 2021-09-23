import {CanvasQueue} from "./canvas-queue";
import {CanvasPort} from "../ports";
import {Entity} from "../../../../shared";
import {CanvasEntity} from "../queue-components/entity";

export class InputQueue extends CanvasQueue {
    constructor(node: CanvasPort) {
        super(node)
    }

    draw(): void {
        this.ctx.fillStyle = 'cyan';
        this.ctx.fillRect(this.position.x - CanvasQueue.WIDTH, this.position.y - CanvasQueue.HEIGHT / 2,
            CanvasQueue.WIDTH, CanvasQueue.HEIGHT);
        this.drawEntities()
    }

    addEntity(entity: Entity) {
        const e = new CanvasEntity(entity, this);
        e.move(- (e.dimensions.width + 10) * this.entities.length, - e.dimensions.height / 2)
        this.entities.push(e);
    }
}