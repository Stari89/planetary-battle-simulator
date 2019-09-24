import BaseEntity, { Tags } from './base.entity';
import TransformComponent from '../components/transform.component';
import LabelTextComponent from '../components/label-text.component';
import TouchStateComponent from '../components/touch-state.component';

export default class TouchStateLabelEntity extends BaseEntity {
    constructor(
        public transform: TransformComponent,
        public labelText: LabelTextComponent,
        public touchState: TouchStateComponent
    ) {
        super([
            { name: Tags.Transform, property: 'transform' },
            { name: Tags.LabelText, property: 'labelText' },
            { name: Tags.TouchState, property: 'touchState' }
        ]);
    }
}
