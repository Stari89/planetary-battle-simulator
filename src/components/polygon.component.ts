import { IComponent } from './component';
import Vector2 from '../util/vector-2';
import Color, { ColorChannelBrightness } from '../util/color';

export default class PolygonComponent implements IComponent {
    public points: Array<Vector2>;
    public center: Vector2;
    public lineColor: Color;
    public closePath: boolean;

    constructor(options: { points?: Array<Vector2>; center?: Vector2; lineColor?: Color; closePath?: boolean } = {}) {
        this.points = options.points || [];
        this.center = options.center || new Vector2(0, 0);
        this.lineColor =
            options.lineColor ||
            new Color(ColorChannelBrightness._4, ColorChannelBrightness._4, ColorChannelBrightness._4);
        this.closePath = options.closePath || false;
    }
}
