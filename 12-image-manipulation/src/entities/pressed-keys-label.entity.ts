import BaseEntity, { Tags } from './base.entity';
import TransformComponent from '../components/transform.component';
import LabelTextComponent from '../components/label-text.component';
import PressedKeysComponent from '../components/pressed-keys.component';

export default class PressedKeysLabelEntity extends BaseEntity {
	constructor(
		public transform: TransformComponent,
		public labelText: LabelTextComponent,
		public pressedKeys: PressedKeysComponent
	) {
		super([
			{ name: Tags.Transform, property: 'transform' },
			{ name: Tags.LabelText, property: 'labelText' },
			{ name: Tags.PressedKeys, property: 'pressedKeys' }
		]);
	}
}
