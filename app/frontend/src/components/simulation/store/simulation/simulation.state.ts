import { SimulationStatus } from "@/components/simulation/domain/simulation-status";
import { SimulationStats } from "@/components/simulation/domain/simulation-stats";
import { SimulationParams } from "@/components/simulation/domain/simulation-params";

export interface SimulationState {
    simulatorStatus: SimulationStatus;
    simulationStats: SimulationStats;
    simulationParams: SimulationParams;
}
