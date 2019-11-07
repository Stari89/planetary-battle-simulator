import { IComponent } from './component';

export default class GridComponent implements IComponent {
    public resolution: number;
    public weight: GridWeight;

    constructor(options: { resolution?: number; weight?: GridWeight } = {}) {
        this.resolution = options.resolution || 100;
        this.weight = options.weight || GridWeight.light;
    }
}

export enum GridWeight {
    light = '05',
    normal = '10',
    strong = '20'
}
