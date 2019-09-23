import TransformComponent from '../components/transform.component';
import LabelTextComponent from '../components/label-text.component';
import BaseEntity, { Tags } from './base.entity';

export default class LabelEntity extends BaseEntity {
	constructor(public transform: TransformComponent, public labelText: LabelTextComponent) {
		super([{ name: Tags.Transform, property: 'transform' }, { name: Tags.LabelText, property: 'labelText' }]);
	}
}
