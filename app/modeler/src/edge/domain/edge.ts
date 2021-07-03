import {GraphNode} from "../../nodes/domain";


export abstract class Edge{
    private selected: boolean = false;

    protected constructor(protected from: GraphNode, protected to?: GraphNode, protected padding: number = 5) {
    }

    /**
     * @description Returns true if the given point is contained by the node
     * @param x Coordinate x inside the container
     * @param y Coordinate y inside the container
     * */
    public contains(x: number, y: number): boolean {
        if (!this.to){
            return false;
        }
        const p1 = this.from.position, p2 = this.to.position;
        const yMax = Math.max(p2.y, p1.y);
        const yMin= Math.min(p2.y, p1.y);
        const d = (p2.x - p1.x);
        if(d==0){
            const xx = p1.x;
            return (xx - this.padding <= x) && (x <= xx + this.padding) && ( yMin - this.padding <= y && y <= yMax + this.padding)
        }
        const xMax = Math.max(p2.x, p1.x);
        const xMin= Math.min(p2.x, p1.x);
        const m = (p2.y - p1.y)/d;
        const yy = m * x + yMin;
        return (xMin - this.padding <= x) && (x <= xMax + this.padding) && ( yy - this.padding <= y && y <= yy + this.padding)
    }

    /**
     * @description Selects the edge
     * */
    public select(): Edge {
        this.selected = true
        return this
    };

    /**
     * @description Unselects the edge
     * */
    public unselect() {
        this.selected = false
    };

    /**
     * @description Returns the state of selection
     * */
    public get isSelected(): boolean {
        return this.selected
    }

    /**
     * @description Renders the edge
     * */
    abstract draw(): any;
}
