import InputManager from "./input-manager.js";
import Snake from "./snake.js";
import Fruit from "./fruit.js";

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
				}
			]
		};
		this.handleGameLoop = this.handleGameLoop.bind(this);
	}

	init() {
		this.gameWorld.gameObjects.forEach(o => {
			o.gameObject.init(this.gameWorld);
		});
		window.setInterval(this.handleGameLoop, 100);
	}

	update() {
		this.gameWorld.gameObjects.forEach(o => {
			o.gameObject.update(this.gameWorld);
		});
		const snake = this.gameWorld.gameObjects.find(obj => {
			return obj.name === "snake";
		}).gameObject;
		document.querySelector("#score").innerText = snake.total;
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
