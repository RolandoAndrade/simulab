import {Edge} from "../../edge";
import {GraphNode} from "../../nodes";

export interface DeletedComponentEvent {
    component: GraphNode | Edge,
    onDeleted: ()=>void;
}