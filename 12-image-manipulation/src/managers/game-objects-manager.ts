import { Injectable, Injector, System } from '../ioc/injector';
import GameObject, { GameObjectFactory } from '../game-objects/game-object';
import Label from '../entities/label';
import Transform from '../components/transform';
import Vector2 from '../vector-2';
import LabelText from '../components/label-text';

export interface GameObjectItem {
	id: string;
	gameObject: GameObject;
}

@System()
@Injectable()
export default class GameObjectsManager {
	public readonly gameObjectItems: Array<any>;

	constructor(gameObjectFactory: GameObjectFactory) {
		// this.gameObjectItems = ['asdf', 'asdf', new Label(null, null)];
		this.gameObjectItems = [
			new Label(
				new Transform(new Vector2(10, 40), new Vector2(1, 1), 0),
				new LabelText('Test Pest', 'black', '20px Arial')
			)
		];
	}
}
