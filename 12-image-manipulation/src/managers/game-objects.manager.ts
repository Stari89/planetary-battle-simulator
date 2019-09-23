import { Injectable, System } from '../ioc/injector';
import LabelEntity from '../entities/label.entity';
import TransformComponent from '../components/transform.component';
import Vector2 from '../vector-2';
import LabelTextComponent from '../components/label-text.component';
import BaseEntity from '../entities/base.entity';
import PressedKeysLabelEntity from '../entities/pressed-keys-label.entity';
import KeyboardInputComponent from '../components/keyboard-input.component';

@System()
@Injectable()
export default class GameObjectsManager {
	public readonly gameObjectItems: Array<BaseEntity>;

	constructor() {
		this.gameObjectItems = [
			new LabelEntity(
				new TransformComponent(new Vector2(10, 40), new Vector2(1, 1), 0),
				new LabelTextComponent('Test Pest', 'black', '20px Arial')
			),
			new PressedKeysLabelEntity(
				new TransformComponent(new Vector2(10, 80), new Vector2(1, 1), 0),
				new LabelTextComponent('asdf', 'black', '20px Arial'),
				new KeyboardInputComponent()
			)
		];
		console.log(this.gameObjectItems[0]);
	}
}
