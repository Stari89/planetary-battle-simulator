import { IComponent } from './component';

export default class GridComponent implements IComponent {
	public resolution: number;
	public weight: GridWeight;
}

export enum GridWeight {
	light = '05',
	normal = '10',
	strong = '20'
}
