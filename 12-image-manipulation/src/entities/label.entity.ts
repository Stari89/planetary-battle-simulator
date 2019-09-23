import TransformComponent from '../components/transform.component';
import LabelTextComponent from '../components/label-text.component';
import BaseEntity from './base.entity';

export default class LabelEntity extends BaseEntity {
	constructor(public transform: TransformComponent, public labelText: LabelTextComponent) {
		super([{ name: 'transform', property: 'transform' }, { name: 'label-text', property: 'labelText' }]);
	}
}
