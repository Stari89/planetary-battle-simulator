import { Injectable, System } from '../ioc/injector';
import Label from '../entities/label';
import Transform from '../components/transform';
import Vector2 from '../vector-2';
import LabelText from '../components/label-text';
import Entity from '../entities/entity';
import PressedKeysLabel from '../entities/pressed-keys-label';
import KeyboardInput from '../components/keyboard-input';

@System()
@Injectable()
export default class GameObjectsManager {
	public readonly gameObjectItems: Array<Entity>;

	constructor() {
		this.gameObjectItems = [
			new Label(
				new Transform(new Vector2(10, 40), new Vector2(1, 1), 0),
				new LabelText('Test Pest', 'black', '20px Arial')
			),
			new PressedKeysLabel(
				new Transform(new Vector2(10, 80), new Vector2(1, 1), 0),
				new LabelText('asdf', 'black', '20px Arial'),
				new KeyboardInput()
			)
		];
		console.log(this.gameObjectItems[0]);
	}
}
