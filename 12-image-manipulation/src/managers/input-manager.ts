import { Injectable, Service } from '../ioc/injector';
import { OnAfterUpdate } from '../lifecycle';
import Vector2 from '../vector-2';

@Service()
@Injectable()
export default class InputManager implements OnAfterUpdate {
	// Fields
	private pressedKeys: Array<string>;
	private keyDowns: Array<string>;
	private keyUps: Array<string>;

	private mousePosition: Vector2;
	private mousePressedButtons: Array<number>;
	private mouseButtonDowns: Array<number>;
	private mouseButtonUps: Array<number>;

	// Properties
	public get PressedKeys(): Array<string> {
		return this.pressedKeys;
	}

	public get KeyUps(): Array<string> {
		return this.keyUps;
	}

	public get KeyDowns(): Array<string> {
		return this.keyDowns;
	}

	// Position on view (not render)
	public get MousePosition(): Vector2 {
		return this.mousePosition;
	}

	public get MousePressedButtons(): Array<number> {
		return this.mousePressedButtons;
	}

	public get MouseButtonDowns(): Array<number> {
		return this.mouseButtonDowns;
	}

	public get MouseButtonUps(): Array<number> {
		return this.mouseButtonUps;
	}

	// Constructor
	constructor() {
		this.onKeyDown = this.onKeyDown.bind(this);
		this.onKeyUp = this.onKeyUp.bind(this);
		this.onMouseMove = this.onMouseMove.bind(this);
		this.onMouseDown = this.onMouseDown.bind(this);
		this.onMouseUp = this.onMouseUp.bind(this);

		window.onkeydown = this.onKeyDown;
		window.onkeyup = this.onKeyUp;
		window.onmousemove = this.onMouseMove;
		window.onmousedown = this.onMouseDown;
		window.onmouseup = this.onMouseUp;

		this.pressedKeys = [];
		this.keyDowns = [];
		this.keyUps = [];

		this.mousePosition = new Vector2(0, 0);
		this.mousePressedButtons = [];
		this.mouseButtonDowns = [];
		this.mouseButtonUps = [];
	}

	public onAfterUpdate(): void {
		this.keyDowns = [];
		this.keyUps = [];
		this.mouseButtonDowns = [];
		this.mouseButtonUps = [];
	}

	// Private
	private onKeyDown(e: KeyboardEvent): void {
		const keyIsPressed = this.pressedKeys.some(key => {
			return key === e.key;
		});
		if (keyIsPressed) {
			return;
		}
		this.pressedKeys.push(e.key);
		this.keyDowns.push(e.key);
	}

	private onKeyUp(e: KeyboardEvent): void {
		const i = this.pressedKeys.indexOf(e.key);
		if (i >= 0) {
			this.pressedKeys.splice(i, 1);
			this.keyUps.push(e.key);
		}
	}

	private onMouseMove(e: MouseEvent): void {
		this.mousePosition.x = e.x;
		this.mousePosition.y = e.y;
	}

	private onMouseDown(e: MouseEvent): void {
		const isButtonPressed = this.mousePressedButtons.some(button => {
			return button === e.button;
		});
		if (isButtonPressed) {
			return;
		}
		this.mousePressedButtons.push(e.button);
		this.MouseButtonDowns.push(e.button);
	}

	private onMouseUp(e: MouseEvent): void {
		const i = this.mousePressedButtons.indexOf(e.button);
		if (i >= 0) {
			this.mousePressedButtons.splice(i, 1);
			this.mouseButtonUps.push(e.button);
		}
	}
}
