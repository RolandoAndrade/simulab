import {GraphFactoryGoJS} from "@/components/graphs/shared/factories/infrastructure/graph-factory.gojs";
import {GraphFactory} from "@/components/graphs/shared/factories/domain/graph-factory";
import {GraphFactoryBPMNjs} from "@/components/graphs/shared/factories/infrastructure/graph-factory.bpmnjs";

export const graphFactory: GraphFactory = new GraphFactoryBPMNjs();
