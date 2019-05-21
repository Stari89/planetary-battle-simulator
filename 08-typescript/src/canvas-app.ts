import CanvasManager from "./managers/canvas-manager";
import InputManager from "./managers/input-manager";
import GameLoopManager from "./managers/game-loop-manager";
import GameStateManager from "./managers/game-state-manager";
import GameObjectsManager from "./managers/game-objects-manager";

export default class CanvasApp {
	// Fields
	private canvasManager: CanvasManager;
	private inputManager: InputManager;
	private gameStateManager: GameStateManager;
	private gameObjectsManager: GameObjectsManager;
	private gameLoopManager: GameLoopManager;

	// Constructor
	constructor() {
		this.instantiate();
		this.init();
		this.run();
	}

	// Private interface
	private instantiate() {
		this.canvasManager = new CanvasManager();
		this.inputManager = new InputManager();
		this.gameStateManager = new GameStateManager();
		this.gameObjectsManager = new GameObjectsManager();
		this.gameLoopManager = new GameLoopManager();

		this.gameObjectsManager.canvasManager = this.canvasManager;
		this.gameObjectsManager.gameStateManager = this.gameStateManager;
		this.gameLoopManager.inputManager = this.inputManager;
		this.gameLoopManager.canvasManager = this.canvasManager;
		this.gameLoopManager.gameObjectsManager = this.gameObjectsManager;
		this.gameLoopManager.gameStateManager = this.gameStateManager;
		this.gameStateManager.inputManager = this.inputManager;
	}

	private init() {
		this.canvasManager.init();
		this.inputManager.init();
		this.gameStateManager.init();
		this.gameObjectsManager.init();
		this.gameLoopManager.init();
	}

	private run() {
		this.gameLoopManager.run();
	}
}
