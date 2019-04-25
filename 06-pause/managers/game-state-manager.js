export const GameStates = {
	RUNNING: 1,
	PAUSE: 2
};

export const GameStateGraph = [
	{
		from: GameStates.RUNNING,
		to: GameStates.PAUSE
	},
	{
		from: GameStates.PAUSE,
		to: GameStates.RUNNING
	}
];

export default class GameStateManager {
	init() {
		if (!this.inputManager) {
			throw new Error("Property error");
		}

		this.currentState = GameStates.RUNNING;
	}

	changeStateTo(newState) {
		if (!this.canChangeStateTo(newState)) {
			return false;
		}
		this.currentState = newState;
		return true;
	}

	canChangeStateTo(newState) {
		return GameStateGraph.filter(x => x.from === this.currentState).some(x => x.to === newState);
	}

	update(loopInfo) {
		if (this.inputManager.keyDowns.some(x => x === "Escape" || x === "Pause")) {
			switch (this.currentState) {
				case GameStates.RUNNING:
					this.changeStateTo(GameStates.PAUSE);
					break;
				case GameStates.PAUSE:
					this.changeStateTo(GameStates.RUNNING);
					break;
			}
		}
	}
}
