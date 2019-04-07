import GameObject from "./game-object.js";
import Vector2 from "./vector-2.js";

export default class Snake extends GameObject {
	get position() {
		return this.tail[0];
	}

	init(gameworld) {
		this.total = 0;
		this.tail = [Vector2.getRandomPosition(gameworld)];
		this.direction = Vector2.getRandomDirection();
	}

	update(gameWorld) {
		this.updateSpeed(gameWorld.inputManager.getLastPressedKey());
		this.updatePosition(gameWorld);
		this.checkCollision();
		this.updateEating(gameWorld);
	}

	updateSpeed(lastKey) {
		switch (lastKey) {
			case "ArrowUp":
				if (this.direction.x === 0 && this.direction.y === 1) {
					break;
				}
				this.direction = new Vector2(0, -1);
				break;
			case "ArrowDown":
				if (this.direction.x === 0 && this.direction.y === -1) {
					break;
				}
				this.direction = new Vector2(0, 1);
				break;
			case "ArrowLeft":
				if (this.direction.x === 1 && this.direction.y === 0) {
					break;
				}
				this.direction = new Vector2(-1, 0);
				break;
			case "ArrowRight":
				if (this.direction.x === -1 && this.direction.y === 0) {
					break;
				}
				this.direction = new Vector2(1, 0);
				break;
		}
	}

	updatePosition(gameWorld) {
		let next = this.position.add(this.direction);
		if (next.x > gameWorld.columns) next.x = 0;
		if (next.y > gameWorld.rows) next.y = 0;
		if (next.x < 0) next.x = gameWorld.columns;
		if (next.y < 0) next.y = gameWorld.rows;

		for (let i = 0; i < this.tail.length; i++) {
			const previous = this.tail[i];
			this.tail[i] = next;
			next = previous;
		}
	}

	updateEating(gameWorld) {
		const fruit = gameWorld.gameObjects.find(obj => {
			return obj.name === "fruit";
		}).gameObject;
		if (this.position.equals(fruit.position)) {
			this.total++;
			this.tail.push(new Vector2(this.position.x, this.position.y));
		}
	}

	checkCollision() {
		for (let i = 1; i < this.tail.length; i++) {
			if (this.position.equals(this.tail[i])) {
				this.total = 0;
				this.tail = [this.position];
			}
		}
	}

	draw(gameWorld) {
		gameWorld.ctx.fillStyle = "#FFFFFF";
		for (let i = 0; i < this.tail.length; i++) {
			gameWorld.ctx.fillRect(
				this.tail[i].x * gameWorld.scale,
				this.tail[i].y * gameWorld.scale,
				gameWorld.scale,
				gameWorld.scale
			);
		}
		gameWorld.ctx.fillRect(
			this.position.x * gameWorld.scale,
			this.position.y * gameWorld.scale,
			gameWorld.scale,
			gameWorld.scale
		);
	}
}
