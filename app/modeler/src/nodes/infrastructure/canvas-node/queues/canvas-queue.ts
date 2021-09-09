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
        this.entities.push(new CanvasEntity(entity, this));
    }

    removeEntity(id: string) {
        this.entities = this.entities.filter((e)=>e.getEntity().name != id)
    }

    abstract draw(): void;
}