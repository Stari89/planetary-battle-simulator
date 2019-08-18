import { Injectable } from '../di/injectable.decorator';

@Injectable()
export default class InputManager {
	// Fields
	private pressedKeys: Array<string>;
	private keyDowns: Array<string>;
	private keyUps: Array<string>;

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

	// Constructor
	constructor() {
		this.onKeyDown = this.onKeyDown.bind(this);
		this.onKeyUp = this.onKeyUp.bind(this);
		window.onkeydown = this.onKeyDown;
		window.onkeyup = this.onKeyUp;
		this.pressedKeys = [];
		this.keyDowns = [];
		this.keyUps = [];
	}

	public update(): void {}

	public afterUpdate(): void {
		this.keyDowns = [];
		this.keyUps = [];
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
}
