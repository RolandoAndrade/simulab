import { Module } from 'vuex';
import {builderStore} from "@/components/simulation/store/builder/builder.store";

export const simulationModule: Module<any, any> = {
    namespaced: true,
    modules: {
        builderStore
    }
}