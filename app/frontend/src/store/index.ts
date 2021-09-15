import Vue from "vue";
import Vuex from "vuex";
import { simulationModule } from "@/components/simulation/store";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        simulationModule,
    },
});
