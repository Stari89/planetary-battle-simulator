import GameObject from "./game-object.js";
import Vector2 from "./vector-2.js";

export default class Fruit extends GameObject {
	init(gameWorld) {
		this.position = Vector2.getRandomPosition(gameWorld);
	}

	update(gameWorld) {
		const snake = gameWorld.gameObjects.find(obj => {
			return obj.name === "snake";
		}).gameObject;
		if (this.position.equals(snake.position)) {
			this.position = Vector2.getRandomPosition(gameWorld);
		}
	}

	draw(gameWorld) {
		gameWorld.ctx.fillStyle = "#50a0c0";
		gameWorld.ctx.fillRect(
			this.position.x * gameWorld.scale,
			this.position.y * gameWorld.scale,
			gameWorld.scale,
			gameWorld.scale
		);
	}
}
