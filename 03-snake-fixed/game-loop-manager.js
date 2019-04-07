import InputManager from "./input-manager.js";
import Snake from "./snake.js";
import Fruit from "./fruit.js";
import UiManager from "./ui-manager.js";

export default class GameLoopManager {
	constructor() {
		const scale = 16;
		this.canvas = document.querySelector("#canvas");
		this.ctx = this.canvas.getContext("2d");
		this.gameWorld = {
			inputManager: new InputManager(),
			ctx: this.ctx,
			width: canvas.width,
			height: canvas.height,
			rows: this.canvas.height / scale - 1,
			columns: this.canvas.width / scale - 1,
			scale: scale,
			gameObjects: [
				{
					name: "snake",
					gameObject: new Snake()
				},
				{
					name: "fruit",
					gameObject: new Fruit()
				},
				{
					name: "ui-manager",
					gameObject: new UiManager()
				}
			]
		};
		this.handleGameLoop = this.handleGameLoop.bind(this);
		this.previousLevel = 1;
	}

	init() {
		this.gameWorld.gameObjects.forEach(o => {
			o.gameObject.init(this.gameWorld);
		});
		this.interval = window.setInterval(this.handleGameLoop, 500);
	}

	update() {
		this.gameWorld.gameObjects.forEach(o => {
			o.gameObject.update(this.gameWorld);
		});
		const uiManager = this.gameWorld.gameObjects.find(obj => {
			return obj.name === "ui-manager";
		}).gameObject;
		if (this.previousLevel != uiManager.level) {
			this.previousLevel = uiManager.level;
			window.clearInterval(this.interval);
			const int = 500 * Math.pow(0.875, this.previousLevel - 1);
			this.interval = window.setInterval(this.handleGameLoop, int);
		}
	}

	draw() {
		this.ctx.clearRect(0, 0, canvas.width, canvas.height);
		this.gameWorld.gameObjects.forEach(o => {
			o.gameObject.draw(this.gameWorld);
		});
	}
	afterDraw() {
		this.gameWorld.inputManager.afterDraw();
	}

	handleGameLoop() {
		this.update();
		this.draw();
		this.afterDraw();
	}
}
