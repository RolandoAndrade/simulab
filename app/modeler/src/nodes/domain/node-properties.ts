import {Entity} from "../../shared/types/entity";

export interface NodeProperties {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    padding: number;
    color?: string;
    selected?: boolean;
    entity: Entity
}
