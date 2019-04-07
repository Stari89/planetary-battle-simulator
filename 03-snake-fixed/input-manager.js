export default class InputManager {
	constructor() {
		this.pressedKeys = [];
		this.lastPressedKeys = [];

		this.keyDownHandler = this.keyDownHandler.bind(this);
		this.keyUpHandler = this.keyUpHandler.bind(this);
		window.onkeydown = this.keyDownHandler;
		window.onkeyup = this.keyUpHandler;
	}

	keyDownHandler(e) {
		if (this.pressedKeys.includes(e.key)) {
			return;
		}
		this.pressedKeys.push(e.key);
		this.lastPressedKeys.push(e.key);
	}

	keyUpHandler(e) {
		const i = this.pressedKeys.indexOf(e.key);
		if (i >= 0) this.pressedKeys.splice(i, 1);
	}

	afterDraw() {
		this.lastPressedKeys = this.pressedKeys.slice();
	}

	getLastPressedKey() {
		return this.lastPressedKeys[this.lastPressedKeys.length - 1];
	}
}
