import {GraphFactory} from "@/components/graphs/shared/factories/domain/graph-factory";
import {GraphFactoryCanvas} from "@/components/graphs/shared/factories/infrastructure/graph-factory.canvas";

export const graphFactory: GraphFactory = new GraphFactoryCanvas();
