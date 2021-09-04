const multiplier: {[key: string]: number} = {
    'Seconds': 1000,
    'Minutes': 1000 * 60,
    'Hours': 1000 * 60 * 60,
    'Days': 1000 * 60 * 60 * 24
}

export function millisConverter(time: string, startTime?: number){
    const isoDate = /[+-]?\d{4}(-[01]\d(-[0-3]\d(T[0-2]\d:[0-5]\d:?([0-5]\d(\.\d+)?)?[+-][0-2]\d:[0-5]\dZ?)?)?)?/.test(time);
    let millis = 0;
    if (isoDate) {
        millis = new Date(time).getTime();
    } else {
        const [value, unit] = time.split(" ");
        const realValue = parseFloat(value);
        millis = realValue * (multiplier[unit] || 1);
        if (startTime){
            millis += startTime;
        }
    }
    return millis;
}