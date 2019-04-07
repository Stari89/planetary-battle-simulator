export default class Vector2 {
	constructor(x, y) {
		if (typeof x !== "number") {
			throw new Error("Argument exception, parameter x");
		}
		if (typeof y !== "number") {
			throw new Error("Argument exception, parameter y");
		}
		this.x = x;
		this.y = y;
	}

	get normal() {
		return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
	}

	get direction() {
		if (this.normal === 0) return new Vector2();
		return new Vector2(this.x / this.normal, this.y / this.normal);
	}

	add(vector) {
		return new Vector2(this.x + vector.x, this.y + vector.y);
	}

	equals(vector) {
		return this.x === vector.x && this.y === vector.y;
	}

	static getRandomPosition(gameWorld) {
		return new Vector2(
			Math.floor(Math.random() * gameWorld.rows - 1) + 1,
			Math.floor(Math.random() * gameWorld.columns - 1) + 1
		);
	}

	static getRandomDirection() {
		const direction = Math.floor(Math.random() * 4);
		switch (direction) {
			case 0:
				return new Vector2(1, 0);
			case 1:
				return new Vector2(-1, 0);
			case 2:
				return new Vector2(0, 1);
			case 3:
				return new Vector2(0, -1);
		}
	}
}
