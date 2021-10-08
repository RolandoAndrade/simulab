import {Board} from "../domain";
import {CanvasNode} from "../../nodes/infrastructure/canvas-node";
import {EntityProperty, Point} from "../../shared/types";
import {Path} from "../../edge";
import {NodeCreator} from "../../nodes";
//@ts-ignore
import {ResizeObserver} from "resize-observer";
import {BoardMode} from "../domain/board-mode";
import {ModelerEvents} from "../../shared/events/modeler.events";

const deleteCursor = require("assets/cursors/cursor-eraser.png")

export class CanvasBoard extends Board {
    private readonly ctx: CanvasRenderingContext2D;
    protected nodes: CanvasNode[];

    private isMouseDown: boolean;

    private selectedNode: CanvasNode | undefined;
    private selectedPath: Path | undefined;
    private createdPath: Path | undefined;


    private origin: Point;
    private originDrag: Point;
    private dragStartPoint: Point;

    constructor(protected readonly container: HTMLCanvasElement) {
        super(container);
        this.ctx = this.container.getContext("2d")!;
        this.nodes = [];
        this.origin = new Point(0, 0);
        this.dragStartPoint = new Point(0, 0);
        this.isMouseDown = false;
        this.onResize({} as UIEvent);
        new ResizeObserver(this.onResize.bind(this)).observe(this.container)
        this.container.addEventListener("mousedown", this.onClick.bind(this));
        this.container.addEventListener("mouseup", this.onMouseUp.bind(this));
        this.container.addEventListener("mousemove", this.onMouseMove.bind(this));
    }

    private setSize(width: number, height: number) {
        this.container.width = width;
        this.container.height = height - 7;
    }

    draw() {
        this.clear();
        for (const path of this.paths) {
            path.draw();
        }
        for (const node of this.nodes) {
            node.draw();
        }
        if (!!this.selectedNode) {
            this.selectedNode.draw();
        }
        if (!!this.createdPath) {
            this.createdPath.draw();
        }
    }


    private onResize(event: UIEvent) {
        this.setSize(this.container.offsetWidth, this.container.offsetHeight);
        this.origin = new Point(0,0)
        this.draw();
    }

    private selectNode(){
        const rNodes = this.nodes.reverse();
        for (const node of rNodes) {
            if (node.contains(this.dragStartPoint.x, this.dragStartPoint.y)) {
                if (this.selectedNode) {
                    this.selectedNode.unselect();
                }
                if (this.selectedPath) {
                    this.selectedPath.unselect();
                    this.selectedPath = undefined;
                }
                this.selectedNode = node.select() as CanvasNode;
                this.emit(ModelerEvents.SELECTED_NODE, {
                    node
                })
                this.draw();
                return;
            }
        }
        if (this.selectedNode) {
            this.selectedNode.unselect();
            this.selectedNode = undefined;
            this.draw();
        }
        this.emit(ModelerEvents.SELECTED_NODE, {
            node: {
                getEntity() {
                    return {
                        properties: []
                    }
                }
            }
        })
    }

    private selectPath(){
        const rPaths = this.paths.reverse();
        for (const path of rPaths) {
            if (path.contains(this.dragStartPoint.x, this.dragStartPoint.y)) {
                if (this.selectedPath) {
                    this.selectedPath.unselect();
                }
                this.selectedPath = path.select() as Path;
                this.emit(ModelerEvents.SELECTED_NODE, {
                    node: path
                })
                this.draw();
                return;
            }
        }
        if (this.selectedPath) {
            this.selectedPath.unselect();
            this.draw();
            this.selectedPath = undefined;
        }
    }

    private createPath(){
        const rNodes = this.nodes.reverse();
        for (const node of rNodes) {
            const port = node.portManager.containsSourcePoint(this.dragStartPoint.x, this.dragStartPoint.y);
            if (port) {
                this.createdPath = new Path(this.ctx, port, new Point(
                    this.dragStartPoint.x + this.originDrag.x,
                    this.dragStartPoint.y + this.originDrag.y));
                this.draw();
                return;
            }
        }
        this.setMode(BoardMode.DEFAULT_MODE);
    }

    private onClick(event: MouseEvent) {
        this.isMouseDown = true;
        this.dragStartPoint = new Point(event.offsetX, event.offsetY);
        this.originDrag = new Point(this.origin.x, this.origin.y);
        if(this.isCreatingPathEnable){
            this.createPath();
        } else {
            this.selectNode();
            if (!this.selectedNode){
                this.selectPath()
                if (this.selectedPath && this.isDeletingEnable) {
                    this.emit(ModelerEvents.DELETED_COMPONENT, {
                        component: this.selectedPath,
                        onDeleted: () => {
                            this.paths = this.paths.filter((path)=>path!=this.selectedPath)
                            this.selectedPath.getEntity().properties = [];
                            this.selectedPath.unselect();
                            this.selectedPath = undefined;
                            this.emit(ModelerEvents.SELECTED_NODE, {
                                node: undefined
                            })
                            this.draw();
                        }
                    });
                }
            } else if (this.isDeletingEnable){
                this.emit(ModelerEvents.DELETED_COMPONENT, {
                    component: this.selectedNode,
                    onDeleted: () => {
                        this.nodes = this.nodes.filter((node)=>node!=this.selectedNode);
                        this.paths = this.paths.filter((path)=>path.fromNode!=this.selectedNode && path.toNode!=this.selectedNode)
                        this.selectedNode.unselect();
                        this.selectedNode = undefined;
                        this.emit(ModelerEvents.SELECTED_NODE, {
                            node: undefined
                        })
                        this.draw();
                    }
                });
            }
        }

    }

    private moveBoard(event: Point) {
        const dx = this.origin.x + event.x - this.dragStartPoint.x - this.originDrag.x;
        const dy = this.origin.y + event.y - this.dragStartPoint.y - this.originDrag.y;
        this.moveContext(dx, dy);
        this.container.style.cursor = "move";
    }

    private moveNode(event: Point){
        if (!!this.selectedNode) {
            this.selectedNode.move(
                event.x + this.origin.x - this.selectedNode.position.x,
                event.y + this.origin.y - this.selectedNode.position.y
            );
            this.container.style.cursor = "grab";
        } else {
            this.moveBoard(event)
        }
    }

    private movePath(event: Point){
        if (!!this.createdPath) {
            this.createdPath.move(
                event.x + this.origin.x,
                event.y + this.origin.y
            );
            this.container.style.cursor = "cell";
        } else {
            this.moveBoard(event)
        }
    }

    private onMouseMove(event: MouseEvent) {
        if (this.isMouseDown) {
            if(this.isCreatingPathEnable){
                this.movePath(new Point(event.offsetX, event.offsetY))
            } else {
                this.moveNode(new Point(event.offsetX, event.offsetY))
            }
            this.draw();
        }
    }

    private finishPath(event: Point){
        const rNodes = this.nodes.reverse();
        for (const node of rNodes) {
            const port = node.portManager.containsDestinationPoint(event.x, event.y);
            if (port) {
                const createdPath = new Path(this.ctx, this.createdPath!.portStart, port)
                this.emit(ModelerEvents.PATH_CREATED, {
                    path: createdPath,
                    onCreated: (path: Path) => {
                        this.paths.push(path);
                        this.draw();
                    }
                })
                break;
            }
        }
        this.createdPath = undefined;
        this.setMode(BoardMode.DEFAULT_MODE);
        this.draw();
    }

    private onMouseUp(event: MouseEvent) {
        this.isMouseDown = false;

        if(!!this.createdPath){
            this.setMode(BoardMode.CREATING_PATH_MODE);
            this.finishPath(new Point(event.offsetX, event.offsetY))
        }

        if (!!this.selectedNode) {
            this.emit(ModelerEvents.NODE_MOVED, {node: this.selectedNode})
        }
        this.setMode(BoardMode.DEFAULT_MODE);
    }

    private moveContext(dx: number, dy: number) {
        this.ctx.translate(dx, dy);
        this.origin.x -= dx;
        this.origin.y -= dy;
    }

    public clear(color = "#fafafa") {
        this.ctx.save();
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.container.width, this.container.height);
        this.ctx.restore();
    }

    public setMode(value: BoardMode) {
        super.setMode(value);
        if (this.isCreatingPathEnable) {
            this.container.style.cursor = "crosshair";
        } else if (this.isDeletingEnable) {

            this.container.style.cursor = `url(${deleteCursor}) 8 8, auto`;
        } else {
            this.container.style.cursor = "default";
        }
    }

    public createNode(nodeCreator: NodeCreator, x: number = 120, y: number = 120) {
        const node = nodeCreator.create({
            ctx: this.ctx,
            x: this.origin.x + x,
            y: this.origin.y + y
        }) as CanvasNode;
        this.nodes.push(node);
        if (!!this.selectedNode) {
            this.selectedNode.unselect()
        }
        this.selectedNode = node;
        this.emit(ModelerEvents.SELECTED_NODE, {node: this.selectedNode})
        this.selectedNode.select()
        this.emit(ModelerEvents.NODE_MOVED, {node: this.selectedNode})
        this.draw();
    }

    public createPathBetween(name: string, properties: EntityProperty[], origin: string, destination: string) {
        const startNode = this.nodes.find((node)=>node.getEntity().name == origin);
        if(!!startNode) {
            const endNode = this.nodes.find((node)=>node.getEntity().name == destination);
            if (!!endNode) {
                const originPort = endNode.portManager.destinationPorts[0];
                const destinationPort = startNode.portManager.sourcePorts[0];
                const p = new Path(this.ctx, originPort, destinationPort);
                p.getEntity().properties = properties
                p.getEntity().name = name;
                this.paths.push(p)
            }
        }
        this.draw();
    }

    importModel(model: object) {
        this.selectedNode = undefined;
        this.selectedPath = undefined;
        this.nodes = []
        this.paths = [];
    }
}
