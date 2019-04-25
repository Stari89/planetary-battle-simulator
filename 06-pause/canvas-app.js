import CanvasManager from "./managers/canvas-manager.js";
import GameLoopManager from "./managers/game-loop-manager.js";
import GameObjectsManager from "./managers/game-objects-manager.js";
import GameStateManager from "./managers/game-state-manager.js";
import InputManager from "./managers/input-manager.js";

export default class CanvasApp {
	constructor() {
		this.instantiate();
		this.init();
		this.run();
	}

	// Order not important
	instantiate() {
		this.inputManager = new InputManager();
		this.canvasManager = new CanvasManager();
		this.gameStateManager = new GameStateManager();
		this.gameObjectsManager = new GameObjectsManager();
		this.gameLoopManager = new GameLoopManager();

		this.gameObjectsManager.canvasManager = this.canvasManager;
		this.gameLoopManager.inputManager = this.inputManager;
		this.gameLoopManager.canvasManager = this.canvasManager;
		this.gameLoopManager.gameObjectsManager = this.gameObjectsManager;
		this.gameLoopManager.gameStateManager = this.gameStateManager;
		this.gameStateManager.inputManager = this.inputManager;
	}

	// Order important
	init() {
		this.inputManager.init();
		this.canvasManager.init();
		this.gameStateManager.init();
		this.gameObjectsManager.init();
		this.gameLoopManager.init();
	}

	run() {
		this.gameLoopManager.run();
	}
}
