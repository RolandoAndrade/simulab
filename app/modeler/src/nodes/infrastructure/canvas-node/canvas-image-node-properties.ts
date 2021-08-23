import { QueueCanvasComponentProperties } from "./queue-canvas-component-properties";
import { NodeProperties } from "../../domain/node-properties";

export interface CanvasImageNodeProperties extends QueueCanvasComponentProperties, NodeProperties {
    image?: string;
    ctx: CanvasRenderingContext2D;
}
