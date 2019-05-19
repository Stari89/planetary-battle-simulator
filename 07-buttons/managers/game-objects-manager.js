import Label from "../game-objects/label.js";
import Ball from "../game-objects/ball.js";
import Button, { HorizontalAlign, VerticalAlign } from "../game-objects/button.js";

export default class GameObjectsManager {
	constructor() {
		this.gameObjects = [];
		this.uiObjects = [];

		for (let i = 0; i < 250; i++) {
			this.gameObjects.push({ id: "ball" + i, gameObject: new Ball() });
		}

		const button1 = new Button();
		button1.text = "Pause";
		button1.horizontalAlign = HorizontalAlign.CENTER;
		button1.verticalAlign = VerticalAlign.BOTTOM;
		button1.bottom = 5;

		const button2 = new Button();
		button2.text = "Continue";
		button2.top = 5;
		button2.left = 5;

		this.uiObjects.push({
			id: "button1",
			gameObject: button1
		});

		this.uiObjects.push({
			id: "button2",
			gameObject: button2
		});
	}

	init() {
		if (!this.canvasManager) {
			throw new Error("Property error");
		}
		if (!this.gameStateManager) {
			throw new Error("Property error");
		}
		this.gameObjects.forEach(o => {
			o.gameObject.canvasManager = this.canvasManager;
			o.gameObject.init();
		});
		this.uiObjects.forEach(o => {
			o.gameObject.canvasManager = this.canvasManager;
			o.gameObject.gameStateManager = this.gameStateManager;
			o.gameObject.init();
		});
	}

	update(loopInfo) {
		this.gameObjects.forEach(o => {
			o.gameObject.update(loopInfo);
		});
	}

	updateUi(loopInfo) {
		this.uiObjects.forEach(o => {
			o.gameObject.update(loopInfo);
		});
	}

	render(t, dt) {
		this.gameObjects.forEach(o => {
			o.gameObject.render();
		});
		this.uiObjects.forEach(o => {
			o.gameObject.render();
		});
	}
}
