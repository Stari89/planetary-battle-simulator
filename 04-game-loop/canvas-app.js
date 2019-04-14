import CanvasManager from "./canvas-manager.js";
import GameLoopManager from "./game-loop-manager.js";
import GameObjectsManager from "./game-objects-manager.js";

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
