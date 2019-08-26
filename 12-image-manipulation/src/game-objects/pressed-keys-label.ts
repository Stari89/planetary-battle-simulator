import { Injectable } from '../ioc/injector';
import Label from './label';
import CanvasManager from '../managers/canvas-manager';
import InputManager from '../managers/input-manager';
import { OnUpdate } from '../lifecycle';
import { ILoopInfo } from '../managers/game-loop-manager';
import Vector2 from '../vector-2';

@Injectable()
export default class PressedKeysLabel extends Label implements OnUpdate {
	constructor(protected canvasManager: CanvasManager, private inputManager: InputManager) {
		super(canvasManager);
		this.position = new Vector2(10, 40);
	}

	public onUpdate(loopInfo: ILoopInfo) {
		this.text = `Pressed keys: [${this.inputManager.KeyboardState.pressedKeys.toString()}]`;
	}
}
