import {DatasourceStats} from "@/components/results/domain/datasource-stats";

export interface ResultStats {
    objectType: string,
    name: string,
    dataSources: DatasourceStats[]
}