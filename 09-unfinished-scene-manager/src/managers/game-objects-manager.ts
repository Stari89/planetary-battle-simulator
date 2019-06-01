import CanvasManager from "./canvas-manager";
import GameStateManager from "./game-state-manager";
import { LoopInfo } from "./game-loop-manager";

export default class GameObjectsManager {
	// Fields
	public canvasManager: CanvasManager;
	public gameStateManager: GameStateManager;

	// Constructor
	constructor() {}

	// Public
	public init(): void {
		if (!this.canvasManager) {
			throw new Error("Property error");
		}
		if (!this.gameStateManager) {
			throw new Error("Property error");
		}
	}

	public update(loopInfo: LoopInfo): void {}

	public updateUi(loopInfo: LoopInfo): void {}

	public render(): void {}
}
