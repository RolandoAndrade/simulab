import { NodeProperties } from "./node-properties";
import { Point } from "../../shared/types";
import {Entity} from "../../shared/types/entity";

export abstract class GraphNode {
    protected constructor(protected readonly properties: NodeProperties) {}

    /**
     * @description Gets the entity of the nod
     * */
    public getEntity(): Entity {
        return this.properties.entity;
    }


    /**
     * @description Sets the ID of the model
     * @param id ID of the model
     * */
    public setID(id: string) {
        this.properties.id = id;
    }

    /**
     * @description Sets the color of the element
     * @param color New color
     * */
    public setColor(color: string) {
        this.properties.color = color;
    }

    /**
     * @description Sets the position of the node
     * @param x Coordinate x inside the container
     * @param y Coordinate y inside the container
     * */
    public setPosition(x: number, y: number) {
        this.properties.x = x;
        this.properties.y = y;
    }

    /**
     * @description Sets the dimensions of the node
     * @param width Width of the component
     * @param height Height of the component
     * */
    public setDimensions(width: number, height: number) {
        this.properties.width = width;
        this.properties.height = height;
    }

    /**
     * @description Returns true if the given point is contained by the node
     * @param x Coordinate x inside the container
     * @param y Coordinate y inside the container
     * */
    public contains(x: number, y: number): boolean {
        return (
            this.position.x - this.properties.padding <= x &&
            x <= this.position.x + this.properties.padding + this.dimensions.width &&
            this.position.y - this.properties.padding <= y &&
            y <= this.position.y + this.dimensions.height + this.properties.padding
        );
    }

    /**
     * @description Moves the node
     * @param dx Movement in x
     * @param dy Movement in y
     * */
    public move(dx: number, dy: number) {
        this.setPosition(
            this.position.x + dx - this.dimensions.width / 2,
            this.position.y + dy - this.dimensions.height / 2
        );
    }

    /**
     * @description Selects the node
     * */
    public select(): GraphNode {
        this.properties.selected = true;
        return this;
    }

    /**
     * @description Unselects the node
     * */
    public unselect() {
        this.properties.selected = false;
    }

    /**
     * @description Gets the position of the node
     * */
    public get position(): Point {
        return {
            x: this.properties.x,
            y: this.properties.y,
        };
    }

    /**
     * @description Gets the center position of the node
     * */
    public get center(): Point {
        return {
            x: this.properties.x + this.dimensions.width / 2,
            y: this.properties.y + this.dimensions.height / 2,
        };
    }

    /**
     * @description Gets the dimensions of the node
     * */
    public get dimensions(): {
        width: number;
        height: number;
    } {
        return {
            width: this.properties.width,
            height: this.properties.height,
        };
    }

    /**
     * @description Returns the state of selection
     * */
    public get isSelected(): boolean {
        return !!this.properties.selected;
    }

    /**
     * @description Renders the node
     * */
    abstract draw(): any;
}
