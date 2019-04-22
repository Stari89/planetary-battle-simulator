import CanvasApp from "./canvas-app.js";

window.onload = () => {
	if (!window.Worker) {
		throw new Error("Web Workers are not supported");
	}
	new CanvasApp();
};
