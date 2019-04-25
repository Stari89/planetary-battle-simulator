import Label from "../game-objects/label.js";
import Ball from "../game-objects/ball.js";

export default class GameObjectsManager {
	constructor() {
		this.gameObjects = [];
		this.uiObjects = [];

		for (let i = 0; i < 250; i++) {
			this.gameObjects.push({ id: "ball" + i, gameObject: new Ball() });
		}

		this.uiObjects.push({
			id: "label",
			gameObject: new Label()
		});
	}

	init() {
		if (!this.canvasManager) {
			throw new Error("Property error");
		}
		this.gameObjects.forEach(o => {
			o.gameObject.canvasManager = this.canvasManager;
			o.gameObject.init();
		});
		this.uiObjects.forEach(o => {
			o.gameObject.canvasManager = this.canvasManager;
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
