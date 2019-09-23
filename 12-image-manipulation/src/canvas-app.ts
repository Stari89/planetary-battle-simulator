import { Injectable, System } from './ioc/injector';
import GameLoopManager from './managers/game-loop-manager';
import InputManager from './managers/input-manager';
import CanvasManager from './managers/canvas-manager';
import GameObjectsManager from './managers/game-objects-manager';
import LabelSystem from './systems/label-system';
import PressedKeysLabelSystem from './systems/pressed-keys-label-system';

@System()
@Injectable()
export default class CanvasApp {
	constructor(
		private gameLoopManager: GameLoopManager,
		private inputManager: InputManager,
		private canvasManager: CanvasManager,
		private gameObjectsManager: GameObjectsManager,
		private labelSystem: LabelSystem,
		private pressedKeysLabelSystem: PressedKeysLabelSystem
	) {
		gameLoopManager.run();
	}
}
