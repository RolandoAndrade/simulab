import {CanvasEntity} from "../queue-components/entity";
import {Entity, Point} from "../../../../shared";
import {CanvasNode} from "../canvas-node";
import {CanvasPort} from "../ports";

export abstract class CanvasQueue {
    protected static WIDTH = 75;
    protected static HEIGHT = 2;

    protected entities: CanvasEntity[]
    protected constructor(protected node: CanvasNode | CanvasPort) {
        this.entities = []
    }

    get position(): Point {
        return this.node.position
    }

    get ctx(): CanvasRenderingContext2D {
        return this.node.ctx
    }

    addEntity(entity: Entity) {
        const e = new CanvasEntity(entity, this);
        e.move(CanvasQueue.WIDTH - (e.dimensions.width + 10) * this.entities.length, - e.dimensions.height / 2)
        this.entities.push(e);
    }

    removeEntity(id: string) {
        this.entities = this.entities.filter((e)=>e.getEntity().name != id)
    }

    protected drawEntities() {
        for (let i = 0; i < 3 && i < this.entities.length; i++) {
            this.entities[i].draw();
        }
    }

    abstract draw(): void;
}