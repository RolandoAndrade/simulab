import {QueueCanvasComponentProperties} from "@/components/graphs/nodes/infrastructure/canvas-node/queue-canvas-component-properties";
import {NodeProperties} from "@/components/graphs/nodes/domain/node-properties";

export interface CanvasNodeProperties extends QueueCanvasComponentProperties, NodeProperties{
    image: string;
    ctx: CanvasRenderingContext2D;
}
