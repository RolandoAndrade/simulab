export class Time {
    constructor(public time: number = 0, public unit: string = "Seconds") {}

    toString(): string {
        return `${this.time} ${this.unit}`;
    }
}

export enum TimeUnits {
    SECONDS = "Seconds",
    MINUTES = 'Minutes',
    HOURS = 'Hours',
    DAYS = 'Days'
}
