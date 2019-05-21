import CanvasManager from "./canvas-manager";
import GameStateManager from "./game-state-manager";
import GameObject from "../game-objects/game-object";
import Ball from "../game-objects/ball";
import Label from "../game-objects/label";
import { LoopInfo } from "./game-loop-manager";

export interface GameObjectItem {
	id: string;
	gameObject: GameObject;
}

export default class GameObjectsManager {
	// Fields
	public canvasManager: CanvasManager;
	public gameStateManager: GameStateManager;
	private gameObjectItems: Array<GameObjectItem>;
	private uiObjectItems: Array<GameObjectItem>;

	// Constructor
	constructor() {
		this.gameObjectItems = [];
		this.uiObjectItems = [];
		for (let i = 0; i < 250; i++) {
			this.gameObjectItems.push({ id: `ball${i}`, gameObject: new Ball() });
		}
		this.uiObjectItems.push({ id: "label", gameObject: new Label() });
	}

	// Public
	public init(): void {
		if (!this.canvasManager) {
			throw new Error("Property error");
		}
		if (!this.gameStateManager) {
			throw new Error("Property error");
		}
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

	public update(loopInfo: LoopInfo): void {
		this.gameObjectItems.forEach(o => {
			o.gameObject.update(loopInfo);
		});
	}

	public updateUi(loopInfo: LoopInfo): void {
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
