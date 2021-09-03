import { GraphNode } from "../../nodes/domain";
import {Entity, Point} from "../../shared";

export abstract class Edge {
    protected static readonly COLOR = "#4e176f";
    protected static readonly SELECTION_COLOR = "purple";
    public entity: Entity;

    private selected: boolean = false;

    protected constructor(protected from: GraphNode, protected to: GraphNode | Point, protected padding: number = 5) {
        this.entity = {
            name: "Path 1",
            properties: [{
                propertyName: "Weight",
                propertyValue: 1,
                propertyType: "Expression"
            }]
        }
    }

    /**
     * @description Gets the entity of the nod
     * */
    public getEntity(): Entity {
        return this.entity;
    }

    public get toPosition(): Point{
        if (this.to instanceof Point) {
            return this.to;
        }
        return this.to.center;
    }

    public get fromNode(): GraphNode{
        return this.from;
    }

    public get toNode(): GraphNode | Point {
        return this.to;
    }

    /**
     * @description Returns true if the given point is contained by the node
     * @param x Coordinate x inside the container
     * @param y Coordinate y inside the container
     * */
    public contains(x: number, y: number): boolean {
        const p1 = this.from.center,
            p2 = this.toPosition;
        const yMax = Math.max(p2.y, p1.y);
        const yMin = Math.min(p2.y, p1.y);
        const d = p2.x - p1.x;
        if (d == 0) {
            const xx = p1.x;
            return (
                xx - this.padding <= x && x <= xx + this.padding && yMin - this.padding <= y && y <= yMax + this.padding
            );
        }
        const xMax = Math.max(p2.x, p1.x);
        const xMin = Math.min(p2.x, p1.x);
        const m = (p2.y - p1.y) / d;
        const yy = m * x + yMin;
        return xMin - this.padding <= x && x <= xMax + this.padding && yy - this.padding <= y && y <= yy + this.padding;
    }

    protected isSameNode(){
        return this.from === this.to
    }

    /**
     * @description Selects the edge
     * */
    public select(): Edge {
        this.selected = true;
        return this;
    }

    /**
     * @description Unselects the edge
     * */
    public unselect() {
        this.selected = false;
    }

    /**
     * @description Returns the state of selection
     * */
    public get isSelected(): boolean {
        return this.selected;
    }

    /**
     * @description Renders the edge
     * */
    abstract draw(): any;

    /**
     * @description Moves the ending point
     * */
    public move(x: number, y: number){
        if(this.to instanceof Point){
            this.to = new Point(x, y);
        } else {
            this.to.setPosition(x, y)
        }
    }
}
