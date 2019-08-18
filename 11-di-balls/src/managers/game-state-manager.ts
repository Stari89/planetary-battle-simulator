import { IGameStateNode } from '../util/game-state-node.interface';
import { GameStates } from '../util/game-states.enum';
import { ILoopInfo } from '../util/loop-info.interface';
import { Injectable } from '../di/injectable.decorator';
import InputManager from './input-manager';

export const GameStateGraph: Array<IGameStateNode> = [
	{
		from: GameStates.Running,
		to: GameStates.Pause
	},
	{
		from: GameStates.Pause,
		to: GameStates.Running
	}
];

@Injectable()
export default class GameStateManager {
	// Fields
	private currentState: GameStates;

	// Properties
	public get CurrentState(): GameStates {
		return this.currentState;
	}

	// Constructor
	constructor(private inputManager: InputManager) {
		this.currentState = GameStates.Running;
	}

	// Public interface
	public update(loopInfo: ILoopInfo): void {
		if (this.inputManager.KeyDowns.some((x: any) => x === 'Escape' || x === 'Pause')) {
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
