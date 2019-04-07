export default class GameObject {
	constructor() {}
	init(gameworld) {
		throw new Error("init() not implemented!");
	}
	update(gameworld) {
		throw new Error("update() not implemented!");
	}
	draw(gameworld) {
		throw new Error("draw() not implemented!");
	}
}
