import { IComponent } from './component';
import Vector2 from '../util/vector-2';

export default class BackgroundComponent implements IComponent {
    public tileSize: Vector2;
    public image: HTMLImageElement;
    public cutoutPosition: Vector2;
    public cutoutSize: Vector2;
    public offset: Vector2;
    public paralax: Paralax;

    constructor(
        options: {
            tileSize?: Vector2;
            image?: HTMLImageElement;
            cutoutPosition?: Vector2;
            cutoutSize?: Vector2;
            offset?: Vector2;
            paralax?: Paralax;
        } = {}
    ) {
        this.tileSize = options.tileSize || new Vector2(0, 0);
        this.image = options.image || null;
        this.cutoutPosition = options.cutoutPosition || new Vector2(0, 0);
        this.cutoutSize = options.cutoutSize || new Vector2(0, 0);
        this.offset = options.offset || new Vector2(0, 0);
        this.paralax = options.paralax || Paralax.Near;
    }
}

export enum Paralax {
    Near = 1.0,
    Medium = 0.5,
    Far = 0.25,
    VeryFar = 0.125
}
