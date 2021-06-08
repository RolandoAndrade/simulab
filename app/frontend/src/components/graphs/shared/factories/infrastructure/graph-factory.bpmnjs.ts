import {GraphFactory} from "@/components/graphs/shared/factories/domain/graph-factory";
import {GoJSBoard} from "@/components/graphs/boards/infrastructure/gojsboard";
import {BPMNBoard} from "@/components/graphs/boards/infrastructure/bpmn-board";

export class GraphFactoryBPMNjs implements GraphFactory{
    createBoard(container: HTMLElement): BPMNBoard {
        return new BPMNBoard(container);
    }

}
