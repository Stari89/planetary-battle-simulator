export default class InputManager {
	constructor() {
		this.keyDownHandler = this.keyDownHandler.bind(this);
		this.keyUpHandler = this.keyUpHandler.bind(this);
		window.onkeydown = this.keyDownHandler;
		window.onkeyup = this.keyUpHandler;
	}

	init() {
		this.pressedKeys = [];
		this.keyDowns = [];
		this.keyUps = [];
	}

	update() {}

	afterUpdate() {
		this.keyDowns = [];
		this.keyUps = [];
	}

	keyDownHandler(e) {
		if (this.pressedKeys.includes(e.key)) {
			return;
		}
		this.pressedKeys.push(e.key);
		this.keyDowns.push(e.key);
	}

	keyUpHandler(e) {
		const i = this.pressedKeys.indexOf(e.key);
		if (i >= 0) {
			this.pressedKeys.splice(i, 1);
			this.keyUps.push(e.key);
		}
	}
}
