import { IComponent } from './component';
import Vector2 from '../vector-2';

export default class StarfieldComponent implements IComponent {
	public stars: Array<Vector2>;
	public luminosity: string;
	public ppm: number;
}
