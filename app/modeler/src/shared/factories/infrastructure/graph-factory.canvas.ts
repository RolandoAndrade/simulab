import { CanvasBoard } from "../../../boards/infrastructure";
import {GraphFactory} from "../domain/graph-factory";
import {NodeCreator, NodeCreatorType} from "../../../nodes/domain/node-creator";
import {ServerNodeCreator, SinkNodeCreator, SourceNodeCreator} from "../../../nodes";
import {Entity} from "../../types/entity";

export class GraphFactoryCanvas implements GraphFactory {

    nodeCreatorTypes = {
        [NodeCreatorType.SOURCE]: SourceNodeCreator,
        [NodeCreatorType.SERVER]: ServerNodeCreator,
        [NodeCreatorType.SINK]: SinkNodeCreator,
        [NodeCreatorType.COMBINER]: SinkNodeCreator,
        [NodeCreatorType.SEPARATOR]: SinkNodeCreator,
        [NodeCreatorType.LABEL]: SinkNodeCreator,
    }

    createBoard(container: HTMLCanvasElement): CanvasBoard {
        return new CanvasBoard(container);
    }

    createNodeCreator(nodeCreatorType: NodeCreatorType, entity: Entity): NodeCreator {
        return new this.nodeCreatorTypes[nodeCreatorType](entity);
    }
}
