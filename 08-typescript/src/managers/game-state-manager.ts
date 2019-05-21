import InputManager from "./input-manager";
import { LoopInfo } from "./game-loop-manager";

export enum GameStates {
	Running,
	Pause
}

export interface GameStateNode {
	from: GameStates;
	to: GameStates;
}

export const GameStateGraph: Array<GameStateNode> = [
	{
		from: GameStates.Running,
		to: GameStates.Pause
	},
	{
		from: GameStates.Pause,
		to: GameStates.Running
	}
];

export default class GameStateManager {
	// Fields
	public inputManager: InputManager;
	private currentState: GameStates;

	// Properties
	public get CurrentState(): GameStates {
		return this.currentState;
	}

	// Public interface
	public init(): void {
		if (!this.inputManager) {
			throw new Error("Property error");
		}
		this.currentState = GameStates.Running;
	}

	public update(loopInfo: LoopInfo): void {
		if (this.inputManager.KeyDowns.some(x => x === "Escape" || x === "Pause")) {
			switch (this.currentState) {
				case GameStates.Running:
					this.changeStateTo(GameStates.Pause);
					break;
				case GameStates.Pause:
					this.changeStateTo(GameStates.Running);
					break;
			}
		}
	}

	// Private
	private changeStateTo(newState: GameStates): void {
		if (!this.canChangeStateTo(newState)) {
			throw new Error(`Can't change state from ${this.currentState} to ${newState}`);
		}
		this.currentState = newState;
	}

	private canChangeStateTo(newState: GameStates): boolean {
		return GameStateGraph.filter(x => x.from === this.currentState).some(x => x.to === newState);
	}
}
