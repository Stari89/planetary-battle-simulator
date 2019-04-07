import GameLoopManager from "./game-loop-manager.js";

window.onload = () => {
	const gameLoopManager = new GameLoopManager();
	gameLoopManager.init();
};
