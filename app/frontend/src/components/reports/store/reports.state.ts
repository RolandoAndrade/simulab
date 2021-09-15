import { ResultStats } from "@/components/reports/domain/result-stats";

export interface ReportsState {
    view: {
        reports: ResultStats[];
        isFetching: boolean;
    };
}
