import { IComponent } from './component';
import Vector2 from '../vector-2';

export default class SpriteComponent implements IComponent {
	public image: HTMLImageElement;
	public cutoutPosition: Vector2;
	public cutoutSize: Vector2;
}
