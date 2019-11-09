import { IComponent } from './component';

export default class MassComponent implements IComponent {
    public mass: number;

    constructor(options: { mass?: number } = {}) {
        this.mass = options.mass || 0;
    }
}
