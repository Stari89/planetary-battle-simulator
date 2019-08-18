import CanvasManager from '../managers/canvas-manager';
import GameStateManager from '../managers/game-state-manager';
import { ILoopInfo } from '../util/loop-info.interface';

export default abstract class GameObject {
	public canvasManager: CanvasManager;
	public gameStateManager: GameStateManager;
	public abstract init(): void;
	public abstract update(loopInfo: ILoopInfo): void;
	public abstract render(): void;
}
