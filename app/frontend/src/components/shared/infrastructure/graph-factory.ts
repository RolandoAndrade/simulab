import {GraphFactory} from "@/components/graphs/shared/factories/domain/graph-factory";
import {GraphFactoryCanvas} from "@/components/graphs/shared/factories/infrastructure/graph-factory.canvas";
import {GraphFactorySVG} from "@/components/graphs/shared/factories/infrastructure/graph-factory.svg";
import {GraphFactoryMx} from "@/components/graphs/shared/factories/infrastructure/graph-factory.mx";

export const graphFactory: GraphFactory = new GraphFactoryMx();
