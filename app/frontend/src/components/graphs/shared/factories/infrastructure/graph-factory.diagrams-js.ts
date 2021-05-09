import {GraphFactory} from "@/components/graphs/shared/factories/domain/graph-factory";
import {DJSBoard} from "@/components/graphs/boards/infrastructure/djsboard/djsboard";

export class GraphFactoryDiagramsJs implements GraphFactory{
    createBoard(container: HTMLElement): DJSBoard {
        return new DJSBoard(container);
    }

}
