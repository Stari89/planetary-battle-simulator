import { IComponent } from './component';
import Vector2 from '../util/vector-2';
import { Colors } from '../util/color';

export default class PolygonComponent implements IComponent {
    public points: Array<Vector2>;
    public center: Vector2;
    public lineColor: Colors;

    constructor(options: { points?: Array<Vector2>; center?: Vector2; lineColor?: Colors } = {}) {
        this.points = options.points || [];
        this.center = options.center || new Vector2(0, 0);
        this.lineColor = options.lineColor || Colors.White;
    }
}
