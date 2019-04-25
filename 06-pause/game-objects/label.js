import GameObject from "./game-object.js";

export default class LabelUpdate extends GameObject {
	init() {
		this.updateFrequency = 0;
		this.renderFrequency = 0;
	}

	update(loopInfo) {
		this.updateFrequency = Math.round(1000 / loopInfo.dtUpdate);
		this.renderFrequency = Math.round(1000 / loopInfo.dtRender);
	}

	render() {
		const ctx = this.canvasManager.context;
		ctx.font = "20px Arial";
		ctx.fillStyle = "black";
		ctx.fillText(`Render w: ${this.canvasManager.renderSize.x}, h: ${this.canvasManager.renderSize.y}`, 10, 40);
		ctx.fillText(`View w: ${this.canvasManager.viewSize.x}, h: ${this.canvasManager.viewSize.y}`, 10, 80);
		ctx.fillText(`Scale: ${this.canvasManager.scale}`, 10, 120);
		ctx.fillText(`Update frequency: ${this.updateFrequency}Hz`, 10, 160);
		ctx.fillText(`Render frequency: ${this.renderFrequency}Hz`, 10, 200);
	}
}
