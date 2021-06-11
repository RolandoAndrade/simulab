import {GraphFactory} from "@/components/graphs/shared/factories/domain/graph-factory";
import {MXBoard} from "@/components/graphs/boards/infrastructure/mx-board";

export class GraphFactoryMx implements GraphFactory{
    createBoard(container: HTMLElement): MXBoard {
        return new MXBoard(container);
    }

}
