import {Module} from "vuex";
import {SimulationState} from "@/components/simulation/store/simulation/simulation.state";
import {SimulationStatus} from "@/components/simulation/domain/simulation-status";
import {SimulationMethods} from "@/components/simulation/store/simulation/simulation.methods";
import {SimulationStats} from "@/components/simulation/domain/simulation-stats";
import {SimulationParams} from "@/components/simulation/domain/simulation-params";
import {socketConnection} from "@/main";
import {millisConverter} from "@/components/shared/domain/millis-converter";
import {simulation} from "@/components/simulation/store/namespaces";

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
            startingTime: new Date().toISOString().slice(0,11) + "12:00:00",
            endingTime: new Date().toISOString().slice(0,11) + "12:00:00"
        }
    },

    getters: {
        [SimulationMethods.GETTERS.GET_SIMULATION_STATS](state): SimulationStats {
            return state.simulationStats
        },
        [SimulationMethods.GETTERS.GET_SIMULATOR_STATUS](state): SimulationStatus {
            return state.simulatorStatus
        },
        [SimulationMethods.GETTERS.GET_SIMULATION_PARAMS](state): SimulationParams {
            return state.simulationParams
        }
    },

    mutations: {
        [SimulationMethods.MUTATIONS.SET_SIMULATION_STATS](state, simulationStats: SimulationStats): void {
            state.simulationStats = simulationStats
        },
        [SimulationMethods.MUTATIONS.SET_SIMULATOR_STATUS](state, simulationStatus: SimulationStatus): void {
            state.simulatorStatus = simulationStatus
        }
    },

    actions: {
        [SimulationMethods.ACTIONS.START_SIMULATION]({state, commit}): void {
            const params = state.simulationParams;
            const startTime = millisConverter(params.startingTime);
            const endingTime = millisConverter(params.endingTime, startTime);
            const stopTime = Math.max(endingTime - startTime, 0) / 1000;
            commit(SimulationMethods.MUTATIONS.SET_SIMULATOR_STATUS, SimulationStatus.RUNNING);
            socketConnection.emit("start_simulation", {
                stopTime
            })
        },
        [SimulationMethods.ACTIONS.PAUSE_SIMULATION]({state, commit}): void {
            commit(SimulationMethods.MUTATIONS.SET_SIMULATOR_STATUS, SimulationStatus.RUNNING);
            socketConnection.emit("pause_simulation");
            commit(SimulationMethods.MUTATIONS.SET_SIMULATOR_STATUS, SimulationStatus.PAUSED);
        },
        [SimulationMethods.ACTIONS.STOP_SIMULATION]({state, commit}): void {
            commit(SimulationMethods.MUTATIONS.SET_SIMULATOR_STATUS, SimulationStatus.RUNNING);
            socketConnection.emit("stop_simulation");
            commit(SimulationMethods.MUTATIONS.SET_SIMULATOR_STATUS, SimulationStatus.STOPPED)
        },
        [SimulationMethods.ACTIONS.SOCKET_SIMULATION_STATUS]({state, commit}, data): void {
            commit(SimulationMethods.MUTATIONS.SET_SIMULATION_STATS, data)
        },
        [SimulationMethods.ACTIONS.SOCKET_SIMULATION_FINISHED]({state, commit}, data): void {
            commit(SimulationMethods.MUTATIONS.SET_SIMULATOR_STATUS, SimulationStatus.FINISHED)
            commit(SimulationMethods.MUTATIONS.SET_SIMULATION_STATS, {
                time: state.simulationStats.stopTime,
                stopTime: state.simulationStats.stopTime,
                isPaused: true,
                frequency: state.simulationStats.frequency,
            })
        },
    },
}