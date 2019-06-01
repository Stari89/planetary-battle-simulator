import InputManager from "./input-manager";
import CanvasManager from "./canvas-manager";
import GameStateManager, { GameStates } from "./game-state-manager";
import GameObjectsManager from "./game-objects-manager";

export interface LoopInfo {
	dtUpdate: number;
	tUpdate: number;
	dtRender: number;
	tRender: number;
}

export default class GameLoopManager {
	// Fields
	public inputManager: InputManager;
	public canvasManager: CanvasManager;
	public gameStateManager: GameStateManager;
	public gameObjectsManager: GameObjectsManager;
	private loopInfo: LoopInfo;
	private stopMainLoop: number;

	constructor() {
		this.loop = this.loop.bind(this);
		this.update = this.update.bind(this);
		this.render = this.render.bind(this);
	}

	// Public
	public init(): void {
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

		const now = performance.now();
		this.loopInfo = {
			dtUpdate: 1000 / 240,
			tUpdate: now,
			dtRender: NaN,
			tRender: now
		};
	}

	public run(): void {
		this.loop(performance.now());
	}

	// Private
	private loop(t: number): void {
		this.inputManager.update();
		this.stopMainLoop = requestAnimationFrame(this.loop);
		while (t > this.loopInfo.tUpdate) {
			this.loopInfo.tUpdate += this.loopInfo.dtUpdate;
			this.update();
			this.afterUpdate();
		}
		this.loopInfo.dtRender = t - this.loopInfo.tRender;
		this.loopInfo.tRender = t;
		this.render();
	}

	private update(): void {
		this.canvasManager.update();
		this.gameStateManager.update(this.loopInfo);
		if (this.gameStateManager.CurrentState === GameStates.Running) {
			this.gameObjectsManager.update(this.loopInfo);
		}
		this.gameObjectsManager.updateUi(this.loopInfo);
	}

	private afterUpdate(): void {
		this.inputManager.afterUpdate();
	}

	private render(): void {
		const ctx = this.canvasManager.Context;
		ctx.clearRect(0, 0, this.canvasManager.Canvas.width, this.canvasManager.Canvas.height);

		this.gameObjectsManager.render();
	}
}
