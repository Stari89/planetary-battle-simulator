import { IComponent } from './component';

export default class FocusComponent implements IComponent {
    public isFocused: boolean;

    constructor(options: { isFocused?: boolean } = {}) {
        this.isFocused = options.isFocused || false;
    }
}
