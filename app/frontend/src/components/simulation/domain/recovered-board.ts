import {EntityProperty, Point} from "modeler";


export interface RecoveredBoard{
    dynamicSystem: {
        models: {
            type: string,
            properties: EntityProperty[],
            position: Point
        }[],
        paths: {
            type: string,
            properties: EntityProperty[],
            origin: string,
            destination: string
        }[]
    }
    labels: {
        type: string,
        properties: EntityProperty[],
        position: Point
    }[]
}