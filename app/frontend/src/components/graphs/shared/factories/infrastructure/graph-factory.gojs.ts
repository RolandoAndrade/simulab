import {GraphFactory} from "@/components/graphs/shared/factories/domain/graph-factory";
import {GoJSBoard} from "@/components/graphs/boards/infrastructure/gojsboard";

export class GraphFactoryGoJS implements GraphFactory{
    createBoard(container: HTMLElement): GoJSBoard {
        return new GoJSBoard(container);
    }

}
