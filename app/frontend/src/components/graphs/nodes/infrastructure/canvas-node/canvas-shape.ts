export function drawCircumference(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number){

    ctx.beginPath();
    ctx.strokeStyle = "#424242";
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.stroke();
    /*ctx.setLineDash(this.lineDash);
    ctx.strokeStyle = this.borderColor;
    ctx.fillStyle = this.fillColor;
    ctx.lineWidth = this.strokeWidth;
    ctx.beginPath();
    ctx.moveTo(this.x + this.borderRadius, this.y);
    ctx.lineTo(this.x + this.width - this.borderRadius, this.y);
    ctx.quadraticCurveTo(this.x + this.width, this.y, this.x + this.width, this.y + this.borderRadius);
    ctx.lineTo(this.x + this.width, this.y + this.height - this.borderRadius);
    ctx.quadraticCurveTo(this.x + this.width, this.y + this.height, this.x + this.width - this.borderRadius, this.y + this.height);
    ctx.lineTo(this.x + this.borderRadius, this.y + this.height);
    ctx.quadraticCurveTo(this.x, this.y + this.height, this.x, this.y + this.height - this.borderRadius);
    ctx.lineTo(this.x, this.y + this.borderRadius);
    ctx.quadraticCurveTo(this.x, this.y, this.x + this.borderRadius, this.y);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctx.setLineDash([]);*/
}
