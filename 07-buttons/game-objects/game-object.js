export default class GameObject {
	constructor() {
		if (new.target === GameObject) {
			throw new TypeError("Cannot construct GameObject instances directly");
		}
	}
	init() {
		throw new Error("init() not implemented!");
	}
	update() {
		throw new Error("update() not implemented!");
	}
	draw() {
		throw new Error("draw() not implemented!");
	}
}
