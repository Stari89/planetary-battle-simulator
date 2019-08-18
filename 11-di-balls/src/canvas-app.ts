import { Injectable } from './di/injectable.decorator';
import GameLoopManager from './managers/game-loop-manager';

@Injectable()
export default class CanvasApp {
	constructor(private gameLoopManager: GameLoopManager) {
		this.gameLoopManager.run();
	}
}
