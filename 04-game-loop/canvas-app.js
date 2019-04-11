import CanvasManager from "./canvas-manager.js";
import GameLoopManager from "./game-loop-manager.js";

export default class CanvasApp {
	constructor() {
		this.instantiate();
		this.init();
		this.run();
	}

	// Order not important
	instantiate() {
		this.canvasManager = new CanvasManager();
		this.gameLoopManager = new GameLoopManager();

		this.gameLoopManager.canvasManager = this.canvasManager;
	}

	// Order important
	init() {
		this.canvasManager.init();
		this.gameLoopManager.init();
	}

	run() {
		this.gameLoopManager.run();
	}
}
