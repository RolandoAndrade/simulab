import { GraphFactory } from "modeler/shared/factories/domain/graph-factory";
import { GraphFactoryCanvas } from "modeler/shared/factories/infrastructure/graph-factory.canvas";

export const graphFactory: GraphFactory = new GraphFactoryCanvas();
