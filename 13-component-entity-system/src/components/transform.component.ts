import Vector2 from '../vector-2';
import { IComponent } from './component';

export default class TransformComponent implements IComponent {
    public position: Vector2;
    public scale: Vector2;
    public rotation: number;

    constructor(options: { position?: Vector2; scale?: Vector2; rotation?: number } = {}) {
        this.position = options.position || new Vector2(0, 0);
        this.scale = options.scale || new Vector2(1, 1);
        this.rotation = options.rotation || 0;
    }
}
