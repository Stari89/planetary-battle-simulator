import { LoopInfo } from "../managers/game-loop-manager";
import CanvasManager from "../managers/canvas-manager";
import GameStateManager from "../managers/game-state-manager";

export default abstract class GameObject {
	public canvasManager: CanvasManager;
	public gameStateManager: GameStateManager;
	public abstract init(): void;
	public abstract update(loopInfo: LoopInfo): void;
	public abstract render(): void;
}
