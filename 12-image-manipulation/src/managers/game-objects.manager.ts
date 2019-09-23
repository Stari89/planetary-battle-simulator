import { Injectable } from '../ioc/injector';
import LabelEntity from '../entities/label.entity';
import TransformComponent from '../components/transform.component';
import Vector2 from '../vector-2';
import LabelTextComponent from '../components/label-text.component';
import BaseEntity from '../entities/base.entity';
import PressedKeysLabelEntity from '../entities/pressed-keys-label.entity';
import PressedKeysComponent from '../components/pressed-keys.component';
import MouseScrollLabelEntity from '../entities/mouse-scroll-label.entity';
import MouseScrollComponent from '../components/mouse-scroll.component';
import MouseStateLabelEntity from '../entities/mouse-state-label.entity';
import MouseStateComponent from '../components/mouse-state.component';

@Injectable()
export default class GameObjectsManager {
	public readonly gameObjectItems: Array<BaseEntity>;

	constructor() {
		this.gameObjectItems = [
			new LabelEntity(
				new TransformComponent(new Vector2(10, 40), new Vector2(1, 1), 0),
				new LabelTextComponent('Test Label', 'black', '20px Arial')
			),
			new PressedKeysLabelEntity(
				new TransformComponent(new Vector2(10, 80), new Vector2(1, 1), 0),
				new LabelTextComponent('', 'black', '20px Arial'),
				new PressedKeysComponent()
			),
			new MouseScrollLabelEntity(
				new TransformComponent(new Vector2(10, 120), new Vector2(1, 1), 0),
				new LabelTextComponent('', 'black', '20px Arial'),
				new MouseScrollComponent()
			),
			new MouseStateLabelEntity(
				new TransformComponent(new Vector2(10, 160), new Vector2(1, 1), 0),
				new LabelTextComponent('', 'black', '20px Arial'),
				new MouseStateComponent()
			)
		];
	}
}
