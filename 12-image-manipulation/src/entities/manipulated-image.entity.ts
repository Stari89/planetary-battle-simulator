import BaseEntity, { Tags } from './base.entity';
import TransformComponent from '../components/transform.component';
import ImageComponent from '../components/image.component';
import ManipulatedComponent from '../components/manipulated.component';

export default class ManipulatedImageEntity extends BaseEntity {
	constructor(
		public transform: TransformComponent,
		public image: ImageComponent,
		public manipulated: ManipulatedComponent
	) {
		super([
			{ name: Tags.Transform, property: 'transform' },
			{ name: Tags.Image, property: 'image' },
			{ name: Tags.Manipulated, property: 'manipulated' }
		]);
	}
}
