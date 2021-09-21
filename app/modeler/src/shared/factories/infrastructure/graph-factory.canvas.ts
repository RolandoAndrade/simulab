import { CanvasBoard } from "../../../boards/infrastructure";
import {GraphFactory} from "../domain/graph-factory";
import {NodeCreator, NodeCreatorType} from "../../../nodes/domain/node-creator";
import {
    EntityEmitterNodeCreator,
    LabelNodeCreator,
    ServerNodeCreator,
    SinkNodeCreator,
    SourceNodeCreator
} from "../../../nodes";
import {Entity} from "../../types/entity";

export class GraphFactoryCanvas implements GraphFactory {

    nodeCreatorTypes = {
        [NodeCreatorType.SOURCE]: SourceNodeCreator,
        [NodeCreatorType.SERVER]: ServerNodeCreator,
        [NodeCreatorType.SERVER]: ServerNodeCreator,
        [NodeCreatorType.SINK]: SinkNodeCreator,
        [NodeCreatorType.COMBINER]: SinkNodeCreator,
        [NodeCreatorType.SEPARATOR]: SinkNodeCreator,
        [NodeCreatorType.LABEL]: LabelNodeCreator,
        [NodeCreatorType.ENTITY_EMITTER]: EntityEmitterNodeCreator,
    }

    createBoard(container: HTMLCanvasElement): CanvasBoard {
        return new CanvasBoard(container);
    }

    createNodeCreator(nodeCreatorType: NodeCreatorType, entity: Entity): NodeCreator {
        const nodeClass = this.nodeCreatorTypes[nodeCreatorType];
        if (!!nodeClass){
            return new nodeClass(entity)
        }
        return undefined!;
    }
}
