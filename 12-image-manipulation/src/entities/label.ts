import Transform from '../components/transform';
import LabelText from '../components/label-text';
import Entity from './entity';

export default class Label extends Entity {
	constructor(public transform: Transform, public labelText: LabelText) {
		super([{ name: 'transform', property: 'transform' }, { name: 'label-text', property: 'labelText' }]);
	}
}
