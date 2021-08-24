import { Module } from 'vuex';
import {BuilderState} from "@/components/simulation/store/builder/builder.state";
import {BuilderMethods} from "@/components/simulation/store/builder/builder.methods";
import {Board, CanvasBoard} from "modeler";
import {BoardMode} from "modeler/boards/domain/board-mode";

export const builderStore: Module<BuilderState, undefined> = {
    namespaced: true,
    state: {
        board: undefined,
        boardContainer: undefined
    },
    getters: {
        [BuilderMethods.GETTERS.GET_BOARD](state): Board {
            return state.board!;
        },
        [BuilderMethods.GETTERS.GET_BOARD_MODE](state): BoardMode {
            return state.board!.getMode();
        },
    },
    mutations: {
        [BuilderMethods.MUTATIONS.SET_CONTAINER](state, container: HTMLCanvasElement) {
            state.boardContainer = container;
            state.board = new CanvasBoard(container);
        }
    },
    actions: {
        [BuilderMethods.ACTIONS.START_BOARD]({state, commit}, container: HTMLCanvasElement){
            commit(BuilderMethods.MUTATIONS.SET_CONTAINER, container);

        }
    }
}