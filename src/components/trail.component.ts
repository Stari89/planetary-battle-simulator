import { IComponent } from './component';
import Vector2 from '../util/vector-2';

export default class TrailComponent implements IComponent {
    public positionHistory: Array<IPositionLog>;

    constructor() {
        this.positionHistory = [];
    }
}

export interface IPositionLog {
    t: number;
    position: Vector2;
}
