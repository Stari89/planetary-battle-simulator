import { Injectable } from './ioc/injector';
import GameLoopManager from './managers/game-loop.manager';
import InputManager from './managers/input.manager';
import CanvasManager from './managers/canvas.manager';
import GameObjectsManager from './managers/game-objects.manager';
import LabelSystem from './systems/label.system';
import PressedKeysLabelSystem from './systems/pressed-keys-label.system';
import MouseScrollLabelSystem from './systems/mouse-scroll-label.system';
import MouseStateLabelSystem from './systems/mouse-state-label.system';

@Injectable()
export default class CanvasApp {
	constructor(
		private gameLoopManager: GameLoopManager,
		private inputManager: InputManager,
		private canvasManager: CanvasManager,
		private gameObjectsManager: GameObjectsManager,
		private labelSystem: LabelSystem,
		private pressedKeysLabelSystem: PressedKeysLabelSystem,
		private mouseScrollLabelSystem: MouseScrollLabelSystem,
		private mouseStateLabelSystem: MouseStateLabelSystem
	) {
		gameLoopManager.run();
	}
}
