export enum ColorChannelBrightness {
    _0 = '00',
    _1 = '3F',
    _2 = '7F',
    _3 = 'BF',
    _4 = 'FF'
}

export default class Color {
    public readonly red: ColorChannelBrightness;
    public readonly green: ColorChannelBrightness;
    public readonly blue: ColorChannelBrightness;
    public readonly alpha: ColorChannelBrightness;

    constructor(
        red: ColorChannelBrightness,
        green: ColorChannelBrightness,
        blue: ColorChannelBrightness,
        alpha?: ColorChannelBrightness
    ) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha || ColorChannelBrightness._4;
    }

    public toString(): string {
        return `#${this.red}${this.green}${this.blue}${this.alpha}`;
    }

    public get ghostRed(): Color {
        return new Color(this.red, ColorChannelBrightness._0, this.blue, this.alpha);
    }

    public get ghostBlue(): Color {
        return new Color(ColorChannelBrightness._0, this.green, this.blue, this.alpha);
    }
}
