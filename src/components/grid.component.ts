import { IComponent } from './component';

export default class GridComponent implements IComponent {
    public resolution: number;

    constructor(options: { resolution?: number } = {}) {
        this.resolution = options.resolution || 100;
    }
}
