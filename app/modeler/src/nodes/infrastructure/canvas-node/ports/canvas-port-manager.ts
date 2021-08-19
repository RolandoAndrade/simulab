import {CanvasPort} from "./canvas-port";

export class CanvasPortManager {
    public sourcePorts: CanvasPort[];
    public destinationPorts: CanvasPort[];

    constructor() {
        this.sourcePorts = []
        this.destinationPorts = []
    }

    draw(){
        for (const port of this.sourcePorts){
            port.draw();
        }
        for (const port of this.destinationPorts){
            port.draw();
        }
    }

    containsSourcePoint(x: number, y: number){
        for (const port of this.sourcePorts){
            const d = port.contains(x, y);
            if (d) {
                return port;
            }
        }
        return undefined;
    }

    containsDestinationPoint(x: number, y: number){
        for (const port of this.destinationPorts){
            const d = port.contains(x, y);
            if (d) {
                return port;
            }
        }
        return undefined;
    }
}