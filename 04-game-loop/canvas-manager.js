export default class CanvasManager {
	constructor() {
		this.root = document.getElementById("root");
		this.canvas = document.createElement("canvas");
		this.context = this.canvas.getContext("2d");
	}

	init() {
		this.root.appendChild(this.canvas);
	}
}
