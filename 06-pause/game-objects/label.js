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
		const currentState = this.gameStateManager.currentState === 1 ? "RUNNING" : "PAUSE";

		const ctx = this.canvasManager.context;
		ctx.font = "20px Arial";
		ctx.fillStyle = "black";
		ctx.fillText(`Game state: ${currentState}. Use [Esc] to switch`, 10, 40);
		ctx.fillText(`Render w: ${this.canvasManager.renderSize.x}, h: ${this.canvasManager.renderSize.y}`, 10, 80);
		ctx.fillText(`View w: ${this.canvasManager.viewSize.x}, h: ${this.canvasManager.viewSize.y}`, 10, 120);
		ctx.fillText(`Scale: ${this.canvasManager.scale}`, 10, 160);
		ctx.fillText(`Update frequency: ${this.updateFrequency}Hz`, 10, 200);
		ctx.fillText(`Render frequency: ${this.renderFrequency}Hz`, 10, 240);
	}
}
