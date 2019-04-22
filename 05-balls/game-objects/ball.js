import GameObject from "./game-object.js";
import Vector2 from "../vector-2.js";

export default class Ball extends GameObject {
	init() {
		this.radius = 5 + Math.random() * 20;
		this.color = this.getRandomColor();
		this.position = this.getRandomPosition(this.radius);
		this.speed = Vector2.getRandomVector(new Vector2(1000 / 1000, 1000 / 1000), true); // 1000px / 1000ms
	}

	update(loopInfo) {
		if (this.position.x - this.radius <= 0 || this.position.x + this.radius >= this.canvasManager.viewSize.x) {
			this.speed.x = -this.speed.x;
		}

		if (this.position.y - this.radius <= 0 || this.position.y + this.radius >= this.canvasManager.viewSize.y) {
			this.speed.y = -this.speed.y;
		}

		this.position = this.position.add(this.speed.scale(loopInfo.dtUpdate));
	}

	render() {
		const ctx = this.canvasManager.context;
		ctx.beginPath();
		ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
		ctx.fillStyle = this.color;
		ctx.closePath();
		ctx.fill();
	}

	getRandomColor() {
		var letters = "0123456789ABCDEF";
		var color = "#";
		for (var i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}

	getRandomPosition(radius) {
		return Vector2.getRandomVector(this.canvasManager.viewSize.substract(new Vector2(radius, radius).scale(2))).add(
			new Vector2(radius, radius)
		);
	}
}
