<template>
    <div class="screen-height">
        <v-progress-linear indeterminate v-if="view.isFetching"></v-progress-linear>
        <table class="results-table">
            <thead>
                <tr>
                    <th class="header-title" v-for="(header, k) in headers" :key="k">{{ header }}</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="(item, kkkk) in view.reports">
                    <template v-for="(dataSource, kkk) in item.dataSources">
                        <template v-for="(itemStat, kk) in dataSource.itemStats">
                            <tr v-for="(stat, k) in itemStat.stats" :key="`(${k}, ${kk}, ${kkk} ${kkkk})`">
                                <td
                                    class="caption result-cell"
                                    :rowspan="getObjectRowspan(item)"
                                    v-if="k == 0 && k == kk && kk == kkk"
                                >
                                    {{ item.objectType }}
                                </td>
                                <td
                                    class="caption result-cell"
                                    :rowspan="getObjectRowspan(item)"
                                    v-if="k == 0 && k == kk && kk == kkk"
                                >
                                    {{ item.name }}
                                </td>
                                <td
                                    class="caption result-cell"
                                    :rowspan="getDatasourceRowspan(dataSource)"
                                    v-if="k == 0 && kk == 0"
                                >
                                    {{ dataSource.name }}
                                </td>
                                <td class="caption result-cell" :rowspan="getItemStatsRowspan(itemStat)" v-if="k == 0">
                                    {{ itemStat.name }}
                                </td>
                                <td class="caption result-cell">{{ stat.name }}</td>
                                <td class="caption result-cell text-right">{{ parseFloat(stat.value).toFixed(6) }}</td>
                            </tr>
                        </template>
                    </template>
                </template>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import SimulationBar from "@/components/simulation/components/SimulationBar.vue";
import ItemsBar from "@/components/simulation/components/ItemsBar.vue";
import PropertyBar from "@/components/simulation/components/PropertyBar.vue";
import Board from "@/components/simulation/components/Board.vue";
import StatusBar from "@/components/simulation/components/StatusBar.vue";
import { ResultStats } from "@/components/reports/domain/result-stats";
import { DatasourceStats } from "@/components/reports/domain/datasource-stats";
import { ItemStats } from "@/components/reports/domain/item-stats";
import { reports } from "@/components/simulation/store/namespaces";
import { ReportsMethods } from "@/components/reports/store/reports.methods";

@Component({
    name: "results-view",
    components: {},
})
export default class SimulationView extends Vue {
    headers = ["Object Type", "Object Name", "Data Source", "Data Item", "Statistic", "Value"];

    mounted() {
        this.fetchView();
    }

    getObjectRowspan(object: ResultStats) {
        let rowspan = 0;
        for (const dataSource of object.dataSources) {
            rowspan += this.getDatasourceRowspan(dataSource);
        }
        return rowspan;
    }

    getDatasourceRowspan(datasourceStats: DatasourceStats) {
        let rowspan = 0;
        for (const itemStats of datasourceStats.itemStats) {
            rowspan += this.getItemStatsRowspan(itemStats);
        }
        return rowspan;
    }

    getItemStatsRowspan(item: ItemStats) {
        return item.stats.length;
    }

    @reports.Action(ReportsMethods.ACTIONS.FETCH_REPORT_VIEW)
    fetchView!: () => void;

    @reports.Getter(ReportsMethods.GETTERS.GET_REPORT_VIEW)
    view!: {
        reports: ResultStats[];
        isFetching: boolean;
    };
}
</script>

<style scoped>
.results-table {
    width: 100%;
    color: #333333;
    background-color: #fcfcfc;
    text-align: right;
    vertical-align: middle;
    border-collapse: collapse;
}

.header-title {
    color: #5d5d5d !important;
    font-weight: bold !important;
    font-size: 14px;
    background-color: #fff;
    padding: 10px;
    text-align: left;
    border-color: #eee;
    border-style: solid;
    border-width: 1px;
    border-top: transparent;
    position: sticky;
    top: -1px;
    vertical-align: middle;
    will-change: transform;
}

.results-table > tr > td {
    padding: 5px;
}

.result-cell {
    text-align: left;

    border-color: #eee;
    border-right: transparent;
    border-left: #eee solid 1px;
    border-bottom: #eee solid 1px;
    padding: 10px 5px;
    word-break: normal;
}

.screen-height {
    position: relative;
    padding-top: 40px;
    height: 100vh;
    overflow-y: auto;
}
</style>
