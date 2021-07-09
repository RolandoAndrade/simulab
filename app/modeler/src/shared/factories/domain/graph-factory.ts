import { Board } from "../../../boards";
import {NodeCreator, NodeCreatorType} from "../../../nodes/domain/node-creator";
import {Entity} from "../../types/entity";

export interface GraphFactory {
    createBoard(container: HTMLElement): Board;
    createNodeCreator(nodeCreatorType: NodeCreatorType, entity: Entity): NodeCreator;
}
