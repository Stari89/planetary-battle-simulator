import Entity from './entity';
import Transform from '../components/transform';
import LabelText from '../components/label-text';
import KeyboardInput from '../components/keyboard-input';

export default class PressedKeysLabel extends Entity {
	constructor(public transform: Transform, public labelText: LabelText, public keyboardInput: KeyboardInput) {
		super([
			{ name: 'transform', property: 'transform' },
			{ name: 'label-text', property: 'labelText' },
			{ name: 'keyboard-input', property: 'keyboardInput' }
		]);
	}
}
