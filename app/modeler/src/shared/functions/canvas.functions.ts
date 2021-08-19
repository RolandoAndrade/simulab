import {Point} from "../types";

export function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): CanvasRenderingContext2D {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
    return ctx;
}

export function isPointOnLine(linePointA: Point, linePointB: Point, point: Point, epsilon: number) {
    if (Math.abs(linePointA.x - linePointB.x) < epsilon) {
        return (Math.abs(point.x - linePointA.x) < epsilon);
    }
    const m = (linePointB.y - linePointA.y) / (linePointB.x - linePointA.x);
    const b = linePointA.y - m * linePointA.x;
    return (Math.abs(point.y - (m * point.x + b)) < epsilon);
}