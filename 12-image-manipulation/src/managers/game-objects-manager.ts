import { Injectable, Injector, Service } from '../ioc/injector';
import GameObject, { GameObjectFactory } from '../game-objects/game-object';
import PressedKeysLabel from '../game-objects/pressed-keys-label';
import Label from '../game-objects/label';
import Vector2 from '../vector-2';
import MouseStateLabel from '../game-objects/mouse-state-label';

export interface GameObjectItem {
	id: string;
	gameObject: GameObject;
}

@Service()
@Injectable()
export default class GameObjectsManager {
	private gameObjectItems: Array<GameObjectItem>;

	constructor(gameObjectFactory: GameObjectFactory) {
		this.gameObjectItems = [];
		const pressedkeysLabel = gameObjectFactory.constructGameObject<PressedKeysLabel>(PressedKeysLabel);
		const mouseStateLabel = gameObjectFactory.constructGameObject<MouseStateLabel>(MouseStateLabel);
	}
}
