import { IComponent } from './component';

export default class GridComponent implements IComponent {
	public resolution: number;
	public weight: GridWeight;
}

export enum GridWeight {
	light = '#FFFFFF05',
	normal = '#FFFFFF10',
	strong = '#FFFFFF20'
}
