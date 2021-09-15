import { DatasourceStats } from "@/components/reports/domain/datasource-stats";

export interface ResultStats {
    objectType: string;
    name: string;
    dataSources: DatasourceStats[];
}
