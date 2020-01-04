import { IComponent } from './component';
import Vector2 from '../util/vector-2';

export default class CameraComponent implements IComponent {
    public viewFramePosition: Vector2;
    public viewFrameSize: Vector2;

    constructor() {
        this.viewFramePosition = new Vector2(0, 0);
        this.viewFrameSize = new Vector2(0, 0);
    }
}
