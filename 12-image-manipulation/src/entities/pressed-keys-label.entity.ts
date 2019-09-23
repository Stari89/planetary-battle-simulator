import BaseEntity from './base.entity';
import TransformComponent from '../components/transform.component';
import LabelTextComponent from '../components/label-text.component';
import KeyboardInputComponent from '../components/keyboard-input.component';

export default class PressedKeysLabelEntity extends BaseEntity {
	constructor(
		public transform: TransformComponent,
		public labelText: LabelTextComponent,
		public keyboardInput: KeyboardInputComponent
	) {
		super([
			{ name: 'transform', property: 'transform' },
			{ name: 'label-text', property: 'labelText' },
			{ name: 'keyboard-input', property: 'keyboardInput' }
		]);
	}
}
