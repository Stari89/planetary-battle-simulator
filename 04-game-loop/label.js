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
		ctx.fillText(`Update frequency: ${this.updateFrequency}Hz`, 10, 50);
		ctx.fillText(`Render frequency: ${this.renderFrequency}Hz`, 10, 100);
	}
}
