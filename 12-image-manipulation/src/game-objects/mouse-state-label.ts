import { Injectable } from '../ioc/injector';
import Label from './label';
import { ILoopInfo } from '../managers/game-loop-manager';
import CanvasManager from '../managers/canvas-manager';
import InputManager from '../managers/input-manager';
import Vector2 from '../vector-2';
import { OnUpdate } from '../lifecycle';

@Injectable()
export default class MouseStateLabel extends Label implements OnUpdate {
	constructor(protected canvasManager: CanvasManager, private inputManager: InputManager) {
		super(canvasManager);
		this.position = new Vector2(10, 80);
	}

	public onUpdate(loopInfo: ILoopInfo) {
		this.text = `Mouse buttons pressed: [${this.inputManager.MouseState.pressedButtons}], Mouse position: ${this.inputManager.MouseState.position}`;
	}
}
