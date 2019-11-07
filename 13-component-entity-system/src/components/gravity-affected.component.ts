import { IComponent } from './component';
import Vector2 from '../vector-2';

export default class GravityAffectedComponent implements IComponent {
    public preUpdatedPosition: Vector2;
    public velocity: Vector2; // pixels per milisecond
    public mass: number;
    public netAcceleration: Vector2;
    public positionHistory: Array<IPositionLog>;

    constructor(options: { preUpdatedPosition?: Vector2; velocity?: Vector2; mass?: number } = {}) {
        this.preUpdatedPosition = options.preUpdatedPosition || new Vector2(0, 0);
        this.velocity = options.velocity || new Vector2(0, 0);
        this.mass = options.mass || 0;
        this.netAcceleration = new Vector2(0, 0);
        this.positionHistory = [];
    }
}

export interface IPositionLog {
    t: number;
    position: Vector2;
}
