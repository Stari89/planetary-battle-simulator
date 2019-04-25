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

	substract(vector) {
		return new Vector2(this.x - vector.x, this.y - vector.y);
	}

	scale(scale) {
		return new Vector2(this.x * scale, this.y * scale);
	}

	equals(vector) {
		return this.x === vector.x && this.y === vector.y;
	}

	static getRandomVector(bounds, includeNegative) {
		if (!bounds) {
			return new Vector2(Math.random(), Math.random());
		}
		if (!includeNegative) {
			return new Vector2(Math.random() * bounds.x, Math.random() * bounds.y);
		}
		return new Vector2(Math.random() * 2 * bounds.x - bounds.x, Math.random() * 2 * bounds.y - bounds.y);
	}
}
