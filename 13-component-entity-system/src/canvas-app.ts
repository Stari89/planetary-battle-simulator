import { Injectable } from './ioc/injector';
import GameLoopProvider from './providers/game-loop.provider';
import InputProvider from './providers/input.provider';
import CanvasProvider from './providers/canvas.provider';

@Injectable()
export default class CanvasApp {
	constructor(
		private gameLoopManager: GameLoopProvider,
		private inputManager: InputProvider,
		private canvasManager: CanvasProvider
	) {
		gameLoopManager.run();
	}
}
