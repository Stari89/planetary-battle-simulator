import TransformComponent from '../components/transform.component';
import LabelTextComponent from '../components/label-text.component';
import MouseStateComponent from '../components/mouse-state.component';
import BaseEntity, { Tags } from './base.entity';

export default class MouseStateLabelEntity extends BaseEntity {
	constructor(
		public transform: TransformComponent,
		public labelText: LabelTextComponent,
		public mouseState: MouseStateComponent
	) {
		super([
			{ name: Tags.Transform, property: 'transform' },
			{ name: Tags.LabelText, property: 'labelText' },
			{ name: Tags.MouseState, property: 'mouseState' }
		]);
	}
}
