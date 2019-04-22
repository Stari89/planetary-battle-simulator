import CanvasManager from "./managers/canvas-manager.js";
import GameLoopManager from "./managers/game-loop-manager.js";
import GameObjectsManager from "./managers/game-objects-manager.js";

export default class CanvasApp {
	constructor() {
		this.instantiate();
		this.init();
		this.run();
	}

	// Order not important
	instantiate() {
		this.canvasManager = new CanvasManager();
		this.gameObjectsManager = new GameObjectsManager();
		this.gameLoopManager = new GameLoopManager();

		this.gameObjectsManager.canvasManager = this.canvasManager;
		this.gameLoopManager.canvasManager = this.canvasManager;
		this.gameLoopManager.gameObjectsManager = this.gameObjectsManager;
	}

	// Order important
	init() {
		this.canvasManager.init();
		this.gameObjectsManager.init();
		this.gameLoopManager.init();
	}

	run() {
		this.gameLoopManager.run();
	}
}
