import { Injectable } from '../ioc/injector';
import { OnAfterUpdate } from '../lifecycle';
import Vector2 from '../vector-2';

export interface IKeyboardState {
	pressedKeys: Array<string>;
	keyDowns: Array<string>;
	keyUps: Array<string>;
}

export interface IMouseState {
	position: Vector2;
	pressedButtons: Array<number>;
	buttonDowns: Array<number>;
	buttonUps: Array<number>;
	scrollDelta: Vector2;
}

@Injectable()
export default class InputManager implements OnAfterUpdate {
	// Fields
	private keyboardState: IKeyboardState;
	private mouseState: IMouseState;

	// Properties
	public get KeyboardState(): IKeyboardState {
		return this.keyboardState;
	}

	public get MouseState(): IMouseState {
		return this.mouseState;
	}

	// Constructor
	constructor() {
		this.onKeyDown = this.onKeyDown.bind(this);
		this.onKeyUp = this.onKeyUp.bind(this);
		this.onMouseMove = this.onMouseMove.bind(this);
		this.onMouseDown = this.onMouseDown.bind(this);
		this.onMouseUp = this.onMouseUp.bind(this);
		this.onMouseScroll = this.onMouseScroll.bind(this);

		window.onkeydown = this.onKeyDown;
		window.onkeyup = this.onKeyUp;
		window.onmousemove = this.onMouseMove;
		window.onmousedown = this.onMouseDown;
		window.onmouseup = this.onMouseUp;
		window.onwheel = this.onMouseScroll;

		this.keyboardState = {
			pressedKeys: [],
			keyDowns: [],
			keyUps: []
		};
		this.mouseState = {
			position: new Vector2(0, 0),
			pressedButtons: [],
			buttonDowns: [],
			buttonUps: [],
			scrollDelta: new Vector2(0, 0)
		};
	}

	public onAfterUpdate(): void {
		this.keyboardState.keyDowns = [];
		this.keyboardState.keyUps = [];
		this.mouseState.buttonDowns = [];
		this.mouseState.buttonUps = [];
		this.mouseState.scrollDelta = new Vector2(0, 0);
	}

	// Private
	private onKeyDown(e: KeyboardEvent): void {
		const keyIsPressed = this.keyboardState.pressedKeys.some(key => {
			return key === e.key;
		});
		if (keyIsPressed) {
			return;
		}
		this.keyboardState.pressedKeys.push(e.key);
		this.keyboardState.keyDowns.push(e.key);
	}

	private onKeyUp(e: KeyboardEvent): void {
		const i = this.keyboardState.pressedKeys.indexOf(e.key);
		if (i >= 0) {
			this.keyboardState.pressedKeys.splice(i, 1);
			this.keyboardState.keyUps.push(e.key);
		}
	}

	private onMouseMove(e: MouseEvent): void {
		this.mouseState.position.x = e.x;
		this.mouseState.position.y = e.y;
	}

	private onMouseDown(e: MouseEvent): void {
		const isButtonPressed = this.mouseState.pressedButtons.some(button => {
			return button === e.button;
		});
		if (isButtonPressed) {
			return;
		}
		this.mouseState.pressedButtons.push(e.button);
		this.mouseState.buttonDowns.push(e.button);
	}

	private onMouseUp(e: MouseEvent): void {
		const i = this.mouseState.pressedButtons.indexOf(e.button);
		if (i >= 0) {
			this.mouseState.pressedButtons.splice(i, 1);
			this.mouseState.buttonUps.push(e.button);
		}
	}

	private onMouseScroll(e: WheelEvent): void {
		this.mouseState.scrollDelta = new Vector2(e.deltaX, e.deltaY);
	}
}
