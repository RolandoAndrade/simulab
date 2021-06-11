import {GraphFactory} from "@/components/graphs/shared/factories/domain/graph-factory";
import {SVGBoard} from "@/components/graphs/boards/infrastructure/svg-board";

export class GraphFactorySVG implements GraphFactory {
    createBoard(container: HTMLCanvasElement): SVGBoard {
        return new SVGBoard(container);
    }

}
