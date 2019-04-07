const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const scale = 10;

const rows = canvas.height / scale;
const columns = canvas.width / scale;

var snake;

(function setup() {
	snake = new Snake();
	fruit = new Fruit();

	fruit.pickLocation();

	fruit.draw();
	snake.draw();

	window.setInterval(() => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		fruit.draw();
		snake.update();
		snake.draw();

		if (snake.eat(fruit)) {
			fruit.pickLocation();
		}
		document.querySelector("#score").innerText = snake.total;
		snake.checkCollision();
	}, 125);
})();

window.addEventListener("keydown", e => {
	const direction = e.key.replace("Arrow", "");
	snake.changeDirection(direction);
});
