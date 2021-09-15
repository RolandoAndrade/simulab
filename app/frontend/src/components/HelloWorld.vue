<template>
    <div class="fill-height">
        <system-bar>
            <template slot="simulation">
                <simulation-view></simulation-view>
            </template>
            <template slot="reports">
                <results-view></results-view>
            </template>
        </system-bar>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import SystemBar from "@/components/shared/components/layouts/components/SystemBar.vue";
import SimulationView from "@/components/simulation/views/SimulationView.vue";
import SimulationBar from "@/components/simulation/components/SimulationBar.vue";
import ResultsView from "@/components/reports/views/ResultsView.vue";

export default Vue.extend({
    name: "HelloWorld",
    components: { ResultsView, SimulationBar, SimulationView, SystemBar },
    data: () => ({
        opened: true,
        tab: null,
    }),
});
</script>

<style scoped></style>
