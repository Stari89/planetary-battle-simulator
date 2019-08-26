import { Injectable } from '../ioc/injector';
import Label from './label';
import { OnUpdate } from '../lifecycle';
import CanvasManager from '../managers/canvas-manager';
import InputManager from '../managers/input-manager';
import Vector2 from '../vector-2';
import { ILoopInfo } from '../managers/game-loop-manager';

@Injectable()
export default class MouseScrollLabel extends Label implements OnUpdate {
	private lastScroll: Vector2;

	constructor(protected canvasManager: CanvasManager, private inputManager: InputManager) {
		super(canvasManager);
		this.position = new Vector2(10, 120);
		this.lastScroll = new Vector2(0, 0);
	}

	public onUpdate(loopInfo: ILoopInfo) {
		if (!this.inputManager.MouseState.scrollDelta.equals(new Vector2(0, 0))) {
			this.lastScroll = this.inputManager.MouseState.scrollDelta;
		}

		this.text = `Mouse scroll: ${this.inputManager.MouseState.scrollDelta}, last scroll: ${this.lastScroll}`;
	}
}
