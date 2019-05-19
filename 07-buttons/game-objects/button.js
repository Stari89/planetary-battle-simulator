import GameObject from "./game-object.js";
import Vector2 from "../vector-2.js";

export default class Button extends GameObject {
	constructor() {
		super();
		this.text = "Button";

		this.font = "16px Arial";
		this.color = "rgba(60, 60, 60, 0.75)";
		this.backgroundColor = "rgba(255, 255, 255, 0.75)";
		this.width = 150;
		this.height = 30;
		this.verticalAlign = VerticalAlign.TOP;
		this.horizontalAlign = HorizontalAlign.LEFT;
		this.top = 0;
		this.right = 0;
		this.bottom = 0;
		this.left = 0;
	}

	init() {
		// position indicates the top left corner
		this.position = new Vector2();

		switch (this.horizontalAlign) {
			case HorizontalAlign.LEFT:
				this.position.x = this.left - this.right;
				break;
			case HorizontalAlign.CENTER:
				this.position.x = (this.canvasManager.viewSize.x - this.width) / 2 + this.left - this.right;
				break;
			case HorizontalAlign.RIGHT:
				this.position.x = this.canvasManager.viewSize.x - this.width + this.left - this.right;
		}
		switch (this.verticalAlign) {
			case VerticalAlign.TOP:
				this.position.y = this.top - this.bottom;
				break;
			case VerticalAlign.MIDDLE:
				this.position.y = (this.canvasManager.viewSize.y - this.height) / 2 + this.top - this.bottom;
				break;
			case VerticalAlign.BOTTOM:
				this.position.y = this.canvasManager.viewSize.y - this.height + this.top - this.bottom;
				break;
		}
	}

	update(loopInfo) {}

	render() {
		const ctx = this.canvasManager.context;

		ctx.beginPath();
		ctx.fillStyle = this.backgroundColor;
		ctx.strokeStyle = this.color;
		ctx.closePath();
		ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

		ctx.beginPath();
		ctx.font = this.font;
		ctx.fillStyle = this.color;
		ctx.textAlign = "center";
		ctx.closePath();
		ctx.fillText(this.text, this.position.x + this.width / 2, this.position.y + this.height / 2 + 6);
	}
}

export const VerticalAlign = {
	TOP: 1,
	MIDDLE: 2,
	BOTTOM: 3
};

export const HorizontalAlign = {
	LEFT: 1,
	CENTER: 2,
	RIGHT: 3
};
