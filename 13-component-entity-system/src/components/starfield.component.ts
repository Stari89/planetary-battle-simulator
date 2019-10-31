import { IComponent } from './component';
import Vector2 from '../vector-2';

export default class StarfieldComponent implements IComponent {
	public luminosity: Luminosity;
	public image: HTMLImageElement;
	public cutoutPosition: Vector2;
	public cutoutSize: Vector2;
	public offset: Vector2;
}

export enum Luminosity {
	Dim = '22',
	Normal = '66',
	Bright = 'FF'
}
