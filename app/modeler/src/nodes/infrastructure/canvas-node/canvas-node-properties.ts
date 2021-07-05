import { QueueCanvasComponentProperties } from "./queue-canvas-component-properties";
import { NodeProperties } from "../../domain/node-properties";

export interface CanvasNodeProperties extends QueueCanvasComponentProperties, NodeProperties {
    image: string;
    ctx: CanvasRenderingContext2D;
}
