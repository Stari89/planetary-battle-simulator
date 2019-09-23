import TransformComponent from '../components/transform.component';
import LabelTextComponent from '../components/label-text.component';
import BaseEntity from './base.entity';
import MouseScrollComponent from '../components/mouse-scroll.component';

export default class MouseScrollLabelEntity extends BaseEntity {
	constructor(
		public transform: TransformComponent,
		public labelText: LabelTextComponent,
		public mouseScroll: MouseScrollComponent
	) {
		super([
			{ name: 'transform', property: 'transform' },
			{ name: 'label-text', property: 'labelText' },
			{ name: 'mouse-scroll', property: 'mouseScroll' }
		]);
	}
}
