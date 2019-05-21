import GameObject from "./game-object";
import CanvasManager from "../managers/canvas-manager";
import GameStateManager from "../managers/game-state-manager";
import { LoopInfo } from "../managers/game-loop-manager";
import Vector2 from "../vector-2";

export default class Ball implements GameObject {
	// Fields
	public canvasManager: CanvasManager;
	public gameStateManager: GameStateManager;
	private radius: number;
	private color: string;
	private position: Vector2;
	private speed: Vector2;
	private acceleration: number;

	// Public
	public init(): void {
		this.radius = 5 + Math.random() * 20;
		this.color = this.getRandomColor();
		this.position = this.getRandomPosition(this.radius);
		this.speed = Vector2.getRandomVector(new Vector2(500 / 1000, 500 / 1000), true); // 1000px / 1000ms
		this.acceleration = 1 / 1000;
	}

	public update(loopInfo: LoopInfo): void {
		this.speed.y += this.acceleration * loopInfo.dtUpdate;
		this.position = this.position.add(this.speed.scale(loopInfo.dtUpdate));

		if (this.position.x - this.radius <= 0) {
			this.position.x += Math.abs(this.position.x - this.radius);
			this.speed.x = Math.abs(this.speed.x);
		}

		if (this.position.x + this.radius >= this.canvasManager.ViewSize.x) {
			this.position.x -= 2 * (this.position.x + this.radius - this.canvasManager.ViewSize.x);
			this.speed.x = -Math.abs(this.speed.x);
		}

		if (this.position.y - this.radius <= 0) {
			this.position.y += Math.abs(this.position.y - this.radius);
			this.speed.y = Math.abs(this.speed.y);
		}

		if (this.position.y + this.radius >= this.canvasManager.ViewSize.y) {
			this.position.y -= 2 * (this.position.y + this.radius - this.canvasManager.ViewSize.y);
			this.speed.y = -Math.abs(this.speed.y);
		}
	}

	public render(): void {
		const ctx = this.canvasManager.Context;
		ctx.beginPath();
		ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
		ctx.fillStyle = this.color;
		ctx.closePath();
		ctx.fill();
	}

	// Private
	private getRandomColor(): string {
		const characters = "0123456789ABCDEF";
		let color = "#";
		for (var i = 0; i < 6; i++) {
			color += characters[Math.floor(Math.random() * 16)];
		}
		return color;
	}

	private getRandomPosition(radius: number): Vector2 {
		return Vector2.getRandomVector(this.canvasManager.ViewSize.substract(new Vector2(radius, radius).scale(2))).add(
			new Vector2(radius, radius)
		);
	}
}
