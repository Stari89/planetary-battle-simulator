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
		if (!this.gameObjectsManager) {
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
		this.gameObjectsManager.update({
			dtUpdate: this.dtUpdate,
			tUpdate: this.tUpdate,
			dtRender: this.dtRender,
			tRender: this.tRender
		});
	}

	render() {
		const ctx = this.canvasManager.context;
		ctx.clearRect(0, 0, this.canvasManager.canvas.width, this.canvasManager.canvas.height);

		this.gameObjectsManager.render();
	}
}
