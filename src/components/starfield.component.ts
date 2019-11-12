import { IComponent } from './component';
import Vector2 from '../util/vector-2';

export default class StarfieldComponent implements IComponent {
    public tileSize: Vector2;
    public luminosity: Luminosity;
    public image: HTMLImageElement;
    public cutoutPosition: Vector2;
    public cutoutSize: Vector2;
    public offset: Vector2;

    constructor(
        options: {
            tileSize?: Vector2;
            luminosity?: Luminosity;
            image?: HTMLImageElement;
            cutoutPosition?: Vector2;
            cutoutSize?: Vector2;
            offset?: Vector2;
        } = {}
    ) {
        this.tileSize = options.tileSize || new Vector2(0, 0);
        (this.luminosity = options.luminosity || Luminosity.Dim),
            (this.image = options.image || null),
            (this.cutoutPosition = options.cutoutPosition || new Vector2(0, 0));
        this.cutoutSize = options.cutoutSize || new Vector2(0, 0);
        this.offset = options.offset || new Vector2(0, 0);
    }
}

export enum Luminosity {
    Dim = '22',
    Normal = '66',
    Bright = 'FF'
}
