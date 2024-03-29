import {Entity} from "../../../shared/types/entity";

export interface QueueCanvasComponentProperties {
    id: string;
    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    color?: string;
    entity: Entity
}
