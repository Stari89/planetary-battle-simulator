import GameObject from "./game-object.js";

export default class UiManager extends GameObject {
	init(gameWorld) {
		this.score = 0;
		this.level = 1;
		const storedScore = parseInt(localStorage.getItem("snek-highscore"));
		this.highscore = storedScore > 0 ? storedScore : 0;
	}

	update(gameWorld) {
		const snake = gameWorld.gameObjects.find(obj => {
			return obj.name === "snake";
		}).gameObject;

		this.score = snake.tail.length - 1;
		this.level = (!this.score ? 0 : Math.floor(this.score / 5)) + 1;
		this.highscore = this.highscore < this.score ? this.score : this.highscore;
		localStorage.setItem("snek-highscore", this.highscore);
	}

	draw(gameWorld) {
		document.querySelector("#score").innerText = this.score;
		document.querySelector("#level").innerText = this.level;
		document.querySelector("#highscore").innerText = this.highscore;
	}
}
