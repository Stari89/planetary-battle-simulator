import { IComponent } from './component';
import Vector2 from '../util/vector-2';

export default class CameraComponent implements IComponent {
    public viewFramePosition: Vector2;
    public viewFrameSize: Vector2;
    public currentZoomLevel: number;
    public readonly maxZoomLevel: number;
    public readonly minZoomLevel: number;

    constructor(options: { minZoomLevel?: number; maxZoomLevel?: number; currentZoomLevel?: number } = {}) {
        this.viewFramePosition = new Vector2(0, 0);
        this.viewFrameSize = new Vector2(0, 0);
        this.currentZoomLevel = options.currentZoomLevel || 0;
        this.minZoomLevel = options.minZoomLevel || -5;
        this.maxZoomLevel = options.maxZoomLevel || 5;
    }
}
