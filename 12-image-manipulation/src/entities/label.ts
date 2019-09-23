import { Entity } from '../ioc/injector';
import Transform from '../components/transform';
import LabelText from '../components/label-text';

@Entity()
export default class Label {
	constructor(public transform: Transform, public labelText: LabelText) {}
}
