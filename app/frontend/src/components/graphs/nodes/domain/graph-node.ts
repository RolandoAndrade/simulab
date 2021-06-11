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

    public setPosition(x: number, y: number) {
        this.properties.x = x;
        this.properties.y = y;
    }

    public setDimensions(width: number, height: number) {
        this.properties.width = width;
        this.properties.height = height;
    }

    get position(): {
        x: number,
        y: number
    }{

        return {
            x: this.properties.x,
            y: this.properties.y
        }
    }

    get dimensions(): {
        width: number,
        height: number
    }{

        return {
            width: this.properties.width,
            height: this.properties.height
        }
    }

    contains(x: number, y: number){
        return this.position.x<=x&&x<=this.position.x+this.dimensions.width&&this.position.y<=y&&y<=this.position.y+this.dimensions.height;
    }

    move(dx: number, dy: number)
    {
        this.setPosition(this.position.x + dx - this.dimensions.width/2, this.position.y + dy - this.dimensions.height/2);
    }

    select(): GraphNode {
        this.properties.selected = true
        return this
    };

    unselect() {
        this.properties.selected = false
    };

    get isSelected(): boolean {
        return !!this.properties.selected
    }


    abstract draw(): any;
}
