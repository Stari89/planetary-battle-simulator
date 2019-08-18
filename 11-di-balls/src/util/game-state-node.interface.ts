import { GameStates } from './game-states.enum';

export interface IGameStateNode {
	from: GameStates;
	to: GameStates;
}
