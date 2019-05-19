import { GameStates } from "./game-state-manager.js";

export default class GameLoopManager {
	constructor() {
		this.loop = this.loop.bind(this);
		this.update = this.update.bind(this);
		this.render = this.render.bind(this);
	}

	init() {
		if (!this.inputManager) {
			throw new Error("Property error");
		}
		if (!this.canvasManager) {
			throw new Error("Property error");
		}
		if (!this.gameStateManager) {
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
		this.inputManager.update();
		this.stopMainLoop = requestAnimationFrame(this.loop);
		while (t > this.tUpdate) {
			this.tUpdate += this.dtUpdate;
			this.update();
			this.afterUpdate();
		}
		this.dtRender = t - this.tRender;
		this.tRender = t;
		this.render();
	}

	update() {
		this.canvasManager.update();
		const loopInfo = {
			dtUpdate: this.dtUpdate,
			tUpdate: this.tUpdate,
			dtRender: this.dtRender,
			tRender: this.tRender
		};
		this.gameStateManager.update(loopInfo);
		if (this.gameStateManager.currentState === GameStates.RUNNING) {
			this.gameObjectsManager.update(loopInfo);
		}
		this.gameObjectsManager.updateUi(loopInfo);
	}

	afterUpdate() {
		this.inputManager.afterUpdate();
	}

	render() {
		const ctx = this.canvasManager.context;
		ctx.clearRect(0, 0, this.canvasManager.canvas.width, this.canvasManager.canvas.height);

		this.gameObjectsManager.render();
	}
}
