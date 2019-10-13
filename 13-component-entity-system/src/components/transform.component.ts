import Vector2 from '../vector-2';
import { IComponent } from './component';

export default class TransformComponent implements IComponent {
	public position: Vector2;
	public scale: Vector2;
	public rotation: number;
}
