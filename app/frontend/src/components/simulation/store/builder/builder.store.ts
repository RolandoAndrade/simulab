import {Module} from 'vuex';
import {BuilderState} from "@/components/simulation/store/builder/builder.state";
import {BuilderMethods} from "@/components/simulation/store/builder/builder.methods";
import {
    Board,
    CanvasBoard,
    CanvasNode,
    EntityProperty,
    ModelerEvents,
    NodeCreatorType,
    Path,
    SelectedNodeEvent,
    PathCreatedEvent
} from "modeler";
import {BoardMode} from "modeler/boards/domain/board-mode";
import {DropItemEvent} from "@/components/shared/domain/drop-item-event";
import {graphFactory} from "@/components/shared/infrastructure/graph-factory";
import {socketConnection} from "@/main";

export const builderStore: Module<BuilderState, undefined> = {
    namespaced: true,
    state: {
        board: undefined,
        boardContainer: undefined,
        selected: undefined
    },
    getters: {
        [BuilderMethods.GETTERS.GET_BOARD](state): Board {
            return state.board!;
        },
        [BuilderMethods.GETTERS.GET_BOARD_MODE](state): BoardMode {
            try {
                return state.board!.getMode();
            } catch (e){
                return BoardMode.DEFAULT_MODE
            }
        },
        [BuilderMethods.GETTERS.GET_SELECTED](state): Path | CanvasNode | undefined {
            return state.selected;
        },
    },
    mutations: {
        [BuilderMethods.MUTATIONS.SET_CONTAINER](state, container: HTMLCanvasElement) {
            state.boardContainer = container;
            state.board = new CanvasBoard(container);
        },
        [BuilderMethods.MUTATIONS.SET_SELECTED](state, selection: Path | CanvasNode | undefined) {
            state.selected = selection;
        },
        [BuilderMethods.MUTATIONS.SET_PROPERTY](state, property: EntityProperty) {
            const properties = state.selected!.getEntity().properties;
            for (let i = 0; i < properties.length; i++){
                if (properties[i].propertyName == property.propertyName) {
                    properties[i] = property;
                    break;
                }
            }
        }
    },
    actions: {
        [BuilderMethods.ACTIONS.START_BOARD]({state, commit, dispatch}, container: HTMLCanvasElement){
            commit(BuilderMethods.MUTATIONS.SET_CONTAINER, container);
            state.board!.onEvent(ModelerEvents.SELECTED_NODE, (event: SelectedNodeEvent) => {
                commit(BuilderMethods.MUTATIONS.SET_SELECTED, event.node);
            })
            state.board!.onEvent(ModelerEvents.PATH_CREATED, (event: PathCreatedEvent) => {
                dispatch(BuilderMethods.ACTIONS.CREATE_PATH, event)
            })
        },
        [BuilderMethods.ACTIONS.CREATE_PATH]({state}, event: PathCreatedEvent){
            const {path} = event;
            socketConnection.emit("create_path", {
                from: path.fromNode.getEntity().name,
                to: (path.toNode as any).getEntity().name
            }, (properties: EntityProperty[])=>{
                path.getEntity().properties = properties
            });
        },
        [BuilderMethods.ACTIONS.CHANGE_MODE]({state}, mode: BoardMode){
            state.board!.setMode(mode);
        },
        [BuilderMethods.ACTIONS.CHANGE_PROPERTY]({commit}, property: EntityProperty){
            commit(BuilderMethods.MUTATIONS.SET_PROPERTY, property)
        },
        [BuilderMethods.ACTIONS.CREATE_NODE]({state}, event: DropItemEvent){
            socketConnection.emit("create_node", event, (properties: EntityProperty[])=>{
                state.board!.createNode(graphFactory.createNodeCreator(event.node, {
                    name: properties[0].propertyValue,
                    properties
                }), event.x, event.y)
            });
        }
    }
}