import Scene from "../scene";

export default class GameScene extends Scene {
	constructor() {
		super();

		this.id = "game.scene";
		this.gameObjects = [];
	}
}
