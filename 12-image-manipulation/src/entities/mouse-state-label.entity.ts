import TransformComponent from '../components/transform.component';
import LabelTextComponent from '../components/label-text.component';
import MouseStateComponent from '../components/mouse-state.component';
import BaseEntity from './base.entity';

export default class MouseStateLabelEntity extends BaseEntity {
	constructor(
		public transform: TransformComponent,
		public labelText: LabelTextComponent,
		public mouseState: MouseStateComponent
	) {
		super([
			{ name: 'transform', property: 'transform' },
			{ name: 'label-text', property: 'labelText' },
			{ name: 'mouse-state', property: 'mouseState' }
		]);
	}
}
