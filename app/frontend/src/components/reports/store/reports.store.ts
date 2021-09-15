import { Module } from "vuex";
import { ReportsState } from "@/components/reports/store/reports.state";
import { ReportsMethods } from "@/components/reports/store/reports.methods";
import { ResultStats } from "@/components/reports/domain/result-stats";
import { socketConnection } from "@/main";

export const reportsStore: Module<ReportsState, undefined> = {
    namespaced: true,
    state: {
        view: {
            reports: [],
            isFetching: false,
        },
    },
    getters: {
        [ReportsMethods.GETTERS.GET_REPORT_VIEW](state) {
            return state.view;
        },
    },
    mutations: {
        [ReportsMethods.MUTATIONS.SET_REPORT_VIEW](
            state,
            view: {
                reports: ResultStats[];
                isFetching: boolean;
            }
        ) {
            state.view = view;
        },
    },
    actions: {
        [ReportsMethods.ACTIONS.FETCH_REPORT_VIEW]({ state, commit }) {
            commit(ReportsMethods.MUTATIONS.SET_REPORT_VIEW, {
                ...state.view,
                isFetching: true,
            });
            socketConnection.emit("get_report", {}, (result: { data: ResultStats[] }) => {
                commit(ReportsMethods.MUTATIONS.SET_REPORT_VIEW, {
                    reports: result.data,
                    isFetching: false,
                });
            });
        },
    },
};
