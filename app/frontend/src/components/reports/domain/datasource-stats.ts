import {ItemStats} from "@/components/reports/domain/item-stats";

export interface DatasourceStats {
    name: string,
    itemStats: ItemStats[]
}