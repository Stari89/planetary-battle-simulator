import { IComponent } from './component';

export default class ImageComponent implements IComponent {
    public image: HTMLImageElement;

    constructor(options: { image?: HTMLImageElement } = {}) {
        this.image = options.image || null;
    }
}
