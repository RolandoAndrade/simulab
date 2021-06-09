import {NodeProperties} from "@/components/graphs/nodes/domain/node-properties";

export abstract class GraphNode {
    protected constructor(protected readonly properties: NodeProperties) {

    }

    public setID(id: string) {
        this.properties.id = id;
    }

    public setColor(color: string) {
        this.properties.color = color;
    }

    public setSize(x: number, y: number) {
        this.properties.x = x;
        this.properties.y = y;
    }

    public setDimensions(width: number, height: number) {
        this.properties.width = width;
        this.properties.height = height;
    }

    public abstract select(): void;

}
