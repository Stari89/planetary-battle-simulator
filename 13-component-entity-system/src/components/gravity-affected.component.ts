import { IComponent } from './component';
import Vector2 from '../vector-2';

export default class GravityAffectedComponent implements IComponent {
	public preUpdatedPosition: Vector2;
	public velocity: Vector2; // pixels per milisecond
	public mass: number;
	public netAcceleration: Vector2;
}
