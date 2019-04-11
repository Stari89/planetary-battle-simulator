export default class GameLoopManager {
	constructor() {
		this.loop = this.loop.bind(this);
		this.update = this.update.bind(this);
		this.render = this.render.bind(this);
	}

	init() {
		if (!this.canvasManager) {
			throw new Error("Property error");
		}

		this.dtUpdate = 1000 / 240; // Updating at 240Hz
		this.tUpdate = performance.now();

		this.dtRender = NaN;
		this.tRender = this.tUpdate;
	}

	run() {
		this.loop(performance.now());
	}

	loop(t) {
		this.stopMainLoop = requestAnimationFrame(this.loop);
		while (t > this.tUpdate) {
			this.tUpdate += this.dtUpdate;
			this.update();
		}
		this.dtRender = t - this.tRender;
		this.tRender = t;
		this.render();
	}

	update() {
		//console.log("update");
	}

	render() {
		const ctx = this.canvasManager.context;
		ctx.clearRect(0, 0, this.canvasManager.canvas.width, this.canvasManager.canvas.height);
		ctx.font = "20px Arial";
		ctx.fillText(`Update frequency: ${Math.round(1000 / this.dtUpdate)}Hz`, 10, 50);
		ctx.fillText(`Render frequency: ${Math.round(1000 / this.dtRender)}Hz`, 10, 100);
	}
}
