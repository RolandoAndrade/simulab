import { Module } from 'vuex';
import {builderStore} from "@/components/simulation/store/builder/builder.store";
import {simulationStore} from "@/components/simulation/store/simulation/simulation.store";
import {reportsStore} from "@/components/reports/store/reports.store";

export const simulationModule: Module<any, any> = {
    namespaced: true,
    modules: {
        builderStore,
        simulationStore,
        reportsStore
    }
}