import GameObject from '../game-objects/game-object';
import CanvasManager from './canvas-manager';
import GameStateManager from './game-state-manager';
import { Injectable } from '../di/injectable.decorator';
import Ball from '../game-objects/ball';
import Label from '../game-objects/label';
import { ILoopInfo } from '../util/loop-info.interface';

export interface GameObjectItem {
	id: string;
	gameObject: GameObject;
}

@Injectable()
export default class GameObjectsManager {
	// Fields
	private gameObjectItems: Array<GameObjectItem>;
	private uiObjectItems: Array<GameObjectItem>;

	// Constructor
	constructor(private canvasManager: CanvasManager, private gameStateManager: GameStateManager) {
		this.gameObjectItems = [];
		this.uiObjectItems = [];
		for (let i = 0; i < 250; i++) {
			this.gameObjectItems.push({ id: `ball${i}`, gameObject: new Ball() });
		}
		this.uiObjectItems.push({ id: 'label', gameObject: new Label() });

		this.gameObjectItems.forEach(o => {
			o.gameObject.canvasManager = this.canvasManager;
			o.gameObject.init();
		});
		this.uiObjectItems.forEach(o => {
			o.gameObject.canvasManager = this.canvasManager;
			o.gameObject.gameStateManager = this.gameStateManager;
			o.gameObject.init();
		});
	}

	public update(loopInfo: ILoopInfo): void {
		this.gameObjectItems.forEach(o => {
			o.gameObject.update(loopInfo);
		});
	}

	public updateUi(loopInfo: ILoopInfo): void {
		this.uiObjectItems.forEach(o => {
			o.gameObject.update(loopInfo);
		});
	}

	public render(): void {
		this.gameObjectItems.forEach(o => {
			o.gameObject.render();
		});
		this.uiObjectItems.forEach(o => {
			o.gameObject.render();
		});
	}
}
