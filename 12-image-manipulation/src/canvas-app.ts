import { Injectable, Service } from './ioc/injector';
import GameLoopManager from './managers/game-loop-manager';
import InputManager from './managers/input-manager';
import CanvasManager from './managers/canvas-manager';
import GameObjectsManager from './managers/game-objects-manager';

@Service()
@Injectable()
export default class CanvasApp {
	constructor(
		private gameLoopManager: GameLoopManager,
		private inputManager: InputManager,
		private canvasManager: CanvasManager,
		private gameObjectsManager: GameObjectsManager
	) {
		gameLoopManager.run();
	}
}
