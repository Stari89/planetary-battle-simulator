import Label from "./label.js";

export default class GameObjectsManager {
	constructor() {
		this.gameObjects = [
			{
				id: "label",
				gameObject: new Label()
			}
		];
	}

	init() {
		if (!this.canvasManager) {
			throw new Error("Property error");
		}
		this.gameObjects.forEach(o => {
			o.gameObject.canvasManager = this.canvasManager;
			o.gameObject.init();
		});
	}

	update(loopInfo) {
		this.gameObjects.forEach(o => {
			o.gameObject.update(loopInfo);
		});
	}

	render(t, dt) {
		this.gameObjects.forEach(o => {
			o.gameObject.render();
		});
	}
}
