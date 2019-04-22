import Vector2 from "../vector-2.js";

export default class CanvasManager {
	constructor() {
		this.root = document.getElementById("root");
		this.canvas = document.createElement("canvas");
		this.context = this.canvas.getContext("2d");
	}

	init() {
		this.canvas.style.backgroundColor = "#AAAAAA";
		this.setDimensions();
		this.root.appendChild(this.canvas); // must be at the bottom
	}

	update() {
		if (
			this.devicePixelRatio !== this.calculateDevicePixelRatio() ||
			this.backingStoreRatio !== this.calculateBackingStoreRatio() ||
			this.viewSize.x !== window.innerWidth ||
			this.viewSize.y !== window.innerHeight
		) {
			this.setDimensions();
		}
	}

	setDimensions() {
		// TO DO: Some weird bug on Google Chrome (desktop and mobile) returns wrong window dimensions when changing orientation
		this.devicePixelRatio = this.calculateDevicePixelRatio();
		this.backingStoreRatio = this.calculateBackingStoreRatio();
		this.scale = this.devicePixelRatio / this.backingStoreRatio;
		this.renderSize = new Vector2(window.innerWidth * this.scale, window.innerHeight * this.scale);
		this.viewSize = new Vector2(window.innerWidth, window.innerHeight);

		this.canvas.width = this.renderSize.x;
		this.canvas.height = this.renderSize.y;
		this.canvas.style.width = this.viewSize.x + "px";
		this.canvas.style.height = this.viewSize.y + "px";

		this.context.scale(this.scale, this.scale);
	}

	calculateDevicePixelRatio() {
		return window.devicePixelRatio || 1;
	}

	calculateBackingStoreRatio() {
		return (
			this.context.webkitBackingStorePixelRatio ||
			this.context.mozBackingStorePixelRatio ||
			this.context.msBackingStorePixelRatio ||
			this.context.oBackingStorePixelRatio ||
			this.context.backingStorePixelRatio ||
			1
		);
	}
}
