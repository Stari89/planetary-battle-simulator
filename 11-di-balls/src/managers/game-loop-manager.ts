import { Injectable } from '../di/injectable.decorator';
import InputManager from './input-manager';
import CanvasManager from './canvas-manager';
import GameStateManager from './game-state-manager';
import GameObjectsManager from './game-objects-manager';
import { ILoopInfo } from '../util/loop-info.interface';
import { GameStates } from '../util/game-states.enum';

@Injectable()
export default class GameLoopManager {
	// Fields
	private loopInfo: ILoopInfo;
	private stopMainLoop: number;

	constructor(
		private inputManager: InputManager,
		private canvasManager: CanvasManager,
		private gameStateManager: GameStateManager,
		private gameObjectsManager: GameObjectsManager
	) {
		this.loop = this.loop.bind(this);
		this.update = this.update.bind(this);
		this.render = this.render.bind(this);

		const now = performance.now();
		this.loopInfo = {
			dtUpdate: 1000 / 240,
			tUpdate: now,
			dtRender: NaN,
			tRender: now
		};
	}

	// Public
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
