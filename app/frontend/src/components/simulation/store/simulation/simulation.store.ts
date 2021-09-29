import { Module } from "vuex";
import { SimulationState } from "@/components/simulation/store/simulation/simulation.state";
import { SimulationStatus } from "@/components/simulation/domain/simulation-status";
import { SimulationMethods } from "@/components/simulation/store/simulation/simulation.methods";
import { SimulationStats } from "@/components/simulation/domain/simulation-stats";
import { SimulationParams } from "@/components/simulation/domain/simulation-params";
import { socketConnection } from "@/main";
import { millisConverter } from "@/components/shared/domain/millis-converter";
import {BuilderMethods} from "@/components/simulation/store/builder/builder.methods";
import {Board, CanvasBoard, CanvasNode, CanvasServerNode, GraphLabel} from "modeler"
export const simulationStore: Module<SimulationState, undefined> = {
    namespaced: true,

    state: {
        simulatorStatus: SimulationStatus.STOPPED,
        simulationStats: {
            time: 0,
            stopTime: 0,
            isPaused: true,
            frequency: 0,
        },
        simulationParams: {
            speed: 1,
            startingTime: new Date().toISOString().slice(0, 11) + "12:00:00",
            endingTime: new Date().toISOString().slice(0, 11) + "12:00:00",
        },
    },

    getters: {
        [SimulationMethods.GETTERS.GET_SIMULATION_STATS](state): SimulationStats {
            return state.simulationStats;
        },
        [SimulationMethods.GETTERS.GET_SIMULATOR_STATUS](state): SimulationStatus {
            return state.simulatorStatus;
        },
        [SimulationMethods.GETTERS.GET_SIMULATION_PARAMS](state): SimulationParams {
            return state.simulationParams;
        },
    },

    mutations: {
        [SimulationMethods.MUTATIONS.SET_SIMULATION_STATS](state, simulationStats: SimulationStats): void {
            state.simulationStats = simulationStats;
        },
        [SimulationMethods.MUTATIONS.SET_SIMULATOR_STATUS](state, simulationStatus: SimulationStatus): void {
            state.simulatorStatus = simulationStatus;
        },
    },

    actions: {
        [SimulationMethods.ACTIONS.START_SIMULATION]({ state, commit }): void {
            const params = state.simulationParams;
            const startTime = millisConverter(params.startingTime);
            const endingTime = millisConverter(params.endingTime, startTime);
            const stopTime = Math.max(endingTime - startTime, 0) / 1000;
            const step = state.simulationParams.speed * 1000;
            const waitTime = (2.1 - state.simulationParams.speed)/5;
            const init = SimulationStatus.STOPPED == state.simulatorStatus;
            commit(SimulationMethods.MUTATIONS.SET_SIMULATOR_STATUS, SimulationStatus.RUNNING);
            socketConnection.emit("start_simulation", {
                stopTime,
                step,
                waitTime,
                init
            });
        },
        [SimulationMethods.ACTIONS.NEXT_STEP]({ state, commit }): void {
            const params = state.simulationParams;
            const startTime = millisConverter(params.startingTime);
            const endingTime = millisConverter(params.endingTime, startTime);
            const stopTime = Math.max(endingTime - startTime, 0) / 1000;
            const step = state.simulationParams.speed * 1000;
            const init = SimulationStatus.STOPPED == state.simulatorStatus;
            commit(SimulationMethods.MUTATIONS.SET_SIMULATOR_STATUS, SimulationStatus.RUNNING);
            socketConnection.emit("next_step", {
                stopTime,
                step,
                init
            }, ()=>{
                if (state.simulationStats.time < state.simulationStats.stopTime) {
                    commit(SimulationMethods.MUTATIONS.SET_SIMULATOR_STATUS, SimulationStatus.PAUSED);
                }

            });
        },
        [SimulationMethods.ACTIONS.FAST_FORWARD]({ state, commit }): void {
            const params = state.simulationParams;
            const startTime = millisConverter(params.startingTime);
            const endingTime = millisConverter(params.endingTime, startTime);
            const stopTime = Math.max(endingTime - startTime, 0) / 1000;
            const init = SimulationStatus.STOPPED == state.simulatorStatus;

            commit(SimulationMethods.MUTATIONS.SET_SIMULATOR_STATUS, SimulationStatus.RUNNING_FAST_FORWARD);
            commit(SimulationMethods.MUTATIONS.SET_SIMULATION_STATS, {
                time: 0,
                stopTime: stopTime,
                isPaused: true,
                frequency: 1000,
            });
            socketConnection.emit("fast_forward", {
                stopTime,
                init
            });
        },
        [SimulationMethods.ACTIONS.PAUSE_SIMULATION]({ state, commit }): void {
            commit(SimulationMethods.MUTATIONS.SET_SIMULATOR_STATUS, SimulationStatus.RUNNING);
            socketConnection.emit("pause_simulation");
            commit(SimulationMethods.MUTATIONS.SET_SIMULATOR_STATUS, SimulationStatus.PAUSED);
        },
        [SimulationMethods.ACTIONS.STOP_SIMULATION]({ state, commit }): void {
            commit(SimulationMethods.MUTATIONS.SET_SIMULATOR_STATUS, SimulationStatus.RUNNING);
            socketConnection.emit("stop_simulation");
            commit(SimulationMethods.MUTATIONS.SET_SIMULATOR_STATUS, SimulationStatus.STOPPED);
        },
        [SimulationMethods.ACTIONS.SOCKET_SIMULATION_STATUS]({ state, commit }, data): void {
            commit(SimulationMethods.MUTATIONS.SET_SIMULATION_STATS, data);
        },
        [SimulationMethods.ACTIONS.SOCKET_SIMULATION_FINISHED]({ state, commit }, data): void {
            commit(SimulationMethods.MUTATIONS.SET_SIMULATOR_STATUS, SimulationStatus.FINISHED);
            commit(SimulationMethods.MUTATIONS.SET_SIMULATION_STATS, {
                time: state.simulationStats.stopTime,
                stopTime: state.simulationStats.stopTime,
                isPaused: true,
                frequency: state.simulationStats.frequency,
            });
        },
        [SimulationMethods.ACTIONS.SOCKET_LABEL_CHANGED]({rootGetters}, new_labels: {[key: string]: number}): void {
            for (const key in new_labels) {
                const board: Board = rootGetters["simulationModule/builderStore/"+BuilderMethods.GETTERS.GET_BOARD];
                const node = board.getNode(key);
                if (!!node) {
                    (node as GraphLabel).setValue(new_labels[key]);
                }
            }
        },
        [SimulationMethods.ACTIONS.SOCKET_STATE_CHANGED]({rootGetters}, data: {
            name: string, state: {
                inputBuffer: string,
                processBuffer: string,
                outputBuffer: string
            }
        }): void {
            const board: CanvasBoard = rootGetters["simulationModule/builderStore/"+BuilderMethods.GETTERS.GET_BOARD];
            const node = board.getNode(data.name) as CanvasNode;
            if (!!node) {
                const entitiesInsideInputBuffer = parseInt(data.state.inputBuffer);
                const entitiesInsideOutputBuffer = parseInt(data.state.outputBuffer);
                const entitiesInsideProcessBuffer = parseInt(data.state.processBuffer);

                // input buffer
                if(node.portManager.destinationPorts.length){
                    node.portManager.destinationPorts[0].queue.clear();
                    for (let i = 0; i < entitiesInsideInputBuffer; i++) {
                        node.portManager.destinationPorts[0].queue.addEntity({name: "", properties: []})
                    }
                }
                // output buffer
                if(node.portManager.sourcePorts.length){
                    node.portManager.sourcePorts[0].queue.clear();
                    for (let i = 0; i < entitiesInsideOutputBuffer; i++) {
                        node.portManager.sourcePorts[0].queue.addEntity({name: "", properties: []})
                    }
                }

                // output buffer
                if(node instanceof CanvasServerNode && node.processBuffer){
                    node.processBuffer.clear();
                    for (let i = 0; i < entitiesInsideProcessBuffer; i++) {
                        node.processBuffer.addEntity({name: "", properties: []})
                    }
                }
            }
            board.draw()
        }
    },
};
