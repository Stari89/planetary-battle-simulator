import CanvasManager from "./managers/canvas-manager";
import InputManager from "./managers/input-manager";
import SceneManager from "./managers/scene-manager";

export default class CanvasApp {
	// Fields
	private canvasManager: CanvasManager;
	private inputManager: InputManager;
	private sceneManager: SceneManager;

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
		this.sceneManager = new SceneManager();
	}

	private init() {
		this.canvasManager.init();
		this.inputManager.init();
		this.sceneManager.init();
	}

	private run() {
		// this.gameLoopManager.run();
	}
}
