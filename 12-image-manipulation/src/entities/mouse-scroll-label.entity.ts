import TransformComponent from '../components/transform.component';
import LabelTextComponent from '../components/label-text.component';
import BaseEntity, { Tags } from './base.entity';
import MouseScrollComponent from '../components/mouse-scroll.component';

export default class MouseScrollLabelEntity extends BaseEntity {
	constructor(
		public transform: TransformComponent,
		public labelText: LabelTextComponent,
		public mouseScroll: MouseScrollComponent
	) {
		super([
			{ name: Tags.Transform, property: 'transform' },
			{ name: Tags.LabelText, property: 'labelText' },
			{ name: Tags.MouseScroll, property: 'mouseScroll' }
		]);
	}
}
