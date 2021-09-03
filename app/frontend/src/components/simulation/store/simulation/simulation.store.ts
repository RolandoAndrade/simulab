import {Module} from "vuex";
import {SimulationState} from "@/components/simulation/store/simulation/simulation.state";
import {SimulationStatus} from "@/components/simulation/domain/simulation-status";
import {SimulationMethods} from "@/components/simulation/store/simulation/simulation.methods";
import {SimulationStats} from "@/components/simulation/domain/simulation-stats";
import {SimulationParams} from "@/components/simulation/domain/simulation-params";

export const simulationStore: Module<SimulationState, undefined> = {
    namespaced: true,

    state: {
        simulatorStatus: SimulationStatus.FINISHED,
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
}