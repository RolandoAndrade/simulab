import {Module} from "vuex";
import {BuilderState} from "@/components/simulation/store/builder/builder.state";
import {BuilderMethods} from "@/components/simulation/store/builder/builder.methods";
import {
    Board,
    CanvasBoard,
    CanvasNode, CanvasPort,
    DeletedComponentEvent,
    Edge,
    EntityProperty, GraphLabel,
    GraphNode,
    ModelerEvents,
    NodeCreatorType,
    Path,
    PathCreatedEvent, Point,
    SelectedNodeEvent,
} from "modeler";
import {BoardMode} from "modeler/boards/domain/board-mode";
import {DropItemEvent} from "@/components/shared/domain/drop-item-event";
import {graphFactory} from "@/components/shared/infrastructure/graph-factory";
import {socketConnection} from "@/main";
import {readFile} from "@/components/shared/domain/read-file";
import {ExpressionManager} from "@/components/simulation/domain/expression-manager";
import {RecoveredBoard} from "@/components/simulation/domain/recovered-board";

export const builderStore: Module<BuilderState, undefined> = {
    namespaced: true,
    state: {
        board: undefined,
        boardContainer: undefined,
        selected: undefined,
        expressionManager: {}
    },
    getters: {
        [BuilderMethods.GETTERS.GET_BOARD](state): Board {
            return state.board!;
        },
        [BuilderMethods.GETTERS.GET_BOARD_MODE](state): BoardMode {
            try {
                return state.board!.getMode();
            } catch (e) {
                return BoardMode.DEFAULT_MODE;
            }
        },
        [BuilderMethods.GETTERS.GET_SELECTED](state): Path | CanvasNode | undefined {
            return state.selected;
        },
        [BuilderMethods.GETTERS.GET_AVAILABLE_EXPRESSIONS](state): ExpressionManager {
            return state.expressionManager;
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
            for (let i = 0; i < properties.length; i++) {
                if (properties[i].propertyName == property.propertyName) {
                    properties[i] = property;
                    break;
                }
            }
        },
        [BuilderMethods.MUTATIONS.SET_AVAILABLE_EXPRESSIONS](state, manager: ExpressionManager) {
            state.expressionManager = manager;
        },
    },
    actions: {
        [BuilderMethods.ACTIONS.SELECT_NODE]({ state, commit }, event: SelectedNodeEvent) {
            commit(BuilderMethods.MUTATIONS.SET_SELECTED, event.node);
            if (!!event.node) {
                socketConnection.emit("get_expressions", {}, (expressions: {data: string }) => {
                    commit(BuilderMethods.MUTATIONS.SET_AVAILABLE_EXPRESSIONS, JSON.parse(expressions.data));
                });
            }
        },
        [BuilderMethods.ACTIONS.START_BOARD]({ state, commit, dispatch }, container: HTMLCanvasElement) {
            commit(BuilderMethods.MUTATIONS.SET_CONTAINER, container);
            state.board!.onEvent(ModelerEvents.SELECTED_NODE, (event: SelectedNodeEvent) => {
                dispatch(BuilderMethods.ACTIONS.SELECT_NODE, event);
            });
            state.board!.onEvent(ModelerEvents.PATH_CREATED, (event: PathCreatedEvent) => {
                dispatch(BuilderMethods.ACTIONS.CREATE_PATH, event);
            });
            state.board!.onEvent(ModelerEvents.DELETED_COMPONENT, (event: DeletedComponentEvent) => {
                dispatch(BuilderMethods.ACTIONS.DELETE_COMPONENT, event);
            });
            state.board!.onEvent(ModelerEvents.NODE_MOVED, (event: SelectedNodeEvent)=>{
                dispatch(BuilderMethods.ACTIONS.MOVE_NODE, event);
            })
        },
        [BuilderMethods.ACTIONS.MOVE_NODE]({ state }, event: SelectedNodeEvent) {
            const { node } = event;
            socketConnection.emit(
                "move_node",
                {
                    component: node.getEntity().name,
                    position: (node as any).position
                },
                (result: { data: {} }) => {

                }
            );
        },
        [BuilderMethods.ACTIONS.DELETE_COMPONENT]({ state }, event: DeletedComponentEvent) {
            const { component } = event;
            socketConnection.emit(
                "remove_component",
                {
                    component: component.getEntity().name,
                },
                (result: boolean) => {
                    if (result) {
                        event.onDeleted();
                    }
                }
            );
        },
        [BuilderMethods.ACTIONS.CREATE_PATH]({ state }, event: PathCreatedEvent) {
            const { path } = event;
            socketConnection.emit(
                "create_path",
                {
                    from: path.fromNode.getEntity().name,
                    to: (path.toNode as any).getEntity().name,
                },
                (data: {properties: EntityProperty[]}) => {
                    path.entity.properties = data.properties;
                    path.entity.name = data.properties[0].propertyValue;
                    event.onCreated(path);
                }
            );
        },
        [BuilderMethods.ACTIONS.CHANGE_MODE]({ state }, mode: BoardMode) {
            state.board!.setMode(mode);
        },
        [BuilderMethods.ACTIONS.CHANGE_PROPERTY]({ commit }, property: EntityProperty) {
            commit(BuilderMethods.MUTATIONS.SET_PROPERTY, property);
        },
        [BuilderMethods.ACTIONS.CREATE_NODE]({ state }, event: DropItemEvent) {
            let message = "create_node"
            if (event.node == NodeCreatorType.LABEL) {
                message = "create_label"
            }
            socketConnection.emit(message, event, (data: { properties: EntityProperty[] }) => {
                state.board!.createNode(
                    graphFactory.createNodeCreator(event.node, {
                        name: data.properties[0].propertyValue,
                        properties: data.properties,
                    }),
                    event.x,
                    event.y
                );
            });
        },
        [BuilderMethods.ACTIONS.CHANGE_PROPERTY](
            { state },
            data: { component: Edge | GraphNode; property: EntityProperty }
        ) {
            let message = "edit_property"
            if (data.component instanceof GraphLabel) {
                message = "edit_label"
            }
            socketConnection.emit(
                message,
                {
                    component: data.component.getEntity().name,
                    property: data.property,
                },
                (res: EntityProperty[]) => {
                    data.component.getEntity().properties = res;
                    data.component.getEntity().name = res[0].propertyValue
                }
            );
        },
        [BuilderMethods.ACTIONS.SAVE_EXPERIMENT]({ state }) {
            socketConnection.emit("save_experiment", {}, (response: { data: string }) => {
                const file = new Blob([response.data], {
                    type: "text/plain",
                });
                const fileURL = URL.createObjectURL(file);
                const fileLink = document.createElement("a");
                fileLink.href = fileURL;
                fileLink.download = "model.sim";
                fileLink.click();
                fileLink.remove();
            });
        },
        [BuilderMethods.ACTIONS.LOAD_EXPERIMENT]({ state, dispatch }, file: File) {
            readFile(file, (result) => {
                socketConnection.emit(
                    "load_experiment",
                    {
                        experiment: result,
                    },
                    (result: { data: RecoveredBoard
                    }) => {
                        state.board!.importModel({})
                        const models = result.data.models;
                        const paths = result.data.paths;
                        for (const model of models){
                            let node = null
                            const lowerType = model.type.substring(model.type.indexOf('.') + 1).toLowerCase();
                            if (lowerType.includes("source")){
                                node = NodeCreatorType.SOURCE
                            } else if (lowerType.includes("server")){
                                node = NodeCreatorType.SERVER
                            } else if (lowerType.includes("sink")) {
                                node = NodeCreatorType.SINK
                            }
                            if (node){
                                state.board!.createNode(
                                    graphFactory.createNodeCreator(node, {
                                        name: model.properties[0].propertyValue,
                                        properties: model.properties,
                                    }),
                                    model.position.x,
                                    model.position.y
                                )
                            }
                        }
                        for (const path of paths) {
                            (state.board! as CanvasBoard).createPathBetween(path.properties[0].propertyValue,
                                path.properties, path.origin, path.destination
                            )
                        }

                    }
                );
            });
        },
    },
};
