import BaseEntity, { Tags } from './base.entity';
import TransformComponent from '../components/transform.component';
import ImageComponent from '../components/image.component';

export default class SpriteEntity extends BaseEntity {
    constructor(public transform: TransformComponent, public image: ImageComponent) {
        super([{ name: Tags.Transform, property: 'transform' }, { name: Tags.Image, property: 'image' }]);
    }
}
