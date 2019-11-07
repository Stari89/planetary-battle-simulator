import { IComponent } from './component';
import Vector2 from '../vector-2';

export default class SpriteComponent implements IComponent {
    public image: HTMLImageElement;
    public cutoutPosition: Vector2;
    public cutoutSize: Vector2;
    public offset: Vector2;

    constructor(
        options: { image?: HTMLImageElement; cutoutPosition?: Vector2; cutoutSize?: Vector2; offset?: Vector2 } = {}
    ) {
        this.image = options.image || null;
        this.cutoutPosition = options.cutoutPosition || new Vector2(0, 0);
        this.cutoutSize = options.cutoutSize || new Vector2(0, 0);
        this.offset = options.offset || new Vector2(0, 0);
    }
}
