import {GraphFactory} from "@/components/graphs/shared/factories/domain/graph-factory";
import {MXBoard} from "@/components/graphs/boards/infrastructure/mxboard";

export class GraphFactoryMXGraph implements GraphFactory{
    createBoard(container: HTMLElement): MXBoard {
        return new MXBoard(container);
    }

}
