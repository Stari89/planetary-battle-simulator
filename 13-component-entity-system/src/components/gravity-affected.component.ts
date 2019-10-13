import { IComponent } from './component';
import Vector2 from '../vector-2';

export default class GravityAffectedComponent implements IComponent {
	public position: Vector2;
	public preUpdatedPosition: Vector2;
	public speed: Vector2;
	public mass: number;
}
